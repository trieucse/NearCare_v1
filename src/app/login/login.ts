import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LoginState {
    isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginMod: () => ({ isLogin: true }),
    logoutMod: () => ({ isLogin: false }),
  },
});

export const { loginMod, logoutMod } =
    loginSlice.actions; 

export const selectLoginState = (state: RootState) =>
  state.login.isLogin;

export default loginSlice.reducer;
