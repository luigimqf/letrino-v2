import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    avatar: '',
    username: '',
    score: 0,
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<{username: string, score: number}>) => {
      state.username = action.payload.username
      state.score = action.payload.score
    },
    removeUserInfo: (state) => {
      state.username = ''
      state.score = 0
    }
  }
});

export const { setUserInfo, removeUserInfo } = authSlicer.actions;
export default authSlicer.reducer;
