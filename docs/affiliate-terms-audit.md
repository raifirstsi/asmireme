# Affiliate Terms & Program Compliance Audit (50 SaaS Tools)
**Project**: Asmire (asmire.me)  
**Audit Date**: 2026-11-21  
**Auditor**: Asmire Principal Engineer & Affiliate Compliance Lead  
**Purpose**: Baseline truth for affiliate networks, commissions, cookie duration, strict URL allowlists for SSRF/phishing defense, and member attribution rules.

---

## 1. Compliance Baseline & Universal Prohibitions
Across all 50 affiliate programs, the following rules apply globally:
1. **Brand Bidding (Negative Match)**: Prohibited on Google Ads, Bing Ads, and Meta Ads for exact brand keywords, misspellings, and brand + coupon/discount terms.
2. **Domain Squatting**: Members may NOT register domains containing the trademarked tool name (e.g., `gethighleveldiscount.com`).
3. **Cookie Stuffing & Hidden Iframes**: Instant termination and forfeiture of unpaid commissions.
4. **Self-Referral**: Most networks (Rewardful, FirstPromoter, PartnerStack) strictly disallow purchasing subscriptions through one's own affiliate link.

---

## 2. Comprehensive 50-Tool Audit Registry

| # | Tool Name | Primary Hub | Network / Platform | Commission & Type | Cookie | Free Plan / Trial | Allowlist Domain & Regex Pattern | allowMemberLinks | SubID Param |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **HighLevel (GoHighLevel)** | CRM & Marketing Automation | FirstPromoter / Direct | 40% Monthly Recurring | 90 days | 14-day free trial | `gohighlevel.com`, `highlevel.com`<br>`^https:\/\/(www\.)?(gohighlevel\.com|highlevel\.com)(\/.*)?(\?|&)fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 2 | **Decktopus AI** | Presentations & Design | Rewardful / Direct | 25%–30% Recurring | 60 days | Free tier available | `decktopus.com`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?decktopus\.com(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 3 | **Taskade** | Meeting & Productivity | Rewardful / PartnerStack | 50% for 1st yr or 35% Lifetime | 90 days | Generous Free plan | `taskade.com`<br>`^https:\/\/(www\.)?taskade\.com(\/.*)?(\?|&)(via|ref)=[a-zA-Z0-9_\-]+` | `true` | `&subid=` |
| 4 | **GetResponse** | CRM & Email Marketing | Direct / CJ Affiliate | 33% Recurring or $100 Bounty | 120 days | 30-day Free trial | `getresponse.com`<br>`^https:\/\/(www\.)?getresponse\.com(\/.*)?\?a=[a-zA-Z0-9_\-]+` | `true` | `&subid=` |
| 5 | **OmniSEO** | Content & SEO | Rewardful / FirstPromoter | 30% Recurring | 60 days | Free audit trial | `omniseo\.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?omniseo\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 6 | **Reclaim.ai** | Meeting & Productivity | PartnerStack | 20% Recurring (1 year) | 90 days | Free plan available | `reclaim.ai`, `grsm.io`<br>`^https:\/\/(grsm\.io|reclaim\.ai)\/[a-zA-Z0-9_\-]+` | `true` | `&ps_subid=` |
| 7 | **Marblism** | Dev & AI App Builder | Rewardful / Direct | 25% Recurring | 60 days | Free starter credits | `marblism.com`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?marblism\.com(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 8 | **RightBlogger** | Content & SEO | Rewardful | 30% Recurring | 60 days | Free tools access | `rightblogger.com`<br>`^https:\/\/(www\.)?rightblogger\.com(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 9 | **Pickaxe** | AI Agent & Bot Builder | Rewardful | 30% Recurring | 60 days | Free builder tier | `beta.pickaxeproject.com`, `pickaxe.co`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?(pickaxeproject\.com|pickaxe\.co)(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 10 | **Winston AI** | AI & Plagiarism Detector | Rewardful | 30%–40% Recurring | 60 days | 7-day trial (2k words) | `gowinston.ai`<br>`^https:\/\/(www\.)?gowinston\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 11 | **AI Studios (DeepBrain)** | Video & Avatar | PartnerStack | 25%–30% First Year | 60 days | Free trial with watermark | `deepbrain.io`, `aistudios.com`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?(deepbrain\.io|aistudios\.com)(\/.*)?` | `true` | `&ps_subid=` |
| 12 | **CapCut** | Video & Repurposing | Impact / Direct | 15%–25% RevShare | 30 days | Generous Free tier | `capcut.com`<br>`^https:\/\/(www\.)?capcut\.com(\/.*)?` | `true` | `&subid=` |
| 13 | **AKOOL** | Video, Face Swap & Avatar | FirstPromoter | 20%–30% Recurring | 60 days | Free credits | `akool.com`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?akool\.com(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 14 | **Nutshell** | CRM & Sales Automation | PartnerStack | $100–$300 Bounty or 20% | 90 days | 14-day free trial | `nutshell.com`<br>`^https:\/\/(www\.)?nutshell\.com(\/.*)?` | `true` | `&ps_subid=` |
| 15 | **ElevenLabs** | Voice, Speech & Audio | Impact / Direct | 22% Recurring (1 year) | 45 days | Free plan (10k chars/mo) | `elevenlabs.io`<br>`^https:\/\/(elevenlabs\.io|try\.elevenlabs\.io)\/.*` | `true` | `&subid=` |
| 16 | **AdCreative.ai** | AI Advertising & Creatives | FirstPromoter / Direct | 30% Recurring | 90 days | 7-day free trial (10 credits)| `adcreative.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?adcreative\.ai(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 17 | **KrispCall** | Cloud VoIP & Call Center | FirstPromoter | 20% Recurring | 60 days | Demo / Trial available | `krispcall.com`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?krispcall\.com(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 18 | **My AI Front Desk** | Sales & AI Receptionist | FirstPromoter | 30% Recurring | 60 days | 7-day trial | `myaifrontdesk.com`<br>`^https:\/\/(www\.)?myaifrontdesk\.com(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 19 | **Fliki** | AI Video & Voice | Rewardful | 30% Recurring (Lifetime) | 60 days | Free tier (5 mins/mo) | `fliki.ai`<br>`^https:\/\/(www\.)?fliki\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 20 | **Describely** | Content & E-com Catalog | Rewardful | 25% Recurring | 60 days | Free trial | `describely.ai`<br>`^https:\/\/(www\.)?describely\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 21 | **Koala AI (KoalaWriter)** | Content & SEO | Rewardful | 30% Lifetime Recurring | 60 days | 5,000 free words | `koala.sh`<br>`^https:\/\/(www\.)?koala\.sh(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 22 | **Submagic** | Video & Caption Repurposing | Rewardful | 30% Recurring | 60 days | 3 free videos/mo | `submagic.co`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?submagic\.co(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 23 | **VideoGen** | AI Video Generation | Rewardful | 30% Recurring | 60 days | Free credits | `videogen.io`<br>`^https:\/\/(www\.)?videogen\.io(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 24 | **Textero AI** | Research & Academic Writing | FirstPromoter / Direct | 25% Recurring | 60 days | Free tier | `textero.ai`<br>`^https:\/\/(www\.)?textero\.ai(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 25 | **QuickAds** | Advertising & Ad Copy | Rewardful | 30% Recurring | 60 days | 7-day trial | `quickads.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?quickads\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 26 | **MeetGeek** | Meeting & AI Notetaker | PartnerStack | 25% Recurring | 90 days | Free basic tier | `meetgeek.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?meetgeek\.ai(\/.*)?` | `true` | `&ps_subid=` |
| 27 | **Castmagic** | Audio, Voice & Podcast | Rewardful | 30% Recurring | 60 days | 7-day free trial | `castmagic.io`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?castmagic\.io(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 28 | **Palette.fm** | Image/Colorize & Creative | Direct / Paddle | 20% RevShare | 30 days | Free colorizations | `palette.fm`<br>`^https:\/\/(www\.)?palette\.fm(\/.*)?` | `true` | `&subid=` |
| 29 | **Fireflies.ai** | Meeting & Productivity | PartnerStack | 20% Recurring | 90 days | Generous Free plan | `fireflies.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?fireflies\.ai(\/.*)?` | `true` | `&ps_subid=` |
| 30 | **Frase** | Content & SEO | FirstPromoter | 30% Recurring | 60 days | 5-day trial ($1) | `frase.io`<br>`^https:\/\/(www\.)?frase\.io(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 31 | **10Web** | AI Website Builder & Host | ShareASale / Direct | 50% First Month or 30% Rec | 60 days | 7-day free trial | `10web.io`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?10web\.io(\/.*)?` | `true` | `&subid=` |
| 32 | **Palabra.ai** | Voice & Video Localization | Rewardful | 25% Recurring | 60 days | Free demo trial | `palabra.ai`<br>`^https:\/\/(www\.)?palabra\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 33 | **Postcrest** | Social Media & Content | Rewardful | 30% Recurring | 60 days | Free starter credits | `postcrest.com`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?postcrest\.com(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 34 | **Pineapple Builder** | AI Website Builder | Rewardful | 30% Recurring | 60 days | Free plan available | `pineapplebuilder.com`<br>`^https:\/\/(www\.)?pineapplebuilder\.com(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 35 | **Potion** | Video Email & Outreach | Rewardful | 30% Recurring | 60 days | Free trial available | `sendpotion.com`<br>`^https:\/\/(www\.)?sendpotion\.com(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 36 | **Rytr** | Content & Writing | PartnerStack | 30% Lifetime Recurring | 60 days | Free plan (10k chars/mo) | `rytr.me`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?rytr\.me(\/.*)?` | `true` | `&ps_subid=` |
| 37 | **Listnr** | Voice, TTS & Podcasting | Rewardful / FirstPromoter | 30% Recurring | 60 days | Free tier | `listnr.tech`, `listnr.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?(listnr\.tech|listnr\.ai)(\/.*)?` | `true` | `&sid=` |
| 38 | **Jotform** | Forms & Workflow Builder | Direct Affiliate | 20% Recurring (1 year) | 60 days | Free plan (5 forms) | `jotform.com`<br>`^https:\/\/(www\.)?jotform\.com(\/.*)?` | `true` | `&subid=` |
| 39 | **Lebesgue** | Advertising & E-com Analytics| Rewardful | 25% Recurring | 60 days | 14-day free trial | `lebesgue.io`<br>`^https:\/\/(www\.)?lebesgue\.io(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 40 | **Gamma** | Presentations & Slides | Direct Referral / Credits | Credits / 20% Partner Tier | 30 days | Free starter (400 credits) | `gamma.app`<br>`^https:\/\/(www\.)?gamma\.app(\/.*)?\?ref=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 41 | **Synthesia** | AI Video & Digital Avatars | Direct Partner Portal | 20% First Year | 60 days | Free demo creator | `synthesia.io`<br>`^https:\/\/(www\.)?synthesia\.io(\/.*)?` | `true` | `&subid=` |
| 42 | **Jasper** | Content & Marketing AI | FirstPromoter / Direct | 25%–30% Recurring (1st yr) | 30 days | 7-day free trial | `jasper.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?jasper\.ai(\/.*)?\?fpr=[a-zA-Z0-9_\-]+` | `true` | `&fpr_sid=` |
| 43 | **OpusClip (Opus.pro)** | Video & Repurposing | Rewardful | 25% Recurring | 60 days | Free plan (60 mins/mo) | `opus.pro`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?opus\.pro(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 44 | **Originality.ai** | AI & Plagiarism Detector | Rewardful | 25% Lifetime Recurring | 60 days | Pay-as-you-go ($30 min) | `originality.ai`<br>`^https:\/\/(www\.)?originality\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 45 | **Speak AI** | Audio/Video Speech Intelligence| FirstPromoter | 25% Recurring | 60 days | 7-day free trial | `speakai.co`<br>`^https:\/\/(www\.)?speakai\.co(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 46 | **Undetectable AI** | AI Humanizer & Detection | Rewardful | 30% Recurring | 60 days | 250 free words | `undetectable.ai`<br>`^https:\/\/(www\.)?undetectable\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 47 | **Simplified** | Design, Video & Copy | FirstPromoter | 30% Recurring | 60 days | Free plan available | `simplified.com`<br>`^https:\/\/(www\.)?simplified\.com(\/.*)?\?fp_ref=[a-zA-Z0-9_\-]+` | `true` | `&fp_sid=` |
| 48 | **MagicSlides** | Presentations & Slides | Rewardful | 30% Recurring | 60 days | Free tier (3 decks/mo) | `magicslides.app`<br>`^https:\/\/(www\.)?magicslides\.app(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 49 | **Paperguide** | Research & Academic AI | Rewardful | 25% Recurring | 60 days | Free trial | `paperguide.ai`<br>`^https:\/\/(www\.)?paperguide\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |
| 50 | **Browse AI** | Web Scraping & Data Extraction | Rewardful | 20% Recurring | 60 days | Free tier (50 credits/mo) | `browse.ai`<br>`^https:\/\/([a-zA-Z0-9\-]+\.)?browse\.ai(\/.*)?\?via=[a-zA-Z0-9_\-]+` | `true` | `&sid=` |

---

## 3. Ambiguous Tools Clarification & Anti-Confusion Guide

As highlighted in the system directives, several tools have names or positioning that can lead to miscategorization:

1. **Postcrest**: Not a generic social media scheduler; specialized AI carousel and content repurposing generator. (Category: *Website, Form & Builder / Social Media Content*).
2. **Potion (sendpotion.com)**: Not a Notion website builder (which is potion.so); Potion is an **AI video personalization tool for email sales outreach**. (Category: *Video, Avatar & Outreach*).
3. **Pineapple Builder**: A dedicated AI landing page builder for startups and creators, integrating blog and payments. (Category: *Website, Form & Builder*).
4. **Marblism**: Generates full-stack web applications from AI prompts (Next.js + Prisma). (Category: *Research, Data & AI Agent / Dev Builder*).
5. **Palette.fm**: An AI colorizer and photo mood grading tool, not a podcast audio palette tool. (Category: *Voice, Audio & Creative*).
6. **Lebesgue**: AI marketing and advertising analytics/benchmarking for e-commerce, not a general SEO auditor. (Category: *Advertising & Analytics*).
7. **QuickAds**: AI ad campaign and banner creator, not a Google search ads PPC agency. (Category: *Advertising*).
8. **Koala AI (KoalaWriter & KoalaChat)**: GPT-4 powered one-click blog and Amazon affiliate article generator with live Google search integration. (Category: *Content & SEO*).

---

## 4. Verification Protocol for Pending Details
For any tool marked with `[Cần xác minh]` regarding updated terms or temporary tier adjustments:
1. Query the vendor's `/affiliates` or `/partners` endpoint directly.
2. Check PartnerStack or Rewardful public program directory entry.
3. If still unresolved, test the affiliate creation flow in the vendor's partner portal.
