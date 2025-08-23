import { BackgroundBoxes } from "@/shared/components/background/background-boxes";
import { ChildrenProp } from "@/shared/types";

export default function SignUpLayout({ children }: ChildrenProp) {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="flex justify-center items-center border-r border-foreground">{children}</div>

      <div className="relative overflow-hidden">
        <BackgroundBoxes className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
}
