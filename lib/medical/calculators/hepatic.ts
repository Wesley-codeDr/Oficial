/**
 * Calculadoras Hepáticas
 *
 * Inclui:
 * - FIB-4 (Índice de Fibrose Hepática)
 * - Child-Pugh Score (Mortalidade por Cirrose)
 * - MELD Score (Doença Hepática Terminal)
 *
 * Referências:
 * - Sterling RK, et al. Hepatology. 2006 (FIB-4)
 * - Pugh RN, et al. Br J Surg. 1973 (Child-Pugh)
 * - Kamath PS, et al. Hepatology. 2001 (MELD)
 */

import { Reference, RiskLevel } from './types'

const REFERENCES: Reference[] = [
  {
    source: 'Hepatology',
    title: 'Development of a simple noninvasive index to predict significant fibrosis in patients with HIV/HCV coinfection',
    year: 2006,
    evidenceLevel: '1A',
  },
  {
    source: 'Br J Surg',
    title: 'Transection of the oesophagus for bleeding oesophageal varices',
    year: 1973,
    evidenceLevel: '1A',
  },
  {
    source: 'Hepatology',
    title: 'A model to predict survival in patients with end-stage liver disease',
    year: 2001,
    evidenceLevel: '1A',
  },
]

// ============================================
// FIB-4 INDEX
// ============================================

export interface Fib4Input {
  age: number // anos
  ast: number // U/L
  alt: number // U/L
  platelets: number // ×10⁹/L (ou mil/µL)
}

export interface Fib4Result {
  score: number
  interpretation: string
  fibrosisStage: string
  riskLevel: RiskLevel
  recommendation: string
  references: Reference[]
}

/**
 * Calcula o Índice FIB-4 para Fibrose Hepática
 * FIB-4 = (Idade × AST) / (Plaquetas × √ALT)
 */
