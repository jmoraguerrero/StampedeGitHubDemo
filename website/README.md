# Calgary Stampede Agentforce Demo

This is a Vite React app. Do not open `index.html` directly from the file system because browser security rules block module loading from `file://` URLs.

Run it locally with:

```powershell
npm install
npm run start
```

Then open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173/
```

For a production-style check:

```powershell
npm run build
npm run preview
```

## Agentforce Embed Configuration

The scripted conversations stay on the page as examples. The floating `Plan Your Visit` widget
loads Salesforce Embedded Messaging / Agentforce from environment variables.

Create a local `.env` file from `.env.example` and fill in the values from your Salesforce embedded
messaging snippet:

```powershell
copy .env.example .env
```

Required values:

```text
VITE_AGENTFORCE_BOOTSTRAP_URL=
VITE_AGENTFORCE_ORG_ID=
VITE_AGENTFORCE_DEPLOYMENT_NAME=
VITE_AGENTFORCE_SITE_URL=
VITE_AGENTFORCE_SCRT2_URL=
```

For GitHub Pages, add the same values as repository variables or secrets and expose them during the
workflow build before running `npm run build`.
