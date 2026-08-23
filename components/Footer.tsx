import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footerGrid">
        <div className="footerBrand">
          <Link href="/" className="brand"><span className="brandMark">✦</span><span className="brandWords">BestAI<span>Agent</span></span></Link>
          <p>Discover, compare and verify AI agents through primary-source evidence. India-built. No pay-to-rank.</p>
          <div className="footerPills"><span>Evidence first</span><span>Unknown stays unknown</span></div>
        </div>
        <div><h3>Platform</h3><Link href="/agents">AI agents</Link><Link href="/categories">Categories</Link><Link href="/compare">Compare</Link><Link href="/indian-ai">Indian AI pillar</Link><Link href="/india">Indic model hub</Link><Link href="/mcp">MCP</Link></div>
        <div><h3>Authority</h3><Link href="/research">Research</Link><Link href="/methodology">Methodology</Link><Link href="/editorial-policy">Editorial policy</Link><Link href="/review-process">Review process</Link><Link href="/corrections">Corrections</Link></div>
        <div><h3>Machine & legal</h3><a href="/sitemap.xml">Sitemap</a><a href="/robots.txt">Robots</a><a href="/llms.txt">llms.txt</a><a href="/catalog.json">catalog.json</a><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
      <div className="shell footnote"><span>© 2026 BestAIAgent.in</span><span>Canonical: www.bestaiagent.in</span><span>Made in India 🇮🇳</span></div>
    </footer>
  );
}
