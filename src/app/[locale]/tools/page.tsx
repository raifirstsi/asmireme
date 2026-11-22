import React, { Suspense } from "react";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { DirectoryClient } from "@/components/tools/DirectoryClient";
import { Layers } from "lucide-react";

interface ToolsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ToolsPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";
  const count = TOOLS_DATA.length;

  return {
    title: isVi ? `Danh Mục ${count} Công Cụ AI SaaS Đã Kiểm Chứng (2027) - Asmire` : `All ${count} Verified AI SaaS Tools Directory (2027) - Asmire`,
    description: isVi
      ? `Bộ lọc thông minh ${count} công cụ AI SaaS tốt nhất năm 2027 theo chuyên mục, mức giá, bản miễn phí và điểm số kiểm thử thực tế.`
      : `Interactive directory of all ${count} top AI SaaS tools with verified benchmarks, live pricing filters, and empirical verdicts.`,
  };
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params;
  const count = TOOLS_DATA.length;

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>{count} Production AI Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {locale === "vi" ? `Danh Mục ${count} Công Cụ AI SaaS Đã Kiểm Chứng` : `The Verified AI SaaS Directory (${count} Tools)`}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {locale === "vi"
              ? `Tất cả ${count} công cụ trong danh mục chuẩn của Asmire đã được kiểm tra tính năng, xác thực bảng giá và đối soát điều khoản affiliate.`
              : `Search, filter, and inspect ${count} verified tools across specialized software hubs. Real testing artifacts, transparent limitations, and zero paid placement.`}
          </p>
        </div>

        {/* Client Directory with Filters */}
        <Suspense fallback={<div className="py-20 text-center text-sm text-muted-foreground">Loading verified tools...</div>}>
          <DirectoryClient initialTools={TOOLS_DATA} locale={locale as Locale} />
        </Suspense>
      </div>
    </div>
  );
}
