import React, { FC, ReactNode, useEffect } from "react";
import { PostDataType, TaxonomyType } from "../data/types";
import { SINGLE_VIDEO } from "../data/single";
import { CommentType } from "../components/CommentCard";
import { useAppDispatch } from "../app/hooks";
// import { changeCurrentPage } from "../app/pages/pages.ts.bk";
import SingleContent from "../containers/PageSingle/SingleContent";
import SingleRelatedPosts from "../containers/PageSingle/SingleRelatedPosts";
import ReactPlayer from "react-player";
import NcPlayIcon from "../components/NcPlayIcon";
import SingleMetaAction2 from "../containers/PageSingle/SingleMetaAction2";
import CategoryBadgeList from "../components/CategoryBadgeList";
import SingleTitle from "../containers/PageSingle/SingleTitle";
import PostMeta2 from "../components/PostMeta2";

export interface PageSingleVideoProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingleVideo: FC<PageSingleVideoProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   // UPDATE CURRENTPAGE DATA IN PAGE-REDUCERS
  //   dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE_VIDEO }));
  //   return () => {
  //     dispatch(changeCurrentPage({ type: "/", data: {} }));
  //   };
  // }, []);

  const renderMainVideo = () => {
    return (
      <div className="aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-3xl shadow-2xl">
        <ReactPlayer
          url={SINGLE_VIDEO.videoUrl}
          playing
          width="100%"
          height="100%"
          controls
          light={SINGLE_VIDEO.featuredImage}
          playIcon={<NcPlayIcon />}
        />
      </div>
    );
  };

  const renderHeader = () => {
    const { categories, title } = SINGLE_VIDEO;
    return (
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5 dark text-neutral-100">
          <CategoryBadgeList itemClass="!px-3" categories={categories} />
          <SingleTitle
            mainClass="text-neutral-900 font-semibold text-3xl md:!leading-[120%] dark:text-neutral-100"
            title={title}
          />

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col space-y-5">
            <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              meta={SINGLE_VIDEO}
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            />
            <SingleMetaAction2 meta={SINGLE_VIDEO} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-PageSingleVideo  ${className}`}
        data-nc-id="PageSingleVideo"
      >
        {/* SINGLE HEADER */}
        <header className="container relative py-14 lg:py-20 flex flex-col lg:flex-row lg:items-center">
          <div className="absolute inset-y-0 transform translate-x-1/2 right-1/2 w-screen lg:translate-x-0 lg:w-[calc(100vw/2)] bg-neutral-900 lg:rounded-r-[40px]"></div>
          <div className="pb-10 lg:pb-0 lg:pr-10 relative">
            {renderHeader()}
          </div>
          <div className="relative lg:w-8/12 flex-shrink-0">
            {renderMainVideo()}
          </div>
        </header>

        {/* SINGLE MAIN CONTENT */}
        <div className="container mt-12">
          <SingleContent data={SINGLE_VIDEO} />
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts />
      </div>
    </>
  );
};

export default PageSingleVideo;
