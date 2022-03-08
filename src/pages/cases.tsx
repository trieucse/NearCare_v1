import React, { FC, useEffect } from "react";
import ModalCategories from "../containers/ModalCategories";
import ModalTags from "../containers/ModalTags";
import { DEMO_POSTS } from "../data/posts";
import {
  CampaignDataType,
  NearAuthorType,
  PostDataType,
  TaxonomyType,
} from "../data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "../data/taxonomies";
import ButtonPrimary from "../components/ButtonPrimary";
import ArchiveFilterListBox from "../components/ArchiveFilterListBox";
import BackgroundSection from "../components/BackgroundSection";
import SectionGridCategoryBox from "../components/SectionGridCategoryBox";
import ButtonSecondary from "../components/ButtonSecondary";
import SectionSliderNewAuthors from "../components/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "../data/authors";
import Head from "next/head";
import axios from "axios";
import { utils } from "near-api-js";
import router from "next/router";
import { toast } from "react-toastify";
import {
  selecCampaignsState,
  removeCampaign,
  addCampaign,
} from "../app/campaign/campaign";
import { selectDonorsState, setDonor } from "../app/donor/donor";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectInitState } from "../app/login/login";
import { CATEGORIES, COUNTRIES } from "../data/campaign";
import string_to_slug from "../utils/string2slug";
import avatar from "../data/jsons/__avata.json";
import Card11 from "../components/cardDonate/Card11";

export interface PageArchiveProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);

const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[0];

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

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

  return (
    <div className={`nc-PageArchive ${className}`} data-nc-id="PageArchive">
      <Head>
        <title>Archive || Cases</title>
      </Head>

      {/* HEADER */}
      {/* <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {PAGE_DATA.name}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {PAGE_DATA.count} Articles
            </span>
          </div>
        </div>
      </div> */}
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              <ModalCategories categories={DEMO_CATEGORIES} />
              <ModalTags tags={DEMO_TAGS} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {campaignsState.map((campaign) => (
              <Card11 key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {/* <Pagination /> */}
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div>

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />
      </div>
    </div>
  );
};

export default PageArchive;
