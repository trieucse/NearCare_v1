#![allow(unused_imports)]
use crate::*;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Voting {
    pub campaign_id: CampaignId,
    pub timestamp: u64,
    pub voter: ValidAccountId,
    pub memo: String,
    pub money_paid: Balance,
}

impl Voting {
    pub fn new(
        campaign_id: CampaignId,
        voter: ValidAccountId,
        memo: String,
        money_paid: Balance,
    ) -> Self {
        Self {
            timestamp: env::block_timestamp(),
            voter,
            memo,
            money_paid,
            campaign_id,
        }
    }
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn vote_for_campaign(&mut self, campaign_id: CampaignId, memo: String) {
        self.assert_is_campaign_active(campaign_id.to_owned());
        self.assert_is_campaign_funded(campaign_id.to_owned());
        self.assert_is_campaign_not_expired(campaign_id.to_owned());
        self.assert_is_voter_not_voted_for_campaign(campaign_id.to_owned());
        self.assert_is_volunteer(&env::predecessor_account_id().try_into().unwrap());

        let campaign = self.campaigns.get(&campaign_id.to_owned()).unwrap();

        let new_voting = Voting::new(
            campaign_id.clone(),
            env::predecessor_account_id().try_into().unwrap(),
            memo,
            campaign.vote_fee,
        );

        let voting_id = nanoid!();
        // Update votings
        self.votings.insert(&voting_id, &new_voting);

        // Voting list is a list id of votings
        let mut voting_list = self
            .voting_per_campaign
            .get(&campaign_id)
            .unwrap_or_else(|| {
                UnorderedSet::new(
                    StorageKey::VotingPerCampaignInnerKey {
                        campaign_id: campaign_id.to_owned(),
                    }
                    .try_to_vec()
                    .unwrap(),
                )
            });

        voting_list.insert(&voting_id);

        self.voting_per_campaign.insert(&campaign_id, &voting_list);
    }

    pub fn get_voting_for_campaign_paging(
        &self,
        campaign_id: CampaignId,
        page_size: u64,
        page_number: u64,
    ) -> Vec<Voting> {
        let mut votings = self
            .voting_per_campaign
            .get(&campaign_id)
            .unwrap_or_else(|| {
                UnorderedSet::new(
                    StorageKey::VotingPerCampaignInnerKey { campaign_id }
                        .try_to_vec()
                        .unwrap(),
                )
            })
            .iter()
            .map(|voting_id| self.votings.get(&voting_id).unwrap())
            .collect::<Vec<_>>();

        votings.sort_by(|a, b| a.timestamp.cmp(&b.timestamp));
        votings.reverse();

        let mut result = vec![];
        for (i, voting) in votings.into_iter().enumerate() {
            if i >= page_size as usize * page_number as usize {
                break;
            }
            if i >= page_size as usize * (page_number - 1) as usize {
                result.push(voting);
            }
        }
        result
    }

    pub fn get_voting_count_for_campaign(&self, campaign_id: CampaignId) -> u64 {
        self.voting_per_campaign
            .get(&campaign_id)
            .unwrap_or_else(|| {
                UnorderedSet::new(
                    StorageKey::VotingPerCampaignInnerKey { campaign_id }
                        .try_to_vec()
                        .unwrap(),
                )
            })
            .len() as u64
    }

    pub fn assert_is_voter_not_voted_for_campaign(&self, campaign_id: CampaignId) {
        let voter: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        let votings = self
            .voting_per_campaign
            .get(&campaign_id)
            .unwrap_or_else(|| {
                UnorderedSet::new(
                    StorageKey::VotingPerCampaignInnerKey { campaign_id }
                        .try_to_vec()
                        .unwrap(),
                )
            })
            .iter()
            .map(|voting_id| self.votings.get(&voting_id).unwrap())
            .filter(|voting| voting.voter == voter)
            .collect::<Vec<_>>();

        assert!(
            votings.is_empty(),
            "You have already voted for this campaign"
        );
    }
}
