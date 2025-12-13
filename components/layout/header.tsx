'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Activity, Phone, User, Baby, Plus, X,
  AlertTriangle, Minus, Stethoscope, Syringe, Pill, HeartPulse
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';
import type { UIPatient, SpecialCondition } from '@/types/frontend';

interface HeaderProps {
  patient: UIPatient;
  setPatient: React.Dispatch<React.SetStateAction<UIPatient>>;
}

// ============================================
// SPECIAL CONDITIONS CONFIG
// ============================================

const SPECIAL_CONDITIONS: {
  value: SpecialCondition;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: 'post_surgical',
    label: 'Pós-Cirúrgico',
    icon: <Stethoscope className="w-3 h-3" />,
    color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800',
  },
  {
    value: 'oncological',
    label: 'Oncológico',
    icon: <AlertTriangle className="w-3 h-3" />,
    color: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800',
  },
  {
    value: 'immunocompromised',
    label: 'Imunocomprometido',
    icon: <Syringe className="w-3 h-3" />,
    color: 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-800',
  },
  {
    value: 'dialysis',
    label: 'Dialítico',
    icon: <Pill className="w-3 h-3" />,
    color: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800',
  },
  {
    value: 'transplant',
    label: 'Transplantado',
    icon: <HeartPulse className="w-3 h-3" />,
    color: 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-800',
  },
];

// ============================================
// MAIN HEADER COMPONENT
// ============================================

