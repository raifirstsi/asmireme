import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { snapshotClaims } from "@/db/schema";
import { notifyNewSnapshotClaimed } from "@/services/telegram";
import { getClientIp } from "@/lib/geo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, ghlEmail, niche } = body;

    if (!fullName || !email || !ghlEmail) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ họ tên, email nhận snapshot và email đăng ký HighLevel." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(ghlEmail)) {
      return NextResponse.json(
        { error: "Định dạng email không hợp lệ. Vui lòng kiểm tra lại." },
        { status: 400 }
      );
    }

    const ip = getClientIp(request.headers);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Attempt DB insertion
    try {
      await db.insert(snapshotClaims).values({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        ghlEmail: ghlEmail.trim().toLowerCase(),
        niche: niche || "ALL_NICHES",
        status: "PENDING",
        ipAddress: ip,
        userAgent: userAgent.slice(0, 500),
      });
    } catch (dbErr) {
      console.warn("[SnapshotClaim] DB insert warning, continuing gracefully:", dbErr);
    }

    // Send instant Telegram notification to Admin
    notifyNewSnapshotClaimed({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      ghlEmail: ghlEmail.trim().toLowerCase(),
      niche: niche || "ALL_NICHES",
      snapshotType: niche && niche.toLowerCase().includes("sme") ? "SME_OS" : "AGENCY_OS",
    }).catch((tgErr) => console.warn("[Telegram] Snapshot alert error:", tgErr?.message));

    return NextResponse.json({
      success: true,
      message: "Yêu cầu nhận Snapshot đã được ghi nhận thành công!",
      deliveryTimeline: "4 giờ làm việc",
    });
  } catch (error) {
    console.error("[SnapshotClaim] Internal error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi hệ thống. Vui lòng liên hệ support@asmire.me để nhận hỗ trợ trực tiếp." },
      { status: 500 }
    );
  }
}
