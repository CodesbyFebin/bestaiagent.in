export type AiIntentBucket = "coding" | "business" | "content" | "research" | "india";

export type AiTopicCluster = {
  id: number;
  bucket: AiIntentBucket;
  name: string;
  primaryQuery: string;
  secondaryQuery: string;
  canonicalTarget: string;
  claimSensitive: boolean;
};

export const aiBucketMeta: Record<AiIntentBucket, { title: string; description: string }> = {
  coding: { title: "Coding & Development", description: "Coding assistance, GitHub automation, debugging, local development, APIs, DevOps, databases, code review, refactoring and CLI workflows." },
  business: { title: "Business & Enterprise", description: "Startup, support, HR, sales, project management, legal, finance, meetings, scheduling and workflow automation intents." },
  content: { title: "Content & Marketing", description: "SEO, writing, social, video, email, design, translation, ads, podcasting and brand-voice workflows." },
  research: { title: "Data & Research", description: "Analysis, academic research, scraping, market research, modeling, knowledge management, visualization, sentiment, cybersecurity and compliance tracking." },
  india: { title: "India-Specific, MCP & Verification", description: "India-first pricing and availability, MCP, DPDP-related evidence, Indic languages, local deployment, open source, voice and evidence-backed discovery." }
};

export const aiTopicClusters: AiTopicCluster[] = [
  { id:1,bucket:"coding",name:"AI for Coding Assistance",primaryQuery:"best ai for coding",secondaryQuery:"best ai coding agent for python developers",canonicalTarget:"/categories/coding-agents",claimSensitive:false },
  { id:2,bucket:"coding",name:"AI for GitHub Automation",primaryQuery:"ai agent for github",secondaryQuery:"best ai agent for automated pull requests",canonicalTarget:"/categories/coding-agents",claimSensitive:false },
  { id:3,bucket:"coding",name:"AI for Debugging",primaryQuery:"top best ai for debugging code",secondaryQuery:"best ai agent for finding bugs in javascript",canonicalTarget:"/categories/coding-agents",claimSensitive:false },
  { id:4,bucket:"coding",name:"AI for Local Development",primaryQuery:"best agent for local development",secondaryQuery:"use ai agent for offline coding setup",canonicalTarget:"/categories/coding-agents",claimSensitive:true },
  { id:5,bucket:"coding",name:"AI for API Integration",primaryQuery:"best ai for api integration",secondaryQuery:"ai agent for generating rest api endpoints",canonicalTarget:"/categories/coding-agents",claimSensitive:false },
  { id:6,bucket:"coding",name:"AI for DevOps",primaryQuery:"top best ai for devops",secondaryQuery:"best ai agent for kubernetes automation",canonicalTarget:"/categories/automation",claimSensitive:true },
  { id:7,bucket:"coding",name:"AI for SQL & Databases",primaryQuery:"best ai for sql queries",secondaryQuery:"ai agent for database schema generation",canonicalTarget:"/categories/coding-agents",claimSensitive:true },
  { id:8,bucket:"coding",name:"AI for Code Review",primaryQuery:"best ai for code review",secondaryQuery:"top ai agent for automated security scanning",canonicalTarget:"/categories/coding-agents",claimSensitive:true },
  { id:9,bucket:"coding",name:"AI for TypeScript/Refactoring",primaryQuery:"best ai for typescript",secondaryQuery:"best agent for refactoring legacy code",canonicalTarget:"/categories/coding-agents",claimSensitive:false },
  { id:10,bucket:"coding",name:"AI for Terminal/CLI",primaryQuery:"use ai agent for terminal commands",secondaryQuery:"best ai for cli automation",canonicalTarget:"/categories/coding-agents",claimSensitive:true },

  { id:11,bucket:"business",name:"AI for Startups",primaryQuery:"best ai for startups",secondaryQuery:"top best ai agent for early stage founders",canonicalTarget:"/best-ai-agent-for-business",claimSensitive:false },
  { id:12,bucket:"business",name:"AI for Customer Support",primaryQuery:"ai agent for customer support",secondaryQuery:"best ai for automated ticketing systems",canonicalTarget:"/categories/customer-support",claimSensitive:false },
  { id:13,bucket:"business",name:"AI for HR & Recruiting",primaryQuery:"top best ai for hr",secondaryQuery:"best ai agent for resume screening",canonicalTarget:"/categories/business",claimSensitive:true },
  { id:14,bucket:"business",name:"AI for Sales Outreach",primaryQuery:"best ai for sales outreach",secondaryQuery:"ai agent for crm data entry automation",canonicalTarget:"/categories/sales",claimSensitive:false },
  { id:15,bucket:"business",name:"AI for Project Management",primaryQuery:"best ai for project management",secondaryQuery:"use ai agent for jira task creation",canonicalTarget:"/categories/automation",claimSensitive:false },
  { id:16,bucket:"business",name:"AI for Legal Document Review",primaryQuery:"top best ai for legal document review",secondaryQuery:"best ai agent for contract analysis",canonicalTarget:"/best-ai-agent-for-business",claimSensitive:true },
  { id:17,bucket:"business",name:"AI for Finance & Accounting",primaryQuery:"best ai for financial forecasting",secondaryQuery:"ai agent for expense report automation",canonicalTarget:"/best-ai-agent-for-business",claimSensitive:true },
  { id:18,bucket:"business",name:"AI for Meeting Notes",primaryQuery:"best ai for meeting notes",secondaryQuery:"top ai agent for zoom transcription",canonicalTarget:"/categories/business",claimSensitive:true },
  { id:19,bucket:"business",name:"AI for Calendar Scheduling",primaryQuery:"best ai for calendar scheduling",secondaryQuery:"use ai agent for automated meeting coordination",canonicalTarget:"/categories/automation",claimSensitive:false },
  { id:20,bucket:"business",name:"AI for Workflow Automation",primaryQuery:"top best ai for workflow automation",secondaryQuery:"best ai agent for zapier alternatives",canonicalTarget:"/best-ai-agents-for-automation",claimSensitive:false },

  { id:21,bucket:"content",name:"AI for SEO",primaryQuery:"best ai for seo",secondaryQuery:"top best ai agent for keyword research",canonicalTarget:"/categories/marketing",claimSensitive:false },
  { id:22,bucket:"content",name:"AI for Blog Writing",primaryQuery:"best ai for blog writing",secondaryQuery:"ai agent for long form content generation",canonicalTarget:"/categories/marketing",claimSensitive:false },
  { id:23,bucket:"content",name:"AI for Social Media",primaryQuery:"top best ai for social media",secondaryQuery:"best ai agent for twitter thread creation",canonicalTarget:"/categories/marketing",claimSensitive:false },
  { id:24,bucket:"content",name:"AI for Video Editing",primaryQuery:"best ai for video editing",secondaryQuery:"use ai agent for automated youtube shorts",canonicalTarget:"/categories/marketing",claimSensitive:false },
  { id:25,bucket:"content",name:"AI for Email Marketing",primaryQuery:"best ai for email marketing",secondaryQuery:"best ai agent for personalized cold emails",canonicalTarget:"/categories/marketing",claimSensitive:true },
  { id:26,bucket:"content",name:"AI for Graphic Design",primaryQuery:"top best ai for graphic design",secondaryQuery:"best ai for generating marketing assets",canonicalTarget:"/categories/marketing",claimSensitive:false },
  { id:27,bucket:"content",name:"AI for Translation",primaryQuery:"best ai for translation",secondaryQuery:"ai agent for multilingual website localization",canonicalTarget:"/categories/marketing",claimSensitive:true },
  { id:28,bucket:"content",name:"AI for Ad Copy",primaryQuery:"best ai for ad copy",secondaryQuery:"top ai agent for facebook ad generation",canonicalTarget:"/categories/marketing",claimSensitive:true },
  { id:29,bucket:"content",name:"AI for Podcasting",primaryQuery:"best ai for podcasting",secondaryQuery:"use ai agent for podcast show notes",canonicalTarget:"/categories/marketing",claimSensitive:false },
  { id:30,bucket:"content",name:"AI for Brand Voice",primaryQuery:"top best ai for brand voice consistency",secondaryQuery:"best ai agent for tone adjustment",canonicalTarget:"/categories/marketing",claimSensitive:false },

  { id:31,bucket:"research",name:"AI for Data Analysis",primaryQuery:"best ai for data analysis",secondaryQuery:"top best ai agent for excel automation",canonicalTarget:"/categories/research",claimSensitive:false },
  { id:32,bucket:"research",name:"AI for Academic Research",primaryQuery:"best ai for academic research",secondaryQuery:"ai agent for literature review summarization",canonicalTarget:"/categories/research",claimSensitive:false },
  { id:33,bucket:"research",name:"AI for Web Scraping",primaryQuery:"top best ai for web scraping",secondaryQuery:"best ai agent for extracting structured data",canonicalTarget:"/categories/research",claimSensitive:true },
  { id:34,bucket:"research",name:"AI for Market Research",primaryQuery:"best ai for market research",secondaryQuery:"use ai agent for competitor analysis",canonicalTarget:"/categories/research",claimSensitive:false },
  { id:35,bucket:"research",name:"AI for Financial Modeling",primaryQuery:"best ai for financial modeling",secondaryQuery:"top ai agent for forecasting trends",canonicalTarget:"/categories/research",claimSensitive:true },
  { id:36,bucket:"research",name:"AI for Knowledge Management",primaryQuery:"best ai for knowledge management",secondaryQuery:"best ai agent for internal wiki search",canonicalTarget:"/categories/research",claimSensitive:true },
  { id:37,bucket:"research",name:"AI for Data Visualization",primaryQuery:"top best ai for data visualization",secondaryQuery:"best ai for generating charts from csv",canonicalTarget:"/categories/research",claimSensitive:false },
  { id:38,bucket:"research",name:"AI for Sentiment Analysis",primaryQuery:"best ai for sentiment analysis",secondaryQuery:"ai agent for social media monitoring",canonicalTarget:"/categories/research",claimSensitive:true },
  { id:39,bucket:"research",name:"AI for Cybersecurity",primaryQuery:"best ai for cybersecurity",secondaryQuery:"top ai agent for threat detection",canonicalTarget:"/categories/research",claimSensitive:true },
  { id:40,bucket:"research",name:"AI for Compliance Tracking",primaryQuery:"top best ai for compliance tracking",secondaryQuery:"best ai agent for regulatory reporting",canonicalTarget:"/methodology",claimSensitive:true },

  { id:41,bucket:"india",name:"AI for Indian Developers",primaryQuery:"best ai for indian developers",secondaryQuery:"top best ai agent with inr pricing",canonicalTarget:"/india",claimSensitive:true },
  { id:42,bucket:"india",name:"AI Agents with MCP Support",primaryQuery:"ai agents with mcp support",secondaryQuery:"best ai agent for model context protocol",canonicalTarget:"/mcp",claimSensitive:true },
  { id:43,bucket:"india",name:"AI for DPDP Compliance",primaryQuery:"best ai for dpdp compliance",secondaryQuery:"top ai agent for india data residency",canonicalTarget:"/methodology",claimSensitive:true },
  { id:44,bucket:"india",name:"AI for Indic Languages",primaryQuery:"best ai for indic languages",secondaryQuery:"use ai agent for hindi and hinglish support",canonicalTarget:"/india",claimSensitive:true },
  { id:45,bucket:"india",name:"AI for Indian Startups",primaryQuery:"top best ai for indian startups",secondaryQuery:"best ai agent with upi payment integration",canonicalTarget:"/best-ai-agent-for-business",claimSensitive:true },
  { id:46,bucket:"india",name:"Verified AI Agents",primaryQuery:"best verified ai agent",secondaryQuery:"top best ai agent with source code evidence",canonicalTarget:"/agents",claimSensitive:false },
  { id:47,bucket:"india",name:"AI for Local/Air-Gapped Deployment",primaryQuery:"best ai for local deployment",secondaryQuery:"ai agent for air-gapped enterprise setup",canonicalTarget:"/india",claimSensitive:true },
  { id:48,bucket:"india",name:"AI for Open Source",primaryQuery:"top best ai for open source",secondaryQuery:"best ai agent with transparent github repo",canonicalTarget:"/best-free-ai-agents",claimSensitive:true },
  { id:49,bucket:"india",name:"AI for Voice Agents in India",primaryQuery:"best ai for voice agents india",secondaryQuery:"ai agent for sub-second latency calls",canonicalTarget:"/categories/voice-bots",claimSensitive:true },
  { id:50,bucket:"india",name:"Anti-Directory / Evidence-Backed AI",primaryQuery:"best ai directory no pay to rank",secondaryQuery:"top best ai agent evidence-backed comparison",canonicalTarget:"/methodology",claimSensitive:false }
];

export function clustersForBucket(bucket: AiIntentBucket) {
  return aiTopicClusters.filter((cluster) => cluster.bucket === bucket);
}

export const aiTopicClusterStats = {
  buckets: Object.keys(aiBucketMeta).length,
  clusters: aiTopicClusters.length,
  searchTerms: aiTopicClusters.length * 2
} as const;
