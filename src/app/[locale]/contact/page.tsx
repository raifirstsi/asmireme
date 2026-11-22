import React from "react";
import { Locale } from "@/lib/i18n";
import { Mail, ExternalLink } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Liên Hệ & Hỗ Trợ Kỹ Thuật - Asmire" : "Contact & Support - Asmire",
    description: "Get in touch with the Asmire editorial and support team.",
  };
}

function TelegramIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Liên Hệ & Hỗ Trợ" : "Contact & Support"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isVi
              ? "Bạn có câu hỏi về việc kiểm thử phần mềm, góp ý nội dung hoặc cần hỗ trợ tài khoản? Đội ngũ Asmire luôn sẵn sàng hỗ trợ."
              : "Have questions about our benchmarking methodology, dead link reports, or member account assistance? The Asmire team is always here to help."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Support Card */}
          <div className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between hover:border-brand-500/40 transition-colors space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-foreground">
                {isVi ? "Email Hỗ Trợ Chính Thức" : "Official Email Support"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isVi
                  ? "Phản hồi trong vòng 24 giờ làm việc cho mọi yêu cầu kỹ thuật và hoàn tiền."
                  : "Response within 24 business hours for technical, editorial, and billing requests."}
              </p>
            </div>
            <div className="pt-2 border-t border-border/50">
              <a
                href="mailto:support@asmire.me"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>support@asmire.me</span>
              </a>
            </div>
          </div>

          {/* Telegram Support Card */}
          <div className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between hover:border-[#229ED9]/40 transition-colors space-y-4">
            <div className="space-y-2">
              <a
                href="http://t.me/asmireme_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#229ED9]/10 flex items-center justify-center text-[#229ED9] hover:bg-[#229ED9]/20 transition-colors"
                title="Open Telegram Bot"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <h3 className="font-bold text-base text-foreground">
                {isVi ? "Hỗ Trợ Qua Telegram" : "Telegram Direct Support"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isVi
                  ? "Kênh hỗ trợ giải đáp nhanh 24/7, phản hồi tức thì cho hội viên và đối tác."
                  : "Direct 24/7 instant messaging bot for fast assistance, member inquiries, and support."}
              </p>
            </div>
            <div className="pt-2 border-t border-border/50">
              <a
                href="http://t.me/asmireme_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#229ED9] hover:underline"
              >
                <span>@asmireme_bot</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
