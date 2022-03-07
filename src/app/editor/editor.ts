import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NearAuthorType } from "../../data/types";
import { RootState } from "../store";

interface EditorState {
  data: any;
}

const initialState: EditorState = {
  data: [],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        data: action.payload,
      };
      return state;
    },
  },
});

export const { setData } = editorSlice.actions;

export const selectEditorState = (state: RootState) => state.editor.data;

export default editorSlice.reducer;
