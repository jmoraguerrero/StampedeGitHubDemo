import { Bot, Database, Network } from 'lucide-react'

export type SectionId = 'demo' | 'crm' | 'mcp'

type SectionTabsProps = {
  activeSection: SectionId
  onSectionChange: (section: SectionId) => void
}

const sections: Array<{ id: SectionId; label: string; icon: typeof Bot }> = [
  { id: 'demo', label: 'Conversational Demo', icon: Bot },
  { id: 'crm', label: 'Salesforce Proof', icon: Database },
  { id: 'mcp', label: 'MCP Future', icon: Network },
]

export function SectionTabs({ activeSection, onSectionChange }: SectionTabsProps) {
  return (
    <div className="custom-scrollbar flex overflow-x-auto border-b border-stampede-border">
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = id === activeSection

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSectionChange(id)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition ${
              isActive
                ? 'border-stampede-red text-stampede-red'
                : 'border-transparent text-gray-500 hover:text-stampede-red'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
