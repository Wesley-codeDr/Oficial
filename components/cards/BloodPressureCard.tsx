'use client'

import React from 'react';
import { Thermometer } from 'lucide-react';

export const BloodPressureCard: React.FC = () => {
  return (
    <div className="w-full h-full p-6 rounded-[24px] bg-white/55 dark:bg-[rgba(30,30,30,0.55)] liquid-glass-subtle border border-white/40 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.3)] flex flex-col justify-between hover:scale-[1.02] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Icon badge with subtle purple tint - allowed for icons */}
          <div className="w-10 h-10 rounded-[14px] bg-[rgba(175,82,222,0.15)] dark:bg-[rgba(175,82,222,0.2)] flex items-center justify-center">
             <Thermometer className="w-5 h-5 text-[#AF52DE] dark:text-[#BF5AF2]" />
          </div>
          <h3 className="font-bold text-lg text-[rgba(0,0,0,0.85)] dark:text-white leading-tight transition-colors">Pressão<br/>Arterial</h3>
        </div>
      </div>

      <div className="space-y-5 mt-2">
        <div className="relative">
           <div className="absolute left-0 top-1 bottom-1 w-1 bg-[rgba(175,82,222,0.3)] dark:bg-[rgba(175,82,222,0.4)] rounded-full"></div>
           <div className="pl-3">
             <p className="text-[10px] font-semibold text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] uppercase tracking-widest mb-0.5">Sis/Dia</p>
             <div className="flex items-baseline gap-1.5">
               <span className="text-2xl font-bold text-[rgba(0,0,0,0.85)] dark:text-white tracking-tight transition-colors">105 - 105</span>
               <span className="text-xs font-semibold text-[rgba(0,0,0,0.45)] dark:text-[rgba(255,255,255,0.5)]">mmHg</span>
             </div>
           </div>
        </div>
         <div className="relative">
           <div className="absolute left-0 top-1 bottom-1 w-1 bg-[rgba(175,82,222,0.3)] dark:bg-[rgba(175,82,222,0.4)] rounded-full"></div>
           <div className="pl-3">
             <p className="text-[10px] font-semibold text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] uppercase tracking-widest mb-0.5">Média</p>
             <div className="flex items-baseline gap-1.5">
               <span className="text-2xl font-bold text-[rgba(0,0,0,0.85)] dark:text-white tracking-tight transition-colors">120 - 130</span>
               <span className="text-xs font-semibold text-[rgba(0,0,0,0.45)] dark:text-[rgba(255,255,255,0.5)]">mmHg</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};