import { BackgroundBoxes } from "@/shared/components/background/background-boxes";
import { ChildrenProp } from "@/shared/types";

export default function SignInLayout({ children }: ChildrenProp) {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="relative overflow-hidden">
        <BackgroundBoxes className="absolute inset-0 w-full h-full" />
      </div>

      <div className="flex justify-center items-center border-l border-foreground">{children}</div>
    </div>
  );
}
