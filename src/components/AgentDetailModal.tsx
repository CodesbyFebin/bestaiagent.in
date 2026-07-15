import React, { useState, useEffect, useRef } from "react";
import { 
  X, Sparkles, MessageSquare, ShieldCheck, Download, Calendar, ExternalLink, 
  Send, Globe, Info, Star, CreditCard, Code, RefreshCw, BarChart2 
} from "lucide-react";
import { Agent } from "../types";

interface AgentDetailModalProps {
  agent: Agent;
  onClose: () => void;
  onAddToCompare: (agent: Agent) => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  sources?: Array<{ title: string; uri: string }>;
}

export default function AgentDetailModal({ agent, onClose, onAddToCompare }: AgentDetailModalProps) {
  const [activePanel, setActivePanel] = useState<"details" | "playground">("details");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [useSearchGrounding, setUseSearchGrounding] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Initialize greeting on playground activation
  useEffect(() => {
    if (activePanel === "playground" && chatHistory.length === 0) {
      setChatHistory([
        {
          role: "assistant",
          text: `Namaste! I am the interactive sandbox container for **${agent.name}** (built by ${agent.creator}).\n\nHow can I help you explore my capabilities today? ${
            agent.isIndian ? "I specialize in Indian regional dialects and sovereign datasets! 🇮🇳" : "Feel free to test my logic, coding skill or knowledge."
          }`
        }
      ]);
    }
  }, [activePanel, agent, chatHistory]);

  // Scroll to bottom on new chats
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoadingChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoadingChat) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoadingChat(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory.map(h => ({ role: h.role, text: h.text })),
          agentSystemInstruction: agent.systemPrompt,
          useSearch: useSearchGrounding
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with agent gateway.");
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, {
        role: "assistant",
        text: data.text,
        sources: data.groundingSources
      }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, {
        role: "assistant",
        text: `⚠️ **Agent Error**: ${err.message || "Failed to fetch response. Please verify the server connection."}`
      }]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md">
      {/* Outer Card */}
      <div className="w-full max-w-5xl h-[90vh] rounded-3xl border border-gray-800 bg-[#0B1120]/90 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Glowing border strip */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500"></div>

        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-900 bg-gray-950/40 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/20 text-purple-400 border border-purple-900/20">
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-base text-white">{agent.name}</h2>
                <span className="text-[10px] text-gray-500 font-mono">by {agent.creator}</span>
              </div>
              <p className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold font-mono">
                {agent.category}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onAddToCompare(agent)}
              className="hidden sm:inline-flex rounded-full border border-gray-800 hover:border-purple-500/50 hover:bg-purple-950/15 px-4 py-1.5 text-xs font-semibold text-gray-300 hover:text-purple-300 transition-all"
            >
              Add to Compare matrix
            </button>
            <button 
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-900 hover:text-white transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection Sub-bar */}
        <div className="flex bg-gray-950/20 border-b border-gray-900 px-6 py-2 gap-4 shrink-0">
          <button
            onClick={() => setActivePanel("details")}
            className={`text-xs font-bold py-1 px-3 rounded-full transition-all ${
              activePanel === "details" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Agent Details
          </button>
          <button
            onClick={() => setActivePanel("playground")}
            className="relative text-xs font-bold py-1 px-3 rounded-full transition-all flex items-center space-x-1.5"
            style={{
              backgroundColor: activePanel === "playground" ? "#7C3AED" : "transparent",
              color: activePanel === "playground" ? "#FFF" : "#9CA3AF"
            }}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Interactive Chat Play</span>
            <span className="absolute -top-1.5 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0 bg-[#050816]/30">
          {/* DETAILS VIEW PANEL */}
          {activePanel === "details" && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left 2 Columns description & benchmarks */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Long description */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-200">About the AI Agent</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {agent.longDescription || agent.description}
                  </p>
                </div>

                {/* Capabilities list */}
                <div className="space-y-3 pt-4 border-t border-gray-900">
                  <h3 className="text-sm font-bold text-gray-200">Core Capabilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {agent.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-gray-950/60 rounded-lg p-2.5 border border-gray-900">
                        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-gray-300">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnostic Benchmarks */}
                <div className="space-y-4 pt-6 border-t border-gray-900">
                  <h3 className="text-sm font-bold text-gray-200 flex items-center space-x-2">
                    <BarChart2 className="h-4 w-4 text-purple-400" />
                    <span>AI Diagnostic Benchmarks Matrix</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Coding & Syntax Execution", val: agent.benchmarks.coding, color: "from-purple-500 to-cyan-500" },
                      { label: "Nuanced logical reasoning", val: agent.benchmarks.reasoning, color: "from-purple-500 to-indigo-500" },
                      { label: "Generation Speed & Latency", val: agent.benchmarks.speed, color: "from-cyan-400 to-blue-500" },
                      { label: "Token cost-to-performance", val: agent.benchmarks.cost, color: "from-emerald-400 to-teal-500" },
                      { label: "Security & Guardrails compliance", val: agent.benchmarks.security, color: "from-red-400 to-pink-500" },
                    ].map((bar, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-gray-400">
                          <span>{bar.label}</span>
                          <span className="text-gray-200 font-bold">{bar.val}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-900 overflow-hidden border border-gray-850">
                          <div 
                            className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                            style={{ width: `${bar.val}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Sidebar specs & metadata */}
              <div className="lg:col-span-1 space-y-6 bg-gray-950/30 rounded-2xl border border-gray-900 p-5">
                <h3 className="text-sm font-bold text-gray-200 border-b border-gray-900 pb-2">Technical Metadata</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Model version</span>
                    <span className="font-mono text-gray-200">{agent.version || "v1.0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last updated</span>
                    <span className="text-gray-200">{agent.lastUpdated || "June 2026"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pricing Model</span>
                    <span className="font-semibold text-purple-400">{agent.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Origin Region</span>
                    <span className="text-gray-200">{agent.isIndian ? "Bharat (India) 🇮🇳" : "Global Silicon Valley"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">MCP Protocol compatibility</span>
                    <span className={`font-semibold ${agent.mcpCompatible ? "text-emerald-400" : "text-gray-500"}`}>
                      {agent.mcpCompatible ? "Compatible" : "Unsupported"}
                    </span>
                  </div>
                </div>

                {/* Pricing Plans details inside details modal */}
                {agent.pricingPlans && agent.pricingPlans.length > 0 && (
                  <div className="pt-4 border-t border-gray-900 space-y-3">
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Available Plans</h4>
                    <div className="space-y-2">
                      {agent.pricingPlans.slice(0, 2).map((plan, i) => (
                        <div key={i} className="rounded-lg bg-gray-950 p-2.5 border border-gray-900 text-xs">
                          <div className="flex justify-between font-bold mb-1">
                            <span className="text-gray-200">{plan.name}</span>
                            <span className="text-purple-400">{plan.price}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 line-clamp-1">{plan.features.slice(0, 2).join(", ")}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    onClick={() => setActivePanel("playground")}
                    className="w-full text-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-bold text-white flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Launch Play sandbox</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* REAL PLAYGROUND CHAT PLAY PANEL */}
          {activePanel === "playground" && (
            <div className="h-full flex flex-col min-h-0">
              
              {/* Info alert banner */}
              <div className="rounded-lg bg-purple-950/20 border border-purple-900/30 px-3.5 py-2.5 flex items-start space-x-2.5 text-xs text-purple-300 mb-4 shrink-0">
                <Info className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-gray-200">Active server sandbox</p>
                  <p className="text-[11px] text-gray-400 leading-normal">
                    This sandbox runs real Gemini API logic fuzzed on server-side. It is loaded with **{agent.name}'s** unique operational parameters.
                  </p>
                </div>
              </div>

              {/* Chat Scroll container */}
              <div className="flex-1 overflow-y-auto border border-gray-900 rounded-2xl bg-gray-950/40 p-4 space-y-4 min-h-0 select-text pr-2">
                {chatHistory.map((chat, idx) => (
                  <div 
                    key={idx}
                    className={`flex flex-col max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                      chat.role === "user" 
                        ? "bg-purple-600 text-white self-end rounded-tr-none" 
                        : "bg-[#111827] text-gray-200 self-start rounded-tl-none border border-gray-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{chat.text}</div>
                    
                    {/* Render Citations if Google Search Grounding was active */}
                    {chat.sources && chat.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-gray-850/60 space-y-1.5 shrink-0">
                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center space-x-1">
                          <Globe className="h-3 w-3 text-cyan-400" />
                          <span>Google Search Grounded sources:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {chat.sources.map((src, sIdx) => (
                            <a 
                              key={sIdx}
                              href={src.uri}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="rounded bg-gray-950 hover:bg-gray-900 border border-gray-800 px-2 py-0.5 text-[9px] text-cyan-400 flex items-center space-x-1"
                            >
                              <span>{src.title.slice(0, 24)}...</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isLoadingChat && (
                  <div className="flex items-center space-x-2 text-xs text-gray-500 self-start bg-gray-950/40 px-3.5 py-2 border border-gray-900 rounded-full">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-purple-400" />
                    <span>Agent is thinking...</span>
                  </div>
                )}
                
                <div ref={chatBottomRef}></div>
              </div>

              {/* Chat Input & Grounding control */}
              <div className="pt-4 space-y-3 shrink-0">
                {/* Search Grounding Toggle */}
                <div className="flex items-center justify-between bg-gray-950 p-2 border border-gray-900 rounded-lg select-none text-xs">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-cyan-400" />
                    <span className="font-semibold text-gray-300">Enable Google Search Grounding</span>
                    <span className="rounded bg-cyan-500/20 px-1 py-0.5 text-[9px] font-medium text-cyan-400 uppercase tracking-widest sm:inline">
                      Live Grounding
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={useSearchGrounding} 
                      onChange={(e) => setUseSearchGrounding(e.target.checked)} 
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>

                {/* Send Message Form */}
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    disabled={isLoadingChat}
                    placeholder={`Chat with ${agent.name} sandbox container...`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 rounded-full border border-gray-800 bg-[#0B1120] px-4 py-3 text-xs sm:text-sm text-gray-300 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={isLoadingChat || !chatInput.trim()}
                    className="rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-40 p-3 text-white transition-all shadow-lg shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
