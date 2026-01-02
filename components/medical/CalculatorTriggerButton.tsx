'use client'

import React from 'react';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 ml-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-all group shadow-sm"
      title={`Abrir calculadora ${label}`}
    >
      <Calculator className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
      <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
      <div className="absolute inset-0 rounded-xl bg-blue-500/5 animate-pulse -z-10" />
    </motion.button>
  );
};
