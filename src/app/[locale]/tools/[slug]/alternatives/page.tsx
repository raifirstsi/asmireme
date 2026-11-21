import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { getToolBySlug, TOOLS_DATA } from "@/data/tools-data";
import { ToolCard } from "@/components/tools/ToolCard";
import { ArrowLeft } from "lucide-react";

interface AlternativesPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const tool of TOOLS_DATA) {
    params.push({ locale: "en", slug: tool.slug });
    params.push({ locale: "vi", slug: tool.slug });
  }
  return params;
}

export async function generateMetadata({ params }: AlternativesPageProps) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const isVi = locale === "vi";
  return {
    title: isVi
      ? `Top Công Cụ Thay Thế ${tool.name} Tốt Nhất 2027 — Asmire`
      : `Best ${tool.name} Alternatives & Competitors in 2027 — Asmire`,
    description: `Compare the top tested alternatives to ${tool.name} based on features, pricing, and usability.`,
    alternates: {
      canonical: `/${locale}/tools/${tool.slug}/alternatives`,
      languages: {
        en: `/en/tools/${tool.slug}/alternatives`,
        vi: `/vi/tools/${tool.slug}/alternatives`,
        "x-default": `/en/tools/${tool.slug}/alternatives`,
      },
    },
  };
}

export default async function ToolAlternativesPage({ params }: AlternativesPageProps) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const isVi = locale === "vi";
  const alternativeTools = tool.alternatives
    .map((altSlug) => getToolBySlug(altSlug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://asmire.me/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `https://asmire.me/${locale}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `https://asmire.me/${locale}/tools/${tool.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Alternatives",
        item: `https://asmire.me/${locale}/tools/${tool.slug}/alternatives`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-8">
        <Link
          href={`/${locale}/tools/${tool.slug}`}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          {isVi ? `Quay lại đánh giá ${tool.name}` : `Back to ${tool.name} review`}
        </Link>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? `Top Công Cụ Thay Thế Cho ${tool.name}` : `Top Alternatives to ${tool.name}`}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {isVi
              ? `Nếu ${tool.name} không đáp ứng được nhu cầu hoặc ngân sách của bạn, dưới đây là các công cụ cạnh tranh tốt nhất trong cùng phân khúc đã được chúng tôi kiểm chứng.`
              : `Looking for a better fit or different pricing? Here are the top tested competitors to ${tool.name}.`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {alternativeTools.map((alt) => (
            <ToolCard key={alt.id} tool={alt} locale={locale as Locale} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
