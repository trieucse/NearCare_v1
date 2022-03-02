import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from '../config'


const nearConfig = getConfig(process.env.NODE_ENV || 'development')
declare global {
  interface Window {
    walletConnection: WalletConnection;
    contract: any;
    accountId: string;
  }
}

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() }, headers: {} }, nearConfig))
  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near, null)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    // Change methods can modify the state. But you don't receive the returned value when called.
    viewMethods: ['get_campaign_paging', 'get_user'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['register_user', 'update_user', 'create_campaign', 'edit_campaign', 'withdraw_campaign', 'remove_campaign'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  // console.log(nearConfig.contractName);

  window.walletConnection.requestSignIn(nearConfig.contractName)
}


