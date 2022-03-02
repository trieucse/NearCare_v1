import '../styles/globals.css'
import "../styles/index.scss";
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { persistor,store } from '../app/store';
import { PersistGate } from 'redux-persist/integration/react';
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";
import HeaderContainer from '../containers/HeaderContainer';
import Footer from '../components/Footer';
import MediaRunningContainer from '../containers/MediaRunningContainer';

function MyApp({ Component, pageProps }: AppProps) {

  // useEffect(
  //   () => {
  //     // in this case, we only care to query the contract when signed in
  //     if (window.walletConnection.isSignedIn()) {
  //       // window.contract is set by initContract in index.js
  //       window.contract.list_crowdfunds().then((crowdfundprojects) => {
  //         const crowdfundList = [...crowdfundprojects]
  //         setCrowdfunds(crowdfundList)
  //       })
  //     }
  //   },

  //   // The second argument to useEffect tells React when to re-run the effect
  //   // Use an empty array to specify "only run on first render"
  //   // This works because signing into NEAR Wallet reloads the page
  //   [crowdfunds],
  // )
  return(
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <HeaderContainer />
          <Component {...pageProps} /> 
          <Footer />
          <MediaRunningContainer />
        </div>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
