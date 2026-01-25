'use client'

import React from 'react';
import { Moon, Activity, Scale, RefreshCw, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, Tooltip } from 'recharts';
import { iconStrokeWidth } from '@/lib/design-system/icon-system';

const sleepData = [
  { v: 4 }, { v: 6 }, { v: 5 }, { v: 7 }, { v: 3 }, { v: 4 }, { v: 2 }
];

const weightData = [
  { v: 70 }, { v: 71 }, { v: 70.5 }, { v: 72 }, { v: 72.5 }, { v: 72 }, { v: 72.5 }
];

const CustomTooltip = ({ active, payload, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/20 dark:border-white/10 shadow-lg z-50">
        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
          {payload[0].value} <span className="font-medium text-slate-500 dark:text-slate-400">{unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Reusable Header
const CardHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center justify-between w-full mb-3">
    <div className="flex items-center gap-2">
      {icon && <div className="scale-90">{icon}</div>}
      <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight transition-colors">{title}</h4>
    </div>
    <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors bg-white/40 dark:bg-slate-700/40 p-1 rounded-full">
      <ChevronRight className="w-3 h-3" strokeWidth={iconStrokeWidth.medium} />
    </button>
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="group relative p-4 rounded-[24px] bg-white/25 dark:bg-[rgba(30,30,30,0.25)] backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/30 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.6)] transition-all duration-300 flex flex-col h-full hover:bg-white/30 dark:hover:bg-[rgba(30,30,30,0.32)] overflow-hidden liquid-glass-material rim-light-ios26 liquid-glass-specular">
    {/* Subtle Shine Effect */}
    <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1000ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent skew-x-12 pointer-events-none z-0" />
    
    {/* Content Wrapper */}
    <div className="relative z-10 flex flex-col h-full flex-1">
      {children}
    </div>
  </div>
);

export const SleepCard: React.FC = () => (
  <GlassCard>
    <CardHeader title="Sono" icon={<Moon className="w-4 h-4 text-indigo-500 fill-indigo-500" strokeWidth={iconStrokeWidth.regular} />} />
    <div className="flex-1 flex flex-col justify-end">
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">8<span className="text-sm text-slate-500 dark:text-slate-400 font-medium">h</span> 12<span className="text-sm text-slate-500 dark:text-slate-400 font-medium">m</span></p>
        <div className="h-16 w-full rounded-xl overflow-hidden">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData}>
                    <Tooltip content={<CustomTooltip unit="h" />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)', radius: 4 }} />
                    <Bar dataKey="v" fill="#6366F1" radius={[3, 3, 3, 3]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  </GlassCard>
);

export const VigilanceCard: React.FC = () => (
  <GlassCard>
    <CardHeader title="Vigilância" />
    <div className="relative w-full h-full min-h-[100px] flex items-center justify-center">
         {/* Simple SVG Donut */}
         <svg className="w-24 h-24 -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
            <path className="text-white/40 dark:text-white/10 transition-colors" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="text-emerald-500" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <Activity className="absolute w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={iconStrokeWidth.regular} />
    </div>
  </GlassCard>
);

export const WeightCard: React.FC = () => (
  <GlassCard>
    <CardHeader title="Peso" icon={<Scale className="w-4 h-4 text-orange-500" strokeWidth={iconStrokeWidth.regular} />} />
     <div className="flex-1 flex flex-col justify-end">
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">72,5 <span className="text-sm font-medium text-slate-500 dark:text-slate-400">kg</span></p>
        <div className="h-16 w-full rounded-xl overflow-hidden relative">
             <ResponsiveContainer width="110%" height="100%">
                <LineChart data={weightData}>
                    <Tooltip content={<CustomTooltip unit="kg" />} cursor={{ stroke: '#F97316', strokeWidth: 1, strokeDasharray: '2 2' }} />
                    <Line type="monotone" dataKey="v" stroke="#F97316" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  </GlassCard>
);

export const CycleCard: React.FC = () => (
  <GlassCard>
    <CardHeader title="Ciclo" />
     <div className="relative w-full h-full min-h-[100px] flex items-center justify-center">
         {/* Simple SVG Donut */}
         <svg className="w-24 h-24 -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
            <path className="text-white/40 dark:text-white/10 transition-colors" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="text-pink-500" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <RefreshCw className="absolute w-6 h-6 text-pink-500 dark:text-pink-400" strokeWidth={iconStrokeWidth.regular} />
    </div>
  </GlassCard>
);