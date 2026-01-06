/**
 * Sistema de Detecção Automática de Red Flags
 *
 * Detecta sinais de alarme baseado nos sintomas selecionados pelo usuário
 * e nos dados de red flags sincronizados do Obsidian.
 */

import type { Complaint } from '@/lib/types/medical'

// Tipos para alertas de red flag
export interface RedFlagAlert {
  id: string
  message: string
  severity: 'warning' | 'danger' | 'critical'
  action: string
  triggeredBy: string[]
  timestamp: Date
}

export interface DetectionResult {
  hasRedFlags: boolean
  alerts: RedFlagAlert[]
  highestSeverity: 'none' | 'warning' | 'danger' | 'critical'
  requiresImmediateAction: boolean
}

// Mapeamento de sintomas para red flags
interface SymptomMapping {
  keywords: string[]
  associatedRedFlags: string[]
}

// Base de conhecimento para detecção
const SYMPTOM_RED_FLAG_MAP: Record<string, SymptomMapping> = {
  // Cardiovascular
  'dor_toracica': {
    keywords: ['dor no peito', 'dor torácica', 'aperto', 'opressão', 'precordial'],
    associatedRedFlags: [
      'Dor precordial em aperto > 20 min',
      'Irradiação para MSE, mandíbula ou dorso'
    ]
  },
  'sudorese': {
    keywords: ['sudorese', 'suor', 'frio', 'transpirando'],
    associatedRedFlags: [
      'Sudorese fria profusa',
      'Sudorese'
    ]
  },
  'sincope': {
    keywords: ['síncope', 'desmaio', 'perda de consciência', 'desmaiou'],
    associatedRedFlags: [
      'Síncope ou pré-síncope',
      'Perda de consciência > 5 minutos'
    ]
  },

  // Respiratório
  'dispneia': {
    keywords: ['dispneia', 'falta de ar', 'dificuldade respirar', 'sufocando'],
    associatedRedFlags: [
      'SpO2 < 90% em ar ambiente',
      'Uso de musculatura acessória',
      'Fala entrecortada'
    ]
  },
  'cianose': {
    keywords: ['cianose', 'roxo', 'azulado', 'lábios roxos'],
    associatedRedFlags: [
      'Cianose',
      'Hipoxemia grave'
    ]
  },

  // Neurológico
  'alteracao_consciencia': {
    keywords: ['confusão', 'desorientado', 'sonolento', 'não responde', 'glasgow'],
    associatedRedFlags: [
      'Alteração do nível de consciência',
      'Glasgow < 15'
    ]
  },
  'deficit_focal': {
    keywords: ['fraqueza', 'paralisia', 'formigamento', 'não mexe', 'boca torta'],
    associatedRedFlags: [
      'Déficit neurológico focal',
      'Hemiparesia',
      'Disartria'
    ]
  },
  'convulsao': {
    keywords: ['convulsão', 'crise', 'tremendo', 'se debatendo'],
    associatedRedFlags: [
      'Convulsão pós-trauma',
      'Status epiléptico'
    ]
  },

  // Gastrointestinal
  'defesa_abdominal': {
    keywords: ['defesa', 'rigidez', 'tábua', 'abdome rígido'],
    associatedRedFlags: [
      'Defesa abdominal / abdome em tábua',
      'Sinais de irritação peritoneal'
    ]
  },
  'hematêmese': {
    keywords: ['vômito com sangue', 'hematêmese', 'sangue vômito'],
    associatedRedFlags: [
      'Hematêmese',
      'Hemorragia digestiva alta'
    ]
  },

  // Trauma
  'trauma_craniano': {
    keywords: ['bateu cabeça', 'pancada', 'trauma craniano', 'tce'],
    associatedRedFlags: [
      'Perda de consciência > 5 minutos',
      'Amnésia > 30 minutos',
      'Vômitos persistentes'
    ]
  },

  // Infecção
  'febre_alta': {
    keywords: ['febre alta', 'temperatura > 39', 'calafrios'],
    associatedRedFlags: [
      'Febre > 38°C',
      'Febre + rigidez de nuca'
    ]
  },
  'sepse': {
    keywords: ['sepse', 'infecção grave', 'choque'],
    associatedRedFlags: [
      'Hipotensão refratária a volume',
      'Lactato > 4 mmol/L'
    ]
  }
}

