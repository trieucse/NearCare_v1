use crate::*;
/// Account Ids in Near are just strings.
pub type AccountId = String;

/// Gas is u64
pub type Gas = u64;

/// Amounts, Balances, and Money in NEAR are u128.
pub type Amount = u128;

pub type Balance = Amount;

pub type Money = Amount;

/// Timestamp in NEAR is a number.
// pub type Timestamp = u64;

///
/// == CONSTANTS ================================================================
///
/// TODO: revist MIN_ACCOUNT_BALANCE after some real data is included b/c this
/// could end up being much higher

/// ONE_NEAR = unit of NEAR token in yocto Ⓝ (1e24)
pub const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000 as u128;

/// XCC_GAS = gas for cross-contract calls, ~5 Tgas (teragas = 1e12) per "hop"
pub const XCC_GAS: Gas = 20_000_000_000_000;

/// MIN_ACCOUNT_BALANCE = 3 NEAR min to keep account alive via storage staking
pub const MIN_ACCOUNT_BALANCE: u128 = ONE_NEAR * 3;

/// == FUNCTIONS ================================================================

/// Converts Yocto Ⓝ token quantity into NEAR, as a String
pub fn as_near(amount: u128) -> String {
    format!("{}", amount / ONE_NEAR)
}

/// Converts a quantity in NEAR into Yocto Ⓝ tokens
pub fn to_yocto<D: Into<u128>>(amount: D) -> u128 {
    ONE_NEAR * amount.into()
}

/// Asserts that the contract has called itself
pub fn assert_self() {
    let caller = env::predecessor_account_id();
    let current = env::current_account_id();

    assert_eq!(caller, current, "Only this contract may call itself");
}

/// Asserts that only a single promise was received, and successful
pub fn assert_single_promise_success() {
    assert_eq!(
        env::promise_results_count(),
        1,
        "Expected exactly one promise result",
    );

    match env::promise_result(0) {
        PromiseResult::Successful(_) => return,
        _ => panic!("Expected PromiseStatus to be successful"),
    };
}

pub(crate) fn refund_deposit(storage_used: u64) {
    let required_cost = env::storage_byte_cost() * Balance::from(storage_used);
    let attached_deposit = env::attached_deposit();

    assert!(
        required_cost <= attached_deposit,
        "Must attach {} yoctoNear to cover storage {}",
        required_cost,
        attached_deposit
    );

    let refund = attached_deposit - required_cost;

    if refund > 1 {
        Promise::new(env::predecessor_account_id()).transfer(refund);
    }
}

pub(crate) fn assert_at_least_one_yocto() {
    assert!(
        env::attached_deposit() >= 1,
        "Requires attached deposit of at least 1 yoctoNEAR"
    )
}

pub(crate) fn hash_account_id(account_id: &AccountId) -> CryptoHash {
    //get the default hash
    let mut hash = CryptoHash::default();
    //we hash the account ID and return it
    hash.copy_from_slice(&env::sha256(account_id.as_bytes()));
    hash
}
