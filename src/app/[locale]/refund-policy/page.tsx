import React from "react";
import { Locale } from "@/lib/i18n";
import { ShieldCheck, RefreshCw, Mail, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Chính Sách Hoàn Tiền 14 Ngày - Asmire" : "14-Day Refund Policy - Asmire",
    description: "Asmire 14-day 100% money-back guarantee policy for Pro subscriptions.",
  };
}

export default async function RefundPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <RefreshCw className="h-4 w-4" />
            <span>Customer Protection Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Chính Sách Hoàn Tiền 14 Ngày" : "14-Day Money-Back Guarantee"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isVi
              ? "Chúng tôi cam kết mang lại sự hài lòng tối đa. Nếu gói thành viên Pro không đáp ứng kỳ vọng của bạn, chúng tôi sẽ hoàn trả 100% số tiền đã thanh toán trong vòng 14 ngày đầu tiên."
              : "We want you to be completely confident in your investment. If our Pro membership does not meet your expectations, we provide an unconditional 100% refund within the first 14 days."}
          </p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm">
          <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2 m-0">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              {isVi ? "Cam Kết Hoàn Tiền 100% Không Điều Kiện Ràng Buộc" : "100% Hassle-Free Refund Pledge"}
            </h3>
            <p className="text-xs text-muted-foreground m-0">
              {isVi
                ? "Áp dụng cho mọi khoản thanh toán nâng cấp gói Pro (725.000 VNĐ / $29) được thực hiện qua SePay VietQR trong vòng 14 ngày kể từ thời điểm giao dịch."
                : "Applies to any Pro upgrade payment ($29 / 725,000 VND) executed via SePay VietQR within 14 calendar days of transaction completion."}
            </p>
          </div>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "1. Cách Thức Yêu Cầu Hoàn Tiền" : "1. How to Request a Refund"}
          </h2>
          <p>
            {isVi
              ? "Bạn có thể gửi yêu cầu hoàn tiền qua 2 cách cực kỳ nhanh chóng:"
              : "You can initiate a refund through two straightforward channels:"}
          </p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <strong>Qua Email:</strong> Gửi email từ địa chỉ đã đăng ký tài khoản tới <span className="font-semibold text-foreground">support@asmire.me</span> với tiêu đề <code>[Yêu Cầu Hoàn Tiền] Mã đơn hàng của bạn</code>.
            </li>
            <li>
              <strong>Trực tiếp trên Dashboard:</strong> Truy cập khu vực tài khoản tại <code>/account/billing</code> và bấm vào nút "Yêu cầu hoàn tiền trong 14 ngày".
            </li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "2. Thời Gian Xử Lý & Chuyển Khoản" : "2. Processing Timeline & Bank Transfer"}
          </h2>
          <p>
            {isVi
              ? "Vì các giao dịch trên Asmire được thanh toán qua SePay VietQR vào tài khoản ngân hàng doanh nghiệp tại Việt Nam, lệnh hoàn tiền sẽ được kế toán xử lý và chuyển khoản trực tiếp về lại số tài khoản ngân hàng của bạn trong vòng 24–48 giờ làm việc."
              : "Since transactions on Asmire are processed via SePay VietQR directly through our registered corporate bank account in Vietnam, approved refunds are transferred directly back to your domestic bank account within 24 to 48 business hours."}
          </p>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "3. Quyền Lợi Sau Khi Hoàn Tiền" : "3. Account Status Post-Refund"}
          </h2>
          <p>
            {isVi
              ? "Sau khi lệnh hoàn tiền được thực hiện thành công, tài khoản của bạn sẽ tự động chuyển về gói Standard (miễn phí). Các link affiliate của 3 công cụ được bấm nhiều nhất sẽ được giữ lại hoạt động bình thường."
              : "Upon refund confirmation, your account seamlessly reverts to the Standard (Free) tier. Your top 3 most-clicked affiliate links remain intact and operational."}
          </p>
        </div>
      </div>
    </div>
  );
}
