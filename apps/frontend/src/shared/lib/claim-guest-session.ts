import { cookies } from "next/headers";
import { GUEST_COOKIE } from "@/shared/constants/cookies";
import { API_URL } from "@/shared/lib/api";

export async function claimGuestSession(token?: string): Promise<void> {
  if (!token) return;

  const store = await cookies();
  const guest = store.get(GUEST_COOKIE)?.value;

  if (!guest) return;

  try {
    await fetch(`${API_URL}/auth/guest/claim`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Guest-Session": guest,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[claim-guest-session] failed", error);
  }

  // O middleware emite uma sessão nova na próxima requisição.
  store.delete(GUEST_COOKIE);
}
