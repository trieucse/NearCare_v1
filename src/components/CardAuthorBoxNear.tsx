import React, { FC } from "react";
import { NearAuthorType, PostAuthorType } from "../data/types";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Avatar from "./Avatar";
import { NavLink } from "./NavLink";

export interface CardAuthorBoxProps {
  className?: string;
  author: NearAuthorType;
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({ className = "", author }) => {
  const { displayName, href = "/", avatar, jobName, countDonated } = author;
  // console.log(avatar);
  return (
    <NavLink
      href={href}
      activeClassName={`nc-CardAuthorBox flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardAuthorBox"
    >
      <a className="nc-CardAuthorBox flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ">
        <Avatar
          sizeClass="w-20 h-20 text-2xl"
          radius="rounded-full"
          imgUrl={avatar}
          userName={displayName}
        />
        <div className="mt-3">
          <h2 className={`text-base font-medium`}>
            <span className="line-clamp-1">{displayName}</span>
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            @{jobName}
          </span>
        </div>
        <div className="py-2 px-4 mt-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
          {countDonated} Ⓝ{" "}
          <ArrowRightIcon className="w-5 h-5 text-yellow-600 ml-3" />
        </div>
      </a>
    </NavLink>
  );
};

export default CardAuthorBox;
