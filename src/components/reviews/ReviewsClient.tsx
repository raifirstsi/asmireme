"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { DetailedReviewItem } from "@/data/reviews-dataset";
import { getVerifiedReviewUrl } from "@/data/platform-review-links";
import { TOOLS_DATA } from "@/data/tools-data";
import { 
  Star, Search, Filter, ExternalLink, ThumbsUp, ShieldCheck, 
  MessageSquare, Sparkles, CheckCircle2, RotateCcw, Plus, X,
  Lock, UploadCloud, ShieldAlert, DollarSign, Award, Check
} from "lucide-react";

interface ReviewsClientProps {
  initialReviews: DetailedReviewItem[];
  locale: Locale;
}

export function ReviewsClient({ initialReviews, locale }: ReviewsClientProps) {
  const isVi = locale === "vi";

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("helpful");

  // Interactive helpful counts state
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [votedSet, setVotedSet] = useState<Set<string>>(new Set());

  // Submit review modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    toolSlug: "highlevel",
    authorName: "",
    authorRole: "",
    rating: 5,
    ratingValueForMoney: 5,
    ratingEaseOfUse: 5,
    realMonthlyCostPaid: "",
    pros: "",
    cons: "",
    content: "",
    evidenceType: "INVOICE_SCREENSHOT",
  });

  const handleHelpful = (id: string, initialCount: number) => {
    if (votedSet.has(id)) return;
    setVotedSet(new Set(votedSet).add(id));
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("toolSlug", formData.toolSlug);
      data.append("authorName", formData.authorName);
      data.append("authorRole", formData.authorRole);
      data.append("ratingOverall", formData.rating.toString());
      data.append("ratingValueForMoney", formData.ratingValueForMoney.toString());
      data.append("ratingEaseOfUse", formData.ratingEaseOfUse.toString());
      if (formData.realMonthlyCostPaid) {
        data.append("realMonthlyCostPaid", formData.realMonthlyCostPaid);
      }
      data.append("pros", formData.pros);
      data.append("cons", formData.cons);
      data.append("content", formData.content);
      data.append("evidenceType", formData.evidenceType);
      if (evidenceFile) {
        data.append("evidenceFile", evidenceFile);
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setModalOpen(false);
          setEvidenceFile(null);
          setFormData({
            toolSlug: "highlevel",
            authorName: "",
            authorRole: "",
            rating: 5,
            ratingValueForMoney: 5,
            ratingEaseOfUse: 5,
            realMonthlyCostPaid: "",
            pros: "",
            cons: "",
            content: "",
            evidenceType: "INVOICE_SCREENSHOT",
          });
        }, 2500);
      }
    } catch {
      // Fallback
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = useMemo(() => {
    return initialReviews
      .filter((rev) => {
        if (selectedTool !== "all" && rev.toolSlug !== selectedTool) return false;
        if (selectedPlatform !== "all" && rev.source !== selectedPlatform) return false;
        if (selectedRating === "5" && rev.rating !== 5) return false;
        if (selectedRating === "4plus" && rev.rating < 4) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTool = rev.toolName.toLowerCase().includes(q);
          const matchAuthor = rev.author.toLowerCase().includes(q);
          const matchText = rev.content.toLowerCase().includes(q);
          const matchHeadline = rev.headline.toLowerCase().includes(q);
          if (!matchTool && !matchAuthor && !matchText && !matchHeadline) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const countA = helpfulVotes[a.id] ?? a.helpfulCount;
        const countB = helpfulVotes[b.id] ?? b.helpfulCount;
        if (sortBy === "helpful") return countB - countA;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.toolName.localeCompare(b.toolName);
      });
  }, [initialReviews, selectedTool, selectedPlatform, selectedRating, sortBy, searchQuery, helpfulVotes]);

  const platformBadgeStyle = (source: string) => {
    switch (source) {
      case "PRODUCT_HUNT":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "G2":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case "TRUSTPILOT":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "HACKER_NEWS":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      case "REDDIT":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      default:
        return "bg-secondary text-foreground border-border";
    }
  };

  return (
    <div className="space-y-8">
      {/* Real-Time Status & Ingestion Monitor Banner - Apple Minimalist */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              {isVi ? "Hệ thống đồng bộ tự động 10h/lần đang hoạt động" : "10-Hour Automated Ingestion Active"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {isVi ? "200+ Đánh Giá Độc Lập Từ Product Hunt, G2, Trustpilot & Reddit" : "200+ Multi-Platform Community Reviews & Verified Scores"}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
            {isVi
              ? "Dữ liệu được cập nhật tự động mỗi 10 giờ từ các nền tảng đánh giá phần mềm uy tín. Không có đánh giá ảo hoặc tài trợ."
              : "Empirical practitioner sentiment gathered across 5 major software review hubs. Filtered for genuine user feedback, pros, and cons."}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-semibold text-xs shadow-xs transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>{isVi ? "Đóng góp đánh giá" : "Submit a Review"}</span>
        </button>
      </div>

      {/* Search & Comprehensive Filters - Apple Minimalist */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isVi ? "Tìm theo tên công cụ, tác giả, nhận xét..." : "Search by tool, reviewer, sentiment..."}
            className="w-full h-10 pl-10 pr-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141415] text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-black dark:hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tool Selector */}
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="h-10 px-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141415] text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value="all">{isVi ? `Tất cả ${TOOLS_DATA.length} công cụ` : `All ${TOOLS_DATA.length} Tools`}</option>
            {TOOLS_DATA.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Platform Selector */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="h-10 px-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141415] text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value="all">{isVi ? "Tất cả nền tảng" : "All Platforms"}</option>
            <option value="PRODUCT_HUNT">Product Hunt</option>
            <option value="G2">G2 Reviews</option>
            <option value="TRUSTPILOT">Trustpilot</option>
            <option value="REDDIT">Reddit Community</option>
            <option value="HACKER_NEWS">Hacker News</option>
          </select>

          {/* Rating */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="h-10 px-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141415] text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer shadow-2xs"
          >
            <option value="all">{isVi ? "Mọi điểm số" : "All Ratings"}</option>
            <option value="5">5 Stars Only</option>
            <option value="4plus">4+ Stars</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 px-3 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none cursor-pointer"
          >
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rating</option>
          </select>

          {(searchQuery || selectedTool !== "all" || selectedPlatform !== "all" || selectedRating !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTool("all");
                setSelectedPlatform("all");
                setSelectedRating("all");
              }}
              className="flex items-center gap-1.5 h-11 px-3 text-xs font-semibold rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        <span>
          Showing {filteredReviews.length} of {initialReviews.length} verified reviews
        </span>
        <span>Auto-sync interval: 10 Hours</span>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => {
            const currentHelpful = helpfulVotes[rev.id] ?? rev.helpfulCount;
            const hasVoted = votedSet.has(rev.id);

            return (
              <div
                key={rev.id}
                className="flex flex-col justify-between p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-brand-500/40 hover:shadow-md transition-all space-y-4"
              >
                {/* Header: Platform + Rating + Tool Link */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${platformBadgeStyle(
                        rev.source
                      )}`}
                    >
                      {rev.source.replace("_", " ")}
                    </span>
                    <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-current mr-1" />
                      {rev.rating}.0 / 5.0
                    </span>

                    {/* Verified Buyer Badge */}
                    {rev.verifiedBuyer && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <ShieldCheck className="h-3 w-3" />
                        {isVi ? "Đã xác thực hóa đơn" : "Verified Buyer"}
                      </span>
                    )}

                    {/* Real Monthly Cost Chip */}
                    {rev.realMonthlyCostPaid && (
                      <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700/60">
                        {isVi ? "Chi phí thực:" : "Cost:"} ${rev.realMonthlyCostPaid}/mo
                      </span>
                    )}

                    {/* Testing Grant Badge */}
                    {rev.testingGrantAwarded && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                        <Award className="h-3 w-3" />
                        {isVi ? `Quỹ Kiểm Thử ($${rev.testingGrantAmount || 100})` : `Testing Grant ($${rev.testingGrantAmount || 100})`}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/${locale}/tools/${rev.toolSlug}`}
                    className="inline-flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 px-2.5 py-1 rounded-lg transition-colors shrink-0"
                  >
                    <span>{rev.toolName}</span>
                    <span className="ml-1">→</span>
                  </Link>
                </div>

                {/* Headline & Body */}
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-foreground leading-snug">
                    "{rev.headline}"
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rev.content}
                  </p>
                </div>

                {/* Pros & Cons Box */}
                <div className="space-y-2 p-3.5 rounded-xl bg-secondary/50 border border-border/60 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
                      ✓ Pros:
                    </span>
                    <span className="text-muted-foreground">{rev.pros}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-extrabold text-amber-600 dark:text-amber-400 shrink-0">
                      ✗ Cons:
                    </span>
                    <span className="text-muted-foreground">{rev.cons}</span>
                  </div>
                </div>

                {/* Footer: Reviewer Info + Actions */}
                <div className="pt-3 border-t border-border flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    {rev.author.toLowerCase().includes("asmire") ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0">
                        <img
                          src="/icon.png"
                          alt="Asmire"
                          className="h-4.5 w-4.5 object-contain dark:invert transition-[filter] duration-200"
                        />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 font-extrabold text-xs">
                        {rev.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-foreground text-xs">{rev.author}</span>
                        {rev.verifiedBuyer && (
                          <span title="Verified Reviewer" className="text-emerald-600">
                            <ShieldCheck className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground block line-clamp-1">
                        {rev.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                        hasVoted
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                      title="Helpful review"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{currentHelpful}</span>
                    </button>

                    <a
                      href={getVerifiedReviewUrl(rev.toolSlug, rev.source, rev.toolName) || rev.sourceUrl}
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white text-xs font-medium transition-colors"
                      title={isVi ? `Xác minh trên ${rev.source.replace("_", " ")}` : `Verify on ${rev.source.replace("_", " ")}`}
                    >
                      <span>{rev.source.replace("_", " ")}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-3 bg-card border border-border rounded-2xl p-8">
          <p className="text-base font-bold text-foreground">
            {isVi ? "Không tìm thấy đánh giá nào khớp bộ lọc" : "No reviews match your current filters."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTool("all");
              setSelectedPlatform("all");
              setSelectedRating("all");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 text-white cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{isVi ? "Đặt lại bộ lọc" : "Reset All Filters"}</span>
          </button>
        </div>
      )}

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0 duration-150">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-black text-lg text-foreground">
                {isVi ? "Gửi Đánh Giá Trải Nghiệm Thực Tế" : "Submit Your Verified Tool Review"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-base text-foreground">
                  {isVi ? "Cảm ơn bạn đã đóng góp đánh giá!" : "Thank you for your review!"}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isVi
                    ? "Đánh giá của bạn đã được ghi nhận vào hệ thống CSDL Asmire."
                    : "Your review has been recorded into Asmire community database."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-foreground block mb-1">
                    {isVi ? "Chọn công cụ SaaS" : "Select SaaS Tool"}
                  </label>
                  <select
                    value={formData.toolSlug}
                    onChange={(e) => setFormData({ ...formData, toolSlug: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-secondary font-semibold text-foreground focus:outline-none"
                  >
                    {TOOLS_DATA.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      {isVi ? "Họ và tên" : "Your Name"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Tran"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      {isVi ? "Chức danh / Nghề nghiệp" : "Role / Title"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Media Buyer @ Agency"
                      value={formData.authorRole}
                      onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      {isVi ? "Đánh giá chung" : "Overall Rating"}
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full h-10 px-2 rounded-xl border border-border bg-secondary font-semibold text-foreground focus:outline-none text-xs"
                    >
                      <option value={5}>★★★★★ 5</option>
                      <option value={4}>★★★★☆ 4</option>
                      <option value={3}>★★★☆☆ 3</option>
                      <option value={2}>★★☆☆☆ 2</option>
                      <option value={1}>★☆☆☆☆ 1</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      {isVi ? "Đáng giá tiền (P/P)" : "Value for Money"}
                    </label>
                    <select
                      value={formData.ratingValueForMoney}
                      onChange={(e) => setFormData({ ...formData, ratingValueForMoney: Number(e.target.value) })}
                      className="w-full h-10 px-2 rounded-xl border border-border bg-secondary font-semibold text-foreground focus:outline-none text-xs"
                    >
                      <option value={5}>5/5 - Rất xứng đáng</option>
                      <option value={4}>4/5 - Tương đối tốt</option>
                      <option value={3}>3/5 - Bình thường</option>
                      <option value={2}>2/5 - Khá đắt</option>
                      <option value={1}>1/5 - Quá đắt so với giá trị</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      {isVi ? "Dễ sử dụng (UX)" : "Ease of Use"}
                    </label>
                    <select
                      value={formData.ratingEaseOfUse}
                      onChange={(e) => setFormData({ ...formData, ratingEaseOfUse: Number(e.target.value) })}
                      className="w-full h-10 px-2 rounded-xl border border-border bg-secondary font-semibold text-foreground focus:outline-none text-xs"
                    >
                      <option value={5}>5/5 - Rất trực quan</option>
                      <option value={4}>4/5 - Dễ làm quen</option>
                      <option value={3}>3/5 - Trung bình</option>
                      <option value={2}>2/5 - Hơi phức tạp</option>
                      <option value={1}>1/5 - Cực khó dùng</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">
                    {isVi ? "Chi phí thực tế chi trả ($/tháng hoặc $/năm)" : "Actual Monthly/Annual Cost Paid ($/mo)"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground font-semibold">$</span>
                    <input
                      type="number"
                      min={0}
                      step="any"
                      placeholder={isVi ? "Ví dụ: 29 (hoặc để trống nếu dùng bản Free)" : "e.g. 29 (or leave blank if free)"}
                      value={formData.realMonthlyCostPaid}
                      onChange={(e) => setFormData({ ...formData, realMonthlyCostPaid: e.target.value })}
                      className="w-full h-10 pl-7 pr-3 rounded-xl border border-border bg-card text-foreground focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">
                    {isVi
                      ? "Cung cấp chi phí thực tế giúp cộng đồng đối chiếu với bảng giá công bố của hãng."
                      : "Helps the community verify if the advertised pricing matches real invoices."}
                  </span>
                </div>

                {/* Evidence Upload Section with Zero-Leak Guarantee */}
                <div className="p-3.5 rounded-xl border border-border/70 bg-secondary/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-foreground flex items-center gap-1.5">
                      <UploadCloud className="h-4 w-4 text-brand-500" />
                      {isVi ? "Tải lên Hóa đơn / Biên lai thanh toán (Đính kèm xác thực)" : "Upload Invoice / Proof of Payment"}
                    </label>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {isVi ? "Tùy chọn" : "Optional"}
                    </span>
                  </div>

                  <input
                    type="file"
                    id="evidence-file-input"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setEvidenceFile(file);
                    }}
                    className="hidden"
                  />

                  <label
                    htmlFor="evidence-file-input"
                    className="flex flex-col items-center justify-center p-4 border border-dashed border-border rounded-xl bg-card hover:bg-secondary/50 cursor-pointer transition-colors text-center"
                  >
                    {evidenceFile ? (
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="truncate max-w-[280px]">{evidenceFile.name}</span>
                        <span className="text-[11px] text-muted-foreground">
                          ({(evidenceFile.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="font-semibold text-foreground text-xs">
                          {isVi ? "Bấm vào đây để chọn ảnh chụp hóa đơn hoặc file PDF" : "Click to select invoice screenshot or PDF"}
                        </span>
                        <span className="text-[11px] text-muted-foreground">PNG, JPG, WEBP, PDF (Tối đa 5MB)</span>
                      </>
                    )}
                  </label>

                  {/* Zero-Leak Security Protocol Commitment Box */}
                  <div className="p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                    <Lock className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    <div className="text-[11px] leading-relaxed">
                      <strong>{isVi ? "Cam kết bảo mật Zero-Leak: " : "Zero-Leak Security Protocol: "}</strong>
                      {isVi
                        ? "Hóa đơn được mã hóa lưu trữ ở vùng đệm riêng biệt ngoài web-root. Chỉ Quản trị viên Asmire được quyền đối soát để cấp Huy hiệu Verified Buyer & Quỹ Kiểm Thử ($50 - $200). Mọi thông tin thẻ / PII cá nhân tuyệt đối không bao giờ bị public."
                        : "Invoices are stored encrypted in isolated private storage outside web-root. Only Asmire Admins inspect them to award Verified Buyer badges and Testing Grants ($50-$200). Your payment details & PII are never made public."}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">
                    {isVi ? "Điểm mạnh nổi bật (Pros)" : "Key Pros / Strengths"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fast rendering, high inbox deliverability..."
                    value={formData.pros}
                    onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">
                    {isVi ? "Nhược điểm cần lưu ý (Cons)" : "Key Cons / Limitations"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. High price for solo users, steep curve..."
                    value={formData.cons}
                    onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">
                    {isVi ? "Nội dung nhận xét chi tiết" : "Detailed Experience & Verdict"}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={
                      isVi
                        ? "Chia sẻ trải nghiệm thực tế của bạn khi sử dụng phần mềm này trong công việc..."
                        : "Describe your real-world workflow, testing benchmarks, and actual ROI..."
                    }
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-3 rounded-xl border border-border bg-card text-foreground focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : isVi ? "Gửi đánh giá xác thực" : "Submit Verified Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
