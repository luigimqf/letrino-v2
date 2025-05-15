"use client"

import { useSelector } from "react-redux";
import { Letter } from "./Letter";
import { Row } from "./Row";
import { RootState } from "@/shared/store";
import {GRID_ROWS, LETTERS_PER_ROW} from '@/features/game/constants/game'

export const Grid = () => {
  const {currentAttemptIndex} = useSelector((state: RootState) => state.game)

  return (
    <div className="w-[250px] flex flex-col justify-start items-center gap-8">
      {
        [...Array(GRID_ROWS)].map((_, rowIndex) => {
          const isActiveRow = currentAttemptIndex === rowIndex;
          return  (
          <Row disabled={!isActiveRow} key={`row-${rowIndex}`} maxLength={LETTERS_PER_ROW}>
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