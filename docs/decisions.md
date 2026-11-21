# Architecture Decision Records (ADR) & Core Principles
**Project**: Asmire (asmire.me) — AI SaaS Review, Comparison & Referral Engine  
**Last Updated**: 2026-11-21  
**Status**: Approved for Phase 0  

---

## ADR-001: Technical Stack Selection
* **Context**: The site requires near-instant mobile performance (LCP < 2.0s, INP < 200ms, CLS < 0.05), multilingual support (EN default, VI), dynamic SSR/edge server logic for `/go/` affiliate routing and cookie attribution, static generation with ISR for 50 tools and multiple comparisons, and robust DB operations.
* **Decision**:
  - **Framework**: Next.js 15+ (App Router) with TypeScript, React 19, Tailwind CSS v4, and shadcn/ui.
  - **Database & ORM**: PostgreSQL (hosted on Supabase or Neon Serverless Postgres) with Drizzle ORM for type safety, zero runtime overhead, and clean migrations.
  - **Authentication**: Auth.js (NextAuth v5) using Passwordless Email OTP / Magic Link powered by **Resend** (sender: `support@asmire.me`).
  - **Deployment**: Vercel for high-speed edge delivery & global CDN; self-managed VPS (`167.86.106.149`) available for background scraping, workers, or auxiliary reverse proxy.
  - **Cache & Revalidation**: Next.js On-Demand ISR (`revalidateTag`) triggered upon price changes or review ingestions.
* **Alternatives Considered**:
  - *Remix / React Router 7*: Excellent routing, but Next.js has vastly superior ecosystem support for shadcn/ui, image optimization (AVIF/WebP), and turnkey Vercel edge deployment.
  - *Prisma ORM*: Heavier client bundle and slower cold starts in serverless edge functions compared to Drizzle ORM.
* **Consequences**: Zero hydration overhead on static reading pages; sub-50ms affiliate redirect latency at the server level.

---

## ADR-002: Billing & Payment Provider Selection (SePay Integration)
* **Context**: The site owner operates as a registered business in Vietnam (Doanh nghiệp Việt Nam). The business chooses **SePay (sepay.vn)** as the core automated payment gateway.
* **Decision**:
  - **Primary Payment Gateway**: **SePay** for automated VietQR / Bank Transfer processing.
  - **Currency & Pricing**: Base plan is $29/month, configured in the system with a localized VND equivalent (e.g., 725,000 VND / month or configurable via environment/DB setting `PRO_PLAN_PRICE_VND`).
  - **Billing Mechanics**: Since standard Vietnamese bank transfers via VietQR operate as push payments (prepaid cycles), the Pro subscription operates as a **30-day prepaid recurring cycle**.
  - **Automated Provisioning via Webhook**: SePay sends real-time bank transaction webhooks to `/api/webhooks/sepay` with API Key authentication (`Authorization: Apikey <SEPAY_API_KEY>`). The system parses the unique transfer memo (e.g., `ASM<orderCode>`), validates the exact amount, records an idempotent `PaymentEvent`, and immediately upgrades the user's entitlement to Pro (`status = 'ACTIVE'`, `currentPeriodEnd = NOW() + 30 days`).
  - **Automated Renewal & Dunning**: 3 days prior to expiration, the system dispatches an automated renewal reminder email via Resend (`support@asmire.me`) containing a 1-click VietQR link for the next 30-day cycle.
  - **14-Day Refund Processing**: Under the confirmed 14-day refund policy, refunds are processed via the business bank account or manual bank transfer confirmation; the admin or webhook flags the order as `REFUNDED`, and the member is seamlessly reverted to the Standard 3-slot tier.
* **Alternatives Considered**:
  - *Paddle / Lemon Squeezy*: International MoRs. While powerful for USD cards, SePay has near 100% conversion and familiarity for Vietnamese domestic payments with zero risk of gateway account suspensions. (Can be added later as an auxiliary option for non-Vietnamese users if needed).
  - *Stripe Direct*: Rejected due to lack of direct Vietnamese banking support.
* **Consequences**: Webhook handler, checkout page, and QR generation are tailored specifically for SePay's API and VietQR format.

---

