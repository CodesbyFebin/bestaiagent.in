import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { entitiesByType } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Indian AI: Models, Companies, Research, Policy & Developer Resources",
  description: "Evidence-first guide to India's AI ecosystem: IndiaAI Mission, AIKosh, BHASHINI, Indian and Indic models, research labs, developer resources and DPDP policy references.",
  alternates: { canonical: "/indian-ai" },
  openGraph: {
    title: "Indian AI Ecosystem — Evidence-First Guide | BestAIAgent.in",
    description: "Explore Indian AI models, research, government initiatives, datasets, developer resources and source-linked ecosystem organizations.",
    url: `${SITE.url}/indian-ai`,
    type: "article"
  }
};

const references = [
  { name: "IndiaAI Mission — MeitY", href: "https://www.meity.gov.in/indiaai-mission", note: "Government of India mission overview and programme authority." },
  { name: "AIKosh — IndiaAI", href: "https://aikosh.indiaai.gov.in/", note: "National platform for AI-ready datasets, models, toolkits and development resources." },
  { name: "BHASHINI", href: "https://bhashini.gov.in/", note: "National Language Translation Mission and Indian-language digital public infrastructure." },
  { name: "AI4Bharat — IIT Madras", href: "https://ai4bharat.iitm.ac.in/", note: "Indian-language AI research lab, datasets, models and tools." },
  { name: "IndiaAI FutureSkills", href: "https://fellowship.indiaai.gov.in/", note: "IndiaAI fellowship and future-skills programme." },
  { name: "DPDP Rules 2025 — MeitY", href: "https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa", note: "Official MeitY source for the Digital Personal Data Protection Rules, 2025 and related notifications." },
  { name: "Sarvam AI", href: "https://www.sarvam.ai/", note: "First-party company source for Sarvam AI." },
  { name: "Krutrim", href: "https://olakrutrim.com/", note: "First-party company source for Krutrim AI." }
] as const;

const ecosystemCards = [
  { title: "IndiaAI Mission", label: "Government programme", body: "The national mission spans compute, innovation, datasets, application development, future skills, startup financing, and safe and trusted AI. This page links to the official mission rather than summarising unsupported budget or deployment claims.", href: "https://www.meity.gov.in/indiaai-mission" },
  { title: "AIKosh", label: "Datasets & development resources", body: "IndiaAI's national platform for AI-ready datasets, models, toolkits and development resources. Use it as a primary discovery point for public-sector and research data.", href: "https://aikosh.indiaai.gov.in/" },
  { title: "BHASHINI", label: "Language infrastructure", body: "A national language-technology mission focused on digital access and services in Indian languages. It is relevant to translation, speech and multilingual application development.", href: "https://bhashini.gov.in/" },
  { title: "AI4Bharat", label: "Research", body: "IIT Madras research lab focused on Indian-language AI, including translation, transliteration, speech, language models, datasets and open-source tooling.", href: "https://ai4bharat.iitm.ac.in/" }
] as const;

const internalHubs = [
  ["/india", "India & Indic model hub", "Verified India-relevant model cards from the BestAIAgent public evidence graph."],
  ["/models", "AI model directory", "Browse all public model cards and source-linked model facts."],
  ["/local-llm-benchmarks-india", "Local LLM benchmark methodology", "How India-local benchmark claims should be reproduced before publication."],
  ["/agents", "Verified AI agents", "Explore agent identities that pass the public evidence gate."],
  ["/mcp", "MCP infrastructure", "Understand Model Context Protocol and its role in agent-tool interoperability."],
  ["/mcp/servers", "MCP server directory", "Source-linked MCP server discovery with fail-closed indexing."],
  ["/research", "Research hub", "Research notes, source trails and evidence-first editorial work."],
  ["/methodology", "Verification methodology", "How BestAIAgent separates discovery, source-linking and verified publication."]
] as const;

