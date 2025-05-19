"use client"

import { useDispatch, useSelector } from "react-redux";
import { Letter } from "./Letter";
import { RootState } from "@/shared/store";
import {ENTER_KEY, GRID_ATTEMPTS, INVALID_KEYS, LETTERS_PER_ATTEMPT} from '@/features/game/constants/game'
import { setAttempt, validateAttempt } from "../../store/gameSlice";
import React from "react";
import { REGEXP_ONLY_CHARS } from "input-otp";
import { Attempt } from "./Attempt";
import { useWordQuery } from "../../services/queries";

export const Grid = () => {
  const {attempts,currentAttemptIndex, isGameOver} = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch();
  const {data} = useWordQuery();

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(INVALID_KEYS.includes(event.key) || attempts?.[currentAttemptIndex]?.length < LETTERS_PER_ATTEMPT) return;

    const guess = attempts?.[currentAttemptIndex]?.reduce((acc, curr) => acc + curr.letter, '');

    if((event.key === ENTER_KEY)) {
      dispatch(validateAttempt(guess))
    }
  }
  
  return (
    <div className="w-[250px] flex flex-col justify-start items-center gap-8 font-sans">
      {
        [...Array(GRID_ATTEMPTS)].map((_, attemptIndex) => {
          const isActiveAttempt = currentAttemptIndex === attemptIndex;
          const value = attempts?.[attemptIndex]?.reduce((acc, curr) => {return acc + curr.letter},"");
          return  (
          <Attempt 
            key={`attempt-${attemptIndex}`}
            pattern={REGEXP_ONLY_CHARS} 
            onKeyDown={onKeyDown}
            value={value}
            onChange={(value) => dispatch(setAttempt({guess: value, attemptIndex: attemptIndex}))} 
            autoComplete="off" 
            disabled={!isActiveAttempt || isGameOver} 
            maxLength={LETTERS_PER_ATTEMPT}
          >
            {
              [...Array(LETTERS_PER_ATTEMPT)].map((_,letterIndex) => {
                const letterStatus = attempts?.[attemptIndex]?.[letterIndex]?.status;
                return (
                <Letter key={`letter-${letterIndex}`} index={letterIndex} status={letterStatus}/>
              )
              })
            }
          </Attempt>
        )
        })
      }
    </div>
  )
}