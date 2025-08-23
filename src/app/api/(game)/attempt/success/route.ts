import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { attempt } = body;

  if (!attempt) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attempt/success`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attempt,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "API Error" }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal error", error }, { status: 500 });
  }
}