export function Header({ patient, setPatient }: HeaderProps) {
  const [newAllergy, setNewAllergy] = useState('');
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);
  const [showConditions, setShowConditions] = useState(false);

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

  const toggleCondition = (condition: SpecialCondition) => {
    const current = patient.specialConditions || [];
    if (current.includes(condition)) {
      updatePatient('specialConditions', current.filter(c => c !== condition));
    } else {
      updatePatient('specialConditions', [...current, condition]);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'in_progress':
        return {
          label: 'Em Atendimento',
          color: 'bg-emerald-500',
          text: 'text-emerald-700 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-900/30',
          border: 'border-emerald-100 dark:border-emerald-900/40'
        };
      case 'waiting':
        return {
          label: 'Aguardando',
          color: 'bg-amber-500',
          text: 'text-amber-700 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-900/30',
          border: 'border-amber-100 dark:border-amber-900/40'
        };
      default:
        return {
          label: 'Finalizado',
          color: 'bg-slate-500',
          text: 'text-slate-700 dark:text-slate-400',
          bg: 'bg-slate-50 dark:bg-slate-800',
          border: 'border-slate-200 dark:border-slate-700'
        };
    }
  };

  const statusStyle = getStatusConfig(patient.status);

  return (
    <motion.header
      className="flex flex-col xl:flex-row xl:items-stretch justify-between gap-6 mb-2 px-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={appleSpring}
    >
      {/* Patient Identity Floating Island */}
      <div className="flex-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl p-5 rounded-[32px] border border-white/40 dark:border-white/10 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:shadow-none flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all duration-300 hover:shadow-[0_22px_50px_rgba(15,23,42,0.09)] dark:hover:bg-slate-900/70">
        
        {/* Avatar Container */}
        <div className="relative shrink-0 group">
          <motion.div
            className={cn(
              'w-20 h-20 rounded-[24px] flex items-center justify-center text-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-500 group-hover:scale-105',
              patient.category === 'pediatric' && 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-500',
              patient.category === 'elderly' && 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-500',
              patient.isPregnant && 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 text-pink-500',
              patient.category === 'adult' && !patient.isPregnant && 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600'
            )}
          >
            {patient.category === 'pediatric' ? (
              <Baby className="w-9 h-9" />
            ) : (
              <User className="w-9 h-9" />
            )}
          </motion.div>
          {/* Status Dot */}
          <div className={cn(
            'absolute -bottom-1 -right-1 w-5 h-5 border-[3px] border-white dark:border-slate-900 rounded-full shadow-sm',
            statusStyle.color
          )} />
        </div>

        {/* Info & Controls */}
        <div className="flex-1 w-full flex flex-col gap-4">
          
          {/* Row 1: Demographics (Segmented Pills) */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            
            {/* Category Pill */}
            <div className="flex bg-slate-100/80 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-white/5">
              {(['pediatric', 'adult', 'elderly'] as const).map(cat => {
                const isActive = patient.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => updatePatient('category', cat)}
                    className={cn(
                      'px-4 py-1.5 text-[11px] font-semibold rounded-full transition-all capitalize',
                      isActive 
                        ? 'bg-white dark:bg-slate-600/80 text-slate-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    )}
                  >
                    {cat === 'pediatric' ? 'Pediatria' : cat === 'adult' ? 'Adulto' : 'Idoso'}
                  </button>
                );
              })}
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700/50" />

            {/* Gender & Pregnant */}
            <div className="flex bg-slate-100/80 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-white/5">
              {(['M', 'F'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => updatePatient('gender', g)}
                  className={cn(
                    'w-8 h-7 flex items-center justify-center text-[11px] font-bold rounded-full transition-all',
                    patient.gender === g 
                      ? (g === 'M' 
                        ? 'bg-white dark:bg-slate-600/80 text-blue-600 dark:text-blue-400 shadow-sm' 
                        : 'bg-white dark:bg-slate-600/80 text-pink-500 dark:text-pink-400 shadow-sm')
                      : 'text-slate-400'
                  )}
                >
                  {g}
                </button>
              ))}
              
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
                        ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 shadow-none' 
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
              
              {/* iOS Style Age Stepper */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">
                  Idade
                </span>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-0.5 shadow-sm group-focus-within:border-blue-500/50 transition-colors">
                  <button 
                    onClick={() => handleAgeChange(-1)}
                    aria-label="Diminuir idade"
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all active:scale-90 shadow-none hover:shadow-sm"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </button>
                  
                  <input 
                    type="number" 
                    value={patient.age}
                    onChange={(e) => updatePatient('age', e.target.value)}
                    className="w-10 bg-transparent text-center font-bold text-slate-800 dark:text-white text-sm focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
                    placeholder="0"
                  />

                  <button 
                    onClick={() => handleAgeChange(1)}
                    aria-label="Aumentar idade"
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90 shadow-none hover:shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 group h-[34px] border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all px-1 mt-3">
                <Phone className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
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
          
          {/* Row 2: Allergies (Badges) */}
          <div className="flex flex-wrap items-center gap-2 min-h-[32px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
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
              {patient.allergies.map((allergy, idx) => (
                <motion.span 
                  key={allergy}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-900/50 transition-all cursor-default"
                >
                  {allergy}
                  <button 
                    onClick={() => removeAllergy(allergy)}
                    aria-label={`Remover alergia ${allergy}`}
                    className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-red-100 dark:group-hover:bg-red-900 group-hover:text-red-500 transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </motion.span>
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
                  className="w-32 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 text-xs font-medium focus:outline-none shadow-sm text-slate-800 dark:text-white"
                  placeholder="Nome..."
                />
              ) : (
                <motion.button 
                  key="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsAddingAllergy(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors border border-slate-200 dark:border-slate-700 border-dashed"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Row 3: Special Conditions */}
          <div className="flex flex-wrap items-center gap-2 min-h-[32px]">
            <button 
              onClick={() => setShowConditions(!showConditions)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <Stethoscope className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                Condições
              </span>
              <span className="text-[10px] text-purple-400 dark:text-purple-500">
                {(patient.specialConditions?.length || 0) > 0 ? `(${patient.specialConditions.length})` : ''}
              </span>
            </button>

            {/* Active conditions as badges */}
            <AnimatePresence mode="popLayout">
              {(patient.specialConditions || []).map((conditionValue) => {
                const condition = SPECIAL_CONDITIONS.find(c => c.value === conditionValue);
                if (!condition) return null;
                return (
                  <motion.span 
                    key={condition.value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      'group inline-flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-full border text-xs font-semibold shadow-sm transition-all cursor-default',
                      condition.color
                    )}
                  >
                    {condition.icon}
                    {condition.label}
                    <button 
                      onClick={() => toggleCondition(condition.value)}
                      aria-label={`Remover condição ${condition.label}`}
                      className="w-4 h-4 rounded-full flex items-center justify-center bg-white/50 dark:bg-slate-800/50 text-current opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </motion.span>
                );
              })}
            </AnimatePresence>

            {/* Condition selector dropdown */}
            <AnimatePresence>
              {showConditions && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full flex flex-wrap gap-2 pt-2 mt-1 border-t border-slate-100 dark:border-slate-800"
                >
                  {SPECIAL_CONDITIONS.map((condition) => {
                    const isActive = (patient.specialConditions || []).includes(condition.value);
                    return (
                      <button
                        key={condition.value}
                        onClick={() => toggleCondition(condition.value)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all',
                          isActive 
                            ? condition.color
                            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                        )}
                      >
                        {condition.icon}
                        {condition.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Right Side: Status & System Actions */}
      <div className="flex xl:flex-col items-center xl:items-end justify-center gap-4 shrink-0">
        
        {/* Status Pill */}
        <div className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border',
          statusStyle.bg,
          statusStyle.border
        )}>
          <Activity className={cn('w-4 h-4', statusStyle.text)} />
          <span className={cn('text-xs font-bold uppercase tracking-wide', statusStyle.text)}>
            {statusStyle.label}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            aria-label="Notificações"
            className="relative w-10 h-10 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all border border-white/50 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-105 active:scale-95"
          >
            <Bell className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
