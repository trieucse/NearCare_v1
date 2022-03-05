#![allow(unused_imports)]
use crate::models::admin::*;
use crate::models::user::UserType;
use crate::*;

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub enum RequestType {
    Unknown,
    DoctorRequest,
    WithdrawRequest,
    BookingRequest,
    CompanyRequest,
    VolunteerRequest,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Request {
    pub request_id: RequestId,
    pub base_uri_content: String,
    pub request_type: RequestType,
    pub created_at: Timestamp,
    pub created_by: ValidAccountId,
    pub is_closed: bool,
    pub is_accepted: bool,
}

impl Request {
    // Create a new doctor request
    pub fn new(request_id: RequestId, base_uri_content: String, request_type: RequestType) -> Self {
        Request {
            request_id,
            base_uri_content,
            created_at: env::block_timestamp(),
            created_by: env::predecessor_account_id().try_into().unwrap(),
            request_type,
            is_accepted: false,
            is_closed: false,
        }
    }
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn create_request(
        &mut self,
        base_uri_content: String,
        request_type: RequestType,
    ) -> RequestId {
        let before_storage_usage = env::storage_usage();

        // At least 1 yocto and doctor request is not already created
        assert_at_least_one_yocto();

        // Create a new doctor request and insert it into the storage
        let request = Request::new(
            self.next_request_id,
            base_uri_content.to_owned(),
            request_type,
        );
        self.requests.insert(&self.next_voting_id, &request);

        let account_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();

        // Update user request mapping
        let mut user_requests = self
            .request_by_account_id
            .get(&account_id)
            .unwrap_or_else(|| {
                UnorderedSet::new(StorageKey::RequestByAccountIdInnerKey {
                    account_id_hash: hash_account_id(&env::predecessor_account_id()),
                })
            });

        user_requests.insert(&self.next_voting_id);

        self.next_request_id += 1;

        self.request_by_account_id.insert(
            &env::predecessor_account_id().try_into().unwrap(),
            &user_requests,
        );

        // Calculate the storage usage after the transaction
        let after_storage_usage = env::storage_usage();
        let storage_used = after_storage_usage - before_storage_usage;

        // Refund the deposit left after the transaction
        refund_deposit(storage_used);

        log!(
            "create_request: {} with content of {}, storage usaged: {}",
            self.next_voting_id,
            &base_uri_content,
            storage_used
        );

        request.request_id
    }

    pub fn get_request_paging(
        &self,
        from_index: Option<RequestId>,
        limit: Option<u64>,
    ) -> Vec<Request> {
        let start = u128::from(from_index.unwrap_or(0));
        self.requests
            .values()
            .skip(start as usize)
            .take(limit.unwrap_or(0) as usize)
            .collect()
    }

    pub fn get_request_by_account_id(&self, account_id: ValidAccountId) -> Vec<Request> {
        match self.request_by_account_id.get(&account_id) {
            Some(requests) => {
                return self
                    .request_by_account_id
                    .get(&account_id)
                    .unwrap()
                    .iter()
                    .map(|request_id| self.requests.get(&request_id).unwrap())
                    .collect()
            }
            None => {
                return vec![];
            }
        }
    }

    pub fn get_request_is_accepted(&self, request_id: RequestId) -> bool {
        self.requests.get(&request_id).unwrap().is_accepted
    }

    pub fn get_request_by_id(&self, request_id: RequestId) -> Option<Request> {
        self.requests.get(&request_id)
    }

    // Accept request
    pub fn accept_request(&mut self, request_id: RequestId) -> bool {
        self.assert_is_admin(env::predecessor_account_id().try_into().unwrap());

        // Get request
        let mut request = self.requests.get(&request_id).unwrap_or_else(|| {
            panic!("Request not found: {}", request_id);
        });
        // Check if request is already accepted
        assert!(!request.is_accepted, "Request is already accepted");

        //
        match request.request_type {
            // RequestType::DoctorRequest => {
            //     let doctor = Doctor::new(
            //         request.created_by.to_owned(),
            //         request.base_uri_content.to_owned(),
            //     );

            //     // Insert doctor into the storage, panic if doctor already exists
            //     self.doctors
            //         .insert(&request.created_by, &doctor)
            //         .unwrap_or_else(|| {
            //             panic!("Doctor already exists: {}", request.created_by);
            //         });

            //     // Log
            //     log!(
            //         "Accepted doctor request: {} with content of {}",
            //         request_id,
            //         &request.base_uri_content
            //     );
            // }
            RequestType::WithdrawRequest => {
                todo!();

                // Log
                log!(
                    "Accepted withdraw request: {} with content of {}",
                    request_id,
                    &request.base_uri_content
                );
            }
            RequestType::CompanyRequest => {
                let mut user = self.users.get(&request.created_by).unwrap_or_else(|| {
                    panic!(
                        "User not found or is not registered yet:  {}",
                        request.created_by
                    );
                });

                user.user_type = UserType::Company;

                self.users.insert(&request.created_by, &user);

                // Log
                log!(
                    "Accepted company request: {} with content of {}",
                    request_id,
                    &request.base_uri_content
                );
            }
            RequestType::VolunteerRequest => {
                let mut user = self.users.get(&request.created_by).unwrap_or_else(|| {
                    panic!(
                        "User not found or is not registered yet:  {}",
                        request.created_by
                    );
                });

                user.user_type = UserType::Volunteer;

                self.users.insert(&request.created_by, &user);

                // Log
                log!(
                    "Accepted volunteer request: {} with content of {}",
                    request_id,
                    &request.base_uri_content
                );
            }
            _ => {
                panic!("Request type not supported");
            }
        }

        // Set is accepted to true
        request.is_accepted = true;
        request.is_closed = true;

        self.requests.insert(&request_id, &request);

        true
    }

    pub fn decline_request(&mut self, request_id: RequestId) {
        self.assert_is_admin(env::predecessor_account_id().try_into().unwrap());

        // Get request
        let mut request = self.requests.get(&request_id).unwrap_or_else(|| {
            panic!("Request not found: {}", request_id);
        });

        // Check if request is already accepted
        assert!(!request.is_accepted, "Request is already accepted");

        // Set is accepted to true
        request.is_closed = true;

        self.requests.insert(&request_id, &request);

        log!(
            "Declined request: {} with content of {}",
            request_id,
            &request.base_uri_content
        );
    }
}
