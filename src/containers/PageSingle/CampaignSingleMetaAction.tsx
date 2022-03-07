import React, { FC } from "react";
import SocialsShare from "../../components/SocialsShare";
import BookmarkContainer from "../BookmarkContainer";
import { CampaignDataType } from "../../data/types";
import PostCardLikeAndComment from "../../components/CampaignCardLikeAndComment";

export interface SingleMetaActionProps {
  className?: string;
  meta: CampaignDataType;
}

const SingleMetaAction: FC<SingleMetaActionProps> = ({
  className = "mt-5 sm:mt-8",
  meta,
}) => {
  const { id } = meta;

  return (
    <div className={`nc-SingleMetaAction ${className}`}>
      <div className="flex flex-col mt-auto space-y-4 sm:flex-row sm:space-x-3 sm:space-y-0 sm:items-center sm:justify-between">
        <PostCardLikeAndComment
          itemClass="px-4 h-9 text-sm"
          hiddenCommentOnMobile={false}
          campaignData={meta}
        />

        <div className="flex items-center space-x-3 sm:space-x-4">
          <SocialsShare
            className="flex space-x-2"
            itemClass="w-9 h-9 bg-neutral-100 text-lg hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300"
          />
          <div className="h-6 border-l border-neutral-300 dark:border-neutral-700"></div>
          <div
            className={`flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-200 `}
          >
            {/* <PostActionDropdown
              containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              iconClass="h-5 w-5"
              postData={meta}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMetaAction;
