/**
 * Calculadoras Metabólicas e Antropométricas
 *
 * Inclui:
 * - IMC (Índice de Massa Corporal) e ASC
 * - Peso Corporal Ideal (Devine) e Ajustado
 * - Correção de Cálcio para Albumina
 * - Correção de Sódio para Hiperglicemia
 * - LDL Calculado (Friedewald)
 * - Fluidos de Manutenção (Holliday-Segar)
 * - Conversão de Esteroides
 *
 * Referências:
 * - Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974.
 * - Friedewald WT, et al. Clin Chem. 1972.
 * - Holliday MA, Segar WE. Pediatrics. 1957.
 */

import { Reference, RiskLevel } from './types'

// ============================================
// IMC E ASC
// ============================================

export interface BmiInput {
  weight: number // kg
  height: number // cm
}

export interface BmiResult {
  bmi: number
  bsa: number // Área de Superfície Corporal em m²
  category: string
  riskLevel: RiskLevel
  recommendation: string
}

/**
 * Calcula IMC e ASC (DuBois)
 * IMC = peso / altura²
 * ASC = 0.007184 × peso^0.425 × altura^0.725
 */
export function calculateBmi(input: BmiInput): BmiResult {
  const { weight, height } = input
  const heightM = height / 100

  const bmi = Math.round((weight / (heightM * heightM)) * 10) / 10
  const bsa = Math.round(0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725) * 100) / 100

  let category: string
  let riskLevel: RiskLevel
  let recommendation: string

  if (bmi < 18.5) {
    category = 'Abaixo do peso'
    riskLevel = 'moderate'
    recommendation =
      'Peso abaixo do ideal:\\n' +
      '• Avaliação nutricional recomendada\\n' +
      '• Investigar causas (má absorção, doenças crônicas)\\n' +
      '• Suplementação nutricional se indicado'
  } else if (bmi < 25) {
    category = 'Peso normal'
    riskLevel = 'low'
    recommendation = 'Peso dentro da faixa ideal. Manter estilo de vida saudável.'
  } else if (bmi < 30) {
    category = 'Sobrepeso'
    riskLevel = 'moderate'
    recommendation =
      'Sobrepeso:\\n' +
      '• Orientação sobre dieta e exercício\\n' +
      '• Avaliar fatores de risco cardiovascular\\n' +
      '• Meta: perda de 5-10% do peso'
  } else if (bmi < 35) {
    category = 'Obesidade Grau I'
    riskLevel = 'moderate'
    recommendation =
      'Obesidade Grau I:\\n' +
      '• Intervenção nutricional estruturada\\n' +
      '• Programa de atividade física\\n' +
      '• Considerar farmacoterapia\\n' +
      '• Rastrear comorbidades (DM, HAS, dislipidemia)'
  } else if (bmi < 40) {
    category = 'Obesidade Grau II'
    riskLevel = 'high'
    recommendation =
      'Obesidade Grau II:\\n' +
      '• Acompanhamento multidisciplinar\\n' +
      '• Farmacoterapia indicada\\n' +
      '• Considerar cirurgia bariátrica\\n' +
      '• Tratamento intensivo de comorbidades'
  } else {
    category = 'Obesidade Grau III (Mórbida)'
    riskLevel = 'critical'
    recommendation =
      'Obesidade Mórbida:\\n' +
      '• Cirurgia bariátrica fortemente indicada\\n' +
      '• Preparo multidisciplinar pré-operatório\\n' +
      '• Alto risco de complicações perioperatórias\\n' +
      '• Tratamento agressivo de comorbidades'
  }

  return { bmi, bsa, category, riskLevel, recommendation }
}

// ============================================
// PESO CORPORAL IDEAL E AJUSTADO
// ============================================

export interface IdealWeightInput {
  height: number // cm
  sex: 'male' | 'female'
  actualWeight?: number // kg (para peso ajustado)
}

export interface IdealWeightResult {
  idealWeight: number // kg
  adjustedWeight?: number // kg
  interpretation: string
}

/**
 * Calcula Peso Corporal Ideal (Devine) e Peso Ajustado
 * Homens: 50 + 2.3 × (altura em polegadas - 60)
 * Mulheres: 45.5 + 2.3 × (altura em polegadas - 60)
 * Peso Ajustado = Peso Ideal + 0.4 × (Peso Real - Peso Ideal)
 */
