"use client";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { GOOGLE_SCOPES } from "../../constants";
import GoogleIcon from "./google-icon";

interface GoogleIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  redirectTo: string;
}

const GoogleButton: React.FC<GoogleIconProps> = ({ redirectTo, className, label, ...props }) => {
  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_ID;
    const authUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId ?? "",
      redirect_uri: redirectTo,
      scope: GOOGLE_SCOPES.join(" "),
      access_type: "offline",
      prompt: "consent",
    });

    window.location.href = `${authUrl}?${params.toString()}`;
  };

  return (
    <Button
      {...props}
      className={cn("border w-10 h-10 shadow-sm", className)}
      onClick={handleGoogleSignIn}
    >
      <GoogleIcon />
      {label && <span className="ml-2">{label}</span>}
    </Button>
  );
};

export default GoogleButton;
