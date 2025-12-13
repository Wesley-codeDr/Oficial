'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';
import type { KanbanTask, KanbanStatus } from '@/types/frontend';

interface KanbanCardProps {
  task: KanbanTask;
  isDragging: boolean;
  density?: 'default' | 'compact';
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: () => void;
  onStatusChange: (taskId: string, newStatus: KanbanStatus) => void;
}

const statusOptions: { id: KanbanStatus; label: string; color: string }[] = [
  { id: 'exam', label: 'Aguardando Exame', color: 'text-healthcare-primary' },
  { id: 'wait', label: 'Aguardando Resultados', color: 'text-clinical-warning' },
  { id: 'reval', label: 'Reavaliação', color: 'text-clinical-warning-dark' },
  { id: 'done', label: 'Alta / Internação', color: 'text-clinical-stable' },
];

export function KanbanCard({
  task,
  isDragging,
  density = 'default',
  onDragStart,
  onDragEnd,
  onStatusChange,
}: KanbanCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCompact = density === 'compact';

  return (
    <motion.div
      layout
      draggable="true"
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, task.id)}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={
        isDragging
          ? { opacity: 0.4, scale: 0.95, filter: 'grayscale(100%) blur(1px)' }
          : { opacity: 1, scale: 1, y: 0, filter: 'grayscale(0%) blur(0px)' }
      }
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={
        !isDragging
          ? {
              scale: 1.03,
              y: -5,
              boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1), 0 10px 20px -5px rgba(0,0,0,0.04)',
            }
          : {}
      }
      whileTap={{ scale: 0.98 }}
      transition={appleSpring}
      className={cn(
        'group relative w-full rounded-[24px]',
        'border shadow-[0_4px_20px_rgba(0,0,0,0.02)]',
        'transition-colors duration-300',
        'cursor-grab active:cursor-grabbing',
        isCompact ? 'p-3' : 'p-5',
        isDragging
          ? 'border-dashed border-healthcare-primary dark:border-healthcare-primary/50 bg-healthcare-primary/5 dark:bg-healthcare-primary/10'
          : 'bg-white/60 dark:bg-white/5 backdrop-blur-xl border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10'
      )}
    >
      {/* Identity Header */}
      <div className={cn('flex items-center justify-between', isCompact ? 'mb-2' : 'mb-4')}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'rounded-full flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-white dark:ring-white/5',
              isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10',
              task.gender === 'F'
                ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 dark:from-pink-900/40 dark:to-rose-900/40 dark:text-pink-300'
                : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-blue-300'
            )}
          >
            {task.patientName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h5
              className={cn(
                'font-bold text-slate-800 dark:text-slate-100 leading-tight',
                isCompact ? 'text-xs' : 'text-[15px]'
              )}
            >
              {task.patientName}
            </h5>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
              {task.age} • {task.gender === 'F' ? 'Fem' : 'Mas'}
            </p>
          </div>
        </div>

        {/* Acuity Indicator - Clinical Colors */}
        <div className="relative">
          <div
            className={cn(
              'w-3 h-3 rounded-full shadow-sm ring-2 ring-white dark:ring-neutral-700',
              task.acuity === 'red' && 'bg-clinical-critical',
              task.acuity === 'orange' && 'bg-clinical-warning',
              task.acuity === 'yellow' && 'bg-clinical-warning-light',
              task.acuity === 'green' && 'bg-clinical-stable'
            )}
          >
            {(task.acuity === 'red' || task.acuity === 'orange') && (
              <span
                className={cn(
                  'absolute inset-0 rounded-full opacity-50 animate-ping',
                  task.acuity === 'red' ? 'bg-clinical-critical' : 'bg-clinical-warning'
                )}
              />
            )}
          </div>
        </div>
      </div>

      {/* Complaint & Info */}
      <div className={isCompact ? 'mb-2' : 'mb-3'}>
        <p
          className={cn(
            'font-bold text-slate-700 dark:text-slate-200 leading-relaxed',
            isCompact ? 'text-xs' : 'text-sm'
          )}
        >
          {task.complaint}
        </p>
      </div>

      {/* Footer */}
      <div
        className={cn(
          'flex items-center justify-between border-t border-slate-100 dark:border-white/5',
          isCompact ? 'pt-2' : 'pt-3'
        )}
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100/50 dark:bg-white/5 px-2 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          {task.waitTime}
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-neutral-300 hover:text-healthcare-primary transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div className="absolute top-8 right-0 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-white/10 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
              {statusOptions
                .filter((opt) => opt.id !== task.status)
                .map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onStatusChange(task.id, option.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between group"
                  >
                    {option.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
