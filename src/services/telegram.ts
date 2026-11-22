/**
 * Telegram Notification Service for Asmire System
 * Handles instant real-time alerts to Admin Telegram for:
 * 1. Community Reviews & Proof of Payment Invoices
 * 2. Agency OS / SME OS Snapshot Claims
 * 3. Member Registrations & Billing Orders
 */

const DEFAULT_BOT_TOKEN = "9124593455:AAH3yJZF8NOCPUSUQcj_hAITdATSvTffKTE";

export async function sendTelegramNotification(
  message: string,
  parseMode: "HTML" | "Markdown" = "HTML"
): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!botToken) {
    console.warn("[Telegram] No bot token provided.");
    return { success: false, error: "Missing bot token" };
  }

  if (!chatId) {
    console.warn("[Telegram] TELEGRAM_ADMIN_CHAT_ID is not configured in environment yet.");
    return { success: false, error: "Missing chat ID" };
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error("[Telegram] API error:", data);
      return { success: false, error: data.description || "Failed to send message" };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Telegram] Network exception:", err?.message);
    return { success: false, error: err?.message };
  }
}

export async function notifyNewReviewSubmitted(data: {
  toolName: string;
  toolSlug: string;
  authorName: string;
  authorRole: string;
  ratingOverall: number;
  realMonthlyCostPaid?: number | null;
  hasEvidence: boolean;
  fileNameOriginal?: string | null;
  fileSizeBytes?: number | null;
  reviewId: string;
}) {
  const costText = data.realMonthlyCostPaid 
    ? `<b>$${data.realMonthlyCostPaid}/tháng</b>` 
    : "<i>Chưa cung cấp</i>";
  
  const evidenceText = data.hasEvidence 
    ? `📎 Đính kèm: <b>${data.fileNameOriginal || "Hóa đơn"}</b> (${data.fileSizeBytes ? (data.fileSizeBytes / 1024).toFixed(1) : "?"} KB)`
    : "⚪ <i>Không đính kèm hóa đơn</i>";

  const stars = "⭐".repeat(Math.max(1, Math.min(5, data.ratingOverall)));

  const message = `
🔔 <b>[ASMIRE] CÓ REVIEW THỰC CHỨNG MỚI!</b>
━━━━━━━━━━━━━━━━━━━━
🛠️ <b>Công cụ:</b> ${data.toolName} (<code>${data.toolSlug}</code>)
👤 <b>Tác giả:</b> ${data.authorName} (${data.authorRole})
⭐ <b>Đánh giá:</b> ${stars} (${data.ratingOverall}/5)
💵 <b>Chi phí thực tế:</b> ${costText}
${evidenceText}

🆔 <b>Review ID:</b> <code>${data.reviewId}</code>
👉 <a href="https://asmire.me/vi/admin">Đăng nhập Admin Portal để đối soát</a>
`.trim();

  return sendTelegramNotification(message);
}

export async function notifyNewSnapshotClaimed(data: {
  fullName: string;
  email: string;
  ghlEmail: string;
  niche?: string | null;
  snapshotType: "AGENCY_OS" | "SME_OS" | string;
}) {
  const typeName = data.snapshotType === "SME_OS" 
    ? "SME OS (Local & Small Business)" 
    : "Agency OS (Full-Stack Setup)";

  const message = `
🚀 <b>[ASMIRE] CÓ KHÁCH HÀNG CLAIM SNAPSHOT!</b>
━━━━━━━━━━━━━━━━━━━━
📦 <b>Gói Snapshot:</b> ${typeName}
👤 <b>Họ và tên:</b> ${data.fullName}
📧 <b>Email liên hệ:</b> ${data.email}
🔑 <b>HighLevel Email:</b> <code>${data.ghlEmail}</code>
🎯 <b>Ngành / Niche:</b> ${data.niche || "Chưa xác định"}

⏰ <b>Thời gian:</b> ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
👉 <a href="https://asmire.me/vi/admin">Xem danh sách khách hàng trong Admin</a>
`.trim();

  return sendTelegramNotification(message);
}

export async function notifyNewOrder(data: {
  orderId: string;
  userEmail: string;
  planName: string;
  amount: string | number;
  currency: string;
  paymentMethod: "SEPAY" | "PAYPAL" | string;
}) {
  const message = `
💰 <b>[ASMIRE] GIAO DỊCH NÂNG CẤP THÀNH CÔNG!</b>
━━━━━━━━━━━━━━━━━━━━
💎 <b>Gói dịch vụ:</b> ${data.planName}
💵 <b>Số tiền:</b> <b>${data.amount} ${data.currency}</b>
💳 <b>Cổng thanh toán:</b> ${data.paymentMethod}
📧 <b>Tài khoản mua:</b> ${data.userEmail}
🧾 <b>Mã đơn hàng:</b> <code>${data.orderId}</code>

⏰ <b>Thời gian:</b> ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
`.trim();

  return sendTelegramNotification(message);
}
