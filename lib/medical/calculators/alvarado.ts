/**
 * Alvarado Score (MANTRELS) Calculator
 *
 * Estratificação de probabilidade para apendicite aguda.
 *
 * Referências:
 * - Alvarado A. A practical score for the early diagnosis of acute appendicitis.
 *   Ann Emerg Med. 1986;15(5):557-564.
 * - WSES Jerusalem guidelines for diagnosis and treatment of acute appendicitis.
 *   World J Emerg Surg. 2020.
 */

import {
  AlvaradoInput,
  AlvaradoResult,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'World Journal of Emergency Surgery',
    title: 'WSES Jerusalem guidelines for diagnosis and treatment of acute appendicitis',
    year: 2020,
    url: 'https://wjes.biomedcentral.com',
    evidenceLevel: '1A',
  },
  {
    source: 'Annals of Emergency Medicine',
    title: 'A practical score for the early diagnosis of acute appendicitis',
    year: 1986,
    evidenceLevel: '1B',
  },
  {
    source: 'Colégio Brasileiro de Cirurgiões',
    title: 'Diretrizes para o Tratamento da Apendicite Aguda',
    year: 2021,
    evidenceLevel: '2A',
  },
]

/**
 * Pontuação de cada critério (MANTRELS)
 */
const POINTS = {
  // Sintomas
  migratoryPain: 1,        // M - Migration of pain to RLQ
  anorexia: 1,             // A - Anorexia
  nausea: 1,               // N - Nausea/Vomiting

  // Sinais
  rightLowerQuadrantTenderness: 2,  // T - Tenderness in RLQ
  reboundTenderness: 1,             // R - Rebound pain
  fever: 1,                         // E - Elevated temperature (>37.3°C)

  // Laboratório
  leukocytosis: 2,         // L - Leukocytosis (>10.000)
  leftShift: 1,            // S - Shift to left (>75% neutrófilos)
}

/**
 * Calcula o Alvarado Score
 */
