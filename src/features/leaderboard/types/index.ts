import { UserBasicData } from "@/features/auth/types";

export type LeaderboardResult = {
  leaderboard: PlayerRank[];
  user?: PlayerRank;
}

export type PlayerRank = UserBasicData & {
  position: number;
};

export interface LeaderboardUser {
  avatar: string;
  username: string;
  score: number;
  position: number;
  winRate?: number;
}

export interface LeaderboardResponse {
  success: boolean;
  data: {
    leaderboard: LeaderboardUser[];
    user?: LeaderboardUser;
  };
  message: string | null;
}