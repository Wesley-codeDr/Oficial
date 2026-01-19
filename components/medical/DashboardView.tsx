'use client'

import * as React from 'react'
import { useState, useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRightLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileCheck2,
  Filter,
  HeartPulse,
  HelpCircle,
  Microscope,
  MoreHorizontal,
  PlayCircle,
  Plus,
  Settings2,
  Sparkles,
  Stethoscope,
  Sun,
  Zap,
  Users,
  Timer,
  Activity,
} from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { useDashboardPreferences } from '@/contexts/DashboardPreferencesContext'
import { DashboardSettingsModal } from './DashboardSettingsModal'

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
      <div className="glass-molded-3d liquid-glass-rim liquid-glass-specular px-3 py-2 rounded-[14px] shadow-xl transform -translate-y-2">
        <p className="text-lg font-black text-slate-800 dark:text-white leading-none">
          {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

const MetricCard = ({
  title,
  value,
  sub,
  icon: Icon,
  colorTheme,
  trend,
  trendValue,
  data,
  density,
}: any) => {
  const themeMap: Record<string, any> = {
    orange: {
      stroke: '#FF6B6B',
      fillStart: '#FF6B6B',
      glow: 'from-rose-500/30 to-orange-400/20',
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50 dark:bg-rose-500/20',
      trendColor: 'text-rose-600 dark:text-rose-400',
      trendBg: 'bg-rose-100/50 dark:bg-rose-500/10',
    },
    blue: {
      stroke: '#3B82F6',
      fillStart: '#3B82F6',
      glow: 'from-blue-500/30 to-cyan-500/30',
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50 dark:bg-blue-500/20',
      trendColor: 'text-blue-600 dark:text-blue-400',
      trendBg: 'bg-blue-100/50 dark:bg-blue-500/10',
    },
    green: {
      stroke: '#10B981',
      fillStart: '#10B981',
      glow: 'from-emerald-500/30 to-teal-500/30',
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/20',
      trendColor: 'text-emerald-600 dark:text-emerald-400',
      trendBg: 'bg-emerald-100/50 dark:bg-emerald-500/10',
    },
    purple: {
      stroke: '#8B5CF6',
      fillStart: '#8B5CF6',
      glow: 'from-violet-500/30 to-fuchsia-500/30',
      iconColor: 'text-violet-500',
      iconBg: 'bg-violet-50 dark:bg-violet-500/20',
      trendColor: 'text-violet-600 dark:text-violet-400',
      trendBg: 'bg-violet-100/50 dark:bg-violet-500/10',
    },
  }

  const theme = themeMap[colorTheme] || themeMap.blue
  const gradId = `grad-${title.replace(/\s/g, '')}`
  const isCompact = density === 'compact'

  const glowClass =
    colorTheme === 'orange'
      ? 'text-glow-orange'
      : colorTheme === 'blue'
        ? 'text-glow-blue'
        : colorTheme === 'green'
          ? 'text-glow-green'
          : 'text-glow-purple'
  const iconGlowClass =
    colorTheme === 'orange'
      ? 'icon-glow-orange'
      : colorTheme === 'blue'
        ? 'icon-glow-blue'
        : colorTheme === 'green'
          ? 'icon-glow-green'
          : 'icon-glow-purple'

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
        bg-[var(--liquid-glass-bg)]
        backdrop-blur-[var(--liquid-glass-blur)] 
        saturate-[var(--liquid-glass-saturate)]
        border border-[var(--liquid-glass-border)]
        rounded-3xl
        elevation-1 liquid-float
        specular-2026 caustics-2026
        inner-glow-ios26
        light-refraction-diag
        ring-1 ring-white/40 dark:ring-white/15
        stagger-child
        ${isCompact ? 'h-[180px]' : 'h-[240px]'}`}
      style={{
        boxShadow: `var(--liquid-glass-shadow)`
      }}
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
            className={`glass-icon-circle rim-light-ios26 ${theme.iconBg.includes('orange') ? 'glass-icon-circle--warning' : theme.iconBg.includes('blue') ? 'glass-icon-circle--info' : theme.iconBg.includes('emerald') ? 'glass-icon-circle--success' : 'glass-icon-circle--danger'}`}
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
    <motion.div
      layout
      draggable="true"
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
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
      className={`group relative w-full z-[1] glass-card-reflection
          transition-all duration-500
          cursor-grab active:cursor-grabbing
          p-4 rounded-2xl
          bg-(--liquid-glass-bg)
          backdrop-blur-(--liquid-glass-blur)
          saturate-(--liquid-glass-saturate)
          border border-(--liquid-glass-border)
          elevation-1 inner-glow-ios26
          specular-2026 light-refraction-diag
          ring-1 ring-white/30 dark:ring-white/10
          ${
            isDragging
              ? 'opacity-50 scale-95'
              : 'hover:z-50 hover:bg-white/25 dark:hover:bg-white/10'
          }
       `}
      style={{
        boxShadow: isDragging ? 'none' : 'var(--liquid-glass-shadow)'
      }}
    >
      {/* Acuity Bar Bleed Effect - Reduced opacity for neutral glass appearance */}
      <div
        className={`absolute top-0 left-0 right-0 h-6 opacity-[0.06] pointer-events-none rounded-t-2xl bg-linear-to-b from-current to-transparent`}
        style={{
          color: task.acuity === 'red' ? 'var(--color-emergency-red-500)' :
                 task.acuity === 'orange' ? 'var(--color-emergency-orange-500)' :
                 task.acuity === 'yellow' ? 'var(--color-emergency-yellow-500)' : 'var(--color-medical-green-500)'
        }}
      />
      {/* Acuity Left Bar - Subtle Volumetric */}
      <div
        className={`absolute left-0 top-1 bottom-1 w-1.5 rounded-full opacity-80 ${
          task.acuity === 'red'
            ? 'bg-linear-to-b from-emergency-red-500 via-emergency-red-500/80 to-emergency-red-500/40 shadow-[2px_0_12px_rgba(255,59,48,0.4)]'
            : task.acuity === 'orange'
              ? 'bg-linear-to-b from-emergency-orange-500 via-emergency-orange-500/80 to-emergency-orange-500/40 shadow-[2px_0_12px_rgba(255,149,0,0.4)]'
              : task.acuity === 'yellow'
                ? 'bg-linear-to-b from-emergency-yellow-500 via-emergency-yellow-500/80 to-emergency-yellow-500/40 shadow-[2px_0_10px_rgba(255,204,0,0.3)]'
                : 'bg-linear-to-b from-medical-green-500 via-medical-green-500/80 to-medical-green-500/40 shadow-[2px_0_10px_rgba(52,199,89,0.3)]'
        }`}
      />

      {/* Identity Header */}
      <div className={`flex items-start justify-between ${isCompact ? 'mb-2' : 'mb-3.5'}`}>
        <div className="flex items-center gap-3">
          <div
            className={`
                rounded-full flex items-center justify-center text-xs font-apple-black shadow-inner 
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
              className={`font-apple-semibold tracking-apple-tight ${isCompact ? 'text-[12px]' : 'text-[15px]'} text-slate-800 dark:text-white leading-tight`}
            >
              {task.patientName}
            </h5>
            <p className="text-[10px] font-apple-bold text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5 uppercase tracking-apple-caps opacity-90">
              {task.age} ANOS • {task.gender === 'F' ? 'Fem' : 'Mas'}
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            className={`w-3.5 h-3.5 rounded-full shadow-md ring-2 ring-white/60 dark:ring-white/15
                ${
                  task.acuity === 'red'
                    ? 'bg-emergency-red-500 shadow-[0_0_8px_rgba(255,59,48,0.6)]'
                    : task.acuity === 'orange'
                      ? 'bg-emergency-orange-500'
                      : task.acuity === 'yellow'
                        ? 'bg-emergency-yellow-500'
                        : 'bg-medical-green-500'
                }
             `}
          >
            {task.acuity === 'red' && (
              <span className="absolute inset-0 rounded-full bg-emergency-red-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60 scale-150" />
            )}
            {task.acuity === 'orange' && (
              <span className="absolute inset-0 rounded-full bg-emergency-orange-500 animate-ping opacity-40" />
            )}
          </div>
        </div>
      </div>

      {/* Complaint & Info */}
      <div className={`${isCompact ? 'mb-2.5' : 'mb-4'}`}>
        <p
          className={`${isCompact ? 'text-[12px]' : 'text-[14px]'} font-apple-semibold text-slate-600 dark:text-slate-200 leading-relaxed tracking-apple-tight opacity-90`}
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
            <ArrowRightLeft className="w-4 h-4 stroke-[2px] icon-volumetric" />
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
        bg-(--liquid-glass-bg)
        backdrop-blur-(--liquid-glass-blur-elevated) 
        saturate-(--liquid-glass-saturate-elevated)
        border border-(--liquid-glass-border)
        elevation-2 inner-glow-ios26
        rounded-[24px] overflow-visible
        ${isDropTarget ? 'bg-blue-100/40! dark:bg-blue-900/30! scale-[1.01] ring-2 ring-blue-400/50' : ''}
        `}
      style={{
        boxShadow: `var(--liquid-glass-shadow-elevated)`
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
            className={`glass-pill inner-glow-ios26 rounded-[20px] text-slate-500 dark:text-slate-400 ${isCompact ? 'p-2' : 'p-2.5'}`}
          >
            <Icon className="w-5 h-5 stroke-[2px] icon-volumetric fill-current/10" />
          </div>
          <h4 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {title}
            <span className="ml-2.5 text-[11px] font-bold text-slate-400 glass-pill inner-glow-ios26 px-2.5 py-1 rounded-[14px]">
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
          className="w-full py-4 rounded-[36px] border-2 border-dashed border-slate-300/40 dark:border-white/5 text-slate-400 dark:text-slate-500 font-apple-bold text-sm flex items-center justify-center gap-3 hover:bg-white/40 dark:hover:bg-white/5 hover:border-blue-400/50 dark:hover:border-blue-500/30 transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="w-7 h-7 rounded-full bg-slate-200/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
            <Plus className="w-4 h-4 stroke-[2.5px]" />
          </div>
          <span className="group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">Novo Atendimento</span>
        </motion.button>
      </div>
    </div>
  )
}

// --- Main View ---

interface DashboardViewProps {
  tasks: KanbanTask[]
  setTasks: React.Dispatch<React.SetStateAction<KanbanTask[]>>
  onNewAttendance?: () => void
  onSettings?: () => void
  onStartTour?: () => void
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  setTasks,
  onNewAttendance,
  onStartTour,
}) => {
  const { preferences } = useDashboardPreferences()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

  // Map of all available cards for easier rendering
  const kpiCardsMap: Record<string, React.ReactElement> = {
    thoracic: (
      <MetricCard
        key="thoracic"
        title="Dor Torácica (3h)"
        value="08"
        sub="Alta Demanda"
        icon={AlertTriangle}
        colorTheme="orange"
        trend="up"
        trendValue="12%"
        data={chartDataOrange}
        density={preferences.density}
      />
    ),
    patients: (
      <MetricCard
        key="patients"
        title="Pcts / Hora"
        value="4.2"
        sub="Fluxo Intenso"
        icon={Zap}
        colorTheme="blue"
        trend="down"
        trendValue="5%"
        data={chartDataBlue}
        density={preferences.density}
      />
    ),
    revals: (
      <MetricCard
        key="revals"
        title="Reavaliações"
        value="03"
        sub="Pendentes"
        icon={CheckCircle2}
        colorTheme="green"
        trend="up"
        trendValue="2%"
        data={chartDataGreen}
        density={preferences.density}
      />
    ),
    ecg: (
      <MetricCard
        key="ecg"
        title="Tempo Porta-ECG"
        value="08'"
        sub="Meta: < 10min"
        icon={HeartPulse}
        colorTheme="purple"
        trend="down"
        trendValue="15%"
        data={chartDataPurple}
        density={preferences.density}
      />
    ),
  }

  const kanbanColumnsConfig: Record<string, any> = {
    exam: { title: 'Aguardando Exame', icon: Stethoscope },
    wait: { title: 'Aguardando Resultados', icon: Microscope },
    reval: { title: 'Reavaliação Médica', icon: PlayCircle },
    done: { title: 'Alta / Internação', icon: FileCheck2 },
  }

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    // Delay setting state to avoid affecting the drag snapshot
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

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    setDragOverColumn(null)
    if (draggedTaskId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === draggedTaskId ? { ...t, status: newStatus as any } : t))
      )
      setDraggedTaskId(null)
    }
  }

  const handleStatusChange = (taskId: string, newStatus: KanbanStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))
  }

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite'

  // Renderable KPI Cards based on order and visibility
  const renderableKpiCards = useMemo(() => {
    return preferences.kpiOrder
      .filter((id) => preferences.visibleKpiCards.includes(id))
      .map((id) => kpiCardsMap[id])
  }, [preferences.kpiOrder, preferences.visibleKpiCards, kpiCardsMap])

  return (
    <div className="h-full flex flex-col bg-transparent overflow-hidden px-2 relative animate-in fade-in duration-700">
      <DashboardSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* 1. Header & KPIs */}
      <div
        className={`shrink-0 px-4 ${preferences.density === 'compact' ? 'pt-4 pb-1' : 'pt-6 pb-2'}`}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[32px] font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
              Visão Geral
            </h1>

            {preferences.showGreeting && (
              <div className="glass-pill flex items-center gap-2 mt-2 px-3 py-1.5 rounded-[14px] animate-in fade-in slide-in-from-left-4">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Plantão Ativo • Dr. André
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {tasks.length === 0 && onStartTour && (
              <button
                onClick={onStartTour}
                className="glass-btn-ghost h-11 px-5 font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                aria-label="Iniciar tour guiado"
              >
                <HelpCircle className="w-4 h-4" />
                Fazer Tour
              </button>
            )}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="glass-btn-ghost h-11 px-5 font-bold text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
            >
              <Settings2 className="w-4 h-4" />
              Configurar
            </button>
            <button
              onClick={onNewAttendance}
              className="btn-primary-glass h-11 px-6 text-[#007AFF] font-bold text-sm flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              Novo Atendimento
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderableKpiCards}
        </div>
      </div>

      {/* 2. Priority Insight Row (Refined) */}
      {preferences.showAlertRow && (
        <div
          className={`mx-4 shrink-0 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200 
            liquid-glass-material rounded-full px-6 py-3 border border-white/30 dark:border-white/10 shadow-glass
            ${preferences.density === 'compact' ? 'mt-3 mb-2' : 'mt-6 mb-4'}`}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-amber-500/80" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {greeting}
              </span>
            </div>
            
            <div className="h-4 w-px bg-slate-200/50 dark:bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                <span className="text-slate-800 dark:text-slate-100 font-bold mr-1">IA Insights:</span>
                1 paciente aguarda reavaliação prioritária.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-[14px] hover:bg-white/40 dark:hover:bg-white/5 transition-colors text-slate-400">
              <Filter className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-3">
              Fluxo em Tempo Real
            </div>
          </div>
        </div>
      )}

      {/* 3. Kanban Board */}
      <div
        className={`flex-1 overflow-x-auto overflow-y-hidden px-4 ${preferences.density === 'compact' ? 'pb-3 mt-2' : 'pb-6 mt-0'}`}
      >
        <div className="flex h-full gap-6 min-w-[1200px]">
          {preferences.visibleKanbanColumns.map((colId) => {
            const config = kanbanColumnsConfig[colId]
            if (!config) return null

            return (
              <KanbanColumn
                key={colId}
                id={colId}
                title={config.title}
                icon={config.icon}
                tasks={tasks.filter((t) => t.status === colId)}
                isDropTarget={dragOverColumn === colId}
                draggedTaskId={draggedTaskId}
                density={preferences.density}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={(e: any) => handleDragOver(e, colId)}
                onDragLeave={() => setDragOverColumn(null)}
                onDrop={handleDrop}
                onStatusChange={handleStatusChange}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
