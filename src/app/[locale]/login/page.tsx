import { redirect } from "next/navigation";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPageRedirect({ params }: LoginPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/account/login`);
}
