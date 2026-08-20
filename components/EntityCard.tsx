import Link from "next/link";
import type { Entity } from "@/lib/catalog";
import { StatusBadge } from "./StatusBadge";

export function EntityCard({ entity }: { entity: Entity }) {
  return (
    <article className="card">
      <div className="cardTop">
        <div className="glyph" aria-hidden="true">{entity.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <p className="eyebrow">{entity.type}</p>
          <h3><Link href={`/${entity.type}s/${entity.slug}`}>{entity.name}</Link></h3>
          <p className="muted">{entity.developer}</p>
        </div>
      </div>
      <p>{entity.summary}</p>
      <div className="tagRow">
        <StatusBadge state={entity.verification} />
        {entity.categories.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </div>
    </article>
  );
}
