import Link from "next/link";
export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footerGrid">
        <div><strong>BestAIAgent.in</strong><p>Evidence first. Unknown stays unknown.</p></div>
        <div><h3>Entities</h3><Link href="/agents">Agents</Link><Link href="/models">Models</Link><Link href="/frameworks">Frameworks</Link><Link href="/providers">Providers</Link></div>
        <div><h3>Authority</h3><Link href="/methodology">Methodology</Link><Link href="/editorial-policy">Editorial policy</Link><Link href="/corrections">Corrections</Link><Link href="/knowledge-graph">Knowledge graph</Link></div>
        <div><h3>Machine</h3><a href="/sitemap.xml">Sitemap</a><a href="/robots.txt">Robots</a><a href="/llms.txt">llms.txt</a><a href="/catalog.json">catalog.json</a></div>
      </div>
      <div className="shell footnote">© 2026 BestAIAgent.in · India-built · Independent · No pay-to-rank</div>
    </footer>
  );
}
