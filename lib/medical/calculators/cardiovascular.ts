/**
 * Calculadoras Cardiovasculares Adicionais
 *
 * Inclui:
 * - PAM (Pressão Arterial Média)
 * - QTc (Intervalo QT Corrigido)
 * - RCRI (Revised Cardiac Risk Index)
 * - ASCVD Risk (Risco Cardiovascular 10 anos)
 *
 * Referências:
 * - AHA/ACC Guidelines
 * - Surviving Sepsis Campaign
 */

import { Reference, RiskLevel } from './types'

// ============================================
// PAM - PRESSÃO ARTERIAL MÉDIA
// ============================================

export interface MapInput {
  systolicBp: number // mmHg
  diastolicBp: number // mmHg
}

export interface MapResult {
  map: number
  interpretation: string
  riskLevel: RiskLevel
  recommendation: string
}

/**
 * Calcula a Pressão Arterial Média
 * Fórmula: PAM = PAD + 1/3(PAS - PAD) ou PAM = (PAS + 2×PAD) / 3
 */
export function calculateMap(input: MapInput): MapResult {
  const { systolicBp, diastolicBp } = input
  const map = Math.round((systolicBp + 2 * diastolicBp) / 3)

  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (map < 60) {
    riskLevel = 'critical'
    interpretation = 'PAM < 60 mmHg - HIPOPERFUSÃO TECIDUAL'
    recommendation =
      'EMERGÊNCIA - Ressuscitação imediata:\\n' +
      '• Ressuscitação volêmica agressiva\\n' +
      '• Considerar vasopressores (noradrenalina)\\n' +
      '• Monitorização hemodinâmica invasiva\\n' +
      '• Investigar etiologia (sepse, hemorragia, cardiogênica)'
  } else if (map < 65) {
    riskLevel = 'high'
    interpretation = 'PAM 60-65 mmHg - Perfusão limítrofe'
    recommendation =
      'ATENÇÃO - Otimizar hemodinâmica:\\n' +
      '• Considerar ressuscitação volêmica\\n' +
      '• Monitorar débito urinário e lactato\\n' +
      '• Meta PAM ≥ 65 mmHg em sepse'
  } else if (map <= 100) {
    riskLevel = 'low'
    interpretation = 'PAM normal (65-100 mmHg)'
    recommendation = 'Perfusão tecidual adequada. Manter monitorização.'
  } else {
    riskLevel = 'moderate'
    interpretation = 'PAM > 100 mmHg - Elevada'
    recommendation =
      'Avaliar necessidade de controle pressórico.\\n' +
      'Considerar anti-hipertensivos se indicado clinicamente.'
  }

  return { map, interpretation, riskLevel, recommendation }
}

// ============================================
// QTc - INTERVALO QT CORRIGIDO
// ============================================

export interface QtcInput {
  qtInterval: number // ms
  heartRate: number // bpm
  formula?: 'bazett' | 'fridericia' | 'framingham' | 'hodges'
}

export interface QtcResult {
  qtc: number
  formula: string
  interpretation: string
  riskLevel: RiskLevel
  recommendation: string
}

/**
 * Calcula o Intervalo QT Corrigido
 * Bazett: QTc = QT / √RR
 * Fridericia: QTc = QT / ∛RR
 * Framingham: QTc = QT + 0.154(1 - RR)
 * Hodges: QTc = QT + 1.75(HR - 60)
 */
