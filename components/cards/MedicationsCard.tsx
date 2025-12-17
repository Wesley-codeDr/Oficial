'use client'

import React from 'react';
import { MoreHorizontal, Archive, AlertTriangle, ChevronRight, Pill } from 'lucide-react';

export const MedicationsCard: React.FC = () => {
  return (
    <div className="p-6 rounded-[32px] bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col transition-colors">
       <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight transition-colors">Medicações</h3>
        <button className="w-8 h-8 rounded-full bg-white/40 dark:bg-slate-700/40 hover:bg-white dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
        {/* Item 1 */}
        <div className="flex justify-between items-center p-3 hover:bg-white/50 dark:hover:bg-slate-700/40 rounded-2xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-white/40 dark:hover:border-white/5 hover:shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-[18px] flex items-center justify-center shrink-0">
              <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400 rotate-45" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-[15px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Amoxicilina</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">500mg • Manhã</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors group-hover:translate-x-1" />
        </div>

        {/* Item 2 */}
        <div className="flex justify-between items-center p-3 hover:bg-white/50 dark:hover:bg-slate-700/40 rounded-2xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-white/40 dark:hover:border-white/5 hover:shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 dark:bg-red-500/20 rounded-[18px] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-[15px] group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Ibuprofeno</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">200mg • SOS</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors group-hover:translate-x-1" />
        </div>
        
         {/* Item 3 */}
        <div className="flex justify-between items-center p-3 hover:bg-white/50 dark:hover:bg-slate-700/40 rounded-2xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-white/40 dark:hover:border-white/5 hover:shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-[18px] flex items-center justify-center shrink-0">
              <Archive className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-[15px] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Vitamina C</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">1g • Manhã</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};