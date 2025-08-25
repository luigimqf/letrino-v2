import { registerUserAttempt } from "@/features/game/store/gameSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserBasicData } from "../types";

const authSlicer = createSlice({
  name: "auth",
  initialState: {
    user: {
      avatar: "",
      username: "",
      score: 0,
    },
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserBasicData>) => {
      const { avatar, score, username } = action.payload;
      state.user = {
        username,
        avatar,
        score,
      };
    },
    removeUserInfo: (state) => {
      state.user = {
        avatar: "",
        username: "",
        score: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAttempt.fulfilled, (state, action) => {
      if (action.payload.isCorrect && action.payload.userInfo) {
        state.user = action.payload.userInfo;
      }
    });
  },
});

export const { setUserInfo, removeUserInfo } = authSlicer.actions;
export default authSlicer.reducer;
