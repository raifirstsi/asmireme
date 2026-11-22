import re

UPDATES = {
    "highlevel": {
        "startingPrice": 97,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://www.gohighlevel.com/pricing",
        "tiers": """[
      {
        name: "Starter",
        priceMonthly: 97,
        priceAnnualMonthly: 81,
        currency: "USD",
        userLimit: "Unlimited Users",
        usageLimit: "Up to 3 Sub-Accounts",
        features: [
          "3 Sub-Accounts included",
          "Unlimited Users & Unlimited Contacts",
          "Complete CRM & pipeline management",
          "Drag-and-drop funnel & website builder",
          "Email marketing & two-way SMS automation",
          "Calendar appointment booking & workflows"
        ]
      },
      {
        name: "Unlimited",
        priceMonthly: 297,
        priceAnnualMonthly: 248,
        currency: "USD",
        isPopular: true,
        userLimit: "Unlimited Users",
        usageLimit: "Unlimited Sub-Accounts",
        features: [
          "Unlimited Sub-Accounts for client accounts",
          "Unlimited Users & Unlimited Contacts",
          "Branded desktop app on your own custom domain",
          "Full REST API & Webhooks access",
          "Snapshot cloning (replicate funnels in 1 click)",
          "Unified company & multi-location reporting"
        ]
      },
      {
        name: "Agency Pro (SaaS Mode)",
        priceMonthly: 497,
        priceAnnualMonthly: 414,
        currency: "USD",
        userLimit: "Unlimited Users",
        usageLimit: "Unlimited Sub-Accounts + SaaS Resale",
        features: [
          "Everything in Unlimited tier",
          "SaaS Mode configurator (resell as your proprietary SaaS)",
          "Automated Stripe client billing & signup funnels",
          "SMS, Email & AI rebilling with custom margin markups",
          "Custom mobile app branding (iOS & Android)",
          "Advanced split testing & priority agency support"
        ]
      }
    ]"""
    },
    "elevenlabs": {
        "startingPrice": 5,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://elevenlabs.io/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "10,000 characters/mo (~10 mins audio)",
        features: [
          "10,000 characters per month",
          "Speech synthesis in 32 languages",
          "Access to 120+ default AI voices",
          "Create up to 3 custom voices",
          "Requires attribution for commercial use"
        ]
      },
      {
        name: "Starter",
        priceMonthly: 5,
        priceAnnualMonthly: 4,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "30,000 characters/mo (~30 mins audio)",
        features: [
          "30,000 characters per month",
          "Instant Voice Cloning from 1 min sample",
          "Commercial use license included",
          "Dubbing studio access",
          "Additional character top-ups ($0.30 per 1k chars)"
        ]
      },
      {
        name: "Creator",
        priceMonthly: 22,
        priceAnnualMonthly: 18,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User",
        usageLimit: "100,000 characters/mo (~2 hours audio)",
        features: [
          "100,000 characters per month (~2 hours)",
          "Professional Voice Cloning (PVC) high fidelity",
          "High quality 192kbps audio output",
          "Create up to 30 custom voices",
          "Projects tool for long-form audiobooks & podcasts"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 99,
        priceAnnualMonthly: 82,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "500,000 characters/mo (~10 hours audio)",
        features: [
          "500,000 characters per month",
          "44.1kHz PCM ultra-low latency audio via API",
          "Create up to 160 custom voices",
          "Highest concurrency limit for streaming API",
          "Dedicated priority queue"
        ]
      }
    ]"""
    },
    "jasper": {
        "startingPrice": 39,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://www.jasper.ai/pricing",
        "tiers": """[
      {
        name: "Creator",
        priceMonthly: 49,
        priceAnnualMonthly: 39,
        currency: "USD",
        userLimit: "1 User Seat",
        usageLimit: "Unlimited AI words generated",
        features: [
          "1 user seat included",
          "1 brand voice & tone consistency",
          "50 knowledge assets / documents",
          "SEO mode via Surfer SEO integration",
          "Browser extension for Chrome & Edge"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 69,
        priceAnnualMonthly: 59,
        currency: "USD",
        isPopular: true,
        userLimit: "1 to 5 User Seats ($59/mo per seat)",
        usageLimit: "Unlimited AI words generated",
        features: [
          "Up to 5 team seats",
          "3 brand voices & style guidelines",
          "10 knowledge base assets per seat",
          "Jasper Art image generator included",
          "Collaborative workspace & document lock",
          "Campaign workflows for multi-channel assets"
        ]
      },
      {
        name: "Business",
        priceMonthly: 125,
        priceAnnualMonthly: 99,
        currency: "USD",
        userLimit: "Custom Team Seats",
        usageLimit: "Unlimited AI words + Custom API",
        features: [
          "Unlimited brand voices & style guides",
          "Custom API access & automated triggers",
          "Enterprise SSO (SAML, Okta) security",
          "Performance analytics & content scoring",
          "Dedicated account manager & SLA guarantee"
        ]
      }
    ]"""
    },
    "synthesia": {
        "startingPrice": 22,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://www.synthesia.io/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "3 minutes video / month",
        features: [
          "3 minutes of generated video per month",
          "6 AI avatars & 60+ languages",
          "Watermark on video exports",
          "Basic video templates"
        ]
      },
      {
        name: "Starter",
        priceMonthly: 29,
        priceAnnualMonthly: 22,
        currency: "USD",
        userLimit: "1 Editor Seat",
        usageLimit: "120 video mins/year (10 mins/mo)",
        features: [
          "10 video minutes per month (120 mins/year)",
          "1 editor seat & 3 guest viewers",
          "90+ diverse stock AI avatars",
          "120+ languages and natural accents",
          "No watermark, 1080p Full HD downloads"
        ]
      },
      {
        name: "Creator",
        priceMonthly: 89,
        priceAnnualMonthly: 67,
        currency: "USD",
        isPopular: true,
        userLimit: "1 Editor Seat",
        usageLimit: "360 video mins/year (30 mins/mo)",
        features: [
          "30 video minutes per month (360 mins/year)",
          "1 editor seat & 5 guest viewers",
          "105+ premium studio AI avatars",
          "Custom avatar creator add-on eligible",
          "Audio voiceover upload & automatic lip-sync",
          "Brand kit with custom fonts & colors"
        ]
      }
    ]"""
    },
    "heygen": {
        "startingPrice": 24,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://www.heygen.com/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "1 Free Credit (~1 min video)",
        features: [
          "1 free credit to test avatar creation",
          "60+ public avatars",
          "300+ voices in 40+ languages",
          "720p export resolution"
        ]
      },
      {
        name: "Creator",
        priceMonthly: 29,
        priceAnnualMonthly: 24,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "15 credits/mo (~15 mins video)",
        features: [
          "15 video generation credits per month",
          "3 instant avatars created from webcam/phone",
          "Unlimited video generation duration",
          "1080p Full HD video exports with no watermark",
          "Auto-generated captions & dynamic styling"
        ]
      },
      {
        name: "Team",
        priceMonthly: 89,
        priceAnnualMonthly: 72,
        currency: "USD",
        userLimit: "3 User Seats Included",
        usageLimit: "30 credits/mo (~30 mins video)",
        features: [
          "30 credits per month with rollover support",
          "3 user seats included for team collaboration",
          "4K Ultra HD video export quality",
          "Brand kits with shared assets and templates",
          "Fast queue processing priority"
        ]
      }
    ]"""
    },
    "originality": {
        "startingPrice": 14.95,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://originality.ai/pricing",
        "tiers": """[
      {
        name: "Pay As You Go",
        priceMonthly: 30,
        priceAnnualMonthly: 30,
        currency: "USD",
        userLimit: "Unlimited Team Members",
        usageLimit: "3,000 credits (300,000 words)",
        features: [
          "3,000 one-time credits ($0.01 per 100 words)",
          "Credits valid for 2 full years",
          "AI content detection (GPT-4o, Claude 3.5, Gemini 1.5)",
          "Plagiarism checker & fact checking assistance",
          "Full scan history and shareable audit reports"
        ]
      },
      {
        name: "Base Subscription",
        priceMonthly: 14.95,
        priceAnnualMonthly: 12.45,
        currency: "USD",
        isPopular: true,
        userLimit: "Unlimited Team Members",
        usageLimit: "2,000 credits/mo (200,000 words)",
        features: [
          "2,000 monthly credits automatically refreshed",
          "Unlimited team members with role-based access",
          "Full REST API access for automated editorial pipelines",
          "Website scan (full domain crawl for AI content)",
          "Multilingual AI detection (English, Spanish, French, etc.)",
          "Top-up credits at discounted $0.01/credit rate"
        ]
      }
    ]"""
    },
    "winston": {
        "startingPrice": 12,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://gowinston.ai/pricing",
        "tiers": """[
      {
        name: "Free Trial",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "2,000 words (7-day trial)",
        features: [
          "2,000 free words to test AI detection",
          "OCR handwritten document scanning",
          "Basic sentence-by-sentence analysis",
          "Email support"
        ]
      },
      {
        name: "Essential",
        priceMonthly: 18,
        priceAnnualMonthly: 12,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "80,000 words / month",
        features: [
          "80,000 words scanned per month",
          "AI detection verified 99.98% accurate on ChatGPT & Claude",
          "Plagiarism checking against billions of web pages",
          "OCR technology for images and scanned student PDFs",
          "Printable PDF audit reports for schools & publishers"
        ]
      },
      {
        name: "Growth",
        priceMonthly: 29,
        priceAnnualMonthly: 19,
        currency: "USD",
        userLimit: "Unlimited Team Members",
        usageLimit: "200,000 words / month",
        features: [
          "200,000 words scanned per month",
          "Unlimited team members included with shared credit pool",
          "Advanced plagiarism checker with source highlighting",
          "Full API access for LMS and CMS integration",
          "Multi-language AI detection (EN, FR, ES, DE, PT)"
        ]
      }
    ]"""
    },
    "nutshell": {
        "startingPrice": 16,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://www.nutshell.com/pricing",
        "tiers": """[
      {
        name: "Foundation",
        priceMonthly: 19,
        priceAnnualMonthly: 16,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited contacts & storage",
        features: [
          "Unlimited contacts & company records",
          "Visual sales pipeline management",
          "Two-way email sync (Gmail & Office 365)",
          "Mobile CRM app for iOS and Android",
          "Standard sales reporting and activity log"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 49,
        priceAnnualMonthly: 42,
        currency: "USD",
        isPopular: true,
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited sales pipelines",
        features: [
          "Unlimited custom sales pipelines",
          "Automated sales sequences & task guidance",
          "Activity tracking & sales rep quotas",
          "Advanced custom sales funnel reporting",
          "Click-to-call phone dialing & recording"
        ]
      },
      {
        name: "Enterprise",
        priceMonthly: 67,
        priceAnnualMonthly: 59,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Dedicated account manager",
        features: [
          "Dedicated success manager & custom onboarding",
          "Priority white-glove phone support",
          "Unlimited custom field tracking",
          "Audit logs & strict data governance"
        ]
      }
    ]"""
    },
    "taskade": {
        "startingPrice": 8,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://www.taskade.com/pricing",
        "tiers": """[
      {
        name: "Free",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "Up to 3 Members",
        usageLimit: "1 Workspace, 250 MB storage",
        features: [
          "1 workspace with task & mind map views",
          "1,000 AI credits per month",
          "Build up to 5 custom AI agents",
          "Real-time video chat and team collaboration"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 10,
        priceAnnualMonthly: 8,
        currency: "USD",
        isPopular: true,
        userLimit: "Per User / Seat",
        usageLimit: "3 Workspaces, 5 GB storage",
        features: [
          "3 team workspaces included",
          "50,000 AI credits per month",
          "Create up to 20 autonomous AI agents",
          "Automated workflow recipes with Zapier & Make",
          "Guest collaborator permissions"
        ]
      },
      {
        name: "for Teams",
        priceMonthly: 20,
        priceAnnualMonthly: 16,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited Workspaces, 50 GB storage",
        features: [
          "Unlimited team workspaces",
          "250,000 AI credits per month",
          "Unlimited autonomous AI agents",
          "Custom AI agent persona training on team docs",
          "Advanced team permissions and audit trail"
        ]
      }
    ]"""
    },
    "reclaim": {
        "startingPrice": 8,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://reclaim.ai/pricing",
        "tiers": """[
      {
        name: "Lite (Free)",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "2 Habits, 1 Calendar Sync",
        features: [
          "Smart calendar defense for 2 automated habits",
          "1 personal calendar sync to work calendar",
          "Up to 3 weeks scheduling horizon",
          "Google Calendar integration"
        ]
      },
      {
        name: "Starter",
        priceMonthly: 10,
        priceAnnualMonthly: 8,
        currency: "USD",
        isPopular: true,
        userLimit: "Per User / Seat",
        usageLimit: "3 Habits, 3 Calendar Syncs",
        features: [
          "Defend up to 3 habits with flexible scheduling",
          "Sync across 3 work and personal calendars",
          "Auto-schedule tasks directly from ClickUp, Asana, Linear",
          "Buffer time between meetings to prevent burnout",
          "8 weeks scheduling horizon"
        ]
      },
      {
        name: "Business",
        priceMonthly: 15,
        priceAnnualMonthly: 12,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Unlimited Habits & Syncs",
        features: [
          "Unlimited smart habits & calendar syncs",
          "High-priority 1:1 meeting auto-rescheduling",
          "Smart Meeting scheduling links with auto-prioritization",
          "Advanced productivity analytics & time audits",
          "Team calendar sharing & admin controls"
        ]
      }
    ]"""
    },
    "getresponse": {
        "startingPrice": 15.6,
        "pricingModel": "flat",
        "pricingEvidenceUrl": "https://www.getresponse.com/pricing",
        "tiers": """[
      {
        name: "Email Marketing",
        priceMonthly: 19,
        priceAnnualMonthly: 15.6,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "1,000 Contacts, Unlimited Sends",
        features: [
          "1,000 contacts included (expandable tiers)",
          "Unlimited email newsletters & autoresponders",
          "AI email subject line & content generator",
          "Drag-and-drop website & landing page builder",
          "Signup forms and popups to capture leads"
        ]
      },
      {
        name: "Marketing Automation",
        priceMonthly: 59,
        priceAnnualMonthly: 48.4,
        currency: "USD",
        userLimit: "3 User Seats",
        usageLimit: "1,000 Contacts, Advanced Workflows",
        features: [
          "Everything in Email Marketing tier",
          "Visual workflow builder with event-based automation",
          "Contact tagging, lead scoring & behavioral tracking",
          "Webinars hosting (up to 100 attendees)",
          "Sales funnels and automated abandoned cart sequences"
        ]
      },
      {
        name: "Ecommerce Marketing",
        priceMonthly: 119,
        priceAnnualMonthly: 97.6,
        currency: "USD",
        userLimit: "5 User Seats",
        usageLimit: "1,000 Contacts, Full Store Sync",
        features: [
          "Native Shopify, WooCommerce & Magento sync",
          "Quick transactional emails via dedicated servers",
          "AI product recommendations on web and email",
          "Promo codes & automated cart recovery emails",
          "Web push notifications for store visitors"
        ]
      }
    ]"""
    },
    "decktopus": {
        "startingPrice": 9.99,
        "pricingModel": "usage",
        "pricingEvidenceUrl": "https://decktopus.com/pricing",
        "tiers": """[
      {
        name: "Pro AI",
        priceMonthly: 14.99,
        priceAnnualMonthly: 9.99,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "750 AI credits per month",
        features: [
          "750 AI presentation creation credits / month",
          "Remove Decktopus watermark from slides",
          "Export presentations to PDF & editable PowerPoint",
          "Presentation slide view analytics & lead capture",
          "AI voiceover narration generator"
        ]
      },
      {
        name: "Business AI",
        priceMonthly: 47.99,
        priceAnnualMonthly: 34.99,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "1,000 AI credits / month",
        features: [
          "1,000 AI presentation credits per month",
          "Custom domain for sharing web presentations",
          "Lead generation forms embedded in slide decks",
          "Team collaboration with shared folder workspace",
          "Custom brand fonts, colors, and logos"
        ]
      }
    ]"""
    },
    "cursor": {
        "startingPrice": 20,
        "pricingModel": "per_seat",
        "pricingEvidenceUrl": "https://www.cursor.com/pricing",
        "tiers": """[
      {
        name: "Hobby",
        priceMonthly: 0,
        priceAnnualMonthly: 0,
        currency: "USD",
        userLimit: "1 User",
        usageLimit: "2,000 completions/mo",
        features: [
          "2,000 AI code completions per month",
          "50 slow premium requests (Claude 3.5 Sonnet / GPT-4o)",
          "Full codebase indexing & semantic search",
          "Community Discord support"
        ]
      },
      {
        name: "Pro",
        priceMonthly: 20,
        priceAnnualMonthly: 20,
        currency: "USD",
        isPopular: true,
        userLimit: "1 User Seat",
        usageLimit: "Unlimited completions, 500 fast requests",
        features: [
          "Unlimited AI code completions",
          "500 fast premium requests / mo (Claude 3.5 Sonnet, GPT-4o)",
          "Unlimited slow premium requests once fast quota used",
          "Composer multi-file editor & automatic diff reviews",
          "Custom system rules & terminal command generation"
        ]
      },
      {
        name: "Business",
        priceMonthly: 40,
        priceAnnualMonthly: 40,
        currency: "USD",
        userLimit: "Per User / Seat",
        usageLimit: "Enterprise privacy & admin dashboard",
        features: [
          "Everything in Pro tier per seat",
          "Enforced privacy mode (zero code retention by AI vendors)",
          "Centralized team admin dashboard & license management",
          "SAML / Okta Single Sign-On (SSO)",
          "Usage analytics and consolidated billing"
        ]
      }
    ]"""
    }
}

print(f"Loaded {len(UPDATES)} tool audits to apply.")

with open("src/data/tools-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Apply specific tool audits
for slug, data in UPDATES.items():
    print(f"Updating {slug}...")
    # Find the tool block by slug
    # We match from { before slug: "slug" up to the next tool or end of object
    pattern = rf'(\{{\s*id:\s*"[^"]+",\s*slug:\s*"{slug}",[\s\S]*?pricingTiers:\s*\[[\s\S]*?\][\s\S]*?officialUrl:\s*"([^"]+)")'
    match = re.search(pattern, content)
    if not match:
        print(f"WARNING: Could not find block for {slug}")
        continue
    
    block = match.group(1)
    official_url = match.group(2)
    
    # 1. Update startingPrice if provided
    if "startingPrice" in data:
        block = re.sub(r'startingPrice:\s*[0-9.]+', f'startingPrice: {data["startingPrice"]}', block)
        
    # 2. Add or update pricingModel
    model_str = f'pricingModel: "{data["pricingModel"]}",\n    pricingEvidenceUrl: "{data["pricingEvidenceUrl"]}",'
    if "pricingModel:" in block:
        block = re.sub(r'pricingModel:\s*"[^"]+",', f'pricingModel: "{data["pricingModel"]}",', block)
    else:
        # insert before pricingTiers
        block = block.replace("pricingTiers:", f'{model_str}\n    pricingTiers:')
        
    if "pricingEvidenceUrl:" in block and "pricingEvidenceUrl" in data:
        block = re.sub(r'pricingEvidenceUrl:\s*"[^"]+",', f'pricingEvidenceUrl: "{data["pricingEvidenceUrl"]}",', block)
        
    # 3. Replace pricingTiers
    new_tiers_block = f'pricingTiers: {data["tiers"]}'
    block = re.sub(r'pricingTiers:\s*\[[\s\S]*?\]', new_tiers_block, block)
    
    content = content[:match.start(1)] + block + content[match.end(1):]

with open("src/data/tools-data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully written updated tools data!")
