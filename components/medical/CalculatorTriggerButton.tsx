'use client'

import React from 'react';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { applePhysics } from '@/lib/design-system/animation-tokens';

interface CalculatorTriggerButtonProps {
  label: string;
  onClick: () => void;
}

export const CalculatorTriggerButton: React.FC<CalculatorTriggerButtonProps> = ({ 
  label, 
  onClick 
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, x: 10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={applePhysics.haptic}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 ml-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-all group shadow-sm relative overflow-hidden glass-texture"
      title={`Abrir calculadora ${label}`}
    >
      <Calculator className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-500" />
      <span className="text-[11px] font-black uppercase tracking-wider">{label}</span>
      <div className="absolute inset-0 rounded-xl bg-blue-500/5 animate-pulse-slow -z-10" />
      <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none rim-highlight" />
    </motion.button>
  );
};
