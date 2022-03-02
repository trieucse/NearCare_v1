import React, { FC, useEffect, useRef, useState } from "react";
import useAccount from "../hooks/useAccount";
import { Alert } from "./Alert";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import MainNav1 from "./MainNav1";
import NcModal from "./NcModal";
import SectionHero from "./SectionHero";
export interface HeaderProps {
  mainNavStyle?: "style1" | "style2";
}

const Header: FC<HeaderProps> = ({ mainNavStyle = "style1" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  // const progressBarRef = useRef<HTMLDivElement>(null);
  let prevScrollpos = window.pageYOffset;
  const [isTop, setIsTop] = useState(true);

  const { account, registered } = useAccount();

  useEffect(() => {
    if (!mainMenuRef.current) {
      return;
    }
    let mainMenuHeight = mainMenuRef.current.offsetHeight;
    window.onscroll = function () {
      showHideHeaderMenu(mainMenuHeight);
    };
  }, []);


  const showHideHeaderMenu = (mainMenuHeight: number) => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;
    if (!mainMenuRef.current) return;

    // SET BG
    if (prevScrollpos < currentScrollPos) {
      currentScrollPos > mainMenuHeight ? setIsTop(false) : setIsTop(true);
    } else {
      currentScrollPos > 0 ? setIsTop(false) : setIsTop(true);
    }

    // SHOW _ HIDE MAIN MENU
    if (prevScrollpos > currentScrollPos) {
      containerRef.current.style.top = "0";
    } else {
      containerRef.current.style.top = `-${mainMenuHeight + 2}px`;
    }
    prevScrollpos = currentScrollPos;
  };

  const renderMainNav = () => {
    switch (mainNavStyle) {
      case "style1":
        return <MainNav1 isTop={isTop} />;

      default:
        return <MainNav1 isTop={isTop} />;
    }
  };

  return (
    <>
      <div
        className="sticky top-0 left-0 right-0 z-40 w-full transition-all nc-Header nc-will-change-top"
        ref={containerRef}
      >
        {/* RENDER MAIN NAVIGATION */}
        <div ref={mainMenuRef}>{renderMainNav()}</div>
      </div>

      {/* REGISTER ACCOUNT */}
      {account && account.user && (<>
        <div className="flex justify-center gap-2">

          <ButtonPrimary className="rounded-none" onClick={() => {
            window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Individual", base_uri_content: "abcd", description: "This is Tin" })
          }}>
            Register as individual account
          </ButtonPrimary>
          <ButtonPrimary className="rounded-none" onClick={() => {
            window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Company", base_uri_content: "abcd", description: "This is Tin" })
          }}>
            Register as company account
          </ButtonPrimary>
        </div>

      </>)}
    </>
  );
};

export default Header;
