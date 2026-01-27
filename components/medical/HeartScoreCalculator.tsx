'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowRight, ShieldCheck, Info, Settings, MoreHorizontal } from 'lucide-react';
import { Patient, Symptom } from '@/lib/types/medical';
import { applePhysics } from '@/lib/design-system/animation-tokens';
import { cn } from '@/lib/utils';

interface HeartScoreCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  antecedentesItems?: Symptom[];
  mode?: 'modal' | 'inline';
  onApply?: (result: string) => void;
}

// --- HELPER TO HIDE SCROLLBAR ---
const ScrollbarHide = () => (
  <style>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

export const HeartScoreCalculator: React.FC<HeartScoreCalculatorProps> = ({
  isOpen,
  onClose,
  patient,
  antecedentesItems,
  mode = 'modal',
  onApply
}) => {
  const [historyPoints, setHistoryPoints] = useState(1);
  const [ecgPoints, setEcgPoints] = useState(0);
  const [troponinPoints, setTroponinPoints] = useState(0);

  if (!isOpen) return null;

  const age = parseInt(patient.age || '0');
  const agePoints = age >= 65 ? 2 : age >= 45 ? 1 : 0;

  const riskFactorsCount = antecedentesItems
    ? antecedentesItems.filter(i => i.checked && ['has', 'dm', 'tabagismo', 'dislipidemia', 'hist_fam', 'obesidade'].includes(i.id)).length
    : 0;

  const riskPoints = riskFactorsCount >= 3 ? 2 : riskFactorsCount >= 1 ? 1 : 0;

  const totalScore = historyPoints + agePoints + riskPoints + ecgPoints + troponinPoints;

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: 'Baixo Risco', color: 'text-emerald-500', bg: 'bg-emerald-500', conduct: 'Alta precoce possível.' };
    if (score <= 6) return { label: 'Moderado Risco', color: 'text-amber-500', bg: 'bg-amber-500', conduct: 'Observação + Troponina seriada.' };
    return { label: 'Alto Risco', color: 'text-rose-500', bg: 'bg-rose-500', conduct: 'Internação / CATE precoce.' };
  };

  const risk = getRiskLevel(totalScore);

  const handleApply = () => {
    if (onApply) {
      const resultText = `HEART Score aplicado: ${totalScore} pontos (${risk.label}). Conduta sugerida: ${risk.conduct}`
      onApply(resultText)
      onClose()
    }
  }

  const riskClasses = {
    'Baixo Risco': 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-500 shadow-emerald-500/20',
    'Moderado Risco': 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-500 shadow-amber-500/20',
    'Alto Risco': 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-500 shadow-rose-500/20'
  }[risk.label] || ''

  // Spring transition config
  const springConfig = applePhysics.default;

  const content = (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={applePhysics.spatial}
      className={cn(
        "flex flex-col h-full overflow-hidden relative font-sans text-white",
        mode === 'modal' 
          ? 'glass-elevated w-full max-w-lg rounded-[40px] max-h-[90vh]' 
          : 'bg-transparent w-full'
      )}
    >
      <ScrollbarHide />
      
      {/* MESH GRADIENT BACKGROUND LAYER - REFINED FOR LIQUID GLASS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
         <motion.div 
           animate={{ 
             x: [0, 60, -60, 0], 
             y: [0, -60, 60, 0],
             scale: [1, 1.3, 1, 0.9, 1]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className={cn(
             "absolute -top-1/4 -left-1/4 w-full h-full rounded-full blur-[140px] transition-colors duration-1000 saturate-200",
             risk.label === 'Baixo Risco' ? 'bg-emerald-500/50' : risk.label === 'Moderado Risco' ? 'bg-amber-500/50' : 'bg-rose-500/50'
           )}
         />
         <motion.div 
           animate={{ 
             x: [0, -50, 50, 0], 
             y: [0, 80, -80, 0],
             scale: [1, 0.85, 1.15, 1]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-blue-500/30 rounded-full blur-[140px] saturate-150"
         />
         <motion.div
           animate={{ opacity: [0.1, 0.25, 0.1] }}
           transition={{ duration: 1500, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 bg-white/20 blur-[120px]"
         />
      </div>

      {/* Header: Tabs and Close (Style GlassCalendar) */}
      <div className="p-6 relative z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 rounded-xl bg-black/20 p-1 backdrop-blur-md border border-white/5">
            <button className={cn(
              "rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300",
              mode === 'modal' ? "bg-white text-black shadow-lg rim-highlight" : "text-white/80 hover:text-white"
            )}>
              Modal
            </button>
            <button className={cn(
              "rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300",
              mode === 'inline' ? "bg-white text-black shadow-lg rim-highlight" : "text-white/80 hover:text-white"
            )}>
              Inline
            </button>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              whileTap={applePhysics.haptic}
              className="p-2.5 text-white/70 hover:bg-white/10 rounded-full transition-colors border border-transparent hover:border-white/10"
            >
              <Settings className="h-4 w-4" />
            </motion.button>
            <motion.button 
              whileTap={applePhysics.haptic}
              onClick={onClose} 
              className="p-2.5 text-white/70 hover:bg-rose-500/20 hover:text-rose-400 rounded-full transition-all border border-transparent hover:border-rose-500/30"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={applePhysics.default}
          className="mt-8 flex flex-col"
        >
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-rose-500 fill-current animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Evaluation Protocol</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">HEART Score</h2>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 pt-0 overflow-y-auto overflow-x-hidden scrollbar-hide space-y-9 relative z-20">
         {/* Introduction Note - Floating Vision style */}
         <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex gap-4 items-center group hover:bg-white/8 transition-all duration-500 rim-highlight">
            <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
               <Info className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-bold text-white/70 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
              Protocolo para pacientes com dor torácica suspeita de SCA (Síndrome Coronariana Aguda).
            </p>
         </div>

         {/* H - History */}
         <section>
            <div className="flex items-center gap-3 mb-5">
               <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black shadow-lg rim-highlight">H</div>
               <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">História Clínica</label>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
              <div className="flex space-x-4">
                {[
                  { val: 0, label: 'Pouco Suspeita', desc: 'Resolução rápida' },
                  { val: 1, label: 'Moderadamente', desc: 'Angina estável' },
                  { val: 2, label: 'Altamente', desc: 'Sinais clássicos' }
                ].map((opt) => (
                  <motion.button
                    key={opt.val}
                    whileTap={applePhysics.haptic}
                    onClick={() => setHistoryPoints(opt.val)}
                    className={cn(
                      "shrink-0 flex flex-col items-start p-5 rounded-3xl min-w-[150px] border transition-all duration-500",
                      historyPoints === opt.val 
                        ? "bg-linear-to-br from-blue-500 to-indigo-600 border-blue-400 text-white shadow-xl shadow-blue-600/20 rim-highlight" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    <span className="text-[14px] font-black leading-tight tracking-tight">{opt.label}</span>
                    <span className="text-[10px] font-bold mt-1.5 opacity-40 uppercase tracking-tighter">{opt.desc}</span>
                    <div className={cn(
                      "mt-4 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest border",
                      historyPoints === opt.val ? "bg-white/20 border-white/40" : "bg-white/10 border-white/10 opacity-50"
                    )}>
                       +{opt.val} PTS
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
         </section>

         <div className="h-px bg-white/5" />

         {/* E - ECG */}
         <section>
            <div className="flex items-center gap-3 mb-5">
               <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black shadow-lg rim-highlight">E</div>
               <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Eletrocardiograma</label>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
              <div className="flex space-x-4">
                {[
                  { val: 0, label: 'Normal', desc: 'Sem alterações' },
                  { val: 1, label: 'Inespecífico', desc: 'RBB/LBB antigo' },
                  { val: 2, label: 'Depressão ST', desc: 'Isquemia aguda' }
                ].map((opt) => (
                  <motion.button
                    key={opt.val}
                    whileTap={applePhysics.haptic}
                    onClick={() => setEcgPoints(opt.val)}
                    className={cn(
                      "shrink-0 flex flex-col items-start p-5 rounded-3xl min-w-[150px] border transition-all duration-500",
                      ecgPoints === opt.val 
                        ? "bg-linear-to-br from-blue-500 to-indigo-600 border-blue-400 text-white shadow-xl shadow-blue-600/20 rim-highlight" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    <span className="text-[14px] font-black leading-tight tracking-tight">{opt.label}</span>
                    <span className="text-[10px] font-bold mt-1.5 opacity-40 uppercase tracking-tighter">{opt.desc}</span>
                    <div className={cn(
                      "mt-4 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest border",
                      ecgPoints === opt.val ? "bg-white/20 border-white/40" : "bg-white/10 border-white/10 opacity-50"
                    )}>
                       +{opt.val} PTS
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
         </section>

         <div className="h-px bg-white/5" />

          {/* A & R Auto-Calculated Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md rim-highlight group hover:bg-white/10 transition-colors duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[9px] font-black group-hover:bg-white group-hover:text-black transition-colors">A</div>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">Idade</span>
                </div>
               <div className="flex items-center justify-between mt-1">
                 <span className="text-xl font-black group-hover:scale-105 transition-transform origin-left">{patient.age || 0} anos</span>
                 <span className="text-blue-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">+{agePoints}</span>
               </div>
            </div>

             <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md rim-highlight group hover:bg-white/10 transition-colors duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[9px] font-black group-hover:bg-white group-hover:text-black transition-colors">R</div>
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">Fatores</span>
                </div>
               <div className="flex items-center justify-between mt-1">
                 <span className="text-xl font-black group-hover:scale-105 transition-transform origin-left">{riskFactorsCount} detectados</span>
                 <span className="text-blue-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">+{riskPoints}</span>
               </div>
            </div>
         </div>

         <div className="h-px bg-white/5" />

         {/* T - Troponin */}
         <section>
            <div className="flex items-center gap-3 mb-5">
               <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black shadow-lg rim-highlight">T</div>
               <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Troponina</label>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
              <div className="flex space-x-4">
                {[
                  { val: 0, label: 'Normal', desc: '< Limite' },
                  { val: 1, label: 'Elevada', desc: '1-3x Limite' },
                  { val: 2, label: 'Crítica', desc: '> 3x Limite' }
                ].map((opt) => (
                  <motion.button
                    key={opt.val}
                    whileTap={applePhysics.haptic}
                    onClick={() => setTroponinPoints(opt.val)}
                    className={cn(
                      "shrink-0 flex flex-col items-start p-5 rounded-3xl min-w-[150px] border transition-all duration-500",
                      troponinPoints === opt.val 
                        ? "bg-linear-to-br from-blue-500 to-indigo-600 border-blue-400 text-white shadow-xl shadow-blue-600/20 rim-highlight" 
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    <span className="text-[14px] font-black leading-tight tracking-tight">{opt.label}</span>
                    <span className="text-[10px] font-bold mt-1.5 opacity-40 uppercase tracking-tighter">{opt.desc}</span>
                    <div className={cn(
                      "mt-4 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest border",
                      troponinPoints === opt.val ? "bg-white/20 border-white/40" : "bg-white/10 border-white/10 opacity-50"
                    )}>
                       +{opt.val} PTS
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
         </section>
      </div>

      {/* FOOTER: LIQUID RESULT AREA */}
      <div className="mt-auto relative z-30">
         <div className="h-px bg-white/10" />
         
         <div className="p-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
               <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={cn(
                      "absolute inset-0 blur-2xl transition-colors duration-1000",
                      risk.label === 'Baixo Risco' ? 'bg-emerald-400' : risk.label === 'Moderado Risco' ? 'bg-amber-400' : 'bg-rose-400'
                    )} 
                  />
                  <div className="w-18 h-18 rounded-[24px] bg-white/10 border border-white/20 flex flex-col items-center justify-center relative z-10 backdrop-blur-2xl shadow-2xl rim-highlight">
                     <span className={cn("text-4xl font-black leading-none tracking-tighter", risk.color)}>{totalScore}</span>
                     <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mt-1.5">PTS</span>
                  </div>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] block">Diagnostic Result</span>
                  <motion.span 
                    layoutId="risk-label"
                    className={cn("text-lg font-black uppercase tracking-tight leading-none", risk.color)}
                  >
                    {risk.label}
                  </motion.span>
               </div>
            </div>

            {onApply && (
              <motion.button 
                 whileHover={{ scale: 1.05, y: -2 }}
                 whileTap={applePhysics.haptic}
                 onClick={handleApply}
                 className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all duration-500 flex items-center gap-3 group rim-highlight"
              >
                 Confirmar
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" />
              </motion.button>
            )}
         </div>

         <div className="px-6 pb-8">
           <motion.div 
             layout
             transition={applePhysics.spatial}
             className="p-5 rounded-[32px] bg-white/8 border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-lg"
           >
              <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-1000 saturate-150",
                risk.label === 'Baixo Risco' ? 'bg-emerald-500' : risk.label === 'Moderado Risco' ? 'bg-amber-500' : 'bg-rose-500'
              )} />
              <div className="relative z-10">
                <span className="opacity-30 uppercase text-[9px] font-black tracking-[0.3em] block mb-2 group-hover:text-white/60 transition-colors">Orientação Conduta</span>
                <p className="text-[14px] font-bold text-white leading-relaxed pl-1 tracking-tight">
                  {risk.conduct}
                </p>
              </div>
              
              {/* Subtle glass bloom */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
           </motion.div>
         </div>
      </div>
    </motion.div>
  );

  if (mode === 'inline') return content;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
      />
      <AnimatePresence>
        {content}
      </AnimatePresence>
    </div>
  );
};