export function calculateIdealWeight(input: IdealWeightInput): IdealWeightResult {
  const { height, sex, actualWeight } = input
  const heightInches = height / 2.54

  let idealWeight: number
  if (sex === 'male') {
    idealWeight = 50 + 2.3 * (heightInches - 60)
  } else {
    idealWeight = 45.5 + 2.3 * (heightInches - 60)
  }

  idealWeight = Math.round(idealWeight * 10) / 10

  let adjustedWeight: number | undefined
  let interpretation: string

  if (actualWeight && actualWeight > idealWeight) {
    adjustedWeight = Math.round((idealWeight + 0.4 * (actualWeight - idealWeight)) * 10) / 10
    interpretation =
      `Peso Ideal: ${idealWeight} kg\\n` +
      `Peso Ajustado: ${adjustedWeight} kg\\n` +
      'Usar peso ajustado para dosagem de aminoglicosídeos em obesos.'
  } else {
    interpretation =
      `Peso Ideal: ${idealWeight} kg\\n` +
      'Usar para cálculo de volume corrente e dosagem de certos medicamentos.'
  }

  return { idealWeight, adjustedWeight, interpretation }
}

// ============================================
// CORREÇÃO DE CÁLCIO PARA ALBUMINA
// ============================================

export interface CalciumCorrectionInput {
  calcium: number // mg/dL
  albumin: number // g/dL
}

export interface CalciumCorrectionResult {
  correctedCalcium: number
  interpretation: string
  riskLevel: RiskLevel
  recommendation: string
}

/**
 * Corrige Cálcio para Albumina
 * Cálcio Corrigido = Cálcio Medido + 0.8 × (4 - Albumina)
 */
export function correctCalciumForAlbumin(input: CalciumCorrectionInput): CalciumCorrectionResult {
  const { calcium, albumin } = input
  const correctedCalcium = Math.round((calcium + 0.8 * (4 - albumin)) * 10) / 10

  let interpretation: string
  let riskLevel: RiskLevel
  let recommendation: string

  if (correctedCalcium < 8.5) {
    riskLevel = correctedCalcium < 7 ? 'critical' : 'high'
    interpretation = `Hipocalcemia (Ca corrigido: ${correctedCalcium} mg/dL)`
    recommendation =
      correctedCalcium < 7
        ? 'HIPOCALCEMIA GRAVE - Reposição IV urgente:\\n' +
          '• Gluconato de cálcio 10% 10-20 mL IV lento\\n' +
          '• Monitorização cardíaca\\n' +
          '• Verificar Mg e vitamina D'
        : 'Hipocalcemia:\\n' +
          '• Verificar PTH, vitamina D, magnésio\\n' +
          '• Reposição oral ou IV conforme gravidade\\n' +
          '• Investigar etiologia'
  } else if (correctedCalcium <= 10.5) {
    riskLevel = 'low'
    interpretation = `Cálcio normal (Ca corrigido: ${correctedCalcium} mg/dL)`
    recommendation = 'Cálcio dentro da normalidade.'
  } else {
    riskLevel = correctedCalcium > 12 ? 'critical' : 'high'
    interpretation = `Hipercalcemia (Ca corrigido: ${correctedCalcium} mg/dL)`
    recommendation =
      correctedCalcium > 12
        ? 'HIPERCALCEMIA GRAVE - Tratamento urgente:\\n' +
          '• Hidratação vigorosa (SF 0.9%)\\n' +
          '• Furosemida após hidratação\\n' +
          '• Bifosfonatos (ácido zoledrônico)\\n' +
          '• Investigar malignidade e hiperparatireoidismo'
        : 'Hipercalcemia:\\n' +
          '• Verificar PTH\\n' +
          '• Investigar hiperparatireoidismo vs malignidade\\n' +
          '• Hidratação'
  }

  return { correctedCalcium, interpretation, riskLevel, recommendation }
}

// ============================================
// CORREÇÃO DE SÓDIO PARA HIPERGLICEMIA
// ============================================

export interface SodiumCorrectionInput {
  sodium: number // mEq/L
  glucose: number // mg/dL
}

export interface SodiumCorrectionResult {
  correctedSodium: number
  interpretation: string
  riskLevel: RiskLevel
}

/**
 * Corrige Sódio para Hiperglicemia
 * Na Corrigido = Na Medido + 1.6 × [(Glicose - 100) / 100]
 * (Alguns usam 2.4 para glicose > 400)
 */
