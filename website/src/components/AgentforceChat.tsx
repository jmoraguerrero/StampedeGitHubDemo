import { Building2, Send, ShoppingCart, X } from 'lucide-react'
import type { DemoStep, Scenario } from '../data/demoScript'
import { b2bSteps, b2cSteps } from '../data/demoScript'

type AgentforceChatProps = {
  scenario: Scenario
  step: number
  isFloating?: boolean
  onScenarioChange: (scenario: Scenario) => void
  onStepChange: (step: number) => void
  onClose?: () => void
}

export function AgentforceChat({
  scenario,
  step,
  isFloating = false,
  onScenarioChange,
  onStepChange,
  onClose,
}: AgentforceChatProps) {
  const steps = scenario === 'b2b' ? b2bSteps : b2cSteps
  const activeStep = steps.find((item) => item.id === step) ?? steps[0]
  const visibleSteps = steps.filter((item) => item.id <= activeStep.id)

  return (
    <section
      className={`overflow-hidden rounded-3xl border border-stampede-border bg-white shadow-xl ${
        isFloating ? 'fixed bottom-6 right-6 z-50 w-[min(92vw,560px)]' : ''
      }`}
      aria-label="Agentforce chat demo"
    >
      <div className="flex items-center justify-between border-b border-stampede-border bg-stampede-charcoal px-5 py-4 text-white">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-stampede-gold">
            Agentforce Concierge
          </div>
          <div className="font-serif text-xl font-bold">Plan Your Visit</div>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 border-b border-stampede-border bg-stampede-cream/70 p-4 md:grid-cols-2">
        <ScenarioButton
          active={scenario === 'b2b'}
          icon={Building2}
          label="B2B Corporate Lead"
          onClick={() => onScenarioChange('b2b')}
        />
        <ScenarioButton
          active={scenario === 'b2c'}
          icon={ShoppingCart}
          label="B2C Ticket Cart"
          onClick={() => onScenarioChange('b2c')}
        />
      </div>

      <div className="custom-scrollbar flex gap-2 overflow-x-auto border-b border-stampede-border p-4">
        {steps.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onStepChange(item.id)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition ${
              item.id === activeStep.id
                ? 'border-stampede-red bg-stampede-red text-white'
                : 'border-stampede-border bg-white text-gray-600 hover:text-stampede-red'
            }`}
          >
            Step {item.id}: {item.title}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-stampede-border bg-gray-50 px-5 py-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-stampede-red">
            {activeStep.eyebrow}
          </div>
          <div className="text-sm font-semibold text-stampede-charcoal">{activeStep.title}</div>
        </div>
        <div className="rounded-full bg-stampede-red/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-stampede-red">
          {activeStep.status}
        </div>
      </div>

      <div className="custom-scrollbar max-h-[560px] space-y-6 overflow-y-auto p-5">
        {visibleSteps.map((item) => (
          <ChatStep key={item.id} step={item} />
        ))}
      </div>

      <div className="border-t border-stampede-border bg-white p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-stampede-border bg-stampede-cream px-4 py-3 text-sm text-gray-500">
          <span className="flex-1">Presenter-controlled static script</span>
          <Send className="h-4 w-4 text-stampede-red" />
        </div>
      </div>
    </section>
  )
}

type ScenarioButtonProps = {
  active: boolean
  icon: typeof Building2
  label: string
  onClick: () => void
}

function ScenarioButton({ active, icon: Icon, label, onClick }: ScenarioButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-bold transition ${
        active
          ? 'border-stampede-red bg-stampede-red/10 text-stampede-red'
          : 'border-transparent bg-white text-gray-500 hover:text-stampede-red'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function ChatStep({ step: demoStep }: { step: DemoStep }) {
  return (
    <div className="space-y-4">
      {demoStep.messages.map((message, index) => {
        const isAgent = message.speaker === 'agent'

        return (
          <div
            key={`${demoStep.id}-${message.speaker}-${index}`}
            className={`flex items-start gap-3 ${isAgent ? 'ml-auto max-w-[88%] flex-row-reverse' : 'max-w-[88%]'}`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isAgent ? 'bg-stampede-red text-white' : 'bg-stampede-gold text-stampede-charcoal'
              }`}
            >
              {isAgent ? 'A' : 'U'}
            </div>
            <div
              className={`rounded-2xl p-4 text-sm leading-6 shadow-sm ${
                isAgent
                  ? 'rounded-tr-none bg-stampede-red text-white'
                  : 'rounded-tl-none border border-stampede-border bg-stampede-cream text-stampede-charcoal'
              }`}
            >
              {message.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}
