import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attempt, ELetterStatus, GameState } from "../types/game";
import { MAX_ATTEMPTS } from "../constants/game";

const initialGameState: GameState = {
  attempts: [],
  currentAttemptIndex: 0,
  targetWord: null,
  isGameOver: false,
  isWin: false,
};

function generateAttempt(guess: string, target: string): Attempt {
  const guessLetters = guess.split('');
  const targetLetters = target.split('');

  return guessLetters.map((letter, index) => {
    if (letter === targetLetters[index]) {
      return { letter, status: ELetterStatus.CORRECT };
    } else if (targetLetters.includes(letter)) {
      return { letter, status: ELetterStatus.WARNING };
    } else {
      return { letter, status: ELetterStatus.INCORRECT };
    }
  });
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    validateAttempt: (state, action: PayloadAction<string>) => {
      const guess = action.payload.toLowerCase();
      const target = "pavio"

      if (!guess || !target || state.isGameOver) return;

      const newAttempt = generateAttempt(guess, target);

      state.attempts.push(newAttempt);
      state.currentAttemptIndex += 1;

      if (guess === target) {
        state.isWin = true;
        state.isGameOver = true;
      } else if (state.attempts.length >= MAX_ATTEMPTS) {
        state.isWin = false;
        state.isGameOver = true;
      }
    },

    setTargetWord: (state, action: PayloadAction<string>) => {
      state.targetWord = action.payload.toLowerCase();
    },

    resetGame: (state) => {
      Object.assign(state, initialGameState);
    },
  }
});

export const { validateAttempt, setTargetWord, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
