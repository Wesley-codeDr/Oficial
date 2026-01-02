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
import { motion, AnimatePresence } from 'framer-motion'
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
  const [manualNoteEdits, setManualNoteEdits] = React.useState<Record<string, string>>({})
  const [editingNoteBlockId, setEditingNoteBlockId] = React.useState<string | null>(null)

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
    const protocolName =
      complaintsData.complaints.find((c) => mapComplaintToProtocol(c.id) === activeProtocolId)
        ?.title || 'Atendimento Geral'

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
    const finalBlocks = blocks.map(block => {
      if (manualNoteEdits[block.id]) {
        return { ...block, content: manualNoteEdits[block.id] }
      }
      return block
    })

    setNoteBlocks(finalBlocks)
  }, [anamnesisData, patient, activeProtocolId, sections, editingBlockId, activeRedFlags, manualNoteEdits])

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
          <GlassPanel className="h-full overflow-hidden flex flex-col" style={{ borderRadius: '24px' }}>
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
          <GlassPanel className="h-full overflow-hidden flex flex-col p-6" style={{ borderRadius: '24px' }}>
            <FlashAnamnesisFlow
              patient={patient}
              setPatient={setPatient}
              onExit={() => setViewMode('dashboard')}
            />
          </GlassPanel>
        )}

        {viewMode === 'chat-well' && (
          <GlassPanel className="h-full overflow-hidden p-6" style={{ borderRadius: '24px' }}>
            <ChatWell />
          </GlassPanel>
        )}

        {viewMode !== 'dashboard' && viewMode !== 'flash' && viewMode !== 'chat-well' && (
          <GlassPanel className="flex flex-col h-full overflow-hidden" style={{ borderRadius: '24px' }}>
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
                   <div className="hidden xl:flex w-[400px] shrink-0 flex-col h-full overflow-hidden liquid-glass-material !bg-white/10 dark:!bg-black/20 border-l border-white/20 dark:border-white/10 shadow-2xl rounded-[32px]">
                    <div className="px-6 py-8 border-b border-white/20 dark:border-white/10 flex justify-between items-center bg-transparent shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-purple-500/80 to-indigo-600/80 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                          <Sparkles className="w-5 h-5 stroke-[2px]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[16px] text-slate-800 dark:text-white tracking-tight leading-none">
                            Nota Inteligente
                          </h3>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em] mt-1.5 opacity-80">
                            Processamento Real-time
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setIsUppercaseMode(!isUppercaseMode)} 
                          title="Maiúsculas"
                          className="w-10 h-10 rounded-xl hover:bg-white/20 dark:hover:bg-white/5 transition-all"
                        >
                           <CaseUpper className={`w-4 h-4 ${isUppercaseMode ? 'text-blue-500' : ''}`} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={handlePrint} 
                          title="Imprimir"
                          className="w-10 h-10 rounded-xl hover:bg-white/20 dark:hover:bg-white/5 transition-all"
                        >
                           <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar bg-transparent">
                        <AnimatePresence mode="popLayout">
                        {noteBlocks.map((block) => (
                          <motion.div 
                            key={block.id} 
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onDoubleClick={() => setEditingNoteBlockId(block.id)}
                            className={`
                              group relative rounded-[24px] border p-5 transition-all duration-300
                              bg-white/40 dark:bg-white/5 backdrop-blur-md border-white/40 dark:border-white/10 
                              hover:shadow-xl hover:bg-white/60 dark:hover:bg-white/10 hover:scale-[1.01]
                              ${editingNoteBlockId === block.id ? 'ring-2 ring-blue-500/50 bg-white/80 dark:bg-white/10 z-20' : ''}
                            `}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2.5">
                                <div className={`p-1.5 rounded-lg ${block.id === 'safety_check' ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                                  <BlockIcon name={block.iconName} />
                                </div>
                                <span className={`text-[11px] font-bold uppercase tracking-widest ${block.id === 'safety_check' ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'}`}>
                                  {block.title}
                                </span>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                {editingNoteBlockId === block.id ? (
                                  <button 
                                    onClick={() => setEditingNoteBlockId(null)}
                                    className="p-2 rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all"
                                    title="Salvar"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => copyBlockToClipboard(block.content, block.id)}
                                    className="p-2 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 text-slate-400 transition-all"
                                    title="Copiar bloco"
                                  >
                                    {copiedId === block.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {editingNoteBlockId === block.id ? (
                              <textarea
                                autoFocus
                                value={manualNoteEdits[block.id] !== undefined ? manualNoteEdits[block.id] : block.content}
                                onChange={(e) => setManualNoteEdits(prev => ({ ...prev, [block.id]: e.target.value }))}
                                onBlur={() => setEditingNoteBlockId(null)}
                                className="w-full bg-transparent border-0 focus:ring-0 p-0 text-[15px] leading-relaxed font-medium text-slate-800 dark:text-white resize-none min-h-[100px] outline-none"
                                placeholder="Edite o texto aqui..."
                              />
                            ) : (
                              <p className={`
                                text-[15px] leading-relaxed transition-all tracking-tight select-text
                                ${isUppercaseMode ? 'uppercase' : ''}
                                ${block.id === 'safety_check' ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-700 dark:text-slate-200 font-medium'}
                              `}>
                                {block.content.split(/(\*\*.+?\*\*)/g).map((part, i) => {
                                  if (part.startsWith('**') && part.endsWith('**')) {
                                    return <strong key={part + i}>{part.slice(2, -2)}</strong>
                                  }
                                  return part
                                })}
                              </p>
                            )}

                            {block.alerts && block.alerts.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {block.alerts.map((alert, i) => (
                                  <motion.span 
                                    key={i}
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="px-3 py-1 rounded-full bg-rose-500/10 text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider border border-rose-500/20 shadow-sm"
                                  >
                                    {alert}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                        </AnimatePresence>

                        {noteBlocks.length === 0 && (
                          <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-6">
                            <div className="w-20 h-20 rounded-[28px] bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-slate-600 border border-slate-200/50 dark:border-white/5 shadow-inner">
                              <FileText className="w-10 h-10" />
                            </div>
                            <div className="max-w-[200px]">
                              <p className="text-slate-400 dark:text-slate-500 font-semibold text-[15px] leading-tight italic">
                                Preencha o atendimento para gerar a nota automática
                              </p>
                            </div>
                          </div>
                        )}
                     </div>

                    <div className="p-6 border-t border-white/20 dark:border-white/10 bg-transparent relative z-10">
                      <div className="relative">
                        <Button 
                          onClick={() => setIsFlowMenuOpen(!isFlowMenuOpen)} 
                          size="lg" 
                          className="w-full h-14 rounded-[20px] bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-xl shadow-blue-500/25 group border-0 text-[16px] font-bold"
                        >
                           <GitBranch className="w-5 h-5 mr-3 transition-transform duration-700 group-hover:rotate-180" />
                           Definir Fluxo
                        </Button>
                        {isFlowMenuOpen && (
                          <div className="absolute bottom-full left-0 right-0 z-20 mb-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
                            <div className="p-2 liquid-glass-material !bg-white/80 dark:!bg-black/60 backdrop-blur-2xl rounded-[28px] border border-white/40 dark:border-white/10 shadow-2xl">
                               <div className="grid grid-cols-1 gap-1">
                                  {['Ambulatorial', 'Observação', 'Internação', 'UTI', 'Emergência'].map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => handleSetFlow(status.toLowerCase() as any)}
                                      className="px-4 py-3.5 rounded-[18px] text-[14px] font-bold text-left hover:bg-blue-500/10 hover:text-blue-500 dark:hover:bg-white/10 dark:hover:text-white transition-all transition-colors"
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
