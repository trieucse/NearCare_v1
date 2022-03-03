import React, { FC } from "react";
import PostCardCommentBtn from "./PostCardCommentBtn";
import { CampaignDataType, PostDataType } from "../data/types";
import CampaignCardLikeContainer from "../containers/CampaignCardLikeContainer";

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  campaignData: Pick<
    CampaignDataType,
    "like_count" | "id" | "href" | "comment_count" | "is_liked"
  >;
  hiddenCommentOnMobile?: boolean;
  onClickLike?: (id: CampaignDataType["id"]) => void;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  campaignData,
  onClickLike = () => {},
}) => {
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
      <CampaignCardLikeContainer
        className={itemClass}
        like_count={campaignData.like_count}
        is_liked={campaignData.is_liked}
        onClickLike={onClickLike}
        postId={campaignData.id}
      />
      <PostCardCommentBtn
        href={campaignData.href}
        commentCount={campaignData.comment_count}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
      />
    </div>
  );
};

export default PostCardLikeAndComment;
