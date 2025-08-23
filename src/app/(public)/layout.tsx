import { Sidemenu } from "@/shared/components/layout/sidemenu";
import { ChildrenProp } from "@/shared/types";

export default function GameLayout({ children }: ChildrenProp) {
  return (
    <div className="relative h-screen flex flex-col">
      <Sidemenu />
      {children}
    </div>
  );
}
