'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';

interface HeartRateCardProps {
  data?: { v: number }[];
  currentBpm?: number;
  className?: string;
}

const defaultData = [
  { v: 65 }, { v: 68 }, { v: 62 }, { v: 75 }, { v: 85 },
  { v: 80 }, { v: 72 }, { v: 68 }, { v: 75 }, { v: 82 },
  { v: 70 }, { v: 65 }
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length > 0 && payload[0]) {
    return (
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/50 dark:border-white/10 shadow-xl transform -translate-y-2">
        <p className="text-lg font-bold text-slate-800 dark:text-white leading-none">
          {payload[0].value} <span className="text-sm font-medium text-slate-500 dark:text-slate-400">bpm</span>
        </p>
      </div>
    );
  }
  return null;
}

export function HeartRateCard({ data = defaultData, currentBpm = 72, className }: HeartRateCardProps) {
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
      {/* Volumetric Red Glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-red-500/30 to-rose-500/30 opacity-20 blur-[70px] pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col h-full p-6 pointer-events-none">
        <div className="flex justify-between items-start mb-2 pointer-events-auto">
          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[20px] bg-red-50 dark:bg-red-500/20 backdrop-blur-md flex items-center justify-center shadow-sm border border-white/40 dark:border-white/5">
              <Heart className="w-6 h-6 text-red-500 fill-red-500 stroke-[2.5px]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
                Coração
              </h3>
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                Frequência Cardíaca
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-10 h-10 rounded-full bg-white/60 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all shadow-sm backdrop-blur-md border border-white/40 dark:border-white/5">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Value Section */}
        <div className="mt-auto pointer-events-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-[42px] font-bold text-slate-800 dark:text-white tracking-tight leading-none filter drop-shadow-sm">
              {currentBpm}
            </span>
            <span className="text-lg font-semibold text-slate-400 dark:text-slate-500">
              bpm
            </span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-36 z-10 opacity-90">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHeartNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.25} />
                <stop offset="90%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#EF4444"
              strokeWidth={3}
              fill="url(#colorHeartNew)"
              animationDuration={1500}
              isAnimationActive={true}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#EF4444', stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
