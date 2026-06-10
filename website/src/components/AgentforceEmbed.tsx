import { useEffect, useMemo, useState } from 'react'
import { Bot, CheckCircle2, ExternalLink, Loader2, Settings, X } from 'lucide-react'

declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      settings: Record<string, unknown>
      init: (
        orgId: string,
        deploymentName: string,
        siteUrl: string,
        options?: Record<string, unknown>,
      ) => void
    }
  }
}

type AgentforceEmbedProps = {
  onClose: () => void
}

type AgentforceConfig = {
  bootstrapUrl: string
  orgId: string
  deploymentName: string
  siteUrl: string
  scrt2Url: string
}

export function AgentforceEmbed({ onClose }: AgentforceEmbedProps) {
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')

  const config = useMemo<AgentforceConfig>(
    () => ({
      bootstrapUrl: import.meta.env.VITE_AGENTFORCE_BOOTSTRAP_URL ?? '',
      orgId: import.meta.env.VITE_AGENTFORCE_ORG_ID ?? '',
      deploymentName: import.meta.env.VITE_AGENTFORCE_DEPLOYMENT_NAME ?? '',
      siteUrl: import.meta.env.VITE_AGENTFORCE_SITE_URL ?? '',
      scrt2Url: import.meta.env.VITE_AGENTFORCE_SCRT2_URL ?? '',
    }),
    [],
  )

  const missingKeys = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => envKeyForConfigKey(key as keyof AgentforceConfig))

  useEffect(() => {
    if (missingKeys.length > 0) {
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${config.bootstrapUrl}"]`,
    )

    const initializeAgent = () => {
      try {
        if (!window.embeddedservice_bootstrap) {
          setLoadState('error')
          return
        }

        window.embeddedservice_bootstrap.settings.language = 'en_US'
        window.embeddedservice_bootstrap.init(config.orgId, config.deploymentName, config.siteUrl, {
          scrt2URL: config.scrt2Url,
        })
        setLoadState('ready')
      } catch (error) {
        console.error('Agentforce embedded messaging failed to initialize.', error)
        setLoadState('error')
      }
    }

    setLoadState('loading')

    if (existingScript) {
      initializeAgent()
      return
    }

    const script = document.createElement('script')
    script.src = config.bootstrapUrl
    script.async = true
    script.onload = initializeAgent
    script.onerror = () => setLoadState('error')
    document.body.appendChild(script)
  }, [config, missingKeys.length])

  return (
    <section
      className="fixed bottom-6 right-6 z-50 w-[min(92vw,440px)] overflow-hidden rounded-3xl border border-stampede-border bg-white shadow-2xl"
      aria-label="Agentforce embedded chat"
    >
      <div className="flex items-center justify-between border-b border-stampede-border bg-stampede-charcoal px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stampede-red">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-stampede-gold">
              Live Agentforce
            </div>
            <div className="font-serif text-xl font-bold">Plan Your Visit</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 p-5">
        {missingKeys.length > 0 ? (
          <SetupRequired missingKeys={missingKeys} />
        ) : (
          <EmbedStatus loadState={loadState} />
        )}
      </div>
    </section>
  )
}

function SetupRequired({ missingKeys }: { missingKeys: string[] }) {
  return (
    <div className="rounded-2xl border border-stampede-border bg-stampede-cream p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-stampede-red">
        <Settings className="h-4 w-4" />
        Agentforce embed configuration needed
      </div>
      <p className="text-sm leading-6 text-gray-700">
        Add the embedded messaging values from Salesforce to a local `.env` file or GitHub Pages
        environment before this widget loads the live agent.
      </p>
      <div className="mt-4 space-y-2">
        {missingKeys.map((key) => (
          <div key={key} className="rounded-lg bg-white px-3 py-2 font-mono text-xs text-gray-700">
            {key}
          </div>
        ))}
      </div>
      <a
        href="https://help.salesforce.com/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-stampede-red hover:text-stampede-dark-red"
      >
        Open Salesforce Help
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}

function EmbedStatus({ loadState }: { loadState: 'idle' | 'loading' | 'ready' | 'error' }) {
  if (loadState === 'ready') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
        <CheckCircle2 className="h-5 w-5" />
        Agentforce embedded messaging initialized.
      </div>
    )
  }

  if (loadState === 'error') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
        The Agentforce embed script could not initialize. Check the Salesforce embed snippet values
        and allowed domains.
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stampede-border bg-stampede-cream p-4 text-sm font-bold text-gray-700">
      <Loader2 className="h-5 w-5 animate-spin text-stampede-red" />
      Loading Agentforce embedded messaging...
    </div>
  )
}

function envKeyForConfigKey(key: keyof AgentforceConfig) {
  const envKeys: Record<keyof AgentforceConfig, string> = {
    bootstrapUrl: 'VITE_AGENTFORCE_BOOTSTRAP_URL',
    orgId: 'VITE_AGENTFORCE_ORG_ID',
    deploymentName: 'VITE_AGENTFORCE_DEPLOYMENT_NAME',
    siteUrl: 'VITE_AGENTFORCE_SITE_URL',
    scrt2Url: 'VITE_AGENTFORCE_SCRT2_URL',
  }

  return envKeys[key]
}
