use crate::*;
use near_sdk::json_types::U128;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Campaign {
    pub campaign_id: CampaignId,
    pub author: ValidAccountId,
    pub created_at: Timestamp,
    pub end_date: Timestamp,
    pub title: String,
    pub goal: u128,
    pub donated: u128,
    pub description: String,
    pub total_votes: i64,
    pub votes: Vec<String>,
    // pub featured_image: String,
    pub category_id: u8,
    pub country_id: u8,
    pub like_count: u128,
    pub is_liked: Vec<AccountId>,
    pub comment_count: u64,
    pub campaign_type: u8,
    // pub video_url: String,
    // pub audio_url: String,
    // pub gallery_imgs: Vec<String>,
    pub is_active: bool,
    pub base_uri_content: String,
    pub rechedule_attempts: u64,
    pub vote_fee: Balance,
}

pub trait CampaignTrait {
    fn new(
        campaign_id: CampaignId,
        author: ValidAccountId,
        end_date: Timestamp,
        title: String,
        goal: u128,
        description: String,
        // featured_image: String,
        category_id: u8,
        country_id: u8,
        campaign_type: u8,
        // video_url: String,
        // audio_url: String,
        // gallery_imgs: Vec<String>,
        base_uri_content: String,
    ) -> Self;
}

impl CampaignTrait for Campaign {
    fn new(
        campaign_id: CampaignId,
        author: ValidAccountId,
        end_date: Timestamp,
        title: String,
        goal: u128,
        description: String,
        // featured_image: String,
        category_id: u8,
        country_id: u8,
        campaign_type: u8,
        // video_url: String,
        // audio_url: String,
        // gallery_imgs: Vec<String>,
        base_uri_content: String,
    ) -> Self {
        Self {
            campaign_id,
            author,
            created_at: env::block_timestamp(),
            end_date,
            title,
            goal,
            description,
            // featured_image,
            category_id,
            country_id,
            campaign_type,
            // video_url,
            // audio_url,
            // gallery_imgs,
            base_uri_content,
            vote_fee: utils::ONE_NEAR / 10,
            donated: 0,
            total_votes: 0,
            votes: [].to_vec(),
            is_active: false,
            is_liked: [].to_vec(),
            comment_count: 0,
            like_count: 0,
            rechedule_attempts: 1,
        }
    }
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn create_campaign(
        &mut self,
        title: String,
        end_date: Timestamp,
        description: String,
        goal: u128,
        // featured_image: String,
        category_id: u8,
        country_id: u8,
        campaign_type: u8,
        // video_url: String,
        // audio_url: String,
        // gallery_imgs: Vec<String>,
        base_uri_content: String,
    ) {
        self.assert_is_user_registered(&env::predecessor_account_id().try_into().unwrap());
        assert_at_least_one_yocto();

        let before_storage_usage = env::storage_usage();
        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        let campaign = Campaign::new(
            self.next_campaign_id,
            account_id.to_owned(),
            end_date,
            title,
            goal,
            description,
            // featured_image,
            category_id,
            country_id,
            campaign_type,
            // video_url,
            // audio_url,
            // gallery_imgs,
            base_uri_content,
        );

        self.campaigns.insert(&self.next_campaign_id, &campaign);

        // Modify user campaign
        let mut new_user_campaign = self
            .campaign_per_user
            .get(&account_id.to_owned())
            .unwrap_or_else(|| {
                UnorderedSet::new(StorageKey::CampaignPerUserInnerKey {
                    account_id_hash: hash_account_id(&env::predecessor_account_id()),
                })
            });

        new_user_campaign.insert(&self.next_campaign_id);
        self.campaign_per_user
            .insert(&account_id, &new_user_campaign);

        self.next_campaign_id += 1;
        // Calculate the storage usage after the transaction
        let after_storage_usage = env::storage_usage();
        let storage_used = after_storage_usage - before_storage_usage;

        // Refund the deposit left after the transaction
        refund_deposit(storage_used);
    }

    pub fn get_campaign(&self, campaign_id: CampaignId) -> Option<Campaign> {
        self.campaigns.get(&campaign_id)
    }

    // pub fn get_campaign_paging
    pub fn get_campaign_paging_v1(
        &self,
        page_size: u64,
        page_limit: u64,
    ) -> Vec<(CampaignId, Campaign)> {
        let mut campaigns = self.campaigns.iter().collect::<Vec<_>>();

        // if campaigns is empty
        if campaigns.is_empty() {
            return vec![];
        }

        campaigns.sort_by(|a, b| a.1.created_at.cmp(&b.1.created_at));
        campaigns
            .into_iter()
            .skip((page_size * page_limit).try_into().unwrap())
            .take(page_size.try_into().unwrap())
            .collect()
    }

