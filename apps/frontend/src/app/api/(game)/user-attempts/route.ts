import { NextResponse } from "next/server";
import { apiFetch } from "@/shared/lib/api";

export async function GET() {
  try {
    const response = await apiFetch("/me/attempts", { method: "GET" });

    if (!response.ok) {
      return NextResponse.json({ message: "API Error" }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal error", error }, { status: 500 });
  }
}
