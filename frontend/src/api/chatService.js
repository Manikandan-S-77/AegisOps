import apiClient from "./client";


export async function checkHealth() {
  const { data } = await apiClient.get("/");
  return data;
}


export async function sendChatMessage(sessionId, message) {
  const { data } = await apiClient.post("/chat", {
    session_id: sessionId,
    message,
  });
  return data;
}
