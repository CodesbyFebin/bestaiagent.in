import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { AGENTS, STARTUPS, MCP_SERVERS } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined. Gemini features will run in demo/fallback mode.");
}

// REST API for agent chat interaction
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history, agentSystemInstruction, useSearch } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!aiClient) {
      // Graceful fallback for demo if API key isn't provided yet
      return res.json({
        text: `[Demo Mode] Gemini API is currently offline (Key missing). Here is a simulated response as your selected agent:\n\n"I processed your query: '${message}'. To unlock full capabilities, please configure the GEMINI_API_KEY."`,
        groundingSources: [],
      });
    }

    // Format chat history correctly for the modern SDK
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        formattedContents.push({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.text }],
        });
      }
    }

    // Add current user turn
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const config: any = {
      systemInstruction: agentSystemInstruction || "You are BestAIAgent.in's interactive helper. Act as a top-tier AI agent helper.",
      temperature: 0.7,
    };

    // Configure search grounding tool if requested
    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: config,
    });

    const text = response.text || "No response received from the agent.";

    // Extract grounding search metadata
    const groundingSources: any[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && Array.isArray(chunks)) {
      for (const chunk of chunks) {
        if (chunk.web?.uri) {
          groundingSources.push({
            title: chunk.web.title || "Web Source",
            uri: chunk.web.uri,
          });
        }
      }
    }

    res.json({ text, groundingSources });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Local keyword-based semantic search fallback logic
function localFallbackSearch(query: string) {
  const lowercaseQuery = query.toLowerCase();
  
  const matchedAgents = AGENTS.map(agent => {
    let score = 0;
    let reasons: string[] = [];
    if (agent.name.toLowerCase().includes(lowercaseQuery)) {
      score += 0.8;
      reasons.push("Name contains matching query terms.");
    }
    if (agent.description.toLowerCase().includes(lowercaseQuery) || (agent.longDescription && agent.longDescription.toLowerCase().includes(lowercaseQuery))) {
      score += 0.4;
      reasons.push("Matches description profile details.");
    }
    agent.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowercaseQuery)) {
        score += 0.3;
        reasons.push(`Matches tag #${tag}.`);
      }
    });
    if (agent.creator.toLowerCase().includes(lowercaseQuery)) {
      score += 0.5;
      reasons.push(`Created by ${agent.creator} which matches the search.`);
    }
    return { id: agent.id, relevance: Math.min(score, 1.0), reason: reasons.join(" ") || "General semantic match." };
  }).filter(a => a.relevance > 0).sort((a, b) => b.relevance - a.relevance);

  const matchedCompanies = STARTUPS.map(company => {
    let score = 0;
    let reasons: string[] = [];
    if (company.name.toLowerCase().includes(lowercaseQuery)) {
      score += 0.8;
      reasons.push("Company name match.");
    }
    if (company.tagline.toLowerCase().includes(lowercaseQuery) || company.category.toLowerCase().includes(lowercaseQuery)) {
      score += 0.5;
      reasons.push("Matches startup segment and tagline.");
    }
    return { name: company.name, relevance: Math.min(score, 1.0), reason: reasons.join(" ") || "Segment match." };
  }).filter(c => c.relevance > 0).sort((a, b) => b.relevance - a.relevance);

  const matchedMcp = MCP_SERVERS.map(mcp => {
    let score = 0;
    let reasons: string[] = [];
    if (mcp.name.toLowerCase().includes(lowercaseQuery)) {
      score += 0.8;
      reasons.push("MCP Server name matches terms.");
    }
    if (mcp.description.toLowerCase().includes(lowercaseQuery)) {
      score += 0.4;
      reasons.push("Matches protocol functionality description.");
    }
    mcp.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowercaseQuery)) {
        score += 0.3;
        reasons.push(`Matches protocol tag #${tag}.`);
      }
    });
    return { id: mcp.id, relevance: Math.min(score, 1.0), reason: reasons.join(" ") || "Protocol match." };
  }).filter(m => m.relevance > 0).sort((a, b) => b.relevance - a.relevance);

  return { agents: matchedAgents, companies: matchedCompanies, mcpServers: matchedMcp };
}

// AI-powered Semantic Search API using Gemini
app.post("/api/gemini/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    if (!aiClient) {
      // Return local fallback matches in demo mode
      const fallbackResult = localFallbackSearch(query);
      return res.json({ ...fallbackResult, source: "Local Keyword Fallback Engine" });
    }

    const prompt = `You are an intelligent, high-speed Semantic Search Engine for BestAIAgent.in. 
Your job is to search across three collections of items for the query: "${query}".

Here are the collections in JSON format:
1. Agents: ${JSON.stringify(AGENTS.map(a => ({ id: a.id, name: a.name, description: a.description, creator: a.creator, tags: a.tags })))}
2. Startups (Companies): ${JSON.stringify(STARTUPS)}
3. MCP Servers: ${JSON.stringify(MCP_SERVERS.map(m => ({ id: m.id, name: m.name, description: m.description, tags: m.tags })))}

Instructions:
Evaluate how semantically relevant each item is to the user's search query "${query}". Relevance should be a floating-point number between 0.0 and 1.0. 
Include only items where relevance is greater than 0.15.
For each matching item, write a brief, insightful, 1-sentence explanation of why it matched (e.g. "Direct match for conversational audio capabilities" or "Regional foundational model for regional workflows").

Return a strict JSON block following this schema:
{
  "agents": [{"id": "agent_id", "relevance": 0.0 to 1.0, "reason": "reason why it is relevant"}],
  "companies": [{"name": "company_name", "relevance": 0.0 to 1.0, "reason": "reason why it is relevant"}],
  "mcpServers": [{"id": "mcp_id", "relevance": 0.0 to 1.0, "reason": "reason why it is relevant"}]
}

IMPORTANT: Output only the valid JSON. Do not write any markdown code blocks or explanatory text outside of the JSON block. Start with "{" and end with "}".`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.2,
      }
    });

    const responseText = response.text || "";
    // Clean up response if there are any markdown wrappers
    const jsonStr = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    try {
      const parsedResult = JSON.parse(jsonStr);
      res.json({ ...parsedResult, source: "Gemini Semantic Search Engine" });
    } catch (parseError) {
      console.error("Failed to parse Gemini Search response. Falling back to keyword search.", responseText);
      const fallbackResult = localFallbackSearch(query);
      res.json({ ...fallbackResult, source: "Local Matcher (Gemini JSON error)" });
    }
  } catch (error: any) {
    console.error("Gemini Search API Error:", error);
    const fallbackResult = localFallbackSearch(req.body.query || "");
    res.json({ ...fallbackResult, source: "Local Matcher (Exception Fallback)" });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Configure Vite middleware or static file serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[BestAIAgent.in Server] running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});
