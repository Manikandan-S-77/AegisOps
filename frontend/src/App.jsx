import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import Incidents from "./pages/Incidents";
import Runbooks from "./pages/Runbooks";
import Tickets from "./pages/Tickets";
import KnowledgeRisks from "./pages/KnowledgeRisks";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { IncidentProvider } from "./context/IncidentContext";

export default function App() {
  return (
    <IncidentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/runbooks" element={<Runbooks />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/knowledge-risks" element={<KnowledgeRisks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IncidentProvider>
  );
}
