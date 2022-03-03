import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NearAuthorType } from "../../data/types";
import { RootState } from "../store";

interface LoginState {
  isLogin: boolean;
  init: boolean;

  user: NearAuthorType | null
}

const initialState: LoginState = {
  isLogin: false,
  init: false,
  user: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginWallet: () => ({ isLogin: true, init: true, user: null }),
    loginWithUser: (state, action: PayloadAction<NearAuthorType>) => {
      state = {
        ...state,
        isLogin: true,
        init: true,
        user: {
          ...state.user,
          ...action.payload
        }
      };

      return state;
    },
    logoutMod: () => ({ isLogin: false, init: false, user: null }),
  },
});

export const { loginWithUser, logoutMod, loginWallet } =
  loginSlice.actions;

export const selectLoginState = (state: RootState) =>
  state.login.isLogin;
export const selectInitState = (state: RootState) =>
  state.login.init;
export const selectUserState = (state: RootState) =>
  state.login.user;

export default loginSlice.reducer;
