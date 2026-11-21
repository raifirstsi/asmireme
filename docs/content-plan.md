# Content Strategy & SEO / GEO / AEO Keyword Roadmap
**Project**: Asmire (asmire.me) — Bilingual (English Primary, Vietnamese Secondary)  
**Strategy Lead**: SEO / GEO / AEO Specialist & Content Strategist  
**Target Search Engines**: Google Search, Bing, Google AI Overviews, Perplexity, ChatGPT Search, Gemini  
**Date**: 2026-11-21  

---

## 1. 90-Day Keyword Target Feasibility Matrix

We segment keyword opportunities into three realistic tiers based on competitive authority:

| Tier & Target Intent | Keyword Pattern Examples | Search Volume & Difficulty | Realistic 90-Day Rank Potential | Search Engine / AI Intent | Priority Level |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1: High Feasibility (0–90 Days)** | `[Tool] pricing breakdown 2026`<br>`[Tool] hidden fees & limits`<br>`[Tool] vs [Lesser Known Tool]`<br>`[Tool] coupon & promo truth`<br>`Best AI tool for [Micro Niche]`<br>`Đánh giá [Tool] chi tiết 2026` | Low-to-Medium Vol (200–2,500/mo)<br>Low Difficulty (KD: 15–35) | **High (Top 1–5 achievable)** | High Commercial Intent. Exact match for AI search citation because general directories lack fresh pricing data. | **P0 (Immediate Sprint)** |
| **Tier 2: Medium Feasibility (90–180 Days)** | `[Tool] alternatives for [Industry]`<br>`[Tool A] vs [Tool B]` (e.g. `Synthesia vs DeepBrain AI Studios`)<br>`Is [Tool] worth it in 2026?`<br>`So sánh [Tool A] và [Tool B]` | Medium Vol (1,000–8,000/mo)<br>Medium Difficulty (KD: 40–55) | **Moderate (Top 5–10 with internal linking)** | Comparison & decision intent. Strong candidate for Perplexity and ChatGPT Search answers if structured in HTML tables. | **P1 (Core Expansion)** |
| **Tier 3: Long-Term Competitive (6–12 Months)** | `Best AI video generators`<br>`Best AI CRM software`<br>`[Tool] review`<br>`Top AI tools 2026` | High Vol (10,000–100,000+/mo)<br>High Difficulty (KD: 70–90+) | **Low in 90 days** (Requires significant domain authority & backlinks) | Top of funnel informational. Dominated by Forbes, Zapier, TechRadar, G2. | **P2 (Built steadily via Hub authority)** |

---

## 2. Content Architecture & URL Hierarchy

The content structure strictly follows a **Hub-and-Spoke** architecture:

```
/ (Root Homepage - Curated Hubs & Rankings)
├── /tools/[slug]                          (Comprehensive Editorial Review)
├── /tools/[slug]/pricing                  (Real-time Pricing & Plan Calculator)
├── /tools/[slug]/alternatives             (Curated Alternative List)
├── /tools/[slug]/vs/[other-tool]          (Head-to-head Deep Comparison)
├── /category/[hub-slug]                   (Category Directory: Video, CRM, Voice...)
├── /best/[use-case]                       (e.g., /best/ai-video-generators-for-youtube)
├── /compare/[tool-a]-vs-[tool-b]          (Dynamic Interactive Comparison Tool)
├── /stacks/[stack-slug]                   (Pre-configured workflow stacks)
└── /deals                                 (Verified, active discount codes)
```

---

## 3. Editorial Review Standard & Quality Checklist

Every review published on Asmire must satisfy this 10-point checklist before deployment:

- [ ] **Direct Answer (GEO/AEO Trigger)**: Opening section contains an authoritative 40–60 word direct summary answering: what it does, who it is best for, and the baseline cost.
- [ ] **Verdict Card**: "Verdict / Best For / Not For / Pricing Snapshot" displayed above the fold.
- [ ] **Real Testing Artifacts**: Minimum 1 unique prompt, 1 generated video/audio/text output sample, and 1 genuine screenshot of the tool interface.
- [ ] **At Least 3 Concrete Use Cases**: Step-by-step breakdown of how the tool behaves in production environments.
- [ ] **Explicit Genuine Drawbacks (Honest Cons)**: Minimum 2 real limitations (e.g., slow rendering times, rigid credit limits, lack of webhook support).
- [ ] **Verified Pricing Table**: Normalized pricing tiers (monthly vs annual) with the exact verification date.
- [ ] **Head-to-Head Comparison with 3 Rivals**: HTML comparison table covering speed, output quality, and cost-per-unit.
- [ ] **People Also Ask (PAA) FAQ Section**: Minimum 4 FAQ items with JSON-LD `FAQPage` structured data.
- [ ] **Author Credentials & Methodology Link**: Visible author profile with professional background and direct link to `/methodology`.
- [ ] **Affiliate Transparency Disclosure**: Standard FTC / commercial disclaimer placed immediately adjacent to the primary CTA button.

---

## 4. Bilingual Localization Protocol (EN & VI)

1. **English (Primary / Global)**: Written to the highest native US/international editorial standard, targeting US, UK, and global search traffic.
2. **Vietnamese (Secondary / Localized)**:
   - **No Automated Machine Translation**: Machine-translated content without human editing triggers Google spam flags and destroys brand trust.
   - **Localized Market Context**: Focuses on pricing in VND / USD, payment acceptance for Vietnamese cards (Visa/Mastercard/MoMo where applicable), Vietnamese language generation quality (e.g., how well ElevenLabs or Koala AI handles Vietnamese diacritics and tones), and local agency use cases.
   - If a Vietnamese translation does not meet quality standards, it remains `draft` or `noindex` until human review is complete.
