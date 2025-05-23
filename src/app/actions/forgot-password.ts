"use server"

import { ServerActionReturn } from "@/features/auth/types";
import { ROUTES } from "@/shared/constants";
import { PromiseFailed } from "@/shared/types";
import {z} from "zod";

const emailSchema = z.string({message:"Campo Obrigatório"})
    .nonempty("Campo Obrigatório")
    .email("Email inválido");

export async function forgotPassword(_: unknown, formData:FormData): Promise<ServerActionReturn> {
  const email = formData.get("recover-email")

  const result = emailSchema.safeParse(email)
  
  if(!result.success) {
    const errors = result.error.errors.reduce((acc, err) => {
      if(err.path[0]) {
        acc[err.path[0]] = err.message
      }
      return acc;
    },{} as Record<string, string>)

    return {
      success: false,
      errors,
      values: {
        email: email as string
      }
    }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.FORGOT_PASSWORD}`, {
    method: 'POST',
    body: JSON.stringify({email}),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if(!response.ok) {
    const errData: PromiseFailed = await response.json();
    return {
      success: false,
      errors: {
        api_err: errData.error
      },
      values: {
        email: email as string
      }
    }
  }

  return {
    success: true,
    errors: null,
    values: {
      email: email as string
    }
  };
}