'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useHapticFeedback } from './use-haptic-feedback'

/**
 * Emergency Detection Hook for Real-time Medical Symptom Monitoring
 *
 * Monitors selected symptoms and triggers visual/audio/haptic alerts
 * when emergency indicators are detected (chest pain, syncope, altered consciousness, etc.)
 */

export type EmergencySeverity = 'none' | 'warning' | 'danger' | 'critical'

export interface EmergencyIndicator {
  id: string
  label: string
  severity: EmergencySeverity
  action: string
  category: string
  keywords: string[]
}

export interface DetectedEmergency {
  indicator: EmergencyIndicator
  triggeredBy: string[]
  timestamp: Date
}

export interface UseEmergencyDetectionOptions {
  enableAudio?: boolean
  enableHaptic?: boolean
  debounceMs?: number
  onEmergencyDetected?: (emergencies: DetectedEmergency[]) => void
}

export interface UseEmergencyDetectionReturn {
  detectedEmergencies: DetectedEmergency[]
  highestSeverity: EmergencySeverity
  hasEmergency: boolean
  requiresImmediateAction: boolean
  dismissEmergency: (id: string) => void
  dismissAll: () => void
  reactivate: () => void
  isDismissed: boolean
  checkSymptoms: (symptoms: string[]) => void
}

