import React, { FC, useState } from "react";
import { DEMO_POSTS } from "../data/posts";
import { PostDataType } from "../data/types";
import Pagination from "../components/Pagination";
import ButtonPrimary from "../components/ButtonPrimary";
import Nav from "../components/Nav";
import NavItem from "../components/NavItem";
import ArchiveFilterListBox from "../components/ArchiveFilterListBox";
import Input from "../components/Input";
import useDemoTabFilter from "../hooks/useDemoTabFilter";
import SectionSubscribe2 from "../components/SectionSubscribe2";
import NcImage from "../components/NcImage";
import NcLink from "../components/NcLink";
import SectionSliderNewAuthors from "../components/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "../data/authors";
import ButtonSecondary from "../components/ButtonSecondary";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import SectionGridCategoryBox from "../components/SectionGridCategoryBox";
import BackgroundSection from "../components/BackgroundSection";
import Card11 from "../components/Card11";
import ButtonCircle from "../components/ButtonCircle";
import Head from "next/head";

export interface PageSearchProps {
  className?: string;
}

const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 1);
const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];
const TABS = ["Articles", "Categories", "Tags", "Authors"];

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  let s = "Technology";

  let timeOut: NodeJS.Timeout | null = null;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<string>(TABS[0]);

  const activePosts = useDemoTabFilter({
    isLoading,
    initPosts: posts,
    tabs: TABS,
    tabActive,
  });

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setIsLoading(true);
    setTabActive(item);
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
      <Head>
        <title>Nc || Search Page Template</title>
      </Head>

      {/* HEADER */}
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-7 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
        </div>
        {/* CONTENT */}
        <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex items-center">
            <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl font-semibold">{s}</h2>
              <span className="block text-xs sm:text-sm mt-4 text-neutral-500 dark:text-neutral-300">
                We found{" "}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  1135
                </strong>{" "}
                results for{" "}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  {s}
                </strong>
              </span>
              <form
                className="relative w-full mt-8 sm:mt-11 text-left"
                method="post"
              >
                <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">Search all icons</span>
                  <Input
                    id="search-input"
                    type="search"
                    placeholder="Type and press enter"
                    sizeClass="pl-14 py-5 pr-5 md:pl-16"
                    defaultValue={s}
                  />
                  <ButtonCircle
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                  >
                    <i className="las la-arrow-right text-xl"></i>
                  </ButtonCircle>
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                      ></path>
                    </svg>
                  </span>
                </label>
              </form>
              <div className="w-full text-sm text-left mt-4 text-neutral-500 dark:text-neutral-300">
                <div className="inline-block">
                  <span className="mr-2.5">Related:</span>
                  <NcLink className="mr-2.5 inline-block font-normal" href="/#">
                    Design
                  </NcLink>
                  <NcLink className="mr-2.5 inline-block font-normal" href="/#">
                    Photo
                  </NcLink>
                  <NcLink className="mr-2.5 inline-block font-normal" href="/#">
                    Vector
                  </NcLink>
                  <NcLink className="mr-2.5 inline-block font-normal" href="/#">
                    Frontend
                  </NcLink>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav
              containerClassName="w-full overflow-x-auto hiddenScrollbar"
              className="sm:space-x-2"
            >
              {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
            {activePosts.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageSearch;
