import React from "react";
import { Metadata } from "next";
import { Locale, locales } from "@/lib/i18n";
import { getAllSaaSStacks } from "@/data/saas-stacks-data";
import { ReplaceClient } from "@/components/replace/ReplaceClient";

interface ReplacePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }));
}

export async function generateMetadata({ params }: ReplacePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale as Locale) || "en";
  const isVi = locale === "vi";

  const title = isVi
    ? "Ma Trận Cắt Giảm Chi Phí SaaS: Tiết Kiệm $8,600+/Năm | Asmire"
    : "Cut My SaaS Bill: 5 Lean Stacks to Save $8,600+/Year | Asmire";
  const description = isVi
    ? "Chấm dứt việc trả tiền cho các phần mềm cồng kềnh thu phí theo đầu người. 5 combo tinh gọn đã được Asmire kiểm nghiệm giúp tiết kiệm 50% - 80% chi phí SaaS."
    : "Eliminate per-seat software monopolies. 5 battle-tested lean software combinations audited by Asmire to retain $8,600+ in annual capital.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://asmire.me/${locale}/replace`,
    },
    alternates: {
      canonical: `https://asmire.me/${locale}/replace`,
      languages: {
        en: "https://asmire.me/en/replace",
        vi: "https://asmire.me/vi/replace",
        "x-default": "https://asmire.me/en/replace",
      },
    },
  };
}

export default async function ReplacePage({ params }: ReplacePageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale as Locale) || "en";
  const isVi = locale === "vi";
  const stacks = getAllSaaSStacks();

  // JSON-LD Structured Data for Google AEO (FAQPage + ItemList Rich Snippets)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: isVi ? "Ma Trận Cắt Giảm Chi Phí SaaS" : "Cut My SaaS Bill Matrix",
        description: isVi
          ? "5 ngăn xếp phần mềm tinh gọn giúp cắt giảm 50% - 80% chi phí định kỳ doanh nghiệp."
          : "5 battle-tested lean software combinations to cut 50% - 80% of software overhead.",
        itemListElement: stacks.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: isVi ? s.title.vi : s.title.en,
          description: isVi ? s.summary.vi : s.summary.en,
          url: `https://asmire.me/${locale}/replace#${s.id}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: isVi
              ? "Thay thế HubSpot bằng GoHighLevel có tiết kiệm được bao nhiêu tiền?"
              : "How much money can you save by replacing HubSpot with GoHighLevel?",
            acceptedAnswer: {
              "@type": "Answer",
              text: isVi
                ? "Thay thế HubSpot bằng GoHighLevel tiết kiệm trung bình $403/tháng (tương đương $4,836/năm, giảm 80% chi phí) nhờ chính sách không giới hạn người dùng và miễn phí toàn bộ sub-accounts."
                : "Replacing HubSpot with GoHighLevel saves approximately $403/month ($4,836/year, an 80% reduction) due to unlimited users and zero per-seat licensing penalties.",
            },
          },
          {
            "@type": "Question",
            name: isVi
              ? "Tại sao nên chuyển từ Zapier sang Make.com?"
              : "Why switch from Zapier to Make.com?",
            acceptedAnswer: {
              "@type": "Answer",
              text: isVi
                ? "Make.com cung cấp 10,000 operations với giá chỉ $16/tháng so với 5,000 tasks giá $74/tháng của Zapier, giúp tiết kiệm 78% chi phí và hỗ trợ sơ đồ 2D trực quan mạnh mẽ hơn."
                : "Make.com offers 10,000 operations for $16/month compared to 5,000 tasks for $74 on Zapier, saving 78% while offering superior 2D visual routing.",
            },
          },
          {
            "@type": "Question",
            name: isVi
              ? "KoalaWriter thay thế Jasper và Copy.ai như thế nào?"
              : "How does KoalaWriter replace Jasper and Copy.ai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: isVi
                ? "KoalaWriter tự động cào top 10 Google SERP thời gian thực và chèn bảng affiliate chỉ với $25/tháng, tiết kiệm $93/tháng (78%) so với việc mua cùng lúc Jasper ($69) và Copy.ai ($49)."
                : "KoalaWriter integrates real-time Google SERP analysis and automatic affiliate tables for $25/month, saving $93/month (78%) versus subscribing to Jasper ($69) and Copy.ai ($49) together.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReplaceClient stacks={stacks} locale={locale} />
    </div>
  );
}
