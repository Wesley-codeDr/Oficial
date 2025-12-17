'use client'

import React from 'react';
import { TrendingUp, Zap, Clock, ChevronRight } from 'lucide-react';

export const SummaryCard: React.FC = () => {
  return (
    <div className="w-full p-8 rounded-[32px] bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight transition-colors">Hoje</h2>
        <a href="#" className="px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-700/50 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 flex items-center gap-1 transition-all group shadow-sm border border-white/60 dark:border-white/10">
          <span className="hidden sm:inline">Ver Todo</span>
          <span className="sm:hidden">Ver</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Steps */}
        <div className="flex items-center gap-5 p-4 rounded-[24px] bg-white/40 dark:bg-slate-700/30 border border-white/40 dark:border-white/5 shadow-sm hover:bg-white/60 dark:hover:bg-slate-700/50 transition-colors">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-0.5 transition-colors">Passos</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">10.432</p>
          </div>
        </div>

        {/* Calories */}
        <div className="flex items-center gap-5 p-4 rounded-[24px] bg-white/40 dark:bg-slate-700/30 border border-white/40 dark:border-white/5 shadow-sm hover:bg-white/60 dark:hover:bg-slate-700/50 transition-colors">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Zap className="w-7 h-7 fill-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-0.5 transition-colors">Calorias</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">2.150 <span className="text-sm font-medium text-slate-400 dark:text-slate-500">kcal</span></p>
          </div>
        </div>

        {/* Stand Time */}
        <div className="flex items-center gap-5 p-4 rounded-[24px] bg-white/40 dark:bg-slate-700/30 border border-white/40 dark:border-white/5 shadow-sm hover:bg-white/60 dark:hover:bg-slate-700/50 transition-colors">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-0.5 transition-colors">Tempo em Pé</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">12<span className="text-sm font-medium text-slate-400 dark:text-slate-500">h</span> 30<span className="text-sm font-medium text-slate-400 dark:text-slate-500">m</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};