/**
 * CHA₂DS₂-VASc Score Calculator
 *
 * Estratificação de risco de AVC em pacientes com Fibrilação Atrial
 * não-valvar para decisão de anticoagulação.
 *
 * Referências:
 * - Lip GY, et al. Refining clinical risk stratification for predicting
 *   stroke and thromboembolism in atrial fibrillation. Chest. 2010.
 * - ESC Guidelines for atrial fibrillation. Eur Heart J. 2020.
 */

import {
  Cha2ds2VascInput,
  Cha2ds2VascResult,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'ESC',
    title: 'Guidelines for the diagnosis and management of atrial fibrillation',
    year: 2020,
    url: 'https://www.escardio.org',
    evidenceLevel: '1A',
  },
  {
    source: 'Chest',
    title: 'Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation',
    year: 2010,
    evidenceLevel: '1A',
  },
  {
    source: 'SBC',
    title: 'Diretrizes Brasileiras de Fibrilação Atrial',
    year: 2022,
    evidenceLevel: '1B',
  },
]

/**
 * Pontuação de cada fator
 */
const POINTS = {
  congestiveHeartFailure: 1,  // C - CHF/LV dysfunction
  hypertension: 1,            // H - Hypertension
  age75: 2,                   // A₂ - Age ≥ 75
  diabetes: 1,                // D - Diabetes
  strokeTiaHistory: 2,        // S₂ - Stroke/TIA/TE history
  vascularDisease: 1,         // V - Vascular disease
  age65to74: 1,               // A - Age 65-74
  female: 1,                  // Sc - Sex category (female)
}

/**
 * Calcula o CHA₂DS₂-VASc Score
 */
