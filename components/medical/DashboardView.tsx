'use client'

import * as React from 'react'
import { useState, useMemo } from 'react'
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
  Sparkles,
  Stethoscope,
  Sun,
  Users,
  Timer,
  Activity,
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { useDashboardPreferences } from '@/contexts/DashboardPreferencesContext'
import { DashboardSettingsModal } from './DashboardSettingsModal'
import { WelcomePanel } from '@/components/dashboard'

// --- Mock Data for Charts (Organic Curves) ---
const chartDataOrange = [
  { value: 12 },
  { value: 18 },
  { value: 15 },
  { value: 25 },
  { value: 32 },
  { value: 45 },
  { value: 38 },
  { value: 50 },
  { value: 42 },
]
const chartDataBlue = [
  { value: 30 },
  { value: 25 },
  { value: 35 },
  { value: 30 },
  { value: 45 },
  { value: 35 },
  { value: 55 },
  { value: 50 },
  { value: 60 },
]
const chartDataGreen = [
  { value: 20 },
  { value: 25 },
  { value: 30 },
  { value: 28 },
  { value: 35 },
  { value: 45 },
  { value: 40 },
  { value: 48 },
  { value: 55 },
]
const chartDataPurple = [
  { value: 65 },
  { value: 58 },
  { value: 62 },
  { value: 55 },
  { value: 50 },
  { value: 45 },
  { value: 48 },
  { value: 42 },
  { value: 40 },
]

// --- Sub-components ---

