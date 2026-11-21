import crypto from "crypto";
import { db } from "@/db";
import { invoices, subscriptions, paymentEvents, users, auditLogs } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { Resend } from "resend";

export interface SePayWebhookPayload {
  id: number | string;
  gateway?: string;
  transactionDate?: string;
  accountNumber?: string;
  subAccount?: string | null;
  amountIn: number;
  amountOut?: number;
  accumulated?: number;
  code?: string | null;
  transactionContent?: string;
  content?: string;
  referenceNumber?: string;
  body?: string;
}

export interface ProOrderResult {
  orderCode: string;
  amountVnd: number;
  amountUsd: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  qrUrl: string;
}

export interface UserSubscriptionStatus {
  planId: "STANDARD" | "PRO";
  isPro: boolean;
  status: "ACTIVE" | "EXPIRED" | "FREE";
  expiresAt: string | null;
  daysRemaining: number;
  canRefund: boolean;
  latestOrderCode: string | null;
}

const DEFAULT_PRO_PRICE_VND = 725000;
const DEFAULT_BANK_NAME = "MBBank";
const DEFAULT_ACCOUNT_NUMBER = "16786106149";
const DEFAULT_ACCOUNT_NAME = "ASMIRE VIETNAM";

export function getBillingConfig() {
  return {
    priceVnd: parseInt(process.env.PRO_PLAN_PRICE_VND || `${DEFAULT_PRO_PRICE_VND}`, 10),
    bankName: process.env.SEPAY_BANK_NAME || DEFAULT_BANK_NAME,
    accountNumber: process.env.SEPAY_ACCOUNT_NUMBER || DEFAULT_ACCOUNT_NUMBER,
    accountName: process.env.SEPAY_ACCOUNT_NAME || DEFAULT_ACCOUNT_NAME,
    apiKey: process.env.SEPAY_API_KEY || "sepay_api_secret_key",
  };
}

/**
 * Generate a unique random order code like ASM7X9K2
 */
export function generateOrderCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous I, O, 0, 1
  let code = "ASM";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return code;
}

/**
 * Create a new pending order for upgrading to Pro
 */
export async function createProOrder(userId: string): Promise<ProOrderResult> {
  const config = getBillingConfig();
  const orderCode = generateOrderCode();

  try {
    await db.insert(invoices).values({
      userId,
      orderCode,
      planId: "PRO",
      amountVnd: config.priceVnd,
      status: "PENDING",
    });
  } catch (err) {
    console.error("[Billing] Failed to insert invoice:", err);
  }

  const qrUrl = `https://qr.sepay.vn/img?bank=${encodeURIComponent(config.bankName)}&acc=${encodeURIComponent(
    config.accountNumber
  )}&template=compact&amount=${config.priceVnd}&des=${encodeURIComponent(orderCode)}`;

  return {
    orderCode,
    amountVnd: config.priceVnd,
    amountUsd: 29,
    bankName: config.bankName,
    accountNumber: config.accountNumber,
    accountName: config.accountName,
    qrUrl,
  };
}

/**
 * Extract order memo (e.g. ASM8K2D9E) from bank transfer content
 */
export function extractOrderCode(content: string): string | null {
  if (!content) return null;
  const match = content.match(/ASM[A-Z0-9]{4,8}/i);
  return match ? match[0].toUpperCase() : null;
}

/**
 * Timing-safe authentication check for SePay webhook header (API Key or HMAC)
 */
export function verifySepayApiKey(authHeader: string | null | undefined): boolean {
  const config = getBillingConfig();
  if (!authHeader) return false;

  const expectedToken = (process.env.SEPAY_WEBHOOK_SECRET || config.apiKey).trim();
  const token = authHeader.replace(/^(Apikey|Bearer)\s+/i, "").trim();

  if (token.length !== expectedToken.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken));
}

/**
 * Verify HMAC signature or API key for incoming SePay webhook
 */
