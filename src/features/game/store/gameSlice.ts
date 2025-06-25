import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attempt, ELetterStatus, TargetWord } from "../types/game";
import { INITIAL_GAME_STATE, LETTERS_PER_ATTEMPT, ATTEMPTS_PER_GRID } from "../constants";
import confetti from "canvas-confetti";

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_GAME_STATE,
  reducers: {
    validateAttempt: (state, action: PayloadAction<string>) => {
      const guess = action.payload.toLowerCase();
      const target = state.targetWord?.word

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

      state.attempts[state.currentAttemptIndex].letters = attemptWithLetterStatus;
      state.currentAttemptIndex += 1;

      if (guess === target) {
        state.isWin = true;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        state.isGameOver = true;
      } else if (state.attempts.length >= ATTEMPTS_PER_GRID) {
        state.isWin = false;
        state.isGameOver = true;
      }
    },

    setTargetWord: (state, action: PayloadAction<TargetWord>) => {
      const {word,isGolden} = action.payload;
      state.targetWord = {
        word: word.toLowerCase(),
        isGolden
      }
    },

    setAttempt: (state, action: PayloadAction<{guess:string, attemptIndex:number}>) => {
      const {attemptIndex,guess} = action.payload
      const letters = guess?.split('');
      const attempt: Attempt = {
        id: crypto.randomUUID(),
        letters: letters.map(letter => ({
          letter,
        }))
      }

      state.attempts[attemptIndex] = attempt;
    },

    setKeyboardInput: (state, action: PayloadAction<string>) => {
      const letters = state.attempts?.[state.currentAttemptIndex].letters ?? [];

      if(letters.length >= LETTERS_PER_ATTEMPT) return;
      
      const newLetters = [
        ...letters,
        {
          letter: action.payload
        }
      ];

      state.attempts[state.currentAttemptIndex].letters = newLetters;
    },
    
    setKeyboardBackspace: (state) => {
      const letters = state.attempts?.[state.currentAttemptIndex].letters;

      if(!letters || letters.length <= 0) return;

      state.attempts[state.currentAttemptIndex].letters = letters.slice(0, letters.length - 1)
    },
    resetGame: (state) => {
      Object.assign(state, INITIAL_GAME_STATE);
    },
  }
});

export const { validateAttempt, setTargetWord,setAttempt,setKeyboardInput, setKeyboardBackspace, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
