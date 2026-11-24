/**
 * Telegram Notification Service for Asmire System
 * Handles instant real-time alerts to Admin Telegram for:
 * 1. Community Reviews & Proof of Payment Invoices
 * 2. Agency OS / SME OS Snapshot Claims
 * 3. Member Registrations & Billing Orders
 */

const DEFAULT_BOT_TOKEN = "9124593455:AAH3yJZF8NOCPUSUQcj_hAITdATSvTffKTE";
const DEFAULT_CHAT_ID = "5781808621"; // Striver Le 1-1 Chat
const DEFAULT_GROUP_CHAT_ID = "-5556631424"; // RAI² POWER Telegram Group

export async function sendTelegramNotification(
  message: string,
  parseMode: "HTML" | "Markdown" = "HTML"
): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_BOT_TOKEN;
  const privateChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || DEFAULT_CHAT_ID;
  const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID || DEFAULT_GROUP_CHAT_ID;

  if (!botToken) {
    console.warn("[Telegram] No bot token provided.");
    return { success: false, error: "Missing bot token" };
  }

  // Recipients list: Both private 1-1 chat AND group chat
  const recipientChatIds = Array.from(new Set([privateChatId, groupChatId].filter(Boolean)));

  if (recipientChatIds.length === 0) {
    console.warn("[Telegram] No recipient chat IDs configured.");
    return { success: false, error: "Missing chat IDs" };
  }

  try {
    const results = await Promise.allSettled(
      recipientChatIds.map(async (chatId) => {
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
          console.error(`[Telegram] API error for chat ${chatId}:`, data);
          throw new Error(data.description || `Failed to send to ${chatId}`);
        }
        return data;
      })
    );

    const anySuccess = results.some((r) => r.status === "fulfilled");
    return { success: anySuccess };
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
  content?: string | null;
  pros?: string | null;
  cons?: string | null;
}) {
  const costText = data.realMonthlyCostPaid 
    ? `<b>$${data.realMonthlyCostPaid}/tháng</b>` 
    : "<i>Chưa cung cấp</i>";
  
  const evidenceText = data.hasEvidence 
    ? `📎 Hóa đơn đối soát: <b>${data.fileNameOriginal || "Hóa đơn"}</b> (${data.fileSizeBytes ? (data.fileSizeBytes / 1024).toFixed(1) : "?"} KB)`
    : "⚪ <i>Review thành viên (không đính kèm hóa đơn)</i>";

  const stars = "⭐".repeat(Math.max(1, Math.min(5, data.ratingOverall)));
  
  let detailsText = "";
  if (data.pros) detailsText += `\n👍 <b>Ưu điểm:</b> ${data.pros.slice(0, 150)}`;
  if (data.cons) detailsText += `\n👎 <b>Nhược điểm:</b> ${data.cons.slice(0, 150)}`;
  if (data.content) detailsText += `\n💬 <b>Nhận xét:</b> <i>"${data.content.slice(0, 200)}..."</i>`;

  const message = `
🔔 <b>[ASMIRE] CÓ REVIEW MỚI VỪA GỬI!</b>
━━━━━━━━━━━━━━━━━━━━
🛠️ <b>Công cụ:</b> ${data.toolName} (<code>${data.toolSlug}</code>)
👤 <b>Tác giả:</b> ${data.authorName} (${data.authorRole})
⭐ <b>Đánh giá:</b> ${stars} (${data.ratingOverall}/5)
💵 <b>Chi phí thực tế:</b> ${costText}
${evidenceText}${detailsText}

🆔 <b>Review ID:</b> <code>${data.reviewId}</code>
👉 <a href="https://asmire.me/vi/reviews">Xem trang đánh giá Asmire</a>
`.trim();

  return sendTelegramNotification(message);
}

export async function notifyNewUserSignUp(data: {
  email: string;
  userId?: string;
  role?: string;
  referralCode?: string;
}) {
  const message = `
👤 <b>[ASMIRE] CÓ THÀNH VIÊN ĐĂNG KÝ MỚI (FREE ACCOUNT)!</b>
━━━━━━━━━━━━━━━━━━━━
📧 <b>Email:</b> <code>${data.email}</code>
🏷️ <b>Gói thành viên:</b> <b>Free Member (Tài khoản Miễn Phí)</b>
🎫 <b>Mã giới thiệu:</b> <code>${data.referralCode || "Tự động"}</code>
🆔 <b>User ID:</b> <code>${data.userId || "Mới"}</code>

⏰ <b>Thời gian:</b> ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
👉 <a href="https://asmire.me/vi/admin">Xem Bảng Quản Trị Asmire</a>
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

export async function notifyOutboundClick(data: {
  toolName?: string;
  toolSlug: string;
  targetHost: string;
  isFallback: boolean;
  attributedMemberId?: string | null;
  reasonCode: string;
  visitorHash: string;
  ip?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  flag?: string;
}) {
  const toolDisplay = data.toolName || data.toolSlug.toUpperCase();
  const attributionText = data.isFallback
    ? "🟡 <b>Fallback về Admin Master Link</b>"
    : `🟢 <b>Member Referral:</b> <code>${data.attributedMemberId || "Unknown"}</code>`;

  const locationDisplay = data.country
    ? `${data.flag ? `${data.flag} ` : ""}${data.country}${data.city ? ` (${data.city})` : ""}`
    : "Chưa xác định";

  const message = `
🖱️ <b>[ASMIRE RADAR] CÓ LƯỢT CLICK OUTBOUND MỚI!</b>
━━━━━━━━━━━━━━━━━━━━
🛠️ <b>Công cụ SaaS:</b> <b>${toolDisplay}</b> (<code>${data.toolSlug}</code>)
🌐 <b>Host đích:</b> <code>${data.targetHost}</code>
🌍 <b>Quốc gia:</b> <b>${locationDisplay}</b>
🔍 <b>IP thực tế:</b> <code>${data.ip || "Unknown"}</code>
🎯 <b>Phân bổ:</b> ${attributionText}
🏷️ <b>Mã lý do:</b> <code>${data.reasonCode}</code>
🕵️ <b>Visitor Hash:</b> <code>${data.visitorHash}</code>

⏰ <b>Thời gian:</b> ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
👉 <a href="https://asmire.me/vi/admin">Xem Radar Telemetry trong Admin</a>
`.trim();

  return sendTelegramNotification(message);
}
