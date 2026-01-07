"use client";

import { signUp } from "@/app/actions/sign-up";
import { Back } from "@/shared/components/layout/Back";
import { Logo } from "@/shared/components/layout/Logo";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { PasswordRequirements } from "@/shared/components/ui/PasswordRequirements";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import GoogleButton from "../layout/google-button";

export default function SignUpForm() {
  const [result, handleSignUp, isPending] = useActionState(signUp, null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (result?.success) {
      toast("Perfil criado com sucesso!", {
        description: "Faça login para continuar",
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 5000,
      });
      router.push(ROUTES.SIGN_IN);
    }

    if (!result?.success && result?.api_error) {
      const errorMessage =
        ErrorsByCode[(result.api_error.code as keyof typeof ErrorsByCode) ?? "UNKNOWN_ERROR"];

      toast("Erro ao criar perfil", {
        description: errorMessage,
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 5000,
      });
    }
  }, [result, router]);

  return (
    <form action={handleSignUp} className="w-lg flex flex-col gap-8 px-20 py-10 rounded-xl z-10">
      <div className="flex flex-col gap-5 items-center">
        <Logo />
        <span className="font-bold text-text-100 font-fredoka">Crie sua conta</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          defaultValue={result?.values?.username ?? ""}
          id="username"
          name="username"
          type="text"
        />
        {result?.errors && result?.errors?.username && (
          <span
            data-visible={!!result.errors.username}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.errors.username}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="email">Email</Label>
        <Input defaultValue={result?.values?.email ?? ""} id="email" name="email" type="email" />
        {result?.errors && result?.errors?.email && (
          <span
            data-visible={!!result.errors.email}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.errors.email}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          defaultValue={result?.values?.password ?? ""}
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordRequirements password={password} />
        {result?.errors && result?.errors?.password && (
          <span
            data-visible={!!result.errors.password}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.errors.password}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="confirm-password">Confirmar Senha</Label>
        <Input
          defaultValue={result?.values?.confirm_password ?? ""}
          id="confirm-password"
          name="confirm-password"
          type="password"
        />
        {result?.errors && result?.errors?.confirm_password && (
          <span
            data-visible={!!result.errors.confirm_password}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.errors.confirm_password}
          </span>
        )}
      </div>
      <Button className="w-3/4 self-center" disabled={isPending} type="submit">
        Criar perfil
      </Button>
      <GoogleButton
        redirectTo={`${window.location.origin}/callback/sign-up`}
        label="Registrar com Google"
        className="w-3/4 self-center"
      />
      <Back path={ROUTES.SIGN_IN} label="Voltar para o login" />
    </form>
  );
}
