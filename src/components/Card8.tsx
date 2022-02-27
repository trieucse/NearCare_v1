import React, { FC } from "react";
import NcImage from "./NcImage";
import { PostDataType } from "../data/types";
import Link from "next/link";
import SocialsShare from "./SocialsShare";
import CategoryBadgeList from "./CategoryBadgeList";
import PostTypeFeaturedIcon from "./PostTypeFeaturedIcon";

export interface Card8Props {
  className?: string;
  post: PostDataType;
}

const Card8: FC<Card8Props> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage, desc, categories, postType } = post;

  return (
    <div
      className={`nc-Card8 group relative [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden ${className}`}
      data-nc-id="Card8"
    >
      <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" />
      <Link
        href={href}
      >
        <a className="block w-full h-0 pt-[100%] sm:pt-[55%] rounded-xl overflow-hidden">
        <NcImage
          prevImageHorizontal
          containerClassName="absolute inset-0"
          src={featuredImage}
          alt={title}
        />
        <PostTypeFeaturedIcon
          className="absolute top-4 left-4"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
        </a>
      </Link>
      
      {/* <Link
        href={href}
        
      ><a className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-neutral-900 "></a></Link> */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col">
        {/* <Link href={href}  /> */}
        <a className="absolute inset-0"><CategoryBadgeList categories={categories} /></a>
        <h2
          className={`mt-3 relative block font-semibold text-neutral-50 text-lg sm:text-xl`}
        >
          <Link href={href} >
            <a className="line-clamp-2" title={title}>
            {title}
            </a>
          </Link>
        </h2>
        <div className="hidden sm:block mt-2">
          <span className="text-neutral-300 text-sm line-clamp-1">{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default Card8;