## ADR-003: Referral Attribution Policy & 365-Day First-Touch Cookie
* **Context**: Asmire allows members to share tool links. If a visitor enters via a member's link (`/r/[code]` or `?ref=[code]`), that member is credited when the visitor clicks an affiliate CTA.
* **Decision**:
  - **Attribution Model**: First-touch attribution within a strict 365-day rolling window. The first member who introduces a visitor retains attribution unless the cookie expires or is cleared.
  - **Non-Renewing**: Subsequent visits from other member links do NOT overwrite the original attribution, preserving fairness and preventing affiliate hijacking. (Admin option available to switch to last-touch if business model evolves).
  - **Signed HMAC-SHA256 Cookie**: Cookie `asmire_ref` is set via HTTP response headers (`HttpOnly`, `Secure`, `SameSite=Lax`, `Max-Age=31536000`). JavaScript cannot tamper with or inspect the member ID.
  - **Fallback to Admin**: If a member is suspended, has not linked the tool, has exceeded plan limits (Standard limited to 3 tools), or if `allowMemberLinks=false` for that tool, the click automatically falls back to the Admin (site owner) affiliate link.
  - **No Guaranteed External Commission**: Asmire does not control 3rd-party SaaS affiliate tracking cookies. We route to the member's affiliate URL, but external attribution depends on the SaaS vendor's program rules.
* **Alternatives Considered**:
  - *Last-touch attribution*: Often leads to link-stuffing and cookie bombing among members.
  - *Client-side localStorage attribution*: Vulnerable to XSS, ad-blockers, and easy spoofing.

---

## ADR-004: Structured Data (JSON-LD) & Google Review Policy Compliance
* **Context**: Google's Search Central guidelines strictly regulate `Review` and `aggregateRating` markup. Self-serving reviews and aggregating external 3rd-party reviews into a site's own `aggregateRating` can trigger algorithmic penalties or manual actions for structured data spam.
* **Decision**:
  - `SoftwareApplication` schema will be used for all 50 SaaS tools, containing canonical metadata, operating systems, and official pricing offers (`offers`).
  - **Editorial Reviews**: We only mark up our own in-house editorial rating under `review: { @type: "Review", author: { @type: "Person", name: "Asmire Editorial Team" }, reviewRating: ... }`.
  - **External 3rd-Party Reviews**: External data (G2, Capterra, Trustpilot, Product Hunt) is displayed transparently in the UI with explicit source badges, sample sizes ($n$), and collection dates, but **NOT** synthesized into a single fake `aggregateRating` schema.
* **Consequences**: 100% Google Rich Results compliance with zero risk of schema spam penalties.

---

## ADR-005: Security, SSRF Mitigation & Affiliate Link Allowlist
* **Context**: Permitting arbitrary members to submit custom URLs that redirect public visitors (`/go/[slug]`) introduces immense vectors for phishing, malware distribution, open redirects, and Server-Side Request Forgery (SSRF).
* **Decision**:
  - **Per-Tool Domain Regex Allowlist**: Every one of the 50 SaaS tools has a cryptographically strict allowlist of authorized affiliate networks (e.g., `*.partnerstack.com`, `*.rewardful.com`, `*.firstpromoter.com`, `*.impact.com`) and vendor redirect domains.
  - **Zero Direct Public Link Rendering**: Member URLs are NEVER printed into HTML tags (`<a href="...">`). All outbound links pass through the server endpoint `/go/[toolSlug]`.
  - **Server-Side Validation Engine**: When a member inputs a link, our server resolves HTTP redirects in an isolated sandbox, blocks loopbacks (`127.0.0.1`, `169.254.169.254`, private RFC1918 subnets), enforces timeout limits (3s max), and checks the final landing domain against the verified vendor domain.
  - **Robots & Rel**: Outbound redirect links are blocked in `robots.txt` (`Disallow: /go/`, `Disallow: /r/`), and all buttons carry `rel="nofollow sponsored"`.

---

## ADR-006: Brand Identity & Domain Configuration
* **Context**: User confirmed domain `asmire.me`, brand "Asmire", primary language English (`/en`), secondary Vietnamese (`/vi`).
* **Decision**:
  - Primary URL: `https://asmire.me`
  - Bilingual i18n routing: `/en` (default, root redirects or rewrites to `/en`), `/vi`.
  - Canonical URLs always point to the clean language-prefixed path without tracking query parameters.
