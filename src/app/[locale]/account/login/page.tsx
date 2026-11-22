"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Mail, KeyRound, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || "vi";
  const redirectQuery = searchParams?.get("redirect") || "";

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStep("OTP");
        setMessage({ text: data.message, isError: false });
      } else {
        setMessage({ text: data.message, isError: true });
      }
    } catch {
      setMessage({ text: "Network error. Please try again.", isError: true });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          redirectUrl: redirectQuery || undefined,
          locale,
        }),
      });
      const data = await res.json();

      if (data.success) {
        window.dispatchEvent(new Event("auth-state-changed"));
        router.push(data.redirect || (locale === "vi" ? "/vi/account" : "/en/account"));
      } else {
        setMessage({ text: data.message, isError: true });
      }
    } catch {
      setMessage({ text: "Verification failed. Please try again.", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shadow-xs mb-2 transition-transform duration-200 hover:scale-105">
          <img
            src="/icon.png"
            alt="Asmire"
            className="h-9 w-9 object-contain dark:invert transition-[filter] duration-200"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
          {step === "EMAIL" ? "Welcome to Asmire" : "Enter Verification Code"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === "EMAIL"
            ? "Passwordless access for member referral management."
            : `We sent a 6-digit login code from support@asmire.me to ${email}`}
        </p>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl text-sm font-medium border ${
            message.isError
              ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {step === "EMAIL" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>{loading ? "Sending Code..." : "Continue with Email"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-foreground">6-Digit Verification Code</label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full h-12 pl-10 pr-4 text-center tracking-widest font-mono text-xl font-bold rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>{loading ? "Verifying..." : "Verify & Sign In"}</span>
            <CheckCircle2 className="h-4 w-4" />
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep("EMAIL")}
              className="text-sm text-muted-foreground hover:text-foreground font-semibold"
            >
              ← Use a different email address
            </button>
          </div>
        </form>
      )}

      <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span>Zero passwords • Signed cryptographic sessions</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="py-16 md:py-24 px-4 flex items-center justify-center">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Đang tải biểu mẫu đăng nhập...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
