import { MetadataRoute } from "next";
import { TOOLS_DATA } from "@/data/tools-data";
import { CATEGORY_HUBS } from "@/data/categories-data";
import { COMPARISON_PAIRS } from "@/data/comparisons-data";
import { BLOG_POSTS } from "@/data/blog-data";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asmire.me";
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [];

  // Homepages
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          vi: `${baseUrl}/vi`,
          "x-default": `${baseUrl}/en`,
        },
      },
    });

    // Main section hubs
    const mainSections = ["tools", "categories", "compare", "rankings", "deals", "news", "membership", "methodology", "editorial-policy", "affiliate-disclosure", "member-terms", "refund-policy", "terms", "privacy", "about", "contact"];
    for (const section of mainSections) {
      entries.push({
        url: `${baseUrl}/${locale}/${section}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${section}`,
            vi: `${baseUrl}/vi/${section}`,
            "x-default": `${baseUrl}/en/${section}`,
          },
        },
      });
    }

    // Category Hubs
    for (const hub of CATEGORY_HUBS) {
      entries.push({
        url: `${baseUrl}/${locale}/categories/${hub.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: {
          languages: {
            en: `${baseUrl}/en/categories/${hub.slug}`,
            vi: `${baseUrl}/vi/categories/${hub.slug}`,
            "x-default": `${baseUrl}/en/categories/${hub.slug}`,
          },
        },
      });
    }

    // Comparison Head-to-Head Pairs
    for (const pair of COMPARISON_PAIRS) {
      entries.push({
        url: `${baseUrl}/${locale}/compare/${pair.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.88,
        alternates: {
          languages: {
            en: `${baseUrl}/en/compare/${pair.slug}`,
            vi: `${baseUrl}/vi/compare/${pair.slug}`,
            "x-default": `${baseUrl}/en/compare/${pair.slug}`,
          },
        },
      });
    }

    // In-Depth News & Reviews
    for (const post of BLOG_POSTS) {
      entries.push({
        url: `${baseUrl}/${locale}/news/${post.slug}`,
        lastModified: post.lastReviewedDate,
        changeFrequency: "weekly",
        priority: 0.88,
        alternates: {
          languages: {
            en: `${baseUrl}/en/news/${post.slug}`,
            vi: `${baseUrl}/vi/news/${post.slug}`,
            "x-default": `${baseUrl}/en/news/${post.slug}`,
          },
        },
      });
    }

    // Verified Tools Reviews & Sub-pages
    for (const tool of TOOLS_DATA) {
      // Main Review Page
      entries.push({
        url: `${baseUrl}/${locale}/tools/${tool.slug}`,
        lastModified: tool.verifiedAt,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/en/tools/${tool.slug}`,
            vi: `${baseUrl}/vi/tools/${tool.slug}`,
            "x-default": `${baseUrl}/en/tools/${tool.slug}`,
          },
        },
      });

      // Dedicated Pricing Page
      entries.push({
        url: `${baseUrl}/${locale}/tools/${tool.slug}/pricing`,
        lastModified: tool.verifiedAt,
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: {
          languages: {
            en: `${baseUrl}/en/tools/${tool.slug}/pricing`,
            vi: `${baseUrl}/vi/tools/${tool.slug}/pricing`,
            "x-default": `${baseUrl}/en/tools/${tool.slug}/pricing`,
          },
        },
      });

      // Dedicated Alternatives Page
      entries.push({
        url: `${baseUrl}/${locale}/tools/${tool.slug}/alternatives`,
        lastModified: tool.verifiedAt,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/tools/${tool.slug}/alternatives`,
            vi: `${baseUrl}/vi/tools/${tool.slug}/alternatives`,
            "x-default": `${baseUrl}/en/tools/${tool.slug}/alternatives`,
          },
        },
      });
    }
  }

  return entries;
}
