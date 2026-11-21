import React from "react";
import { Locale } from "@/lib/i18n";
import { ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Điều Khoản Thành Viên & Quy Định Giới Thiệu — Asmire" : "Member Referral Terms of Service — Asmire",
    description: "Terms and conditions governing the Asmire community member referral network.",
  };
}

export default async function MemberTermsPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>Community Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Điều Khoản Thành Viên & Quy Định Giới Thiệu" : "Member Referral Terms of Service"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isVi
              ? "Quy định bắt buộc đối với mọi thành viên tham gia hệ thống gắn link giới thiệu affiliate trên nền tảng Asmire."
              : "Binding rules and policies governing all registered members participating in the Asmire referral link system."}
          </p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm">
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground m-0">
              {isVi
                ? "Thành viên tự chịu trách nhiệm pháp lý tuân thủ điều khoản riêng của từng chương trình affiliate mà mình tham gia. Asmire có quyền khóa vĩnh viễn tài khoản nếu phát hiện hành vi gian lận hoặc vi phạm chính sách của nhà cung cấp SaaS."
                : "Members are solely responsible for complying with the individual affiliate terms of each SaaS vendor. Asmire reserves the right to terminate any member account engaging in fraudulent traffic generation or policy violations."}
            </p>
          </div>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "1. Các Hành Vi Nghiêm Cấm Tuyệt Đối (Zero Tolerance)" : "1. Strictly Prohibited Practices"}
          </h2>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><strong>Chạy quảng cáo từ khóa thương hiệu (Brand Bidding):</strong> Tuyệt đối không chạy Google Ads, Bing Ads, Facebook Ads nhắm vào tên thương hiệu của các công cụ (ví dụ: GoHighLevel, ElevenLabs, Jasper...) kèm link giới thiệu.</li>
            <li><strong>Đăng ký tên miền chứa thương hiệu:</strong> Không đăng ký tên miền vi phạm nhãn hiệu để chuyển hướng về Asmire.</li>
            <li><strong>Bơm click ảo & Gian lận bot:</strong> Sử dụng botnet, phần mềm tự bấm click hoặc dịch vụ traffic trao đổi ảo sẽ bị hệ thống phát hiện và khóa tài khoản tức thì mà không hoàn tiền.</li>
            <li><strong>Tự giới thiệu (Self-Referral):</strong> Không sử dụng link giới thiệu của chính mình để tự mua hàng nhằm trục lợi hoa hồng (đây là hành vi bị hầu hết các mạng affiliate cấm).</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "2. Quy Tắc Chuyển Hướng Fallback Về Link Admin" : "2. Fallback to Site Owner Policy"}
          </h2>
          <p>
            {isVi
              ? "Thành viên đồng ý và xác nhận quy tắc kỹ thuật của hệ thống: Khi khách truy cập nhấp vào một công cụ mà thành viên CHƯA NHẬP LINK hoặc NẰM NGOÀI HẠN MỨC GÓI (gói Standard chỉ gồm 3 công cụ do thành viên chọn), hệ thống sẽ chuyển hướng khách đến link affiliate của chủ site Asmire."
              : "Members explicitly acknowledge our routing policy: When a referred visitor clicks an AI tool that the member has NOT linked or that EXCEEDS the member's active plan limit (Standard limited to 3 slots), the redirect deterministically routes to the Asmire site owner's affiliate link."}
          </p>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "3. Không Cam Kết Về Doanh Thu Hay Hoa Hồng" : "3. No Income Guarantees"}
          </h2>
          <p>
            {isVi
              ? "Asmire cung cấp nền tảng công nghệ và hệ thống gắn link giới thiệu. Chúng tôi TUYỆT ĐỐI KHÔNG CAM KẾT về số lượng đơn hàng, tỷ lệ chuyển đổi hay mức thu nhập thực tế của thành viên. Hoa hồng do chính các hãng SaaS tính toán và thanh toán độc lập vào tài khoản của thành viên."
              : "Asmire provides directory software and referral linking capabilities. We make ZERO guarantees regarding specific sales volumes, conversion rates, or earnings. All commissions are governed, calculated, and disbursed independently by the respective third-party SaaS vendors."}
          </p>
        </div>
      </div>
    </div>
  );
}
