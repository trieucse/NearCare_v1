mod models;
mod utils;

use crate::{
    models::{Crowdfund, Donation},
    utils::{assert_self, assert_single_promise_success, AccountId, ONE_NEAR},
};

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    Promise,
};
#[allow(unused_imports)]
use near_sdk::{env, near_bindgen, PromiseIndex};
near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(Clone, Default, BorshDeserialize, BorshSerialize)]

pub struct Contract {
    owner: AccountId,
    crowdfunds: Vec<Crowdfund>,
    donations: Vec<Donation>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn init(owner: AccountId) -> Self {
        let crowdfunds: Vec<Crowdfund> = Vec::new();
        let donations: Vec<Donation> = Vec::new();

        Contract {
            owner,
            crowdfunds,
            donations,
        }
    }

    pub fn add_crowdfund(&mut self, title: String, donate: u128, description: String) {
        let id = self.crowdfunds.len() as i32;

        self.crowdfunds
            .push(Crowdfund::new(id, title, donate, description));
        env::log("Added a new crowdfund project".as_bytes());
    }

    pub fn list_crowdfunds(&self) -> Vec<Crowdfund> {
        let crowdfunds = &self.crowdfunds;

        return crowdfunds.to_vec();
    }

    pub fn crowdfund_count(&mut self) -> usize {
        return self.crowdfunds.len();
    }

    pub fn add_vote(&mut self, id: usize) {
        let crowdfund: &mut Crowdfund = self.crowdfunds.get_mut(id).unwrap();
        let voter = env::predecessor_account_id();

        crowdfund.total_votes = crowdfund.total_votes + 1;
        env::log("vote submitted succesfully".as_bytes());
        crowdfund.votes.push(voter);
    }

    pub fn add_donation(&mut self, id: usize, amount: u128) {
        let transfer_amount: u128 = ONE_NEAR * amount;

        let crowdfund: &mut Crowdfund = self.crowdfunds.get_mut(id).unwrap();

        crowdfund.total_donations = crowdfund.total_donations + transfer_amount;
        self.donations.push(Donation::new());

        Promise::new(env::predecessor_account_id()).transfer(transfer_amount);

        env::log("You have donated succesfully".as_bytes());
    }

    pub fn get_total_donations(&mut self, id: usize) -> u128 {
        let crowdfund: &mut Crowdfund = self.crowdfunds.get_mut(id).unwrap();
        return crowdfund.total_donations;
    }
}
