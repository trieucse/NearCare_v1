import React, { FC, useEffect, useRef } from "react";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
// import { NextRouter, useRouter } from 'next/router'
import { SinglePageType } from "../../pages/PageSingle";
import { CampaignDataType } from "../../data/types";
import Blocks, { DataProp, Block } from "editorjs-blocks-react-renderer";

// import * = require('editorjs-react-renderer');

export interface SingleContentProps {
  data: CampaignDataType;
}
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
  const { description, comment_count } = data;
  console.log(
    "🚀 ~ file: CampaignSingleContent.tsx ~ line 22 ~ description",
    description
  );

  const commentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="nc-SingleContent space-y-10">
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
      {/* <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      <div className="max-w-screen-md mx-auto ">
        <SingleAuthor author={author} />
      </div> */}

      {/* COMMENT FORM */}
      <div
        id="comment"
        ref={commentRef}
        className="max-w-screen-md mx-auto pt-5"
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
  );
};

export default SingleContent;
