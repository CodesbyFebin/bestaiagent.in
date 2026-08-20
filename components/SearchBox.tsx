"use client";
import { useState } from "react";
type Result = { id: string; name: string; type: string; slug: string; summary: string; verification: string };

export function SearchBox() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  async function runSearch(value: string) {
    setQ(value);
    if (value.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const body = await response.json() as { results: Result[] };
      setResults(body.results ?? []);
    } finally { setLoading(false); }
  }

  return (
    <div className="searchWidget">
      <label htmlFor="entity-search">Search verified entities</label>
      <input id="entity-search" value={q} onChange={(e) => void runSearch(e.target.value)} placeholder="OpenHands, Sarvam, LangGraph…" />
      <p className="muted">{loading ? "Searching…" : q.length > 1 ? `${results.length} result(s)` : "Search the public evidence graph."}</p>
      <div className="searchResults">
        {results.map((r) => <a key={r.id} href={`/${r.type}s/${r.slug}`}><strong>{r.name}</strong><span>{r.type} · {r.verification}</span><small>{r.summary}</small></a>)}
      </div>
    </div>
  );
}
