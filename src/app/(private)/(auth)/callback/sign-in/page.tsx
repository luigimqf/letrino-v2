"use client";

import GoogleIcon from "@/features/auth/components/layout/google-icon";
import { ROUTES } from "@/shared/constants";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
      fetch("/api/google", {
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
            setTimeout(() => router.push("/"), 1000);
          } else {
            setStatus("error");
            toast.error("Falha na autenticação", {
              description: "Não foi possível autenticar com o Google.",
              duration: 3000,
            });
            setTimeout(() => router.push(ROUTES.SIGN_IN + "?error=google_auth_failed"), 1000);
          }
        })
        .catch(() => {
          setStatus("error");
          toast.error("Erro de conexão", {
            description: "Ocorreu um erro ao conectar com o servidor.",
            duration: 3000,
          });
          setTimeout(() => router.push(ROUTES.SIGN_IN + "?error=google_login_failed"), 1000);
        });
    }
  }, [code, router]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              className="absolute inset-0"
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-full h-full animate-spin" style={{ animationDuration: "1.5s" }}>
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="78.5 78.5 78.5 78.5"
                  stroke="url(#googleGradient)"
                />
                <defs>
                  <linearGradient id="googleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4285F4" />
                    <stop offset="25%" stopColor="#EA4335" />
                    <stop offset="50%" stopColor="#FBBC05" />
                    <stop offset="75%" stopColor="#34A853" />
                    <stop offset="100%" stopColor="#4285F4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <GoogleIcon className="w-10 h-10" />
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center"
            >
              <Check className="w-14 h-14 text-white" strokeWidth={3} />
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-28 h-28 rounded-full bg-destructive flex items-center justify-center"
            >
              <X className="w-14 h-14 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
