import type { NextPage } from "next";
import Head from "next/head";
import BgGlassmorphism from "../components/BgGlassmorphism";
import { CampaignDataType, PostDataType } from "../data/types";
import { CATEGORIES, COUNTRIES } from "../data/campaign";
import { useEffect, useState } from "react";
import { initContract, ONE_NEAR, parseFloatToInt } from "../utils/utils";
import { selectInitState, selectLoginState } from "../app/login/login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SectionGridCampaign from "../containers/Section/SectionGridCampaign";
import SectionLargeSlider from "../containers/Section/CampaignSectionLargeSlider";
import {
  addCampaign,
  removeCampaign,
  selecCampaignsState,
} from "../app/campaign/campaign";
import axios from "axios";
import string_to_slug from "../utils/string2slug";
import { utils } from "near-api-js";
import router from "next/router";
import { toast } from "react-toastify";

// const POSTS: PostDataType[] = DEMO_POSTS;
const Home: NextPage = () => {
  const { transactionHashes, errorCode, errorMessage } = router.query;

  useEffect(() => {
    console.log("transactionHashes: ", transactionHashes);
    if (transactionHashes && !errorCode) {
      toast.success("Thank you for your donation");
    }
  }, [transactionHashes]);

  useEffect(() => {
    console.log("errorMessage: ", errorMessage);
    if (errorCode) {
      toast.error("Error donated!");
    }
  }, [errorCode]);

  const initState = useAppSelector(selectInitState);
  const campaignsState = useAppSelector(selecCampaignsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(removeCampaign([]));
    if (initState) {
      const list_crowdfund = async () => {
        let list_campaign_data: CampaignDataType[] = [];
        try {
          const list_campaign = await window.contract.get_campaign_paging({
            from_index: "0",
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

              // console.log("content: ", content.data);

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
              };
              return { ...itemData } as CampaignDataType;
            }
          );
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(addCampaign(await Promise.all(list_campaign_data)));
        }
      };
      list_crowdfund();
    }
  }, [initState]);

  useEffect(() => {
    console.log("🚀campaignsState home:", campaignsState);
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
            campaigns={campaignsState.filter((_, i) => i < 3)}
          />
        </div>
        <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="container relative ">
            <SectionGridCampaign
              className="py-16 lg:py-28"
              CampaignCardName="card11"
              heading="Our Recent Campaigns"
              subHeading="Explore 1129 other articles"
              campaigns={campaignsState}
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
