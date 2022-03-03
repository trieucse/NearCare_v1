import React, { FC } from "react";
import ButtonPlayMusicRunningContainer from "../containers/CampaignButtonPlayMusicRunningContainer";
import { CampaignDataType } from "../data/types";

export interface MediaAudioProps {
  campaign: CampaignDataType;
}

const MediaAudio: FC<MediaAudioProps> = ({ campaign }) => {
  return (
    <ButtonPlayMusicRunningContainer
      className="absolute bg-neutral-900 bg-opacity-30 flex items-center justify-center inset-0"
      campaign={campaign}
    />
  );
};

export default MediaAudio;
