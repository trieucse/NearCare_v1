import React from "react";
import Link from "next/link";
import logoImg from "../images/logo.png";
import logoLightImg from "../images/logo-light.png";
import LogoSvg from "./LogoSvg";

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
}) => {
  return (
    <Link href="/">
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      <a  className="ttnc-logo inline-block text-primary-6000"> 
      <LogoSvg />
      </a>
    </Link>
  );
};

export default Logo;
