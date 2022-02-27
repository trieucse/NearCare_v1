import React, { FC } from "react";
import NcImage from "./NcImage";
import { TaxonomyType, TwMainColor } from "../data/types";
import Link from "next/link";
import Badge from "./Badge";

export interface CardCategory5Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail, color } = taxonomy;

  return (
    <Link
      href={href}
    
    >
      <a   className={`nc-CardCategory5 relative block group ${className}`}
      data-nc-id="CardCategory5">
      <div
        className={`flex-shrink-0 relative w-full aspect-w-7 aspect-h-7 sm:aspect-h-5 h-0 rounded-2xl sm:rounded-3xl overflow-hidden group`}
      >
        <NcImage
          src={thumbnail}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity"></span>
      </div>
      <Badge
        className="absolute top-3 right-3"
        color={color as TwMainColor}
        name={
          <div>
            {count}
            <i className="ml-3 las la-arrow-right"></i>
          </div>
        }
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2
          className={`text-base font-medium px-4 py-2 sm:px-6 sm:py-3 bg-white text-neutral-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full border-2 border-white border-opacity-60`}
        >
          <span className="line-clamp-1"> {name}</span>
        </h2>
      </div>
      </a>
    </Link>
  );
};

export default CardCategory5;
