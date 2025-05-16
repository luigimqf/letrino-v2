"use client"

import { useDispatch, useSelector } from "react-redux";
import { Letter } from "./Letter";
import { Row } from "./Row";
import { RootState } from "@/shared/store";
import {GRID_ROWS, LETTERS_PER_ROW} from '@/features/game/constants/game'
import { validateAttempt } from "../../store/gameSlice";
import React from "react";

export const Grid = () => {
  const gameState = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch();
  const [guess, setGuess] = React.useState<string>('');

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(guess)
    if(guess?.length < 5) return;

    if((event.key === 'Enter')) {
      dispatch(validateAttempt(guess))
    }
  }

  return (
    <div className="w-[250px] flex flex-col justify-start items-center gap-8">
      {
        [...Array(GRID_ROWS)].map((_, rowIndex) => {
          const isActiveRow = gameState.currentAttemptIndex === rowIndex;
          return  (
          <Row onKeyDown={onKeyDown} onChange={(value) => setGuess(value)} autoComplete="off" disabled={!isActiveRow || gameState.isGameOver} key={`row-${rowIndex}`} maxLength={LETTERS_PER_ROW}>
            {
              [...Array(LETTERS_PER_ROW)].map((_,letterIndex) => (
                <Letter key={`letter-${letterIndex}`} index={letterIndex}/>
              ))
            }
          </Row>
        )
        })
      }
    </div>
  )
}