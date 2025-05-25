import { GameSign } from "./GameSign"
import { AccountMenu } from "@/features/auth/components/AccountMenu"
import { LeaderboardMenu } from "@/features/leaderboard/components/LeaderboardMenu"

export const Header = () => {
  return(
    <header className="w-full h-20 flex justify-between items-center px-10">
      <span></span>
      <GameSign />
      <div className="flex gap-6 justify-center items-center">
        <LeaderboardMenu />
        <AccountMenu />
      </div>
    </header>
  )
}