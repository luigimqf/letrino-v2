import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("refresh-token");

  return NextResponse.json({ status: 200 });
}
