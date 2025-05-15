export type LetterStatus = 'correct' | 'warning' | 'incorrect';

export type LetterCell = {
  letter: string;
  status: LetterStatus;
}

export type Attempt = LetterCell[];

export type GameState = {
  attempts: Attempt[];
  currentAttemptIndex: number;
  targetWord: string | null;
  isGameOver: boolean;
  isWin: boolean;
}