import type { VerificationState } from "@/lib/catalog";
export function StatusBadge({ state }: { state: VerificationState | "refreshing" | "evidence-ready" }) {
  const label = state.replace("-", " ");
  return <span className={`status status-${state}`}>{label}</span>;
}
