"use client"

import { useCallback } from 'react'
import { SegmentedControl } from '../ui/ios/SegmentedControl'
import type { Category } from '../../lib/anamnese/categories'

export interface CategoryNavProps {
  categories: Category[]
  activeId: string
  onChange: (id: string) => void
}

export function CategoryNav({ categories, activeId, onChange }: CategoryNavProps) {
  const options = categories.map((c) => ({ id: c.id, label: c.name }))
  const handleChange = useCallback((id: string) => onChange(id), [onChange])

  return (
    <nav aria-label="Navegação por categorias" className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md p-2">
      <SegmentedControl options={options} value={activeId} onChange={handleChange} />
    </nav>
  )
}
