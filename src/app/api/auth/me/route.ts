import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/services/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("asmire_session")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, user: null },
        {
          headers: {
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        { authenticated: false, user: null },
        {
          headers: {
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          email: session.email,
          role: session.role,
          memberId: session.memberId,
          referralCode: session.referralCode,
        },
      },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { authenticated: false, user: null },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
