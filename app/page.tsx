'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/medical/Sidebar'
import { Header } from '@/components/medical/Header'
import { DashboardView } from '@/components/medical/DashboardView'
import { OnboardingTutorial, useOnboarding } from '@/components/medical/OnboardingTutorial'
import { ComplaintSelection } from '@/components/medical/ComplaintSelection'
import { AnamnesisView } from '@/components/medical/AnamnesisView'
import { AccessibilityGuide } from '@/components/medical/AccessibilityGuide'
import { FlashAnamnesisFlow } from '@/components/medical/FlashAnamnesisFlow'
import { ChatWell } from '@/components/medical/ChatWell'
import { GlassCard } from '@/components/ui/glass/GlassCard'
import { GlassTokenProvider } from '@/components/ui/glass/GlassTokenProvider'

// Legacy GlassPanel compatibility wrapper
const GlassPanel = GlassCard
import { AnamnesisWorkspace } from '@/components/medical/AnamnesisWorkspace'
import { SmartNotePanel } from '@/components/medical/SmartNotePanel'
import { HeartScoreCalculator } from '@/components/medical/HeartScoreCalculator'
import {
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  Stethoscope,
  FileText,
  Heart,
  XCircle,
  List,
  Brain,
  Siren,
  BookOpen,
  Printer,
  Calculator,
  CaseUpper,
  GitBranch,
  Activity,
  ArrowLeft,
  HeartPulse,
  Wind,
  Biohazard,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Patient, AnamnesisSection, NoteBlock, KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { buildComplaintGroups } from '@/lib/data/complaint-groups'
import {
  getProtocolData,
  getHypotheses,
  getStructuredReferences,
  mapComplaintToProtocol,
  getCalculatorsForGroup,
} from '@/lib/services/protocolService'
import { useToast } from '@/hooks/use-toast'
import { useComplaints } from '@/hooks/use-complaints'
import { useParallax, PARALLAX_SPEEDS } from '@/hooks/use-parallax'

const initialTasks: KanbanTask[] = [
  {
    id: '1',
    patientName: 'J.S.M.',
    age: '64a',
    gender: 'M',
    complaint: 'Dor Torácica',
    acuity: 'orange',
    waitTime: '12min',
    status: 'exam',
  },
  {
    id: '2',
    patientName: 'M.A.L.',
    age: '32a',
    gender: 'F',
    complaint: 'Cefaleia Súbita',
    acuity: 'yellow',
    waitTime: '45min',
    status: 'wait',
  },
  {
    id: '3',
    patientName: 'R.P.S.',
    age: '78a',
    gender: 'M',
    complaint: 'Dispneia',
    acuity: 'red',
    waitTime: '05min',
    status: 'reval',
  },
]

// Helper for Library Icons
const getLibraryIcon = (iconName: string) => {
  const map: Record<string, any> = {
    HeartPulse,
    Wind,
    Brain,
    Activity,
    Siren,
    Biohazard,
  }
  const Icon = map[iconName] || Activity
  return <Icon className="w-5 h-5 text-slate-500" />
}

const BlockIcon = ({ name }: { name: NoteBlock['iconName'] }) => {
  const icons = {
    heart: <Heart className="w-4 h-4 text-red-500" />,
    list: <List className="w-4 h-4 text-blue-500" />,
    x: <XCircle className="w-4 h-4 text-slate-500" />,
    stethoscope: <Stethoscope className="w-4 h-4 text-emerald-500" />,
    alert: <AlertTriangle className="w-4 h-4 text-orange-500" />,
    brain: <Brain className="w-4 h-4 text-purple-500" />,
    siren: <Siren className="w-4 h-4 text-rose-500 animate-pulse" />,
  }
  return icons[name] || <FileText className="w-4 h-4 text-slate-500" />
}

export default function Home() {
  const { toast } = useToast()

  // Parallax depth effects for Apple Liquid Glass 2026 aesthetic
  const { transforms, getPresetStyle, isActive: parallaxActive } = useParallax({
    layers: [
      { id: 'blob1', speed: PARALLAX_SPEEDS.backgroundSlow, enable3D: true },
      { id: 'blob2', speed: PARALLAX_SPEEDS.background, enable3D: true },
      { id: 'blob3', speed: PARALLAX_SPEEDS.midground, enable3D: true },
      { id: 'blob4', speed: PARALLAX_SPEEDS.foreground, enable3D: true },
    ],
    smooth: true,
    smoothFactor: 0.08,
    respectReducedMotion: true,
    disableOnMobile: true,
    mobileBreakpoint: 768,
  })

  const [viewMode, setViewMode] = React.useState<
    'dashboard' | 'selection' | 'protocol' | 'library' | 'accessibility' | 'flash' | 'chat-well'
  >('dashboard')
  const [activeProtocolId, setActiveProtocolId] = React.useState<string | null>(null)
  const [activeComplaintId, setActiveComplaintId] = React.useState<string | null>(null)

  const { data: complaintsResponse } = useComplaints({ limit: 500, isActive: true })
  const complaints = React.useMemo(() => complaintsResponse?.data ?? [], [complaintsResponse])
  const activeComplaint = React.useMemo(
    () => complaints.find((complaint) => complaint.id === activeComplaintId) ?? null,
    [complaints, activeComplaintId]
  )

  // Data State lifted to App level for synchronization
  const [anamnesisData, setAnamnesisData] = React.useState<Record<string, any>>({})
  const [sections, setSections] = React.useState<AnamnesisSection[]>([])

  const [noteBlocks, setNoteBlocks] = React.useState<NoteBlock[]>([])
  const [tasks, setTasks] = React.useState<KanbanTask[]>(initialTasks)

  // Onboarding tutorial state - shows when no tasks exist
  const {
    showOnboarding,
    closeTour,
    completeTour,
    startTour,
  } = useOnboarding(tasks.length === 0)
  const [patient, setPatient] = React.useState<Patient>({
    id: '12345',
    age: '45',
    gender: 'F',
    category: 'adult',
    isPregnant: false,
    phoneNumber: '',
    allergies: ['Dipirona', 'Sulfa'],
    medications: ['Sildenafil', 'Losartana', 'Aspirina'],
    entryTime: '2025-01-01T00:00:00.000Z', // Static placeholder for initial render
    status: 'in_progress',
  })

  // Track client-side mount to prevent hydration mismatch
  const [isMounted, setIsMounted] = React.useState(false)

  // Standardize dynamic patient data after mount to avoid hydration mismatch
  React.useEffect(() => {
    setIsMounted(true)
    setPatient(prev => ({
      ...prev,
      entryTime: new Date(Date.now() - 1000 * 60 * 42).toISOString()
    }))
  }, [])

  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [isUppercaseMode, setIsUppercaseMode] = React.useState(false)
  const [editingBlockId, setEditingBlockId] = React.useState<string | null>(null)
  const [isCalculatorOpen, setIsCalculatorOpen] = React.useState(false)
  const [isFlowMenuOpen, setIsFlowMenuOpen] = React.useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [targetSectionId, setTargetSectionId] = React.useState<string | null>(null)
  const [manualNoteEdits, setManualNoteEdits] = React.useState<Record<string, string>>({})
  const [editingNoteBlockId, setEditingNoteBlockId] = React.useState<string | null>(null)
  const [newSymptomName, setNewSymptomName] = React.useState('')
  const [activeTool, setActiveTool] = React.useState<'chat' | 'calculators' | null>(null)

  const handleApplyScore = (scoreResult: string) => {
    // Basic logic to append to "conduta" block or create if missing
    // For now, simpler approach: append to manualNoteEdits of 'conduta' block if it exists
    const condutaBlock = noteBlocks.find(b => b.id === 'conduta')
    if (condutaBlock) {
      const currentContent = manualNoteEdits['conduta'] || condutaBlock.content
      const newContent = currentContent + '\n\n' + scoreResult
      setManualNoteEdits(prev => ({ ...prev, conduta: newContent }))
      toast({
        title: "Score Aplicado",
        description: "O resultado foi adicionado à conduta.",
      })
    } else {
       toast({
        title: "Bloco de Conduta não encontrado",
        description: "Adicione um bloco de conduta para aplicar o score.",
        variant: "destructive"
      })
    }
  }

  // Check if current protocol has calculators
  const hasCalculators = React.useMemo(() => {
    if (!activeProtocolId) return false
    const calcs = getCalculatorsForGroup(activeProtocolId)
    return !!calcs
  }, [activeProtocolId])

  const copyBlockToClipboard = async (content: string, blockId: string) => {
    const clipboard = (globalThis as any).navigator?.clipboard
    if (!clipboard?.writeText) return

    await clipboard.writeText(content)
    setCopiedId(blockId)
    globalThis.setTimeout?.(() => setCopiedId(null), 2000)
  }

  // Calculate Active Red Flags based on current data
  const activeRedFlags = sections
    .flatMap((s) => s.items)
    .filter((i) => {
      return i.isRedFlag && anamnesisData[i.id] === true
    })

  const selectComplaint = (complaintId: string, _groupCode: string) => {
    const mappedProtocolId = mapComplaintToProtocol(complaintId)
    setActiveProtocolId(mappedProtocolId)
    setActiveComplaintId(complaintId)
    const newSections = getProtocolData(mappedProtocolId)
    setSections(newSections)
    setAnamnesisData({})
    setViewMode('protocol')
  }

  const handleSidebarNavigation = (viewId: string) => {
    const map: Record<string, typeof viewMode> = {
      protocolos: 'library',
      anamnese: 'selection',
      dashboard: 'dashboard',
      acessibilidade: 'accessibility',
      flash: 'flash',
      'chat-well': 'chat-well',
    }
    setViewMode(map[viewId] || 'dashboard')
  }

  const handleSetFlow = (status: string) => {
    const statusMap: Record<string, KanbanStatus> = {
      'ambulatorial': 'done',
      'observação': 'wait',
      'internação': 'wait',
      'uti': 'reval',
      'emergência': 'exam'
    }
    
    const finalStatus: KanbanStatus = statusMap[status.toLowerCase()] || 'wait'
    const newTask: KanbanTask = {
      id: Date.now().toString(),
      patientName: patient.category === 'pediatric' ? 'Ped. Anônimo' : 'Paciente Anon.',
      age: patient.age ? `${patient.age}a` : '--',
      gender: patient.gender,
      complaint: activeProtocolId || 'Queixa Geral',
      acuity: activeRedFlags.length > 0 ? 'red' : 'green',
      waitTime: '0min',
      status: finalStatus,
    }
    setTasks((prev) => [...prev, newTask])
    setIsFlowMenuOpen(false)
    if (finalStatus === 'done') setViewMode('dashboard')
  }

  const handleOpenAddModal = (sectionId: string) => {
    setTargetSectionId(sectionId)
    setNewSymptomName('')
    setIsAddModalOpen(true)
  }

  const handleSaveCustomSymptom = () => {
    if (!newSymptomName.trim() || !targetSectionId) return
    const newId = `custom-${Date.now()}`

    setSections((prev) =>
      prev.map((section) => {
        if (section.id === targetSectionId) {
          return {
            ...section,
            items: [
              ...section.items,
              {
                id: newId,
                label: newSymptomName,
                type: 'boolean',
                checked: false,
                negative: false,
              },
            ],
          }
        }
        return section
      })
    )

    setAnamnesisData((prev) => ({ ...prev, [newId]: true }))

    setIsAddModalOpen(false)
    setTargetSectionId(null)
    setNewSymptomName('')
  }

  // --- NOTE GENERATION LOGIC ---
  const generateNote = React.useCallback(() => {
    if (editingBlockId) return

    const blocks: NoteBlock[] = []

    // 1. Safety Alerts
    const alerts: string[] = []
    if (patient.medications) {
      patient.medications.forEach((med) => {
        patient.allergies.forEach((allergy) => {
          if (
            med.toLowerCase().includes(allergy.toLowerCase()) ||
            allergy.toLowerCase().includes(med.toLowerCase())
          ) {
            alerts.push(`INTERAÇÃO GRAVE: Uso de ${med} em paciente alérgico a ${allergy}.`)
          }
        })
      })
    }
    if (activeProtocolId === 'dor_toracica') {
      if (patient.medications.some((m) => /sildenafil|tadalafila|viagra/i.test(m))) {
        alerts.push('CONTRAINDICAÇÃO ABSOLUTA: Nitratos (risco de óbito com inibidores de PDE-5).')
      }
    }
    if (alerts.length > 0) {
      blocks.push({
        id: 'safety_check',
        title: 'ALERTAS DE SEGURANÇA',
        iconName: 'siren',
        content: alerts.join('\n\n'),
      })
    }

    // 2. Allergies Block - Padrão texto corrido
    let allergiesContent = ''
    if (patient.allergies.length > 0) {
      allergiesContent += `Refere alergia a ${patient.allergies.join(', ').toLowerCase()}. `
    } else {
      allergiesContent += 'Nega alergias medicamentosas conhecidas. '
    }
    if (patient.medications.length > 0) {
      allergiesContent += `Em uso de ${patient.medications.join(', ')}.`
    } else {
      allergiesContent += 'Nega uso de medicações de uso contínuo.'
    }
    blocks.push({
      id: 'allergies',
      title: 'Alergias & Medicações',
      iconName: 'alert',
      content: allergiesContent.trim(),
    })

    // 3. HDA (History of Present Illness) - SYNCHRONIZED
    // Padrão de escrita corrida técnico-médica com proteção jurídica implícita
    const protocolName = activeComplaint?.title || 'Atendimento Geral'

    const intensity = anamnesisData['meta_intensity'] || '0'
    const chronicity = anamnesisData['meta_chronicity'] || 'Agudo'
    const onset = anamnesisData['meta_onset'] || 'Súbito'
    const duration = anamnesisData['meta_duration'] || 'não especificado'

    // Mapeia intensidade para texto descritivo profissional
    const intensityNum = parseInt(intensity, 10)
    let intensityText = 'de intensidade não mensurada'
    if (intensityNum > 0) {
      if (intensityNum <= 3) intensityText = 'de leve intensidade'
      else if (intensityNum <= 6) intensityText = 'de moderada intensidade'
      else if (intensityNum <= 8) intensityText = 'de forte intensidade'
      else intensityText = 'de severa intensidade'
    }

    // Mapeia cronicidade para texto narrativo técnico
    const chronicityMap: Record<string, string> = {
      'Agudo': 'caráter agudo',
      'Subagudo': 'caráter subagudo',
      'Crônico': 'caráter crônico',
    }
    const chronicityText = chronicityMap[chronicity] || 'caráter agudo'

    // Mapeia início para texto narrativo técnico
    const onsetMap: Record<string, string> = {
      'Súbito': 'instalação súbita',
      'Progressivo': 'instalação progressiva',
      'Insidioso': 'instalação insidiosa',
    }
    const onsetText = onsetMap[onset] || 'instalação súbita'

    // Texto corrido: Queixa Principal e HDA
    let hda = `Paciente admitido na unidade de emergência apresentando ${protocolName.toLowerCase()}. `
    hda += `Refere sintomatologia de ${chronicityText} e ${onsetText}`
    if (duration && duration !== 'não especificado') {
      hda += ` com tempo de evolução de aproximadamente ${duration}`
    }
    hda += `, referida como ${intensityText}. `

    // Coleta achados positivos separados por categoria com terminologia médica
    const sintomas: string[] = []
    const localizacao: string[] = []
    const caracteristicas: string[] = []

    sections.forEach((section) => {
      // Ignora metadados e exame físico no bloco da HDA
      if (section.id !== 'meta_characterization' && section.id !== 'exame_fisico' && section.id !== 'general') {
        section.items.forEach((item) => {
          const val = anamnesisData[item.id]
          const label = item.label.toLowerCase()

          if (item.type === 'boolean' && val === true) {
            if (label.includes('local') || label.includes('epigástrio') || label.includes('hipocôndrio') || label.includes('fossa')) {
              localizacao.push(label.replace('local da dor:', '').replace('local:', '').trim())
            } else if (label.includes('tipo') || label.includes('irradiação') || label.includes('contínua') || label.includes('intermitente')) {
              caracteristicas.push(label.replace('tipo', '').replace(':', '').trim())
            } else {
              sintomas.push(label)
            }
          } else if (item.type === 'segment' && val && typeof val === 'string' && val !== 'Não' && val !== 'Ausente') {
            const valLower = val.toLowerCase()
            if (label.includes('local')) {
              localizacao.push(`em ${valLower}`)
            } else if (label.includes('tipo')) {
              caracteristicas.push(`descrita como ${valLower}`)
            } else if (label.includes('irradiação')) {
              caracteristicas.push(`com irradiação para ${valLower}`)
            } else {
              caracteristicas.push(`${label}: ${valLower}`)
            }
          } else if (item.type === 'multiSelect' && Array.isArray(val) && val.length > 0) {
            val.forEach((v: string) => {
              const vLower = v.toLowerCase()
              if (label.includes('local')) {
                localizacao.push(`em ${vLower}`)
              } else {
                caracteristicas.push(vLower)
              }
            })
          } else if (item.type === 'text' && val && val.trim() !== '') {
            caracteristicas.push(`${label}: ${val}`)
          }
        })
      }
    })

    // Monta narrativa médica estruturada
    if (localizacao.length > 0) {
      hda += `Localiza o quadro álgico principalmente ${localizacao.join(' e ')}. `
    }
    
    if (caracteristicas.length > 0) {
      hda += `A dor é ${caracteristicas.join(', ')}. `
    }

    if (sintomas.length > 0) {
      hda += `Associa ao quadro ${sintomas.join(', ')}. `
    }

    // Negativas pertinentes automáticas baseadas no protocolo
    const sintomasNegativos: string[] = []
    sections.forEach((section) => {
      if (section.id !== 'meta_characterization' && section.id !== 'exame_fisico') {
        section.items.forEach((item) => {
          if (item.type === 'boolean' && anamnesisData[item.id] === false) {
             // Só adiciona negativas se forem importantes (ex: náuseas, vômitos, dispneia)
             if (/náusea|vômito|dispneia|sudorese|desmaio|síncope/i.test(item.label)) {
                sintomasNegativos.push(item.label.toLowerCase())
             }
          }
        })
      }
    })

    if (sintomasNegativos.length > 0) {
      hda += `Nega ${sintomasNegativos.join(', ')}.`
    } else {
      hda += `Nega demais sintomas associados ou intercorrências até o presente momento.`
    }

    blocks.push({ id: 'hda', title: 'História da Doença Atual', iconName: 'heart', content: hda.trim() })

    // 4. Physical Exam - Padrão: Apresenta (achados) / Evidencia (sinais objetivos)
    const efSection = sections.find((s) => s.id === 'exame_fisico')
    const achadosClinicosEF: string[] = []
    const sinaisObjetivosEF: string[] = []

    // Lista de sinais objetivos que usam "Evidencia"
    const sinaisObjetivos = [
      'sinal de murphy', 'sinal de blumberg', 'sinal de rovsing', 'sinal de psoas',
      'sinal de giordano', 'sinal de kernig', 'sinal de brudzinski', 'rigidez de nuca',
      'déficit neurológico', 'abdome em tábua', 'descompressão brusca', 'crepitações', 'sibilos'
    ]

    if (efSection) {
      efSection.items.forEach((item) => {
        const val = anamnesisData[item.id]
        if (val !== undefined && val !== null && val !== '') {
          const labelLower = item.label.toLowerCase()
          let finding = ''

          if (item.type === 'boolean' && val === true) {
            finding = labelLower
          } else if (item.type === 'multiSelect' && Array.isArray(val) && val.length > 0) {
            finding = `${labelLower}: ${val.join(', ').toLowerCase()}`
          } else if (item.type === 'segment' && val !== 'Normal' && val !== 'Ausente' && val !== 'Não') {
            finding = `${labelLower}: ${String(val).toLowerCase()}`
          } else if (item.type === 'text' && val) {
            finding = `${labelLower}: ${String(val).toLowerCase()}`
          }

          if (finding) {
            const isSinalObjetivo = sinaisObjetivos.some(s => labelLower.includes(s))
            if (isSinalObjetivo) {
              sinaisObjetivosEF.push(finding)
            } else {
              achadosClinicosEF.push(finding)
            }
          }
        }
      })
    }

    // Monta texto corrido do exame físico profissional
    let efContent = 'Ao exame físico segmentar e direcionado, '
    if (achadosClinicosEF.length > 0 || sinaisObjetivosEF.length > 0) {
      if (achadosClinicosEF.length > 0) {
        efContent += `apresenta ${achadosClinicosEF.join(', ')}. `
      }
      if (sinaisObjetivosEF.length > 0) {
        efContent += `À ectoscopia/manobras especiais, evidencia ${sinaisObjetivosEF.join(', ')}.`
      }
    } else {
      efContent += 'não se observa alterações clínicas significativas ou sinais de instabilidade no momento.'
    }

    blocks.push({
      id: 'exame_fisico',
      title: 'Exame Físico',
      iconName: 'stethoscope',
      content: efContent.trim(),
    })

    // 5. Hypotheses
    blocks.push({
      id: 'hypotheses',
      title: 'Hipóteses',
      iconName: 'brain',
      content: getHypotheses(activeProtocolId).join('\n'),
    })

    // 6. Conduct
    let conduct =
      activeRedFlags.length > 0
        ? 'Protocolo de Alta Complexidade / Emergência.'
        : 'Protocolo de Risco Habitual / Sintomáticos.'
    if (alerts.length > 0) conduct += '\n!!! ATENÇÃO AOS ALERTAS DE SEGURANÇA !!!'

    blocks.push({
      id: 'conduta',
      title: 'Conduta',
      iconName: 'alert',
      content: conduct,
      alerts: activeRedFlags.map((f) => f.label),
    })
    blocks.push({ id: 'sources', title: 'Referências', iconName: 'list', content: '' })

    // Apply manual edits if they exist
    const finalBlocks: NoteBlock[] = blocks.map(block => {
      const manualContent = manualNoteEdits[block.id];
      return { 
        ...block, 
        content: typeof manualContent === 'string' ? manualContent : (block.content || "") 
      }
    })

    setNoteBlocks(finalBlocks)
  }, [anamnesisData, patient, activeProtocolId, activeComplaint, sections, editingBlockId, activeRedFlags, manualNoteEdits])

  // Trigger Note Generation on Data Change
  React.useEffect(() => {
    if (viewMode === 'protocol') {
      const timer = globalThis.setTimeout?.(generateNote, 300)
      return () => {
        if (timer !== undefined) {
          globalThis.clearTimeout?.(timer)
        }
      }
    }
  }, [generateNote, viewMode])

  const handlePrint = () => {
    globalThis.print?.()
  }

  const complaintGroups = React.useMemo(() => {
    return buildComplaintGroups(complaints, { includeAll: true })
  }, [complaints])

  return (
    <GlassTokenProvider>
      <div suppressHydrationWarning className="flex h-screen w-full bg-[#FFFFFF] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] font-sf-pro-display selection:bg-[#007AFF]/30 relative overflow-hidden" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/*
        LIQUID GLASS 2026 - MEDICAL BACKGROUND
        Enhanced with medical blue (#0087FF) and health green (#00D68F)
        Color psychology: Blue = Trust/Professionalism, Green = Health/Vitality
      */}
      {isMounted && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}>
          {/* Apple Liquid Glass 2026 - iOS 26 Background Blobs - V3.0 Visionary */}
          {/* Primary - Apple Blue (#007AFF) */}
          <motion.div
            animate={{
              scale: [1, 1.2, 0.9, 1],
              x: [0, 80, -40, 0],
              y: [0, -70, 40, 0],
              rotate: [0, 12, -7, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            className="absolute -top-[20%] -left-[15%] w-[1200px] h-[1200px] rounded-full bg-[#007AFF]/30 dark:bg-[#0A84FF]/25 liquid-blob liquid-blob-1"
            style={{
              filter: 'blur(160px) saturate(280%)',
              mixBlendMode: 'normal',
              ...(parallaxActive && transforms.blob1?.style),
            }}
          />
          {/* Secondary - Apple Green (#34C759) */}
          <motion.div
            animate={{
              scale: [1, 1.3, 0.8, 1],
              x: [0, -80, 60, 0],
              y: [0, 80, -40, 0],
              rotate: [0, -18, 15, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 2 }}
            className="absolute top-[25%] -right-[20%] w-[1100px] h-[1100px] rounded-full bg-[#34C759]/25 dark:bg-[#30D158]/20 liquid-blob liquid-blob-2"
            style={{
              filter: 'blur(150px) saturate(280%)',
              mixBlendMode: 'normal',
              ...(parallaxActive && transforms.blob2?.style),
            }}
          />
          {/* Tertiary - Apple Purple (#BF5AF2) */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1, 1],
              x: [0, 60, -40, 0],
              y: [0, -50, 60, 0],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 4 }}
            className="absolute bottom-[-20%] left-[10%] w-[900px] h-[900px] rounded-full bg-[#BF5AF2]/20 dark:bg-[#BF5AF2]/18 liquid-blob liquid-blob-3"
            style={{
              filter: 'blur(140px) saturate(280%)',
              mixBlendMode: 'normal',
              ...(parallaxActive && transforms.blob3?.style),
            }}
          />
          
          {/* Apple Liquid Glass 2026 - Noise Texture */}
          <div 
            className="absolute inset-0 opacity-[0.012] dark:opacity-[0.018] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Top Gradient Fade - Apple 2026 Style */}
          <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-white/60 via-white/30 to-transparent dark:from-black/70 dark:via-black/30 dark:to-transparent" />
        </div>
      )}

      <Sidebar currentView={viewMode} onNavigate={handleSidebarNavigation} />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto scroll-smooth relative z-0 p-4">
        {viewMode === 'dashboard' && (
          <GlassPanel className="min-h-full flex flex-col" style={{ borderRadius: '24px' }}>
            <DashboardView
              tasks={tasks}
              setTasks={setTasks}
              onNewAttendance={() => setViewMode('selection')}
              onSettings={() =>
                toast({
                  title: 'Em desenvolvimento',
                  description: 'Painel de configurações em breve.',
                })
              }
              onStartTour={startTour}
            />
          </GlassPanel>
        )}

        {viewMode === 'flash' && (
          <GlassPanel className="min-h-full flex flex-col p-6" style={{ borderRadius: '24px' }}>
            <FlashAnamnesisFlow
              patient={patient}
              setPatient={setPatient}
              onExit={() => setViewMode('dashboard')}
              onApplyScore={handleApplyScore}
            />
          </GlassPanel>
        )}

        {viewMode === 'chat-well' && (
          <GlassPanel className="min-h-full p-6" style={{ borderRadius: '24px' }}>
            <ChatWell />
          </GlassPanel>
        )}

        {viewMode !== 'dashboard' && viewMode !== 'flash' && viewMode !== 'chat-well' && (
          <GlassPanel className="flex flex-col min-h-full" style={{ borderRadius: '24px' }}>
            <div className="px-6 pt-6 shrink-0 z-20">
              <Header patient={patient} setPatient={setPatient} />
            </div>

            <div className="flex-1 px-6 pb-6 relative">
              {viewMode === 'selection' && (
                <ComplaintSelection onSelect={selectComplaint} patient={patient} />
              )}

              {viewMode === 'library' && (
                <div className="p-2">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl glass-pill bg-purple-500/10 text-purple-500">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                        Biblioteca de Protocolos
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Calculadoras e scores clínicos disponíveis.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {complaintGroups.map((group) => {
                       const calculator = getCalculatorsForGroup(group.code)
                       if (!calculator) return null
                       return (
                         <div key={`lib-${group.code}`} className="liquid-glass-material rounded-[24px] p-6 flex flex-col gap-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-pill">
                                {getLibraryIcon(group.icon)}
                              </div>
                              <h3 className="font-bold text-slate-700 dark:text-slate-200">
                                {group.label}
                              </h3>
                           </div>
                           <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                Ferramentas
                              </p>
                              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                {calculator}
                              </p>
                           </div>
                           <Button
                              variant="secondary"
                              size="sm"
                              className="mt-auto"
                              onClick={() => {
                                if (group.code === 'CV') setIsCalculatorOpen(true)
                              }}
                           >
                              <Calculator className="w-4 h-4 mr-2" /> Acessar
                           </Button>
                         </div>
                       )
                    })}
                  </div>
                </div>
              )}

              {viewMode === 'accessibility' && <AccessibilityGuide />}

              {viewMode === 'protocol' && (
                <div className="h-full w-full overflow-hidden">
                   <AnamnesisWorkspace 
                      activeTool={activeTool}
                      onActiveToolChange={setActiveTool}
                      leftContent={
                        <div className="flex flex-col h-full bg-transparent">
                           <div className="shrink-0 flex items-center gap-2 px-6 pt-5 pb-2">
                              <Button variant="secondary" size="sm" onClick={() => setViewMode('selection')}>
                                 <ArrowLeft className="w-4 h-4 mr-2" />
                                 Voltar
                              </Button>
                           </div>
                           <div className="flex-1 overflow-hidden px-4">
                              <AnamnesisView
                                 patient={patient}
                                 sections={sections}
                                 data={anamnesisData}
                                 onDataChange={setAnamnesisData}
                                 onAddSymptom={handleOpenAddModal}
                                 complaint={activeComplaint}
                              />
                           </div>
                        </div>
                      }
                      rightContent={
                        <SmartNotePanel 
                           noteBlocks={noteBlocks}
                           isUppercaseMode={isUppercaseMode}
                           setIsUppercaseMode={setIsUppercaseMode}
                           onPrint={handlePrint}
                           editingBlockId={editingNoteBlockId}
                           setEditingBlockId={setEditingNoteBlockId}
                           manualEdits={manualNoteEdits}
                           setManualEdits={setManualNoteEdits}
                           copyBlock={copyBlockToClipboard}
                           copiedId={copiedId}
                           footer={
                              <div className="flex flex-col gap-4 w-full">
                                {/* Segmented Control (ChatWW/Scores) - iOS Style */}
                                <div className="w-full h-16 p-1.5 liquid-glass-material bg-white/40 dark:bg-black/40 backdrop-blur-3xl rounded-2xl border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                  <div className="flex items-center gap-1.5 h-full relative">

                                    {/* Sliding White Pill Indicator */}
                                    <div
                                      className="absolute top-0 bottom-0 left-0 w-[calc(50%-3px)] bg-white dark:bg-white/20 rounded-[14px] shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                      style={{
                                        transform: activeTool === 'calculators' ? 'translateX(calc(100% + 6px))' : 'translateX(0)',
                                        opacity: activeTool ? 1 : 0
                                      }}
                                    />

                                    {/* ChatWW Segment */}
                                    <button
                                      onClick={() => setActiveTool(activeTool === 'chat' ? null : 'chat')}
                                      className={`
                                        relative z-10 flex-1 h-full rounded-[14px]
                                        flex items-center justify-center gap-2.5
                                        transition-all duration-300
                                        ${activeTool === 'chat'
                                          ? 'text-slate-900 dark:text-white'
                                          : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}
                                      `}
                                      role="tab"
                                      aria-selected={activeTool === 'chat'}
                                      aria-label="ChatWW - Medical Assistant"
                                    >
                                      <MessageSquare className="w-5 h-5" />
                                      <span className="text-[12px] font-black uppercase tracking-widest">ChatWW</span>
                                    </button>

                                    {/* Scores Segment */}
                                    <button
                                      onClick={() => setActiveTool(activeTool === 'calculators' ? null : 'calculators')}
                                      className={`
                                        relative z-10 flex-1 h-full rounded-[14px]
                                        flex items-center justify-center gap-2.5
                                        transition-all duration-300
                                        ${activeTool === 'calculators'
                                          ? 'text-slate-900 dark:text-white'
                                          : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}
                                      `}
                                      role="tab"
                                      aria-selected={activeTool === 'calculators'}
                                      aria-label="Scores - Medical Calculators"
                                    >
                                      <div className="relative">
                                        <Calculator className="w-5 h-5" />
                                        {hasCalculators && !activeTool && (
                                          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse shadow-sm" />
                                        )}
                                      </div>
                                      <span className="text-[12px] font-black uppercase tracking-widest">Scores</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Definir Fluxo Button (Primary Action) */}
                                <div className="relative w-full">
                                  <button
                                    onClick={() => setIsFlowMenuOpen(!isFlowMenuOpen)}
                                    className="w-full h-16 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 transition-all duration-500 shadow-2xl shadow-blue-500/10 group border-0 text-[12px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 flex items-center justify-center relative overflow-hidden"
                                  >
                                     <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                     <div className="relative z-10 flex items-center">
                                        <GitBranch className="w-5 h-5 mr-3 transition-transform duration-700 group-hover:rotate-180" />
                                        Definir Fluxo
                                     </div>
                                  </button>
                                  
                                  {isFlowMenuOpen && (
                                    <div className="absolute bottom-full left-0 right-0 z-20 mb-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                      <div className="p-3 liquid-glass-material bg-white/80! dark:bg-black/70! backdrop-blur-3xl rounded-[32px] border border-white/40 dark:border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
                                         <div className="grid grid-cols-2 gap-2">
                                            {['Ambulatorial', 'Observação', 'Internação', 'UTI', 'Emergência'].map((status) => (
                                              <button
                                                key={status}
                                                onClick={() => handleSetFlow(status.toLowerCase() as any)}
                                                className={`
                                                  px-4 py-4 rounded-[20px] text-[12px] font-black uppercase tracking-widest text-left transition-all duration-300
                                                  ${status === 'Emergência' ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white col-span-2' : 'hover:bg-blue-500/10 hover:text-blue-500'}
                                                `}
                                              >
                                                {status}
                                              </button>
                                            ))}
                                         </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                           }
                        />
                      }
                      sidebarContent={{
                        chat: <ChatWell />,
                        calculators: <HeartScoreCalculator 
                          isOpen={true} // Controlled by AnamnesisWorkspace overlay
                          onClose={() => setActiveTool(null)}
                          patient={patient}
                          onApply={handleApplyScore}
                          // Note: In real app, props for antecedents would pass here
                        />
                      }}
                   />
                </div>
              )}
            </div>
          </GlassPanel>
        )}
      </main>

      {/* Onboarding Tutorial Overlay */}
      <OnboardingTutorial
        isOpen={showOnboarding}
        onClose={closeTour}
        onComplete={completeTour}
      />
    </div>
    </GlassTokenProvider>
  )
}
