import re
import json

AUDITS_39 = {
    "omniseo": {
        "startingPrice": 39,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://omniseo.ai/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 49,
        priceAnnualMonthly: 39,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "50 programmatic articles/mo",
        features: [
          "50 programmatic SEO articles per month",
          "Automated schema markup injection",
          "Direct WordPress and Webflow CMS sync",
          "Keyword cluster and search intent mapping"
        ]
      },
      {
        name: "Growth",
        priceMonthly: 99,
        priceAnnualMonthly: 79,
        currency: "USD",
        isPopular: true,
        userLimit: "3 User Seats",
        usageLimit: "200 programmatic articles/mo",
        features: [
          "200 programmatic SEO articles per month",
          "Automated internal linking architecture",
          "Google Search Console auto-indexing API",
          "SERP rank tracking & keyword performance audits"
        ]
      },
      {
        name: "Scale",
        priceMonthly: 199,
        priceAnnualMonthly: 159,
        currency: "USD",
        userLimit: "Unlimited Seats",
        usageLimit: "500 programmatic articles/mo",
        features: [
          "500 programmatic articles per month",
          "Connect unlimited websites & custom domains",
          "Custom API access & webhook triggers",
          "Dedicated priority support & custom templates"
        ]
      }
    ]"""
    },
    "marblism": {
        "startingPrice": 24,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://marblism.com/pricing",
        "tiers": """[
      {
        name: "Hobby",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 Developer",
        usageLimit: "1 Active Project, Web Preview",
        features: [
          "1 active full-stack web project",
          "Interactive live web preview",
          "Standard AI generation credits",
          "Community Discord support"
        ]
      },
      {
        name: "Starter",
        priceMonthly: 29,
        priceAnnualMonthly: 24,
        currency: "USD",
        isPopular: true,
        userLimit: "1 Developer",
        usageLimit: "3 Full-Stack Code Exports/mo",
        features: [
          "3 full-stack project exports per month",
          "Complete GitHub repo sync (React + Node.js + Prisma)",
          "Built-in Authentication & PostgreSQL schema setup",
          "Stripe payments and email integration templates"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 79,
        priceAnnualMonthly: 64,
        currency: "USD",
        userLimit: "3 Team Developers",
        usageLimit: "Unlimited Full-Stack Exports",
        features: [
          "Unlimited full-stack project exports",
          "Custom backend API integrations & webhooks",
          "Priority AI engine processing",
          "Commercial deployment rights"
        ]
      }
    ]"""
    },
    "rightblogger": {
        "startingPrice": 24.99,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://rightblogger.com/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "5 Free tool runs per month",
        features: [
          "5 tool generations per month",
          "Access to 70+ blogging AI tools",
          "Basic article generator",
          "Chrome browser extension"
        ]
      },
      {
        name: "Unlimited",
        priceMonthly: 29.99,
        priceAnnualMonthly: 24.99,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "Unlimited Words & Generations",
        features: [
          "Unlimited AI word generation",
          "Unlimited runs on all 70+ blogging tools",
          "Article Writer 3.0 with real-time web research",
          "Keyword research & SEO competitor inspection",
          "Automatic internal links & image suggestions"
        ]
      },
      {
        name: "Team",
        priceMonthly: 49.99,
        priceAnnualMonthly: 39.99,
        currency: "USD",
        userLimit: "3 User Seats Included",
        usageLimit: "Unlimited Words & Shared Library",
        features: [
          "3 user seats included ($15/mo per extra seat)",
          "Shared team content library & drafts",
          "Brand voice management for multiple blogs",
          "Priority feature access & customer support"
        ]
      }
    ]"""
    },
    "pickaxe": {
        "startingPrice": 16,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://pickaxe.co/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 Creator",
        usageLimit: "3 AI Bots, 50 queries/mo",
        features: [
          "Create up to 3 custom AI chatbots",
          "50 total test queries",
          "Basic web embed snippet",
          "Pickaxe community badge"
        ]
      },
      {
        name: "Gold",
        priceMonthly: 20,
        priceAnnualMonthly: 16,
        currency: "USD",
        isPopular: true,
        userLimit: "1 Creator Seat",
        usageLimit: "Unlimited Bots, 1,000 queries/mo",
        features: [
          "Unlimited custom AI chatbots and web tools",
          "1,000 GPT queries per month",
          "Embed on any website without Pickaxe branding",
          "Upload documents & PDF knowledge bases (RAG)",
          "Lead capture forms inside chatbot conversations"
        ]
      },
      {
        name: "Studio",
        priceMonthly: 49,
        priceAnnualMonthly: 39,
        currency: "USD",
        userLimit: "3 Team Members",
        usageLimit: "Custom Domain, 5,000 queries/mo",
        features: [
          "5,000 GPT queries per month",
          "Custom domain for your white-label AI app portal",
          "Stripe monetization: charge users to access your bot",
          "User accounts, access tiers, and paywalls"
        ]
      }
    ]"""
    },
    "ai-studios": {
        "startingPrice": 24,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://www.deepbrain.io/aistudios/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 29,
        priceAnnualMonthly: 24,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "10 video minutes/mo (120 mins/yr)",
        features: [
          "10 minutes of video generation per month",
          "100+ photorealistic AI avatars",
          "80+ languages and natural voice accents",
          "1080p Full HD video downloads without watermark",
          "ChatGPT-powered script assistant"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 89,
        priceAnnualMonthly: 72,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "30 video minutes/mo (360 mins/yr)",
        features: [
          "30 minutes of video generation per month",
          "Access to full premium avatar library",
          "Eligible for Custom Instant Avatar creation",
          "Fast GPU rendering queue",
          "Multi-speaker conversations and podcast layout"
        ]
      },
      {
        name: "Enterprise",
        priceMonthly: 249,
        priceAnnualMonthly: 199,
        currency: "USD",
        userLimit: "Custom Team Seats",
        usageLimit: "Custom Video Minutes & Studio Avatar",
        features: [
          "Custom monthly video minute allowance",
          "Bespoke 3D Studio Avatar with custom clothing",
          "Full REST API for automated video generation",
          "Dedicated account manager & SLA guarantee"
        ]
      }
    ]"""
    },
    "capcut": {
        "startingPrice": 7.49,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://www.capcut.com/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "Standard Effects, 720p/1080p",
        features: [
          "Full timeline multi-track video editing",
          "Standard transitions, filters, and audio effects",
          "Basic auto-captions generator",
          "Export up to 1080p with CapCut end screen"
        ]
      },
      {
        name: "Pro Monthly",
        priceMonthly: 9.99,
        priceAnnualMonthly: 7.49,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User (Desktop & Mobile)",
        usageLimit: "100GB Cloud Storage, 4K 60fps",
        features: [
          "100GB secure cloud storage backup",
          "AI auto-captions with bilingual translation",
          "Smart background removal & chroma key",
          "Vocal isolation and background noise reducer",
          "4K 60fps high bitrate exports",
          "Full access to 10,000+ premium pro templates & fonts"
        ]
      },
      {
        name: "Team Collaboration",
        priceMonthly: 19.99,
        priceAnnualMonthly: 16.99,
        currency: "USD",
        userLimit: "Up to 5 Team Members",
        usageLimit: "500GB Shared Cloud Storage",
        features: [
          "500GB shared cloud storage workspace",
          "Team project sharing and real-time review links",
          "Brand asset library with shared fonts and logos",
          "Centralized member billing"
        ]
      }
    ]"""
    },
    "akool": {
        "startingPrice": 16.8,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://akool.com/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "50 Free Credits",
        features: [
          "50 initial credits to test face swap and avatar",
          "Standard definition generation",
          "Akool watermark on outputs",
          "Personal non-commercial use"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 21,
        priceAnnualMonthly: 16.8,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "300 Credits per month",
        features: [
          "300 credits per month with rollover support",
          "4K Ultra HD face swap in photos and videos",
          "Realistic AI talking avatars from single portrait",
          "No watermark and full commercial usage rights",
          "Fast cloud GPU rendering priority"
        ]
      },
      {
        name: "Studio",
        priceMonthly: 99,
        priceAnnualMonthly: 79,
        currency: "USD",
        userLimit: "3 User Seats",
        usageLimit: "2,000 Credits per month",
        features: [
          "2,000 credits per month",
          "Live streaming interactive avatar",
          "Custom voice cloning and instant lip-sync",
          "REST API access for automated marketing pipelines"
        ]
      }
    ]"""
    },
    "adcreative": {
        "startingPrice": 21,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://adcreative.ai/pricing",
        "tiers": """[
      {
        name: "Startup",
        priceMonthly: 29,
        priceAnnualMonthly: 21,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "10 Download Credits/mo, 1 Brand",
        features: [
          "10 download credits per month",
          "Unlimited AI ad creative generations",
          "1 brand profile with custom colors and logo",
          "AI text & headline copy generator",
          "Meta, Google, LinkedIn & Pinterest ad formats"
        ]
      },
      {
        name: "Professional",
        priceMonthly: 59,
        priceAnnualMonthly: 44,
        currency: "USD",
        userLimit: "2 User Seats",
        usageLimit: "25 Download Credits/mo, 2 Brands",
        features: [
          "25 download credits per month",
          "2 brand profiles with separate asset kits",
          "Competitor ad insights & scoring engine",
          "Creative scoring AI (win probability benchmark)",
          "High-priority image rendering"
        ]
      },
      {
        name: "Agency",
        priceMonthly: 149,
        priceAnnualMonthly: 111,
        currency: "USD",
        userLimit: "Unlimited Team Members",
        usageLimit: "100 Download Credits/mo, Unlimited Brands",
        features: [
          "100 download credits per month",
          "Unlimited brand profiles for agency clients",
          "Unlimited team members with role-based access",
          "Sub-account client folder workspaces",
          "Dedicated account manager & phone onboarding"
        ]
      }
    ]"""
    },
    "krispcall": {
        "startingPrice": 12,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://krispcall.com/pricing",
        "tiers": """[
      {
        name: "Standard",
        priceMonthly: 15,
        priceAnnualMonthly: 12,
        currency: "USD",
        isPopular: true,
        userLimit: "Per User / Seat",
        usageLimit: "1 Free Phone Number Included",
        features: [
          "1 free local or toll-free number per user",
          "VoIP inbound and outbound calling across 100+ countries",
          "Shared number capability for sales/support teams",
          "Call forwarding, voicemail-to-text, and call transfer",
          "Desktop, iOS, and Android dialer apps"
        ]
      },
      {
        name: "Premium",
        priceMonthly: 40,
        priceAnnualMonthly: 32,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited US/CA Calling",
        features: [
          "Unlimited calling within US & Canada",
          "Automated call recording & cloud archiving",
          "Live call monitoring, whispering & barging",
          "Native integrations with HubSpot, Pipedrive, Zapier",
          "Advanced analytics and call center metrics"
        ]
      },
      {
        name: "Enterprise",
        priceMonthly: 75,
        priceAnnualMonthly: 60,
        currency: "USD",
        userLimit: "Per User / Seat (Min 10 users)",
        usageLimit: "Custom Volume & Developer API",
        features: [
          "Developer API & Webhooks access",
          "Custom call routing trees and multi-level IVR",
          "Dedicated account manager & 99.99% uptime SLA",
          "Custom compliance and HIPAA-ready configurations"
        ]
      }
    ]"""
    },
    "my-ai-front-desk": {
        "startingPrice": 35.99,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://myaifrontdesk.com/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 44.99,
        priceAnnualMonthly: 35.99,
        currency: "USD",
        isPopular: true,
        userLimit: "1 Business Location",
        usageLimit: "100 Call Minutes / month",
        features: [
          "100 call minutes per month included",
          "Dedicated phone number with AI receptionist direct answer",
          "Automated calendar booking (Google Calendar / Calendly)",
          "SMS text confirmation sent to callers immediately",
          "Email notifications with full audio recordings and transcripts"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 99.99,
        priceAnnualMonthly: 79.99,
        currency: "USD",
        userLimit: "1-3 Business Locations",
        usageLimit: "350 Call Minutes / month",
        features: [
          "350 call minutes per month",
          "Custom AI knowledge base (upload business FAQs & menus)",
          "CRM webhook integrations (Zapier, GoHighLevel)",
          "Custom caller ID forwarding to live staff when requested",
          "Detailed sentiment and caller intent analytics"
        ]
      },
      {
        name: "Enterprise",
        priceMonthly: 199.99,
        priceAnnualMonthly: 159.99,
        currency: "USD",
        userLimit: "Multi-Location Chains",
        usageLimit: "1,000 Call Minutes / month",
        features: [
          "1,000 call minutes per month",
          "Multiple phone lines & location routing",
          "Custom voice tone and multilingual conversation support",
          "Priority technical support & phone onboarding"
        ]
      }
    ]"""
    },
    "fliki": {
        "startingPrice": 21,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://fliki.ai/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "5 mins audio/video per month",
        features: [
          "5 minutes of credits per month",
          "300 realistic AI voices in 75+ languages",
          "HD 720p video exports with Fliki watermark",
          "Convert blog posts, tweets, and PPTs to video"
        ]
      },
      {
        name: "Standard",
        priceMonthly: 28,
        priceAnnualMonthly: 21,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "180 video mins/yr (15 mins/mo)",
        features: [
          "15 video minutes per month (180 mins billed annually)",
          "1,000+ ultra-natural voices in 85+ languages",
          "1080p Full HD video exports without watermark",
          "Millions of premium stock images and video clips",
          "Commercial usage rights included"
        ]
      },
      {
        name: "Premium",
        priceMonthly: 88,
        priceAnnualMonthly: 66,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "600 video mins/yr (50 mins/mo)",
        features: [
          "50 video minutes per month (600 mins billed annually)",
          "2,000+ ultra-realistic voices including Ultra HD voices",
          "AI voice cloning from 2-minute sample",
          "AI avatar generation and video lip-sync",
          "Full REST API access and priority render queue"
        ]
      }
    ]"""
    },
    "describely": {
        "startingPrice": 22,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://describely.ai/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "5 Product Descriptions",
        features: [
          "5 product descriptions one-time",
          "Standard AI generation templates",
          "Basic keyword optimization",
          "Copy-paste export"
        ]
      },
      {
        name: "Core",
        priceMonthly: 28,
        priceAnnualMonthly: 22,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "30 Products / month",
        features: [
          "30 product generations per month",
          "Bulk CSV catalog import & generation",
          "Direct store sync with Shopify, WooCommerce, Amazon",
          "SEO keyword density and readability scoring",
          "Custom brand voice and tone rules"
        ]
      },
      {
        name: "Enterprise",
        priceMonthly: 99,
        priceAnnualMonthly: 79,
        currency: "USD",
        userLimit: "Unlimited Team Seats",
        usageLimit: "Unlimited Products & Catalog Sync",
        features: [
          "Unlimited product description generation",
          "Multi-store catalog management",
          "Dedicated brand rules and automated tag generation",
          "Priority customer support and bulk API"
        ]
      }
    ]"""
    },
    "koala": {
        "startingPrice": 7.2,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://koala.sh/pricing",
        "tiers": """[
      {
        name: "Essentials",
        priceMonthly: 9,
        priceAnnualMonthly: 7.2,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "15,000 words / month",
        features: [
          "15,000 AI words per month",
          "KoalaWriter with real-time Google search data integration",
          "Amazon affiliate product roundup & review formatting",
          "KoalaChat assistant access",
          "Direct WordPress 1-click publishing"
        ]
      },
      {
        name: "Starter",
        priceMonthly: 25,
        priceAnnualMonthly: 20,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "45,000 words / month",
        features: [
          "45,000 AI words per month",
          "Automated internal linking architecture",
          "AI image generation included directly in articles",
          "Bulk article creation mode (up to 10 articles at once)",
          "SEO outline editor with competitor SERP analysis"
        ]
      },
      {
        name: "Professional",
        priceMonthly: 49,
        priceAnnualMonthly: 39,
        currency: "USD",
        userLimit: "Unlimited Team Members",
        usageLimit: "100,000 words / month",
        features: [
          "100,000 AI words per month",
          "Unlimited team members with shared usage pool",
          "Full REST API for automated blog posting",
          "Custom brand voices and custom tone instructions"
        ]
      }
    ]"""
    },
    "submagic": {
        "startingPrice": 16,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://submagic.co/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 20,
        priceAnnualMonthly: 16,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "20 videos / month (up to 2 mins)",
        features: [
          "20 videos per month (up to 2 minutes each)",
          "Dynamic viral captions (Hormozi & Ali Abdaal styles)",
          "Auto-generated relevant B-roll clips",
          "Remove Submagic watermark",
          "Auto sound effects & auto zooms"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 50,
        priceAnnualMonthly: 40,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "Unlimited videos (up to 5 mins)",
        features: [
          "Unlimited videos per month (up to 5 minutes each)",
          "Upload custom brand fonts and custom templates",
          "AI description and hashtag generator",
          "Fast priority video rendering queue",
          "Multi-language caption generation"
        ]
      },
      {
        name: "Agency",
        priceMonthly: 150,
        priceAnnualMonthly: 120,
        currency: "USD",
        userLimit: "Up to 10 Team Seats",
        usageLimit: "500 videos / mo (up to 10 mins)",
        features: [
          "Up to 10 team member seats",
          "500 videos per month (up to 10 minutes each)",
          "Shared team asset libraries and brand workspaces",
          "Dedicated account manager & priority rendering"
        ]
      }
    ]"""
    },
    "videogen": {
        "startingPrice": 14.4,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://videogen.io/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "3 videos/mo, 720p with watermark",
        features: [
          "3 video generations per month",
          "Standard definition 720p",
          "VideoGen watermark on exports",
          "Basic stock media access"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 18,
        priceAnnualMonthly: 14.4,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "25 videos/mo, 1080p Full HD",
        features: [
          "25 video generations per month",
          "1080p Full HD exports without watermark",
          "Access to 3M+ copyright-free stock footage and music",
          "Ultra-realistic AI voice narration",
          "Full commercial monetization rights"
        ]
      },
      {
        name: "Growth",
        priceMonthly: 48,
        priceAnnualMonthly: 38.4,
        currency: "USD",
        userLimit: "2 User Seats",
        usageLimit: "80 videos/mo, Priority Queue",
        features: [
          "80 video generations per month",
          "Fast cloud GPU rendering priority",
          "Custom brand fonts and watermark overlay",
          "Priority customer support"
        ]
      }
    ]"""
    },
    "textero": {
        "startingPrice": 13.59,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://textero.ai/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "3,000 words / month",
        features: [
          "3,000 AI words per month",
          "Basic essay outline and idea generator",
          "Access to open research summary database",
          "Standard reference formatting"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 16.99,
        priceAnnualMonthly: 13.59,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "Unlimited Words & Academic Search",
        features: [
          "Unlimited AI word generation",
          "Direct semantic search across 200M+ academic research papers",
          "Automatic APA, MLA, Chicago in-text citations and bibliography",
          "AI text summarizer and PDF document chat",
          "Export directly to DOCX and PDF"
        ]
      }
    ]"""
    },
    "quickads": {
        "startingPrice": 15,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://quickads.ai/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 19,
        priceAnnualMonthly: 15,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "20 Ad Creatives / mo, 1 Brand",
        features: [
          "20 AI ad creative downloads per month",
          "1 brand kit with logo and color palette",
          "All standard ad dimensions (Meta, Google, TikTok, LinkedIn)",
          "AI copywriter for ad captions and headlines",
          "High-resolution PNG and JPG exports"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 49,
        priceAnnualMonthly: 39,
        currency: "USD",
        userLimit: "3 User Seats",
        usageLimit: "100 Ad Creatives / mo, 3 Brands",
        features: [
          "100 AI ad creative downloads per month",
          "3 brand profiles with separated asset libraries",
          "Multilingual ad generation in 30+ languages",
          "Competitor ad inspiration and design presets",
          "Priority image rendering queue"
        ]
      },
      {
        name: "Agency",
        priceMonthly: 99,
        priceAnnualMonthly: 79,
        currency: "USD",
        userLimit: "Unlimited Team Seats",
        usageLimit: "Unlimited Ads, 10 Brands",
        features: [
          "Unlimited AI ad creative generations",
          "Up to 10 client brand workspaces",
          "Client folder collaboration & approval links",
          "Dedicated account manager & phone onboarding"
        ]
      }
    ]"""
    },
    "meetgeek": {
        "startingPrice": 12,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://meetgeek.ai/pricing",
        "tiers": """[
      {
        name: "Basic",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "5 hours of meetings/mo",
        features: [
          "5 hours of meeting recording & transcription per month",
          "3 months storage history",
          "Zoom, Google Meet, and Microsoft Teams integration",
          "Basic meeting summary and topic bookmarks"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 15,
        priceAnnualMonthly: 12,
        currency: "USD",
        isPopular: true,
        userLimit: "Per User / Seat",
        usageLimit: "20 hours / mo, 1 Year Storage",
        features: [
          "20 hours of meetings per user per month",
          "1 year of cloud storage",
          "AI summaries, automated action items, and key takeaways",
          "Download audio, video, and full text transcripts",
          "Direct integrations with Notion, Slack, Trello, Google Drive"
        ]
      },
      {
        name: "Business",
        priceMonthly: 29,
        priceAnnualMonthly: 24,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "100 hours / mo, Unlimited Storage",
        features: [
          "100 hours of meetings per user per month",
          "Unlimited cloud storage history",
          "Shareable video soundbites and highlight reels",
          "Custom meeting vocabulary and industry jargon training",
          "Sales CRM sync (HubSpot, Salesforce, Pipedrive)"
        ]
      }
    ]"""
    },
    "castmagic": {
        "startingPrice": 23,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://castmagic.io/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 29,
        priceAnnualMonthly: 23,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "100 audio minutes / month",
        features: [
          "100 audio recording minutes per month",
          "Automated high-accuracy transcriptions",
          "Show notes, episode summaries, and timestamps",
          "Social media post generator (LinkedIn, Twitter, Newsletters)",
          "Upload MP3, WAV, MP4, or paste YouTube links"
        ]
      },
      {
        name: "Growth",
        priceMonthly: 79,
        priceAnnualMonthly: 63,
        currency: "USD",
        userLimit: "2 User Seats",
        usageLimit: "500 audio minutes / month",
        features: [
          "500 audio recording minutes per month",
          "Custom Magic Chat: ask questions against your audio library",
          "Custom prompt recipes for bespoke content outputs",
          "Key quotes and pull-out soundbite generator",
          "Integration with Zapier for automated podcast workflows"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 199,
        priceAnnualMonthly: 159,
        currency: "USD",
        userLimit: "5 User Seats",
        usageLimit: "1,500 audio minutes / month",
        features: [
          "1,500 audio minutes per month",
          "Agency workspaces with segregated client folders",
          "Highest fidelity transcription model",
          "Priority customer support & dedicated account rep"
        ]
      }
    ]"""
    },
    "palette": {
        "startingPrice": 7.2,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://palette.fm/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "Unlimited Standard Res Colorization",
        features: [
          "Unlimited free colorizations at standard resolution",
          "21 distinct artistic color palettes to choose from",
          "Web browser upload and instant color preview",
          "Personal non-commercial use"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 9,
        priceAnnualMonthly: 7.2,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "40 High-Res Credits / month",
        features: [
          "40 high-resolution colorization credits per month",
          "Full original resolution export up to 4K quality",
          "Uncompressed PNG downloads without watermark",
          "Full commercial monetization license",
          "Unused credits rollover month-to-month"
        ]
      },
      {
        name: "Unlimited",
        priceMonthly: 29,
        priceAnnualMonthly: 23,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "Unlimited High-Res Generations",
        features: [
          "Unlimited high-resolution colorizations",
          "Priority GPU processing pipeline",
          "Bulk batch photo colorization",
          "Full API access for automated developer pipelines"
        ]
      }
    ]"""
    },
    "fireflies": {
        "startingPrice": 10,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://fireflies.ai/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "Limited credits, 800 mins storage",
        features: [
          "Limited transcription credits",
          "800 minutes of cloud storage",
          "Captures Zoom, Google Meet, Microsoft Teams, Webex",
          "Basic meeting summaries and audio playback"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 18,
        priceAnnualMonthly: 10,
        currency: "USD",
        isPopular: true,
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited Transcription, 8,000 mins storage",
        features: [
          "Unlimited meeting transcription minutes",
          "8,000 minutes of cloud storage per seat",
          "AI meeting summaries with action items and timestamps",
          "Smart Search filters (sentiment, dates, metrics, speakers)",
          "Download audio, video, and text transcripts"
        ]
      },
      {
        name: "Business",
        priceMonthly: 29,
        priceAnnualMonthly: 19,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited Storage & Video Screen Capture",
        features: [
          "Unlimited cloud storage history",
          "Video screen recording alongside audio transcription",
          "Conversation intelligence: talk-time ratios, sentiments",
          "Sales CRM integrations (HubSpot, Salesforce, Pipedrive)",
          "Team channels and collaborative workspace access"
        ]
      }
    ]"""
    },
    "frase": {
        "startingPrice": 12.75,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://www.frase.io/pricing",
        "tiers": """[
      {
        name: "Solo",
        priceMonthly: 15,
        priceAnnualMonthly: 12.75,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "4 Articles / month, 4,000 AI words",
        features: [
          "1 user seat included",
          "Write & optimize up to 4 articles per month",
          "4,000 AI words generated per month",
          "SERP competitor content analysis (top 20 Google results)",
          "Automated content outline builder"
        ]
      },
      {
        name: "Basic",
        priceMonthly: 45,
        priceAnnualMonthly: 38.25,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "30 Articles / month, 4,000 AI words",
        features: [
          "1 user seat included",
          "Write & optimize up to 30 articles per month",
          "4,000 AI words per month",
          "Google Search Console integration",
          "Topic model scoring and keyword recommendations"
        ]
      },
      {
        name: "Team",
        priceMonthly: 115,
        priceAnnualMonthly: 97.75,
        currency: "USD",
        userLimit: "3 User Seats ($25/mo per extra seat)",
        usageLimit: "Unlimited Articles / month",
        features: [
          "3 user seats included",
          "Unlimited article creation and optimization documents",
          "4,000 AI words included (Pro add-on eligible for unlimited)",
          "Collaborative document sharing and role management",
          "Priority customer support"
        ]
      }
    ]"""
    },
    "10web": {
        "startingPrice": 7,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://10web.io/pricing",
        "tiers": """[
      {
        name: "AI Starter",
        priceMonthly: 10,
        priceAnnualMonthly: 7,
        currency: "USD",
        isPopular: true,
        userLimit: "1 WordPress Website",
        usageLimit: "10k Monthly Visits, 10GB Storage",
        features: [
          "1 WordPress website hosted on Google Cloud",
          "10,000 monthly visits allowance",
          "10GB SSD storage & 100GB monthly bandwidth",
          "AI Website Builder with responsive Elementor templates",
          "Automated 90+ PageSpeed optimization"
        ]
      },
      {
        name: "AI Premium",
        priceMonthly: 15,
        priceAnnualMonthly: 10,
        currency: "USD",
        userLimit: "1 WordPress Website",
        usageLimit: "50k Monthly Visits, 15GB Storage",
        features: [
          "1 WordPress website on isolated high-performance server",
          "50,000 monthly visits allowance",
          "15GB SSD storage & 200GB monthly bandwidth",
          "AI content generator and automatic image optimizer",
          "Real-time automated backups & 1-click restore"
        ]
      },
      {
        name: "AI Agency",
        priceMonthly: 24,
        priceAnnualMonthly: 16,
        currency: "USD",
        userLimit: "3 WordPress Websites",
        usageLimit: "100k Monthly Visits, Multisite",
        features: [
          "3 WordPress websites included ($6/mo per extra site)",
          "100,000 monthly visits allowance",
          "Multisite dashboard with centralized management",
          "White-label client reporting",
          "24/7 priority live chat and engineering support"
        ]
      }
    ]"""
    },
    "palabra": {
        "startingPrice": 23,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://palabra.ai/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 29,
        priceAnnualMonthly: 23,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "20 video minutes / month",
        features: [
          "20 minutes of AI video dubbing per month",
          "30+ international languages with natural accents",
          "AI voice cloning from original speaker audio",
          "Automated lip-sync translation adjustment",
          "1080p Full HD video exports without watermark"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 79,
        priceAnnualMonthly: 63,
        currency: "USD",
        userLimit: "2 User Seats",
        usageLimit: "60 video minutes / month",
        features: [
          "60 minutes of AI video dubbing per month",
          "Multi-speaker detection and individual voice cloning",
          "Export translated SRT and VTT subtitle tracks",
          "Full timeline subtitle editor for manual perfection",
          "Fast GPU dubbing queue priority"
        ]
      }
    ]"""
    },
    "postcrest": {
        "startingPrice": 15,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://postcrest.com/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 19,
        priceAnnualMonthly: 15,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "3 Social Accounts, 50 AI Posts/mo",
        features: [
          "Connect up to 3 social accounts (X, LinkedIn, Threads)",
          "50 AI-generated social posts per month",
          "Visual content calendar and automated scheduling",
          "Viral hook generator and hashtag recommendations",
          "Basic post analytics"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 49,
        priceAnnualMonthly: 39,
        currency: "USD",
        userLimit: "3 Team Members",
        usageLimit: "10 Social Accounts, Unlimited Posts",
        features: [
          "Connect up to 10 social media accounts",
          "Unlimited AI social post generations",
          "LinkedIn carousel generator with PDF export",
          "Audience engagement analytics and best-time posting",
          "Team approval workflow and shared content library"
        ]
      }
    ]"""
    },
    "pineapple-builder": {
        "startingPrice": 9.6,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://pineapplebuilder.com/pricing",
        "tiers": """[
      {
        name: "Basic",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "1 Website on subdomain",
        features: [
          "1 website hosted on Pineapple subdomain",
          "AI copy & design generator",
          "Free SSL certificate included",
          "Basic contact form and lead capture"
        ]
      },
      {
        name: "Starter",
        priceMonthly: 12,
        priceAnnualMonthly: 9.6,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User",
        usageLimit: "1 Custom Domain, Unlimited Pages",
        features: [
          "Connect your own custom domain",
          "Remove Pineapple badge branding",
          "Unlimited website pages and blog posts",
          "24/7 web analytics and Google Tag Manager integration",
          "Fast CDN hosting and 99.9% uptime"
        ]
      },
      {
        name: "Growth",
        priceMonthly: 24,
        priceAnnualMonthly: 19.2,
        currency: "USD",
        userLimit: "3 Team Members",
        usageLimit: "Membership & Payment Integration",
        features: [
          "Members-only gated content areas and user signups",
          "Stripe payments and subscription checkout",
          "SEO optimization tools and custom code injection",
          "Priority customer support"
        ]
      }
    ]"""
    },
    "potion": {
        "startingPrice": 23,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://sendpotion.com/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 29,
        priceAnnualMonthly: 23,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "250 Video Emails / month",
        features: [
          "250 AI-personalized video outreach emails/mo",
          "Record 1 template video and AI personalizes name and screen",
          "Animated video GIF thumbnail in outgoing emails",
          "Custom video landing pages with call-to-action button",
          "Chrome extension for Gmail, LinkedIn, and Outlook"
        ]
      },
      {
        name: "Growth",
        priceMonthly: 89,
        priceAnnualMonthly: 71,
        currency: "USD",
        userLimit: "3 User Seats",
        usageLimit: "1,000 Video Emails / month",
        features: [
          "1,000 AI-personalized video emails per month",
          "Custom domain for video landing pages",
          "Integrations with HubSpot, Salesforce, Outreach, Apollo",
          "Video viewing analytics and instant click notifications",
          "Fast rendering pipeline priority"
        ]
      }
    ]"""
    },
    "rytr": {
        "startingPrice": 7.5,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://rytr.me/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "10,000 characters / month",
        features: [
          "10,000 characters per month (~2,000 words)",
          "Access to 40+ use cases and writing templates",
          "Write in 30+ languages with 20+ emotional tones",
          "Built-in basic plagiarism checker"
        ]
      },
      {
        name: "Unlimited",
        priceMonthly: 9,
        priceAnnualMonthly: 7.5,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "Unlimited Characters / month",
        features: [
          "Unlimited character generation per month",
          "Create 1 custom brand voice and style persona",
          "50 plagiarism checks per month included",
          "Generate 20 AI images per month",
          "Access to private Rytr user community"
        ]
      },
      {
        name: "Premium",
        priceMonthly: 29,
        priceAnnualMonthly: 24,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "Unlimited Characters, Multiple Voices",
        features: [
          "Unlimited character generation",
          "Create multiple custom brand voices and personas",
          "100 plagiarism checks per month",
          "Generate 100 AI images per month",
          "Dedicated account manager & priority email support"
        ]
      }
    ]"""
    },
    "listnr": {
        "startingPrice": 7.2,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://listnr.ai/pricing",
        "tiers": """[
      {
        name: "Student",
        priceMonthly: 9,
        priceAnnualMonthly: 7.2,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "4,000 words / month",
        features: [
          "4,000 words of text-to-speech conversion per month",
          "900+ voices across 140+ languages",
          "Standard audio quality export",
          "Embeddable audio player widget"
        ]
      },
      {
        name: "Individual",
        priceMonthly: 19,
        priceAnnualMonthly: 15,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "20,000 words / month",
        features: [
          "20,000 words per month",
          "Full commercial monetization license",
          "Unlimited podcast hosting with RSS distribution to Spotify",
          "Automatic audio player analytics",
          "Export in WAV and MP3 format"
        ]
      },
      {
        name: "Solo",
        priceMonthly: 39,
        priceAnnualMonthly: 31,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "50,000 words / month",
        features: [
          "50,000 words per month",
          "Instant voice cloning from audio sample",
          "Priority audio generation queue",
          "REST API access with custom webhooks"
        ]
      }
    ]"""
    },
    "jotform": {
        "startingPrice": 29,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://www.jotform.com/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "5 Forms, 100 Submissions/mo",
        features: [
          "Up to 5 active forms",
          "100 monthly form submissions",
          "100MB cloud upload storage",
          "Jotform branding on forms"
        ]
      },
      {
        name: "Bronze",
        priceMonthly: 39,
        priceAnnualMonthly: 29,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "25 Forms, 1,000 Submissions/mo",
        features: [
          "Up to 25 active forms",
          "1,000 monthly submissions",
          "1GB cloud upload storage",
          "Remove Jotform branding completely",
          "Collect payments via Stripe, PayPal, Square without extra fees"
        ]
      },
      {
        name: "Silver",
        priceMonthly: 49,
        priceAnnualMonthly: 39,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "50 Forms, 2,500 Submissions/mo",
        features: [
          "Up to 50 active forms",
          "2,500 monthly submissions",
          "10GB cloud upload storage",
          "HIPAA compliance eligible for healthcare data",
          "Custom PDF receipts and automated confirmation emails"
        ]
      },
      {
        name: "Gold",
        priceMonthly: 129,
        priceAnnualMonthly: 99,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "100 Forms, 10,000 Submissions/mo",
        features: [
          "Up to 100 active forms",
          "10,000 monthly submissions",
          "100GB cloud storage space",
          "HIPAA compliant with BAA agreement",
          "Priority 24/7 customer support"
        ]
      }
    ]"""
    },
    "lebesgue": {
        "startingPrice": 31,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://lebesgue.io/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 39,
        priceAnnualMonthly: 31,
        currency: "USD",
        isPopular: true,
        userLimit: "1 Store / Brand",
        usageLimit: "Up to $5k monthly ad spend",
        features: [
          "Connect Facebook, Instagram, Google Ads & TikTok",
          "Automated daily ad audit and budget leak detection",
          "AI ad copy recommendations based on top-performing ads",
          "Market benchmark comparisons in your ecommerce niche",
          "Weekly performance summaries"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 89,
        priceAnnualMonthly: 71,
        currency: "USD",
        userLimit: "Up to 3 Stores / Brands",
        usageLimit: "Up to $25k monthly ad spend",
        features: [
          "Deep competitor ad monitoring and tracking",
          "Customer lifetime value (LTV) and cohort analytics",
          "First-party conversion tracking fixes",
          "Custom marketing mix modeling (MMM)",
          "Priority live chat support"
        ]
      },
      {
        name: "Agency",
        priceMonthly: 199,
        priceAnnualMonthly: 159,
        currency: "USD",
        userLimit: "Unlimited Team Members",
        usageLimit: "Unlimited Ad Spend & Stores",
        features: [
          "Unlimited ad spend and multi-client dashboards",
          "White-label client audit PDF exports",
          "Custom API access and raw data sync",
          "Dedicated growth strategist consultation"
        ]
      }
    ]"""
    },
    "gamma": {
        "startingPrice": 8,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://gamma.app/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "400 AI credits one-time",
        features: [
          "400 initial AI creation credits",
          "Unlimited card generation and slide decks",
          "Basic deck view analytics",
          "Export to PDF with Made with Gamma badge"
        ]
      },
      {
        name: "Plus",
        priceMonthly: 10,
        priceAnnualMonthly: 8,
        currency: "USD",
        isPopular: true,
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited AI Creations, 400 credits/mo",
        features: [
          "Unlimited AI creations",
          "400 monthly AI credits refreshed every month",
          "Remove Made with Gamma branding badge",
          "Export directly to editable PowerPoint (.pptx) & PDF",
          "Full 30-day revision history"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 20,
        priceAnnualMonthly: 15,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited AI + Custom Domains",
        features: [
          "Unlimited AI generation with advanced AI models",
          "Custom brand fonts, colors, and design themes",
          "Publish presentations to your own custom domain",
          "Granular card-by-card engagement analytics",
          "Priority GPU generation queue"
        ]
      }
    ]"""
    },
    "opusclip": {
        "startingPrice": 15,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://www.opus.pro/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "60 processing mins/mo",
        features: [
          "60 minutes of video upload processing per month",
          "AI Virality Score prediction for every clip",
          "Auto-reframing into vertical 9:16 format",
          "Dynamic auto-captions with emoji highlighting",
          "1080p resolution with OpusClip watermark"
        ]
      },
      {
        name: "Starter",
        priceMonthly: 19,
        priceAnnualMonthly: 15,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "150 processing mins / month",
        features: [
          "150 minutes of upload processing per month",
          "Watermark removal on all video exports",
          "Custom brand templates, fonts, and colors",
          "Multi-aspect ratio export (9:16, 1:1, 16:9)",
          "Auto-schedule posts directly to TikTok, YouTube, Reels"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 38,
        priceAnnualMonthly: 29,
        currency: "USD",
        userLimit: "2 Team Members",
        usageLimit: "300 processing mins / month",
        features: [
          "300 minutes of upload processing per month",
          "Multiple aspect ratio exports at once",
          "Team collaboration workspace and asset sharing",
          "B-roll auto-insertion and custom hook generator",
          "Fast GPU processing priority"
        ]
      }
    ]"""
    },
    "speak-ai": {
        "startingPrice": 23,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://speakai.co/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 29,
        priceAnnualMonthly: 23,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "15 hours audio/video per month",
        features: [
          "15 hours of audio/video transcription per month",
          "Automated sentiment and emotional tone analysis",
          "Named Entity Recognition (brands, people, locations)",
          "Embeddable audio & video recording recorder widget",
          "Export to CSV, PDF, Word, and SRT subtitle format"
        ]
      },
      {
        name: "Custom",
        priceMonthly: 79,
        priceAnnualMonthly: 63,
        currency: "USD",
        userLimit: "3 Team Members",
        usageLimit: "40 hours / mo, Media Library",
        features: [
          "40 hours of transcription per month",
          "Shareable team media repository and search",
          "Custom vocabulary dictionary for technical terms",
          "Direct integration with Zapier, Zoom, Google Drive",
          "Priority customer support"
        ]
      }
    ]"""
    },
    "undetectable": {
        "startingPrice": 9.99,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://undetectable.ai/pricing",
        "tiers": """[
      {
        name: "Monthly (10k Words)",
        priceMonthly: 14.99,
        priceAnnualMonthly: 9.99,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "10,000 humanized words / mo",
        features: [
          "10,000 words humanized per month",
          "Bypass all major AI detectors (Turnitin, GPTZero, CopyLeaks)",
          "Matches human readability and emotional perplexity",
          "High-speed generation with no AI watermarks",
          "Multi-detector audit score comparison"
        ]
      },
      {
        name: "Monthly (50k Words)",
        priceMonthly: 49.99,
        priceAnnualMonthly: 29.99,
        currency: "USD",
        userLimit: "Unlimited Team Seats",
        usageLimit: "50,000 humanized words / mo",
        features: [
          "50,000 words humanized per month",
          "Bulk document upload (DOCX, PDF, TXT)",
          "Highest quality Human rewriting mode",
          "Full REST API access for automated content workflows",
          "Priority processing queue"
        ]
      }
    ]"""
    },
    "simplified": {
        "startingPrice": 18,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://simplified.com/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "5,000 AI words, 1GB Storage",
        features: [
          "Core graphic design editor with templates",
          "5,000 AI writer words per month",
          "1GB cloud storage",
          "Publish to 3 social media accounts"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 24,
        priceAnnualMonthly: 18,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "100k AI words, 10 Video Credits",
        features: [
          "100,000 AI writer words per month",
          "10 AI video generation credits per month",
          "100GB cloud storage space",
          "1 brand kit with custom fonts and colors",
          "Schedule to 7 social media accounts"
        ]
      },
      {
        name: "Business",
        priceMonthly: 49,
        priceAnnualMonthly: 35,
        currency: "USD",
        userLimit: "Up to 5 Team Seats Included",
        usageLimit: "Unlimited AI Words, 500GB Storage",
        features: [
          "Up to 5 team member seats included",
          "Unlimited AI writing words",
          "50 AI video credits per month",
          "500GB cloud storage and shared team folders",
          "Approval workflows and role-based access"
        ]
      }
    ]"""
    },
    "magicslides": {
        "startingPrice": 9.99,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://magicslides.app/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "3 presentations / mo (up to 10 slides)",
        features: [
          "3 presentations per month",
          "Up to 10 slides per presentation",
          "Seamless Google Slides addon integration",
          "Basic design themes and stock images"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 12.99,
        priceAnnualMonthly: 9.99,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "50 presentations / mo (up to 50 slides)",
        features: [
          "50 presentations per month",
          "Up to 50 slides per deck",
          "Convert YouTube videos and URLs to slide decks",
          "Convert PDF and DOCX documents directly to slides",
          "Commercial usage license"
        ]
      },
      {
        name: "Team",
        priceMonthly: 39.99,
        priceAnnualMonthly: 29.99,
        currency: "USD",
        userLimit: "Up to 5 Team Members",
        usageLimit: "Unlimited Presentations & Custom Fonts",
        features: [
          "Unlimited presentation creations",
          "Custom company branding and typography templates",
          "Shared team templates and slide component library",
          "Priority customer support"
        ]
      }
    ]"""
    },
    "paperguide": {
        "startingPrice": 12,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://paperguide.ai/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "5 paper summaries / month",
        features: [
          "5 research paper summaries per month",
          "Basic PDF reference manager",
          "Semantic paper search across arXiv and PubMed",
          "Community support"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 15,
        priceAnnualMonthly: 12,
        currency: "USD",
        isPopular: true,
        userLimit: "1 Researcher Seat",
        usageLimit: "Unlimited Paper Chats & Literature Matrix",
        features: [
          "Unlimited PDF document chats and multi-paper comparisons",
          "Automated literature review matrix generator",
          "Export directly to LaTeX, BibTeX, and DOCX",
          "Two-way citation synchronization with Zotero and Mendeley",
          "Priority AI math and formula extraction"
        ]
      }
    ]"""
    },
    "browse-ai": {
        "startingPrice": 39,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://browse.ai/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 48.75,
        priceAnnualMonthly: 39,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "2,000 Credits / mo, 10 Robots",
        features: [
          "2,000 extraction credits per month",
          "Build up to 10 automated scraping robots without code",
          "Monitor websites with 1-hour check frequency",
          "Extract data behind logins and handle pagination",
          "Download to CSV, Excel, or sync to Google Sheets"
        ]
      },
      {
        name: "Professional",
        priceMonthly: 123.75,
        priceAnnualMonthly: 99,
        currency: "USD",
        userLimit: "2 User Seats",
        usageLimit: "5,000 Credits / mo, 30 Robots",
        features: [
          "5,000 extraction credits per month",
          "Build up to 30 automated scraping robots",
          "Monitor frequency down to 15 minutes",
          "Webhooks, Zapier, Make, and Airtable integrations",
          "Solve standard captchas and geo-targeted scraping"
        ]
      },
      {
        name: "Team",
        priceMonthly: 311.25,
        priceAnnualMonthly: 249,
        currency: "USD",
        userLimit: "5 User Seats",
        usageLimit: "10,000 Credits / mo, Unlimited Robots",
        features: [
          "10,000 extraction credits per month",
          "Unlimited scraping robots",
          "Monitor frequency down to 5 minutes",
          "Full REST API for custom programmatic scraping",
          "Dedicated customer success manager"
        ]
      }
    ]"""
    }
}

print(f"Prepared full audits for {len(AUDITS_39)} tools.")

with open("src/data/tools-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

applied_count = 0
for slug, audit in AUDITS_39.items():
    # Match the tool chunk by slug
    # Find chunk starting with `{` and having `slug: "slug"`
    pattern = rf'(  \{{\n    id: "[^"]+",\s*\n    slug: "{slug}",[\s\S]*?\n  \}}(?:,|\n\];))'
    m = re.search(pattern, content)
    if not m:
        print(f"Could not find chunk for {slug}")
        continue
    
    chunk = m.group(1)
    
    # 1. Update startingPrice
    chunk = re.sub(r'startingPrice:\s*[0-9.]+', f'startingPrice: {audit["startingPrice"]}', chunk)
    
    # 2. Update pricingModel
    if "pricingModel:" in chunk:
        chunk = re.sub(r'pricingModel:\s*"[^"]+",', f'pricingModel: "{audit["pricingModel"]}",', chunk)
    else:
        chunk = chunk.replace("pricingTiers:", f'pricingModel: "{audit["pricingModel"]}",\n    pricingTiers:')
        
    # 3. Update pricingEvidenceUrl
    if "pricingEvidenceUrl:" in chunk:
        chunk = re.sub(r'pricingEvidenceUrl:\s*"[^"]+",', f'pricingEvidenceUrl: "{audit["pricingEvidenceUrl"]}",', chunk)
    else:
        chunk = chunk.replace("pricingTiers:", f'pricingEvidenceUrl: "{audit["pricingEvidenceUrl"]}",\n    pricingTiers:')
        
    # 4. Replace pricingTiers completely
    new_tiers_block = f'pricingTiers: {audit["tiers"]},\n    officialUrl:'
    chunk = re.sub(r'pricingTiers:\s*\[[\s\S]*?\n    \],\s*officialUrl:', new_tiers_block, chunk)
    
    # Replace chunk in content
    content = content[:m.start(1)] + chunk + content[m.end(1):]
    applied_count += 1

print(f"Applied updates to {applied_count} tools.")

with open("src/data/tools-data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Saved updated tools-data.ts successfully!")
