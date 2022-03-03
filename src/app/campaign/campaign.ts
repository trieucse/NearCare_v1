import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CampaignDataType } from "../../data/types";
import { RootState } from "../store";

interface campaignState {
  campaigns: CampaignDataType[];
}
const initialState: campaignState = {
  campaigns: [],
};

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    addCampaign: (state, action: PayloadAction<CampaignDataType>) => {
      state = {
        ...state,
        campaigns: [...state.campaigns, action.payload],
      };
      return state;
    },
  },
});

export const { addCampaign } = campaignsSlice.actions;

export const selecCampaignsState = (state: RootState) =>
  state.campaigns.campaigns;

export default campaignsSlice.reducer;
