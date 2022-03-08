import React, { FC } from "react";
import { CampaignDataType } from "../data/types";
import Link from "next/link";
import Avatar from "./Avatar";
import formatDate from "../utils/timestamp2date";

export interface CardAuthor2Props
  extends Pick<CampaignDataType, "end_date" | "author"> {
  className?: string;
  // readingTime?: CampaignDataType["readingTime"];
  hoverReadingTime?: boolean;
}

const CardAuthor2: FC<CardAuthor2Props> = ({
  className = "",
  author,
  // readingTime,
  end_date,
  hoverReadingTime = true,
}) => {
  // const { displayName, href = "/", avatar } = author;
  return (
    <Link href={"#"} data-nc-id="CardAuthor2">
      <a
        className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
      >
        <Avatar
          sizeClass="h-10 w-10 text-base"
          containerClassName="flex-shrink-0 mr-3"
          radius="rounded-full"
          imgUrl="https://robohash.org/assumendasintperferendis.png?size=150x150&set=set1"
          userName={author}
        />
        <div>
          <h2
            className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
          >
            {author}
          </h2>
          <span
            className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
          >
            <span>
              <i className="las la-hourglass-end"></i>{" "}
              {formatDate(end_date.toString().substring(0, 13))}
            </span>
          </span>
        </div>
      </a>
    </Link>
  );
};

export default CardAuthor2;
