"use client"

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/store";
import {ENTER_KEY, ATTEMPTS_PER_GRID, INVALID_KEYS, LETTERS_PER_ATTEMPT} from '@/features/game/constants'
import { setAttempt, setTargetWord } from "@/features/game/store/gameSlice";
import React, { useEffect } from "react";
import { REGEXP_ONLY_CHARS } from "input-otp";
import { Attempt } from "./Attempt";
import { TargetWord } from "../../types/game";
import { useAttemptValidation } from "../../hooks";

export const Grid = ({targetWord}: {targetWord: TargetWord}) => {
  const {attempts,currentAttemptIndex, isGameOver} = useSelector((state: RootState) => state.game)
  const {username} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const { handleAttemptSubmission, canSubmitAttempt } = useAttemptValidation();

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(INVALID_KEYS.includes(event.key) || !canSubmitAttempt()) return;

    if((event.key === ENTER_KEY)) {
      const isLoggedIn = !!username;
      return handleAttemptSubmission(isLoggedIn);
    }
  }

  useEffect(() => {
    if(targetWord.word) {
      dispatch(setTargetWord(targetWord))
    }
  },[targetWord, dispatch]);

  return (
    <div className="w-[250px] flex flex-col justify-start items-center gap-8 font-sans">
      {
        [...Array(ATTEMPTS_PER_GRID)].map((_, attemptIndex) => {
          const isActiveAttempt = currentAttemptIndex === attemptIndex;
          const letters = attempts?.[attemptIndex]?.letters;
          const value = letters?.reduce((acc, curr) => {return acc + curr.letter},"");
          return  (
          <Attempt
            letters={letters}
            key={`attempt-${attemptIndex}`}
            pattern={REGEXP_ONLY_CHARS} 
            onKeyDown={onKeyDown}
            value={value}
            onChange={(value) => dispatch(setAttempt({guess: value, attemptIndex: attemptIndex}))} 
            autoComplete="off" 
            disabled={!isActiveAttempt || isGameOver} 
            maxLength={LETTERS_PER_ATTEMPT}
          />
        )
        })
      }
    </div>
  )
}