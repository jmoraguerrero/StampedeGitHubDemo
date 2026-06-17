# websiteHeadless

This is the second demo app (Agent API path) and is intentionally separate from the Omni demo.

## Local run

1. Copy `.env.example` to `.env`.
2. Set `VITE_HDLS_PROXY_BASE_URL` to your proxy URL.
3. Install deps: `npm install`
4. Start: `npm run dev`

## GitHub Pages

- Build/deploy uses the root workflow `HDLSWebsiteHeadlessPages.yml`.
- Set `HDLS_VITE_BASE_PATH` for repository pages path (example `/websiteHeadless/`).
