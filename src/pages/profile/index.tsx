import Link from "next/link";
import { TagIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import Profile from "../../components/Profile";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState, selectUserState } from "../../app/login/login";
import { NearAuthorType } from "../../data/types";
import axios from "axios";
import { Widget } from "@uploadcare/react-widget";
import ButtonPrimary from "../../components/ButtonPrimary";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import campaign from "../../app/campaign/campaign";

export default function ProfilePage() {
  const router = useRouter();
  const loginState = useAppSelector(selectLoginState);
  const userState = useAppSelector(selectUserState);
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
    const getUserCampaigns = async () => {
      if (!window.contract) {
        return;
      }

      const campaigns = await window.contract.get_campaigns_by_user_paging({
        account_id: window.accountId,
        page_number: (router.query.page as string) || "1",
        page_size: "10",
      });

      setCampaignsCreated(campaigns);
    };
    getUserCampaigns();
  }, [router.query.page, window.contract]);

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
          campaignCreated={campaignsCreated}
        />
      </ProfileLayout>
    </>
  );
}
