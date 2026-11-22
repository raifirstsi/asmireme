import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("a19f864e29be49b6b9075e81d113c49e", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
