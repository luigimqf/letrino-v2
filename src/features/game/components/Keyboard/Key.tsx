"use client";

import { ChildrenProp } from "@/shared/types";
import { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { ELetterStatus } from "../../types/game";

type KeyProps = ChildrenProp &
  ComponentProps<"button"> & {
    status?: ELetterStatus;
    size?: "xs";
  };

export const Key = ({ children, status, size, disabled, ...props }: KeyProps) => {
  const keyVariants = tv({
    base: "p-2 w-[40px] h-[40px] cursor-pointer text-sm font-medium rounded-sm border border-foreground bg-accent/50 text-card-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-default transition-colors",
    variants: {
      color: {
        correct: "bg-green-600 text-green-50 border-green-600 hover:bg-green-700",
        warning: "bg-yellow-600 text-yellow-50 border-yellow-600 hover:bg-yellow-700",
        incorrect: "bg-red-600 text-red-50 border-red-600 hover:bg-red-700",
      },
      size: {
        xs: "w-[70px]",
        default: "w-[40px]",
      },
    },
  });

  return (
    <button disabled={disabled} className={keyVariants({ color: status, size })} {...props}>
      {children}
    </button>
  );
};