export function calculateQtc(input: QtcInput): QtcResult {
  const { qtInterval, heartRate, formula = 'bazett' } = input
  const rr = 60 / heartRate // RR em segundos

  let qtc: number
  let formulaName: string

  switch (formula) {
    case 'fridericia':
      qtc = qtInterval / Math.cbrt(rr)
      formulaName = 'Fridericia'
      break
    case 'framingham':
      qtc = qtInterval + 0.154 * (1 - rr) * 1000
      formulaName = 'Framingham'
      break
    case 'hodges':
      qtc = qtInterval + 1.75 * (heartRate - 60)
      formulaName = 'Hodges'
      break
    default:
      qtc = qtInterval / Math.sqrt(rr)
      formulaName = 'Bazett'
  }

  qtc = Math.round(qtc)

  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (qtc > 500) {
    riskLevel = 'critical'
    interpretation = 'QTc > 500 ms - PROLONGAMENTO SEVERO'
    recommendation =
      'ALTO RISCO DE TORSADES DE POINTES:\\n' +
      '• Suspender medicamentos que prolongam QT\\n' +
      '• Corrigir distúrbios eletrolíticos (K+, Mg2+, Ca2+)\\n' +
      '• Monitorização cardíaca contínua\\n' +
      '• Ter desfibrilador disponível\\n' +
      '• Considerar sulfato de magnésio profilático'
  } else if (qtc > 470) {
    riskLevel = 'high'
    interpretation = 'QTc 470-500 ms - Prolongamento moderado'
    recommendation =
      'Risco aumentado de arritmia:\\n' +
      '• Revisar medicamentos que prolongam QT\\n' +
      '• Verificar eletrólitos\\n' +
      '• Monitorar ECG seriado'
  } else if (qtc > 450) {
    riskLevel = 'moderate'
    interpretation = 'QTc 450-470 ms - Limítrofe'
    recommendation =
      'QTc limítrofe:\\n' +
      '• Avaliar fatores de risco\\n' +
      '• Monitorar se novos medicamentos'
  } else if (qtc >= 350) {
    riskLevel = 'low'
    interpretation = 'QTc normal (350-450 ms)'
    recommendation = 'Intervalo QT dentro da normalidade.'
  } else {
    riskLevel = 'moderate'
    interpretation = 'QTc < 350 ms - Encurtado'
    recommendation =
      'QT curto - considerar:\\n' +
      '• Síndrome do QT curto (raro)\\n' +
      '• Hipercalcemia\\n' +
      '• Digoxina\\n' +
      '• Confirmar medição'
  }

  return { qtc, formula: formulaName, interpretation, riskLevel, recommendation }
}

// ============================================
// RCRI - REVISED CARDIAC RISK INDEX
// ============================================

export interface RcriInput {
  highRiskSurgery: boolean // Cirurgia vascular, torácica ou abdominal
  ischemicHeartDisease: boolean // IAM prévio, angina, uso de nitrato
  heartFailure: boolean // IC prévia ou compensada
  cerebrovascularDisease: boolean // AVC ou AIT prévio
  insulinDependentDiabetes: boolean // DM em uso de insulina
  creatinineAbove2: boolean // Creatinina > 2 mg/dL
}

export interface RcriResult {
  score: number
  riskClass: number
  cardiacEventRisk: string
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
}

/**
 * Calcula o Revised Cardiac Risk Index (Lee Index)
 * Prediz risco de eventos cardíacos maiores após cirurgia não cardíaca
 */
export function calculateRcri(input: RcriInput): RcriResult {
  let score = 0

  if (input.highRiskSurgery) score += 1
  if (input.ischemicHeartDisease) score += 1
  if (input.heartFailure) score += 1
  if (input.cerebrovascularDisease) score += 1
  if (input.insulinDependentDiabetes) score += 1
  if (input.creatinineAbove2) score += 1

  let riskClass: number
  let cardiacEventRisk: string
  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (score === 0) {
    riskClass = 1
    cardiacEventRisk = '0.4-0.5%'
    riskLevel = 'low'
    interpretation = 'RCRI 0 - Risco muito baixo'
    recommendation = 'Proceder com cirurgia. Nenhum teste adicional necessário.'
  } else if (score === 1) {
    riskClass = 2
    cardiacEventRisk = '0.9-1.3%'
    riskLevel = 'low'
    interpretation = 'RCRI 1 - Risco baixo'
    recommendation =
      'Considerar NT-proBNP/BNP pré-operatório se idade ≥65.\\n' +
      'Otimizar comorbidades antes da cirurgia.'
  } else if (score === 2) {
    riskClass = 3
    cardiacEventRisk = '4-7%'
    riskLevel = 'moderate'
    interpretation = 'RCRI 2 - Risco moderado'
    recommendation =
      'AVALIAR CUIDADOSAMENTE:\\n' +
      '• NT-proBNP/BNP pré-operatório recomendado\\n' +
      '• ECG pré-operatório\\n' +
      '• Otimizar medicações (beta-bloqueadores, estatinas)\\n' +
      '• Monitorar troponinas pós-operatórias'
  } else {
    riskClass = 4
    cardiacEventRisk = '9-11%'
    riskLevel = 'high'
    interpretation = `RCRI ≥3 (${score}) - Risco elevado`
    recommendation =
      'ALTO RISCO CARDÍACO:\\n' +
      '• Avaliação cardiológica pré-operatória\\n' +
      '• Considerar teste funcional (eco estresse, cintilografia)\\n' +
      '• Otimização agressiva de comorbidades\\n' +
      '• Monitorização pós-operatória em UTI\\n' +
      '• Troponinas seriadas por 48-72h'
  }

  return {
    score,
    riskClass,
    cardiacEventRisk,
    riskLevel,
    interpretation,
    recommendation,
  }
}

