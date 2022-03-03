import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectRecentLikeds,
  selectRecentRemoveds,
  removeLikedByPostId,
  addNewLikedByPostId,
} from "../app/postLikes/postLikes";

import { CampaignDataType, PostDataType } from "../data/types";
import PostCardLikeAction, {
  PostCardLikeActionProps,
} from "../components/PostCardLikeAction";

export interface PostCardLikeContainerProps
  extends Omit<PostCardLikeActionProps, "isLiked" | "likeCount"> {
  like_count: CampaignDataType["like_count"];
  is_liked: CampaignDataType["is_liked"];
}

const PostCardLikeContainer: FC<PostCardLikeContainerProps> = ({
  like_count,
  is_liked,
  postId,
  onClickLike,
  ...args
}) => {
  const recentLikeds = useAppSelector(selectRecentLikeds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const dispatch = useAppDispatch();

  const isLiked = () => {
    if (recentLikeds.includes(postId)) {
      return true;
    }
    if (is_liked && !recentRemoveds.includes(postId)) {
      return true;
    }
    return false;
  };

  const getLikeCount = (): number => {
    // Recent Liked
    if (recentLikeds.includes(postId)) {
      return like_count + 1;
    }
    if (is_liked && recentRemoveds.includes(postId)) {
      return like_count - 1;
    }
    return like_count;
  };

  const handleClickLike = () => {
    if (isLiked()) {
      dispatch(removeLikedByPostId(postId));
    } else {
      dispatch(addNewLikedByPostId(postId));
    }
    onClickLike && onClickLike(postId);
  };

  return (
    <PostCardLikeAction
      {...args}
      isLiked={isLiked()}
      likeCount={getLikeCount()}
      postId={postId}
      onClickLike={handleClickLike}
    />
  );
};

export default PostCardLikeContainer;
