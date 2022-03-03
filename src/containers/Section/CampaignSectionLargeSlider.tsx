import Heading from "../../components/Heading";
import { CampaignDataType } from "../../data/types";
import React, { FC, useState } from "react";
import CardLarge1 from "../../components/CampaignCardLarge";

export interface SectionLargeSliderProps {
  className?: string;
  heading?: string;
  campaigns: CampaignDataType[];
}

const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  campaigns,
  heading = "Editor's pick",
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= campaigns.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return campaigns.length - 1;
      }
      return state - 1;
    });
  };

  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {!!heading && <Heading>{heading}</Heading>}
      {campaigns.map((item, index) => (
        <CardLarge1
          key={index}
          isShowing={indexActive === index}
          onClickNext={handleClickNext}
          onClickPrev={handleClickPrev}
          campaign={item}
        />
      ))}
    </div>
  );
};

export default SectionLargeSlider;
