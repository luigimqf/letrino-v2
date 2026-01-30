import { UserBasicData } from "@/features/auth/types";
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";
import { Crown } from "lucide-react";
import { ComponentProps } from "react";

type RankProps = ComponentProps<"div"> & {
  isFirst?: boolean;
  position: number;
  player: UserBasicData;
};

export const Rank = ({ isFirst, position, player, className, ...props }: RankProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)} {...props}>
      <div
        data-first={isFirst}
        className="data-[first='true']:w-[100px] data-[first='true']:h-[100px] scale-100  rounded-full w-20 h-20 border border-primary-100"
      >
        <Avatar className="w-full h-full">
          <AvatarImage src={player?.avatar ?? ""} />
        </Avatar>

        <Crown
          data-first={isFirst}
          size={20}
          color="var(--warning)"
          className="data-[first='true']:block hidden absolute top-0 left-1/2 transform -translate-x-1/2"
        />

        <div className="absolute w-5 h-5 border border-primary-100 flex justify-center items-center text-xs rounded-full bg-accent font-medium text-text-200 -bottom-2.5 left-1/2 transform -translate-x-1/2">
          {position}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="font-semibold text-xs text-text-100">{player?.username}</span>
        <span className="font-semibold text-tiny text-text-200">{player?.score} pts</span>
      </div>
    </div>
  );
};
