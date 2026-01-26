/**
 * KanbanCard Component
 *
 * Card component for kanban tasks
 */

'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import type { KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { DASHBOARD_CONFIG } from '@/lib/config/dashboard'

interface KanbanCardProps {
  task: KanbanTask
  onDragStart: (e: React.DragEvent, id: string) => void
  onDragEnd: (e: React.DragEvent) => void
  onStatusChange: (taskId: string, newStatus: string) => void
  isDragging: boolean
  density?: 'compact' | 'comfortable'
}

const STATUS_OPTIONS: { id: KanbanStatus; label: string; color: string }[] = [
  { id: 'exam', label: 'Aguardando Exame', color: 'text-blue-500' },
  { id: 'wait', label: 'Aguardando Resultados', color: 'text-yellow-500' },
  { id: 'reval', label: 'Reavaliação', color: 'text-orange-500' },
  { id: 'done', label: 'Alta / Internação', color: 'text-emerald-500' },
]

export const KanbanCard = ({
  task,
  onDragStart,
  onDragEnd,
  onStatusChange,
  isDragging,
  density = 'comfortable',
}: KanbanCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const isCompact = density === 'compact'

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
                transition: { duration: 0.4, ease: DASHBOARD_CONFIG.easing.smooth },
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
        {/* Priority Indicator */}
        <div
          className={`absolute top-0 left-0 right-0 h-6 opacity-[0.06] pointer-events-none rounded-t-2xl bg-linear-to-b from-current to-transparent`}
          style={{
            color: task.acuity === 'red' ? 'var(--color-emergency-red-500)' :
                   task.acuity === 'orange' ? 'var(--color-emergency-orange-500)' :
                   task.acuity === 'yellow' ? 'var(--color-emergency-yellow-500)' : 'var(--color-medical-green-500)'
          }}
        />

        {/* Acuity Indicator */}
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
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12" />
            </svg>
            {task.waitTime}
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-300 hover:text-primary transition-colors"
              aria-label="Opções de status"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-8 right-0 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[20px] shadow-xl border border-white/20 dark:border-white/10 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                {STATUS_OPTIONS
                  .filter((opt) => opt.id !== task.status)
                  .map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onStatusChange(task.id, option.id)
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-[14px] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between group"
                      aria-label={`Mudar status para ${option.label}`}
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
