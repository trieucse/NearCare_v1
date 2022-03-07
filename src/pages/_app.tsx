import "../styles/globals.css";
import "../styles/index.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import "../fonts/line-awesome-1.3.0/css/line-awesome.css";
import HeaderContainer from "../containers/HeaderContainer";
import Footer from "../components/Footer";
import MediaRunningContainer from "../containers/MediaRunningContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import RegisterContainer from "../containers/RegisterContainer";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="text-base bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <HeaderContainer />
          <RegisterContainer>
            <Component {...pageProps} />
          </RegisterContainer>
          <ToastContainer />
          <Footer />
          <MediaRunningContainer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
