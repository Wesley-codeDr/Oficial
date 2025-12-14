import { CheckboxCategory } from '@prisma/client'
import { create } from 'zustand'
import type {
  SyndromeWithCheckboxes,
  DetectedRedFlag,
  OutputMode,
} from '@/types/medical'

const INITIAL_CATEGORY_ORDER: CheckboxCategory[] = [
  'QP',
  'HDA',
  'ANTECEDENTES',
  'MEDICACOES',
  'ALERGIAS',
  'HABITOS',
  'EXAME_FISICO',
  'NEGATIVAS',
]

interface AnamneseState {
  // Current session state
  selectedSyndrome: SyndromeWithCheckboxes | null
  checkedItems: Set<string>
  generatedText: string
  redFlags: DetectedRedFlag[]
  missingRequired: string[]
  outputMode: OutputMode
  sessionId: string | null
  isDirty: boolean
  categoryOrder: CheckboxCategory[]
  pastCategoryOrders: CheckboxCategory[][]
  futureCategoryOrders: CheckboxCategory[][]

  // Actions
  selectSyndrome: (syndrome: SyndromeWithCheckboxes) => void
  toggleCheckbox: (checkboxId: string) => void
  setCheckedItems: (items: string[]) => void
  setGeneratedText: (text: string) => void
  setRedFlags: (flags: DetectedRedFlag[]) => void
  setMissingRequired: (missing: string[]) => void
  setOutputMode: (mode: OutputMode) => void
  setSessionId: (id: string | null) => void
  setIsDirty: (dirty: boolean) => void
  setCategoryOrder: (order: CheckboxCategory[]) => void
  undoCategoryOrder: () => void
  redoCategoryOrder: () => void
  clearSession: () => void
}

export const useAnamneseStore = create<AnamneseState>((set) => ({
  selectedSyndrome: null,
  checkedItems: new Set(),
  generatedText: '',
  redFlags: [],
  missingRequired: [],
  outputMode: 'SUMMARY',
  sessionId: null,
  isDirty: false,
  categoryOrder: INITIAL_CATEGORY_ORDER,
  pastCategoryOrders: [],
  futureCategoryOrders: [],

  selectSyndrome: (syndrome) =>
    set({
      selectedSyndrome: syndrome,
      checkedItems: new Set(),
      generatedText: '',
      redFlags: [],
      missingRequired: [],
      sessionId: null,
      isDirty: false,
      categoryOrder: INITIAL_CATEGORY_ORDER, // Reset order on new syndrome
      pastCategoryOrders: [],
      futureCategoryOrders: [],
    }),

  toggleCheckbox: (checkboxId) =>
    set((state) => {
      const newChecked = new Set(state.checkedItems)
      if (newChecked.has(checkboxId)) {
        newChecked.delete(checkboxId)
      } else {
        newChecked.add(checkboxId)
      }
      return { checkedItems: newChecked, isDirty: true }
    }),

  setCheckedItems: (items) => set({ checkedItems: new Set(items) }),

  setGeneratedText: (text) => set({ generatedText: text }),

  setRedFlags: (flags) => set({ redFlags: flags }),

  setMissingRequired: (missing) => set({ missingRequired: missing }),

  setOutputMode: (mode) => set({ outputMode: mode }),

  setSessionId: (id) => set({ sessionId: id }),

  setIsDirty: (dirty) => set({ isDirty: dirty }),

  setCategoryOrder: (order) =>
    set((state) => ({
      pastCategoryOrders: [...state.pastCategoryOrders, state.categoryOrder],
      categoryOrder: order,
      futureCategoryOrders: [], // Clear future on new action
    })),

  undoCategoryOrder: () =>
    set((state) => {
      if (state.pastCategoryOrders.length === 0) return {}
      const previous = state.pastCategoryOrders[state.pastCategoryOrders.length - 1]
      const newPast = state.pastCategoryOrders.slice(0, state.pastCategoryOrders.length - 1)
      return {
        pastCategoryOrders: newPast,
        categoryOrder: previous,
        futureCategoryOrders: [state.categoryOrder, ...state.futureCategoryOrders],
      }
    }),

  redoCategoryOrder: () =>
    set((state) => {
      if (state.futureCategoryOrders.length === 0) return {}
      const next = state.futureCategoryOrders[0]
      const newFuture = state.futureCategoryOrders.slice(1)
      return {
        pastCategoryOrders: [...state.pastCategoryOrders, state.categoryOrder],
        categoryOrder: next,
        futureCategoryOrders: newFuture,
      }
    }),

  clearSession: () =>
    set({
      selectedSyndrome: null,
      checkedItems: new Set(),
      generatedText: '',
      redFlags: [],
      missingRequired: [],
      outputMode: 'SUMMARY',
      sessionId: null,
      isDirty: false,
      categoryOrder: INITIAL_CATEGORY_ORDER,
      pastCategoryOrders: [],
      futureCategoryOrders: [],
    }),
}))
