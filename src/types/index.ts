export type ToolHub =
  | "video-avatar"
  | "voice-audio"
  | "content-seo"
  | "ai-detection"
  | "presentation-design"
  | "meeting-productivity"
  | "sales-crm"
  | "advertising"
  | "website-builder"
  | "research-agent";

export interface PricingTier {
  name: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
  creditDetails?: string;
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
  officialUrl: string;
  logoUrl?: string;
  alternatives: string[]; // Slugs of alternative tools
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
