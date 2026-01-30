"use server";

import { ServerActionReturn } from "@/features/auth/types";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { z } from "zod";

const newPasswordSchema = z
  .object({
    new_password: z
      .string()
      .nonempty("Campo Obrigatório")
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter ao menos um número")
      .regex(/[^A-Za-z0-9]/, "A senha deve conter ao menos um caractere especial"),
    confirm_new_password: z
      .string()
      .nonempty("Campo Obrigatório")
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter ao menos um número")
      .regex(/[^A-Za-z0-9]/, "A senha deve conter ao menos um caractere especial"),
    token: z.string().nonempty("Token de recuperação necessário"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    path: ["confirm_new_password"],
    message: "As senhas não coincidem",
  });

export async function refreshPassword(_: unknown, formData: FormData): Promise<ServerActionReturn> {
  const rawData = {
    new_password: formData.get("new-password"),
    confirm_new_password: formData.get("confirm-new-password"),
    token: formData.get("token"),
  } as Record<string, string>;

  const result = newPasswordSchema.safeParse(rawData);

  if (!result.success) {
    const errors = result.error.errors.reduce(
      (acc, err) => {
        if (err.path[0]) {
          acc[err.path[0]] = err.message;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      success: false,
      errors,
      values: rawData,
    };
  }

  const { token, new_password } = result.data;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.REFRESH_PASSWORD}`, {
      method: "POST",
      body: JSON.stringify({ token, newPassword: new_password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData: PromiseReturn = await response.json();
      return {
        success: false,
        errors: {
          message: errData.error?.message || ErrorsByCode.BAD_REQUEST,
          code: errData.error?.code || "UNKNOWN_ERROR",
        },
        values: rawData,
      };
    }

    return {
      success: true,
      errors: null,
      values: rawData,
    };
  } catch {
    return {
      success: false,
      errors: {
        message: ErrorsByCode.UNKNOWN_ERROR,
        code: "UNKNOWN_ERROR",
      },
      values: rawData,
    };
  }
}
