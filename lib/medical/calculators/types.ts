/**
 * Tipos para Calculadoras Médicas - WellWave
 *
 * Calculadoras baseadas em diretrizes:
 * - SBC (Sociedade Brasileira de Cardiologia)
 * - AHA/ACC (American Heart Association)
 * - ABRAMEDE (Associação Brasileira de Medicina de Emergência)
 */

// ============================================
// TIPOS BASE
// ============================================

export type RiskLevel = 'low' | 'moderate' | 'high' | 'very_high' | 'critical'

export type EvidenceLevel = '1A' | '1B' | '2A' | '2B' | '3' | 'expert_opinion'

export interface CalculatorResult<T = number> {
  score: T
  interpretation: string
  riskLevel: RiskLevel
  recommendation: string
  references: Reference[]
}

export interface Reference {
  source: string
  title: string
  year: number
  url?: string
  evidenceLevel: EvidenceLevel
}

export interface CalculatorMetadata {
  id: string
  name: string
  description: string
  category: CalculatorCategory
  syndromeIds: string[]
  references: Reference[]
  version: string
}

export type CalculatorCategory =
  | 'cardiovascular'
  | 'neurological'
  | 'respiratory'
  | 'abdominal'
  | 'trauma'
  | 'sepsis'
  | 'general'

// ============================================
// HEART SCORE (Dor Torácica)
// ============================================

export interface HeartScoreInput {
  // H - History (0-2)
  history: 'slightly_suspicious' | 'moderately_suspicious' | 'highly_suspicious'

  // E - ECG (0-2)
  ecg: 'normal' | 'nonspecific_repolarization' | 'significant_st_deviation'

  // A - Age (0-2)
  age: number // anos

  // R - Risk Factors (0-2)
  riskFactors: {
    hypertension: boolean
    hypercholesterolemia: boolean
    diabetes: boolean
    obesity: boolean // BMI > 30
    smoking: boolean // atual ou < 3 meses
    familyHistory: boolean // DAC < 65 anos em parente 1º grau
    atherosclerosis: boolean // AVC, DAP, cirurgia prévia
  }

  // T - Troponin (0-2)
  troponin: 'normal' | 'elevated_1_3x' | 'elevated_3x'
}

export interface HeartScoreResult extends CalculatorResult<number> {
  breakdown: {
    history: number
    ecg: number
    age: number
    riskFactors: number
    troponin: number
  }
  maceRisk: string // Major Adverse Cardiac Events em 6 semanas
}

// ============================================
// NIHSS (AVC)
// ============================================

export interface NihssInput {
  // 1a. Nível de consciência (0-3)
  consciousness: 0 | 1 | 2 | 3

  // 1b. Perguntas de orientação (0-2)
  orientationQuestions: 0 | 1 | 2

  // 1c. Comandos (0-2)
  commands: 0 | 1 | 2

  // 2. Melhor olhar conjugado (0-2)
  bestGaze: 0 | 1 | 2

  // 3. Visual (0-3)
  visual: 0 | 1 | 2 | 3

  // 4. Paralisia facial (0-3)
  facialPalsy: 0 | 1 | 2 | 3

  // 5a. Motor braço esquerdo (0-4)
  motorArmLeft: 0 | 1 | 2 | 3 | 4

  // 5b. Motor braço direito (0-4)
  motorArmRight: 0 | 1 | 2 | 3 | 4

  // 6a. Motor perna esquerda (0-4)
  motorLegLeft: 0 | 1 | 2 | 3 | 4

  // 6b. Motor perna direita (0-4)
  motorLegRight: 0 | 1 | 2 | 3 | 4

  // 7. Ataxia de membros (0-2)
  limbAtaxia: 0 | 1 | 2

  // 8. Sensibilidade (0-2)
  sensory: 0 | 1 | 2

  // 9. Melhor linguagem (0-3)
  bestLanguage: 0 | 1 | 2 | 3

