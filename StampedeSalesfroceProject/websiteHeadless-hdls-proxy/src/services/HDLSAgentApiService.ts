import type { HDLSEnvConfig } from "../types/HDLSEnv.js";
import { HDLSSalesforceTokenService } from "./HDLSSalesforceTokenService.js";

export interface HDLSAgentReply {
  sessionId: string;
  text: string;
}

export class HDLSAgentApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HDLSAgentApiError";
    this.status = status;
  }
}

export class HDLSAgentApiService {
  private readonly env: HDLSEnvConfig;
  private readonly tokenService: HDLSSalesforceTokenService;

  constructor(env: HDLSEnvConfig, tokenService: HDLSSalesforceTokenService) {
    this.env = env;
    this.tokenService = tokenService;
  }

  private HDLSBuildEndpoint(baseUrl: string, path: string): string {
    const normalizedBase = baseUrl.replace(/\/+$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${normalizedBase}${normalizedPath}`;
  }

  private async HDLSReadErrorDetails(response: Response): Promise<string> {
    try {
      const payload = (await response.clone().json()) as { message?: string; error?: string };
      return payload.message || payload.error || "";
    } catch {
      return await response.text();
    }
  }

  async HDLSStartSession(): Promise<string> {
    const token = await this.tokenService.HDLSGetAccessToken();
    const startPath = this.env.HDLS_SF_AGENT_API_START_PATH.replace(
      "{agentId}",
      this.env.HDLS_SF_AGENT_ID
    );
    const endpoint = this.HDLSBuildEndpoint(
      this.env.HDLS_SF_AGENT_API_BASE_URL,
      startPath
    );

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        externalSessionKey: crypto.randomUUID(),
        instanceConfig: {
          endpoint: this.env.HDLS_SF_MY_DOMAIN_URL
        },
        streamingCapabilities: {
          chunkTypes: ["Text"]
        },
        bypassUser: true
      })
    });

    if (!response.ok) {
      const details = await this.HDLSReadErrorDetails(response);
      const suffix = details ? ` - ${details}` : "";
      throw new HDLSAgentApiError(
        `Start session failed with ${response.status} at ${endpoint}${suffix}`,
        response.status
      );
    }

    const payload = (await response.json()) as { sessionId?: string };
    return payload.sessionId || crypto.randomUUID();
  }

  async HDLSSendMessage(sessionId: string, message: string): Promise<HDLSAgentReply> {
    const token = await this.tokenService.HDLSGetAccessToken();
    const messagePath = this.env.HDLS_SF_AGENT_API_MESSAGE_PATH.replace("{sessionId}", sessionId);
    const endpoint = this.HDLSBuildEndpoint(
      this.env.HDLS_SF_AGENT_API_BASE_URL,
      messagePath
    );

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: {
          sequenceId: Date.now(),
          type: "Text",
          text: message
        }
      })
    });

    if (!response.ok) {
      const details = await this.HDLSReadErrorDetails(response);
      const suffix = details ? ` - ${details}` : "";
      throw new HDLSAgentApiError(
        `Message request failed with ${response.status} at ${endpoint}${suffix}`,
        response.status
      );
    }

    const payload = (await response.json()) as {
      sessionId?: string;
      reply?: string;
      text?: string;
      messages?: Array<{ type?: string; message?: string }>;
    };
    const informMessage =
      payload.messages?.find((entry) => entry.type === "Inform")?.message || "";
    return {
      sessionId: payload.sessionId || sessionId,
      text: informMessage || payload.reply || payload.text || "No response text returned by Agent API."
    };
  }
}
