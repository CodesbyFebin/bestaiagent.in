import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "BestAIAgent.in — Evidence-backed AI agent & model graph", template: "%s | BestAIAgent.in" },
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.name, title: SITE.name, description: SITE.description },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en-IN"><body><a href="#main" className="srOnly">Skip to content</a><Header /><main id="main">{children}</main><Footer /></body></html>;
}
