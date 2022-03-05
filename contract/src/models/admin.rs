#![allow(unused_imports)]
use crate::*;

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Admin {
    pub account_id: ValidAccountId,
    pub memo: String,
    pub grant_time: Timestamp,
    pub base_uri_content: String,
}

impl Admin {
    pub fn new(account_id: ValidAccountId, memo: String, base_uri_content: String) -> Self {
        Self {
            account_id,
            memo,
            grant_time: env::block_timestamp(),
            base_uri_content,
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn assert_is_admin(&self, admin_id: ValidAccountId) {
        assert!(
            self.admins.get(&admin_id).is_some() || self.owner == admin_id.to_string(),
            "{} is not an admin",
            admin_id
        );
    }

    // pub fn make_admin(&mut self, admin_id: ValidAccountId, memo: String, base_uri_content: String) {
    //     todo!();
    // }
}
