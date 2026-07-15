import React, { useState } from "react";
import { Search, Globe, User, ShieldAlert, Sparkles, Menu, X } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  openCompare: () => void;
}

export default function Header({ activeTab, setActiveTab, searchQuery, onSearch, openCompare }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "discover", label: "Marketplace" },
    { id: "benchmarks", label: "Benchmark Engine" },
    { id: "workflow-os", label: "Workflow OS" },
    { id: "compare", label: "Spend Simulator" },
    { id: "built-in-india", label: "Sovereign India 🇮🇳" },
    { id: "dashboard", label: "Mission Control" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/80 bg-[#050816]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => setActiveTab("discover")} 
          className="flex cursor-pointer items-center space-x-2 text-xl font-bold tracking-tight text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#050816]">
              <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-white via-gray-200 to-cyan-300 bg-clip-text text-transparent">
            BestAIAgent<span className="text-purple-500">.in</span>
          </span>
          <span className="hidden rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] font-medium text-purple-400 uppercase tracking-widest sm:inline-block">
            OS
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "compare") {
                    openCompare();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-white rounded-md ${
                  isActive 
                    ? "text-cyan-400 bg-cyan-950/20 shadow-inner border-b border-cyan-500/50" 
                    : "text-gray-400 hover:bg-gray-900/40"
                }`}
              >
                {item.label}
                {item.id === "built-in-india" && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Global Search Input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search agents, prompts, devs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-56 rounded-full border border-gray-800 bg-[#0B1120] py-1.5 pl-9 pr-4 text-xs text-gray-300 placeholder-gray-500 focus:border-purple-500 focus:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-300 lg:w-64"
            />
            <div className="absolute right-2.5 top-2 hidden items-center space-x-0.5 rounded border border-gray-800 bg-gray-950 px-1 py-0.5 text-[9px] text-gray-500 sm:flex">
              <span>⌘</span><span>K</span>
            </div>
          </div>

          {/* Regional Flag Indicator */}
          <div className="flex cursor-pointer items-center space-x-1.5 rounded-full border border-gray-800 bg-gray-900/30 px-3 py-1.5 hover:bg-gray-900/70 transition-all duration-200">
            <Globe className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-[11px] font-semibold text-gray-300 uppercase">EN-IN</span>
          </div>

          {/* Call-to-action buttons */}
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className="flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-semibold border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 transition-all duration-300"
          >
            <User className="h-3.5 w-3.5" />
            <span>Developer Console</span>
          </button>

          <button 
            onClick={() => setActiveTab("discover")} 
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-900/80 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-800 bg-[#050816] px-4 py-3 space-y-3 lg:hidden transition-all duration-300">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-800 bg-[#0B1120] py-2 pl-9 pr-4 text-xs text-gray-300 placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 py-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.id === "compare") {
                    openCompare();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`flex items-center justify-center rounded-lg py-2.5 text-xs font-medium border transition-all ${
                  activeTab === item.id
                    ? "border-cyan-500 bg-cyan-950/20 text-cyan-400"
                    : "border-gray-800 bg-gray-900/40 text-gray-300 hover:bg-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-gray-800 pt-3">
            <div className="flex items-center space-x-1.5 text-xs text-gray-400">
              <Globe className="h-4 w-4 text-orange-400" />
              <span>India English</span>
            </div>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("dashboard");
              }}
              className="rounded-full bg-gray-900 border border-gray-800 px-4 py-1.5 text-xs font-semibold text-gray-300 hover:bg-gray-800"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
