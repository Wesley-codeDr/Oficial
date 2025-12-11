/**
 * Calculadoras Renais - Função Renal e TFG
 *
 * Inclui:
 * - Cockcroft-Gault (Depuração de Creatinina)
 * - CKD-EPI (TFG estimada)
 * - MDRD (TFG estimada)
 *
 * Referências:
 * - KDIGO 2012 Clinical Practice Guideline for CKD
 * - Inker LA, et al. N Engl J Med. 2021 (CKD-EPI 2021)
 */

import { Reference, RiskLevel } from './types'

const REFERENCES: Reference[] = [
  {
    source: 'KDIGO',
    title: 'Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease',
    year: 2012,
    evidenceLevel: '1A',
  },
  {
    source: 'N Engl J Med',
    title: 'New Creatinine- and Cystatin C-Based Equations to Estimate GFR without Race',
    year: 2021,
    evidenceLevel: '1A',
  },
  {
    source: 'Ann Intern Med',
    title: 'A new equation to estimate glomerular filtration rate',
    year: 2009,
    evidenceLevel: '1A',
  },
]

// ============================================
// TIPOS
// ============================================

export interface RenalInput {
  age: number
  weight: number // kg
  creatinine: number // mg/dL
  sex: 'male' | 'female'
  height?: number // cm (para peso ideal)
  cystatin?: number // mg/L (para CKD-EPI cistatina)
}

export interface RenalResult {
  value: number
  unit: string
  interpretation: string
  ckdStage: string
  riskLevel: RiskLevel
  recommendation: string
  references: Reference[]
}

// ============================================
// COCKCROFT-GAULT
// ============================================

/**
 * Calcula a Depuração de Creatinina pela Equação de Cockcroft-Gault
 * Fórmula: CrCl = [(140 - idade) × peso × (0.85 se mulher)] / (72 × Cr)
 */
