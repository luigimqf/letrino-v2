"use-client"

import { InputOTP } from "@/shared/components/ui/input-otp";
import { OTPInput } from "input-otp";
import React from "react";

type AttemptProps = Omit<React.ComponentProps<typeof OTPInput>, "render">;

export const Attempt = ({children,disabled,maxLength, value, onChange, ...props}: AttemptProps) => {

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if(!disabled) {
      inputRef.current?.focus()
    }
  },[disabled])

  return (
    <InputOTP ref={inputRef} disabled={disabled} maxLength={maxLength} value={value} onChange={onChange} {...props}>
      {children}
    </InputOTP>
  )
}