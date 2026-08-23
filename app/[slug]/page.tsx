import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { authorityPages } from "@/lib/authority-pages";
import { getAuthorityEvidence } from "@/lib/authority-evidence";
import { legacyPages } from "@/lib/legacy";
import { entitiesByType } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type LegacyAuthorityPage = { title: string; description: string; body: string[]; index: boolean };
type P = { params: Promise<{ slug: string }> };

function getLegacyPage(slug: string): LegacyAuthorityPage | undefined {
  return legacyPages[slug];
}

export function generateStaticParams() {
  return [...new Set([
    ...Object.keys(legacyPages).filter((slug) => !slug.includes("/")),
    ...Object.keys(authorityPages)
  ])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const authority = authorityPages[slug];
  const legacy = getLegacyPage(slug);
  const page = authority ?? legacy;
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
  const authority = authorityPages[slug];
  const legacy = getLegacyPage(slug);
  if (!authority && !legacy) notFound();

  const page = authority ?? legacy!;
  const models = entitiesByType("model");
  const url = `${SITE.url}/${slug}`;
  const evidence = authority ? getAuthorityEvidence(slug) : [];

  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / {page.title}</div>
    <JsonLd data={{
      "@type": "WebPage",
      name: page.title,
      url,
      description: page.description,
      isPartOf: { "@type": "WebSite", name: "BestAIAgent.in", url: SITE.url },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: page.title, item: url }
        ]
      }
    }} />

    <p className="eyebrow">{authority ? "Evidence-first authority page" : "Authority page"}</p>
    <h1 style={{ fontSize: "48px" }}>{page.title}</h1>
    <p className="lead">{page.description}</p>

    {authority ? <>
      <section className="evidence" aria-labelledby="direct-answer-heading">
        <h2 id="direct-answer-heading">Direct answer</h2>
        <p>{authority.directAnswer}</p>
        <p className="muted">Last reviewed {authority.lastReviewed}</p>
      </section>

      <div className="prose">
        {authority.sections.map((section) => <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
        </section>)}
      </div>

      {evidence.length > 0 && <section className="evidence" aria-labelledby="authority-evidence-heading">
        <h2 id="authority-evidence-heading">Primary-source evidence</h2>
        {evidence.map((record) => <div key={record.id} style={{ marginBottom: "20px" }}>
          <p><strong>{record.field}</strong> · {record.status}</p>
          <p className="muted">Publisher: {record.publisher} · Retrieved {record.retrievedAt}</p>
          <p><a href={record.sourceUrl}>Open first-party source ↗</a></p>
          <code>{record.contentHash}</code>
        </div>)}
        <p className="warning">Volatile facts such as pricing should be checked at the first-party source before purchase or deployment.</p>
      </section>}

      <section className="prose" aria-labelledby="continue-heading">
        <h2 id="continue-heading">Continue researching</h2>
        <ul>{authority.relatedLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
      </section>
    </> : <div className="prose">
      {legacy!.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {slug === "local-llm-benchmarks-india" && <><h2>Verified Indian model cards</h2><ul>{models.map((model) => <li key={model.id}><Link href={`/models/${model.slug}`}>{model.name}</Link> — {model.verification}</li>)}</ul></>}
    </div>}
  </div>;
}
