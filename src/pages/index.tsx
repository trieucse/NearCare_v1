import type { NextPage } from "next";
import Head from "next/head";
import BgGlassmorphism from "../components/BgGlassmorphism";
import { CampaignDataType, PostDataType } from "../data/types";
import { CATEGORIES, COUNTRIES } from "../data/campaign";
import { useEffect, useState } from "react";
import { initContract } from "../utils/utils";
import { selectInitState, selectLoginState } from "../app/login/login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SectionGridCampaign from "../containers/Section/SectionGridCampaign";
import SectionLargeSlider from "../containers/Section/CampaignSectionLargeSlider";
import { addCampaign, selecCampaignsState } from "../app/campaign/campaign";

// const POSTS: PostDataType[] = DEMO_POSTS;
const Home: NextPage = () => {
  const initState = useAppSelector(selectInitState);
  const campaignsState = useAppSelector(selecCampaignsState);
  const dispatch = useAppDispatch();
  console.log("initState: ", initState);
  let initCampaign: CampaignDataType[] = [];
  const [campaign, setCampaign] = useState(initCampaign);
  useEffect(() => {
    if (initState) {
      const list_crowdfund = async () => {
        const list_campaign = await window.contract.get_campaign_paging({
          from_index: "0",
          limit: 3,
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
        setCampaign(list_campaign_data);
        // dispatch(addCampaign(list_campaign_data));
      };
      list_crowdfund();
    }
  }, [initState]);

  useEffect(() => {
    console.log("🚀campaignsState xxxxxx:", campaignsState);
    // setCampaign(campaignsState);
    console.log("🚀campaignsState home:", campaign);
  }, [campaignsState]);

  return (
    <div className="relative nc-PageHome">
      <Head>
        <title>Home</title>
      </Head>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* === SECTION  === */}
          <SectionLargeSlider
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24 "
            campaigns={campaign.filter((_, i) => i < 3)}
          />
        </div>
        <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="container relative ">
            <SectionGridCampaign
              className="py-16 lg:py-28"
              CampaignCardName="card11"
              heading="Our Recent Campaigns"
              subHeading="Explore 1129 other articles"
              campaigns={campaign}
              gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            />
          </div>
        </div>
        {/* ======= END CONTAINER ============= */}
      </div>
    </div>
  );
};

export default Home;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
