"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"

import { Podium } from "../Podium"
import { UserPosition } from "./UserPosition"
import { useLeaderboard } from "../../services/queries"
import { LeaderboardResult } from "../../types"
import { RootState } from "@/shared/store"
import { ROUTES } from "@/shared/constants"
import { Button } from "@/shared/components/ui/button"

export const Leaderboard = () => {
  const { data: result } = useLeaderboard()
  const { username } = useSelector((state: RootState) => state.auth)

  const [leaderboard, setLeaderboard] = useState<LeaderboardResult>({
    leaderboard: [],
  })

  useEffect(() => {
    if (result?.success) {
      setLeaderboard(result.data)
    }
  }, [result])

  if (leaderboard.leaderboard.length === 0) {
    return <span>Sem dados suficientes para o leaderboard</span>
  }

  const topThree = leaderboard.leaderboard.slice(0, 3)
  const remainingPlayers = leaderboard.leaderboard.slice(3)
  const userData = leaderboard.user

  return (
    <div className="flex flex-col gap-4">
      <Podium winners={topThree} />

      <div className="flex flex-col gap-2.5">
        {remainingPlayers.map((player) => (
          <UserPosition
            key={player.username}
            avatar={player.avatar}
            position={player.position}
            score={player.score}
            username={player.username}
          />
        ))}
      </div>

      {!username && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-sm">🔒 Quer ver seu progresso no ranking?</h1>
          <p className="text-xs text-center sm:max-w-4/5">
            Faça login para acompanhar suas estatísticas e competir com outros jogadores!
          </p>
          <Link href={ROUTES.SIGN_IN}>
            <Button variant="ghost">Entrar</Button>
          </Link>
        </div>
      )}

      {username && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-sm">👋 Você está logado como {username}</h1>

          {userData?.username && (
            <UserPosition
              avatar={userData.avatar}
              position={userData.position}
              score={userData.score}
              username={userData.username}
            />
          )}

          <p className="text-xs text-center sm:max-w-4/5">
            Continue jogando para subir no ranking!
          </p>
        </div>
      )}
    </div>
  )
}
