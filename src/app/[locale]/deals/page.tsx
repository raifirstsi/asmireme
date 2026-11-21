import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { Tag, Sparkles, ExternalLink } from "lucide-react";

interface DealsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: DealsPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi ? "Mã Giảm Giá & Ưu Đãi Công Cụ AI SaaS 2026 — Asmire" : "Verified AI SaaS Deals, Coupons & Discounts 2026 — Asmire",
    description: "Hand-tested, verified promo codes and annual discounts for top AI software.",
  };
}

export default async function DealsPage({ params }: DealsPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  const deals = TOOLS_DATA.filter((t) => t.hasFreeTrial || t.startingPrice < 20).slice(0, 12);

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <Tag className="h-4 w-4" />
            <span>Tested Promotions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Ưu Đãi & Khuyến Mãi AI SaaS Đã Xác Thực" : "Verified AI Software Deals & Discounts"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isVi
              ? "Chỉ hiển thị các mã ưu đãi và chính sách giảm giá đã kiểm tra thành công, không dùng mã ảo để câu click."
              : "We only list tested, active coupon codes and genuine annual discount tiers. No expired spam codes."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {deals.map((tool) => (
            <div
              key={tool.id}
              className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-xs hover:border-brand-500/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">{tool.name}</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {tool.hasFreeTrial ? `${tool.trialDays}d Free Trial` : "Discount Tier"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {tool.tagline[locale as Locale]}
                </p>
                <div className="pt-2 text-xs font-semibold text-foreground">
                  Starts at ${tool.startingPrice}/month
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between mt-4">
                <Link
                  href={`/${locale}/tools/${tool.slug}`}
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Review Details
                </Link>
                <a
                  href={`/go/${tool.slug}`}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="inline-flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Claim Deal <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
