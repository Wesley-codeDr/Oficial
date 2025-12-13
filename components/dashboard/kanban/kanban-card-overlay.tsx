'use client';

/**
 * Kanban Card Overlay
 * Visual representation during drag operations
 */

import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KanbanTask } from '@/types/frontend';

interface KanbanCardOverlayProps {
  task: KanbanTask;
  density?: 'default' | 'compact';
}

/**
 * Apple HIG-style drag overlay for Kanban cards
 * Elevated appearance with shadow and scale
 */
export function KanbanCardOverlay({
  task,
  density = 'default',
}: KanbanCardOverlayProps) {
  const isCompact = density === 'compact';

  return (
    <div
      className={cn(
        'w-[320px] rounded-[24px]',
        'border shadow-[0_25px_50px_-10px_rgba(0,0,0,0.15),0_15px_30px_-5px_rgba(0,0,0,0.08)]',
        'bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/60 dark:border-white/10',
        'transform rotate-2',
        isCompact ? 'p-3' : 'p-5'
      )}
      style={{
        cursor: 'grabbing',
      }}
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

        {/* Acuity Indicator */}
        <div className="relative">
          <div
            className={cn(
              'w-3 h-3 rounded-full shadow-sm ring-2 ring-white dark:ring-slate-700',
              task.acuity === 'red' && 'bg-red-500',
              task.acuity === 'orange' && 'bg-orange-500',
              task.acuity === 'yellow' && 'bg-yellow-400',
              task.acuity === 'green' && 'bg-green-500'
            )}
          />
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
      </div>
    </div>
  );
}
