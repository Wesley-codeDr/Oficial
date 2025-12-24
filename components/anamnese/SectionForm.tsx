"use client"

import { IOSCheckbox } from '../ui/ios/Checkbox'
import type { AnamneseField } from '../../lib/anamnese/categories'

export interface SectionFormProps {
  fields: AnamneseField[]
  checkedIds: Set<string>
  onToggle: (id: string, checked: boolean) => void
}

export function SectionForm({ fields, checkedIds, onToggle }: SectionFormProps) {
  return (
    <div className="space-y-2">
      {fields
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((f) => (
          <IOSCheckbox
            key={f.id}
            label={f.label}
            narrative={f.narrative}
            checked={checkedIds.has(f.id)}
            onChange={(c) => onToggle(f.id, c)}
          />
        ))}
    </div>
  )
}
