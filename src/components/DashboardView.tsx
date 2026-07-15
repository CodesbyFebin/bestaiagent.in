import React, { useState, useEffect } from "react";
import { 
  Terminal, ShieldCheck, Key, Settings, CreditCard, Activity, BarChart2, 
  Cpu, Plus, Copy, Check, Trash2, Play, Pause, RefreshCw, Layers 
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";

// Simulated historical metric charts data
const usageData = [
  { name: "Jul 01", requests: 12000, gpu: 120 },
  { name: "Jul 02", requests: 19000, gpu: 180 },
  { name: "Jul 03", requests: 15000, gpu: 150 },
  { name: "Jul 04", requests: 28000, gpu: 290 },
  { name: "Jul 05", requests: 35000, gpu: 310 },
  { name: "Jul 06", requests: 32000, gpu: 280 },
  { name: "Jul 07", requests: 45000, gpu: 410 },
];

const revenueData = [
  { name: "Krutrim LLM", revenue: 15400 },
  { name: "Kusho API QA", revenue: 12900 },
  { name: "Sarvam Speech", revenue: 8500 },
  { name: "Marketing Agent", revenue: 5400 },
  { name: "Custom Chat", revenue: 3000 },
];

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
}

interface CustomDeployment {
  id: string;
  name: string;
  model: string;
  prompt: string;
  status: "active" | "spinning" | "paused";
  url: string;
}

