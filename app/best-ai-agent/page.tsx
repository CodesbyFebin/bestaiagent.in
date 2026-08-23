import type { Metadata } from "next";
import Link from "next/link";
import { EntityCard } from "@/components/EntityCard";
import { JsonLd } from "@/components/JsonLd";
import { aiBucketMeta, aiTopicClusters, aiTopicClusterStats, clustersForBucket, type AiIntentBucket } from "@/lib/ai-topic-clusters";
import { entitiesByType, publicEntities } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Best AI Agents: Evidence-Backed Guide by Use Case",
  description: "Evidence-first Best AI Agent pillar mapping 50 use-case clusters and 100 high-intent search terms to verified agents, categories, MCP, India context and methodology.",
  alternates: { canonical: "/best-ai-agent" },
  openGraph: {
    title: "Best AI Agents: Evidence-Backed Guide by Use Case",
    description: "Compare AI-agent use cases without synthetic winners. 50 mapped intent clusters connect to verified entities, categories, MCP and India-first evidence.",
    url: `${SITE.url}/best-ai-agent`
  }
};

const bucketOrder: AiIntentBucket[] = ["coding", "business", "content", "research", "india"];

const decisionSteps = [
  ["1", "Define the job", "Describe the actual workflow, inputs, outputs and failure cost before choosing an agent."],
  ["2", "Check identity", "Confirm the product, developer, canonical upstream and current documentation."],
  ["3", "Verify material fields", "Treat pricing, deployment, MCP support, security, compliance and availability as separate evidence-scoped claims."],
  ["4", "Compare the boundary", "Evaluate model/provider requirements, tool permissions, human approval, data access and operating constraints."],
  ["5", "Keep unknowns visible", "Missing evidence is unknown, not automatically false and never a reason to invent a score."]
] as const;

