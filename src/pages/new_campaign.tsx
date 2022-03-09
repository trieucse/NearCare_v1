import LayoutPage from "../components/LayoutPage";
import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
// import NcLink from "../components/NcLink";
import ButtonPrimary from "../components/ButtonPrimary";
import Label from "../components/Label";
import Input from "../components/Input";
// import Select from "../components/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../components/Select";
import { CATEGORIES, COUNTRIES } from "../data/campaign";
import { Widget } from "@uploadcare/react-widget";
import dynamic from "next/dynamic";
import { useAppSelector } from "../app/hooks";
import { selectEditorState } from "../app/editor/editor";
import axios from "axios";
import { BaseUriContentType } from "./api/v1/campaign/ipfsUpdate";
import { toast } from "react-toastify";
import { GAS, ONE_NEAR, STAKING_STORAGE_AMOUNT } from "../utils/utils";
import { utils, transactions } from "near-api-js";
import getConfig from "../config";
import { useRouter } from "next/router";
import { selectUserState } from "../app/login/login";
const nearConfig = getConfig(process.env.NODE_ENV || "development");

const EditorJsWithNoSSR = dynamic(() => import("../components/Editor"), {
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
  // const [description, setDescription] = useState();
  const [goal, setTarget] = useState(100);
  const [end_date, setStartDate] = useState(new Date());
  const [category_id, setCategory] = useState(0);
  const [base_uri_content, setUrl] = useState("");
  const [country_id, setCountry] = useState(0);
  const [campaign_type, setCampaign] = useState(0);

  const [video_url, setVideo] = useState("");
  const [audio_url, setAudio] = useState("");
  const [featured_image, setImage] = useState<string | null>("");

  const uploadImageToClient = (e: any) => {
    setImage(e.originalUrl);
  };

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

  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Head>
        <title>Dashboard || Create new campaigns</title>
      </Head>

      <LayoutPage heading="New campaign" subHeading="" headingEmoji="⚙">
        <div className="flex flex-col">
          <form className="grid gap-4 md:grid-cols-12" onSubmit={handleSubmit}>
            <label className="block md:col-span-12">
              <Label>Title *</Label>
              <Input
                type="text"
                className="mt-1"
                value={title}
                required
                placeholder="enter title here..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <div className="block md:col-span-12">
              <div className="grid gap-4 md:grid-cols-4">
                <label className="block md:col-span-1">
                  <Label>End Date *</Label>
                  <DatePicker
                    className="block w-full px-4 py-3 mt-1 text-sm font-normal text-center bg-white rounded-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11"
                    selected={end_date}
                    required
                    onChange={(date: Date) => setStartDate(date)}
                  />
                </label>

                <label className="block md:col-span-1">
                  <Label>Category *</Label>
                  <Select
                    className="mt-1"
                    required
                    value={category_id}
                    onChange={(e) => setCategory(parseInt(e.target.value))}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </label>
                <label className="block md:col-span-1">
                  <Label>Country *</Label>
                  <Select
                    className="mt-1"
                    required
                    value={country_id}
                    onChange={(e) => setCountry(parseInt(e.target.value))}
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </label>

                <label className="block md:col-span-1">
                  <Label>Enter donation target: *</Label>
                  <Input
                    type="number"
                    className="mt-1"
                    value={goal}
                    onChange={(e) => setTarget(parseInt(e.target.value))}
                  />
                </label>
              </div>
            </div>
            <div className="block md:col-span-12">
              <div className="grid gap-4 md:grid-cols-12">
                <label className="block md:col-span-4">
                  <Label>Type *</Label>
                  <Select
                    className="mt-1"
                    required
                    value={campaign_type}
                    onChange={(e) => setCampaign(parseInt(e.target.value))}
                  >
                    <option value="">Select campaign type</option>
                    <option value="1">Standard</option>
                    <option value="2">Video</option>
                    <option value="3">Audio</option>
                  </Select>
                </label>
                <label className="block md:col-span-4">
                  <Label>Video URL</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    value={video_url}
                    placeholder="https://www.youtube.com/"
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </label>

                <label className="block md:col-span-4">
                  <Label>Audio URL</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    value={audio_url}
                    onChange={(e) => setAudio(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <label className="block md:col-span-3">
              <Label>Featured image *</Label>
              <div className="flex flex-col items-center justify-center p-4">
                {featured_image && (
                  <img src={featured_image} className="mb-3 w-96" />
                )}
                <div className="uploader-blue-button">
                  <Widget
                    publicKey="533d4b8f6a11de77ba81"
                    onChange={uploadImageToClient}
                    clearable
                  />
                </div>
              </div>
            </label>

            {/* <label className="block md:col-span-12">
              <Label>Description *</Label>
              <Textarea
                className="mt-1"
                rows={10}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />

            </label> */}

            <div className="block md:col-span-12">
              <Label>Description *</Label>
              <div className="block w-full mt-1 text-sm bg-white editor rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900">
                <EditorJsWithNoSSR />
              </div>
            </div>

            <ButtonPrimary className="block md:col-span-12" type="submit">
              Request campaign
            </ButtonPrimary>
          </form>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageDashboard;

function toNanoTime(strDate: string) {
  var datum = Date.parse(strDate);
  return datum * 1000000;
}
