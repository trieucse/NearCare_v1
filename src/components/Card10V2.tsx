import React, { FC, useState } from "react";
import PostCardSaveAction from "./PostCardSaveAction";
import { PostDataType } from "../data/types";
import Link from "next/link";
import CategoryBadgeList from "./CategoryBadgeList";
import PostFeaturedMedia from "./PostFeaturedMedia";
import PostCardMetaV2 from "./PostCardMetaV2";

export interface Card10V2Props {
  className?: string;
  post: PostDataType;
}

const Card10V2: FC<Card10V2Props> = ({ className = "h-full", post }) => {
  const { href, categories } = post;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card10V2 relative flex flex-col ${className}`}
      data-nc-id="Card10V2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-16 aspect-h-12 sm:aspect-h-9 overflow-hidden">
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>

        <Link
          href={href}
         
        ><span  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity"></span></Link>
      </div>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4">
        <CategoryBadgeList categories={categories} />
        <PostCardSaveAction postData={post} />
      </div>

      <div className="space-y-2.5 mt-4 px-4">
        <PostCardMetaV2 className="leading-none" meta={post} />
      </div>
    </div>
  );
};

export default Card10V2;
