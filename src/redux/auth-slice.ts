import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { IUserDetail } from "@/models/user-detail";

interface AuthState {
  accessToken: string;
  userDetail: IUserDetail;
}

const initialState: AuthState = {
  accessToken: "",
  userDetail: {
    customerId: "",
    name: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAuthState: (state) => {
      state.accessToken = "";
      state.userDetail = initialState.userDetail;
    },
    setUserDetail: (state, action: PayloadAction<IUserDetail>) => {
      state.userDetail = action.payload;
    },
  },
});

export const { setAccessToken, clearAuthState, setUserDetail } =
  authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUserDetail = (state: RootState) => state.auth.userDetail;

export default authSlice.reducer;