export function verifySepayWebhookSignature({
  authHeader,
  signatureHeader,
  rawBody,
}: {
  authHeader?: string | null;
  signatureHeader?: string | null;
  rawBody?: string | null;
}): boolean {
  const config = getBillingConfig();
  const secret = (process.env.SEPAY_WEBHOOK_SECRET || config.apiKey).trim();

  // 1. Verify HMAC signature header if provided
  if (signatureHeader && rawBody) {
    let sigToCompare = signatureHeader.trim();
    if (signatureHeader.includes("v1=")) {
      const parts = signatureHeader.split(",");
      const v1Part = parts.find((p) => p.startsWith("v1="));
      if (v1Part) {
        sigToCompare = v1Part.substring(3).trim();
      }
    }

    const computedHex = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    if (
      computedHex.length === sigToCompare.length &&
      crypto.timingSafeEqual(Buffer.from(computedHex), Buffer.from(sigToCompare))
    ) {
      return true;
    }
  }

  // 2. Verify Authorization header if provided
  if (authHeader) {
    return verifySepayApiKey(authHeader);
  }

  return false;
}

/**
 * Process incoming SePay webhook payload with idempotency, amount verification,
 * subscription extension, and confirmation email.
 */
export async function processSepayWebhook(
  payload: SePayWebhookPayload,
  authHeader: string | null | undefined,
  options?: {
    signatureHeader?: string | null;
    rawBody?: string | null;
  }
): Promise<{ success: boolean; message: string; statusCode: number }> {
  // 1. Verify Authentication (Supports both HMAC Signature and API Key)
  const isAuthorized = verifySepayWebhookSignature({
    authHeader,
    signatureHeader: options?.signatureHeader,
    rawBody: options?.rawBody,
  });

  if (!isAuthorized) {
    return {
      success: false,
      message: "Unauthorized: Invalid or missing SePay HMAC signature / API Key",
      statusCode: 401,
    };
  }

  const externalId = String(payload.id);
  const content = payload.transactionContent || payload.content || "";
  const orderCode = extractOrderCode(content);
  const amountIn = Number(payload.amountIn) || 0;
  const config = getBillingConfig();

  if (!orderCode) {
    return {
      success: false,
      message: `No matching order code pattern found in memo: '${content}'`,
      statusCode: 400,
    };
  }

  // 2. Strict Idempotency Check: Don't process the same SePay transaction ID twice
  try {
    const existingEvents = await db
      .select()
      .from(paymentEvents)
      .where(eq(paymentEvents.externalTransactionId, externalId));

    if (existingEvents.length > 0) {
      return {
        success: true,
        message: `Transaction ${externalId} has already been processed (Idempotent response)`,
        statusCode: 200,
      };
    }
  } catch (err) {
    console.error("[Billing] Idempotency query failed:", err);
  }

  // 3. Amount Verification
  if (amountIn < config.priceVnd) {
    console.warn(`[Billing] Underpayment detected for ${orderCode}: Received ${amountIn} VND < Required ${config.priceVnd} VND`);
    return {
      success: false,
      message: `Underpayment detected: Received ${amountIn} VND, expected ${config.priceVnd} VND`,
      statusCode: 422,
    };
  }

  // 4. Find the matching pending invoice
  let targetUserId: string | null = null;
  let targetUserEmail: string | null = null;

  try {
    const matchedInvoices = await db
      .select()
      .from(invoices)
      .where(eq(invoices.orderCode, orderCode));

    if (matchedInvoices.length > 0) {
      targetUserId = matchedInvoices[0].userId;

      // Update invoice status to PAID
      await db
        .update(invoices)
        .set({
          status: "PAID",
          paymentDate: new Date(),
        })
        .where(eq(invoices.id, matchedInvoices[0].id));

      // Fetch user email for notification
      const userRecord = await db.select().from(users).where(eq(users.id, targetUserId));
      if (userRecord.length > 0) {
        targetUserEmail = userRecord[0].email;
      }
    }
  } catch (err) {
    console.error("[Billing] Invoice update failed:", err);
  }

  if (!targetUserId) {
    return {
      success: false,
      message: `Order code ${orderCode} not found in database`,
      statusCode: 404,
    };
  }

  // 5. Update or Create Pro Subscription (+30 days prepaid)
  const now = new Date();
  let newPeriodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  try {
    const existingSub = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, targetUserId), eq(subscriptions.status, "ACTIVE")));

    if (existingSub.length > 0 && existingSub[0].currentPeriodEnd > now) {
      // Extend 30 days from the current active expiration
      newPeriodEnd = new Date(existingSub[0].currentPeriodEnd.getTime() + 30 * 24 * 60 * 60 * 1000);
      await db
        .update(subscriptions)
        .set({
          currentPeriodEnd: newPeriodEnd,
          orderReference: orderCode,
          updatedAt: now,
        })
        .where(eq(subscriptions.id, existingSub[0].id));
    } else {
      // New subscription period
      await db.insert(subscriptions).values({
        userId: targetUserId,
        planId: "PRO",
        status: "ACTIVE",
        currentPeriodStart: now,
        currentPeriodEnd: newPeriodEnd,
        paymentMethod: "SEPAY",
        orderReference: orderCode,
      });
    }
  } catch (err) {
    console.error("[Billing] Subscription update failed:", err);
  }

  // 6. Record Payment Event in DB
  try {
    await db.insert(paymentEvents).values({
      gateway: "SEPAY",
      externalTransactionId: externalId,
      amount: amountIn,
      currency: "VND",
      orderCode,
      rawPayload: payload as any,
    });
  } catch (err) {
    console.error("[Billing] Failed to record payment event:", err);
  }

  // 7. Send Welcome & Receipt Email via Resend
  if (targetUserEmail && process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const expiryFormatted = newPeriodEnd.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      await resend.emails.send({
        from: `Asmire <${process.env.RESEND_FROM_EMAIL || "support@asmire.me"}>`,
        to: targetUserEmail,
        subject: "🎉 Welcome to Asmire Pro — All 50 AI SaaS Tools Unlocked!",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #0f172a;">Payment Confirmed — Asmire Pro Active</h2>
            </div>
            <p>Hello,</p>
            <p>Your payment of <strong>${amountIn.toLocaleString("vi-VN")} VND</strong> (Order code: <code>${orderCode}</code>) via VietQR has been successfully verified.</p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #0f172a;">Your Pro Plan Details:</p>
              <ul style="margin: 0; padding-left: 20px; color: #334155;">
                <li><strong>Entitlement:</strong> All 50 AI SaaS Tool Affiliate Slots Unlocked</li>
                <li><strong>Active Period:</strong> Until ${expiryFormatted} (30 days prepaid)</li>
                <li><strong>14-Day Guarantee:</strong> Full money-back guarantee eligible until ${new Date(
                  now.getTime() + 14 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US")}</li>
              </ul>
            </div>

            <p>You can now go to your Member Dashboard and input your personal affiliate links for any or all of the 50 tools in our verified catalog.</p>

            <div style="text-align: center; margin: 28px 0;">
              <a href="https://asmire.me/account" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 28px; font-weight: 600; text-decoration: none; border-radius: 6px;">Open Member Dashboard</a>
            </div>

            <p style="font-size: 13px; color: #64748b; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              Need support or want to request a refund within 14 days? Simply reply to this email or visit our <a href="https://asmire.me/refund-policy" style="color: #2563eb;">Refund Policy</a>.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("[Billing] Confirmation email failed:", emailErr);
    }
  }

  return {
    success: true,
    message: `Pro plan activated successfully for order ${orderCode}`,
    statusCode: 200,
  };
}

/**
 * Fetch detailed subscription and billing status for a user
 */
export async function getUserSubscriptionStatus(userId: string): Promise<UserSubscriptionStatus> {
  const now = new Date();

  try {
    const sub = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, "ACTIVE")))
      .orderBy(desc(subscriptions.currentPeriodEnd))
      .limit(1);

    const paidInvoices = await db
      .select()
      .from(invoices)
      .where(and(eq(invoices.userId, userId), eq(invoices.status, "PAID")))
      .orderBy(desc(invoices.paymentDate))
      .limit(1);

    if (sub.length > 0 && sub[0].planId === "PRO" && sub[0].currentPeriodEnd > now) {
      const msLeft = sub[0].currentPeriodEnd.getTime() - now.getTime();
      const daysRemaining = Math.max(1, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));

      // Check 14-day refund window from last payment
      let canRefund = false;
      let latestOrderCode = sub[0].orderReference;

      if (paidInvoices.length > 0 && paidInvoices[0].paymentDate) {
        const msSincePayment = now.getTime() - paidInvoices[0].paymentDate.getTime();
        canRefund = msSincePayment <= 14 * 24 * 60 * 60 * 1000;
        latestOrderCode = paidInvoices[0].orderCode;
      }

      return {
        planId: "PRO",
        isPro: true,
        status: "ACTIVE",
        expiresAt: sub[0].currentPeriodEnd.toISOString(),
        daysRemaining,
        canRefund,
        latestOrderCode,
      };
    }
  } catch (err) {
    console.error("[Billing] Failed to get user subscription:", err);
  }

  return {
    planId: "STANDARD",
    isPro: false,
    status: "FREE",
    expiresAt: null,
    daysRemaining: 0,
    canRefund: false,
    latestOrderCode: null,
  };
}

