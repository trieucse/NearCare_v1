use crate::*;

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
impl Contract{
    // #[payable]
    // pub fn donate(&mut self, campaign_id: CampaignId) {
    //     //self.assert_is_campaign_active(campaign_id.to_owned());
    //     //self.assert_is_campaign_funded(campaign_id.to_owned());
    //     //self.assert_is_campaign_not_expired(campaign_id.to_owned());
    //     let mut campaign = self.campaigns.get(&campaign_id.to_owned()).unwrap();
    //     let add_donate = Donation::new(
    //         campaign_id,
    //         env::predecessor_account_id().try_into().unwrap(),
    //         amount: env::attached_deposit(),
    //         env::block_timestamp(),
    //     );
    //     self.donations.insert(&self.next_donation_id, &add_donate);
    //     campaign.donated += amount;
    //     self.campaigns.insert(&campaign_id, &campaign);

    // }

    #[payable]
    pub fn donate(&mut self, campaign_id:CampaignId){
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
    }

}
