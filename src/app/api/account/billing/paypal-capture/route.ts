import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/services/auth";
import { capturePaypalOrder } from "@/services/paypal";
import { activateProSubscription } from "@/services/billing";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("asmire_session")?.value;
    const session = sessionCookie ? verifySessionToken(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, orderCode } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Missing required orderId" },
        { status: 400 }
      );
    }

    // 1. Capture the payment on PayPal
    const captureResult = await capturePaypalOrder(orderId);

    // 2. Verify capture status
    const isCompleted = captureResult.status === "COMPLETED";
    if (!isCompleted) {
      console.warn("[PayPal Capture] Order not completed:", captureResult);
      return NextResponse.json(
        { success: false, message: `PayPal order status is ${captureResult.status}` },
        { status: 400 }
      );
    }

    // Extract capture details
    const purchaseUnit = captureResult.purchase_units?.[0];
    const capture = purchaseUnit?.payments?.captures?.[0];
    const externalTransactionId = capture?.id || orderId;
    const referenceOrderCode = purchaseUnit?.reference_id || orderCode || `ASM-PP-${orderId.slice(-6)}`;
    const capturedAmount = parseFloat(capture?.amount?.value || "29.00");

    // 3. Activate Pro Subscription in database (+30 days prepaid)
    const activation = await activateProSubscription({
      userId: session.userId,
      orderCode: referenceOrderCode,
      paymentMethod: "PAYPAL",
      externalTransactionId,
      amount: capturedAmount,
      currency: "USD",
      rawPayload: captureResult,
    });

    return NextResponse.json({
      success: true,
      message: "PayPal payment captured and Pro plan activated successfully!",
      expiresAt: activation.expiresAt,
    });
  } catch (err: any) {
    console.error("[PayPal Capture Error]", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to capture PayPal payment" },
      { status: 500 }
    );
  }
}
