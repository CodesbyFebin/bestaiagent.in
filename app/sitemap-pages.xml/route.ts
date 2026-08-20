import { legacyPages } from "@/lib/legacy";
import { SITE } from "@/lib/site";
import { xmlResponse } from "@/lib/xml";

export const dynamic = "force-static";

export async function GET() {
  const legacyUrls = Object.keys(legacyPages)
    .filter((slug) => !slug.includes("/") && slug !== "rankings")
    .map((slug) => `${SITE.url}/${slug}`);

  return xmlResponse([
    SITE.url,
    `${SITE.url}/ai-agent-rankings`,
    ...legacyUrls
  ]);
}
