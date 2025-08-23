"use server";

import { ServerActionReturn } from "@/features/auth/types";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { z } from "zod";

const emailSchema = z
  .string({ message: "Campo Obrigatório" })
  .nonempty("Campo Obrigatório")
  .email("Email inválido");

export async function forgotPassword(_: unknown, formData: FormData): Promise<ServerActionReturn> {
  const email = formData.get("recover-email");

  const result = emailSchema.safeParse(email);

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
      values: {
        email: email as string,
      },
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.FORGOT_PASSWORD}`, {
      method: "POST",
      body: JSON.stringify({ email }),
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
        values: {
          email: email as string,
        },
      };
    }

    return {
      success: true,
      errors: null,
      values: {
        email: email as string,
      },
    };
  } catch {
    return {
      success: false,
      errors: {
        message: ErrorsByCode.UNKNOWN_ERROR,
        code: "UNKNOWN_ERROR",
      },
      values: {
        email: email as string,
      },
    };
  }
}
