import React, { FC } from "react";
import Avatar from "./Avatar";
import { CampaignDataType } from "../data/types";
import Link from "next/link";
import formatDate from "../utils/timestamp2date";

export interface PostCardMetaProps {
  className?: string;
  meta: Pick<CampaignDataType, "end_date" | "author">;
  hiddenAvatar?: boolean;
  size?: "large" | "normal";
}

const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  size = "normal",
}) => {
  const { end_date, author } = meta;

  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-base"
      } ${className}`}
      data-nc-id="PostCardMeta"
    >
      {/* TODO */}
      <Link href={author}>
        <a className="relative flex items-center space-x-2">
          {!hiddenAvatar && (
            <Avatar
              radius="rounded-full"
              sizeClass={
                size === "normal" ? "h-7 w-7 text-sm" : "h-10 w-10 text-xl"
              }
              imgUrl="https://robohash.org/assumendasintperferendis.png?size=150x150&set=set1"
              userName={author}
            />
          )}
          <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
            {author}
          </span>
        </a>
      </Link>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal">
          <i className="las la-hourglass-end"></i>{" "}
          {formatDate(end_date.toString().substring(0, 13))}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;
