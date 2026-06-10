import { Bot, CheckCircle2, Network, ServerCog, Sparkles } from 'lucide-react'
import { mcpPrompt, mcpResponse, mcpToolCalls } from '../data/demoScript'

export function McpGeminiPanel() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]" aria-label="MCP future demo">
      <div className="rounded-3xl border border-stampede-border bg-white p-6 shadow-sm">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-stampede-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">
          <Sparkles className="h-4 w-4" />
          Future agentic connectivity
        </div>
        <h2 className="font-serif text-3xl font-bold text-stampede-charcoal md:text-4xl">
          Gemini asks. MCP routes. Salesforce answers.
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-600">
          This static panel shows the future-state story from the demo script: external assistants can
          call Stampede MCP tools that expose Salesforce-backed catalog, inventory, and lead creation
          capabilities.
        </p>

        <div className="mt-6 rounded-2xl border border-stampede-border bg-stampede-cream p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stampede-red">
            <Bot className="h-4 w-4" />
            Gemini prompt
          </div>
          <p className="font-serif text-xl font-semibold leading-8 text-stampede-charcoal">
            "{mcpPrompt}"
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-stampede-gold/30 bg-stampede-charcoal p-6 text-white shadow-xl">
        <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
          <ServerCog className="h-5 w-5 text-stampede-gold" />
          <div>
            <div className="font-serif text-xl font-bold">Stampede MCP Server</div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-stampede-gold">
              Tool execution log
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {mcpToolCalls.map((call) => (
            <div key={call.tool} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-stampede-gold">
                <Network className="h-4 w-4" />
                {call.tool}
              </div>
              <div className="grid gap-2 text-xs text-white/70 md:grid-cols-2">
                <div>
                  <span className="font-bold text-white">Input:</span> {call.input}
                </div>
                <div>
                  <span className="font-bold text-white">Output:</span> {call.output}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-green-700/70 bg-green-900/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            Structured response
          </div>
          <p className="text-sm leading-7 text-white/85">{mcpResponse}</p>
        </div>
      </div>
    </section>
  )
}
