'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Activity, Phone, User, Baby, Plus, X,
  AlertTriangle, Minus, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { appleSpring, snapTransition } from '@/lib/animations/presets';
import type { UIPatient } from '@/types/frontend';

interface HeaderProps {
  patient: UIPatient;
  setPatient: React.Dispatch<React.SetStateAction<UIPatient>>;
}

// ============================================
// FLOATING ISLAND PILL BUTTON
// ============================================

interface PillButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'male' | 'female';
}

function PillButton({ active, onClick, children, variant = 'default' }: PillButtonProps) {
  const activeStyles = {
    default: 'bg-white dark:bg-slate-600/80 text-slate-900 dark:text-white shadow-sm',
    male: 'bg-white dark:bg-slate-600/80 text-blue-600 dark:text-blue-400 shadow-sm',
    female: 'bg-white dark:bg-slate-600/80 text-pink-500 dark:text-pink-400 shadow-sm',
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'px-4 py-1.5 text-[11px] font-semibold rounded-full transition-colors',
        active ? activeStyles[variant] : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={snapTransition}
    >
      {children}
    </motion.button>
  );
}

// ============================================
// ALLERGY TAG
// ============================================

interface AllergyTagProps {
  name: string;
  onRemove: () => void;
}

function AllergyTag({ name, onRemove }: AllergyTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={appleSpring}
      className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-900/50 transition-all cursor-default"
    >
      {name}
      <button
        onClick={onRemove}
        className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100/80 dark:bg-slate-700/80 text-slate-400 group-hover:bg-red-100 dark:group-hover:bg-red-900 group-hover:text-red-500 transition-colors"
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </motion.span>
  );
}

// ============================================
// MAIN HEADER COMPONENT
// ============================================

