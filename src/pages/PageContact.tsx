import React, { FC } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import Input from "../components/Input";
import Label from "../components/Label";
import LayoutPage from "../components/LayoutPage";
import SocialsList from "../components/SocialsList";
import Textarea from "../components/Textarea";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import Head from "next/head";

export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageContact ${className}`} data-nc-id="PageContact">
      <Head>
        <title>Contact || Blog Magazine React Template</title>
      </Head>
      <LayoutPage
        subHeading="Drop us message and we will get back for you."
        headingEmoji=""
        heading="Contact us"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="max-w-sm space-y-6">
            {info.map((item, index) => (
              <div key={index}>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  {item.title}
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </span>
              </div>
            ))}
            <div>
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                🌏 SOCIALS
              </h3>
              <SocialsList className="mt-2" />
            </div>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
          <div>
            <form className="grid grid-cols-1 gap-6" action="#" method="post">
              <label className="block">
                <Label>Full name</Label>

                <Input placeholder="Example Doe" type="text" className="mt-1" />
              </label>
              <label className="block">
                <Label>Email address</Label>

                <Input
                  type="email"
                  placeholder="example@example.com"
                  className="mt-1"
                />
              </label>
              <label className="block">
                <Label>Message</Label>

                <Textarea className="mt-1" rows={6} />
              </label>
              <ButtonPrimary type="submit">Send Message</ButtonPrimary>
            </form>
          </div>
        </div>
      </LayoutPage>

      {/* OTHER SECTIONS */}
      <div className="container pb-16 lg:pb-28">
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageContact;