export default function IndianAIPage() {
  const indiaModels = entitiesByType("model").filter((entity) => Boolean(entity.indiaRelevance));

  const jsonLd = [
    {
      "@type": "WebPage",
      name: "Indian AI: Models, Companies, Research, Policy & Developer Resources",
      url: `${SITE.url}/indian-ai`,
      description: metadata.description,
      about: ["Indian artificial intelligence", "IndiaAI Mission", "Indian language AI", "AIKosh", "BHASHINI", "AI4Bharat"]
    },
    {
      "@type": "ItemList",
      name: "Verified India-relevant AI model cards",
      itemListElement: indiaModels.map((model, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: model.name,
        url: `${SITE.url}/models/${model.slug}`
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "BestAIAgent.in", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Indian AI", item: `${SITE.url}/indian-ai` }
      ]
    }
  ];

  return (
    <div className="shell detail">
      <JsonLd data={jsonLd} />

      <section className="indiaHero">
        <div>
          <div className="heroBadge">🇮🇳 Indian AI authority pillar</div>
          <p className="eyebrow">India-first · globally useful · evidence-first</p>
          <h1 style={{ fontSize: "clamp(42px,6vw,68px)" }}>Indian AI: <span className="gradient">models, research, policy and infrastructure</span></h1>
          <p className="lead">A source-linked guide to India's AI ecosystem for developers, founders, enterprise teams and researchers. It connects verified model cards inside BestAIAgent.in with official government programmes, language infrastructure, research labs, datasets and policy references.</p>
          <div className="directoryMeta">
            <span>{indiaModels.length} verified India-relevant model cards</span>
            <span>Primary government and research references</span>
            <span>No inferred compliance or sovereignty badges</span>
          </div>
          <div className="ctaRow">
            <Link className="button buttonPrimary" href="/india">Browse Indic model cards</Link>
            <a className="button" href="https://www.meity.gov.in/indiaai-mission" target="_blank" rel="noreferrer">Official IndiaAI Mission ↗</a>
          </div>
        </div>
        <div className="indiaMap" aria-hidden="true"><div className="indiaMapShape">🇮🇳</div></div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">Landscape</p><h2>How to read India's AI ecosystem</h2><p>BestAIAgent treats the ecosystem as connected layers rather than a single leaderboard: public infrastructure, private companies, research labs, models, datasets, developer tooling and regulation all have different evidence requirements.</p></div></div>
        <div className="grid">
          {ecosystemCards.map((item) => <article className="card" key={item.title}><span className="status">{item.label}</span><h3>{item.title}</h3><p>{item.body}</p><a href={item.href} target="_blank" rel="noreferrer">Open primary source ↗</a></article>)}
        </div>
      </section>

      <section className="section sectionAlt" style={{ marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)" }}>
        <div className="sectionHead"><div><p className="eyebrow">Models & builders</p><h2>Verified Indian and Indic model work</h2><p>These internal records already pass BestAIAgent's public evidence gate. Publisher-reported benchmarks remain labelled as publisher-reported; India relevance does not imply DPDP compliance, data residency or security certification.</p></div><Link href="/models" className="button">All models</Link></div>
        <div className="grid">
          {indiaModels.map((model) => <article className="card" key={model.id}><span className="status">Verified model card</span><h3>{model.name}</h3><p>{model.summary}</p><div className="tagRow"><span>{model.developer}</span><span>India / Indic relevance</span></div><Link href={`/models/${model.slug}`}>Read evidence-backed model card →</Link></article>)}
        </div>
        <div className="discoveryBand" style={{ marginTop: 24 }}><div className="discoveryBandGrid"><div><p className="eyebrow">Company discovery</p><h2>Start with first-party sources.</h2><p>For company-level claims, use Sarvam AI and Krutrim's first-party sites. BestAIAgent only promotes company capabilities, pricing or compliance status after the relevant claim has its own evidence.</p></div><div className="ctaRow"><a className="button" href="https://www.sarvam.ai/" target="_blank" rel="noreferrer">Sarvam AI ↗</a><a className="button" href="https://olakrutrim.com/" target="_blank" rel="noreferrer">Krutrim ↗</a></div></div></div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">Research & development</p><h2>Indian-language AI is a major research axis</h2><p>AI4Bharat at IIT Madras publishes work across transliteration, machine translation, automatic speech recognition, speech synthesis, language models, datasets and evaluation. BestAIAgent links this research layer to model-level evidence instead of converting research claims into commercial rankings.</p></div></div>
        <div className="grid">
          <article className="card"><div className="categoryIcon">अ</div><h3>Language models</h3><p>Track Indian-language and Indic-focused models, including the verified Sarvam, OpenHathi, Airavata and Krutrim records already in the public graph.</p><Link href="/india">Open India model hub →</Link></article>
          <article className="card"><div className="categoryIcon">⌁</div><h3>Speech & translation</h3><p>Use AI4Bharat and BHASHINI as primary research and public-infrastructure starting points for Indian-language speech, translation and transliteration.</p><a href="https://ai4bharat.iitm.ac.in/" target="_blank" rel="noreferrer">AI4Bharat research ↗</a></article>
          <article className="card"><div className="categoryIcon">◇</div><h3>Evaluation</h3><p>Language, cultural context, code-switching and safety need India-relevant evaluation. BestAIAgent's benchmark pages remain methodology-first unless reproducible evidence is available.</p><Link href="/local-llm-benchmarks-india">Read benchmark methodology →</Link></article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">Government initiatives & policy</p><h2>Use official sources for mission and compliance claims</h2><p>The IndiaAI Mission provides the national AI programme framework. BHASHINI addresses Indian-language digital infrastructure. The DPDP Rules 2025 and related MeitY notifications are the right starting point for data-protection analysis.</p></div></div>
        <div className="grid">
          <article className="card"><h3>IndiaAI Mission</h3><p>Official mission material describes seven pillars covering compute, innovation, datasets, application development, future skills, startup financing, and safe and trusted AI.</p><a href="https://www.meity.gov.in/indiaai-mission" target="_blank" rel="noreferrer">MeitY mission page ↗</a></article>
          <article className="card"><h3>BHASHINI</h3><p>National Language Translation Mission infrastructure for language access and Indian-language digital services.</p><a href="https://bhashini.gov.in/" target="_blank" rel="noreferrer">BHASHINI official site ↗</a></article>
          <article className="card"><h3>DPDP references</h3><p>BestAIAgent does not label a vendor "DPDP compliant" merely because it is Indian, local, encrypted or self-hostable. Product-level compliance claims require product-level evidence and legal context.</p><a href="https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa" target="_blank" rel="noreferrer">MeitY DPDP Rules 2025 ↗</a></article>
        </div>
      </section>

      <section className="section sectionAlt" style={{ marginInline: "calc(50% - 50vw)", paddingInline: "calc(50vw - 50%)" }}>
        <div className="sectionHead"><div><p className="eyebrow">Developer resources</p><h2>Build with primary datasets, tools and documentation</h2><p>A practical starting stack for developers building India-relevant AI products.</p></div></div>
        <div className="grid">
          <article className="card"><h3>AIKosh</h3><p>Discover national AI datasets, models, toolkits and development resources.</p><a href="https://aikosh.indiaai.gov.in/" target="_blank" rel="noreferrer">Browse AIKosh ↗</a></article>
          <article className="card"><h3>AI4Bharat tools</h3><p>Open research tooling and resources for transliteration, translation, speech and Indian-language AI.</p><a href="https://ai4bharat.iitm.ac.in/tools/" target="_blank" rel="noreferrer">Browse tools ↗</a></article>
          <article className="card"><h3>IndiaAI FutureSkills</h3><p>Official IndiaAI programme for AI education, research and fellowship pathways.</p><a href="https://fellowship.indiaai.gov.in/" target="_blank" rel="noreferrer">FutureSkills ↗</a></article>
          <article className="card"><h3>MCP for Indian AI stacks</h3><p>Use BestAIAgent's MCP hub to connect agent reasoning layers to databases, files and enterprise systems without inventing vendor capability claims.</p><Link href="/mcp">Explore MCP →</Link></article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">Implementation paths</p><h2>Documented ecosystem examples, not invented case studies</h2><p>Until a deployment has a citable primary case study, BestAIAgent treats it as an implementation pattern rather than a success story.</p></div></div>
        <div className="grid">
          <article className="card"><h3>Multilingual public services</h3><p>BHASHINI provides a public-infrastructure reference point for Indian-language translation and language access. Teams can evaluate it alongside research tools from AI4Bharat.</p><a href="https://bhashini.gov.in/" target="_blank" rel="noreferrer">Primary reference ↗</a></article>
          <article className="card"><h3>National datasets</h3><p>AIKosh exposes a growing catalogue of AI-ready resources. Dataset suitability, licensing, visibility and quality should be checked at the individual dataset level.</p><a href="https://aikosh.indiaai.gov.in/" target="_blank" rel="noreferrer">Explore datasets ↗</a></article>
          <article className="card"><h3>Local model evaluation</h3><p>Use the verified model cards on BestAIAgent together with reproducible local benchmark methodology before making latency, quality, cost or sovereignty claims.</p><Link href="/local-llm-benchmarks-india">Evaluation methodology →</Link></article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">BestAIAgent internal graph</p><h2>Continue through the authority network</h2><p>This pillar is designed as the top-level India ecosystem node. It points users into narrower verified directories instead of generating dozens of thin keyword permutations.</p></div></div>
        <div className="grid">
          {internalHubs.map(([href, title, body]) => <article className="card" key={href}><h3>{title}</h3><p>{body}</p><Link href={href}>Open on BestAIAgent.in →</Link></article>)}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead"><div><p className="eyebrow">Reference URLs</p><h2>Primary and first-party sources used by this pillar</h2><p>These links are intentionally visible so readers can verify the institutional, policy and company context independently.</p></div></div>
        <div className="grid">
          {references.map((ref) => <article className="card" key={ref.href}><h3>{ref.name}</h3><p>{ref.note}</p><a href={ref.href} target="_blank" rel="noreferrer">{ref.href} ↗</a></article>)}
        </div>
      </section>

      <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Next step</p><h2>Explore the India evidence graph.</h2><p>Start with verified India-relevant model cards, then move into agents, MCP infrastructure, research and methodology. New company, policy and case-study claims should graduate only when their evidence is strong enough.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/india">Indic model hub</Link><Link className="button" href="/agents">AI agents</Link><Link className="button" href="/research">Research</Link></div></div></div></section>
    </div>
  );
}
