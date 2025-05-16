"use-client"

import { InputOTP, InputOTPGroup } from "@/shared/components/ui/input-otp";
import { OTPInput } from "input-otp";
import React from "react";

type RowProps = Omit<React.ComponentProps<typeof OTPInput>, "render">;

export const Row = ({children,disabled,maxLength, value, onChange, ...props}: RowProps) => {

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if(!disabled) {
      inputRef.current?.focus()
    }
  },[disabled])

  return (
    <InputOTP ref={inputRef} disabled={disabled} maxLength={maxLength} value={value} onChange={onChange} {...props}>
      <InputOTPGroup className="gap-0.5">
        {children}
      </InputOTPGroup>
    </InputOTP>
  )
}