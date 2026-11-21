import React from "react";
import { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Chính Sách Bảo Mật - Asmire" : "Privacy Policy - Asmire",
    description: "How Asmire protects user data, handles referral cookies, and complies with privacy standards.",
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-8">
        <h1 className="text-3xl font-black text-foreground">
          {isVi ? "Chính Sách Bảo Mật (Privacy Policy)" : "Privacy Policy"}
        </h1>
        <p className="text-xs text-muted-foreground">
          {isVi ? "Cập nhật lần cuối: 21 tháng 11, 2027" : "Last updated: November 21, 2027"}
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-foreground/90 text-sm leading-relaxed">
          <p>
            {isVi
              ? "Asmire cam kết bảo vệ quyền riêng tư của bạn. Chúng tôi tuân thủ nguyên tắc thu thập dữ liệu tối thiểu và bảo mật cao nhất."
              : "Asmire is dedicated to safeguarding your personal privacy. We practice data minimization and strict security standards across all systems."}
          </p>
          <h2 className="text-base font-bold text-foreground">
            {isVi ? "1. Cookie Giới Thiệu (Referral Attribution Cookie)" : "1. Referral Tracking Cookies"}
          </h2>
          <p>
            {isVi
              ? "Khi bạn nhấp vào liên kết chia sẻ của một thành viên (/r/[code]), chúng tôi sẽ thiết lập một cookie first-party an toàn có tên 'asmire_ref' được ký mã hóa bằng HMAC-SHA256 với thời hạn tối đa 365 ngày. Cookie này chỉ chứa mã thành viên và thời gian tạo, hoàn toàn không chứa thông tin cá nhân hay theo dõi lịch sử duyệt web ngoài phạm vi site của chúng tôi."
              : "When you visit via a member's referral link (/r/[code]), we set a signed HMAC-SHA256 first-party cookie named 'asmire_ref' with a rolling 365-day lifespan. This cookie contains strictly the member ID and timestamp. It never captures personally identifiable information or tracks browsing outside our domain."}
          </p>
          <h2 className="text-base font-bold text-foreground">
            {isVi ? "2. Không Lưu Trữ Thông Tin Thẻ Ngân Hàng" : "2. Zero Payment Card Storage"}
          </h2>
          <p>
            {isVi
              ? "Chúng tôi không bao giờ lưu trữ số thẻ tín dụng hoặc thông tin tài khoản ngân hàng của bạn. Mọi giao dịch nâng cấp Pro đều được xử lý tự động qua SePay VietQR trực tiếp giữa ứng dụng ngân hàng của bạn và tài khoản doanh nghiệp của chúng tôi."
              : "We never capture or store credit card numbers or banking passwords. Pro membership payments are handled securely via SePay VietQR directly between your mobile banking app and our verified corporate bank account."}
          </p>
        </div>
      </div>
    </div>
  );
}
