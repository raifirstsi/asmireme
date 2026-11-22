"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { 
  Sparkles, CheckCircle2, ArrowRight, ExternalLink, 
  ShieldCheck, Loader2, Mail, User, Building2, Gift, AlertCircle 
} from "lucide-react";

interface SmeSnapshotClaimFormProps {
  locale: Locale;
}

export function SmeSnapshotClaimForm({ locale }: SmeSnapshotClaimFormProps) {
  const isVi = locale === "vi";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ghlEmail, setGhlEmail] = useState("");
  const [businessType, setBusinessType] = useState("service");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !ghlEmail) {
      setStatus("error");
      setErrorMessage(
        isVi
          ? "Vui lòng điền đầy đủ Họ tên, Email nhận Snapshot và Email đăng ký HighLevel."
          : "Please provide your Full Name, Delivery Email, and HighLevel Signup Email."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/snapshots/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fullName, 
          email, 
          ghlEmail, 
          niche: `SME_OS_${businessType.toUpperCase()}` 
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gửi yêu cầu thất bại.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || (isVi ? "Có lỗi xảy ra, vui lòng thử lại." : "An error occurred, please try again."));
    }
  };

  return (
    <div id="claim-form" className="p-6 sm:p-8 md:p-10 rounded-3xl border border-emerald-500/30 bg-white dark:bg-[#141415] shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {status === "success" ? (
        <div className="py-8 text-center space-y-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {isVi ? "Yêu Cầu Nhận SMEs Snapshot Đã Được Ghi Nhận!" : "Your SMEs Snapshot Request Is Confirmed!"}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
              {isVi
                ? `Hệ thống đang chuẩn bị gói cài đặt SMEs Snapshot cho email: `
                : `We are preparing the 1-Click SMEs Snapshot package for: `}
              <strong className="text-zinc-900 dark:text-zinc-100">{ghlEmail}</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 text-left max-w-md mx-auto space-y-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Gift className="h-4 w-4 text-emerald-500" />
              <span>{isVi ? "Quy trình kích hoạt cho doanh nghiệp:" : "Delivery Protocol for Business:"}</span>
            </div>
            <ul className="space-y-2 text-xs list-disc pl-4 text-zinc-600 dark:text-zinc-400">
              <li>{isVi ? "Đội ngũ kỹ thuật của Asmire sẽ kiểm tra mã đối soát trong vòng 2–4 giờ." : "Our engineering team verifies affiliate attribution within 2–4 hours."}</li>
              <li>{isVi ? "Link nhập 1-Click SMEs Snapshot bản quyền kèm video hướng dẫn cài đặt sẽ gửi về: " : "The 1-Click SMEs Snapshot link and video walkthrough will be delivered to: "}<strong className="text-zinc-900 dark:text-zinc-100">{email}</strong>.</li>
              <li>{isVi ? "Cần trợ giúp cài đặt? Liên hệ ngay: " : "Need setup support? Reach out directly to: "}<a href="mailto:support@asmire.me" className="text-emerald-500 underline font-medium">support@asmire.me</a>.</li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href="/go/highlevel"
              target="_blank"
              rel="nofollow sponsored"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-semibold text-sm transition-all shadow-md"
            >
              <span>{isVi ? "Vào Trang Quản Trị HighLevel ($97/Tháng) Của Bạn" : "Access Your HighLevel ($97/mo) Account"}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isVi ? "Quà Tặng Bản Quyền SMEs Snapshot ($1,497) Miễn Phí" : "Claim The Free $1,497 SMEs Snapshot"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
              {isVi ? "Xác Nhận Đăng Ký Gói $97 & Nhận Trọn Bộ Tự Động Hóa" : "Verify $97 Plan & Unlock Your Automation Suite"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              {isVi
                ? "Dành riêng cho các chủ doanh nghiệp vừa và nhỏ, phòng khám, cơ sở dịch vụ địa phương đăng ký 14 ngày dùng thử gói Starter ($97/tháng) qua Asmire."
                : "Exclusively for small business owners, contractors, and local service providers activating the $97 Starter plan trial via Asmire."}
            </p>
          </div>

          {/* Step Reminder Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="h-6 w-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {isVi ? "Chưa mở tài khoản dùng thử gói Starter $97/tháng?" : "Haven't started your $97 Starter plan trial yet?"}
              </span>
            </div>
            <a
              href="/go/highlevel"
              target="_blank"
              rel="nofollow sponsored"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <span>{isVi ? "Bấm vào đây để mở dùng thử 14 ngày" : "Click Here to Start 14-Day Trial"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{isVi ? "Họ và tên chủ doanh nghiệp *" : "Your Name / Business Owner *"}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isVi ? "Nguyễn Văn A" : "Michael Smith"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{isVi ? "Email nhận Snapshot *" : "Delivery Email Address *"}</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={isVi ? "chu-doanh-nghiep@gmail.com" : "owner@yourcompany.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{isVi ? "Email đăng ký tài khoản HighLevel *" : "HighLevel Signup Email *"}</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={isVi ? "email-tao-tai-khoan-highlevel@gmail.com" : "ghl-account@company.com"}
                  value={ghlEmail}
                  onChange={(e) => setGhlEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-zinc-400">
                  {isVi ? "Email dùng để đối soát kích hoạt gói $97 hoặc $297 qua Asmire" : "Used to verify your $97 or $297 plan signup under Asmire link"}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{isVi ? "Mô hình kinh doanh của bạn:" : "Your Business Type:"}</span>
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="service">{isVi ? "Dịch vụ gia đình, Sửa chữa & HVAC (Home Services)" : "Home Services & HVAC"}</option>
                  <option value="clinic">{isVi ? "Phòng khám y tế, Nha khoa & Chăm sóc sức khỏe" : "Clinics & Healthcare"}</option>
                  <option value="salon">{isVi ? "Thẩm mỹ viện, Spa & Salon làm đẹp" : "Spa, Salons & Aesthetics"}</option>
                  <option value="real_estate">{isVi ? "Văn phòng Môi giới Bất động sản" : "Real Estate Brokerage"}</option>
                  <option value="retail_fnb">{isVi ? "Nhà hàng, Quán ăn & Cửa hàng bán lẻ" : "Restaurants & Retail"}</option>
                  <option value="professional">{isVi ? "Tư vấn tài chính, Luật sư & Dịch vụ B2B" : "Professional & Legal Services"}</option>
                </select>
              </div>
            </div>

            {status === "error" && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isVi ? "Đang xử lý đối soát..." : "Verifying Attribution..."}</span>
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4 text-emerald-200" />
                  <span>{isVi ? "Xác Nhận & Nhận Ngay Bộ SMEs Snapshot Bản Quyền" : "Verify & Claim Your Free SMEs Snapshot"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 text-center">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>{isVi ? "Bảo mật thông tin 100%" : "100% Privacy Protected"}</span>
              </span>
              <span>•</span>
              <span>{isVi ? "Hỗ trợ nạp 1-Click vào HighLevel" : "1-Click Direct Import"}</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
