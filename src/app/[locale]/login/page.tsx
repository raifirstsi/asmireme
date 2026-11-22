import { redirect } from "next/navigation";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export default async function LoginPageRedirect({ params }: LoginPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/account/login`);
}
