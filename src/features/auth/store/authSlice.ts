import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    username: ''
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    }
  }
});

export const { setUserInfo } = authSlicer.actions;
export default authSlicer.reducer;
