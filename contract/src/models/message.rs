/*
  message.rs
  @description Message for each request
  Example:
  A create a request for being a doctor
  B validate the request, then see something is missing => B create a message to A to tell him something is missing
  A respond to B with a proper information
  B approve, then close the request
  So:
  For each request, there are messages that can be access via:
  self.request_by_account_id
  self.message_by_request
*/
#![allow(unused_imports)]
use crate::*;

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Message {
    pub message_id: MessageId,
    pub base_uri_content: String,
    pub created_at: Timestamp,
    pub created_by: ValidAccountId,
}

impl Message {
    pub fn new(message_id: MessageId, base_uri_content: String) -> Self {
        Message {
            message_id,
            base_uri_content,
            created_at: env::block_timestamp(),
            created_by: env::predecessor_account_id().try_into().unwrap(),
        }
    }
}
