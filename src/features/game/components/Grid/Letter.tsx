"use client"

import { InputOTPSlot } from "@/shared/components/ui/input-otp"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants";
import { ELetterStatus } from "../../types/game";

type LetterProps = ComponentProps<"div"> & {
  index: number;
  status?: ELetterStatus
}

export const Letter = ({index, status, ...props}: LetterProps) => {

  const letterVariants = tv({
    base: 'rounded-sm transition-all duration-400 bg-input font-bold text-sm border-1 border-accent-200',
    variants: {
      color: {
        correct: 'bg-success',
        warning: 'bg-warning',
        incorrect: 'bg-destructive'
      }
    }
  });

  return (
    <InputOTPSlot className={letterVariants({color: status})} index={index} {...props}/>
  )
}