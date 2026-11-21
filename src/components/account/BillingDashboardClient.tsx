"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { UserSubscriptionStatus, ProOrderResult } from "@/services/billing";
import { 
  Shield, Check, QrCode, Copy, CheckCheck, Sparkles, 
  AlertCircle, ArrowRight, RefreshCw, Calendar, ArrowLeft, Clock
} from "lucide-react";

interface BillingDashboardClientProps {
  initialStatus: UserSubscriptionStatus;
  user: {
    userId: string;
    email: string;
    memberId: string;
    referralCode: string;
  };
  locale: Locale;
}

export function BillingDashboardClient({
  initialStatus,
  user,
  locale,
}: BillingDashboardClientProps) {
  const isVi = locale === "vi";
  const [status, setStatus] = useState<UserSubscriptionStatus>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState<ProOrderResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  // Refund Modal State
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundBankName, setRefundBankName] = useState("");
  const [refundAccountNum, setRefundAccountNum] = useState("");
  const [refundAccountHolder, setRefundAccountHolder] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundSubmitting, setRefundSubmitting] = useState(false);
  const [refundMessage, setRefundMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Copy helper
  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Generate Pro Upgrade Order
  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/account/billing/create-order", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success && data.order) {
        setActiveOrder(data.order);
      }
    } catch (err) {
      console.error("Order creation failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Polling for automated payment completion when order is active
  useEffect(() => {
    if (!activeOrder || status.isPro) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/account/billing/status");
        const data = await res.json();
        if (data.success && data.status?.isPro) {
          setStatus(data.status);
          setActiveOrder(null);
          setUpgradeSuccess(true);
          clearInterval(interval);
        }
      } catch (err) {
        // Polling error silently ignored
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeOrder, status.isPro]);

  // Handle Refund Submission
  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRefundSubmitting(true);
    setRefundMessage(null);

    try {
      const res = await fetch("/api/account/billing/refund-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: refundBankName,
          accountNumber: refundAccountNum,
          accountHolder: refundAccountHolder,
          reason: refundReason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setRefundMessage({ text: data.message, isError: false });
        setTimeout(() => {
          setShowRefundModal(false);
          setStatus((prev) => ({ ...prev, canRefund: false }));
        }, 3000);
      } else {
        setRefundMessage({ text: data.message || "Failed to submit refund request", isError: true });
      }
    } catch (err) {
      setRefundMessage({ text: "An error occurred while submitting your refund request.", isError: true });
    } finally {
      setRefundSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link
            href={`/${locale}/account`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isVi ? "Quay lại Bảng điều khiển" : "Back to Member Dashboard"}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            {isVi ? "Quản lý Gói & Thanh toán" : "Subscription & Billing Management"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isVi
              ? "Tự động hóa thanh toán VietQR qua SePay — Minh bạch và đảm bảo hoàn tiền 14 ngày."
              : "Automated VietQR banking via SePay — Transparent and 14-day money-back guarantee."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{isVi ? "Tài khoản:" : "Signed in as:"}</span>
          <span className="text-xs font-bold text-foreground bg-secondary px-2.5 py-1 rounded-md border border-border">
            {user.email}
          </span>
        </div>
      </div>

      {/* Upgrade Success Notification */}
      {upgradeSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-800 dark:text-emerald-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <span>{isVi ? "Thanh toán thành công! Gói Pro đã kích hoạt." : "Payment Verified! Pro Plan Activated."}</span>
          </div>
          <p className="text-xs leading-relaxed">
            {isVi
              ? "Hệ thống đã tự động mở khóa toàn bộ 50 công cụ SaaS AI. Bạn có thể quay lại dashboard và gắn link affiliate của tất cả các tool ngay bây giờ."
              : "All 50 AI SaaS tool affiliate slots have been unlocked for your account. You can now return to your dashboard and insert links for any tool."}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/account`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
            >
              <span>{isVi ? "Đi đến Dashboard nhập link ngay" : "Go to Dashboard to input links"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Subscription Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isVi ? "Gói hiện tại" : "Current Plan"}
              </span>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-foreground">
                  {status.isPro ? "Asmire Pro" : "Asmire Standard (Starter)"}
                </h2>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    status.isPro
                      ? "bg-brand-500/10 text-brand-600 border-brand-500/30"
                      : "bg-secondary text-muted-foreground border-border"
                  }`}
                >
                  {status.isPro ? (isVi ? "Đang hoạt động" : "Active Pro") : (isVi ? "Miễn phí vĩnh viễn" : "Forever Free")}
                </span>
              </div>
            </div>

            <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
              {status.isPro ? <Sparkles className="h-6 w-6 text-brand-600" /> : <Shield className="h-6 w-6 text-muted-foreground" />}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-6">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">{isVi ? "Quyền lợi giới thiệu:" : "Affiliate Slots:"}</span>
              <p className="text-sm font-bold text-foreground">
                {status.isPro
                  ? isVi
                    ? "Tất cả 50 Công cụ SaaS AI"
                    : "All 50 AI SaaS Tools"
                  : isVi
                  ? "Tối đa 3 Công cụ SaaS AI"
                  : "Up to 3 SaaS Tools"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">{isVi ? "Thời hạn & Chu kỳ:" : "Billing Period:"}</span>
              <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-600" />
                {status.isPro && status.expiresAt ? (
                  <span>
                    {isVi ? `Còn ${status.daysRemaining} ngày (Hết hạn: ${new Date(status.expiresAt).toLocaleDateString("vi-VN")})` : `${status.daysRemaining} days left (Expires: ${new Date(status.expiresAt).toLocaleDateString("en-US")})`}
                  </span>
                ) : (
                  <span>{isVi ? "Miễn phí không giới hạn thời gian" : "No expiration (Free)"}</span>
                )}
              </p>
            </div>
          </div>

          {/* Refund eligibility badge if Pro */}
          {status.isPro && (
            <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-emerald-600" />
                  {isVi ? "Bảo đảm hoàn tiền trong 14 ngày" : "14-Day Money-Back Guarantee"}
                </span>
                <p className="text-xs text-muted-foreground">
                  {status.canRefund
                    ? isVi
                      ? "Bạn vẫn đang trong thời hạn 14 ngày bảo đảm hoàn tiền 100% nếu không hài lòng."
                      : "You are currently within the 14-day full refund window."
                    : isVi
                    ? "Giao dịch đã vượt quá thời hạn bảo đảm hoàn tiền 14 ngày."
                    : "The 14-day refund guarantee window has passed."}
                </p>
              </div>

              {status.canRefund && (
                <button
                  onClick={() => setShowRefundModal(true)}
                  className="px-3.5 py-1.5 rounded-lg border border-red-500/30 bg-red-500/5 text-red-600 hover:bg-red-500/10 text-xs font-bold transition-colors shrink-0"
                >
                  {isVi ? "Yêu cầu hoàn tiền" : "Request Refund"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Plan Features Summary */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground">
              {isVi ? "So sánh quyền lợi gói" : "Feature Entitlement"}
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{isVi ? "Cookie giới thiệu 365 ngày" : "365-day attribution cookie"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{isVi ? "100% hoa hồng trực tiếp từ hãng" : "100% direct vendor payout"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{isVi ? "Bảo vệ liên kết chống giả mạo" : "Anti-tamper signed HMAC"}</span>
              </li>
              <li className="flex items-center gap-2">
                {status.isPro ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span className="h-3.5 w-3.5 rounded-full border border-muted-foreground/30 flex items-center justify-center text-[9px] font-bold text-muted-foreground">3</span>
                )}
                <span>
                  {status.isPro
                    ? isVi ? "50/50 công cụ SaaS AI" : "50/50 AI SaaS tools"
                    : isVi ? "Giới hạn 3 công cụ SaaS" : "Limited to 3 SaaS tools"}
                </span>
              </li>
            </ul>
          </div>

          {!status.isPro && !activeOrder && (
            <button
              onClick={handleCreateOrder}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 px-4 shadow-sm transition-colors"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>{isVi ? "Đang tạo mã VietQR..." : "Generating VietQR..."}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{isVi ? "Nâng cấp Pro ($29 / 725.000đ)" : "Upgrade to Pro ($29 / mo)"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Dynamic VietQR Payment Box (Shown when user clicks upgrade) */}
      {activeOrder && !status.isPro && (
        <div className="rounded-2xl border-2 border-brand-500/40 bg-card p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider">
                <QrCode className="h-4 w-4" />
                <span>{isVi ? "Cổng thanh toán tự động VietQR (SePay)" : "Automated VietQR Banking (SePay)"}</span>
              </div>
              <h3 className="text-xl font-black text-foreground mt-1">
                {isVi ? "Quét mã để kích hoạt Pro tự động" : "Scan to Activate Pro Automatically"}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>{isVi ? "Đang chờ thanh toán (Tự động cập nhật)..." : "Waiting for payment (Auto-polling)..."}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* QR Image */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-border shadow-sm">
              <img
                src={activeOrder.qrUrl}
                alt={`VietQR ${activeOrder.orderCode}`}
                className="w-56 h-56 object-contain rounded-lg"
              />
              <p className="text-[11px] text-slate-500 text-center mt-3 font-medium">
                {isVi ? "Mở app ngân hàng (Vietcombank, MB, Techcombank...) để quét" : "Open any banking app to scan this QR"}
              </p>
            </div>

            {/* Bank details & Copy buttons */}
            <div className="md:col-span-7 space-y-4">
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-amber-900 dark:text-amber-200 text-xs">
                <span className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  {isVi ? "Lưu ý quan trọng về Nội dung chuyển khoản:" : "Critical Transfer Note Requirement:"}
                </span>
                <span>
                  {isVi
                    ? `Bạn phải giữ nguyên cú pháp nội dung "${activeOrder.orderCode}" để hệ thống SePay nhận diện và kích hoạt tài khoản trong 2–5 giây.`
                    : `Please keep the exact transfer memo "${activeOrder.orderCode}" so SePay can instantly recognize and activate your plan.`}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Bank Name */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                  <span className="text-muted-foreground">{isVi ? "Ngân hàng:" : "Bank:"}</span>
                  <span className="font-bold text-foreground text-sm">{activeOrder.bankName}</span>
                </div>

                {/* Account Number */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                  <div>
                    <span className="text-muted-foreground block">{isVi ? "Số tài khoản:" : "Account Number:"}</span>
                    <span className="font-mono font-bold text-foreground text-sm">{activeOrder.accountNumber}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(activeOrder.accountNumber, "acc")}
                    className="flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-700 bg-card px-2.5 py-1 rounded border border-border"
                  >
                    {copiedField === "acc" ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedField === "acc" ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Account Holder */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                  <span className="text-muted-foreground">{isVi ? "Chủ tài khoản:" : "Account Holder:"}</span>
                  <span className="font-bold text-foreground text-sm uppercase">{activeOrder.accountName}</span>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                  <div>
                    <span className="text-muted-foreground block">{isVi ? "Số tiền:" : "Amount:"}</span>
                    <span className="font-mono font-black text-brand-600 text-base">
                      {activeOrder.amountVnd.toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(String(activeOrder.amountVnd), "amount")}
                    className="flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-700 bg-card px-2.5 py-1 rounded border border-border"
                  >
                    {copiedField === "amount" ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedField === "amount" ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Memo */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-500/10 border border-brand-500/30">
                  <div>
                    <span className="text-brand-600 dark:text-brand-400 font-bold block">{isVi ? "Nội dung chuyển khoản (Memo):" : "Transfer Memo:"}</span>
                    <span className="font-mono font-black text-foreground text-base tracking-wider">{activeOrder.orderCode}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(activeOrder.orderCode, "memo")}
                    className="flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-700 bg-card px-2.5 py-1 rounded border border-border"
                  >
                    {copiedField === "memo" ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedField === "memo" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 14-Day Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-foreground">
                {isVi ? "Yêu cầu Hoàn tiền 14 Ngày" : "14-Day Refund Request"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isVi
                  ? "Chúng tôi cam kết hoàn tiền 100% vào tài khoản ngân hàng của bạn trong vòng 24–48 giờ làm việc."
                  : "We honor a 100% money-back guarantee directly to your bank account within 24-48 business hours."}
              </p>
            </div>

            {refundMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold ${
                  refundMessage.isError
                    ? "bg-red-500/10 text-red-600 border border-red-500/30"
                    : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                }`}
              >
                {refundMessage.text}
              </div>
            )}

            <form onSubmit={handleRefundSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">
                  {isVi ? "Tên Ngân hàng nhận hoàn tiền:" : "Your Receiving Bank:"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vietcombank, MBBank, Techcombank"
                  value={refundBankName}
                  onChange={(e) => setRefundBankName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  {isVi ? "Số tài khoản ngân hàng:" : "Your Account Number:"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="0123456789"
                  value={refundAccountNum}
                  onChange={(e) => setRefundAccountNum(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  {isVi ? "Tên chủ tài khoản (In hoa không dấu):" : "Account Holder Name:"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="NGUYEN VAN A"
                  value={refundAccountHolder}
                  onChange={(e) => setRefundAccountHolder(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  {isVi ? "Lý do (giúp chúng tôi cải thiện sản phẩm):" : "Reason for refund (optional):"}
                </label>
                <textarea
                  rows={2}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder={isVi ? "Ví dụ: Tôi chưa có nhu cầu sử dụng 50 tool..." : "e.g. Found it was not suitable for my current project"}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  disabled={refundSubmitting}
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary font-bold text-xs transition-colors"
                >
                  {isVi ? "Đóng" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={refundSubmitting}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors"
                >
                  {refundSubmitting ? (isVi ? "Đang gửi..." : "Submitting...") : (isVi ? "Xác nhận yêu cầu hoàn tiền" : "Confirm Refund Request")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
