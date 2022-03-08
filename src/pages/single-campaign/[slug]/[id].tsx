import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  CampaignDataType,
  PostDataType,
  TaxonomyType,
} from "../../../data/types";
import { CommentType } from "../../../components/CommentCard";
import SingleRelatedPosts from "../../../containers/PageSingle/SingleRelatedPosts";
import { useAppDispatch } from "../../../app/hooks";
// import { changeCurrentPage } from "../../app/pages/pages.ts.bk";
// import { Sidebar } from "../../../containers/PageSingle/Sidebar";
import SingleHeader from "../../../containers/PageSingle/SingleHeader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { ONE_NEAR } from "../../../utils/utils";
import { CATEGORIES, COUNTRIES } from "../../../data/campaign";
import SingleContent from "../../../containers/PageSingle/CampaignSingleContent";
import { Sidebar } from "../../../containers/PageSingle/CampaignSidebar";
import ButtonPrimary from "../../../components/ButtonPrimary";

export interface PageSingleTemp3SidebarProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingleTemp3Sidebar: FC<PageSingleTemp3SidebarProps> = ({
  className = "",
}) => {
  const dispatch = useAppDispatch();

  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  // useEffect(() => {
  //   dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE }));
  //   return () => {
  //     dispatch(changeCurrentPage({ type: "/", data: {} }));
  //   };
  // }, []);

  const router = useRouter();
  const { slug, id } = router.query;

  // let init: CampaignDataType = ;
  const [single, setSingle] = useState<CampaignDataType | null>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [request, enoughVote] = await Promise.all([
          window.contract.get_campaign({
            campaign_id: parseInt(id as string),
          }),
          window.contract.get_enough_vote_for_campaign({
            _campaign_id: parseInt(id as string),
          }),
        ]);


        const { data } = await axios.get<any>(
          `https://ipfs.io/ipfs/${request.base_uri_content}`
        );

        const { description, video_url, audio_url, featured_image } = data;

        let category = CATEGORIES.find(
          (category: any) => category.id === request.category_id
        );
        let country = COUNTRIES.find(
          (country: any) => country.id === request.country_id
        );

        const campaignType = ["standard", "video", "audio"];
        let itemData = {
          id: request.campaign_id,
          author: request.author,
          title: request.title,
          created_at: request.created_at,
          end_date: request.end_date,
          href: "#",
          donated: request.donated / parseInt(ONE_NEAR),
          goal: request.goal,
          country: country,
          category: category,
          description: description,
          like_count: parseInt(request.like_count),
          is_liked: request.is_liked.includes(window.accountId),
          comment_count: request.comment_count,
          campaign_type: campaignType[request.campaign_type - 1],
          base_uri_content: request.base_uri_content,
          video_url: video_url,
          audio_url: audio_url,
          featured_image: featured_image,
          vote_fee: request.vote_fee,
        };
        console.log("campaign : ", itemData);

        setSingle(itemData as CampaignDataType);

        return itemData;
      } catch (error: any) {
        toast.error("Campaign not found");

        router.push("/404");
      }
    };

    fetchData();
  }, []);

  if (single) {
    return (
      <>
        <div
          className={`nc-PageSingleTemp3Sidebar ${className}`}
          data-nc-id="PageSingleTemp3Sidebar"
        >
          <header className="relative z-10 pt-16 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
            {/* SINGLE HEADER */}
            <div className="container relative z-10 dark">
              <div className="max-w-screen-md">
                <SingleHeader
                  hiddenDesc
                  metaActionStyle="style2"
                  pageData={single}
                />
              </div>
            </div>

            {/* FEATURED IMAGE */}
            <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
              <div className="absolute top-0 bottom-0 left-0 hidden w-1/5 md:block from-neutral-900 dark:from-black bg-gradient-to-r"></div>
              <img
                className="block object-cover w-full h-full"
                src={single.featured_image}
                alt=""
              />
            </div>
          </header>

          {/* SINGLE MAIN CONTENT */}
          <div className="container flex flex-col my-10 lg:flex-row ">
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
              <SingleContent data={single} />
            </div>
            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
              <Sidebar />
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default PageSingleTemp3Sidebar;
