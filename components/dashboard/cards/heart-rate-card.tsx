'use client';

import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface HeartRateCardProps {
  data?: { v: number }[];
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
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 dark:border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {payload[0].value} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">bpm</span>
        </p>
      </div>
    );
  }
  return null;
}

export function HeartRateCard({ data = defaultData, className }: HeartRateCardProps) {
  return (
    <div className={cn(
      'w-full h-full p-6 rounded-[32px]',
      'bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl backdrop-saturate-[180%]',
      'border border-white/50 dark:border-white/10',
      'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
      'relative overflow-hidden group',
      'hover:bg-white/50 dark:hover:bg-slate-800/60 transition-colors duration-500',
      className
    )}>
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
            Coração
          </h3>
        </div>
        <button className="w-8 h-8 rounded-full bg-white/50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="h-40 w-[110%] -ml-[5%] -mb-6 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#EF4444', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#EF4444"
              strokeWidth={4}
              fill="url(#colorHeart)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
