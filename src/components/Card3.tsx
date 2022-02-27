import React, { FC } from "react";
import NcImage from "./NcImage";
import PostCardMeta from "./PostCardMeta";
import PostCardSaveAction from "./PostCardSaveAction";
import { PostDataType } from "../data/types";
// import { Link } from "react-router-dom";
import PostCardLikeAndComment from "./PostCardLikeAndComment";
import CategoryBadgeList from "./CategoryBadgeList";
import PostTypeFeaturedIcon from "./PostTypeFeaturedIcon";
import Link from "next/link";

export interface Card3Props {
  className?: string;
  post: PostDataType;
  size?: "normal" | "large";
}

const Card3: FC<Card3Props> = ({
  className = "h-full",
  size = "large",
  post,
}) => {
  const {
    title,
    href,
    readingTime,
    featuredImage,
    desc,
    categories,
    postType,
  } = post;

  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >
      {/* <Link href={href} ><span className="absolute inset-0"></span></Link> */}
      <div className="flex flex-col flex-grow">
        <div className="space-y-3.5 mb-4">
          <CategoryBadgeList categories={categories} />
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100  ${
                size === "large" ? "text-xl" : "text-base"
              }`}
            >
              <Link href={href} >
               <span className="line-clamp-2" title={title} > {title}</span>
              </Link>
            </h2>
            {size === "large" && (
              <div className="hidden sm:block sm:mt-2">
                <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                  {desc}
                </span>
              </div>
            )}
          </div>

          <PostCardMeta meta={{ ...post }} />
        </div>
        <div className="flex items-center flex-wrap justify-between mt-auto">
          <PostCardLikeAndComment postData={post} />
          <PostCardSaveAction postData={post} readingTime={readingTime} />
        </div>
      </div>

      <div
        className={`block flex-shrink-0 ${
          size === "large"
            ? "sm:w-56 sm:ml-6 rounded-3xl"
            : "sm:w-40 sm:ml-5 rounded-2xl"
        } overflow-hidden mb-5 sm:mb-0`}
      >
        <div className={`w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16 `}>
          <NcImage
            containerClassName="absolute inset-0"
            src={featuredImage}
            alt={title}
          />
          <span>
            <PostTypeFeaturedIcon
              className="absolute left-2 bottom-2"
              postType={postType}
              wrapSize="w-8 h-8"
              iconSize="w-4 h-4"
            />
          </span>
        </div>
        {/* <Link href={href}> <span  className="absolute inset-0"></span></Link> */}
      </div>
    </div>
  );
};

export default Card3;
