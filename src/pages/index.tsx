import type { NextPage } from "next";
import Head from "next/head";
import BgGlassmorphism from "../components/BgGlassmorphism";
import SectionLargeSlider from "../containers/Section/SectionLargeSlider";
import { CampaignDataType, PostDataType } from "../data/types";
import { CATEGORIES, COUNTRIES } from "../data/campaign";
import SectionGridPosts from "../containers/Section/SectionGridPosts";
import { useEffect, useState } from "react";
import { initContract } from "../utils/utils";
import { selectInitState, selectLoginState } from "../app/login/login";
import { useAppSelector } from "../app/hooks";
import { DEMO_CATEGORIES } from "../data/taxonomies";

// const POSTS: PostDataType[] = DEMO_POSTS;
const Home: NextPage = () => {
  const initState = useAppSelector(selectInitState);
  console.log("initState: ", initState);
  let initCampaign: PostDataType[] = [];
  const [campaign, setCampaign] = useState(initCampaign);
  useEffect(() => {
    if (initState) {
      const list_crowdfund = async () => {
        const list_campaign = await window.contract.get_campaign_paging({
          page_size: 0,
          page_limit: 10,
        });
        let list_campaign_data = list_campaign.map(
          (item: any): CampaignDataType => {
            let category = item.category_id.map(
              (id: any) =>
                CATEGORIES.filter((taxonomy) => taxonomy.id === id)[0]
            );
            let country = item.country_id.map(
              (id: any) => COUNTRIES.filter((taxonomy) => taxonomy.id === id)[0]
            );
            const campaignType = ["standard", "video", "gallery", "audio"];
            let itemData = {
              id: item.id,
              author: item.author,
              title: item.title,
              created_at: item.created_at,
              end_date: item.end_date,
              href: "#",
              donated: item.donated,
              goal: item.goal,
              country: category,
              category: category,
              description: item.description,
              like_count: parseInt(item.like_count),
              // is_liked: false.valueOf(),
              comment_count: item.commentCount,
              campaign_type: campaignType[item.campaign_type],
              base_uri_content: item.base_uri_content,
            };
            return { ...itemData } as CampaignDataType;

            // return {
            //   ...itemData
            // } as CampaignDataType;
          }
        );
        setCampaign(list_campaign_data);

        console.log(
          "🚀 ~ file: index.tsx ~ line 50 ~ constlist_crowdfund= ~ dataNew",
          list_campaign_data
        );
      };
      list_crowdfund();
    }
  }, [initState]);

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
            posts={campaign.filter((_, i) => i < 3)}
          />
        </div>
        <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="container relative ">
            <SectionGridPosts
              className="py-16 lg:py-28"
              postCardName="card11"
              heading="Our Recent Campaigns"
              subHeading="Explore 1129 other articles"
              posts={campaign}
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
