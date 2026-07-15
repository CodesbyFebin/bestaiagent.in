import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DiscoverView from "./components/DiscoverView";
import BuiltInIndiaView from "./components/BuiltInIndiaView";
import BenchmarkEngineView from "./components/BenchmarkEngineView";
import WorkflowOsView from "./components/WorkflowOsView";
import CompareView from "./components/CompareView";
import DashboardView from "./components/DashboardView";
import AgentDetailModal from "./components/AgentDetailModal";
import RichResourceView from "./components/RichResourceView";
import { Agent } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [comparedAgents, setComparedAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Track current URL path to support 150+ indexed paths cleanly
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    const formattedPath = path.startsWith("/") ? path : `/${path}`;
    window.history.pushState(null, "", formattedPath);
    setCurrentPath(formattedPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add agent to compare list (max 4)
  const handleAddToCompare = (agent: Agent) => {
    if (comparedAgents.some((a) => a.id === agent.id)) {
      alert(`${agent.name} is already in the comparison matrix.`);
      return;
    }
    if (comparedAgents.length >= 4) {
      alert("You can compare up to 4 agents side-by-side.");
      return;
    }
    setComparedAgents([...comparedAgents, agent]);
  };

  const handleRemoveFromCompare = (agent: Agent) => {
    setComparedAgents(comparedAgents.filter((a) => a.id !== agent.id));
  };

  const handleClearCompare = () => {
    setComparedAgents([]);
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const isHomePath = currentPath === "/" || currentPath === "/index.html" || currentPath === "";

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-purple-600/30 selection:text-white">
      {/* Navigation Header */}
      <Header
        activeTab={isHomePath ? activeTab : ""}
        setActiveTab={(tab) => {
          // If on a sub-page, reset to home path and show corresponding tab
          if (!isHomePath) {
            window.history.pushState(null, "", "/");
            setCurrentPath("/");
          }
          setActiveTab(tab);
          // Auto scroll to top on tab change
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        openCompare={() => {
          if (!isHomePath) {
            window.history.pushState(null, "", "/");
            setCurrentPath("/");
          }
          setActiveTab("compare");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Main Content Pages Render */}
      <main className="flex-1">
        {isHomePath ? (
          <>
            {activeTab === "discover" && (
              <DiscoverView
                onAgentClick={handleAgentClick}
                onAddToCompare={handleAddToCompare}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onNavigate={handleNavigate}
              />
            )}

            {activeTab === "benchmarks" && (
              <BenchmarkEngineView
                onAgentClick={handleAgentClick}
                onAddToCompare={handleAddToCompare}
              />
            )}

            {activeTab === "workflow-os" && (
              <WorkflowOsView />
            )}

            {activeTab === "compare" && (
              <CompareView
                comparedAgents={comparedAgents}
                onRemove={handleRemoveFromCompare}
                onClear={handleClearCompare}
                onAgentClick={handleAgentClick}
              />
            )}

            {activeTab === "built-in-india" && (
              <BuiltInIndiaView
                onAgentClick={handleAgentClick}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "dashboard" && (
              <DashboardView />
            )}
          </>
        ) : (
          <RichResourceView
            currentPath={currentPath}
            onNavigate={handleNavigate}
            onAgentClick={(agentId) => {
              // Highlight selected agent if clicked inside the resources view
              const matchedAgent = [
                { id: "krutrim", name: "Krutrim" },
                { id: "sarvam", name: "Sarvam AI" },
                { id: "bhashini", name: "Bhashini AI" },
                { id: "kusho", name: "KushoAI" },
                { id: "chatgpt", name: "ChatGPT" }
              ].find(a => a.id === agentId);
              if (matchedAgent) {
                // If it exists as an object, open it
                setSelectedAgent(matchedAgent as any);
              }
            }}
          />
        )}
      </main>

      {/* Master Detail Overlay Modal & Playground */}
      {selectedAgent && (
        <AgentDetailModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onAddToCompare={handleAddToCompare}
        />
      )}

      {/* Sovereign footer strip */}
      <footer className="border-t border-gray-900 bg-gray-950/20 py-8 text-center text-xs text-gray-500 font-mono shrink-0 select-none">
        <p>© 2026 BestAIAgent.in. All Rights Reserved.</p>
        <p className="mt-1.5 text-gray-600">
          Built in India with pride for sovereign global AI orchestration 🇮🇳
        </p>
      </footer>
    </div>
  );
}
