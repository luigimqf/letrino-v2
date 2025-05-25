"use client"

import { Podium } from "../Podium"
import { useLeaderboard } from "../../services/queries";
import { useEffect, useState } from "react";
import { LeaderboardResult } from "../../types";

export const Leaderboard = () => {
  const {data: result} = useLeaderboard();
  const [leaderboard, setLeaderboard] = useState<LeaderboardResult>({
    leaderboard: []
  });

  useEffect(() => {
    if(result?.success) {
      setLeaderboard(result.data)
    }
  },[result]);

  if(leaderboard.leaderboard.length <= 0) return <span>Sem dados suficientes para o leaderboard</span>;
  
  return (
    <div className="flex flex-col gap-4">
      <Podium winners={leaderboard?.leaderboard?.slice(0, 3) ?? []}/>
      <div className="flex flex-col gap-1">
        {leaderboard?.leaderboard?.slice(3).map((player) => {
          return (
            <div key={player?.username} className="w-full h-10 flex items-center justify-between px-4 rounded-sm hover:bg-accent transition duration-300"> 
              <div className="flex items-center gap-4 text-text-100 text-xs font-medium">
                <span>{player?.position}</span>
                <span>{player?.username}</span>
              </div>
              <span className="font-medium text-text-200 text-tiny">{player?.score} pts</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}