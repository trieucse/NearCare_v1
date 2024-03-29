import type { NextPage } from "next";
import Head from "next/head";
import BgGlassmorphism from "../components/BgGlassmorphism";
import { CampaignDataType, NearAuthorType, PostDataType } from "../data/types";
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
import { DEMO_AUTHORS } from "../data/authors";
import { selectDonorsState, setDonor } from "../app/donor/donor";
import SectionGridAuthorBox from "../components/SectionGridAuthorBoxNear";
import avatar from "../data/jsons/__avata.json";
import SectionHero2 from "../containers/Section/SectionHero2";

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
  const donorState = useAppSelector(selectDonorsState);
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
                is_withdrawable: item.is_withdrawable,
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

      const get_top_donors = async () => {
        let list_top_donors: NearAuthorType[] = [];
        try {
          const list_top_donors_data = await window.contract.get_top_donors({
            limit: 10,
          });
          // console.log("top donor: " + list_top_donors_data);
          list_top_donors = list_top_donors_data.map(
            async (item: any): Promise<NearAuthorType> => {
              let itemData = {
                id: item.donor,
                name: item.donor,
                avatar: avatar[Math.floor(Math.random() * avatar.length)],
                countDonated: parseInt(
                  utils.format.formatNearAmount(item.amount)
                ),
                href: "/author/" + item.donor,
                displayName: item.donor,
                campaign: [],
              };
              return { ...itemData } as NearAuthorType;
            }
          );
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setDonor(await Promise.all(list_top_donors)));
        }
      };

      list_crowdfund();
      get_top_donors();
    }
  }, [initState]);

  useEffect(() => {
    console.log("🚀campaignsState home:", campaignsState);
  }, [campaignsState]);

  useEffect(() => {
    console.log("top donor: ", donorState);
  }, [donorState]);

  return (
    <div className="relative nc-PageHome">
      <Head>
        <title>Home</title>
      </Head>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        <SectionHero2
          href="https://trieucse.github.io/neacare-litepaper/#/"
          youtubeID="7JecXWFQk2w"
          rightImg="https://images.squarespace-cdn.com/content/v1/5a70bcb1cf81e0e8a4d5ef65/1533585565551-YR84I94Z0VHU12MVLH13/EW14683_ApplicationVerification_08_06_2018_B4_RN.jpg?format=2500w"
          heading="Fundraising for the people and charities you care about"
          subHeading="Get help. Give kindness. Start in just 5 minutes."
        />
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
        <div className="">
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
        <div className="container ">
          <SectionGridAuthorBox
            className="py-16 lg:py-28"
            authors={donorState.filter((_, i) => i < 10)}
          />
        </div>

        {/* ======= END CONTAINER ============= */}
      </div>
    </div>
  );
};

export default Home;
