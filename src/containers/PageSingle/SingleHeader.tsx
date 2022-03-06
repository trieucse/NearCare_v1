import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "../../pages/single-campaign/[slug]/[id]";
import PostMeta2 from "../../components/PostMeta2";
import Head from "next/head";
import { CampaignDataType } from "../../data/types";
import CategoryBadgeList from "../../components/CampaignCategoryBadgeList";
import CampaignMeta2 from "../../components/CampaignMeta2";
import SingleMetaAction from "./CampaignSingleMetaAction";

export interface SingleHeaderProps {
  pageData: CampaignDataType;
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  const { category, description, title } = pageData;
  return (
    <>
      <Head>
        <title>Single</title>
      </Head>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <CategoryBadgeList itemClass="!px-3" categories={category} />
          <SingleTitle mainClass={titleMainClass} title={title} />
          {!!description && !hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {description}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            <CampaignMeta2
              size="large"
              className="leading-none flex-shrink-0"
              meta={pageData}
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            />
            <SingleMetaAction meta={pageData} />
          </div>
        </div>
        {/* 
        {metaActionStyle === "style1" ? (
          <SingleMetaAction meta={pageData} />
        ) : (
          <SingleMetaAction2 meta={pageData} />
        )} */}
      </div>
    </>
  );
};

export default SingleHeader;
