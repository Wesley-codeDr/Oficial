'use client'

import * as React from 'react'
import { Sidebar } from '@/components/medical/Sidebar'
import { Header } from '@/components/medical/Header'
import { DashboardView } from '@/components/medical/DashboardView'
import { ComplaintSelection } from '@/components/medical/ComplaintSelection'
import { AnamnesisView } from '@/components/medical/AnamnesisView'
import { AccessibilityGuide } from '@/components/medical/AccessibilityGuide'
import { FlashAnamnesisFlow } from '@/components/medical/FlashAnamnesisFlow'
import { ChatWell } from '@/components/medical/ChatWell'
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
} from 'lucide-react'
import { Patient, AnamnesisSection, NoteBlock, KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { complaintsData } from '@/lib/data/complaintsData'
import {
  getProtocolData,
  getHypotheses,
  getStructuredReferences,
  mapComplaintToProtocol,
  getCalculatorsForGroup,
} from '@/lib/services/protocolService'

import { useToast } from '@/hooks/use-toast'

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
  const [viewMode, setViewMode] = React.useState<
    'dashboard' | 'selection' | 'protocol' | 'library' | 'accessibility' | 'flash' | 'chat-well'
  >('dashboard')
  const [activeProtocolId, setActiveProtocolId] = React.useState<string | null>(null)

  // Data State lifted to App level for synchronization
  const [anamnesisData, setAnamnesisData] = React.useState<Record<string, any>>({})
  const [sections, setSections] = React.useState<AnamnesisSection[]>([])

  const [noteBlocks, setNoteBlocks] = React.useState<NoteBlock[]>([])
  const [tasks, setTasks] = React.useState<KanbanTask[]>(initialTasks)
  const [patient, setPatient] = React.useState<Patient>({
    id: '12345',
    age: '45',
    gender: 'F',
    category: 'adult',
    isPregnant: false,
    phoneNumber: '',
    allergies: ['Dipirona', 'Sulfa'],
    medications: ['Sildenafil', 'Losartana', 'Aspirina'],
    entryTime: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    status: 'in_progress',
  })

  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [isUppercaseMode, setIsUppercaseMode] = React.useState(false)
  const [editingBlockId, setEditingBlockId] = React.useState<string | null>(null)
  const [isCalculatorOpen, setIsCalculatorOpen] = React.useState(false)
  const [isFlowMenuOpen, setIsFlowMenuOpen] = React.useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [targetSectionId, setTargetSectionId] = React.useState<string | null>(null)
  const [newSymptomName, setNewSymptomName] = React.useState('')

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

  const selectComplaint = (complaintId: string, groupCode: string) => {
    const mappedProtocolId = mapComplaintToProtocol(complaintId)
    setActiveProtocolId(mappedProtocolId)
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

  const handleSetFlow = (status: KanbanStatus | 'ambulatorio') => {
    const finalStatus: KanbanStatus = status === 'ambulatorio' ? 'done' : status
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
    if (status === 'ambulatorio' || status === 'done') setViewMode('dashboard')
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

    // 2. Allergies Block
    blocks.push({
      id: 'allergies',
      title: 'Alergias & Medicações',
      iconName: 'alert',
      content:
        (patient.allergies.length > 0
          ? `REFERE ALERGIA A: ${patient.allergies.join(', ')}.`
          : 'Nega alergias.') +
        (patient.medications.length > 0
          ? `\nUso: ${patient.medications.join(', ')}.`
          : '\nNega uso contínuo.'),
    })

    // 3. HDA (History of Present Illness) - SYNCHRONIZED
    const protocolName =
      complaintsData.complaints.find((c) => mapComplaintToProtocol(c.id) === activeProtocolId)
        ?.title || 'Atendimento Geral'
    const patientDesc = `${patient.gender === 'M' ? 'Paciente masculino' : 'Paciente feminina'}, ${patient.age || '--'} anos.`

    const intensity = anamnesisData['meta_intensity'] || '0'
    const chronicity = anamnesisData['meta_chronicity'] || 'Agudo'
    const onset = anamnesisData['meta_onset'] || 'Súbito'
    const duration = anamnesisData['meta_duration'] || 'não especificado'

    let hda = `${patientDesc} QP: ${protocolName}.\n`
    hda += `Refere quadro ${chronicity.toLowerCase()} de início ${onset.toLowerCase()} há ${duration}. `
    hda += `Intensidade da queixa: ${intensity}/10.`

    const positiveFindings: string[] = []
    sections.forEach((section) => {
      if (section.id !== 'meta_characterization' && section.id !== 'exame_fisico') {
        section.items.forEach((item) => {
          const val = anamnesisData[item.id]
          if (item.type === 'boolean' && val === true) {
            positiveFindings.push(item.label)
          } else if (item.type === 'segment' && val && typeof val === 'string') {
            positiveFindings.push(`${item.label}: ${val}`)
          } else if (item.type === 'multiSelect' && Array.isArray(val) && val.length > 0) {
            positiveFindings.push(`${item.label}: ${val.join(', ')}`)
          } else if (item.type === 'text' && val) {
            positiveFindings.push(`${item.label}: ${val}`)
          }
        })
      }
    })

    if (positiveFindings.length > 0) {
      hda += `\n\nCaracterização:\n- ${positiveFindings.join('\n- ')}.`
    } else {
      hda += `\n\nNega outros sintomas associados até o momento.`
    }

    blocks.push({ id: 'hda', title: 'História da Doença Atual', iconName: 'heart', content: hda })

    // 4. Physical Exam
    const efSection = sections.find((s) => s.id === 'exame_fisico')
    const efFindings: string[] = []

    if (efSection) {
      efSection.items.forEach((item) => {
        const val = anamnesisData[item.id]
        if (val) {
          if (item.type === 'boolean' && val === true) {
            efFindings.push(item.label)
          } else if (item.type === 'multiSelect' && Array.isArray(val) && val.length > 0) {
            efFindings.push(`${item.label}: ${val.join(', ')}`)
          } else if (val !== false && val !== '' && !Array.isArray(val)) {
            efFindings.push(`${item.label}: ${val}`)
          }
        }
      })
    }
    blocks.push({
      id: 'exame_fisico',
      title: 'Exame Físico',
      iconName: 'stethoscope',
      content: efFindings.join('. ') || 'Sem particularidades ao exame direcionado.',
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

    setNoteBlocks(blocks)
  }, [anamnesisData, patient, activeProtocolId, sections, editingBlockId, activeRedFlags])

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

  return (
    <div className="flex h-screen w-full overflow-hidden bg-transparent text-slate-800 dark:text-slate-100 font-sans transition-colors duration-500">
      <Sidebar currentView={viewMode} onNavigate={handleSidebarNavigation} />

      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden z-0">
        {/* Dashboard View */}
        {viewMode === 'dashboard' && (
          <div className="h-full overflow-hidden flex flex-col">
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
            />
          </div>
        )}

        {/* Flash View - Standalone without Header */}
        {viewMode === 'flash' && (
          <div className="h-full overflow-hidden flex flex-col p-6">
            <FlashAnamnesisFlow
              patient={patient}
              setPatient={setPatient}
              onExit={() => setViewMode('dashboard')}
            />
          </div>
        )}

        {/* Chat Well - Standalone without Header */}
        {viewMode === 'chat-well' && (
          <div className="h-full overflow-hidden flex flex-col p-6">
            <div className="h-full glass rounded-[36px] border border-white/60 dark:border-white/5 shadow-sm overflow-hidden animate-in fade-in zoom-in-[0.99] duration-300">
              <ChatWell />
            </div>
          </div>
        )}

        {/* Views with Header */}
        {viewMode !== 'dashboard' && viewMode !== 'flash' && viewMode !== 'chat-well' && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header Area */}
            <div className="px-6 pt-6 shrink-0 z-20">
              <Header patient={patient} setPatient={setPatient} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden px-6 pb-6 relative">
              {viewMode === 'selection' && (
                <div className="h-full flex flex-col bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl backdrop-saturate-[180%] rounded-[36px] border border-white/60 dark:border-white/5 shadow-sm overflow-hidden animate-in fade-in zoom-in-[0.99] duration-300">
                  <ComplaintSelection onSelect={selectComplaint} patient={patient} />
                </div>
              )}

              {viewMode === 'library' && (
                <div className="h-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl backdrop-saturate-[180%] rounded-[36px] border border-white/60 dark:border-white/5 shadow-sm overflow-y-auto custom-scrollbar p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
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
                    {complaintsData.groups.map((group) => {
                      const calculator = getCalculatorsForGroup(group.code)
                      if (!calculator) return null
                      return (
                        <div
                          key={`lib-${group.code}`}
                          className="bg-white/60 dark:bg-slate-800/60 rounded-[24px] p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col gap-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-700`}
                            >
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
                          <button
                            className="mt-auto w-full py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center gap-2"
                            onClick={() => {
                              if (group.code === 'CV') setIsCalculatorOpen(true)
                            }}
                          >
                            <Calculator className="w-4 h-4" /> Acessar
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {viewMode === 'accessibility' && <AccessibilityGuide />}

              {viewMode === 'protocol' && (
                <div className="h-full flex gap-5 overflow-hidden">
                  {/* Form Container (Floating Glass) */}
                  <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl backdrop-saturate-[180%] rounded-[36px] border border-white/60 dark:border-white/5 shadow-sm p-1">
                    {/* Inner Toolbar */}
                    <div className="shrink-0 flex items-center gap-2 px-6 pt-5 pb-2">
                      <button
                        onClick={() => setViewMode('selection')}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-bold text-sm">Voltar</span>
                      </button>
                    </div>

                    <div className="flex-1 overflow-hidden px-4">
                      <AnamnesisView
                        patient={patient}
                        sections={sections}
                        data={anamnesisData}
                        onDataChange={setAnamnesisData}
                        onAddSymptom={handleOpenAddModal}
                      />
                    </div>
                  </div>

                  {/* AI Note Column (Refined) */}
                  <div className="hidden xl:flex w-[400px] shrink-0 flex-col h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-3xl rounded-[36px] border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden transition-all">
                    {/* Toolbar */}
                    <div className="px-6 py-5 border-b border-slate-100/50 dark:border-slate-700/50 flex justify-between items-center bg-white/30 dark:bg-slate-900/30 shrink-0">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-purple-500/10 rounded-lg">
                          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-800 dark:text-white tracking-wide">
                          Nota Inteligente
                        </h3>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setIsUppercaseMode(!isUppercaseMode)}
                          className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl text-slate-400 transition-colors"
                          title="Maiúsculas"
                        >
                          <CaseUpper className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handlePrint}
                          className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl text-slate-400 transition-colors"
                          title="Imprimir"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar bg-white/20 dark:bg-black/10">
                      {noteBlocks.map((block) => (
                        <div
                          key={block.id}
                          className={`group rounded-2xl border p-4 transition-all hover:shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-md ${block.iconName === 'siren' ? 'border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-900/10' : 'border-slate-100 dark:border-slate-700/50'}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <BlockIcon name={block.iconName} />
                              <span
                                className={`text-[10px] font-bold uppercase tracking-widest ${block.iconName === 'siren' ? 'text-red-500' : 'text-slate-400'}`}
                              >
                                {block.title}
                              </span>
                            </div>
                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => copyBlockToClipboard(block.content, block.id)}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400"
                              >
                                {copiedId === block.id ? (
                                  <Check className="w-3.5 h-3.5 text-green-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {block.id === 'sources' ? (
                            <div className="space-y-2">
                              {getStructuredReferences(activeProtocolId).map((ref, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-3 items-start p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                  <BookOpen className="w-4 h-4 text-blue-500 mt-0.5" />
                                  <div>
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                      {ref.title}
                                    </p>
                                    <div className="flex gap-2 mt-1">
                                      <span className="text-[9px] font-bold bg-slate-100 dark:bg-slate-700 px-1.5 rounded text-slate-500">
                                        {ref.source}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : editingBlockId === block.id ? (
                            <textarea
                              autoFocus
                              className="w-full text-sm bg-slate-50 dark:bg-slate-900 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 outline-none"
                              value={block.content}
                              onChange={(e) =>
                                setNoteBlocks((prev) =>
                                  prev.map((b) =>
                                    b.id === block.id ? { ...b, content: e.target.value } : b
                                  )
                                )
                              }
                              rows={5}
                            />
                          ) : (
                            <div
                              className={`text-sm leading-relaxed whitespace-pre-wrap ${isUppercaseMode ? 'uppercase' : ''} ${block.iconName === 'siren' ? 'text-red-700 dark:text-red-300 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                            >
                              {block.content || (
                                <span className="italic text-slate-400">Aguardando dados...</span>
                              )}
                            </div>
                          )}

                          {/* Alert Tags */}
                          {block.alerts && block.alerts.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-red-100 dark:border-red-900/30">
                              {block.alerts.map((a) => (
                                <span
                                  key={a}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-100 dark:bg-red-900/40 text-[10px] font-bold text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800"
                                >
                                  <AlertTriangle className="w-3 h-3" /> {a}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Flow Action Footer */}
                    <div className="p-5 border-t border-slate-100/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 relative z-10">
                      <div className="relative">
                        <button
                          onClick={() => setIsFlowMenuOpen(!isFlowMenuOpen)}
                          className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                        >
                          <GitBranch className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                          Definir Fluxo
                        </button>

                        {isFlowMenuOpen && (
                          <div className="absolute bottom-full left-0 right-0 mb-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            {[
                              {
                                id: 'wait',
                                label: 'Aguardando Resultado',
                                color: 'text-yellow-600',
                              },
                              { id: 'exam', label: 'Encaminhar Exames', color: 'text-blue-600' },
                              { id: 'done', label: 'Alta / Internação', color: 'text-emerald-600' },
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => handleSetFlow(opt.id as any)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${opt.color}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Symptom Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[28px] w-full max-w-md p-6 shadow-2xl border border-white/20 dark:border-white/10 ring-1 ring-black/5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              Adicionar Sintoma
            </h3>
            <input
              autoFocus
              type="text"
              value={newSymptomName}
              onChange={(e) => setNewSymptomName(e.target.value)}
              placeholder="Nome do sintoma..."
              className="w-full px-4 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none mb-6 dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleSaveCustomSymptom()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCustomSymptom}
                className="flex-1 py-3.5 rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      <HeartScoreCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        patient={patient}
        antecedentesItems={sections.find((s) => s.id === 'antecedentes')?.items}
      />
    </div>
  )
}
