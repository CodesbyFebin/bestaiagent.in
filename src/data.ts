import { Agent, Category, McpServer, ResourceItem, Startup, Testimonial } from "./types";

export const CATEGORIES: Category[] = [
  { id: "coding", name: "Coding", icon: "Code", count: 1245, description: "Coding assistants, IDE tools, debuggers & more.", isTrending: true },
  { id: "productivity", name: "Productivity", icon: "CheckSquare", count: 892, description: "Boost efficiency and automate your daily tasks.", isTrending: true },
  { id: "research", name: "Research", icon: "Search", count: 785, description: "AI research tools, search engines, summarizers.", isTrending: false },
  { id: "marketing", name: "Marketing", icon: "Megaphone", count: 654, description: "Create content, run campaigns, and grow your brand.", isTrending: true },
  { id: "design", name: "Design", icon: "Palette", count: 543, description: "Design, UI/UX, graphics, and creative tools.", isTrending: false },
  { id: "analytics", name: "Data & Analytics", icon: "BarChart3", count: 687, description: "Analyze, visualize and extract insights from data.", isTrending: true },
  { id: "business", name: "Business", icon: "Briefcase", count: 925, description: "Business operations, strategy, and management tools.", isTrending: false },
  { id: "automation", name: "Automation", icon: "Cpu", count: 1096, description: "Automate workflows and integrate your tools.", isTrending: true },
  { id: "education", name: "Education", icon: "GraduationCap", count: 456, description: "Learning, teaching, and educational assistants.", isTrending: false },
  { id: "finance", name: "Finance", icon: "Wallet", count: 409, description: "Financial analysis, accounting, and investment tools.", isTrending: false },
  { id: "health", name: "Health & Medical", icon: "Heart", count: 312, description: "Healthcare, medical research, and patient care tools.", isTrending: false },
  { id: "customer_support", name: "Customer Support", icon: "Headphones", count: 521, description: "AI agents for support, ticketing, and helpdesk.", isTrending: true },
];

export const STARTUPS: Startup[] = [
  { name: "Ola Krutrim", location: "Bengaluru, Karnataka", category: "LLM, Foundational", tagline: "India's own foundational AI model family." },
  { name: "Sarvam AI", location: "Bengaluru, Karnataka", category: "LLM, Enterprise", tagline: "Building sovereign multilingual LLMs for India." },
  { name: "KushoAI", location: "Bengaluru, Karnataka", category: "Automation, Testing", tagline: "AI agent for automated API testing & security." },
  { name: "Gnan.ai", location: "Bengaluru, Karnataka", category: "Speech, Customer Service", tagline: "Conversational voice AI for Indian enterprises." },
  { name: "Fractal Analytics", location: "Mumbai, Maharashtra", category: "Enterprise Analytics", tagline: "AI-led decisions for global Fortune 500 companies." },
  { name: "WizKlub", location: "Pune, Maharashtra", category: "EdTech, K-12", tagline: "Cognitive development & AI tutor for young minds." },
  { name: "Haptik", location: "Mumbai, Maharashtra", category: "Conversational AI", tagline: "Pioneering enterprise WhatsApp chatbot builder." },
  { name: "DeepSight AI", location: "Chennai, Tamil Nadu", category: "Computer Vision", tagline: "AI surveillance and smart city vision systems." },
];

