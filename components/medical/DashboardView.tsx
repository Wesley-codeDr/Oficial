'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  ArrowRightLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileCheck2,
  Filter,
  Microscope,
  MoreHorizontal,
  PlayCircle,
  Plus,
  Settings2,
  Stethoscope,
  Users,
  Activity,
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { useDashboardPreferences } from '@/contexts/DashboardPreferencesContext'
import { DashboardSettingsModal } from './DashboardSettingsModal'
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader'
import { useDragAndDrop } from '@/hooks/use-drag-and-drop'
import { DASHBOARD_CONFIG } from '@/lib/config/dashboard'
import { CHART_DATA } from '@/lib/mock/dashboard-data'
import { KanbanCard } from '@/components/dashboard/KanbanCard'
import { KanbanColumn } from '@/components/dashboard/KanbanColumn'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { CountUp } from '@/components/dashboard/CountUp'
import { CustomChartTooltip } from '@/components/dashboard/CustomChartTooltip'

// --- Sub-components ---


// --- Main View ---

interface DashboardViewProps {
  tasks: KanbanTask[]
  setTasks: React.Dispatch<React.SetStateAction<KanbanTask[]>>
  onNewAttendance?: () => void
  onSettings?: () => void
  onStartTour?: () => void
  onNavigate?: (id: string) => void
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks = [],
  setTasks,
  onNewAttendance,
  onStartTour,
  onNavigate
}) => {
  const { preferences } = useDashboardPreferences()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)
  
  // Convert density to match component expectations
  const componentDensity = preferences.density === 'default' ? 'comfortable' : preferences.density

  interface ThemeConfig {
    gradient: string
    border: string
    iconColor: string
    label: string
    stroke: string
    fillStart: string
    glow: string
    iconBg: string
    trendColor: string
    trendBg: string
    chartData: Array<{ value: number }>
  }

  const themeMap: {
    critical: ThemeConfig
    info: ThemeConfig
    success: ThemeConfig
    warning: ThemeConfig
  } = {
    critical: {
      gradient: 'var(--gradient-critical)',
      border: 'var(--gradient-critical-border)',
      iconColor: 'var(--gradient-critical-icon)',
      label: 'DOR TORÁCICA',
      stroke: '#E9C46A',
      fillStart: '#E9C46A',
      glow: 'from-amber-200/20 to-orange-100/10',
      iconBg: 'bg-amber-50 dark:bg-amber-500/10',
      trendColor: 'text-amber-700 dark:text-amber-400',
      trendBg: 'bg-amber-100/50 dark:bg-amber-500/10',
      chartData: CHART_DATA.orange,
    },
    info: {
      gradient: 'var(--gradient-info)',
      border: 'var(--gradient-info-border)',
      iconColor: 'var(--gradient-info-icon)',
      label: 'PCTS/HORA',
      stroke: '#0077B6',
      fillStart: '#0077B6',
      glow: 'from-blue-200/20 to-cyan-100/10',
      iconBg: 'bg-blue-50 dark:bg-blue-500/10',
      trendColor: 'text-blue-700 dark:text-blue-400',
      trendBg: 'bg-blue-100/50 dark:bg-blue-500/10',
      chartData: CHART_DATA.blue,
    },
    success: {
      gradient: 'var(--gradient-success)',
      border: 'var(--gradient-success-border)',
      iconColor: 'var(--gradient-success-icon)',
      label: 'REAVALIAÇÕES',
      stroke: '#2A9D8F',
      fillStart: '#2A9D8F',
      glow: 'from-emerald-200/20 to-teal-100/10',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
      trendColor: 'text-emerald-700 dark:text-emerald-400',
      trendBg: 'bg-emerald-100/50 dark:bg-emerald-500/10',
      chartData: CHART_DATA.green,
    },
    warning: {
      gradient: 'var(--gradient-warning)',
      border: 'var(--gradient-warning-border)',
      iconColor: 'var(--gradient-warning-icon)',
      label: 'TEMPO PORTA-ECG',
      stroke: '#E9C46A',
      fillStart: '#E9C46A',
      glow: 'from-amber-100/20 to-orange-50/10',
      iconBg: 'bg-amber-50 dark:bg-amber-500/10',
      trendColor: 'text-amber-700 dark:text-amber-400',
      trendBg: 'bg-amber-100/50 dark:bg-amber-500/10',
      chartData: CHART_DATA.purple,
    },
  }

  const kanbanColumnsConfig: Record<string, any> = {
    exam: { title: 'Aguardando Exame', icon: Stethoscope },
    wait: { title: 'Aguardando Resultados', icon: Microscope },
    reval: { title: 'Reavaliação Médica', icon: PlayCircle },
    done: { title: 'Alta / Internação', icon: FileCheck2 },
  }

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    globalThis.setTimeout?.(() => {
      setDraggedTaskId(taskId)
    }, 0)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedTaskId(null)
    setDragOverColumn(null)
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    if (dragOverColumn !== columnId) setDragOverColumn(columnId)
  }

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    setDragOverColumn(null)
    if (draggedTaskId) {
      handleStatusChange(draggedTaskId, columnId as KanbanStatus)
      setDraggedTaskId(null)
    }
  }

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks?.((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus as KanbanStatus } : t))
    )
  }

  return (
    <div className="dashboard min-h-screen bg-[var(--color-bg-secondary)] p-8 overflow-y-auto custom-scrollbar">
      <DashboardSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Dashboard Header */}
      <header className="dashboard__header mb-8 flex items-center justify-between">
        <div>
          <h2 className="dashboard__title text-3xl font-bold text-[var(--color-text-primary)]">
            Visão Geral
          </h2>
          {preferences.showGreeting && (
             <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-gray-100)] shadow-sm w-fit">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Plantão Ativo • Dr. André
                </p>
             </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="dashboard__status hidden sm:flex items-center gap-2 rounded-full bg-[var(--color-success-light)] px-4 py-1.5 text-sm font-medium text-[var(--color-success-dark)]">
            <span className="dashboard__status-dot h-2 w-2 rounded-full bg-[var(--color-success-base)] animate-pulse" />
            Sistema Operacional
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-colors shadow-sm"
              title="Configurações"
            >
              <Settings2 className="w-5 h-5 text-slate-500" />
            </button>
            <button 
              onClick={onNewAttendance}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary-500)] text-white rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-[var(--color-primary-600)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              Novo Atendimento
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Card Section */}
      {preferences.showAlertRow && (
        <section className="mb-10">
          <WelcomeHeader
            doctorName="André"
            patientsAttended={tasks.filter(t => t.status === 'done').length}
          />
        </section>
      )}

      {/* Metrics Grid */}
      <section className="dashboard__metrics grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-12">
        <MetricCard
          title={themeMap.critical.label}
          value="04"
          sub="Pacientes com dor torácica"
          icon={Activity}
          type="critical"
          theme={themeMap.critical}
          trend="up"
          trendValue="+2"
          data={themeMap.critical.chartData}
          density={componentDensity}
        />
        <MetricCard
          title={themeMap.info.label}
          value="12"
          sub="Média de pacientes por hora"
          icon={Users}
          type="info"
          theme={themeMap.info}
          trend="down"
          trendValue="-3"
          data={themeMap.info.chartData}
          density={componentDensity}
        />
        <MetricCard
          title={themeMap.success.label}
          value="08"
          sub="Reavaliações pendentes"
          icon={CheckCircle2}
          type="success"
          theme={themeMap.success}
          trend="up"
          trendValue="+1"
          data={themeMap.success.chartData}
          density={componentDensity}
        />
        <MetricCard
          title={themeMap.warning.label}
          value="15m"
          sub="Tempo médio porta-ECG"
          icon={Clock}
          type="warning"
          theme={themeMap.warning}
          trend="down"
          trendValue="-2m"
          data={themeMap.warning.chartData}
          density={componentDensity}
        />
      </section>

      {/* Patient Kanban Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-label text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            Fluxo de Pacientes
          </h3>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
               <Filter className="w-4 h-4" />
               Filtrar
             </button>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar">
          {preferences.visibleKanbanColumns.map((columnId) => {
            const config = kanbanColumnsConfig[columnId]
            if (!config) return null

            return (
              <KanbanColumn
                key={columnId}
                id={columnId}
                title={config.title}
                icon={config.icon}
                tasks={tasks.filter((t) => t.status === columnId)}
                isDropTarget={dragOverColumn === columnId}
                draggedTaskId={draggedTaskId}
                density={componentDensity}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={(e: any) => handleDragOver(e, columnId)}
                onDragLeave={() => setDragOverColumn(null)}
                onDrop={handleDrop}
                onStatusChange={handleStatusChange}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}


