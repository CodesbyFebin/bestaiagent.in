export type AuthoritySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type AuthorityPage = {
  title: string;
  description: string;
  directAnswer: string;
  sections: AuthoritySection[];
  evidenceIds?: string[];
  relatedLinks: { href: string; label: string }[];
  index: boolean;
  lastReviewed: string;
};

export const authorityPages: Record<string, AuthorityPage> = {
  "ai-agent-rankings": {
    title: "AI agent rankings: evidence-first evaluation",
    description: "A transparent AI-agent ranking methodology based on verifiable evidence rather than synthetic scores.",
    directAnswer: "There is no defensible universal AI-agent winner without a defined task, reproducible test set and field-level evidence. BestAIAgent.in ranks only when the inputs, methodology and evidence are strong enough to reproduce; otherwise the relevant field stays unknown.",
    sections: [
      {
        heading: "What a defensible ranking requires",
        bullets: [
          "A clearly defined use case and evaluation population.",
          "Versioned products, models, prompts, tools and environment details.",
          "Source-backed identity, licensing and pricing fields where those fields are shown.",
          "Raw or reproducible benchmark outputs for performance claims.",
          "A scoring method published before declaring a winner."
        ]
      },
      {
        heading: "Why old numeric scores were removed",
        paragraphs: [
          "Earlier donor builds contained 9.x-style ratings and winner language that did not have a complete reproducible evidence chain. Those values are not carried into the clean authority graph.",
          "Repository popularity, a vendor claim, or the existence of a public source is not enough to infer capability, security, compliance, latency or price. Each field must qualify independently."
        ]
      },
      {
        heading: "How to use the current directory",
        paragraphs: [
          "Start with the verified Agents and Frameworks directories to confirm identity and upstream sources. Use evidence-ready comparison pages only where both sides have enough qualified data. A page that is still refreshing remains noindex rather than being promoted as a finished ranking."
        ]
      }
    ],
    relatedLinks: [
      { href: "/agents", label: "Verified AI agents" },
      { href: "/compare", label: "Evidence-ready comparisons" },
      { href: "/methodology", label: "Publication methodology" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "cursor-pricing": {
    title: "Cursor pricing in India (2026): Start, Pro, Pro Plus and Ultra",
    description: "Current Cursor pricing with first-party evidence, including the India-only Cursor Start plan and dated plan context.",
    directAnswer: "Cursor's official pricing documentation lists Start for developers in India at ₹649 per month, tax inclusive and billed monthly in INR, with UPI, credit-card or debit-card payment. The same source lists Pro at $20/month, Pro Plus at $60/month and Ultra at $200/month. Pricing was checked on 23 August 2026.",
    sections: [
      {
        heading: "Cursor Start in India",
        paragraphs: [
          "Cursor documents Start as an India-only plan. The first-party page states ₹649 per month, tax inclusive, billed monthly in INR. It also lists UPI, credit card and debit card as payment methods.",
          "This is materially different from the old donor page, which relied on estimated INR conversions. The clean page publishes the first-party INR amount instead of inventing an exchange-rate conversion."
        ]
      },
      {
        heading: "Other individual plans",
        bullets: [
          "Pro — $20/month in the retrieved pricing snapshot.",
          "Pro Plus — $60/month in the retrieved pricing snapshot.",
          "Ultra — $200/month in the retrieved pricing snapshot."
        ]
      },
      {
        heading: "How to interpret pricing evidence",
        paragraphs: [
          "Plan prices and included usage are high-volatility facts. They can change independently of the product identity, so this page stores a dated evidence receipt and does not assume that a previously observed price remains current forever.",
          "Before purchasing, check the linked first-party pricing page. BestAIAgent.in does not infer GST treatment, currency conversion or enterprise discounts beyond what the source explicitly states."
        ]
      }
    ],
    evidenceIds: ["ev-page-cursor-pricing-2026-08-23"],
    relatedLinks: [
      { href: "/agents/cursor", label: "Cursor evidence profile" },
      { href: "/best-ai-agent-for-coding", label: "Coding-agent directory guide" },
      { href: "/methodology", label: "Evidence methodology" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "github-copilot-pricing": {
    title: "GitHub Copilot pricing (2026): Free, Pro, Pro+, Max and business plans",
    description: "Current GitHub Copilot plan prices from first-party GitHub sources, with dated evidence and no unsupported INR conversion.",
    directAnswer: "GitHub's official Copilot plans page lists Free at $0, Pro at $10 per user/month, Pro+ at $39 per user/month and Max at $100 per user/month. GitHub documentation lists Business at $19 per user/month and Enterprise at $39 per user/month. Pricing was checked on 23 August 2026.",
    sections: [
      {
        heading: "Individual plans",
        bullets: [
          "Free — $0.",
          "Pro — $10 per user/month.",
          "Pro+ — $39 per user/month.",
          "Max — $100 per user/month."
        ]
      },
      {
        heading: "Organization plans",
        paragraphs: [
          "GitHub's organization billing documentation lists Copilot Business at $19 per user/month and Copilot Enterprise at $39 per user/month. Organization billing and included usage are separate from the individual plan structure."
        ]
      },
      {
        heading: "No synthetic India conversion",
        paragraphs: [
          "The donor build used INR estimates in several pricing pages. This clean page does not convert USD pricing into a claimed India checkout price unless GitHub itself publishes that billing value. Exchange rates, taxes and payment-provider treatment can change independently."
        ]
      }
    ],
    evidenceIds: ["ev-page-github-copilot-pricing-2026-08-23"],
    relatedLinks: [
      { href: "/best-ai-agent-for-coding", label: "Coding-agent evaluation guide" },
      { href: "/compare", label: "Agent comparisons" },
      { href: "/methodology", label: "Evidence methodology" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "claude-code-pricing": {
    title: "Claude Code pricing (2026): Pro and Max plan costs",
    description: "Current Claude Code plan context from Anthropic's first-party product and pricing pages, with dated evidence.",
    directAnswer: "Anthropic's Claude Code product page says Claude Code is included with Claude Pro and Max. It lists Pro at $20 when billed monthly or an effective $17/month with the annual $200 upfront subscription, Max 5x at $100/month and Max 20x at $200/month. Pricing was checked on 23 August 2026.",
    sections: [
      {
        heading: "Plans that include Claude Code",
        bullets: [
          "Pro — $20/month when billed monthly; the retrieved source shows an effective $17/month with a $200 annual upfront subscription.",
          "Max 5x — $100/month.",
          "Max 20x — $200/month."
        ]
      },
      {
        heading: "Subscription price is not the same as every possible usage cost",
        paragraphs: [
          "A Claude subscription and API usage are different billing contexts. This page therefore avoids collapsing every Claude Code workflow into one universal cost figure.",
          "The canonical source should be checked again before procurement because limits, included usage and plan packaging can change."
        ]
      }
    ],
    evidenceIds: ["ev-page-claude-code-pricing-2026-08-23"],
    relatedLinks: [
      { href: "/agents/claude-code", label: "Claude Code source-linked profile" },
      { href: "/best-ai-agent-for-coding", label: "Coding-agent evaluation guide" },
      { href: "/methodology", label: "Evidence methodology" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "what-is-mcp": {
    title: "What is MCP? Model Context Protocol explained",
    description: "Evidence-backed introduction to Model Context Protocol, its client-server model and the prompts, resources and tools primitives.",
    directAnswer: "Model Context Protocol (MCP) is an open protocol for connecting AI applications and agents with external data sources, tools and apps. MCP servers can expose prompts, resources and tools; clients connect those server capabilities to an AI application. This definition is based on the official MCP documentation.",
    sections: [
      {
        heading: "The basic MCP architecture",
        paragraphs: [
          "MCP separates the AI application from external integrations through a protocol boundary. A client inside the AI application connects to one or more MCP servers, and each server advertises the capabilities it supports.",
          "This does not mean every server is automatically trustworthy. Authentication, authorization, scope, tool permissions and human approval remain deployment concerns."
        ]
      },
      {
        heading: "Three server primitives",
        bullets: [
          "Prompts — server-provided templates or instructions that a client can expose to users.",
          "Resources — structured contextual data such as files, database schemas or application information.",
          "Tools — executable functions that let a model interact with external systems, subject to the host application's controls."
        ]
      },
      {
        heading: "How BestAIAgent.in treats MCP servers",
        paragraphs: [
          "A server detail page does not become indexable merely because a repository or product page exists. The clean catalog requires a canonical upstream and hashed primary evidence before promoting an MCP detail route into the public sitemap.",
          "That fail-closed rule is why the current MCP sitemap contains hubs while legacy server details remain noindex until qualified."
        ]
      }
    ],
    evidenceIds: ["ev-page-mcp-overview-2026-08-23"],
    relatedLinks: [
      { href: "/mcp", label: "MCP authority hub" },
      { href: "/mcp/servers", label: "MCP server directory" },
      { href: "/methodology", label: "Publication methodology" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "best-free-ai-agents": {
    title: "Best free AI agents: how to compare free and open options",
    description: "Evidence-first guide to free AI agents, distinguishing open-source code, free hosted tiers and usage-limited plans.",
    directAnswer: "A 'free AI agent' can mean open-source software you run yourself, a hosted free tier, or a paid product with temporary credits. Those are not equivalent. Compare the deployment model, license, model/API costs, tool permissions and usage limits before calling an option free.",
    sections: [
      {
        heading: "Open source is not the same as zero operating cost",
        paragraphs: [
          "Projects such as OpenHands, Cline, Aider, Gemini CLI, Qwen Code, SWE-agent, Browser Use and GPT Researcher have verified public upstream repositories in the current BestAIAgent.in graph. A public repository can reduce software acquisition cost, but model API usage, compute, storage and operations may still cost money.",
          "The site therefore does not label an agent 'free forever' solely because its source code is public."
        ]
      },
      {
        heading: "What to check before choosing",
        bullets: [
          "License and whether the repository is the canonical upstream.",
          "Whether a model/API key is required and who bills that usage.",
          "Local versus hosted execution boundaries.",
          "Tool permissions and human approval controls.",
          "Usage limits or credits on any hosted free tier."
        ]
      }
    ],
    relatedLinks: [
      { href: "/agents", label: "Verified agent directory" },
      { href: "/best-ai-agent-for-coding", label: "Coding agents" },
      { href: "/methodology", label: "How verification works" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "best-free-ai-coding-agents": {
    title: "Free AI coding agents: verified open-source starting points",
    description: "Compare public coding-agent projects without assuming that open-source software means zero model or infrastructure cost.",
    directAnswer: "For a free or open coding-agent starting point, first distinguish downloadable open-source software from hosted free tiers. BestAIAgent.in currently has verified upstream identities for OpenHands, Cline, Aider, Gemini CLI, Qwen Code and SWE-agent; individual model or infrastructure costs remain separate.",
    sections: [
      {
        heading: "Verified coding-agent identities",
        paragraphs: [
          "The clean graph verifies repository identity separately from feature, benchmark and pricing claims. That allows the directory to show trustworthy upstream links without pretending every capability has already been independently tested."
        ],
        bullets: ["OpenHands", "Cline", "Aider", "Gemini CLI", "Qwen Code", "SWE-agent"]
      },
      {
        heading: "Evaluation checklist",
        bullets: [
          "Repository and license provenance.",
          "Supported execution surface such as CLI, IDE or autonomous software-engineering workflow.",
          "Required model provider and its separate cost.",
          "Filesystem, terminal and network permissions.",
          "Human review before commits, deployments or destructive commands."
        ]
      }
    ],
    relatedLinks: [
      { href: "/agents", label: "Agents directory" },
      { href: "/best-ai-agent-for-coding", label: "Coding-agent guide" },
      { href: "/compare", label: "Evidence-ready comparisons" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "ai-agent-benchmarks": {
    title: "AI agent benchmarks: reproducible evaluation methodology",
    description: "How to benchmark AI agents without synthetic scores, unverifiable leaderboards or mixed test conditions.",
    directAnswer: "A useful AI-agent benchmark fixes the task set, agent version, model, prompts, tool permissions, environment, budget and scoring method before running the test. Raw outputs and failures should remain inspectable. Without those controls, a leaderboard number is not reproducible evidence.",
    sections: [
      {
        heading: "Minimum benchmark record",
        bullets: [
          "Agent and model versions.",
          "Prompt/task dataset and sampling method.",
          "Hardware, runtime, network and dependency versions when they affect results.",
          "Tool permissions, retry policy, timeout and budget.",
          "Raw outputs, error cases and scoring code.",
          "Run date and any known source of variance."
        ]
      },
      {
        heading: "Separate benchmark dimensions",
        paragraphs: [
          "Do not collapse success rate, latency, cost, security posture and developer experience into a single opaque number. Different use cases can legitimately weight those dimensions differently.",
          "BestAIAgent.in only promotes benchmark winners when the underlying methodology and evidence are sufficient to reproduce the conclusion."
        ]
      }
    ],
    relatedLinks: [
      { href: "/ai-agent-rankings", label: "Rankings policy" },
      { href: "/methodology", label: "Evidence methodology" },
      { href: "/compare", label: "Comparisons" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "coding-agents-hub": {
    title: "AI coding agents hub: verified tools, frameworks and evaluation criteria",
    description: "Authority hub for coding agents, coding frameworks and evidence-led comparisons.",
    directAnswer: "Coding agents differ by execution surface, autonomy, model provider, repository access and tool permissions. Start by choosing the workflow you need—terminal, IDE assistance, repository-scale software engineering or orchestration—then compare verified upstreams and field-level evidence.",
    sections: [
      {
        heading: "Verified agent starting points",
        bullets: ["OpenHands", "Cline", "Aider", "Gemini CLI", "Qwen Code", "SWE-agent"]
      },
      {
        heading: "Frameworks around agent workflows",
        bullets: ["LangGraph", "LangChain", "Microsoft Agent Framework", "AutoGen", "CrewAI"]
      },
      {
        heading: "Questions to answer before adoption",
        bullets: [
          "Can the agent read and modify the repository scope you intend?",
          "What terminal, filesystem, browser or network permissions does it need?",
          "Which model providers are supported and how are their costs billed?",
          "Where does human approval occur before commits, pull requests or deployments?",
          "Can the workflow be reproduced and audited after execution?"
        ]
      }
    ],
    relatedLinks: [
      { href: "/agents", label: "Agent directory" },
      { href: "/frameworks", label: "Framework directory" },
      { href: "/best-free-ai-coding-agents", label: "Free/open coding agents" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "ai-agent-market-map": {
    title: "AI agent market map: an evidence-first taxonomy",
    description: "A practical taxonomy of AI-agent products, frameworks, models, providers and protocols without fabricated market-share claims.",
    directAnswer: "The AI-agent ecosystem is easier to compare as a graph than as one leaderboard. BestAIAgent.in separates end-user agents, developer frameworks, model providers, models, MCP infrastructure and workflow categories so that evidence and relationships stay attached to the correct entity type.",
    sections: [
      {
        heading: "Core entity types",
        bullets: [
          "Agents — products or projects that perform tasks through model-driven workflows.",
          "Frameworks — developer libraries and orchestration systems used to build agent workflows.",
          "Models — inference models that can power one or many agent products.",
          "Providers — organizations or services publishing models or AI infrastructure.",
          "MCP infrastructure — protocol clients and servers that connect applications to tools and context."
        ]
      },
      {
        heading: "Workflow categories",
        bullets: ["Coding and software engineering", "Research and browsing", "Automation and orchestration", "Voice and conversational workflows", "Business, CRM, sales and support workflows"]
      },
      {
        heading: "What this map does not claim",
        paragraphs: [
          "This page does not estimate market share, revenue, adoption or a universal winner. Those values require separate, dated evidence and cannot be inferred from directory coverage."
        ]
      }
    ],
    relatedLinks: [
      { href: "/agents", label: "Agents" },
      { href: "/frameworks", label: "Frameworks" },
      { href: "/models", label: "Models" },
      { href: "/mcp", label: "MCP" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  },

  "glossary-hub": {
    title: "AI agent glossary: agents, frameworks, models, MCP and evidence",
    description: "Plain-language definitions for the entity and evidence terms used across BestAIAgent.in.",
    directAnswer: "BestAIAgent.in uses distinct terms for agents, frameworks, models, providers and evidence so that claims do not leak from one entity type to another. The glossary explains those boundaries and links each concept to its canonical directory.",
    sections: [
      {
        heading: "Agent",
        paragraphs: ["A software product or project that uses one or more models to pursue a task through a workflow that can include reasoning, tools, memory, retrieval or execution."]
      },
      {
        heading: "Agent framework",
        paragraphs: ["A developer-oriented library or orchestration system used to build, coordinate or control agent workflows. A framework is not automatically an end-user agent product."]
      },
      {
        heading: "Model and provider",
        paragraphs: ["A model is the inference artifact or service performing model computation. A provider is the organization or service publishing models or related infrastructure. One provider can publish multiple models, and one agent can use multiple providers."]
      },
      {
        heading: "MCP",
        paragraphs: ["Model Context Protocol is an open protocol used to connect AI applications with external context and tools. BestAIAgent.in treats MCP server identity and MCP server capability claims as separately verifiable fields."]
      },
      {
        heading: "Evidence receipt",
        paragraphs: ["A stored record containing the source URL, publisher, retrieval date, content hash and a normalized snapshot of the fact being relied on. Evidence receipts support auditability but do not make unrelated fields verified."
        ]
      }
    ],
    relatedLinks: [
      { href: "/knowledge-graph", label: "Knowledge graph" },
      { href: "/methodology", label: "Evidence methodology" },
      { href: "/mcp", label: "MCP hub" }
    ],
    index: true,
    lastReviewed: "2026-08-23"
  }
};
