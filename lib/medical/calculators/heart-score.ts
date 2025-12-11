/**
 * HEART Score Calculator
 *
 * Avaliação de risco de eventos cardíacos maiores (MACE) em pacientes
 * com dor torácica no pronto-socorro.
 *
 * Referências:
 * - Six AJ, et al. Chest pain in the emergency room: value of the HEART score.
 *   Neth Heart J. 2008;16(6):191-196.
 * - Backus BE, et al. A prospective validation of the HEART score.
 *   Ann Emerg Med. 2013;61(6):606-614.
 */

import {
  HeartScoreInput,
  HeartScoreResult,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'SBC',
    title: 'Diretriz Brasileira de Síndrome Coronariana Aguda sem Supradesnivelamento do Segmento ST',
    year: 2021,
    url: 'https://www.portal.cardiol.br',
    evidenceLevel: '1A',
  },
  {
    source: 'AHA/ACC',
    title: 'Guideline for the Evaluation and Diagnosis of Chest Pain',
    year: 2021,
    url: 'https://www.ahajournals.org',
    evidenceLevel: '1A',
  },
  {
    source: 'Annals of Emergency Medicine',
    title: 'A prospective validation of the HEART score for chest pain patients at the emergency department',
    year: 2013,
    evidenceLevel: '1B',
  },
]

/**
 * Calcula o HEART Score
 */
export function calculateHeartScore(input: HeartScoreInput): HeartScoreResult {
  const breakdown = {
    history: calculateHistoryScore(input.history),
    ecg: calculateEcgScore(input.ecg),
    age: calculateAgeScore(input.age),
    riskFactors: calculateRiskFactorsScore(input.riskFactors),
    troponin: calculateTroponinScore(input.troponin),
  }

  const score =
    breakdown.history +
    breakdown.ecg +
    breakdown.age +
    breakdown.riskFactors +
    breakdown.troponin

  const { riskLevel, maceRisk, interpretation, recommendation } =
    interpretScore(score)

  return {
    score,
    breakdown,
    riskLevel,
    maceRisk,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

function calculateHistoryScore(
  history: HeartScoreInput['history']
): number {
  switch (history) {
    case 'slightly_suspicious':
      return 0
    case 'moderately_suspicious':
      return 1
    case 'highly_suspicious':
      return 2
  }
}

function calculateEcgScore(ecg: HeartScoreInput['ecg']): number {
  switch (ecg) {
    case 'normal':
      return 0
    case 'nonspecific_repolarization':
      return 1
    case 'significant_st_deviation':
      return 2
  }
}

function calculateAgeScore(age: number): number {
  if (age < 45) return 0
  if (age <= 64) return 1
  return 2
}

function calculateRiskFactorsScore(
  riskFactors: HeartScoreInput['riskFactors']
): number {
  const count = Object.values(riskFactors).filter(Boolean).length

  if (count === 0) return 0
  if (count <= 2) return 1
  return 2
}

function calculateTroponinScore(
  troponin: HeartScoreInput['troponin']
): number {
  switch (troponin) {
    case 'normal':
      return 0
    case 'elevated_1_3x':
      return 1
    case 'elevated_3x':
      return 2
  }
}

function interpretScore(score: number): {
  riskLevel: RiskLevel
  maceRisk: string
  interpretation: string
  recommendation: string
} {
  if (score <= 3) {
    return {
      riskLevel: 'low',
      maceRisk: '0.9-1.7% em 6 semanas',
      interpretation:
        'Baixo risco de eventos cardíacos adversos maiores (MACE)',
      recommendation:
        'Considerar alta precoce com acompanhamento ambulatorial. ' +
        'Orientar retorno se piora dos sintomas. ' +
        'Não há necessidade de internação ou investigação invasiva imediata.',
    }
  }

  if (score <= 6) {
    return {
      riskLevel: 'moderate',
      maceRisk: '12-16.6% em 6 semanas',
      interpretation:
        'Risco intermediário de eventos cardíacos adversos maiores (MACE)',
      recommendation:
        'Observação em unidade de dor torácica. ' +
        'Considerar teste provocativo (ergometria, cintilografia ou eco de estresse). ' +
        'Avaliação cardiológica recomendada antes da alta.',
    }
  }

  return {
    riskLevel: 'high',
    maceRisk: '50-65% em 6 semanas',
    interpretation:
      'Alto risco de eventos cardíacos adversos maiores (MACE)',
    recommendation:
      'Internação em unidade coronariana ou terapia intensiva. ' +
      'Iniciar terapia antitrombótica conforme protocolo de SCA. ' +
      'Estratificação invasiva precoce (cateterismo cardíaco) recomendada. ' +
      'Monitorização contínua e seriamento de troponina.',
  }
}

/**
 * Metadados da calculadora
 */
export const heartScoreMetadata = {
  id: 'heart-score',
  name: 'HEART Score',
  description:
    'Estratificação de risco para pacientes com dor torácica no pronto-socorro. ' +
    'Prediz risco de eventos cardíacos adversos maiores (MACE) em 6 semanas.',
  category: 'cardiovascular' as const,
  syndromeIds: ['dor_toracica'],
  references: REFERENCES,
  version: '1.0.0',
}