  // 10. Disartria (0-2)
  dysarthria: 0 | 1 | 2

  // 11. Extinção/Inatenção (0-2)
  extinctionInattention: 0 | 1 | 2
}

export interface NihssResult extends CalculatorResult<number> {
  severity: 'no_stroke' | 'minor' | 'moderate' | 'moderate_severe' | 'severe'
  thrombolysisEligibility: boolean
  timeWindow: string
}

// ============================================
// WELLS SCORE (TEP - Tromboembolismo Pulmonar)
// ============================================

export interface WellsPeInput {
  clinicalSignsDvt: boolean // 3 pontos
  alternativeDiagnosisLessLikely: boolean // 3 pontos
  heartRate100: boolean // 1.5 pontos
  immobilizationOrSurgery: boolean // 1.5 pontos
  previousDvtOrPe: boolean // 1.5 pontos
  hemoptysis: boolean // 1 ponto
  malignancy: boolean // 1 ponto (tratamento nos últimos 6 meses ou paliativo)
}

export interface WellsPeResult extends CalculatorResult<number> {
  probability: 'low' | 'moderate' | 'high'
  pePrevalence: string
  nextStep: string
}

// ============================================
// WELLS SCORE (TVP - Trombose Venosa Profunda)
// ============================================

export interface WellsDvtInput {
  activeCancer: boolean // 1 ponto
  paralysisOrImmobilization: boolean // 1 ponto
  bedridden3Days: boolean // 1 ponto
  localizedTenderness: boolean // 1 ponto
  entireLegSwollen: boolean // 1 ponto
  calfSwelling3cm: boolean // 1 ponto (comparado com assintomático)
  pittingEdema: boolean // 1 ponto
  collateralSuperficialVeins: boolean // 1 ponto
  previousDvt: boolean // 1 ponto
  alternativeDiagnosisLikely: boolean // -2 pontos
}

export interface WellsDvtResult extends CalculatorResult<number> {
  probability: 'low' | 'moderate' | 'high'
  dvtPrevalence: string
  nextStep: string
}

// ============================================
// GLASGOW COMA SCALE
// ============================================

export interface GlasgowInput {
  // Eye Response (1-4)
  eyeResponse: 1 | 2 | 3 | 4

  // Verbal Response (1-5)
  verbalResponse: 1 | 2 | 3 | 4 | 5

  // Motor Response (1-6)
  motorResponse: 1 | 2 | 3 | 4 | 5 | 6
}

export interface GlasgowResult extends CalculatorResult<number> {
  breakdown: {
    eye: number
    verbal: number
    motor: number
  }
  severity: 'mild' | 'moderate' | 'severe'
  intubationIndicated: boolean
}

// ============================================
// qSOFA (Sepse)
// ============================================

export interface QsofaInput {
  respiratoryRate22: boolean // >= 22/min
  alteredMentation: boolean // Glasgow < 15
  systolicBp100: boolean // <= 100 mmHg
}

export interface QsofaResult extends CalculatorResult<number> {
  sepsisSuspected: boolean
  mortality: string
  nextStep: string
}

// ============================================
// NEWS2 (National Early Warning Score)
// ============================================

export interface News2Input {
  respiratoryRate: number // rpm
  oxygenSaturation: number // %
  supplementalOxygen: boolean
  temperature: number // °C
  systolicBp: number // mmHg
  heartRate: number // bpm
  consciousness: 'alert' | 'voice' | 'pain' | 'unresponsive' // AVPU
}

export interface News2Result extends CalculatorResult<number> {
  breakdown: {
    respiratoryRate: number
    oxygenSaturation: number
    supplementalOxygen: number
    temperature: number
    systolicBp: number
    heartRate: number
    consciousness: number
  }
  clinicalRisk: 'low' | 'low_medium' | 'medium' | 'high'
  responseRequired: string
}

// ============================================
// ALVARADO SCORE (Apendicite)
// ============================================

