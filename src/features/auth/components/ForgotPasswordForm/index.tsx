"use client";

import { forgotPassword } from "@/app/actions/forgot-password";
import { Logo } from "@/shared/components/layout/Logo";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ROUTES } from "@/shared/constants";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [result, handleForgotPassword, isPending] = useActionState(forgotPassword, null);

  const router = useRouter();

  useEffect(() => {
    if (result?.success) {
      toast("E-mail enviado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 3000,
      });
      router.push(ROUTES.SIGN_IN);
    }

    if (!result?.success && result?.errors?.api_err) {
      toast("Erro ao enviar e-mail de recuperação", {
        description: result.errors.api_err,
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 3000,
      });
    }
  }, [result]);

  return (
    <form
      action={handleForgotPassword}
      className="bg-bkg-100 w-sm flex flex-col gap-8 px-20 py-10 rounded-xl"
    >
      <div className="flex flex-col gap-5 items-center">
        <Logo />
        <span className="font-bold text-text-100 font-fredoka">Recupere sua senha</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="recover-email">Email</Label>
        <Input
          defaultValue={result?.values?.email ?? ""}
          id="recover-email"
          name="recover-email"
          type="email"
        />
        {result?.errors && result?.errors?.email && (
          <span
            data-visible={!!result.errors.email}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.errors.email}
          </span>
        )}
      </div>
      <Button disabled={isPending} type="submit">
        Enviar
      </Button>
    </form>
  );
}
