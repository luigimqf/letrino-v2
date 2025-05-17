"use client"

import { useDispatch, useSelector } from "react-redux";
import { Letter } from "./Letter";
import { Row } from "./Row";
import { RootState } from "@/shared/store";
import {GRID_ROWS, LETTERS_PER_ROW} from '@/features/game/constants/game'
import { validateAttempt } from "../../store/gameSlice";
import React from "react";
import { REGEXP_ONLY_CHARS } from "input-otp";

export const Grid = () => {
  const {attempts,currentAttemptIndex, isGameOver} = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch();
  const [guess, setGuess] = React.useState<string>('');

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(guess?.length < 5) return;

    if((event.key === 'Enter')) {
      dispatch(validateAttempt(guess))
    }
  }
  
  return (
    <div className="w-[250px] flex flex-col justify-start items-center gap-8 font-sans">
      {
        [...Array(GRID_ROWS)].map((_, rowIndex) => {
          const isActiveRow = currentAttemptIndex === rowIndex;

          return  (
          <Row 
            key={`row-${rowIndex}`}
            pattern={REGEXP_ONLY_CHARS} 
            onKeyDown={onKeyDown} 
            onChange={(value) => setGuess(value.toLowerCase())} 
            autoComplete="off" 
            disabled={!isActiveRow || isGameOver} 
            maxLength={LETTERS_PER_ROW}
          >
            {
              [...Array(LETTERS_PER_ROW)].map((_,letterIndex) => {
                const letterStatus = attempts?.[rowIndex]?.[letterIndex].status;
                return (
                <Letter key={`letter-${letterIndex}`} index={letterIndex} status={letterStatus}/>
              )
              })
            }
          </Row>
        )
        })
      }
    </div>
  )
}