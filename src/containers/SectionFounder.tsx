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

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Trieu Mai`,
    job: "Co-founder and Developer",
    avatar: travata.src,
  },
  {
    id: "4",
    name: `Tin Nguyen`,
    job: "Co-founder and Developer",
    avatar: tinavata.src,
  },
];

const SectionFounder = () => {
  return (
    <div className="relative nc-SectionFounder">
      <Heading desc="we are just idiots who want to explore the world">
        ⛱ Founder
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
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
  );
};

export default SectionFounder;
