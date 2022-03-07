#![allow(unused_imports)]
/* ------------------add mod------------------*/
mod models;
mod test;
mod utils;

use crate::models::{
    admin::Admin, campaign::Campaign, donation::Donation, message::Message, request::Request,
    user::User, voting::Voting,
};
// use crate::utils::*;

/* ------------------add use------------------*/
// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use crate::utils::*;
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
use near_sdk::{BorshStorageKey, PanicOnDefault};
use std::convert::TryInto;
near_sdk::setup_alloc!();

/* ------------------defined type------------------*/
pub type CampaignId = u128;
pub type MessageId = u128;
pub type RequestId = u128;
pub type AdminId = ValidAccountId;
pub type UserId = ValidAccountId;
pub type VotingId = u128;
pub type DonationId = u128;

/* ------------------main contract------------------*/
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    owner: AccountId,
    campaigns: UnorderedMap<CampaignId, Campaign>,
    donations: UnorderedMap<DonationId, Donation>,
    donation_per_campaign: UnorderedMap<CampaignId, UnorderedSet<DonationId>>,
    donation_by_user: UnorderedMap<UserId, UnorderedSet<DonationId>>,
    users: UnorderedMap<UserId, User>,
    campaign_per_user: UnorderedMap<ValidAccountId, UnorderedSet<CampaignId>>,
    votings: UnorderedMap<VotingId, Voting>,
    voting_per_campaign: UnorderedMap<CampaignId, UnorderedSet<VotingId>>,
    validated_campaigns: UnorderedSet<CampaignId>,
    voting_by_volunteer: UnorderedMap<UserId, UnorderedSet<VotingId>>,

    // Admin
    admins: UnorderedMap<AdminId, Admin>,
    requests: UnorderedMap<RequestId, Request>,
    messages: UnorderedMap<MessageId, Message>,
    request_by_account_id: LookupMap<ValidAccountId, UnorderedSet<RequestId>>,
    messages_by_request: LookupMap<RequestId, UnorderedSet<MessageId>>,

    next_request_id: RequestId,
    next_campaign_id: CampaignId,
    next_voting_id: VotingId,
    next_message_id: MessageId,
    next_donation_id: DonationId,
}

#[derive(BorshStorageKey, BorshSerialize)]
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
    VotingByVolunteer,
    VotingByVolunteerInnerKey { volunteer_id: CryptoHash },
    Donation,
    DonationPerCampaign,
    DonationPerCampaignInnerKey { campaign_id: CampaignId },
    DonationByUser,
    DonationByUserInnerKey { user_id: CryptoHash },

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

impl Default for Contract {
    fn default() -> Self {
        Self {
            owner: env::signer_account_id(),
            requests: UnorderedMap::new(StorageKey::Request),
            campaigns: UnorderedMap::new(StorageKey::Campaign),
            users: UnorderedMap::new(StorageKey::User),
            voting_per_campaign: UnorderedMap::new(StorageKey::VotingPerCampaign),
            validated_campaigns: UnorderedSet::new(StorageKey::ValidatedCampaigns),
            votings: UnorderedMap::new(StorageKey::Voting),
            voting_by_volunteer: UnorderedMap::new(StorageKey::VotingByVolunteer),
            admins: UnorderedMap::new(StorageKey::Admin),
            messages: UnorderedMap::new(StorageKey::Message),
            request_by_account_id: LookupMap::new(StorageKey::RequestByAccountId),
            messages_by_request: LookupMap::new(StorageKey::MessageByRequest),
            campaign_per_user: UnorderedMap::new(StorageKey::CampaignPerUser),
            donations: UnorderedMap::new(StorageKey::Donation),
            donation_per_campaign: UnorderedMap::new(StorageKey::DonationPerCampaign),
            donation_by_user: UnorderedMap::new(StorageKey::DonationByUser),

            next_campaign_id: 0,
            next_request_id: 0,
            next_voting_id: 0,
            next_message_id: 0,
            next_donation_id: 0,
        }
    }
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new() -> Self {
        assert!(!env::state_exists(), "Already initialized");

        Self::default()
    }
}
