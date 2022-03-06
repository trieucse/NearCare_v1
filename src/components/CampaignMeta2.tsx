import React, { FC } from "react";
import Avatar from "./Avatar";
import { CampaignDataType, PostDataType } from "../data/types";
import Link from "next/link";

export interface CampaignMeta2Props {
  className?: string;
  meta: Pick<CampaignDataType, "end_date" | "author" | "category">;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const CampaignMeta2: FC<CampaignMeta2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { end_date, author, category } = meta;
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
      data-nc-id="PostMeta2"
    >
      <Link href={author}>
        <a className="flex items-center space-x-2">
          <Avatar
            radius={avatarRounded}
            sizeClass={
              size === "normal"
                ? "h-6 w-6 text-sm"
                : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
            }
            imgUrl={
              "https://robohash.org/assumendasintperferendis.png?size=150x150&set=set1"
            }
            userName={author}
          />
        </a>
      </Link>
      <div className="ml-3">
        <div className="flex items-center">
          <Link href={author}>
            <a className="block font-semibold">{author}</a>
          </Link>

          {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ml-0">
                <span className="text-xs">🏷 </span>
                {/* {categories.map((cat, index) => ( */}
                <Link href={category.name}>
                  <a href="">{category.name}</a>
                </Link>
                {/* ))} */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignMeta2;
