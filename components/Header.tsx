import Link from "next/link";

const links = [
  ["/agents", "AI Agents"],
  ["/categories", "Categories"],
  ["/compare", "Compare"],
  ["/india", "Built in India"],
  ["/mcp", "MCP"],
  ["/research", "Resources"],
  ["/pricing", "Pricing"]
] as const;

export function Header() {
  return (
    <header className="siteHeader">
      <div className="shell navBar">
        <Link href="/" className="brand" aria-label="BestAIAgent.in home">
          <span className="brandMark">✦</span>
          <span className="brandWords">BestAI<span>Agent</span></span>
          <small>Evidence directory</small>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/search" className="navSearch" aria-label="Search BestAIAgent.in">⌕ <span>Search</span></Link>
        <Link href="/agents" className="navCta">Explore</Link>
      </div>
    </header>
  );
}
