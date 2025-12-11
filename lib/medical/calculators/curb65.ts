/**
 * CURB-65 Score Calculator
 *
 * Estratificação de gravidade e local de tratamento para Pneumonia Adquirida
 * na Comunidade (PAC).
 *
 * Referências:
 * - Lim WS, et al. Defining community acquired pneumonia severity on
 *   presentation to hospital. Thorax. 2003;58:377-382.
 * - British Thoracic Society Guidelines for CAP. 2009, updated 2015.
 */

import {
  Curb65Input,
  Curb65Result,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'British Thoracic Society',
    title: 'Guidelines for the management of community acquired pneumonia in adults',
    year: 2015,
    url: 'https://www.brit-thoracic.org.uk',
    evidenceLevel: '1A',
  },
  {
    source: 'Thorax',
    title: 'Defining community acquired pneumonia severity on presentation to hospital',
    year: 2003,
    evidenceLevel: '1A',
  },
  {
    source: 'SBPT',
    title: 'Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade em Adultos',
    year: 2022,
    evidenceLevel: '1B',
  },
]

/**
 * Calcula o CURB-65 Score
 */
export function calculateCurb65(input: Curb65Input): Curb65Result {
  let score = 0

  if (input.confusion) score += 1          // C - Confusion
  if (input.urea7) score += 1              // U - Urea > 7 mmol/L (BUN > 19)
  if (input.respiratoryRate30) score += 1  // R - Respiratory rate ≥ 30
  if (input.bloodPressureLow) score += 1   // B - Blood pressure (SBP < 90 or DBP ≤ 60)
  if (input.age65) score += 1              // 65 - Age ≥ 65

  const { mortality30Day, riskLevel, recommendation, disposition, interpretation } =
    interpretScore(score)

  return {
    score,
    mortality30Day,
    riskLevel,
    recommendation,
    disposition,
    interpretation,
    references: REFERENCES,
  }
}

function interpretScore(score: number): {
  mortality30Day: string
  riskLevel: RiskLevel
  recommendation: Curb65Result['recommendation']
  disposition: string
  interpretation: string
} {
  if (score === 0) {
    return {
      mortality30Day: '0.6%',
      riskLevel: 'low',
      recommendation: 'outpatient',
      disposition: 'Tratamento ambulatorial',
      interpretation:
        'CURB-65 = 0 - BAIXO RISCO. Mortalidade < 1%.',
    }
  }

  if (score === 1) {
    return {
      mortality30Day: '2.7%',
      riskLevel: 'low',
      recommendation: 'outpatient',
      disposition: 'Tratamento ambulatorial (considerar observação curta)',
      interpretation:
        'CURB-65 = 1 - BAIXO RISCO. Mortalidade ~3%.',
    }
  }

  if (score === 2) {
    return {
      mortality30Day: '6.8%',
      riskLevel: 'moderate',
      recommendation: 'short_admission',
      disposition: 'Internação hospitalar curta ou observação prolongada',
      interpretation:
        'CURB-65 = 2 - RISCO INTERMEDIÁRIO. Mortalidade ~7%.',
    }
  }

  if (score === 3) {
    return {
      mortality30Day: '14%',
      riskLevel: 'high',
      recommendation: 'icu_admission',
      disposition: 'Internação hospitalar - considerar UTI',
      interpretation:
        'CURB-65 = 3 - RISCO ALTO. Mortalidade ~14%.',
    }
  }

  // score 4-5
  return {
    mortality30Day: score === 4 ? '27%' : '57%',
    riskLevel: 'critical',
    recommendation: 'icu_admission',
    disposition: 'UTI - Pneumonia grave',
    interpretation:
      `CURB-65 = ${score} - RISCO MUITO ALTO. Mortalidade ${score === 4 ? '27%' : '57%'}.`,
  }
}

/**
 * Retorna recomendação detalhada baseada no score
 */