    pub fn get_campaign_paging(
        &self,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<Campaign> {
        let start = u128::from(from_index.unwrap_or(U128(0)));
        self.campaigns
            .values()
            .skip(start as usize)
            .take(limit.unwrap_or(0) as usize)
            .collect()
    }

    #[payable]
    pub fn edit_campaign(
        &mut self,
        campaign_id: CampaignId,
        title: Option<String>,
        end_date: Option<Timestamp>,
        description: Option<String>,
        goal: Option<u128>,
        // featured_image: Option<String>,
        category_id: Option<u8>,
        country_id: Option<u8>,
        campaign_type: Option<u8>,
        // video_url: Option<String>,
        // audio_url: Option<String>,
        // gallery_imgs: Option<Vec<String>>,
        base_uri_content: Option<String>,
    ) {
        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        self.assert_is_user_registered(&account_id);
        self.assert_is_campaign_exists(campaign_id.to_owned());
        self.assert_is_campaign_owner(campaign_id.to_owned());
        assert_at_least_one_yocto();

        let before_storage_usage = env::storage_usage();

        let mut campaign = self.campaigns.get(&campaign_id).unwrap();

        if let Some(title) = title {
            campaign.title = title;
        }

        if let Some(end_date) = end_date {
            campaign.end_date = end_date;
        }

        if let Some(description) = description {
            campaign.description = description;
        }

        if let Some(category_id) = category_id {
            campaign.category_id = category_id;
        }

        if let Some(country_id) = country_id {
            campaign.country_id = country_id;
        }

        if let Some(campaign_type) = campaign_type {
            campaign.campaign_type = campaign_type;
        }

        // if let Some(video_url) = video_url {
        //     campaign.video_url = video_url;
        // }

        // if let Some(audio_url) = audio_url {
        //     campaign.audio_url = audio_url;
        // }

        // if let Some(gallery_imgs) = gallery_imgs {
        //     campaign.gallery_imgs = gallery_imgs;
        // }
        // if let Some(featured_image) = featured_image {
        //     campaign.featured_image = featured_image;
        // }

        if let Some(end_date) = end_date {
            assert!(
                end_date > env::block_timestamp(),
                "End date must be greater than current block timestamp"
            );

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
    pub fn withdraw_campaign(&mut self, campaign_id: CampaignId) {
        // todo!("Campaign need to be approved by the owner");

        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        self.assert_is_user_registered(&account_id);
        self.assert_is_campaign_owner(campaign_id.to_owned());
        self.assert_is_campaign_funded(campaign_id.to_owned());
        self.assert_is_campaign_active(campaign_id.to_owned());
        assert_at_least_one_yocto();

        let before_storage_usage = env::storage_usage();

        let campaign = self.campaigns.get(&campaign_id).unwrap();
        let campaign_owner = campaign.author.clone();

        // Refund the deposit left after the transaction
        refund_deposit(before_storage_usage);

        // Transfer the campaign to the owner
        Promise::new(campaign_owner.to_string()).transfer(campaign.donated.into());
    }

    pub fn remove_campaign(&mut self, campaign_id: CampaignId) {
        self.assert_is_user_registered(&env::predecessor_account_id().try_into().unwrap());
        self.assert_is_campaign_owner(campaign_id.to_owned());
        self.assert_is_not_donated_yet(campaign_id.to_owned());

        self.campaigns.remove(&campaign_id);
    }

    fn assert_is_campaign_owner(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();
        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        assert_eq!(
            account_id, campaign.author,
            "Only campaign owner can edit campaign"
        );
    }

    pub fn assert_is_campaign_active(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();
        assert!(campaign.is_active, "Campaign is not active");
    }

    pub fn assert_is_campaign_funded(&self, campaign_id: CampaignId) {
        let campaign = self.campaigns.get(&campaign_id).unwrap();
        assert!(campaign.donated >= campaign.goal, "Campaign is not funded");
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

        assert!(campaign.donated == 0, "Campaign is already donated");
    }

    pub(crate) fn assert_is_campaign_exists(&self, campaign_id: CampaignId) {
        assert!(
            self.campaigns.get(&campaign_id).is_some(),
            "Campaign does not exist"
        );
    }
}
