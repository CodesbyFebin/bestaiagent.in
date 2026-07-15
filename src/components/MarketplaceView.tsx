import React, { useState } from "react";
import { 
  Sparkles, Check, Play, ShieldAlert, Award, ChevronRight, Activity, 
  HelpCircle, CreditCard, Laptop, ShieldCheck, Cpu, Database, Network, MessageSquare, PlusCircle 
} from "lucide-react";
import { Agent } from "../types";

interface MarketplaceViewProps {
  onAgentClick: (agent: Agent) => void;
  setActiveTab: (tab: string) => void;
}

interface SellerAgent {
  id: string;
  name: string;
  creator: string;
  description: string;
  category: string;
  price: string;
  proPrice: number;
  rating: number;
  users: string;
  tag: "Bestseller" | "Popular" | "Trending" | "New";
  icon: string;
}

export default function MarketplaceView({ onAgentClick, setActiveTab }: MarketplaceViewProps) {
  const [activeMarketTab, setActiveMarketTab] = useState("all");
  const [isYearly, setIsYearly] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  
  // Custom Agent Publish State
  const [pubName, setPubName] = useState("");
  const [pubCategory, setPubCategory] = useState("productivity");
  const [pubPrice, setPubPrice] = useState("Freemium");
  const [pubProPrice, setPubProPrice] = useState("₹499");
  const [pubDesc, setPubDesc] = useState("");
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Seller listings
  const [sellerAgents, setSellerAgents] = useState<SellerAgent[]>([
    {
      id: "whatsapp-asst",
      name: "WhatsApp AI Assistant",
      creator: "BotCraft India",
      description: "Automate WhatsApp replies, capture business leads, and screen customer support queries seamlessly.",
      category: "productivity",
      price: "Freemium",
      proPrice: 499,
      rating: 4.8,
      users: "2.1K",
      tag: "Bestseller",
      icon: "MessageSquare"
    },
    {
      id: "gmail-agent",
      name: "Gmail AI Agent",
      creator: "MailGenius",
      description: "Smart email inbox organization. Auto-draft replies, flag crucial threads, and compose summaries.",
      category: "productivity",
      price: "Free",
      proPrice: 399,
      rating: 4.7,
      users: "1.8K",
      tag: "Popular",
      icon: "Mail"
    },
    {
      id: "notion-ai",
      name: "Notion Workspace AI",
      creator: "NetGen Apps",
      description: "Deep crawl and organize complex Notion documentation. Summarize and link related workspaces.",
      category: "development",
      price: "Freemium",
      proPrice: 599,
      rating: 4.9,
      users: "1.2K",
      tag: "Trending",
      icon: "Database"
    },
    {
      id: "excel-analyst",
      name: "Excel AI Analyst",
      creator: "SheetMaster",
      description: "Analyze, chart, and build automated formulas inside spreadsheets using natural language scripts.",
      category: "analytics",
      price: "Freemium",
      proPrice: 599,
      rating: 4.6,
      users: "980",
      tag: "New",
      icon: "BarChart3"
    },
    {
      id: "code-explainer",
      name: "Code Explainer AI",
      creator: "DevAI India",
      description: "Instantly explain convoluted legacy codeblocks, generate high-quality docstrings, and find bugs.",
      category: "development",
      price: "Freemium",
      proPrice: 999,
      rating: 4.8,
      users: "2.4K",
      tag: "Popular",
      icon: "Code2"
    }
  ]);

  const handlePublishAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubName.trim() || !pubDesc.trim()) return;

    const newAgent: SellerAgent = {
      id: `sell-${Date.now()}`,
      name: pubName,
      creator: "Your Organization",
      description: pubDesc,
      category: pubCategory,
      price: pubPrice,
      proPrice: parseInt(pubProPrice.replace(/\D/g, "")) || 499,
      rating: 5.0,
      users: "1",
      tag: "New",
      icon: "Sparkles"
    };

    setSellerAgents([newAgent, ...sellerAgents]);
    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      setPublishModalOpen(false);
      setPubName("");
      setPubDesc("");
    }, 2000);
  };

  const filteredSellerAgents = activeMarketTab === "all" 
    ? sellerAgents 
    : sellerAgents.filter(a => a.category === activeMarketTab);

  return (
    <div className="bg-[#050816] text-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-900 bg-[#0B1120]/10">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-purple-600/5 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-cyan-600/5 blur-[100px]"></div>

        <div className="mx-auto max-w-7xl text-center space-y-6">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1 text-xs text-purple-400">
            <PlusCircle className="h-3 w-3 animate-pulse" />
            <span>Sovereign Host & Monetization platform</span>
          </div>

          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Claim. Host. Sell.<br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">The Future is Agentic.</span>
          </h1>
          
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-gray-400">
            Publish your custom AI container, integrate with standard billing APIs, and tap into global enterprise buyers with zero setup headaches.
          </p>

          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setPublishModalOpen(true)}
              className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Claim Your Agent
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById("active-listings");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full border border-gray-800 bg-[#0B1120]/40 px-6 py-3 text-xs font-semibold text-gray-300 hover:bg-gray-900 transition-all"
            >
              Explore Listings
            </button>
          </div>

          {/* Stats strip */}
          <div className="mx-auto max-w-3xl pt-6 grid grid-cols-3 gap-4 border-t border-gray-900/60 mt-8 text-center">
            <div>
              <div className="text-lg sm:text-xl font-bold text-gray-200">10,000+</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">AI Agents</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-gray-200">2,500+</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Developers & Creators</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-emerald-400">100% Secure</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Sandboxed Containers</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Three simple steps to publish & earn</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-850 bg-gray-950 p-5 space-y-3 relative">
            <span className="absolute -top-3 left-4 h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs">1</span>
            <h3 className="font-bold text-sm text-gray-200 pt-1">Claim Your Agent</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Specify your API manifest, upload environment variables, describe capabilities, and configure flexible billing metrics.</p>
          </div>
          <div className="rounded-2xl border border-gray-850 bg-gray-950 p-5 space-y-3 relative">
            <span className="absolute -top-3 left-4 h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs">2</span>
            <h3 className="font-bold text-sm text-gray-200 pt-1">We Host & Verify</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Our clusters spin up sandboxed Docker containers, perform security fuzzing, monitor latencies, and assign active endpoints.</p>
          </div>
          <div className="rounded-2xl border border-gray-850 bg-gray-950 p-5 space-y-3 relative">
            <span className="absolute -top-3 left-4 h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs">3</span>
            <h3 className="font-bold text-sm text-gray-200 pt-1">Users Buy & You Earn</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Enterprises, developers, and consumers subscribe or pay-per-token. BestAIAgent wires steady payouts to your local banks.</p>
          </div>
        </div>
      </section>

      {/* Advanced Market listings */}
      <section id="active-listings" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-900 pb-4 mb-8 gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Active Creator Listings</h2>
            <p className="text-xs text-gray-400 mt-1">Ready-to-use microservice sandboxes fuzzed and verified for production use.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex space-x-1 p-0.5 bg-gray-950 border border-gray-900 rounded-lg">
            {["all", "productivity", "development", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMarketTab(tab)}
                className={`rounded px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  activeMarketTab === tab ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSellerAgents.map((agent) => (
            <div 
              key={agent.id}
              className="rounded-2xl border border-gray-800 bg-[#111827]/30 p-5 hover:border-purple-500/20 hover:bg-gradient-to-b hover:from-gray-900/40 hover:to-gray-950/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono ${
                    agent.tag === "Bestseller" ? "bg-amber-950/40 text-amber-400 border border-amber-900/30" :
                    agent.tag === "Trending" ? "bg-purple-950/40 text-purple-400 border border-purple-900/30" :
                    agent.tag === "New" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30" :
                    "bg-cyan-950/40 text-cyan-400 border border-cyan-900/30"
                  }`}>
                    {agent.tag}
                  </span>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase">{agent.price}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-gray-200 text-base group-hover:text-purple-400 transition-colors">{agent.name}</h3>
                  <span className="text-[11px] text-gray-500 font-semibold uppercase block">by {agent.creator}</span>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{agent.description}</p>
                </div>
              </div>

              {/* pricing details and call to action */}
              <div className="mt-6 pt-4 border-t border-gray-900 flex items-center justify-between text-xs font-mono text-gray-500">
                <div className="text-gray-400">
                  <span className="text-xs font-bold text-gray-200">₹{isYearly ? Math.round(agent.proPrice * 0.8) : agent.proPrice}</span>
                  <span className="text-[10px] text-gray-500 font-normal"> / month</span>
                </div>
                <button 
                  onClick={() => {
                    // Navigate to dashboard deployments
                    setActiveTab("dashboard");
                  }}
                  className="rounded bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/30 px-3.5 py-1.5 text-[10px] font-bold text-purple-300 uppercase tracking-widest"
                >
                  Host Sandbox
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-900 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-white">Simple, Faceted Billing Plans</h2>
          <p className="text-xs text-gray-400">Host multiple developer containers without complex infrastructure headaches.</p>
          
          {/* Monthly Yearly Toggle */}
          <div className="inline-flex items-center space-x-3 bg-gray-950 border border-gray-850 p-1.5 rounded-full select-none">
            <button 
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all ${!isYearly ? "bg-purple-600 text-white" : "text-gray-400"}`}
            >
              Monthly Billing
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all relative ${isYearly ? "bg-purple-600 text-white" : "text-gray-400"}`}
            >
              Yearly Billing
              <span className="absolute -top-4 -right-4 text-[9px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-900 px-1.5 rounded py-0.5 uppercase tracking-wide">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Free plan */}
          <div className="rounded-2xl border border-gray-850 bg-[#0B1120]/10 p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Free Sandbox</h3>
              <div className="text-3xl font-extrabold text-white">₹0 <span className="text-xs font-normal text-gray-400"> / month</span></div>
              <p className="text-xs text-gray-500">Perfect for testing agents and running tiny API scripts.</p>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-400 border-t border-gray-900 pt-4">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>1 free active container sandbox</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>50,000 standard API requests</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Community Discord support</span>
              </li>
            </ul>
            <button onClick={() => setActiveTab("dashboard")} className="w-full text-center rounded-lg border border-gray-800 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-900">
              Get Started Free
            </button>
          </div>

          {/* Pro plan */}
          <div className="rounded-2xl border border-purple-500/30 bg-[#0B1120]/30 p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] font-bold font-mono px-3 py-1 uppercase rounded-bl tracking-widest">
              Most Popular
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-purple-400 uppercase tracking-wider">Pro Developer</h3>
              <div className="text-3xl font-extrabold text-white">
                ₹{isYearly ? "399" : "499"}<span className="text-xs font-normal text-gray-400"> / month</span>
              </div>
              <p className="text-xs text-gray-500">Unleash priority server queues, high context reasoning, and larger scale fuzzer pipelines.</p>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300 border-t border-gray-900 pt-4">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span className="font-semibold text-white">5 active container sandboxes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Unlimited API requests included</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Access to premium global models</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Email and ticketing support channels</span>
              </li>
            </ul>
            <button onClick={() => setActiveTab("dashboard")} className="w-full text-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-semibold text-white shadow-lg">
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl border border-gray-850 bg-[#0B1120]/10 p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Enterprise Dedicated</h3>
              <div className="text-3xl font-extrabold text-white">Custom <span className="text-xs font-normal text-gray-400"> / bespoke quote</span></div>
              <p className="text-xs text-gray-500">Sovereign regional clusters, SOC2, hybrid on-prem, and rigorous SLAs.</p>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-400 border-t border-gray-900 pt-4">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Dedicated hardware cluster nodes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Sovereign local Indian data compliance</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Single Sign-On (SSO) & RBAC keys</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span>Dedicated 24/7 support ML team</span>
              </li>
            </ul>
            <button onClick={() => setActiveTab("dashboard")} className="w-full text-center rounded-lg border border-gray-800 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-900">
              Contact Sales team
            </button>
          </div>
        </div>
      </section>

      {/* Claim / Publish Agent Modal Form */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-6 space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span>Claim & Publish Custom AI Agent</span>
            </h3>
            <p className="text-xs text-gray-400">Specify your microservice parameters. Our staging cluster will audit the files in minutes.</p>
            
            {publishedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-sm text-gray-100">Agent Container Provisioned!</h4>
                <p className="text-xs text-gray-500">Staging sandbox fuzzed successfully. Deploying to creator catalog...</p>
              </div>
            ) : (
              <form onSubmit={handlePublishAgent} className="space-y-4 text-xs text-gray-300">
                <div>
                  <label className="block text-[11px] text-gray-500 font-semibold uppercase mb-1">Agent Service Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead-Generator-WhatsApp-AI"
                    value={pubName}
                    onChange={(e) => setPubName(e.target.value)}
                    className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-gray-500 font-semibold uppercase mb-1">Target Category</label>
                    <select
                      value={pubCategory}
                      onChange={(e) => setPubCategory(e.target.value)}
                      className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="productivity">Productivity</option>
                      <option value="development">Development / Code</option>
                      <option value="analytics">Data & Analytics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 font-semibold uppercase mb-1">Target Pro Price (₹)</label>
                    <input
                      type="text"
                      placeholder="₹499"
                      value={pubProPrice}
                      onChange={(e) => setPubProPrice(e.target.value)}
                      className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-500 font-semibold uppercase mb-1">Agent capabilities description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly detail what your fuzzed sandbox container performs, security boundaries, and required API passes..."
                    value={pubDesc}
                    onChange={(e) => setPubDesc(e.target.value)}
                    className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPublishModalOpen(false)}
                    className="rounded px-4 py-2 bg-gray-900 hover:bg-gray-850 font-semibold text-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-purple-600 hover:bg-purple-500 px-4 py-2 font-semibold text-white"
                  >
                    Deploy sandbox
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
