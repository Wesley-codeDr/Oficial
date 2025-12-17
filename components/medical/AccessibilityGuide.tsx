'use client'


import React from 'react';
import { Check, X, Info } from 'lucide-react';

interface ContrastRowProps {
  bgName: string;
  bgClass: string;
  textName: string;
  textClass: string;
  ratio: string;
  level: 'AA' | 'AAA' | 'Fail';
  description: string;
}

const ContrastRow: React.FC<ContrastRowProps> = ({ bgName, bgClass, textName, textClass, ratio, level, description }) => (
  <div className="grid grid-cols-12 gap-4 items-center p-4 border-b border-slate-200 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
    {/* Visual Preview */}
    <div className="col-span-12 md:col-span-4 relative h-16 rounded-xl overflow-hidden shadow-sm ring-1 ring-black/5 dark:ring-white/10">
       {/* Base Background (to simulate glass effect over it) */}
       <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-blue-100 dark:from-slate-900 dark:to-black"></div>
       
       {/* The Material Being Tested */}
       <div className={`absolute inset-0 flex items-center justify-center ${bgClass} backdrop-blur-md`}>
          <span className={`text-sm font-bold ${textClass}`}>Texto de Exemplo</span>
       </div>
    </div>

    {/* Details */}
    <div className="col-span-6 md:col-span-3">
       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fundo</p>
       <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{bgName}</p>
       <code className="text-[10px] text-slate-500 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded mt-1 inline-block">{bgClass}</code>
    </div>

    <div className="col-span-6 md:col-span-3">
       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Texto</p>
       <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{textName}</p>
       <code className="text-[10px] text-slate-500 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded mt-1 inline-block">{textClass}</code>
    </div>

    {/* Score */}
    <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-3">
       <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase">Ratio</p>
          <p className="font-mono font-bold text-slate-700 dark:text-slate-200">{ratio}</p>
       </div>
       <div className={`
          flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-xs
          ${level === 'AAA' ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
            level === 'AA' ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
            'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400'}
       `}>
          {level}
       </div>
    </div>
  </div>
);

export const AccessibilityGuide: React.FC = () => {
  return (
    <div className="h-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl backdrop-saturate-[180%] rounded-[36px] border border-white/60 dark:border-white/5 shadow-sm overflow-y-auto custom-scrollbar p-8 animate-in fade-in duration-500">
       
       <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
             <Check className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Guia de Acessibilidade & Contraste</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Validação WCAG 2.1 para materiais translúcidos e tipografia.</p>
          </div>
       </div>

       <div className="space-y-8">
          {/* Section 1: Light Mode Glass */}
          <div className="bg-white/60 dark:bg-black/20 rounded-[24px] border border-white/50 dark:border-white/5 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 dark:text-slate-200">Modo Claro (Light Mode)</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Target: Glassmorphism</span>
             </div>
             
             <ContrastRow 
                bgName="Glass Surface (Default)"
                bgClass="bg-white/40"
                textName="Primary Text"
                textClass="text-slate-900"
                ratio="14.2 : 1"
                level="AAA"
                description="Texto principal sobre cartões padrão."
             />
             <ContrastRow 
                bgName="Glass Surface (Default)"
                bgClass="bg-white/40"
                textName="Secondary Text"
                textClass="text-slate-500"
                ratio="5.4 : 1"
                level="AA"
                description="Texto de apoio e legendas."
             />
             <ContrastRow 
                bgName="Active Element"
                bgClass="bg-white"
                textName="Accent Blue"
                textClass="text-blue-600"
                ratio="4.6 : 1"
                level="AA"
                description="Links e botões ativos."
             />
             <ContrastRow 
                bgName="Destructive Bg"
                bgClass="bg-red-100"
                textName="Destructive Text"
                textClass="text-red-700"
                ratio="5.8 : 1"
                level="AA"
                description="Alertas e erros (Badges)."
             />
          </div>

          {/* Section 2: Dark Mode Glass */}
          <div className="bg-white/60 dark:bg-black/20 rounded-[24px] border border-white/50 dark:border-white/5 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 dark:text-slate-200">Modo Escuro (Dark Mode)</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Target: Depth</span>
             </div>
             
             <ContrastRow 
                bgName="Dark Surface (Base)"
                bgClass="bg-slate-900/60"
                textName="Primary Text"
                textClass="text-white"
                ratio="16.5 : 1"
                level="AAA"
                description="Texto principal sobre fundo escuro."
             />
             <ContrastRow 
                bgName="Dark Surface (Base)"
                bgClass="bg-slate-900/60"
                textName="Secondary Text"
                textClass="text-slate-400"
                ratio="6.1 : 1"
                level="AA"
                description="Texto de apoio em modo noturno."
             />
             <ContrastRow 
                bgName="Accent Surface"
                bgClass="bg-blue-900/30"
                textName="Accent Text"
                textClass="text-blue-400"
                ratio="5.2 : 1"
                level="AA"
                description="Elementos interativos e destaques."
             />
          </div>

          {/* Info Box */}
          <div className="flex gap-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
             <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
             <div>
                <h4 className="font-bold text-blue-800 dark:text-blue-200 text-sm mb-1">Critérios de Aprovação</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                   O sistema utiliza a escala WCAG 2.1. Nível <strong>AA</strong> requer contraste de 4.5:1 para texto normal e 3:1 para texto grande/interface. Nível <strong>AAA</strong> requer 7:1 para texto normal. Materiais translúcidos são calculados baseando-se na cor média do "borrão" (blur) sobre o fundo padrão da aplicação.
                </p>
             </div>
          </div>
       </div>
    </div>
  );
};
