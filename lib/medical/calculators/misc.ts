/**
 * Calculadoras Diversas
 *
 * Inclui:
 * - STOP-BANG (Apneia Obstrutiva do Sono)
 * - PHQ-9 (Depressão)
 * - Centor/McIsaac (Faringite Estreptocócica)
 * - Data Provável do Parto
 *
 * Referências:
 * - Chung F, et al. Anesthesiology. 2008 (STOP-BANG)
 * - Kroenke K, et al. J Gen Intern Med. 2001 (PHQ-9)
 * - McIsaac WJ, et al. CMAJ. 1998 (Centor modificado)
 */

import { Reference, RiskLevel } from './types'

const REFERENCES: Reference[] = [
  {
    source: 'Anesthesiology',
    title: 'STOP questionnaire: a tool to screen patients for obstructive sleep apnea',
    year: 2008,
    evidenceLevel: '1A',
  },
  {
    source: 'J Gen Intern Med',
    title: 'The PHQ-9: validity of a brief depression severity measure',
    year: 2001,
    evidenceLevel: '1A',
  },
  {
    source: 'CMAJ',
    title: 'A clinical score to reduce unnecessary antibiotic use in patients with sore throat',
    year: 1998,
    evidenceLevel: '1B',
  },
]

// ============================================
// STOP-BANG (APNEIA DO SONO)
// ============================================

export interface StopBangInput {
  snoring: boolean // S - Snoring loud
  tired: boolean // T - Tired during day
  observed: boolean // O - Observed stopping breathing
  pressure: boolean // P - Pressure (hypertension)
  bmi35: boolean // B - BMI > 35
  age50: boolean // A - Age > 50
  neckCircumference: boolean // N - Neck > 40cm (F) ou > 43cm (M)
  genderMale: boolean // G - Gender male
}

export interface StopBangResult {
  score: number
  riskLevel: RiskLevel
  osaProbability: string
  interpretation: string
  recommendation: string
  references: Reference[]
}

/**
 * Calcula o STOP-BANG Score para Apneia Obstrutiva do Sono
 */
