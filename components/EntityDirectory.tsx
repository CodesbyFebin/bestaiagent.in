import { EntityCard } from "@/components/EntityCard";
import { entitiesByType, type EntityType } from "@/lib/catalog";

export function EntityDirectory({ type, title, description }: { type: EntityType; title: string; description: string }) {
  const items = entitiesByType(type);
  return <div className="shell detail">
    <section className="directoryHero">
      <p className="eyebrow">Evidence-backed directory</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      <div className="directoryMeta"><span>{items.length} public records</span><span>Primary-source publication gate</span><span>Canonical URLs only</span></div>
    </section>
    <div className="grid">{items.map((entity) => <EntityCard entity={entity} key={entity.id} />)}</div>
    {!items.length && <p className="warning">No entities currently pass the publication gate for this type. Discovery records remain outside the public index until primary evidence is complete.</p>}
  </div>;
}
