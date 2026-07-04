import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { sendChatMessage } from "../api/chatService";
import { parseAIResponse } from "../utils/parseAIResponse";

const IncidentContext = createContext(null);

const SESSION_ID = "user1";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text:
    "AegisOps supervisor online. Ask me to investigate an incident, pull a runbook, or summarize SOC activity — for example, **Investigate INC-101**.",
  timestamp: new Date().toISOString(),
};

export function IncidentProvider({ children }) {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeIncident, setActiveIncident] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim()) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const data = await sendChatMessage(SESSION_ID, text);
      const parsed = parseAIResponse(data);

      const assistantMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: parsed.rawText || data?.response || "No response received.",
        timestamp: new Date().toISOString(),
        parsed,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (parsed.hasStructuredData) {
        setActiveIncident(parsed);
      }
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          text: `Connection error: ${err.message}. Confirm the AegisOps backend is running and reachable.`,
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      messages,
      isTyping,
      activeIncident,
      error,
      sendMessage,
      sessionId: SESSION_ID,
    }),
    [messages, isTyping, activeIncident, error, sendMessage]
  );

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
}

export function useIncident() {
  const ctx = useContext(IncidentContext);
  if (!ctx) throw new Error("useIncident must be used within an IncidentProvider");
  return ctx;
}
