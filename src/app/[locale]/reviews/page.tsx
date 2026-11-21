import React from "react";
import { Locale } from "@/lib/i18n";
import { DETAILED_REVIEWS_DATASET } from "@/data/reviews-dataset";
import { ReviewsClient } from "@/components/reviews/ReviewsClient";
import { MessageSquare, Star, ShieldCheck, Sparkles, Database } from "lucide-react";

interface ReviewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ReviewsPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "200+ Đánh Giá Phần Mềm AI Thực Tế (Product Hunt, G2, Trustpilot, Reddit) - Asmire"
      : "200+ Verified AI SaaS Reviews & Community Sentiment Hub (2027) - Asmire",
    description: isVi
      ? "Kho dữ liệu 200+ đánh giá thực tế độc lập từ người dùng và chuyên gia trên Product Hunt, G2, Trustpilot, Reddit và Hacker News cho 50 công cụ AI SaaS hàng đầu."
      : "Live database of 200+ verified customer reviews and empirical sentiment across 50 top AI SaaS tools, aggregated continuously every 10 hours.",
    alternates: {
      canonical: `/${locale}/reviews`,
      languages: {
        en: "/en/reviews",
        vi: "/vi/reviews",
        "x-default": "/en/reviews",
      },
    },
  };
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  // Structured Data (JSON-LD) for Collection of Reviews
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isVi ? "Kho Đánh Giá Phần Mềm AI Thực Tế Asmire" : "Asmire Verified AI Software Reviews Hub",
    description: isVi
      ? "200+ đánh giá thực tế độc lập được đồng bộ định kỳ 10 giờ một lần."
      : "200+ multi-platform verified software reviews synchronized every 10 hours.",
    publisher: {
      "@type": "Organization",
      name: "Asmire",
      url: "https://asmire.me",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <MessageSquare className="h-4 w-4" />
              <span>Real-Time Practitioner Sentiment Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              {isVi ? "Kho 200+ Đánh Giá AI SaaS Thực Tế" : "200+ Verified Multi-Platform AI Reviews"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {isVi
                ? "Dữ liệu đánh giá trải nghiệm thực tế, ưu nhược điểm và ROI từ các nền tảng lớn (Product Hunt, G2, Trustpilot, Reddit, Hacker News) được kiểm tra và đồng bộ tự động 10 giờ một lần theo thời gian thực."
                : "Real practitioner feedback, testing benchmarks, and honest limitations aggregated across Product Hunt, G2, Trustpilot, Reddit, and Hacker News. Auto-synchronized every 10 hours with zero paid bias."}
            </p>
          </div>

          {/* Interactive Reviews Client with Filters & Search */}
          <ReviewsClient initialReviews={DETAILED_REVIEWS_DATASET} locale={locale as Locale} />
        </div>
      </div>
    </>
  );
}
