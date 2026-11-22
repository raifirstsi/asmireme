import React from "react";
import { Metadata } from "next";
import { Locale, locales } from "@/lib/i18n";
import { PlaygroundClient } from "@/components/playground/PlaygroundClient";
import {
  VOICE_BENCHMARKS,
  VIDEO_BENCHMARKS,
  CONTENT_BENCHMARKS,
} from "@/data/benchmarks-data";

interface PlaygroundPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PlaygroundPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale as Locale) || "en";
  const isVi = locale === "vi";

  const title = isVi
    ? "Phòng Trưng Bày Đa Phương Tiện (Output Playground): So Sánh Voice & Video Avatar AI | Asmire"
    : "Empirical AI Output Playground: Voice AI & Video Avatar Benchmarks | Asmire";
  const description = isVi
    ? "Nghe thực tế & xem thực tế kết quả đầu ra giữa các công cụ AI hàng đầu thế giới (ElevenLabs, HeyGen, KoalaWriter) trên đề bài chuẩn hóa mà không cần đăng ký tài khoản."
    : "Listen to real speech synthesis and inspect video avatar lip-sync side-by-side using standardized prompts across ElevenLabs, HeyGen, Synthesia, and KoalaWriter.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://asmire.me/${locale}/playground`,
      images: [
        {
          url: "https://asmire.me/brand/asmire-logo-black.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `https://asmire.me/${locale}/playground`,
      languages: {
        en: "https://asmire.me/en/playground",
        vi: "https://asmire.me/vi/playground",
        "x-default": "https://asmire.me/en/playground",
      },
    },
  };
}

export default async function PlaygroundPage({ params }: PlaygroundPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale as Locale) || "en";
  const isVi = locale === "vi";

  // Google AEO Structured Data (MediaObject + ItemList + FAQPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: isVi
          ? "Phòng Trưng Bày Đa Phương Tiện Thực Nghiệm AI"
          : "Empirical AI Output Playground",
        description: isVi
          ? "Các bộ thử nghiệm chuẩn hóa so sánh âm thanh, video và văn bản của các công cụ AI."
          : "Standardized benchmark suites comparing Voice AI, Video Avatar, and SEO content engines.",
        itemListElement: [
          ...VOICE_BENCHMARKS.map((v, idx) => ({
            "@type": "AudioObject",
            position: idx + 1,
            name: `${v.name} Benchmark Sample`,
            contentUrl: `https://asmire.me${v.audioUrl}`,
            encodingFormat: "audio/mpeg",
            description: isVi ? v.keyTakeaway.vi : v.keyTakeaway.en,
          })),
          ...VIDEO_BENCHMARKS.map((v, idx) => ({
            "@type": "VideoObject",
            position: VOICE_BENCHMARKS.length + idx + 1,
            name: `${v.name} Benchmark Video`,
            thumbnailUrl: "https://asmire.me/brand/asmire-logo-black.png",
            contentUrl: `https://asmire.me${v.videoUrl}`,
            uploadDate: "2026-01-15T08:00:00Z",
            description: isVi ? v.keyTakeaway.vi : v.keyTakeaway.en,
          })),
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: isVi
              ? "Công cụ Voice AI nào có giọng đọc tự nhiên nhất 2026?"
              : "Which Voice AI platform has the most natural speech synthesis in 2026?",
            acceptedAnswer: {
              "@type": "Answer",
              text: isVi
                ? "Theo kết quả kiểm tra thực nghiệm của Asmire, ElevenLabs đạt điểm MOS cao nhất (4.88/5.0) với độ trễ siêu thấp 185ms và khả năng ngắt nghỉ lấy hơi tự nhiên nhất."
                : "According to Asmire empirical benchmarks, ElevenLabs achieves the highest MOS naturalness score (4.88/5.0) with sub-200ms latency and lifelike conversational breathing pauses.",
            },
          },
          {
            "@type": "Question",
            name: isVi
              ? "HeyGen và Synthesia: Công cụ video avatar nào khớp khẩu hình tốt hơn?"
              : "HeyGen vs Synthesia: Which video avatar engine offers superior lip-sync accuracy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: isVi
                ? "HeyGen đạt độ khớp khẩu hình 98.4% với chuyển động răng môi chi tiết theo âm vị và tốc độ render 3.2x real-time, vượt trội so với Synthesia (92.1%)."
                : "HeyGen achieves 98.4% lip-sync accuracy with fine phoneme tooth and mouth articulation, outperforming Synthesia's 92.1% accuracy and rendering 1.8x faster.",
            },
          },
          {
            "@type": "Question",
            name: isVi
              ? "Công cụ AI nào viết bài SEO có tỷ lệ phát hiện AI thấp nhất?"
              : "Which AI content writer has the lowest AI detection rate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: isVi
                ? "KoalaWriter chỉ có 12% dấu vết AI trên Originality.ai nhờ tích hợp dữ liệu Google Search thời gian thực, trong khi Jasper và Copy.ai đều vượt mức 75%."
                : "KoalaWriter scores just 12% AI detection on Originality.ai by scraping real-time Google search data, whereas Jasper and Copy.ai trigger 75%+ AI detection.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlaygroundClient locale={locale} />
    </>
  );
}
