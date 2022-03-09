import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
// import { NextRouter, useRouter } from 'next/router'
import { SinglePageType } from "../../pages/PageSingle";
import { CampaignDataType } from "../../data/types";
import Blocks, { DataProp, Block } from "editorjs-blocks-react-renderer";
import ButtonPrimary from "../../components/ButtonPrimary";
import { ONE_NEAR } from "../../utils/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import Input from "../../components/Input";
import Label from "../../components/Label";

// import * = require('editorjs-react-renderer');

export interface SingleContentProps {
  data: CampaignDataType;
}

const sampleNftImages = [
  "/images/1432_yen_nhi-tranh_tu_hoa_va_con_vat_e_yeu-_acrylic-44x55.jpg",
  "https://laodongthudo.vn/stores/news_dataimages/thuthuy/052016/23/11/1429_Nguyen_Han_Dy_-_duong_pho_nha_em-sap_mau-2016.jpg",
  "https://laodongthudo.vn/stores/news_dataimages/thuthuy/052016/23/11/1427_Nguyen_Vu_Nguyen_Anh_-_be_lam_nguoi_mau.jpg",
  "https://laodongthudo.vn/stores/news_dataimages/phuongbui/102021/28/11/4240_247614095_2058940807604315_4323416370838736564_n.jpg?rt=20211028114242",
];
let des: DataProp = {
  time: 1646569028670,
  blocks: [
    {
      id: "lRjaWidBtj",
      type: "paragraph",
      data: {
        text: "description",
      },
    },
  ],
  version: "2.23.2",
};
const SingleContent: FC<SingleContentProps> = ({ data }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { description, comment_count } = data;
  console.log(
    "🚀 ~ file: CampaignSingleContent.tsx ~ line 22 ~ description",
    description
  );

  const commentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="space-y-10 nc-SingleContent">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content"
          className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
        >
          {/* THIS IS THE DEMP CONTENT */}
          {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
          {/* {description} */}
          <Blocks data={description as DataProp | any} />
        </div>

        {/* AUTHOR */}
        {/* <div className="max-w-screen-md mx-auto border-t border-b border-neutral-100 dark:border-neutral-700"></div>
      <div className="max-w-screen-md mx-auto ">
        <SingleAuthor author={author} />
      </div> */}

        <div
          id="comment"
          ref={commentRef}
          className="max-w-screen-md pt-5 mx-auto space-y-4"
        ></div>

        {/* NFT Attached */}
        <div
          id="nftAttached"
          className="max-w-screen-md pt-5 mx-auto space-y-4"
        >
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            NFT Attached (3)
          </h3>

          <div className="">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {sampleNftImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt="nft"
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                    onClick={openModal}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* COMMENT FORM */}
        <div
          id="comment"
          ref={commentRef}
          className="max-w-screen-md pt-5 mx-auto"
        >
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            Responses ({comment_count})
          </h3>
          <SingleCommentForm
            onClickSubmit={(id) => console.log(id)}
            onClickCancel={(id) => console.log(id)}
          />
        </div>

        {/* COMMENTS LIST */}
        {/* <div className="max-w-screen-md mx-auto">
        <SingleCommentLists comments={comments} />
      </div> */}
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  NFT was bought by someone
                </Dialog.Title>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-500">
                    The account "elonmusk.near" bought the NFT with ID "1" for
                    179 NEAR.
                  </p>
                  <label className="block md:col-span-1">
                    <Label>Enter bid amount target: *</Label>
                    <Input type="number" className="mt-1" defaultValue={179} />
                  </label>

                  {/* Number input */}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Make bid
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SingleContent;
