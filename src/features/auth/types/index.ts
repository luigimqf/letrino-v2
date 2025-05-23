export type ServerActionReturn<T = Record<string, string>> = {
  success: boolean;
  errors: Record<string, string> | null;
  values: T;
}

export type LoginData = {
  token: string;
  refresh_token: string;
  user: {
    username: string;
  }
}

export type UserInfo = {
  username: string;
}