import React, { FC } from "react";
import NcImage from "./NcImage";
import { CategoryType } from "../data/types";
import { NavLink } from "./NavLink";

export interface CardCategory1Props {
  className?: string;
  category: CategoryType;
  size?: "large" | "normal";
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  category,
}) => {
  const { id, name, href = "/", color } = category;
  return (
    <NavLink
      href={href}
      activeClassName={`nc-CardCategory1 flex items-center ${className}`}
      data-nc-id="CardCategory1"
    >
      <a
        className="nc-CardAuthor flex items-center p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        data-nc-id="CardAuthor"
      >
        {/* <NcImage
        containerClassName={`flex-shrink-0 ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={thumbnail}
      /> */}
        <div>
          <h2
            className={`${
              size === "large" ? "text-lg" : "text-base"
            } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
          >
            {name}
          </h2>
        </div>
      </a>
    </NavLink>
  );
};

export default CardCategory1;
