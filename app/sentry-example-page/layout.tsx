import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sentry Example Page - Wavewell Oficial",
  description: "Teste as funcionalidades do Sentry nesta página de exemplo",
};

export default function SentryExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}






