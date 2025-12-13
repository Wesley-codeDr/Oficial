/**
 * NEWS2 (National Early Warning Score 2) Calculator
 *
 * Sistema de alerta precoce para deterioração clínica.
 * Padronizado pelo NHS England.
 *
 * Referências:
 * - Royal College of Physicians. National Early Warning Score (NEWS) 2. 2017.
 * - NHS England. NEWS2 Implementation Guide. 2018.
 */

import {
  News2Input,
  News2Result,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'Royal College of Physicians',
    title: 'National Early Warning Score (NEWS) 2',
    year: 2017,
    url: 'https://www.rcplondon.ac.uk',
    evidenceLevel: '1A',
  },
  {
    source: 'NHS England',
    title: 'NEWS2 and deteriorating patients',
    year: 2018,
    evidenceLevel: '1A',
  },
  {
    source: 'AMIB',
    title: 'Consenso Brasileiro sobre Escores de Alerta Precoce',
    year: 2021,
    evidenceLevel: '2A',
  },
]

/**
 * Calcula o NEWS2 Score
 */
export function calculateNews2(input: News2Input): News2Result {
  const breakdown = {
    respiratoryRate: scoreRespiratoryRate(input.respiratoryRate),
    oxygenSaturation: scoreOxygenSaturation(input.oxygenSaturation),
    supplementalOxygen: input.supplementalOxygen ? 2 : 0,
    temperature: scoreTemperature(input.temperature),
    systolicBp: scoreSystolicBp(input.systolicBp),
    heartRate: scoreHeartRate(input.heartRate),
    consciousness: scoreConsciousness(input.consciousness),
  }

  const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0)

  const { clinicalRisk, riskLevel, responseRequired, interpretation, recommendation } =
    interpretScore(score, breakdown)

  return {
    score,
    breakdown,
    clinicalRisk,
    riskLevel,
    responseRequired,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

function scoreRespiratoryRate(rr: number): number {
  if (rr <= 8) return 3
  if (rr <= 11) return 1
  if (rr <= 20) return 0
  if (rr <= 24) return 2
  return 3
}

function scoreOxygenSaturation(spo2: number): number {
  if (spo2 <= 91) return 3
  if (spo2 <= 93) return 2
  if (spo2 <= 95) return 1
  return 0
}

function scoreTemperature(temp: number): number {
  if (temp <= 35.0) return 3
  if (temp <= 36.0) return 1
  if (temp <= 38.0) return 0
  if (temp <= 39.0) return 1
  return 2
}

function scoreSystolicBp(sbp: number): number {
  if (sbp <= 90) return 3
  if (sbp <= 100) return 2
  if (sbp <= 110) return 1
  if (sbp <= 219) return 0
  return 3
}

function scoreHeartRate(hr: number): number {
  if (hr <= 40) return 3
  if (hr <= 50) return 1
  if (hr <= 90) return 0
  if (hr <= 110) return 1
  if (hr <= 130) return 2
  return 3
}

function scoreConsciousness(consciousness: News2Input['consciousness']): number {
  switch (consciousness) {
    case 'alert':
      return 0
    case 'voice':
    case 'pain':
    case 'unresponsive':
      return 3
  }
}

function interpretScore(
  score: number,
  breakdown: News2Result['breakdown']
): {
  clinicalRisk: News2Result['clinicalRisk']
  riskLevel: RiskLevel
  responseRequired: string
  interpretation: string
  recommendation: string
} {
  // Verificar se há algum parâmetro com score 3 (trigger individual)
  const hasExtremeTrigger = Object.values(breakdown).some(v => v === 3)

  if (score >= 7) {
    return {
      clinicalRisk: 'high',
      riskLevel: 'critical',
      responseRequired: 'Resposta clínica IMEDIATA (equipe de emergência)',
      interpretation:
        'NEWS2 ≥ 7 - RISCO ALTO. Emergência clínica.',
      recommendation:
        'EMERGÊNCIA - AÇÃO IMEDIATA:\\n' +
        '• Acionar equipe de resposta rápida/emergência\\n' +
        '• Avaliação médica urgente\\n' +
        '• Considerar transferência para UTI\\n' +
        '• Monitorização contínua\\n' +
        '• Reavaliação a cada 15-30 minutos',
    }
  }

  if (score >= 5 || hasExtremeTrigger) {
    return {
      clinicalRisk: 'medium',
      riskLevel: 'high',
      responseRequired: 'Resposta clínica URGENTE',
      interpretation:
        hasExtremeTrigger && score < 5
          ? 'NEWS2 com parâmetro extremo (score 3) - RISCO MÉDIO-ALTO.'
          : 'NEWS2 5-6 - RISCO MÉDIO-ALTO.',
      recommendation:
        'URGENTE - RESPOSTA RÁPIDA:\\n' +
        '• Avaliação médica urgente (< 30 min)\\n' +
        '• Considerar Time de Resposta Rápida\\n' +
        '• Aumentar frequência de monitorização\\n' +
        '• Reavaliação horária no mínimo\\n' +
        '• Considerar escalonamento de cuidados',
    }
  }

  if (score >= 1 && score <= 4) {
    return {
      clinicalRisk: 'low_medium',
      riskLevel: 'moderate',
      responseRequired: 'Avaliação por enfermeiro, informar equipe médica',
      interpretation:
        'NEWS2 1-4 - RISCO BAIXO-MÉDIO.',
      recommendation:
        'VIGILÂNCIA AUMENTADA:\\n' +
        '• Avaliação por enfermeiro qualificado\\n' +
        '• Informar equipe médica\\n' +
        '• Monitorização a cada 4-6 horas\\n' +
        '• Considerar aumento da frequência se tendência de piora\\n' +
        '• Documentar plano de cuidados',
    }
  }

  // score === 0
  return {
    clinicalRisk: 'low',
    riskLevel: 'low',
    responseRequired: 'Monitorização de rotina',
    interpretation:
      'NEWS2 = 0 - RISCO BAIXO. Parâmetros dentro da normalidade.',
    recommendation:
      'ROTINA:\\n' +
      '• Manter monitorização padrão\\n' +
      '• Reavaliação a cada 12 horas no mínimo\\n' +
      '• Continuar plano terapêutico atual',
  }
}

/**
 * Descrições dos parâmetros com faixas de pontuação
 */
export const NEWS2_PARAMETERS = {
  respiratoryRate: {
    label: 'Frequência Respiratória',
    unit: 'rpm',
    ranges: [
      { min: 0, max: 8, score: 3, label: '≤8' },
      { min: 9, max: 11, score: 1, label: '9-11' },
      { min: 12, max: 20, score: 0, label: '12-20' },
      { min: 21, max: 24, score: 2, label: '21-24' },
      { min: 25, max: 999, score: 3, label: '≥25' },
    ],
  },
  oxygenSaturation: {
    label: 'Saturação de O2',
    unit: '%',
    ranges: [
      { min: 0, max: 91, score: 3, label: '≤91' },
      { min: 92, max: 93, score: 2, label: '92-93' },
      { min: 94, max: 95, score: 1, label: '94-95' },
      { min: 96, max: 100, score: 0, label: '≥96' },
    ],
  },
  supplementalOxygen: {
    label: 'Oxigênio Suplementar',
    options: [
      { value: false, score: 0, label: 'Ar ambiente' },
      { value: true, score: 2, label: 'Em uso de O2' },
    ],
  },
  temperature: {
    label: 'Temperatura',
    unit: '°C',
    ranges: [
      { min: 0, max: 35.0, score: 3, label: '≤35.0' },
      { min: 35.1, max: 36.0, score: 1, label: '35.1-36.0' },
      { min: 36.1, max: 38.0, score: 0, label: '36.1-38.0' },
      { min: 38.1, max: 39.0, score: 1, label: '38.1-39.0' },
      { min: 39.1, max: 99, score: 2, label: '≥39.1' },
    ],
  },
  systolicBp: {
    label: 'Pressão Arterial Sistólica',
    unit: 'mmHg',
    ranges: [
      { min: 0, max: 90, score: 3, label: '≤90' },
      { min: 91, max: 100, score: 2, label: '91-100' },
      { min: 101, max: 110, score: 1, label: '101-110' },
      { min: 111, max: 219, score: 0, label: '111-219' },
      { min: 220, max: 999, score: 3, label: '≥220' },
    ],
  },
  heartRate: {
    label: 'Frequência Cardíaca',
    unit: 'bpm',
    ranges: [
      { min: 0, max: 40, score: 3, label: '≤40' },
      { min: 41, max: 50, score: 1, label: '41-50' },
      { min: 51, max: 90, score: 0, label: '51-90' },
      { min: 91, max: 110, score: 1, label: '91-110' },
      { min: 111, max: 130, score: 2, label: '111-130' },
      { min: 131, max: 999, score: 3, label: '≥131' },
    ],
  },
  consciousness: {
    label: 'Nível de Consciência (AVPU)',
    options: [
      { value: 'alert', score: 0, label: 'Alerta' },
      { value: 'voice', score: 3, label: 'Responde à Voz' },
      { value: 'pain', score: 3, label: 'Responde à Dor' },
      { value: 'unresponsive', score: 3, label: 'Não Responde' },
    ],
  },
}

/**
 * Metadados da calculadora
 */
export const news2Metadata = {
  id: 'news2',
  name: 'NEWS2 (National Early Warning Score 2)',
  description:
    'Sistema de alerta precoce para identificação de deterioração clínica. ' +
    'Avalia 7 parâmetros fisiológicos. Score ≥ 5 requer resposta urgente.',
  category: 'general' as const,
  syndromeIds: ['febre', 'dispneia'],
  references: REFERENCES,
  version: '1.0.0',
}
