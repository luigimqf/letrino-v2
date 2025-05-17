export enum ELetterStatus {
  CORRECT = "correct",
  INCORRECT = 'incorrect',
  WARNING = 'warning'
};

export type LetterCell = {
  letter: string;
  status?: ELetterStatus;
}

export type Attempt = LetterCell[];

export type GameState = {
  attempts: Attempt[];
  currentAttemptIndex: number;
  targetWord: string | null;
  isGameOver: boolean;
  isWin: boolean;
}