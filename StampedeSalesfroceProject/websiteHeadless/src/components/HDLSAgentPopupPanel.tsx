import type { HDLSChatMessage } from "../types/HDLSChat";
import { HDLSComposer } from "./HDLSComposer";
import { HDLSConnectionStatus } from "./HDLSConnectionStatus";
import { HDLSMessageList } from "./HDLSMessageList";

interface HDLSAgentPopupPanelProps {
  isOpen: boolean;
  messages: HDLSChatMessage[];
  isLoading: boolean;
  hasSession: boolean;
  error: string | null;
  onClose: () => void;
  onSend: (message: string) => Promise<void>;
}

export function HDLSAgentPopupPanel({
  isOpen,
  messages,
  isLoading,
  hasSession,
  error,
  onClose,
  onSend
}: HDLSAgentPopupPanelProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className="hdls-popup-panel">
      <header className="hdls-popup-header">
        <h2>websiteHeadless Agent API Demo</h2>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </header>
      <HDLSConnectionStatus isLoading={isLoading} error={error} />
      <HDLSMessageList messages={messages} />
      <HDLSComposer onSend={onSend} disabled={isLoading || !hasSession} />
    </aside>
  );
}
