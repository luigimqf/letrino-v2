"use client"

import { ROUTES } from "@/shared/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    if(code) {
      fetch('/api/google', {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (res.ok) {
            router.push("/");
          } else {
            router.push(ROUTES.SIGN_IN + "?error=google_auth_failed");
          }
        })
        .catch(() => {
          router.push(ROUTES.SIGN_IN + "?error=google_login_failed");
        });
    }
  },[code, router]);
  
  return (
    <main className="w-full h-full flex justify-center items-center">
      <span className="font-semibold text-lg">Autenticando com Google...</span>
    </main>
  );
}