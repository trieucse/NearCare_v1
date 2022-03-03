import LayoutPage from "../../components/LayoutPage";
import React, { ComponentType, FC, useEffect, useState } from "react";
import Head from "next/head";
// import NcLink from "../../components/NcLink";
import Textarea from "../../components/Textarea";
import ButtonPrimary from "../../components/ButtonPrimary";
import Label from "../../components/Label";
import Input from "../../components/Input";
// import Select from "../../components/Select";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../../components/Select";
import { CATEGORIES, COUNTRIES } from "../../data/campaign";

export interface PageDashboardProps {
  className?: string;
}
const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setTarget] = useState(100);
  const [end_date, setStartDate] = useState(new Date());
  const [category_id, setCategory] = useState(0);
  const [base_uri_content, setUrl] = useState("");
  const [country_id, setCountry] = useState(0);
  const [campaign_type, setCampaign] = useState(0);
  // const [video_url, setVideo] = useState("");
  // const [audio_url, setAudio] = useState("");
  // const [video_url, setCategory] = useState("");

  const [showNotification, setShowNotification] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const create_campaign = await window.contract.create_campaign(
        {
          title: title,
          end_date: end_date,
          description: description,
          goal: goal,
          // featured_image: "",
          category_id: category_id,
          country_id: country_id,
          campaign_type: campaign_type,
          // video_url: "",
          // audio_url: "",
          // gallery_imgs: [],
          base_uri_content: base_uri_content,
        },
        300000000000000,
        "500000000000000000000000"
      );
      // console.log(create_campaign);
      // toast.success("created susccess!", {
      //   position: "bottom-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
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
          <form className="grid md:grid-cols-12 gap-4" onSubmit={handleSubmit}>
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
              <div className="grid md:grid-cols-4 gap-4">
                <label className="block md:col-span-1">
                  <Label>End Date *</Label>
                  <DatePicker
                    className="block text-center w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full text-sm font-normal h-11 px-4 py-3 mt-1"
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
              <div className="grid md:grid-cols-6 gap-4">
                <label className="block md:col-span-3">
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
                <label className="block md:col-span-3">
                  <Label>IPFS Url *</Label>
                  <Input
                    type="text"
                    className="mt-1"
                    value={base_uri_content}
                    required
                    placeholder="img url , video url or audio url here..."
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </label>
              </div>
            </div>
            {/* <label className="block md:col-span-12">
              <Label>Video URL</Label>
              <Input
                type="text"
                className="mt-1"
                value={video_url}
                placeholder="https://www.youtube.com/"
                onChange={(e) => setVideo(e.target.value)}
              />
            </label>

            <label className="block md:col-span-12">
              <Label>Audio URL</Label>
              <Input
                type="text"
                className="mt-1"
                value={audio_url}
                onChange={(e) => setAudio(e.target.value)}
              />
            </label> */}

            <label className="block md:col-span-12">
              <Label>Description *</Label>
              <Textarea
                className="mt-1"
                rows={10}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* <p className="mt-1 text-sm text-neutral-500">
                Brief description for your article. URLs are hyperlinked.
              </p> */}
            </label>

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
