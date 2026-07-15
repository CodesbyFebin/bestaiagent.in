import React, { useState } from "react";
import { 
  X, Sparkles, AlertCircle, BarChart2, ShieldCheck, Scale, Compass, 
  HelpCircle, DollarSign, Calculator, ChevronUp, ChevronDown, CheckCircle2 
} from "lucide-react";
import { Agent } from "../types";

interface CompareViewProps {
  comparedAgents: Agent[];
  onRemove: (agent: Agent) => void;
  onClear: () => void;
  onAgentClick: (agent: Agent) => void;
}

export default function CompareView({ comparedAgents, onRemove, onClear, onAgentClick }: CompareViewProps) {
  // Volume 4 Cost Simulator inputs
  const [requestsPerMonth, setRequestsPerMonth] = useState(50000);
  const [inputTokensPerReq, setInputTokensPerReq] = useState(1500);
  const [outputTokensPerReq, setOutputTokensPerReq] = useState(500);
  const [summaryBarOpen, setSummaryBarOpen] = useState(true);

  // Currency exchange rate (USD to INR proxy)
  const USD_TO_INR = 83;

  if (comparedAgents.length === 0) {
    return (
      <div className="bg-[#050816] text-white py-16 px-4 text-center">
        <div className="mx-auto max-w-md border border-dashed border-gray-800 rounded-2xl p-8 space-y-4">
          <AlertCircle className="h-10 w-10 text-purple-400 mx-auto animate-bounce" />
          <h3 className="font-bold text-sm text-gray-200">Compare Matrix is Empty</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Navigate to the AI Agent Directory or any featured categories, and click **"Compare"** on agent cards to evaluate them side-by-side here.
          </p>
        </div>
      </div>
    );
  }

  // Cost simulator formula logic
  const calculateMonthlyCost = (agent: Agent): { cost: number; label: string; formula: string } => {
    const totalTokensInK = (requestsPerMonth * (inputTokensPerReq + outputTokensPerReq)) / 1000;
    
    // Custom formulas based on actual pricing from src/data.ts
    switch (agent.id) {
      case "krutrim":
        // Base is ₹499/mo for 10M tokens. Overages at ₹0.05 / 1K tokens.
        const totalTokens = requestsPerMonth * (inputTokensPerReq + outputTokensPerReq);
        if (totalTokens <= 10000000) {
          return { cost: 499, label: "₹499/mo (Pro Dev Cap)", formula: "Included in 10M token limit" };
        } else {
          const overageK = (totalTokens - 10000000) / 1000;
          const overageCost = overageK * 0.05;
          return { cost: Math.round(499 + overageCost), label: `₹${Math.round(499 + overageCost)}/mo`, formula: "₹499 base + ₹0.05/1K excess tokens" };
        }
      case "sarvam":
        // Pay-as-you-go starting at ₹0.08 / 1K tokens
        const sarvamCost = totalTokensInK * 0.08;
        return { cost: Math.round(sarvamCost), label: `₹${Math.round(sarvamCost)}/mo`, formula: "₹0.08 / 1K tokens pay-as-you-go" };
      case "bhashini":
        return { cost: 0, label: "₹0 (100% Free)", formula: "Sovereign government funded public access" };
      case "kusho":
        // Unlimited testing at flat ₹1,299/mo
        return { cost: 1299, label: "₹1,299/mo (Flat)", formula: "Unlimited background QA test suites" };
      case "chatgpt":
        // $20/mo Plus or API rates ($2.50/1M input, $10/1M output)
        const chatGptInputM = (requestsPerMonth * inputTokensPerReq) / 1000000;
        const chatGptOutputM = (requestsPerMonth * outputTokensPerReq) / 1000000;
        const chatGptApiCostUsd = (chatGptInputM * 2.50) + (chatGptOutputM * 10.00);
        const chatGptInr = chatGptApiCostUsd * USD_TO_INR;
        return { cost: Math.round(chatGptInr), label: `₹${Math.round(chatGptInr)}/mo`, formula: "API: $2.50/M input + $10/M output" };
      case "claude":
        // API rates ($3.00/1M input, $15/1M output)
        const claudeInputM = (requestsPerMonth * inputTokensPerReq) / 1000000;
        const claudeOutputM = (requestsPerMonth * outputTokensPerReq) / 1000000;
        const claudeApiCostUsd = (claudeInputM * 3.00) + (claudeOutputM * 15.00);
        const claudeInr = claudeApiCostUsd * USD_TO_INR;
        return { cost: Math.round(claudeInr), label: `₹${Math.round(claudeInr)}/mo`, formula: "API: $3.00/M input + $15/M output" };
      case "perplexity":
        // Flat $20/mo Pro
        return { cost: Math.round(20 * USD_TO_INR), label: `₹${Math.round(20 * USD_TO_INR)}/mo`, formula: "Flat $20/month (~₹1,660) Pro subscription" };
      case "midjourney":
        // Basic plan at $10/mo
        return { cost: Math.round(10 * USD_TO_INR), label: `₹${Math.round(10 * USD_TO_INR)}/mo`, formula: "Starts at $10/mo subscription" };
      case "wizklub":
        // Flat ₹699/mo study track
        return { cost: 699, label: "₹699/mo (Flat)", formula: "Unlimited adaptive study pathways" };
      default:
        // Fallback generic calculation
        const fallbackCost = totalTokensInK * 0.12;
        return { cost: Math.round(fallbackCost), label: `₹${Math.round(fallbackCost)}/mo`, formula: "Standard estimated API tier" };
    }
  };

  // Find most economical agent (excluding 100% free Bhashini for fairer comparison)
  const paidAgentsCosts = comparedAgents.map(a => ({ agent: a, ...calculateMonthlyCost(a) })).filter(x => x.cost > 0);
  const mostEconomical = paidAgentsCosts.length > 0 ? paidAgentsCosts.reduce((prev, curr) => prev.cost < curr.cost ? prev : curr) : null;

  return (
    <div className="bg-[#050816] text-white px-4 py-12 sm:px-6 lg:px-8 space-y-12 pb-32">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header bar */}
        <div className="flex justify-between items-center border-b border-gray-900 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Scale className="h-5 w-5 text-purple-400" />
              <span>Volume 4 — AI Comparison Intelligence Engine</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Side-by-side capability heatmaps, latency benchmarks, and active billing simulators.</p>
          </div>
          <button 
            onClick={onClear}
            className="text-xs text-red-400 border border-red-950/40 bg-red-950/10 hover:bg-red-950/20 px-3.5 py-1.5 rounded-full transition-all"
          >
            Clear matrix
          </button>
        </div>

        {/* SECTION 1: API Cost Simulation Calculator */}
        <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-r from-purple-950/10 via-gray-950/50 to-cyan-950/10 p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-900 pb-3">
            <Calculator className="h-5 w-5 text-purple-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono">Dynamic Multi-Agent Cost Simulator</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sliders panel */}
            <div className="space-y-5 lg:col-span-1 border-r border-gray-900 pr-0 lg:pr-6">
              {/* Requests per month */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Requests / Month:</span>
                  <span className="text-purple-400 font-bold">{requestsPerMonth.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="1000"
                  max="500000"
                  step="5000"
                  value={requestsPerMonth}
                  onChange={(e) => setRequestsPerMonth(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[9px] text-gray-600 font-mono">
                  <span>1K</span>
                  <span>250K</span>
                  <span>500K</span>
                </div>
              </div>

              {/* Input Tokens */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Input Tokens / Request:</span>
                  <span className="text-cyan-400 font-bold">{inputTokensPerReq.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="100"
                  max="15000"
                  step="100"
                  value={inputTokensPerReq}
                  onChange={(e) => setInputTokensPerReq(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[9px] text-gray-600 font-mono">
                  <span>100 tkn</span>
                  <span>7.5K tkn</span>
                  <span>15K tkn</span>
                </div>
              </div>

              {/* Output Tokens */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Output Tokens / Request:</span>
                  <span className="text-emerald-400 font-bold">{outputTokensPerReq.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="50"
                  max="4000"
                  step="50"
                  value={outputTokensPerReq}
                  onChange={(e) => setOutputTokensPerReq(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[9px] text-gray-600 font-mono">
                  <span>50 tkn</span>
                  <span>2K tkn</span>
                  <span>4K tkn</span>
                </div>
              </div>
            </div>

            {/* Simulated costs output comparison bar graph */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-mono text-gray-400 font-bold uppercase tracking-widest">Estimated Monthly API Bill comparison</h4>
              
              <div className="space-y-3.5 max-h-[190px] overflow-y-auto pr-2 scrollbar-thin">
                {comparedAgents.map((agent) => {
                  const { cost, label, formula } = calculateMonthlyCost(agent);
                  // Scale width percentage relative to max cost in the compared list
                  const maxCostInList = Math.max(...comparedAgents.map(a => calculateMonthlyCost(a).cost), 1);
                  const barWidthPercent = Math.max((cost / maxCostInList) * 100, 3);

                  return (
                    <div key={agent.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-extrabold text-gray-200">{agent.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-gray-400 text-[10px] italic">{formula}</span>
                          <span className="font-mono font-bold text-cyan-400">{label}</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-gray-950 rounded border border-gray-900 overflow-hidden flex">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 rounded transition-all duration-300"
                          style={{ width: `${barWidthPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Dynamic Comparison Grid Table */}
        <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-[#0B1120]/10 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-900 bg-gray-950/40 text-xs font-semibold text-gray-400">
                <th className="p-4 w-48 font-bold uppercase tracking-wider">Features Parameters</th>
                {comparedAgents.map((agent) => (
                  <th key={agent.id} className="p-4 relative min-w-[200px] border-l border-gray-900">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-purple-950/40 text-purple-400 border border-purple-900/40 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                          {agent.category}
                        </span>
                        <h3 className="font-extrabold text-sm text-white group-hover:text-purple-400 mt-1">{agent.name}</h3>
                        <p className="text-[10px] text-gray-500">by {agent.creator}</p>
                      </div>
                      <button 
                        onClick={() => onRemove(agent)}
                        className="rounded-full bg-gray-900 hover:bg-red-950/40 border border-gray-800 p-1 text-gray-400 hover:text-red-400 transition-all absolute top-2 right-2"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-xs text-gray-300 divide-y divide-gray-900">
              
              {/* Pricing row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400">Billing Structure</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <span className="rounded bg-purple-950/30 px-2.5 py-0.5 text-[10px] font-bold text-purple-400 uppercase tracking-widest border border-purple-900/20 font-mono">
                      {agent.price}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Logical Reasoning benchmarks row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400 flex items-center space-x-1.5">
                  <BarChart2 className="h-4 w-4 text-purple-400" />
                  <span>Logical Reasoning</span>
                </td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-850">
                        <div className="h-full bg-purple-500" style={{ width: `${agent.benchmarks.reasoning}%` }}></div>
                      </div>
                      <span className="font-mono text-gray-200 font-bold">{agent.benchmarks.reasoning}%</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Code execution benchmarks row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400">Coding Execution</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-850">
                        <div className="h-full bg-cyan-400" style={{ width: `${agent.benchmarks.coding}%` }}></div>
                      </div>
                      <span className="font-mono text-gray-200 font-bold">{agent.benchmarks.coding}%</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Latency Speed row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400">Latency & Speed</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-850">
                        <div className="h-full bg-emerald-400" style={{ width: `${agent.benchmarks.speed}%` }}></div>
                      </div>
                      <span className="font-mono text-gray-200 font-bold">{agent.benchmarks.speed}%</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Origin Region row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400">Sovereign Origin</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <span className="text-gray-200">
                      {agent.isIndian ? "Bharat (India) 🇮🇳" : "Global Silicon Valley"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* MCP compatibility row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400">MCP Protocol</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <span className={`font-semibold ${agent.mcpCompatible ? "text-emerald-400" : "text-gray-500"}`}>
                      {agent.mcpCompatible ? "Fully Compatible" : "Unsupported"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Ratings row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400">User Satisfaction</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <div className="flex items-center space-x-1.5 font-mono">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-200 font-semibold">{agent.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Capabilities row */}
              <tr className="hover:bg-gray-900/10 transition-colors">
                <td className="p-4 font-bold text-gray-400">Primary Capability</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <span className="text-gray-400 leading-normal line-clamp-2">
                      {agent.capabilities[0] || "General purpose logic reasoning"}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Action trigger row */}
              <tr>
                <td className="p-4 font-bold text-gray-400">Launch Sandbox</td>
                {comparedAgents.map((agent) => (
                  <td key={agent.id} className="p-4 border-l border-gray-900">
                    <button 
                      onClick={() => onAgentClick(agent)}
                      className="w-full text-center rounded bg-purple-600 hover:bg-purple-500 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md transition-all hover:scale-[1.02]"
                    >
                      Open Playground
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Matrix comparison guidelines */}
        <div className="rounded-xl border border-gray-800 bg-gray-950/40 p-5 flex items-start space-x-3 text-xs text-gray-400">
          <ShieldCheck className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-gray-200">About BestAIAgent Benchmarks</h4>
            <p className="leading-relaxed">
              These diagnostic tests are audited periodically inside our secure staging clusters. Standard latency, logical reasoning and cost metrics are compiled from 100,000+ client fuzz runs. Always ensure that the selected models matches your system's resource boundaries.
            </p>
          </div>
        </div>

      </div>

      {/* FLOATING TOGGLEABLE COST SUMMARY BAR */}
      {summaryBarOpen ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-purple-500/20 bg-gray-950/90 backdrop-blur-md px-6 py-4 shadow-[0_-5px_25px_rgba(124,58,237,0.15)] transition-all">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-purple-950/50 flex items-center justify-center border border-purple-500/20">
                <Calculator className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-200 font-mono uppercase tracking-wide">Comparison Spend Intelligence</h4>
                <p className="text-[11px] text-gray-400">
                  Estimating for <strong className="text-cyan-400 font-mono">{requestsPerMonth.toLocaleString()}</strong> requests/mo at <strong className="text-emerald-400 font-mono">{(inputTokensPerReq + outputTokensPerReq).toLocaleString()}</strong> combined tokens.
                </p>
              </div>
            </div>

            {/* Economy recommendation & actions */}
            <div className="flex flex-wrap items-center gap-4">
              {mostEconomical && (
                <div className="rounded bg-emerald-950/30 border border-emerald-900/30 px-3.5 py-1.5 text-xs text-emerald-400 flex items-center space-x-1.5 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Sovereign Value Choice: <strong>{mostEconomical.agent.name}</strong> ({mostEconomical.label})</span>
                </div>
              )}

              <button 
                onClick={() => setSummaryBarOpen(false)}
                className="rounded-full bg-gray-900 border border-gray-800 p-1.5 text-gray-400 hover:text-white transition-all"
                title="Collapse bar"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setSummaryBarOpen(true)}
          className="fixed bottom-4 right-4 z-40 rounded-full border border-purple-500/30 bg-purple-600 hover:bg-purple-500 text-white p-3 shadow-lg flex items-center space-x-1.5 transition-all hover:scale-105"
        >
          <Calculator className="h-4 w-4" />
          <span className="text-xs font-bold font-mono">Spend Radar</span>
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      )}

    </div>
  );
}
