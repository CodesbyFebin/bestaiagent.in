import Link from "next/link";
import { EntityCard } from "@/components/EntityCard";
import { JsonLd } from "@/components/JsonLd";
import { evidence, entitiesByType, publicEntities, isEvidenceVerified } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { publicComparisons } from "@/lib/comparisons";

export default function Home() {
  const agents = entitiesByType("agent");
  const models = entitiesByType("model");
  const frameworks = entitiesByType("framework");
  const verifiedEvidence = evidence.filter(isEvidenceVerified);
  return (
    <>
      <JsonLd data={[
        { "@type":"Organization", "@id":`${SITE.url}/#org`, name:SITE.name, url:SITE.url },
        { "@type":"WebSite", "@id":`${SITE.url}/#site`, name:SITE.name, url:SITE.url, publisher:{ "@id":`${SITE.url}/#org` }, inLanguage:"en-IN" }
      ]} />
      <section className="hero"><div className="shell heroGrid">
        <div><p className="kicker">One evidence system · one publication gate</p><h1>Find AI agents and models <span className="gradient">backed by evidence.</span></h1>
          <p className="lead">BestAIAgent.in is an India-built authority graph for agents, local LLMs, frameworks, providers and MCP infrastructure. Verified identity is separated from editorial analysis, and unknown fields stay unknown.</p>
          <div className="direct"><strong>Direct answer:</strong> use this site when you need a source trail, not a synthetic 9.7/10 leaderboard. Primary-source evidence, retrieval dates and SHA-256 snapshots drive public indexability.</div>
          <div className="ctaRow"><Link className="button buttonPrimary" href="/agents">Browse verified agents</Link><Link className="button" href="/models">Explore Indian & local models</Link><Link className="button" href="/methodology">Read methodology</Link></div>
        </div>
        <div className="statsPanel">
          <div className="stat"><b>{publicEntities.length}</b><span>verified public entities</span></div>
          <div className="stat"><b>{verifiedEvidence.length}</b><span>valid primary evidence snapshots</span></div>
          <div className="stat"><b>{models.length}</b><span>verified model cards</span></div>
          <div className="stat"><b>{publicComparisons.length}</b><span>evidence-ready comparisons</span></div>
        </div>
      </div></section>
      <section className="section sectionAlt"><div className="shell"><div className="sectionHead"><div><p className="eyebrow">Verified coding & research agents</p><h2>Agents with upstream identity evidence</h2></div><Link href="/agents">All agents →</Link></div><div className="grid">{agents.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div></div></section>
      <section className="section"><div className="shell"><div className="sectionHead"><div><p className="eyebrow">India / Indic</p><h2>Local and Indian model cards</h2><p>Model-card facts come from primary publisher pages. Publisher-reported benchmarks are not rebranded as independent BestAIAgent benchmarks.</p></div><Link href="/india">India AI graph →</Link></div><div className="grid">{models.slice(0,6).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}</div></div></section>
      <section className="section sectionAlt"><div className="shell"><div className="sectionHead"><div><p className="eyebrow">Developer infrastructure</p><h2>Frameworks & MCP</h2></div></div><div className="grid">{frameworks.slice(0,3).map((entity)=><EntityCard key={entity.id} entity={entity}/>)}<article className="card"><p className="eyebrow">Protocol hub</p><h3><Link href="/mcp">Model Context Protocol</Link></h3><p>Source-led MCP directory, protocol topics and India deployment context without automatic compliance claims.</p><div className="tagRow"><span className="tag">MCP</span><span className="tag">tools</span><span className="tag">resources</span></div></article></div></div></section>
    </>
  );
}
