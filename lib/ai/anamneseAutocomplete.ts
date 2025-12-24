export interface AutocompleteSuggestion {
  id: string
  fieldId: string
  text: string
  score: number // 0-1
  reason?: string
}

export interface PatientHistoryItem {
  fieldId: string
  text: string
  timestamp: string
}

export interface AutocompleteContext {
  patientId: string
  history: PatientHistoryItem[]
  currentText?: string
}

/**
 * ML Autocomplete Stub
 * Deterministic placeholder using frequency from history. Future: integrate model.
 */
export function suggestAutocomplete(ctx: AutocompleteContext): AutocompleteSuggestion[] {
  const freq: Record<string, number> = {}
  for (const item of ctx.history) {
    freq[item.fieldId] = (freq[item.fieldId] ?? 0) + 1
  }
  const suggestions = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([fieldId, count]) => ({
      id: `${fieldId}:${count}`,
      fieldId,
      text: ctx.history.find(h => h.fieldId === fieldId)?.text ?? '',
      score: Math.min(1, count / 10),
      reason: 'Frequência histórica do paciente',
    }))

  return suggestions
}
