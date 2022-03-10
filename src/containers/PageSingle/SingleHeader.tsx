import React, { FC, useEffect } from "react";
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
import {
  ArrowCircleRightIcon,
  BellIcon,
  CashIcon,
  HomeIcon,
  StatusOnlineIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { Popover, Transition } from "@headlessui/react";
import ButtonClose from "../../components/ButtonClose";
import { utils } from "near-api-js";
import { KeyIcon } from "@heroicons/react/outline";

export interface SingleHeaderProps {
  pageData: CampaignDataType;
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
}

export interface Kind {
  ExecutionError: string;
}

export interface NearError {
  index: number;
  kind: Kind;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  const { category, description, title } = pageData;
  const [votingCount, setVotingCount] = React.useState(0);

  const handleVotingButtonClick = async () => {
    try {
      toast.promise(
        window.contract.vote_for_campaign({
          campaign_id: pageData.id,
        }),
        {
          pending: "Voting...",
          success: "Voting success",
          error:
            "You have already voted for this campaign or you are not a Volunteer",
        }
      );
    } catch (error: any) {
      toast.error(
        "You already voted for this campaign or you are not a Volunteer!"
      );
    }
  };

  useEffect(() => {
    if (window.contract) {
      window.contract
        .get_voting_count_for_campaign({
          campaign_id: pageData.id,
        })
        .then((votingCount: any) => {
          setVotingCount(votingCount);
        });
    }
  }),
    [window.contract];

  return (
    <>
      <Head>
        <title>Single</title>
      </Head>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <CategoryBadgeList itemClass="!px-3" categories={category} />
          <SingleTitle mainClass={titleMainClass} title={title} />
          <div className="p-2 rounded-bg-gray-600 text-white">
            <span className="text-xl">
              <div className="flex items-center gap-1">
                <CashIcon className="w-5 h-5" />
                Donated: {utils.format.formatNearAmount(pageData.donated)} Ⓝ
              </div>

              <div className="flex items-center gap-1">
                <HomeIcon className="w-5 h-5" />
                Goal: {utils.format.formatNearAmount(pageData.goal)} Ⓝ
              </div>

              <div className="flex items-center gap-1">
                <StatusOnlineIcon className="w-5 h-5" />
                Status:{" "}
                {parseInt(pageData.donated as string) >=
                parseInt(pageData.goal as string)
                  ? "Success"
                  : "On Going"}
              </div>
            </span>
          </div>
          <div className="">
            {/* enough goal or campaign is inactive */}
            {parseInt(pageData.donated.toString()) -
              parseInt(pageData.goal.toString()) >=
            0 ? (
              <>
                <Popover className="relative">
                  <Popover.Button
                    className={`inline-flex items-center gap-1 p-2 px-10 font-bold text-white bg-yellow-500 rounded-full hover:bg-opacity-30`}
                  >
                    <KeyIcon className="w-4 h-4" />
                    Withdraw progress: 40%
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
                          <div className="p-2 space-y-2">
                            <p>
                              The campaign is successfully filled. However, we
                              need more than 50% voting count of the goal to
                              withdraw the funds.
                              <br />
                            </p>
                          </div>
                          <div className="pt-4">
                            <button
                              className="inline-flex items-center gap-1 p-2 bg-green-500 rounded-md hover:bg-green-600"
                              onClick={handleVotingButtonClick}
                            >
                              <ArrowCircleRightIcon className="w-4 h-4" />
                              Vote for withdraw (you donated:{" "}
                              {pageData.vote_fee &&
                                (
                                  pageData.vote_fee /
                                  parseInt(ONE_NEAR as string)
                                ).toLocaleString()}{" "}
                              Ⓝ, pool share: 12,5%)
                            </button>
                          </div>
                        </>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </>
            ) : (
              <>
                <Popover className="relative">
                  <Popover.Button
                    className={`inline-flex items-center gap-1 p-2 px-10 font-bold text-white bg-yellow-500 rounded-full hover:bg-opacity-30`}
                  >
                    <ThumbUpIcon className="w-4 h-4" />
                    {votingCount}/30 votes
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
                          <div className="p-2 space-y-2">
                            <p>
                              0/30 votes left from the volunteer to be listed on
                              the homepage. <br />
                            </p>
                          </div>
                          <div className="pt-4">
                            <button
                              className="inline-flex items-center gap-1 p-2 bg-green-500 rounded-md hover:bg-green-600"
                              onClick={handleVotingButtonClick}
                            >
                              <ArrowCircleRightIcon className="w-4 h-4" />
                              Proceed voting (fee:{" "}
                              {pageData.vote_fee &&
                                (
                                  pageData.vote_fee /
                                  parseInt(ONE_NEAR as string)
                                ).toLocaleString()}{" "}
                              Ⓝ)
                            </button>
                          </div>
                        </>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </>
            )}
          </div>
          {!!description && !hiddenDesc && (
            <span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">
              {description}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
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
