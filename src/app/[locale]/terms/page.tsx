import React from "react";
import { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Điều Khoản Sử Dụng — Asmire" : "Terms of Service — Asmire",
    description: "Terms and conditions of use for Asmire directory and services.",
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-8">
        <h1 className="text-3xl font-black text-foreground">
          {isVi ? "Điều Khoản Sử Dụng" : "Terms of Service"}
        </h1>
        <p className="text-xs text-muted-foreground">
          {isVi ? "Cập nhật lần cuối: 21 tháng 11, 2026" : "Last updated: November 21, 2026"}
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-foreground/90 text-sm leading-relaxed">
          <p>
            {isVi
              ? "Chào mừng bạn đến với Asmire (asmire.me). Bằng việc truy cập hoặc sử dụng trang web của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây."
              : "Welcome to Asmire (asmire.me). By accessing or using our directory and services, you agree to comply with and be bound by these terms."}
          </p>
          <h2 className="text-base font-bold text-foreground">
            {isVi ? "1. Quyền Sở Hữu Trí Tuệ & Thương Hiệu" : "1. Intellectual Property & Trademarks"}
          </h2>
          <p>
            {isVi
              ? "Tất cả các nhãn hiệu, logo và tên sản phẩm của bên thứ ba xuất hiện trên website (ví dụ: HighLevel, ElevenLabs, Jasper...) thuộc sở hữu của các chủ sở hữu tương ứng. Chúng tôi chỉ sử dụng các tên gọi này cho mục đích mô tả, đối chiếu và đánh giá khách quan theo quy định sử dụng hợp lý (Nominative Fair Use)."
              : "All third-party trademarks, product names, and logos displayed on this site are property of their respective owners. They are used purely for comparative identification, review, and nominative fair use purposes."}
          </p>
          <h2 className="text-base font-bold text-foreground">
            {isVi ? "2. Giới Hạn Trách Nhiệm" : "2. Limitation of Liability"}
          </h2>
          <p>
            {isVi
              ? "Các thông tin về giá gói, tính năng và chính sách của các công cụ SaaS được chúng tôi kiểm tra định kỳ. Tuy nhiên, các nhà cung cấp có thể thay đổi chính sách mà không báo trước. Người dùng nên kiểm tra lại thông tin cuối cùng trên website chính thức của nhà cung cấp trước khi mua."
              : "While we make every effort to maintain verified and accurate pricing data, SaaS vendors may change terms without notice. Users are encouraged to verify final pricing on the vendor's official checkout page."}
          </p>
        </div>
      </div>
    </div>
  );
}
