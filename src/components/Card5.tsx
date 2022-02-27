import React, { FC } from "react";
import Link from "next/link";
import { PostDataType } from "../data/types";
import CardAuthor2 from "./CardAuthor2";
import CategoryBadgeList from "./CategoryBadgeList";

export interface Card5Props {
  className?: string;
  post: PostDataType;
}

const Card5: FC<Card5Props> = ({
  className = "[ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ",
  post,
}) => {
  const { author, title, href, id, date, categories, readingTime } = post;
  return (
    <div
      className={`nc-Card5 relative p-5 group ${className}`}
      data-nc-id="Card5"
      data-nc-post-id={id}
    >
      <Link href={href} ><a className="absolute inset-0 rounded-lg"></a></Link>

      <div className="flex flex-col">
        <CategoryBadgeList categories={categories} />
        <h2
          className="block text-base font-semibold text-neutral-800 dark:text-neutral-300 my-4"
          title={title}
        >
          <Link href={href} >
            <a className="line-clamp-2" title={title}>
            {title}
            </a>
          </Link>
        </h2>
        <CardAuthor2
          className="relative mt-auto"
          readingTime={readingTime}
          author={author}
          date={date}
        />
      </div>
    </div>
  );
};

export default Card5;
