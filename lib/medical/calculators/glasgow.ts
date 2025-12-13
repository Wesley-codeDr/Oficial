/**
 * Glasgow Coma Scale (GCS) Calculator
 *
 * Avaliação do nível de consciência em pacientes com trauma cranioencefálico
 * ou alteração do sensório.
 *
 * Referências:
 * - Teasdale G, Jennett B. Assessment of coma and impaired consciousness.
 *   A practical scale. Lancet. 1974;2(7872):81-84.
 * - Protocolo ATLS (Advanced Trauma Life Support)
 */

import {
  GlasgowInput,
  GlasgowResult,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'Lancet',
    title: 'Assessment of coma and impaired consciousness. A practical scale.',
    year: 1974,
    evidenceLevel: '1A',
  },
  {
    source: 'ATLS',
    title: 'Advanced Trauma Life Support - 10th Edition',
    year: 2018,
    evidenceLevel: '1A',
  },
  {
    source: 'ABRAMEDE',
    title: 'Protocolo de Atendimento ao Trauma Cranioencefálico',
    year: 2023,
    evidenceLevel: '2A',
  },
]

/**
 * Descrições para cada componente
 */
export const GLASGOW_DESCRIPTIONS = {
  eye: {
    4: 'Abertura espontânea',
    3: 'Abertura ao comando verbal',
    2: 'Abertura à dor',
    1: 'Sem abertura ocular',
  },
  verbal: {
    5: 'Orientado',
    4: 'Confuso',
    3: 'Palavras inapropriadas',
    2: 'Sons incompreensíveis',
    1: 'Sem resposta verbal',
  },
  motor: {
    6: 'Obedece comandos',
    5: 'Localiza dor',
    4: 'Retirada inespecífica',
    3: 'Flexão anormal (decorticação)',
    2: 'Extensão anormal (descerebração)',
    1: 'Sem resposta motora',
  },
}

/**
 * Calcula o Glasgow Coma Scale
 */
export function calculateGlasgow(input: GlasgowInput): GlasgowResult {
  const score = input.eyeResponse + input.verbalResponse + input.motorResponse

  const breakdown = {
    eye: input.eyeResponse,
    verbal: input.verbalResponse,
    motor: input.motorResponse,
  }

  const { severity, riskLevel, intubationIndicated, interpretation, recommendation } =
    interpretScore(score, input.motorResponse)

  return {
    score,
    breakdown,
    severity,
    riskLevel,
    intubationIndicated,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

function interpretScore(
  score: number,
  motorResponse: number
): {
  severity: GlasgowResult['severity']
  riskLevel: RiskLevel
  intubationIndicated: boolean
  interpretation: string
  recommendation: string
} {
  // TCE Grave: GCS 3-8
  if (score <= 8) {
    return {
      severity: 'severe',
      riskLevel: 'critical',
      intubationIndicated: true,
      interpretation:
        'TCE GRAVE - Coma. Alto risco de lesão intracraniana grave.',
      recommendation:
        'AÇÃO IMEDIATA REQUERIDA:\n' +
        '• Intubação orotraqueal para proteção de via aérea (GCS ≤ 8)\n' +
        '• Tomografia de crânio URGENTE\n' +
        '• Avaliação neurocirúrgica imediata\n' +
        '• Monitorização em UTI\n' +
        '• Considerar monitorização de PIC\n' +
        '• Manter PAS > 90 mmHg e PaO2 > 60 mmHg',
    }
  }

  // TCE Moderado: GCS 9-12
  if (score <= 12) {
    return {
      severity: 'moderate',
      riskLevel: 'high',
      intubationIndicated: motorResponse <= 4,
      interpretation:
        'TCE MODERADO - Consciência alterada. Risco significativo de deterioração.',
      recommendation:
        'ATENÇÃO INTENSIVA:\n' +
        '• Tomografia de crânio indicada\n' +
        '• Observação em unidade de emergência/UTI\n' +
        '• Avaliação neurológica seriada (a cada 1-2h)\n' +
        '• Avaliação neurocirúrgica\n' +
        '• Considerar intubação se deterioração\n' +
        '• Manter cabeceira elevada 30°',
    }
  }

  // TCE Leve: GCS 13-15
  return {
    severity: 'mild',
    riskLevel: score === 15 ? 'low' : 'moderate',
    intubationIndicated: false,
    interpretation:
      score === 15
        ? 'TCE LEVE - Paciente alerta e orientado.'
        : 'TCE LEVE - Pequena alteração de consciência.',
    recommendation:
      score === 15
        ? 'OBSERVAÇÃO:\n' +
          '• Avaliar critérios para TC (Canadian CT Head Rule)\n' +
          '• Observação por 4-6 horas se TC não indicada\n' +
          '• Orientações de sinais de alarme na alta\n' +
          '• Acompanhante confiável nas primeiras 24h'
        : 'OBSERVAÇÃO CUIDADOSA:\n' +
          '• Tomografia de crânio recomendada\n' +
          '• Observação por pelo menos 6 horas\n' +
          '• Avaliação neurológica seriada\n' +
          '• Reavaliar se deterioração',
  }
}

/**
 * Retorna descrição textual do componente
 */
export function getComponentDescription(
  component: 'eye' | 'verbal' | 'motor',
  value: number
): string {
  return GLASGOW_DESCRIPTIONS[component][value as keyof typeof GLASGOW_DESCRIPTIONS[typeof component]] || 'Valor inválido'
}

/**
 * Formata o GCS para exibição
 */
export function formatGlasgowScore(input: GlasgowInput): string {
  const total = input.eyeResponse + input.verbalResponse + input.motorResponse
  return `GCS ${total} (O${input.eyeResponse}V${input.verbalResponse}M${input.motorResponse})`
}

/**
 * Metadados da calculadora
 */
export const glasgowMetadata = {
  id: 'glasgow',
  name: 'Escala de Coma de Glasgow (GCS)',
  description:
    'Avaliação padronizada do nível de consciência. ' +
    'Componentes: Abertura Ocular (1-4), Resposta Verbal (1-5), Resposta Motora (1-6). ' +
    'Score total: 3-15.',
  category: 'neurological' as const,
  syndromeIds: ['trauma', 'neuro_deficit'],
  references: REFERENCES,
  version: '1.0.0',
}
