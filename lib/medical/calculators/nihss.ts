/**
 * NIHSS (National Institutes of Health Stroke Scale) Calculator
 *
 * Avaliação quantitativa do déficit neurológico em pacientes com AVC.
 * Fundamental para decisão de trombólise.
 *
 * Referências:
 * - Brott T, et al. Measurements of acute cerebral infarction: a clinical
 *   examination scale. Stroke. 1989;20(7):864-870.
 * - AHA/ASA Guidelines for Early Management of Acute Ischemic Stroke. 2019.
 */

import {
  NihssInput,
  NihssResult,
  Reference,
  RiskLevel,
} from './types'

const REFERENCES: Reference[] = [
  {
    source: 'AHA/ASA',
    title: 'Guidelines for the Early Management of Patients With Acute Ischemic Stroke',
    year: 2019,
    url: 'https://www.ahajournals.org',
    evidenceLevel: '1A',
  },
  {
    source: 'Stroke',
    title: 'Measurements of acute cerebral infarction: a clinical examination scale',
    year: 1989,
    evidenceLevel: '1A',
  },
  {
    source: 'Ministério da Saúde',
    title: 'Linha de Cuidado do AVC no Adulto',
    year: 2021,
    evidenceLevel: '1B',
  },
]

/**
 * Calcula o NIHSS Score
 */