export function correctSodiumForGlucose(input: SodiumCorrectionInput): SodiumCorrectionResult {
  const { sodium, glucose } = input

  // Fator 1.6 para glicose ≤ 400, 2.4 para > 400
  const factor = glucose > 400 ? 2.4 : 1.6
  const correctedSodium = Math.round((sodium + factor * ((glucose - 100) / 100)) * 10) / 10

  let interpretation: string
  let riskLevel: RiskLevel

  if (correctedSodium < 135) {
    riskLevel = correctedSodium < 125 ? 'critical' : 'moderate'
    interpretation = `Hiponatremia verdadeira (Na corrigido: ${correctedSodium} mEq/L)`
  } else if (correctedSodium <= 145) {
    riskLevel = 'low'
    interpretation = `Sódio normal após correção (Na corrigido: ${correctedSodium} mEq/L)`
  } else {
    riskLevel = correctedSodium > 155 ? 'critical' : 'moderate'
    interpretation = `Hipernatremia (Na corrigido: ${correctedSodium} mEq/L)`
  }

  return { correctedSodium, interpretation, riskLevel }
}

// ============================================
// LDL CALCULADO (FRIEDEWALD)
// ============================================

export interface LdlInput {
  totalCholesterol: number // mg/dL
  hdl: number // mg/dL
  triglycerides: number // mg/dL
}

export interface LdlResult {
  ldl: number
  interpretation: string
  riskLevel: RiskLevel
  recommendation: string
  isReliable: boolean
}

/**
 * Calcula LDL pela fórmula de Friedewald
 * LDL = Colesterol Total - HDL - (Triglicerídeos / 5)
 * Não confiável se TG > 400 mg/dL
 */
export function calculateLdl(input: LdlInput): LdlResult {
  const { totalCholesterol, hdl, triglycerides } = input

  const isReliable = triglycerides <= 400
  const ldl = Math.round(totalCholesterol - hdl - triglycerides / 5)

  let interpretation: string
  let riskLevel: RiskLevel
  let recommendation: string

  if (!isReliable) {
    interpretation = `LDL calculado: ${ldl} mg/dL (NÃO CONFIÁVEL - TG > 400)`
    riskLevel = 'moderate'
    recommendation = 'Triglicerídeos > 400 mg/dL. Solicitar LDL direto.'
  } else if (ldl < 70) {
    interpretation = `LDL: ${ldl} mg/dL - Ótimo para alto risco`
    riskLevel = 'low'
    recommendation = 'LDL na meta para pacientes de muito alto risco CV.'
  } else if (ldl < 100) {
    interpretation = `LDL: ${ldl} mg/dL - Ótimo/Quase ótimo`
    riskLevel = 'low'
    recommendation = 'LDL na meta para maioria dos pacientes.'
  } else if (ldl < 130) {
    interpretation = `LDL: ${ldl} mg/dL - Limítrofe alto`
    riskLevel = 'moderate'
    recommendation =
      'Considerar estatina se risco CV intermediário/alto.\\n' +
      'Modificação de estilo de vida.'
  } else if (ldl < 160) {
    interpretation = `LDL: ${ldl} mg/dL - Alto`
    riskLevel = 'moderate'
    recommendation =
      'LDL elevado:\\n' +
      '• Estatina indicada para maioria\\n' +
      '• Modificação de dieta\\n' +
      '• Avaliar risco CV global'
  } else {
    interpretation = `LDL: ${ldl} mg/dL - Muito alto`
    riskLevel = 'high'
    recommendation =
      'LDL muito elevado:\\n' +
      '• Estatina de alta intensidade\\n' +
      '• Considerar terapia combinada\\n' +
      '• Rastrear hipercolesterolemia familiar'
  }

  return { ldl, interpretation, riskLevel, recommendation, isReliable }
}

// ============================================
// FLUIDOS DE MANUTENÇÃO (HOLLIDAY-SEGAR)
// ============================================

export interface MaintenanceFluidsInput {
  weight: number // kg
}

export interface MaintenanceFluidsResult {
  hourlyRate: number // mL/h
  dailyVolume: number // mL/24h
  formula: string
  recommendation: string
}

/**
 * Calcula Fluidos de Manutenção pela regra 4-2-1 (Holliday-Segar)
 * Primeiros 10 kg: 4 mL/kg/h
 * 10-20 kg: + 2 mL/kg/h
 * > 20 kg: + 1 mL/kg/h
 */