/**
 * Detecta red flags baseado nos sintomas selecionados
 */
export function detectRedFlags(
  complaint: Complaint | null,
  selectedSymptoms: string[],
  additionalSymptoms?: string[]
): DetectionResult {
  if (!complaint) {
    return {
      hasRedFlags: false,
      alerts: [],
      highestSeverity: 'none',
      requiresImmediateAction: false
    }
  }

  const redFlags = complaint.extendedContent?.redFlags || []
  const allSymptoms = [...selectedSymptoms, ...(additionalSymptoms || [])]
  const alerts: RedFlagAlert[] = []

  // Normaliza sintomas para comparação
  const normalizedSymptoms = allSymptoms.map(s => s.toLowerCase())

  // Verifica cada red flag
  for (const redFlag of redFlags) {
    const rfLower = redFlag.toLowerCase()
    const triggeredBy: string[] = []

    // Verifica se algum sintoma selecionado corresponde ao red flag
    for (const symptom of normalizedSymptoms) {
      // Correspondência direta
      const firstWord = rfLower.split(' ')[0] ?? ''
      if (rfLower.includes(symptom) || (firstWord && symptom.includes(firstWord))) {
        triggeredBy.push(symptom)
        continue
      }

      // Verifica mapeamento de sintomas
      for (const [, mapping] of Object.entries(SYMPTOM_RED_FLAG_MAP)) {
        const matchesKeyword = mapping.keywords.some(kw =>
          symptom.includes(kw.toLowerCase()) || kw.toLowerCase().includes(symptom)
        )
        const matchesRedFlag = mapping.associatedRedFlags.some(rf =>
          rfLower.includes(rf.toLowerCase()) || rf.toLowerCase().includes(rfLower)
        )

        if (matchesKeyword && matchesRedFlag) {
          triggeredBy.push(symptom)
        }
      }
    }

    // Se encontrou triggers, cria alerta
    if (triggeredBy.length > 0) {
      const severity = determineSeverity(redFlag)
      alerts.push({
        id: `alert_${alerts.length}`,
        message: redFlag,
        severity,
        action: getRecommendedAction(redFlag),
        triggeredBy: [...new Set(triggeredBy)],
        timestamp: new Date()
      })
    }
  }

  // Determina severidade mais alta
  let highestSeverity: 'none' | 'warning' | 'danger' | 'critical' = 'none'
  if (alerts.some(a => a.severity === 'critical')) {
    highestSeverity = 'critical'
  } else if (alerts.some(a => a.severity === 'danger')) {
    highestSeverity = 'danger'
  } else if (alerts.some(a => a.severity === 'warning')) {
    highestSeverity = 'warning'
  }

  return {
    hasRedFlags: alerts.length > 0,
    alerts,
    highestSeverity,
    requiresImmediateAction: highestSeverity === 'critical' || highestSeverity === 'danger'
  }
}

/**
 * Verifica se um sintoma específico corresponde a um red flag
 */
export function isSymptomRedFlag(symptom: string, redFlags: string[]): boolean {
  const symptomLower = symptom.toLowerCase()

  return redFlags.some(rf => {
    const rfLower = rf.toLowerCase()
    const firstWord = rfLower.split(' ')[0] ?? ''
    return rfLower.includes(symptomLower) || (firstWord && symptomLower.includes(firstWord))
  })
}

/**
 * Determina severidade baseada no texto do red flag
 */
