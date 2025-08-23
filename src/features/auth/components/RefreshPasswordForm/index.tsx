"use client";

import { refreshPassword } from "@/app/actions/refresh-password";
import { Logo } from "@/shared/components/layout/Logo";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ROUTES } from "@/shared/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RefreshPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [result, handleRefreshPassword, isPending] = useActionState(refreshPassword, null);

  useEffect(() => {
    if (result?.success) {
      toast("Senha atualizada com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 3000,
      });
      router.push(ROUTES.SIGN_IN);
    }

    if (!result?.success && result?.errors?.api_err) {
      toast("Erro ao atualizar senha", {
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
      action={handleRefreshPassword}
      className="bg-bkg-100 w-sm flex flex-col gap-8 px-20 py-10 rounded-xl"
    >
      <div className="flex flex-col gap-5 items-center">
        <Logo />
        <span className="font-bold text-text-100 font-fredoka">Recupere sua senha</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="new-password">Nova Senha</Label>
        <Input
          defaultValue={result?.values?.new_password ?? ""}
          id="new-password"
          name="new-password"
          type="password"
        />
        {result?.errors && result?.errors?.new_password && (
          <span
            data-visible={!!result.errors.new_password}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.errors.new_password}
          </span>
        )}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="confirm-new-password">Confirme nova senha</Label>
        <Input
          defaultValue={result?.values?.confirm_new_password ?? ""}
          id="confirm-new-password"
          name="confirm-new-password"
          type="password"
        />
        {result?.errors && result?.errors?.confirm_new_password && (
          <span
            data-visible={!!result.errors.confirm_new_password}
            className="data-[visible='true']:visible invisible text-xs text-destructive font-semibold"
          >
            {result.errors.confirm_new_password}
          </span>
        )}
      </div>
      <Input className="hidden" defaultValue={token ?? ""} name="token" />
      <Button disabled={isPending} type="submit">
        Enviar
      </Button>
    </form>
  );
}
