import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import getConfig from "../config";

const nearConfig = getConfig(process.env.NODE_ENV || "development");
declare global {
  interface Window {
    walletConnection: WalletConnection;
    contract: any;
    accountId: string;
  }
}

export const ONE_NEAR = "1000000000000000000000000"; // YOCTO
export const ONE_NEAR_ZERO = "000000000000000000000000"; // YOCTO
export const STAKING_STORAGE_AMOUNT = "10000000000000000000000"; //0.01 near
export const GAS = "300000000000000";

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      {
        deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
        headers: {},
      },
      nearConfig
    )
  );
  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near, null);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      // Change methods can modify the state. But you don't receive the returned value when called.
      viewMethods: [
        "get_request_by_id",
        "get_total_request_count",
        "get_campaign_paging",
        "get_request_by_account_id",
        "get_user",
        "get_request_paging",
        "get_campaign",
        "get_valid_campaigns_paging"
      ],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        "donate",
        "like",
        "create_request",
        "accept_request",
        "decline_request",
        "register_user",
        "update_user",
        "create_campaign",
        "edit_campaign",
        "withdraw_campaign",
        "remove_campaign",
      ],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  // console.log(nearConfig.contractName);

  window.walletConnection.requestSignIn(nearConfig.contractName);
}

/**
 * Parse token amount to human readable value
 * @param amount
 * @param decimals
 */
export function parseTokenWithDecimals(amount: number, decimals: number) {
  let amountD = amount / Math.pow(10, decimals);
  return Math.floor(amountD * 100) / 100;
}

/**
 * Return int number and decimals
 * @param num float number
 */
export function parseFloatToInt(num: number) {
  let numString: string[] = num.toString().split(".");

  if (numString.length == 1) {
    return {
      num: parseInt(numString[0]),
      dec: 0,
    };
  }

  if (numString.length == 2) {
    return {
      num: parseInt(numString.join("")),
      dec: numString[1].length,
    };
  }
}

export function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
