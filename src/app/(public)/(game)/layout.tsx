import { Header } from "@/shared/components/layout/Header";
import { ChildrenProp } from "@/shared/types";

export default function GameLayout({children}:ChildrenProp) {
  return (
    <div className="relative h-screen flex flex-col">
      <Header />
      {children}
    </div>
  )
}