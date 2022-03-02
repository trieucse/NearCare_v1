import React, { FC } from "react";
import NcImage from "../NcImage";
import PostCardSaveAction from "../PostCardSaveAction";
import { PostDataType } from "../../data/types";
import Link from "next/link";
import PostCardLikeAndComment from "../PostCardLikeAndComment";
import CategoryBadgeList from "../CategoryBadgeList";
import PostTypeFeaturedIcon from "../PostTypeFeaturedIcon";
import PostFeaturedMedia from "../PostFeaturedMedia";

export interface Card9Props {
  className?: string;
  ratio?: string;
  post: PostDataType;
  hoverClass?: string;
}

const Card9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  post,
  hoverClass = "",
}) => {
  const { title, href, featuredImage, categories, author, date, postType } =
    post;

  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <Link href={author.href} >
          <a className="block relative">
          <h2 className="block text-lg font-semibold text-white ">
            <span className="line-clamp-2" title={title}>
              {title}
            </span>
          </h2>
          <div className="flex mt-2.5">
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
              {author.displayName}
            </span>
            <span className="mx-[6px] font-medium">·</span>
            <span className="font-normal truncate">{date}</span>
          </div>
          </a>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden ${hoverClass} ${className}`}
      data-nc-id="Card9"
    >
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
        <PostCardLikeAndComment className="relative" postData={post} />
        <PostCardSaveAction className="relative" postData={post} />
      </div>
      <div className={`flex items-start relative w-full ${ratio}`}></div>
      {postType === "audio" ? (
        <div className="absolute inset-0">
          <PostFeaturedMedia post={post} />
        </div>
      ) : (
        <Link href={href}>
          <a>
          <NcImage
            containerClassName="absolute inset-0 rounded-3xl"
            className="object-cover w-full h-full rounded-3xl"
            src={featuredImage}
          />
          <PostTypeFeaturedIcon
            className="absolute top-3 left-3 group-hover:hidden"
            postType={postType}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
          <span className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </a>
        </Link>
      )}
      <Link
        href={href}
        
      ><a className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></a></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link href={href} ><a className="absolute inset-0"></a></Link>
        <div className="mb-3">
          <CategoryBadgeList categories={categories} />
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card9;
