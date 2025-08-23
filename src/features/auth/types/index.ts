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
  user: UserBasicData;
};

export type UserBasicData = {
  avatar: string;
  username: string;
  score: number;
};
export type UserInfo = {
  username: string;
};
