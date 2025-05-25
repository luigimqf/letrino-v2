import { UserBasicData } from "@/features/auth/types";
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";
import { ComponentProps } from "react";

type UserPositionProps = UserBasicData & ComponentProps<"div"> & {
  position: number;
}

export const UserPosition = ({avatar,position,username,score,className, ...props}:UserPositionProps) => {
  return (
    <div className={cn("w-full border h-10 flex items-center justify-between px-4 rounded-sm hover:bg-accent transition duration-300",className)} {...props}> 
      <div className="flex justify-start items-center gap-4 text-text-100 text-xs font-medium">
        <span className="w-3">{position}</span>
        <Avatar className="w-5 h-5 border">
          <AvatarImage src={avatar}/>
        </Avatar>
        <span>{username}</span>
      </div>
      <span className="font-medium text-text-200 text-tiny">{score} pts</span>
    </div>
  )
}