const CountUp = ({ value, duration = 2 }: { value: string | number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isDecimal = typeof value === 'string' && value.includes('.');
  
  React.useEffect(() => {
    const start = 0;
    const end = target;
    if (start === end) return;
    
    const totalFrames = duration * 60;
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out expo
      const current = end * (1 - Math.pow(2, -10 * progress));
      setCount(current);
      
      if (frame === totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [target, duration]);

  if (isNaN(target)) return <>{value}</>;
  
  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);
  const suffix = typeof value === 'string' ? value.replace(/[0-9.]/g, '') : '';
  
  return <>{displayValue}{suffix}</>;
};

const CustomChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        role="tooltip"
        aria-live="polite"
        className="glass-molded-3d liquid-glass-rim liquid-glass-specular px-3 py-2 rounded-[14px] shadow-xl transform -translate-y-2"
      >
        <p className="text-lg font-black text-slate-800 dark:text-white leading-none">
          {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

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
  tasks,
  setTasks,
  onNewAttendance,
  onStartTour,
  onNavigate
}) => {
  const { preferences } = useDashboardPreferences()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

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

  const themeMap: Record<string, ThemeConfig> = {
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
      chartData: chartDataOrange,
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
      chartData: chartDataBlue,
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
      chartData: chartDataGreen,
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
      chartData: chartDataPurple,
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

  const handleStatusChange = (taskId: string, newStatus: KanbanStatus) => {
    setTasks?.((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
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
          <WelcomePanel
            doctorName="André"
            density={preferences.density === 'compact' ? 'compact' : 'comfortable'}
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
          density={preferences.density}
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
          density={preferences.density}
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
          density={preferences.density}
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
          density={preferences.density}
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
                density={preferences.density}
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

const MetricCard = ({
  title,
  value,
  sub,
  icon: Icon,
  type, // Changed from colorTheme
  theme, // New prop to pass theme object directly
  trend,
  trendValue,
  data,
  density,
}: any) => {
  // Removed internal themeMap, using 'theme' prop directly
  const gradId = `grad-${title.replace(/\s/g, '')}`
  const isCompact = density === 'compact'

  const glowClass =
    type === 'critical'
      ? 'text-glow-orange'
      : type === 'info'
        ? 'text-glow-blue'
        : type === 'success'
          ? 'text-glow-green'
          : 'text-glow-purple' // For warning
  const iconGlowClass =
    type === 'critical'
      ? 'icon-glow-orange'
      : type === 'info'
        ? 'icon-glow-blue'
        : type === 'success'
          ? 'icon-glow-green'
          : 'icon-glow-purple' // For warning

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: {
          duration: 0.4,
          ease: [0.25, 1, 0.5, 1]
        }
      }}
      className={`relative overflow-hidden p-0 flex flex-col justify-between group
        ${theme.gradient}
        liquid-glass-subtle 
        saturate-[180%]
        border border-white/30
        rounded-3xl
        card-shadow
        transition-all duration-300 ease-[var(--lg-transition-apple)]
        hover:card-shadow-hover hover:-translate-y-1 hover:scale-[1.02]
        stagger-child
        ${isCompact ? 'h-[180px]' : 'h-[240px]'}`}
    >
      {/* Enhanced hover gradient with better visibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Enhanced glow with better saturation */}
      <motion.div
        className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${theme.glow} blur-[90px] rounded-full pointer-events-none transition-opacity duration-700`}
        animate={{
          opacity: [0.35, 0.5, 0.35],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* NEW: Specular reflection that moves on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)',
        }}
      />

      {/* Content Container */}
      <div
        className={`relative z-20 flex flex-col h-full pointer-events-none ${isCompact ? 'p-4' : 'p-6'}`}
      >
        <div className="flex items-center justify-between pointer-events-auto">
          <div
            className={`glass-icon-circle rim-light-ios26 ${theme.iconBg.includes('amber') ? 'glass-icon-circle--warning' : theme.iconBg.includes('blue') ? 'glass-icon-circle--info' : theme.iconBg.includes('emerald') ? 'glass-icon-circle--success' : 'glass-icon-circle--danger'}`}
          >
            <Icon
              className={`w-5 h-5 ${theme.iconColor} ${iconGlowClass} transition-all duration-300`}
            />
          </div>

          <div
            className={`glass-pill inner-glow-ios26 px-3 py-1.5 rounded-[14px] text-[11px] font-semibold flex items-center gap-1.5 ${theme.trendColor}`}
          >
            {trend === 'up' ? (
              <ArrowUpRight className="w-3 h-3 stroke-[3px]" />
            ) : (
              <ArrowUpRight className="w-3 h-3 rotate-90 stroke-[3px]" />
            )}
            <span className="tracking-wide">{trendValue}</span>
          </div>
        </div>

        <div className={`pointer-events-auto ${isCompact ? 'mt-auto' : 'mt-5'}`}>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] mb-1.5 opacity-90">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3
              className={`${isCompact ? 'text-[38px]' : 'text-[52px]'} font-[100] text-slate-800 dark:text-white tracking-[-0.04em] leading-none display-number-2026 ${glowClass}`}
            >
              <CountUp value={value} />
            </h3>
          </div>
          {!isCompact && (
            <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500 mt-2 tracking-tight">
              {sub}
            </p>
          )}
        </div>
      </div>

      {/* Chart Area - Seamless Bottom (Translúcido, não opaco) */}
      <div
        className={`absolute bottom-0 left-0 right-0 w-full z-10 opacity-90 ${isCompact ? 'h-24' : 'h-36'} bg-linear-to-b from-transparent via-slate-500/5 to-slate-500/15`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.fillStart} stopOpacity={0.25} />
                <stop offset="90%" stopColor={theme.fillStart} stopOpacity={0.0} />
              </linearGradient>
              <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <Tooltip content={<CustomChartTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={theme.stroke}
              strokeWidth={1.5}
              fill={`url(#${gradId})`}
              filter="url(#lineGlow)"
              animationDuration={1500}
              isAnimationActive={true}
              activeDot={{ r: 6, strokeWidth: 0, fill: theme.stroke, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

// --- Kanban Components ---

const KanbanCard: React.FC<{
  task: KanbanTask
  onDragStart: (e: React.DragEvent, id: string) => void
  onDragEnd: (e: React.DragEvent) => void
  onStatusChange: (taskId: string, newStatus: string) => void
  isDragging: boolean
  density?: 'compact' | 'comfortable'
}> = ({ task, onDragStart, onDragEnd, onStatusChange, isDragging, density = 'comfortable' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isCompact = density === 'compact'

  const statusOptions: { id: KanbanStatus; label: string; color: string }[] = [
    { id: 'exam', label: 'Aguardando Exame', color: 'text-blue-500' },
    { id: 'wait', label: 'Aguardando Resultados', color: 'text-yellow-500' },
    { id: 'reval', label: 'Reavaliação', color: 'text-orange-500' },
    { id: 'done', label: 'Alta / Internação', color: 'text-emerald-500' },
  ]

  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      className="w-full"
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={
          !isDragging
            ? {
                scale: 1.015,
                y: -4,
                transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
              }
            : {}
        }
        whileTap={{ scale: 0.98 }}
        className={`group relative w-full z-[1] glass-card
            transition-all duration-300 ease-[var(--lg-transition-apple)]
            cursor-grab active:cursor-grabbing
            p-4 rounded-2xl
            card-shadow
            ${
              isDragging
                ? 'opacity-50 scale-95'
                : 'hover:z-50 hover:card-shadow-hover hover:-translate-y-1 hover:scale-[1.015]'
            }
         `}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-6 opacity-[0.06] pointer-events-none rounded-t-2xl bg-linear-to-b from-current to-transparent`}
          style={{
            color: task.acuity === 'red' ? 'var(--color-emergency-red-500)' :
                   task.acuity === 'orange' ? 'var(--color-emergency-orange-500)' :
                   task.acuity === 'yellow' ? 'var(--color-emergency-yellow-500)' : 'var(--color-medical-green-500)'
          }}
        />
        <div
          className={`absolute left-0 top-1 bottom-1 w-1 rounded-full opacity-80 ${
            task.acuity === 'red'
              ? 'bg-[#FF6B6B] shadow-[2px_0_12px_rgba(255,107,107,0.4)]'
              : task.acuity === 'orange'
                ? 'bg-[#FF9F0A] shadow-[2px_0_12px_rgba(255,159,10,0.4)]'
                : task.acuity === 'yellow'
                  ? 'bg-[#FFD60A] shadow-[2px_0_10px_rgba(255,214,10,0.3)]'
                  : 'bg-[#30D158] shadow-[2px_0_10px_rgba(48,209,88,0.3)]'
          }`}
        />

        {/* Identity Header */}
        <div className={`flex items-start justify-between ${isCompact ? 'mb-2' : 'mb-3.5'}`}>
          <div className="flex items-center gap-3">
            <div
              className={`
                  rounded-full flex items-center justify-center text-xs font-bold shadow-inner 
                  ${isCompact ? 'w-8.5 h-8.5' : 'w-10.5 h-10.5'}
                  ${
                    task.acuity === 'red' 
                      ? 'ring-2 ring-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]' 
                      : task.acuity === 'orange'
                        ? 'ring-2 ring-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                        : 'ring-1 ring-white/30'
                  }
                  ${
                    task.gender === 'F'
                      ? 'bg-white/30 dark:bg-white/15 text-pink-500 dark:text-pink-400 ring-1 ring-pink-400/30'
                      : 'bg-white/30 dark:bg-white/15 text-blue-500 dark:text-blue-400 ring-1 ring-blue-400/30'
                  }
               `}
            >
              {task.patientName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h5
                className={`font-semibold tracking-tight ${isCompact ? 'text-[12px]' : 'text-[15px]'} text-[#1D1D1F] dark:text-white leading-tight`}
              >
                {task.patientName}
              </h5>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5 uppercase tracking-wider opacity-90">
                {task.age} ANOS • {task.gender === 'F' ? 'Fem' : 'Mas'}
              </p>
            </div>
          </div>

          <div className="relative">
              <div
                className={`w-3.5 h-3.5 rounded-full shadow-md ring-2 ring-white/60 dark:ring-white/15
                  ${
                    task.acuity === 'red'
                      ? 'bg-[#FF453A] shadow-[0_0_8px_rgba(255,69,58,0.6)]'
                      : task.acuity === 'orange'
                        ? 'bg-[#FF9F0A]'
                        : task.acuity === 'yellow'
                          ? 'bg-[#FFD60A]'
                          : 'bg-[#30D158]'
                  }
               `}
              >
                {task.acuity === 'red' && (
                  <span className="absolute inset-0 rounded-full bg-[#FF453A] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60 scale-150" />
                )}
              </div>
          </div>
        </div>

        {/* Complaint & Info */}
        <div className={`${isCompact ? 'mb-2.5' : 'mb-4'}`}>
          <p
            className={`${isCompact ? 'text-[12px]' : 'text-[14px]'} font-medium text-slate-600 dark:text-slate-200 leading-relaxed tracking-tight opacity-90`}
          >
            {task.complaint}
          </p>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-between border-t border-slate-100 dark:border-white/5 ${isCompact ? 'pt-2' : 'pt-3'}`}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100/50 dark:bg-white/5 px-2 py-1 rounded-[14px]">
            <Clock className="w-3.5 h-3.5" />
            {task.waitTime}
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-300 hover:text-primary transition-colors"
            >
              <ArrowRightLeft className="w-4 h-4 stroke-[2px]" />
            </button>

            {isMenuOpen && (
              <div className="absolute top-8 right-0 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[20px] shadow-xl border border-white/20 dark:border-white/10 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                {statusOptions
                  .filter((opt) => opt.id !== task.status)
                  .map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onStatusChange(task.id, option.id)
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-[14px] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between group"
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const KanbanColumn = ({
  id,
  title,
  icon: Icon,
  tasks,
  isDropTarget,
  draggedTaskId,
  density,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onStatusChange,
}: any) => {
  const isCompact = density === 'compact'

  return (
    <div
      className={`flex flex-col h-full min-w-[320px] w-full p-3 transition-all duration-700 
        bg-[var(--color-bg-primary)]
        border border-[var(--color-gray-100)]
        rounded-[24px] overflow-visible
        ${isDropTarget ? 'bg-blue-100/40! dark:bg-blue-900/30! scale-[1.01] ring-2 ring-blue-400/50' : ''}
        `}
      style={{
        boxShadow: `var(--shadow-sm)`
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, id)}
    >
      <div
        className={`relative z-10 flex items-center justify-between ${isCompact ? 'px-4 py-3' : 'px-5 py-5'}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`rounded-[20px] text-slate-500 dark:text-slate-400 ${isCompact ? 'p-2' : 'p-2.5'} bg-gray-50 dark:bg-white/5`}
          >
            <Icon className="w-5 h-5 stroke-[2px]" />
          </div>
          <h4 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {title}
            <span className="ml-2.5 text-[11px] font-bold text-slate-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-[14px]">
              {tasks.length}
            </span>
          </h4>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 rounded-[14px] hover:bg-white/30 dark:hover:bg-white/10">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Task List */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-visible px-2 pb-2 custom-scrollbar ${isCompact ? 'space-y-2' : 'space-y-3'}`}
      >
        {tasks.map((task: any) => (
          <KanbanCard
            key={task.id}
            task={task}
            isDragging={draggedTaskId === task.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onStatusChange={onStatusChange}
            density={density}
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-[x24] border-2 border-dashed border-slate-300/40 dark:border-white/5 text-slate-400 dark:text-slate-500 font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/40 dark:hover:bg-white/5 hover:border-blue-400/50 dark:hover:border-blue-500/30 transition-all group overflow-hidden relative"
        >
          <div className="w-7 h-7 rounded-full bg-slate-200/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
            <Plus className="w-4 h-4 stroke-[2.5px]" />
          </div>
          <span className="group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">Novo Atendimento</span>
        </motion.button>
      </div>
    </div>
  )
}
