import { create } from 'zustand'
import type {
  SyndromeWithCheckboxes,
  DetectedRedFlag,
  OutputMode,
} from '@/types/medical'

interface AnamneseState {
  // Current session state
  selectedSyndrome: SyndromeWithCheckboxes | null
  checkedItems: Set<string>
  generatedText: string
  redFlags: DetectedRedFlag[]
  missingRequired: string[]
  outputMode: OutputMode
  sessionId: string | null

  // Actions
  selectSyndrome: (syndrome: SyndromeWithCheckboxes) => void
  toggleCheckbox: (checkboxId: string) => void
  setCheckedItems: (items: string[]) => void
  setGeneratedText: (text: string) => void
  setRedFlags: (flags: DetectedRedFlag[]) => void
  setMissingRequired: (missing: string[]) => void
  setOutputMode: (mode: OutputMode) => void
  setSessionId: (id: string | null) => void
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

  selectSyndrome: (syndrome) =>
    set({
      selectedSyndrome: syndrome,
      checkedItems: new Set(),
      generatedText: '',
      redFlags: [],
      missingRequired: [],
      sessionId: null,
    }),

  toggleCheckbox: (checkboxId) =>
    set((state) => {
      const newChecked = new Set(state.checkedItems)
      if (newChecked.has(checkboxId)) {
        newChecked.delete(checkboxId)
      } else {
        newChecked.add(checkboxId)
      }
      return { checkedItems: newChecked }
    }),

  setCheckedItems: (items) => set({ checkedItems: new Set(items) }),

  setGeneratedText: (text) => set({ generatedText: text }),

  setRedFlags: (flags) => set({ redFlags: flags }),

  setMissingRequired: (missing) => set({ missingRequired: missing }),

  setOutputMode: (mode) => set({ outputMode: mode }),

  setSessionId: (id) => set({ sessionId: id }),

  clearSession: () =>
    set({
      selectedSyndrome: null,
      checkedItems: new Set(),
      generatedText: '',
      redFlags: [],
      missingRequired: [],
      outputMode: 'SUMMARY',
      sessionId: null,
    }),
}))
