"use client"

import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { SegmentedControl } from '../ui/ios/SegmentedControl'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassShadow,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
} from '@/lib/theme/hooks'
import type { Category } from '../../lib/anamnese/categories'

export interface CategoryNavProps {
  categories: Category[]
  activeId: string
  onChange: (id: string) => void
}

export function CategoryNav({ categories, activeId, onChange }: CategoryNavProps) {
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  const options = categories.map((c) => ({ id: c.id, label: c.name }))
  const handleChange = useCallback((id: string) => onChange(id), [onChange])

  // Get theme classes
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder(isDark)
  const glassShadow = useGlassShadow('default', isDark)
  const glassRadius = useGlassRadius('MD')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()

  return (
    <nav
      aria-label="Navegação por categorias"
      className={cn(
        'sticky top-0 z-10 p-2',
        glassBlur,
        glassOpacity,
        glassBorder,
        glassShadow,
        glassRadius,
        glassNoise,
        glassSpecular
      )}
    >
      <SegmentedControl options={options} value={activeId} onChange={handleChange} />
    </nav>
  )
}
