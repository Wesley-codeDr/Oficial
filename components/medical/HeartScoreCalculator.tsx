'use client'

import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Patient, Symptom } from '@/lib/types/medical';

interface HeartScoreCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  antecedentesItems?: Symptom[];
}

export const HeartScoreCalculator: React.FC<HeartScoreCalculatorProps> = ({
  isOpen,
  onClose,
  patient,
  antecedentesItems
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
    if (score <= 3) return { label: 'Baixo Risco', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50', conduct: 'Alta precoce possível.' };
    if (score <= 6) return { label: 'Moderado Risco', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/50', conduct: 'Observação + Troponina seriada.' };
    return { label: 'Alto Risco', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50', conduct: 'Internação / CATE precoce.' };
  };

  const risk = getRiskLevel(totalScore);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-500">
               <Heart className="w-6 h-6" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-800 dark:text-white">HEART Score</h2>
               <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estratificação de Dor Torácica</p>
             </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
             <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
           </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 bg-white dark:bg-slate-900">
           {/* H - History */}
           <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">H - História</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                 {[
                   { val: 0, label: 'Pouco Suspeita' },
                   { val: 1, label: 'Moderada' },
                   { val: 2, label: 'Altamente Suspeita' }
                 ].map((opt) => (
                   <button
                     key={opt.val}
                     onClick={() => setHistoryPoints(opt.val)}
                     className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                       historyPoints === opt.val 
                       ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                       : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                     }`}
                   >
                     {opt.label} (+{opt.val})
                   </button>
                 ))}
              </div>
           </div>

           {/* E - ECG */}
           <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">E - Eletrocardiograma</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                 {[
                   { val: 0, label: 'Normal' },
                   { val: 1, label: 'Alteração Inespecífica' },
                   { val: 2, label: 'Depressão ST' }
                 ].map((opt) => (
                   <button
                     key={opt.val}
                     onClick={() => setEcgPoints(opt.val)}
                     className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                       ecgPoints === opt.val 
                       ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                       : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                     }`}
                   >
                     {opt.label} (+{opt.val})
                   </button>
                 ))}
              </div>
           </div>

           {/* A - Age (Auto) */}
           <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">A - Idade</span>
                <p className="text-xs text-slate-500 mt-1">Calculado automaticamente ({patient.age || 0} anos)</p>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">+{agePoints} pontos</span>
           </div>

           {/* R - Risk Factors (Auto) */}
           <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">R - Fatores de Risco</span>
                <p className="text-xs text-slate-500 mt-1">Baseado na anamnese ({riskFactorsCount} encontrados)</p>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">+{riskPoints} pontos</span>
           </div>

           {/* T - Troponin */}
           <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">T - Troponina</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                 {[
                   { val: 0, label: 'Normal / < Limite' },
                   { val: 1, label: '1-3x Limite' },
                   { val: 2, label: '> 3x Limite' }
                 ].map((opt) => (
                   <button
                     key={opt.val}
                     onClick={() => setTroponinPoints(opt.val)}
                     className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                       troponinPoints === opt.val 
                       ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                       : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                     }`}
                   >
                     {opt.label} (+{opt.val})
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className={`p-6 border-t border-slate-100 dark:border-slate-700 ${risk.bg}`}>
           <div className="flex justify-between items-center">
              <div>
                 <p className="text-sm font-bold opacity-70 uppercase tracking-wider mb-1 text-slate-800 dark:text-white">Resultado Final</p>
                 <h3 className={`text-3xl font-black ${risk.color}`}>{totalScore} <span className="text-lg font-medium opacity-80 text-slate-800 dark:text-white">pontos</span></h3>
              </div>
              <div className="text-right">
                 <div className={`inline-block px-3 py-1 rounded-lg font-bold text-sm mb-2 ${risk.color} bg-white/50 dark:bg-slate-900/50 border border-current shadow-sm`}>
                    {risk.label}
                 </div>
                 <p className="text-sm font-medium opacity-80 max-w-[200px] leading-tight text-slate-800 dark:text-slate-200">{risk.conduct}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
