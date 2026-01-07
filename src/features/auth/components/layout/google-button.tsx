"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { GOOGLE_SCOPES } from "../../constants";
import GoogleIcon from "./google-icon";

interface GoogleIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  redirectTo: string;
}

const GoogleButton: React.FC<GoogleIconProps> = ({ redirectTo, className, ...props }) => {
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
    <button
      {...props}
      className={cn(
        "flex cursor-pointer items-center justify-center border rounded-full w-10 h-10 shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium",
        className,
      )}
      onClick={handleGoogleSignIn}
    >
      <GoogleIcon />
    </button>
  );
};

export default GoogleButton;
