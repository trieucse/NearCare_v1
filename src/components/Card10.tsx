import React, { FC, useState } from "react";
import PostCardSaveAction from "./PostCardSaveAction";
import { PostDataType } from "../data/types";
import Link from "next/link";
import CategoryBadgeList from "./CategoryBadgeList";
import PostFeaturedMedia from "./PostFeaturedMedia";
import PostCardMetaV2 from "./PostCardMetaV2";

export interface Card10Props {
  className?: string;
  post: PostDataType;
}

const Card10: FC<Card10Props> = ({ className = "h-full", post }) => {
  const { href, categories } = post;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card10 relative flex flex-col ${className}`}
      data-nc-id="Card10"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link
        href={href}
        
      >
        <div className="block  group rounded-3xl flex-shrink-0 relative w-full aspect-w-9 aspect-h-7 sm:aspect-h-10 overflow-hidden">
        <div >
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>

        <span className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </div>
      </Link>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4">
        <CategoryBadgeList categories={categories} />
        <PostCardSaveAction postData={post} />
      </div>

      <div className="space-y-2.5 mt-4">
        <PostCardMetaV2 className="leading-none" meta={post} />
      </div>
    </div>
  );
};

export default Card10;
