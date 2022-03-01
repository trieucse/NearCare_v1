import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LoginState {
    isLogin: boolean;
    init: boolean;
}

const initialState: LoginState = {
  isLogin: false,
  init: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginMod: () => ({ isLogin: true, init: true }),
    logoutMod: () => ({ isLogin: false, init: true }),
  },
});

export const { loginMod, logoutMod } =
    loginSlice.actions; 

export const selectLoginState = (state: RootState) =>
  state.login.isLogin;
  export const selectInitState = (state: RootState) =>
  state.login.init;

export default loginSlice.reducer;
