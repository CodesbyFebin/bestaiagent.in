"use client";
import { useState } from "react";

type Result = {
  id: string;
  name: string;
  type: string;
  slug: string;
  summary: string;
  verification: string;
  url: string;
};

export function SearchBox() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  async function runSearch(value: string) {
    setQ(value);
    if (value.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const body = await response.json() as { results: Result[] };
      setResults(body.results ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="searchWidget">
      <label htmlFor="entity-search">Search the authority graph</label>
      <input
        id="entity-search"
        value={q}
        onChange={(event) => void runSearch(event.target.value)}
        placeholder="Cursor pricing, MCP, OpenHands, Sarvam, LangGraph…"
        autoComplete="off"
      />
      <p className="muted">{loading ? "Searching…" : q.length > 1 ? `${results.length} result(s)` : "Search verified entities and reviewed authority guides."}</p>
      <div className="searchResults" aria-live="polite">
        {results.map((result) => <a key={result.id} href={result.url}>
          <strong>{result.name}</strong>
          <span>{result.type} · {result.verification}</span>
          <small>{result.summary}</small>
        </a>)}
      </div>
    </div>
  );
}
