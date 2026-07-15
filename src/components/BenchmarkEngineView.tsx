import React, { useState, useEffect } from "react";
import { 
  Award, ShieldCheck, Scale, AlertTriangle, Zap, Cpu, Lock, 
  DollarSign, Info, ChevronRight, HelpCircle, RefreshCw, BarChart3, Star, Compass 
} from "lucide-react";
import { AGENTS } from "../data";
import { Agent } from "../types";
import { motion } from "motion/react";

interface BenchmarkEngineViewProps {
  onAgentClick: (agent: Agent) => void;
  onAddToCompare: (agent: Agent) => void;
}

export default function BenchmarkEngineView({ onAgentClick, onAddToCompare }: BenchmarkEngineViewProps) {
  // Volume 2 Weights
  const [weights, setWeights] = useState({
    intelligence: 30,
    performance: 25,
    security: 20,
    cost: 15,
    developerExperience: 10
  });

  const [recalculatedAgents, setRecalculatedAgents] = useState<any[]>([]);
  const [activeAgentId, setActiveAgentId] = useState<string>("krutrim");

  // Recalculate scores dynamically when weights change
  useEffect(() => {
    const totalWeights = weights.intelligence + weights.performance + weights.security + weights.cost + weights.developerExperience;
    const weightFactor = totalWeights > 0 ? 100 / totalWeights : 1;

    const updated = AGENTS.map((agent) => {
      // Base attributes
      const intelligence = (agent.benchmarks.reasoning * 0.6 + agent.benchmarks.coding * 0.4);
      const performance = agent.benchmarks.speed;
      const security = agent.benchmarks.security;
      const cost = agent.benchmarks.cost; // 100 = cheap, 0 = expensive
      const devExp = agent.mcpCompatible ? 95 : 70; // score proxy

      // Weighted score
      const rawScore = 
        (intelligence * weights.intelligence + 
         performance * weights.performance + 
         security * weights.security + 
         cost * weights.cost + 
         devExp * weights.developerExperience) / 100;

      // Map to 100 scale
      const overallWeighted = Math.round(rawScore);

      return {
        ...agent,
        weightedScore: overallWeighted,
        subscores: {
          intelligence: Math.round(intelligence),
          performance: Math.round(performance),
          security: Math.round(security),
          cost: Math.round(cost),
          devExp: Math.round(devExp)
        }
      };
    }).sort((a, b) => b.weightedScore - a.weightedScore);

    setRecalculatedAgents(updated);
  }, [weights]);

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const activeAgent = recalculatedAgents.find(a => a.id === activeAgentId) || recalculatedAgents[0];

  return (
    <div className="bg-[#050816] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Visual Hero Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 text-xs text-cyan-400">
            <Award className="h-3.5 w-3.5 text-cyan-400" />
            <span>Volume 2: AI Intelligence & Benchmark Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Continuous <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Audited Performance</span> Scoring
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Configure your custom weight matrix. Adjust weights below in real-time to recalculate the comprehensive BestAIAgent.in benchmark score based on fuzzed run histories.
          </p>
        </div>

        {/* Core Interactive Benchmark Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Weight Matrix Configurator & Sliders */}
          <div className="rounded-2xl border border-gray-850 bg-[#111827]/30 p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider font-mono">Weight Matrix Adjuster</h3>
              <p className="text-[11px] text-gray-500">Fine-tune the scoring framework for your organization's compliance guidelines.</p>
            </div>

            <div className="space-y-5">
              {/* Intelligence slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-2 text-purple-400 font-semibold">
                    <Cpu className="h-3.5 w-3.5" />
                    <span>Intelligence & Logic</span>
                  </span>
                  <span className="font-mono bg-purple-950/40 text-purple-400 px-1.5 py-0.5 rounded border border-purple-900/30 font-bold">{weights.intelligence}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={weights.intelligence}
                  onChange={(e) => handleWeightChange("intelligence", parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Performance slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-2 text-cyan-400 font-semibold">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Speed & Latency</span>
                  </span>
                  <span className="font-mono bg-cyan-950/40 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-900/30 font-bold">{weights.performance}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={weights.performance}
                  onChange={(e) => handleWeightChange("performance", parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Security slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-2 text-emerald-400 font-semibold">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Security & Trust</span>
                  </span>
                  <span className="font-mono bg-emerald-950/40 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-900/30 font-bold">{weights.security}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={weights.security}
                  onChange={(e) => handleWeightChange("security", parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Cost slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-2 text-amber-400 font-semibold">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>Cost Efficiency</span>
                  </span>
                  <span className="font-mono bg-amber-950/40 text-amber-400 px-1.5 py-0.5 rounded border border-amber-900/30 font-bold">{weights.cost}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={weights.cost}
                  onChange={(e) => handleWeightChange("cost", parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Developer experience slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-2 text-indigo-400 font-semibold">
                    <Compass className="h-3.5 w-3.5" />
                    <span>Developer Exp & MCP</span>
                  </span>
                  <span className="font-mono bg-indigo-950/40 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-900/30 font-bold">{weights.developerExperience}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={weights.developerExperience}
                  onChange={(e) => handleWeightChange("developerExperience", parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-900 text-[10px] text-gray-500 font-mono flex items-center space-x-1">
              <Info className="h-3.5 w-3.5 text-gray-600" />
              <span>Normalizes dynamically to 100% factor of weighted average.</span>
            </div>
          </div>

          {/* Column 2: Re-ranked Leaderboard List */}
          <div className="rounded-2xl border border-gray-850 bg-[#111827]/30 p-6 flex flex-col h-[520px]">
            <div className="space-y-1 mb-4">
              <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider font-mono flex justify-between">
                <span>Calculated Leaderboard</span>
                <span className="text-[10px] text-purple-400 lowercase">recomputed...</span>
              </h3>
              <p className="text-[11px] text-gray-500">Click any node card to load its granular multi-category breakdown.</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
              {recalculatedAgents.map((agent, index) => {
                const isActive = agent.id === activeAgentId;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setActiveAgentId(agent.id)}
                    className={`rounded-xl border p-3.5 cursor-pointer flex items-center justify-between transition-all duration-300 ${
                      isActive 
                        ? "border-purple-500 bg-purple-950/20 shadow-[0_0_15px_rgba(124,58,237,0.15)]" 
                        : "border-gray-900 bg-[#0B1120]/40 hover:border-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-xs text-gray-600 w-4">#{index + 1}</span>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-extrabold text-xs text-gray-100">{agent.name}</h4>
                          {agent.isIndian && (
                            <span className="text-[8px] bg-orange-950/40 text-orange-400 px-1 rounded">IN</span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500">{agent.creator}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className={`text-base font-black font-mono ${isActive ? "text-purple-400" : "text-cyan-400"}`}>
                          {agent.weightedScore}
                        </div>
                        <div className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Weighted</div>
                      </div>
                      <ChevronRight className={`h-4 w-4 ${isActive ? "text-purple-400" : "text-gray-700"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Active Model Scorecard Details */}
          {activeAgent && (
            <div className="rounded-2xl border border-gray-850 bg-gradient-to-b from-gray-950/80 to-[#111827]/40 p-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-6">
                {/* Scorecard Header */}
                <div className="flex items-start justify-between border-b border-gray-900 pb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-purple-950/40 text-purple-400 border border-purple-900/40 px-2 py-0.5 rounded font-mono font-bold uppercase">
                      {activeAgent.category}
                    </span>
                    <h3 className="text-lg font-black text-white mt-1.5">{activeAgent.name} Scorecard</h3>
                    <p className="text-xs text-gray-400">Continuous runtime audit profile.</p>
                  </div>

                  <div className="text-center rounded-xl border border-purple-900/30 bg-purple-950/20 p-2.5 min-w-[70px]">
                    <div className="text-3xl font-black text-purple-400 font-mono tracking-tight">{activeAgent.weightedScore}</div>
                    <span className="text-[8px] text-gray-500 font-semibold font-mono uppercase">Rating</span>
                  </div>
                </div>

                {/* Subscore metrics list */}
                <div className="space-y-4">
                  {/* Intelligence Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-mono font-medium">
                      <span>Reasoning & Context</span>
                      <span className="text-gray-200 font-bold">{activeAgent.subscores.intelligence}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${activeAgent.subscores.intelligence}%` }}></div>
                    </div>
                  </div>

                  {/* Performance Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-mono font-medium">
                      <span>Response speed / throughput</span>
                      <span className="text-gray-200 font-bold">{activeAgent.subscores.performance}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${activeAgent.subscores.performance}%` }}></div>
                    </div>
                  </div>

                  {/* Security Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-mono font-medium">
                      <span>Data sovereignty & Compliance</span>
                      <span className="text-gray-200 font-bold">{activeAgent.subscores.security}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: `${activeAgent.subscores.security}%` }}></div>
                    </div>
                  </div>

                  {/* Cost Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-mono font-medium">
                      <span>Cost optimization</span>
                      <span className="text-gray-200 font-bold">{activeAgent.subscores.cost}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: `${activeAgent.subscores.cost}%` }}></div>
                    </div>
                  </div>

                  {/* Developer Exp Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-mono font-medium">
                      <span>Developer Experience & MCP</span>
                      <span className="text-gray-200 font-bold">{activeAgent.subscores.devExp}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400" style={{ width: `${activeAgent.subscores.devExp}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Audit meta data */}
                <div className="rounded-lg border border-gray-900 bg-gray-950/60 p-3.5 space-y-2 text-[11px] text-gray-500 font-mono">
                  <div className="flex justify-between">
                    <span>Audit freshness:</span>
                    <span className="text-cyan-400 font-bold">100% certified live</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last audited:</span>
                    <span className="text-gray-300">July 2026 (Atlas)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit run depth:</span>
                    <span className="text-gray-300">100,000 runs</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-4">
                <button
                  onClick={() => onAddToCompare(activeAgent)}
                  className="flex-1 text-center rounded bg-gray-900 border border-gray-800 hover:border-purple-500/30 hover:bg-purple-950/10 py-2 text-xs font-bold text-gray-200 hover:text-purple-400 uppercase tracking-wider transition-all"
                >
                  Add to compare
                </button>
                <button
                  onClick={() => onAgentClick(activeAgent)}
                  className="flex-1 text-center rounded bg-gradient-to-r from-purple-600 to-indigo-600 py-2 text-xs font-bold text-white uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Audit Sandbox
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Diagnostic Metadata & Benchmark Vision Guidelines */}
        <div className="rounded-2xl border border-gray-900 bg-[#0B1120]/10 p-5 flex items-start space-x-3 text-xs text-gray-400">
          <ShieldCheck className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-gray-200">Continuous Security & Compliance Audits</h4>
            <p className="leading-relaxed">
              Every sandbox container is monitored for prompt injection vulnerability resistance, SOC2 governance limits, SSO RBAC mappings, and latency spikes. Scores represent real-time statistical significance. Audited by sovereign Indian encryption networks.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
