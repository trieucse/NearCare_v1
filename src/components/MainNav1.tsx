import React, { FC, useEffect } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "./ButtonPrimary";
import MenuBar from "./MenuBar";
import DarkModeContainer from "../containers/DarkModeContainer";
import { initContract, login, logout } from "../utils/utils";
import { loginWithUser, loginWallet, logoutMod, selectLoginState } from "../app/login/login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, DocumentAddIcon, LogoutIcon, UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { PayloadAction } from "@reduxjs/toolkit";
import { NearAuthorType } from "../data/types";
import axios from "axios";

export interface MainNav1Props {
  isTop: boolean;
}
const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  const loginState = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initContract().then(async () => {
      console.log("Contract loaded");
      if (!window.walletConnection.isSignedIn()) {
        console.log("Not signed in");
        dispatch(logoutMod());

      }
      else {
        console.log("Signed in");

        if (window.walletConnection.isSignedIn()) {
          try {
            dispatch(loginWallet());

            // Check if user is registered, login with user
            const user = await window.contract.get_user({ user_id: window.accountId });

            const { base_uri_content } = user;

            if (base_uri_content) {
              const content = await axios.get<any, any>(`https://ipfs.io/ipfs/${base_uri_content}`);

              const { avatar, bgImage, displayName, email, desc, jobName } = content;

              console.log(avatar, bgImage, displayName, email, desc, jobName);
            }
            console.log(base_uri_content, user)
          }
          catch (error) {
            console.log("IPFS url not found");
          }
        }
        // console.log("loginState: ", loginState);
      }
    });
  }, []);

  return (
    <div
      className={`nc-MainNav1 relative z-10 ${isTop ? "onTop " : "notOnTop backdrop-filter"
        }`}
    >
      <div className="container relative flex items-center justify-between py-5 space-x-4 xl:space-x-8">
        <div className="flex items-center justify-start flex-grow space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex items-center justify-end flex-shrink-0 space-x-1 text-neutral-700 dark:text-neutral-100">
          <div className="items-center hidden space-x-1 xl:flex">
            <DarkModeContainer />
            <SearchDropdown />
            <div className="px-1" />
            {!loginState ? <ButtonPrimary onClick={login}>Login with NEAR</ButtonPrimary> :

              (
                <div className="relative z-50">
                  <Menu>
                    <Menu.Button as="span">
                      <ButtonPrimary>
                        {window.walletConnection.isSignedIn() && (
                          <>
                            {window.accountId}

                            <ChevronDownIcon className="w-6 h-6 text-gray-400"></ChevronDownIcon>
                          </>
                        )}
                      </ButtonPrimary>
                    </Menu.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute right-0 flex flex-col p-1 mt-1 bg-white rounded shadow-md ring-1 ring-black ring-opacity-5 w-60 dark:text-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-700">
                        <Menu.Item
                          as={Link}
                          href={`/profile/${window.accountId}`}
                        >
                          <a
                            className="inline-flex items-center gap-2 px-3 py-2 mt-4 text-base bg-white border-0 rounded focus:outline-none hover:bg-indigo-400 hover:text-white md:mt-0 dark:text-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-800"
                          >
                            <UserIcon className="w-4 h-4"></UserIcon>
                            <span>Profile</span>
                          </a>
                        </Menu.Item>
                        <Menu.Item
                          as="button"
                          className="inline-flex items-center gap-2 px-3 py-2 mt-4 text-base bg-white border-0 rounded focus:outline-none hover:bg-indigo-400 hover:text-white md:mt-0 dark:text-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-800"
                          onClick={logout}
                        >
                          <LogoutIcon className="w-4 h-4" />
                          Logout
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>

              )

            }

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
