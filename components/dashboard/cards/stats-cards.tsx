'use client';

import React from 'react';
import { Moon, Activity, Scale, RefreshCw, ChevronRight, Users, Clock, AlertTriangle, Stethoscope } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

// Default data
const sleepData = [
  { v: 4 }, { v: 6 }, { v: 5 }, { v: 7 }, { v: 3 }, { v: 4 }, { v: 2 }
];

const weightData = [
  { v: 70 }, { v: 71 }, { v: 70.5 }, { v: 72 }, { v: 72.5 }, { v: 72 }, { v: 72.5 }
];

// Custom Tooltip Component
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  unit?: string;
}

function CustomTooltip({ active, payload, unit }: TooltipProps) {
  if (active && payload && payload.length > 0 && payload[0]) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/20 dark:border-white/10 shadow-lg z-50">
        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
          {payload[0].value} <span className="font-medium text-slate-500 dark:text-slate-400">{unit}</span>
        </p>
      </div>
    );
  }
  return null;
}

// Card Header Component
interface CardHeaderProps {
  title: string;
  icon?: React.ReactNode;
  showAction?: boolean;
}

function CardHeader({ title, icon, showAction = true }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full mb-3">
      <div className="flex items-center gap-2">
        {icon && <div className="scale-90">{icon}</div>}
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight transition-colors">
          {title}
        </h4>
      </div>
      {showAction && (
        <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors bg-white/40 dark:bg-slate-700/40 p-1 rounded-full">
          <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// Glass Card Wrapper
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      'group relative p-5 rounded-[32px]',
      'bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl backdrop-saturate-[180%]',
      'border border-white/50 dark:border-white/10',
      'shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
      'transition-all duration-300 flex flex-col h-full',
      'hover:bg-white/50 dark:hover:bg-slate-800/60 overflow-hidden',
      className
    )}>
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1000ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent skew-x-12 pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full flex-1">
        {children}
      </div>
    </div>
  );
}

// Individual Stat Cards
export function SleepCard() {
  return (
    <GlassCard>
      <CardHeader title="Sono" icon={<Moon className="w-4 h-4 text-indigo-500 fill-indigo-500" />} />
      <div className="flex-1 flex flex-col justify-end">
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">
          8<span className="text-sm text-slate-500 dark:text-slate-400 font-medium">h</span>{' '}
          12<span className="text-sm text-slate-500 dark:text-slate-400 font-medium">m</span>
        </p>
        <div className="h-16 w-full rounded-xl overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sleepData}>
              <Tooltip
                content={<CustomTooltip unit="h" />}
                cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
              />
              <Bar dataKey="v" fill="#6366F1" radius={[3, 3, 3, 3]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}

export function VigilanceCard({ percentage = 75 }: { percentage?: number }) {
  return (
    <GlassCard>
      <CardHeader title="Vigilância" />
      <div className="relative w-full h-full min-h-[100px] flex items-center justify-center">
        <svg className="w-24 h-24 -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
          <path
            className="text-white/40 dark:text-white/10 transition-colors"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="text-emerald-500"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <Activity className="absolute w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
    </GlassCard>
  );
}

export function WeightCard({ weight = 72.5 }: { weight?: number }) {
  return (
    <GlassCard>
      <CardHeader title="Peso" icon={<Scale className="w-4 h-4 text-orange-500" />} />
      <div className="flex-1 flex flex-col justify-end">
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">
          {weight} <span className="text-sm font-medium text-slate-500 dark:text-slate-400">kg</span>
        </p>
        <div className="h-16 w-full rounded-xl overflow-hidden relative">
          <ResponsiveContainer width="110%" height="100%">
            <LineChart data={weightData}>
              <Tooltip
                content={<CustomTooltip unit="kg" />}
                cursor={{ stroke: '#F97316', strokeWidth: 1, strokeDasharray: '2 2' }}
              />
              <Line type="monotone" dataKey="v" stroke="#F97316" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}

export function CycleCard({ percentage = 60 }: { percentage?: number }) {
  return (
    <GlassCard>
      <CardHeader title="Ciclo" />
      <div className="relative w-full h-full min-h-[100px] flex items-center justify-center">
        <svg className="w-24 h-24 -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
          <path
            className="text-white/40 dark:text-white/10 transition-colors"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="text-pink-500"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <RefreshCw className="absolute w-6 h-6 text-pink-500 dark:text-pink-400" />
      </div>
    </GlassCard>
  );
}

// Medical KPI Cards
export function PatientsWaitingCard({ count = 12 }: { count?: number }) {
  return (
    <GlassCard>
      <CardHeader title="Aguardando" icon={<Users className="w-4 h-4 text-blue-500" />} />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          {count}
        </p>
      </div>
    </GlassCard>
  );
}

export function AverageWaitTimeCard({ minutes = 32 }: { minutes?: number }) {
  return (
    <GlassCard>
      <CardHeader title="Tempo Médio" icon={<Clock className="w-4 h-4 text-amber-500" />} />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          {minutes}<span className="text-lg text-slate-500 dark:text-slate-400">min</span>
        </p>
      </div>
    </GlassCard>
  );
}

export function AlertsCard({ count = 3 }: { count?: number }) {
  return (
    <GlassCard className={count > 0 ? 'border-red-200 dark:border-red-900/50' : ''}>
      <CardHeader title="Alertas" icon={<AlertTriangle className="w-4 h-4 text-red-500" />} />
      <div className="flex-1 flex items-center justify-center">
        <p className={cn(
          'text-4xl font-bold tracking-tight',
          count > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
        )}>
          {count}
        </p>
      </div>
    </GlassCard>
  );
}

export function AttendedTodayCard({ count = 28 }: { count?: number }) {
  return (
    <GlassCard>
      <CardHeader title="Atendidos Hoje" icon={<Stethoscope className="w-4 h-4 text-emerald-500" />} />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          {count}
        </p>
      </div>
    </GlassCard>
  );
}
