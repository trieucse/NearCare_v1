import Card15Podcast from "../../components/Card15Podcast";
import Card9 from "../../components/Card9";
import Heading from "../../components/Heading";
import { DEMO_POSTS_AUDIO } from "../../data/posts";
import { PostDataType } from "../../data/types";
import React, { FC } from "react";

const postsDemo: PostDataType[] = DEMO_POSTS_AUDIO.filter(
  (_, i) => i > 0 && i < 10
);

export interface SectionMagazine9Props {
  posts?: PostDataType[];
  className?: string;
}

const SectionMagazine9: FC<SectionMagazine9Props> = ({
  posts = postsDemo,
  className = "",
}) => {
  return (
    <div className={`nc-SectionMagazine9 relative ${className}`}>
      <Heading desc={"Click on music icon and enjoy music or podcast"}>
        Listen to audio live
      </Heading>
      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`}>
        <Card9 ratio="aspect-w-4 aspect-h-3 " post={posts[0]} />
        <Card9 ratio="aspect-w-4 aspect-h-3 " post={posts[1]} />
        <Card9 ratio="aspect-w-4 aspect-h-3 " post={posts[2]} />
      </div>
      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8`}>
        {posts
          .filter((_, i) => i > 2)
          .map((p) => (
            <Card15Podcast key={p.id} post={p} />
          ))}
      </div>
    </div>
  );
};

export default SectionMagazine9;
