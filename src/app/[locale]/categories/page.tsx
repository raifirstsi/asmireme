import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { CATEGORY_HUBS } from "@/data/categories-data";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Layers } from "lucide-react";

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CategoriesPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi ? "Chuyên Mục Công Cụ AI SaaS - Asmire" : "All AI SaaS Categories & Hubs - Asmire",
    description: isVi
      ? "Khám phá 10 chuyên mục công cụ AI SaaS: Video, Âm thanh, Viết bài chuẩn SEO, CRM bán hàng, Thiết kế slide..."
      : "Explore 10 AI software categories: Video, Voice, Content & SEO, Sales CRM, Presentations, and AI Agents.",
  };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>Taxonomy & Hubs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Các Chuyên Mục Công Cụ AI" : "AI Software Categories"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {isVi
              ? "Tất cả 50 công cụ AI được phân loại thành 10 chuyên mục độc lập để bạn dễ dàng tìm kiếm giải pháp phù hợp với công việc."
              : "50 verified AI SaaS tools classified across 10 distinct software hubs with dedicated production benchmarks."}
          </p>
        </div>

        <CategoryGrid locale={locale as Locale} />
      </div>
    </div>
  );
}
