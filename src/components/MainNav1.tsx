import React, { FC, useEffect } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "./ButtonPrimary";
import MenuBar from "./MenuBar";
import DarkModeContainer from "../containers/DarkModeContainer";
import { initContract, login, logout } from "../utils/utils";
import { loginMod, logoutMod, selectLoginState } from "../app/login/login";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export interface MainNav1Props {
  isTop: boolean;
}
const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  const loginState = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initContract().then(() => {
      console.log("Contract loaded");
      if(!window.walletConnection.isSignedIn()) {
        console.log("Not signed in");
        dispatch(logoutMod());
        
      }
      else{
        console.log("Signed in");
        dispatch(loginMod());
      }

    });
    // console.log("loginState: ", loginState);
  }, []); 
  return (
    <div
      className={`nc-MainNav1 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <DarkModeContainer />
            <SearchDropdown />
            <div className="px-1" />
            {!loginState? <ButtonPrimary onClick={login}>Login with NEAR</ButtonPrimary> :
            <ButtonPrimary onClick={logout}>{window.accountId}</ButtonPrimary>} 
           
          </div>
          <div className="flex items-center xl:hidden">
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
