import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asmire.me";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/go/",
          "/r/",
          "/account/",
          "/api/",
          "/*?*ref=",
          "/*?*code=",
        ],
      },
      {
        userAgent: ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
        disallow: ["/go/", "/r/", "/account/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
