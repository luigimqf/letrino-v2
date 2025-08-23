export enum EAttemptStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export enum ELetterStatus {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  WARNING = "warning",
}

export type LetterCell = {
  letter: string;
  status?: ELetterStatus;
};

export type Attempt = {
  id?: string;
  status?: EAttemptStatus;
  letters: LetterCell[];
};

export type GameState = {
  attempts: Attempt[];
  currentAttemptIndex: number;
  targetWord: TargetWord | null;
  isGameOver: boolean;
  isWin: boolean;
};

export type TargetWord = {
  word: string;
  isGolden: boolean;
};
