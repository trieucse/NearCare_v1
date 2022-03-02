import SectionHero from "../components/SectionHero";
import rightImg from "../images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "../containers/SectionFounder";
import SectionStatistic from "../containers/SectionStatistic";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import BgGlassmorphism from "../components/BgGlassmorphism";
import BackgroundSection from "../components/BackgroundSection";
import Head from "next/head";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Head>
        <title>About || Blog Magazine React Template</title>
      </Head>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 space-y-16 lg:py-28 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
        />

        <SectionFounder />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionStatistic />
        </div>

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
