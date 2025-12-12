'use client';

import React from 'react';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// RISK FACTOR TOOLTIPS
// ============================================

const RISK_FACTOR_TOOLTIPS: Record<string, string> = {
  has: 'Aumenta a pos-carga e o consumo miocardico de oxigenio.',
  dm: 'Equivalente de risco coronariano; neuropatia pode mascarar dor.',
  tabagismo: 'Dano endotelial, vasoespasmo e estado pro-trombotico.',
  dislipidemia: 'Principal fator para aterosclerose e instabilidade de placa.',
  hist_fam: 'Parente 1 grau: Homem <55a ou Mulher <65a (Genetica).',
  obesidade: 'Sobrecarga cardiaca e associacao com sindrome metabolica.',
};

// ============================================
// TYPES
// ============================================

interface CheckboxItemProps {
  id: string;
  label: string;
  isRedFlag?: boolean;
  value: boolean;
  onChange: (val: boolean) => void;
}

interface SegmentedItemProps {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

interface MultiSelectItemProps {
  id: string;
  label: string;
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}

interface RangeItemProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
}

interface TextItemProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

// ============================================
// 1. CHECKBOX ITEM (Card List Style)
// ============================================

export function CheckboxItem({ id, label, isRedFlag = false, value, onChange }: CheckboxItemProps) {
  const tooltipText = RISK_FACTOR_TOOLTIPS[id];

  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        'group w-full flex items-center justify-between px-5 py-4',
        'first:rounded-t-3xl last:rounded-b-3xl',
        'border-b border-slate-100 dark:border-white/5 last:border-0',
        'transition-all duration-200',
        value
          ? 'bg-slate-50/50 dark:bg-white/5'
          : 'bg-transparent hover:bg-slate-50/80 dark:hover:bg-white/5'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Custom Radio/Check Circle */}
        <div
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-[1.5px]',
            value
              ? isRedFlag
                ? 'bg-red-500 border-red-500 shadow-sm'
                : 'bg-ios-blue border-ios-blue shadow-sm'
              : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-ios-blue dark:group-hover:border-ios-blue'
          )}
        >
          <Check
            className={cn(
              'w-3.5 h-3.5 text-white stroke-[3.5px] transition-transform duration-200',
              value ? 'scale-100' : 'scale-0'
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-[15px] text-left tracking-tight',
              value
                ? 'text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 font-medium'
            )}
          >
            {label}
          </span>

          {tooltipText && (
            <div
              className="group/tooltip relative flex items-center justify-center p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hover:text-ios-blue dark:hover:text-ios-blue" />

              {/* Tooltip Content */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-[11px] font-medium leading-relaxed rounded-xl shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none z-50 transform scale-95 group-hover/tooltip:scale-100 origin-bottom text-center">
                {tooltipText}
                {/* Triangle Arrow */}
                <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800 dark:border-t-white"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isRedFlag && value && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide animate-in fade-in zoom-in">
          <AlertTriangle className="w-3 h-3" />
          Alerta
        </div>
      )}
    </button>
  );
}

// ============================================
// 2. SEGMENTED CONTROL (iOS Native Style)
// ============================================

export function SegmentedItem({ label, options, value, onChange }: SegmentedItemProps) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
      <div className="mb-3">
        <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">
          {label}
        </span>
      </div>
      <div className="flex bg-slate-100 dark:bg-black/40 p-1 rounded-2xl relative z-0">
        {options.map((opt) => {
          const isActive = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                'flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 relative z-10',
                isActive
                  ? 'text-slate-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none bg-white dark:bg-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// 3. MULTI SELECT CHIPS (Pills)
// ============================================

export function MultiSelectItem({ label, options, value, onChange }: MultiSelectItemProps) {
  const currentValues = Array.isArray(value) ? value : [];

  const toggleOption = (opt: string) => {
    if (currentValues.includes(opt)) {
      onChange(currentValues.filter((v) => v !== opt));
    } else {
      onChange([...currentValues, opt]);
    }
  };

  return (
    <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
      <div className="mb-3">
        <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const isSelected = currentValues.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={cn(
                'px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 border',
                isSelected
                  ? 'bg-ios-blue text-white border-ios-blue shadow-md shadow-ios-blue/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// 4. RANGE SLIDER (Apple Health Style)
// ============================================

export function RangeItem({ id, label, min, max, step = 1, value, onChange }: RangeItemProps) {
  const numVal = value || min;
  const percentage = ((numVal - min) / (max - min)) * 100;
  const inputId = `range-${id}`;

  return (
    <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
      <div className="flex justify-between items-center mb-5">
        <label
          htmlFor={inputId}
          className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide"
        >
          {label}
        </label>
        <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-white min-w-[3rem] text-center shadow-sm" aria-live="polite">
          {value}
        </div>
      </div>
      <div className="relative h-5 flex items-center group cursor-pointer">
        {/* Thick Track */}
        <div className="absolute w-full h-4 bg-slate-100 dark:bg-black/50 rounded-full overflow-hidden shadow-inner border border-transparent dark:border-white/5">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={numVal}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={numVal}
          aria-label={label}
          title={label}
        />
        {/* Large Thumb */}
        <div
          className="absolute h-8 w-8 bg-white dark:bg-slate-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-slate-100/50 pointer-events-none transition-transform group-hover:scale-105 duration-200 z-10 flex items-center justify-center"
          style={{ left: `calc(${percentage}% - 16px)` }}
          aria-hidden="true"
        >
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500"></div>
        </div>
      </div>
      <div className="flex justify-between mt-3 px-1">
        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{min}</span>
        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{max}</span>
      </div>
    </div>
  );
}

// ============================================
// 5. TEXT INPUT (Clean)
// ============================================

export function TextItem({ label, placeholder, value, onChange }: TextItemProps) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
      <label className="block text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2.5 ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Digite aqui...'}
        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-ios-blue/20 focus:border-ios-blue transition-all shadow-sm"
      />
    </div>
  );
}
