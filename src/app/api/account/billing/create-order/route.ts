import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/services/auth";
import { createProOrder } from "@/services/billing";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("asmire_session")?.value;
    const session = sessionCookie ? verifySessionToken(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const order = await createProOrder(session.userId);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err: any) {
    console.error("[Billing Create Order Error]", err);
    return NextResponse.json(
      { success: false, message: "Failed to generate Pro upgrade order" },
      { status: 500 }
    );
  }
}
