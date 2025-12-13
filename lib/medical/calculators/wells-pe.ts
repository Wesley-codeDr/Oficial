/**
 * Wells Score for Pulmonary Embolism (TEP) Calculator
 *
 * Estratificação de probabilidade pré-teste para tromboembolismo pulmonar.
 *
 * Referências:
 * - Wells PS, et al. Derivation of a simple clinical model to categorize
 *   patients probability of pulmonary embolism. Thromb Haemost. 2000.
 * - ESC Guidelines for the diagnosis and management of acute pulmonary
 *   embolism. Eur Heart J. 2019.
 */

import {
  WellsPeInput,
  WellsPeResult,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'ESC',
    title: 'Guidelines for the diagnosis and management of acute pulmonary embolism',
    year: 2019,
    url: 'https://www.escardio.org',
    evidenceLevel: '1A',
  },
  {
    source: 'Thrombosis and Haemostasis',
    title: 'Derivation of a simple clinical model to categorize patients probability of pulmonary embolism',
    year: 2000,
    evidenceLevel: '1A',
  },
  {
    source: 'SBC',
    title: 'Diretriz Brasileira de Tromboembolismo Pulmonar',
    year: 2022,
    evidenceLevel: '1B',
  },
]

/**
 * Pontuação de cada critério
 */
const POINTS = {
  clinicalSignsDvt: 3,
  alternativeDiagnosisLessLikely: 3,
  heartRate100: 1.5,
  immobilizationOrSurgery: 1.5,
  previousDvtOrPe: 1.5,
  hemoptysis: 1,
  malignancy: 1,
}

/**
 * Calcula o Wells Score para TEP
 */
export function calculateWellsPe(input: WellsPeInput): WellsPeResult {
  let score = 0

  if (input.clinicalSignsDvt) score += POINTS.clinicalSignsDvt
  if (input.alternativeDiagnosisLessLikely) score += POINTS.alternativeDiagnosisLessLikely
  if (input.heartRate100) score += POINTS.heartRate100
  if (input.immobilizationOrSurgery) score += POINTS.immobilizationOrSurgery
  if (input.previousDvtOrPe) score += POINTS.previousDvtOrPe
  if (input.hemoptysis) score += POINTS.hemoptysis
  if (input.malignancy) score += POINTS.malignancy

  const { probability, riskLevel, pePrevalence, interpretation, recommendation, nextStep } =
    interpretScore(score)

  return {
    score,
    probability,
    riskLevel,
    pePrevalence,
    interpretation,
    recommendation,
    nextStep,
    references: REFERENCES,
  }
}

function interpretScore(score: number): {
  probability: WellsPeResult['probability']
  riskLevel: RiskLevel
  pePrevalence: string
  interpretation: string
  recommendation: string
  nextStep: string
} {
  // Modelo de 3 níveis (original)
  if (score <= 1) {
    return {
      probability: 'low',
      riskLevel: 'low',
      pePrevalence: '1.3%',
      interpretation:
        'BAIXA PROBABILIDADE de TEP.',
      recommendation:
        'Solicitar D-dímero (alta sensibilidade).\n' +
        'Se D-dímero NEGATIVO: TEP excluído, investigar outras causas.\n' +
        'Se D-dímero POSITIVO: prosseguir com AngioTC de tórax.',
      nextStep: 'D-dímero',
    }
  }

  if (score <= 4) {
    return {
      probability: 'moderate',
      riskLevel: 'moderate',
      pePrevalence: '16.2%',
      interpretation:
        'PROBABILIDADE INTERMEDIÁRIA de TEP.',
      recommendation:
        'Solicitar D-dímero.\n' +
        'Se D-dímero NEGATIVO: TEP improvável, considerar outras causas.\n' +
        'Se D-dímero POSITIVO: AngioTC de tórax indicada.\n' +
        'Em pacientes com alta suspeita clínica, considerar AngioTC diretamente.',
      nextStep: 'D-dímero ou AngioTC',
    }
  }

  // score > 4
  return {
    probability: 'high',
    riskLevel: 'high',
    pePrevalence: '40.6%',
    interpretation:
      'ALTA PROBABILIDADE de TEP.',
    recommendation:
      'AngioTC de tórax indicada diretamente (não aguardar D-dímero).\n' +
      'Considerar anticoagulação empírica enquanto aguarda exame se:\n' +
      '• Instabilidade hemodinâmica\n' +
      '• Demora para realização do exame\n' +
      'Se AngioTC indisponível ou contraindicada: cintilografia V/Q ou eco.',
    nextStep: 'AngioTC de tórax',
  }
}

/**
 * Descrições dos critérios
 */
export const WELLS_PE_CRITERIA = {
  clinicalSignsDvt: {
    label: 'Sinais clínicos de TVP',
    description: 'Edema de membro inferior, dor à palpação do trajeto venoso profundo',
    points: 3,
  },
  alternativeDiagnosisLessLikely: {
    label: 'Diagnóstico alternativo menos provável que TEP',
    description: 'TEP é o diagnóstico mais provável ou igualmente provável',
    points: 3,
  },
  heartRate100: {
    label: 'Frequência cardíaca > 100 bpm',
    description: 'Taquicardia',
    points: 1.5,
  },
  immobilizationOrSurgery: {
    label: 'Imobilização ou cirurgia nas últimas 4 semanas',
    description: 'Imobilização ≥ 3 dias ou cirurgia nas últimas 4 semanas',
    points: 1.5,
  },
  previousDvtOrPe: {
    label: 'TVP ou TEP prévios',
    description: 'História de tromboembolismo venoso',
    points: 1.5,
  },
  hemoptysis: {
    label: 'Hemoptise',
    description: 'Presença de sangue no escarro',
    points: 1,
  },
  malignancy: {
    label: 'Malignidade',
    description: 'Câncer ativo (tratamento nos últimos 6 meses ou paliativo)',
    points: 1,
  },
}

/**
 * Versão simplificada (2 níveis)
 */
export function calculateWellsPeSimplified(input: WellsPeInput): {
  score: number
  isPeLikely: boolean
  recommendation: string
} {
  const result = calculateWellsPe(input)

  return {
    score: result.score,
    isPeLikely: result.score > 4,
    recommendation: result.score > 4
      ? 'TEP PROVÁVEL - Realizar AngioTC de tórax'
      : 'TEP IMPROVÁVEL - Realizar D-dímero',
  }
}

/**
 * Metadados da calculadora
 */
export const wellsPeMetadata = {
  id: 'wells-pe',
  name: 'Wells Score para TEP',
  description:
    'Estratificação de probabilidade pré-teste para Tromboembolismo Pulmonar (TEP). ' +
    'Auxilia na decisão de solicitar D-dímero ou imagem.',
  category: 'respiratory' as const,
  syndromeIds: ['dispneia', 'dor_toracica'],
  references: REFERENCES,
  version: '1.0.0',
}
