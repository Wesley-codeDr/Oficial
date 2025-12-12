'use client';

import React from 'react';
import { Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BloodPressureCardProps {
  systolic?: number;
  diastolic?: number;
  avgSystolic?: number;
  avgDiastolic?: number;
  className?: string;
}

export function BloodPressureCard({
  systolic = 105,
  diastolic = 105,
  avgSystolic = 120,
  avgDiastolic = 130,
  className
}: BloodPressureCardProps) {
  return (
    <div className={cn(
      'w-full h-full p-6 rounded-[32px]',
      'bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl backdrop-saturate-[180%]',
      'border border-white/50 dark:border-white/10',
      'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
      'flex flex-col justify-between',
      'hover:bg-white/50 dark:hover:bg-slate-800/60 transition-colors duration-500',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
            <Thermometer className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 leading-tight transition-colors">
            Pressão<br />Arterial
          </h3>
        </div>
      </div>

      <div className="space-y-5 mt-2">
        <div className="relative">
          <div className="absolute left-0 top-1 bottom-1 w-1 bg-purple-200 dark:bg-purple-500/30 rounded-full" />
          <div className="pl-3">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
              Sis/Dia
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight transition-colors">
                {systolic} - {diastolic}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">mmHg</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-1 bottom-1 w-1 bg-purple-200 dark:bg-purple-500/30 rounded-full" />
          <div className="pl-3">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
              Média
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight transition-colors">
                {avgSystolic} - {avgDiastolic}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">mmHg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
