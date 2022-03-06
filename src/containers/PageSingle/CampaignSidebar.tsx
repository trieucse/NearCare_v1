import React, { FC } from "react";
import WidgetCategories from "../../components/WidgetCampaignCategories ";
import { CATEGORIES } from "../../data/campaign";

export interface SidebarProps {
  className?: string;
}

const categories = CATEGORIES.filter((_, i) => i > 7 && i < 13);

export const Sidebar: FC<SidebarProps> = ({ className = "space-y-6 " }) => {
  return (
    <div className={`nc-SingleSidebar ${className}`}>
      <WidgetCategories categories={categories} />
    </div>
  );
};
