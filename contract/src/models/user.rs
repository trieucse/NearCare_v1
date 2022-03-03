/*
1.recipient
    Who?
        - everyone(kyc)
    Permission:
        - create, edit, delete, stop campaign
        - upload proof
                - withdraw donate
        - mind nft and write "thank you" to the donor
*/
#![allow(unused_imports)]
use crate::models::request::RequestType;
use crate::*;

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub enum UserType {
    Company,
    Individual,
    Volunteer,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    pub name: String,
    pub description: String,
    pub user_type: UserType,
    pub base_uri_content: String,
}

impl User {
    pub fn new(
        name: String,
        description: String,
        user_type: UserType,
        base_uri_content: String,
    ) -> Self {
        Self {
            name,
            description,
            base_uri_content,
            user_type,
        }
    }
}

#[near_bindgen]
impl Contract {
    pub(crate) fn assert_is_user_registered(&self, user_id: &UserId) {
        assert!(
            self.users.get(user_id).is_some(),
            "{} is not a registered user",
            user_id
        );
    }

    pub(crate) fn assert_is_user_not_registered(&self, user_id: &UserId) {
        assert!(
            self.users.get(user_id).is_none(),
            "{} is already a registered user",
            user_id
        );
    }

    pub fn assert_is_volunteer(&self, user_id: &UserId) {
        let user = self
            .users
            .get(user_id)
            .unwrap_or_else(|| panic!("{} is not a registered user", user_id));

        match user.user_type {
            UserType::Volunteer => (),
            _ => panic!("{} is not a volunteer", user_id),
        }
    }

    pub fn get_user(&self, user_id: &UserId) -> User {
        self.users
            .get(user_id)
            .unwrap_or_else(|| panic!("{} is not a registered user", user_id))
    }

    #[payable]
    pub fn register_user(
        &mut self,
        name: String,
        user_type: UserType,
        description: String,
        base_uri_content: String,
    ) -> bool {
        let user_id: ValidAccountId = env::predecessor_account_id().try_into().unwrap();
        self.assert_is_user_not_registered(&user_id);

        assert_at_least_one_yocto();
        let before_storage_usage = env::storage_usage();

        match user_type {
            UserType::Company => {
                self.create_request(base_uri_content.to_owned(), RequestType::CompanyRequest);

                log!(
                    "A request for company {} has been created, info: {}",
                    env::predecessor_account_id(),
                    base_uri_content.to_owned()
                );
            }
            UserType::Individual => {
                let new_user = User::new(name, description, user_type, base_uri_content.clone());

                self.users.insert(&user_id, &new_user);

                log!(
                    "User {} has been registered, info: {}",
                    env::predecessor_account_id(),
                    base_uri_content
                );
            }
            UserType::Volunteer => {
                let new_user = User::new(name, description, user_type, base_uri_content.clone());

                self.users.insert(&user_id, &new_user);

                log!(
                    "User {} has been registered, info: {}",
                    env::predecessor_account_id(),
                    base_uri_content
                );
            }
            _ => {
                panic!("Unsupported user type");
            }
        }

        // Calculate the storage usage after the transaction
        let after_storage_usage = env::storage_usage();
        let storage_used = after_storage_usage - before_storage_usage;

        // Refund the deposit left after the transaction
        refund_deposit(storage_used);

        true
    }

    pub fn update_user(
        &mut self,
        user_id: UserId,
        name: Option<String>,
        description: Option<String>,
    ) {
        assert!(
            self.users.get(&user_id).is_some(),
            "{} is not a registered user",
            &user_id
        );

        let user = self.users.get(&user_id).unwrap();

        match user.user_type {
            UserType::Company => {
                panic!("Company users cannot be updated");
            }
            UserType::Individual => {
                let mut user = self.users.get(&user_id).unwrap();

                if let Some(name) = name {
                    user.name = name;
                }

                if let Some(description) = description {
                    user.description = description;
                }

                self.users.insert(&user_id, &user);
            }
            UserType::Volunteer => {
                panic!("Volunteer users cannot be updated");
            }
            _ => {
                panic!("Unsupported user type");
            }
        }
    }
}
