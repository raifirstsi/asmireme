import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/services/auth";
import { generateOrderCode } from "@/services/billing";
import { createPaypalOrder } from "@/services/paypal";
import { db } from "@/db";
import { invoices } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("asmire_session")?.value;
    const session = sessionCookie ? verifySessionToken(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const orderCode = generateOrderCode();

    // 1. Create pending invoice in DB for tracking
    try {
      await db.insert(invoices).values({
        userId: session.userId,
        orderCode,
        planId: "PRO",
        amountVnd: 725000,
        status: "PENDING",
      });
    } catch (dbErr) {
      console.error("[PayPal Create Order] Invoice insert failed:", dbErr);
    }

    // 2. Call PayPal Orders v2 API to create the order
    const paypalOrder = await createPaypalOrder({
      userId: session.userId,
      orderCode,
      amountUsd: 29.0,
    });

    return NextResponse.json({
      success: true,
      orderId: paypalOrder.id,
      orderCode,
    });
  } catch (err: any) {
    console.error("[PayPal Create Order Error]", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to initialize PayPal order" },
      { status: 500 }
    );
  }
}
