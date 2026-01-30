import { registerUserAttempt } from "@/features/game/store/gameSlice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_INITIAL_STATE } from "../constants";
import { UserBasicData } from "../types";

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    return true;
  } catch {
    throw new Error("Failed to logout");
  }
});

const authSlicer = createSlice({
  name: "auth",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserBasicData>) => {
      const { id, avatar, score, username } = action.payload;
      state.user = {
        id,
        username,
        avatar,
        score,
      };
    },
    removeUserInfo: (state) => {
      state.user = {
        avatar: null,
        username: null,
        score: 0,
        id: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAttempt.fulfilled, (state, action) => {
      if (action.payload.isCorrect && action.payload.totalScore) {
        state.user = {
          ...state.user,
          score: state.user.score + action.payload.totalScore,
        };
      }
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {
        avatar: null,
        username: null,
        score: 0,
        id: null,
      };
    });
  },
});

export const { setUserInfo, removeUserInfo } = authSlicer.actions;
export default authSlicer.reducer;