export interface AlvaradoInput {
  // Sintomas
  migratoryPain: boolean // 1 ponto
  anorexia: boolean // 1 ponto
  nausea: boolean // 1 ponto

  // Sinais
  rightLowerQuadrantTenderness: boolean // 2 pontos
  reboundTenderness: boolean // 1 ponto
  fever: boolean // 1 ponto (>37.3°C)

  // Laboratório
  leukocytosis: boolean // 2 pontos (>10.000)
  leftShift: boolean // 1 ponto (>75% neutrófilos)
}

export interface AlvaradoResult extends CalculatorResult<number> {
  probability: 'unlikely' | 'possible' | 'probable' | 'very_likely'
  recommendation: string
}

// ============================================
// OESIL SCORE (Síncope)
// ============================================

export interface OesilInput {
  age65: boolean // >= 65 anos
  cardiovascularHistory: boolean // cardiopatia estrutural conhecida
  syncropeWithoutProdrome: boolean // sem pródromos
  abnormalEcg: boolean // ECG anormal
}

export interface OesilResult extends CalculatorResult<number> {
  mortality1Year: string
  riskLevel: RiskLevel
  disposition: 'discharge' | 'observation' | 'admission'
}

// ============================================
// CANADIAN CT HEAD RULE (TCE)
// ============================================

export interface CanadianCtHeadInput {
  // Alto risco (necessita TC)
  glasgowLessThan15: boolean // 2h após lesão
  suspectedSkullFracture: boolean
  anySignOfBasilarFracture: boolean
  vomiting2Episodes: boolean
  age65: boolean

  // Médio risco (TC se nenhum alto risco)
  amnesia30Min: boolean // antes do impacto
  dangerousMechanism: boolean
}

export interface CanadianCtHeadResult extends CalculatorResult<string> {
  ctIndicated: boolean
  riskCategory: 'high' | 'medium' | 'low'
  recommendation: string
}

// ============================================
// CURB-65 (Pneumonia)
// ============================================

export interface Curb65Input {
  confusion: boolean // C
  urea7: boolean // U - ureia > 7 mmol/L (ou BUN > 19)
  respiratoryRate30: boolean // R - FR >= 30
  bloodPressureLow: boolean // B - PAS < 90 ou PAD <= 60
  age65: boolean // 65 - idade >= 65
}

export interface Curb65Result extends CalculatorResult<number> {
  mortality30Day: string
  recommendation: 'outpatient' | 'short_admission' | 'icu_admission'
  disposition: string
}

// ============================================
// CHA2DS2-VASc (Fibrilação Atrial)
// ============================================

export interface Cha2ds2VascInput {
  congestiveHeartFailure: boolean // 1 ponto
  hypertension: boolean // 1 ponto
  age75: boolean // 2 pontos
  diabetes: boolean // 1 ponto
  strokeTiaHistory: boolean // 2 pontos
  vascularDisease: boolean // 1 ponto
  age65to74: boolean // 1 ponto
  female: boolean // 1 ponto
}

export interface Cha2ds2VascResult extends CalculatorResult<number> {
  annualStrokeRisk: string
  anticoagulationRecommended: boolean
  recommendation: string
}

// ============================================
// HAS-BLED (Risco de Sangramento)
// ============================================

export interface HasBledInput {
  hypertension: boolean // PAS > 160
  abnormalRenalFunction: boolean // diálise, transplante, Cr > 2.26
  abnormalLiverFunction: boolean // cirrose, bilirrubina 2x, AST/ALT 3x
  stroke: boolean
  bleeding: boolean // história ou predisposição
  labileInr: boolean // TTR < 60%
  elderly: boolean // > 65 anos
  drugs: boolean // antiplaquetários, AINEs
  alcohol: boolean // >= 8 doses/semana
}

export interface HasBledResult extends CalculatorResult<number> {
  bleedingRisk: 'low' | 'moderate' | 'high'
  annualBleedingRate: string
  recommendation: string
}
