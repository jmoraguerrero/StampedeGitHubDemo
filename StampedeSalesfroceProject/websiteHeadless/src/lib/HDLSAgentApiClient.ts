import type { HDLSChatMessage, HDLSChatSession } from "../types/HDLSChat";

const HDLS_RAW_PROXY_BASE_URL = import.meta.env.VITE_HDLS_PROXY_BASE_URL;
const HDLS_PROXY_BASE_URL =
  HDLS_RAW_PROXY_BASE_URL?.trim() ||
  (import.meta.env.DEV ? "http://localhost:8787" : undefined);

interface HDLSStartResponse {
  sessionId: string;
}

interface HDLSMessageResponse {
  sessionId: string;
  reply: HDLSChatMessage;
}

async function HDLSReadError(response: Response, fallback: string): Promise<never> {
  let details = "";
  try {
    const payload = (await response.json()) as { error?: string };
    details = payload.error || "";
  } catch {
    details = await response.text();
  }

  const suffix = details ? ` - ${details}` : "";
  throw new Error(`${fallback}: ${response.status}${suffix}`);
}

function HDLSGetUrl(path: string): string {
  if (!HDLS_PROXY_BASE_URL) {
    throw new Error("VITE_HDLS_PROXY_BASE_URL is missing.");
  }

  if (HDLS_PROXY_BASE_URL.startsWith("/")) {
    throw new Error(
      "VITE_HDLS_PROXY_BASE_URL must be an absolute URL like http://localhost:8787."
    );
  }

  const base = HDLS_PROXY_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export async function HDLSStartChat(): Promise<HDLSChatSession> {
  const response = await fetch(HDLSGetUrl("/api/hdls/chat/start"), {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    await HDLSReadError(response, "Failed to start chat");
  }

  const payload = (await response.json()) as HDLSStartResponse;
  return { sessionId: payload.sessionId };
}

export async function HDLSSendMessage(
  sessionId: string,
  message: string
): Promise<HDLSMessageResponse> {
  const response = await fetch(HDLSGetUrl("/api/hdls/chat/message"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, message })
  });

  if (!response.ok) {
    await HDLSReadError(response, "Failed to send message");
  }

  return (await response.json()) as HDLSMessageResponse;
}
