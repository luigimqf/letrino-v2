"use-client"

import { InputOTP } from "@/shared/components/ui/input-otp";
import { OTPInput } from "input-otp";
import React, { memo } from "react";
import { type Attempt as AttemptType } from "../../types/game";
import { LETTERS_PER_ATTEMPT } from "../../constants/game";
import { Letter } from "./Letter";

type AttemptProps = Omit<React.ComponentProps<typeof OTPInput>, "render"> & {
  letters: AttemptType;
};

const AttemptComponent = ({children,letters,disabled,maxLength, value, onChange, ...props}: AttemptProps) => {

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if(!disabled) {
      inputRef.current?.focus()
    }
  },[disabled])
  
  return (
    <InputOTP ref={inputRef} disabled={disabled} maxLength={maxLength} value={value} onChange={onChange} {...props}>
      {
        [...Array(LETTERS_PER_ATTEMPT)].map((_,letterIndex) => {
          const letterStatus = letters?.[letterIndex]?.status;
          return (
          <Letter key={`letter-${letterIndex}`} index={letterIndex} status={letterStatus}/>
        )
        })
      }
    </InputOTP>
  )
}

export const Attempt = memo(AttemptComponent, (prevProps, nextProps) => {

  if(prevProps.disabled !== nextProps.disabled) return false;

  const prevAttemptStr = prevProps.letters?.reduce((acc, curr) => {
    return acc += `${curr.letter}-`
  }, '')
  const nextAttemptStr = nextProps.letters?.reduce((acc, curr) => {
    return acc += `${curr.letter}-`
  }, '')

  if(prevAttemptStr !== nextAttemptStr) return false;

  return true;
})