export function getCurb65Recommendation(score: number): string {
  if (score <= 1) {
    return (
      'TRATAMENTO AMBULATORIAL:\\n' +
      '• Antibioticoterapia oral:\\n' +
      '  - Amoxicilina 500mg 8/8h 7 dias OU\\n' +
      '  - Azitromicina 500mg/dia 3 dias (se alérgico)\\n' +
      '• Hidratação adequada\\n' +
      '• Retorno se piora (dispneia, febre persistente)\\n' +
      '• Reavaliação em 48-72h'
    )
  }

  if (score === 2) {
    return (
      'INTERNAÇÃO CURTA / OBSERVAÇÃO:\\n' +
      '• Antibioticoterapia:\\n' +
      '  - Amoxicilina-clavulanato EV + Azitromicina OU\\n' +
      '  - Fluoroquinolona respiratória (levofloxacino)\\n' +
      '• Monitorização de sinais vitais\\n' +
      '• Oximetria contínua\\n' +
      '• Considerar alta precoce se melhora em 24-48h'
    )
  }

  if (score === 3) {
    return (
      'INTERNAÇÃO - CONSIDERAR UTI:\\n' +
      '• Antibioticoterapia EV:\\n' +
      '  - Ceftriaxona 2g/dia + Azitromicina 500mg/dia OU\\n' +
      '  - Levofloxacino 750mg/dia\\n' +
      '• Hemoculturas antes de ATB\\n' +
      '• Gasometria arterial\\n' +
      '• Considerar necessidade de O2 suplementar/VNI\\n' +
      '• Avaliação diária de critérios de UTI'
    )
  }

  // score 4-5
  return (
    'UTI - PNEUMONIA GRAVE:\\n' +
    '• Antibioticoterapia EV de amplo espectro:\\n' +
    '  - Ceftriaxona + Azitromicina + considerar cobertura para Pseudomonas\\n' +
    '• Hemoculturas, culturas respiratórias\\n' +
    '• Gasometria arterial seriada\\n' +
    '• Suporte ventilatório (O2, VNI, ou IOT se necessário)\\n' +
    '• Monitorização hemodinâmica\\n' +
    '• Considerar vasopressores se choque\\n' +
    '• Pesquisar complicações (derrame pleural, empiema)'
  )
}

/**
 * Descrições dos critérios
 */
export const CURB65_CRITERIA = {
  confusion: {
    label: 'Confusão Mental',
    description: 'Confusão mental nova (desorientação em pessoa, tempo ou lugar)',
    mnemonic: 'C',
    points: 1,
  },
  urea7: {
    label: 'Ureia > 7 mmol/L (ou BUN > 19 mg/dL)',
    description: 'Ureia sérica elevada indicando disfunção renal ou desidratação',
    mnemonic: 'U',
    points: 1,
    note: 'Converter: Ureia (mg/dL) × 0.357 = mmol/L | BUN (mg/dL) × 0.357 = Ureia mmol/L',
  },
  respiratoryRate30: {
    label: 'Frequência Respiratória ≥ 30/min',
    description: 'Taquipneia significativa',
    mnemonic: 'R',
    points: 1,
  },
  bloodPressureLow: {
    label: 'Hipotensão (PAS < 90 ou PAD ≤ 60 mmHg)',
    description: 'Pressão arterial baixa',
    mnemonic: 'B',
    points: 1,
  },
  age65: {
    label: 'Idade ≥ 65 anos',
    description: 'Idade avançada como fator de risco independente',
    mnemonic: '65',
    points: 1,
  },
}

/**
 * CRB-65 (versão sem exame laboratorial para uso ambulatorial)
 */
export function calculateCrb65(input: Omit<Curb65Input, 'urea7'>): {
  score: number
  disposition: string
  recommendation: string
} {
  let score = 0
  if (input.confusion) score += 1
  if (input.respiratoryRate30) score += 1
  if (input.bloodPressureLow) score += 1
  if (input.age65) score += 1

  if (score === 0) {
    return {
      score,
      disposition: 'Tratamento ambulatorial',
      recommendation: 'Baixo risco de morte. Considerar tratamento domiciliar.',
    }
  }

  if (score <= 2) {
    return {
      score,
      disposition: 'Avaliar internação',
      recommendation: 'Risco intermediário. Considerar internação hospitalar.',
    }
  }

  return {
    score,
    disposition: 'Internação urgente',
    recommendation: 'Alto risco. Internação urgente, considerar UTI.',
  }
}

/**
 * Metadados da calculadora
 */
export const curb65Metadata = {
  id: 'curb-65',
  name: 'CURB-65 Score',
  description:
    'Estratificação de gravidade para Pneumonia Adquirida na Comunidade. ' +
    'Avalia Confusão, Ureia, FR, PA e Idade. Define local de tratamento.',
  category: 'respiratory' as const,
  syndromeIds: ['dispneia', 'febre'],
  references: REFERENCES,
  version: '1.0.0',
}
