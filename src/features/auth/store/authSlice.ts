import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserBasicData } from "../types";

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    user: {
      avatar: '',
      username: '',
      score: 0,
    }
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserBasicData>) => {
      const {avatar,score,username} = action.payload
      state.user = {
        username,
        avatar,
        score
      }
    },
    removeUserInfo: (state) => {
      state.user = {
        avatar: '',
        username: '',
        score: 0,
      }
    }
  }
});

export const { setUserInfo, removeUserInfo } = authSlicer.actions;
export default authSlicer.reducer;
