import { Transition } from "@headlessui/react";
import PostCardSaveAction from "./PostCardSaveAction";
import NcImage from "./NcImage";
import NextPrev from "./NextPrev";
import { CampaignDataType } from "../data/types";
import React, { FC, Fragment, useState } from "react";
import Link from "next/link";
import CategoryBadgeList from "./CampaignCategoryBadgeList";
import PostCardLikeAndComment from "./CampaignCardLikeAndComment";
import CardAuthor2 from "./CampaignCardAuthor";
import Button from "./Button";
import { toast } from "react-toastify";
import { GAS, STAKING_STORAGE_AMOUNT } from "../utils/utils";
import Input from "./Input";
import { utils } from "near-api-js";
import { useAppSelector } from "../app/hooks";
import { selectUserState } from "../app/login/login";
import ButtonPrimary from "./ButtonPrimary";

export interface CardLarge1Props {
  className?: string;
  campaign: CampaignDataType;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  isShowing?: boolean;
}

const CardLarge1: FC<CardLarge1Props> = ({
  className = "",
  isShowing = true,
  campaign,
  onClickNext = () => {},
  onClickPrev = () => {},
}) => {
  const [amount, setAmount] = useState(0);
  const userState = useAppSelector(selectUserState);

  const {
    featured_image,
    title,
    end_date,
    category,
    author,
    href,
    id,
    is_withdrawable,
  } = campaign;
  const donate = async () => {
    try {
      if (is_withdrawable == false) {
        toast.error("withdrawal is not allowed");
        return;
      }
      if (author == userState?.id) {
        toast.error("You can't donate to your own campaign");
        return;
      }

      if (parseInt(campaign.donated) >= parseInt(campaign.goal)) {
        toast.error("Campaign is already completed");
        return;
      }
      if (amount == 0) {
        toast.error("Please enter amount to donate");
        return;
      }
      if (
        author == userState?.id &&
        parseInt(campaign.donated) >= parseInt(campaign.goal)
      ) {
        // toast.error("withdrawal is allowed");
        window.contract.withdraw_campaign(
          {
            campaign_id: id,
          },
          GAS,
          STAKING_STORAGE_AMOUNT
        );

        return;
      }
      let deposit = utils.format.parseNearAmount(amount.toString());
      await window.contract.donate({ campaign_id: id }, GAS, deposit);
      toast.success("Donate success");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Transition
      appear={true}
      as="div"
      className={`  nc-CardLarge1 relative flex flex-col-reverse md:flex-row justify-end ${className}`}
      show={isShowing}
    >
      <div
        className={`md:absolute z-10 md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5`}
      >
        <Transition.Child
          as={Fragment}
          enter="transform nc-will-change-transform transition-all duration-500"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <div
            className={` ${
              is_withdrawable == false ? "opacity-25" : ""
            } p-4 sm:p-8 xl:py-14 md:px-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl space-y-3 sm:space-y-5 !border-opacity-0 --  nc-dark-box-bg`}
          >
            <CategoryBadgeList categories={category} />

            <h2 className="nc-card-title text-xl sm:text-2xl font-semibold ">
              <Link href={href}>
                <a className="line-clamp-2" title={title}>
                  {title}
                </a>
              </Link>
            </h2>

            <CardAuthor2
              className="relative"
              author={author}
              end_date={end_date}
            />

            <div className="flex items-center justify-between mt-auto">
              <PostCardLikeAndComment campaignData={campaign} />

              {/* <PostCardSaveAction
                classBgIcon="h-8 w-8 bg-neutral-50 bg-opacity-20 hover:bg-opacity-50 dark:bg-neutral-800 dark:bg-opacity-30 dark:hover:bg-opacity-50"
                postData={post}
                readingTime={readingTime}
              /> */}
            </div>
            <div className="flex items-end justify-between mt-auto">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <Input
                    type="number"
                    id="campain-1111"
                    className="mt-1 text-center"
                    placeholder="0 Ⓝ"
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <ButtonPrimary
                    onClick={donate}
                    className={`${
                      (parseInt(campaign.donated) >= parseInt(campaign.goal) &&
                        author != userState?.id &&
                        "disabled cursor-not-allowed") ||
                      (is_withdrawable == false &&
                        "disabled cursor-not-allowed")
                    }
                `}
                  >
                    {is_withdrawable == false
                      ? "Close"
                      : parseInt(campaign.donated) >= parseInt(campaign.goal)
                      ? author == userState?.id
                        ? "Withdraw"
                        : "Done 🎉 "
                      : "Donate"}
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
        <Transition.Child
          as="div"
          className="p-4 sm:pt-8 sm:px-10"
          enter="transform nc-will-change-transform transition-all duration-500 delay-100"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </Transition.Child>
      </div>
      <Transition.Child
        as="div"
        className="w-full md:w-4/5 lg:w-2/3"
        enter="transform nc-will-change-transform transition-all duration-500 delay-200"
        enterFrom="translate-y-4 scale-105 opacity-0"
        enterTo="translate-y-0 scale-100 opacity-100"
      >
        <Link href={href}>
          <a>
            <NcImage
              prevImageHorizontal
              containerClassName="aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative"
              className="absolute inset-0 object-cover rounded-3xl"
              src={featured_image}
              alt={title}
            />
          </a>
        </Link>
      </Transition.Child>
    </Transition>
  );
};

export default CardLarge1;
