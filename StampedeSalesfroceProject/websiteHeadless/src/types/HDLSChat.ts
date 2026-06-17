export type HDLSRole = "user" | "assistant" | "system";

export interface HDLSChatMessage {
  id: string;
  role: HDLSRole;
  text: string;
  createdAt: string;
}

export interface HDLSChatSession {
  sessionId: string;
}
