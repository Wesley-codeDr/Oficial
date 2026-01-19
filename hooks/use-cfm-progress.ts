import { useMemo } from 'react'
import type { CheckboxCategory } from '@/lib/types/medical'

/**
 * Checkbox data shape expected by the hook
 */
interface CheckboxData {
  id: string
  category: CheckboxCategory | string
}

/**
 * All CFM categories in order
 */
const CFM_CATEGORIES: CheckboxCategory[] = [
  'QP',
  'HDA',
  'ANTECEDENTES',
  'MEDICACOES',
  'ALERGIAS',
  'HABITOS',
  'EXAME_FISICO',
  'NEGATIVAS',
]

/**
 * Hook to calculate CFM block progress based on selected checkboxes
 *
 * @param checkboxes - Array of all available checkboxes
 * @param selectedIds - Set of selected checkbox IDs
 * @returns Object containing selectedByCategory and totalByCategory maps
 */
export function useCFMProgress(checkboxes: CheckboxData[], selectedIds: Set<string>) {
  const selectedByCategory = useMemo(() => {
    const result: Record<CheckboxCategory, string[]> = {} as Record<CheckboxCategory, string[]>

    // Initialize all categories
    CFM_CATEGORIES.forEach((category) => {
      result[category] = []
    })

    // Group selected checkboxes by category
    checkboxes.forEach((checkbox) => {
      if (selectedIds.has(checkbox.id) && CFM_CATEGORIES.includes(checkbox.category as CheckboxCategory)) {
        result[checkbox.category as CheckboxCategory].push(checkbox.id)
      }
    })

    return result
  }, [checkboxes, selectedIds])

  const totalByCategory = useMemo(() => {
    const result: Record<CheckboxCategory, number> = {} as Record<CheckboxCategory, number>

    // Initialize all categories
    CFM_CATEGORIES.forEach((category) => {
      result[category] = 0
    })

    // Count total checkboxes per category
    checkboxes.forEach((checkbox) => {
      if (CFM_CATEGORIES.includes(checkbox.category as CheckboxCategory)) {
        result[checkbox.category as CheckboxCategory]++
      }
    })

    return result
  }, [checkboxes])

  const overallProgress = useMemo(() => {
    let totalSelected = 0
    let totalItems = 0

    CFM_CATEGORIES.forEach((category) => {
      totalSelected += selectedByCategory[category].length
      totalItems += totalByCategory[category]
    })

    const percentage = totalItems > 0 ? Math.round((totalSelected / totalItems) * 100) : 0

    return {
      totalSelected,
      totalItems,
      percentage,
    }
  }, [selectedByCategory, totalByCategory])

  return {
    selectedByCategory,
    totalByCategory,
    overallProgress,
    categories: CFM_CATEGORIES,
  }
}
