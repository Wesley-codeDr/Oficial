'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from '@/components/medical/Sidebar'
import { Header } from '@/components/medical/Header'
import { DashboardView } from '@/components/medical/DashboardView'
import { ComplaintSelection } from '@/components/medical/ComplaintSelection'
import { AnamnesisView } from '@/components/medical/AnamnesisView'
import { AccessibilityGuide } from '@/components/medical/AccessibilityGuide'
import { FlashAnamnesisFlow } from '@/components/medical/FlashAnamnesisFlow'
import { ChatWell } from '@/components/medical/ChatWell'
import { GlassPanel } from '@/components/glass/GlassPanel'
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
import { Button } from '@/components/ui/button'
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
    const protocolName =
      complaintsData.complaints.find((c) => mapComplaintToProtocol(c.id) === activeProtocolId)
        ?.title || 'Atendimento Geral'

    const intensity = anamnesisData['meta_intensity'] || '0'
    const chronicity = anamnesisData['meta_chronicity'] || 'Agudo'
    const onset = anamnesisData['meta_onset'] || 'Súbito'
    const duration = anamnesisData['meta_duration'] || 'não especificado'

    // Mapeia intensidade para texto descritivo
    const intensityNum = parseInt(intensity, 10)
    const intensityText = intensityNum <= 3 ? 'leve' : intensityNum <= 6 ? 'moderada' : 'forte'

    // Mapeia cronicidade para texto narrativo
    const chronicityMap: Record<string, string> = {
      'Agudo': 'aguda',
      'Subagudo': 'subaguda',
      'Crônico': 'crônica',
    }
    const chronicityText = chronicityMap[chronicity] || 'aguda'

    // Mapeia início para texto narrativo
    const onsetMap: Record<string, string> = {
      'Súbito': 'súbito',
      'Progressivo': 'progressivo',
      'Insidioso': 'insidioso',
    }
    const onsetText = onsetMap[onset] || 'súbito'

    // Texto corrido: Queixa Principal
    let hda = `Paciente comparece ao serviço de emergência com queixa de ${protocolName.toLowerCase()}. `

    // Texto corrido: Caracterização temporal e intensidade
    hda += `Refere quadro de evolução ${chronicityText} e início ${onsetText}`
    if (duration && duration !== 'não especificado') {
      hda += ` há ${duration}`
    }
    hda += `, de ${intensityText} intensidade. `

    // Coleta achados positivos separados por categoria
    const sintomas: string[] = []
    const localizacao: string[] = []
    const caracteristicas: string[] = []

    sections.forEach((section) => {
      if (section.id !== 'meta_characterization' && section.id !== 'exame_fisico') {
        section.items.forEach((item) => {
          const val = anamnesisData[item.id]
          const label = item.label.toLowerCase()

          if (item.type === 'boolean' && val === true) {
            // Detecta tipo de achado pelo label
            if (label.includes('local') || label.includes('epigástrio') || label.includes('hipocôndrio') || label.includes('fossa')) {
              localizacao.push(label.replace('local da dor:', '').replace('local:', '').trim())
            } else if (label.includes('tipo') || label.includes('irradiação') || label.includes('contínua') || label.includes('intermitente')) {
              caracteristicas.push(label.replace('tipo', '').replace(':', '').trim())
            } else {
              sintomas.push(label)
            }
          } else if (item.type === 'segment' && val && typeof val === 'string') {
            const valLower = val.toLowerCase()
            if (label.includes('local')) {
              localizacao.push(`em ${valLower}`)
            } else if (label.includes('tipo')) {
              caracteristicas.push(`tipo ${valLower}`)
            } else if (label.includes('irradiação')) {
              caracteristicas.push(`com irradiação para ${valLower}`)
            } else {
              caracteristicas.push(valLower)
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
          } else if (item.type === 'text' && val) {
            caracteristicas.push(`${label}: ${val}`)
          }
        })
      }
    })

    // Monta texto corrido com achados
    if (localizacao.length > 0 || caracteristicas.length > 0) {
      const achadosList: string[] = []
      if (localizacao.length > 0) {
        achadosList.push(localizacao.join(' e '))
      }
      if (caracteristicas.length > 0) {
        achadosList.push(caracteristicas.join(', '))
      }
      hda += `Apresenta dor ${achadosList.join(', ')}. `
    }

    if (sintomas.length > 0) {
      hda += `Refere ${sintomas.join(', ')}. `
    }

    // Negativas se não houver achados
    if (localizacao.length === 0 && caracteristicas.length === 0 && sintomas.length === 0) {
      hda += `Nega outros sintomas associados até o momento.`
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
      'déficit neurológico', 'abdome em tábua', 'descompressão brusca'
    ]

    if (efSection) {
      efSection.items.forEach((item) => {
        const val = anamnesisData[item.id]
        if (val) {
          const labelLower = item.label.toLowerCase()
          let finding = ''

          if (item.type === 'boolean' && val === true) {
            finding = labelLower
          } else if (item.type === 'multiSelect' && Array.isArray(val) && val.length > 0) {
            finding = `${labelLower}: ${val.join(', ').toLowerCase()}`
          } else if (val !== false && val !== '' && !Array.isArray(val)) {
            finding = `${labelLower}: ${String(val).toLowerCase()}`
          }

          if (finding) {
            // Classifica como sinal objetivo ou achado clínico
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

    // Monta texto corrido do exame físico
    let efContent = ''
    if (achadosClinicosEF.length > 0) {
      efContent += `Apresenta ${achadosClinicosEF.join(', ')}. `
    }
    if (sinaisObjetivosEF.length > 0) {
      efContent += `Evidencia ${sinaisObjetivosEF.join(', ')}.`
    }

    blocks.push({
      id: 'exame_fisico',
      title: 'Exame Físico',
      iconName: 'stethoscope',
      content: efContent.trim() || 'Sem particularidades ao exame direcionado.',
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

// TODO: Remove this temporary fix when complaintsData.groups is populated correctly
  const complaintGroups = React.useMemo(() => {
    const groups = new Map()
    complaintsData.complaints.forEach((c) => {
      if (!groups.has(c.group)) {
        groups.set(c.group, {
          code: c.group,
          label: c.group, // You might want to have a better label mapping
          icon: 'Activity', // Default icon
        })
      }
    })
    return Array.from(groups.values())
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar currentView={viewMode} onNavigate={handleSidebarNavigation} />

      <main className="flex-1 flex flex-col h-full min-w-0 relative z-0 p-4">
        {viewMode === 'dashboard' && (
          <GlassPanel className="h-full overflow-hidden flex flex-col" style={{ borderRadius: '32px' }}>
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
          </GlassPanel>
        )}

        {viewMode === 'flash' && (
          <GlassPanel className="h-full overflow-hidden flex flex-col p-6" style={{ borderRadius: '32px' }}>
            <FlashAnamnesisFlow
              patient={patient}
              setPatient={setPatient}
              onExit={() => setViewMode('dashboard')}
            />
          </GlassPanel>
        )}

        {viewMode === 'chat-well' && (
          <GlassPanel className="h-full overflow-hidden p-6" style={{ borderRadius: '32px' }}>
            <ChatWell />
          </GlassPanel>
        )}

        {viewMode !== 'dashboard' && viewMode !== 'flash' && viewMode !== 'chat-well' && (
          <GlassPanel className="flex flex-col h-full overflow-hidden" style={{ borderRadius: '32px' }}>
            <div className="px-6 pt-6 shrink-0 z-20">
              <Header patient={patient} setPatient={setPatient} />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 relative">
              {viewMode === 'selection' && (
                <ComplaintSelection onSelect={selectComplaint} patient={patient} />
              )}

              {viewMode === 'library' && (
                <div className="p-2">
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
                    {complaintGroups.map((group) => {
                       const calculator = getCalculatorsForGroup(group.code)
                       if (!calculator) return null
                       return (
                         <div key={`lib-${group.code}`} className="liquid-glass-material rounded-[24px] p-6 flex flex-col gap-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-700">
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
                <div className="h-full flex gap-6 overflow-hidden">
                  <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
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
                        />
                     </div>
                  </div>
                  <div className="hidden xl:flex w-[400px] shrink-0 flex-col h-full overflow-hidden liquid-glass-material rounded-2xl">
                    <div className="px-6 py-5 border-b border-slate-100/50 dark:border-slate-700/50 flex justify-between items-center bg-transparent shrink-0">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-purple-500/10 rounded-lg">
                          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-800 dark:text-white tracking-wide">
                          Nota Inteligente
                        </h3>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setIsUppercaseMode(!isUppercaseMode)} title="Maiúsculas">
                           <CaseUpper className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handlePrint} title="Imprimir">
                           <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar bg-transparent">
                       {noteBlocks.map((block) => (
                         <div key={block.id} className="group rounded-2xl border p-4 transition-all bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-slate-100 dark:border-slate-700/50">
                           {/* ... content of note blocks ... */}
                         </div>
                       ))}
                    </div>
                    <div className="p-5 border-t border-slate-100/50 dark:border-slate-700/50 bg-transparent relative z-10">
                      <div className="relative">
                        <Button onClick={() => setIsFlowMenuOpen(!isFlowMenuOpen)} size="lg" className="w-full group">
                           <GitBranch className="w-5 h-5 mr-2 transition-transform duration-500 group-hover:rotate-180" />
                           Definir Fluxo
                        </Button>
                        {isFlowMenuOpen && (
                          <div className="absolute bottom-full left-0 right-0 z-20 mb-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="p-2 liquid-glass-material rounded-2xl">
                              {/* ... options ... */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </GlassPanel>
        )}
      </main>
      {/* ... (Modals) */}
    </div>
  )
}
