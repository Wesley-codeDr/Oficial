/**
 * Medical Syndromes Configuration
 * Migrated from Google AI Studio frontend
 */

import type { SyndromeCard, SyndromeCategory } from '@/types/frontend';

// Syndrome definitions with icons as strings for dynamic import
export const syndromes: SyndromeCard[] = [
  // Critical / Cardiovascular
  {
    id: 'dor_toracica',
    label: 'Dor Torácica',
    icon: 'Heart',
    color: 'red',
    category: 'critical',
    calculator: 'HEART Score'
  },
  {
    id: 'neuro_deficit',
    label: 'Déficit Neurológico (AVC)',
    icon: 'Brain',
    color: 'indigo',
    category: 'critical',
    calculator: 'NIHSS'
  },
  {
    id: 'dispneia',
    label: 'Dispneia / Insuf. Resp.',
    icon: 'Wind',
    color: 'blue',
    category: 'critical',
    calculator: 'Wells Score'
  },
  {
    id: 'sincope',
    label: 'Síncope / Tontura',
    icon: 'Activity',
    color: 'amber',
    category: 'critical',
    calculator: 'OESIL Score'
  },

  // General Clinical
  {
    id: 'dor_abdominal',
    label: 'Dor Abdominal',
    icon: 'Stethoscope',
    color: 'emerald',
    category: 'clinical',
    calculator: 'Alvarado Score'
  },
  {
    id: 'cefaleia',
    label: 'Cefaleia',
    icon: 'Sparkles',
    color: 'purple',
    category: 'clinical',
    calculator: 'Ottawa Rule'
  },
  {
    id: 'febre',
    label: 'Febre / Sepse',
    icon: 'Thermometer',
    color: 'rose',
    category: 'clinical',
    calculator: 'qSOFA / NEWS2'
  },
  {
    id: 'lombalgia',
    label: 'Lombalgia / Cólica Renal',
    icon: 'Activity',
    color: 'orange',
    category: 'clinical'
  },

  // Trauma & Others
  {
    id: 'trauma',
    label: 'Trauma / Queda',
    icon: 'Bone',
    color: 'slate',
    category: 'trauma',
    calculator: 'Glasgow Coma Scale'
  },
  {
    id: 'psiquiatria',
    label: 'Agitação / Psiquiátrico',
    icon: 'AlertOctagon',
    color: 'pink',
    category: 'clinical'
  },
];

// Get syndromes by category
export function getSyndromesByCategory(category: SyndromeCategory): SyndromeCard[] {
  return syndromes.filter(s => s.category === category);
}

// Get syndrome by ID
export function getSyndromeById(id: string): SyndromeCard | undefined {
  return syndromes.find(s => s.id === id);
}

// Get all critical syndromes (red flags)
export function getCriticalSyndromes(): SyndromeCard[] {
  return syndromes.filter(s => s.category === 'critical');
}

// Color mapping for Tailwind classes
export const syndromeColorMap: Record<string, { bg: string; text: string; border: string }> = {
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-800',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
  },
  slate: {
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
  },
};
