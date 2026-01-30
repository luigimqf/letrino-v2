"use-client";

import { InputOTP } from "@/shared/components/ui/input-otp";
import { cn } from "@/shared/lib/utils";
import { OTPInput } from "input-otp";
import React, { memo } from "react";
import { LETTERS_PER_ATTEMPT } from "../../constants";
import { LetterCell } from "../../types/game";
import { Letter } from "./Letter";

type AttemptProps = Omit<React.ComponentProps<typeof OTPInput>, "render"> & {
  letters: LetterCell[];
};

const AttemptComponent = ({
  letters,
  disabled,
  maxLength,
  value,
  onChange,
  className,
  ...props
}: AttemptProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  return (
    <InputOTP
      containerClassName={cn("z-10", className)}
      ref={inputRef}
      disabled={disabled}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      pattern="[a-zA-Z0-9]*"
      {...props}
    >
      {[...Array(LETTERS_PER_ATTEMPT)].map((_, letterIndex) => {
        const letterStatus = letters?.[letterIndex]?.status;
        return <Letter key={`letter-${letterIndex}`} index={letterIndex} status={letterStatus} />;
      })}
    </InputOTP>
  );
};

export const Attempt = memo(AttemptComponent, (prevProps, nextProps) => {
  if (prevProps.disabled !== nextProps.disabled) return false;

  const prevAttemptStr = prevProps.letters?.reduce((acc, curr) => {
    return (acc += `${curr.letter}-`);
  }, "");
  const nextAttemptStr = nextProps.letters?.reduce((acc, curr) => {
    return (acc += `${curr.letter}-`);
  }, "");

  if (prevAttemptStr !== nextAttemptStr) return false;

  return true;
});
