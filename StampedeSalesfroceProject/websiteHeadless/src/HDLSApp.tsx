import { useState } from "react";
import type { HDLSChatMessage } from "./types/HDLSChat";
import { HDLSStartChat, HDLSSendMessage } from "./lib/HDLSAgentApiClient";
import { HDLSAgentLauncherButton } from "./components/HDLSAgentLauncherButton";
import { HDLSAgentPopupPanel } from "./components/HDLSAgentPopupPanel";

function HDLSCreateMessage(role: HDLSChatMessage["role"], text: string): HDLSChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    text,
    createdAt: new Date().toISOString()
  };
}

export function HDLSApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<HDLSChatMessage[]>([
    HDLSCreateMessage(
      "assistant",
      "Hello. This is the websiteHeadless Agent API demo. Ask me anything."
    )
  ]);

  async function HDLSInitializeSession(): Promise<string | null> {
    if (sessionId) {
      return sessionId;
    }
    setError(null);
    setIsLoading(true);
    try {
      const session = await HDLSStartChat();
      setSessionId(session.sessionId);
      return session.sessionId;
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Unknown startup error");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function HDLSOpenChat() {
    setIsOpen(true);
    await HDLSInitializeSession();
  }

  async function HDLSHandleSend(message: string) {
    const activeSessionId = sessionId ?? (await HDLSInitializeSession());
    if (!activeSessionId) {
      return;
    }

    const userMessage = HDLSCreateMessage("user", message);
    setMessages((current) => [...current, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      const response = await HDLSSendMessage(activeSessionId, message);
      setMessages((current) => [...current, response.reply]);
    } catch (unknownError) {
      setError(unknownError instanceof Error ? unknownError.message : "Unknown messaging error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="hdls-page">
      <section className="hdls-content">
        <h1>websiteHeadless</h1>
        <p>
          Separate demo that uses Salesforce Agent API through a custom HDLS popup and backend
          proxy.
        </p>
      </section>
      <HDLSAgentLauncherButton onClick={HDLSOpenChat} />
      <HDLSAgentPopupPanel
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        hasSession={Boolean(sessionId)}
        error={error}
        onClose={() => setIsOpen(false)}
        onSend={HDLSHandleSend}
      />
    </main>
  );
}
