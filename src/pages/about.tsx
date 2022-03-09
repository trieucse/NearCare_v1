import SectionHero from "../components/SectionHero";
import rightImg from "../images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "../containers/SectionFounder";
import SectionStatistic from "../containers/SectionStatistic";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import BgGlassmorphism from "../components/BgGlassmorphism";
import BackgroundSection from "../components/BackgroundSection";
import Head from "next/head";
import SectionFounder2 from "../containers/SectionFounder2";

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
          rightImg={
            "https://media-cdn.tripadvisor.com/media/photo-s/18/81/fd/21/caption.jpg"
          }
          heading="👋 About Us."
          btnText=""
          subHeading="There’s a part of every one of us that dreams of a better world. That spark of inspiration to help a person, fix a neighborhood, or even change a nation. At NearCare, we empower both individuals and charities to turn compassion into action. Because that is how change happens.

          With fundraising for all, we are creating the giving layer of the internet: a space where individuals, teams, organisations, and nonprofits can champion causes that matter and raise money to make a lasting difference. Through NearCare, people and organisations have the tools they need to share their cause far and wide and harness the power of generosity. We are transforming the way people give and changing lives—are you ready to join us?"
        />

        <SectionFounder />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionFounder2 />
        </div>

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
