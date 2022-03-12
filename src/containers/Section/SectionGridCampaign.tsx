import React, { FC, ReactNode, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { CampaignDataType } from "../../data/types";
import ButtonPrimary from "../../components/ButtonPrimary";
import Card11 from "../../components/cardDonate/Card11";
import { CATEGORIES, COUNTRIES } from "../../data/campaign";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCampaign, selecCampaignsState } from "../../app/campaign/campaign";
import axios from "axios";
import string_to_slug from "../../utils/string2slug";
import { utils } from "near-api-js";
import FacebookLoading from "../../components/FacebookLoading";

export interface SectionGridCampaignsProps {
  campaigns?: CampaignDataType[];
  className?: string;
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  CampaignCardName?: "card11";
}

const SectionGridCampaign: FC<SectionGridCampaignsProps> = ({
  campaigns = [],
  CampaignCardName = "card3",
  className = "",
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
}) => {
  const renderCard = (campaign: CampaignDataType) => {
    switch (CampaignCardName) {
      case "card11":
        return <Card11 key={campaign.id} campaign={campaign} />;
      default:
        return null;
    }
  };
  // let initCampaign: CampaignDataType[] = [];
  // const [campaign, setCampaign] = useState(campaigns);
  const campaignsState = useAppSelector(selecCampaignsState);
  const dispatch = useAppDispatch();
  const [is_loadmore, setIsLoadMore] = useState(true);

  const loadmore = async () => {
    let list_campaign_data: CampaignDataType[] = [];
    try {
      const list_campaign = await window.contract.get_campaign_paging({
        from_index: campaigns.length.toString(),
        limit: 12,
      });
      list_campaign_data = list_campaign.map(
        async (item: any): Promise<CampaignDataType> => {
          let category = CATEGORIES.find(
            (category: any) => category.id === item.category_id
          );
          let country = COUNTRIES.find(
            (country: any) => country.id === item.country_id
          );

          const campaignType = ["standard", "video", "audio"];
          //https://ipfs.io/ipfs/QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A

          const content = await axios.get<any, any>(
            `https://ipfs.io/ipfs/${item.base_uri_content}`
          );
          const { description, video_url, audio_url, featured_image } =
            content.data;

          console.log("content: ", content.data);

          let itemData = {
            id: item.campaign_id,
            author: item.author,
            title: item.title,
            created_at: item.created_at,
            end_date: item.end_date,
            href:
              "/single-campaign/" +
              string_to_slug(item.title) +
              "/" +
              item.campaign_id,
            donated: utils.format.formatNearAmount(item.donated),
            goal: utils.format.formatNearAmount(item.goal),
            country: country,
            category: category,
            description: description,
            like_count: parseInt(item.like_count),
            is_liked: item.is_liked.includes(window.accountId),
            comment_count: item.comment_count,
            campaign_type: campaignType[item.campaign_type - 1],
            base_uri_content: item.base_uri_content,
            video_url: video_url,
            audio_url: audio_url,
            featured_image: featured_image,
            is_withdrawable: item.is_withdrawable,
          };
          return { ...itemData } as CampaignDataType;
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      //get list_campaign_data
      dispatch(addCampaign(await Promise.all(list_campaign_data)));
      if ((await Promise.all(list_campaign_data)).length == 0) {
        setIsLoadMore(false);
      }
    }
  };

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <Heading desc={subHeading} isCenter={headingIsCenter}>
        {heading}
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {campaigns.map((campaign: any) => renderCard(campaign))}
        {/* Show no campaign created */}
        {campaigns.hasOwnProperty("length") && campaigns.length == 0 && (
          // <p className="">
          //   No campaign created yet.
          // </p>
          <>
            <FacebookLoading />
          </>
        )}
      </div>
      <br />
      <br />
      <div className="flex items-center justify-center mt-20">
        {is_loadmore && campaigns.length > 12 && (
          <ButtonPrimary onClick={loadmore}>Show me more</ButtonPrimary>
        )}
      </div>
    </div>
  );
};

export default SectionGridCampaign;
