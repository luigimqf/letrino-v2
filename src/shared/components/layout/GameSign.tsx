import { cn } from "@/shared/lib/utils";
import { GAME_NAME } from "@/shared/constants";
import React from "react";

export const GameSign = () => {
  const splittedName = GAME_NAME.split("");
  const middleIndex = Math.floor(splittedName.length / 2);
  const lastIndex = splittedName.length - 1;

  return (
    <div className="flex mt-5 justify-center items-center gap-2 select-none">
      {splittedName.map((letter, index) => (
        <span
          key={letter}
          className={cn(
            index === 0 && "text-success",
            index === middleIndex && "text-warning",
            index === lastIndex && "text-destructive",
            "font-[family-name:var(--font-fredoka-sans)] text-4xl font-semibold",
          )}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};
