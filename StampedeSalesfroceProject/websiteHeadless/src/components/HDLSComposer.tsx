import { FormEvent, useState } from "react";

interface HDLSComposerProps {
  onSend: (message: string) => Promise<void>;
  disabled: boolean;
}

export function HDLSComposer({ onSend, disabled }: HDLSComposerProps) {
  const [draft, setDraft] = useState("");

  async function HDLSHandleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || disabled) {
      return;
    }

    setDraft("");
    await onSend(trimmed);
  }

  return (
    <form className="hdls-composer" onSubmit={HDLSHandleSubmit}>
      <input
        className="hdls-input"
        value={draft}
        placeholder="Ask the Agentforce API..."
        onChange={(event) => setDraft(event.target.value)}
        disabled={disabled}
      />
      <button className="hdls-send-button" type="submit" disabled={disabled}>
        Send
      </button>
    </form>
  );
}