export default function BestAiAgentPillar() {
  const agents = entitiesByType("agent");

  const jsonLd = [
    {
      "@type": "WebPage",
      "@id": `${SITE.url}/best-ai-agent#webpage`,
      url: `${SITE.url}/best-ai-agent`,
      name: "Best AI Agents: Evidence-Backed Guide by Use Case",
      description: metadata.description,
      isPartOf: { "@id": `${SITE.url}/#site` },
      inLanguage: "en-IN"
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "BestAIAgent.in", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Best AI Agent", item: `${SITE.url}/best-ai-agent` }
      ]
    },
    {
      "@type": "ItemList",
      name: "Verified AI agent identities",
      numberOfItems: agents.length,
      itemListElement: agents.slice(0, 10).map((agent, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: agent.name,
        url: `${SITE.url}/agents/${agent.slug}`
      }))
    }
  ];

  return <div className="shell detail">
    <JsonLd data={jsonLd} />

    <section className="indiaHero">
      <div>
        <div className="heroBadge">✦ Best AI Agent authority pillar</div>
        <p className="eyebrow">Use case · evidence · India · MCP · verification</p>
        <h1 style={{ fontSize: "clamp(42px,6vw,68px)" }}>Find the best AI agent <span className="gradient">for a defined job, not a synthetic leaderboard.</span></h1>
        <p className="lead">BestAIAgent maps high-intent use cases to verified identities and evidence-backed authority pages. There is no universal winner: coding, business, content, research, India, MCP and local-deployment workflows require different evidence and operating boundaries.</p>
        <div className="directoryMeta">
          <span>{aiTopicClusterStats.clusters} mapped topic clusters</span>
          <span>{aiTopicClusterStats.searchTerms} search intents</span>
          <span>{publicEntities.length} verified public entities</span>
          <span>No pay-to-rank</span>
        </div>
        <div className="ctaRow">
          <Link className="button buttonPrimary" href="/agents">Browse verified agents</Link>
          <Link className="button" href="/compare">Compare evidence</Link>
          <Link className="button" href="/methodology">Read methodology</Link>
        </div>
      </div>
      <div className="indiaMap" aria-hidden="true"><div className="indiaMapShape">✦</div></div>
    </section>

    <section className="section">
      <div className="sectionHead"><div><p className="eyebrow">Direct answer</p><h2>What is the best AI agent?</h2><p>The best agent depends on the job, deployment boundary and evidence available for the fields that matter. BestAIAgent does not convert repository popularity, vendor marketing or a keyword match into a universal winner.</p></div></div>
      <div className="grid">{decisionSteps.map(([step,title,body]) => <article className="card" key={step}><div className="authorityType"><span>Decision step</span><b>{step}</b></div><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section className="section sectionAlt" style={{ marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)" }}>
      <div className="sectionHead"><div><p className="eyebrow">Verified graph</p><h2>Start from real agent identities</h2><p>These records pass the current identity-level publication gate. Identity evidence does not automatically verify pricing, security, MCP support, India billing or compliance.</p></div><Link href="/agents">View all agents →</Link></div>
      <div className="grid">{agents.slice(0, 6).map((entity) => <EntityCard key={entity.id} entity={entity} />)}</div>
    </section>

    <section className="section" id="intent-map">
      <div className="sectionHead"><div><p className="eyebrow">Intent architecture</p><h2>50 use-case clusters, one authority graph</h2><p>The search phrases below are research inputs. They are mapped to existing canonical surfaces rather than generating 50 thin landing pages. Claim-sensitive terms stay questions until field-level evidence supports an answer.</p></div></div>
      <div className="trustChips">
        <a href="#coding">Coding</a><a href="#business">Business</a><a href="#content">Content</a><a href="#research">Data & research</a><a href="#india">India, MCP & verification</a>
      </div>
    </section>

    {bucketOrder.map((bucket) => {
      const meta = aiBucketMeta[bucket];
      const clusters = clustersForBucket(bucket);
      return <section className="section" id={bucket} key={bucket}>
        <div className="sectionHead"><div><p className="eyebrow">{clusters.length} clusters · {clusters.length * 2} search intents</p><h2>{meta.title}</h2><p>{meta.description}</p></div></div>
        <div className="grid authorityGrid">
          {clusters.map((cluster) => <article className="card" key={cluster.id}>
            <div className="authorityType"><span>Cluster {cluster.id}</span><b>{cluster.claimSensitive ? "!" : "✦"}</b></div>
            <h3>{cluster.name}</h3>
            <p><strong>Primary intent:</strong> <span className="mono">{cluster.primaryQuery}</span></p>
            <p><strong>Long-tail intent:</strong> <span className="mono">{cluster.secondaryQuery}</span></p>
            {cluster.claimSensitive ? <p className="evidenceCallout">Evidence-sensitive: security, compliance, finance, deployment, billing, latency or similar material claims require primary field-level evidence before publication as facts.</p> : null}
            <p><Link href={cluster.canonicalTarget}>Open canonical evidence surface →</Link></p>
          </article>)}
        </div>
      </section>;
    })}

    <section className="section sectionAlt" style={{ marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)" }}>
      <div className="sectionHead"><div><p className="eyebrow">India-first differentiator</p><h2>India, MCP and verification need field-level evidence</h2><p>INR billing, UPI, DPDP-related controls, data residency, Indic-language support, local deployment and MCP compatibility are valuable buyer questions. BestAIAgent does not turn those questions into badges unless the exact field is supported by a qualified source.</p></div></div>
      <div className="grid">
        <article className="card"><h3>Indian and Indic AI</h3><p>Explore verified India-relevant model cards and India-specific evaluation without inferring sovereignty or compliance from geography.</p><Link href="/india">India evidence hub →</Link></article>
        <article className="card"><h3>Model Context Protocol</h3><p>Separate protocol support from generic integration claims. MCP server and client capabilities should be sourced from canonical upstream documentation.</p><Link href="/mcp">MCP authority hub →</Link></article>
        <article className="card"><h3>Evidence methodology</h3><p>Unknown stays unknown. Pricing, security, deployment and compliance can qualify independently from entity identity.</p><Link href="/methodology">Publication methodology →</Link></article>
      </div>
    </section>

    <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Next step</p><h2>Choose by task, then verify the fields that matter.</h2><p>Use categories to narrow the workflow, entity pages to confirm identity, comparisons to inspect evidence side-by-side, and methodology to understand what remains unknown.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/categories">Explore categories</Link><Link className="button" href="/agents">Verified agents</Link><Link className="button" href="/compare">Compare</Link></div></div></div></section>
  </div>;
}