export function calculateCockcroftGault(input: RenalInput): RenalResult {
  const { age, weight, creatinine, sex } = input

  let crCl = ((140 - age) * weight) / (72 * creatinine)
  if (sex === 'female') {
    crCl *= 0.85
  }

  const { ckdStage, riskLevel, interpretation, recommendation } = interpretGFR(crCl)

  return {
    value: Math.round(crCl * 10) / 10,
    unit: 'mL/min',
    interpretation,
    ckdStage,
    riskLevel,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// CKD-EPI 2021 (SEM RAÇA)
// ============================================

/**
 * Calcula a TFG estimada pela equação CKD-EPI 2021 (sem raça)
 * Recomendada atualmente pela ASN e NKF
 */
export function calculateCkdEpi2021(input: RenalInput): RenalResult {
  const { age, creatinine, sex } = input

  // Constantes CKD-EPI 2021
  const kappa = sex === 'female' ? 0.7 : 0.9
  const alpha = sex === 'female' ? -0.241 : -0.302
  const sexMultiplier = sex === 'female' ? 1.012 : 1.0

  const crRatio = creatinine / kappa
  const minRatio = Math.min(crRatio, 1)
  const maxRatio = Math.max(crRatio, 1)

  const gfr = 142 *
    Math.pow(minRatio, alpha) *
    Math.pow(maxRatio, -1.200) *
    Math.pow(0.9938, age) *
    sexMultiplier

  const { ckdStage, riskLevel, interpretation, recommendation } = interpretGFR(gfr)

  return {
    value: Math.round(gfr * 10) / 10,
    unit: 'mL/min/1.73m²',
    interpretation,
    ckdStage,
    riskLevel,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// MDRD (4 variáveis)
// ============================================

/**
 * Calcula a TFG estimada pela equação MDRD (4 variáveis)
 * Fórmula: 175 × (Cr)^-1.154 × (idade)^-0.203 × (0.742 se mulher)
 */
export function calculateMdrd(input: RenalInput): RenalResult {
  const { age, creatinine, sex } = input

  let gfr = 175 *
    Math.pow(creatinine, -1.154) *
    Math.pow(age, -0.203)

  if (sex === 'female') {
    gfr *= 0.742
  }

  const { ckdStage, riskLevel, interpretation, recommendation } = interpretGFR(gfr)

  return {
    value: Math.round(gfr * 10) / 10,
    unit: 'mL/min/1.73m²',
    interpretation,
    ckdStage,
    riskLevel,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// INTERPRETAÇÃO COMUM
// ============================================

function interpretGFR(gfr: number): {
  ckdStage: string
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
} {
  if (gfr >= 90) {
    return {
      ckdStage: 'G1 (Normal ou Alto)',
      riskLevel: 'low',
      interpretation: 'TFG normal ou elevada.',
      recommendation:
        'Função renal normal.\\n' +
        'Se houver outros marcadores de lesão renal (albuminúria, alterações estruturais), classificar como DRC G1.\\n' +
        'Manter controle de fatores de risco (PA, glicemia).',
    }
  }

  if (gfr >= 60) {
    return {
      ckdStage: 'G2 (Levemente diminuída)',
      riskLevel: 'low',
      interpretation: 'TFG levemente diminuída.',
      recommendation:
        'Considerar DRC G2 se houver outros marcadores de lesão renal.\\n' +
        'Monitorar função renal anualmente.\\n' +
        'Controlar fatores de risco cardiovascular.\\n' +
        'Ajustar doses de medicamentos se necessário.',
    }
  }

  if (gfr >= 45) {
    return {
      ckdStage: 'G3a (Leve a moderadamente diminuída)',
      riskLevel: 'moderate',
      interpretation: 'DRC estágio G3a - TFG leve a moderadamente diminuída.',
      recommendation:
        'Encaminhar para nefrologia.\\n' +
        'Monitorar função renal a cada 6 meses.\\n' +
        'Avaliar e tratar complicações (anemia, distúrbio mineral-ósseo).\\n' +
        'Ajustar doses de medicamentos.\\n' +
        'Evitar nefrotóxicos (AINEs, contraste iodado).',
    }
  }

  if (gfr >= 30) {
    return {
      ckdStage: 'G3b (Moderada a gravemente diminuída)',
      riskLevel: 'moderate',
      interpretation: 'DRC estágio G3b - TFG moderada a gravemente diminuída.',
      recommendation:
        'Acompanhamento nefrológico obrigatório.\\n' +
        'Monitorar função renal a cada 3-6 meses.\\n' +
        'Avaliar e tratar complicações.\\n' +
        'Preparar para possível TRS (diálise/transplante).\\n' +
        'Vacinação para hepatite B.',
    }
  }

  if (gfr >= 15) {
    return {
      ckdStage: 'G4 (Gravemente diminuída)',
      riskLevel: 'high',
      interpretation: 'DRC estágio G4 - TFG gravemente diminuída.',
      recommendation:
        'Acompanhamento nefrológico frequente.\\n' +
        'Preparar ativamente para TRS.\\n' +
        'Considerar confecção de fístula arteriovenosa.\\n' +
        'Avaliar para transplante renal.\\n' +
        'Ajuste rigoroso de medicamentos.',
    }
  }

  // gfr < 15
  return {
    ckdStage: 'G5 (Falência renal)',
    riskLevel: 'critical',
    interpretation: 'DRC estágio G5 - Falência renal.',
    recommendation:
      'FALÊNCIA RENAL - TRS necessária:\\n' +
      '• Indicar diálise (hemodiálise ou peritoneal)\\n' +
      '• Avaliar transplante renal\\n' +
      '• Monitorar sinais de uremia\\n' +
      '• Controle rigoroso de potássio e fósforo\\n' +
      '• Restrição hídrica se necessário',
  }
}

// ============================================
// METADADOS
// ============================================

export const cockcroftGaultMetadata = {
  id: 'cockcroft-gault',
  name: 'Cockcroft-Gault (Depuração de Creatinina)',
  description:
    'Calcula a depuração de creatinina estimada. ' +
    'Usado para ajuste de doses de medicamentos.',
  category: 'general' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}

export const ckdEpi2021Metadata = {
  id: 'ckd-epi-2021',
  name: 'CKD-EPI 2021 (TFG sem raça)',
  description:
    'Estima a TFG pela equação CKD-EPI 2021 sem variável raça. ' +
    'Recomendada atualmente pela ASN e NKF.',
  category: 'general' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}

export const mdrdMetadata = {
  id: 'mdrd',
  name: 'MDRD (TFG estimada)',
  description:
    'Estima a TFG pela equação MDRD de 4 variáveis. ' +
    'Apenas para DRC estável (não usar em IRA).',
  category: 'general' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}