/**
 * Submit a 14-day refund request
 */
export async function submitRefundRequest(
  userId: string,
  userEmail: string,
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    reason: string;
  }
): Promise<{ success: boolean; message: string }> {
  const status = await getUserSubscriptionStatus(userId);

  if (!status.isPro || !status.canRefund) {
    return {
      success: false,
      message: "This account is not eligible for a refund (exceeds 14-day window or has no active paid plan).",
    };
  }

  // Record refund request in audit logs
  try {
    await db.insert(auditLogs).values({
      actorId: userId,
      action: "REFUND_REQUESTED",
      entityType: "INVOICE",
      entityId: status.latestOrderCode || "UNKNOWN",
      metadata: {
        orderCode: status.latestOrderCode,
        userEmail,
        bankDetails,
        requestedAt: new Date().toISOString(),
      },
    });

    // Notify support team via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `Asmire System <${process.env.RESEND_FROM_EMAIL || "support@asmire.me"}>`,
        to: process.env.RESEND_FROM_EMAIL || "support@asmire.me",
        subject: `⚠️ Refund Request: Order ${status.latestOrderCode} from ${userEmail}`,
        html: `
          <h3>14-Day Refund Request Received</h3>
          <p><strong>User Email:</strong> ${userEmail}</p>
          <p><strong>Order Code:</strong> ${status.latestOrderCode}</p>
          <p><strong>Customer Bank:</strong> ${bankDetails.bankName}</p>
          <p><strong>Account Number:</strong> ${bankDetails.accountNumber}</p>
          <p><strong>Account Holder:</strong> ${bankDetails.accountHolder}</p>
          <p><strong>Reason provided:</strong> ${bankDetails.reason}</p>
          <p><em>Please execute manual reverse transfer via SePay/Banking app and mark invoice as REFUNDED in DB.</em></p>
        `,
      });
    }

    return {
      success: true,
      message: "Refund request received. Our team will verify and transfer the refund to your bank account within 24-48 business hours.",
    };
  } catch (err: any) {
    console.error("[Billing] Failed to process refund request:", err);
    return {
      success: false,
      message: "An internal error occurred while submitting your refund request. Please contact support@asmire.me directly.",
    };
  }
}
