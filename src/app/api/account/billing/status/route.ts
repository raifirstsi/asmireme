import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/services/auth";
import { getUserSubscriptionStatus } from "@/services/billing";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("asmire_session")?.value;
    const session = sessionCookie ? verifySessionToken(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const status = await getUserSubscriptionStatus(session.userId);

    return NextResponse.json({
      success: true,
      status,
    });
  } catch (err: any) {
    console.error("[Billing Status Error]", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
}
