import WidgetHeading1 from "./WidgetHeading1";
import { CategoryType } from "../data/types";
import React, { FC } from "react";
import CardCategory1 from "./CardCampaignCategory";

export interface WidgetCategoriesProps {
  className?: string;
  categories: CategoryType[];
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  categories,
}) => {
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl  overflow-hidden ${className}`}
      data-nc-id="WidgetCategories"
    >
      <WidgetHeading1
        title="✨ Category"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories.map((category) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={category.id}
              category={category}
              size="normal"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
