import { ChildrenProp } from "@/shared/types";

export default function GameLayout({children}:ChildrenProp) {
  return (
    <div className="relative h-screen flex justify-center items-center">
      {children}
    </div>
  )
}