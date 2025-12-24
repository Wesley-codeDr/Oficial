export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical'

export interface SeverityInput {
  checkedIds: string[]
  redFlagIds: string[]
  vitalSignals?: {
    heartRate?: number
    systolicBP?: number
    diastolicBP?: number
    oxygenSat?: number
    temperature?: number
  }
}

export interface SeverityResult {
  level: SeverityLevel
  score: number // 0-100
  reasons: string[]
}

/**
 * Compute severity based on red flags, vitals and selected items.
 * Weights prioritize red flags; vitals adjust score. Deterministic and explainable.
 */
export function computeSeverity(input: SeverityInput): SeverityResult {
  let score = 0
  const reasons: string[] = []

  // Red flags carry high weight
  const redFlagsCount = input.redFlagIds.filter(id => input.checkedIds.includes(id)).length
  if (redFlagsCount > 0) {
    const redScore = Math.min(70, redFlagsCount * 25)
    score += redScore
    reasons.push(`Red flags detectados: ${redFlagsCount}`)
  }

  // Checked items add small context weight
  const contextScore = Math.min(20, input.checkedIds.length * 2)
  score += contextScore
  if (contextScore > 0) reasons.push('Contexto clínico relevante selecionado')

  // Vital signals adjustments
  const v = input.vitalSignals ?? {}
  if (typeof v.oxygenSat === 'number' && v.oxygenSat < 92) {
    score += 15
    reasons.push('Saturação baixa (<92%)')
  }
  if (typeof v.systolicBP === 'number' && v.systolicBP < 90) {
    score += 15
    reasons.push('Hipotensão (PAS < 90)')
  }
  if (typeof v.heartRate === 'number' && v.heartRate > 120) {
    score += 10
    reasons.push('Taquicardia (>120 bpm)')
  }
  if (typeof v.temperature === 'number' && v.temperature >= 39) {
    score += 8
    reasons.push('Febre alta (≥39°C)')
  }

  // Normalize
  score = Math.max(0, Math.min(100, score))

  let level: SeverityLevel = 'low'
  if (score >= 80) level = 'critical'
  else if (score >= 60) level = 'high'
  else if (score >= 35) level = 'moderate'

  return { level, score, reasons }
}
