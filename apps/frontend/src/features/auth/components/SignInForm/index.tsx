"use client";

import { signIn } from "@/app/actions/sign-in";
import { Back } from "@/shared/components/layout/Back";
import { Logo } from "@/shared/components/layout/Logo";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import GoogleButton from "../layout/google-button";

export default function SignInForm() {
  const [result, handleLogin, isPending] = useActionState(signIn, null);
  const router = useRouter();

  useEffect(() => {
    if (result?.success && result.data) {
      toast("Login efetuado com sucesso!", {
        description: `Seja bem-vindo ${result?.data?.username ?? ""}!`,
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 3000,
      });
      router.push(ROUTES.HOME);
    }

    if (!result?.success && result?.api_error) {
      const errorMessage =
        ErrorsByCode[(result.api_error.code as keyof typeof ErrorsByCode) ?? "UNKNOWN_ERROR"];

      toast("Erro ao efetuar login", {
        description: errorMessage,
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 3000,
      });
    }
  }, [result, router]);

  return (
    <form action={handleLogin} className="w-lg flex flex-col gap-6 px-20 py-10 rounded-xl z-10">
      <div className="flex flex-col gap-5 items-center">
        <Logo />
        <span className="font-bold text-text-100 font-fredoka">Faça login em sua conta</span>
      </div>
      <GoogleButton
        className="self-center"
        redirectTo={`${window.location.origin}/callback/sign-in`}
      />
      <span className="font-bold self-center">Ou</span>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
        {result?.errors && result?.errors?.email && (
          <span
            data-visible={!!result?.errors?.email}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result?.errors?.email}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" name="password" type="password" />
        {result?.errors && result?.errors?.password && (
          <span
            data-visible={!!result.errors.password}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result?.errors?.password}
          </span>
        )}
        <a className="text-xs cursor-pointer" href="/forgot-password">
          Esqueceu a senha?
        </a>
      </div>
      <div className="flex flex-col gap-3">
        <Button className="w-50 self-center" disabled={isPending} type="submit">
          Entrar
        </Button>
        <Button
          type="button"
          className="w-50 self-center"
          variant="ghost"
          disabled={isPending}
          onClick={() => router.push(ROUTES.SIGN_UP)}
        >
          Criar conta
        </Button>
        <Back path={ROUTES.HOME} label="Voltar para a home" />
      </div>
    </form>
  );
}
