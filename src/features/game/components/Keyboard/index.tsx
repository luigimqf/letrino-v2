"use client";

import { useDispatch, useSelector } from "react-redux";
import { BACKSPACE_KEY, ENTER_KEY, KEYBOARD_KEYS, STATUS_PRIORITY } from "../../constants";
import { Key } from "./Key";
import { AppDispatch, RootState } from "@/shared/store";
import { setKeyboardBackspace, setKeyboardInput } from "../../store/gameSlice";
import { LetterCell } from "../../types/game";
import { useCallback } from "react";
import { useAttemptValidation } from "../../hooks";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export const Keyboard = () => {
  const { attempts, currentAttemptIndex, isGameOver } = useSelector(
    (state: RootState) => state.game,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { isDesktop } = useMediaQuery();
  const dispatch = useDispatch<AppDispatch>();
  const { handleAttemptSubmission, canSubmitAttempt } = useAttemptValidation();

  const onAction = (key: string) => {
    if (key === ENTER_KEY && canSubmitAttempt()) {
      const isLoggedIn = !!user.username;
      return handleAttemptSubmission(isLoggedIn);
    }

    if (key === BACKSPACE_KEY) return dispatch(setKeyboardBackspace());
  };

  const playedLetters = useCallback(() => {
    const flat = attempts.flat();
    const letters = flat.map((att) => att.letters).flat();
    const map = new Map<string, LetterCell>();

    for (const obj of letters) {
      const existing = map.get(obj.letter);

      if (!existing || STATUS_PRIORITY[obj.status!] > STATUS_PRIORITY[existing.status!]) {
        map.set(obj.letter, obj);
      }
    }

    return Array.from(map.values());
  }, [currentAttemptIndex]);

  return (
    <div
      data-visible={isDesktop}
      className="flex-col items-center gap-2 z-10 flex data-[visible=false]:hidden"
    >
      {KEYBOARD_KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((key) => {
            const isActionKey = key === ENTER_KEY || key === BACKSPACE_KEY;
            const keyToRender = key === BACKSPACE_KEY ? "←" : key;
            const keyStatus = playedLetters()?.find(
              (k) => k.letter.toLowerCase() === key.toLowerCase(),
            )?.status;

            return (
              <Key
                onClick={() =>
                  isActionKey ? onAction(key) : dispatch(setKeyboardInput(key.toLowerCase()))
                }
                key={key}
                disabled={isGameOver}
                status={keyStatus}
                size={isActionKey ? "xs" : undefined}
              >
                {keyToRender}
              </Key>
            );
          })}
        </div>
      ))}
    </div>
  );
};
