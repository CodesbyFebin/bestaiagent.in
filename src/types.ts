export interface AgentPricingPlan {
  name: string;
  price: string;
  features: string[];
}

export interface AgentBenchmarks {
  coding: number;
  reasoning: number;
  speed: number;
  cost: number; // 100 means cheap, 0 means expensive
  security: number;
  overall: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  rating: number;
  downloads: string;
  price: string; // "Free" | "Paid" | "Freemium" | "Subscription"
  priceDetail?: string;
  creator: string;
  tags: string[];
  icon: string; // lucide icon name
  isFeatured?: boolean;
  isTrending?: boolean;
  isIndian?: boolean;
  benchmarks: AgentBenchmarks;
  capabilities: string[];
  systemPrompt: string; // Prompt used to drive Gemini chat playground
  pricingPlans?: AgentPricingPlan[];
  mcpCompatible?: boolean;
  version?: string;
  lastUpdated?: string;
  creatorLogoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
  isTrending?: boolean;
}

export interface Startup {
  name: string;
  location: string;
  category: string;
  tagline: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "guide" | "template" | "course" | "tool" | "doc" | "blog";
  description: string;
  author: string;
  date?: string;
  readTime?: string;
  likes?: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  tag?: string;
}

export interface ComparisonMatrix {
  agents: Agent[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface McpServer {
  id: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  downloads: string;
  rating: number;
  tags: string[];
  isIndian?: boolean;
}
