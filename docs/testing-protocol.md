# Empirical Testing Protocol & Evidence Standards
**Project**: Asmire (asmire.me) — E-E-A-T Benchmark Framework  
**Lead**: Editorial Director & Quality Assurance Lead  
**Date**: 2026-11-21  

---

## 1. Hub-Specific Benchmark Tasks & Evaluation Metrics

To deliver genuine E-E-A-T and secure AI citation prominence, every tool category is tested against standardized real-world workloads:

### Hub 1: Video, Avatar & Repurposing (Synthesia, CapCut, OpusClip, Submagic, etc.)
* **Standard Workload**:
  1. Input 60-second script containing technical vocabulary.
  2. Input 10-minute 1080p podcast recording for automatic virality clipping and subtitle synchronization.
* **Metrics**: Render turnaround time (minutes), lip-sync naturalness score (1–10), subtitle word accuracy (WER %), watermark constraints on free tier.

### Hub 2: Voice, Audio & Speech (ElevenLabs, Listnr, Castmagic, etc.)
* **Standard Workload**:
  1. Generate 500 words of conversational narration with emotional variation (excitement, whisper, formal).
  2. Test multi-lingual fidelity (English, Vietnamese tone handling).
* **Metrics**: Latency to first byte (TTFB), natural breathing cadence, robotic artifacts, cost per 1,000 characters.

### Hub 3: Content, Copywriting & SEO (Jasper, Koala AI, Frase, Rytr, etc.)
* **Standard Workload**:
  1. Prompt for 1,500-word comprehensive product review with custom outline and live SERP data integration.
* **Metrics**: Factuality accuracy rate, repetition score, AI detection evasion baseline, keyword density balance.

### Hub 4: AI & Plagiarism Detection (Originality.ai, Winston AI, Undetectable AI)
* **Standard Workload**:
  1. Run 5 control texts: 100% human-authored text, 100% raw GPT-4 text, Claude 3.5 Sonnet text, hybrid edited text, and paraphrased text.
* **Metrics**: False positive rate on human text, true positive detection rate on LLM outputs.

### Hub 5: Presentations & Visuals (Gamma, Decktopus, MagicSlides)
* **Standard Workload**:
  1. Input a 3-page business plan text file and request a 10-slide pitch deck.
* **Metrics**: Visual coherence, layout adaptability, export flexibility (PPTX/PDF), time to complete presentation.

### Hub 6: Meetings, Transcripts & Productivity (Fireflies.ai, MeetGeek, Reclaim.ai)
* **Standard Workload**:
  1. 30-minute multi-speaker Zoom meeting test with background chatter and action item assignment.
* **Metrics**: Speaker attribution accuracy, action item extraction precision, calendar sync reliability.

### Hub 7: CRM, Sales & Marketing (HighLevel, Nutshell, GetResponse, KrispCall)
* **Standard Workload**:
  1. Set up a 3-step lead capture workflow with SMS/email automation trigger.
* **Metrics**: Onboarding friction, deliverability, API/webhook responsiveness, value-for-money at 5 team members.

---

## 2. Standard Scoring Criteria & Weightings

Every tool receives an objective composite score ($0.0 - 10.0$) calculated via weighted rubric:

$$\text{Final Score} = 0.25 \times \text{Core Features} + 0.25 \times \text{Value for Money} + 0.20 \times \text{Ease of Use} + 0.15 \times \text{Stability \& Speed} + 0.15 \times \text{Integrations}$$

* **Independence Guarantee**: Editorial scores are strictly isolated from affiliate commission rates, membership plan tiers, and whether members have submitted custom links. This policy is publicly documented at `/methodology`.

---

## 3. Tool Access & Testing Budget Requirements

Tools are categorized by access method for testing:

| Tier | Status / Access Method | Tools in Scope | Action Required |
| :--- | :--- | :--- | :--- |
| **Tier A: Free / Generous Trial** | Direct testing via free tier or self-serve trial | Taskade, CapCut, Gamma, ElevenLabs, Fireflies, Rytr, Jotform, Browse AI, OpusClip | Automated/manual testing completed without budget |
| **Tier B: Low-Cost Trial ($1–$10)** | Minimal one-time test credit | Frase ($1 trial), Originality.ai ($30 pay-as-you-go) | Site owner approves small credit pool |
| **Tier C: High-Tier SaaS / Credit Required** | Requires vendor account or owner's existing account credentials | HighLevel, Nutshell, Synthesia, AI Studios, AdCreative.ai, KrispCall | **Site owner provides test credentials or existing affiliate account sandbox access** |
