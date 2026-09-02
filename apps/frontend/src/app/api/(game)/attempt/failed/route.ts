import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/shared/lib/api";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { attempt } = body;

  if (!attempt) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const response = await apiFetch("/game/attempt/fail", {
      method: "POST",
      body: JSON.stringify({ attempt }),
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
