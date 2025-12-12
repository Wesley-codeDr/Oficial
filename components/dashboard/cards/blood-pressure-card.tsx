'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';

interface BloodPressureCardProps {
  systolic?: number;
  diastolic?: number;
  avgSystolic?: number;
  avgDiastolic?: number;
  className?: string;
}

export function BloodPressureCard({
  systolic = 120,
  diastolic = 80,
  avgSystolic = 118,
  avgDiastolic = 78,
  className
}: BloodPressureCardProps) {
  // Calculate status based on values
  const isNormal = systolic <= 120 && diastolic <= 80;
  const statusColor = isNormal ? 'emerald' : systolic > 140 || diastolic > 90 ? 'red' : 'amber';

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-[32px] p-0 flex flex-col group',
        'bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl',
        'border border-white/60 dark:border-white/10',
        'shadow-[0_8px_32px_rgba(0,0,0,0.04)]',
        'hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]',
        'ring-1 ring-white/40 dark:ring-white/5',
        'transition-all duration-500',
        'h-[240px]',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={appleSpring}
    >
      {/* Volumetric Purple Glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/30 opacity-20 blur-[70px] pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col h-full p-6">
        <div className="flex justify-between items-start mb-4">
          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[20px] bg-violet-50 dark:bg-violet-500/20 backdrop-blur-md flex items-center justify-center shadow-sm border border-white/40 dark:border-white/5">
              <Activity className="w-6 h-6 text-violet-600 dark:text-violet-400 stroke-[2.5px]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
                Pressão Arterial
              </h3>
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                Sistólica / Diastólica
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={cn(
            'px-3 py-1.5 rounded-full text-[11px] font-bold',
            'backdrop-blur-md border border-white/20',
            'flex items-center gap-1.5',
            statusColor === 'emerald' && 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            statusColor === 'amber' && 'bg-amber-100/50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
            statusColor === 'red' && 'bg-red-100/50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
          )}>
            <span className={cn(
              'w-2 h-2 rounded-full',
              statusColor === 'emerald' && 'bg-emerald-500',
              statusColor === 'amber' && 'bg-amber-500',
              statusColor === 'red' && 'bg-red-500',
            )} />
            {isNormal ? 'Normal' : 'Atenção'}
          </div>
        </div>

        {/* Readings */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {/* Current Reading */}
          <div className="relative">
            <div className="absolute left-0 top-1 bottom-1 w-1.5 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
            <div className="pl-4">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                Atual
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-bold text-slate-800 dark:text-white tracking-tight leading-none filter drop-shadow-sm">
                  {systolic}/{diastolic}
                </span>
                <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                  mmHg
                </span>
              </div>
            </div>
          </div>

          {/* Average Reading */}
          <div className="relative">
            <div className="absolute left-0 top-1 bottom-1 w-1.5 bg-gradient-to-b from-violet-300/50 to-purple-300/50 dark:from-violet-500/30 dark:to-purple-500/30 rounded-full" />
            <div className="pl-4">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                Média (7 dias)
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-600 dark:text-slate-300 tracking-tight leading-none">
                  {avgSystolic}/{avgDiastolic}
                </span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  mmHg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Última medição: há 2h
          </span>
          <button
            type="button"
            aria-label="Ver histórico de pressão arterial"
            title="Ver histórico de pressão arterial"
            className="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all shadow-sm backdrop-blur-md border border-white/40 dark:border-white/5"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
