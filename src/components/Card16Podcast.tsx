import React, { FC } from "react";
import PostCardSaveAction from "./PostCardSaveAction";
import { PostDataType } from "../data/types";
import Link from "next/link";
import CategoryBadgeList from "./CategoryBadgeList";
import PostCardLikeAndComment from "./PostCardLikeAndComment";
import musicWave from "../images/musicWave.png";
import ButtonPlayMusicRunningContainer from "../containers/ButtonPlayMusicRunningContainer";
import NcImage from "./NcImage";

export interface Card16PodcastProps {
  className?: string;
  post: PostDataType;
  ratio?: string;
}

const Card16Podcast: FC<Card16PodcastProps> = ({
  className = "h-full",
  post,
  ratio = "aspect-w-3 xl:aspect-w-4 aspect-h-3",
}) => {
  const { title, href, categories, desc, featuredImage } = post;

  const renderIcon = (state?: "playing" | "loading") => {
    if (!state) {
      return (
        <svg className="ml-0.5 w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
          ></path>
        </svg>
      );
    }

    return (
      <svg className=" w-9 h-9" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15.25 6.75V17.25"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.75 6.75V17.25"
        ></path>
      </svg>
    );
  };

  const renderListenButtonDefault = (state?: "playing" | "loading") => {
    return (
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer">
        {renderIcon(state)}
      </div>
    );
  };

  return (
    <div
      className={`nc-Card16Podcast relative flex flex-col ${className}`}
      data-nc-id="Card16Podcast"
    >
      <Link
        href={href}
      >
        <a  className={`block flex-shrink-0 relative w-full rounded-3xl overflow-hidden ${ratio}`}>
        <NcImage src={featuredImage} />
        <span className="bg-neutral-900 bg-opacity-30"></span>
        </a>
      </Link>

      {/* ABSOLUTE */}
      <Link href={href}>
         <a className="absolute inset-0"> 
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
         </a>
      </Link>
      <span className="absolute top-3 inset-x-3">
        <CategoryBadgeList categories={categories} />
      </span>

      {/* MAIN CONTENT */}
      <div className="w-11/12 transform -mt-32 ">
        <div className="px-5 flex items-center space-x-4">
          <div className="flex-grow ">
            <img src={musicWave.src} alt="musicWave" />
          </div>
          <ButtonPlayMusicRunningContainer
            post={post}
            renderDefaultBtn={() => renderListenButtonDefault()}
            renderPlayingBtn={() => renderListenButtonDefault("playing")}
            renderLoadingBtn={() => renderListenButtonDefault("loading")}
          />
        </div>
        <div className="p-5 mt-5 bg-white dark:bg-neutral-900 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none flex flex-col flex-grow ">
          <h2 className="nc-card-title block text-xl font-semibold text-neutral-900 dark:text-neutral-100 ">
            <Link href={href} >
              <a className="line-clamp-1" title={title}>{title}</a>
            </Link>
          </h2>
          <span className="block text-sm text-neutral-500 dark:text-neutral-400 mt-3 mb-5">
            <span className="line-clamp-2">{desc}</span>
          </span>
          <div className="flex items-end justify-between mt-auto">
            <PostCardLikeAndComment className="relative" postData={post} />
            <PostCardSaveAction className="relative" postData={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card16Podcast;
