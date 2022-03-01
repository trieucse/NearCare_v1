use crate::*;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Campaign {
    pub name: String,
    pub description: String,
    pub start_date: Timestamp,
    pub end_date: Timestamp,
    pub goal: u64,
    pub current_amount: u64,
    pub owner: ValidAccountId,
    pub is_active: bool,
    pub base_uri_content: String,
    pub rechedule_attempts: u64,
    // TODO: Backer
    // pub backers: UnorderedSet<ValidAccountId>,
}

pub trait CampaignTrait {
    fn new(
        name: String,
        description: String,
        end_date: u64,
        goal: u64,
        owner: ValidAccountId,
        base_uri_content: String,
    ) -> Self;
}

impl CampaignTrait for Campaign {
    fn new(
        name: String,
        description: String,
        end_date: u64,
        goal: u64,
        owner: ValidAccountId,
        base_uri_content: String,
    ) -> Self {
        Self {
            name,
            description,
            start_date: env::block_timestamp(),
            end_date,
            goal,
            current_amount: 0,
            owner,
            is_active: true,
            base_uri_content,
            rechedule_attempts: 1,
        }
    }
}

#[near_bindgen]
impl Contract {
    #[payable]
    fn create_campaign(
        &mut self,
        name: String,
        description: String,
        end_date: Timestamp,
        goal: u64,
        base_uri_content: String,
    ) {
        self.assert_is_user_registered(&env::predecessor_account_id().try_into().unwrap());
        assert_at_least_one_yocto();

        let before_storage_usage = env::storage_usage();
        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        let campaign = Campaign::new(
            name,
            description,
            end_date,
            goal,
            account_id.to_owned(),
            base_uri_content,
        );
        const campaign_id_random: String = nanoid!();
        self.campaigns.insert(&campaign_id_random, &campaign);

        // Modify user campaign
        let mut new_user_campaign = self.campaign_per_user.get(&account_id).unwrap_or_else(|| {
            UnorderedSet::new(
                StorageKey::CampaignPerUserInnerKey {
                    account_id_hash: hash_account_id(&env::predecessor_account_id()),
                }
                .try_to_vec()
                .unwrap(),
            )
        });

        new_user_campaign.insert(&campaign_id_random);
        self.campaign_per_user
            .insert(&account_id, &new_user_campaign);

        // Calculate the storage usage after the transaction
        let after_storage_usage = env::storage_usage();
        let storage_used = after_storage_usage - before_storage_usage;

        // Refund the deposit left after the transaction
        refund_deposit(storage_used);
    }

    fn get_campaign(&self, campaign_id: CampaignId) -> Option<Campaign> {
        self.campaigns.get(&campaign_id)
    }

    fn get_campaign_paging(&self, page_size: u64, page_number: u64) -> Vec<(CampaignId, Campaign)> {
        let mut campaigns = self.campaigns.iter().collect::<Vec<_>>();
        campaigns.sort_by(|a, b| a.1.start_date.cmp(&b.1.start_date));
        campaigns
            .into_iter()
            .skip((page_size * page_number).try_into().unwrap())
            .take(page_size.try_into().unwrap())
            .collect()
    }

    #[payable]
    fn edit_campaign(
        &mut self,
        campaign_id: CampaignId,
        name: Option<String>,
        description: Option<String>,
        end_date: Option<Timestamp>,
        goal: Option<u64>,
        base_uri_content: Option<String>,
    ) {
        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        self.assert_is_user_registered(&account_id);
        self.assert_is_campaign_exists(campaign_id);
        self.assert_is_campaign_owner(campaign_id);
        assert_at_least_one_yocto();

        let before_storage_usage = env::storage_usage();

        let mut campaign = self.campaigns.get(&campaign_id).unwrap();

        if let Some(name) = name {
            campaign.name = name;
        }

        if let Some(description) = description {
            campaign.description = description;
        }

        if let Some(end_date) = end_date {
            campaign.end_date = end_date;
        }

        if let Some(goal) = goal {
            campaign.goal = goal;
        }

        if let Some(base_uri_content) = base_uri_content {
            campaign.base_uri_content = base_uri_content;
        }

        self.campaigns.insert(&campaign_id, &campaign);

        // Calculate the storage usage after the transaction
        let after_storage_usage = env::storage_usage();
        let storage_used = after_storage_usage - before_storage_usage;

        // Refund the deposit left after the transaction
        refund_deposit(storage_used);
    }

    #[payable]
    fn withdraw_campaign(&mut self, campaign_id: CampaignId) {
        // todo!("Campaign need to be approved by the owner");

        const account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        self.assert_is_user_registered(&account_id);
        self.assert_is_campaign_owner(campaign_id);
        self.assert_is_campaign_funded(campaign_id);
        self.assert_is_campaign_active(campaign_id);
        assert_at_least_one_yocto();

        let before_storage_usage = env::storage_usage();

        let campaign = self.campaigns.get(&campaign_id).unwrap();
        let campaign_owner = campaign.owner.clone();

        // Refund the deposit left after the transaction
        refund_deposit(before_storage_usage);

        // Transfer the campaign to the owner
        Promise::new(campaign_owner.to_string()).transfer(campaign.current_amount.into());
    }

    fn remove_campaign(&mut self, campaign_id: CampaignId) {
        self.assert_is_user_registered(&env::predecessor_account_id().try_into().unwrap());
        self.assert_is_campaign_owner(campaign_id);
        self.assert_is_not_donated_yet(campaign_id);

        self.campaigns.remove(&campaign_id);
    }

    fn assert_is_campaign_owner(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();
        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        assert_eq!(
            account_id, campaign.owner,
            "Only campaign owner can edit campaign"
        );
    }

    pub fn assert_is_campaign_active(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();
        assert!(campaign.is_active, "Campaign is not active");
    }

    pub fn assert_is_campaign_funded(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();
        assert!(
            campaign.current_amount >= campaign.goal,
            "Campaign is not funded"
        );
    }

    pub fn assert_is_campaign_not_expired(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();
        assert!(
            env::block_timestamp() < campaign.end_date,
            "Campaign is expired"
        );
    }

    pub fn assert_is_not_donated_yet(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();

        assert!(campaign.current_amount == 0, "Campaign is already donated");
    }

    pub(crate) fn assert_is_campaign_exists(&self, campaign_id: CampaignId) {
        assert!(
            self.campaigns.get(&campaign_id).is_some(),
            "Campaign does not exist"
        );
    }
}
