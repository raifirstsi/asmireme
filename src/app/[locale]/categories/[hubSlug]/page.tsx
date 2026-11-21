import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { CATEGORY_HUBS } from "@/data/categories-data";
import { getToolsByHub } from "@/data/tools-data";
import { ToolCard } from "@/components/tools/ToolCard";
import { ArrowLeft, Layers } from "lucide-react";

interface CategoryDetailPageProps {
  params: Promise<{ locale: string; hubSlug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; hubSlug: string }[] = [];
  for (const hub of CATEGORY_HUBS) {
    params.push({ locale: "en", hubSlug: hub.slug });
    params.push({ locale: "vi", hubSlug: hub.slug });
  }
  return params;
}

export async function generateMetadata({ params }: CategoryDetailPageProps) {
  const { locale, hubSlug } = await params;
  const hub = CATEGORY_HUBS.find((h) => h.slug === hubSlug);
  if (!hub) return {};

  const isVi = locale === "vi";
  return {
    title: isVi
      ? `Top Công Cụ ${hub.name.vi} Tốt Nhất (2026) — Asmire`
      : `Best ${hub.name.en} Tools (2026 Ranking) — Asmire`,
    description: hub.description[locale as Locale],
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { locale, hubSlug } = await params;
  const hub = CATEGORY_HUBS.find((h) => h.slug === hubSlug);
  if (!hub) notFound();

  const tools = getToolsByHub(hubSlug);
  const isVi = locale === "vi";

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <Link
          href={`/${locale}/categories`}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          {isVi ? "Tất cả chuyên mục" : "All Categories"}
        </Link>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {hub.name[locale as Locale]}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {hub.description[locale as Locale]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale as Locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
