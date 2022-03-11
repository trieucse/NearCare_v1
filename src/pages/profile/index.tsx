import React, { useEffect, useState } from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import Profile from "../../components/Profile";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectInitState,
  selectLoginState,
  selectUserState,
} from "../../app/login/login";
import { useRouter } from "next/router";
import {
  addCampaign,
  removeCampaign,
  selecCampaignsState,
} from "../../app/campaign/campaign";
import { CampaignDataType, NearAuthorType } from "../../data/types";
import { CATEGORIES, COUNTRIES } from "../../data/campaign";
import axios from "axios";
import string_to_slug from "../../utils/string2slug";
import { utils } from "near-api-js";

export default function ProfilePage() {
  const router = useRouter();
  const loginState = useAppSelector(selectLoginState);
  const userState = useAppSelector(selectUserState);
  const initState = useAppSelector(selectInitState);
  const campaignsState = useAppSelector(selecCampaignsState);
  const dispatch = useAppDispatch();

  const [campaignsCreated, setCampaignsCreated] = useState<any>([]);

  const {
    displayName,
    avatar,
    desc,
    email,
    href,
    jobName,
    bgImage,
    type: userType,
  }: any = userState || {};

  useEffect(() => {
    if (!loginState) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [loginState]);

  useEffect(() => {
    dispatch(removeCampaign([]));
    if (initState) {
      const list_crowdfund = async () => {
        let list_campaign_data: CampaignDataType[] = [];
        try {
          const list_campaign =
            await window.contract.get_campaigns_by_user_paging({
              account_id: window.accountId,
              page_number: (router.query.page as string) || "1",
              page_size: "10",
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

  // useEffect(() => {
  //   const getUserCampaigns = async () => {
  //     if (!window.contract) {
  //       return;
  //     }

  //     const campaigns = await window.contract.get_campaigns_by_user_paging({
  //       account_id: window.accountId,
  //       page_number: (router.query.page as string) || "1",
  //       page_size: "10",
  //     });

  //     setCampaignsCreated(campaigns);
  //   };
  //   getUserCampaigns();
  // }, [router.query.page, window.contract]);

  return (
    <>
      <ProfileLayout>
        <Profile
          avatar={avatar || "/images/no-avatar.png"}
          displayName={displayName}
          desc={desc}
          email={email}
          href={href}
          jobName={jobName}
          bgImage={bgImage}
          userType={userType}
          campaignCreated={campaignsState}
        />
      </ProfileLayout>
    </>
  );
}
// function dispatch(arg0: {
//   payload: import("../../data/types").CampaignDataType[];
//   type: string;
// }) {
//   throw new Error("Function not implemented.");
// }
