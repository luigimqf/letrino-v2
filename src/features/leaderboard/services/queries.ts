import { PromiseReturn } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { LeaderboardResult } from "../types";

async function getLeaderboard() {
  try {
    const response = await fetch("/api/leaderboard", {
      method: "GET",
    });

    if (!response.ok) {
      return {
        success: false,
        error: "error fetching leaderboard",
      };
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export const useLeaderboard = () => {
  return useQuery<PromiseReturn<LeaderboardResult>>({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
    staleTime: Infinity,
  });
};
