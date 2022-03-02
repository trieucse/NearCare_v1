use crate::*;

#[derive(Clone, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Donation {
    pub campaign_id: CampaignId,
    pub donor: AccountId,
    pub amount: u64,
}

impl Donation {
    pub fn new() -> Self {
        Donation {
            donor: env::predecessor_account_id(),
            campaign_id: 0,
            amount: 0,
        }
    }
}
