import type { Metadata } from "next";
import Link from "next/link";
import { EntityCard } from "@/components/EntityCard";
import { JsonLd } from "@/components/JsonLd";
import { SearchBox } from "@/components/SearchBox";
import { authorityEvidence } from "@/lib/authority-evidence";
import { evidence, entitiesByType, publicEntities, isEvidenceVerified } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { publicComparisons } from "@/lib/comparisons";
import { categories } from "@/lib/legacy";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: SITE.url }
};

const authorityEntryPoints = [
  ["Cursor pricing in India", "/cursor-pricing", "Current first-party plan evidence, including the India-only Start plan.", "₹"],
  ["What is MCP?", "/what-is-mcp", "Protocol definition, architecture and evidence policy for MCP servers.", "◇"],
  ["AI agent benchmarks", "/ai-agent-benchmarks", "A reproducible benchmark checklist instead of synthetic leaderboard scores.", "▥"],
  ["Coding agents hub", "/coding-agents-hub", "Verified coding-agent identities, frameworks and adoption questions.", "</>"],
  ["AI agent market map", "/ai-agent-market-map", "A taxonomy of agents, frameworks, models, providers and MCP infrastructure.", "⌘"],
  ["AI agent glossary", "/glossary-hub", "Canonical definitions for the entity and evidence terms used across the site.", "Aa"]
] as const;

const categoryMarks: Record<string, string> = {
  "coding-agents": "</>", "voice-bots": "◉", orchestration: "⌘", business: "▣", crm: "◎",
  "customer-support": "☏", sales: "↗", marketing: "✦", research: "⌕", automation: "⚙"
};

export default function Home() {
  const agents = entitiesByType("agent");
  const models = entitiesByType("model");
  const frameworks = entitiesByType("framework");
  const verifiedEvidence = evidence.filter(isEvidenceVerified);
  const totalVerifiedReceipts = verifiedEvidence.length + authorityEvidence.filter((item) => item.status === "verified").length;

  return (
    <>
      <JsonLd data={[
        { "@type":"Organization", "@id":`${SITE.url}/#org`, name:SITE.name, url:SITE.url },
        { "@type":"WebSite", "@id":`${SITE.url}/#site`, name:SITE.name, url:SITE.url, publisher:{ "@id":`${SITE.url}/#org` }, inLanguage:"en-IN", potentialAction:{ "@type":"SearchAction", target:`${SITE.url}/search?q={search_term_string}`, "query-input":"required name=search_term_string" } }
      ]} />

      <section className="hero discoveryHero">
        <div className="shell heroGrid">
          <div className="heroCopy">
            <div className="heroBadge"><span>🇮🇳</span> India-built AI discovery platform</div>
            <p className="kicker">Discover · compare · verify</p>
            <h1>Find AI agents <span className="gradient">backed by evidence.</span></h1>
            <p className="lead">Search a curated authority graph of agents, models, frameworks, providers and MCP infrastructure. Every public entity has a source trail; volatile facts such as pricing are dated; unsupported fields stay unknown.</p>
            <div className="trustChips"><span>✓ Primary-source receipts</span><span>✓ No pay-to-rank</span><span>✓ Canonical URLs</span><span>✓ India / Indic coverage</span></div>
            <div className="ctaRow"><Link className="button buttonPrimary" href="/agents">Explore AI agents</Link><Link className="button" href="/compare">Compare evidence</Link></div>
            <div className="heroSearch"><SearchBox /></div>
          </div>

          <div className="heroVisual" aria-label="AI agent evidence graph">
            <div className="orbitGlow"/><div className="orbitRing orbitRingA"/><div className="orbitRing orbitRingB"/>
            <div className="agentCore"><span>✦</span><strong>{publicEntities.length}</strong><small>verified entities</small></div>
            <div className="orbitNode nodeA"><b>&lt;/&gt;</b><span>Coding</span></div>
            <div className="orbitNode nodeB"><b>⌕</b><span>Research</span></div>
            <div className="orbitNode nodeC"><b>◉</b><span>Voice</span></div>
            <div className="orbitNode nodeD"><b>⚙</b><span>Automation</span></div>
            <div className="orbitNode nodeE"><b>⌘</b><span>Frameworks</span></div>
            <div className="orbitNode nodeF"><b>◇</b><span>MCP</span></div>
            <div className="heroVisualCaption">one graph · evidence-gated publication</div>
          </div>
        </div>

        <div className="shell metricStrip">
          <div><b>{publicEntities.length}</b><span>Verified public entities</span></div>
          <div><b>{totalVerifiedReceipts}</b><span>Valid evidence receipts</span></div>
          <div><b>{models.length}</b><span>Verified model cards</span></div>
          <div><b>{publicComparisons.length}</b><span>Evidence-ready comparisons</span></div>
        </div>
      </section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Explore by category</p><h2>Find the right agent surface</h2><p>Categories organize verified records by workflow. They do not imply performance, compliance or ranking.</p></div><Link href="/categories">View all categories →</Link></div>
        <div className="categoryGrid">{categories.map(([slug,name,description])=><article className="card categoryCard" key={slug}><div className="categoryIcon">{categoryMarks[slug] ?? "✦"}</div><h3><Link href={`/categories/${slug}`}>{name}</Link></h3><p>{description}</p></article>)}</div>
      </div></section>

      <section className="section sectionAlt"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Featured verified agents</p><h2>Real identities, real upstreams</h2><p>Identity evidence is verified independently from pricing, benchmarks, security and compliance claims.</p></div><Link href="/agents">View all agents →</Link></div>
        <div className="grid">{agents.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Authority guides</p><h2>Start with a question, not a leaderboard</h2><p>These pages preserve real Search Console demand with substantive canonical answers and dated evidence where the subject is volatile.</p></div></div>
        <div className="grid authorityGrid">{authorityEntryPoints.map(([title,href,description,icon])=><article className="card" key={href}><div className="authorityType"><span>Evidence-first guide</span><b>{icon}</b></div><h3><Link href={href}>{title}</Link></h3><p>{description}</p><p><Link href={href}>Open guide →</Link></p></article>)}</div>
      </div></section>

      <section className="section sectionAlt"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Built in India</p><h2>Indian and Indic model cards</h2><p>India relevance comes from primary publisher evidence. It is never converted into an automatic sovereignty or compliance badge.</p></div><Link href="/india">Explore India AI →</Link></div>
        <div className="grid">{models.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Developer infrastructure</p><h2>Frameworks & MCP</h2><p>Frameworks and protocol infrastructure stay distinct from end-user agents so evidence is attached to the right object.</p></div><Link href="/frameworks">View frameworks →</Link></div>
        <div className="grid">{frameworks.slice(0,5).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}<article className="card"><div className="categoryIcon">◇</div><p className="eyebrow">Protocol hub</p><h3><Link href="/mcp">Model Context Protocol</Link></h3><p>Source-led MCP guidance. Legacy server detail routes stay noindex until canonical upstream and primary evidence qualify them.</p><div className="tagRow"><span className="tag">tools</span><span className="tag">resources</span><span className="tag">prompts</span></div></article></div>
      </div></section>

      <section className="section sectionAlt"><div className="shell"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Trust layer</p><h2>Evidence decides what becomes indexable.</h2><p>Discovery → normalization → evidence → verification → publication. Donor keywords and old URLs are useful research inputs, but unresolved candidates remain quarantined.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/methodology">Read methodology</Link><Link className="button" href="/editorial-policy">Editorial policy</Link></div></div></div></div></section>
    </>
  );
}
