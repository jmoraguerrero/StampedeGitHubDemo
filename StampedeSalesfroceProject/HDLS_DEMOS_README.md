# HDLS Demo Split

This repository now supports two separate demos:

- Existing Omni demo (unchanged).
- New Agent API demo:
  - Frontend: `websiteHeadless/`
  - Proxy backend: `websiteHeadless-hdls-proxy/`

## Safety rule

The Agent API demo is isolated and must not modify existing Omni demo files.

## Naming rule

All new Demo 2 artifacts use `HDLS` prefix except required framework filenames.

## Run locally

1. Start proxy (`websiteHeadless-hdls-proxy`):
   - copy `.env.example` to `.env`
   - `npm install`
   - `npm run dev`
2. Start frontend (`websiteHeadless`):
   - copy `.env.example` to `.env`
   - `npm install`
   - `npm run dev`

## Deploy

- Frontend deploy workflow: `.github/workflows/HDLSWebsiteHeadlessPages.yml`
- Configure repository secret: `VITE_HDLS_PROXY_BASE_URL`
- Deploy proxy separately to your preferred host.
