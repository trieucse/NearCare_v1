import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CampaignDataType } from "../../data/types";
import { RootState } from "../store";
import {COUNTRIES,CATEGORIES} from "../../data/campaign";

interface campaignState {
  campaign: CampaignDataType[];
}
let campaigns = {
  id: "",
  author:{
    id: 0,
    displayName: "",
    avatar: "",
    bgImage: "",
    email: "",
    countDonated: 0,
    campaign:[],
    desc: "",
    jobName: "",
    href: "",
    organization: false,

  },
  date: "",
  href: "",
  donated: 0,
  goal: 0,
  Country: COUNTRIES[0],
  categoriesId: CATEGORIES[0],
  title: "",
  featuredImage: "",
  desc: "",
  like: {
    count: 0,
    isLiked: false,
  },
  commentCount: 0,
  viewdCount: 0,
  postType: "standard",
  videoUrl: "",
  audioUrl: "",
  galleryImgs: [],
};
const initialState: campaignState = {
  campaign: []
};

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addCampaign: (state, action: PayloadAction<CampaignDataType>) => {
      state = {
        ...state,
        campaign: [...state.campaign, action.payload],
      };
      return state;
    },
    removeCampaign: (state, action: PayloadAction<CampaignDataType>) => {
      state = {
        ...state,
        campaign: [...state.campaign, action.payload],
      };
      return state; 
    },
  },
});

export const { addCampaign,  removeCampaign} =
campaignSlice.actions; 

export const selectLoginState = (state: RootState) =>
  state.campaign.campaign;

export default campaignSlice.reducer;
