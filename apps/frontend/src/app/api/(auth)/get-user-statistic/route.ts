import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/shared/constants/cookies";
import { apiFetch } from "@/shared/lib/api";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const response = await apiFetch("/me/statistics", { method: "GET" });

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
