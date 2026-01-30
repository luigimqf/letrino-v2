import { UserBasicData } from "@/features/auth/types";

export type LeaderboardResult = {
  leaderboard: PlayerRank[];
  user?: PlayerRank;
};

export type PlayerRank = UserBasicData & {
  position: number;
  winRate: number;
};