export function calculateNihss(input: NihssInput): NihssResult {
  const score =
    input.consciousness +
    input.orientationQuestions +
    input.commands +
    input.bestGaze +
    input.visual +
    input.facialPalsy +
    input.motorArmLeft +
    input.motorArmRight +
    input.motorLegLeft +
    input.motorLegRight +
    input.limbAtaxia +
    input.sensory +
    input.bestLanguage +
    input.dysarthria +
    input.extinctionInattention

  const { severity, riskLevel, thrombolysisEligibility, interpretation, recommendation } =
    interpretScore(score)

  return {
    score,
    severity,
    riskLevel,
    thrombolysisEligibility,
    timeWindow: getTimeWindow(score),
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

function interpretScore(score: number): {
  severity: NihssResult['severity']
  riskLevel: RiskLevel
  thrombolysisEligibility: boolean
  interpretation: string
  recommendation: string
} {
  if (score === 0) {
    return {
      severity: 'no_stroke',
      riskLevel: 'low',
      thrombolysisEligibility: false,
      interpretation:
        'Sem déficit neurológico detectável. Considerar outras etiologias.',
      recommendation:
        'Manter vigilância.\\n' +
        'Se suspeita de AIT, investigar com imagem.\\n' +
        'Considerar alta com acompanhamento neurológico.',
    }
  }

  if (score <= 4) {
    return {
      severity: 'minor',
      riskLevel: 'moderate',
      thrombolysisEligibility: false,
      interpretation:
        'AVC LEVE - Déficit neurológico menor.',
      recommendation:
        'Trombólise geralmente NÃO indicada (risco > benefício).\\n' +
        'Exceção: déficit incapacitante (ex: afasia isolada, hemianopsia).\\n' +
        'TC de crânio para excluir hemorragia.\\n' +
        'Iniciar AAS após excluir hemorragia.\\n' +
        'Internação para investigação etiológica.',
    }
  }

  if (score <= 15) {
    return {
      severity: 'moderate',
      riskLevel: 'high',
      thrombolysisEligibility: true,
      interpretation:
        'AVC MODERADO - Candidato a trombólise se dentro da janela.',
      recommendation:
        'CANDIDATO A TROMBÓLISE (se < 4.5h do início dos sintomas):\\n' +
        '• TC de crânio URGENTE para excluir hemorragia\\n' +
        '• Verificar critérios de exclusão para rtPA\\n' +
        '• Dose rtPA: 0.9 mg/kg (máx 90mg), 10% bolus, 90% em 1h\\n' +
        '• Considerar trombectomia mecânica se oclusão de grande vaso\\n' +
        '• Monitorização em Unidade de AVC',
    }
  }

  if (score <= 20) {
    return {
      severity: 'moderate_severe',
      riskLevel: 'high',
      thrombolysisEligibility: true,
      interpretation:
        'AVC MODERADO-GRAVE - Déficit neurológico significativo.',
      recommendation:
        'TROMBÓLISE INDICADA (se < 4.5h e sem contraindicações):\\n' +
        '• TC de crânio URGENTE\\n' +
        '• Considerar fortemente trombectomia mecânica\\n' +
        '• Monitorização intensiva de PA e glicemia\\n' +
        '• Unidade de AVC ou UTI\\n' +
        '• Risco aumentado de transformação hemorrágica',
    }
  }

  // score > 20
  return {
    severity: 'severe',
    riskLevel: 'critical',
    thrombolysisEligibility: true,
    interpretation:
      'AVC GRAVE - Déficit neurológico extenso. Alto risco de morbimortalidade.',
    recommendation:
      'CASO GRAVE - DECISÃO INDIVIDUALIZADA:\\n' +
      '• Trombólise pode ser considerada, mas risco de hemorragia aumentado\\n' +
      '• TC de crânio URGENTE\\n' +
      '• Trombectomia mecânica se oclusão proximal documentada\\n' +
      '• UTI obrigatória\\n' +
      '• Discussão com família sobre prognóstico\\n' +
      '• Considerar paliação se contraindicado tratamento ativo',
  }
}

function getTimeWindow(score: number): string {
  if (score === 0) {
    return 'N/A - sem indicação de trombólise'
  }
  if (score <= 4) {
    return 'Trombólise geralmente não indicada para NIHSS ≤ 4'
  }
  return 'Trombólise: < 4.5h | Trombectomia: < 6-24h (dependendo de perfusão)'
}

/**
 * Descrições dos componentes do NIHSS
 */
export const NIHSS_COMPONENTS = {
  consciousness: {
    label: '1a. Nível de Consciência',
    options: {
      0: 'Alerta, responde com vivacidade',
      1: 'Não alerta, mas desperta com estímulo menor',
      2: 'Não alerta, requer estímulo repetido ou doloroso',
      3: 'Responde apenas com reflexo motor ou autonômico, ou arreflexo',
    },
  },
  orientationQuestions: {
    label: '1b. Perguntas de Orientação (mês e idade)',
    options: {
      0: 'Responde ambas corretamente',
      1: 'Responde uma corretamente',
      2: 'Não responde nenhuma corretamente',
    },
  },
  commands: {
    label: '1c. Comandos (fechar olhos, apertar mão)',
    options: {
      0: 'Realiza ambos corretamente',
      1: 'Realiza um corretamente',
      2: 'Não realiza nenhum corretamente',
    },
  },
  bestGaze: {
    label: '2. Melhor Olhar Conjugado',
    options: {
      0: 'Normal',
      1: 'Paralisia parcial do olhar',
      2: 'Desvio forçado ou paralisia total do olhar',
    },
  },
  visual: {
    label: '3. Campos Visuais',
    options: {
      0: 'Sem perda visual',
      1: 'Hemianopsia parcial',
      2: 'Hemianopsia completa',
      3: 'Hemianopsia bilateral ou cegueira',
    },
  },
  facialPalsy: {
    label: '4. Paralisia Facial',
    options: {
      0: 'Movimentos normais e simétricos',
      1: 'Paralisia menor (sulco nasolabial apagado)',
      2: 'Paralisia parcial (paralisia total ou quase total da face inferior)',
      3: 'Paralisia completa uni ou bilateral',
    },
  },
  motorArmLeft: {
    label: '5a. Motor - Braço Esquerdo',
    options: {
      0: 'Sem queda (mantém 90° por 10s)',
      1: 'Queda (não mantém, mas algum esforço contra gravidade)',
      2: 'Algum esforço contra gravidade',
      3: 'Sem esforço contra gravidade, cai',
      4: 'Sem movimento',
    },
  },
  motorArmRight: {
    label: '5b. Motor - Braço Direito',
    options: {
      0: 'Sem queda',
      1: 'Queda',
      2: 'Algum esforço contra gravidade',
      3: 'Sem esforço contra gravidade',
      4: 'Sem movimento',
    },
  },
  motorLegLeft: {
    label: '6a. Motor - Perna Esquerda',
    options: {
      0: 'Sem queda (mantém 30° por 5s)',
      1: 'Queda',
      2: 'Algum esforço contra gravidade',
      3: 'Sem esforço contra gravidade',
      4: 'Sem movimento',
    },
  },
  motorLegRight: {
    label: '6b. Motor - Perna Direita',
    options: {
      0: 'Sem queda',
      1: 'Queda',
      2: 'Algum esforço contra gravidade',
      3: 'Sem esforço contra gravidade',
      4: 'Sem movimento',
    },
  },
  limbAtaxia: {
    label: '7. Ataxia de Membros',
    options: {
      0: 'Ausente',
      1: 'Presente em um membro',
      2: 'Presente em dois membros',
    },
  },
  sensory: {
    label: '8. Sensibilidade',
    options: {
      0: 'Normal',
      1: 'Perda leve a moderada',
      2: 'Perda severa ou total',
    },
  },
  bestLanguage: {
    label: '9. Melhor Linguagem',
    options: {
      0: 'Normal, sem afasia',
      1: 'Afasia leve a moderada',
      2: 'Afasia severa',
      3: 'Mudo, afasia global',
    },
  },
  dysarthria: {
    label: '10. Disartria',
    options: {
      0: 'Normal',
      1: 'Leve a moderada',
      2: 'Severa, ininteligível ou mudo',
    },
  },
  extinctionInattention: {
    label: '11. Extinção e Inatenção',
    options: {
      0: 'Sem anormalidade',
      1: 'Inatenção ou extinção em uma modalidade',
      2: 'Inatenção severa ou extinção em mais de uma modalidade',
    },
  },
}

/**
 * Metadados da calculadora
 */
export const nihssMetadata = {
  id: 'nihss',
  name: 'NIHSS (National Institutes of Health Stroke Scale)',
  description:
    'Avaliação quantitativa padronizada do déficit neurológico em pacientes com AVC. ' +
    'Score de 0-42, fundamental para decisão de trombólise.',
  category: 'neurological' as const,
  syndromeIds: ['neuro_deficit'],
  references: REFERENCES,
  version: '1.0.0',
}
