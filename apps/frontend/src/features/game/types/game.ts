/* eslint-disable no-unused-vars */
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

export type AuthenticatedAttempt = {
  userInput: string;
  status: EAttemptStatus;
}[];

export type GameState = {
  attempts: Attempt[];
  currentAttemptIndex: number;
  targetWord: TargetWord | null;
  isGameOver: boolean;
  isWin: boolean;
  matchResult: MatchResult | null;
};

export enum EMatchStatus {
  IN_PROGRESS = "in_progress",
  CORRECT = "correct",
  INCORRECT = "incorrect",
}

export enum EMatchAttemptResult {
  CORRECT = "correct",
  INCORRECT = "incorrect",
}

export type ModeMatchAttempt = {
  userInput: string | null;
  result: EMatchAttemptResult;
};

export type ModeMatch = {
  matchId: string;
  mode: {
    slug: string;
    name: string;
  };
  status: EMatchStatus;
  score: number;
  dayKey: string;
  maxAttempts?: number | null;
  maxErrors?: number | null;
  attempts: ModeMatchAttempt[];
};

export type TargetWord = {
  word: string;
  isGolden: boolean;
};

export type MatchResult = {
  totalScore: number;
  scoreDetails: ScoreDetails;
};

export type ScoreDetails = {
  attemptScore: number;
  perfectGame: number;
  winStreak: number;
  highWinRate: number;
};
