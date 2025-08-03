import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attempt, EAttemptStatus, ELetterStatus, TargetWord } from "../types/game";
import { INITIAL_GAME_STATE, LETTERS_PER_ATTEMPT, ATTEMPTS_PER_GRID } from "../constants";
import confetti from "canvas-confetti";

export const registerUserAttempt = createAsyncThunk(
  'game/registerUserAttempt',
  async (guess: string, { getState }) => {
    const {game} = getState() as { game: typeof INITIAL_GAME_STATE };
    const target = game.targetWord?.word;
    
    if (!guess || !target) {
      throw new Error('Invalid attempt');
    }

    const guessLower = guess.toLowerCase();
    const targetLower = target.toLowerCase();

    const isCorrect = guessLower === targetLower;
    const endpoint = isCorrect ? '/api/attempt/success' : '/api/attempt/failed';

    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attempt: guessLower
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register attempt');
    }

    return { 
      guess: guessLower, 
      target: targetLower,
      isCorrect, 
    };
  }
);

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

      const isCorrect = guess === target;
      
      if (isCorrect) {
        state.isWin = true;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        state.isGameOver = true;
      } else if (state.currentAttemptIndex >= ATTEMPTS_PER_GRID) {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAttempt.pending, (state, _) => {
        const lastAttemptIndex = state.currentAttemptIndex - 1;
        const lastAttempt = state.attempts[lastAttemptIndex];
        
        if (lastAttempt) {
          state.attempts[lastAttemptIndex] = {
            ...lastAttempt,
            status: EAttemptStatus.PENDING,
          };
        }
      })
      .addCase(registerUserAttempt.fulfilled, (state, action) => {
        const lastAttemptIndex = state.currentAttemptIndex - 1;
        const lastAttempt = state.attempts[lastAttemptIndex];
        
        if (lastAttempt) {
          state.attempts[lastAttemptIndex] = {
            ...lastAttempt,
            status: EAttemptStatus.SUCCESS,
          };
        }
      })
      .addCase(registerUserAttempt.rejected, (state, _) => {
        const lastAttemptIndex = state.currentAttemptIndex - 1;
        const lastAttempt = state.attempts[lastAttemptIndex];
        
        if (lastAttempt) {
          state.attempts[lastAttemptIndex] = {
            ...lastAttempt,
            status: EAttemptStatus.FAILED,
          };
        }
      })
  }
});

export const { validateAttempt, setTargetWord,setAttempt,setKeyboardInput, setKeyboardBackspace, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
