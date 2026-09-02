import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/shared/constants/cookies";
import { apiFetch } from "@/shared/lib/api";

export async function GET() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const response = await apiFetch("/me", { method: "GET" });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "API Error" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: "Internal error", error }, { status: 500 });
  }
}