// ============================================
// ASCVD RISK - RISCO CARDIOVASCULAR 10 ANOS
// ============================================

export interface AscvdInput {
  age: number // 40-79 anos
  sex: 'male' | 'female'
  race: 'white' | 'african_american' | 'other'
  totalCholesterol: number // mg/dL
  hdlCholesterol: number // mg/dL
  systolicBp: number // mmHg
  onHypertensionTreatment: boolean
  diabetes: boolean
  smoker: boolean
}

export interface AscvdResult {
  risk10Year: number // percentual
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
}

/**
 * Calcula o Risco ASCVD de 10 anos (Pooled Cohort Equations)
 * AHA/ACC 2013
 */
export function calculateAscvdRisk(input: AscvdInput): AscvdResult {
  const {
    age,
    sex,
    race,
    totalCholesterol,
    hdlCholesterol,
    systolicBp,
    onHypertensionTreatment,
    diabetes,
    smoker,
  } = input

  // Coeficientes variam por sexo e raça
  const lnAge = Math.log(age)
  const lnTC = Math.log(totalCholesterol)
  const lnHDL = Math.log(hdlCholesterol)
  const lnSBP = Math.log(systolicBp)
  const lnAgeSq = lnAge * lnAge

  let s010: number
  let meanCoef: number
  let sum: number

  if (sex === 'female') {
    if (race === 'african_american') {
      // Mulher afro-americana
      s010 = 0.9533
      meanCoef = 86.61
      sum =
        17.114 * lnAge +
        0.94 * lnTC +
        -18.92 * lnHDL +
        4.475 * lnAge * lnHDL +
        (onHypertensionTreatment ? 29.291 * lnSBP : 27.82 * lnSBP) +
        (onHypertensionTreatment ? -6.432 * lnAge * lnSBP : -6.087 * lnAge * lnSBP) +
        (smoker ? 0.691 : 0) +
        (diabetes ? 0.874 : 0)
    } else {
      // Mulher branca/outra
      s010 = 0.9665
      meanCoef = -29.18
      sum =
        -29.799 * lnAge +
        4.884 * lnAgeSq +
        13.54 * lnTC +
        -3.114 * lnAge * lnTC +
        -13.578 * lnHDL +
        3.149 * lnAge * lnHDL +
        (onHypertensionTreatment ? 2.019 * lnSBP : 1.957 * lnSBP) +
        (smoker ? 7.574 : 0) +
        (smoker ? -1.665 * lnAge : 0) +
        (diabetes ? 0.661 : 0)
    }
  } else {
    if (race === 'african_american') {
      // Homem afro-americano
      s010 = 0.8954
      meanCoef = 19.54
      sum =
        2.469 * lnAge +
        0.302 * lnTC +
        -0.307 * lnHDL +
        (onHypertensionTreatment ? 1.916 * lnSBP : 1.809 * lnSBP) +
        (smoker ? 0.549 : 0) +
        (diabetes ? 0.645 : 0)
    } else {
      // Homem branco/outro
      s010 = 0.9144
      meanCoef = 61.18
      sum =
        12.344 * lnAge +
        11.853 * lnTC +
        -2.664 * lnAge * lnTC +
        -7.99 * lnHDL +
        1.769 * lnAge * lnHDL +
        (onHypertensionTreatment ? 1.797 * lnSBP : 1.764 * lnSBP) +
        (smoker ? 7.837 : 0) +
        (smoker ? -1.795 * lnAge : 0) +
        (diabetes ? 0.658 : 0)
    }
  }

  const risk10Year = (1 - Math.pow(s010, Math.exp(sum - meanCoef))) * 100
  const roundedRisk = Math.round(risk10Year * 10) / 10

  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (roundedRisk < 5) {
    riskLevel = 'low'
    interpretation = `Risco ASCVD 10 anos: ${roundedRisk}% - BAIXO`
    recommendation =
      'Baixo risco cardiovascular:\\n' +
      '• Enfatizar estilo de vida saudável\\n' +
      '• Estatina geralmente não indicada\\n' +
      '• Reavaliar em 4-6 anos'
  } else if (roundedRisk < 7.5) {
    riskLevel = 'moderate'
    interpretation = `Risco ASCVD 10 anos: ${roundedRisk}% - BORDERLINE`
    recommendation =
      'Risco borderline:\\n' +
      '• Discussão clínico-paciente sobre estatina\\n' +
      '• Considerar fatores de risco adicionais (CAC score)\\n' +
      '• Modificação intensiva de estilo de vida'
  } else if (roundedRisk < 20) {
    riskLevel = 'moderate'
    interpretation = `Risco ASCVD 10 anos: ${roundedRisk}% - INTERMEDIÁRIO`
    recommendation =
      'Risco intermediário:\\n' +
      '• Estatina de intensidade moderada recomendada\\n' +
      '• Meta LDL < 100 mg/dL\\n' +
      '• Considerar CAC score para refinar risco\\n' +
      '• Controle rigoroso de PA e glicemia'
  } else {
    riskLevel = 'high'
    interpretation = `Risco ASCVD 10 anos: ${roundedRisk}% - ALTO`
    recommendation =
      'ALTO RISCO CARDIOVASCULAR:\\n' +
      '• Estatina de alta intensidade indicada\\n' +
      '• Meta LDL < 70 mg/dL\\n' +
      '• Considerar aspirina se benefício > risco sangramento\\n' +
      '• Controle agressivo de todos os fatores de risco'
  }

  return {
    risk10Year: roundedRisk,
    riskLevel,
    interpretation,
    recommendation,
  }
}