export function calculateCha2ds2Vasc(input: Cha2ds2VascInput): Cha2ds2VascResult {
  let score = 0

  if (input.congestiveHeartFailure) score += POINTS.congestiveHeartFailure
  if (input.hypertension) score += POINTS.hypertension
  if (input.age75) score += POINTS.age75
  if (input.diabetes) score += POINTS.diabetes
  if (input.strokeTiaHistory) score += POINTS.strokeTiaHistory
  if (input.vascularDisease) score += POINTS.vascularDisease
  if (input.age65to74 && !input.age75) score += POINTS.age65to74 // não somar se já tem ≥75
  if (input.female) score += POINTS.female

  const { annualStrokeRisk, riskLevel, anticoagulationRecommended, interpretation, recommendation } =
    interpretScore(score, input.female)

  return {
    score,
    annualStrokeRisk,
    riskLevel,
    anticoagulationRecommended,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

function interpretScore(
  score: number,
  isFemale: boolean
): {
  annualStrokeRisk: string
  riskLevel: RiskLevel
  anticoagulationRecommended: boolean
  interpretation: string
  recommendation: string
} {
  // Risco anual de AVC aproximado por score
  const strokeRiskTable: Record<number, string> = {
    0: '0%',
    1: '1.3%',
    2: '2.2%',
    3: '3.2%',
    4: '4.0%',
    5: '6.7%',
    6: '9.8%',
    7: '9.6%',
    8: '12.5%',
    9: '15.2%',
  }

  const annualStrokeRisk = strokeRiskTable[Math.min(score, 9)] || '>15%'

  // Homens: score 0 = baixo, 1 = intermediário, ≥2 = alto
  // Mulheres: o ponto de "sexo feminino" não conta sozinho
  const adjustedScoreForDecision = isFemale && score === 1 ? 0 : score

  if (adjustedScoreForDecision === 0) {
    return {
      annualStrokeRisk,
      riskLevel: 'low',
      anticoagulationRecommended: false,
      interpretation:
        'CHA₂DS₂-VASc = 0 (homens) ou 1 (mulheres apenas pelo sexo) - BAIXO RISCO.',
      recommendation:
        'BAIXO RISCO - ANTICOAGULAÇÃO NÃO RECOMENDADA:\\n' +
        '• Risco de sangramento supera benefício\\n' +
        '• Nenhuma terapia antitrombótica indicada\\n' +
        '• Controle de fatores de risco cardiovascular\\n' +
        '• Reavaliar periodicamente (anual ou se novos fatores)',
    }
  }

  if (adjustedScoreForDecision === 1) {
    return {
      annualStrokeRisk,
      riskLevel: 'moderate',
      anticoagulationRecommended: true, // ESC 2020 recomenda considerar
      interpretation:
        'CHA₂DS₂-VASc = 1 (homens) ou 2 (mulheres) - RISCO INTERMEDIÁRIO.',
      recommendation:
        'RISCO INTERMEDIÁRIO - CONSIDERAR ANTICOAGULAÇÃO:\\n' +
        '• Anticoagulação oral deve ser CONSIDERADA\\n' +
        '• Preferência por DOACs sobre varfarina\\n' +
        '• Avaliar risco de sangramento (HAS-BLED)\\n' +
        '• Decisão compartilhada com paciente\\n' +
        '• Se optar por não anticoagular, reavaliar frequentemente',
    }
  }

  // score >= 2
  return {
    annualStrokeRisk,
    riskLevel: score >= 4 ? 'critical' : 'high',
    anticoagulationRecommended: true,
    interpretation:
      `CHA₂DS₂-VASc ≥ 2 - ALTO RISCO de AVC (${annualStrokeRisk}/ano).`,
    recommendation:
      'ALTO RISCO - ANTICOAGULAÇÃO RECOMENDADA:\\n' +
      '• Anticoagulação oral RECOMENDADA\\n' +
      '• DOACs preferidos: Apixabana, Rivaroxabana, Dabigatrana, Edoxabana\\n' +
      '• Varfarina se contraindicação a DOACs ou FA valvar\\n' +
      '• Calcular HAS-BLED para risco de sangramento\\n' +
      '• NÃO usar apenas AAS para prevenção de AVC em FA\\n' +
      '• Considerar ablação para controle de ritmo',
  }
}

/**
 * Descrições dos critérios
 */
export const CHA2DS2_VASC_CRITERIA = {
  congestiveHeartFailure: {
    label: 'Insuficiência Cardíaca / Disfunção VE',
    description: 'IC sintomática ou FE < 40%',
    mnemonic: 'C',
    points: 1,
  },
  hypertension: {
    label: 'Hipertensão Arterial',
    description: 'PA > 140/90 ou em uso de anti-hipertensivos',
    mnemonic: 'H',
    points: 1,
  },
  age75: {
    label: 'Idade ≥ 75 anos',
    description: 'Fator de alto risco',
    mnemonic: 'A₂',
    points: 2,
  },
  diabetes: {
    label: 'Diabetes Mellitus',
    description: 'Em uso de hipoglicemiantes ou insulina',
    mnemonic: 'D',
    points: 1,
  },
  strokeTiaHistory: {
    label: 'AVC/AIT/Tromboembolismo prévio',
    description: 'História de evento tromboembólico',
    mnemonic: 'S₂',
    points: 2,
  },
  vascularDisease: {
    label: 'Doença Vascular',
    description: 'IAM prévio, DAP ou placa aórtica',
    mnemonic: 'V',
    points: 1,
  },
  age65to74: {
    label: 'Idade 65-74 anos',
    description: 'Fator de risco moderado para idade',
    mnemonic: 'A',
    points: 1,
  },
  female: {
    label: 'Sexo Feminino',
    description: 'Sexo feminino como modificador de risco',
    mnemonic: 'Sc',
    points: 1,
    note: 'Não conta isoladamente para indicação de anticoagulação',
  },
}

/**
 * Opções de DOACs com doses padrão
 */
export const DOAC_OPTIONS = [
  {
    name: 'Apixabana',
    standardDose: '5mg 2x/dia',
    reducedDose: '2.5mg 2x/dia',
    reducedDoseCriteria: '≥2 de: idade ≥80, peso ≤60kg, Cr ≥1.5',
  },
  {
    name: 'Rivaroxabana',
    standardDose: '20mg 1x/dia',
    reducedDose: '15mg 1x/dia',
    reducedDoseCriteria: 'ClCr 15-50 mL/min',
  },
  {
    name: 'Dabigatrana',
    standardDose: '150mg 2x/dia',
    reducedDose: '110mg 2x/dia',
    reducedDoseCriteria: 'Idade ≥80, alto risco sangramento, ClCr 30-50',
  },
  {
    name: 'Edoxabana',
    standardDose: '60mg 1x/dia',
    reducedDose: '30mg 1x/dia',
    reducedDoseCriteria: 'Peso ≤60kg, ClCr 15-50, uso de inibidores P-gp',
  },
]

/**
 * Metadados da calculadora
 */
export const cha2ds2VascMetadata = {
  id: 'cha2ds2-vasc',
  name: 'CHA₂DS₂-VASc Score',
  description:
    'Estratificação de risco de AVC em Fibrilação Atrial não-valvar. ' +
    'Guia decisão de anticoagulação. Score ≥ 2 recomenda anticoagulação.',
  category: 'cardiovascular' as const,
  syndromeIds: ['dor_toracica', 'sincope'],
  references: REFERENCES,
  version: '1.0.0',
}
