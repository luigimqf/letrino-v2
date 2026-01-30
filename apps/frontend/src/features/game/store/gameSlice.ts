import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import confetti from "canvas-confetti";
import { ATTEMPTS_PER_GRID, INITIAL_GAME_STATE, LETTERS_PER_ATTEMPT } from "../constants";
import { Attempt, EAttemptStatus, ELetterStatus, TargetWord } from "../types/game";

export const registerUserAttempt = createAsyncThunk(
  "game/registerUserAttempt",
  async (guess: string, { getState }) => {
    const { game } = getState() as { game: typeof INITIAL_GAME_STATE };
    const target = game.targetWord?.word;

    if (!guess || !target) {
      throw new Error("Invalid attempt");
    }

    const guessLower = guess.toLowerCase();
    const targetLower = target.toLowerCase();

    const isCorrect = guessLower === targetLower;
    const endpoint = isCorrect ? "/api/attempt/success" : "/api/attempt/failed";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attempt: guessLower,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register attempt");
      }

      const { data } = await response.json();

      return {
        guess: guessLower,
        target: targetLower,
        isCorrect,
        totalScore: data?.totalScore,
        scoreDetails: data?.scoreDetails,
      };
    } catch {
      throw new Error("Failed to register attempt");
    }
  },
);

const gameSlice = createSlice({
  name: "game",
  initialState: INITIAL_GAME_STATE,
  reducers: {
    validateAttempt: (state, action: PayloadAction<string>) => {
      const guess = action.payload.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const target = state.targetWord?.word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

      if (!guess || guess.length < LETTERS_PER_ATTEMPT || !target || state.isGameOver) return;

      const guessLetters = guess.split("");
      const targetLetters = target.split("");

      const attemptWithLetterStatus = guessLetters.map((letter, index) => {
        if (targetLetters[index] === guessLetters[index]) {
          return {
            letter,
            status: ELetterStatus.CORRECT,
          };
        }
        if (targetLetters.includes(letter)) {
          return {
            letter,
            status: ELetterStatus.WARNING,
          };
        }

        return {
          letter,
          status: ELetterStatus.INCORRECT,
        };
      });

      state.attempts[state.currentAttemptIndex].letters = attemptWithLetterStatus;
      state.currentAttemptIndex += 1;

      const isCorrect = guess === target;

      if (isCorrect) {
        state.isWin = true;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        state.isGameOver = true;
      } else if (state.currentAttemptIndex >= ATTEMPTS_PER_GRID) {
        state.isWin = false;
        state.isGameOver = true;
      }
    },

    setTargetWord: (state, action: PayloadAction<TargetWord>) => {
      const newWord = action.payload;

      if (!newWord.word) return;

      if (state.targetWord?.word !== newWord.word) {
        Object.assign(state, {
          ...INITIAL_GAME_STATE,
          targetWord: newWord,
        });
        return;
      }

      state.targetWord = newWord;
    },

    setAttempts: (state, action: PayloadAction<Attempt[]>) => {
      const attemptsPayload = action.payload;
      const target = state.targetWord?.word;

      if (!attemptsPayload || !target || state.isGameOver) return;

      const attemptsWithStatus = attemptsPayload.map((attempt) => {
        const guess =
          attempt.letters
            ?.map((l) => l.letter)
            .join("")
            .toLowerCase() || "";
        const guessLetters = guess.split("");
        const targetLetters = target.split("");
        const lettersWithStatus = guessLetters.map((letter, index) => {
          if (targetLetters[index] === guessLetters[index]) {
            return {
              letter,
              status: ELetterStatus.CORRECT,
            };
          }
          if (targetLetters.includes(letter)) {
            return {
              letter,
              status: ELetterStatus.WARNING,
            };
          }

          return {
            letter,
            status: ELetterStatus.INCORRECT,
          };
        });

        return {
          ...attempt,
          letters: lettersWithStatus,
        };
      });

      state.attempts = attemptsWithStatus;
      state.currentAttemptIndex = action.payload.length;

      const isAnySuccess = attemptsWithStatus.some((attempt) =>
        attempt.letters.every((l) => l.status === ELetterStatus.CORRECT),
      );
      if (isAnySuccess) {
        state.isWin = true;
        state.isGameOver = true;
      } else if (attemptsPayload.length >= ATTEMPTS_PER_GRID) {
        state.isWin = false;
        state.isGameOver = true;
      }
    },

    setCurrAttempt: (state, action: PayloadAction<{ guess: string; attemptIndex: number }>) => {
      const { attemptIndex, guess } = action.payload;
      const letters = guess?.split("");
      const attempt: Attempt = {
        id: crypto.randomUUID(),
        letters: letters.map((letter) => ({
          letter,
        })),
      };

      state.attempts[attemptIndex] = attempt;
    },

    setKeyboardInput: (state, action: PayloadAction<string>) => {
      const letters = state.attempts?.[state.currentAttemptIndex].letters ?? [];

      if (letters.length >= LETTERS_PER_ATTEMPT) return;

      const newLetters = [
        ...letters,
        {
          letter: action.payload,
        },
      ];

      state.attempts[state.currentAttemptIndex].letters = newLetters;
    },

    setKeyboardBackspace: (state) => {
      const letters = state.attempts?.[state.currentAttemptIndex].letters;

      if (!letters || letters.length <= 0) return;

      state.attempts[state.currentAttemptIndex].letters = letters.slice(0, letters.length - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAttempt.pending, (state) => {
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

        if (!lastAttempt) return;

        state.attempts[lastAttemptIndex] = {
          ...lastAttempt,
          status: EAttemptStatus.SUCCESS,
        };

        const { isCorrect } = action.payload;

        if (!isCorrect) return;

        const { totalScore, scoreDetails } = action.payload;

        if (!totalScore || !scoreDetails) return;

        state.matchResult = {
          totalScore,
          scoreDetails,
        };
      })
      .addCase(registerUserAttempt.rejected, (state) => {
        const lastAttemptIndex = state.currentAttemptIndex - 1;
        const lastAttempt = state.attempts[lastAttemptIndex];

        if (lastAttempt) {
          state.attempts[lastAttemptIndex] = {
            ...lastAttempt,
            status: EAttemptStatus.FAILED,
          };
        }
      });
  },
});

export const {
  validateAttempt,
  setTargetWord,
  setCurrAttempt,
  setAttempts,
  setKeyboardInput,
  setKeyboardBackspace,
} = gameSlice.actions;
export default gameSlice.reducer;
