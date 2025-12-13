/**
 * qSOFA (Quick Sequential Organ Failure Assessment) Calculator
 *
 * Triagem rápida para identificar pacientes com suspeita de infecção
 * que têm maior risco de desfechos adversos (mortalidade hospitalar).
 *
 * Referências:
 * - Singer M, et al. The Third International Consensus Definitions for
 *   Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.
 * - Seymour CW, et al. Assessment of Clinical Criteria for Sepsis.
 *   JAMA. 2016;315(8):762-774.
 */

import {
  QsofaInput,
  QsofaResult,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'JAMA',
    title: 'The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)',
    year: 2016,
    evidenceLevel: '1A',
  },
  {
    source: 'Surviving Sepsis Campaign',
    title: 'International Guidelines for Management of Sepsis and Septic Shock',
    year: 2021,
    evidenceLevel: '1A',
  },
  {
    source: 'ILAS',
    title: 'Protocolo Clínico de Sepse do Instituto Latino Americano de Sepse',
    year: 2023,
    evidenceLevel: '1B',
  },
]

/**
 * Calcula o qSOFA Score
 */
export function calculateQsofa(input: QsofaInput): QsofaResult {
  let score = 0

  if (input.respiratoryRate22) score += 1
  if (input.alteredMentation) score += 1
  if (input.systolicBp100) score += 1

  const { riskLevel, sepsisSuspected, mortality, interpretation, recommendation } =
    interpretScore(score)

  return {
    score,
    riskLevel,
    sepsisSuspected,
    mortality,
    interpretation,
    recommendation,
    nextStep: getNextStep(score),
    references: REFERENCES,
  }
}

function interpretScore(score: number): {
  riskLevel: RiskLevel
  sepsisSuspected: boolean
  mortality: string
  interpretation: string
  recommendation: string
} {
  if (score === 0) {
    return {
      riskLevel: 'low',
      sepsisSuspected: false,
      mortality: '< 1%',
      interpretation:
        'qSOFA negativo - Baixa probabilidade de sepse com desfecho adverso.',
      recommendation:
        'Manter vigilância clínica.\n' +
        'Se suspeita de infecção persistir, considerar SOFA completo.\n' +
        'Reavaliar se houver deterioração clínica.',
    }
  }

  if (score === 1) {
    return {
      riskLevel: 'moderate',
      sepsisSuspected: false,
      mortality: '2-3%',
      interpretation:
        'qSOFA = 1 - Risco intermediário. Ainda não atinge critério de triagem positiva.',
      recommendation:
        'Vigilância aumentada.\n' +
        'Se houver suspeita de infecção, iniciar investigação.\n' +
        'Considerar lactato sérico e hemoculturas.\n' +
        'Reavaliar frequentemente.',
    }
  }

  // score >= 2
  return {
    riskLevel: score === 2 ? 'high' : 'critical',
    sepsisSuspected: true,
    mortality: score === 2 ? '10%' : '> 20%',
    interpretation:
      'qSOFA ≥ 2 - TRIAGEM POSITIVA PARA SEPSE. ' +
      'Alto risco de mortalidade hospitalar.',
    recommendation:
      'AÇÃO IMEDIATA - PACOTE DE 1 HORA:\n' +
      '• Coletar lactato sérico\n' +
      '• Coletar hemoculturas (2 sets) ANTES de ATB\n' +
      '• Iniciar antibioticoterapia empírica de amplo espectro\n' +
      '• Ressuscitação volêmica: 30 mL/kg cristaloide se hipotensão ou lactato ≥ 4\n' +
      '• Vasopressor se PAM < 65 mmHg após volume\n' +
      '• Calcular SOFA completo para confirmar disfunção orgânica',
  }
}

function getNextStep(score: number): string {
  if (score >= 2) {
    return 'Iniciar protocolo de sepse imediatamente. Calcular SOFA completo.'
  }
  if (score === 1) {
    return 'Avaliar SOFA completo se suspeita de infecção. Monitorar sinais vitais.'
  }
  return 'Manter observação. Reavaliar se mudança clínica.'
}

/**
 * Descrições dos critérios
 */
export const QSOFA_CRITERIA = {
  respiratoryRate22: {
    label: 'Frequência Respiratória ≥ 22/min',
    description: 'Taquipneia indica esforço respiratório compensatório',
  },
  alteredMentation: {
    label: 'Alteração do Nível de Consciência',
    description: 'Glasgow < 15 ou qualquer alteração aguda do sensório',
  },
  systolicBp100: {
    label: 'Pressão Arterial Sistólica ≤ 100 mmHg',
    description: 'Hipotensão indica comprometimento hemodinâmico',
  },
}

/**
 * Metadados da calculadora
 */
export const qsofaMetadata = {
  id: 'qsofa',
  name: 'qSOFA (Quick SOFA)',
  description:
    'Triagem rápida à beira-leito para identificar pacientes com infecção ' +
    'que têm maior risco de desfechos adversos. ' +
    'Score ≥ 2 indica alta suspeita de sepse.',
  category: 'sepsis' as const,
  syndromeIds: ['febre', 'dispneia'],
  references: REFERENCES,
  version: '1.0.0',
}
