import { Award } from "lucide-react"
import { GameSign } from "./GameSign"
import { AccountMenu } from "@/features/auth/components/AccountMenu"

export const Header = () => {
  return(
    <header className="w-full h-20 flex justify-between items-center px-10">
      <GameSign />
      <div className="flex gap-6 justify-center items-center">
        <Award color="var(--foreground)"/>
        <AccountMenu />
      </div>
    </header>
  )
}