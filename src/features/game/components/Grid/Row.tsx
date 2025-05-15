"use-client"

import { InputOTP, InputOTPGroup } from "@/shared/components/ui/input-otp";
import { OTPInput } from "input-otp";

type RowProps = Omit<React.ComponentProps<typeof OTPInput>, "render">;

export const Row = ({children,disabled,maxLength, value, onChange, ...props}: RowProps) => {

  return (
    <InputOTP disabled={disabled} maxLength={maxLength} value={value} onChange={onChange} {...props}>
      <InputOTPGroup className="gap-0.5">
        {children}
      </InputOTPGroup>
    </InputOTP>
  )
}