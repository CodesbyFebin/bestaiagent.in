import Link from "next/link";
const links = [
  ["/agents", "Agents"], ["/models", "Models"], ["/frameworks", "Frameworks"],
  ["/india", "India AI"], ["/mcp", "MCP"], ["/compare", "Compare"], ["/research", "Research"]
] as const;

export function Header() {
  return (
    <header className="siteHeader">
      <div className="shell navBar">
        <Link href="/" className="brand"><span className="brandMark">✦</span>BestAIAgent<span>.in</span></Link>
        <nav aria-label="Primary">{links.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <Link href="/search" className="navCta">Search</Link>
      </div>
    </header>
  );
}
