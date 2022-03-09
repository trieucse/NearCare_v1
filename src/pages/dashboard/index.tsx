import LayoutPage from "../../components/LayoutPage";
import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
// import NcLink from "../../components/NcLink";
import ButtonPrimary from "../../components/ButtonPrimary";
import Label from "../../components/Label";
import Input from "../../components/Input";
// import Select from "../../components/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../../components/Select";
import { CATEGORIES, COUNTRIES } from "../../data/campaign";
import { Widget } from "@uploadcare/react-widget";
import dynamic from "next/dynamic";
import { useAppSelector } from "../../app/hooks";
import { selectEditorState } from "../../app/editor/editor";
import axios from "axios";
import { BaseUriContentType } from "../api/v1/campaign/ipfsUpdate";
import { toast } from "react-toastify";
import { GAS, ONE_NEAR, STAKING_STORAGE_AMOUNT } from "../../utils/utils";
import { utils, transactions } from "near-api-js";
import getConfig from "../../config";
import { useRouter } from "next/router";
import { selectUserState } from "../../app/login/login";
const nearConfig = getConfig(process.env.NODE_ENV || "development");

const EditorJsWithNoSSR = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

export interface PageDashboardProps {
  className?: string;
}
const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  const router = useRouter();
  const { transactionHashes, errorCode, errorMessage } = router.query;
  const userState = useAppSelector(selectUserState);

  useEffect(() => {
    console.log("transactionHashes: ", transactionHashes);
    if (transactionHashes && !errorCode) {
      toast.success("Campaign created successfully 🎉");
    }
  }, [transactionHashes]);

  useEffect(() => {
    console.log("errorMessage: ", errorMessage);
    if (errorCode) {
      toast.error("Error creating campaign 🤔");
    }
  }, [errorCode]);

  useEffect(() => {
    // redirect to update profile page
    if (userState?.type === "Unknown") {
      toast.error("Please update your profile first to create campaign");

      setTimeout(() => {
        router.push("/profile/edit");
      }, 2000);
    }
  }, [userState]);

  const description = useAppSelector(selectEditorState);
  const [title, setTitle] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      // const { description, video_url, audio_url, featured_image }: any =
      //   e.currentTarget.elements;

      const saveBaseURIData = () =>
        new Promise(async (resolve) => {
          const { data } = await axios.post<BaseUriContentType>(
            "/api/v1/campaign/ipfsUpdate",
            {
              description: description,
              video_url: video_url,
              audio_url: audio_url,
              featured_image: featured_image,
            }
          );

          resolve(data);
        });

      toast.promise(saveBaseURIData, {
        pending: "Uploading to IPFS...",
        success: "Data uploaded to IPFS... 👌",
        error: "Something wrong with the data 🤯",
      });

      const base_uri_content = await saveBaseURIData();
      const result = await window.account.signAndSendTransaction({
        receiverId: nearConfig.contractName,
        actions: [
          transactions.functionCall(
            "create_campaign",
            {
              title: title,
              // end_date: toTimestamp(end_date.toString()),
              end_date: toNanoTime(end_date.toString()),
              goal: utils.format.parseNearAmount(goal.toString()),
              category_id: category_id,
              country_id: country_id,
              campaign_type: campaign_type,
              base_uri_content: base_uri_content,
            },
            GAS,
            STAKING_STORAGE_AMOUNT
          ),
        ],
      });

      console.log("Result: ", result);
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return <></>;
};

export default PageDashboard;

function toNanoTime(strDate: string) {
  var datum = Date.parse(strDate);
  return datum * 1000000;
}
