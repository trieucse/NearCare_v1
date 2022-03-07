use std::slice::SliceIndex;

use crate::*;

use near_sdk::json_types::U128;

#[derive(Clone, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Donation {
    pub campaign_id: CampaignId,
    pub donor: AccountId,
    pub amount: Balance,
    pub created_at: Timestamp,
}

impl Donation {
    pub fn new(
        campaign_id: CampaignId,
        donor: AccountId,
        amount: Balance,
        created_at: Timestamp,
    ) -> Self {
        Self {
            campaign_id,
            donor,
            amount,
            created_at,
        }
    }
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn donate(&mut self, campaign_id: CampaignId) {
        self.assert_is_campaign_exists(campaign_id.to_owned());
        self.assert_is_campaign_active(campaign_id);
        self.assert_is_campaign_funded(campaign_id);

        // attach_deposit is the amount of yocto to donate
        let mut campaign = self.campaigns.get(&campaign_id.to_owned()).unwrap();
        let attached_deposit = env::attached_deposit();
        let add_donate = Donation::new(
            campaign_id,
            env::predecessor_account_id().try_into().unwrap(),
            attached_deposit,
            env::block_timestamp(),
        );
        self.donations.insert(&self.next_donation_id, &add_donate);
        campaign.donated += attached_deposit;
        self.campaigns.insert(&campaign_id, &campaign);

        // update donation_by_user
        let mut donation_by_user = self
            .donation_by_user
            .get(&env::predecessor_account_id().try_into().unwrap())
            .unwrap_or_else(|| {
                UnorderedSet::new(StorageKey::DonationByUserInnerKey {
                    user_id: hash_account_id(&env::predecessor_account_id()),
                })
            });

        donation_by_user.insert(&self.next_donation_id);

        // if bigger, inactive
        if campaign.donated >= campaign.goal {
            campaign.is_active = false;
            self.campaigns.insert(&campaign_id, &campaign);
        }

        self.next_donation_id += 1;
    }

    pub fn get_donation_paging(
        &self,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<Donation> {
        let start = u128::from(from_index.unwrap_or(U128(0)));
        self.donations
            .values()
            .skip(start as usize)
            .take(limit.unwrap_or(0) as usize)
            .collect()
    }

    pub fn get_donation_count(&self) -> u64 {
        self.donations.len() as u64
    }

    pub fn get_donation_by_id(&self, id: DonationId) -> Option<Donation> {
        self.donations.get(&id)
    }

    pub fn get_total_donation_amount_by_user(&self, user_id: AccountId) -> Balance {
        let mut total_donation = 0;
        for donation in self.donations.values() {
            if donation.donor == user_id {
                total_donation += donation.amount;
            }
        }
        total_donation
    }

    pub fn get_number_of_campaign_donated_by_user(&self, user_id: ValidAccountId) -> u64 {
        todo!();
    }

    pub fn get_donation_by_account_id_paging(
        &self,
        account_id: ValidAccountId,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<Donation> {
        let start = u128::from(from_index.unwrap_or(U128(0)));
        self.donation_by_user
            .get(&account_id)
            .unwrap_or_else(|| {
                UnorderedSet::new(StorageKey::DonationByUserInnerKey {
                    user_id: hash_account_id(&account_id.to_string()),
                })
            })
            .iter()
            .skip(start as usize)
            .take(limit.unwrap_or(0) as usize)
            .map(|donation_id| self.donations.get(&donation_id).unwrap())
            .collect()
    }
}
