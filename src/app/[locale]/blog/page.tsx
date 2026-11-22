import { permanentRedirect } from "next/navigation";

interface BlogIndexProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export default async function BlogRedirectPage({ params }: BlogIndexProps) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/news`);
}