export function Header({ patient, setPatient }: HeaderProps) {
  const [newAllergy, setNewAllergy] = useState('');
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);

  const updatePatient = <K extends keyof UIPatient>(field: K, value: UIPatient[K]) => {
    setPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleAgeChange = (delta: number) => {
    const currentAge = parseInt(patient.age) || 0;
    const newAge = Math.max(0, currentAge + delta);
    updatePatient('age', newAge.toString());
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      updatePatient('allergies', [...patient.allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
    setIsAddingAllergy(false);
  };

  const removeAllergy = (allergyToRemove: string) => {
    updatePatient('allergies', patient.allergies.filter(a => a !== allergyToRemove));
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'in_progress':
        return {
          label: 'Em Atendimento',
          color: 'bg-emerald-500',
          text: 'text-emerald-700 dark:text-emerald-400',
          bg: 'bg-emerald-50/80 dark:bg-emerald-900/30',
          border: 'border-emerald-200/50 dark:border-emerald-900/40',
          glow: 'shadow-emerald-500/20'
        };
      case 'waiting':
        return {
          label: 'Aguardando',
          color: 'bg-amber-500',
          text: 'text-amber-700 dark:text-amber-400',
          bg: 'bg-amber-50/80 dark:bg-amber-900/30',
          border: 'border-amber-200/50 dark:border-amber-900/40',
          glow: 'shadow-amber-500/20'
        };
      default:
        return {
          label: 'Finalizado',
          color: 'bg-slate-500',
          text: 'text-slate-700 dark:text-slate-400',
          bg: 'bg-slate-50/80 dark:bg-slate-800/50',
          border: 'border-slate-200/50 dark:border-slate-700',
          glow: 'shadow-slate-500/10'
        };
    }
  };

  const statusStyle = getStatusConfig(patient.status);

  return (
    <motion.header
      className="flex flex-col xl:flex-row xl:items-stretch justify-between gap-4 mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={appleSpring}
    >
      {/* Patient Identity Floating Island */}
      <motion.div
        className={cn(
          'flex-1 p-5 rounded-[28px] flex flex-col sm:flex-row items-center sm:items-start gap-6',
          'bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-2xl backdrop-saturate-[180%]',
          'border border-white/60 dark:border-white/10',
          'shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
          'transition-all duration-500',
          'hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
          'ring-1 ring-white/40 dark:ring-white/5'
        )}
        whileHover={{ scale: 1.005 }}
        transition={appleSpring}
      >
        {/* Avatar Container */}
        <div className="relative shrink-0 group">
          <motion.div
            className={cn(
              'w-20 h-20 rounded-[22px] flex items-center justify-center text-3xl',
              'shadow-lg ring-1 ring-black/5 dark:ring-white/10',
              'backdrop-blur-md border border-white/40 dark:border-white/5',
              patient.category === 'pediatric' && 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-500',
              patient.category === 'elderly' && 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-500',
              patient.isPregnant && 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 text-pink-500',
              patient.category === 'adult' && !patient.isPregnant && 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600'
            )}
            whileHover={{ scale: 1.05 }}
            transition={appleSpring}
          >
            {patient.category === 'pediatric' ? (
              <Baby className="w-9 h-9" />
            ) : (
              <User className="w-9 h-9" />
            )}
          </motion.div>
          {/* Status Dot */}
          <motion.div
            className={cn(
              'absolute -bottom-1 -right-1 w-5 h-5 border-[3px] border-white dark:border-[#1c1c1e] rounded-full shadow-sm',
              statusStyle.color
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...appleSpring, delay: 0.2 }}
          />
        </div>

        {/* Info & Controls */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Row 1: Demographics */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {/* Category Pill */}
            <div className="flex bg-slate-100/60 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/30 dark:border-white/5 backdrop-blur-md">
              {(['pediatric', 'adult', 'elderly'] as const).map(cat => (
                <PillButton
                  key={cat}
                  active={patient.category === cat}
                  onClick={() => updatePatient('category', cat)}
                >
                  {cat === 'pediatric' ? 'Pediatria' : cat === 'adult' ? 'Adulto' : 'Idoso'}
                </PillButton>
              ))}
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-6 bg-slate-200/50 dark:bg-slate-700/50" />

            {/* Gender & Pregnant */}
            <div className="flex bg-slate-100/60 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/30 dark:border-white/5 backdrop-blur-md">
              <PillButton
                active={patient.gender === 'M'}
                onClick={() => updatePatient('gender', 'M')}
                variant="male"
              >
                M
              </PillButton>
              <PillButton
                active={patient.gender === 'F'}
                onClick={() => updatePatient('gender', 'F')}
                variant="female"
              >
                F
              </PillButton>

              <AnimatePresence>
                {patient.gender === 'F' && patient.category !== 'pediatric' && patient.category !== 'elderly' && (
                  <motion.button
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    onClick={() => updatePatient('isPregnant', !patient.isPregnant)}
                    className={cn(
                      'ml-1 px-3 py-1 rounded-full text-[10px] font-bold transition-all flex items-center gap-1.5 overflow-hidden whitespace-nowrap',
                      patient.isPregnant
                        ? 'bg-pink-100/80 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                        : 'bg-transparent text-slate-400 hover:text-pink-400'
                    )}
                  >
                    Gestante
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Age Stepper & Phone */}
            <div className="flex items-center gap-4 ml-1">
              {/* Age Stepper */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">
                  Idade
                </span>
                <div className="flex items-center bg-slate-50/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-0.5 shadow-sm backdrop-blur-md">
                  <motion.button
                    onClick={() => handleAgeChange(-1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </motion.button>

                  <input
                    type="number"
                    value={patient.age}
                    onChange={(e) => updatePatient('age', e.target.value)}
                    className="w-10 bg-transparent text-center font-bold text-slate-800 dark:text-white text-sm focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
                    placeholder="0"
                  />

                  <motion.button
                    onClick={() => handleAgeChange(1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-ios-blue transition-all"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center gap-2 group h-[34px] border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all px-1 mt-3">
                <Phone className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-ios-blue transition-colors" />
                <input
                  type="tel"
                  value={patient.phoneNumber}
                  onChange={(e) => updatePatient('phoneNumber', e.target.value)}
                  placeholder="Telefone..."
                  className="w-28 bg-transparent text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none transition-all p-0 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Allergies */}
          <div className="flex flex-wrap items-center gap-2 min-h-[32px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50/80 dark:bg-red-900/20 border border-red-100/50 dark:border-red-900/30 backdrop-blur-md">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                Alergias
              </span>
            </div>

            {patient.allergies.length === 0 && !isAddingAllergy && (
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-1">
                Nenhuma registrada
              </span>
            )}

            <AnimatePresence mode="popLayout">
              {patient.allergies.map((allergy) => (
                <AllergyTag key={allergy} name={allergy} onRemove={() => removeAllergy(allergy)} />
              ))}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isAddingAllergy ? (
                <motion.input
                  key="input"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  autoFocus
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onBlur={addAllergy}
                  onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                  className="w-32 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-ios-blue/30 dark:border-ios-blue/50 rounded-full px-3 py-1 text-xs font-medium focus:outline-none shadow-sm text-slate-800 dark:text-white"
                  placeholder="Nome..."
                />
              ) : (
                <motion.button
                  key="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsAddingAllergy(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-ios-blue transition-colors border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Status & Actions - Floating Island */}
      <motion.div
        className={cn(
          'flex xl:flex-col items-center xl:items-end justify-center gap-4 shrink-0',
          'p-4 rounded-[22px]',
          'bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-2xl backdrop-saturate-[180%]',
          'border border-white/60 dark:border-white/10',
          'shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
          'ring-1 ring-white/40 dark:ring-white/5'
        )}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...appleSpring, delay: 0.1 }}
      >
        {/* Status Pill */}
        <motion.div
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border',
            statusStyle.bg,
            statusStyle.border,
            `shadow-lg ${statusStyle.glow}`
          )}
          whileHover={{ scale: 1.02 }}
          transition={appleSpring}
        >
          <Activity className={cn('w-4 h-4', statusStyle.text)} />
          <span className={cn('text-xs font-bold uppercase tracking-wide', statusStyle.text)}>
            {statusStyle.label}
          </span>
          <ChevronDown className={cn('w-3 h-3', statusStyle.text)} />
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            className={cn(
              'relative w-10 h-10 rounded-full flex items-center justify-center',
              'bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700',
              'text-slate-500 dark:text-slate-400 transition-all',
              'border border-white/50 dark:border-white/10',
              'shadow-[0_4px_12px_rgba(0,0,0,0.05)]',
              'backdrop-blur-md'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute top-2.5 right-3 w-2 h-2 bg-ios-red rounded-full ring-2 ring-white dark:ring-slate-800" />
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  );
}
