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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/sign-in`, {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            message: "API Error",
            code: errData.error?.code || "UNKNOWN_ERROR",
          },
        },
        { status: response.status },
      );
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

    return NextResponse.json(
      {
        success: true,
        data,
        error: null,
      },
      { status: response.status },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          message: "Internal error",
          code: "UNKNOWN_ERROR",
        },
      },
      { status: 500 },
    );
  }
}