export function calculateFib4(input: Fib4Input): Fib4Result {
  const { age, ast, alt, platelets } = input

  const score = Math.round(((age * ast) / (platelets * Math.sqrt(alt))) * 100) / 100

  let interpretation: string
  let fibrosisStage: string
  let riskLevel: RiskLevel
  let recommendation: string

  if (score < 1.30) {
    fibrosisStage = 'F0-F1 (Fibrose ausente ou mínima)'
    riskLevel = 'low'
    interpretation = 'FIB-4 < 1.30 - Baixa probabilidade de fibrose avançada'
    recommendation =
      'Fibrose avançada improvável (VPN 90%):\\n' +
      '• Biópsia hepática geralmente não necessária\\n' +
      '• Repetir FIB-4 em 1-2 anos\\n' +
      '• Manter acompanhamento da doença hepática de base'
  } else if (score <= 2.67) {
    fibrosisStage = 'Indeterminado'
    riskLevel = 'moderate'
    interpretation = 'FIB-4 1.30-2.67 - Resultado indeterminado'
    recommendation =
      'Zona indeterminada:\\n' +
      '• Considerar elastografia hepática (FibroScan)\\n' +
      '• Outros marcadores não invasivos (APRI, ELF)\\n' +
      '• Biópsia hepática se alto risco clínico\\n' +
      '• Repetir em 6 meses'
  } else {
    fibrosisStage = 'F3-F4 (Fibrose avançada/Cirrose)'
    riskLevel = 'high'
    interpretation = 'FIB-4 > 2.67 - Alta probabilidade de fibrose avançada'
    recommendation =
      'Fibrose avançada provável (VPP 65%):\\n' +
      '• Confirmar com elastografia ou biópsia\\n' +
      '• Rastrear carcinoma hepatocelular (AFP + US 6/6m)\\n' +
      '• Rastrear varizes esofágicas\\n' +
      '• Encaminhar para hepatologista'
  }

  return {
    score,
    interpretation,
    fibrosisStage,
    riskLevel,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// CHILD-PUGH SCORE
// ============================================

export interface ChildPughInput {
  bilirubin: number // mg/dL
  albumin: number // g/dL
  inr: number
  ascites: 'none' | 'mild' | 'moderate_severe'
  encephalopathy: 'none' | 'grade_1_2' | 'grade_3_4'
}

export interface ChildPughResult {
  score: number
  class: 'A' | 'B' | 'C'
  mortality1Year: string
  mortality2Year: string
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
  references: Reference[]
}

/**
 * Calcula o Child-Pugh Score para Cirrose
 */
export function calculateChildPugh(input: ChildPughInput): ChildPughResult {
  const { bilirubin, albumin, inr, ascites, encephalopathy } = input

  let score = 0

  // Bilirrubina
  if (bilirubin < 2) score += 1
  else if (bilirubin <= 3) score += 2
  else score += 3

  // Albumina
  if (albumin > 3.5) score += 1
  else if (albumin >= 2.8) score += 2
  else score += 3

  // INR
  if (inr < 1.7) score += 1
  else if (inr <= 2.3) score += 2
  else score += 3

  // Ascite
  if (ascites === 'none') score += 1
  else if (ascites === 'mild') score += 2
  else score += 3

  // Encefalopatia
  if (encephalopathy === 'none') score += 1
  else if (encephalopathy === 'grade_1_2') score += 2
  else score += 3

  let childClass: 'A' | 'B' | 'C'
  let mortality1Year: string
  let mortality2Year: string
  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (score <= 6) {
    childClass = 'A'
    mortality1Year = '100%'
    mortality2Year = '85%'
    riskLevel = 'low'
    interpretation = 'Child-Pugh A (5-6 pontos) - Doença hepática compensada'
    recommendation =
      'Cirrose compensada:\\n' +
      '• Sobrevida em 1 ano: 100%\\n' +
      '• Apto para cirurgia se necessário\\n' +
      '• Rastrear CHC e varizes\\n' +
      '• Evitar hepatotóxicos (álcool, paracetamol altas doses)'
  } else if (score <= 9) {
    childClass = 'B'
    mortality1Year = '80%'
    mortality2Year = '60%'
    riskLevel = 'moderate'
    interpretation = 'Child-Pugh B (7-9 pontos) - Doença hepática significativa'
    recommendation =
      'Comprometimento funcional significativo:\\n' +
      '• Sobrevida em 1 ano: ~80%\\n' +
      '• Risco cirúrgico aumentado\\n' +
      '• Considerar avaliação para transplante\\n' +
      '• Otimizar nutrição e tratar complicações'
  } else {
    childClass = 'C'
    mortality1Year = '45%'
    mortality2Year = '35%'
    riskLevel = 'critical'
    interpretation = 'Child-Pugh C (10-15 pontos) - Doença hepática descompensada'
    recommendation =
      'DOENÇA HEPÁTICA DESCOMPENSADA:\\n' +
      '• Sobrevida em 1 ano: ~45%\\n' +
      '• Alto risco cirúrgico (mortalidade ~80%)\\n' +
      '• Avaliar para transplante hepático urgente\\n' +
      '• Tratar agressivamente complicações\\n' +
      '• Considerar cuidados paliativos se não candidato a transplante'
  }

  return {
    score,
    class: childClass,
    mortality1Year,
    mortality2Year,
    riskLevel,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// MELD SCORE
// ============================================

export interface MeldInput {
  bilirubin: number // mg/dL
  creatinine: number // mg/dL
  inr: number
  sodium?: number // mEq/L (para MELD-Na)
  onDialysis: boolean // ≥2× diálise na última semana
}

export interface MeldResult {
  meld: number
  meldNa?: number
  mortality90Day: string
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
  references: Reference[]
}

/**
 * Calcula o MELD Score (e MELD-Na se sódio fornecido)
 * MELD = 10 × (0.957 × ln(Cr) + 0.378 × ln(Bil) + 1.120 × ln(INR) + 0.643)
 * MELD-Na = MELD + 1.32 × (137 - Na) - 0.033 × MELD × (137 - Na)
 */
export function calculateMeld(input: MeldInput): MeldResult {
  let { bilirubin, creatinine, inr, sodium, onDialysis } = input

  // Valores mínimos de 1 para evitar ln(0)
  bilirubin = Math.max(bilirubin, 1)
  creatinine = Math.max(creatinine, 1)
  inr = Math.max(inr, 1)

  // Creatinina máxima de 4 (ou automaticamente 4 se em diálise)
  if (onDialysis || creatinine > 4) {
    creatinine = 4
  }

  // Cálculo MELD original
  const meldRaw =
    10 *
    (0.957 * Math.log(creatinine) +
      0.378 * Math.log(bilirubin) +
      1.120 * Math.log(inr) +
      0.643)

  let meld = Math.round(Math.max(6, Math.min(40, meldRaw)))

  // MELD-Na se sódio fornecido
  let meldNa: number | undefined
  if (sodium !== undefined) {
    const boundedNa = Math.max(125, Math.min(137, sodium))
    const meldNaRaw = meld + 1.32 * (137 - boundedNa) - 0.033 * meld * (137 - boundedNa)
    meldNa = Math.round(Math.max(6, Math.min(40, meldNaRaw)))
  }

  const finalScore = meldNa ?? meld

  let mortality90Day: string
  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string

  if (finalScore < 10) {
    mortality90Day = '1.9%'
    riskLevel = 'low'
    interpretation = `MELD ${finalScore} - Baixo risco de mortalidade`
    recommendation =
      'Doença hepática compensada:\\n' +
      '• Monitorar função hepática regularmente\\n' +
      '• Transplante não urgente'
  } else if (finalScore < 20) {
    mortality90Day = '6%'
    riskLevel = 'moderate'
    interpretation = `MELD ${finalScore} - Risco moderado`
    recommendation =
      'Considerar avaliação para transplante:\\n' +
      '• MELD ≥ 10: encaminhar para centro transplantador\\n' +
      '• Tratar complicações\\n' +
      '• Atualizar MELD periodicamente'
  } else if (finalScore < 30) {
    mortality90Day = '19.6%'
    riskLevel = 'high'
    interpretation = `MELD ${finalScore} - Risco elevado`
    recommendation =
      'ALTO RISCO - Prioridade para transplante:\\n' +
      '• Mortalidade 90 dias ~20%\\n' +
      '• Listar para transplante se candidato\\n' +
      '• Manejo intensivo de complicações'
  } else {
    mortality90Day = '52.6%'
    riskLevel = 'critical'
    interpretation = `MELD ${finalScore} - Risco muito elevado`
    recommendation =
      'DOENÇA HEPÁTICA TERMINAL:\\n' +
      '• Mortalidade 90 dias > 50%\\n' +
      '• Prioridade máxima para transplante\\n' +
      '• UTI se descompensação aguda\\n' +
      '• Discutir prognóstico e metas de cuidado'
  }

  return {
    meld,
    meldNa,
    mortality90Day,
    riskLevel,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// CRITÉRIOS DESCRITIVOS
// ============================================

export const CHILD_PUGH_CRITERIA = {
  bilirubin: {
    label: 'Bilirrubina Total',
    unit: 'mg/dL',
    ranges: [
      { max: 2, points: 1 },
      { max: 3, points: 2 },
      { min: 3, points: 3 },
    ],
  },
  albumin: {
    label: 'Albumina',
    unit: 'g/dL',
    ranges: [
      { min: 3.5, points: 1 },
      { min: 2.8, max: 3.5, points: 2 },
      { max: 2.8, points: 3 },
    ],
  },
  inr: {
    label: 'INR',
    ranges: [
      { max: 1.7, points: 1 },
      { max: 2.3, points: 2 },
      { min: 2.3, points: 3 },
    ],
  },
  ascites: {
    label: 'Ascite',
    options: [
      { value: 'none', label: 'Ausente', points: 1 },
      { value: 'mild', label: 'Leve/Controlada', points: 2 },
      { value: 'moderate_severe', label: 'Moderada/Grave', points: 3 },
    ],
  },
  encephalopathy: {
    label: 'Encefalopatia',
    options: [
      { value: 'none', label: 'Ausente', points: 1 },
      { value: 'grade_1_2', label: 'Grau I-II', points: 2 },
      { value: 'grade_3_4', label: 'Grau III-IV', points: 3 },
    ],
  },
}

// ============================================
// METADADOS
// ============================================

export const fib4Metadata = {
  id: 'fib-4',
  name: 'FIB-4 (Índice de Fibrose Hepática)',
  description:
    'Estimativa não invasiva de fibrose hepática em hepatite viral. ' +
    'Usa idade, AST, ALT e plaquetas.',
  category: 'abdominal' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}

export const childPughMetadata = {
  id: 'child-pugh',
  name: 'Child-Pugh Score',
  description:
    'Classifica gravidade da cirrose e prediz mortalidade. ' +
    'Classes A, B e C com prognósticos distintos.',
  category: 'abdominal' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}

export const meldMetadata = {
  id: 'meld',
  name: 'MELD Score',
  description:
    'Quantifica doença hepática terminal para priorização de transplante. ' +
    'Inclui MELD-Na com correção para sódio.',
  category: 'abdominal' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}
