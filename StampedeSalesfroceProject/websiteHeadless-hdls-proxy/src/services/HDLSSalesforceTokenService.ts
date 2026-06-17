import type { HDLSEnvConfig } from "../types/HDLSEnv.js";

interface HDLSTokenResponse {
  access_token: string;
  expires_in?: number;
}

interface HDLSOAuthErrorResponse {
  error?: string;
  error_description?: string;
}

export class HDLSSalesforceTokenService {
  private readonly env: HDLSEnvConfig;
  private cachedToken: string | null = null;
  private tokenExpiresAtMs = 0;

  constructor(env: HDLSEnvConfig) {
    this.env = env;
  }

  async HDLSGetAccessToken(): Promise<string> {
    if (this.cachedToken && Date.now() < this.tokenExpiresAtMs - 30_000) {
      return this.cachedToken;
    }

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.env.HDLS_SF_CLIENT_ID,
      client_secret: this.env.HDLS_SF_CLIENT_SECRET
    });

    const response = await fetch(this.env.HDLS_SF_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });

    if (!response.ok) {
      let details = "";
      try {
        const payload = (await response.json()) as HDLSOAuthErrorResponse;
        details = payload.error_description || payload.error || "";
      } catch {
        details = await response.text();
      }
      const suffix = details ? ` - ${details}` : "";
      throw new Error(`Token request failed with ${response.status}${suffix}`);
    }

    const payload = (await response.json()) as HDLSTokenResponse;
    this.cachedToken = payload.access_token;
    this.tokenExpiresAtMs = Date.now() + (payload.expires_in ?? 300) * 1000;
    return payload.access_token;
  }
}
