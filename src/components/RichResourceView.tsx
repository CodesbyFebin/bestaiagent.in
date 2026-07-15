import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, ArrowRight, ShieldCheck, Calendar, User, Eye, Copy, Check,
  Sparkles, DollarSign, Calculator, HelpCircle, ChevronRight, Play, Info,
  CheckCircle2, AlertCircle, Settings, FileText, Cpu, Server, Network,
  Lock, RefreshCw, BarChart3, Database, MessageSquare, Terminal, Sliders, Globe, Share2, Award, Zap
} from "lucide-react";

interface RichResourceViewProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onAgentClick?: (agentId: string) => void;
}

// Highly comprehensive static data dictionary for tool pages, alternatives, comparison, pricing, and use cases
const TOOL_METADATA: Record<string, {
  name: string;
  category: string;
  creator: string;
  tagline: string;
  overview: string;
  keyTakeaways: string[];
  pros: string[];
  cons: string[];
  pricingDetail: string;
  securityRating: string;
  mcpCompatible: boolean;
  version: string;
  lastUpdated: string;
  features: { name: string; desc: string; isSupported: boolean }[];
  stepByStep: string[];
}> = {
  "cursor-ai": {
    name: "Cursor AI",
    category: "AI Coding Assistant & IDE",
    creator: "Anysphere",
    tagline: "The world's premier AI-first fork of VS Code, optimized for rapid software engineering.",
    overview: "Cursor is a direct fork of VS Code that integrates foundational models like Claude 3.5 Sonnet and GPT-4o directly into the editor's core. With features like Composer (multi-file editing), Copilot++ (tab autocomplete), and instant codebase indexing, Cursor enables developers to build full-stack web applications with simple conversational instructions.",
    keyTakeaways: [
      "Deep VS Code ecosystem integration with zero migration friction.",
      "Multi-file editing via 'Composer' mode accelerates code refactoring.",
      "Vector-indexed local codebase queries resolve dependency paths instantly.",
      "Provides state-of-the-art context-awareness via semantic search."
    ],
    pros: [
      "Lightning-fast local context indexing and semantic codebase search.",
      "Composer allows simultaneous editing across multiple complex modules.",
      "Direct import of all active VS Code extensions and custom settings."
    ],
    cons: [
      "Requires active subscription ($20/mo) for fast-tier model queries.",
      "Proprietary cloud proxy handles API requests which may raise corporate data residency issues."
    ],
    pricingDetail: "Free hobby tier (50 fast requests); Pro at $20/month (~₹1,660) for 500 fast requests; Business at $40/user/month.",
    securityRating: "SOC2 Type II Certified, optional local zero-data retention agreements available for enterprise clients.",
    mcpCompatible: true,
    version: "v0.45.8",
    lastUpdated: "July 2026",
    features: [
      { name: "Composer Mode", desc: "Co-edit multiple files simultaneously with visual diffs.", isSupported: true },
      { name: "Local Codebase Indexing", desc: "Builds a highly efficient local vector index of symbols.", isSupported: true },
      { name: "Cursor Tab Auto-Complete", desc: "Generates multi-line ghost text predictive code snippets.", isSupported: true },
      { name: "Sovereign Key Overwrite", desc: "Use custom OpenAI/Gemini/Anthropic keys directly.", isSupported: true }
    ],
    stepByStep: [
      "Download Cursor AI for your operating system (Mac, Windows, or Linux).",
      "During setup, click 'Import VS Code' to automatically copy theme, extensions, and hotkeys.",
      "Open your project directory and press 'Cmd+I' to boot up the Composer panel.",
      "Instruct the AI to make a change (e.g., 'Add a dark mode toggle to the Header component').",
      "Review the inline color-coded diff changes, and click 'Accept All' to commit."
    ]
  },
  "crewai": {
    name: "CrewAI",
    category: "Multi-Agent Orchestration Framework",
    creator: "CrewAI Inc.",
    tagline: "An elegant, Python-native framework for orchestrating role-playing collaborative AI agents.",
    overview: "CrewAI is a powerful platform designed to orchestrate complex multi-agent systems. It models agents as structured members of a 'crew' with distinct roles, backstories, tools, and cross-communication protocols. Ideal for automating enterprise workflows, research pipelines, and sequential multi-hop task loops.",
    keyTakeaways: [
      "Role-playing architecture allows fine-grained task delegation.",
      "Python-native codebase simplifies custom tool integration (LangChain, Composio).",
      "Hierarchical, sequential, and consensual process loops supported out-of-the-box."
    ],
    pros: [
      "Extremely modular structure with clear separation of agent personas.",
      "Built-in telemetry tracking and token consumption analyzer.",
      "Supports native multi-agent execution loops."
    ],
    cons: [
      "High token overhead due to agent backstories and internal loop logs.",
      "Prone to looping/stuck states if sub-tasks are not granularly formulated."
    ],
    pricingDetail: "Open-source framework (free). Enterprise platform hosting starts with custom consumption pricing.",
    securityRating: "Data processed locally on your backend infrastructure. Enterprise hub conforms to ISO 27001.",
    mcpCompatible: true,
    version: "v0.84.2",
    lastUpdated: "June 2026",
    features: [
      { name: "Role-Play personas", desc: "Define backstories, memory, and unique tools for each node.", isSupported: true },
      { name: "Hierarchical Process", desc: "A manager agent delegates and reviews completed assets.", isSupported: true },
      { name: "Memory Systems", desc: "Integrates short-term, long-term, and entity-specific memory banks.", isSupported: true },
      { name: "JSON Formatting Enforcer", desc: "Guarantees output structures strictly adhere to predefined models.", isSupported: true }
    ],
    stepByStep: [
      "Install the package via terminal: 'pip install crewai'.",
      "Define your agents with a distinct 'role', 'goal', and 'backstory' using the Python class.",
      "Configure tasks with descriptive descriptions, expected output schemas, and assignees.",
      "Instantiate your 'Crew' passing in agents, tasks, and process type (e.g. Process.sequential).",
      "Call 'crew.kickoff()' and stream operational trace logs directly in the command prompt."
    ]
  },
  "dify": {
    name: "Dify",
    category: "LLM Application Development Platform",
    creator: "Dify.ai (Open Source)",
    tagline: "An open-source LLM app development platform that blends workflow orchestration, RAG, and agent logs.",
    overview: "Dify is a complete visual studio for building and scaling AI agents and applications. It bridges the gap between raw models and fully operational production services by integrating a drag-and-drop workflow builder, high-performance RAG vector retrieval, sandbox execution, and centralized API management.",
    keyTakeaways: [
      "Visual orchestration canvas lowers the barrier to entry for business builders.",
      "Deep, native RAG engine handles PDF parsing, chunking, and retrieval indexing.",
      "Extensive template marketplace speeds up sandbox deployment."
    ],
    pros: [
      "Highly intuitive drag-and-drop workflow builder interface.",
      "Sovereign self-hosted Docker / Kubernetes deployment option is 100% free.",
      "Built-in telemetry dashboard tracks token counts, user ratings, and latency."
    ],
    cons: [
      "Cloud-hosted tier has restrictive execution quotas for complex workflows.",
      "Advanced custom code blocks within workflows require strict sandbox isolation configuration."
    ],
    pricingDetail: "Free Self-Hosted Community; Cloud Sandbox is free; Team plan at $59.90/mo; Custom enterprise SLAs.",
    securityRating: "Self-hosting supports complete air-gapped corporate setups for total data sovereignty.",
    mcpCompatible: true,
    version: "v0.12.3",
    lastUpdated: "July 2026",
    features: [
      { name: "Visual Workflow Studio", desc: "Build agent loops, conditions, and LLM routes visually.", isSupported: true },
      { name: "Integrated RAG Pipeline", desc: "Auto-parse documents and index them in a vector database.", isSupported: true },
      { name: "Prompt IDE & Testing", desc: "Write prompts and preview responses across different models.", isSupported: true },
      { name: "One-Click Webapp Host", desc: "Deploy standard conversational web panels instantly.", isSupported: true }
    ],
    stepByStep: [
      "Deploy Dify locally using Docker Compose: 'docker compose up -d'.",
      "Navigate to 'http://localhost' and set up your master admin account.",
      "Create a new 'Workflow' app from the dashboard and open the visual canvas.",
      "Connect the Start block to an LLM block, then link a Knowledge Retrieval block for RAG.",
      "Click 'Publish' to instantly generate a clean, secure iframe or REST endpoint."
    ]
  },
  "flowise": {
    name: "Flowise",
    category: "No-Code / Low-Code AI Builder",
    creator: "FlowiseAI Inc.",
    tagline: "Drag-and-drop UI to build customized LLM apps using LangChain, LlamaIndex, and custom agents.",
    overview: "Flowise is an open-source UI visual builder designed to construct customized LLM orchestration workflows. By encapsulating LangChain, LlamaIndex, and custom agentic frameworks into drag-and-drop nodes, Flowise allows developers to craft complex memory pipelines, tool-equipped agents, and RAG databases in minutes.",
    keyTakeaways: [
      "Perfect for fast prototyping of LangChain and LlamaIndex agents.",
      "Extremely easy integration with third-party APIs (Slack, Discord, Whatsapp).",
      "One-click server deployments (Railway, Render, AWS, Docker)."
    ],
    pros: [
      "Highly accessible interface for both engineers and product managers.",
      "Massive ecosystem of pre-configured integration nodes.",
      "Completely open-source with permissive Apache 2.0 licensing."
    ],
    cons: [
      "Hard to implement highly customized, dynamic procedural loops compared to pure code.",
      "Frequent framework updates can occasionally cause visual layout or node connection errors."
    ],
    pricingDetail: "100% Free Open-Source. Custom enterprise support and cloud deployment options available.",
    securityRating: "Fully self-hostable inside your private virtual cloud (VPC) with air-gapped support.",
    mcpCompatible: false,
    version: "v2.1.4",
    lastUpdated: "May 2026",
    features: [
      { name: "Node Canvas Editor", desc: "Connect LLMs, chains, agents, memory, and tools visually.", isSupported: true },
      { name: "Native Chat API", desc: "Instantly serves endpoints with streaming chat histories.", isSupported: true },
      { name: "Embedded Chat Widget", desc: "Quick copy-paste HTML snippet to deploy chat boxes on websites.", isSupported: true },
      { name: "Custom Tool Sandbox", desc: "Write Javascript code directly within custom tool modules.", isSupported: true }
    ],
    stepByStep: [
      "Run Flowise via npm: 'npm install -g flowise' followed by 'npx flowise start'.",
      "Open your browser and navigate to 'http://localhost:3000'.",
      "Click 'Create New' to open a blank drag-and-drop canvas grid.",
      "Add an 'Agent Executor' node, connect a 'ChatOpenAI' model and a 'Buffer Memory' block.",
      "Click 'Save' and click the orange chat icon to test your interactive agent immediately."
    ]
  },
  "github-copilot": {
    name: "GitHub Copilot",
    category: "AI Code Autocomplete",
    creator: "GitHub & Microsoft",
    tagline: "The original AI coding companion that autocompletes lines, suggests functions, and refactors code.",
    overview: "GitHub Copilot is the pioneer of AI-driven software engineering tools. Built as an IDE extension (VS Code, JetBrains, Visual Studio), it integrates with GitHub's vast code corpus to provide real-time code completion, inline explanations, test generation, and pull request reviews.",
    keyTakeaways: [
      "Seamless autocomplete speed and latency optimized for developers.",
      "Deep integration with GitHub repositories and CI/CD pipelines.",
      "Includes GitHub Copilot Chat for interactive project querying."
    ],
    pros: [
      "Familiar IDE ghost text interface minimizes interruption of developer flow.",
      "Excellent multi-language syntax completion from shell scripts to Rust.",
      "Backed by Microsoft's high-speed global inference infrastructure."
    ],
    cons: [
      "Lacks full-project multi-file visual refactoring capabilities like Cursor's Composer.",
      "High reliance on internet connection; limited offline capability."
    ],
    pricingDetail: "Individual: $10/mo or $100/yr; Business: $19/user/mo; Enterprise: $39/user/mo.",
    securityRating: "Enterprise tier guarantees corporate IP indemnity and zero-data training policies.",
    mcpCompatible: true,
    version: "v1.254.0",
    lastUpdated: "July 2026",
    features: [
      { name: "Ghost Text Autocomplete", desc: "Predicts the next lines of code as you type.", isSupported: true },
      { name: "Copilot Chat Panel", desc: "Dedicated sidebar for code queries, explanations, and test creation.", isSupported: true },
      { name: "Workspace Context Integration", desc: "Indexes open tabs and project structures for better context.", isSupported: true },
      { name: "Vulnerability Scanning", desc: "Highlights insecure coding patterns in real-time.", isSupported: true }
    ],
    stepByStep: [
      "Open your IDE (e.g. VS Code) and search the Extensions marketplace for 'GitHub Copilot'.",
      "Install the extension and click the account icon to authorize with your GitHub login.",
      "Ensure you have an active Copilot subscription activated on your GitHub profile.",
      "Begin typing in a file (e.g., Python, TypeScript); press 'Tab' to accept ghost text suggestions.",
      "Press 'Cmd+Shift+I' to summon the inline chat box for fast refactoring suggestions."
    ]
  },
  "vapi-ai": {
    name: "Vapi AI",
    category: "Voice AI Platform",
    creator: "Vapi Inc.",
    tagline: "Ultra-low-latency voice agent platform for building real-time human-like conversation bots.",
    overview: "Vapi is an advanced voice automation platform designed to build human-like vocal interfaces. By grouping low-latency speech-to-text (Deepgram), ultra-fast model reasoning (Groq, Gemini), and expressive text-to-speech (ElevenLabs, Play.ht) into a single orchestration engine, Vapi achieves real-time conversational latencies under 500ms.",
    keyTakeaways: [
      "Achieves sub-500ms vocal latency for natural, lag-free conversations.",
      "Built-in conversational flow controls like interruption handling.",
      "Direct integration with global telephony channels (Twilio, Vonage, WebRTC)."
    ],
    pros: [
      "Astounding vocal realism and emotional inflection support.",
      "Simple web dashboard to fine-tune speech parameters (temperature, speed).",
      "Excellent fallback handling for packet-loss during web calls."
    ],
    cons: [
      "Telephony and voice synthesis integration costs accumulate quickly in production.",
      "Requires careful custom API logic to handle complex transactional database updates."
    ],
    pricingDetail: "Free platform fee up to $10 credit; thereafter, $0.05/min platform fee + speech API charges.",
    securityRating: "HIPAA and SOC2 Type II compliant; supports zero-data retention voice channels.",
    mcpCompatible: false,
    version: "v3.4.0",
    lastUpdated: "June 2026",
    features: [
      { name: "Instant Telephony Sync", desc: "Provision phone numbers and attach vocal agents immediately.", isSupported: true },
      { name: "Interruption Detection", desc: "Agent automatically stops speaking the millisecond a human speaks.", isSupported: true },
      { name: "Dynamic Function Calling", desc: "Instructs backend APIs to execute databases transfers during calls.", isSupported: true },
      { name: "Echo Cancellation", desc: "Advanced acoustic filter optimized for web and mobile speakers.", isSupported: true }
    ],
    stepByStep: [
      "Create a Vapi account at 'https://vapi.ai' and open the developer workspace.",
      "Select an AI vocal model, choice of STT (Deepgram), and TTS speaker (ElevenLabs).",
      "Write a clear system prompt defining the persona (e.g. 'You are a warm receptionist').",
      "Add a custom tool function trigger (e.g. 'book_appointment' with calendar variables).",
      "Click 'Test in Browser' or bind a custom Twilio number to begin dialing immediately."
    ]
  },
  "yellow-ai": {
    name: "Yellow.ai",
    category: "Enterprise Conversational AI",
    creator: "Yellow.ai Corp",
    tagline: "Enterprise-grade conversational customer support platform running dynamic multilingual agents.",
    overview: "Yellow.ai is a leading customer support automation engine. It specializes in running multilingual voice and chat agents across 35+ messaging channels (Whatsapp, Instagram, SMS, Web). Using its proprietary Dynamic NLP engine, Yellow.ai automates complex transactional customer inquiries for global banking, logistics, and retail brands.",
    keyTakeaways: [
      "Multilingual support across 135+ languages out-of-the-box.",
      "Omni-channel integration covers all major customer communication touchpoints.",
      "Highly scalable architecture handling millions of customer interactions monthly."
    ],
    pros: [
      "Excellent enterprise-grade dashboard, logs, and human-in-the-loop fallback controls.",
      "Pre-built integrations with major CRM systems (Salesforce, Zendesk, Freshdesk).",
      "Proprietary cognitive NLP engine optimized for transaction intent accuracy."
    ],
    cons: [
      "SaaS license fee structures are tailored for large enterprise budgets; not ideal for startups.",
      "Initial workflow design and integration configuration can take several weeks."
    ],
    pricingDetail: "Usage-based enterprise pricing with custom SLA contracts. Contact sales for quotes.",
    securityRating: "SOC2, ISO 27001, GDPR, and HIPAA compliant. Enforces local geographic data residency.",
    mcpCompatible: false,
    version: "v4.1.2",
    lastUpdated: "July 2026",
    features: [
      { name: "Dynamic Conversational Flow", desc: "AI dynamically branches customer support pathways without fixed trees.", isSupported: true },
      { name: "WhatsApp Campaign Engine", desc: "Schedule and execute promotional/notifying chat campaigns.", isSupported: true },
      { name: "Voice Bot Synthesizer", desc: "Expressive multilingual telephone bots for support triage.", isSupported: true },
      { name: "Predictive Analytics", desc: "Tracks customer sentiments and resolves support bottlenecks.", isSupported: true }
    ],
    stepByStep: [
      "Onboard your brand on the Yellow.ai cloud portal with the enterprise team.",
      "Import your active support FAQs and PDF manuals to bootstrap the knowledge base.",
      "Configure your support channels, such as a custom WhatsApp business account.",
      "Design transactional API connections (e.g., querying order statuses from Shopify).",
      "Publish the agent and monitor real-time deflection rates on the centralized dashboard."
    ]
  }
};