export function calculateStopBang(input: StopBangInput): StopBangResult {
  let score = 0

  if (input.snoring) score += 1
  if (input.tired) score += 1
  if (input.observed) score += 1
  if (input.pressure) score += 1
  if (input.bmi35) score += 1
  if (input.age50) score += 1
  if (input.neckCircumference) score += 1
  if (input.genderMale) score += 1

  let riskLevel: RiskLevel
  let osaProbability: string
  let interpretation: string
  let recommendation: string

  if (score <= 2) {
    riskLevel = 'low'
    osaProbability = 'Baixa'
    interpretation = 'STOP-BANG 0-2 - Baixo risco de AOS'
    recommendation =
      'Baixo risco de apneia obstrutiva do sono:\\n' +
      '• Polissonografia geralmente não indicada\\n' +
      '• Orientar sobre higiene do sono\\n' +
      '• Reavaliar se sintomas persistentes'
  } else if (score <= 4) {
    riskLevel = 'moderate'
    osaProbability = 'Intermediária'
    interpretation = 'STOP-BANG 3-4 - Risco intermediário de AOS'
    recommendation =
      'Risco intermediário:\\n' +
      '• Considerar polissonografia\\n' +
      '• Avaliar impacto funcional (sonolência diurna)\\n' +
      '• Se pré-operatório: cautela com sedação\\n' +
      '• Orientar perda de peso se obeso'
  } else {
    riskLevel = 'high'
    osaProbability = 'Alta'
    interpretation = `STOP-BANG ≥ 5 (${score}) - Alto risco de AOS`
    recommendation =
      'ALTO RISCO de apneia obstrutiva do sono:\\n' +
      '• Polissonografia indicada\\n' +
      '• Se pré-operatório:\\n' +
      '  - Reduzir doses de opioides/sedativos\\n' +
      '  - Monitorização pós-operatória estendida\\n' +
      '  - Disponibilizar CPAP\\n' +
      '• CPAP é tratamento de primeira linha\\n' +
      '• Avaliar comorbidades cardiovasculares'
  }

  return {
    score,
    riskLevel,
    osaProbability,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// PHQ-9 (DEPRESSÃO)
// ============================================

export interface Phq9Input {
  // Nas últimas 2 semanas, com que frequência você foi incomodado por:
  littleInterest: 0 | 1 | 2 | 3 // Pouco interesse ou prazer
  feelingDown: 0 | 1 | 2 | 3 // Sentir-se para baixo, deprimido
  sleepProblems: 0 | 1 | 2 | 3 // Problemas com sono
  tired: 0 | 1 | 2 | 3 // Sentir-se cansado
  appetiteProblems: 0 | 1 | 2 | 3 // Pouco apetite ou comer demais
  feelingBad: 0 | 1 | 2 | 3 // Sentir-se mal consigo mesmo
  concentrationProblems: 0 | 1 | 2 | 3 // Dificuldade de concentração
  movingSlow: 0 | 1 | 2 | 3 // Mover-se ou falar devagar (ou agitação)
  suicidalThoughts: 0 | 1 | 2 | 3 // Pensamentos de morte ou autolesão
}

export interface Phq9Result {
  score: number
  severity: string
  riskLevel: RiskLevel
  suicidalRisk: boolean
  interpretation: string
  recommendation: string
  references: Reference[]
}

/**
 * Calcula o PHQ-9 para rastreamento de depressão
 * 0 = Nenhum dia
 * 1 = Vários dias
 * 2 = Mais da metade dos dias
 * 3 = Quase todos os dias
 */
export function calculatePhq9(input: Phq9Input): Phq9Result {
  const score =
    input.littleInterest +
    input.feelingDown +
    input.sleepProblems +
    input.tired +
    input.appetiteProblems +
    input.feelingBad +
    input.concentrationProblems +
    input.movingSlow +
    input.suicidalThoughts

  const suicidalRisk = input.suicidalThoughts > 0

  let severity: string
  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (score <= 4) {
    severity = 'Mínima ou nenhuma'
    riskLevel = 'low'
    interpretation = 'PHQ-9: 0-4 - Depressão mínima ou ausente'
    recommendation =
      'Sem indicação de tratamento para depressão.\\n' +
      'Reavaliar se sintomas persistentes.'
  } else if (score <= 9) {
    severity = 'Leve'
    riskLevel = 'low'
    interpretation = 'PHQ-9: 5-9 - Depressão leve'
    recommendation =
      'Depressão leve:\\n' +
      '• Monitorar (watchful waiting)\\n' +
      '• Considerar psicoterapia breve\\n' +
      '• Orientar atividade física e higiene do sono\\n' +
      '• Reavaliar em 2-4 semanas'
  } else if (score <= 14) {
    severity = 'Moderada'
    riskLevel = 'moderate'
    interpretation = 'PHQ-9: 10-14 - Depressão moderada'
    recommendation =
      'Depressão moderada - TRATAMENTO ATIVO:\\n' +
      '• Iniciar antidepressivo (ISRS primeira linha)\\n' +
      '• Psicoterapia (TCC ou interpessoal)\\n' +
      '• Reavaliar em 2-4 semanas\\n' +
      '• Monitorar resposta e efeitos adversos'
  } else if (score <= 19) {
    severity = 'Moderadamente grave'
    riskLevel = 'high'
    interpretation = 'PHQ-9: 15-19 - Depressão moderadamente grave'
    recommendation =
      'Depressão moderadamente grave:\\n' +
      '• Antidepressivo indicado\\n' +
      '• Psicoterapia associada\\n' +
      '• Avaliar necessidade de encaminhamento a psiquiatra\\n' +
      '• Monitoramento mais frequente'
  } else {
    severity = 'Grave'
    riskLevel = 'critical'
    interpretation = 'PHQ-9: 20-27 - Depressão grave'
    recommendation =
      'DEPRESSÃO GRAVE:\\n' +
      '• Encaminhamento urgente a psiquiatra\\n' +
      '• Antidepressivo + psicoterapia\\n' +
      '• Avaliar internação se risco de suicídio\\n' +
      '• Considerar ECT em casos refratários'
  }

  // Alerta adicional para risco suicida
  if (suicidalRisk) {
    recommendation +=
      '\\n\\n⚠️ ATENÇÃO - RISCO DE SUICÍDIO:\\n' +
      '• Realizar avaliação detalhada de risco\\n' +
      '• Perguntar sobre plano e meios\\n' +
      '• Considerar protocolo de segurança\\n' +
      '• Encaminhamento urgente se risco iminente'
  }

  return {
    score,
    severity,
    riskLevel,
    suicidalRisk,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// CENTOR / McISAAC (FARINGITE)
// ============================================

export interface CentorInput {
  tonsillarExudate: boolean // Exsudato tonsilar
  tenderCervicalNodes: boolean // Linfonodos cervicais anteriores dolorosos
  noCoriza: boolean // Ausência de tosse/coriza
  fever: boolean // Febre > 38°C
  age: number // Para ajuste McIsaac
}

export interface CentorResult {
  centorScore: number
  mcisaacScore: number
  strepProbability: string
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
  references: Reference[]
}

/**
 * Calcula o Centor Score (Modificado/McIsaac) para Faringite Estreptocócica
 */
export function calculateCentor(input: CentorInput): CentorResult {
  let centorScore = 0

  if (input.tonsillarExudate) centorScore += 1
  if (input.tenderCervicalNodes) centorScore += 1
  if (input.noCoriza) centorScore += 1
  if (input.fever) centorScore += 1

  // Ajuste McIsaac por idade
  let mcisaacScore = centorScore
  if (input.age >= 3 && input.age <= 14) {
    mcisaacScore += 1
  } else if (input.age >= 15 && input.age <= 44) {
    mcisaacScore += 0
  } else if (input.age >= 45) {
    mcisaacScore -= 1
  }

  // Limitar entre 0 e 5
  mcisaacScore = Math.max(0, Math.min(5, mcisaacScore))

  let strepProbability: string
  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (mcisaacScore <= 0) {
    strepProbability = '1-2.5%'
    riskLevel = 'low'
    interpretation = 'McIsaac 0 ou menos - Strep muito improvável'
    recommendation =
      'Faringite estreptocócica muito improvável:\\n' +
      '• Antibiótico NÃO indicado\\n' +
      '• Tratamento sintomático (analgésicos, anti-inflamatórios)\\n' +
      '• Cultura/teste rápido não necessário'
  } else if (mcisaacScore === 1) {
    strepProbability = '5-10%'
    riskLevel = 'low'
    interpretation = 'McIsaac 1 - Baixa probabilidade de Strep'
    recommendation =
      'Baixa probabilidade:\\n' +
      '• Antibiótico NÃO indicado\\n' +
      '• Tratamento sintomático\\n' +
      '• Cultura opcional'
  } else if (mcisaacScore === 2) {
    strepProbability = '11-17%'
    riskLevel = 'moderate'
    interpretation = 'McIsaac 2 - Probabilidade intermediária baixa'
    recommendation =
      'Probabilidade intermediária:\\n' +
      '• Realizar teste rápido ou cultura\\n' +
      '• Antibiótico apenas se teste positivo\\n' +
      '• Tratamento sintomático enquanto aguarda'
  } else if (mcisaacScore === 3) {
    strepProbability = '28-35%'
    riskLevel = 'moderate'
    interpretation = 'McIsaac 3 - Probabilidade intermediária alta'
    recommendation =
      'Probabilidade moderada-alta:\\n' +
      '• Teste rápido ou cultura indicados\\n' +
      '• Considerar tratamento empírico enquanto aguarda resultado\\n' +
      '• Se tratamento empírico: penicilina V ou amoxicilina'
  } else {
    strepProbability = '51-53%'
    riskLevel = 'high'
    interpretation = `McIsaac ${mcisaacScore} - Alta probabilidade de Strep`
    recommendation =
      'Alta probabilidade de faringite estreptocócica:\\n' +
      '• Considerar tratamento empírico\\n' +
      '• Ou realizar teste rápido antes\\n' +
      '• Antibiótico de escolha:\\n' +
      '  - Penicilina V 500mg 12/12h por 10 dias\\n' +
      '  - Ou Amoxicilina 500mg 8/8h por 10 dias\\n' +
      '  - Se alergia: Azitromicina 500mg/dia por 3 dias'
  }

  return {
    centorScore,
    mcisaacScore,
    strepProbability,
    riskLevel,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// DATA PROVÁVEL DO PARTO
// ============================================

export interface PregnancyDateInput {
  lastMenstrualPeriod?: Date // DUM
  ultrasoundDate?: Date // Data do ultrassom
  gestationalAgeAtUltrasound?: number // IG em dias na data do US
  cycleLength?: number // Comprimento do ciclo (default 28)
}

export interface PregnancyDateResult {
  estimatedDueDate: Date
  currentGestationalAge: { weeks: number; days: number }
  trimester: 1 | 2 | 3
  interpretation: string
}

/**
 * Calcula Data Provável do Parto e Idade Gestacional
 * Regra de Naegele: DPP = DUM + 280 dias (ajustado para ciclo)
 */
export function calculatePregnancyDates(input: PregnancyDateInput): PregnancyDateResult {
  const today = new Date()
  let estimatedDueDate: Date
  let referenceDate: Date

  if (input.lastMenstrualPeriod) {
    const cycleAdjustment = (input.cycleLength || 28) - 28
    referenceDate = new Date(input.lastMenstrualPeriod)
    estimatedDueDate = new Date(referenceDate)
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 280 + cycleAdjustment)
  } else if (input.ultrasoundDate && input.gestationalAgeAtUltrasound !== undefined) {
    // Calcular DUM a partir do US
    referenceDate = new Date(input.ultrasoundDate)
    referenceDate.setDate(referenceDate.getDate() - input.gestationalAgeAtUltrasound)
    estimatedDueDate = new Date(referenceDate)
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 280)
  } else {
    throw new Error('Forneça DUM ou dados do ultrassom')
  }

  // Calcular idade gestacional atual
  const daysSinceReference = Math.floor(
    (today.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const weeks = Math.floor(daysSinceReference / 7)
  const days = daysSinceReference % 7

  // Determinar trimestre
  let trimester: 1 | 2 | 3
  if (weeks < 14) {
    trimester = 1
  } else if (weeks < 28) {
    trimester = 2
  } else {
    trimester = 3
  }

  const interpretation =
    `Idade Gestacional: ${weeks} semanas e ${days} dias\\n` +
    `Trimestre: ${trimester}º\\n` +
    `DPP: ${estimatedDueDate.toLocaleDateString('pt-BR')}`

  return {
    estimatedDueDate,
    currentGestationalAge: { weeks, days },
    trimester,
    interpretation,
  }
}

// ============================================
// CRITÉRIOS DESCRITIVOS
// ============================================

export const STOP_BANG_CRITERIA = {
  snoring: { label: 'S - Ronco alto (alto o suficiente para ser ouvido através de porta fechada)' },
  tired: { label: 'T - Cansaço durante o dia (sonolência excessiva)' },
  observed: { label: 'O - Observado parando de respirar durante o sono' },
  pressure: { label: 'P - Pressão arterial elevada (hipertensão tratada)' },
  bmi35: { label: 'B - IMC > 35 kg/m²' },
  age50: { label: 'A - Idade > 50 anos' },
  neckCircumference: { label: 'N - Circunferência do pescoço > 40cm' },
  genderMale: { label: 'G - Sexo masculino' },
}

export const PHQ9_QUESTIONS = {
  littleInterest: 'Pouco interesse ou prazer em fazer as coisas',
  feelingDown: 'Sentir-se para baixo, deprimido ou sem esperança',
  sleepProblems: 'Dificuldade para dormir ou dormir demais',
  tired: 'Sentir-se cansado ou com pouca energia',
  appetiteProblems: 'Pouco apetite ou comer demais',
  feelingBad: 'Sentir-se mal consigo mesmo, um fracasso, ou que decepcionou a si ou sua família',
  concentrationProblems: 'Dificuldade para se concentrar',
  movingSlow: 'Mover-se ou falar tão devagar que outras pessoas notaram, ou o oposto',
  suicidalThoughts: 'Pensamentos de que seria melhor estar morto ou de se machucar de alguma forma',
}

export const PHQ9_OPTIONS = [
  { value: 0, label: 'Nenhum dia' },
  { value: 1, label: 'Vários dias' },
  { value: 2, label: 'Mais da metade dos dias' },
  { value: 3, label: 'Quase todos os dias' },
]

export const CENTOR_CRITERIA = {
  tonsillarExudate: { label: 'Exsudato ou edema tonsilar' },
  tenderCervicalNodes: { label: 'Linfonodos cervicais anteriores aumentados e dolorosos' },
  noCoriza: { label: 'Ausência de tosse' },
  fever: { label: 'Febre (história ou temperatura > 38°C)' },
}

// ============================================
// METADADOS
// ============================================

export const stopBangMetadata = {
  id: 'stop-bang',
  name: 'STOP-BANG (Apneia do Sono)',
  description:
    'Rastreamento de apneia obstrutiva do sono. Score ≥ 5 indica alto risco.',
  category: 'respiratory' as const,
  syndromeIds: ['dispneia'],
  references: REFERENCES,
  version: '1.0.0',
}

export const phq9Metadata = {
  id: 'phq-9',
  name: 'PHQ-9 (Depressão)',
  description:
    'Rastreamento e monitoramento de depressão. Score ≥ 10 sugere tratamento ativo.',
  category: 'general' as const,
  syndromeIds: ['psiquiatria'],
  references: REFERENCES,
  version: '1.0.0',
}

export const centorMetadata = {
  id: 'centor-mcisaac',
  name: 'Centor/McIsaac (Faringite)',
  description:
    'Estratifica probabilidade de faringite estreptocócica e orienta uso de antibiótico.',
  category: 'general' as const,
  syndromeIds: ['febre'],
  references: REFERENCES,
  version: '1.0.0',
}

export const pregnancyDatesMetadata = {
  id: 'pregnancy-dates',
  name: 'Data Provável do Parto',
  description:
    'Calcula DPP e idade gestacional a partir de DUM ou ultrassom.',
  category: 'general' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}
