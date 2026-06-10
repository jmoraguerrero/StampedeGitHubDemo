import { useState } from 'react'
import { Bot, CalendarDays, CheckCircle2, MapPin, Sparkles, Ticket } from 'lucide-react'
import { AgentforceChat } from './components/AgentforceChat'
import { CartPanel } from './components/CartPanel'
import { Hero } from './components/Hero'
import { McpGeminiPanel } from './components/McpGeminiPanel'
import { SalesforceConsole } from './components/SalesforceConsole'
import { SectionTabs, type SectionId } from './components/SectionTabs'
import type { Scenario } from './data/demoScript'

function App() {
  const [scenario, setScenario] = useState<Scenario>('b2b')
  const [step, setStep] = useState(1)
  const [activeSection, setActiveSection] = useState<SectionId>('demo')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleScenarioChange = (nextScenario: Scenario) => {
    setScenario(nextScenario)
    setStep(1)
  }

  const openChat = () => {
    setIsChatOpen(true)
    setActiveSection('demo')
    document.getElementById('demo-stage')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-stampede-cream text-stampede-charcoal">
      <Hero onPlanClick={openChat} />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <ValueCard
            icon={Bot}
            title="Conversational Planning"
            text="Handles multi-intent visitor requests without rigid menus or long forms."
          />
          <ValueCard
            icon={CheckCircle2}
            title="CRM-Ready Capture"
            text="Shows how unstructured chat becomes structured lead and inventory data."
          />
          <ValueCard
            icon={Sparkles}
            title="Future MCP Layer"
            text="Frames how external assistants can call Salesforce-backed Stampede tools."
          />
        </section>

        <section id="demo-stage" className="overflow-hidden rounded-3xl border border-stampede-border bg-white shadow-sm">
          <SectionTabs activeSection={activeSection} onSectionChange={setActiveSection} />
          <div className="p-5 md:p-8">
            {activeSection === 'demo' ? (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                <AgentforceChat
                  scenario={scenario}
                  step={step}
                  onScenarioChange={handleScenarioChange}
                  onStepChange={setStep}
                />
                {scenario === 'b2b' ? <SalesforceConsole step={step} /> : <CartPanel step={step} />}
              </div>
            ) : null}

            {activeSection === 'crm' ? (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                <div className="rounded-3xl border border-stampede-border bg-stampede-cream/60 p-6">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-stampede-red/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-stampede-red">
                    <Ticket className="h-4 w-4" />
                    Under the hood
                  </div>
                  <h2 className="font-serif text-3xl font-bold md:text-4xl">
                    Conversation becomes action in Salesforce.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                    The static console mirrors the proof moment in the demo script. As the B2B
                    conversation advances, the lead fields fill in, priority rises, and Infield
                    Suites inventory moves to hold for July 9.
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <ProofPill label="Lead" value="Sarah Jenkins" />
                    <ProofPill label="Venue" value="Infield Suites" />
                    <ProofPill label="Inventory" value="Hold" />
                  </div>
                </div>
                <SalesforceConsole step={3} />
              </div>
            ) : null}

            {activeSection === 'mcp' ? <McpGeminiPanel /> : null}
          </div>
        </section>

        <section className="mt-8 grid gap-6 rounded-3xl border border-stampede-border bg-white p-6 shadow-sm md:grid-cols-3">
          <FooterHighlight icon={CalendarDays} label="Demo date" value="July 9, 2026" />
          <FooterHighlight icon={MapPin} label="Featured venue" value="Infield Suites" />
          <FooterHighlight icon={Ticket} label="Cart save moment" value="$100 optimized" />
        </section>
      </main>

      <button
        type="button"
        onClick={openChat}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-stampede-red px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-stampede-red/30 transition hover:bg-stampede-dark-red"
      >
        <Bot className="h-5 w-5" />
        Plan Your Visit
      </button>

      {isChatOpen ? (
        <AgentforceChat
          scenario={scenario}
          step={step}
          isFloating
          onScenarioChange={handleScenarioChange}
          onStepChange={setStep}
          onClose={() => setIsChatOpen(false)}
        />
      ) : null}
    </div>
  )
}

type IconComponent = typeof Bot

type ValueCardProps = {
  icon: IconComponent
  title: string
  text: string
}

function ValueCard({ icon: Icon, title, text }: ValueCardProps) {
  return (
    <article className="rounded-3xl border border-stampede-border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-stampede-red/10 text-stampede-red">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="font-serif text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-gray-600">{text}</p>
    </article>
  )
}

type ProofPillProps = {
  label: string
  value: string
}

function ProofPill({ label, value }: ProofPillProps) {
  return (
    <div className="rounded-2xl border border-stampede-border bg-white p-4">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stampede-red">{label}</div>
      <div className="mt-1 font-serif text-lg font-bold">{value}</div>
    </div>
  )
}

type FooterHighlightProps = {
  icon: IconComponent
  label: string
  value: string
}

function FooterHighlight({ icon: Icon, label, value }: FooterHighlightProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stampede-gold/20 text-yellow-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</div>
        <div className="font-serif text-lg font-bold">{value}</div>
      </div>
    </div>
  )
}

export default App
