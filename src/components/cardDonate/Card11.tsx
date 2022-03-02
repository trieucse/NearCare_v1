import React, { FC, useState } from "react";
import PostCardSaveAction from "../PostCardSaveAction";
import { PostDataType } from "../../data/types";
import Link from "next/link";
import CategoryBadgeList from "../CategoryBadgeList";
import PostCardLikeAndComment from "../PostCardLikeAndComment";
import PostCardMeta from "../PostCardMeta";
import PostFeaturedMedia from "../PostFeaturedMedia";
import Input from "../Input";
import Button from "../Button";
import ProgressBar from "../ProgressBar";

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
      {/* <Link href={href} ><span className="absolute inset-0"></span></Link> */}
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
          <Link href={href} >
           <span className="line-clamp-2" title={title}> {title}</span>
          </Link>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment className="relative" postData={post} />
          {/* <PostCardSaveAction className="relative" postData={post} /> */}
          <span>30/100Ⓝ</span>
        
        </div>
        <div className="flex items-end justify-between mt-auto">
            <ProgressBar current={30} max={100}/>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <Input type="number" id="campain-1111" className="mt-1 text-center" placeholder="0 Ⓝ" />
          <Button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 ">Donate</Button>
        </div>
      </div>
    </div>
  );
};

export default Card11;
