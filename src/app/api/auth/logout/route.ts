import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true, redirect: "/en" });
  response.cookies.delete("asmire_session");
  return response;
}
