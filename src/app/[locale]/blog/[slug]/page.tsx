import { permanentRedirect } from "next/navigation";

interface BlogPostRedirectProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostRedirectPage({ params }: BlogPostRedirectProps) {
  const { locale, slug } = await params;
  permanentRedirect(`/${locale}/news/${slug}`);
}
