import { SinglePageType } from "../pages/PageSingle";
import { DEMO_TAGS } from "./taxonomies";
import __comments from "./jsons/__comments.json";
import { DEMO_AUTHORS } from "./authors";
import { CommentType } from "../components/CommentCard";
import podcastImg from "../images/podcast.jpg";
import { CampaignDataType } from "./types";

// function nested the comment child -- make tree comment
const nest = (
  items: CommentType[],
  id: number | null | undefined
): CommentType[] => {
  return items
    .filter((item) => item.parentId === id)
    .map((item) => ({
      ...item,
      children: nest(items, item.id as number | null),
    }));
};

// AUTHOR RANDOM FOR DEMO
const commentHasAuthor = __comments.map((item) => ({
  ...item,
  author: DEMO_AUTHORS[Math.floor(Math.random() * 10)],
}));

//
export const DEMO_COMMENTS = nest(commentHasAuthor, null);

export const SINGLE: SinglePageType = {
  id: "eae0212192f63287e0c212",
  featuredImage:
    "https://images.unsplash.com/photo-1605487903301-a1dff2e6bbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1957&q=80",
  title: "Quiet ingenuity: 120,000 lunches and counting",
  desc: "We’re an online magazine dedicated to covering the best in international product design. We started as a little blog back in 2002 covering student work and over time",
  date: "May 20, 2021",
  href: "/single/this-is-single-slug",
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: "Mimi",
    lastName: "Fones",
    displayName: "Fones Mimi",
    email: "mfones9@canalblog.com",
    avatar: "",
    count: 38,
    href: "/author/the-demo-author-slug",
    desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
    jobName: "Author Job",
  },
  categories: [
    {
      id: 1,
      name: "Garden",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmRlbmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 13,
      color: "pink",
      taxonomy: "category",
    },
    {
      id: 2,
      name: "Jewelry",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "standard",
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};

export const SINGLE_AUDIO: SinglePageType = {
  id: "ea21212f687e0c",
  featuredImage: podcastImg.toString(),
  title: "Programming Languages",
  desc: "We’re an online magazine dedicated to covering the best in international product design. We started as a little blog back in 2002 covering student work and over time",
  date: "May 20, 2021",
  href: "/single/this-is-single-slug",
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: "Mimi",
    lastName: "Fones",
    displayName: "Fones Mimi",
    email: "mfones9@canalblog.com",
    avatar: "",
    count: 38,
    href: "/author/the-demo-author-slug",
    desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
    jobName: "Author Job",
  },
  categories: [
    {
      id: 2,
      name: "Jewelry",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "audio",
  audioUrl: "https://soundcloud.com/tacongtung/2a-6-co-don-danh-cho-ai-remix",
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};

export const SINGLE_VIDEO: SinglePageType = {
  id: "ea21ac32ds-6c192f68dscx7e0c212",
  featuredImage:
    "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  title: "Julio Urías does it all as Dodgers sweep in San Francisco",
  desc: "We’re an online magazine dedicated to covering the best in international product design. We started as a little blog back in 2002 covering student work and over time",
  date: "May 20, 2021",
  href: "/single/this-is-single-slug",
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: "Mimi",
    lastName: "Fones",
    displayName: "Fones Mimi",
    email: "mfones9@canalblog.com",
    avatar: "",
    count: 38,
    href: "/author/the-demo-author-slug",
    desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
    jobName: "Author Job",
  },
  categories: [
    {
      id: 2,
      name: "Jewelry",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "video",
  videoUrl: "https://www.youtube.com/watch?v=a6roH6RffnA",
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};

export const SINGLE_GALLERY: SinglePageType = {
  id: "eae0e85fd226c192f68dscx7e220c",
  featuredImage:
    "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  title: "Julio Urías does it all as Dodgers sweep in San Francisco",
  desc: "We’re an online magazine dedicated to covering the best in international product design. We started as a little blog back in 2002 covering student work and over time",
  date: "May 20, 2021",
  href: "/single/this-is-single-slug",
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: "Mimi",
    lastName: "Fones",
    displayName: "Fones Mimi",
    email: "mfones9@canalblog.com",
    avatar: "",
    count: 38,
    href: "/author/the-demo-author-slug",
    desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
    jobName: "Author Job",
  },
  categories: [
    {
      id: 2,
      name: "Jewelry",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "gallery",
  galleryImgs: [
    "https://images.pexels.com/photos/7354442/pexels-photo-7354442.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  ],
  tags: [DEMO_TAGS[0], DEMO_TAGS[1], DEMO_TAGS[3]],
  content: "",
  comments: DEMO_COMMENTS,
};
