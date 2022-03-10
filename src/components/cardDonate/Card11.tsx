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
import { utils } from "near-api-js";
import ButtonPrimary from "../ButtonPrimary";

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
      if (
        parseInt(utils.format.parseNearAmount(campaign.donated) as string) >=
        parseInt(campaign.goal)
      ) {
        toast.error("Campaign is already completed");
        return;
      }
      if (amount == 0) {
        toast.error("Please enter amount to donate");
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
            <a>
              <span className="line-clamp-2" title={title}>
                {" "}
                {title}
              </span>
            </a>
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
          <ProgressBar current={parseInt(donated)} max={parseInt(goal)} />
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
                  parseInt(
                    utils.format.parseNearAmount(campaign.donated) as string
                  ) >= parseInt(campaign.goal) && "disabled cursor-not-allowed"
                }
                `}
              >
                Donate
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card11;
