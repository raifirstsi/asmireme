# External User Review Sources & Data Acquisition Policy
**Project**: Asmire (asmire.me)  
**Document**: Technical Integration & Compliance Specification  
**Status**: Active Research / Policy Standard  
**Date**: 2026-11-21  

---

## 1. Compliance Principles & Anti-Scraping Rules
To protect Asmire from copyright infringement, IP blacklisting, and terms-of-service violations:
1. **Zero Prohibited Web Scraping**: We strictly forbid automated headless DOM scraping of sites whose Terms of Service expressly prohibit it (e.g., G2, Capterra, Trustpilot).
2. **Sanctioned Acquisition Vectors Only**: Data is collected exclusively through:
   - Official public REST/GraphQL APIs (Product Hunt, Reddit, Hacker News, YouTube, Chrome Web Store).
   - Official certified partner feeds / developer widgets where sanctioned.
   - Authorized open RSS/Atom syndication feeds.
   - Direct, verified on-site reviews submitted by authenticated Asmire members.
3. **Attribution & Excerpt Rules**:
   - Every external opinion displays its **Source Badge**, **Original Star Rating**, **Sample Size ($n$)**, **Original Publication Date**, and **Direct Rel="nofollow" Source Link**.
   - We store only concise excerpts (short quotes under fair use) or proprietary algorithmic summaries synthesized by Asmire. Full review texts are never duplicated.
   - External scores are displayed **per source** (e.g., "G2: 4.6/5 (1,240 reviews) | Capterra: 4.5/5 (890 reviews)"). They are **NEVER aggregated into a synthesized fake aggregate rating**.

---

## 2. Review Sources Feasibility & Rate Limits Matrix

| Source Platform | Allowed Integration Vector | Official API Available? | Rate Limits & Auth | Display Rights & Fair Use | Partner / Paid Required? | Status in Asmire |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Product Hunt** | Official GraphQL API v2 | **Yes** (`api.producthunt.com/v2/api/graphql`) | 5,000 requests / hr (Bearer OAuth Token) | Fully permitted with backlink and PH badge | Free developer token | **Phase 2 Ingestion** |
| **Reddit** | Official Data API | **Yes** (`oauth.reddit.com/r/...`) | 100 queries / min (OAuth2 app credentials) | Permitted for public user discussions with Reddit link | Free API registration | **Phase 2 Ingestion** |
| **Hacker News** | Official Firebase REST API | **Yes** (`hacker-news.firebaseio.com/v0`) | Generous, public CDN | Fully open public domain / MIT license | 100% Free / Open | **Phase 2 Ingestion** |
| **Chrome Web Store** | Public Extension API / Scraper | **Yes** (For tools with extensions like Koala, Fireflies) | Unmetered public store endpoints | Store rating & review count permitted with store link | 100% Free | **Phase 2 Ingestion** |
| **Google Play / App Store** | Apple Enterprise RSS / iTunes API, Google Scraper | **Yes** (For tools with mobile apps like CapCut, Descript) | 20 calls/min (iTunes API is free & public) | App ratings and review counts permitted with store badge | Free / Public | **Phase 2 Ingestion** |
| **YouTube** | YouTube Data API v3 | **Yes** (`googleapis.com/youtube/v3`) | 10,000 quota units / day (Google Cloud API Key) | Video metadata, view counts, and video embeds | Free quota tier | **Phase 2 Ingestion** |
| **Asmire Direct Reviews** | Native on-site review system | **Yes** (Internal API) | Rate limited by IP + member auth | 100% owned by Asmire | Built-in | **Phase 2 Core** |
| **G2** | G2 Review Syndication API | **Yes, but Enterprise Partner Only** | Strict API partner access | Prohibits unauthorized scraping; API requires paid partnership | **Paid Partnership Required** | **Marked for Admin Partnership Outreach** (Manual / Partner Feed) |
| **Capterra / Gartner** | Gartner Digital Markets Partner Feed | **Enterprise Partner Only** | Partner API | Strict anti-scraping policy | **Paid Partnership Required** | **Marked for Admin Partnership Outreach** |
| **Trustpilot** | Trustpilot Consumer API | **Commercial Partners Only** | OAuth2 for Business | Public widgets require business subscription | **Paid / Partner** | **Pending Official Partner Permission** |

---

## 3. Storage Schema & Normalization Pipeline

Each incoming review is normalized into the following schema:

```typescript
interface ExternalReviewEntry {
  id: string;
  toolId: string;
  source: 'PRODUCT_HUNT' | 'REDDIT' | 'HACKER_NEWS' | 'CHROME_STORE' | 'APP_STORE' | 'YOUTUBE' | 'G2' | 'DIRECT';
  externalId: string;
  sourceUrl: string;
  authorName: string;
  ratingValue: number | null; // e.g. 4.5
  ratingScale: number | null; // e.g. 5
  publishedAt: Date;
  collectedAt: Date;
  summaryText: string;
  originalLanguage: string;
  isVerifiedPurchase: boolean;
  moderationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}
```

---

## 4. Administrative Action Items & Required Permissions
For the site owner to obtain enterprise API access:
1. **G2 Partner Application**: Apply for G2 Content Licensing / Syndication API if G2 badges are desired.
2. **Trustpilot API**: Register on Trustpilot Developer Portal for business review feeds.
3. *Immediate Phase 2 Deployment*: Product Hunt API, Reddit OAuth API, Hacker News API, and Chrome Web Store stats will provide immediate, 100% legitimate external review coverage without scraping risks.
