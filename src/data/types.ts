//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
}

export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
}

export interface PostDataType {
  id: string | number;
  author: PostAuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  like: {
    count: number;
    isLiked: boolean;
  };
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string;
  galleryImgs?: string[];
}

export interface CampaignDataType {
  id: string | number;
  author: string;
  title: string;
  created_at: string;
  end_date: string;
  href: string;
  donated: number;
  goal: number;
  country: CountryType;
  category: CategoryType;
  description?: string;
  like_count: number;
  is_liked: boolean;
  comment_count: number;
  campaign_type: "standard" | "video" | "gallery" | "audio";
  base_uri_content: string;
  featured_image?: string;
  video_url?: string;
  audio_url?: string;
  // gallery_imgs?: string[];
}

export interface CountryType {
  id: string | number;
  name: string;
  flag: string;
}

export interface CategoryType {
  id: string | number;
  name: string;
  color?: TwMainColor | string;
  href: string;
}

export interface NearAuthorType {
  id: string | number;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  countDonated: number;
  campaign: number[];
  desc?: string;
  jobName?: string;
  href?: string;
  type?: "Individual" | "Organization" | "Volunteer" | "Unknown";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export type RequestBaseUriContentType = {
  passport?: string;
  name?: string;
  email?: string;
  jobName?: string;
  note?: string;
};

export interface RequestType {
  request_id: number;
  base_uri_content: string;
  request_type: string;
  created_at: number;
  created_by: string;
  is_closed: boolean;
  is_accepted: boolean;
  // inherited from RequestBaseUriContentType
  uri_content?: RequestBaseUriContentType;
}
