import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserBasicData } from "../types";

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    avatar: '',
    username: '',
    score: 0,
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserBasicData>) => {
      const {avatar,score,username} = action.payload
      state.username = username
      state.avatar = avatar
      state.score = score
    },
    removeUserInfo: (state) => {
      state.username = ''
      state.avatar = ''
      state.score = 0
    }
  }
});

export const { setUserInfo, removeUserInfo } = authSlicer.actions;
export default authSlicer.reducer;
