import React, { FC, ReactNode, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { CampaignDataType } from "../../data/types";
import ButtonPrimary from "../../components/ButtonPrimary";
import Card11 from "../../components/cardDonate/Card11";
import { CATEGORIES, COUNTRIES } from "../../data/campaign";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCampaign, selecCampaignsState } from "../../app/campaign/campaign";

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

  const loadmore = async () => {
    const list_campaign = await window.contract.get_campaign_paging({
      from_index: campaigns.length.toString(),
      limit: 12,
    });
    let list_campaign_data = list_campaign.map(
      (item: any): CampaignDataType => {
        let category = CATEGORIES.find(
          (category: any) => category.id === item.category_id
        );
        let country = COUNTRIES.find(
          (country: any) => country.id === item.country_id
        );

        const campaignType = ["standard", "video", "audio"];
        let itemData = {
          id: item.campaign_id,
          author: item.author,
          title: item.title,
          created_at: item.created_at,
          end_date: item.end_date,
          href: "#",
          donated: item.donated,
          goal: item.goal,
          country: country,
          category: category,
          description: item.description,
          like_count: parseInt(item.like_count),
          is_liked: false,
          comment_count: item.comment_count,
          campaign_type: campaignType[item.campaign_type - 1],
          base_uri_content: item.base_uri_content,
          video_url: item.base_uri_content,
          audio_url: item.base_uri_content,
          featured_image: item.base_uri_content,
        };
        return { ...itemData } as CampaignDataType;
      }
    );
    dispatch(addCampaign(list_campaign_data));
  };

  useEffect(() => {
    console.log("🚀campaignsState:", campaignsState);
  }, [campaignsState]);

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <Heading desc={subHeading} isCenter={headingIsCenter}>
        {heading}
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {campaigns.map((campaign: any) => renderCard(campaign))}
      </div>
      <br />
      <br />
      <div className="flex items-center justify-center mt-20">
        <ButtonPrimary onClick={loadmore}>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridCampaign;
