import { CampaignDataType, PostDataType } from "../data/types";
import React, { FC } from "react";
import Badge from "./Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: CampaignDataType["category"];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {/* {categories.map((item, index) => ( */}
      <Badge
        className={itemClass}
        key={categories.id}
        name={categories.name}
        href={categories.href}
        color={categories.color as any}
      />
      {/* ))} */}
    </div>
  );
};

export default CategoryBadgeList;
