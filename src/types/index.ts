export type ToolHub =
  | "video-avatar"
  | "voice-audio"
  | "image-design"
  | "content-seo"
  | "ai-detection"
  | "code-developer"
  | "presentation-design"
  | "meeting-productivity"
  | "sales-crm"
  | "advertising"
  | "website-builder"
  | "research-agent";

export type PricingModel = "flat" | "per_seat" | "usage" | "freemium";

export interface PricingTier {
  name: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
  creditDetails?: string;
  userLimit?: string;
  usageLimit?: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  tagline: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  directAnswer: {
    en: string;
    vi: string;
  };
  hubs: ToolHub[];
  tags: string[];
  startingPrice: number;
  hasFreePlan: boolean;
  hasFreeTrial: boolean;
  trialDays?: number;
  affiliateNetwork: string;
  affiliateUrlTemplate: string;
  adminAffiliateUrl: string;
  allowMemberLinks: boolean;
  rating: number; // Editorial rating 0.0 - 5.0
  reviewCount: number;
  verifiedAt: string; // ISO date of last check
  verdict: {
    bestFor: {
      en: string;
      vi: string;
    };
    notFor: {
      en: string;
      vi: string;
    };
    bottomLine: {
      en: string;
      vi: string;
    };
  };
  pros: {
    en: string[];
    vi: string[];
  };
  cons: {
    en: string[];
    vi: string[];
  };
  pricingTiers: PricingTier[];
  pricingModel?: PricingModel;
  pricingEvidenceUrl?: string;
  officialUrl: string;
  logoUrl?: string;
  alternatives: string[]; // Slugs of alternative tools
  empiricalAudit?: EmpiricalAuditData;
}

export interface EmpiricalAuditData {
  cancellationAudit: {
    frictionScore: 1 | 2 | 3 | 4 | 5; // 5: 1-Click instant self-serve; 1: Mandatory phone/chat gate
    method: "SELF_SERVE_INSTANT" | "RETENTION_FLOW" | "EMAIL_OR_TICKET" | "LIVE_CHAT_MANDATORY" | "PHONE_CALL_MANDATORY";
    clickCountToCancel: number;
    retentionScreensCount: number;
    refundPolicyDays: number;
    coolingOffPolicy: { en: string; vi: string };
    auditTimestamp: string; // e.g. "2027-Q1"
  };
  finePrintAudit: {
    requiresExternalApiKey: boolean;
    externalApiNote?: { en: string; vi: string };
    mandatorySetupFeeUsd?: number;
    hiddenContractLockMonths?: number;
    typicalRealMonthlyCost: number; // Typical real monthly cost after essential addons/credits
    overageRateDescription?: { en: string; vi: string };
  };
  trialAudit: {
    requiresCreditCard: boolean;
    autoChargesAfterTrial: boolean;
  };
}

export interface CategoryHubItem {
  slug: ToolHub;
  name: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  iconName: string;
  count: number;
  newCount: number;
}
