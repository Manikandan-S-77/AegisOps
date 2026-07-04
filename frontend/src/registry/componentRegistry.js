import IncidentSummaryCard from "../components/cards/IncidentSummaryCard";
import SeverityCard from "../components/cards/SeverityCard";
import RecoveryStepsCard from "../components/cards/RecoveryStepsCard";
import RunbookCard from "../components/cards/RunbookCard";
import TicketCard from "../components/cards/TicketCard";
import RecommendationCard from "../components/cards/RecommendationCard";

/**
 * Component Registry
 * -------------------
 * This is the single mapping between a string key (as decided by the AI /
 * returned by the backend's `ui` array) and the React component that
 * renders it.
 *
 * This is the ONLY file that needs to change when a new card type is
 * introduced. Neither the renderer nor the backend contract needs to know
 * anything about React imports or file paths — they just deal in string
 * keys like "SeverityCard".
 *
 * Every registered component must accept a single `incident` prop
 * containing whatever fields it needs (they already do — no changes were
 * made to the card components themselves).
 */
const componentRegistry = {
  IncidentSummaryCard,
  SeverityCard,
  RecoveryStepsCard,
  RunbookCard,
  TicketCard,
  RecommendationCard,
};

export default componentRegistry;
