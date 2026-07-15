import React, { useState } from "react";
import { 
  Play, Pause, Plus, Trash2, ArrowRight, Settings, Info, 
  GitCommit, RefreshCw, LayoutGrid, CheckSquare, Sparkles, Copy, 
  Code, Save, Database, Download, Upload, CopyCheck, ToggleLeft, HelpCircle
} from "lucide-react";
import { AGENTS } from "../data";

interface WorkflowNode {
  id: string;
  type: "trigger" | "ai" | "prompt" | "logic" | "external";
  title: string;
  sub: string;
  config: Record<string, string>;
}

// 5 Curated templates inside Volume 3
const TEMPLATES = [
  {
    name: "Sovereign Blog Generation",
    desc: "Generate local SEO content pipeline in 22+ languages automatically.",
    nodes: [
      { id: "1", type: "trigger", title: "Schedule Trigger", sub: "Every Monday 9AM", config: { interval: "Weekly", time: "09:00" } },
      { id: "2", type: "prompt", title: "Topic Context Prompt", sub: "Load trending topics", config: { variables: "niche=AI, region=India", template: "Research top 5 trending AI innovations in India." } },
      { id: "3", type: "ai", title: "Krutrim Pro Agent", sub: "Deep local translation", config: { agent: "krutrim", task: "Generate article and translate to Hindi and Tamil" } },
      { id: "4", type: "external", title: "Slack Publisher", sub: "Push draft to content channel", config: { channel: "#marketing-drafts", format: "Markdown" } }
    ]
  },
  {
    name: "Automated API PR Reviewer",
    desc: "QA code analyzer reviews PR changes and triggers CI/CD test suites.",
    nodes: [
      { id: "1", type: "trigger", title: "GitHub Webhook", sub: "On Pull Request opened", config: { event: "PR_Opened", branch: "main" } },
      { id: "2", type: "ai", title: "KushoAI QA Agent", sub: "Scan API parameters", config: { agent: "kusho", task: "Auto-scan changed routers and run fuzzing audits" } },
      { id: "3", type: "logic", title: "If/Else Security Gate", sub: "Evaluate vulnerabilities", config: { condition: "Vulnerabilities > 0" } },
      { id: "4", type: "external", title: "Notion Log Update", sub: "Record test suite logs", config: { database: "Security Audits", status: "Auto-Logged" } }
    ]
  },
  {
    name: "Customer Support Smart Router",
    desc: "Categorize incoming multi-lingual tickets and route to correct support channels.",
    nodes: [
      { id: "1", type: "trigger", title: "Email Webhook", sub: "On support email received", config: { trigger: "Inbox listener", address: "support@bestaiagent.in" } },
      { id: "2", type: "ai", title: "Bhashini Translation", sub: "Translate vernacular ticket", config: { agent: "bhashini", source: "Detect auto", target: "English" } },
      { id: "3", type: "logic", title: "Category Classifier", sub: "Evaluate sentiment and intent", config: { classes: "Billing, Bug, Custom" } },
      { id: "4", type: "external", title: "Discord Dispatcher", sub: "Ping correct staff tier", config: { webhook: "Discord API", channel: "Level 2 Support" } }
    ]
  }
];

