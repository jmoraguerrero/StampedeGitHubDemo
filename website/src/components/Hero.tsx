import { Bot, CalendarDays, Sparkles, Ticket } from 'lucide-react'

type HeroProps = {
  onPlanClick: () => void
}

export function Hero({ onPlanClick }: HeroProps) {
  return (
    <header className="relative overflow-hidden border-b-4 border-stampede-gold bg-stampede-dark-red text-white">
      <div className="stampede-pattern absolute inset-0 opacity-60" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stampede-gold/40 bg-stampede-red px-3 py-1 text-xs font-bold uppercase tracking-[0.22em]">
            <Sparkles className="h-3.5 w-3.5 text-stampede-gold" />
            Agentforce demo
          </div>
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Plan the greatest outdoor show on earth.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-8 text-stampede-light-gold md:text-xl">
            A static first draft of a Calgary Stampede conversational planner that turns natural
            language into CRM leads, optimized carts, and future MCP-powered recommendations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onPlanClick}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-stampede-gold px-6 py-3 text-sm font-bold text-stampede-charcoal shadow-lg shadow-black/20 transition hover:bg-stampede-light-gold"
            >
              <Bot className="h-4 w-4" />
              Plan Your Visit
            </button>
            <a
              href="#demo-stage"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-stampede-gold hover:text-stampede-light-gold"
            >
              <Ticket className="h-4 w-4" />
              View Demo Flow
            </a>
          </div>
        </div>

        <div className="grid w-full max-w-md gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:shrink-0">
          {[
            ['Corporate Hospitality', '45-person outing, private suite, catering'],
            ['Family Ticketing', 'Cart correction, savings, parking upsell'],
            ['MCP Future State', 'Gemini asks, Salesforce answers'],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-stampede-gold" />
                <div>
                  <div className="font-serif text-lg font-bold">{title}</div>
                  <div className="text-sm text-white/70">{detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
