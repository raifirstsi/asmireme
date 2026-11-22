"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { UserSubscriptionStatus, ProOrderResult } from "@/services/billing";
import { 
  Shield, Check, QrCode, Copy, CheckCheck, Sparkles, 
  AlertCircle, ArrowRight, RefreshCw, Calendar, ArrowLeft, Clock, CreditCard
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

  // Payment Method Selection
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"vietqr" | "paypal">("vietqr");
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [paypalProcessing, setPaypalProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);

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
    setShowCheckout(true);
    if (!activeOrder) {
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
    }
  };

  // PayPal Smart Buttons Initialization
  useEffect(() => {
    if (paymentMethod !== "paypal" || status.isPro || !showCheckout) return;

    const clientId =
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
      "BAAm68UlfXj36eNIFzu8cy9KSy5fxanB-ptNbPkbqpe4F-jm0sB_P4S-XwgaKtqooPqrvinZCSb7fhk_Ag";

    let isMounted = true;

    const renderButtons = () => {
      const container = document.getElementById("paypal-button-container");
      if (!container || !(window as any).paypal) return;

      container.innerHTML = "";
      (window as any).paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "pill",
            label: "pay",
            height: 44,
          },
          createOrder: async () => {
            setPaypalError(null);
            const res = await fetch("/api/account/billing/paypal-create-order", {
              method: "POST",
            });
            const data = await res.json();
            if (!data.success || !data.orderId) {
              throw new Error(data.message || "Failed to initialize PayPal order");
            }
            return data.orderId;
          },
          onApprove: async (data: any) => {
            setPaypalProcessing(true);
            setPaypalError(null);
            try {
              const res = await fetch("/api/account/billing/paypal-capture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: data.orderID }),
              });
              const result = await res.json();
              if (result.success) {
                setUpgradeSuccess(true);
                setShowCheckout(false);
                const statusRes = await fetch("/api/account/billing/status");
                const statusData = await statusRes.json();
                if (statusData.success && statusData.status) {
                  setStatus(statusData.status);
                }
              } else {
                setPaypalError(result.message || "Failed to capture PayPal payment");
              }
            } catch (err: any) {
              setPaypalError(err?.message || "Payment confirmation error");
            } finally {
              setPaypalProcessing(false);
            }
          },
          onError: (err: any) => {
            console.error("[PayPal Checkout Error]", err);
            setPaypalError(
              isVi
                ? "Thanh toán PayPal không thành công hoặc bị gián đoạn. Vui lòng thử lại."
                : "PayPal checkout was cancelled or failed. Please try again."
            );
          },
        })
        .render("#paypal-button-container");
    };

    if ((window as any).paypal) {
      renderButtons();
    } else {
      setPaypalLoading(true);
      const scriptId = "paypal-sdk-script";
      let existingScript = document.getElementById(scriptId) as HTMLScriptElement;

      if (!existingScript) {
        existingScript = document.createElement("script");
        existingScript.id = scriptId;
        existingScript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
        existingScript.async = true;
        document.body.appendChild(existingScript);
      }

      existingScript.onload = () => {
        if (isMounted) {
          setPaypalLoading(false);
          renderButtons();
        }
      };
      existingScript.onerror = () => {
        if (isMounted) {
          setPaypalLoading(false);
          setPaypalError(
            isVi
              ? "Không thể tải cổng thanh toán PayPal. Vui lòng kiểm tra kết nối mạng."
              : "Failed to load PayPal SDK."
          );
        }
      };
    }

    return () => {
      isMounted = false;
    };
  }, [paymentMethod, status.isPro, showCheckout, isVi]);

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
              ? "Tự động hóa thanh toán VietQR qua SePay - Minh bạch và đảm bảo hoàn tiền 14 ngày."
              : "Automated VietQR banking via SePay - Transparent and 14-day money-back guarantee."}
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
              ? "Hệ thống đã tự động mở khóa toàn bộ công cụ SaaS AI. Bạn có thể quay lại dashboard và gắn link affiliate của tất cả các tool ngay bây giờ."
              : "All AI SaaS tool affiliate slots have been unlocked for your account. You can now return to your dashboard and insert links for any tool."}
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
                  className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    status.isPro
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white"
                      : "bg-secondary text-muted-foreground border-border"
                  }`}
                >
                  {status.isPro ? (isVi ? "Đang hoạt động" : "Active Pro") : (isVi ? "Miễn phí vĩnh viễn" : "Forever Free")}
                </span>
              </div>
            </div>

            <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-foreground">
              {status.isPro ? <Sparkles className="h-6 w-6 text-foreground" /> : <Shield className="h-6 w-6 text-muted-foreground" />}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-6">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">{isVi ? "Quyền lợi giới thiệu:" : "Affiliate Slots:"}</span>
              <p className="text-sm font-bold text-foreground">
                {status.isPro
                  ? isVi
                    ? "Toàn bộ Công cụ SaaS AI"
                    : "All AI SaaS Tools"
                  : isVi
                  ? "Tối đa 3 Công cụ SaaS AI"
                  : "Up to 3 SaaS Tools"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">{isVi ? "Thời hạn & Chu kỳ:" : "Billing Period:"}</span>
              <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
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
                    ? isVi ? "Toàn bộ công cụ SaaS AI (Không giới hạn)" : "All AI SaaS tools (Unlimited)"
                    : isVi ? "Giới hạn 3 công cụ SaaS" : "Limited to 3 SaaS tools"}
                </span>
              </li>
            </ul>
          </div>

          {!status.isPro && !showCheckout && (
            <button
              onClick={handleCreateOrder}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs py-3 px-5 shadow-sm transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>{isVi ? "Đang khởi tạo cổng thanh toán..." : "Initializing Checkout..."}</span>
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

      {/* Unified Multi-Gateway Payment Box (VietQR & PayPal) */}
      {showCheckout && !status.isPro && (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>{isVi ? "Chọn phương thức thanh toán" : "Select Payment Method"}</span>
              </div>
              <h3 className="text-xl font-black text-foreground mt-1">
                {isVi ? "Nâng cấp Asmire Pro (Thời hạn 30 ngày)" : "Upgrade to Asmire Pro (30-Day Cycle)"}
              </h3>
            </div>

            {/* Payment Method Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit">
              <button
                type="button"
                onClick={() => setPaymentMethod("vietqr")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === "vietqr"
                    ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>{isVi ? "VietQR (725.000đ)" : "VietQR Banking"}</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === "paypal"
                    ? "bg-white dark:bg-zinc-900 text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <CreditCard className="h-3.5 w-3.5 text-[#0070ba]" />
                <span>{isVi ? "PayPal / Thẻ ($29)" : "PayPal / Cards ($29)"}</span>
              </button>
            </div>
          </div>

          {/* TAB 1: VIETQR (SEPAY) */}
          {paymentMethod === "vietqr" && (
            <>
              {activeOrder ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* QR Image */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-border shadow-sm">
                    <img
                      src={activeOrder.qrUrl}
                      alt={`VietQR ${activeOrder.orderCode}`}
                      className="w-56 h-56 object-contain rounded-lg"
                    />
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-full mt-3 border border-zinc-200">
                      <RefreshCw className="h-3 w-3 animate-spin text-emerald-600" />
                      <span>{isVi ? "Tự động kích hoạt khi nhận tiền..." : "Auto-polling for payment..."}</span>
                    </div>
                  </div>

                  {/* Bank details & Copy buttons */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-3.5 text-zinc-800 dark:text-zinc-200 text-xs">
                      <span className="font-bold flex items-center gap-1.5 mb-1 text-foreground">
                        <AlertCircle className="h-4 w-4 text-zinc-600 dark:text-zinc-400 shrink-0" />
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
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border">
                        <span className="text-muted-foreground">{isVi ? "Ngân hàng:" : "Bank:"}</span>
                        <span className="font-bold text-foreground text-sm">{activeOrder.bankName}</span>
                      </div>

                      {/* Account Number */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border">
                        <div>
                          <span className="text-muted-foreground block">{isVi ? "Số tài khoản:" : "Account Number:"}</span>
                          <span className="font-mono font-bold text-foreground text-sm">{activeOrder.accountNumber}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(activeOrder.accountNumber, "acc")}
                          className="flex items-center gap-1 text-[11px] font-semibold text-foreground bg-card hover:bg-secondary px-3 py-1.5 rounded-full border border-border transition-colors cursor-pointer"
                        >
                          {copiedField === "acc" ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedField === "acc" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>

                      {/* Account Holder */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border">
                        <span className="text-muted-foreground">{isVi ? "Chủ tài khoản:" : "Account Holder:"}</span>
                        <span className="font-bold text-foreground text-sm uppercase">{activeOrder.accountName}</span>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/50 border border-border">
                        <div>
                          <span className="text-muted-foreground block">{isVi ? "Số tiền:" : "Amount:"}</span>
                          <span className="font-mono font-black text-foreground text-base">
                            {activeOrder.amountVnd.toLocaleString("vi-VN")} VND
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(String(activeOrder.amountVnd), "amount")}
                          className="flex items-center gap-1 text-[11px] font-semibold text-foreground bg-card hover:bg-secondary px-3 py-1.5 rounded-full border border-border transition-colors cursor-pointer"
                        >
                          {copiedField === "amount" ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedField === "amount" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>

                      {/* Memo */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700">
                        <div>
                          <span className="text-zinc-900 dark:text-zinc-100 font-bold block">{isVi ? "Nội dung chuyển khoản (Memo):" : "Transfer Memo:"}</span>
                          <span className="font-mono font-black text-foreground text-base tracking-wider">{activeOrder.orderCode}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(activeOrder.orderCode, "memo")}
                          className="flex items-center gap-1 text-[11px] font-semibold text-zinc-950 dark:text-white bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 transition-colors shadow-sm cursor-pointer"
                        >
                          {copiedField === "memo" ? <CheckCheck className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedField === "memo" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{isVi ? "Đang tạo mã VietQR..." : "Generating VietQR..."}</span>
                </div>
              )}
            </>
          )}

          {/* TAB 2: PAYPAL & CREDIT CARDS */}
          {paymentMethod === "paypal" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <div className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {isVi ? "Gói nâng cấp" : "Subscription"}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {isVi ? "Kích hoạt tự động" : "Instant Activation"}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-lg font-bold text-foreground">Asmire Pro (30 Days)</h4>
                    <span className="text-2xl font-black text-foreground">$29.00 USD</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 pt-2 border-t border-border">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{isVi ? "Mở khóa trọn bộ công cụ AI SaaS" : "Unlock all AI SaaS Tools"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{isVi ? "Chấp nhận số dư ví PayPal & Thẻ Visa, Mastercard, AMEX" : "Accepts PayPal balance, Visa, Mastercard, AMEX"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{isVi ? "Bảo đảm hoàn tiền 100% trong 14 ngày" : "14-Day 100% Money-Back Guarantee"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col items-center justify-center space-y-3 p-4">
                {paypalLoading && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-2 text-muted-foreground text-xs">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>{isVi ? "Đang tải cổng thanh toán PayPal..." : "Loading PayPal Gateway..."}</span>
                  </div>
                )}

                {paypalProcessing && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-2 text-foreground text-xs">
                    <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
                    <span className="font-bold text-sm">
                      {isVi ? "Đang xác thực giao dịch & kích hoạt Pro..." : "Verifying payment & activating Pro..."}
                    </span>
                  </div>
                )}

                {paypalError && (
                  <div className="w-full p-3.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{paypalError}</span>
                  </div>
                )}

                <div
                  id="paypal-button-container"
                  className={paypalProcessing ? "hidden" : "w-full max-w-sm min-h-[140px]"}
                />
              </div>
            </div>
          )}
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