// ============================================
// METADADOS
// ============================================

export const mapMetadata = {
  id: 'map',
  name: 'PAM (Pressão Arterial Média)',
  description: 'Calcula a pressão arterial média. Meta ≥65 mmHg em sepse/choque.',
  category: 'cardiovascular' as const,
  syndromeIds: ['febre'],
  references: [] as Reference[],
  version: '1.0.0',
}

export const qtcMetadata = {
  id: 'qtc',
  name: 'QTc (Intervalo QT Corrigido)',
  description:
    'Corrige o intervalo QT para frequência cardíaca. ' +
    'QTc > 500 ms indica alto risco de Torsades.',
  category: 'cardiovascular' as const,
  syndromeIds: ['sincope'],
  references: [] as Reference[],
  version: '1.0.0',
}

export const rcriMetadata = {
  id: 'rcri',
  name: 'RCRI (Índice de Risco Cardíaco Revisado)',
  description:
    'Estima risco de eventos cardíacos maiores em cirurgia não cardíaca.',
  category: 'cardiovascular' as const,
  syndromeIds: [],
  references: [] as Reference[],
  version: '1.0.0',
}

export const ascvdMetadata = {
  id: 'ascvd-risk',
  name: 'ASCVD Risk (Risco Cardiovascular 10 anos)',
  description:
    'Calcula risco de 10 anos de evento cardiovascular aterosclerótico ' +
    '(IAM, AVC, morte cardiovascular). AHA/ACC 2013.',
  category: 'cardiovascular' as const,
  syndromeIds: ['dor_toracica'],
  references: [] as Reference[],
  version: '1.0.0',
}
