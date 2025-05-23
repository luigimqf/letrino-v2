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