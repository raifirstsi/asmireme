import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog-data";
import { TOOLS_DATA } from "@/data/tools-data";
import { 
  Calendar, Clock, ShieldCheck, Sparkles, ArrowLeft, 
  ExternalLink, Check, ArrowRight, Share2, BookOpen 
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const post of BLOG_POSTS) {
    params.push({ locale: "en", slug: post.slug });
    params.push({ locale: "vi", slug: post.slug });
  }
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title[locale as Locale]} — Asmire Research`,
    description: post.metaDescription[locale as Locale],
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
      languages: {
        en: `/en/blog/${post.slug}`,
        vi: `/vi/blog/${post.slug}`,
        "x-default": `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title[locale as Locale],
      description: post.metaDescription[locale as Locale],
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.lastReviewedDate,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const isVi = locale === "vi";

  // Mentioned tools in this article
  const mentionedTools = TOOLS_DATA.filter((t) => post.featuredToolSlugs.includes(t.slug));

  // Structured Data (Article & Breadcrumbs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title[locale as Locale],
        description: post.metaDescription[locale as Locale],
        datePublished: post.publishedDate,
        dateModified: post.lastReviewedDate,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: "Asmire",
          url: "https://asmire.me",
          publishingPrinciples: "https://asmire.me/editorial-policy",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://asmire.me/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `https://asmire.me/${locale}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title[locale as Locale],
            item: `https://asmire.me/${locale}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-foreground">Blog</Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-xs">{post.category}</span>
          </nav>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-brand-600 uppercase tracking-wider bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                {post.category}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readingTimeMinutes} min read</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              {post.title[locale as Locale]}
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed">
              {post.metaDescription[locale as Locale]}
            </p>

            {/* Author Bar & EEAT Verification */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center font-bold text-foreground border border-border">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground">{post.author.name}</div>
                  <div className="text-[11px] text-muted-foreground">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Updated: {post.lastReviewedDate}</span>
                </span>
                <span className="text-muted-foreground">•</span>
                <Link
                  href={`/${locale}/editorial-policy`}
                  className="flex items-center gap-1 text-emerald-600 font-semibold hover:underline"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Review</span>
                </Link>
              </div>
            </div>
          </div>

          {/* GEO / AEO Direct Answer Box (40-60 Words Citation Target) */}
          <div className="p-6 rounded-2xl border border-brand-500/40 bg-brand-500/5 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Direct Takeaway / AI Overview Summary</span>
            </span>
            <p className="text-sm sm:text-base font-semibold text-foreground leading-relaxed">
              {post.directAnswerSummary[locale as Locale]}
            </p>
          </div>

          {/* Main Article Body */}
          <div className="prose prose-base dark:prose-invert max-w-none space-y-6 leading-relaxed text-foreground/90">
            <div className="whitespace-pre-line text-sm sm:text-base">
              {post.contentMarkdown[locale as Locale]}
            </div>
          </div>

          {/* Featured Tools Mentioned in This Guide */}
          {mentionedTools.length > 0 && (
            <div className="border-t border-border pt-10 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-foreground">
                  {isVi ? "Các Công Cụ Được Nhắc Đến Trong Bài" : "Featured Tools Mentioned in This Guide"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isVi ? "Kiểm tra bảng giá và dùng thử các công cụ hàng đầu:" : "Explore verified specs and direct official links:"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mentionedTools.map((tool) => (
                  <div
                    key={tool.slug}
                    className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-base text-foreground">{tool.name}</h4>
                        <span className="text-xs font-bold text-brand-600">${tool.startingPrice}/mo</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {tool.tagline[locale as Locale]}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${locale}/tools/${tool.slug}`}
                        className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {isVi ? "Xem đánh giá" : "Full Review"}
                      </Link>
                      <span className="text-muted-foreground">•</span>
                      <a
                        href={`/go/${tool.slug}`}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                      >
                        <span>{isVi ? "Dùng thử" : "Try Free"}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="border-t border-border pt-8 flex items-center justify-between">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{isVi ? "Quay lại danh sách bài viết" : "Back to all guides"}</span>
            </Link>

            <Link
              href={`/${locale}/compare`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline"
            >
              <span>{isVi ? "Xem ma trận so sánh công cụ" : "View Comparison Matrix"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
