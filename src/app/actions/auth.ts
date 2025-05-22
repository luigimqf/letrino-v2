"use server"
import {z} from "zod"

const loginSchema = z.object({
  email: z.string({message:"Campo Obrigatório"}).email("Email inválido").nonempty("Campo Obrigatório"),
  password: z.string()
})

export async function login(formData:FormData) {
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
    return {
      success: false,
      error: 'Falha no login'
    }
  }
}