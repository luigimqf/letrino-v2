import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"
import {  Crown, Trophy } from "lucide-react"
import { Leaderboard } from "./Leaderboard"

export const LeaderboardMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Trophy size={23} className="cursor-pointer" color="var(--warning)"/>
      </SheetTrigger>
      <SheetContent className="bg-bkg-100">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2"><Crown size={13} color="var(--warning)"/> Leaderboard</SheetTitle>
        </SheetHeader>
        <Leaderboard />
      </SheetContent>
    </Sheet>
  )
}