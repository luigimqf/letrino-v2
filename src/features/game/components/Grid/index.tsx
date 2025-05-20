"use client"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import {ENTER_KEY, ATTEMPTS_PER_GRID, INVALID_KEYS, LETTERS_PER_ATTEMPT} from '@/features/game/constants/game'
import { setAttempt, setTargetWord, validateAttempt } from "@/features/game/store/gameSlice";
import React, { useEffect } from "react";
import { REGEXP_ONLY_CHARS } from "input-otp";
import { Attempt } from "./Attempt";
import { useWordQuery } from "@/features/game/services/queries";

export const Grid = () => {
  const {attempts,currentAttemptIndex, isGameOver} = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch();
  const {data: response, isLoading, isSuccess} = useWordQuery();

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(INVALID_KEYS.includes(event.key) || attempts?.[currentAttemptIndex]?.length < LETTERS_PER_ATTEMPT) return;

    const guess = attempts?.[currentAttemptIndex]?.reduce((acc, curr) => acc + curr.letter, '');

    if((event.key === ENTER_KEY)) {
      dispatch(validateAttempt(guess))
    }
  }

  useEffect(() => {
    if(isSuccess && response?.data) {
      dispatch(setTargetWord(response.data))
    }
  },[isSuccess, response, dispatch]);

  return (
    <div className="w-[250px] flex flex-col justify-start items-center gap-8 font-sans">
      {
        [...Array(ATTEMPTS_PER_GRID)].map((_, attemptIndex) => {
          const isActiveAttempt = currentAttemptIndex === attemptIndex;
          const letters = attempts?.[attemptIndex];
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
            disabled={!isActiveAttempt || isGameOver || isLoading} 
            maxLength={LETTERS_PER_ATTEMPT}
          />
        )
        })
      }
    </div>
  )
}