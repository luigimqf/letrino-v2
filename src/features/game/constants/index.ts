import { Attempt, ELetterStatus, GameState } from "../types/game";

export const EMPTY_ATTEMPTS: Attempt[] = Array(6)
  .fill(null)
  .map(() => ({
    id: undefined,
    status: undefined,
    letters: [],
  }));

export const INITIAL_GAME_STATE: GameState = {
  attempts: EMPTY_ATTEMPTS,
  currentAttemptIndex: 0,
  targetWord: null,
  isGameOver: false,
  isWin: false,
  matchResult: null,
};

export const ENTER_KEY = "Enter";
export const BACKSPACE_KEY = "Backspace";

export const KEYBOARD_KEYS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [ENTER_KEY, "Z", "X", "C", "V", "B", "N", "M", BACKSPACE_KEY],
];

export const INVALID_KEYS: string[] = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

export const ATTEMPTS_PER_GRID = 6;
export const LETTERS_PER_ATTEMPT = 5;

export const STATUS_PRIORITY: Record<ELetterStatus, number> = {
  [ELetterStatus.CORRECT]: 3,
  [ELetterStatus.INCORRECT]: 2,
  [ELetterStatus.WARNING]: 1,
};
