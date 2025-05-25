import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"
import { Award } from "lucide-react"
import { Leaderboard } from "./Leaderboard"

export const LeaderboardMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Award className="cursor-pointer" color="var(--warning)"/>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Leaderboard</SheetTitle>
        </SheetHeader>
        <Leaderboard />
      </SheetContent>
    </Sheet>
  )
}