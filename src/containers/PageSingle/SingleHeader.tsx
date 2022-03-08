import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "../../pages/single-campaign/[slug]/[id]";
import PostMeta2 from "../../components/PostMeta2";
import Head from "next/head";
import { CampaignDataType } from "../../data/types";
import CategoryBadgeList from "../../components/CampaignCategoryBadgeList";
import CampaignMeta2 from "../../components/CampaignMeta2";
import SingleMetaAction from "./CampaignSingleMetaAction";
import Button from "../../components/Button";
import ButtonPrimary from "../../components/ButtonPrimary";
import { ONE_NEAR } from "../../utils/utils";
import { ArrowCircleRightIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { Popover, Transition } from '@headlessui/react'
import ButtonClose from "../../components/ButtonClose";

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

  const handleVotingButtonClick = async () => {
    try {
      const { data } = await window.contract.vote_for_campaign({
        campaign_id: pageData.id,
      });

      toast.success(`You voted for this campaign!`);
    } catch (error) {
      console.log(error)
      toast.error(`You already voted for this campaign!`);
    }
  };

  return (
    <>
      <Head>
        <title>Single</title>
      </Head>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <CategoryBadgeList itemClass="!px-3" categories={category} />
          <SingleTitle mainClass={titleMainClass} title={title} />
          <div className="">
            <Popover className="relative">
              <Popover.Button
                className="inline-flex items-center gap-1 p-2 px-10 font-bold text-white bg-yellow-500 rounded-full hover:bg-opacity-30"
              >
                <ThumbUpIcon className="w-4 h-4" />
                0/30
              </Popover.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >

                <Popover.Panel className="absolute z-10 p-2 mt-1 text-white bg-white rounded-md shadow-md dark:bg-neutral-700">
                  {({ close }) => (
                    <>
                      {/* close button */}
                      <div className="flex justify-end mb-3">
                        <ButtonClose
                          className="w-4 h-4"
                          onClick={close}
                        />
                      </div>
                      <div className="p-2 space-y-2">
                        <p>
                          0/30 votes left from the volunteer to be listed on the homepage. <br />
                        </p>

                      </div>
                      <div className="pt-4">
                        <button
                          className="inline-flex items-center gap-1 p-2 bg-green-500 rounded-md hover:bg-green-600"
                          onClick={handleVotingButtonClick}

                        >
                          <ArrowCircleRightIcon className="w-4 h-4" />
                          Proceed
                          (fee: {(pageData.vote_fee && (pageData.vote_fee / parseInt(ONE_NEAR)).toLocaleString())} Ⓝ)
                        </button>
                      </div>
                    </>
                  )}
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
          {!!description && !hiddenDesc && (
            <span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">
              {description}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800">
          </div>
          <div className="flex flex-col justify-between space-y-5 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-5">
            <CampaignMeta2
              size="large"
              className="flex-shrink-0 leading-none"
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
