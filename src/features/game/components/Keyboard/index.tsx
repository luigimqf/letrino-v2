"use client"

import { useDispatch, useSelector } from "react-redux"
import { BACKSPACE_KEY, ENTER_KEY, KEYBOARD_KEYS } from "../../constants/game"
import { Key } from "./Key"
import { RootState } from "@/shared/store"
import { setKeyboardBackspace, setKeyboardInput, validateAttempt } from "../../store/gameSlice"

export const Keyboard = () => {
  const {attempts,currentAttemptIndex} = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const onAction = (key: string) => {
    const guess = attempts?.[currentAttemptIndex]?.reduce((acc, curr) => acc + curr.letter, "");

    if(!guess) return;

    if(key === ENTER_KEY) return dispatch(validateAttempt(guess));

    if(key === BACKSPACE_KEY) return dispatch(setKeyboardBackspace());

  }

  return (
    <div className="flex flex-col items-center gap-2">
      {KEYBOARD_KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((key) => {
            const isActionKey = key === ENTER_KEY || key === BACKSPACE_KEY;
            const keyRender = key === BACKSPACE_KEY ? '←' : key;

            return (
            <Key 
              onClick={() => isActionKey ? onAction(key) : dispatch(setKeyboardInput(key.toLowerCase()))} 
              key={key} 
              size={isActionKey ? "xs" : undefined}
            >
              {keyRender}
            </Key>
          )
          })}
        </div>
      ))}
    </div>
  )
}