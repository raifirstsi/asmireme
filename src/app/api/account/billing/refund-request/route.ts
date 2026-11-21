import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/services/auth";
import { submitRefundRequest } from "@/services/billing";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("asmire_session")?.value;
    const session = sessionCookie ? verifySessionToken(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { bankName, accountNumber, accountHolder, reason } = await req.json();

    if (!bankName || !accountNumber || !accountHolder) {
      return NextResponse.json(
        { success: false, message: "Missing required bank information (bankName, accountNumber, accountHolder)" },
        { status: 400 }
      );
    }

    const result = await submitRefundRequest(session.userId, session.email, {
      bankName: String(bankName).trim(),
      accountNumber: String(accountNumber).trim(),
      accountHolder: String(accountHolder).trim(),
      reason: String(reason || "Customer requested 14-day refund").trim(),
    });

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: any) {
    console.error("[Refund Request Error]", err);
    return NextResponse.json(
      { success: false, message: "Failed to submit refund request" },
      { status: 500 }
    );
  }
}
