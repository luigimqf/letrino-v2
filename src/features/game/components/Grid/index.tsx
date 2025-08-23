"use client";

import {
  ATTEMPTS_PER_GRID,
  ENTER_KEY,
  INVALID_KEYS,
  LETTERS_PER_ATTEMPT,
} from "@/features/game/constants";
import { resetGame, setAttempt, setTargetWord } from "@/features/game/store/gameSlice";
import { GameSign } from "@/shared/components/layout/game-sign";
import { AppDispatch, RootState } from "@/shared/store";
import { REGEXP_ONLY_CHARS } from "input-otp";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAttemptValidation } from "../../hooks";
import { TargetWord } from "../../types/game";
import { Attempt } from "./Attempt";

export const Grid = ({ targetWord }: { targetWord: TargetWord }) => {
  const {
    attempts,
    currentAttemptIndex,
    isGameOver,
    targetWord: storedTargetWord,
  } = useSelector((state: RootState) => state.game);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { handleAttemptSubmission, canSubmitAttempt } = useAttemptValidation();

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (INVALID_KEYS.includes(event.key) || !canSubmitAttempt()) return;

    if (event.key === ENTER_KEY) {
      const isLoggedIn = !!user.username;
      return handleAttemptSubmission(isLoggedIn);
    }
  };

  useEffect(() => {
    if (!targetWord || !targetWord.word) return;

    if (targetWord.word !== storedTargetWord?.word) {
      dispatch(resetGame());
    }

    dispatch(setTargetWord(targetWord));
  }, [targetWord, dispatch]);

  return (
    <div className="w-[250px] flex flex-col justify-start items-center gap-12 font-sans">
      <GameSign />
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        {[...Array(ATTEMPTS_PER_GRID)].map((_, attemptIndex) => {
          const isActiveAttempt = currentAttemptIndex === attemptIndex;
          const letters = attempts?.[attemptIndex]?.letters;
          const value = letters?.reduce((acc, curr) => {
            return acc + curr.letter;
          }, "");
          return (
            <Attempt
              letters={letters}
              key={`attempt-${attemptIndex}`}
              pattern={REGEXP_ONLY_CHARS}
              onKeyDown={onKeyDown}
              value={value}
              onChange={(value) =>
                dispatch(setAttempt({ guess: value, attemptIndex: attemptIndex }))
              }
              autoComplete="off"
              disabled={!isActiveAttempt || isGameOver}
              maxLength={LETTERS_PER_ATTEMPT}
            />
          );
        })}
      </div>
    </div>
  );
};
