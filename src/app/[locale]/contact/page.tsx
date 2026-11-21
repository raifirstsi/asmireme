import React from "react";
import { Locale } from "@/lib/i18n";
import { Mail, Server, MapPin, Shield } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Liên Hệ & Hỗ Trợ Kỹ Thuật — Asmire" : "Contact & Support — Asmire",
    description: "Get in touch with the Asmire editorial and support team.",
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Liên Hệ & Hỗ Trợ" : "Contact & Editorial Inquiries"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isVi
              ? "Bạn có câu hỏi về việc kiểm thử phần mềm, góp ý nội dung hoặc cần hỗ trợ tài khoản? Đội ngũ Asmire luôn sẵn sàng hỗ trợ."
              : "Have questions about our benchmarking methodology, want to report a dead link, or need billing support? Our team is here to help."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            <h3 className="font-bold text-base text-foreground">Email Hỗ Trợ Chính Thức</h3>
            <p className="text-xs text-muted-foreground">
              Phản hồi trong vòng 24 giờ làm việc cho mọi yêu cầu kỹ thuật và hoàn tiền.
            </p>
            <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 pt-2">
              support@asmire.me
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <Server className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-base text-foreground">Hạ Tầng Kỹ Thuật</h3>
            <p className="text-xs text-muted-foreground">
              Hệ thống máy chủ VPS đám mây độc lập tại địa chỉ IP: <code>167.86.106.149</code>.
            </p>
            <p className="text-xs font-semibold text-foreground pt-2">
              Domain: asmire.me
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
