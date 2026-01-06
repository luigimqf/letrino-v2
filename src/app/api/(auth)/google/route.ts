import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { code } = body;

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: "API Error" }, { status: response.status });
    }

    const { data } = await response.json();

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: data?.token ?? "",
      httpOnly: true,
    });

    cookieStore.set({
      name: "refresh-token",
      value: data?.refresh_token ?? "",
      httpOnly: true,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal error", error }, { status: 500 });
  }
}
