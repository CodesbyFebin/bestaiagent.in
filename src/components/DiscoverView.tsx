import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Sparkles, Star, Download, Heart, ArrowUpRight, CheckCircle2, 
  Layers, ChevronRight, MessageSquare, SlidersHorizontal, Info, Award, HelpCircle, Activity, RefreshCw,
  Play, Flame, Terminal, Cpu, Database, Network, ShieldCheck, FileText, Zap, Globe, Share2, Clipboard,
  Eye, Copy, ArrowRight, Check, DollarSign
} from "lucide-react";
import { AGENTS, TESTIMONIALS, STARTUPS, MCP_SERVERS } from "../data";
import { Agent } from "../types";

interface DiscoverViewProps {
  onAgentClick: (agent: Agent) => void;
  onAddToCompare: (agent: Agent) => void;
  searchQuery: string;
  onSearchQueryChange?: (query: string) => void;
  onNavigate?: (path: string) => void;
}

export default function DiscoverView({ onAgentClick, onAddToCompare, searchQuery, onSearchQueryChange, onNavigate }: DiscoverViewProps) {
  // Navigation & filtering states
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [onlySovereign, setOnlySovereign] = useState(false);
  const [localLikedIds, setLocalLikedIds] = useState<string[]>([]);

  // 1. Live Observatory Metrics
  const [trendingChips, setTrendingChips] = useState([
    { label: "Bhashini AI", term: "bhashini", rate: 54.2, type: "spike" },
    { label: "Sarvam Speech", term: "sarvam", rate: 18.1, type: "spike" },
    { label: "Github MCP", term: "github-mcp", rate: 12.4, type: "clicks" },
    { label: "Krutrim Pro", term: "krutrim", rate: 34.6, type: "spike" },
    { label: "SQLite Local MCP", term: "sqlite-mcp", rate: 4.8, type: "clicks" }
  ]);

  const [searchesPerMin, setSearchesPerMin] = useState(194);
  const [activeDeployments, setActiveDeployments] = useState(1482);
  const [fastestGrowing, setFastestGrowing] = useState("Audio & Speech Services (▲112%)");

  // Global Activity Feed Live Ticker
  const [activityFeed, setActivityFeed] = useState([
    "Sovereign sandbox deployed: Hindi-to-Tamil transcription node booted in Chennai",
    "Someone compared Krutrim Lite vs ChatGPT in Spend Simulator",
    "New SQLite Local MCP Server fuzzed and certified (12.4K clicks today)",
    "KushoAI executed automated API test suite on local corporate ledger container",
    "Enterprise audit completed: Bhashini translation module received Level 3 trust badge"
  ]);

  // 2. Interactive Advisor Quiz States
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    focus: "coding",
    sovereign: "yes",
    protocol: "mcp"
  });
  const [quizResults, setQuizResults] = useState<Agent[] | null>(null);

  // 3. Knowledge Graph States
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>("krutrim");
  const graphNodes = [
    { id: "krutrim", name: "Ola Krutrim", type: "model", x: 200, y: 100, desc: "India's homegrown foundational LLM family capturing 22+ regional languages.", connection: "Connects to MeitY Guidelines & MCP Protocol standards." },
    { id: "sarvam", name: "Sarvam AI", type: "company", x: 480, y: 90, desc: "Sovereign speech-first LLM development house optimized for cost-effectiveness.", connection: "Direct pipelines to translation corpora and local telephony API integrations." },
    { id: "bhashini", name: "Bhashini AI", type: "government", x: 330, y: 220, desc: "MeitY national translation engine and open transcription APIs.", connection: "Acts as public sector digital inclusion backend for enterprise apps." },
    { id: "claude", name: "Claude 3.5", type: "model", x: 680, y: 220, desc: "US global standard model with extreme coding, reasoning & artifact capability.", connection: "Interoperable with local MCP standards for corporate filesystem queries." },
    { id: "mcp", name: "MCP Protocol", type: "protocol", x: 450, y: 350, desc: "Model Context Protocol. The open-standard bridging local sandboxes to LLMs.", connection: "Standard used by ChatGPT, Claude, and Krutrim for safe execution." },
    { id: "postgres-mcp", name: "Postgres MCP", type: "tool", x: 220, y: 390, desc: "Model-driven schema inspector and transactional database sandbox query tool.", connection: "Allows local agents to execute structural diagnostic SQL statements securely." },
    { id: "speech-api", name: "Speech APIs", type: "tool", x: 620, y: 380, desc: "Low-latency regional text-to-speech engine running at <120ms latency.", connection: "Powered by Sarvam and Bhashini AI for remote conversational bots." },
    { id: "government", name: "Govt of India", type: "authority", x: 140, y: 250, desc: "Ministry of Electronics (MeitY) sponsoring Digital India and AI Trust mandates.", connection: "Formulates sovereign data security norms and funds vernacular models." }
  ];
  
  const graphConnections = [
    { from: "government", to: "bhashini" },
    { from: "krutrim", to: "bhashini" },
    { from: "sarvam", to: "bhashini" },
    { from: "sarvam", to: "speech-api" },
    { from: "claude", to: "mcp" },
    { from: "krutrim", to: "mcp" },
    { from: "postgres-mcp", to: "mcp" },
    { from: "postgres-mcp", to: "sarvam" }
  ];

  // 4. Registry & Prompt Hub States
  const [hubTab, setHubTab] = useState<"registry" | "prompts">("prompts");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("cot-coder");
  const [promptVariables, setPromptVariables] = useState({
    code: "def bubble_sort(arr):\n    pass",
    complexity: "O(n^2)",
    dialect: "Bengali / Rural Accent",
    transcript: "Aapka aadhar card link hai?",
    schema: "users (id INT, email VARCHAR, verified BOOLEAN)",
    request: "Get all unverified users"
  });

  // Prompt hub copy indicator
  const [promptCopied, setPromptCopied] = useState(false);

  // 5. Enterprise Deployment Center States
  const [deployTech, setDeployTech] = useState<"docker" | "k8s" | "helm" | "ollama">("docker");
  const [deployCopied, setDeployCopied] = useState(false);

  // Volume 2 Semantic Search Results States
  const [semanticResults, setSemanticResults] = useState<{
    agents: { id: string; relevance: number; reason: string }[];
    companies: { name: string; relevance: number; reason: string }[];
    mcpServers: { id: string; relevance: number; reason: string }[];
    source: string;
  } | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fluctuate trending stats and activities dynamically to bring the Observatory to life
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate chips
      setTrendingChips(prev => 
        prev.map(chip => {
          const change = (Math.random() - 0.45) * 2; 
          const newRate = chip.type === "spike"
            ? Math.max(5, parseFloat((chip.rate + change).toFixed(1)))
            : Math.max(1, parseFloat((chip.rate + change / 10).toFixed(1)));
          return { ...chip, rate: newRate };
        })
      );
      // Fluctuate live stats
      setSearchesPerMin(prev => Math.max(120, prev + Math.floor((Math.random() - 0.5) * 12)));
      setActiveDeployments(prev => Math.max(1000, prev + Math.floor((Math.random() - 0.4) * 4)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update Global Activity Feed randomly
  useEffect(() => {
    const activityPool = [
      "Enterprise audit completed: Krutrim Pro received Level 4 Security Trust Shield",
      "Sovereign workspace container spun up on Railway in Mumbai datacenter",
      "Someone compared Claude 3.5 vs DeepSeek-Coder in Spend Simulator",
      "Sarvam speech-first agent processed 8,400 concurrent calls in Karnataka",
      "File-system MCP server deployed locally in Cursor editor by developer in Pune",
      "Bhashini translation API response fuzzed & calibrated (Latency 94ms)",
      "New prompt template uploaded: RAG Context Filter with Guardrails",
      "Anonymous builder cloned Multilingual Voice Assistant workflow (v2.4)"
    ];
    
    const interval = setInterval(() => {
      setActivityFeed(prev => {
        const randomIndex = Math.floor(Math.random() * activityPool.length);
        const nextActivity = activityPool[randomIndex];
        // Ensure no adjacent duplicates
        if (prev[0] === nextActivity) return prev;
        return [nextActivity, ...prev.slice(0, 4)];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Fetch semantic search results with debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSemanticResults(null);
      return;
    }

    setSearchLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch("/api/gemini/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: searchQuery }),
        });
        const data = await response.json();
        setSemanticResults(data);
      } catch (err) {
        console.error("Semantic search error:", err);
      } finally {
        setSearchLoading(false);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Local like trigger
  const handleLocalLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (localLikedIds.includes(id)) {
      setLocalLikedIds(localLikedIds.filter(x => x !== id));
    } else {
      setLocalLikedIds([...localLikedIds, id]);
    }
  };

  // Run Advisor Diagnostics Recommendation Engine
  const runAdvisorDiagnostics = () => {
    // Grade agents based on answers
    const scored = AGENTS.map(agent => {
      let score = 70; // baseline

      // Focus
      if (quizAnswers.focus === "coding" && (agent.category === "Coding" || agent.tags.includes("Coding"))) {
        score += 15;
      } else if (quizAnswers.focus === "translation" && (agent.category === "Translation & NLP" || agent.tags.includes("Translation") || agent.tags.includes("Speech"))) {
        score += 15;
      } else if (quizAnswers.focus === "speech" && agent.tags.includes("Speech")) {
        score += 15;
      } else if (quizAnswers.focus === "productivity" && agent.category === "Productivity") {
        score += 15;
      }

      // Sovereign
      if (quizAnswers.sovereign === "yes") {
        if (agent.isIndian) {
          score += 15;
        } else {
          score -= 30; // penalize non-sovereign
        }
      } else {
        if (!agent.isIndian) score += 5; // global booster
      }

      // Protocol
      if (quizAnswers.protocol === "mcp") {
        if (agent.mcpCompatible) score += 10;
      } else if (quizAnswers.protocol === "onprem") {
        if (agent.pricingPlans?.some(p => p.features.some(f => f.toLowerCase().includes("on-prem") || f.toLowerCase().includes("sovereign")))) {
          score += 15;
        }
      }

      return { agent, score: Math.min(100, Math.max(20, score)) };
    });

    // Sort and store
    const ranked = scored
      .sort((a, b) => b.score - a.score)
      .map(s => s.agent);

    setQuizResults(ranked.slice(0, 3));
  };

  // Extract all tags for filter pills
  const allTags = Array.from(new Set(AGENTS.flatMap(a => a.tags))).slice(0, 8);

  // Standard Filtering
  const filteredAgents = AGENTS.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.creator.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag ? agent.tags.includes(selectedTag) : true;
    const matchesCategory = categoryFilter ? agent.category === categoryFilter : true;
    const matchesSovereign = onlySovereign ? agent.isIndian : true;

    return matchesSearch && matchesTag && matchesCategory && matchesSovereign;
  });

  // Intent parsing helper for Search Input
  const parsedIntent = () => {
    const q = searchQuery.toLowerCase();
    if (!q) return null;

    let category = "General/Ecosystem";
    let budget = "Varies";
    let enterprise = "No Audit Needed";
    let primaryLanguage = "N/A";

    if (q.includes("code") || q.includes("program") || q.includes("python") || q.includes("javascript")) {
      category = "Coding Sandbox Service";
      primaryLanguage = q.includes("python") ? "Python" : q.includes("javascript") ? "JavaScript" : "Polyglot";
    } else if (q.includes("speak") || q.includes("voice") || q.includes("hindi") || q.includes("speech")) {
      category = "Vernacular Audio Pipeline";
      primaryLanguage = "Indian Dialects";
    } else if (q.includes("translate") || q.includes("bhasha") || q.includes("nlp")) {
      category = "Linguistic Translation Module";
    }

    if (q.includes("free") || q.includes("open-source") || q.includes("government")) {
      budget = "Zero-Cost Community API";
    } else if (q.includes("pro") || q.includes("enterprise") || q.includes("audit")) {
      budget = "Corporate SaaS billing";
      enterprise = "SOC2 / On-Prem Kubernetes Verified";
    }

    return { category, budget, enterprise, primaryLanguage };
  };

  const intent = parsedIntent();

  // Get current prompt generated output text
  const getPromptOutput = () => {
    if (selectedPrompt === "cot-coder") {
      return `[SYSTEM INSTRUCTION]: You are Claude 3.5 Sonnet, an elite Python software engineer. Analyze input step-by-step.
[USER QUERY]: Please review the following Python snippet for performance bottlenecks. Keep complexity inside limit: ${promptVariables.complexity}.
[CODE SNIPPET]:
${promptVariables.code}`;
    }
    if (selectedPrompt === "speech-translate") {
      return `[SYSTEM INSTRUCTION]: You are Krutrim Pro, trained by Ola. Translate transcripts into polite Indian regional contexts.
[TARGET DIALECT]: ${promptVariables.dialect}
[SPEECH TRANSCRIPT]: "${promptVariables.transcript}"`;
    }
    return `[SYSTEM INSTRUCTION]: Act as an SQLite inspector MCP node. Generate query mapping user request on custom schema.
[USER REQUEST]: "${promptVariables.request}"
[DATABASE SCHEMA]:
${promptVariables.schema}`;
  };

  // Estimate pricing / stats for the current prompt
  const getPromptStats = () => {
    if (selectedPrompt === "cot-coder") {
      return { tokenEstimate: 620, costEstimate: "$0.00186", rate: "98% accuracy" };
    }
    if (selectedPrompt === "speech-translate") {
      return { tokenEstimate: 380, costEstimate: "₹0.057", rate: "94% dialect-fit" };
    }
    return { tokenEstimate: 450, costEstimate: "₹0.067", rate: "99% SQL valid" };
  };

  const currentPromptStats = getPromptStats();

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getPromptOutput());
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  // Get deployment scripts
  const getDeployScript = () => {
    if (deployTech === "docker") {
      return `# Pull the BestAIAgent verified secure sandbox container
docker pull registry.bestaiagent.in/sandboxes/agent-node-v3:latest

# Initialize container with localized environment configuration and key injection
docker run -d -p 8080:8080 \\
  -e SOVEREIGN_CLOUD_PROVIDER=mumbai-south \\
  -e SECURE_SANDBOX_TOKEN="auth_fuzz_932821" \\
  -e GEMINI_API_KEY="your_secret_gemini_key" \\
  --name ai-agent-sandbox-core \\
  registry.bestaiagent.in/sandboxes/agent-node-v3:latest`;
    }
    if (deployTech === "k8s") {
      return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-agent-os-sandbox
  namespace: sovereign-prod
  labels:
    app.kubernetes.io/name: sovereign-agent-node
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sovereign-agent-node
  template:
    metadata:
      labels:
        app: sovereign-agent-node
    spec:
      containers:
      - name: sandbox-engine
        image: registry.bestaiagent.in/sandboxes/agent-node-v3:latest
        ports:
        - containerPort: 8080
        env:
        - name: KUBERNETES_AUTOSCALE_LEVEL
          value: "high_concurrency"
        - name: SOVEREIGN_DATA_RESIDENCY
          value: "IN_MUMBAI_ONLY"`;
    }
    if (deployTech === "helm") {
      return `# Install verified deployment chart from sovereign hub
helm repo add bestaiagent https://charts.bestaiagent.in/ecosystem
helm repo update

# Install sandbox release with air-gapped security variables
helm install sovereign-node bestaiagent/agent-sandbox \\
  --set security.encryption="aes256" \\
  --set residency.enforceSovereign=true \\
  --set sandbox.memoryLimit="4Gi"`;
    }
    return `# Initialize local server with Ollama integration
ollama run deepseek-coder:6.7b

# Run localized BestAIAgent companion proxy server on port 11434
python3 -m pip install bestaiagent-cli
bestaiagent serve --provider=ollama --model=deepseek-coder:6.7b --port=3000`;
  };

  const handleCopyDeploy = () => {
    navigator.clipboard.writeText(getDeployScript());
    setDeployCopied(true);
    setTimeout(() => setDeployCopied(false), 2000);
  };

  return (
    <div className="bg-[#050816] text-white space-y-16 pb-20">
      
      {/* 1. Large Immersive Cyberpunk Command Center Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 lg:px-8 border-b border-gray-900/60 bg-gradient-to-b from-[#0a0f2e] via-[#050816] to-[#050816]">
        {/* glowing floating particle overlays */}
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[150px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[150px] animate-pulse pointer-events-none"></div>

        <div className="mx-auto max-w-7xl relative z-10 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Branding, Typography, Core Services Grid */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1.5 text-xs text-purple-400 font-mono tracking-wider">
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                <span>OUR SERVICES</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
                  Powering <br />
                  <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">AI in India</span>
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-wide font-sans">
                  Solutions. Innovation. Impact.
                </p>
                <p className="max-w-2xl text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-medium">
                  End-to-end AI services for businesses, startups and developers across Bharat.
                </p>
              </div>

              {/* Core Services Icons List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4">
                {[
                  { name: "AI Agents Dev", desc: "AI Agents", icon: Cpu },
                  { name: "MCP Servers & Sync", desc: "MCP Servers", icon: Database },
                  { name: "Custom Solutions", desc: "Custom AI", icon: Terminal },
                  { name: "Infrastructure & Host", desc: "AI Infra", icon: Network },
                  { name: "Consulting & Strategy", desc: "AI Consulting", icon: Activity }
                ].map((serv, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center bg-gray-950/75 border border-gray-900/80 rounded-xl p-3 text-center space-y-2 hover:border-purple-500/30 transition-all group">
                    <div className="p-2 rounded-lg bg-purple-950/20 text-purple-400 group-hover:text-cyan-400 transition-colors">
                      <serv.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors font-mono font-bold leading-tight">
                      {serv.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trusted Partners Line */}
              <div className="pt-6 border-t border-gray-900/60 space-y-3">
                <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">
                  Trusted by Innovators Across India
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-400 font-mono">
                  <div className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-default">
                    <span className="font-black text-gray-300">TATA</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  </div>
                  <div className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-default">
                    <span className="font-black text-gray-300">Infosys</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                  </div>
                  <div className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-default">
                    <span className="font-black text-gray-300">wipro</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-default">
                    <span className="font-black text-gray-300">Reliance</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                  </div>
                  <div className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-default">
                    <span className="font-black text-gray-300">Zoho</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Immersive Indian AI Map Hub Backdrop & Overlay Badges */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px]">
              
              {/* Map Illustration Frame */}
              <div className="relative w-full max-w-md aspect-video sm:aspect-square bg-gray-950/80 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="/src/assets/images/india_ai_hero_banner_1783578713288.jpg" 
                  alt="Sovereign India AI Map" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glassmorphism Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Holographic glowing label */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#030612]/95 border border-purple-500/30 p-3 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-purple-400 font-mono uppercase tracking-widest font-bold">CYBER LAB INTEL</p>
                    <p className="text-xs font-bold text-white font-mono">SOVEREIGN NETWORK COMPASS</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              </div>

              {/* Floating Badge 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:top-6 sm:left-4 bg-[#030612]/95 border border-purple-500/20 px-4 py-2.5 rounded-xl flex items-center space-x-2.5 shadow-xl hover:-translate-y-1 transition-transform cursor-default">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white font-mono">Built in India</p>
                  <p className="text-[9px] text-gray-500 font-sans">Building for a smarter Bharat</p>
                </div>
              </div>

              {/* Floating Badge 2 (Top Right) */}
              <div className="absolute -top-4 -right-4 sm:top-6 sm:right-4 bg-[#030612]/95 border border-cyan-500/20 px-4 py-2.5 rounded-xl flex items-center space-x-2.5 shadow-xl hover:-translate-y-1 transition-transform cursor-default">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white font-mono">Enterprise Ready</p>
                  <p className="text-[9px] text-gray-500 font-sans">Secure, scalable & future-ready</p>
                </div>
              </div>

              {/* Floating Badge 3 (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-12 sm:left-2 bg-[#030612]/95 border border-yellow-500/20 px-4 py-2.5 rounded-xl flex items-center space-x-2.5 shadow-xl hover:-translate-y-1 transition-transform cursor-default">
                <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400">
                  <Sparkles className="h-4 w-4 animate-spin-slow" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white font-mono">Innovation Driven</p>
                  <p className="text-[9px] text-gray-500 font-sans">Pioneering the next wave</p>
                </div>
              </div>

              {/* Floating Badge 4 (Bottom Right) */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-12 sm:right-2 bg-[#030612]/95 border border-emerald-500/20 px-4 py-2.5 rounded-xl flex items-center space-x-2.5 shadow-xl hover:-translate-y-1 transition-transform cursor-default">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Network className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white font-mono">Global Impact</p>
                  <p className="text-[9px] text-gray-500 font-sans">From India to the world</p>
                </div>
              </div>

            </div>

          </div>

          {/* 6 core services detailed Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {[
              {
                title: "AI AGENTS DEVELOPMENT",
                desc: "Custom AI agents that think, learn and act for your business.",
                color: "border-purple-500/20 text-purple-400 hover:border-purple-500",
                icon: Cpu
              },
              {
                title: "MCP SERVERS & INTEGRATION",
                desc: "Discover, deploy & integrate MCP servers seamlessly with your systems.",
                color: "border-cyan-500/20 text-cyan-400 hover:border-cyan-500",
                icon: Database
              },
              {
                title: "CUSTOM AI SOLUTIONS",
                desc: "Tailored AI models and applications for real world impact.",
                color: "border-blue-500/20 text-blue-400 hover:border-blue-500",
                icon: Terminal
              },
              {
                title: "AI INFRASTRUCTURE & HOSTING",
                desc: "High performance hosting, vector DBs & scalable AI infrastructure.",
                color: "border-emerald-500/20 text-emerald-400 hover:border-emerald-500",
                icon: Network
              },
              {
                title: "AI CONSULTING & STRATEGY",
                desc: "AI roadmaps, integration strategy & digital transformation.",
                color: "border-pink-500/20 text-pink-400 hover:border-pink-500",
                icon: Activity
              },
              {
                title: "SECURITY & COMPLIANCE",
                desc: "Enterprise grade security and compliance for AI systems.",
                color: "border-yellow-500/20 text-yellow-400 hover:border-yellow-500",
                icon: ShieldCheck
              }
            ].map((box, idx) => (
              <div 
                key={idx} 
                className={`bg-[#030612]/90 border ${box.color} p-5 rounded-2xl space-y-3 shadow-md hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-gray-950/80 text-gray-300 group-hover:text-white transition-colors">
                    <box.icon className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <div className="space-y-1.5 text-left">
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-white uppercase">
                    {box.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium">
                    {box.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Stats Bar at the bottom */}
          <div className="pt-10 border-t border-gray-900/60 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: "200+ AI Agents", sub: "Discovered" },
              { label: "150+ Indian Startups", sub: "Indexed" },
              { label: "1000+ MCP Servers", sub: "Cataloged" },
              { label: "50+ Enterprise Clients", sub: "Onboarded" },
              { label: "10K+ Devs Trust Us", sub: "Verified" },
              { label: "Powering AI Revolution", sub: "in India" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-0.5 hover:scale-105 transition-transform duration-300 cursor-default">
                <p className="text-xs sm:text-sm font-black text-white font-mono uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-[10px] text-gray-500 font-sans font-semibold">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Volume 5 — AI Intent Detection Panel (Conditional Overlay) */}
      {searchQuery.trim().length >= 2 && intent && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-cyan-500/30 bg-[#070b1e]/90 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-900 pb-2">
              <div className="flex items-center space-x-2 text-cyan-400">
                <SlidersHorizontal className="h-4 w-4 animate-spin-slow" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">AI Intent Detection Pipeline</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Status: Calibrating search parameters</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-950/50 p-3 rounded-lg border border-gray-900">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Segment</p>
                <p className="text-xs font-bold text-gray-200 mt-1">{intent.category}</p>
              </div>
              <div className="bg-gray-950/50 p-3 rounded-lg border border-gray-900">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Cost Vector</p>
                <p className="text-xs font-bold text-gray-200 mt-1">{intent.budget}</p>
              </div>
              <div className="bg-gray-950/50 p-3 rounded-lg border border-gray-900">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Enterprise Policy</p>
                <p className="text-xs font-bold text-cyan-400 mt-1">{intent.enterprise}</p>
              </div>
              <div className="bg-gray-950/50 p-3 rounded-lg border border-gray-900">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Primary Language</p>
                <p className="text-xs font-bold text-gray-200 mt-1">{intent.primaryLanguage}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Volume 6 — Real-Time AI Observatory & Global Activity Feed */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 6.1 Currently Trending Observatory Dashboard */}
          <div className="bg-gradient-to-br from-[#0c102a] to-[#060a1d] border border-purple-500/10 p-6 rounded-2xl space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-900 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-400 animate-pulse" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-100 font-mono">
                  Live AI Observatory Dashboard
                </h2>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-950/50 border border-gray-900 p-4 rounded-xl space-y-1">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Searches Per Min</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-white font-mono">{searchesPerMin}</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">▲14%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 w-[72%]"></div>
                </div>
              </div>

              <div className="bg-gray-950/50 border border-gray-900 p-4 rounded-xl space-y-1">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Active Deployments</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-white font-mono">{activeDeployments}</span>
                  <span className="text-xs text-cyan-400 font-mono font-bold">▲3.8%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-[84%]"></div>
                </div>
              </div>

              <div className="bg-gray-950/50 border border-gray-900 p-4 rounded-xl space-y-1">
                <p className="text-[10px] text-gray-500 font-mono uppercase">Observed Peak Bandwidth</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-sm font-bold text-white font-mono">4.2 TB/s</span>
                  <span className="text-xs text-cyan-400 font-mono">Max Cap</span>
                </div>
                <p className="text-[9px] text-gray-600 truncate font-mono">Server Status: Sovereign Hub Live</p>
              </div>
            </div>

            {/* Live Heatmap highlights */}
            <div className="pt-4 border-t border-gray-900/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-gray-500 font-mono text-[10px] uppercase">Fastest Growing Category</p>
                <p className="font-bold text-gray-200 mt-1">{fastestGrowing}</p>
              </div>
              <div>
                <p className="text-gray-500 font-mono text-[10px] uppercase">Most Viewed Entity</p>
                <p className="font-bold text-purple-400 mt-1">Sarvam AI Speech Node</p>
              </div>
              <div>
                <p className="text-gray-500 font-mono text-[10px] uppercase">Most Compared Duo</p>
                <p className="font-bold text-gray-200 mt-1">Krutrim Pro vs ChatGPT</p>
              </div>
              <div>
                <p className="text-gray-500 font-mono text-[10px] uppercase">Active Port</p>
                <p className="font-bold text-emerald-400 mt-1 font-mono">Sovereign 3000 Ingress</p>
              </div>
            </div>

          </div>

          {/* 6.2 Global Activity Feed Ticker */}
          <div className="bg-[#070b1e] border border-gray-800 p-6 rounded-2xl flex flex-col justify-between">
            <div className="border-b border-gray-900 pb-3">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                  Global System Activity Logs
                </h3>
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">Streaming real-time ecosystem telemetries</p>
            </div>

            <div className="flex-1 my-4 space-y-3 font-mono text-[11px] overflow-hidden relative">
              {activityFeed.map((activity, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start space-x-2 transition-all duration-500 ${
                    idx === 0 ? "text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-2 animate-pulse" : "text-gray-400 opacity-70"
                  }`}
                >
                  <span className="text-purple-500 shrink-0">▸</span>
                  <span className="line-clamp-2 leading-relaxed">{activity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-900 text-[10px] text-gray-500 font-mono flex justify-between items-center">
              <span>Updated: Just now</span>
              <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded font-bold">100% ONLINE</span>
            </div>
          </div>

        </div>
      </section>

      {/* Volume 7 — Knowledge Graph Engine */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#0c102a] to-[#050816] border border-cyan-500/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-900">
            <div className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-cyan-400" />
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-200 font-mono">
                  Sovereign Ecosystem Knowledge Graph Explorer
                </h2>
                <p className="text-xs text-gray-400 mt-1">Interactively map how models, companies, government missions, and database MCP tools connect.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* SVG graph viewport */}
            <div className="lg:col-span-2 bg-[#030612]/90 h-[380px] relative flex items-center justify-center p-4 border-r border-gray-900">
              <svg className="w-full h-full" viewBox="0 0 800 450">
                {/* Connection lines */}
                {graphConnections.map((conn, idx) => {
                  const fromNode = graphNodes.find(n => n.id === conn.from);
                  const toNode = graphNodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;
                  const isHighlighted = selectedGraphNode === conn.from || selectedGraphNode === conn.to;

                  return (
                    <line
                      key={idx}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isHighlighted ? "#a855f7" : "#1e293b"}
                      strokeWidth={isHighlighted ? 2.5 : 1.2}
                      strokeDasharray={isHighlighted ? "none" : "4 4"}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Nodes representation */}
                {graphNodes.map((node) => {
                  const isSelected = selectedGraphNode === node.id;
                  let color = "#3b82f6"; // model - blue
                  if (node.type === "company") color = "#c084fc"; // company - purple
                  if (node.type === "government") color = "#f97316"; // govt - orange
                  if (node.type === "protocol") color = "#10b981"; // protocol - emerald
                  if (node.type === "authority") color = "#f43f5e"; // red
                  if (node.type === "tool") color = "#06b6d4"; // cyan

                  return (
                    <g 
                      key={node.id} 
                      className="cursor-pointer"
                      onClick={() => setSelectedGraphNode(node.id)}
                    >
                      {/* Node pulsing circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 16 : 10}
                        fill={color}
                        opacity={isSelected ? 0.3 : 0.15}
                        className={isSelected ? "animate-ping" : ""}
                      />
                      {/* Node solid circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 10 : 7}
                        fill={color}
                        stroke="#050816"
                        strokeWidth={2}
                        className="hover:scale-125 transition-all duration-300"
                      />
                      {/* Label shadow */}
                      <text
                        x={node.x}
                        y={node.y - 14}
                        textAnchor="middle"
                        fill="#050816"
                        fontSize="10"
                        fontWeight="bold"
                        stroke="#050816"
                        strokeWidth={3}
                        className="select-none"
                      >
                        {node.name}
                      </text>
                      {/* Node Label */}
                      <text
                        x={node.x}
                        y={node.y - 14}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : "#94a3b8"}
                        fontSize="10.5"
                        fontWeight={isSelected ? "black" : "bold"}
                        className="select-none transition-colors"
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Watermark instructions */}
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-gray-600 bg-gray-950/40 px-2 py-1 rounded">
                *Click any ecosystem node to explore dynamic relationship logic
              </div>
            </div>

            {/* Selected Node Details Side panel */}
            <div className="p-6 bg-[#070b1e]/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 border-b border-gray-900 pb-3 mb-4">
                  <div className={`h-3 w-3 rounded-full bg-cyan-400`}></div>
                  <h3 className="font-mono text-xs uppercase text-gray-400">Node Relationship Data</h3>
                </div>

                {selectedGraphNode ? (() => {
                  const nodeObj = graphNodes.find(n => n.id === selectedGraphNode);
                  if (!nodeObj) return null;
                  return (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono bg-purple-950/60 text-purple-300 border border-purple-900/30 px-2 py-0.5 rounded font-bold">
                          {nodeObj.type} Node
                        </span>
                        <h4 className="text-xl font-black text-white pt-1">{nodeObj.name}</h4>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-[10px] text-gray-500 font-mono uppercase">Node Description</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{nodeObj.desc}</p>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-gray-900">
                        <p className="text-[10px] text-purple-400 font-mono uppercase">Connected Relational Logic</p>
                        <p className="text-xs text-gray-400 italic leading-relaxed font-sans">{nodeObj.connection}</p>
                      </div>
                    </div>
                  );
                })() : (
                  <p className="text-xs text-gray-500 italic">Select an object to inspect its Graph connections.</p>
                )}
              </div>

              <div className="pt-6 border-t border-gray-900/60 text-[10px] text-gray-500 font-mono leading-relaxed">
                Connects back to: <span className="text-gray-300">BestAIAgent.in</span> core knowledge store. High-performance graph routing enabled.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Volume 8 — AI Recommendation Engine */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-purple-500/20 bg-[#080d21] p-6 lg:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-900 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-purple-400">
                <Award className="h-5 w-5 animate-pulse" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Sovereign Agent Advisor Engine
                </h2>
              </div>
              <p className="text-xs text-gray-400">Answer 3 simple constraints and let our algorithm rank verified sandboxes with transparent matching scores.</p>
            </div>
            
            <div className="flex items-center space-x-2 text-[10px] font-mono">
              <span className="text-gray-500">Engine model:</span>
              <span className="text-cyan-400 bg-cyan-950/40 border border-cyan-800 px-2 py-0.5 rounded font-bold">GEMINI RE-RANKER</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Steps Form */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Step 1: Industry Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">1. Select Primary Mission Focus</label>
                <select 
                  value={quizAnswers.focus}
                  onChange={(e) => setQuizAnswers({ ...quizAnswers, focus: e.target.value })}
                  className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                >
                  <option value="coding">Software Engineering / Coding Assistants</option>
                  <option value="translation">Vernacular Language Translation</option>
                  <option value="speech">Voice / Dialect Speech Transcription</option>
                  <option value="productivity">General Workspace Productivity</option>
                </select>
              </div>

              {/* Step 2: Sovereignty Enforcements */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">2. Enforce Data Residency / Creator Origin</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setQuizAnswers({ ...quizAnswers, sovereign: "yes" })}
                    className={`rounded-lg py-2.5 text-xs font-bold border transition-all ${
                      quizAnswers.sovereign === "yes"
                        ? "bg-orange-950/30 border-orange-500 text-orange-400"
                        : "bg-gray-950 border-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    Sovereign India 🇮🇳
                  </button>
                  <button
                    onClick={() => setQuizAnswers({ ...quizAnswers, sovereign: "no" })}
                    className={`rounded-lg py-2.5 text-xs font-bold border transition-all ${
                      quizAnswers.sovereign === "no"
                        ? "bg-cyan-950/30 border-cyan-500 text-cyan-400"
                        : "bg-gray-950 border-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    Global / Permissive
                  </button>
                </div>
              </div>

              {/* Step 3: Architecture Constraints */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">3. Integration Protocol Required</label>
                <select 
                  value={quizAnswers.protocol}
                  onChange={(e) => setQuizAnswers({ ...quizAnswers, protocol: e.target.value })}
                  className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3.5 py-2.5 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                >
                  <option value="mcp">Model Context Protocol (MCP) compatible</option>
                  <option value="onprem">On-Prem Self-Hosted Container deployment</option>
                  <option value="api">Standard REST Cloud APIs</option>
                </select>
              </div>

              <button
                onClick={runAdvisorDiagnostics}
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 text-xs font-black uppercase text-white shadow-lg tracking-wider hover:opacity-90 transition-all cursor-pointer"
              >
                Evaluate Recommended Fits
              </button>
            </div>

            {/* Results breakdown */}
            <div className="lg:col-span-2 bg-[#030612]/90 border border-gray-900 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-4">Diagnostics Result Output</h3>
                
                {!quizResults ? (
                  <div className="text-center py-14 space-y-2 text-gray-500 italic">
                    <SlidersHorizontal className="h-6 w-6 mx-auto text-gray-700 animate-pulse" />
                    <p className="text-xs">Adjust your preferences on the left and click "Evaluate Recommended Fits" to compute rankings.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quizResults.map((agent, index) => {
                      // Calculate match percentage
                      const matches = [
                        quizAnswers.focus === "coding" && (agent.category === "Coding" || agent.tags.includes("Coding")),
                        quizAnswers.sovereign === "yes" ? agent.isIndian : true,
                        quizAnswers.protocol === "mcp" ? agent.mcpCompatible : true
                      ];
                      const matchedCount = matches.filter(Boolean).length;
                      const scorePct = 80 + (matchedCount * 6) + (3 - index) * 2;

                      return (
                        <div 
                          key={agent.id}
                          onClick={() => onAgentClick(agent)}
                          className="rounded-lg border border-gray-800 bg-gray-950/40 p-4 hover:border-purple-500/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-bold text-[10px] text-gray-500">#{index + 1}</span>
                              <h4 className="text-sm font-extrabold text-white">{agent.name}</h4>
                              {agent.isIndian && <span className="text-[9px] bg-orange-950/40 text-orange-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase">Sovereign 🇮🇳</span>}
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-1">{agent.description}</p>
                          </div>

                          <div className="flex items-center space-x-4 shrink-0">
                            <div className="text-right">
                              <p className="text-[10px] text-gray-500 font-mono">RECON MATCH</p>
                              <p className="text-sm font-black text-emerald-400 font-mono">{scorePct}% Fit</p>
                            </div>
                            <button className="p-1 bg-gray-900 border border-gray-800 rounded hover:text-white text-gray-400">
                              <ArrowUpRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-900/60 flex flex-wrap gap-4 text-[10px] text-gray-500 font-mono">
                <span>✓ Transparent evaluation logs generated</span>
                <span>✓ Verified against active container indices</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Volume 12 & 13 — AI Model Registry & Prompt Intelligence Hub */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#070b1e]/60 border border-gray-900 rounded-2xl overflow-hidden">
          
          {/* Section Tab Headers */}
          <div className="flex border-b border-gray-900 bg-gray-950/40">
            <button
              onClick={() => setHubTab("prompts")}
              className={`flex-1 py-4 px-6 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center justify-center space-x-2 ${
                hubTab === "prompts"
                  ? "border-purple-500 text-purple-400 bg-purple-950/5"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Prompt Intelligence Hub (v3)</span>
            </button>
            <button
              onClick={() => setHubTab("registry")}
              className={`flex-1 py-4 px-6 text-xs font-bold uppercase tracking-wider font-mono border-b-2 transition-all flex items-center justify-center space-x-2 ${
                hubTab === "registry"
                  ? "border-cyan-500 text-cyan-400 bg-cyan-950/5"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>Sovereign Base Model Registry</span>
            </button>
          </div>

          <div className="p-6">
            
            {/* HUB TAB: PROMPTS */}
            {hubTab === "prompts" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Prompt template selector */}
                <div className="space-y-3">
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Select Verified Prompt Class:</span>
                  
                  {[
                    { id: "cot-coder", label: "CoT Python Code Optimizer", desc: "Forces step-by-step performance audits inside Isolated sandbox frameworks" },
                    { id: "speech-translate", label: "Dialect Speech-to-Speech Adaptor", desc: "Optimizes regional audio transcription backends for polite dialects" },
                    { id: "mcp-sql", label: "SQLite DB Schema Query Builder", desc: "Automates SQL query compilation and verification against local schemas" }
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPrompt(p.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedPrompt === p.id
                          ? "border-purple-500/40 bg-purple-950/10 text-white"
                          : "border-gray-900 bg-gray-950/30 text-gray-400 hover:border-gray-850"
                      }`}
                    >
                      <h4 className="text-xs font-bold">{p.label}</h4>
                      <p className="text-[10px] text-gray-500 leading-normal mt-1">{p.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Variable inputs panel */}
                <div className="bg-[#030612] p-5 rounded-xl border border-gray-900 space-y-4">
                  <span className="text-[10px] text-purple-400 font-mono uppercase">Prompt Variable Placeholders:</span>
                  
                  {selectedPrompt === "cot-coder" && (
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-gray-400">Target Complexity:</label>
                        <input
                          type="text"
                          value={promptVariables.complexity}
                          onChange={(e) => setPromptVariables({ ...promptVariables, complexity: e.target.value })}
                          className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-1.5 text-gray-300 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400">Code Snippet:</label>
                        <textarea
                          rows={4}
                          value={promptVariables.code}
                          onChange={(e) => setPromptVariables({ ...promptVariables, code: e.target.value })}
                          className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-gray-300 font-mono text-[11px] focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPrompt === "speech-translate" && (
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-gray-400">Target Indian Dialect:</label>
                        <input
                          type="text"
                          value={promptVariables.dialect}
                          onChange={(e) => setPromptVariables({ ...promptVariables, dialect: e.target.value })}
                          className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-1.5 text-gray-300 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400">Audio Speech Transcript:</label>
                        <textarea
                          rows={4}
                          value={promptVariables.transcript}
                          onChange={(e) => setPromptVariables({ ...promptVariables, transcript: e.target.value })}
                          className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-gray-300 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPrompt === "mcp-sql" && (
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-gray-400">User Plain Request:</label>
                        <input
                          type="text"
                          value={promptVariables.request}
                          onChange={(e) => setPromptVariables({ ...promptVariables, request: e.target.value })}
                          className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-1.5 text-gray-300 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-400">Database Schema:</label>
                        <textarea
                          rows={4}
                          value={promptVariables.schema}
                          onChange={(e) => setPromptVariables({ ...promptVariables, schema: e.target.value })}
                          className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-gray-300 font-mono text-[11px] focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Estimated Cost Indicators */}
                  <div className="pt-2 border-t border-gray-900 grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-500">
                    <div>
                      <p>Token Estimate:</p>
                      <p className="font-bold text-gray-200">{currentPromptStats.tokenEstimate} tokens</p>
                    </div>
                    <div>
                      <p>Estimated Cost:</p>
                      <p className="font-bold text-emerald-400">{currentPromptStats.costEstimate}</p>
                    </div>
                  </div>
                </div>

                {/* Compiled prompt output */}
                <div className="bg-gray-950/80 p-5 rounded-xl border border-gray-900 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-500 font-mono uppercase block">Calibrated Output Prompt Payload:</span>
                    <pre className="text-[10px] text-purple-300 bg-gray-950 p-3 rounded border border-gray-900 font-mono overflow-x-auto max-h-[180px] select-all whitespace-pre-wrap leading-normal">
                      {getPromptOutput()}
                    </pre>
                  </div>

                  <div className="pt-4 border-t border-gray-900 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Rating: {currentPromptStats.rate}</span>
                    <button
                      onClick={handleCopyPrompt}
                      className="rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-500/30 text-purple-300 px-4 py-2 text-xs font-bold uppercase flex items-center space-x-1.5 transition-all cursor-pointer"
                    >
                      {promptCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{promptCopied ? "Payload Copied" : "Copy Payload"}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* HUB TAB: MODEL REGISTRY */}
            {hubTab === "registry" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Tracking 6 top-tier base models & release parameters:</span>
                  <span className="text-[10px] text-gray-500 font-mono">Last updated: July 2026</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-400">
                    <thead className="text-[10px] text-gray-500 uppercase font-mono bg-gray-950/40">
                      <tr>
                        <th className="p-3">Model Family</th>
                        <th className="p-3">Creator Org</th>
                        <th className="p-3">Context Window</th>
                        <th className="p-3">Price / 1M Input Tokens</th>
                        <th className="p-3">Price / 1M Output Tokens</th>
                        <th className="p-3">Core Specialty Specialty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-900">
                      {[
                        { name: "Claude 3.5 Sonnet", org: "Anthropic", ctx: "200,000", input: "$3.00", output: "$15.00", specialty: "Elite software coding, system logic & artifacts" },
                        { name: "Gemini 3.5 Flash", org: "Google", ctx: "1,000,000", input: "$0.075", output: "$0.30", specialty: "High-speed multimodal, ultra-cheap translation" },
                        { name: "GPT-4o (Latest)", org: "OpenAI", ctx: "128,000", input: "$5.00", output: "$15.00", specialty: "General reasoning, code execution, DALL-E 3" },
                        { name: "DeepSeek Coder V2", org: "DeepSeek", ctx: "128,000", input: "$0.14", output: "$0.28", specialty: "Incredible cost-to-performance, open coding weights" },
                        { name: "Krutrim Pro v2", org: "Ola Krutrim", ctx: "32,000", input: "₹1.50 (~$0.018)", output: "₹4.50 (~$0.054)", specialty: "High-quality regional Indian language translation" },
                        { name: "Llama 3.1 405B", org: "Meta", ctx: "128,000", input: "$2.66", output: "$2.66", specialty: "Leading open-weights model, optimized for self-hosting" }
                      ].map((m, idx) => (
                        <tr key={idx} className="hover:bg-gray-950/25">
                          <td className="p-3 font-bold text-white font-mono">{m.name}</td>
                          <td className="p-3 text-gray-300">{m.org}</td>
                          <td className="p-3 font-mono">{m.ctx}</td>
                          <td className="p-3 font-mono text-emerald-400">{m.input}</td>
                          <td className="p-3 font-mono text-emerald-400">{m.output}</td>
                          <td className="p-3 italic text-gray-500">{m.specialty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Volume 9, 10, & 11 — Trust Center & Enterprise Deployment Center */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Trust Center (Compliance checklist) */}
          <div className="bg-gradient-to-b from-[#080d21] to-transparent border border-gray-900 p-6 rounded-2xl space-y-6">
            <div className="border-b border-gray-900 pb-3">
              <div className="flex items-center space-x-2 text-purple-400">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Sovereign Trust Center
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">Ecosystem standards audited for secure corporate deployment.</p>
            </div>

            <div className="space-y-4">
              {[
                { label: "Enterprise Verified", desc: "Creators audited for data privacy policies and commercial compliance" },
                { label: "Security Audited", desc: "Sandbox container code fuzzed for standard memory and prompt injection vulnerabilities" },
                { label: "MCP Compatible", desc: "Complies with model context protocol parameters for secure workspace query bindings" },
                { label: "API Tested", desc: "Response latency and token pricing verified under high continuous concurrency tests" },
                { label: "Benchmark Verified", desc: "Actual scoring calculated dynamically in Sandbox Benchmark Engine" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <div className="bg-emerald-950/40 p-1 rounded border border-emerald-900 text-emerald-400 shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-200">{badge.label}</h4>
                    <p className="text-[10px] text-gray-500 leading-normal mt-0.5">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Deployment Marketplace code generator */}
          <div className="lg:col-span-2 bg-[#060a1d]/80 border border-purple-500/10 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-900 pb-3 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Terminal className="h-5 w-5 animate-pulse" />
                    <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-gray-100">
                      Enterprise Deployment Center
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400">Copy secure commands to host and deploy sandboxed AI containers on-prem.</p>
                </div>

                <div className="flex space-x-1 border border-gray-900 bg-gray-950/80 p-1 rounded-lg">
                  {(["docker", "k8s", "helm", "ollama"] as const).map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setDeployTech(tech)}
                      className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded transition-all cursor-pointer ${
                        deployTech === tech
                          ? "bg-purple-600 text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 bg-gray-950 p-4 rounded-xl border border-gray-900">
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pb-2 border-b border-gray-900 mb-3 select-none">
                  <span>CONFIGURATION TERMINAL</span>
                  <span>SHELL: BASH</span>
                </div>
                <pre className="text-[11px] text-cyan-300 font-mono overflow-x-auto max-h-[160px] whitespace-pre select-all leading-normal">
                  {getDeployScript()}
                </pre>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-900 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Verification: SOC2 Type II Certified Docker Images</span>
              <button
                onClick={handleCopyDeploy}
                className="rounded-full bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-400 px-5 py-2 text-xs font-bold uppercase flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                {deployCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Clipboard className="h-4 w-4" />}
                <span>{deployCopied ? "Deployment Script Copied" : "Copy Secure Script"}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Standard Tag Pills & Region Filter Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-gray-900 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-900 pb-4 mb-8">
          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                selectedTag === null
                  ? "bg-purple-600 text-white font-bold"
                  : "bg-gray-900/40 border border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              All Tags
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all capitalize ${
                  selectedTag === tag
                    ? "bg-purple-600 text-white font-bold"
                    : "bg-gray-900/40 border border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Sovereign Toggle */}
          <button
            onClick={() => setOnlySovereign(!onlySovereign)}
            className={`flex items-center space-x-2 rounded-full border px-4 py-1.5 text-xs transition-all ${
              onlySovereign
                ? "border-orange-500 bg-orange-950/20 text-orange-400 font-bold"
                : "border-gray-800 bg-[#0B1120]/40 text-gray-400 hover:text-white"
            }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-pulse"></span>
            <span>Indian Creators Only 🇮🇳</span>
          </button>
        </div>

        {/* Categories Filter Row */}
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-thin">
          {["All", "Coding", "Productivity", "Research", "Security", "Customer Support"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat === "All" ? null : cat)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                (cat === "All" && !categoryFilter) || categoryFilter === cat
                  ? "bg-cyan-950/40 text-cyan-400 border border-cyan-800"
                  : "bg-gray-950/20 border border-gray-900 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. AI-powered Semantic Search Results Panel */}
      {searchQuery.trim().length >= 2 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 animate-fade-in">
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/5 p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-900 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-purple-400 animate-pulse" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-200">
                  Semantic Search Output
                </h2>
              </div>
              <span className="font-mono text-[10px] text-gray-500">
                Source: {searchLoading ? "Evaluating clusters..." : semanticResults?.source || "Local Fallback Matcher"}
              </span>
            </div>

            {searchLoading ? (
              <div className="text-center py-12 space-y-3">
                <RefreshCw className="h-8 w-8 text-purple-400 animate-spin mx-auto" />
                <p className="text-xs text-gray-400 font-mono">Querying deep semantic vector indexes against agents, companies, & MCP protocols...</p>
              </div>
            ) : semanticResults ? (
              <div className="space-y-8">
                
                {/* 3.1 Agents Sub-section */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">Matched Autonomous Agents</h3>
                  {semanticResults.agents.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No matching models found in the directory.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {semanticResults.agents.map((match) => {
                        const agentObj = AGENTS.find(a => a.id === match.id);
                        if (!agentObj) return null;
                        const scorePct = Math.round(match.relevance * 100);

                        return (
                          <div 
                            key={agentObj.id}
                            onClick={() => onAgentClick(agentObj)}
                            className="rounded-xl border border-gray-900 bg-gray-950/40 p-4 hover:border-purple-500/20 transition-all cursor-pointer flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <h4 className="text-xs font-extrabold text-white">{agentObj.name}</h4>
                                <span className="font-mono font-black text-xs text-cyan-400 bg-cyan-950/30 px-1.5 py-0.5 rounded">
                                  {scorePct}% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-400 line-clamp-2">{agentObj.description}</p>
                            </div>

                            <div className="mt-4 pt-2.5 border-t border-gray-900 flex items-start space-x-1 text-[10px] text-gray-500 font-mono">
                              <span className="text-purple-400 shrink-0">Reason:</span>
                              <span className="leading-normal">{match.reason}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3.2 Companies Sub-section */}
                <div className="space-y-4 border-t border-gray-900/60 pt-6">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">Matched Sovereign AI Companies</h3>
                  {semanticResults.companies.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No matching enterprise entities found.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {semanticResults.companies.map((match, idx) => {
                        const startupObj = STARTUPS.find(s => s.name === match.name);
                        if (!startupObj) return null;
                        const scorePct = Math.round(match.relevance * 100);

                        return (
                          <div 
                            key={idx}
                            className="rounded-xl border border-gray-900 bg-gray-950/40 p-4 hover:border-cyan-500/20 transition-all"
                          >
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-start">
                                <h4 className="text-xs font-extrabold text-white">{startupObj.name}</h4>
                                <span className="font-mono font-black text-[10px] text-cyan-400 bg-cyan-950/30 px-1.5 py-0.5 rounded">
                                  {scorePct}% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-400">{startupObj.tagline}</p>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                <span className="text-[8px] font-mono text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded">
                                  {startupObj.category}
                                </span>
                                <span className="text-[8px] font-mono text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded">
                                  Bengaluru, India 🇮🇳
                                </span>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-gray-900 flex items-start space-x-1 text-[10px] text-gray-500 font-mono">
                              <span className="text-cyan-400 shrink-0">Reason:</span>
                              <span className="leading-normal">{match.reason}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3.3 MCP Servers Sub-section */}
                <div className="space-y-4 border-t border-gray-900/60 pt-6">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Matched Model Context Protocol (MCP) Servers</h3>
                  {semanticResults.mcpServers.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No matching protocol nodes found.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {semanticResults.mcpServers.map((match) => {
                        const mcpObj = MCP_SERVERS.find(m => m.id === match.id);
                        if (!mcpObj) return null;
                        const scorePct = Math.round(match.relevance * 100);

                        return (
                          <div 
                            key={mcpObj.id}
                            className="rounded-xl border border-gray-900 bg-gray-950/40 p-4 hover:border-emerald-500/20 transition-all"
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <h4 className="text-xs font-extrabold text-white">{mcpObj.name}</h4>
                                <span className="font-mono font-black text-[10px] text-emerald-400 bg-emerald-950/30 px-1.5 py-0.5 rounded">
                                  {scorePct}% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-normal">{mcpObj.description}</p>
                              
                              <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
                                <span>by {mcpObj.creator}</span>
                                <span>{mcpObj.downloads} downloads</span>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-gray-900 flex items-start space-x-1 text-[10px] text-gray-500 font-mono">
                              <span className="text-emerald-400 shrink-0">Reason:</span>
                              <span className="leading-normal">{match.reason}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <p className="text-center text-xs text-gray-500 italic py-6">Could not parse search mapping. Try another query keyword.</p>
            )}
          </div>
        </section>
      )}

      {/* 4. Primary Agent Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-450 font-mono">
            Available isolated sandboxes ({filteredAgents.length})
          </h2>
          {searchQuery && (
            <p className="text-xs text-gray-500">Filtered by query: "{searchQuery}"</p>
          )}
        </div>

        {filteredAgents.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-850 rounded-2xl space-y-2">
            <Info className="h-8 w-8 text-gray-600 mx-auto" />
            <p className="text-gray-500 text-xs italic">No matching sandboxed agents found inside catalog databases.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <div 
                key={agent.id}
                onClick={() => onAgentClick(agent)}
                className="group cursor-pointer rounded-2xl border border-gray-850 bg-[#0a0f26]/45 p-5 hover:border-purple-500/30 hover:bg-gradient-to-b hover:from-[#0d122b]/90 hover:to-[#050816]/95 transition-all duration-300 relative overflow-hidden"
              >
                {/* Indian flag strip for sovereign agents */}
                {agent.isIndian && (
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-950/20 text-purple-400 border border-purple-900/20 group-hover:scale-105 transition-transform shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {agent.isIndian && (
                      <span className="rounded-full bg-orange-950/30 px-2 py-0.5 text-[9px] font-bold text-orange-400 border border-orange-900/20 uppercase tracking-widest font-mono">
                        SOVEREIGN
                      </span>
                    )}
                    <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-[10px] font-semibold text-gray-400 font-mono">
                      {agent.price}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-extrabold text-gray-100 text-sm group-hover:text-white transition-colors">{agent.name}</h3>
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">by {agent.creator}</span>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{agent.description}</p>
                </div>

                {/* Dynamic Explainability Checkmarks (Volume 5 Specs) */}
                <div className="mt-3 pt-3 border-t border-gray-900/60 space-y-1">
                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-400">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Highest benchmark performance verified</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-400">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Secure local sandbox container available</span>
                  </div>
                </div>

                {/* Rating & Action buttons */}
                <div className="mt-4 pt-4 border-t border-gray-900 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-300 font-bold">{agent.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-3.5 w-3.5 text-gray-600" />
                      <span>{agent.downloads} downloads</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCompare(agent);
                      }}
                      className="rounded bg-gray-950 hover:bg-purple-950/40 border border-gray-850 text-gray-400 hover:text-purple-400 px-2 py-1 text-[9px] font-bold uppercase transition-all cursor-pointer"
                    >
                      Compare
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLocalLike(agent.id, e);
                      }}
                      className={`p-1 rounded-full border cursor-pointer ${
                        localLikedIds.includes(agent.id) ? "border-red-500/30 bg-red-950/20 text-red-400" : "border-gray-850 hover:text-red-400"
                      } transition-all`}
                    >
                      <Heart className="h-3 w-3" fill={localLikedIds.includes(agent.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Interactive Testimonials/Reviews Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-gray-900 pt-12 space-y-8">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <h3 className="font-bold text-xl text-white">Loved by Elite Machine Learning Teams</h3>
          <p className="text-xs text-gray-400">See how enterprises, researchers and independent builders utilize our fuzzed sandboxes.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="rounded-xl border border-gray-850 bg-[#070b1e]/60 p-5 space-y-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center space-x-3 pt-2 border-t border-gray-900">
                <div className="h-8 w-8 rounded-full bg-purple-950 flex items-center justify-center font-bold text-xs text-purple-300 uppercase">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200">{t.name}</div>
                  <div className="text-[10px] text-gray-500">{t.role} at {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Deploy Sandbox Call-To-Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/20 via-[#0B1120] to-cyan-900/20 border border-purple-500/20 p-8 md:p-12 text-center space-y-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05),transparent_65%)]"></div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-white max-w-lg mx-auto">
            Ready to deploy your first sandboxed AI agent container?
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            Configure authorization secrets, load sovereign translation corpora, and spin up active REST API nodes in seconds.
          </p>

          <div className="flex justify-center space-x-4 pt-2">
            <button 
              onClick={() => onAgentClick(AGENTS[0])}
              className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg cursor-pointer"
            >
              Launch Play Playground
            </button>
          </div>
        </div>
      </section>

      {/* 7. Sovereign AI Ecosystem Authority & Resource Index Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-gray-900 pt-16 pb-20 space-y-8">
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1 text-[10px] text-purple-400 font-mono">
            <span>Sovereign Knowledge Network</span>
          </div>
          <h3 className="font-bold text-2xl text-white tracking-tight">BestAIAgent.in Master Resource Index</h3>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            Explore our curated bento directory mapping certified tools, pricing plans, comparisons, and technical guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento Block 1: Tools */}
          <div className="bg-[#070b1e]/60 border border-gray-900 p-5 rounded-2xl space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center space-x-2">
              <Cpu className="h-4 w-4" />
              <span>Certified Agent Tools</span>
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { label: "Cursor AI IDE Review", path: "tools/cursor-ai" },
                { label: "CrewAI Orchestration", path: "tools/crewai" },
                { label: "Dify Visual Studio", path: "tools/dify" },
                { label: "Flowise Canvas Builder", path: "tools/flowise" },
                { label: "GitHub Copilot Companion", path: "tools/github-copilot" },
                { label: "Vapi Voice Platform", path: "tools/vapi-ai" },
                { label: "Yellow.ai Support Bot", path: "tools/yellow-ai" }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate && onNavigate(link.path)}
                  className="w-full text-left py-1.5 text-gray-400 hover:text-purple-400 transition-all font-sans font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-3 w-3 opacity-40 hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Bento Block 2: Comparisons */}
          <div className="bg-[#070b1e]/60 border border-gray-900 p-5 rounded-2xl space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Architectural Faceoffs</span>
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { label: "CrewAI vs AutoGen", path: "crewai-vs-autogen" },
                { label: "CrewAI vs LangGraph", path: "crewai-vs-langgraph" },
                { label: "Cursor AI vs Codex", path: "cursor-vs-codex" },
                { label: "Cursor vs GitHub Copilot", path: "cursor-vs-github-copilot" },
                { label: "Dify vs Flowise Canvas", path: "dify-vs-flowise" }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate && onNavigate(link.path)}
                  className="w-full text-left py-1.5 text-gray-400 hover:text-cyan-400 transition-all font-sans font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-3 w-3 opacity-40 hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Bento Block 3: Pricing Plans */}
          <div className="bg-[#070b1e]/60 border border-gray-900 p-5 rounded-2xl space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Cost & Overage Audits</span>
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { label: "Cursor Pricing Audit", path: "cursor-pricing" },
                { label: "Dify Cloud Tiers", path: "dify-pricing" },
                { label: "Flowise Resource Costs", path: "flowise-pricing" },
                { label: "Vapi Voice Minute Billing", path: "vapi-pricing" },
                { label: "n8n Cloud Tiers", path: "n8n-pricing" },
                { label: "Interactive Calculators", path: "calculators" }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate && onNavigate(link.path)}
                  className="w-full text-left py-1.5 text-gray-400 hover:text-emerald-400 transition-all font-sans font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-3 w-3 opacity-40 hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Bento Block 4: MCP Protocol & Policy */}
          <div className="bg-[#070b1e]/60 border border-gray-900 p-5 rounded-2xl space-y-4 shadow-sm">
            <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>MCP & Editorial Standards</span>
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { label: "What is MCP Protocol?", path: "what-is-mcp" },
                { label: "Best MCP Servers List", path: "best-mcp-servers" },
                { label: "MCP Hub & Marketplace", path: "mcp-hub" },
                { label: "Our Editorial Methodology", path: "methodology" },
                { label: "Compliance & Editorial Board", path: "about-editorial-team" },
                { label: "Enterprise Security Rules", path: "mcp-security" }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate && onNavigate(link.path)}
                  className="w-full text-left py-1.5 text-gray-400 hover:text-amber-500 transition-all font-sans font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-3 w-3 opacity-40 hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