export default function WorkflowOsView() {
  const [activeNodes, setActiveNodes] = useState<WorkflowNode[]>([
    { id: "1", type: "trigger", title: "Daily Cron Job", sub: "Trigger at 08:00 UTC", config: { schedule: "0 8 * * *", timezone: "IST (UTC+5:30)" } },
    { id: "2", type: "prompt", title: "Custom Prompt Node", sub: "Verify legal standards", config: { variables: "name, amount", template: "Draft fuzzed customer summary for {{name}} with value ₹{{amount}}" } },
    { id: "3", type: "ai", title: "Sarvam Speech Sandbox", sub: "Synthesize voice alert", config: { agent: "sarvam", output: "Hindi Voice Call" } },
    { id: "4", type: "external", title: "Discord Notification", sub: "Ping operational dashboard", config: { webhookUrl: "https://discord.com/api/webhooks/9928" } }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("1");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationIndex, setSimulationIndex] = useState<number | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [clonedSuccess, setClonedSuccess] = useState(false);

  // Connection trail logic
  const handleAddNode = (type: WorkflowNode["type"]) => {
    let title = "Custom Node";
    let sub = "Configure properties";
    let config = {};

    if (type === "trigger") {
      title = "Manual Trigger";
      sub = "Trigger on-click";
      config = { triggerSource: "Manual Console Dashboard" };
    } else if (type === "ai") {
      title = "Krutrim LLM Node";
      sub = "Model inference engine";
      config = { agentId: "krutrim", modelMode: "Pro Full" };
    } else if (type === "prompt") {
      title = "Prompt Template";
      sub = "Format input variables";
      config = { variables: "input", text: "Summarize this article: {{input}}" };
    } else if (type === "logic") {
      title = "If/Else Condition";
      sub = "Evaluate boolean criteria";
      config = { valueA: "status", operator: "equals", valueB: "200" };
    } else if (type === "external") {
      title = "Slack Webhook Link";
      sub = "Emit JSON payload";
      config = { webhook: "https://hooks.slack.com/services/123", format: "Markdown Text" };
    }

    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type,
      title,
      sub,
      config
    };

    setActiveNodes([...activeNodes, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const handleDeleteNode = (id: string) => {
    setActiveNodes(activeNodes.filter(n => n.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const handleUpdateConfig = (nodeId: string, key: string, val: string) => {
    setActiveNodes(activeNodes.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          config: {
            ...n.config,
            [key]: val
          }
        };
      }
      return n;
    }));
  };

  const handleUpdateNodeHeader = (nodeId: string, title: string, sub: string) => {
    setActiveNodes(activeNodes.map(n => {
      if (n.id === nodeId) {
        return { ...n, title, sub };
      }
      return n;
    }));
  };

  // Run visual debug trail
  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationIndex(0);
    setSimulationLogs(["🚀 Visual Simulation Started. Handshaking with cluster nodes..."]);

    let current = 0;
    const interval = setInterval(() => {
      if (current >= activeNodes.length - 1) {
        clearInterval(interval);
        setSimulationLogs(prev => [
          ...prev, 
          `✨ [Workflow OS] Success! Sequence executed completed successfully in 2.45s.`,
          `📦 Compiled output JSON: { "statusCode": 200, "agentHistoryMerged": true, "auditLogRegistered": true }`
        ]);
        setIsSimulating(false);
        setSimulationIndex(null);
      } else {
        current += 1;
        setSimulationIndex(current);
        const node = activeNodes[current];
        setSimulationLogs(prev => [
          ...prev, 
          `⚡ Executing node [${node.title}] (${node.type.toUpperCase()})...`,
          `⚙️ Config parsed successfully: ${JSON.stringify(node.config)}`
        ]);
      }
    }, 1500);
  };

  const handleLoadTemplate = (t: typeof TEMPLATES[0]) => {
    const formatted = t.nodes.map(n => ({
      ...n,
      id: `${n.id}-${Date.now()}`
    }));
    setActiveNodes(formatted);
    setSelectedNodeId(formatted[0].id);
    setClonedSuccess(true);
    setTimeout(() => setClonedSuccess(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeNodes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "bestaiagent_workflow_blueprint.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const selectedNode = activeNodes.find(n => n.id === selectedNodeId);

  return (
    <div className="bg-[#050816] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Visual Hero Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1.5 text-xs text-purple-400">
            <LayoutGrid className="h-3.5 w-3.5 text-purple-400" />
            <span>Volume 3: Visual Workflow Orchestration Suite</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            AI <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Workflow OS</span> Builder
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Compose fuzzed AI-powered workflows visually without code. Combine triggers, prompt templates, logical branches, and fuzzed sandbox environments in one sovereign automation loop.
          </p>
        </div>

        {/* Templates library segment */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Curated Templates Library</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEMPLATES.map((t, index) => (
              <div 
                key={index}
                className="rounded-xl border border-gray-900 bg-gray-950/40 p-4 hover:border-purple-500/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-gray-100 flex items-center space-x-1">
                    <Sparkles className="h-3 w-3 text-purple-400" />
                    <span>{t.name}</span>
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-normal">{t.desc}</p>
                </div>
                <button
                  onClick={() => handleLoadTemplate(t)}
                  className="mt-4 text-center rounded border border-gray-850 hover:border-cyan-500/30 bg-gray-900/30 text-[10px] py-1.5 hover:text-cyan-400 font-mono transition-all font-bold uppercase tracking-wider"
                >
                  Clone Blueprint
                </button>
              </div>
            ))}
          </div>
          {clonedSuccess && (
            <p className="text-[10px] text-emerald-400 font-mono italic animate-pulse">✓ Blueprint loaded into active editor canvas.</p>
          )}
        </div>

        {/* Master drag-and-drop workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Node Palette (Left Rail) */}
          <div className="rounded-2xl border border-gray-850 bg-gray-950/40 p-5 space-y-5 lg:col-span-1">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider font-mono">Palette Blocks</h3>
              <p className="text-[10px] text-gray-500">Click a node type to append to your active sequence chain.</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => handleAddNode("trigger")}
                className="rounded-xl border border-orange-950/50 bg-orange-950/15 p-3 text-left hover:border-orange-500/30 transition-all group flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-orange-400 font-bold uppercase tracking-widest block">Trigger</span>
                  <span className="text-xs font-extrabold text-gray-300">Cron, webhook or manual</span>
                </div>
                <Plus className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform" />
              </button>

              <button 
                onClick={() => handleAddNode("prompt")}
                className="rounded-xl border border-blue-950/50 bg-blue-950/15 p-3 text-left hover:border-blue-500/30 transition-all group flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-blue-400 font-bold uppercase tracking-widest block">Prompt</span>
                  <span className="text-xs font-extrabold text-gray-300">Dynamic system context</span>
                </div>
                <Plus className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </button>

              <button 
                onClick={() => handleAddNode("ai")}
                className="rounded-xl border border-purple-950/50 bg-purple-950/15 p-3 text-left hover:border-purple-500/30 transition-all group flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-widest block">AI Inference</span>
                  <span className="text-xs font-extrabold text-gray-300">Run sandbox models</span>
                </div>
                <Plus className="h-4 w-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </button>

              <button 
                onClick={() => handleAddNode("logic")}
                className="rounded-xl border border-cyan-950/50 bg-cyan-950/15 p-3 text-left hover:border-cyan-500/30 transition-all group flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">Condition</span>
                  <span className="text-xs font-extrabold text-gray-300">If/else & Loop filters</span>
                </div>
                <Plus className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </button>

              <button 
                onClick={() => handleAddNode("external")}
                className="rounded-xl border border-emerald-950/50 bg-emerald-950/15 p-3 text-left hover:border-emerald-500/30 transition-all group flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">External webhook</span>
                  <span className="text-xs font-extrabold text-gray-300">Emit Slack, Discord, mail</span>
                </div>
                <Plus className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Connected Canvas Editor (Center, spans 2 columns) */}
          <div className="rounded-2xl border border-gray-850 bg-[#0B1120]/15 p-6 lg:col-span-2 space-y-6 flex flex-col justify-between min-h-[500px]">
            <div className="flex items-center justify-between border-b border-gray-900 pb-3">
              <div className="flex items-center space-x-2">
                <LayoutGrid className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-200">Active Workflow Canvas</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportJson}
                  className="rounded bg-gray-900 hover:bg-gray-850 border border-gray-800 px-2.5 py-1 text-[10px] text-gray-400 flex items-center space-x-1"
                >
                  <Download className="h-3 w-3" />
                  <span>Export JSON</span>
                </button>
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="rounded bg-gradient-to-r from-emerald-600 to-teal-500 px-3.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg flex items-center space-x-1 disabled:opacity-50"
                >
                  <Play className="h-3 w-3 text-white" />
                  <span>{isSimulating ? "Debugging..." : "Test Flow"}</span>
                </button>
              </div>
            </div>

            {/* Nodes Stack */}
            <div className="flex-1 overflow-y-auto max-h-[380px] space-y-4 py-2 pr-1 scrollbar-thin">
              {activeNodes.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-900 rounded-xl space-y-1">
                  <Info className="h-6 w-6 text-gray-700 mx-auto" />
                  <p className="text-gray-500 text-xs italic">Canvas is empty. Click left blocks to populate nodes.</p>
                </div>
              ) : (
                activeNodes.map((node, index) => {
                  const isSelected = node.id === selectedNodeId;
                  const isSimulatingActive = index === simulationIndex;

                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      <div 
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`w-full rounded-xl border p-3.5 cursor-pointer flex items-center justify-between transition-all duration-300 relative ${
                          isSelected 
                            ? "border-purple-500 bg-[#111827]" 
                            : isSimulatingActive
                            ? "border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "border-gray-900 bg-gray-950/40 hover:border-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                            node.type === "trigger" ? "bg-orange-950/50 text-orange-400" :
                            node.type === "prompt" ? "bg-blue-950/50 text-blue-400" :
                            node.type === "ai" ? "bg-purple-950/50 text-purple-400" :
                            node.type === "logic" ? "bg-cyan-950/50 text-cyan-400" :
                            "bg-emerald-950/50 text-emerald-400"
                          }`}>
                            {node.type[0].toUpperCase()}
                          </div>

                          <div>
                            <h4 className="text-xs font-extrabold text-gray-200">{node.title}</h4>
                            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{node.sub}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {isSimulatingActive && (
                            <span className="flex h-2.5 w-2.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNode(node.id);
                            }}
                            className="text-gray-600 hover:text-red-400 p-1.5 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Connector Line Arrow */}
                      {index < activeNodes.length - 1 && (
                        <div className="flex justify-center my-1.5">
                          <ArrowRight className="h-4 w-4 text-gray-700 rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Live rolling simulation console */}
            {simulationLogs.length > 0 && (
              <div className="rounded-lg border border-gray-900 bg-gray-950 p-4 font-mono text-[10px] space-y-1 max-h-[140px] overflow-y-auto">
                <div className="text-[9px] text-gray-500 border-b border-gray-900 pb-1 flex justify-between font-bold uppercase tracking-wider">
                  <span>Execution logs</span>
                  <span className="text-emerald-500">Live Staged</span>
                </div>
                {simulationLogs.map((log, idx) => (
                  <div key={idx} className={log.includes("Success") ? "text-emerald-400" : "text-gray-400"}>{log}</div>
                ))}
              </div>
            )}
          </div>

          {/* Node Parameter Editor (Right Rail) */}
          <div className="rounded-2xl border border-gray-850 bg-gray-950/40 p-5 lg:col-span-1">
            <div className="space-y-1 mb-4 border-b border-gray-900 pb-3">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider font-mono flex items-center space-x-1">
                <Settings className="h-3.5 w-3.5 text-cyan-400" />
                <span>Node Configurator</span>
              </h3>
              <p className="text-[10px] text-gray-500">Inspect and adjust parameters of the selected canvas element.</p>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-gray-500 font-semibold uppercase">Node Label Title</label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={(e) => handleUpdateNodeHeader(selectedNode.id, e.target.value, selectedNode.sub)}
                    className="w-full rounded border border-gray-800 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] text-gray-500 font-semibold uppercase">Sub-label description</label>
                  <input
                    type="text"
                    value={selectedNode.sub}
                    onChange={(e) => handleUpdateNodeHeader(selectedNode.id, selectedNode.title, e.target.value)}
                    className="w-full rounded border border-gray-800 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-900">
                  <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">Parameters Dictionary</h4>
                  
                  {Object.keys(selectedNode.config).length === 0 ? (
                    <p className="text-[10px] text-gray-500 italic">No customizable parameters configured for this block type.</p>
                  ) : (
                    Object.entries(selectedNode.config).map(([key, value]) => (
                      <div key={key} className="space-y-1.5">
                        <label className="block text-[10px] text-gray-500 font-mono font-medium">{key}</label>
                        {key === "template" || key === "task" ? (
                          <textarea
                            rows={4}
                            value={value}
                            onChange={(e) => handleUpdateConfig(selectedNode.id, key, e.target.value)}
                            className="w-full rounded border border-gray-800 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 focus:border-purple-500 focus:outline-none resize-none font-mono"
                          />
                        ) : (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleUpdateConfig(selectedNode.id, key, e.target.value)}
                            className="w-full rounded border border-gray-800 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-300 focus:border-purple-500 focus:outline-none font-mono"
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600 text-xs italic">
                Select any block on the central canvas to edit its variables.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
