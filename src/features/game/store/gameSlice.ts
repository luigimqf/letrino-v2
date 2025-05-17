import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attempt, ELetterStatus, GameState } from "../types/game";
import { LETTERS_PER_ATTEMPT, MAX_ATTEMPTS } from "../constants/game";

const initialGameState: GameState = {
  attempts: [],
  currentAttemptIndex: 0,
  targetWord: null,
  isGameOver: false,
  isWin: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    validateAttempt: (state, action: PayloadAction<string>) => {
      const guess = action.payload.toLowerCase();
      const target = "pavio"

      if (!guess || guess.length < LETTERS_PER_ATTEMPT || !target || state.isGameOver) return;

      const guessLetters = guess.split('');
      const targetLetters = target.split('');

      const attemptWithLetterStatus = guessLetters.map((letter, index) => {
        if(targetLetters[index] === guessLetters[index]) {
          return {
            letter,
            status: ELetterStatus.CORRECT
          }
        }
        if(targetLetters.includes(letter)) {
          return {
            letter,
            status: ELetterStatus.WARNING
          }
        }

        return {
          letter,
          status: ELetterStatus.INCORRECT
        }

      })

      state.attempts[state.currentAttemptIndex] = attemptWithLetterStatus;
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

    setAttempt: (state, action: PayloadAction<{guess:string, attemptIndex:number}>) => {
      const {attemptIndex,guess} = action.payload
      const letters = guess?.split('');
      const attempts: Attempt = letters.map(letter => ({
        letter,
      }))

      state.attempts[attemptIndex] = attempts;
    },

    setKeyboardInput: (state, action: PayloadAction<string>) => {
      const attempt = state.attempts?.[state.currentAttemptIndex] ?? [];

      if(attempt.length >= LETTERS_PER_ATTEMPT) return;
      
      const newAttempt = [
        ...attempt,
        {
          letter: action.payload
        }
      ];
      state.attempts[state.currentAttemptIndex] = newAttempt;
    },
    
    setKeyboardBackspace: (state) => {
      const attempt = state.attempts?.[state.currentAttemptIndex];

      console.log('entrei')
      if(!attempt || attempt.length <= 0) return;

      state.attempts[state.currentAttemptIndex] = attempt.slice(0, attempt.length - 1)
    },
    resetGame: (state) => {
      Object.assign(state, initialGameState);
    },
  }
});

export const { validateAttempt, setTargetWord,setAttempt,setKeyboardInput, setKeyboardBackspace, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
