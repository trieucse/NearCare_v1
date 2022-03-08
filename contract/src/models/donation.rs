use std::slice::SliceIndex;

use crate::*;

use near_sdk::json_types::U128;

#[derive(Clone, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Donation {
    pub campaign_id: CampaignId,
    pub donor: ValidAccountId,
    pub amount: U128,
    pub created_at: Timestamp,
}

impl Donation {
    pub fn new(
        campaign_id: CampaignId,
        donor: ValidAccountId,
        amount: U128,
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

#[derive(Clone, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JSONTopDonor {
    pub donor: ValidAccountId,
    pub amount: U128,
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
        let mut donated = u128::from(campaign.donated);
        let add_donate = Donation::new(
            campaign_id,
            env::predecessor_account_id().try_into().unwrap(),
            U128(attached_deposit),
            env::block_timestamp(),
        );
        self.donations.insert(&self.next_donation_id, &add_donate);
        donated += attached_deposit;
        campaign.donated = U128(donated);
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

        // update total_donation_by_user
        let total_donation_by_user = self
            .total_donation_by_user
            .get(&env::predecessor_account_id().try_into().unwrap())
            .unwrap_or_else(|| {
                U128(0)
            });
        let total_amount = u128::from(total_donation_by_user) + u128::from(attached_deposit);
        self.total_donation_by_user.insert(
            &env::predecessor_account_id().try_into().unwrap(),
            &U128::from(total_amount),
        );
        
        donation_by_user.insert(&self.next_donation_id);

        // if bigger, inactive
        if u128::from(campaign.donated) >= u128::from(campaign.goal) {
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

    pub fn get_total_donation_amount_by_user(&self, user_id: ValidAccountId) -> Balance {
        let mut total_donation = 0;
        for donation in self.donations.values() {
            if donation.donor == user_id {
                total_donation += u128::from(donation.amount);
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




    pub fn get_top_donors(&self, limit: Option<u64>) -> Vec<JSONTopDonor> {
        let mut top_donors = self
            .total_donation_by_user
            .iter()
            .map(|(user_id, total_donation)| {
                JSONTopDonor {
                    donor: user_id.clone(),
                    amount: total_donation.clone(),
                }
            })
            .collect::<Vec<JSONTopDonor>>();
        top_donors.sort_by(|a, b| u128::from(b.amount).cmp(&u128::from(a.amount)));
        top_donors.truncate(limit.unwrap_or(0) as usize);
        top_donors
    }
    
}