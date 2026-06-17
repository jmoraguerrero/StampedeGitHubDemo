export interface HDLSEnvConfig {
  HDLS_PORT: number;
  HDLS_ALLOWED_ORIGIN: string;
  HDLS_SF_LOGIN_URL: string;
  HDLS_SF_CLIENT_ID: string;
  HDLS_SF_CLIENT_SECRET: string;
  HDLS_SF_AGENT_ID: string;
  HDLS_SF_MY_DOMAIN_URL: string;
  HDLS_SF_AGENT_API_BASE_URL: string;
  HDLS_SF_AGENT_API_START_PATH: string;
  HDLS_SF_AGENT_API_MESSAGE_PATH: string;
}

export function HDLSLoadEnv(): HDLSEnvConfig {
  const required = [
    "HDLS_ALLOWED_ORIGIN",
    "HDLS_SF_LOGIN_URL",
    "HDLS_SF_CLIENT_ID",
    "HDLS_SF_CLIENT_SECRET",
    "HDLS_SF_AGENT_ID",
    "HDLS_SF_MY_DOMAIN_URL",
    "HDLS_SF_AGENT_API_BASE_URL",
    "HDLS_SF_AGENT_API_START_PATH",
    "HDLS_SF_AGENT_API_MESSAGE_PATH"
  ];

  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }

  const agentApiBaseUrl = process.env.HDLS_SF_AGENT_API_BASE_URL!;
  let parsedBaseUrl: URL;
  try {
    parsedBaseUrl = new URL(agentApiBaseUrl);
  } catch {
    throw new Error("HDLS_SF_AGENT_API_BASE_URL must be an absolute URL.");
  }
  if (!["http:", "https:"].includes(parsedBaseUrl.protocol)) {
    throw new Error("HDLS_SF_AGENT_API_BASE_URL must use http or https.");
  }

  const startPath = process.env.HDLS_SF_AGENT_API_START_PATH!;
  const messagePath = process.env.HDLS_SF_AGENT_API_MESSAGE_PATH!;
  const loginUrl = process.env.HDLS_SF_LOGIN_URL!;
  const myDomainUrl = process.env.HDLS_SF_MY_DOMAIN_URL!;

  let parsedLoginUrl: URL;
  let parsedMyDomainUrl: URL;
  try {
    parsedLoginUrl = new URL(loginUrl);
    parsedMyDomainUrl = new URL(myDomainUrl);
  } catch {
    throw new Error("HDLS_SF_LOGIN_URL and HDLS_SF_MY_DOMAIN_URL must be absolute URLs.");
  }

  if (parsedLoginUrl.protocol !== "https:" || parsedMyDomainUrl.protocol !== "https:") {
    throw new Error("HDLS_SF_LOGIN_URL and HDLS_SF_MY_DOMAIN_URL must use https.");
  }
  if (parsedLoginUrl.hostname !== parsedMyDomainUrl.hostname) {
    throw new Error(
      "HDLS_SF_LOGIN_URL and HDLS_SF_MY_DOMAIN_URL must target the same org hostname."
    );
  }

  if (!startPath.trim() || !messagePath.trim()) {
    throw new Error("HDLS_SF_AGENT_API_START_PATH and HDLS_SF_AGENT_API_MESSAGE_PATH cannot be empty.");
  }
  if (startPath.includes("://") || messagePath.includes("://")) {
    throw new Error("HDLS_SF_AGENT_API_START_PATH and HDLS_SF_AGENT_API_MESSAGE_PATH must be relative paths.");
  }
  if (startPath === "/" || messagePath === "/") {
    throw new Error("HDLS_SF_AGENT_API_START_PATH and HDLS_SF_AGENT_API_MESSAGE_PATH must include endpoint segments.");
  }
  if (!/^0Xx[a-zA-Z0-9]{15}$/.test(process.env.HDLS_SF_AGENT_ID!)) {
    throw new Error("HDLS_SF_AGENT_ID must be a valid Agentforce ID (starts with 0Xx and is 18 chars).");
  }

  return {
    HDLS_PORT: Number(process.env.HDLS_PORT || "8787"),
    HDLS_ALLOWED_ORIGIN: process.env.HDLS_ALLOWED_ORIGIN!,
    HDLS_SF_LOGIN_URL: process.env.HDLS_SF_LOGIN_URL!,
    HDLS_SF_CLIENT_ID: process.env.HDLS_SF_CLIENT_ID!,
    HDLS_SF_CLIENT_SECRET: process.env.HDLS_SF_CLIENT_SECRET!,
    HDLS_SF_AGENT_ID: process.env.HDLS_SF_AGENT_ID!,
    HDLS_SF_MY_DOMAIN_URL: process.env.HDLS_SF_MY_DOMAIN_URL!,
    HDLS_SF_AGENT_API_BASE_URL: agentApiBaseUrl,
    HDLS_SF_AGENT_API_START_PATH: startPath,
    HDLS_SF_AGENT_API_MESSAGE_PATH: messagePath
  };
}
