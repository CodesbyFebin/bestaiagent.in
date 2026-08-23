import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent Research",
  description: "Research methodology and preserved reports with fail-closed indexing.",
  alternates: { canonical: "/research" }
};

const reports = [
  ["state-of-ai-agents-india-2026","State of AI agents in India 2026","India"],
  ["voice-latency-report","Voice latency report","Voice"]
] as const;

export default function Page(){return <div className="shell detail">
  <section className="directoryHero"><p className="eyebrow">Research & resources</p><h1>Reproducible before publishable.</h1><p className="lead">Research routes need methods, source data and raw outputs before benchmark conclusions are indexable. Legacy reports stay accessible while their evidence bundles are rebuilt.</p><div className="directoryMeta"><span>{reports.length} preserved report routes</span><span>Fail-closed indexing</span><span>Raw evidence required</span></div></section>
  <div className="grid">{reports.map(([slug,title,topic])=><article className="card" key={slug}><div className="authorityType"><span>{topic}</span><b>▥</b></div><p className="eyebrow">refreshing · noindex</p><h2 style={{fontSize:"21px"}}><Link href={`/research/${slug}`}>{title}</Link></h2><p>Legacy route preserved while the source bundle, method notes and reproducible outputs are rebuilt.</p><p><Link href={`/research/${slug}`}>View research state →</Link></p></article>)}</div>
  <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Research standard</p><h2>Claims need methods, not decoration.</h2><p>Benchmark numbers, latency results and market conclusions stay out of the index until their inputs and methodology can be reproduced.</p></div><Link className="button buttonPrimary" href="/methodology">Research methodology</Link></div></div></section>
</div>}
