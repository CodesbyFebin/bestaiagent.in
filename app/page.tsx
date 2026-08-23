import Link from "next/link";
import { EntityCard } from "@/components/EntityCard";
import { JsonLd } from "@/components/JsonLd";
import { SearchBox } from "@/components/SearchBox";
import { authorityEvidence } from "@/lib/authority-evidence";
import { evidence, entitiesByType, publicEntities, isEvidenceVerified } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { publicComparisons } from "@/lib/comparisons";
import { categories } from "@/lib/legacy";

const authorityEntryPoints = [
  ["Cursor pricing in India", "/cursor-pricing", "Current first-party plan evidence, including the India-only Start plan."],
  ["What is MCP?", "/what-is-mcp", "Protocol definition, architecture and evidence policy for MCP servers."],
  ["AI agent benchmarks", "/ai-agent-benchmarks", "A reproducible benchmark checklist instead of synthetic leaderboard scores."],
  ["Coding agents hub", "/coding-agents-hub", "Verified coding-agent identities, frameworks and adoption questions."],
  ["AI agent market map", "/ai-agent-market-map", "A taxonomy of agents, frameworks, models, providers and MCP infrastructure."],
  ["AI agent glossary", "/glossary-hub", "Canonical definitions for the entity and evidence terms used across the site."]
] as const;

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
        { "@type":"WebSite", "@id":`${SITE.url}/#site`, name:SITE.name, url:SITE.url, publisher:{ "@id":`${SITE.url}/#org` }, inLanguage:"en-IN" }
      ]} />

      <section className="hero"><div className="shell heroGrid">
        <div>
          <p className="kicker">One evidence system · one publication gate</p>
          <h1>Discover AI agents <span className="gradient">without fake authority.</span></h1>
          <p className="lead">BestAIAgent.in is an India-built authority graph for agents, models, frameworks, providers and MCP infrastructure. Verified identity is separated from editorial analysis, volatile facts carry dated receipts, and unknown fields stay unknown.</p>
          <div className="direct"><strong>Direct answer:</strong> use BestAIAgent.in when you need canonical upstreams, evidence receipts and transparent unknowns—not a synthetic 9.x leaderboard assembled from incompatible claims.</div>
          <div className="ctaRow">
            <Link className="button buttonPrimary" href="/agents">Browse verified agents</Link>
            <Link className="button" href="/models">Explore Indian & local models</Link>
            <Link className="button" href="/methodology">Read methodology</Link>
          </div>
          <SearchBox />
        </div>
        <div className="statsPanel">
          <div className="stat"><b>{publicEntities.length}</b><span>verified public entities</span></div>
          <div className="stat"><b>{totalVerifiedReceipts}</b><span>valid evidence receipts</span></div>
          <div className="stat"><b>{models.length}</b><span>verified model cards</span></div>
          <div className="stat"><b>{publicComparisons.length}</b><span>evidence-ready comparisons</span></div>
        </div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">High-intent authority pages</p><h2>Start with a question, not a leaderboard</h2><p>Historical Search Console demand is preserved only when the intent can be served by a substantive canonical page or a clear semantic redirect.</p></div></div>
        <div className="grid">{authorityEntryPoints.map(([title, href, description]) => <article className="card" key={href}>
          <p className="eyebrow">Evidence-first guide</p>
          <h3><Link href={href}>{title}</Link></h3>
          <p>{description}</p>
          <p><Link href={href}>Open guide →</Link></p>
        </article>)}</div>
      </div></section>

      <section className="section sectionAlt"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Verified coding & research agents</p><h2>Agents with upstream identity evidence</h2><p>Repository identity is verified independently from pricing, benchmark, security and compliance claims.</p></div><Link href="/agents">All agents →</Link></div>
        <div className="grid">{agents.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">India / Indic</p><h2>Local and Indian model cards</h2><p>Model-card facts come from primary publisher pages. Publisher-reported benchmarks are not rebranded as independent BestAIAgent benchmarks.</p></div><Link href="/india">India AI graph →</Link></div>
        <div className="grid">{models.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div>
      </div></section>

      <section className="section sectionAlt"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Developer infrastructure</p><h2>Frameworks & MCP</h2><p>Developer frameworks and protocol infrastructure are modeled separately from end-user agents so evidence stays attached to the correct entity.</p></div><Link href="/frameworks">All frameworks →</Link></div>
        <div className="grid">{frameworks.slice(0,5).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}<article className="card"><p className="eyebrow">Protocol hub</p><h3><Link href="/mcp">Model Context Protocol</Link></h3><p>Source-led MCP directory and protocol guidance. Legacy server details remain noindex until canonical upstream and primary evidence qualify them.</p><div className="tagRow"><span className="tag">MCP</span><span className="tag">tools</span><span className="tag">resources</span></div></article></div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Browse by workflow</p><h2>Category hubs</h2><p>Categories organize discovery; they do not confer a capability, compliance badge or ranking by themselves.</p></div><Link href="/categories">All categories →</Link></div>
        <div className="grid">{categories.map(([slug, name, description]) => <article className="card" key={slug}><h3><Link href={`/categories/${slug}`}>{name}</Link></h3><p>{description}</p></article>)}</div>
      </div></section>

      <section className="section sectionAlt"><div className="shell">
        <div className="sectionHead"><div><p className="eyebrow">Trust layer</p><h2>How a page becomes indexable</h2></div></div>
        <div className="prose">
          <p><strong>Discovery → normalization → evidence → verification → publication → indexability.</strong> Candidate URLs from donor repositories or Search Console are not automatically published. Redirects must have a semantic destination; detail pages must satisfy their evidence gate; unresolved historical pages remain quarantined.</p>
          <p><Link href="/methodology">Evidence methodology →</Link> · <Link href="/editorial-policy">Editorial policy →</Link> · <Link href="/corrections">Corrections →</Link></p>
        </div>
      </div></section>
    </>
  );
}
