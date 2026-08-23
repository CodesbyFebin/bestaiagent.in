import { authorityPages } from "@/lib/authority-pages";
import { legacyPages } from "@/lib/legacy";
import { SITE } from "@/lib/site";
import { xmlResponse } from "@/lib/xml";

export const dynamic = "force-static";

export async function GET() {
  const legacyUrls = Object.entries(legacyPages)
    .filter(([slug, page]) => page.index && !slug.includes("/") && slug !== "rankings")
    .map(([slug]) => `${SITE.url}/${slug}`);

  const authorityUrls = Object.entries(authorityPages)
    .filter(([, page]) => page.index)
    .map(([slug]) => `${SITE.url}/${slug}`);

  return xmlResponse([...new Set([
    SITE.url,
    ...legacyUrls,
    ...authorityUrls
  ])]);
}
