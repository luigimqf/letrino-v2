import { UserBasicData } from "../types";

export const USER_INITIAL_STATE: { user: UserBasicData } = {
  user: {
    id: null,
    avatar: null,
    username: null,
    score: 0,
  },
};

export const GOOGLE_SCOPES: string[] = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
