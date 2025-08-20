import { BackgroundBoxes } from "@/shared/components/background/background-boxes";
import { GameSign } from "@/shared/components/layout/GameSign";
import { Header } from "@/shared/components/layout/Header";
import { Sidemenu } from "@/shared/components/layout/sidemenu";
import { ChildrenProp } from "@/shared/types";

export default function GameLayout({children}:ChildrenProp) {
  return (
    <div className="relative h-screen flex flex-col">
      <Sidemenu/>
      <GameSign />
      {children}
    </div>
  )
}