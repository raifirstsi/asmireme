import React, { Suspense } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { COMPARISON_PAIRS } from "@/data/comparisons-data";
import { ComparisonMatrix } from "@/components/tools/ComparisonMatrix";
import { ArrowLeftRight } from "lucide-react";

interface ComparePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tools?: string }>;
}

export async function generateMetadata({ params, searchParams }: ComparePageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi ? "Công Cụ So Sánh 2-4 Phần Mềm AI SaaS — Asmire" : "2-4 AI Software Head-to-Head Comparison Matrix — Asmire",
    description: "Compare features, pricing tiers, and benchmark scores between top AI tools side-by-side.",
  };
}

export default async function ComparePage({ params, searchParams }: ComparePageProps) {
  const { locale } = await params;
  const { tools } = await searchParams;

  let initialTools = [TOOLS_DATA[0], TOOLS_DATA[1]]; // HighLevel vs Decktopus default

  if (tools) {
    const slugs = tools.split(",").map((s) => s.trim());
    const matched = slugs
      .map((slug) => TOOLS_DATA.find((t) => t.slug === slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t));
    if (matched.length >= 2) {
      initialTools = matched.slice(0, 4);
    }
  }

  const isVi = locale === "vi";

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <ArrowLeftRight className="h-4 w-4" />
            <span>Interactive Multi-Tool Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "So Sánh Trực Tiếp 2 Đến 4 Công Cụ AI" : "Side-by-Side AI Software Comparison"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            {isVi
              ? "Chọn tối đa 4 công cụ AI bất kỳ trong danh mục 50 tool để đối chiếu ma trận tính năng, bảng giá thực tế và ưu/nhược điểm đối kháng."
              : "Compare up to 4 AI tools at once. Inspect feature coverage, hidden usage limits, and verified annual savings."}
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-sm text-muted-foreground">Loading comparison matrix...</div>}>
          <ComparisonMatrix initialTools={initialTools} locale={locale as Locale} />
        </Suspense>

        {/* Featured Editorial Comparison Guides */}
        <div className="border-t border-border pt-12 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {isVi ? "Các Bài So Sánh Đối Đầu Chuyên Sâu" : "Featured Head-to-Head Comparison Guides"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {isVi
                ? "Các cặp đối thủ trực tiếp được thử nghiệm chi tiết bởi ban biên tập Asmire với câu trả lời trực tiếp cho tìm kiếm AI."
                : "Deep benchmark analyses comparing direct competitors with verified answers for AI search engines."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {COMPARISON_PAIRS.map((pair) => (
              <Link
                key={pair.slug}
                href={`/${locale}/compare/${pair.slug}`}
                className="rounded-2xl border border-border bg-card p-6 hover:border-brand-500/50 hover:shadow-sm transition-all group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">
                    {pair.category}
                  </span>
                  <h3 className="text-base font-bold text-foreground group-hover:text-brand-600 transition-colors">
                    {pair.title[locale as Locale]}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {pair.directAnswer[locale as Locale]}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                  <span>{isVi ? "Xem chi tiết so sánh" : "Read full comparison"}</span>
                  <span className="ml-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
