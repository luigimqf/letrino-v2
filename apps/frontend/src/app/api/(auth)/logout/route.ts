import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, REFRESH_COOKIE } from "@/shared/constants/cookies";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);

  return NextResponse.json({ status: 200 });
}
