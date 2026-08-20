import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { StatusBadge } from "@/components/StatusBadge";
import { getEntity, getEvidence, entities } from "@/lib/catalog";
import { SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return entities.filter((e) => e.type === "model").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity("model", slug);
  if (!entity) return { title: "Not found", robots: { index: false, follow: true } };
  const index = entity.verification === "verified";
  return {
    title: `${entity.name} — evidence & sources`,
    description: entity.summary,
    alternates: { canonical: `/models/${entity.slug}` },
    robots: { index, follow: true },
    openGraph: { title: entity.name, description: entity.summary, url: `${SITE.url}/models/${entity.slug}`, type: "article" }
  };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const entity = getEntity("model", slug);
  if (!entity) notFound();
  const receipts = getEvidence(entity.id);
  const facts = Object.entries(entity.facts ?? {});
  return <div className="shell detail">
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/models">Models</Link> / {entity.name}</div>
    <JsonLd data={{ "@type":"WebPage", name:entity.name, url:`${SITE.url}/models/${entity.slug}`, description:entity.summary, about:{ "@type":"Thing", name:entity.name } }} />
    <section className="detailHero"><p className="eyebrow">Models · {entity.verification}</p><h1>{entity.name}</h1><p className="lead">{entity.summary}</p><div className="tagRow"><StatusBadge state={entity.verification}/>{entity.categories.map((tag)=><span className="tag" key={tag}>{tag}</span>)}</div><p><a className="button" href={entity.sourceUrl} rel="noopener noreferrer">Primary source ↗</a></p></section>
    {facts.length > 0 && <table className="facts"><tbody>{facts.map(([key,value])=><tr key={key}><th>{key}</th><td>{Array.isArray(value) ? value.join(", ") : String(value)}</td></tr>)}</tbody></table>}
    <section className="evidence"><h2>Evidence receipts</h2>{receipts.length ? receipts.map((r)=><div key={r.id}><p><strong>{r.field}</strong> · {r.status} · {r.publisher}</p><p className="muted">Retrieved {r.retrievedAt}</p><code>{r.contentHash}</code><p><a href={r.sourceUrl}>Open evidence source ↗</a></p></div>) : <p className="warning">Identity is source-linked, but no hashed evidence receipt has been published yet. Detail fields remain unknown.</p>}</section>
    <section className="prose"><h2>What this page does not claim</h2><p>No universal score, paid ranking, unsupported compliance badge, synthetic benchmark winner or guessed pricing is attached to this entity. Source-reported benchmark claims, where later displayed, must be labeled as publisher-reported.</p></section>
  </div>;
}
