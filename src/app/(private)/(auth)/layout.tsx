import { BackgroundBoxes } from "@/shared/components/background/background-boxes";
import { ChildrenProp } from "@/shared/types";

export default function GameLayout({children}:ChildrenProp) {
  return (
    <div className="relative h-screen flex justify-center items-center">
      {children}
      <BackgroundBoxes />
    </div>
  )
}