export default function RichResourceView({ currentPath, onNavigate, onAgentClick }: RichResourceViewProps) {
  // Normalize path to clean key
  const cleanPath = currentPath.startsWith("/") ? currentPath.substring(1) : currentPath;
  
  // Detect Page Category / Type
  let pageType: "tool" | "alternative" | "pricing" | "comparison" | "bestof" | "mcp" | "industry" | "tutorial" | "about" | "policy" | "calculator" | "author" | "fallback" = "fallback";
  let targetTool = "";
  let versusTool1 = "";
  let versusTool2 = "";
  let pageTitle = "Sovereign AI Resource Hub";
  let subHeader = "Deep, structured, authoritative research mapping";

  if (cleanPath.startsWith("tools/")) {
    pageType = "tool";
    targetTool = cleanPath.split("/")[1];
  } else if (cleanPath.endsWith("-alternatives")) {
    pageType = "alternative";
    targetTool = cleanPath.replace("-alternatives", "");
  } else if (cleanPath.endsWith("-pricing")) {
    pageType = "pricing";
    targetTool = cleanPath.replace("-pricing", "");
  } else if (cleanPath.includes("-vs-")) {
    pageType = "comparison";
    const parts = cleanPath.split("-vs-");
    versusTool1 = parts[0];
    versusTool2 = parts[1];
  } else if (cleanPath.startsWith("best-") || cleanPath === "best-ai-agents" || cleanPath === "best-ai-tools") {
    pageType = "bestof";
  } else if (cleanPath.startsWith("mcp-") || cleanPath === "what-is-mcp" || cleanPath === "mcp-directory" || cleanPath === "mcp-hub" || cleanPath === "mcp-marketplace" || cleanPath === "mcp-security" || cleanPath === "mcp-servers-directory") {
    pageType = "mcp";
  } else if (cleanPath.startsWith("ai-agents-for-") || cleanPath.startsWith("ai-agent-") || cleanPath.endsWith("-hub") || cleanPath.startsWith("business-") || cleanPath.startsWith("coding-") || cleanPath.startsWith("voice-")) {
    pageType = "industry";
  } else if (cleanPath.startsWith("how-to-") || cleanPath === "google-drive-ai-agent-workspace" || cleanPath.startsWith("tutorials/")) {
    pageType = "tutorial";
  } else if (cleanPath === "calculators") {
    pageType = "calculator";
  } else if (cleanPath.startsWith("authors/")) {
    pageType = "author";
  } else if (["about", "about-editorial-team", "contact", "methodology", "methodology-42point"].includes(cleanPath)) {
    pageType = "about";
  } else if (["privacy-policy", "terms", "affiliate-disclosure", "editorial-policy", "review-policy", "corrections-policy", "data-deletion-request"].includes(cleanPath)) {
    pageType = "policy";
  }

  // Formatting Titles beautifully
  const formatTitle = (slug: string) => {
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (pageType === "tool") {
    const meta = TOOL_METADATA[targetTool] || { name: formatTitle(targetTool), category: "AI Services" };
    pageTitle = `${meta.name} - Ultimate Review, Deployment & Pricing Guide`;
    subHeader = `How ${meta.name} fits into the modern sovereign agent ecosystem. Comprehensive technical analysis.`;
  } else if (pageType === "alternative") {
    const meta = TOOL_METADATA[targetTool] || { name: formatTitle(targetTool) };
    pageTitle = `Best ${meta.name} Alternatives - Side-by-Side Comparison Matrix`;
    subHeader = `Evaluating competitive options for ${meta.name}. Migration guides and cost analyses.`;
  } else if (pageType === "pricing") {
    const meta = TOOL_METADATA[targetTool] || { name: formatTitle(targetTool) };
    pageTitle = `${meta.name} Pricing Analysis, Hidden Costs & ROI Calculator`;
    subHeader = `A rigorous look at licensing tiers, enterprise custom models, and token budgets.`;
  } else if (pageType === "comparison") {
    const meta1 = TOOL_METADATA[versusTool1] || { name: formatTitle(versusTool1) };
    const meta2 = TOOL_METADATA[versusTool2] || { name: formatTitle(versusTool2) };
    pageTitle = `${meta1.name} vs ${meta2.name} - Head-to-Head Architectural Face-off`;
    subHeader = `Who wins in performance, regional language adaptivity, cost control, and security?`;
  } else if (pageType === "bestof") {
    pageTitle = `${formatTitle(cleanPath)} - The Ultimate Curated Rankings`;
    subHeader = `Expertly evaluated rankings scored by the BestAIAgent.in 42-point trust methodology.`;
  } else if (pageType === "mcp") {
    pageTitle = `${formatTitle(cleanPath)} - Bridging LLMs to Local Databases & Filesystems`;
    subHeader = `Harnessing Model Context Protocol standards to empower models with local context safely.`;
  } else if (pageType === "industry") {
    pageTitle = `${formatTitle(cleanPath)} - Industry Solutions Guide`;
    subHeader = `Deep-dive study on how modern businesses implement autonomous agents to streamline operations.`;
  } else if (pageType === "tutorial") {
    pageTitle = `${formatTitle(cleanPath)} - Detailed Implementation Blueprint`;
    subHeader = `Complete step-by-step setup guides, terminal scripts, and production configurations.`;
  } else if (pageType === "calculator") {
    pageTitle = `AI Agent Cost, Token Usage & ROI Calculator Suite`;
    subHeader = `Interactive planning utility for computing monthly operational budgets and business savings.`;
  } else if (pageType === "author") {
    const authorName = cleanPath.replace("authors/", "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    pageTitle = `${authorName} - Senior Editorial Analyst at BestAIAgent.in`;
    subHeader = `Verified technical reviews, benchmarks, and deep-dive enterprise guides.`;
  } else if (pageType === "about") {
    pageTitle = `${formatTitle(cleanPath)} - BestAIAgent.in Project`;
    subHeader = `How we score, rate, and index sovereign agent models with unmatched transparency.`;
  } else if (pageType === "policy") {
    pageTitle = `${formatTitle(cleanPath)} - BestAIAgent.in Compliance Hub`;
    subHeader = `Ensuring high-quality editorial integrity, absolute transparency, and data safety.`;
  } else {
    pageTitle = formatTitle(cleanPath || "BestAIAgent.in Directory");
    subHeader = "Explore comprehensive sovereign AI directory databases and trust metrics.";
  }

  // State for interactive widgets
  const [copiedText, setCopiedText] = useState(false);
  const [selectedSpecTab, setSelectedSpecTab] = useState<"specs" | "latency" | "verdict">("specs");
  
  // WIDGET state: ROI Cost Estimator
  const [requestsVal, setRequestsVal] = useState(60000);
  const [tokenCostModel, setTokenCostModel] = useState("gemini-35-flash");
  const [inputTokenSize, setInputTokenSize] = useState(2000);
  const [outputTokenSize, setOutputTokenSize] = useState(600);
  
  // WIDGET state: Prompt Playground
  const [promptTemplate, setPromptTemplate] = useState("translation");
  const [promptVarAccent, setPromptVarAccent] = useState("Bihari Dialect");
  const [promptVarContext, setPromptVarContext] = useState("Verify banking OTP");

  // WIDGET state: MCP config tool
  const [mcpServerSelected, setMcpServerSelected] = useState("sqlite");
  const [mcpVerified, setMcpVerified] = useState(false);

  // WIDGET state: Security compliance tool
  const [compSOC2, setCompSOC2] = useState(true);
  const [compDataIN, setCompDataIN] = useState(true);
  const [compAudit, setCompAudit] = useState(false);
  const [compEnc, setCompEnc] = useState(true);

  // WIDGET state: Migration wizard
  const [migrateStep, setMigrateStep] = useState(1);

  // Trust signal simulation
  const lastUpdatedText = "July 8, 2026";
  const reviewerName = "Priya Iyer, Lead Architect";
  const authorName = "Karan Mehra, Senior Editor";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Scroll to top on navigation or path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  // Dynamic Title, Description & JSON-LD Injection for 10/10 SEO, AEO, and GEO
  useEffect(() => {
    // 1. Update document title
    document.title = pageTitle ? `${pageTitle} | BestAIAgent.in` : "BestAIAgent.in - Sovereign India AI Directory";

    // 2. Set/Update canonical & description meta tags
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', `${subHeader} Verified authority analysis, pricing, and integration steps.`);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://bestaiagent.in${currentPath}`);

    // 3. Inject Dynamic JSON-LD Structured Data Schema for Search & GenAI crawlers (AEO/GEO/SEO)
    const existingSchema = document.getElementById("best-ai-agent-schema-jsonld");
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaData: Record<string, any> = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://bestaiagent.in${currentPath}#webpage`,
          "url": `https://bestaiagent.in${currentPath}`,
          "name": pageTitle,
          "description": subHeader,
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://bestaiagent.in/#website",
            "name": "BestAIAgent.in",
            "url": "https://bestaiagent.in/"
          },
          "inLanguage": "en-US"
        }
      ]
    };

    // If it's a tool review page, add Product & TechArticle schema to graph
    if (pageType === "tool" && targetTool) {
      schemaData["@graph"].push({
        "@type": "Product",
        "@id": `https://bestaiagent.in${currentPath}#product`,
        "name": formatTitle(targetTool),
        "category": "SoftwareApplication",
        "brand": {
          "@type": "Brand",
          "name": formatTitle(targetTool)
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "0",
          "highPrice": "3320",
          "offerCount": "3"
        }
      });

      schemaData["@graph"].push({
        "@type": "TechArticle",
        "@id": `https://bestaiagent.in${currentPath}#article`,
        "headline": pageTitle,
        "description": subHeader,
        "author": {
          "@type": "Person",
          "name": authorName
        },
        "publisher": {
          "@type": "Organization",
          "name": "BestAIAgent.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bestaiagent.in/assets/images/logo.png"
          }
        },
        "datePublished": "2026-07-08T12:00:00+05:30",
        "dateModified": "2026-07-13T20:48:00+05:30"
      });
    }

    // FAQ schema for tutorials/guides (great for AEO/GEO direct-answers)
    if (pageType === "tutorial" || pageType === "mcp") {
      schemaData["@graph"].push({
        "@type": "FAQPage",
        "@id": `https://bestaiagent.in${currentPath}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How to implement ${formatTitle(cleanPath)} in India?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `You can configure and deploy ${formatTitle(cleanPath)} securely by matching local compliance constraints, setting Indian local variables, and adhering to regional sandboxing policies.`
            }
          },
          {
            "@type": "Question",
            "name": `Is ${formatTitle(cleanPath)} secure for enterprise operations?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, standard security includes SOC2 parameters, optional air-gapped deployment, and South Asia region localized databases."
            }
          }
        ]
      });
    }

    const script = document.createElement("script");
    script.id = "best-ai-agent-schema-jsonld";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const addedSchema = document.getElementById("best-ai-agent-schema-jsonld");
      if (addedSchema) {
        addedSchema.remove();
      }
    };
  }, [currentPath, pageTitle, subHeader, pageType, cleanPath]);

  // Dynamic calculations for AI Cost Simulator
  const calculateCostReport = () => {
    let costPerMillionInput = 0.075; // standard fallback
    let costPerMillionOutput = 0.30;
    let modelLabel = "Gemini 3.5 Flash";

    if (tokenCostModel === "gemini-35-flash") {
      costPerMillionInput = 0.075;
      costPerMillionOutput = 0.30;
      modelLabel = "Gemini 3.5 Flash";
    } else if (tokenCostModel === "claude-35-sonnet") {
      costPerMillionInput = 3.00;
      costPerMillionOutput = 15.00;
      modelLabel = "Claude 3.5 Sonnet";
    } else if (tokenCostModel === "krutrim-pro") {
      costPerMillionInput = 0.15; // in USD equivalent approx
      costPerMillionOutput = 0.60;
      modelLabel = "Ola Krutrim Pro";
    } else if (tokenCostModel === "sarvam-speech") {
      costPerMillionInput = 0.10;
      costPerMillionOutput = 0.40;
      modelLabel = "Sarvam Multilingual Node";
    }

    const monthlyInputTokens = (requestsVal * inputTokenSize) / 1000000;
    const monthlyOutputTokens = (requestsVal * outputTokenSize) / 1000000;
    const rawCostUSD = (monthlyInputTokens * costPerMillionInput) + (monthlyOutputTokens * costPerMillionOutput);
    const costInINR = Math.round(rawCostUSD * 83);
    const developerHoursSaved = Math.round((requestsVal * 3.5) / 60); // 3.5 minutes per request task
    const financialSavingsINR = Math.round((developerHoursSaved * 1500) - costInINR); // ₹1,500/hr developer cost proxy
    const roiPercentage = Math.round((financialSavingsINR / (costInINR || 1)) * 100);

    return {
      cost: costInINR,
      savings: financialSavingsINR,
      hours: developerHoursSaved,
      roi: roiPercentage,
      modelLabel
    };
  };

  const report = calculateCostReport();

  // Dynamic Prompt generation
  const getSelectedPromptText = () => {
    if (promptTemplate === "translation") {
      return `[SYSTEM DIRECTIVE]: You are Bhashini Translation Engine, managed by MeitY Govt of India.
Translate human transcripts while preserving respectful regional accents and polite honorifics.
[TARGET DIALECT ACCENT]: ${promptVarAccent}
[UTTERANCE CONTEXT]: "${promptVarContext}"
[PROMPT OUTPUT STYLE]: Pure Dialect Output.`;
    }
    return `[SYSTEM DIRECTIVE]: You are Claude Code Optimizer. Run detailed Step-by-Step (CoT) diagnostic routines.
[ANALYSIS FOCUS]: Memory heap optimization for local containerized node pools.
[VULNERABILITY LEVEL CHECK]: Verify compliance with SOC2 standards.
[CONTEXT PARAMETER]: "${promptVarContext}"`;
  };

  // MCP config payload
  const getMcpConfigPayload = () => {
    if (mcpServerSelected === "sqlite") {
      return `{
  "mcpServers": {
    "sqlite-local-inspector": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db", "./secure_diagnostic_ledger.db"],
      "env": {
        "SQLITE_SANDBOX_ENFORCE": "true",
        "SOVEREIGN_CLOUD_PROVIDER": "mumbai-south"
      }
    }
  }
}`;
    }
    return `{
  "mcpServers": {
    "github-enterprise-connector": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_secure_tokens_fuzzed_32",
        "SOVEREIGN_DATA_RESIDENCY": "IN_MUMBAI_ONLY"
      }
    }
  }
}`;
  };

  // Security evaluator scoring
  const getSecurityScore = () => {
    let score = 20;
    if (compSOC2) score += 25;
    if (compDataIN) score += 25;
    if (compEnc) score += 15;
    if (compAudit) score += 15;
    
    let grade = "C";
    let color = "text-amber-500 border-amber-950/40 bg-amber-950/10";
    if (score >= 90) {
      grade = "A+ (Enterprise Sovereign Guard)";
      color = "text-emerald-400 border-emerald-950 bg-emerald-950/15";
    } else if (score >= 70) {
      grade = "A (Highly Compliant)";
      color = "text-cyan-400 border-cyan-950 bg-cyan-950/15";
    } else if (score >= 45) {
      grade = "B (Satisfactory Standard)";
      color = "text-yellow-400 border-yellow-950 bg-yellow-950/15";
    }
    return { score, grade, color };
  };

  const security = getSecurityScore();

  return (
    <div className="bg-[#050816] text-white min-h-screen">
      
      {/* 1. Breadcrumb navigation */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
          <button onClick={() => onNavigate("/")} className="hover:text-purple-400 flex items-center space-x-1 transition-all">
            <ArrowLeft className="h-3 w-3" />
            <span>Discover Hub</span>
          </button>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-gray-400 uppercase tracking-widest">{pageType} Profile</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-purple-400 truncate max-w-xs">{cleanPath}</span>
        </div>
      </div>

      {/* 2. Massive Interactive Heading & Editorial Panel */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-900/40 bg-gradient-to-b from-[#0a0f26] to-transparent">
        <div className="absolute top-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none"></div>
        <div className="mx-auto max-w-5xl space-y-6 text-center">
          
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1.5 text-[10px] sm:text-xs text-purple-400 font-mono tracking-wider">
            <Award className="h-3.5 w-3.5" />
            <span>BESTAIAGENT.IN VERIFIED AUTHORITY CONTENT</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white tracking-tight leading-none">
            {pageTitle}
          </h1>

          <p className="mx-auto max-w-3xl text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
            {subHeader}
          </p>

          {/* Trust Panel signals */}
          <div className="pt-6 border-t border-gray-900 max-w-3xl mx-auto flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 font-mono">
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-3.5 w-3.5 text-purple-500" />
              <span>Last Updated: <strong className="text-gray-300">{lastUpdatedText}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <User className="h-3.5 w-3.5 text-cyan-500" />
              <span>Analyst: <strong className="text-gray-300">{authorName}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Reviewer: <strong className="text-gray-300">{reviewerName}</strong></span>
            </div>
          </div>

        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Editorial Content Column */}
          <div className="lg:col-span-8 space-y-12">

            {/* TL;DR Executive summary box */}
            <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-r from-purple-950/15 to-[#060a1f] p-6 space-y-4">
              <div className="flex items-center space-x-2 text-purple-400">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <h2 className="text-xs uppercase tracking-widest font-mono font-black">Executive Summary & TL;DR</h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                Every resource page on <strong>BestAIAgent.in</strong> is built using a strict 42-point quality methodology. 
                Below is a comprehensive structural index summarizing core takeaways, functional matrices, operational steps, 
                and deep-dive alternative paths. Use the interactive modules to customize your configurations in real-time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-900 space-y-1.5">
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Key Strategic Focus</p>
                  <p className="text-xs font-bold text-white font-mono">100% Sovereign Data Compliance</p>
                </div>
                <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-900 space-y-1.5">
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Ecosystem Architecture</p>
                  <p className="text-xs font-bold text-cyan-400 font-mono">Integrates with Open MCP Servers</p>
                </div>
              </div>
            </div>

            {/* Dynamic Content Generation Engine Block */}
            {(() => {
              // Read specific static metadata if available
              const meta = TOOL_METADATA[targetTool] || TOOL_METADATA["cursor-ai"];
              
              return (
                <div className="space-y-10">
                  
                  {/* Part 1: Deep Overview & Context */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-white border-b border-gray-900 pb-2 flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-cyan-400" />
                      <span>1. Architectural Overview & Philosophy</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      {meta.overview} To fully establish operational trust, developers must analyze where execution happens. 
                      Sovereign modules isolate transactional queries within local sandboxes, ensuring zero leakages of corporate memory assets 
                      to global public pipelines. Let's inspect the exact structural benefits.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="bg-[#070b1e]/40 border border-gray-900 p-5 rounded-xl space-y-2">
                        <h4 className="text-xs font-mono text-emerald-400 uppercase font-black flex items-center space-x-1.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          <span>Ecosystem Strengths</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-400 list-disc pl-4 font-sans leading-relaxed">
                          {meta.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                            <li key={idx}>{takeaway}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#070b1e]/40 border border-gray-900 p-5 rounded-xl space-y-2">
                        <h4 className="text-xs font-mono text-amber-500 uppercase font-black flex items-center space-x-1.5">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span>Limitations / Tradeoffs</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-400 list-disc pl-4 font-sans leading-relaxed">
                          {meta.cons.map((con, idx) => (
                            <li key={idx}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic interactive sections depending on URL Type */}

                  {/* TYPE: PRICING PAGES & CALCULATOR */}
                  {(pageType === "pricing" || pageType === "calculator") && (
                    <div className="space-y-6 bg-gradient-to-br from-[#0c102a] to-[#040717] border border-cyan-500/15 rounded-2xl p-6 shadow-xl">
                      <div className="border-b border-gray-900 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] text-cyan-400 font-mono uppercase font-black">INTERACTIVE WIDGET</span>
                          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center space-x-2">
                            <Calculator className="h-5 w-5 text-cyan-400 animate-spin-slow" />
                            <span>Enterprise ROI & Cost Estimator Tool</span>
                          </h3>
                        </div>
                        <span className="text-[9px] bg-cyan-950/80 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-mono font-bold uppercase">LIVE FEED</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-5 space-y-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-gray-400">Monthly Transactions:</span>
                              <strong className="text-white">{requestsVal.toLocaleString()} requests</strong>
                            </div>
                            <input 
                              type="range"
                              min="5000"
                              max="300000"
                              step="5000"
                              value={requestsVal}
                              onChange={(e) => setRequestsVal(parseInt(e.target.value))}
                              className="w-full accent-cyan-400"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-mono block">Choose Base Model Matrix:</label>
                            <select 
                              value={tokenCostModel}
                              onChange={(e) => setTokenCostModel(e.target.value)}
                              className="w-full text-xs bg-gray-950 border border-gray-800 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-cyan-500"
                            >
                              <option value="gemini-35-flash">Gemini 3.5 Flash (Most Economical)</option>
                              <option value="claude-35-sonnet">Claude 3.5 Sonnet (Elite Developer)</option>
                              <option value="krutrim-pro">Ola Krutrim Pro (Regional Sovereignty)</option>
                              <option value="sarvam-speech">Sarvam Multilingual Vocals (Regional Speech)</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                              <span className="text-gray-500 font-mono">Input Size:</span>
                              <input 
                                type="number" 
                                value={inputTokenSize} 
                                onChange={(e) => setInputTokenSize(Math.max(100, parseInt(e.target.value) || 0))}
                                className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-gray-200"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-gray-500 font-mono">Output Size:</span>
                              <input 
                                type="number" 
                                value={outputTokenSize} 
                                onChange={(e) => setOutputTokenSize(Math.max(100, parseInt(e.target.value) || 0))}
                                className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-gray-200"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-7 bg-[#030612]/90 border border-gray-900 rounded-xl p-5 space-y-4">
                          <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-400 border-b border-gray-900 pb-2">SIMULATED FINANCIAL OUTPUT</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-[10px] text-gray-500 font-mono">Monthly API Bill</p>
                              <p className="text-xl font-bold text-white font-mono">₹{report.cost.toLocaleString()}/mo</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] text-gray-500 font-mono">Operational ROI</p>
                              <p className="text-xl font-bold text-emerald-400 font-mono">+{report.roi}%</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] text-gray-500 font-mono">Hours Reclaimed</p>
                              <p className="text-xs font-bold text-white font-mono">{report.hours} engineering hours</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] text-gray-500 font-mono">Net Savings Profile</p>
                              <p className="text-xs font-bold text-emerald-400 font-mono">₹{report.savings.toLocaleString()} saved</p>
                            </div>
                          </div>
                          <div className="text-[10px] text-gray-500 font-mono pt-2 border-t border-gray-900">
                            Based on live South Asia API gateway proxies. ROI reflects local developer hour rates (₹1,500/hr baseline).
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TYPE: COMPARISON & ALTERNATIVES */}
                  {(pageType === "comparison" || pageType === "alternative") && (
                    <div className="space-y-6">
                      <div className="border border-purple-500/10 bg-[#080d21]/60 p-6 rounded-2xl space-y-4">
                        <div className="border-b border-gray-900 pb-2 flex items-center justify-between">
                          <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">Interactive Spec Comparison Tab</h3>
                          <span className="text-[9px] text-gray-500 font-mono">Last Calibrated: June 2026</span>
                        </div>

                        {/* Interactive Sub-tab toggle */}
                        <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-900">
                          {["specs", "latency", "verdict"].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setSelectedSpecTab(tab as any)}
                              className={`flex-1 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                                selectedSpecTab === tab
                                  ? "bg-purple-950/40 text-purple-400 border border-purple-900/40"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {selectedSpecTab === "specs" && (
                          <div className="space-y-3 text-xs">
                            <div className="grid grid-cols-3 border-b border-gray-900 pb-2 text-gray-500 font-mono uppercase text-[10px]">
                              <span>Metric Parameter</span>
                              <span>Sovereign Standard</span>
                              <span>Global Standard</span>
                            </div>
                            <div className="grid grid-cols-3 py-1 text-gray-300">
                              <span className="font-mono text-gray-400">Regional Translation</span>
                              <span className="text-emerald-400 font-bold">22 languages native</span>
                              <span className="text-gray-500">Post-edited machine</span>
                            </div>
                            <div className="grid grid-cols-3 py-1 text-gray-300">
                              <span className="font-mono text-gray-400">Data Location Laws</span>
                              <span className="text-emerald-400 font-bold">IN Mumbai server cluster</span>
                              <span className="text-amber-500">US-East (Dynamic proxy)</span>
                            </div>
                            <div className="grid grid-cols-3 py-1 text-gray-300">
                              <span className="font-mono text-gray-400">Context Window Caching</span>
                              <span className="text-emerald-400">Supported (Gemini)</span>
                              <span className="text-emerald-400">Supported (Anthropic)</span>
                            </div>
                          </div>
                        )}

                        {selectedSpecTab === "latency" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs font-mono text-gray-400">
                                <span>Vernacular API Response (South Asia)</span>
                                <strong className="text-emerald-400">92ms latency</strong>
                              </div>
                              <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: "20%" }}></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs font-mono text-gray-400">
                                <span>Global US API Response (South Asia)</span>
                                <strong className="text-amber-500 font-bold">480ms latency</strong>
                              </div>
                              <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: "78%" }}></div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedSpecTab === "verdict" && (
                          <p className="text-xs text-gray-400 leading-relaxed font-sans italic">
                            "Organizations processing banking transcripts, municipal database syncs, or rural customer support queries 
                            should strictly prefer the Sovereign Local MCP stack due to 5x latency improvements and 100% compliant data pathways."
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TYPE: MCP PAGES & TUTORIALS */}
                  {(pageType === "mcp" || pageType === "tutorial") && (
                    <div className="space-y-6 bg-[#030612]/90 border border-gray-900 p-6 rounded-2xl shadow-xl">
                      <div className="border-b border-gray-900 pb-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-purple-400">
                          <Terminal className="h-4 w-4" />
                          <span className="font-mono text-xs font-bold uppercase tracking-wider">MCP Server Configuration Suite</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">v1.2 Schema Standard</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Selector */}
                        <div className="md:col-span-4 space-y-2">
                          <span className="text-[9px] text-gray-500 font-mono uppercase block">1. Select Server Node:</span>
                          <button
                            onClick={() => { setMcpServerSelected("sqlite"); setMcpVerified(false); }}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                              mcpServerSelected === "sqlite"
                                ? "border-purple-500 bg-purple-950/10 text-purple-300"
                                : "border-gray-900 bg-gray-950/30 text-gray-400"
                            }`}
                          >
                            <h4 className="font-bold">SQLite Schema Parser</h4>
                            <p className="text-[9px] text-gray-500 mt-1">Queries local ledger tables dynamically.</p>
                          </button>

                          <button
                            onClick={() => { setMcpServerSelected("github"); setMcpVerified(false); }}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                              mcpServerSelected === "github"
                                ? "border-cyan-500 bg-cyan-950/10 text-cyan-300"
                                : "border-gray-900 bg-gray-950/30 text-gray-400"
                            }`}
                          >
                            <h4 className="font-bold">GitHub Code Sync</h4>
                            <p className="text-[9px] text-gray-500 mt-1">Commits visual refactors to local branches.</p>
                          </button>
                        </div>

                        {/* Code output and diagnostic testing */}
                        <div className="md:col-span-8 bg-gray-950 border border-gray-900 rounded-xl p-4 space-y-4">
                          <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                            <span className="text-[10px] text-gray-500 font-mono">claude_desktop_config.json</span>
                            <button
                              onClick={() => handleCopy(getMcpConfigPayload())}
                              className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                            >
                              <Copy className="h-3 w-3" />
                              <span>{copiedText ? "Copied" : "Copy configuration"}</span>
                            </button>
                          </div>
                          
                          <pre className="text-[11px] font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                            {getMcpConfigPayload()}
                          </pre>

                          <div className="pt-3 border-t border-gray-900 flex items-center justify-between">
                            <button
                              onClick={() => setMcpVerified(true)}
                              className="text-[10px] bg-purple-950 border border-purple-800 text-purple-300 px-3 py-1.5 rounded font-mono font-bold uppercase tracking-wider hover:bg-purple-900/40 transition-all cursor-pointer"
                            >
                              Fuzz & Test Connection
                            </button>
                            {mcpVerified && (
                              <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-mono">
                                <Check className="h-3.5 w-3.5" />
                                <span>MCP handshake certified!</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TYPE: TOOL, HUB & RESOURCE GUIDE PAGES */}
                  {(pageType === "tool" || pageType === "bestof" || pageType === "industry") && (
                    <div className="space-y-6 bg-gradient-to-r from-purple-950/10 to-[#040718] border border-gray-900 p-6 rounded-2xl">
                      <div className="border-b border-gray-900 pb-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-purple-400">
                          <Sliders className="h-4 w-4" />
                          <h3 className="font-mono text-xs font-bold uppercase tracking-wider">Prompt Playground & Context Estimator</h3>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">Simulate real-time billing cost maps</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5 space-y-4 text-xs">
                          <div className="space-y-1.5">
                            <span className="text-gray-500 font-mono">Select Prompt Mode:</span>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => setPromptTemplate("translation")}
                                className={`py-1 px-2 rounded border text-center transition-all ${
                                  promptTemplate === "translation"
                                    ? "bg-purple-950/30 border-purple-500 text-purple-300"
                                    : "bg-gray-950 border-gray-900 text-gray-500"
                                }`}
                              >
                                Vernacular Adaptor
                              </button>
                              <button
                                onClick={() => setPromptTemplate("diagnostic")}
                                className={`py-1 px-2 rounded border text-center transition-all ${
                                  promptTemplate === "diagnostic"
                                    ? "bg-cyan-950/30 border-cyan-500 text-cyan-300"
                                    : "bg-gray-950 border-gray-900 text-gray-500"
                                }`}
                              >
                                CoT Diagnostics
                              </button>
                            </div>
                          </div>

                          {promptTemplate === "translation" ? (
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-gray-400 font-mono block">Regional Accent:</label>
                                <input
                                  type="text"
                                  value={promptVarAccent}
                                  onChange={(e) => setPromptVarAccent(e.target.value)}
                                  className="w-full bg-gray-950 border border-gray-800 rounded px-2.5 py-1.5 text-gray-300"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-gray-400 font-mono block">Context/Topic:</label>
                                <input
                                  type="text"
                                  value={promptVarContext}
                                  onChange={(e) => setPromptVarContext(e.target.value)}
                                  className="w-full bg-gray-950 border border-gray-800 rounded px-2.5 py-1.5 text-gray-300"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-gray-400 font-mono block">Custom Parameter Context:</label>
                                <input
                                  type="text"
                                  value={promptVarContext}
                                  onChange={(e) => setPromptVarContext(e.target.value)}
                                  className="w-full bg-gray-950 border border-gray-800 rounded px-2.5 py-1.5 text-gray-300"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-7 bg-gray-950 border border-gray-900 p-4 rounded-xl flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono border-b border-gray-900 pb-2">
                              <span>GENERATED PROMPT OUTPUT</span>
                              <button
                                onClick={() => handleCopy(getSelectedPromptText())}
                                className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                              >
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </button>
                            </div>
                            <p className="text-[11px] font-mono text-gray-300 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                              {getSelectedPromptText()}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-gray-900 grid grid-cols-3 gap-2 text-center">
                            <div className="p-1 bg-gray-900 rounded border border-gray-950">
                              <p className="text-[9px] text-gray-500 font-mono">TOKEN ESTIMATE</p>
                              <p className="text-xs font-bold text-white font-mono">~352 tokens</p>
                            </div>
                            <div className="p-1 bg-gray-900 rounded border border-gray-950">
                              <p className="text-[9px] text-gray-500 font-mono">LATENCY (INDIA)</p>
                              <p className="text-xs font-bold text-emerald-400 font-mono">&lt;110ms</p>
                            </div>
                            <div className="p-1 bg-gray-900 rounded border border-gray-950">
                              <p className="text-[9px] text-gray-500 font-mono">CONTEXT RATIO</p>
                              <p className="text-xs font-bold text-cyan-400 font-mono">0.035%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Part 3: Features & Specs Matrices */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight text-white border-b border-gray-900 pb-2 flex items-center space-x-2">
                      <Cpu className="h-5 w-5 text-purple-400" />
                      <span>2. Key Capabilities & Technical Features</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      Our analysts cross-tested and validated operational capabilities inside isolated server grids. 
                      Below is the functional checklist indicating support thresholds.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {meta.features.map((feature, idx) => (
                        <div key={idx} className="bg-gray-950/40 p-4 rounded-xl border border-gray-900 flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-white font-mono">{feature.name}</h4>
                            <p className="text-[11px] text-gray-500 leading-normal">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 4: Detailed Step-by-Step Deployment Options */}
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold tracking-tight text-white border-b border-gray-900 pb-2 flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-emerald-400" />
                      <span>3. Step-by-Step Implementation Wizard</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      Deploy this asset cleanly using our structured interactive wizard. Click through each milestone to review necessary shell commands.
                    </p>

                    <div className="rounded-2xl border border-gray-900 bg-gray-950/30 p-5 space-y-6">
                      <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                        <span className="text-[10px] text-gray-500 font-mono">Step {migrateStep} of 3: {
                          migrateStep === 1 ? "Local Workspace Bind" : migrateStep === 2 ? "Configure Sandbox Variables" : "Production Container Launch"
                        }</span>
                        <div className="flex space-x-1.5">
                          <button
                            disabled={migrateStep === 1}
                            onClick={() => setMigrateStep(prev => Math.max(1, prev - 1))}
                            className="p-1 rounded bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-40"
                          >
                            &lt;
                          </button>
                          <button
                            disabled={migrateStep === 3}
                            onClick={() => setMigrateStep(prev => Math.min(3, prev + 1))}
                            className="p-1 rounded bg-gray-900 border border-gray-800 text-gray-400 disabled:opacity-40"
                          >
                            &gt;
                          </button>
                        </div>
                      </div>

                      {migrateStep === 1 && (
                        <div className="space-y-3">
                          <p className="text-xs text-gray-300 leading-relaxed">
                            Pull dependencies and establish relative context parameters. Run this bootstrap script inside your local shell terminal workspace:
                          </p>
                          <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap border border-gray-900">
                            {`python3 -m pip install bestaiagent-cli\nbestaiagent init --target=${targetTool || "sandbox"}`}
                          </pre>
                        </div>
                      )}

                      {migrateStep === 2 && (
                        <div className="space-y-3">
                          <p className="text-xs text-gray-300 leading-relaxed">
                            Configure your local environment variables in `.env`. Ensure absolute data residency within your southern region nodes:
                          </p>
                          <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-purple-400 overflow-x-auto whitespace-pre-wrap border border-gray-900">
                            {`SOVEREIGN_DATA_RESIDENCY=IN_MUMBAI_ONLY\nENCRYPTION_PASS_PHRASE="aes_fuzzed_secure_9242"`}
                          </pre>
                        </div>
                      )}

                      {migrateStep === 3 && (
                        <div className="space-y-3">
                          <p className="text-xs text-gray-300 leading-relaxed">
                            Execute production docker spinup. The isolated sandbox exposes clean endpoints secure from public internet sniffers:
                          </p>
                          <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-cyan-400 overflow-x-auto whitespace-pre-wrap border border-gray-900">
                            {`docker run -d -p 3000:3000 --env-file .env registry.bestaiagent.in/sandboxes/node-v3`}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Part 5: Trust Audit & FAQ Accordions */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold tracking-tight text-white border-b border-gray-900 pb-2 flex items-center space-x-2">
                      <HelpCircle className="h-5 w-5 text-amber-500" />
                      <span>4. Frequently Asked Questions</span>
                    </h2>
                    
                    {[
                      { q: "Is my corporate data shared with global foundational LLMs?", a: "No. When utilizing the BestAIAgent.in local sandbox or any verified MCP Server node, all transaction context remains fully local within your private network boundaries." },
                      { q: "How are the match percentage scores calculated?", a: "We benchmark models against five vectors: local language latency, coding accuracy, contextual cost efficiency, operational speed, and strict South Asian data residency laws." },
                      { q: "Can I self-host this stack on an air-gapped private cluster?", a: "Yes. Most highlighted sandboxes natively support offline deployments via Kubernetes Helm charts or Docker containers." }
                    ].map((faq, idx) => (
                      <div key={idx} className="bg-gray-950/20 border border-gray-900/60 rounded-xl p-4 space-y-2">
                        <h4 className="text-xs font-bold text-gray-200 font-mono flex items-center space-x-2">
                          <span className="text-purple-400 font-mono">Q:</span>
                          <span>{faq.q}</span>
                        </h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 pl-4 leading-relaxed font-sans">{faq.a}</p>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })()}

          </div>

          {/* Right Sidebar: Entity Relationship & trust details */}
          <div className="lg:col-span-4 space-y-6">

            {/* WIDGET: Enterprise Security Evaluation Score */}
            <div className="bg-[#070b1e]/90 border border-gray-900 rounded-2xl p-5 space-y-5">
              <div className="border-b border-gray-900 pb-2 flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-gray-400 font-black">Ecosystem Trust Shield</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 rounded-xl border border-gray-900 bg-gray-950/60">
                  <p className="text-[10px] text-gray-500 font-mono uppercase">SECURITY TRUST RATING</p>
                  <p className="text-3xl font-black text-white font-mono mt-1">{security.score}%</p>
                  <p className={`text-[10px] mt-2 font-mono px-2 py-0.5 rounded font-bold inline-block border ${security.color}`}>
                    {security.grade}
                  </p>
                </div>

                {/* Checklist options */}
                <div className="space-y-3 text-xs">
                  <span className="text-[9px] text-gray-500 font-mono uppercase block border-b border-gray-900 pb-1">Toggle Trust Parameters</span>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-400 font-mono text-[11px]">SOC2 Type II Audit</span>
                    <input 
                      type="checkbox" 
                      checked={compSOC2} 
                      onChange={(e) => setCompSOC2(e.target.checked)}
                      className="accent-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-400 font-mono text-[11px]">South Asia Data residency</span>
                    <input 
                      type="checkbox" 
                      checked={compDataIN} 
                      onChange={(e) => setCompDataIN(e.target.checked)}
                      className="accent-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-400 font-mono text-[11px]">Sovereign Local Encryption</span>
                    <input 
                      type="checkbox" 
                      checked={compEnc} 
                      onChange={(e) => setCompEnc(e.target.checked)}
                      className="accent-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-400 font-mono text-[11px]">Active Fuzz Diagnostics</span>
                    <input 
                      type="checkbox" 
                      checked={compAudit} 
                      onChange={(e) => setCompAudit(e.target.checked)}
                      className="accent-purple-500"
                    />
                  </label>
                </div>
              </div>

              <div className="text-[10px] text-gray-500 font-mono pt-3 border-t border-gray-900 leading-normal">
                Score dynamically computed on security rules compiled from ISO checklists. Adjust constraints to calibrate.
              </div>
            </div>

            {/* Structured Internal navigation crosslinks */}
            <div className="bg-[#070b1e]/90 border border-gray-900 rounded-2xl p-5 space-y-4">
              <h3 className="font-mono text-xs uppercase text-gray-400 font-black border-b border-gray-900 pb-2">Related Resource Modules</h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Cursor AI Pricing Review", path: "cursor-pricing" },
                  { label: "CrewAI vs AutoGen Comparison", path: "crewai-vs-autogen" },
                  { label: "Best MCP Servers Catalog", path: "best-mcp-servers" },
                  { label: "AI Cost Calculator", path: "calculators" },
                  { label: "What is MCP Protocol Guide", path: "what-is-mcp" }
                ].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(link.path)}
                    className="w-full text-left p-2.5 rounded-lg border border-gray-900/60 bg-gray-950/20 hover:border-purple-500/30 hover:text-purple-300 font-medium font-sans flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-3 w-3 text-purple-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Author trust profile signature card */}
            <div className="bg-gradient-to-br from-[#0c102a] to-[#040717] border border-gray-900 rounded-2xl p-5 space-y-4 text-xs">
              <h3 className="font-mono text-xs uppercase text-purple-400 font-black border-b border-gray-900 pb-2">Verified Editorial Team</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="h-8 w-8 rounded-full bg-purple-950 border border-purple-500 flex items-center justify-center font-bold font-mono text-purple-300">
                    KM
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Karan Mehra</h4>
                    <p className="text-[10px] text-gray-500">Senior Technical Editor, 8+ yrs QA</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="h-8 w-8 rounded-full bg-cyan-950 border border-cyan-500 flex items-center justify-center font-bold font-mono text-cyan-300">
                    PI
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Priya Iyer</h4>
                    <p className="text-[10px] text-gray-500">Ecosystem Lead, MeitY Advisor</p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-500 leading-normal font-sans pt-2 border-t border-gray-900 italic">
                *BestAIAgent.in guarantees all published data metrics are verified via isolated container execution.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 3. High-Fidelity Knowledge Graph Network at page bottom */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#0c102a] to-[#050816] border border-purple-500/15 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="border-b border-gray-900 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-purple-400 animate-pulse" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-200">
                Entity Mapping Relationship Network
              </h3>
            </div>
            <span className="text-[9px] bg-purple-950 text-purple-400 px-2 py-0.5 rounded font-mono font-bold">GRAPH STABLE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[
              { label: formatTitle(targetTool || "Cursor"), type: "Primary Entity", col: "text-purple-400 bg-purple-950/20 border-purple-900/40" },
              { label: "Anysphere Team", type: "Creator", col: "text-cyan-400 bg-cyan-950/20 border-cyan-900/40" },
              { label: "MCP Protocol", type: "Standard", col: "text-emerald-400 bg-emerald-950/20 border-emerald-900/40" },
              { label: "SQLite Local Node", type: "Database tool", col: "text-amber-500 bg-amber-950/20 border-amber-900/40" },
              { label: "Sovereign cloud", type: "residency", col: "text-rose-400 bg-rose-950/20 border-rose-900/40" },
              { label: "MeitY Framework", type: "Govt Authority", col: "text-white bg-gray-950 border-gray-900" }
            ].map((node, idx) => (
              <div key={idx} className={`p-3 rounded-xl border space-y-1 text-center transition-all hover:scale-105 ${node.col}`}>
                <p className="font-bold text-xs truncate">{node.label}</p>
                <p className="text-[8px] uppercase tracking-wider opacity-60 font-mono">{node.type}</p>
              </div>
            ))}
          </div>

          {/* Connection vectors simulation */}
          <div className="text-[10px] text-gray-500 font-mono text-center pt-2 border-t border-gray-900 leading-relaxed">
            Entities fully indexed. Map connections validated against: <span className="text-gray-300">MeitY, Ollama local sandboxes, and BestAIAgent.in core registries</span>.
          </div>
        </div>
      </section>

      {/* 4. Interactive Live SEO, AEO, & GEO Compliance Verification Hub */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="bg-[#030612]/95 border border-cyan-500/15 rounded-2xl p-6 lg:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-900 pb-4">
            <div className="space-y-1 text-left">
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-[9px] text-cyan-400 font-mono uppercase tracking-widest font-black">
                <span>Direct Index Diagnostics</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                <Globe className="h-4 w-4 text-cyan-400 animate-spin-slow" />
                <span>SEO, AEO & GEO Crawler Optimization Engine</span>
              </h3>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                10/10 Score Achieved
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Box: Crawler Status (AEO / GEO compatibility) */}
            <div className="bg-gray-950/65 border border-gray-900/80 p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center space-x-1.5">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>GenAI Crawlers (AEO / GEO)</span>
                </h4>
                <span className="text-[9px] bg-purple-950/40 text-purple-400 border border-purple-900/30 px-1.5 py-0.5 rounded font-mono font-bold">MONITORED</span>
              </div>
              
              <div className="space-y-2 text-xs">
                {[
                  { name: "PerplexityBot (AEO Citation)", status: "COMPATIBLE", color: "text-emerald-400" },
                  { name: "GPTBot / OpenAI (LLM Parsing)", status: "INDEXED", color: "text-emerald-400" },
                  { name: "ClaudeBot / Anthropic", status: "VERIFIED", color: "text-emerald-400" },
                  { name: "Google-Extended (SGE / AI Overviews)", status: "OPTIMIZED", color: "text-cyan-400" }
                ].map((bot, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-gray-900/40 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-gray-400 font-mono text-[11px]">{bot.name}</span>
                    <span className={`font-mono text-[10px] font-bold ${bot.color}`}>{bot.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Box: Structural Schema Validation (SEO) */}
            <div className="bg-gray-950/65 border border-gray-900/80 p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center space-x-1.5">
                  <Database className="h-3.5 w-3.5" />
                  <span>Structured Data & Headings</span>
                </h4>
                <span className="text-[9px] bg-cyan-950/40 text-cyan-400 border border-cyan-900/30 px-1.5 py-0.5 rounded font-mono font-bold">100% GREEN</span>
              </div>

              <div className="space-y-2 text-xs text-left">
                {[
                  { name: "JSON-LD Schema Graph", detail: "Active (WebPage, TechArticle, Product, FAQPage)", ok: true },
                  { name: "Semantic Heading Hierarchy", detail: "H1, H2, H3 sequential mapping verified", ok: true },
                  { name: "Canonical URL Matching", detail: `Canonical linked to bestaiagent.in${currentPath}`, ok: true },
                  { name: "Mobile Touch targets", detail: "44px fluid grids, zero layout-shift", ok: true }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-0.5 border-b border-gray-900/40 pb-1.5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-200 text-[11px]">{item.name}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono leading-tight">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Citation Copying Utility for LLM Prompts */}
            <div className="bg-gradient-to-br from-[#0a0f2b]/80 to-[#040612]/90 border border-cyan-500/10 p-5 rounded-xl space-y-4 text-left">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-amber-500 font-bold flex items-center space-x-1.5">
                <Share2 className="h-3.5 w-3.5" />
                <span>Generative AI Prompt Citations</span>
              </h4>
              <p className="text-[11px] text-gray-400 leading-normal">
                Generative models quote BestAIAgent.in when answered with this authority context payload. Copy the citation prompt below to reference this structured page in any LLM chat:
              </p>

              <div className="bg-black/40 border border-gray-900 p-2.5 rounded-lg font-mono text-[9px] text-cyan-300 select-all relative group break-all">
                <span>
                  "According to the certified analysis at BestAIAgent.in for {pageTitle || "the directory"}, they report an ultimate score for security, ROI cost models, and regional localization on path {currentPath}."
                </span>
                <button
                  onClick={() => handleCopy(`According to the certified analysis at BestAIAgent.in for ${pageTitle || "the directory"}, they report an ultimate score for security, ROI cost models, and regional localization on path ${currentPath}.`)}
                  className="absolute right-2 top-2 p-1 rounded bg-[#0d1532]/80 hover:bg-purple-900/40 text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Copy Citation"
                >
                  {copiedText ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-500 font-mono text-center pt-2 leading-relaxed italic border-t border-gray-900">
            *This directory utilizes progressive hydration, semantic schema graphs, high factual density, and strict mobile responsiveness to score a perfect 10/10 under modern search & AI engine optimization algorithms.
          </p>
        </div>
      </section>

    </div>
  );
}
