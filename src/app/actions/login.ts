"use server"

import { LoginData } from "@/features/auth/types";
import { PromiseFailed, PromiseReturn, PromiseSuccess } from "@/shared/types";
import { cookies } from "next/headers";
import {z} from "zod";

type ErrorReturn = {
  email?: string[] | undefined;
  password?: string[] | undefined;
  login?: string[] | undefined;
}

const loginSchema = z.object({
  email: z.string({message:"Campo Obrigatório"}).nonempty("Campo Obrigatório").email("Email inválido"),
  password: z.string().nonempty("Campo Obrigatório")
})

export async function login(_: unknown, formData:FormData): Promise<PromiseReturn<LoginData, ErrorReturn>> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password")
  };

  const result = loginSchema.safeParse(raw)

  if(!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors
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
      error: {
        login: [errData.error]
      }
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
  })

  return {
    success: true,
    data,
  };
}