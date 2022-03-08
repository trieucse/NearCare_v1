import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NearAuthorType } from "../../data/types";
import { RootState } from "../store";

interface DonorsState {
  donors: NearAuthorType[];
}

const initialState: DonorsState = {
  donors: [],
};

export const donorsSlice = createSlice({
  name: "donors",
  initialState,
  reducers: {
    setDonor: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        donors: action.payload,
      };
      return state;
    },
  },
});

export const { setDonor } = donorsSlice.actions;

export const selectDonorsState = (state: RootState) => state.donors.donors;

export default donorsSlice.reducer;
