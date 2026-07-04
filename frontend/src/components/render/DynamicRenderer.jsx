import { AnimatePresence } from "framer-motion";
import componentRegistry from "../../registry/componentRegistry";

/**
 * DynamicRenderer
 * ----------------
 * The core of AegisOps's AI-driven UI (AG-UI style architecture).
 *
 * The backend/AI decides WHAT should appear on screen by returning an
 * ordered list of component keys (`plan`), e.g.:
 *
 *   ["IncidentSummaryCard", "SeverityCard", "RecommendationCard"]
 *
 * This component's only job is to look each key up in the
 * `componentRegistry` and render it with the shared `data` object. It has
 * NO knowledge of incident-response domain logic, no hardcoded scenarios,
 * and no fixed layouts — it is a pure rendering engine.
 *
 * Unknown component keys (e.g. a newer key an older frontend build
 * doesn't recognize yet) are skipped safely with a console warning
 * instead of crashing the workspace, so the frontend degrades gracefully
 * as the backend's UI vocabulary evolves.
 *
 * Props:
 *   plan: string[]   - ordered component keys chosen by the AI
 *   data: object     - shared data passed as the `incident` prop to
 *                       every rendered component
 */
export default function DynamicRenderer({ plan = [], data = {} }) {
  const resolved = plan
    .map((key) => ({ key, Component: componentRegistry[key] }))
    .filter(({ key, Component }) => {
      if (!Component) {
        console.warn(`[DynamicRenderer] Unknown component key "${key}" — skipping.`);
        return false;
      }
      return true;
    });

  if (resolved.length === 0) return null;

  return (
    <AnimatePresence mode="popLayout">
      {resolved.map(({ key, Component }) => (
        <Component key={key} incident={data} />
      ))}
    </AnimatePresence>
  );
}
