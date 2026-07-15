import { useState } from "react";
import { 
  Sparkles, Globe2, Landmark, Users, ArrowUpRight, ShieldAlert, CheckCircle2, 
  MapPin, Heart, Award, FileText, ChevronRight, HelpCircle 
} from "lucide-react";
import { AGENTS, STARTUPS } from "../data";
import { Agent } from "../types";

interface BuiltInIndiaViewProps {
  onAgentClick: (agent: Agent) => void;
  setActiveTab: (tab: string) => void;
}

export default function BuiltInIndiaView({ onAgentClick, setActiveTab }: BuiltInIndiaViewProps) {
  const [selectedCityFilter, setSelectedCityFilter] = useState<string | null>(null);

  const indianAgents = AGENTS.filter(agent => agent.isIndian);

  // Statistics
  const topStats = [
    { label: "AI Agents Built", value: "1,000+" },
    { label: "Indian Startups", value: "250+" },
    { label: "USD Funding Raised", value: "$3.2B+" },
    { label: "Users Worldwide", value: "15M+" },
    { label: "YoY growth scale", value: "65%" },
    { label: "Cities involved", value: "180+" },
    { label: "Agent Categories", value: "28+" },
    { label: "Impacted Countries", value: "50+" },
  ];

  const cityHubs = [
    { city: "Bengaluru", count: "320+", coords: "top-[58%] left-[45%]" },
    { city: "Hyderabad", count: "120+", coords: "top-[50%] left-[48%]" },
    { city: "Mumbai", count: "110+", coords: "top-[46%] left-[34%]" },
    { city: "Delhi NCR", count: "90+", coords: "top-[25%] left-[40%]" },
    { city: "Pune", count: "70+", coords: "top-[49%] left-[36%]" },
    { city: "Chennai", count: "60+", coords: "top-[68%] left-[51%]" },
    { city: "Kolkata", count: "45+", coords: "top-[41%] left-[68%]" },
  ];

  const valueProps = [
    {
      title: "Diverse by Design",
      desc: "Built to support Bharat's diversity of languages, regional contexts, and localized cultural frameworks.",
      icon: "Globe2",
      color: "from-orange-500/20 to-orange-600/5",
      border: "border-orange-500/20"
    },
    {
      title: "Cost Effective Innovation",
      desc: "Delivering world-class AI execution, lower token latencies, and cheaper deployment rates on global servers.",
      icon: "Award",
      color: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/20"
    },
    {
      title: "Privacy & Sovereignty",
      desc: "Fully compliant with India's local storage and IT frameworks, keeping strategic data safely enclosed in domestic bounds.",
      icon: "Landmark",
      color: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/20"
    },
    {
      title: "Global Impact",
      desc: "Solving real-world business constraints, rural customer support issues, and scaling productivity globally.",
      icon: "Users",
      color: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/20"
    },
  ];

  const filteredStartups = selectedCityFilter
    ? STARTUPS.filter(s => s.location.toLowerCase().includes(selectedCityFilter.toLowerCase()))
    : STARTUPS;

  return (
    <div className="bg-[#050816] text-white">
      {/* Premium Aurora Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-b border-gray-900">
        {/* Abstract background auroras */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-orange-600/10 blur-[120px]"></div>
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]"></div>
        <div className="absolute top-1/3 left-1/2 h-[30rem] w-[30rem] rounded-full bg-purple-600/10 blur-[160px] -translate-x-1/2"></div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left Column Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-4 py-1.5 text-xs text-orange-400">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span>Powering the World with Indian Innovation</span>
                <span>🇮🇳</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
                Built in <span className="bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent">India</span>
              </h1>
              
              <p className="text-base text-gray-400 leading-relaxed max-w-lg">
                Discover 1,000+ cutting-edge AI agents and tools proudly built by Bharatiya founders, developers, and global innovators. From scalable sovereign LLMs to localized QA testing.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => {
                    const el = document.getElementById("indian-agent-list");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-gradient-to-r from-orange-500 via-purple-600 to-emerald-500 p-0.5 shadow-[0_0_20px_rgba(239,125,0,0.2)] hover:shadow-[0_0_25px_rgba(239,125,0,0.3)] transition-all duration-300"
                >
                  <span className="flex items-center justify-center rounded-full bg-[#050816] px-6 py-2.5 text-sm font-semibold text-white hover:bg-transparent transition-colors">
                    Explore Indian Agents
                  </span>
                </button>
                <button 
                  onClick={() => setActiveTab("dashboard")} 
                  className="rounded-full border border-gray-800 bg-[#0B1120]/40 px-6 py-3 text-sm font-semibold text-gray-300 hover:bg-gray-900 transition-all"
                >
                  Submit Your Agent
                </button>
              </div>

              <div className="pt-6 flex items-center space-x-2 text-xs text-gray-500 font-medium">
                <span>Trusted by 50,000+ developers, businesses, and AI enthusiasts across India.</span>
              </div>
            </div>

            {/* Right Column - Map & Live Cities Cluster */}
            <div className="relative rounded-2xl border border-gray-800/85 bg-[#0B1120]/10 p-6 md:p-8 overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.05),transparent_60%)]"></div>
              
              <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-400 animate-bounce" />
                <span>Bharat AI Developer Ecosystem hubs</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* List of active cities */}
                <div className="space-y-2.5 z-10">
                  {cityHubs.map((hub) => (
                    <button
                      key={hub.city}
                      onClick={() => setSelectedCityFilter(selectedCityFilter === hub.city ? null : hub.city)}
                      className={`flex w-full items-center justify-between rounded-lg border px-4 py-2 text-xs transition-all ${
                        selectedCityFilter === hub.city
                          ? "bg-orange-500/10 border-orange-500/50 text-orange-400 font-bold"
                          : "bg-[#050816]/60 border-gray-800/80 text-gray-400 hover:bg-gray-900/60 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${selectedCityFilter === hub.city ? "bg-orange-400" : "bg-gray-600"}`}></span>
                        <span>{hub.city}</span>
                      </span>
                      <span className="font-mono bg-gray-900 px-1.5 py-0.5 rounded text-[10px] text-gray-500">
                        {hub.count} agents
                      </span>
                    </button>
                  ))}
                  {selectedCityFilter && (
                    <button 
                      onClick={() => setSelectedCityFilter(null)} 
                      className="text-[10px] text-orange-400 underline pl-1 hover:text-orange-300 transition-colors"
                    >
                      Clear city filter
                    </button>
                  )}
                </div>

                {/* Abstract visual representational coordinate grid of India map */}
                <div className="h-64 border border-gray-900 rounded-lg bg-[#050816]/40 p-4 relative overflow-hidden flex items-center justify-center font-mono text-[10px] text-gray-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,125,0,0.04),transparent_70%)]"></div>
                  
                  {/* Glowing city nodes */}
                  <div className="absolute top-[40%] left-[30%] flex flex-col items-center">
                    <span className="h-3 w-3 rounded-full bg-orange-500 animate-ping absolute"></span>
                    <span className="h-3 w-3 rounded-full bg-orange-500 border border-white"></span>
                  </div>
                  <div className="absolute top-[55%] left-[50%] flex flex-col items-center">
                    <span className="h-3.5 w-3.5 rounded-full bg-purple-500 animate-ping absolute"></span>
                    <span className="h-3.5 w-3.5 rounded-full bg-purple-500 border border-white"></span>
                  </div>
                  <div className="absolute top-[68%] left-[45%] flex flex-col items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping absolute"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 border border-white"></span>
                  </div>

                  <span className="text-[11px] text-gray-500 uppercase tracking-widest text-center select-none">
                    🇮🇳 BHARAT AI GRID<br/>
                    <span className="text-[9px] text-gray-600 lowercase font-normal">Nodes mapped successfully</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Stats counter strip */}
      <section className="border-b border-gray-900 bg-[#0B1120]/20 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4 lg:grid-cols-8 text-center">
            {topStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl font-bold tracking-tight text-white md:text-3xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Indian Agents List */}
      <section id="indian-agent-list" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-900 pb-5 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="text-orange-500">★</span>
              <span>Featured Indian AI Agents</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Discover sovereign models and local solutions making global impact.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {indianAgents.map((agent) => (
            <div 
              key={agent.id}
              onClick={() => onAgentClick(agent)}
              className="group cursor-pointer rounded-2xl border border-gray-800/80 bg-[#111827]/40 p-5 hover:border-orange-500/30 hover:bg-gradient-to-b hover:from-gray-900/60 hover:to-gray-950/80 transition-all duration-300 relative overflow-hidden"
            >
              {/* Left design strip accent */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-950/20 text-orange-400 border border-orange-900/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-orange-950/30 px-2.5 py-0.5 text-[10px] font-bold text-orange-400 uppercase tracking-widest border border-orange-900/20">
                  {agent.price}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-gray-100 text-base group-hover:text-white transition-colors">{agent.name}</h3>
                  <span className="text-xs text-gray-500">by {agent.creator}</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{agent.description}</p>
              </div>

              {/* Tags and stats footer */}
              <div className="mt-5 pt-4 border-t border-gray-900 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="text-orange-400">★</span>
                  <span className="text-gray-300">{agent.rating}</span>
                  <span className="text-gray-600">({agent.downloads} downloads)</span>
                </div>
                <div className="flex space-x-1">
                  {agent.tags.slice(0, 2).map((t, i) => (
                    <span key={i} className="rounded bg-gray-950 border border-gray-900 px-1.5 py-0.5 text-[10px] text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Indian AI Startups Directory List */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className="mb-6">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <span>Sovereign AI Startup Showcase</span>
            {selectedCityFilter && (
              <span className="text-xs font-normal text-orange-400 bg-orange-950/20 px-2 py-0.5 rounded-full border border-orange-900/30">
                Hub: {selectedCityFilter}
              </span>
            )}
          </h2>
          <p className="text-xs text-gray-500">Bharat's high-tech companies shaping natural language speech and enterprise analytics.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredStartups.map((startup, idx) => (
            <div key={idx} className="rounded-xl border border-gray-800 bg-[#0B1120]/30 p-4 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-200">{startup.name}</span>
                <span className="text-[10px] text-gray-500 font-mono flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-orange-400" />
                  <span>{startup.location.split(",")[0]}</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">{startup.tagline}</p>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">{startup.category}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Indian AI Matters & Support resources */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-900 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-white">Why Indian AI Matters to the World</h2>
          <p className="text-xs text-gray-400">Bharat is uniquely positioned to build the most resilient, inclusive, and cost-effective AI ecosystems globally.</p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop, idx) => (
            <div 
              key={idx}
              className={`rounded-xl border ${prop.border} bg-gradient-to-b ${prop.color} p-5 space-y-3`}
            >
              <h3 className="font-bold text-sm text-gray-200">{prop.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>

        {/* Resources support row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 pt-6 border-t border-gray-900">
          <div className="rounded-xl bg-gray-950 border border-gray-850 p-5 space-y-3">
            <h3 className="font-bold text-sm text-white">Funding & Grants</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Access seed funding, GPU server allocation, and cloud credit vouchers backed by global venture capital and regional accelerators.</p>
            <button onClick={() => setActiveTab("resources")} className="text-xs text-orange-400 font-semibold hover:underline flex items-center space-x-1">
              <span>View Grant Portal</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="rounded-xl bg-gray-950 border border-gray-850 p-5 space-y-3">
            <h3 className="font-bold text-sm text-white">Government Initiatives</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Learn about public policies, MeitY language corpora, and open translation APIs optimized for non-profit apps and rural digitization.</p>
            <button onClick={() => setActiveTab("resources")} className="text-xs text-emerald-400 font-semibold hover:underline flex items-center space-x-1">
              <span>View MeitY APIs</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="rounded-xl bg-gray-950 border border-gray-850 p-5 space-y-3">
            <h3 className="font-bold text-sm text-white">Local Developer Meetups</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Join active WhatsApp and Discord communities, solve complex logical reasoning problems, and learn directly from elite model builders.</p>
            <button onClick={() => setActiveTab("resources")} className="text-xs text-cyan-400 font-semibold hover:underline flex items-center space-x-1">
              <span>Join Developer Community</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Join */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-orange-600/10 via-[#0B1120] to-emerald-600/10 border border-orange-500/20 p-8 text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-emerald-500"></div>
          <h3 className="text-xl font-bold text-white">Are you building an AI agent in India?</h3>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            Get discovered by millions of global consumers, enterprises, and research organizations looking for state-of-the-art sovereign regional agents.
          </p>
          <div className="flex justify-center space-x-4 pt-2">
            <button onClick={() => setActiveTab("dashboard")} className="rounded-full bg-orange-600 hover:bg-orange-500 px-6 py-2.5 text-xs font-semibold text-white">
              Submit Your Agent
            </button>
            <button onClick={() => setActiveTab("dashboard")} className="rounded-full border border-gray-800 bg-[#0B1120]/60 hover:bg-gray-800 px-6 py-2.5 text-xs font-semibold text-gray-300">
              Join as Developer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
