import React, { FC, useState } from "react";
import { CampaignDataType } from "../../data/types";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import CampaignFeaturedMedia from "../CampaignFeaturedMedia";
import CampaignCategoryBadgeList from "../CampaignCategoryBadgeList";
import CampaignPostCardMeta from "../CampaignCardMeta";
import CampaignCardLikeAndComment from "../CampaignCardLikeAndComment";
import { toast } from "react-toastify";
import { GAS } from "../../utils/utils";

export interface Card11Props {
  className?: string;
  campaign: CampaignDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  campaign,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { title, href, category, end_date, donated, goal, id } = campaign;

  const [isHover, setIsHover] = useState(false);
  const [amount, setAmount] = useState(0);
  // const [liked, setLike] = useState(0);

  const donate = async () => {
    try {
      if (amount == 0) {
        toast.error("Please enter amount to donate");
        return;
      }
      await window.contract.donate({ campaign_id: id, amount: amount }, GAS, 0);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

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
          <CampaignFeaturedMedia campaign={campaign} isHover={isHover} />
        </div>
      </div>
      {/* <Link href={href} ><span className="absolute inset-0"></span></Link> */}
      <span className="absolute top-3 inset-x-3">
        <CampaignCategoryBadgeList categories={category} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {!hiddenAuthor ? (
          <CampaignPostCardMeta meta={campaign} />
        ) : (
          ""
          // <span className="text-xs text-neutral-500">{new Date(end_date)}</span>
        )}
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link href={href}>
            <span className="line-clamp-2" title={title}>
              {" "}
              {title}
            </span>
          </Link>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <CampaignCardLikeAndComment
            className="relative"
            campaignData={campaign}
          />
          {/* <PostCardSaveAction className="relative" postData={post} /> */}
          <span>
            {donated}/{goal}Ⓝ
          </span>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <ProgressBar current={donated} max={goal} />
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
              <Button
                onClick={donate}
                className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 "
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card11;
