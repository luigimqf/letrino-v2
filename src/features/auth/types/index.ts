export type ServerActionReturn<T = Record<string, string>> = {
  success: boolean;
  api_error?: {
    message: string;
    code: string;
  } | null;
  errors?: Record<string, string> | null;
  values: T;
};

export type LoginData = {
  token: string;
  refresh_token: string;
  username: string;
};

export type UserBasicData = {
  id: string | null;
  avatar: string | null;
  username: string | null;
  score: number;
};

export type Statistics = {
  gamesPlayed: number;
  gamesWon: number;
  winStreak: number;
  bestWinStreak: number;
  score: number;
  winPercentage: number;
};

export type UserInfo = {
  username: string;
};