export function calculateAlvarado(input: AlvaradoInput): AlvaradoResult {
  let score = 0

  // Sintomas (M-A-N)
  if (input.migratoryPain) score += POINTS.migratoryPain
  if (input.anorexia) score += POINTS.anorexia
  if (input.nausea) score += POINTS.nausea

  // Sinais (T-R-E)
  if (input.rightLowerQuadrantTenderness) score += POINTS.rightLowerQuadrantTenderness
  if (input.reboundTenderness) score += POINTS.reboundTenderness
  if (input.fever) score += POINTS.fever

  // Laboratório (L-S)
  if (input.leukocytosis) score += POINTS.leukocytosis
  if (input.leftShift) score += POINTS.leftShift

  const { probability, riskLevel, interpretation, recommendation } =
    interpretScore(score)

  return {
    score,
    probability,
    riskLevel,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

function interpretScore(score: number): {
  probability: AlvaradoResult['probability']
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
} {
  if (score <= 3) {
    return {
      probability: 'unlikely',
      riskLevel: 'low',
      interpretation:
        'Apendicite IMPROVÁVEL (< 7% de probabilidade).',
      recommendation:
        'BAIXO RISCO:\\n' +
        '• Apendicite muito improvável\\n' +
        '• Investigar diagnósticos diferenciais\\n' +
        '• Considerar alta com orientações e retorno se piora\\n' +
        '• Imagem geralmente não necessária\\n' +
        '• Reavaliar se persistência dos sintomas',
    }
  }

  if (score <= 6) {
    return {
      probability: 'possible',
      riskLevel: 'moderate',
      interpretation:
        'Apendicite POSSÍVEL (probabilidade 30-40%).',
      recommendation:
        'RISCO INTERMEDIÁRIO:\\n' +
        '• Imagem recomendada (TC de abdome ou US)\\n' +
        '• Observação clínica com reavaliação seriada\\n' +
        '• Seriamento de hemograma e PCR\\n' +
        '• Avaliação cirúrgica se piora ou imagem positiva\\n' +
        '• Considerar internação para observação',
    }
  }

  if (score <= 8) {
    return {
      probability: 'probable',
      riskLevel: 'high',
      interpretation:
        'Apendicite PROVÁVEL (probabilidade 70-80%).',
      recommendation:
        'ALTO RISCO:\\n' +
        '• Avaliação cirúrgica URGENTE\\n' +
        '• TC de abdome para confirmar e avaliar complicações\\n' +
        '• Iniciar antibioticoterapia (cefazolina + metronidazol)\\n' +
        '• Jejum e acesso venoso\\n' +
        '• Preparo para possível cirurgia\\n' +
        '• Consentimento informado',
    }
  }

  // score 9-10
  return {
    probability: 'very_likely',
    riskLevel: 'critical',
    interpretation:
      'Apendicite MUITO PROVÁVEL (probabilidade > 90%).',
    recommendation:
      'EMERGÊNCIA CIRÚRGICA:\\n' +
      '• Avaliação cirúrgica IMEDIATA\\n' +
      '• TC pode ser dispensada se quadro clínico clássico\\n' +
      '• Antibioticoterapia de amplo espectro\\n' +
      '• Preparo cirúrgico imediato\\n' +
      '• Alto risco de apendicite complicada (perfuração, abscesso)\\n' +
      '• Laparoscopia ou laparotomia indicada',
  }
}

/**
 * Descrições dos critérios (MANTRELS)
 */
export const ALVARADO_CRITERIA = {
  // Sintomas
  migratoryPain: {
    label: 'Dor Migratória para FID',
    description: 'Dor que iniciou periumbilical e migrou para fossa ilíaca direita',
    category: 'symptoms',
    mnemonic: 'M',
    points: 1,
  },
  anorexia: {
    label: 'Anorexia',
    description: 'Perda de apetite',
    category: 'symptoms',
    mnemonic: 'A',
    points: 1,
  },
  nausea: {
    label: 'Náusea/Vômito',
    description: 'Presença de náusea ou vômitos',
    category: 'symptoms',
    mnemonic: 'N',
    points: 1,
  },

  // Sinais
  rightLowerQuadrantTenderness: {
    label: 'Dor à Palpação em FID',
    description: 'Sensibilidade na fossa ilíaca direita (ponto de McBurney)',
    category: 'signs',
    mnemonic: 'T',
    points: 2,
  },
  reboundTenderness: {
    label: 'Dor à Descompressão',
    description: 'Sinal de Blumberg positivo (dor à descompressão brusca)',
    category: 'signs',
    mnemonic: 'R',
    points: 1,
  },
  fever: {
    label: 'Febre',
    description: 'Temperatura > 37.3°C',
    category: 'signs',
    mnemonic: 'E',
    points: 1,
  },

  // Laboratório
  leukocytosis: {
    label: 'Leucocitose',
    description: 'Leucócitos > 10.000/mm³',
    category: 'labs',
    mnemonic: 'L',
    points: 2,
  },
  leftShift: {
    label: 'Desvio à Esquerda',
    description: 'Neutrófilos > 75% (neutrofilia)',
    category: 'labs',
    mnemonic: 'S',
    points: 1,
  },
}

/**
 * Diagnósticos diferenciais a considerar
 */
export const DIFFERENTIAL_DIAGNOSES = [
  'Adenite mesentérica',
  'Doença inflamatória pélvica',
  'Gravidez ectópica',
  'Cisto ovariano torcido/roto',
  'Gastroenterite aguda',
  'Infecção do trato urinário',
  'Cólica renal',
  'Diverticulite (cecal)',
  'Doença de Crohn',
  'Intussuscepção (pediátrico)',
]

/**
 * Metadados da calculadora
 */
export const alvaradoMetadata = {
  id: 'alvarado',
  name: 'Alvarado Score (MANTRELS)',
  description:
    'Estratificação de probabilidade para apendicite aguda. ' +
    'Mnemônico MANTRELS. Score 0-10, com ≥ 7 indicando alta probabilidade.',
  category: 'abdominal' as const,
  syndromeIds: ['dor_abdominal'],
  references: REFERENCES,
  version: '1.0.0',
}
