import Heading from "../components/Heading";
import NcImage from "../components/NcImage";
import React from "react";
import tinavata from "../images/tin.png";
import travata from "../images/trieu.jpg";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const AD_DEMO: People[] = [
  {
    id: "1",
    name: ``,
    job: "",
    avatar:
      "https://www.pngall.com/wp-content/uploads/10/NEAR-Protocol-Crypto-Logo.png",
  },
  {
    id: "1",
    name: ``,
    job: "",
    avatar:
      "data:image/png;base64,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",
  },
  {
    id: "1",
    name: ``,
    job: "",
    avatar:
      "https://yt3.ggpht.com/tMaWDPZYGc9Oo6NLcRo2p4rhVDeAuUYoyLE9BGtEpeef2Q3gVsBpckV2GlJ7wyLtxVq5voEg=s176-c-k-c0x00ffffff-no-rj",
  },
];

const SectionFounder2 = () => {
  return (
    <>
      <div className="relative nc-SectionFounder">
        <Heading desc="">Sponsor</Heading>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
          {AD_DEMO.map((item) => (
            <div key={item.id} className="max-w-sm">
              <NcImage
                containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
                className="absolute inset-0 object-cover"
                src={item.avatar}
              />
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
                {item.job}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionFounder2;
