import Heading from "./Heading";
import { NearAuthorType } from "../data/types";
import React, { FC } from "react";
import CardAuthorBox from "./CardAuthorBoxNear";

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors: NearAuthorType[];
}

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors,
}) => {
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc="Rating based on volume" isCenter>
        Top 10 Donors
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 ">
        {authors.map((author) => (
          <CardAuthorBox key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridAuthorBox;