import { CheckCircle2, Database, ShieldCheck, Users } from 'lucide-react'
import type { LeadSnapshot } from '../data/demoScript'
import { leadSnapshots } from '../data/demoScript'

type SalesforceConsoleProps = {
  step: number
}

const fields: Array<{ key: keyof LeadSnapshot; label: string }> = [
  { key: 'name', label: 'Lead Name' },
  { key: 'company', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'date', label: 'Preferred Date' },
  { key: 'venue', label: 'Venue' },
  { key: 'groupSize', label: 'Group Size' },
  { key: 'status', label: 'Status' },
]

export function SalesforceConsole({ step }: SalesforceConsoleProps) {
  const lead = leadSnapshots[step] ?? leadSnapshots[1]
  const isCreated = step >= 3

  return (
    <aside className="sticky top-6 rounded-3xl border border-stampede-gold/30 bg-stampede-charcoal p-6 text-white shadow-xl">
      <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4 text-stampede-gold">
        <Database className="h-5 w-5" />
        <div>
          <div className="font-serif text-xl font-bold text-white">Salesforce CRM Console</div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-stampede-gold">
            Structured from conversation
          </div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <Metric icon={Users} label="Lead score" value={isCreated ? 'High' : 'Rising'} />
        <Metric icon={ShieldCheck} label="Inventory" value={step >= 2 ? 'Hold' : 'Checking'} />
      </div>

      <div className="space-y-3">
        {fields.map(({ key, label }) => {
          const value = lead[key]
          const isFilled = Boolean(value)

          return (
            <div
              key={key}
              className={`rounded-xl border p-3 transition ${
                isFilled
                  ? 'border-stampede-red/40 bg-stampede-red/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-stampede-gold">
                {label}
              </div>
              <div className="text-sm font-semibold text-white">{value ?? 'Pending'}</div>
            </div>
          )
        })}
      </div>

      {isCreated ? (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-700/70 bg-green-900/30 p-3 text-sm font-bold text-green-300">
          <CheckCircle2 className="h-4 w-4" />
          Lead inserted successfully - {lead.reference}
        </div>
      ) : null}
    </aside>
  )
}

type MetricProps = {
  icon: typeof Users
  label: string
  value: string
}

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <Icon className="mb-3 h-4 w-4 text-stampede-gold" />
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{label}</div>
      <div className="font-serif text-lg font-bold text-white">{value}</div>
    </div>
  )
}
