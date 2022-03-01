#![allow(unused_imports)]
/* ------------------add mod------------------*/
mod models;
mod test;
mod utils;

use crate::models::{
    admin::Admin, campaign::Campaign, message::Message, request::Request, user::User,
    voting::Voting,
};
// use crate::utils::*;

/* ------------------add use------------------*/
// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use crate::utils::*;
use nanoid::nanoid;
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    collections::{LookupMap, UnorderedMap, UnorderedSet},
    json_types::ValidAccountId,
    serde::{Deserialize, Serialize},
    {
        assert_one_yocto, env, log, near_bindgen, serde_json, AccountId, Balance, CryptoHash,
        Promise, PromiseIndex, PromiseResult, Timestamp,
    },
};
use std::convert::TryInto;
near_sdk::setup_alloc!();

/* ------------------defined type------------------*/
pub type CampaignId = String;
pub type MessageId = String;
pub type RequestId = String;
pub type AdminId = ValidAccountId;
pub type UserId = ValidAccountId;
pub type VotingId = String;

/* ------------------main contract------------------*/
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    owner: AccountId,
    campaigns: UnorderedMap<CampaignId, Campaign>,
    // donations: Vec<Donation>,
    users: UnorderedMap<UserId, User>,
    campaign_per_user: UnorderedMap<ValidAccountId, UnorderedSet<CampaignId>>,
    votings: UnorderedMap<VotingId, Voting>,
    voting_per_campaign: UnorderedMap<CampaignId, UnorderedSet<VotingId>>,
    validated_campaigns: UnorderedSet<CampaignId>,
    // Admin
    admins: UnorderedMap<AdminId, Admin>,
    requests: UnorderedMap<RequestId, Request>,
    messages: UnorderedMap<MessageId, Message>,
    request_by_account_id: LookupMap<ValidAccountId, UnorderedSet<RequestId>>,
    messages_by_request: LookupMap<RequestId, UnorderedSet<MessageId>>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub enum StorageKey {
    // Campaign grownfunding
    Campaign,
    User,
    CampaignPerUserInnerKey { account_id_hash: CryptoHash },
    VotingPerCampaign,
    VotingPerCampaignInnerKey { campaign_id: CampaignId },
    ValidatedCampaigns,
    Voting,
    CampaignPerUser,
    Volunteer,
    VoteByVolunteer,
    VoteByVolunteerInnerKey { campaign_id: CampaignId },

    // Admin
    Admin,
    Message,
    Request,
    RequestByAccountId,
    MessageByRequest,
    RequestByAccountIdInnerKey { account_id_hash: CryptoHash },
    // nft (todo)

    // family doctor (todo)
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(owner_id: ValidAccountId, base_uri_content: Option<String>) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        let mut this = Self {
            owner: env::predecessor_account_id(),
            requests: UnorderedMap::new(StorageKey::Request.try_to_vec().unwrap()),
            campaigns: UnorderedMap::new(StorageKey::Campaign.try_to_vec().unwrap()),
            users: UnorderedMap::new(StorageKey::User.try_to_vec().unwrap()),
            voting_per_campaign: UnorderedMap::new(
                StorageKey::VotingPerCampaign.try_to_vec().unwrap(),
            ),
            validated_campaigns: UnorderedSet::new(
                StorageKey::ValidatedCampaigns.try_to_vec().unwrap(),
            ),
            votings: UnorderedMap::new(StorageKey::Voting.try_to_vec().unwrap()),
            admins: UnorderedMap::new(StorageKey::Admin.try_to_vec().unwrap()),
            messages: UnorderedMap::new(StorageKey::Message.try_to_vec().unwrap()),
            request_by_account_id: LookupMap::new(
                StorageKey::RequestByAccountId.try_to_vec().unwrap(),
            ),
            messages_by_request: LookupMap::new(StorageKey::MessageByRequest.try_to_vec().unwrap()),
            campaign_per_user: UnorderedMap::new(StorageKey::CampaignPerUser.try_to_vec().unwrap()),
        };

        let admin = Admin::new(
            owner_id.to_owned(),
            "Base Admin Account".to_string(),
            base_uri_content.unwrap_or_default(),
        );

        this.admins.insert(&owner_id, &admin);

        this
    }
}