export function calculateMaintenanceFluids(input: MaintenanceFluidsInput): MaintenanceFluidsResult {
  const { weight } = input

  let hourlyRate: number

  if (weight <= 10) {
    hourlyRate = 4 * weight
  } else if (weight <= 20) {
    hourlyRate = 40 + 2 * (weight - 10)
  } else {
    hourlyRate = 60 + 1 * (weight - 20)
  }

  hourlyRate = Math.round(hourlyRate)
  const dailyVolume = hourlyRate * 24

  const formula =
    'Regra 4-2-1:\\n' +
    '• Primeiros 10 kg: 4 mL/kg/h\\n' +
    '• 10-20 kg: + 2 mL/kg/h\\n' +
    '• > 20 kg: + 1 mL/kg/h'

  const recommendation =
    `Taxa: ${hourlyRate} mL/h\\n` +
    `Volume 24h: ${dailyVolume} mL\\n\\n` +
    'Ajustar conforme:\\n' +
    '• Estado de hidratação\\n' +
    '• Perdas (febre, drenagens)\\n' +
    '• Função renal e cardíaca'

  return { hourlyRate, dailyVolume, formula, recommendation }
}

// ============================================
// CONVERSÃO DE ESTEROIDES
// ============================================

export interface SteroidConversionInput {
  steroid: string
  dose: number // mg
}

export interface SteroidConversionResult {
  equivalentDoses: Record<string, number>
  interpretation: string
}

/**
 * Converte doses de corticosteroides usando equivalências
 * Base: 20 mg hidrocortisona = 5 mg prednisona = 4 mg metilprednisolona = 0.75 mg dexametasona
 */
export function convertSteroidDose(input: SteroidConversionInput): SteroidConversionResult {
  const { steroid, dose } = input

  // Potência relativa (1 = hidrocortisona)
  const potencies: Record<string, number> = {
    hydrocortisone: 1,
    cortisone: 0.8,
    prednisone: 4,
    prednisolone: 4,
    methylprednisolone: 5,
    triamcinolone: 5,
    dexamethasone: 25,
    betamethasone: 25,
  }

  const steroidLower = steroid.toLowerCase()
  const currentPotency = potencies[steroidLower] || 1

  // Dose equivalente em hidrocortisona
  const hydrocortisoneEquiv = dose * currentPotency

  const equivalentDoses: Record<string, number> = {}
  for (const [name, potency] of Object.entries(potencies)) {
    equivalentDoses[name] = Math.round((hydrocortisoneEquiv / potency) * 100) / 100
  }

  const interpretation =
    `${dose} mg de ${steroid} equivale a:\\n` +
    `• Hidrocortisona: ${equivalentDoses.hydrocortisone} mg\\n` +
    `• Prednisona: ${equivalentDoses.prednisone} mg\\n` +
    `• Metilprednisolona: ${equivalentDoses.methylprednisolone} mg\\n` +
    `• Dexametasona: ${equivalentDoses.dexamethasone} mg`

  return { equivalentDoses, interpretation }
}

// ============================================
// METADADOS
// ============================================

export const bmiMetadata = {
  id: 'bmi-bsa',
  name: 'IMC e ASC',
  description: 'Calcula Índice de Massa Corporal e Área de Superfície Corporal.',
  category: 'general' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}

export const idealWeightMetadata = {
  id: 'ideal-weight',
  name: 'Peso Corporal Ideal (Devine)',
  description: 'Calcula peso ideal e ajustado para dosagem de medicamentos.',
  category: 'general' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}

export const calciumCorrectionMetadata = {
  id: 'calcium-correction',
  name: 'Correção de Cálcio para Albumina',
  description: 'Corrige cálcio sérico para níveis de albumina.',
  category: 'general' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}

export const sodiumCorrectionMetadata = {
  id: 'sodium-correction',
  name: 'Correção de Sódio para Hiperglicemia',
  description: 'Calcula sódio corrigido em pacientes hiperglicêmicos.',
  category: 'general' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}

export const ldlMetadata = {
  id: 'ldl-calculated',
  name: 'LDL Calculado (Friedewald)',
  description: 'Estima LDL a partir de colesterol total, HDL e triglicerídeos.',
  category: 'cardiovascular' as const,
  syndromeIds: ['dor_toracica'],
  references: [] as Reference[],
  version: '1.0.0',
}

export const maintenanceFluidsMetadata = {
  id: 'maintenance-fluids',
  name: 'Fluidos de Manutenção (4-2-1)',
  description: 'Calcula necessidade de fluidos de manutenção por peso.',
  category: 'general' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}

export const steroidConversionMetadata = {
  id: 'steroid-conversion',
  name: 'Conversão de Esteroides',
  description: 'Converte doses entre diferentes corticosteroides.',
  category: 'general' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}
