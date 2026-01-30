"use client";

import { InputOTPSlot } from "@/shared/components/ui/input-otp";
import { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { ELetterStatus } from "../../types/game";

type LetterProps = ComponentProps<"div"> & {
  index: number;
  status?: ELetterStatus;
};

export const Letter = ({ index, status, ...props }: LetterProps) => {
  const letterVariants = tv({
    base: "rounded-sm transition-all duration-400 bg-accent text-card-foreground font-bold text-sm border border-foreground/25",
    variants: {
      color: {
        correct: "bg-green-600 text-green-50 border-green-600",
        warning: "bg-yellow-600 text-yellow-50 border-yellow-600",
        incorrect: "bg-red-600 text-red-50 border-red-600",
      },
    },
  });

  return <InputOTPSlot className={letterVariants({ color: status })} index={index} {...props} />;
};
