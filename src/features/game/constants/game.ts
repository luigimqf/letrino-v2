import { ELetterStatus } from "../types/game";

  export const ENTER_KEY = 'Enter';
  export const BACKSPACE_KEY = 'Backspace'

  export const KEYBOARD_KEYS: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [ENTER_KEY, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', BACKSPACE_KEY],
  ];

  export const INVALID_KEYS: string[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  export const GRID_ATTEMPTS = 6;
  export const LETTERS_PER_ATTEMPT = 5;
  export const MAX_ATTEMPTS = 6;

  export const STATUS_PRIORITY = {
    [ELetterStatus.CORRECT]: 3,
    [ELetterStatus.INCORRECT]: 2,
    [ELetterStatus.WARNING]: 1,
  }
