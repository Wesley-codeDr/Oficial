'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Patient, Symptom } from '@/lib/types/medical';
import { HeartScoreCalculator } from './HeartScoreCalculator';
import { X, ChevronLeft } from 'lucide-react';

interface InlineCalculatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorId: string;
  patient: Patient;
  antecedentesItems?: Symptom[];
}

export const InlineCalculatorPanel: React.FC<InlineCalculatorPanelProps> = ({
  isOpen,
  onClose,
  calculatorId,
  patient,
  antecedentesItems
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-20 right-8 bottom-8 w-[450px] z-100 liquid-glass-material bg-white/80! dark:bg-black/70! backdrop-blur-3xl rounded-[32px] border border-white/40 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header Area for Context */}
          <div className="p-4 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Voltar à Anamnese</span>
            </button>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {calculatorId === 'heart' && (
              <HeartScoreCalculator 
                isOpen={true}
                onClose={onClose}
                patient={patient}
                antecedentesItems={antecedentesItems}
                mode="inline"
              />
            )}
            
            {/* Future calculators like CURB-65, Wells, etc. can be added here */}
            {calculatorId !== 'heart' && (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <X className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Calculadora em Desenvolvimento</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  A calculadora {calculatorId} está sendo integrada ao sistema.
                </p>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-slate-50/50 dark:bg-white/5 border-t border-slate-200/50 dark:border-white/5">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium leading-relaxed italic">
              Este resultado é assistido por critérios de medicina baseada em evidências. A decisão clínica final é de inteira responsabilidade do médico.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