// Emergency Indicators Knowledge Base
// Based on CFM and medical emergency protocols
const EMERGENCY_INDICATORS: EmergencyIndicator[] = [
  // CRITICAL - Immediate life-threatening
  {
    id: 'cardiac_arrest',
    label: 'Parada Cardíaca / PCR',
    severity: 'critical',
    action: 'Iniciar RCP imediatamente. Chamar equipe de código azul.',
    category: 'cardiovascular',
    keywords: ['parada', 'pcr', 'sem pulso', 'assistolia', 'fibrilação ventricular', 'aesp']
  },
  {
    id: 'respiratory_arrest',
    label: 'Parada Respiratória / Apneia',
    severity: 'critical',
    action: 'Assegurar via aérea. Iniciar ventilação. Chamar equipe de emergência.',
    category: 'respiratory',
    keywords: ['apneia', 'parada respiratória', 'não respira', 'sem respiração']
  },
  {
    id: 'shock',
    label: 'Choque / Instabilidade Hemodinâmica Grave',
    severity: 'critical',
    action: 'Acesso venoso calibroso. Ressuscitação volêmica. Vasopressores se indicado.',
    category: 'cardiovascular',
    keywords: ['choque', 'hipotensão refratária', 'pas < 80', 'pas < 70', 'hipoperfusão grave']
  },
  {
    id: 'coma',
    label: 'Coma / Glasgow < 8',
    severity: 'critical',
    action: 'Proteger via aérea. Considerar intubação. Avaliar causa reversível.',
    category: 'neurological',
    keywords: ['coma', 'glasgow < 8', 'glasgow 3', 'irresponsivo', 'não responde']
  },
  {
    id: 'massive_hemorrhage',
    label: 'Hemorragia Maciça',
    severity: 'critical',
    action: 'Compressão direta. Acesso calibroso x2. Hemoderivados urgente.',
    category: 'trauma',
    keywords: ['hemorragia maciça', 'sangramento profuso', 'exsanguinação', 'choque hemorrágico']
  },
  {
    id: 'status_epilepticus',
    label: 'Status Epiléptico',
    severity: 'critical',
    action: 'Benzodiazepínico IV. Proteger via aérea. Monitorização contínua.',
    category: 'neurological',
    keywords: ['status epiléptico', 'convulsão prolongada', 'crise contínua', 'convulsão > 5 min']
  },

  // DANGER - High risk, requires urgent intervention
  {
    id: 'chest_pain_typical',
    label: 'Dor Torácica Típica / Suspeita de SCA',
    severity: 'danger',
    action: 'ECG em 10 min. Troponina. AAS 300mg se não contraindicado. Morfina se necessário.',
    category: 'cardiovascular',
    keywords: ['dor torácica', 'dor no peito', 'aperto', 'opressão', 'irradiação mse', 'precordial', 'infarto']
  },
  {
    id: 'syncope',
    label: 'Síncope / Perda de Consciência',
    severity: 'danger',
    action: 'ECG. Glicemia capilar. Avaliar causa cardíaca vs neurológica.',
    category: 'cardiovascular',
    keywords: ['síncope', 'desmaio', 'perda de consciência', 'desmaiou', 'pré-síncope']
  },
  {
    id: 'altered_consciousness',
    label: 'Alteração do Nível de Consciência',
    severity: 'danger',
    action: 'Glicemia capilar. Avaliar via aérea. TC crânio se trauma ou AVC.',
    category: 'neurological',
    keywords: ['confusão', 'desorientado', 'sonolento', 'alteração consciência', 'rebaixamento', 'torpor']
  },
  {
    id: 'severe_hypoxia',
    label: 'Hipóxia Grave / SpO2 < 90%',
    severity: 'danger',
    action: 'O2 suplementar (máscara com reservatório). Avaliar causa. Considerar IOT.',
    category: 'respiratory',
    keywords: ['spo2 < 90', 'saturação baixa', 'hipóxia', 'dessaturação', 'cianose central']
  },
  {
    id: 'cyanosis',
    label: 'Cianose Central',
    severity: 'danger',
    action: 'O2 imediato. Avaliar via aérea e ventilação. Buscar causa.',
    category: 'respiratory',
    keywords: ['cianose', 'roxo', 'azulado', 'lábios roxos', 'cianose central']
  },
  {
    id: 'neurological_deficit',
    label: 'Déficit Neurológico Focal / Suspeita de AVC',
    severity: 'danger',
    action: 'TC crânio urgente. Avaliar janela trombolítica (< 4.5h). Protocolo AVC.',
    category: 'neurological',
    keywords: ['hemiparesia', 'paralisia', 'fraqueza', 'disartria', 'afasia', 'boca torta', 'déficit focal']
  },
  {
    id: 'seizure',
    label: 'Convulsão',
    severity: 'danger',
    action: 'Proteção. Benzodiazepínico se prolongada. Avaliar causa.',
    category: 'neurological',
    keywords: ['convulsão', 'crise convulsiva', 'tremendo', 'se debatendo', 'crise epiléptica']
  },
  {
    id: 'hypotension',
    label: 'Hipotensão Sintomática',
    severity: 'danger',
    action: 'Trendelenburg. Acesso venoso. SF 0.9% 500mL rápido.',
    category: 'cardiovascular',
    keywords: ['hipotensão', 'pressão baixa', 'pas < 90', 'tonteira ao levantar']
  },
  {
    id: 'severe_dyspnea',
    label: 'Dispneia Grave / Uso de Musculatura Acessória',
    severity: 'danger',
    action: 'O2 suplementar. Avaliar broncodilatador. Considerar VNI.',
    category: 'respiratory',
    keywords: ['dispneia grave', 'falta de ar intensa', 'musculatura acessória', 'fala entrecortada', 'tiragem']
  },
  {
    id: 'gi_bleeding',
    label: 'Hemorragia Digestiva',
    severity: 'danger',
    action: 'Acesso calibroso. Reservar hemoderivados. Considerar EDA urgente.',
    category: 'gastrointestinal',
    keywords: ['hematêmese', 'melena', 'enterorragia', 'sangue nas fezes', 'vômito com sangue']
  },
  {
    id: 'acute_abdomen',
    label: 'Abdome Agudo / Defesa Abdominal',
    severity: 'danger',
    action: 'Jejum. Analgesia. Imagem abdominal. Avaliação cirúrgica.',
    category: 'gastrointestinal',
    keywords: ['abdome agudo', 'defesa abdominal', 'abdome em tábua', 'rigidez', 'irritação peritoneal']
  },
  {
    id: 'sepsis',
    label: 'Sepse / SIRS + Foco Infeccioso',
    severity: 'danger',
    action: 'Hemoculturas. ATB empírico < 1h. Ressuscitação volêmica 30mL/kg.',
    category: 'infectious',
    keywords: ['sepse', 'sirs', 'febre + hipotensão', 'lactato elevado', 'infecção grave']
  },
  {
    id: 'meningitis_suspicion',
    label: 'Suspeita de Meningite',
    severity: 'danger',
    action: 'Hemoculturas. ATB empírico imediato. Considerar punção lombar.',
    category: 'neurological',
    keywords: ['rigidez de nuca', 'febre + cefaleia', 'meningite', 'sinal de kernig', 'sinal de brudzinski']
  },
  {
    id: 'anaphylaxis',
    label: 'Anafilaxia / Reação Alérgica Grave',
    severity: 'danger',
    action: 'Adrenalina IM 0.3-0.5mg. Anti-histamínico. Corticoide. Monitorização.',
    category: 'allergy',
    keywords: ['anafilaxia', 'angioedema', 'edema de glote', 'urticária + dispneia', 'reação alérgica grave']
  },

  // WARNING - Requires attention and monitoring
  {
    id: 'tachycardia',
    label: 'Taquicardia Sustentada',
    severity: 'warning',
    action: 'ECG 12 derivações. Identificar ritmo. Avaliar causa.',
    category: 'cardiovascular',
    keywords: ['taquicardia', 'fc > 100', 'palpitação', 'coração acelerado']
  },
  {
    id: 'bradycardia',
    label: 'Bradicardia Sintomática',
    severity: 'warning',
    action: 'ECG. Atropina se sintomático. Avaliar marcapasso.',
    category: 'cardiovascular',
    keywords: ['bradicardia', 'fc < 50', 'coração lento', 'pulso fraco']
  },
  {
    id: 'fever_high',
    label: 'Febre Alta > 39°C',
    severity: 'warning',
    action: 'Antitérmico. Investigar foco. Culturas se indicado.',
    category: 'infectious',
    keywords: ['febre alta', 'temperatura > 39', 'calafrios', 'hipertermia']
  },
  {
    id: 'dehydration',
    label: 'Desidratação Moderada/Grave',
    severity: 'warning',
    action: 'Acesso venoso. Hidratação. Avaliar eletrólitos.',
    category: 'metabolic',
    keywords: ['desidratação', 'mucosas secas', 'turgor diminuído', 'oligúria']
  },
  {
    id: 'hyperglycemia',
    label: 'Hiperglicemia Sintomática',
    severity: 'warning',
    action: 'Glicemia capilar. Insulina se indicado. Avaliar cetoacidose.',
    category: 'metabolic',
    keywords: ['hiperglicemia', 'glicemia > 250', 'poliúria', 'polidipsia', 'cetoacidose']
  },
  {
    id: 'hypoglycemia',
    label: 'Hipoglicemia',
    severity: 'warning',
    action: 'Glicose oral se consciente. Glicose IV se alteração consciência.',
    category: 'metabolic',
    keywords: ['hipoglicemia', 'glicemia < 70', 'sudorese', 'tremor', 'confusão']
  },
]

