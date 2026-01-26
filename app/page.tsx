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
import { useKanbanStore } from '@/stores/kanban-store'
import { noteBlockToKanbanTask, noteBlocksToKanbanTasks } from '@/lib/type-adapters'

// Legacy GlassPanel compatibility wrapper
const GlassPanel = GlassCard

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

  // Use type adapter to resolve type mismatch
  const [noteBlocks, setNoteBlocks] = React.useState<NoteBlock[]>([])
  const {
    tasks: tasksFromStore,
    setTasks,
    addTask,
    moveTask,
    loadSampleProject,
    isLoaded
  } = useKanbanStore()

  // Safety check: ensure tasks is always an array (handles SSR/hydration)
  const tasks = Array.isArray(tasksFromStore) ? tasksFromStore : []

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

    // Ensure we have at least once loaded sample project if none exists
    if (tasks.length === 0) {
      loadSampleProject('medical-urgent')
    }
  }, [loadSampleProject, tasks.length])

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
      accessibility: 'accessibility',
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

    addTask({
      patientName: patient.category === 'pediatric' ? 'Ped. Anônimo' : 'Paciente Anôn.',
      age: patient.age ? `${patient.age}a` : '--',
      gender: patient.gender,
      complaint: activeProtocolId || 'Queixa Geral',
      acuity: activeRedFlags.length > 0 ? 'red' : 'green',
      waitTime: '0min',
      status: finalStatus as any, // Bridging between medical KanbanStatus and store's status
    })
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
      allergiesContent += 'Nega uso de medicamentos de uso contínuo.'
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

    // 4. Hypotheses
    const hypotheses = getHypotheses(activeProtocolId)
    const hypothesesText = hypotheses.length > 0
      ? `Hipóteses diagnósticas:\n${hypotheses.join('\n')}`
      : 'Nenhuma hipótese diagnóstica.'

    blocks.push({
      id: 'hda',
      title: 'História da Doença Atual',
      iconName: 'heart',
      content: `Paciente admitido na unidade de emergência apresentando ${protocolName.toLowerCase()}. `
        + `Refere sintomatologia de ${chronicityText} e ${onsetText}. `
        + (duration && duration !== 'não especificado' ? ` com tempo de evolução de aproximadamente ${duration}.` : '')
        + `Referida como ${intensityText}. `
        + (intensityNum > 0 ? `Com ${intensityText} de dor.` : 'Sem dor.') + '\n\n'
        + hypothesesText,
    })

    // 5. Physical Exam - Padrão: Apresentação (achados) / Evidência (sinais objetivos)
    const efSection = sections.find((s) => s.id === 'exame_fisico')
    const achadosClinicosEF: string[] = []
    const sinaisObjetivosEF: string[] = []

    // Lista de sinais objetivos que usam "Evidência"
    const sinaisObjetivos = [
      'sinal de murphý', 'sinal de blumberg', 'sinal de rovsing', 'sinal de psoas',
      'sinal de giordano', 'rigidez de nuca',
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

          const isSinalObjetivo = sinaisObjetivos.some(s => labelLower.includes(s))
          if (isSinalObjetivo) {
            sinaisObjetivosEF.push(finding)
          } else {
            achadosClinicosEF.push(finding)
          }
        }
      })
    }

    // Monta narrativa médica estruturada
    let efContent = 'Ao exame físico segmentar e direcionado, '

    if (achadosClinicosEF.length > 0 || sinaisObjetivosEF.length > 0) {
      if (achadosClinicosEF.length > 0) {
        efContent += `apresenta ${achadosClinicosEF.join(', ')}. `
      }
      if (sinaisObjetivosEF.length > 0) {
        efContent += `evidência ${sinaisObjetivosEF.join(', ')}.`
      }
    } else {
      efContent += 'não se observam alterações clínicas significativas ou sinais de instabilidade no momento.'
    }

    blocks.push({
      id: 'exame_fisico',
      title: 'Exame Físico',
      iconName: 'stethoscope',
      content: efContent.trim(),
    })

    // 6. Conduct
    let conduct =
      activeRedFlags.length > 0
        ? 'Protocolo de Alta Complexidade / Emergência.'
        : 'Protocolo de Risco Habitual / Sintomáticos.'

    if (alerts.length > 0) {
      conduct += '\n\n!!! ATENÇÃO AOS ALERTAS DE SEGURANÇA !!!'
    }

    blocks.push({
      id: 'conduta',
      title: 'Conduta',
      iconName: 'alert',
      content: conduct,
      alerts: activeRedFlags.map((f) => f.label),
    })

    // 7. Sources
    const references = getStructuredReferences(activeProtocolId)
    blocks.push({
      id: 'sources',
      title: 'Referências',
      iconName: 'list',
      content: references.length > 0 ? references.join('\n') : 'Nenhuma referência.',
    })

    // Apply manual edits if they exist
    const finalBlocks: NoteBlock[] = blocks.map(block => {
      const manualContent = manualNoteEdits[block.id]
      return {
        ...block,
        content: typeof manualContent === 'string' ? manualContent : (block.content || "")
      }
    })

    // Convert NoteBlocks to KanbanTasks and update store
    const kanbanTasks = noteBlocksToKanbanTasks(finalBlocks)
    setTasks(kanbanTasks)

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

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr,minmax(350px,450px)]">
      {/* Sidebar */}
      <div className="lg:col-span-2">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Dashboard View */}
        {viewMode === 'dashboard' && (
          <DashboardView />
        )}

        {/* Complaint Selection */}
        {viewMode === 'selection' && (
          <ComplaintSelection />
        )}

        {/* Protocol View */}
        {viewMode === 'protocol' && (
          <div className="space-y-6">
            {/* Protocol Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {activeComplaint?.title || 'Selecione uma Queixa'}
              </h2>
              <Button
                onClick={() => handleSidebarNavigation('library')}
                variant="ghost"
                size="sm"
              >
                <BookOpen className="w-5 h-5" />
              </Button>
            </div>

            {/* Protocol Content */}
            {sections.map((section) => (
              <div key={section.id} className="space-y-4">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                {section.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <input
                      type={item.type}
                      checked={item.checked}
                      onChange={(checked) => {
                        const val = checked as boolean
                        setAnamnesisData((prev) => ({ ...prev, [item.id]: val }))
                      }}
                      className="h-5 w-5"
                    />
                    <label className="text-sm text-slate-700">{item.label}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Library View */}
        {viewMode === 'library' && (
          <div className="space-y-6">
            <Header />
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {buildComplaintGroups().map((group) => (
                <GlassCard key={group.code} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {getLibraryIcon(group.icon)}
                    <h3 className="text-xl font-semibold">{group.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {group.complaints.map((complaint) => (
                      <button
                        key={complaint.id}
                        onClick={() => selectComplaint(complaint.id, group.code)}
                        className={cn(
                          'w-full text-left px-4 py-3 rounded-lg',
                          'hover:bg-slate-100',
                          'transition-colors'
                        )}
                      >
                        <div className="text-sm font-medium">{complaint.title}</div>
                        <div className="text-xs text-slate-500">{complaint.code}</div>
                      </button>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Anamnesis View */}
        {viewMode === 'anamnese' && (
          <AnamnesisView />
        )}

        {/* Accessibility Guide */}
        {viewMode === 'accessibility' && (
          <AccessibilityGuide />
        )}

        {/* Flash Anamnesis Flow */}
        {viewMode === 'flash' && (
          <FlashAnamnesisFlow />
        )}

        {/* Chat Well */}
        {viewMode === 'chat-well' && (
          <ChatWell />
        )}

        {/* Kanban Board */}
        {viewMode === 'kanban' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Quadro de Tarefas</h2>
              <Button
                onClick={() => handleSidebarNavigation('dashboard')}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={loadSampleProject}
                variant="outline"
                size="sm"
              >
                <Sparkles className="w-5 h-5" />
                Carregar Exemplo
              </Button>

              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="outline"
                size="sm"
              >
                <Calculator className="w-5 h-5" />
                Nova Tarefa
              </Button>
            </div>

            {/* Kanban Board Component */}
            <div className="min-h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSetFlow('ambulatorial')}
                    variant={tasks.some(t => t.status === 'exam') ? 'default' : 'outline'}
                    size="sm"
                  >
                    Ambulatorial
                  </Button>
                  <Button
                    onClick={() => handleSetFlow('observação')}
                    variant={tasks.some(t => t.status === 'wait') ? 'default' : 'outline'}
                    size="sm"
                  >
                    Observação
                  </Button>
                  <Button
                    onClick={() => handleSetFlow('internação')}
                    variant={tasks.some(t => t.status === 'wait') ? 'default' : 'outline'}
                    size="sm"
                  >
                    Internação
                  </Button>
                  <Button
                    onClick={() => handleSetFlow('uti')}
                    variant={tasks.some(t => t.status === 'wait') ? 'default' : 'outline'}
                    size="sm"
                  >
                    U.T.I.
                  </Button>
                  <Button
                    onClick={() => handleSetFlow('emergência')}
                    variant={tasks.some(t => t.status === 'exam') ? 'default' : 'outline'}
                    size="sm"
                  >
                    Exame
                  </Button>
                  <Button
                    onClick={() => handleSetFlow('reval')}
                    variant={tasks.some(t => t.status === 'done') ? 'default' : 'outline'}
                    size="sm"
                  >
                    Reval
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setIsUppercaseMode(!isUppercaseMode)}
                    variant="ghost"
                    size="sm"
                  >
                    <CaseUpper className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Task Board */}
              <div className="min-h-[500px]">
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500">
                    <List className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="text-slate-600 mb-2">
                      Nenhuma tarefa no quadro.
                      <br />
                      Clique em "Carregar Exemplo" para começar.
                    </p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className={cn(
                        'p-4 rounded-lg border-2',
                        'bg-white',
                        'shadow-sm',
                        'hover:shadow-md',
                        'transition-all'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <span className="text-lg font-bold">
                              {task.status === 'exam' && '🩺'}
                              {task.status === 'wait' && '⏳'}
                              {task.status === 'reval' && '🔄'}
                              {task.status === 'done' && '✅'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-slate-900">{task.patientName}</span>
                            <div className="text-xs text-slate-500">{task.age}</div>
                            <div className="text-xs text-slate-500">{task.gender === 'F' ? 'F' : 'M'}</div>
                          </div>
                        </div>

                        <div className="text-sm text-slate-700">{task.complaint}</div>

                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => {
                              if (task.status === 'done') {
                                toast({
                                  title: 'Tarefa já concluída',
                                  description: 'Esta tarefa já foi marcada como concluída.',
                                  variant: 'destructive',
                                })
                                return
                              }
                              handleSetFlow(task.status)
                            }}
                            variant="ghost"
                            size="sm"
                            disabled={task.status === 'done'}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              if (task.status === 'done') {
                                toast({
                                  title: 'Tarefa já concluída',
                                  description: 'Esta tarefa já foi marcada como concluída.',
                                  variant: 'destructive',
                                })
                                return
                              }
                              handleSetFlow(task.status)
                            }}
                            variant="ghost"
                            size="sm"
                            disabled={task.status === 'done'}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Note Generation Modal */}
            {editingBlockId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Editar Nota</h3>
                    <Button
                      onClick={() => setEditingBlockId(null)}
                      variant="ghost"
                      size="sm"
                    >
                      <XCircle className="w-5 h-5" />
                    </Button>
                  </div>

                  <textarea
                    className="w-full min-h-[300px] p-3 border rounded-md"
                    defaultValue={noteBlocks.find(b => b.id === editingBlockId)?.content || ''}
                    onChange={(e) => {
                      const content = e.target.value
                      setManualNoteEdits(prev => ({ ...prev, [editingBlockId]: content }))
                    }}
                  />

                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => {
                        const content = manualNoteEdits[editingBlockId]
                        if (!content) {
                          toast({
                            title: 'Conteúdo vazio',
                            description: 'Por favor, adicione algum conteúdo.',
                            variant: 'destructive',
                          })
                          return
                        }
                        setManualNoteEdits(prev => ({ ...prev, [editingBlockId]: undefined }))
                        setEditingBlockId(null)
                      }}
                      variant="default"
                    >
                      Salvar
                    </Button>
                    <Button
                      onClick={() => setEditingBlockId(null)}
                      variant="ghost"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Task Modal */}
            {isAddModalOpen && targetSectionId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Nova Tarefa</h3>
                    <Button
                      onClick={() => setIsAddModalOpen(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <XCircle className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nome da tarefa
                      </label>
                      <input
                        type="text"
                        value={newSymptomName}
                        onChange={(e) => setNewSymptomName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Ex: Tosse persistente, Febre..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSaveCustomSymptom}
                        variant="default"
                        disabled={!newSymptomName.trim()}
                      >
                        Adicionar
                      </Button>
                      <Button
                        onClick={() => setIsAddModalOpen(false)}
                        variant="ghost"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
