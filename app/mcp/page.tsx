import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { mcpServers } from "@/lib/mcp";
import {
  clustersForBucket,
  mcpBucketMeta,
  mcpTopicClusters,
  mcpTopicClusterStats,
  type McpIntentBucket
} from "@/lib/mcp-topic-clusters";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "MCP Servers & Model Context Protocol Guide",
  description: "Evidence-first MCP pillar covering servers, stdio and Streamable HTTP, authorization, India-specific evaluation, integrations, troubleshooting and 50 mapped search-intent clusters.",
  alternates: { canonical: "/mcp" },
  openGraph: { title: "MCP Servers & Model Context Protocol Guide", description: "A source-led MCP authority pillar with protocol references, server discovery, 50 intent clusters and evidence-safe India context.", url: `${SITE.url}/mcp` }
};

const bucketOrder: McpIntentBucket[] = ["commercial", "india", "agents", "integrations", "troubleshooting"];

const officialSources = [
  ["MCP specification", "https://modelcontextprotocol.io/specification/2025-11-25/basic", "JSON-RPC base protocol, lifecycle and core protocol structure."],
  ["MCP transports", "https://modelcontextprotocol.io/specification/2025-11-25/basic/transports", "Current standard transports: stdio and Streamable HTTP, including transport security requirements."],
  ["MCP authorization", "https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization", "Authorization requirements for HTTP-based transports, including OAuth-related requirements."],
  ["MCP server features", "https://modelcontextprotocol.io/specification/2025-11-25/server", "Official definitions for prompts, resources and tools exposed by MCP servers."],
  ["Official MCP Registry", "https://registry.modelcontextprotocol.io/", "Discovery surface for published MCP servers."],
  ["Reference servers", "https://github.com/modelcontextprotocol/servers", "Steering-group reference implementations; the upstream explicitly says they are educational examples, not production-ready solutions."]
] as const;

