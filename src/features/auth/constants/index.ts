import { UserBasicData } from "../types";

export const USER_INITIAL_STATE: { user: UserBasicData } = {
  user: {
    id: null,
    avatar: null,
    username: null,
    score: 0,
  },
};
