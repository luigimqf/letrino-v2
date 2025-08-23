import { ROUTES } from "@/shared/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ROUTES.LEADERBOARD}`, {
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
