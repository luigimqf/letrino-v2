"use server";

import { ServerActionReturn } from "@/features/auth/types";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { z } from "zod";

const signUpSchema = z
  .object({
    username: z
      .string({ message: "Campo Obrigatório" })
      .nonempty("Campo Obrigatório")
      .min(5, "Username precisa ter no mínimo 5 caracteres")
      .max(16, "Username precisa ter no máximo 16 caracteres")
      .regex(/^[a-zA-Z0-9]+$/, { message: "Apenas alfanuméricos sem espaços são permitidos" }),
    email: z
      .string({ message: "Campo Obrigatório" })
      .nonempty("Campo Obrigatório")
      .email("Email inválido"),
    password: z.string().nonempty("Campo Obrigatório"),
    confirm_password: z.string().nonempty("Campo Obrigatório"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas não coincidem",
  });

export async function signUp(_: unknown, formData: FormData): Promise<ServerActionReturn> {
  const raw = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm-password"),
  };

  const result = signUpSchema.safeParse(raw);

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
      values: raw as Record<string, string>,
    };
  }

  const { username, email, password } = result.data;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.SIGN_UP}`, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData: PromiseReturn = await response.json();
      return {
        success: false,
        api_error: {
          message: errData.error?.message || ErrorsByCode.BAD_REQUEST,
          code: errData.error?.code || "UNKNOWN_ERROR",
        },
        values: raw as Record<string, string>,
      };
    }

    return {
      success: true,
      api_error: null,
      values: raw as Record<string, string>,
    };
  } catch {
    return {
      success: false,
      api_error: {
        message: ErrorsByCode.UNKNOWN_ERROR,
        code: "UNKNOWN_ERROR",
      },
      values: raw as Record<string, string>,
    };
  }
}
