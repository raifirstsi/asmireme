import { NextRequest, NextResponse } from "next/server";
import { processSepayWebhook, SePayWebhookPayload } from "@/services/billing";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const signatureHeader =
      req.headers.get("x-sepay-signature") ||
      req.headers.get("sepay-signature") ||
      req.headers.get("x-signature");

    const rawBody = await req.text();
    let body: SePayWebhookPayload;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const result = await processSepayWebhook(body, authHeader, {
      signatureHeader,
      rawBody,
    });

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
      },
      { status: result.statusCode }
    );
  } catch (err: any) {
    console.error("[SePay Webhook Error]", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error processing payment webhook",
      },
      { status: 500 }
    );
  }
}

// Allow GET for simple health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Asmire SePay Webhook Endpoint (HMAC-SHA256 Enabled)",
    timestamp: new Date().toISOString(),
  });
}
