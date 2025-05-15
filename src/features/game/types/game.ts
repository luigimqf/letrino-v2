type LetterStatus = 'correct' | 'warning' | 'incorrect';

type LetterCell = {
  letter: string;
  status: LetterStatus;
}

type Attempt = LetterCell[];

type GameState = {
  attempts: Attempt[];
  currentAttemptIndex: number;
  targetWord: string | null;
  isGameOver: boolean;
  isWin: boolean;
}