// Audio alert sound effect (base64 encoded simple beep)
const playEmergencySound = (severity: EmergencySeverity) => {
  if (typeof window === 'undefined') return

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
    const audioContext = new AudioContextClass()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different tones for different severities
    const config = {
      critical: { frequency: 880, duration: 0.3, repeats: 3, volume: 0.5 },
      danger: { frequency: 659, duration: 0.25, repeats: 2, volume: 0.4 },
      warning: { frequency: 523, duration: 0.2, repeats: 1, volume: 0.3 },
      none: { frequency: 0, duration: 0, repeats: 0, volume: 0 }
    }

    const { frequency, duration, repeats, volume } = config[severity]

    if (frequency === 0) return

    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    gainNode.gain.value = volume

    oscillator.start()

    // Create beep pattern
    let time = audioContext.currentTime
    for (let i = 0; i < repeats; i++) {
      gainNode.gain.setValueAtTime(volume, time)
      gainNode.gain.setValueAtTime(0, time + duration)
      time += duration + 0.1
    }

    oscillator.stop(time)
  } catch {
    // Silent fail - audio not critical
    console.warn('Audio alert failed to play')
  }
}

export function useEmergencyDetection(
  options: UseEmergencyDetectionOptions = {}
): UseEmergencyDetectionReturn {
  const {
    enableAudio = true,
    enableHaptic = true,
    debounceMs = 300,
    onEmergencyDetected
  } = options

  const [detectedEmergencies, setDetectedEmergencies] = useState<DetectedEmergency[]>([])
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [isDismissed, setIsDismissed] = useState(false)

  const lastCheckRef = useRef<number>(0)
  const previousEmergenciesRef = useRef<string[]>([])

  const { triggerError, triggerWarning, triggerHeavy } = useHapticFeedback()

  // Calculate derived state
  const highestSeverity = useMemo((): EmergencySeverity => {
    const activeEmergencies = detectedEmergencies.filter(
      e => !dismissedIds.has(e.indicator.id)
    )

    if (activeEmergencies.some(e => e.indicator.severity === 'critical')) return 'critical'
    if (activeEmergencies.some(e => e.indicator.severity === 'danger')) return 'danger'
    if (activeEmergencies.some(e => e.indicator.severity === 'warning')) return 'warning'
    return 'none'
  }, [detectedEmergencies, dismissedIds])

  const hasEmergency = highestSeverity !== 'none'
  const requiresImmediateAction = highestSeverity === 'critical' || highestSeverity === 'danger'

  // Check symptoms against emergency indicators
  const checkSymptoms = useCallback((symptoms: string[]) => {
    const now = Date.now()

    // Debounce
    if (now - lastCheckRef.current < debounceMs) return
    lastCheckRef.current = now

    if (isDismissed) return

    // Normalize symptoms for matching
    const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim())

    const newEmergencies: DetectedEmergency[] = []

    for (const indicator of EMERGENCY_INDICATORS) {
      const triggeredBy: string[] = []

      for (const symptom of normalizedSymptoms) {
        // Check if any keyword matches
        const matches = indicator.keywords.some(keyword => {
          const normalizedKeyword = keyword.toLowerCase()
          return symptom.includes(normalizedKeyword) || normalizedKeyword.includes(symptom)
        })

        if (matches) {
          triggeredBy.push(symptom)
        }
      }

      if (triggeredBy.length > 0) {
        newEmergencies.push({
          indicator,
          triggeredBy: [...new Set(triggeredBy)],
          timestamp: new Date()
        })
      }
    }

    // Check for new emergencies (not previously detected)
    const newIds = newEmergencies.map(e => e.indicator.id)
    const hasNewEmergencies = newIds.some(id => !previousEmergenciesRef.current.includes(id))

    previousEmergenciesRef.current = newIds

    setDetectedEmergencies(newEmergencies)

    // Trigger feedback only for new emergencies
    if (hasNewEmergencies && newEmergencies.length > 0) {
      const maxSeverity = newEmergencies.reduce((max, e) => {
        const severityOrder = { critical: 3, danger: 2, warning: 1, none: 0 }
        return severityOrder[e.indicator.severity] > severityOrder[max]
          ? e.indicator.severity
          : max
      }, 'none' as EmergencySeverity)

      // Audio feedback
      if (enableAudio) {
        playEmergencySound(maxSeverity)
      }

      // Haptic feedback
      if (enableHaptic) {
        if (maxSeverity === 'critical') {
          triggerError()
        } else if (maxSeverity === 'danger') {
          triggerHeavy()
        } else if (maxSeverity === 'warning') {
          triggerWarning()
        }
      }

      // Callback
      onEmergencyDetected?.(newEmergencies)
    }
  }, [debounceMs, isDismissed, enableAudio, enableHaptic, triggerError, triggerWarning, triggerHeavy, onEmergencyDetected])

  // Dismiss single emergency
  const dismissEmergency = useCallback((id: string) => {
    setDismissedIds(prev => new Set([...prev, id]))
  }, [])

  // Dismiss all emergencies
  const dismissAll = useCallback(() => {
    setIsDismissed(true)
    setDismissedIds(new Set(detectedEmergencies.map(e => e.indicator.id)))
  }, [detectedEmergencies])

  // Reactivate detection
  const reactivate = useCallback(() => {
    setIsDismissed(false)
    setDismissedIds(new Set())
    previousEmergenciesRef.current = []
  }, [])

  // Reset dismissed state when symptoms change significantly
  useEffect(() => {
    if (detectedEmergencies.length === 0) {
      setIsDismissed(false)
      setDismissedIds(new Set())
    }
  }, [detectedEmergencies.length])

  return {
    detectedEmergencies: detectedEmergencies.filter(e => !dismissedIds.has(e.indicator.id)),
    highestSeverity,
    hasEmergency,
    requiresImmediateAction,
    dismissEmergency,
    dismissAll,
    reactivate,
    isDismissed,
    checkSymptoms
  }
}
