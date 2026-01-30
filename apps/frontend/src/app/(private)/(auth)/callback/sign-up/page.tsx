"use client";

import GoogleLoader from "@/features/auth/components/layout/google-loader";
import { Logo } from "@/shared/components/layout/Logo";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type AuthStatus = "idle" | "loading" | "success" | "error";

export default function SignUpCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<AuthStatus>("idle");

  const handleSubmit = useCallback(() => {
    if (code) {
      setStatus("loading");
      fetch("/api/google/sign-up", {
        method: "POST",
        body: JSON.stringify({ code, username }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (res.ok) {
            setStatus("success");
            toast.success("Perfil criado com sucesso!", {
              description: "Seja bem-vindo ao Letrino!",
              duration: 2000,
            });
            setTimeout(() => router.push(ROUTES.HOME), 1000);
          } else {
            const data = await res.json();
            const errorMessage =
              ErrorsByCode[(data.error.code as keyof typeof ErrorsByCode) ?? "UNKNOWN_ERROR"];
            setStatus("error");
            toast.error("Falha na criação de perfil", {
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
  }, [code, router, username]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      {status === "idle" ? (
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <Logo />
          <div className="flex flex-col items-start gap-4">
            <Input
              id="username"
              name="username"
              placeholder="Escolha um nome de usuário"
              type="text"
              value={username}
              className="w-60"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleSubmit} className="text-xs">
            Criar Perfil
            <ArrowRight />
          </Button>
        </div>
      ) : (
        <div className="relative w-28 h-28 flex items-center justify-center">
          <GoogleLoader status={status} />
        </div>
      )}
    </main>
  );
}
