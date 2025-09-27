"use client";

import { refreshPassword } from "@/app/actions/refresh-password";
import { Back } from "@/shared/components/layout/Back";
import { Logo } from "@/shared/components/layout/Logo";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { PasswordRequirements } from "@/shared/components/ui/PasswordRequirements";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function RefreshPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");

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

    if (!result?.success && result?.errors?.code) {
      toast("Erro ao atualizar senha", {
        description:
          ErrorsByCode[result.errors.code as keyof typeof ErrorsByCode] ||
          ErrorsByCode.UNKNOWN_ERROR,
        action: {
          label: "Fechar",
          onClick: () => {},
        },
        duration: 3000,
      });
    }
  }, [result, router]);

  return (
    <form
      action={handleRefreshPassword}
      className="w-lg flex flex-col gap-8 px-20 py-10 rounded-xl z-10"
    >
      <div className="flex flex-col gap-5 items-center">
        <Logo />
        <span className="font-bold text-text-100 font-fredoka">Redefina sua senha</span>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="new-password">Nova Senha</Label>
        <Input
          defaultValue={result?.values?.new_password ?? ""}
          id="new-password"
          name="new-password"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <PasswordRequirements password={newPassword} />
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
      <Back path={ROUTES.SIGN_IN} label="Voltar para o login" />
    </form>
  );
}
