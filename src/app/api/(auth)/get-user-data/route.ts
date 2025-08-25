import { ROUTES } from "@/shared/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.USER_DATA}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
