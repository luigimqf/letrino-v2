import { cookies } from "next/headers";
import { AUTH_COOKIE, GUEST_COOKIE } from "@/shared/constants/cookies";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

export async function apiFetch(path: string, init: RequestInit = {}) {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  const guest = store.get(GUEST_COOKIE)?.value;

  return fetch(`${API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(guest ? { "X-Guest-Session": guest } : {}),
      ...init.headers,
    },
  });
}
