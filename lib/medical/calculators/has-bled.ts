/**
 * HAS-BLED Score Calculator
 *
 * Avaliação de risco de sangramento em pacientes com Fibrilação Atrial
 * em uso de anticoagulação.
 *
 * Referências:
 * - Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess
 *   1-year risk of major bleeding. Chest. 2010;138(5):1093-1100.
 * - ESC Guidelines for atrial fibrillation. Eur Heart J. 2020.
 */

import {
  HasBledInput,
  HasBledResult,
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
    title: 'A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding',
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
 * Calcula o HAS-BLED Score
 */
export function calculateHasBled(input: HasBledInput): HasBledResult {
  let score = 0

  if (input.hypertension) score += 1           // H - Hypertension (PAS > 160)
  if (input.abnormalRenalFunction) score += 1  // A - Abnormal Renal
  if (input.abnormalLiverFunction) score += 1  // A - Abnormal Liver
  if (input.stroke) score += 1                 // S - Stroke history
  if (input.bleeding) score += 1               // B - Bleeding history
  if (input.labileInr) score += 1              // L - Labile INR
  if (input.elderly) score += 1                // E - Elderly (> 65)
  if (input.drugs) score += 1                  // D - Drugs
  if (input.alcohol) score += 1                // D - Alcohol

  const { bleedingRisk, riskLevel, annualBleedingRate, interpretation, recommendation } =
    interpretScore(score)

  return {
    score,
    bleedingRisk,
    riskLevel,
    annualBleedingRate,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

function interpretScore(score: number): {
  bleedingRisk: HasBledResult['bleedingRisk']
  riskLevel: RiskLevel
  annualBleedingRate: string
  interpretation: string
  recommendation: string
} {
  if (score <= 2) {
    return {
      bleedingRisk: 'low',
      riskLevel: 'low',
      annualBleedingRate: score === 0 ? '1.13%' : score === 1 ? '1.02%' : '1.88%',
      interpretation:
        `HAS-BLED = ${score} - BAIXO RISCO de sangramento.`,
      recommendation:
        'BAIXO RISCO DE SANGRAMENTO:\\n' +
        '• Anticoagulação pode ser mantida com segurança\\n' +
        '• Monitorização padrão\\n' +
        '• Manter controle de fatores modificáveis\\n' +
        '• Reavaliar periodicamente',
    }
  }

  // score >= 3
  const riskTable: Record<number, string> = {
    3: '3.74%',
    4: '8.70%',
    5: '12.50%',
    6: '12.50%', // poucos dados para scores muito altos
    7: '>12.50%',
    8: '>12.50%',
    9: '>12.50%',
  }

  return {
    bleedingRisk: 'high',
    riskLevel: score >= 5 ? 'critical' : 'high',
    annualBleedingRate: riskTable[Math.min(score, 9)] || '>12.50%',
    interpretation:
      `HAS-BLED ≥ 3 - ALTO RISCO de sangramento maior.`,
    recommendation:
      'ALTO RISCO DE SANGRAMENTO - CAUTELA, MAS NÃO CONTRAINDICAÇÃO:\\n' +
      '• HAS-BLED alto NÃO contraindica anticoagulação\\n' +
      '• Pacientes de alto risco hemorrágico também têm alto risco de AVC\\n' +
      '• Benefício da anticoagulação geralmente supera risco\\n' +
      '• AÇÃO: Corrigir fatores MODIFICÁVEIS:\\n' +
      '  - Controlar PA se > 160\\n' +
      '  - Melhorar controle de INR (se varfarina)\\n' +
      '  - Evitar AINEs e AAS desnecessários\\n' +
      '  - Reduzir consumo de álcool\\n' +
      '• Considerar DOAC ao invés de varfarina\\n' +
      '• Monitorização mais frequente\\n' +
      '• Orientar sinais de sangramento',
  }
}

/**
 * Descrições dos critérios
 */
export const HAS_BLED_CRITERIA = {
  hypertension: {
    label: 'Hipertensão não controlada',
    description: 'PAS > 160 mmHg',
    mnemonic: 'H',
    points: 1,
    modifiable: true,
  },
  abnormalRenalFunction: {
    label: 'Função Renal Anormal',
    description: 'Diálise crônica, transplante renal, Creatinina ≥ 2.26 mg/dL (200 µmol/L)',
    mnemonic: 'A',
    points: 1,
    modifiable: false,
  },
  abnormalLiverFunction: {
    label: 'Função Hepática Anormal',
    description: 'Doença hepática crônica (cirrose) ou bilirrubina > 2x normal + AST/ALT > 3x normal',
    mnemonic: 'A',
    points: 1,
    modifiable: false,
  },
  stroke: {
    label: 'AVC prévio',
    description: 'História de acidente vascular cerebral',
    mnemonic: 'S',
    points: 1,
    modifiable: false,
  },
  bleeding: {
    label: 'História de Sangramento',
    description: 'Sangramento maior prévio ou predisposição (anemia, trombocitopenia)',
    mnemonic: 'B',
    points: 1,
    modifiable: false,
  },
  labileInr: {
    label: 'INR Lábil',
    description: 'TTR (tempo no range terapêutico) < 60%',
    mnemonic: 'L',
    points: 1,
    modifiable: true,
    note: 'Considerar trocar para DOAC se INR lábil',
  },
  elderly: {
    label: 'Idoso (> 65 anos)',
    description: 'Idade > 65 anos',
    mnemonic: 'E',
    points: 1,
    modifiable: false,
  },
  drugs: {
    label: 'Drogas (medicamentos)',
    description: 'Uso concomitante de antiplaquetários (AAS, clopidogrel) ou AINEs',
    mnemonic: 'D',
    points: 1,
    modifiable: true,
  },
  alcohol: {
    label: 'Álcool',
    description: 'Consumo excessivo de álcool (≥ 8 doses/semana)',
    mnemonic: 'D',
    points: 1,
    modifiable: true,
  },
}

/**
 * Fatores modificáveis para intervenção
 */
export const MODIFIABLE_FACTORS = [
  {
    factor: 'Hipertensão não controlada',
    intervention: 'Ajustar anti-hipertensivos para PAS < 160',
  },
  {
    factor: 'INR lábil',
    intervention: 'Considerar trocar varfarina por DOAC',
  },
  {
    factor: 'Medicamentos de risco',
    intervention: 'Descontinuar AINEs, reavaliar necessidade de AAS',
  },
  {
    factor: 'Álcool excessivo',
    intervention: 'Orientar redução do consumo, referenciar se necessário',
  },
]

/**
 * Integração com CHA2DS2-VASc
 */
export function evaluateAnticoagulationDecision(
  cha2ds2VascScore: number,
  hasbledScore: number
): {
  recommendation: string
  netClinicalBenefit: 'favorable' | 'marginal' | 'uncertain'
} {
  // Mesmo com HAS-BLED alto, anticoagulação é geralmente benéfica
  if (cha2ds2VascScore >= 2) {
    return {
      recommendation:
        'Anticoagulação RECOMENDADA. Benefício supera risco de sangramento. ' +
        'Corrigir fatores modificáveis do HAS-BLED.',
      netClinicalBenefit: hasbledScore >= 4 ? 'marginal' : 'favorable',
    }
  }

  if (cha2ds2VascScore === 1) {
    return {
      recommendation:
        hasbledScore >= 3
          ? 'Considerar anticoagulação com cautela. Risco de sangramento elevado.'
          : 'Considerar anticoagulação. Benefício provável.',
      netClinicalBenefit: 'marginal',
    }
  }

  // cha2ds2VascScore === 0
  return {
    recommendation:
      'Anticoagulação NÃO recomendada. Risco de sangramento supera benefício.',
    netClinicalBenefit: 'uncertain',
  }
}

/**
 * Metadados da calculadora
 */
export const hasBledMetadata = {
  id: 'has-bled',
  name: 'HAS-BLED Score',
  description:
    'Avaliação de risco de sangramento maior em pacientes anticoagulados por FA. ' +
    'Score ≥ 3 indica alto risco, mas NÃO contraindica anticoagulação - foco em modificar fatores.',
  category: 'cardiovascular' as const,
  syndromeIds: ['dor_toracica'],
  references: REFERENCES,
  version: '1.0.0',
}
