"use client"

import { ComponentProps, memo } from "react"
import { ELetterStatus } from "../../types/game"
import { tv } from "tailwind-variants";
import { ChildrenProp } from "@/shared/types";

type KeyProps = ChildrenProp & ComponentProps<"button"> & {
  status?: ELetterStatus;
  size?: 'xs';
}

const KeyComponent = ({children,status,size,disabled, ...props}: KeyProps) => {
  const keyVariants = tv({
    base: 'p-2 w-[40px] h-[40px] cursor-pointer text-sm font-medium rounded-sm border border-primary-300 disabled:opacity-50 disabled:cursor-default',
    variants: {
      color: {
        correct: 'bg-success',
        warning: 'bg-warning',
        incorrect: 'bg-destructive'
      },
      size: {
        xs: 'w-[70px]',
        default: 'w-[40px]'
      }
    }
  })

  return (
    <button disabled={disabled} className={keyVariants({color: status, size})} {...props}>
      {children}
    </button>
  )
}

export const Key = memo(KeyComponent, (prevProps, nextProps) => {
  if(prevProps.disabled !== nextProps.disabled) return false;

  if((prevProps.status === nextProps.status)) return true;

  return false;
})