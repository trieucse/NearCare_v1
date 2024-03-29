import React, { FC, useState } from "react";
import PostCardSaveAction from "./PostCardSaveAction";
import { PostDataType } from "../data/types";
import Link from "next/link";
import CategoryBadgeList from "./CategoryBadgeList";
import PostCardLikeAndComment from "./PostCardLikeAndComment";
import PostCardMeta from "./PostCardMeta";
import PostFeaturedMedia from "./PostFeaturedMedia";

export interface Card11Props {
  className?: string;
  post: PostDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { title, href, categories, date } = post;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>
      </div>
      <Link href={href}>
        <span className="absolute inset-0"></span>
      </Link>
      <span className="absolute top-3 inset-x-3">
        <CategoryBadgeList categories={categories} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {!hiddenAuthor ? (
          <PostCardMeta meta={post} />
        ) : (
          <span className="text-xs text-neutral-500">{date}</span>
        )}
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link href={href}>
            <span className="line-clamp-2 " title={title}>
              {" "}
              {title}
            </span>
          </Link>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment className="relative" postData={post} />
          <PostCardSaveAction className="relative" postData={post} />
        </div>
      </div>
    </div>
  );
};

export default Card11;
