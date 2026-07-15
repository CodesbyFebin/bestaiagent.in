import React, { useState } from "react";
import { 
  Search, BookOpen, FileText, Code, Layout, GraduationCap, ClipboardList, Video, 
  Flame, Sparkles, Heart, HelpCircle, ArrowUpRight, Github, MessageSquare, Plus, Check 
} from "lucide-react";
import { RESOURCES } from "../data";
import { ResourceItem } from "../types";

export default function ResourcesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [userResources, setUserResources] = useState<ResourceItem[]>(RESOURCES);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  
  // Interactive "Request Resource" Modal state
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [reqTitle, setReqTitle] = useState("");
  const [reqType, setReqType] = useState("guide");
  const [reqDesc, setReqDesc] = useState("");
  const [requestedQueue, setRequestedQueue] = useState<any[]>([
    { id: 1, title: "Model Context Protocol (MCP) authentication tutorial", votes: 34 },
    { id: 2, title: "Next.js 15 server action proxy configurations with Gemini", votes: 19 },
  ]);

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter(x => x !== id));
      setUserResources(userResources.map(r => r.id === id ? { ...r, likes: (r.likes || 0) - 1 } : r));
    } else {
      setLikedIds([...likedIds, id]);
      setUserResources(userResources.map(r => r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r));
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim()) return;
    
    const newReq = {
      id: Date.now(),
      title: reqTitle,
      votes: 1
    };
    setRequestedQueue([newReq, ...requestedQueue]);
    setReqTitle("");
    setReqDesc("");
    setRequestModalOpen(false);
  };

  const handleVoteRequest = (id: number) => {
    setRequestedQueue(requestedQueue.map(q => q.id === id ? { ...q, votes: q.votes + 1 } : q));
  };

  // Categories grid
  const resourceTypes = [
    { title: "Guides & Tutorials", count: "1,250+", icon: "BookOpen", color: "text-purple-400" },
    { title: "Documentation", count: "1,800+", icon: "FileText", color: "text-cyan-400" },
    { title: "Tools & SDKs", count: "950+", icon: "Code", color: "text-emerald-400" },
    { title: "Templates", count: "750+", icon: "Layout", color: "text-orange-400" },
    { title: "Courses", count: "420+", icon: "GraduationCap", color: "text-indigo-400" },
    { title: "Cheat Sheets", count: "300+", icon: "ClipboardList", color: "text-pink-400" },
    { title: "Videos", count: "1,100+", icon: "Video", color: "text-red-400" },
    { title: "Blogs", count: "1,430+", icon: "FileText", color: "text-yellow-400" },
  ];

  // Filtering Resources
  const filteredResources = userResources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tag?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic ? res.tag === selectedTopic : true;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="bg-[#050816] text-white">
      {/* Header section with Stats & Search */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-900 bg-[#0B1120]/10">
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-cyan-600/5 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-purple-600/5 blur-[100px]"></div>

        <div className="mx-auto max-w-7xl text-center space-y-6">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1 text-xs text-cyan-400">
            <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>BestAIAgent Hub Resources Platform</span>
          </div>

          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Everything You Need to <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">Build, Deploy & Scale</span> AI Agents
          </h1>
          
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-gray-400">
            Guides, docs, boilerplates, templates and tools to accelerate your machine learning deployments. Curated and verified by India's largest community of builders.
          </p>

          {/* Interactive Search Bar */}
          <div className="mx-auto max-w-xl relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search guides, code libraries, vector databases (e.g. MCP, RAG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-800 bg-[#0B1120] py-3 pl-10 pr-4 text-xs sm:text-sm text-gray-300 placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Stats Bar */}
          <div className="mx-auto max-w-4xl pt-6 grid grid-cols-2 gap-y-4 md:grid-cols-4 border-t border-gray-900/60 mt-10">
            <div>
              <div className="text-xl font-bold text-gray-200">10,000+</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Total Resources</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-200">500+</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Guides & Tutorials</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-200">100+</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Tools & SDKs</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400">100% Free</div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Resource Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Browse Resources by Type</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {resourceTypes.map((type, idx) => (
            <div 
              key={idx} 
              className="rounded-xl border border-gray-850 bg-[#0B1120]/10 p-3 flex flex-col items-center justify-center text-center space-y-2 hover:bg-gray-900/40 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className={`h-8 w-8 rounded-full bg-gray-950 flex items-center justify-center ${type.color} border border-gray-900`}>
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-300 truncate w-full max-w-[80px]">{type.title}</div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">{type.count}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main content: Sidebar trending + Featured card view */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-gray-900 grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column: Trending Resources List */}
        <div className="space-y-6 lg:col-span-1 border-r border-gray-900 pr-0 lg:pr-8">
          <div className="flex items-center space-x-2 border-b border-gray-900 pb-3">
            <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
            <h3 className="font-bold text-sm text-gray-200">Trending Resources</h3>
          </div>

          <div className="space-y-3.5">
            {userResources.filter(r => r.isTrending).map((r, idx) => (
              <div 
                key={r.id}
                className="group p-3.5 rounded-xl border border-gray-850 bg-[#0B1120]/20 hover:bg-gray-900/20 hover:border-cyan-500/20 transition-all cursor-pointer relative"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-cyan-950/40 text-cyan-400 border border-cyan-900/40 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                      {r.tag || "HOT"}
                    </span>
                    <h4 className="font-semibold text-xs text-gray-200 group-hover:text-cyan-400 transition-colors mt-1">{r.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{r.description}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(r.id);
                    }}
                    className={`p-1.5 rounded-full border ${likedIds.includes(r.id) ? "border-red-500/30 bg-red-950/20 text-red-400" : "border-gray-800 hover:text-red-400"} transition-all`}
                  >
                    <Heart className="h-3.5 w-3.5" fill={likedIds.includes(r.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* requested community items list */}
          <div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4 space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex justify-between items-center">
              <span>Community requested topics</span>
              <HelpCircle className="h-4 w-4 text-gray-600" />
            </h4>
            <div className="space-y-2 text-xs">
              {requestedQueue.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-[#050816] p-2.5 rounded border border-gray-900">
                  <span className="text-gray-400 truncate max-w-[160px]">{item.title}</span>
                  <button 
                    onClick={() => handleVoteRequest(item.id)}
                    className="rounded bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 font-mono text-[10px] font-bold px-2 py-1 flex items-center space-x-1 border border-purple-800/20"
                  >
                    <span>▲</span>
                    <span>{item.votes}</span>
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setRequestModalOpen(true)}
              className="w-full text-center rounded border border-gray-800 py-2 text-[10px] font-bold text-cyan-400 hover:bg-cyan-950/10 hover:border-cyan-500/30 transition-all uppercase tracking-wider"
            >
              + Submit request
            </button>
          </div>

        </div>

        {/* Right Column: Featured Resources Main View */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-900 pb-3">
            <h3 className="font-bold text-sm text-gray-200">Handpicked Quality Boilerplates</h3>
            {selectedTopic && (
              <button 
                onClick={() => setSelectedTopic(null)} 
                className="text-[11px] text-cyan-400 underline"
              >
                Clear topic filter
              </button>
            )}
          </div>

          {/* Popular topics pill row */}
          <div className="flex flex-wrap gap-2 py-1">
            {["MCP", "RAG", "Architecture", "LangChain", "Prompts"].map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all border ${
                  selectedTopic === topic
                    ? "border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold"
                    : "border-gray-800 hover:border-gray-700 bg-gray-900/30 text-gray-400 hover:text-white"
                }`}
              >
                #{topic}
              </button>
            ))}
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
              <p className="text-gray-500 text-xs italic">No matching resources found. Clear filters or search different terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredResources.map((res) => (
                <div 
                  key={res.id}
                  className="rounded-2xl border border-gray-800 bg-[#111827]/40 p-5 flex flex-col justify-between hover:border-cyan-500/20 hover:bg-gradient-to-b hover:from-gray-900/40 hover:to-gray-950/80 transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-purple-950/30 px-2 py-0.5 text-[9px] font-bold text-purple-400 border border-purple-900/20 uppercase tracking-widest font-mono">
                        {res.type}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">{res.readTime || "10 min read"}</span>
                    </div>
                    <h4 className="font-bold text-sm text-gray-200 group-hover:text-cyan-400 transition-colors">{res.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{res.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-900 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-mono">by {res.author}</span>
                    <button 
                      onClick={() => handleLike(res.id)}
                      className="flex items-center space-x-1.5 text-[11px] font-mono text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Heart className={`h-3.5 w-3.5 ${likedIds.includes(res.id) ? "text-red-500 fill-red-500" : ""}`} />
                      <span>{res.likes || 0}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Built in India Banner support */}
          <div className="rounded-2xl bg-gradient-to-r from-orange-600/10 via-slate-900/50 to-emerald-600/10 border border-orange-500/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-sm text-gray-100 flex items-center justify-center sm:justify-start space-x-2">
                <span>Proudly Built in India. For the World.</span>
                <span>🇮🇳</span>
              </h4>
              <p className="text-[11px] text-gray-400 max-w-sm leading-relaxed">
                Unlock top libraries, sovereign translation APIs, and fine-tuned developer frameworks curated specifically for localized Indian contexts.
              </p>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="flex items-center space-x-2 rounded-full bg-orange-600 hover:bg-orange-500 px-5 py-2 text-xs font-semibold text-white transition-all shadow-[0_0_15px_rgba(239,125,0,0.15)] shrink-0"
            >
              <Github className="h-4 w-4" />
              <span>Explore Sovereign Git</span>
            </a>
          </div>

          {/* Social Row: Discord / Telegram / YouTube */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="rounded-xl border border-gray-850 bg-gray-950 p-4 space-y-2">
              <h5 className="font-bold text-xs text-purple-400 flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Discord Community</span>
              </h5>
              <p className="text-[10px] text-gray-500 leading-normal">Interact with 25,000+ top machine learning engineers and creators worldwide.</p>
              <a href="https://discord.com" target="_blank" className="text-[10px] text-purple-400 underline font-semibold flex items-center space-x-1">
                <span>Join Discord</span> <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <div className="rounded-xl border border-gray-850 bg-gray-950 p-4 space-y-2">
              <h5 className="font-bold text-xs text-cyan-400 flex items-center space-x-2">
                <Github className="h-4 w-4" />
                <span>Sovereign GitHub Org</span>
              </h5>
              <p className="text-[10px] text-gray-500 leading-normal">Contribute, star, and fork dozens of template boilerplates, sandboxes and prompt repos.</p>
              <a href="https://github.com" target="_blank" className="text-[10px] text-cyan-400 underline font-semibold flex items-center space-x-1">
                <span>Fork repositories</span> <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <div className="rounded-xl border border-gray-850 bg-gray-950 p-4 space-y-2">
              <h5 className="font-bold text-xs text-emerald-400 flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Learning Webinars</span>
              </h5>
              <p className="text-[10px] text-gray-500 leading-normal">Watch live masterclasses, walkthroughs, and tutorials on how to scale sandboxed workloads.</p>
              <a href="https://youtube.com" target="_blank" className="text-[10px] text-emerald-400 underline font-semibold flex items-center space-x-1">
                <span>Watch sessions</span> <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* Interactive Modal form for "Request Resource" */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-6 space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Plus className="h-5 w-5 text-cyan-400" />
              <span>Submit Resource Request</span>
            </h3>
            <p className="text-xs text-gray-400">Suggest a tutorial, template, or guide. Our developers and open-source contributors will build it!</p>
            
            <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs text-gray-300">
              <div>
                <label className="block text-[11px] text-gray-500 font-semibold uppercase mb-1">Resource Title Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fine-tuning Bhashini translation pipelines..."
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-500 font-semibold uppercase mb-1">Target format</label>
                <select
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value)}
                  className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="guide">Guide & Tutorial</option>
                  <option value="template">Boilerplate / Code Template</option>
                  <option value="course">Video Course</option>
                  <option value="doc">Reference Document</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-gray-500 font-semibold uppercase mb-1">Additional description/context</label>
                <textarea
                  rows={3}
                  placeholder="Specify particular APIs, framework limitations or targeted libraries..."
                  value={reqDesc}
                  onChange={(e) => setReqDesc(e.target.value)}
                  className="w-full rounded border border-gray-800 bg-gray-900 px-3 py-2 text-xs text-gray-300 focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className="rounded px-4 py-2 bg-gray-900 hover:bg-gray-850 font-semibold text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-cyan-600 hover:bg-cyan-500 px-4 py-2 font-semibold text-white"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
