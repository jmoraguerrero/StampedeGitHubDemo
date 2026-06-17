# websiteHeadless-hdls-proxy

Backend proxy for the `websiteHeadless` Agent API demo.

## Why this exists

- Keeps Salesforce secrets out of the browser.
- Centralizes token handling and Agent API calls.

## Local run

1. Copy `.env.example` to `.env`.
2. Fill in Salesforce and Agent API values.
3. Install deps: `npm install`
4. Start dev server: `npm run dev`

The proxy exposes:

- `POST /api/hdls/chat/start`
- `POST /api/hdls/chat/message`
- `POST /api/hdls/chat/end`
- `GET /api/hdls/health`

## Troubleshooting 404 on start session

If you see `Failed to start chat: 500 - Start session failed with 404`, verify these settings in `.env`:

- `HDLS_SF_AGENT_API_BASE_URL` should be `https://api.salesforce.com` (or `https://api.gov.salesforce.com` for Gov Cloud).
- `HDLS_SF_AGENT_ID` must be your target agent ID (`0Xx...`).
- `HDLS_SF_MY_DOMAIN_URL` must be your org My Domain URL.
- `HDLS_SF_AGENT_API_START_PATH` should be `/einstein/ai-agent/v1/agents/{agentId}/sessions`.
- `HDLS_SF_AGENT_API_MESSAGE_PATH` should be `/einstein/ai-agent/v1/sessions/{sessionId}/messages`.
- Do not use embedded messaging SCRT2 URLs (`*.salesforce-scrt.com`) for this headless proxy flow.

Recommended example:

```env
HDLS_SF_AGENT_ID=0XxYOURAGENTID12345
HDLS_SF_MY_DOMAIN_URL=https://your-domain.my.salesforce.com
HDLS_SF_AGENT_API_BASE_URL=https://api.salesforce.com
HDLS_SF_AGENT_API_START_PATH=/einstein/ai-agent/v1/agents/{agentId}/sessions
HDLS_SF_AGENT_API_MESSAGE_PATH=/einstein/ai-agent/v1/sessions/{sessionId}/messages
```
