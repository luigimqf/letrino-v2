import { createSlice } from "@reduxjs/toolkit";

const initialGameState: GameState = {
  attempts: [],
  currentAttemptIndex: 0,
  targetWord: null,
  isGameOver: false,
  isWin: false,
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {}
})

export const {} = gameSlice.actions;

export default gameSlice.reducer;