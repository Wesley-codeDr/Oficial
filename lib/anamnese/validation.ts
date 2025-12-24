export type ValidationSeverity = 'info' | 'warning' | 'error'

export interface ValidationMessage {
  id: string
  message: string
  severity: ValidationSeverity
  fieldIds?: string[]
}

export interface ValidationContext {
  checkedIds: string[]
  requiredIds?: string[]
  mutuallyExclusive?: Array<[string, string]> // pairs that cannot coexist
  redFlagIds?: string[]
}

/**
 * Real-time clinical validation rules. Keep deterministic and explainable.
 */
export function validate(ctx: ValidationContext): ValidationMessage[] {
  const messages: ValidationMessage[] = []
  const set = new Set(ctx.checkedIds)

  // Required fields
  for (const req of ctx.requiredIds ?? []) {
    if (!set.has(req)) {
      messages.push({
        id: `req:${req}`,
        message: 'Campo obrigatório não marcado',
        severity: 'warning',
        fieldIds: [req],
      })
    }
  }

  // Mutual exclusivity
  for (const [a, b] of ctx.mutuallyExclusive ?? []) {
    if (set.has(a) && set.has(b)) {
      messages.push({
        id: `mx:${a}+${b}`,
        message: 'Combinação clinicamente inconsistente',
        severity: 'error',
        fieldIds: [a, b],
      })
    }
  }

  // Red flags surfaced as info (severity engine will escalate)
  for (const rf of ctx.redFlagIds ?? []) {
    if (set.has(rf)) {
      messages.push({
        id: `rf:${rf}`,
        message: 'Red flag detectado: considerar prioridade',
        severity: 'info',
        fieldIds: [rf],
      })
    }
  }

  return messages
}
