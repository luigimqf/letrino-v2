"use server"

import { LoginData, ServerActionReturn } from "@/features/auth/types";
import { PromiseFailed, PromiseSuccess } from "@/shared/types";
import { cookies } from "next/headers";
import {z} from "zod";

type SignInReturn = ServerActionReturn & {
  data?: LoginData
}

const signInSchema = z.object({
  email: z.string({message:"Campo Obrigatório"}).nonempty("Campo Obrigatório").email("Email inválido"),
  password: z.string().nonempty("Campo Obrigatório")
})

export async function signIn(_: unknown, formData:FormData): Promise<SignInReturn> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password")
  } as Record<string, string>;

  const result = signInSchema.safeParse(raw)

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
      values: raw
    }
  }

  const {email,password} = result.data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({email,password}),
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
      values: raw
    }
  }
  const {data}: PromiseSuccess<LoginData> = await response.json();

  const cookieStore = await cookies();

  cookieStore.set({
    name: 'token',
    value: data.token,
    httpOnly: true,
  });

  cookieStore.set({
    name: 'refresh-token',
    value: data.refresh_token,
    httpOnly: true,
  });

  return {
    success: true,
    errors: null,
    values: raw,
    data
  };
}