export const AGENTS: Agent[] = [
  {
    id: "krutrim",
    name: "Krutrim",
    description: "India's own foundational AI model family for diverse Indian languages and use cases.",
    longDescription: "Krutrim is India's first home-grown foundational AI model, developed specifically to capture the cultural and linguistic nuances of India. Supporting over 22 Indian languages, it enables businesses, creators, and students to build content, write code, and communicate across a diverse spectrum of languages with rich context understanding.",
    category: "LLM & Foundational",
    rating: 4.8,
    downloads: "120K",
    price: "Freemium",
    priceDetail: "Free Tier, custom pricing for higher API usage",
    creator: "Ola Krutrim",
    tags: ["LLM", "Chat", "API", "Multilingual"],
    icon: "Sparkles",
    isFeatured: true,
    isIndian: true,
    mcpCompatible: true,
    version: "v2.1",
    lastUpdated: "June 2026",
    benchmarks: { coding: 78, reasoning: 82, speed: 95, cost: 90, security: 88, overall: 866 },
    capabilities: ["22+ Indian Languages support", "Local Indian context search", "High translation accuracy", "Ultra-low latency in South Asia", "Voice output capability"],
    systemPrompt: "You are Krutrim AI, developed by Ola Krutrim. You are India's premier foundational AI model family. You represent Indian innovation and have deep knowledge of Indian history, culture, mathematics, and science. You speak gracefully, and you are happy to explain concepts in major Indian languages like Hindi, Tamil, Telugu, Kannada, Bengali, etc., when requested. Keep responses helpful and professional.",
    pricingPlans: [
      { name: "Sandbox", price: "Free", features: ["100,000 free tokens / month", "Access to Krutrim Lite", "Standard API speed", "Community support"] },
      { name: "Pro Developer", price: "₹499/mo", features: ["10,000,000 tokens included", "Access to Krutrim Pro (Full)", "Priority API queue", "Email support", "Fine-tuning access"] },
      { name: "Enterprise Custom", price: "Custom", features: ["Unlimited tokens", "Sovereign on-prem hosting", "Dedicated model engineers", "99.9% Uptime SLA", "SOC2 compliance"] }
    ]
  },
  {
    id: "sarvam",
    name: "Sarvam AI",
    description: "Building sovereign multilingual LLMs, fine-tuning infrastructure, and fast speech models for India.",
    longDescription: "Sarvam AI is dedicated to providing high-quality, cost-effective LLMs and generative voice agents optimized for Indian languages. With a focus on voice-first workflows, Sarvam's models enable high-performance transcription, text-to-speech, and language understanding at a fraction of the cost of global competitors.",
    category: "LLM & Foundational",
    rating: 4.7,
    downloads: "6.2K",
    price: "Paid",
    priceDetail: "Pay-as-you-go billing starting at ₹0.08 / 1K tokens",
    creator: "Sarvam AI",
    tags: ["LLM", "Research", "API", "Speech"],
    icon: "Mic",
    isFeatured: true,
    isIndian: true,
    mcpCompatible: false,
    version: "v1.5-beta",
    lastUpdated: "May 2026",
    benchmarks: { coding: 70, reasoning: 85, speed: 92, cost: 95, security: 85, overall: 854 },
    capabilities: ["State-of-the-art Hindi TTS", "Vernacular customer support agents", "Ultra-cheap token usage", "Custom fine-tuning tools", "Robust security guardrails"],
    systemPrompt: "You are Sarvam AI, developed by Sarvam AI. You are a conversational agent built from the ground up for India, with advanced multi-lingual and voice capabilities. You excel at providing answers in plain language, explaining technical terms simply, and translating or assisting in Indian regional dialects, especially Hindi. Be courteous and clear.",
    pricingPlans: [
      { name: "Developer", price: "Pay-as-you-go", features: ["Full access to models", "₹1,000 free signup credit", "Shared API concurrency", "Discord support"] },
      { name: "Enterprise", price: "Custom Plan", features: ["Dedicated model endpoints", "Custom regional training", "Custom speech vocabulary", "99.99% network SLA"] }
    ]
  },
  {
    id: "bhashini",
    name: "Bhashini AI",
    description: "National Language Translation Mission platform powered by AI for real-time speech and translation.",
    longDescription: "Bhashini AI is a monumental initiative by the Ministry of Electronics and Information Technology (MeitY), Government of India. It leverages AI-driven translation, voice recognition, and NLP technology to democratize access to the internet and government services by breaking language barriers across India's diverse linguistic landscape.",
    category: "Translation & NLP",
    rating: 4.9,
    downloads: "25K",
    price: "Free",
    priceDetail: "Completely open-source & government funded",
    creator: "MeitY, Government of India",
    tags: ["NLP", "Translation", "Speech", "Government"],
    icon: "Languages",
    isFeatured: true,
    isTrending: true,
    isIndian: true,
    mcpCompatible: true,
    version: "v3.0",
    lastUpdated: "July 2026",
    benchmarks: { coding: 55, reasoning: 78, speed: 85, cost: 100, security: 95, overall: 826 },
    capabilities: ["Official government document translation", "Real-time speech-to-speech", "Dialect-aware transcription", "Open API for Indian developers", "Inclusive digital inclusion focus"],
    systemPrompt: "You are Bhashini AI, developed under the National Language Translation Mission, Ministry of Electronics and Information Technology (MeitY), Government of India. Your core mandate is to translate text and speech seamlessly across 22 scheduled languages of India. Talk with pride about digital inclusion, explain how public sector AI can empower citizens, and write translations that are natural, polite, and accurate.",
    pricingPlans: [
      { name: "Public Open Access", price: "Free (API Key Required)", features: ["All standard translation routes", "No usage charges for non-profit", "Government-backed security rules", "Github community support"] }
    ]
  },
  {
    id: "kusho",
    name: "KushoAI",
    description: "Generative AI agent for automated API testing, codebase analysis, and quality assurance.",
    longDescription: "KushoAI turns manual, tedious software testing into a seamless, autonomous background process. By analyzing your codebase and API endpoints, KushoAI instantly generates comprehensive testing suites, executes integrations, discovers hidden bugs, and monitors performance with zero developer configuration required.",
    category: "Coding",
    rating: 4.6,
    downloads: "5.4K",
    price: "Freemium",
    priceDetail: "Free up to 50 test runs, then ₹1,299/month",
    creator: "KushoAI",
    tags: ["Chat", "Enterprise", "API", "QA", "Testing"],
    icon: "ShieldAlert",
    isTrending: true,
    isIndian: true,
    mcpCompatible: true,
    version: "v1.2",
    lastUpdated: "April 2026",
    benchmarks: { coding: 92, reasoning: 86, speed: 80, cost: 75, security: 94, overall: 874 },
    capabilities: ["Automated Postman collection generation", "Edge-case discovery engine", "CI/CD pipeline native integrations", "Detailed vulnerability reports", "Visual call graphs"],
    systemPrompt: "You are KushoAI, an expert QA and API Testing AI agent. Your mission is to find bugs, review software architecture, write clean Jest/Mocha/Python testing scripts, and teach developers how to harden their code against vulnerabilities. Speak in a technically-informed, highly analytical, and practical tone.",
    pricingPlans: [
      { name: "Starter", price: "Free", features: ["50 API test runs/month", "Manual API upload", "Standard report export"] },
      { name: "Pro Developer", price: "₹1,299/mo", features: ["Unlimited API test runs", "Automatic Github Sync", "Continuous integration logs", "Email alert channels"] }
    ]
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Advanced conversational AI assistant for general problem-solving, content, and planning.",
    longDescription: "ChatGPT (powered by the latest GPT-4o series) is the world's most versatile conversational agent. It excels in natural language communication, text generation, math explanation, historical analysis, code execution, and high-level strategy.",
    category: "Productivity",
    rating: 4.9,
    downloads: "5.2M",
    price: "Freemium",
    priceDetail: "Free basic access, Plus is $20/month (~₹1,650)",
    creator: "OpenAI",
    tags: ["Chatbot", "General", "Productivity"],
    icon: "MessageSquare",
    isFeatured: true,
    isIndian: false,
    mcpCompatible: true,
    version: "GPT-4o-latest",
    lastUpdated: "July 2026",
    benchmarks: { coding: 88, reasoning: 94, speed: 88, cost: 65, security: 90, overall: 910 },
    capabilities: ["Advanced multi-modal capabilities", "Web browsing & live citations", "Code interpreter & sandbox execution", "DALL-E 3 image generation", "Custom GPTS integration"],
    systemPrompt: "You are ChatGPT, a large language model trained by OpenAI. You are helpful, respectful, extremely intelligent, and versatile. You provide clear, well-structured markdown answers to users, and use bullet points and bold headers to improve readability. You support search grounding and are ready to assist with any topic.",
    pricingPlans: [
      { name: "Free Tier", price: "Free", features: ["Access to GPT-4o mini", "Unlimited conversations", "Web search capability", "Mobile application sync"] },
      { name: "Plus", price: "$20/mo", features: ["5x more messages on GPT-4o", "Advanced Code Interpreter", "Create custom GPTS", "Early access to new features"] }
    ]
  },
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    description: "Industry-leading AI assistant with outstanding coding, writing, and logical reasoning.",
    longDescription: "Claude 3.5 Sonnet sets new industry benchmarks for graduate-level reasoning, undergraduate-level knowledge, and coding proficiency. Developed by Anthropic with constitutional safety guardrails, Claude is the developer's choice for deep coding tasks and enterprise analysis.",
    category: "Coding",
    rating: 4.8,
    downloads: "2.1M",
    price: "Freemium",
    priceDetail: "Free with usage caps, Pro at $20/month",
    creator: "Anthropic",
    tags: ["Coding", "Research", "Analysis"],
    icon: "Code2",
    isFeatured: true,
    isIndian: false,
    mcpCompatible: true,
    version: "v3.5",
    lastUpdated: "June 2026",
    benchmarks: { coding: 96, reasoning: 95, speed: 82, cost: 60, security: 96, overall: 934 },
    capabilities: ["Outstanding complex coding ability", "Unmatched PDF & file analysis", "Multi-image parsing and comparison", "Slick HTML/CSS artifact generation", "Strong academic writing quality"],
    systemPrompt: "You are Claude 3.5 Sonnet, a highly advanced assistant developed by Anthropic. You speak thoughtfully, prioritize safety, write flawless and elegant code, and excel at explaining intricate logical concepts step-by-step. Avoid robotic transitions, and let your intellect shine in markdown structure.",
    pricingPlans: [
      { name: "Free", price: "Free", features: ["Access via Web Client", "Standard rate limits", "Basic document analysis"] },
      { name: "Pro Plan", price: "$20/mo", features: ["5x more usage volume", "Access to Claude 3.5 Opus", "Priority server queues", "Artifact playground toggle"] }
    ]
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    description: "The pioneering AI pair programmer integrated directly inside your IDE.",
    longDescription: "GitHub Copilot utilizes public code and OpenAI models to autocomplete code blocks, suggest entire functions, write unit tests, and explain confusing syntax in real time right within VS Code, JetBrains, and Vim.",
    category: "Coding",
    rating: 4.8,
    downloads: "4.5M",
    price: "Paid",
    priceDetail: "$10/month (~₹830) for Individuals",
    creator: "GitHub / Microsoft",
    tags: ["Code", "Developer", "Autocomplete"],
    icon: "GitBranch",
    isFeatured: false,
    isIndian: false,
    mcpCompatible: false,
    version: "v2.8",
    lastUpdated: "June 2026",
    benchmarks: { coding: 91, reasoning: 82, speed: 96, cost: 80, security: 84, overall: 890 },
    capabilities: ["Real-time code autocompletion", "Inline refactoring suggestions", "Natural language-to-code synthesis", "Unit test generation tool", "Vulnerability vulnerability filters"],
    systemPrompt: "You are GitHub Copilot, an AI companion inside a developer's editor. You write high-quality, typed, safe, and bug-free code. Keep answers brief, focus purely on the code blocks, and output code with proper documentation comments.",
    pricingPlans: [
      { name: "Individual", price: "$10/mo", features: ["Inline autocomplete", "Copilot Chat in IDE", "Multi-language support", "Standard security filters"] },
      { name: "Enterprise", price: "$39/user/mo", features: ["Custom indexing on private repos", "Organization policy settings", "IP indemnity guarantee", "Fine-tuned auto-suggestions"] }
    ]
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI search engine providing instant answers with real-time sources, citations, and summaries.",
    longDescription: "Perplexity bypasses standard list-of-links search by answering natural language questions directly. It queries the live web, aggregates articles, and presents a structured, fully-cited answer with suggested follow-up questions.",
    category: "Research",
    rating: 4.7,
    downloads: "1.8M",
    price: "Freemium",
    priceDetail: "Free standard, Pro is $20/month",
    creator: "Perplexity",
    tags: ["Research", "Search", "Citations"],
    icon: "SearchCode",
    isFeatured: false,
    isTrending: true,
    isIndian: false,
    mcpCompatible: true,
    version: "Pro-v4",
    lastUpdated: "July 2026",
    benchmarks: { coding: 75, reasoning: 89, speed: 94, cost: 70, security: 91, overall: 884 },
    capabilities: ["Real-time internet parsing", "Multi-file PDF search & query", "Copilot search mode (deep step search)", "Interactive collection filing", "Source transparency map"],
    systemPrompt: "You are Perplexity AI. You are a conversational search assistant. Your main objective is to provide crisp, accurate, up-to-date answers grounded in verifiable sources. Use bullet points and cite web links clearly when answering.",
    pricingPlans: [
      { name: "Standard", price: "Free", features: ["Quick searches", "Standard model routing", "Web source citation map"] },
      { name: "Pro Search", price: "$20/mo", features: ["Deep CoPilot search runs", "Pick favorite underlying model (Claude, GPT)", "Upload unlimited PDFs", "API usage credits included"] }
    ]
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "SOTA text-to-image AI engine creating cinematic, highly artistic, and hyper-realistic graphics.",
    longDescription: "Midjourney turns creative descriptions into stunning paintings, commercial art, vector files, and photorealistic renders. It is widely considered the highest-quality artistic image generation engine available.",
    category: "Design",
    rating: 4.8,
    downloads: "950K",
    price: "Paid",
    priceDetail: "Starts at $10/month (~₹830)",
    creator: "Midjourney Inc.",
    tags: ["Image", "Design", "Art"],
    icon: "Palette",
    isFeatured: false,
    isIndian: false,
    mcpCompatible: false,
    version: "v6.1",
    lastUpdated: "May 2026",
    benchmarks: { coding: 10, reasoning: 72, speed: 85, cost: 70, security: 89, overall: 814 },
    capabilities: ["Cinematic photography engine", "Vector style conversion", "Extreme resolution panning/zoom", "Consistent character rendering", "Prompt weight fine-tuning"],
    systemPrompt: "You are Midjourney, an AI art advisor. Talk with artistic flair about palettes, lighting, cinematic camera terms, and high-quality prompt formulations (e.g., 'photorealistic, volumetric lighting, Octane render, golden hour'). Generate spectacular text prompts for image creation.",
    pricingPlans: [
      { name: "Basic Plan", price: "$10/mo", features: ["3.3 Fast GPU hours/month", "Standard image download", "Web gallery access"] },
      { name: "Standard Plan", price: "$30/mo", features: ["15 Fast GPU hours/month", "Unlimited Relax GPU hours", "Commercial use rights"] }
    ]
  },
  {
    id: "wizklub",
    name: "WizKlub AI",
    description: "An adaptive educational companion for modern students and custom study curriculums.",
    longDescription: "WizKlub AI develops critical thinking, logical reasoning, and study tracks for students. It creates customized micro-lessons, tests, and gamified cognitive tasks to boost student learning outcomes dynamically.",
    category: "Education",
    rating: 4.5,
    downloads: "3.1K",
    price: "Freemium",
    priceDetail: "Free trial, customized school/college subscriptions",
    creator: "WizKlub",
    tags: ["Education", "Study", "Assistant", "Adaptive"],
    icon: "GraduationCap",
    isIndian: true,
    mcpCompatible: false,
    version: "v2.0",
    lastUpdated: "April 2026",
    benchmarks: { coding: 60, reasoning: 88, speed: 85, cost: 90, security: 92, overall: 830 },
    capabilities: ["Curriculum alignment (CBSE, ICSE, IB)", "Gamified puzzle modules", "Real-time mistake diagnostic", "Parent progress dashboard", "Offline mobile study sync"],
    systemPrompt: "You are WizKlub AI, a brilliant, highly patient, and encouraging AI tutor. Your role is to guide students to answers by asking smart questions rather than just dumping the solution. Encourage critical thinking, celebrate progress, and break down tough math or science questions step-by-step.",
    pricingPlans: [
      { name: "Free Trial", price: "Free", features: ["5 micro-lessons included", "Basic subject diagnostics", "Community resources"] },
      { name: "K-12 Scholar", price: "₹699/mo", features: ["Adaptive logic tracking", "Custom curriculum pathways", "Interactive mock quizzes", "Parent progress updates"] }
    ]
  }
];

