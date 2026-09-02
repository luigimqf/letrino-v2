"use server";

import { LoginData, ServerActionReturn } from "@/features/auth/types";
import { ErrorsByCode, ROUTES } from "@/shared/constants";
import { PromiseReturn } from "@/shared/types";
import { cookies } from "next/headers";
import { z } from "zod";
import { AUTH_COOKIE, REFRESH_COOKIE } from "@/shared/constants/cookies";
import { claimGuestSession } from "@/shared/lib/claim-guest-session";

type SignInReturn = ServerActionReturn & {
  data?: LoginData;
};

const signInSchema = z.object({
  email: z
    .string({ message: "Campo Obrigatório" })
    .nonempty("Campo Obrigatório")
    .email("Email inválido"),
  password: z.string().nonempty("Campo Obrigatório"),
});

export async function signIn(_: unknown, formData: FormData): Promise<SignInReturn> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  } as Record<string, string>;

  const result = signInSchema.safeParse(raw);

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
      values: raw,
    };
  }

  const { email, password } = result.data;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.SIGN_IN}`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
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
        values: raw,
      };
    }
    const { data }: PromiseReturn<LoginData> = await response.json();

    const cookieStore = await cookies();

    cookieStore.set({
      name: AUTH_COOKIE,
      value: data?.token ?? "",
      httpOnly: true,
    });

    cookieStore.set({
      name: REFRESH_COOKIE,
      value: data?.refresh_token ?? "",
      httpOnly: true,
    });

    await claimGuestSession(data?.token);

    return {
      success: true,
      api_error: null,
      values: raw,
      data,
    };
  } catch {
    return {
      success: false,
      api_error: {
        message: ErrorsByCode.UNKNOWN_ERROR,
        code: "UNKNOWN_ERROR",
      },
      values: raw,
    };
  }
}
