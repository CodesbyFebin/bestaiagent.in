export const categories = [
  ["coding-agents", "Coding agents", "Coding and software-engineering agents with source-linked identity and evidence status."],
  ["voice-bots", "Voice agents", "Voice-agent platforms. Pricing and latency are unknown unless directly sourced."],
  ["orchestration", "Orchestration", "Agent frameworks and orchestration systems."],
  ["business", "Business agents", "Agent platforms used in business workflows. No pay-to-rank ordering."],
  ["crm", "CRM agents", "AI-agent tooling around CRM workflows; field-level verification is required for product claims."],
  ["customer-support", "Customer support agents", "Customer-support agent tooling with source-linked records."],
  ["sales", "Sales agents", "Sales workflow agent tooling. Results and ROI are not estimated without evidence."],
  ["marketing", "Marketing agents", "Marketing workflow tooling. No fabricated performance claims."],
  ["research", "Research agents", "Research and browsing agents with source-linked identity."],
  ["automation", "Automation agents", "Workflow automation and agent orchestration tools."]
] as const;

export const legacyPages: Record<string, { title: string; description: string; body: string[]; index: boolean; evidenceIds?: string[]; aeo?: { question: string; answer: string }; pricingItems?: { name: string; price: string; tax?: string; billing?: string; payment?: string; note?: string }[]; seeAlso?: { href: string; label: string }[] }> = {
  "best-ai-agent": {
    title: "How to choose the best AI agent",
    description: "Evidence-first checklist for selecting an AI agent without relying on synthetic scores.",
    body: ["There is no universal best AI agent. Start with the task, deployment boundary, model/provider requirements, tool permissions, human approval points and verifiable operating constraints.", "BestAIAgent.in no longer publishes a universal numeric winner unless a reproducible evaluation methodology and underlying evidence are available."],
    index: true
  },
  "best-ai-agent-for-business": {
    title: "AI agents for business: evaluation checklist",
    description: "A practical, source-led framework for evaluating AI agents for business workflows.",
    body: ["For business use, verify data handling, deployment, integrations, authorization, auditability and total operating cost from primary sources.", "Compliance labels are not inferred from popularity, self-hosting, or vendor category."],
    index: true
  },
  "best-ai-agent-for-coding": {
    title: "Coding agents: evidence-first directory",
    description: "Compare coding-agent identities, deployment surfaces and source evidence.",
    body: ["Use the coding-agent directory to inspect primary repositories and source status. Feature-level claims stay unknown until verified.", "Start with OpenHands, Cline, Aider, Gemini CLI and Qwen Code in the verified graph."],
    index: true
  },
  "best-ai-agent-alternatives": {
    title: "AI agent directories and discovery alternatives",
    description: "How to compare AI-agent discovery products and open catalogs without fake leaderboards.",
    body: ["Discovery sites differ in breadth, editorial depth, source provenance and whether rankings are reproducible.", "BestAIAgent.in is designed around entity identity, primary-source evidence, explicit unknowns and crawlable canonical pages."],
    index: true
  },
  "best-ai-agents-for-automation": {
    title: "AI agents for automation",
    description: "Evidence-first guide to automation agents and orchestration frameworks.",
    body: ["Automation spans workflow tools, browser agents, code agents and multi-agent frameworks.", "Choose by concrete integration requirements and source-backed deployment constraints rather than a universal score."],
    index: true
  },
  "rankings": {
    title: "Rankings policy",
    description: "Why BestAIAgent.in does not publish synthetic AI-agent leaderboards.",
    body: ["The previous build contained numeric ratings that did not have a complete reproducible evidence chain. They are intentionally not migrated.", "When a future benchmark exists, the methodology, inputs, versions, hardware, prompts, outputs and scoring code must be public enough to reproduce."],
    index: true
  },
  "pricing": {
    title: "AI agent pricing evidence",
    description: "Pricing tracker policy: source, retrieval date and plan context required.",
    body: ["Pricing changes quickly. This site treats price as a high-freshness field and does not convert currencies or claim India billing support without a dated primary source.", "Use official pricing links on entity pages for current values."],
    index: true
  },
  "cursor-pricing": {
    title: "Cursor Pricing in India (2026): ₹649 Start Plan, Pro & UPI Billing",
    description: "Current Cursor pricing with dated primary-source evidence: the India-only Cursor Start plan at ₹649/month tax-inclusive billed in INR via UPI, and Pro/Pro Plus/Ultra plans in USD.",
    body: [
      "Retrieved 2026-08-20 from Cursor's first-party models-and-pricing documentation. Pricing is a high-freshness field — verify at the source before any procurement decision.",
      "Cursor now offers an India-specific individual plan called Cursor Start: ₹649 per month, tax-inclusive, billed monthly in INR. It is available strictly to developers in India and accepts UPI, credit card, or debit card. Every other individual Cursor plan displays its price before tax.",
      "For comparison, the global individual plans are Pro at $20/month, Pro Plus at $60/month, and Ultra at $200/month, all billed before tax. Teams plans are Standard at $40/user/month and Premium at $120/user/month.",
      "Cursor Start's INR, tax-inclusive, UPI-supported billing means Indian developers do not need a foreign-currency card to start. Pro/Pro Plus/Ultra remain USD-denominated, so treat any INR figure other than ₹649 as a manual currency conversion rather than an official Cursor price."
    ],
    index: true,
    evidenceIds: ["ev-cursor-pricing-india"],
    pricingItems: [
      { name: "Cursor Start (India only)", price: "₹649/mo", tax: "tax inclusive", billing: "monthly in INR", payment: "UPI, credit or debit card", note: "Available strictly to developers in India" },
      { name: "Pro", price: "$20/mo", tax: "before tax" },
      { name: "Pro Plus", price: "$60/mo", tax: "before tax" },
      { name: "Ultra", price: "$200/mo", tax: "before tax" },
      { name: "Teams Standard", price: "$40/user/mo", billing: "per user" },
      { name: "Teams Premium", price: "$120/user/mo", billing: "per user" }
    ],
    seeAlso: [{ href: "/agents/cursor", label: "Cursor — verified agent identity" }]
  },
  "github-copilot-pricing": {
    title: "GitHub Copilot Pricing (2026): Free, Pro, Pro+ and Max Plans",
    description: "Verified GitHub Copilot individual plan prices from GitHub's first-party plans page: Free $0, Pro $10, Pro+ $39, Max $100 per user per month.",
    body: [
      "Retrieved 2026-08-20 from GitHub's official Copilot plans page. Vendor pricing changes; verify at GitHub before procurement.",
      "GitHub Copilot's public individual tiers are: Free at $0 per month for getting started, Pro at $10 per user per month for everyday coding with agents, Pro+ at $39 per user per month for more complex development, and Max at $100 per user per month for sustained, high-volume agent workflows.",
      "Copilot Business and Copilot Enterprise bill per seat per month but their per-seat amounts are published separately on GitHub; this page does not assert specific Business/Enterprise figures because they were not surfaced on the individual plans page. Check GitHub for current organizational pricing.",
      "BestAIAgent.in does not convert USD plan prices into INR; the only India-specific Cursor (vendor) plan price on this site is Cursor Start's ₹649/month, surfaced on the /cursor-pricing page."
    ],
    index: true,
    evidenceIds: ["ev-github-copilot-pricing"],
    pricingItems: [
      { name: "Free", price: "$0/mo", note: "For getting started" },
      { name: "Pro", price: "$10/user/mo", note: "Everyday coding with agents" },
      { name: "Pro+", price: "$39/user/mo", note: "More complex development" },
      { name: "Max", price: "$100/user/mo", note: "Sustained, high-volume agent workflows" }
    ]
  },
  "claude-code-pricing": {
    title: "Claude Code & Claude Pricing (2026): Pro, Max and Code Inclusion",
    description: "Verified Anthropic Claude plan prices: Free $0, Pro $20/month (or ~$17/month billed annually), Max from $100/month. Claude Code is included with all paid Claude plans.",
    body: [
      "Retrieved 2026-08-20 from Anthropic's first-party Claude pricing page. Vendor pricing changes; verify at claude.com before procurement.",
      "Anthropic's public Claude tiers are: Free at $0 per month, Pro at $20 per month — or effectively ~$17 per month when billed annually at $200 upfront — and Max starting from $100 per month, with higher-usage Max (20x) tiers available above the base Max (5x) entry point.",
      "Claude Code, Anthropic's CLI/terminal coding agent, is included with all paid Claude plans and shares the same usage limits as the rest of the plan. When usage limits are reached, usage credits at standard API rates or pay-as-you-go Console credits may be enabled rather than hard-stopping work.",
      "This page does not assert a fixed INR price for Claude or Claude Code; the only India-specific vendor plan price published on this site is Cursor Start's ₹649/month (see /cursor-pricing)."
    ],
    index: true,
    evidenceIds: ["ev-claude-code-pricing"],
    pricingItems: [
      { name: "Free", price: "$0/mo" },
      { name: "Pro", price: "$20/mo", note: "or ~$17/mo billed annually ($200 upfront)" },
      { name: "Max (5x)", price: "From $100/mo", note: "Higher 20x usage tier available" }
    ],
    seeAlso: [{ href: "/cursor-pricing", label: "Cursor pricing (India ₹649 plan)" }]
  },
  "reviews": {
    title: "Reviews and evidence",
    description: "BestAIAgent.in separates verified facts, source-linked facts and editorial analysis.",
    body: ["A review may include editorial interpretation, but factual fields must map to evidence records.", "No paid placement influences evidence status or directory ordering."],
    index: true
  },
  "sitemap": {
    title: "HTML sitemap",
    description: "Browse the main BestAIAgent.in authority graph.",
    body: ["Core surfaces: Agents, Models, Frameworks, Providers, India AI, MCP, Comparisons, Research and Methodology.", "Machine-readable sitemap: /sitemap.xml."],
    index: true
  },
  "about": {
    title: "About BestAIAgent.in",
    description: "Independent evidence-first AI agent and model authority graph.",
    body: ["BestAIAgent.in is an India-built directory and knowledge graph for AI agents, models, frameworks, providers and MCP infrastructure.", "The core editorial rule is simple: unknown stays unknown."],
    index: true
  },
  "authors": {
    title: "Authors and review responsibility",
    description: "Editorial ownership and evidence-review policy.",
    body: ["Articles and entity records should identify editorial responsibility when substantive analysis is added.", "Automated ingestion can discover candidates, but discovery is not publication."],
    index: true
  },
  "methodology": {
    title: "Evidence methodology",
    description: "How entities move from discovery to public indexability.",
    body: ["Discovery → normalization → evidence → verification → publication → indexability.", "A verified entity requires at least one valid primary-authority evidence snapshot with retrieval time and SHA-256. Field-level claims can remain unknown."],
    index: true
  },
  "editorial-policy": {
    title: "Editorial policy",
    description: "Fail-closed publication and no fabricated authority.",
    body: ["No synthetic ratings, testimonials, market-share figures, compliance badges or benchmark winners are published without supporting evidence.", "Editorial judgments are labeled and kept separate from source-derived facts."],
    index: true
  },
  "review-process": {
    title: "Review process",
    description: "How BestAIAgent.in reviews source evidence.",
    body: ["Primary sources are preferred for identity, licensing, product status and model-card facts.", "High-volatility fields such as pricing require more frequent refreshes than stable identity fields."],
    index: true
  },
  "corrections": {
    title: "Corrections",
    description: "How to report a material error or submit better evidence.",
    body: ["Corrections should identify the entity, field, proposed value and primary source URL.", "Superseded evidence should remain auditable rather than being silently rewritten."],
    index: true
  },
  "privacy-policy": {
    title: "Privacy policy",
    description: "BestAIAgent.in privacy overview.",
    body: ["The public directory is designed to work without requiring user accounts.", "Operational analytics, if enabled, should be minimized and documented."],
    index: true
  },
  "terms": {
    title: "Terms",
    description: "BestAIAgent.in site terms.",
    body: ["Information is provided for research and comparison. Verify vendor terms, licenses and pricing at the original source before making procurement or deployment decisions."],
    index: true
  },
  "affiliate-disclosure": {
    title: "Affiliate disclosure",
    description: "Commercial relationship disclosure policy.",
    body: ["The evidence graph does not sell verification or ranking position.", "If affiliate relationships are introduced, they must be disclosed on the affected page and may not change evidence status."],
    index: true
  },
  "contact": {
    title: "Contact and corrections",
    description: "Contact BestAIAgent.in for corrections and evidence submissions.",
    body: ["Submit corrections with a source URL and the exact field that needs review.", "Repository issues can also be used for reproducible evidence corrections."],
    index: true
  },
  "knowledge-graph": {
    title: "AI entity knowledge graph",
    description: "How agents, models, frameworks, providers and evidence connect.",
    body: ["The authority layer models entities and relationships rather than generating pages from keyword permutations.", "Every public detail route should be reachable through normal internal links and machine-readable feeds."],
    index: true
  },
  "local-llm-benchmarks-india": {
    title: "Local LLM serving in India: benchmark methodology",
    description: "Ollama, vLLM and local inference guidance without unsupported synthetic benchmark numbers.",
    body: ["The historical draft contained performance numbers compiled from mixed sources. Those numbers are not migrated as BestAIAgent.in benchmark facts.", "A future India benchmark should publish hardware, model, quantization, concurrency, prompt set, software version, power measurement and raw outputs before declaring a performance winner.", "For now, this page acts as a reproducibility checklist and links to verified Indian model cards."],
    index: true
  },
  "best-ai-agent-builder": {
    title: "AI agent builders",
    description: "Agent-building frameworks and platforms organized by verifiable source identity.",
    body: ["Start with frameworks, tool protocols and deployment requirements. Builder pages are linked to primary source identities when available."],
    index: true
  },
  "silos": {
    title: "AI agent knowledge silos",
    description: "Topical hubs across coding, research, browser, business and automation agents.",
    body: ["Silos are navigation aids, not automatically generated SEO pages. A silo should exist only when there is enough distinct, useful content to justify it."],
    index: true
  },
  "silos/builders": {
    title: "AI agent builder silo",
    description: "Builder-oriented agent frameworks, MCP infrastructure and development tools.",
    body: ["This hub connects framework, MCP and coding-agent content without duplicating canonical entity pages."],
    index: true
  },
  "crewai-full-form": {
    title: "What does CrewAI stand for? Full form and framework definition",
    description: "CrewAI is the framework's product name; CrewAI does not publish an expanded acronym. Core primitives: Agent, Crew, Flow, Task, Process, Tool.",
    body: [
      "CrewAI is the name of the multi-agent Python framework, not an official acronym with a documented expanded form. CrewAI's first-party documentation describes the framework as building collaborative AI agents, crews and flows — production ready from day one, and does not present a backronym such as Crew Artificial Intelligence.",
      "The core conceptual primitives CrewAI introduces are Agent (compose agents with tools, memory, knowledge, and structured outputs), Crew (the central orchestration unit that brings agents and tasks together), Flow (orchestrate start/listen/router steps and manage stateful long-running workflows), and Task paired with Process (define sequential, hierarchical or hybrid execution with guardrails and human-in-the-loop).",
      "So if you came here looking for the CrewAI full form, the short answer is: CrewAI has no documented expanded acronym. Use the in-text answer above for attributed citations; for the underlying source, verify against CrewAI's official documentation."
    ],
    index: true,
    evidenceIds: ["ev-crewai-definition"],
    aeo: { question: "What does CrewAI stand for / what is the full form of CrewAI?", answer: "CrewAI is the name of the multi-agent framework, not an official acronym with a documented expanded full form; crew AI's official documentation presents its core primitives as Agent, Crew, Flow, Task and Process." },
    seeAlso: [{ href: "/frameworks/crewai", label: "CrewAI — framework evidence page" }]
  },
  "best-free-ai-agents": {
    title: "Best free AI agents (2026): open-source coding, research and automation tools",
    description: "An evidence-first shortlist of free and open-source AI agents — including repository-backed coding agents, research agents and browser/automation tooling — without fabricated rankings.",
    body: [
      "Free and open-source AI agents are listed here only when repository identity is verified. The page deliberately does not rank agents by popularity or assign a universal numeric score.",
      "Verified open-source coding agents currently in the graph include OpenHands, Cline, Aider, Gemini CLI and Qwen Code. Each has a public upstream repository recorded as evidence rather than inferred from marketing.",
      "For research and automation, GPT Researcher and Browser Use are open-source projects with public upstream repositories. Treat capability and performance claims as unknown until reproduced; see the methodology page for the discovery-to-publication pipeline."
    ],
    index: true,
    seeAlso: [{ href: "/agents", label: "All verified agents" }, { href: "/methodology", label: "Evidence methodology" }]
  },
  "what-is-mcp": {
    title: "What is MCP? The Model Context Protocol, explained",
    description: "MCP (Model Context Protocol) is an open standard for connecting AI agents to tools, data sources and resources. Explainer covering clients, servers, transports and India-relevant use cases.",
    body: [
      "MCP — the Model Context Protocol — is an open standard for connecting AI assistants and agents to external tools, data sources and resources in a standardised, auditable way. It separates a client (the assistant or agent runtime) from servers (the integrations that expose tools, prompts and resources).",
      "An MCP server registers tools, prompts and resources that the client can call. Tool calls return results the agent can act on; resources expose data the agent can read; prompts expose reusable templates. Transports include stdio for local servers and HTTP/SSE for remote servers.",
      "On this site the MCP directory lists servers with source-linked identities. Qualified servers appear on the candidates sitemap; unverified MCP detail routes are kept out of indexable XML until canonical upstreams are confirmed.",
      "India-relevant MCP use cases include local-language tooling, DPDP-aware data handling and self-hostable servers — none of which are inferred without a dated primary source."
    ],
    index: true,
    seeAlso: [{ href: "/mcp", label: "MCP hub" }, { href: "/mcp/servers", label: "MCP server directory" }]
  },
  "ai-agent-benchmarks": {
    title: "AI agent benchmarks: methodology before scores",
    description: "Why BestAIAgent.in does not publish synthetic AI-agent benchmark numbers, and what a reproducible AI-agent benchmark must include.",
    body: [
      "BestAIAgent.in does not publish synthetic AI-agent benchmark numbers without a reproducible methodology. The historical numeric comparisons were not migrated because the underlying prompts, inputs and scoring code were not public enough to reproduce.",
      "A reproducible AI-agent benchmark should publish task set, inputs, versions, model identifiers, hardware, prompts, outputs, scoring code and run environment. Leaderboard claims that omit these cannot be independently validated and are not surfaced as facts.",
      "For India-specific local-LLM serving, the local-llm-benchmarks-india page acts as a reproducibility checklist and links to verified model cards. Use the Agents directory for repository-backed identities and the Compare section for evidence-ready comparisons."
    ],
    index: true,
    seeAlso: [{ href: "/methodology", label: "Evidence methodology" }, { href: "/local-llm-benchmarks-india", label: "Local LLM benchmarks in India" }]
  },
  "ai-agent-market-map": {
    title: "AI agent market map: an evidence-first taxonomy",
    description: "A taxonomy of the AI-agent ecosystem across coding, research, browser, orchestration, voice and India/Indic tooling — organised by verified entity identity rather than synthetic market-share estimates.",
    body: [
      "This market map is organised by verified entity identity, not synthetic market-share estimates. The ecosystem is broken into coding agents, research agents, browser/automation agents, orchestration frameworks, voice platforms, models and providers.",
      "Within coding agents, repository-verified open-source projects include OpenHands, Cline, Aider, Gemini CLI and Qwen Code. Within orchestration, LangGraph, LangChain, Microsoft Agent Framework, AutoGen and CrewAI are repository-verified frameworks.",
      "The India/Indic layer tracks Sarvam, AI4Bharat and Krutrim — all source-linked — without inferring compliance badges, sovereignty claims or market share from popularity. Unverified local vendors remain source-linked rather than verified.",
      "Use the Agents, Models, Frameworks, Providers, India and MCP sections for the underlying entity pages. The map exists to navigate the graph rather than to declare winners."
    ],
    index: true,
    seeAlso: [{ href: "/agents", label: "Agents" }, { href: "/frameworks", label: "Frameworks" }, { href: "/india", label: "India AI" }, { href: "/mcp", label: "MCP" }]
  },
  "glossary-hub": {
    title: "AI agent glossary hub",
    description: "Canonical AI-agent terminology hub: MCP, agentic workflows, Crews, Flows, evidence verification and other terms used across BestAIAgent.in.",
    body: [
      "The glossary hub centralises the terms used across the BestAIAgent.in authority graph. Definitions are short and attributed to their canonical page rather than repeated verbatim across thin pages.",
      "Recurring terms include MCP (Model Context Protocol, explained on /what-is-mcp), Crew and Flow (CrewAI primitives, defined on /crewai-full-form), cache hit / miss (model layer), evidence receipt (methodology) and verification states (verified, source-linked, pending, unknown).",
      "Glossary entries deliberately do not branch into individual keyword pages. Each term links to its canonical explainer so search equity consolidates rather than fragmenting into duplicate-canonical URLs."
    ],
    index: true,
    seeAlso: [{ href: "/what-is-mcp", label: "What is MCP?" }, { href: "/crewai-full-form", label: "What does CrewAI stand for?" }, { href: "/methodology", label: "Evidence methodology" }]
  }
};
