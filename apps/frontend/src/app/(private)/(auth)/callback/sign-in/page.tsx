"use client";

import GoogleLoader from "@/features/auth/components/layout/google-loader";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AuthStatus = "loading" | "success" | "error";

export default function SignInCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    if (code) {
      fetch("/api/google/sign-in", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (res.ok) {
            setStatus("success");
            toast.success("Login realizado com sucesso!", {
              description: "Seja bem-vindo ao Letrino!",
              duration: 2000,
            });
            setTimeout(() => router.push(ROUTES.HOME), 1000);
          } else {
            const data = await res.json();
            const errorMessage =
              ErrorsByCode[(data.error.code as keyof typeof ErrorsByCode) ?? "UNKNOWN_ERROR"];
            setStatus("error");
            toast.error("Falha na autenticação", {
              description: errorMessage,
              duration: 3000,
            });
            setTimeout(() => router.push(ROUTES.SIGN_IN), 1000);
          }
        })
        .catch(() => {
          setStatus("error");
          toast.error("Erro de conexão", {
            description: "Ocorreu um erro ao conectar com o servidor.",
            duration: 3000,
          });
          setTimeout(() => router.push(ROUTES.SIGN_IN), 1000);
        });
    }
  }, [code, router]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <GoogleLoader status={status} />
      </div>
    </main>
  );
}
