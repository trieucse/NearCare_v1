import React, { FC } from "react";
import NcImage from "./NcImage";
import GallerySlider from "./GallerySlider";
import MediaVideo from "./MediaVideo";
import PostTypeFeaturedIcon from "./PostTypeFeaturedIcon";

import MediaAudio from "./MediaAudio";
import { CampaignDataType } from "../data/types";

export interface CampaignFeaturedMediaProps {
  className?: string;
  campaign: CampaignDataType;
  isHover?: boolean;
}

const CampaignFeaturedMedia: FC<CampaignFeaturedMediaProps> = ({
  className = "w-full h-full",
  campaign,
  isHover = false,
}) => {
  const { featured_image, campaign_type, video_url } = campaign;

  const isPostMedia = () =>
    campaign_type === "video" || campaign_type === "audio";

  const renderContent = () => {
    // VIDEO
    if (campaign_type === "video" && !!video_url && isHover) {
      return <MediaVideo isHover videoUrl={video_url} />;
    }

    // ICON
    return (
      <div className="absolute inset-0">
        {isPostMedia() && (
          <span className="absolute inset-0 flex items-center justify-center ">
            <PostTypeFeaturedIcon
              className="hover:scale-105 transform cursor-pointer transition-transform nc-will-change-transform"
              postType={campaign_type}
            />
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-PostFeaturedMedia relative ${className}`}
      data-nc-id="PostFeaturedMedia"
    >
      <NcImage containerClassName="absolute inset-0" src={featured_image} />
      {renderContent()}
    </div>
  );
};

export default CampaignFeaturedMedia;
