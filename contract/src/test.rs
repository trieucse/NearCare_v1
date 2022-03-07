//allow unused imports
#![allow(unused_imports)]
use crate::*;

#[cfg(test)]
mod tests {
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{testing_env, Balance};
    use near_sdk::{MockedBlockchain, VMContext};

    use super::*;

    fn get_context(_input: Vec<u8>, is_view: bool) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();

        builder
            .current_account_id("contract1_npmrunstart_testnet".try_into().unwrap())
            .predecessor_account_id("alice_near".try_into().unwrap())
            .is_view(is_view)
            .signer_account_id("alice_near".try_into().unwrap())
            .signer_account_pk(vec![0, 1, 2])
            .account_balance(10_000_000_000_000_000_000_000u128.into())
            .account_locked_balance(0);

        builder
    }

    //user test

    //campaign test
    #[test]
    fn create_a_campaign() {
        // let mut context = get_context(vec![], false);
        // testing_env!(context
        //     // .storage_usage(env::storage_usage())
        //     .attached_deposit(3_090_000_000_000_000_000_000)
        //     .predecessor_account_id(accounts(0))
        //     .build());

        // let owner_id: ValidAccountId = "npmrunstart".to_string().try_into().unwrap();
        // let doctor_name = "Tin Nguyen".to_string();
        // let doctor_dob: Timestamp = 987605284000000;

        //let mut contract = Contract::new(owner_id.clone(), "".to_owned().try_into().unwrap());

        //assert!(contract.admins.get(&owner_id).is_some());
    }

    //donation test
    #[test]
    fn get_top_donors(){
        // //get top donor accounts testing_env
        // let mut context = get_context(vec![], false);
        // testing_env!(context
        //     // .storage_usage(env::storage_usage())
        //     .attached_deposit(3_090_000_000_000_000_000_000)
        //     .predecessor_account_id(accounts(0))
        //     .build());
        // let mut contract = Contract::default();
        // // contract.donate(0);
        // contract.donations.insert(&1,
        //     &Donation::new(
        //         0,
        //         "alice_near".try_into().unwrap(),
        //         Balance::from(1_000_000_000_000_000_000_000u128),
        //         0,
        //     )
        // );
        // contract.donations.insert(&2,
        //     &Donation::new(
        //         0,
        //         "alice_near".try_into().unwrap(),
        //         Balance::from(2_000_000_000_000_000_000_000u128),
        //         1,
        //     )
        // );

        // contract.donations.insert(&3,
        //     &Donation::new(
        //         0,
        //         "alice_near".try_into().unwrap(),
        //         Balance::from(3_000_000_000_000_000_000_000u128),
        //         2,
        //     )
        // );

        // contract.donations.insert(&4,
        //     &Donation::new(
        //         0,
        //         "alice_near".try_into().unwrap(),
        //         Balance::from(4_000_000_000_000_000_000_000u128),
        //         0,
        //     )
        // );

        // contract.donations.insert(&5,
        //     &Donation::new(
        //         0,
        //         "alice_near".try_into().unwrap(),
        //         Balance::from(1_000_000_000_000_000_000_000u128),
        //         0,
        //     )
        // );

        // contract.donations.insert(&6,
        //     &Donation::new(
        //         0,
        //         "alice_near".try_into().unwrap(),
        //         Balance::from(2_000_000_000_000_000_000_000u128),
        //         0,
        //     )
        // );
        // let top = contract.get_top_donors();
        // // debug top
        // for i in top.iter() {
        //     println!("{:?}", i.0);
        // }

        // assert_eq!(top.len(), 1);

    }

    //vote test
}
