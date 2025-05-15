"use client"

import { InputOTPSlot } from "@/shared/components/ui/input-otp"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants";

type LetterProps = ComponentProps<"div"> & {
  index: number;
  status?: 'correct' | 'warning' | 'incorrect'
}

export const Letter = ({index, status, ...props}: LetterProps) => {

  const letterVariants = tv({
    base: 'rounded-xs font-bold text-sm dark:bg-input/30 border-1 border-accent-200',
    variants: {
      color: {
        correct: 'bg-success',
        warning: 'bg-warning',
        incorrect: 'bg-destructive'
      }
    }
  })
  return (
    <InputOTPSlot className={letterVariants({color: status})} index={index} {...props}/>
  )
}