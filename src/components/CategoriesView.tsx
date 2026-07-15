import { useState } from "react";
import { 
  Search, SlidersHorizontal, CheckSquare, Sparkles, ArrowRight, ArrowLeft, 
  Lightbulb, Check, ChevronRight, HelpCircle 
} from "lucide-react";
import { CATEGORIES, AGENTS } from "../data";
import { Agent, Category } from "../types";
import DynamicIcon from "./DynamicIcon";

interface CategoriesViewProps {
  onAgentClick: (agent: Agent) => void;
  setActiveTab: (tab: string) => void;
}

export default function CategoriesView({ onAgentClick, setActiveTab }: CategoriesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  // Recommendation questionnaire state
  const [showRecommender, setShowRecommender] = useState(false);
  const [recStep, setRecStep] = useState(1);
  const [recGoal, setRecGoal] = useState("");
  const [recLanguage, setRecLanguage] = useState("");
  const [recBudget, setRecBudget] = useState("");
  const [recommendedAgents, setRecommendedAgents] = useState<Agent[]>([]);

  // Toggle Filters
  const handlePricingToggle = (type: string) => {
    if (selectedPricing.includes(type)) {
      setSelectedPricing(selectedPricing.filter(x => x !== type));
    } else {
      setSelectedPricing([...selectedPricing, type]);
    }
  };

  const handleRegionToggle = (region: string) => {
    if (selectedRegion.includes(region)) {
      setSelectedRegion(selectedRegion.filter(x => x !== region));
    } else {
      setSelectedRegion([...selectedRegion, region]);
    }
  };

  // Recommendation engine logic
  const handleNextStep = () => {
    if (recStep === 3) {
      // Calculate recommendations from real agents database
      let matches = AGENTS;

      if (recGoal === "coding") {
        matches = matches.filter(a => a.category === "Coding" || a.tags.includes("Coding") || a.tags.includes("Code"));
      } else if (recGoal === "multilingual") {
        matches = matches.filter(a => a.isIndian || a.tags.includes("Multilingual"));
      } else if (recGoal === "general") {
        matches = matches.filter(a => a.category === "Productivity" || a.tags.includes("General"));
      }

      if (recLanguage === "indian") {
        matches = matches.filter(a => a.isIndian);
      }

      if (recBudget === "free") {
        matches = matches.filter(a => a.price === "Free" || a.price === "Freemium");
      }

      // If no exact matches, default to top featured
      if (matches.length === 0) {
        matches = AGENTS.slice(0, 3);
      }

      setRecommendedAgents(matches.slice(0, 3));
      setRecStep(4);
    } else {
      setRecStep(recStep + 1);
    }
  };

  const resetRecommender = () => {
    setRecStep(1);
    setRecGoal("");
    setRecLanguage("");
    setRecBudget("");
    setRecommendedAgents([]);
    setShowRecommender(false);
  };

  // Filter Categories
  const filteredCategories = CATEGORIES.filter(cat => {
    return cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           cat.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-[#050816] text-white">
      {/* Category Hero Header */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-900 bg-[#0B1120]/10">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-purple-600/5 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-cyan-600/5 blur-[100px]"></div>

        <div className="mx-auto max-w-7xl text-center space-y-6">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1 text-xs text-purple-400">
            <SlidersHorizontal className="h-3 w-3 animate-pulse" />
            <span>AI Agent Directory Catalog</span>
          </div>

          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            AI Agent <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">Categories</span>
          </h1>
          
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-gray-400">
            Explore hundreds of highly-specialized categories, compare diagnostic benchmarks, and deploy perfect agent services instantly.
          </p>

          {/* Interactive Search Bar */}
          <div className="mx-auto max-w-xl relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search major categories (e.g., Coding, Analytics, Customer Support)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-800 bg-[#0B1120] py-3 pl-10 pr-4 text-xs sm:text-sm text-gray-300 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Grid Browse content with Sidebar filters */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* Left column sidebar filter controls */}
        <div className="space-y-6 lg:col-span-1 border-r border-gray-900 pr-0 lg:pr-6 hidden lg:block">
          <div className="flex items-center justify-between border-b border-gray-900 pb-3">
            <span className="font-bold text-xs tracking-wider text-gray-400 uppercase">Filters & Sort</span>
            <button 
              onClick={() => {
                setSelectedPricing([]);
                setSelectedRegion([]);
                setOnlyVerified(false);
              }}
              className="text-[10px] text-purple-400 hover:underline"
            >
              Reset all
            </button>
          </div>

          {/* Pricing Filters */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Pricing structure</h4>
            <div className="space-y-1.5 text-xs">
              {["Free", "Freemium", "Paid", "Subscription"].map((price) => (
                <label key={price} className="flex items-center space-x-2.5 cursor-pointer text-gray-400 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={selectedPricing.includes(price)}
                    onChange={() => handlePricingToggle(price)}
                    className="h-3.5 w-3.5 rounded border-gray-800 bg-gray-900 text-purple-600 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>{price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* region Built-In Filters */}
          <div className="space-y-2 pt-4 border-t border-gray-900">
            <h4 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Origin location</h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: "india", label: "Built in India 🇮🇳" },
                { id: "usa", label: "Built in USA" },
                { id: "europe", label: "Built in Europe" },
              ].map((origin) => (
                <label key={origin.id} className="flex items-center space-x-2.5 cursor-pointer text-gray-400 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={selectedRegion.includes(origin.id)}
                    onChange={() => handleRegionToggle(origin.id)}
                    className="h-3.5 w-3.5 rounded border-gray-800 bg-gray-900 text-purple-600 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>{origin.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verified Checkbox */}
          <div className="pt-4 border-t border-gray-900">
            <label className="flex items-center space-x-2.5 cursor-pointer text-gray-400 hover:text-white select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={() => setOnlyVerified(!onlyVerified)}
                className="h-3.5 w-3.5 rounded border-gray-800 bg-gray-900 text-purple-600 focus:ring-0 focus:ring-offset-0"
              />
              <span className="font-semibold text-xs text-cyan-400">Verified & Trusted Only</span>
            </label>
            <p className="text-[10px] text-gray-500 mt-1 pl-6">List only agents certified and fuzzed by BestAIAgent QA teams.</p>
          </div>

          {/* Sort selector */}
          <div className="space-y-2 pt-4 border-t border-gray-900">
            <h4 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Sort by</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded border border-gray-800 bg-gray-900 px-2.5 py-1.5 text-xs text-gray-400 focus:border-purple-500 focus:outline-none"
            >
              <option value="popular">Most Popular downloads</option>
              <option value="rated">Highest Rating</option>
              <option value="newest">Newest Releases</option>
            </select>
          </div>

        </div>

        {/* Right column main categories display */}
        <div className="space-y-8 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-gray-900 pb-3">
            <span className="text-xs text-gray-400 font-mono">Showing {filteredCategories.length} categories</span>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowRecommender(true)}
                className="flex items-center space-x-1 text-xs text-purple-400 hover:text-purple-300 font-semibold"
              >
                <Lightbulb className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span>AI Recommendation Assistant</span>
              </button>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-800 rounded-2xl">
              <p className="text-gray-500 text-xs italic">No matching categories found. Search other keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((cat) => (
                <div 
                  key={cat.id}
                  onClick={() => {
                    // Quick category filter trigger back to discover search
                    setActiveTab("discover");
                  }}
                  className="rounded-2xl border border-gray-800/80 bg-[#111827]/30 p-5 hover:border-purple-500/30 hover:bg-gradient-to-b hover:from-gray-900/40 hover:to-gray-950/80 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/20 text-purple-400 border border-purple-900/20 group-hover:scale-110 transition-transform">
                        <DynamicIcon name={cat.icon} className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono bg-gray-900 px-2 py-0.5 rounded border border-gray-850">
                        {cat.count} Agents
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-200 text-sm group-hover:text-white transition-colors">{cat.name}</h3>
                      <p className="text-[11px] text-gray-400 leading-relaxed mt-1 line-clamp-2">{cat.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-900 flex items-center justify-between text-[10px] text-purple-400 font-semibold uppercase tracking-wider">
                    <span>View Agents</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom helper card recommender banner */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-900/10 via-[#0B1120] to-cyan-900/10 border border-purple-500/20 p-6 text-center space-y-3">
            <h3 className="font-bold text-sm text-gray-100 flex justify-center items-center space-x-1.5">
              <Lightbulb className="h-4 w-4 text-yellow-400 animate-pulse" />
              <span>Can't decide which AI agent category is right?</span>
            </h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Answer 3 simple diagnostic questions about your business, technical stack, or language requirements, and we'll instantly recommend matching serverless agents.
            </p>
            <button 
              onClick={() => setShowRecommender(true)}
              className="rounded-full bg-purple-600 hover:bg-purple-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg"
            >
              Get Recommendations
            </button>
          </div>

        </div>

      </section>

      {/* Smart Recommender Questionnaire Modal */}
      {showRecommender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-6 space-y-6 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-900 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span>AI Agent Matchmaking Assistant</span>
              </h3>
              <button 
                onClick={resetRecommender} 
                className="text-xs text-gray-500 hover:text-white"
              >
                Close
              </button>
            </div>

            {/* Step progress dots */}
            {recStep < 4 && (
              <div className="flex justify-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <span 
                    key={step} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      recStep === step ? "w-6 bg-purple-500" : "w-1.5 bg-gray-800"
                    }`}
                  ></span>
                ))}
              </div>
            )}

            {/* Step 1: Goal */}
            {recStep === 1 && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-300 uppercase">Step 1: What is your primary objective?</h4>
                <div className="space-y-2">
                  {[
                    { id: "coding", label: "Write code, run unit tests, or audit APIs" },
                    { id: "multilingual", label: "Translate content or build localized speech voicebots" },
                    { id: "general", label: "Summarize articles, plan content or generic chat" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRecGoal(opt.id)}
                      className={`w-full text-left rounded-lg border p-3 text-xs transition-all ${
                        recGoal === opt.id 
                          ? "border-purple-500 bg-purple-950/20 text-purple-400 font-bold" 
                          : "border-gray-850 bg-gray-900/40 text-gray-400 hover:bg-gray-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Language */}
            {recStep === 2 && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-300 uppercase">Step 2: Are Indian regional dialects needed?</h4>
                <div className="space-y-2">
                  {[
                    { id: "indian", label: "Yes, support Hindi, Tamil, Telugu, etc. (Sovereign regional)" },
                    { id: "english", label: "No, standard English/Global languages are sufficient" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRecLanguage(opt.id)}
                      className={`w-full text-left rounded-lg border p-3 text-xs transition-all ${
                        recLanguage === opt.id 
                          ? "border-purple-500 bg-purple-950/20 text-purple-400 font-bold" 
                          : "border-gray-850 bg-gray-900/40 text-gray-400 hover:bg-gray-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Budget */}
            {recStep === 3 && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-300 uppercase">Step 3: What is your preferred budget?</h4>
                <div className="space-y-2">
                  {[
                    { id: "free", label: "Completely open-source or generous freemium access" },
                    { id: "paid", label: "Happy to pay for enterprise guarantees, speed, and SLAs" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRecBudget(opt.id)}
                      className={`w-full text-left rounded-lg border p-3 text-xs transition-all ${
                        recBudget === opt.id 
                          ? "border-purple-500 bg-purple-950/20 text-purple-400 font-bold" 
                          : "border-gray-850 bg-gray-900/40 text-gray-400 hover:bg-gray-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {recStep === 4 && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-emerald-400 uppercase">Matched AI Agent Recommendations</h4>
                <p className="text-[11px] text-gray-400">Based on your objective, localized origin, and billing setup, here are the optimal agents:</p>
                
                <div className="space-y-3.5">
                  {recommendedAgents.map((agent) => (
                    <div 
                      key={agent.id}
                      onClick={() => {
                        onAgentClick(agent);
                        resetRecommender();
                      }}
                      className="rounded-lg border border-gray-850 bg-gray-900/30 p-3 flex items-center justify-between hover:border-purple-500/30 cursor-pointer group"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-xs text-gray-200 group-hover:text-purple-400 transition-colors">{agent.name}</div>
                        <div className="text-[10px] text-gray-500 leading-normal">{agent.description.slice(0, 70)}...</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer controls */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-900">
              {recStep > 1 && recStep < 4 ? (
                <button
                  onClick={() => setRecStep(recStep - 1)}
                  className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {recStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (recStep === 1 && !recGoal) ||
                    (recStep === 2 && !recLanguage) ||
                    (recStep === 3 && !recBudget)
                  }
                  className="rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 px-5 py-2 text-xs font-semibold text-white flex items-center space-x-1"
                >
                  <span>{recStep === 3 ? "Find Matches" : "Next"}</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              ) : (
                <button
                  onClick={resetRecommender}
                  className="rounded-lg bg-purple-600 hover:bg-purple-500 w-full py-2.5 text-xs font-semibold text-white text-center"
                >
                  Done
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
