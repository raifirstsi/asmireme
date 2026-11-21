import React from "react";
import { Locale } from "@/lib/i18n";
import { Sparkles, Shield, Users, Target } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Về Chúng Tôi - Asmire" : "About Us - Asmire",
    description: "Learn about Asmire's mission to bring empirical benchmarks and fair referral sharing to AI software.",
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Our Mission & Core Values</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Về Chúng Tôi - Asmire" : "About Asmire"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isVi
              ? "Asmire được thành lập với một sứ mệnh duy nhất: Làm trong sạch không gian review phần mềm AI bằng dữ liệu kiểm thử thực tế và chia sẻ cơ hội doanh thu cùng cộng đồng."
              : "Asmire was created with a clear purpose: eliminating fluff and sponsored bias from AI SaaS reviews through rigorous empirical testing and decentralized community rewards."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card space-y-2">
            <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h4 className="font-bold text-sm text-foreground">100% Thực Nghiệm</h4>
            <p className="text-xs text-muted-foreground">
              Mỗi phần mềm đều được test bằng câu lệnh và kịch bản thật. Không sao chép tài liệu quảng cáo.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card space-y-2">
            <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h4 className="font-bold text-sm text-foreground">Chia Sẻ Doanh Thu</h4>
            <p className="text-xs text-muted-foreground">
              Thành viên tự gắn link affiliate và nhận 100% hoa hồng trực tiếp từ nhà phát hành.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card space-y-2">
            <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-sm text-foreground">Chuẩn AEO & GEO</h4>
            <p className="text-xs text-muted-foreground">
              Cấu trúc dữ liệu chuẩn để AI Search (Perplexity, ChatGPT, Gemini) trích dẫn thông tin chuẩn xác.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
