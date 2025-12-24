"use client"

import { useMemo, useState } from 'react'
import { CategoryNav } from '../../components/anamnese/CategoryNav'
import { SectionForm } from '../../components/anamnese/SectionForm'
import { EmergencyModeBar } from '../../components/anamnese/EmergencyModeBar'
import { ProgressStatus } from '../../components/anamnese/ProgressStatus'
import { SeverityIndicator } from '../../components/anamnese/SeverityIndicator'
import type { Category } from '../../lib/anamnese/categories'
import { computeSeverity } from '../../lib/anamnese/severity'
import { validate } from '../../lib/anamnese/validation'

export default function ClientAnamnese({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '')
  const [checkedIds, setChecked] = useState<Set<string>>(new Set())
  const [emergency, setEmergency] = useState(false)
  const [touchX, setTouchX] = useState<number | null>(null)

  const activeCategory = useMemo(() => categories.find((c) => c.id === activeId) ?? categories[0], [categories, activeId])
  const checkedList = useMemo(() => Array.from(checkedIds), [checkedIds])
  const redFlagIds = useMemo(() => categories.flatMap(c => c.fields.filter(f => f.redFlag).map(f => f.id)), [categories])
  const totalFields = useMemo(() => categories.reduce((sum, c) => sum + c.fields.length, 0), [categories])

  const severity = useMemo(() => computeSeverity({ checkedIds: checkedList, redFlagIds }), [checkedList, redFlagIds])
  const messages = useMemo(() => validate({ checkedIds: checkedList, redFlagIds }), [checkedList, redFlagIds])
  const progress = useMemo(() => (totalFields ? Math.round((checkedIds.size / totalFields) * 100) : 0), [checkedIds.size, totalFields])

  const onToggle = (id: string, checked: boolean) => {
    const next = new Set(checkedIds)
    if (checked) next.add(id)
    else next.delete(id)
    setChecked(next)
  }

  return (
    <div
      className="space-y-3"
      onTouchStart={(e) => setTouchX(e.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX == null) return
        const delta = (e.changedTouches[0]?.clientX ?? touchX) - touchX
        const idx = categories.findIndex(c => c.id === activeId)
        if (delta < -50 && idx < categories.length - 1) {
          const next = categories[idx + 1]
          if (next?.id) setActiveId(next.id)
        } else if (delta > 50 && idx > 0) {
          const prev = categories[idx - 1]
          if (prev?.id) setActiveId(prev.id)
        }
        setTouchX(null)
      }}
    >
      <EmergencyModeBar active={emergency} onToggle={setEmergency} />
      <CategoryNav categories={categories} activeId={activeId} onChange={setActiveId} />
      <ProgressStatus progress={progress} severity={severity.level} />
      <SeverityIndicator result={severity} />

      {messages.length > 0 && (
        <div className="p-2 rounded-[12px] bg-[#F2F2F7] dark:bg-[#2C2C2E]">
          <ul className="text-[13px]">
            {messages.map(m => (
              <li key={m.id} className={m.severity === 'error' ? 'text-[#FF3B30]' : m.severity === 'warning' ? 'text-[#FF9500]' : 'text-[#0A84FF]'}>
                {m.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <section aria-label="Seção ativa">
        {activeCategory ? (
          <SectionForm fields={activeCategory.fields} checkedIds={checkedIds} onToggle={onToggle} />
        ) : null}
      </section>
    </div>
  )
}