function determineSeverity(redFlag: string): 'warning' | 'danger' | 'critical' {
  const rfLower = redFlag.toLowerCase()

  // Termos críticos
  const criticalTerms = [
    'parada', 'pcr', 'choque', 'coma', 'anúria', 'apneia',
    'glasgow < 8', 'hipotensão refratária', 'hemorragia maciça',
    'status epiléptico', 'herniação'
  ]

  // Termos de perigo
  const dangerTerms = [
    'spo2 < 90', 'alteração consciência', 'hipotensão',
    'instabilidade', 'sangramento', 'déficit neurológico',
    'convulsão', 'síncope', 'cianose', 'glasgow < 15',
    'lactato > 4', 'febre + rigidez'
  ]

  if (criticalTerms.some(term => rfLower.includes(term))) {
    return 'critical'
  }

  if (dangerTerms.some(term => rfLower.includes(term))) {
    return 'danger'
  }

  return 'warning'
}

/**
 * Retorna ação recomendada baseada no red flag
 */
function getRecommendedAction(redFlag: string): string {
  const rfLower = redFlag.toLowerCase()

  const actionMap: [string[], string][] = [
    [
      ['consciência', 'glasgow', 'coma', 'não responde'],
      'Avaliar via aérea, considerar intubação. Chamar equipe de emergência.'
    ],
    [
      ['spo2', 'cianose', 'hipóxia', 'dessaturação'],
      'Ofertar O2 suplementar imediatamente (máscara com reservatório).'
    ],
    [
      ['hipotensão', 'choque', 'instabilidade hemodinâmica'],
      'Acesso venoso calibroso, ressuscitação volêmica 30mL/kg.'
    ],
    [
      ['febre', 'rigidez de nuca', 'meningite'],
      'Hemoculturas + ATB empírico. Considerar punção lombar.'
    ],
    [
      ['convulsão', 'crise', 'status'],
      'Benzodiazepínico IV (Diazepam 10mg). Proteção de via aérea.'
    ],
    [
      ['sangue', 'hemorragia', 'hematêmese', 'melena'],
      'Reservar hemoderivados. Acesso calibroso. Considerar EDA urgente.'
    ],
    [
      ['dor torácica', 'irradi', 'supra'],
      'ECG em 10 min. Troponina. AAS se não contraindicado.'
    ],
    [
      ['avc', 'déficit', 'hemiparesia', 'afasia'],
      'Glicemia capilar. TC de crânio urgente. Avaliar janela trombolítica.'
    ],
    [
      ['trauma', 'tce', 'fratura'],
      'Imobilização. Avaliar ABCDE. Considerar TC se indicado.'
    ]
  ]

  for (const [keywords, action] of actionMap) {
    if (keywords.some(kw => rfLower.includes(kw))) {
      return action
    }
  }

  return 'Avaliação médica urgente. Monitorização contínua.'
}

/**
 * Agrupa alertas por severidade
 */
export function groupAlertsBySeverity(alerts: RedFlagAlert[]): {
  critical: RedFlagAlert[]
  danger: RedFlagAlert[]
  warning: RedFlagAlert[]
} {
  return {
    critical: alerts.filter(a => a.severity === 'critical'),
    danger: alerts.filter(a => a.severity === 'danger'),
    warning: alerts.filter(a => a.severity === 'warning')
  }
}

/**
 * Formata alertas para exibição
 */
export function formatAlertsForDisplay(result: DetectionResult): string {
  if (!result.hasRedFlags) {
    return ''
  }

  const lines: string[] = []

  if (result.highestSeverity === 'critical') {
    lines.push('🚨 ALERTA CRÍTICO - AÇÃO IMEDIATA NECESSÁRIA')
  } else if (result.highestSeverity === 'danger') {
    lines.push('⚠️ SINAIS DE ALARME DETECTADOS')
  } else {
    lines.push('ℹ️ Pontos de atenção identificados')
  }

  lines.push('')

  for (const alert of result.alerts) {
    const icon = alert.severity === 'critical' ? '🔴' : alert.severity === 'danger' ? '🟠' : '🟡'
    lines.push(`${icon} ${alert.message}`)
    lines.push(`   → ${alert.action}`)
  }

  return lines.join('\n')
}