export default function DashboardView() {
  const [subTab, setSubTab] = useState<"overview" | "api-keys" | "deployments" | "billing">("overview");
  
  // State for API Key Generator
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    { id: "1", name: "Prod-Krutrim-Connector", key: "ba_live_7c3aed91b5cf622d3ee9a855", created: "2026-06-20", lastUsed: "2 mins ago" },
    { id: "2", name: "Cursor-IDE-Autocomplete", key: "ba_live_22d3ee91b5cf622d3eea855f", created: "2026-07-02", lastUsed: "1 hour ago" },
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // State for Deployments
  const [deployments, setDeployments] = useState<CustomDeployment[]>([
    { id: "dep-1", name: "Krutrim-Translation-v2", model: "krutrim-2.5-pro", prompt: "Translate legal terms gracefully", status: "active", url: "https://api.bestaiagent.in/v1/krutrim-trans" },
    { id: "dep-2", name: "QA-Kusho-API-Fuzzer", model: "kusho-v1.2", prompt: "Perform deep API fuzzing suites on staging", status: "active", url: "https://api.bestaiagent.in/v1/qa-fuzzer" },
    { id: "dep-3", name: "Sarvam-Hindi-Voicebot", model: "sarvam-speech-1.5", prompt: "Handle voice-driven banking requests in Hindi", status: "paused", url: "https://api.bestaiagent.in/v1/hindi-voice" },
  ]);
  const [newDepName, setNewDepName] = useState("");
  const [newDepModel, setNewDepModel] = useState("krutrim-2.5-pro");
  const [newDepPrompt, setNewDepPrompt] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);

  // State for rolling logs
  const [logs, setLogs] = useState<string[]>([
    "🚀 BestAIAgent Container Host Initialized.",
    "🐳 [Krutrim-Translation-v2] Sandboxed container spinning up...",
    "🔑 [AuthManager] API Key verified for client IP 103.54.21.99",
    "✨ [Krutrim-Translation-v2] Container ready. Internal port 8080 exposed.",
    "📡 Listening on ingress endpoint: https://api.bestaiagent.in/v1/krutrim-trans",
    "📈 [AnalyticsCollector] Aggregating memory footprint: Heap 124MB / Allocation limit 512MB",
    "🤖 [QA-Kusho-API-Fuzzer] Received payload: 50 end-points fuzzed. 0 vulnerabilities discovered."
  ]);
  const [isStreamingLogs, setIsStreamingLogs] = useState(true);

  // Log simulation effect
  useEffect(() => {
    if (!isStreamingLogs) return;

    const interval = setInterval(() => {
      const logOptions = [
        `🔑 [AuthManager] API Key authenticated successfully.`,
        `📈 [ResourceMonitor] CPU Core utilization at 12.4% - All systems nominal.`,
        `📡 Inbound webhook request completed in 142ms - Response status 200 OK`,
        `🤖 [Krutrim-Translation-v2] Executed fine-tuned transliteration model on 45 paragraphs.`,
        `✨ [QA-Kusho-API-Fuzzer] Auto-synchronized Swagger specification sheet.`,
        `🐳 [ContainerHost] Pruned 0 inactive container cache sheets.`,
        `📦 [AgentMemory] Long-term episodic memory consolidated (Firestore sync complete).`
      ];
      const randomLog = logOptions[Math.floor(Math.random() * logOptions.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomLog}`]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isStreamingLogs]);

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const newKey: ApiKeyItem = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `ba_live_${randomHex}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never"
    };
    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName("");
  };

  const handleCopyKey = (id: string, keyValue: string) => {
    navigator.clipboard.writeText(keyValue);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  const handleDeployAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepName.trim() || !newDepPrompt.trim()) return;
    setIsDeploying(true);

    // Simulate cluster launch delay
    setTimeout(() => {
      const newDep: CustomDeployment = {
        id: `dep-${Date.now()}`,
        name: newDepName,
        model: newDepModel,
        prompt: newDepPrompt,
        status: "active",
        url: `https://api.bestaiagent.in/v1/${newDepName.toLowerCase().replace(/\s+/g, "-")}`
      };
      setDeployments([newDep, ...deployments]);
      setLogs(prev => [...prev, `🐳 [ContainerHost] Brand new agent [${newDep.name}] deployed successfully on serverless GPU!`]);
      setNewDepName("");
      setNewDepPrompt("");
      setIsDeploying(false);
    }, 1500);
  };

  const toggleDeploymentStatus = (id: string) => {
    setDeployments(deployments.map(d => {
      if (d.id === id) {
        const nextStatus = d.status === "active" ? "paused" : "active";
        setLogs(prev => [...prev, `⚙️ Deployment [${d.name}] status toggled to [${nextStatus.toUpperCase()}]`]);
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#050816] text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-800/80 bg-[#0B1120]/40 p-4 hidden md:block">
        <div className="flex items-center space-x-2 px-3 py-2 mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">
          <Layers className="h-4 w-4 text-cyan-400" />
          <span>Developer OS</span>
        </div>
        <nav className="space-y-1">
          <button
            onClick={() => setSubTab("overview")}
            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              subTab === "overview" ? "bg-purple-950/30 text-purple-400 border-l-2 border-purple-500" : "text-gray-400 hover:bg-gray-900"
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Overview & Metrics</span>
          </button>
          <button
            onClick={() => setSubTab("deployments")}
            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              subTab === "deployments" ? "bg-purple-950/30 text-purple-400 border-l-2 border-purple-500" : "text-gray-400 hover:bg-gray-900"
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>GPU Host Sandbox</span>
          </button>
          <button
            onClick={() => setSubTab("api-keys")}
            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              subTab === "api-keys" ? "bg-purple-950/30 text-purple-400 border-l-2 border-purple-500" : "text-gray-400 hover:bg-gray-900"
            }`}
          >
            <Key className="h-4 w-4" />
            <span>API credentials</span>
          </button>
          <button
            onClick={() => setSubTab("billing")}
            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              subTab === "billing" ? "bg-purple-950/30 text-purple-400 border-l-2 border-purple-500" : "text-gray-400 hover:bg-gray-900"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Ecosystem Billing</span>
          </button>
        </nav>

        <div className="mt-8 border-t border-gray-800 pt-6">
          <div className="rounded-lg bg-gray-950 border border-gray-800/80 p-3.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-gray-500 font-semibold uppercase">API Balance</span>
              <span className="text-xs text-emerald-400 font-bold">Active</span>
            </div>
            <div className="text-lg font-bold text-gray-200">₹8,450.25</div>
            <p className="text-[10px] text-gray-500 mt-1">Prepaid developer credits. Recharge via Razorpay or Stripe.</p>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {/* Top welcome info */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-900 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
              <span>BestAIAgent Portal</span>
              <span className="text-xs text-purple-400 bg-purple-950/50 border border-purple-800 rounded px-1.5 py-0.5 font-normal uppercase">
                v2.0 Atlas
              </span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Deploy, monitor, and scale sovereign multi-modal AI workloads in minutes.</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                setLogs(prev => [...prev, `🔄 [Monitor] Developer forced full health check... All clusters OK.`]);
              }} 
              className="flex items-center space-x-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 px-3.5 py-2 text-xs font-semibold text-gray-300"
            >
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Full Health Check</span>
            </button>
          </div>
        </div>

        {/* Dynamic sub tab selections on mobile */}
        <div className="flex space-x-1 p-1 bg-gray-950 border border-gray-900 rounded-lg md:hidden mb-6">
          {["overview", "deployments", "api-keys", "billing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab as any)}
              className={`flex-1 rounded py-2 text-center text-xs font-medium capitalize transition-all ${
                subTab === tab ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---------------- OVERVIEW TAB ---------------- */}
        {subTab === "overview" && (
          <div className="space-y-8">
            {/* Live Metrics row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-800 bg-[#0B1120]/30 p-5 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-cyan-500 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Cpu className="h-8 w-8" />
                </div>
                <span className="text-[11px] text-gray-500 font-semibold uppercase">Serverless GPU usage</span>
                <div className="text-2xl font-bold text-white mt-1">410 <span className="text-xs font-normal text-gray-400">Hours</span></div>
                <div className="text-xs text-cyan-400 flex items-center space-x-1 mt-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  <span>4 core cluster fully active</span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800 bg-[#0B1120]/30 p-5 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-purple-500 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Activity className="h-8 w-8" />
                </div>
                <span className="text-[11px] text-gray-500 font-semibold uppercase">Total API requests</span>
                <div className="text-2xl font-bold text-white mt-1">186,000</div>
                <div className="text-xs text-purple-400 flex items-center space-x-1 mt-1.5">
                  <span>+18.5% YoY growth spikes</span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800 bg-[#0B1120]/30 p-5 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-emerald-500 opacity-20 group-hover:opacity-40 transition-opacity">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <span className="text-[11px] text-gray-500 font-semibold uppercase">Cluster Agent Health</span>
                <div className="text-2xl font-bold text-white mt-1">99.99%</div>
                <div className="text-xs text-emerald-400 flex items-center space-x-1 mt-1.5">
                  <span>No degradation reported</span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800 bg-[#0B1120]/30 p-5 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 text-orange-500 opacity-20 group-hover:opacity-40 transition-opacity">
                  <CreditCard className="h-8 w-8" />
                </div>
                <span className="text-[11px] text-gray-500 font-semibold uppercase">Earned Revenue</span>
                <div className="text-2xl font-bold text-white mt-1">₹45,230</div>
                <div className="text-xs text-orange-400 flex items-center space-x-1 mt-1.5">
                  <span>Payouts arriving on Jul 15</span>
                </div>
              </div>
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-800/80 bg-gray-950/40 p-5 lg:col-span-2">
                <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                  <span>Ecosystem API Requests vs GPU Hours</span>
                </h3>
                <div className="h-72 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#374151", color: "#FFF" }} />
                      <Area type="monotone" dataKey="requests" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" name="API requests" />
                      <Area type="monotone" dataKey="gpu" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorGpu)" name="GPU (Hours)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800/80 bg-gray-950/40 p-5">
                <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                  <span>Revenue Contribution</span>
                </h3>
                <div className="h-72 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={90} />
                      <Tooltip contentStyle={{ backgroundColor: "#0F172A", borderColor: "#374151", color: "#FFF" }} />
                      <Bar dataKey="revenue" fill="#A855F7" radius={[0, 4, 4, 0]} name="Earnings (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Simulated Live Logging terminal */}
            <div className="rounded-xl border border-purple-500/20 bg-gray-950 p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-1 right-2 flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>

              <div className="flex items-center justify-between border-b border-gray-900 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold tracking-tight text-gray-300 uppercase">Live Serverless Logs stream</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsStreamingLogs(!isStreamingLogs)} 
                    className="flex items-center space-x-1 rounded bg-gray-900 hover:bg-gray-850 border border-gray-800 px-2.5 py-1 text-[10px] text-gray-400"
                  >
                    {isStreamingLogs ? <Pause className="h-2.5 w-2.5 text-yellow-500" /> : <Play className="h-2.5 w-2.5 text-emerald-500" />}
                    <span>{isStreamingLogs ? "Pause Stream" : "Resume Stream"}</span>
                  </button>
                  <button 
                    onClick={() => setLogs([])} 
                    className="rounded bg-gray-900 hover:bg-gray-850 border border-gray-800 px-2.5 py-1 text-[10px] text-gray-400"
                  >
                    Clear Logs
                  </button>
                </div>
              </div>

              <div className="h-48 overflow-y-auto font-mono text-[11px] leading-relaxed text-gray-400 space-y-1.5 select-all pr-2">
                {logs.length === 0 ? (
                  <p className="text-gray-600 italic">[Logs cleared. Waiting for events...]</p>
                ) : (
                  logs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`border-l-2 pl-2 transition-all ${
                        log.includes("Auth") 
                          ? "border-purple-500 text-purple-300" 
                          : log.includes("Error") 
                          ? "border-red-500 text-red-400 font-semibold" 
                          : log.includes("🐳") 
                          ? "border-cyan-500 text-cyan-200" 
                          : "border-gray-800 text-gray-300"
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- DEPLOYMENTS TAB ---------------- */}
        {subTab === "deployments" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Deploy New Agent Form */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 lg:col-span-1">
                <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-purple-400" />
                  <span>Launch Dedicated Sandboxed Agent</span>
                </h3>
                <form onSubmit={handleDeployAgent} className="space-y-4">
                  <div>
                    <label className="block text-[11px] text-gray-400 font-semibold uppercase mb-1">Agent Microservice Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Finance-Analyzer-AI"
                      value={newDepName}
                      onChange={(e) => setNewDepName(e.target.value)}
                      className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 placeholder-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 font-semibold uppercase mb-1">Base AI Model family</label>
                    <select
                      value={newDepModel}
                      onChange={(e) => setNewDepModel(e.target.value)}
                      className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="krutrim-2.5-pro">Krutrim 2.5 Pro (Sovereign regional)</option>
                      <option value="sarvam-speech-1.5">Sarvam Speech 1.5 Voice-First</option>
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash (Global high-speed)</option>
                      <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Complex logical reasoning)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 font-semibold uppercase mb-1">Agent System Instruction Prompt</label>
                    <textarea
                      rows={4}
                      placeholder="Instruct your agent how to behave, what APIs to query, or regional filters to execute..."
                      value={newDepPrompt}
                      onChange={(e) => setNewDepPrompt(e.target.value)}
                      className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 placeholder-gray-600 focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isDeploying}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-semibold text-white hover:scale-[1.01] transition-all disabled:opacity-50"
                  >
                    {isDeploying ? "Provisioning Serverless Sandbox..." : "Provision Sandbox & Deploy"}
                  </button>
                </form>
              </div>

              {/* Active Deployments List */}
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 lg:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-cyan-400" />
                  <span>Your Serverless Deployments</span>
                </h3>
                
                <div className="space-y-4">
                  {deployments.map((dep) => (
                    <div 
                      key={dep.id} 
                      className="rounded-lg border border-gray-800 bg-[#0B1120]/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-gray-200">{dep.name}</span>
                          <span className={`h-2 w-2 rounded-full ${dep.status === "active" ? "bg-emerald-500" : "bg-yellow-500"}`}></span>
                          <span className="text-[10px] text-gray-500 font-mono capitalize">{dep.status}</span>
                        </div>
                        <div className="text-xs font-mono text-cyan-400">{dep.url}</div>
                        <div className="text-[11px] text-gray-400"><strong className="text-gray-500 uppercase">Base Model:</strong> {dep.model}</div>
                        <div className="text-[11px] text-gray-400 italic mt-1 font-mono">"{dep.prompt.slice(0, 75)}..."</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleDeploymentStatus(dep.id)}
                          className="rounded border border-gray-850 bg-gray-900 hover:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-300"
                        >
                          {dep.status === "active" ? "Pause Container" : "Resume Container"}
                        </button>
                        <button
                          onClick={() => {
                            setDeployments(deployments.filter(d => d.id !== dep.id));
                            setLogs(prev => [...prev, `🗑️ Deployment [${dep.name}] deleted from cluster`]);
                          }}
                          className="rounded border border-red-950 hover:bg-red-950/20 px-3 py-1.5 text-xs font-semibold text-red-400"
                        >
                          Prune
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- API KEYS TAB ---------------- */}
        {subTab === "api-keys" && (
          <div className="max-w-4xl space-y-6">
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                <Key className="h-5 w-5 text-cyan-400" />
                <span>Generate Ingress API credentials</span>
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Use these client keys to connect your apps, IDEs (Cursor/VS Code), or terminal clients to our hosted India regional sandboxes. Keep these private.
              </p>

              <form onSubmit={handleGenerateKey} className="flex items-center space-x-2 mb-6">
                <input
                  type="text"
                  placeholder="e.g. Marketing-Slack-Bot"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1 rounded border border-gray-800 bg-gray-900 px-3.5 py-2 text-xs text-gray-300 placeholder-gray-600 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-cyan-600 to-purple-600 px-5 py-2 text-xs font-semibold text-white hover:scale-[1.01] transition-all"
                >
                  Generate live Key
                </button>
              </form>

              {/* API Keys Table */}
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="rounded-lg border border-gray-850 bg-gray-900/30 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm text-gray-200">{key.name}</div>
                      <div className="font-mono text-xs text-gray-400 flex items-center space-x-2 bg-gray-950 px-2.5 py-1 rounded border border-gray-850">
                        <span>{key.key}</span>
                        <button 
                          onClick={() => handleCopyKey(key.id, key.key)}
                          className="text-gray-500 hover:text-cyan-400 transition-colors"
                        >
                          {copiedKeyId === key.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <div className="flex items-center space-x-4 text-[10px] text-gray-500 mt-1">
                        <span><strong className="text-gray-400 uppercase">Created:</strong> {key.created}</span>
                        <span><strong className="text-gray-400 uppercase">Last used:</strong> {key.lastUsed}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="text-gray-500 hover:text-red-400 p-2 transition-colors self-end sm:self-auto"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- BILLING TAB ---------------- */}
        {subTab === "billing" && (
          <div className="max-w-4xl space-y-6">
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-gray-900 pb-3">
                <CreditCard className="h-5 w-5 text-purple-400" />
                <span>Monthly Billing & Ecosystem Ledger</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg bg-[#0B1120]/30 border border-gray-800 p-5 space-y-4">
                  <h4 className="text-xs text-gray-400 font-semibold uppercase">Current Accrued Cost</h4>
                  <div className="text-3xl font-bold text-white">₹12,450.00 <span className="text-xs font-normal text-gray-400">accrued this month</span></div>
                  
                  <div className="space-y-2 pt-2 border-t border-gray-900 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Serverless Container Sandbox hosting</span>
                      <span className="text-gray-200">₹8,900.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Krutrim API token passes</span>
                      <span className="text-gray-200">₹3,550.00</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#0B1120]/30 border border-gray-800 p-5 space-y-4">
                  <h4 className="text-xs text-gray-400 font-semibold uppercase">Next Payout Earnings (For Creators)</h4>
                  <div className="text-3xl font-bold text-emerald-400">₹45,230.00 <span className="text-xs font-normal text-gray-400">accrued earnings</span></div>
                  
                  <div className="space-y-2 pt-2 border-t border-gray-900 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">WhatsApp AI Assistant subscribes</span>
                      <span className="text-emerald-400 font-medium">₹41,250.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Custom Code Explainer usage fee</span>
                      <span className="text-emerald-400 font-medium">₹3,980.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoices List */}
              <div className="pt-4">
                <h4 className="text-xs font-semibold text-gray-300 uppercase mb-3">Invoice Ledger History</h4>
                <div className="rounded-lg border border-gray-850 bg-gray-900/30 overflow-hidden text-xs">
                  <div className="grid grid-cols-4 bg-gray-950 p-3 font-semibold text-gray-400 border-b border-gray-850">
                    <span>Invoice ID</span>
                    <span>Billing Period</span>
                    <span>Accrued Cost</span>
                    <span>Status</span>
                  </div>
                  <div className="divide-y divide-gray-850">
                    <div className="grid grid-cols-4 p-3 text-gray-300">
                      <span className="font-mono">INV-2026-003</span>
                      <span>Jun 1 - Jun 30, 2026</span>
                      <span>₹9,120.00</span>
                      <span className="text-emerald-400 font-medium">Paid via Card</span>
                    </div>
                    <div className="grid grid-cols-4 p-3 text-gray-300">
                      <span className="font-mono">INV-2026-002</span>
                      <span>May 1 - May 31, 2026</span>
                      <span>₹4,520.00</span>
                      <span className="text-emerald-400 font-medium">Paid via UPI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