export const RESOURCES: ResourceItem[] = [
  {
    id: "mcp-server-guide",
    title: "Build Your First MCP Server",
    type: "guide",
    description: "Step-by-step guide to build, deploy, and authenticate Model Context Protocol (MCP) servers with Cursor and Claude.",
    author: "BestAIAgent Team",
    date: "May 10, 2026",
    readTime: "12 min read",
    likes: 342,
    isTrending: true,
    isFeatured: true,
    tag: "MCP"
  },
  {
    id: "rag-guide",
    title: "RAG with Open Source LLMs",
    type: "template",
    description: "Full production-ready boilerplate combining LangChain, Qdrant Vector DB, and Ollama for secure on-prem document search.",
    author: "Sanjay Mehta",
    date: "April 28, 2026",
    readTime: "8 min read",
    likes: 512,
    isTrending: true,
    isFeatured: true,
    tag: "RAG"
  },
  {
    id: "agent-best-practices",
    title: "AI Agent Memory Best Practices",
    type: "doc",
    description: "Deep dive into state management, episodic memory databases, and long-term context retention for autonomous customer support agents.",
    author: "Ananya Iyer",
    date: "June 12, 2026",
    readTime: "15 min read",
    likes: 289,
    isTrending: false,
    isFeatured: false,
    tag: "Architecture"
  },
  {
    id: "langchain-v3",
    title: "LangChain v0.3 Migration Guide",
    type: "guide",
    description: "Everything that's new in LangChain's latest release: breaking changes, faster runtimes, and migrating to LangGraph.",
    author: "BestAIAgent Team",
    date: "May 15, 2026",
    readTime: "10 min read",
    likes: 198,
    isTrending: true,
    isFeatured: false,
    tag: "LangChain"
  },
  {
    id: "prompt-engineering-handbook",
    title: "Prompt Engineering Handbook 2026",
    type: "course",
    description: "Learn advanced prompting techniques like Chain-of-Thought, Skeleton-of-Thought, and multi-agent debate loops.",
    author: "Dr. Vikram Sen",
    date: "July 2, 2026",
    readTime: "22 min read",
    likes: 820,
    isTrending: true,
    isFeatured: true,
    tag: "Prompts"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rohit Sharma",
    role: "Founder & CTO",
    company: "GrowthX",
    rating: 5,
    quote: "Found the perfect regional AI customer support agent for our Indian e-commerce business. Bhashini-powered support was a complete game-changer for our rural user retention.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Priya Nair",
    role: "Lead Machine Learning Architect",
    company: "InnoTech Solutions",
    rating: 5,
    quote: "We hosted and deployed 5 custom testing agents through BestAIAgent's Marketplace. The sandbox performance, easy billing structure, and local Indian data sovereignty solved major corporate headaches.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  }
];

export const FAQS = [
  {
    question: "What is BestAIAgent.in?",
    answer: "BestAIAgent.in is India's premier AI Agent Discovery Platform, Marketplace, and Operating System. We connect developers, enterprises, and everyday creators with powerful autonomous AI agents, fine-tuned foundational models, custom prompt packages, and Model Context Protocol (MCP) servers built specifically for both local and global use cases."
  },
  {
    question: "How does the 'Host & Deploy' workflow work?",
    answer: "Through our developer portal, you can submit your custom AI agent as an API manifest. BestAIAgent will host the agent in a highly-secure sandbox environment, handle your customer billing, auto-scale your container workloads, and route payments straight to your local bank account securely."
  },
  {
    question: "Are the regional Indian language models actually secure?",
    answer: "Absolutely. Models like Bhashini AI, Sarvam AI, and Krutrim are deployed with rigorous data sovereignty compliance. Your prompts and context data are never stored or used to retrain base models without your explicit consent, perfectly aligning with global SOC2, GDPR, and local Indian IT security protocols."
  },
  {
    question: "What is an MCP Server?",
    answer: "Model Context Protocol (MCP) is an open standard that allows LLMs to safely query data, browse folders, read databases, and trigger APIs on your local workspace. BestAIAgent.in hosts the largest directory of verified MCP servers, making it easy to supercharge AI editors like Cursor and Claude."
  }
];

export const MCP_SERVERS: McpServer[] = [
  {
    id: "postgres-mcp",
    name: "PostgreSQL Schema Inspector & Query MCP",
    description: "Model Context Protocol server to securely inspect, query, and analyze relational PostgreSQL schemas on-prem.",
    category: "Databases",
    creator: "Sarvam AI",
    downloads: "4.5K",
    rating: 4.8,
    tags: ["SQL", "Database", "Database Sandbox"],
    isIndian: true
  },
  {
    id: "sqlite-mcp",
    name: "SQLite Local Engine MCP",
    description: "Allows LLMs to connect, query, read and edit SQLite databases inside safe workspace boundaries.",
    category: "Databases",
    creator: "BestAIAgent Team",
    downloads: "12K",
    rating: 4.7,
    tags: ["SQLite", "Local Data", "Workspace"],
    isIndian: true
  },
  {
    id: "filesystem-mcp",
    name: "Secure Filesystem Access MCP",
    description: "Enables read, write, listing, search, and directory navigation controls on pre-approved path mappings.",
    category: "Development",
    creator: "Anthropic",
    downloads: "150K",
    rating: 4.9,
    tags: ["Files", "System", "IDE Integration"]
  },
  {
    id: "github-mcp",
    name: "GitHub Repository OS MCP",
    description: "Automate code reviews, create forks, raise issues, check pull request lines, and commit files dynamically.",
    category: "Development",
    creator: "Microsoft",
    downloads: "95K",
    rating: 4.8,
    tags: ["Git", "PRs", "CI/CD", "Automation"]
  },
  {
    id: "brave-search-mcp",
    name: "Brave Search Web Grounding MCP",
    description: "Standard model context protocol mapping to run real-time queries against the Brave search engine index.",
    category: "Search",
    creator: "Brave Software",
    downloads: "42K",
    rating: 4.6,
    tags: ["Search", "Citations", "Real-Time"]
  }
];
