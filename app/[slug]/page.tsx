import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { legacyPages } from "@/lib/legacy";
import { entitiesByType } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type AuthorityPage = { title: string; description: string; body: string[]; index: boolean };
type P = { params: Promise<{ slug: string }> };

const recoveryPages: Record<string, AuthorityPage> = {
  "ai-agent-rankings": {
    title: "AI agent rankings: evidence-first evaluation",
    description: "A transparent AI-agent ranking methodology based on verifiable evidence rather than synthetic scores.",
    body: [
      "BestAIAgent.in does not publish a universal 9.x score or declare a single AI agent best for every task. A useful ranking must begin with a defined use case and a reproducible evidence set.",
      "Current public comparisons are limited to fields that can be traced to primary sources or reproducible evaluation data. Repository identity, deployment model, licensing, provider support, pricing and benchmark claims are evaluated independently rather than inherited from popularity.",
      "When evidence is incomplete, the field remains unknown. When a comparison cannot be reproduced, the page stays noindex until the source bundle, methodology and raw outputs are sufficient for review.",
      "Use the Agents directory for verified identities and the Compare section for evidence-ready comparisons. This page is the canonical replacement for the historical AI-agent rankings URL."
    ],
    index: true
  }
};

function getAuthorityPage(slug: string): AuthorityPage | undefined {
  return recoveryPages[slug] ?? legacyPages[slug];
}

export function generateStaticParams() {
  return [...new Set([...Object.keys(legacyPages).filter((s) => !s.includes("/")), ...Object.keys(recoveryPages)])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const page = getAuthorityPage(slug);
  if (!page) return { title: "Not found", robots: { index: false, follow: true } };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` },
    robots: { index: page.index, follow: true },
    openGraph: { title: page.title, description: page.description, url: `/${slug}`, type: "article" }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const page = getAuthorityPage(slug);
  if (!page) notFound();
  const models = entitiesByType("model");
  const url = `${SITE.url}/${slug}`;
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / {page.title}</div>
    <JsonLd data={{ "@type": "WebPage", name: page.title, url, description: page.description, isPartOf: { "@type": "WebSite", name: "BestAIAgent.in", url: SITE.url } }} />
    <p className="eyebrow">Authority page</p>
    <h1 style={{ fontSize: "48px" }}>{page.title}</h1>
    <p className="lead">{page.description}</p>
    <div className="prose">
      {page.body.map((p) => <p key={p}>{p}</p>)}
      {slug === "ai-agent-rankings" && <><h2>Where to continue</h2><ul><li><Link href="/agents">Verified AI agents</Link></li><li><Link href="/compare">Evidence-ready comparisons</Link></li><li><Link href="/methodology">Publication methodology</Link></li></ul></>}
      {slug === "local-llm-benchmarks-india" && <><h2>Verified Indian model cards</h2><ul>{models.map((m) => <li key={m.id}><Link href={`/models/${m.slug}`}>{m.name}</Link> — {m.verification}</li>)}</ul></>}
    </div>
  </div>;
}
