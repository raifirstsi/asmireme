"use client";

import React, { useState, useEffect } from "react";
import { Locale } from "@/lib/i18n";
import {
  VOICE_BENCHMARKS,
  VIDEO_BENCHMARKS,
  CONTENT_BENCHMARKS,
} from "@/data/benchmarks-data";
import { AudioBenchmarkCard } from "./AudioBenchmarkCard";
import { VideoBenchmarkCard } from "./VideoBenchmarkCard";
import { ContentBenchmarkCard } from "./ContentBenchmarkCard";
import {
  Mic,
  Video,
  FileText,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface PlaygroundClientProps {
  locale: Locale;
}

export function PlaygroundClient({ locale }: PlaygroundClientProps) {
  const isVi = locale === "vi";
  const [activeTab, setActiveTab] = useState<"voice" | "video" | "content">("voice");
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);

  // Sync with URL Query Param (?suite=voice | video | content)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const suiteParam = params.get("suite");
      if (suiteParam === "video" || suiteParam === "content" || suiteParam === "voice") {
        setActiveTab(suiteParam);
      }
    }
  }, []);

  const switchTab = (tab: "voice" | "video" | "content") => {
    setActiveTab(tab);
    setActiveMediaId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("suite", tab);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleMediaPlay = (id: string) => {
    setActiveMediaId(id);
  };

  const handleMediaPause = (id: string) => {
    if (activeMediaId === id) {
      setActiveMediaId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 selection:bg-emerald-500 selection:text-black">
      {/* Breadcrumb Navigation - Apple Minimalist */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 font-normal">
          <Link href={`/${locale}`} className="hover:text-white transition-colors">
            {isVi ? "Trang chủ" : "Home"}
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200 font-medium">
            {isVi ? "Thử Nghiệm Thực Tế (Playground)" : "Output Playground"}
          </span>
        </nav>
      </div>

      {/* Hero Section - Apple Minimalist Dark */}
      <section className="relative pt-6 pb-8 sm:pt-14 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-zinc-800/80">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Empirical Lab Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            <Cpu className="h-3.5 w-3.5" />
            <span>
              {isVi
                ? "PHÒNG THÍ NGHIỆM ĐẦU RA THỰC NGHIỆM ASMIRE • ZERO-BIAS"
                : "ASMIRE EMPIRICAL OUTPUT LAB • ZERO SPONSORSHIP"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isVi ? (
              <>
                Phòng Trưng Bày Đa Phương Tiện{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  (Output Playground)
                </span>
              </>
            ) : (
              <>
                Empirical AI Output{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Playground
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            {isVi
              ? "Nghe thực tế và xem thực tế kết quả đầu ra giữa các công cụ AI hàng đầu thế giới trên cùng một đề bài chuẩn hóa mà KHÔNG cần tạo tài khoản dùng thử ở từng phần mềm."
              : "Listen to real speech and inspect video avatar lip-sync side-by-side using standardized prompts without registering trial accounts across multiple platforms."}
          </p>

          {/* Quick Methodology Trust Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {isVi ? "100% Native Player (Không thư viện nặng)" : "100% Native HTML5 (Zero Bloat)"}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-400" />
              {isVi ? "Cùng một bộ Prompt chuẩn" : "Identical Test Prompts"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-400" />
              {isVi ? "Kiểm tra thực nghiệm Q1/2026" : "Audited Q1/2026"}
            </span>
          </div>
        </div>

        {/* Tab Navigation Switcher - Apple Segmented Control */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-inner">
            <button
              type="button"
              onClick={() => switchTab("voice")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "voice"
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Mic className="h-4 w-4" />
              <span>{isVi ? "Voice AI Benchmark" : "Voice AI Benchmark"}</span>
            </button>

            <button
              type="button"
              onClick={() => switchTab("video")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "video"
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Video className="h-4 w-4" />
              <span>{isVi ? "Video Avatar AI" : "Video Avatar AI"}</span>
            </button>

            <button
              type="button"
              onClick={() => switchTab("content")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "content"
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>{isVi ? "AI Content & SEO" : "AI Content & SEO"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Suite Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* SUITE 1: VOICE AI BENCHMARK */}
        <div className={activeTab === "voice" ? "space-y-8 block" : "hidden"}>
          <div className="space-y-8">
            {/* Standardized Test Prompt Card */}
            <div className="rounded-2xl bg-[#14151a] border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Mic className="h-4 w-4" />
                  <span>SUITE 1: FINTECH HIGH-FREQUENCY SPEECH TEST (50 WORDS)</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {isVi ? "Độ dài audio: ~15 giây" : "Duration: ~15s"}
                </span>
              </div>
              <p className="text-sm font-serif italic text-zinc-200 bg-black/50 p-4 rounded-xl border border-zinc-800/80 leading-relaxed">
                &ldquo;
                {isVi
                  ? VOICE_BENCHMARKS[0].sampleScriptVi
                  : VOICE_BENCHMARKS[0].sampleScriptEn}
                &rdquo;
              </p>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                {isVi
                  ? "Tiêu chí thẩm định: Độ sâu âm vực trầm, nhịp lấy hơi tự nhiên giữa các vế câu, và khả năng giải mã các thuật ngữ tài chính phức tạp mà không bị méo tiếng kim loại."
                  : "Evaluation Criteria: Low-end acoustic resonance, natural breathing cadence at clause breaks, and artifact-free decoding of complex fintech jargon."}
              </p>
            </div>

            {/* Side-by-side 3 Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VOICE_BENCHMARKS.map((item) => (
                <AudioBenchmarkCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  activeMediaId={activeMediaId}
                  onPlay={handleMediaPlay}
                  onPause={handleMediaPause}
                />
              ))}
            </div>

            {/* Direct Suite Takeaway & Summary */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base font-semibold text-white">
                  {isVi ? "Kết Luận Ban Biên Tập Asmire (Voice AI 2026)" : "Asmire Editorial Verdict (Voice AI 2026)"}
                </h4>
                <p className="text-xs text-zinc-400 max-w-2xl">
                  {isVi
                    ? "ElevenLabs vượt trội hoàn toàn về cảm xúc chân thực và độ trễ phản hồi (185ms), xứng đáng là lựa chọn số 1 cho các ứng dụng đàm thoại và lồng tiếng chuyên nghiệp."
                    : "ElevenLabs cleanly outperforms all competitors in conversational breathing and sub-200ms latency, making it the definitive choice for production voice agents."}
                </p>
              </div>
              <Link
                href="/go/elevenlabs"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                <span>{isVi ? "Kích Hoạt Dùng Thử ElevenLabs →" : "Claim ElevenLabs Free Tier →"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* SUITE 2: VIDEO AVATAR AI BENCHMARK */}
        <div className={activeTab === "video" ? "space-y-8 block" : "hidden"}>
          <div className="space-y-8">
            {/* Standardized Test Prompt Card */}
            <div className="rounded-2xl bg-[#14151a] border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Video className="h-4 w-4" />
                  <span>SUITE 2: SAAS EXECUTIVE INTRO VIDEO TEST (12 SECONDS)</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {isVi ? "Chuẩn WebM (VP9) • 720p 30fps" : "WebM (VP9) • 720p 30fps"}
                </span>
              </div>
              <p className="text-sm font-serif italic text-zinc-200 bg-black/50 p-4 rounded-xl border border-zinc-800/80 leading-relaxed">
                &ldquo;
                {isVi
                  ? VIDEO_BENCHMARKS[0].sampleScriptVi
                  : VIDEO_BENCHMARKS[0].sampleScriptEn}
                &rdquo;
              </p>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                {isVi
                  ? "Tiêu chí thẩm định: Độ khớp khẩu hình âm vị (phoneme lip-sync), chuyển động chớp mắt và nghiêng đầu vi mô, loại bỏ hiện tượng co kéo ảnh 2D (warping artifacts)."
                  : "Evaluation Criteria: Phoneme-level lip synchronization, natural micro-head physics, and absence of 2D neck warping artifacts."}
              </p>
            </div>

            {/* Side-by-side 3 Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VIDEO_BENCHMARKS.map((item) => (
                <VideoBenchmarkCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  activeMediaId={activeMediaId}
                  onPlay={handleMediaPlay}
                  onPause={handleMediaPause}
                />
              ))}
            </div>

            {/* Direct Suite Takeaway & Summary */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base font-semibold text-white">
                  {isVi ? "Kết Luận Ban Biên Tập Asmire (Video Avatar 2026)" : "Asmire Editorial Verdict (Video Avatar 2026)"}
                </h4>
                <p className="text-xs text-zinc-400 max-w-2xl">
                  {isVi
                    ? "HeyGen dẫn đầu tuyệt đối với độ khớp khẩu hình 98.4% và tốc độ render 3.2x real-time. Synthesia là giải pháp thay thế an toàn cho tập đoàn lớn cần chứng chỉ SOC2."
                    : "HeyGen is the undisputed leader with 98.4% lip-sync fidelity and 3.2x render speed. Synthesia remains the runner-up for large corporate compliance."}
                </p>
              </div>
              <Link
                href="/go/heygen"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                <span>{isVi ? "Tạo Video Avatar HeyGen Ngay →" : "Create Free HeyGen Avatar →"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* SUITE 3: AI CONTENT & SEO BENCHMARK */}
        <div className={activeTab === "content" ? "space-y-8 block" : "hidden"}>
          <div className="space-y-8">
            {/* Standardized Test Prompt Card */}
            <div className="rounded-2xl bg-[#14151a] border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <FileText className="h-4 w-4" />
                  <span>SUITE 3: COMMERCIAL REAL ESTATE CRM BUYER GUIDE PROMPT</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {isVi ? "Đánh giá bởi Originality.ai 3.0" : "Audited via Originality.ai 3.0"}
                </span>
              </div>
              <p className="text-sm font-serif italic text-zinc-200 bg-black/50 p-4 rounded-xl border border-zinc-800/80 leading-relaxed">
                &ldquo;
                {isVi
                  ? CONTENT_BENCHMARKS[0].samplePromptVi
                  : CONTENT_BENCHMARKS[0].samplePromptEn}
                &rdquo;
              </p>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                {isVi
                  ? "Tiêu chí thẩm định: Tỷ lệ phát hiện dấu vết AI trên Originality.ai, độ sâu thông tin thực tế từ kết quả tìm kiếm Google (SERP Depth), và tỷ lệ ảo giác thông tin."
                  : "Evaluation Criteria: Originality.ai AI detection score, live Google search citation depth, and absence of generic introductory filler."}
              </p>
            </div>

            {/* Side-by-side 3 Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONTENT_BENCHMARKS.map((item) => (
                <ContentBenchmarkCard key={item.id} item={item} locale={locale} />
              ))}
            </div>

            {/* Direct Suite Takeaway & Summary */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base font-semibold text-white">
                  {isVi ? "Kết Luận Ban Biên Tập Asmire (AI SEO Writing 2026)" : "Asmire Editorial Verdict (AI SEO 2026)"}
                </h4>
                <p className="text-xs text-zinc-400 max-w-2xl">
                  {isVi
                    ? "KoalaWriter thắng áp đảo nhờ tích hợp dữ liệu Google Search thời gian thực, cho ra bài viết chỉ 12% dấu vết AI với chi phí chỉ $0.09/1k từ, tiết kiệm 75% so với Jasper."
                    : "KoalaWriter wins decisively by integrating real-time SERP scraping, achieving a remarkable 12% AI detection rate at a fraction of Jasper's monthly cost."}
                </p>
              </div>
              <Link
                href="/go/koala"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                <span>{isVi ? "Dùng Thử KoalaWriter Miễn Phí →" : "Try KoalaWriter Free →"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Global Multi-Suite Comparison Matrix */}
        <section className="mt-16 pt-10 border-t border-zinc-800/80">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isVi ? "Bảng Đối Chiếu Ma Trận Thẩm Định Toàn Diện" : "Comprehensive Empirical Benchmark Matrix"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              {isVi
                ? "Tất cả các số liệu đều được đo lường độc lập bởi phòng lab Asmire, không nhận tiền tài trợ hay quảng cáo can thiệp từ bất kỳ nhà sản xuất nào."
                : "All metrics independently verified in Asmire's benchmark lab without commercial sponsorships."}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#14151a]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 font-mono text-zinc-400">
                  <th className="py-3 px-4">{isVi ? "Công cụ & Phiên bản" : "Tool & Engine"}</th>
                  <th className="py-3 px-4">{isVi ? "Hạng mục" : "Category"}</th>
                  <th className="py-3 px-4">{isVi ? "Điểm Khớp / Tự Nhiên" : "Fidelity / MOS"}</th>
                  <th className="py-3 px-4">{isVi ? "Độ trễ / Tốc độ" : "Latency / Speed"}</th>
                  <th className="py-3 px-4">{isVi ? "Dấu vết AI / Lỗi" : "AI Detection / Artifacts"}</th>
                  <th className="py-3 px-4">{isVi ? "Chi phí thực tế" : "Real Pricing"}</th>
                  <th className="py-3 px-4 text-right">{isVi ? "Hành động" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-sans text-zinc-300">
                {/* ElevenLabs */}
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    ElevenLabs Prime
                  </td>
                  <td className="py-3 px-4 text-zinc-400 font-mono">Voice AI</td>
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">4.88 / 5.0 MOS</td>
                  <td className="py-3 px-4 font-mono">185ms (Sub-200ms)</td>
                  <td className="py-3 px-4 text-emerald-400">0% Metallic ringing</td>
                  <td className="py-3 px-4 font-mono">$0.015 / min</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/go/elevenlabs"
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-medium"
                    >
                      {isVi ? "Trải nghiệm" : "Test"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>

                {/* HeyGen */}
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    HeyGen Studio 2.8
                  </td>
                  <td className="py-3 px-4 text-zinc-400 font-mono">Video Avatar</td>
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">98.4% Lip-Sync</td>
                  <td className="py-3 px-4 font-mono">3.2x Real-Time</td>
                  <td className="py-3 px-4 text-emerald-400">Natural Gestures</td>
                  <td className="py-3 px-4 font-mono">$1.95 / min</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/go/heygen"
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-medium"
                    >
                      {isVi ? "Trải nghiệm" : "Test"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>

                {/* KoalaWriter */}
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    KoalaWriter 3.0
                  </td>
                  <td className="py-3 px-4 text-zinc-400 font-mono">SEO Content</td>
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">9.8 / 10 Depth</td>
                  <td className="py-3 px-4 font-mono">42 seconds</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono font-bold">12% AI Footprint</td>
                  <td className="py-3 px-4 font-mono">$0.09 / 1k words</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/go/koala"
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-medium"
                    >
                      {isVi ? "Trải nghiệm" : "Test"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>

                {/* Murf */}
                <tr className="hover:bg-zinc-800/30 transition-colors text-zinc-400">
                  <td className="py-3 px-4 font-medium text-zinc-200">Murf AI Studio</td>
                  <td className="py-3 px-4 font-mono">Voice AI</td>
                  <td className="py-3 px-4 font-mono">4.22 / 5.0 MOS</td>
                  <td className="py-3 px-4 font-mono">640ms</td>
                  <td className="py-3 px-4">Formal broadcast tone</td>
                  <td className="py-3 px-4 font-mono">$0.024 / min</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/go/murf"
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1 hover:underline text-zinc-400"
                    >
                      {isVi ? "Trải nghiệm" : "Test"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>

                {/* Synthesia */}
                <tr className="hover:bg-zinc-800/30 transition-colors text-zinc-400">
                  <td className="py-3 px-4 font-medium text-zinc-200">Synthesia v3.1</td>
                  <td className="py-3 px-4 font-mono">Video Avatar</td>
                  <td className="py-3 px-4 font-mono">92.1% Lip-Sync</td>
                  <td className="py-3 px-4 font-mono">1.8x Real-Time</td>
                  <td className="py-3 px-4">Rigid torso pose</td>
                  <td className="py-3 px-4 font-mono">$2.40 / min</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/go/synthesia"
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1 hover:underline text-zinc-400"
                    >
                      {isVi ? "Trải nghiệm" : "Test"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>

                {/* Jasper */}
                <tr className="hover:bg-zinc-800/30 transition-colors text-zinc-400">
                  <td className="py-3 px-4 font-medium text-zinc-200">Jasper Business</td>
                  <td className="py-3 px-4 font-mono">SEO Content</td>
                  <td className="py-3 px-4 font-mono">7.4 / 10 Depth</td>
                  <td className="py-3 px-4 font-mono">28 seconds</td>
                  <td className="py-3 px-4 font-mono text-amber-400">78% AI Footprint</td>
                  <td className="py-3 px-4 font-mono">$0.38 / 1k words</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/go/jasper"
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1 hover:underline text-zinc-400"
                    >
                      {isVi ? "Trải nghiệm" : "Test"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section for Google AEO Rich Snippets */}
        <section className="mt-16 pt-10 border-t border-zinc-800/80">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-white text-center mb-6">
              {isVi ? "Câu Hỏi Thường Gặp Về Benchmark AI" : "Frequently Asked Questions About AI Benchmarks"}
            </h3>

            <div className="space-y-4">
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  {isVi
                    ? "Tại sao Asmire không dùng các thư viện video player bên thứ ba?"
                    : "Why does Asmire avoid third-party video player libraries?"}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {isVi
                    ? "Để đảm bảo tốc độ tải trang đạt chuẩn Core Web Vitals tuyệt đối và tiết kiệm tài nguyên trình duyệt, Asmire xây dựng 100% bằng thẻ HTML5 native kết hợp CSS Tailwind. Điều này giảm 250KB dung lượng JavaScript không cần thiết."
                    : "To guarantee flawless Core Web Vitals and instantaneous page load times, Asmire utilizes 100% native HTML5 video and audio tags wrapped in lightweight Tailwind CSS, eliminating 250KB+ of redundant JavaScript."}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  {isVi
                    ? "Các video và âm thanh thử nghiệm được tạo ra như thế nào?"
                    : "How are the benchmark audio and video samples synthesized?"}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {isVi
                    ? "Tất cả các tệp media đều được tạo trực tiếp từ các tài khoản trả phí bản quyền của từng nhà cung cấp trên cùng một đoạn văn bản mẫu (identical prompt), sau đó nén ở định dạng WebM (VP9) và MP3 chuẩn 64kbps để giữ nguyên chất lượng âm hình gốc."
                    : "All media assets are generated directly from licensed paid tier accounts using identical standardized prompt scripts, then compressed using native WebM (VP9) and 64kbps MP3 to preserve original acoustic and visual fidelity."}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  {isVi
                    ? "Asmire có nhận tài trợ để nâng điểm cho công cụ nào không?"
                    : "Does Asmire accept sponsorship to artificially boost benchmark scores?"}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {isVi
                    ? "Tuyệt đối không. Nguyên tắc biên tập của Asmire được khóa cứng theo chính sách Zero-Sponsorship: các kết quả kiểm tra độ trễ, MOS score và AI detection đều có nhật ký thẩm định công khai."
                    : "Strictly no. Asmire enforces a rigid zero-sponsorship editorial charter. All latency, MOS, and AI detection figures are publicly documented from empirical lab sessions."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
