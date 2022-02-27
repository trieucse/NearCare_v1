import React, { FC, useEffect } from "react";
import Heading from "./Heading";
import { PostDataType } from "../data/types";
import ncNanoId from "../utils/ncNanoId";
import CardAuthorBox2 from "./CardAuthorBox2";
import NextPrev from "./NextPrev";
import Glide from "@glidejs/glide";

// let r = (Math.random() + 1).toString(36).substring(7);
const UNIQUE_CLASS = "glide_";
export interface SectionSliderNewAuthorsProps {
  className?: string;
  heading: string;
  subHeading: string;
  authors: PostDataType["author"][];
}
const SectionSliderNewAuthors: FC<SectionSliderNewAuthorsProps> = ({
  heading,
  subHeading,
  className="",
  authors,
}) => {


  useEffect(() => {
    console.log(UNIQUE_CLASS);
    setTimeout(() => {
      new Glide(`.${UNIQUE_CLASS}`, {
        perView: 5,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: {
            perView: 4,
          },
          1023: {
            gap: 24,
            perView: 3,
          },
          767: {
            gap: 20,
            perView: 2,
          },
          639: {
            gap: 20,
            perView: 2,
          },
          500: {
            gap: 20,
            perView: 1,
          },
        },
      }).mount();
    }, 100);
  }, []);
  return (
    <div className={`nc-SectionSliderNewAuthors ${className}`}>
      <div className={`${UNIQUE_CLASS}`}>
        <Heading isCenter desc={subHeading}>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {authors.map((item, index) => (
              <li key={index} className="glide__slide pb-12 md:pb-16">
                <CardAuthorBox2 author={item} />
              </li>
            ))}
          </ul>
        </div>
        <NextPrev
          btnClassName="w-12 h-12"
          containerClassName="justify-center"
        />
      </div>
    </div>
  );
};

export default SectionSliderNewAuthors;
