"use server";

import { ServerActionReturn } from "@/features/auth/types";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { z } from "zod";

const signUpSchema = z.object({
  email: z
    .string({ message: "Campo Obrigatório" })
    .nonempty("Campo Obrigatório")
    .email("Email inválido"),
  title: z.string().nonempty("Campo Obrigatório"),
  description: z.string().nonempty("Campo Obrigatório"),
  files: z.instanceof(FileList).optional(),
});

export async function submitBug(_: unknown, formData: FormData): Promise<ServerActionReturn> {
  const raw = {
    email: formData.get("email"),
    title: formData.get("title"),
    description: formData.get("description"),
    files: formData.get("files"),
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

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.SUBMIT_BUG}`, {
      method: "POST",
      body: JSON.stringify(result.data),
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