export default function Page() {
  const jsonLd = [
    {
      "@type": "WebPage",
      "@id": `${SITE.url}/mcp#webpage`,
      url: `${SITE.url}/mcp`,
      name: "MCP Servers & Model Context Protocol Guide",
      description: metadata.description,
      isPartOf: { "@id": `${SITE.url}/#site` },
      inLanguage: "en-IN"
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "BestAIAgent.in", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "MCP", item: `${SITE.url}/mcp` }
      ]
    }
  ];

  return <div className="shell detail">
    <JsonLd data={jsonLd} />

    <section className="indiaHero">
      <div>
        <div className="heroBadge">◇ Model Context Protocol authority pillar</div>
        <p className="eyebrow">Protocol · servers · transports · security · integrations</p>
        <h1 style={{ fontSize: "clamp(42px,6vw,68px)" }}>MCP servers and infrastructure, <span className="gradient">without invented rankings.</span></h1>
        <p className="lead">A source-led guide to Model Context Protocol architecture, server discovery, stdio and Streamable HTTP, authorization, India-specific evaluation, agent integrations and troubleshooting. Search intent is mapped separately from factual claims so queries never become unsupported badges.</p>
        <div className="directoryMeta">
          <span>{mcpTopicClusterStats.clusters} mapped topic clusters</span>
          <span>{mcpTopicClusterStats.searchTerms} high-intent search terms</span>
          <span>{mcpTopicClusterStats.buckets} intent buckets</span>
          <span>No pay-to-rank</span>
        </div>
        <div className="ctaRow">
          <Link className="button buttonPrimary" href="/mcp/servers">Browse MCP server routes</Link>
          <Link className="button" href="/what-is-mcp">What is MCP?</Link>
          <a className="button" href="https://registry.modelcontextprotocol.io/" target="_blank" rel="noreferrer">Official Registry ↗</a>
        </div>
      </div>
      <div className="indiaMap" aria-hidden="true"><div className="indiaMapShape">◇</div></div>
    </section>

    <section className="section">
      <div className="sectionHead"><div><p className="eyebrow">Direct answer</p><h2>What is Model Context Protocol?</h2><p>MCP is a client-host-server protocol built on JSON-RPC. Hosts coordinate client connections; each client maintains a connection to a server; servers can expose prompts, resources and tools. BestAIAgent keeps the protocol layer separate from product rankings so a server is evaluated against its actual upstream evidence.</p></div></div>
      <div className="grid">
        <article className="card"><div className="categoryIcon">⌘</div><h3>Host, client, server</h3><p>A host coordinates MCP clients and user authorization decisions. Each client manages a session with a particular server, while servers expose focused capabilities.</p><a href="https://modelcontextprotocol.io/specification/2025-11-25/architecture" target="_blank" rel="noreferrer">Official architecture ↗</a></article>
        <article className="card"><div className="categoryIcon">↔</div><h3>stdio</h3><p>For stdio transport, the client launches the server as a subprocess and exchanges newline-delimited JSON-RPC messages over standard input and output. Non-protocol output must not be written to stdout.</p><a href="https://modelcontextprotocol.io/specification/2025-11-25/basic/transports" target="_blank" rel="noreferrer">Transport specification ↗</a></article>
        <article className="card"><div className="categoryIcon">🌐</div><h3>Streamable HTTP</h3><p>Remote MCP uses an HTTP endpoint supporting POST and GET, with optional SSE streaming. The specification requires protections such as Origin validation and recommends authentication for connections.</p><a href="https://modelcontextprotocol.io/specification/2025-11-25/basic/transports" target="_blank" rel="noreferrer">Streamable HTTP ↗</a></article>
        <article className="card"><div className="categoryIcon">🔐</div><h3>Authorization</h3><p>HTTP-based authorization is defined separately from transport. Treat authentication, token handling and authorization as evidence-sensitive implementation details rather than a generic “secure MCP” badge.</p><a href="https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization" target="_blank" rel="noreferrer">Authorization specification ↗</a></article>
      </div>
    </section>

    <section className="section sectionAlt" style={{ marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)" }}>
      <div className="sectionHead"><div><p className="eyebrow">Discovery</p><h2>MCP server routes</h2><p>These routes preserve known MCP intent and source references. Source-linked or refreshing records are not promoted into “best” rankings until their canonical upstream, capabilities and relevant security facts are qualified.</p></div><Link href="/mcp/servers">Open directory →</Link></div>
      <div className="grid">{mcpServers.map((server) => <article className="card" key={server.slug}><span className="status">{server.status}</span><h3><Link href={`/mcp/servers/${server.slug}`}>{server.name}</Link></h3><p>{server.note}</p><a href={server.sourceUrl} target="_blank" rel="noreferrer">Upstream reference ↗</a></article>)}</div>
    </section>

    <section className="section">
      <div className="sectionHead"><div><p className="eyebrow">Topic cluster map</p><h2>50 MCP intent clusters, one canonical pillar</h2><p>The matrix is implemented as an intent registry, not 50 automatically generated landing pages. The two search terms on each card guide coverage and internal linking; they do not become factual claims by repetition.</p></div></div>
      <div className="trustChips"><a href="#commercial">Commercial</a><a href="#india">India</a><a href="#agents">Agents</a><a href="#integrations">Integrations</a><a href="#troubleshooting">Troubleshooting</a></div>
    </section>

    {bucketOrder.map((bucket) => {
      const meta = mcpBucketMeta[bucket];
      const clusters = clustersForBucket(bucket);
      return <section className="section" id={bucket} key={bucket}>
        <div className="sectionHead"><div><p className="eyebrow">{clusters.length} clusters · {clusters.length * 2} search terms</p><h2>{meta.title}</h2><p>{meta.description}</p></div></div>
        <div className="grid authorityGrid">{clusters.map((cluster) => <article className="card" key={cluster.id}>
          <div className="authorityType"><span>Cluster {cluster.id}</span><b>{cluster.claimSensitive ? "!" : "◇"}</b></div>
          <h3>{cluster.name}</h3>
          <p><strong>Primary intent:</strong> <span className="mono">{cluster.primaryQuery}</span></p>
          <p><strong>Long-tail intent:</strong> <span className="mono">{cluster.secondaryQuery}</span></p>
          {cluster.claimSensitive ? <p className="evidenceCallout">Claim-sensitive query: pricing, compliance, residency, performance, security or deployment assertions require field-level primary evidence before BestAIAgent presents them as facts.</p> : null}
        </article>)}</div>
      </section>;
    })}

    <section className="section sectionAlt" style={{ marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)" }}>
      <div className="sectionHead"><div><p className="eyebrow">India-first evaluation</p><h2>India intent is not an automatic compliance badge</h2><p>Queries around INR pricing, UPI, DPDP, data residency, Indic-language support, sovereign deployment and Indian providers are valuable research signals. BestAIAgent only marks those fields verified when the relevant vendor or primary legal/technical source supports the exact claim.</p></div></div>
      <div className="grid">
        <article className="card"><h3>DPDP and residency</h3><p>Do not infer compliance from local hosting, Indian ownership, encryption or self-hosting. Keep product-level compliance and residency fields unknown until specific evidence exists.</p><Link href="/india">India & Indic evidence hub →</Link></article>
        <article className="card"><h3>INR and UPI</h3><p>Localized billing claims are volatile commercial facts. Record exact plan, currency, payment method and retrieval date from a first-party pricing or checkout source.</p><Link href="/methodology">Evidence methodology →</Link></article>
        <article className="card"><h3>Local and air-gapped</h3><p>Deployment mode is distinct from security certification. A server can be locally runnable without being suitable for regulated or air-gapped production use.</p><Link href="/agents">Browse verified agent identities →</Link></article>
      </div>
    </section>

    <section className="section">
      <div className="sectionHead"><div><p className="eyebrow">Troubleshooting principles</p><h2>Start from the protocol boundary</h2><p>For MCP failures, separate transport framing, subprocess lifecycle, sessions, authorization, permissions and tool behavior before attributing the issue to the model or agent.</p></div></div>
      <div className="grid">
        <article className="card"><h3>stdio framing</h3><p>If a stdio client fails before the first request, inspect stdout first. The transport requires stdout to contain only valid MCP messages; diagnostics belong on stderr.</p></article>
        <article className="card"><h3>HTTP connection security</h3><p>For Streamable HTTP, inspect Origin validation, endpoint binding, authentication, TLS termination, protocol-version headers and session handling independently.</p></article>
        <article className="card"><h3>Permissions before retries</h3><p>Filesystem, database and API failures can be authorization or scope problems rather than transient tool-call errors. Preserve the original error and verify the resource boundary before adding retries.</p></article>
      </div>
    </section>

    <section className="section sectionAlt" style={{ marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)" }}>
      <div className="sectionHead"><div><p className="eyebrow">Primary references</p><h2>Read the protocol and registry upstream</h2><p>BestAIAgent commentary is secondary to the protocol specification and canonical server sources.</p></div></div>
      <div className="grid">{officialSources.map(([name,url,note]) => <article className="card" key={url}><h3>{name}</h3><p>{note}</p><a href={url} target="_blank" rel="noreferrer">{url} ↗</a></article>)}</div>
    </section>

    <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Next paths</p><h2>Move from protocol intent to evidence.</h2><p>Use the server directory for source-linked implementations, the agent and framework directories for client-side consumers, and methodology pages for publication rules.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/mcp/servers">MCP servers</Link><Link className="button" href="/frameworks">Frameworks</Link><Link className="button" href="/methodology">Methodology</Link></div></div></div></section>
  </div>;
}
