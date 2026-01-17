'use client'

import React, { useState } from 'react';
import { Bell, Activity, Phone, User, Baby, Plus, X, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { Patient } from '@/lib/types/medical';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

export const Header: React.FC<HeaderProps> = ({ patient, setPatient }) => {
  const [newAllergy, setNewAllergy] = useState('');
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const updatePatient = (field: keyof Patient, value: any) => {
    setPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleAgeChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
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

  const removeAllergy = (e: React.MouseEvent, allergyToRemove: string) => {
    e.stopPropagation();
    updatePatient('allergies', patient.allergies.filter(a => a !== allergyToRemove));
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'in_progress': return { label: 'Em Atendimento', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
      case 'waiting': return { label: 'Aguardando', color: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
      default: return { label: 'Finalizado', color: 'bg-slate-500', text: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
    }
  };

  const statusStyle = getStatusConfig(patient.status);

  return (
    <header className="w-full mb-6 px-1">
      {/* Smart Patient Capsule - Liquid Glass 2026 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full p-1 rounded-[44px] overflow-hidden
          backdrop-blur-[80px] saturate-[200%]
          bg-white/25 dark:bg-slate-900/28
          border border-white/40 dark:border-white/12
          shadow-[0_8px_32px_rgba(0,78,146,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]"
      >
        {/* Main Header Bar - Unified Summary */}
        <div 
          className="flex items-center justify-between px-4 py-2 min-h-[72px] cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Section: Left - Identity */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Avatar Capsule */}
            <div className="relative shrink-0">
                <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center text-2xl shadow-lg ring-1 ring-white/50 dark:ring-white/10 transition-all duration-500 ${
                  patient.category === 'pediatric' ? 'bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-500' :
                  patient.category === 'elderly' ? 'bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-500' :
                  patient.isPregnant ? 'bg-linear-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 text-pink-500' :
                  'bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600'
                }`}>
                  {patient.category === 'pediatric' ? <Baby className="w-7 h-7" /> : <User className="w-7 h-7" />}
                </div>
            </div>

            {/* Quick Details */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter truncate leading-none">
                    {patient.category === 'pediatric' ? 'Pediátrico' : patient.category === 'elderly' ? 'Idoso' : 'Adulto'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-slate-900/5 dark:bg-white/10 rounded-full text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase border border-white/20">
                      {patient.age || '--'} ANOS
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                      patient.gender === 'F' ? 'bg-pink-100/50 dark:bg-pink-900/20 text-pink-500 border-pink-200/50' : 'bg-blue-100/50 dark:bg-blue-900/20 text-blue-500 border-blue-200/50'
                    }`}>
                      {patient.gender === 'F' ? 'FEM' : 'MASC'}
                    </span>
                  </div>
               </div>
               <div className="flex items-center gap-2 mt-1.5 overflow-hidden">
                  <Activity className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-tight truncate">
                    {patient.allergies.length > 0 ? `Alergias: ${patient.allergies.join(', ')}` : 'Sem alergias registradas'}
                  </p>
               </div>
            </div>
          </div>

          {/* Section: Right - Actions & Status */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Status Integrated Plate */}
            <div className={`hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl ${statusStyle.bg} ${statusStyle.border} border backdrop-blur-md shadow-inner transition-all duration-500`}>
                <div className={`w-2 h-2 rounded-full ${statusStyle.color} animate-pulse`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${statusStyle.text}`}>{statusStyle.label}</span>
            </div>

            {/* Notifications */}
            <div className="relative group">
               <button className="w-11 h-11 rounded-[18px] bg-slate-100 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all border border-transparent hover:border-white/50 active:scale-90" onClick={(e) => e.stopPropagation()}>
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
               </button>
            </div>

            {/* Expansion Arrow */}
            <button 
              className={`w-11 h-11 rounded-[18px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center transition-all duration-500 shadow-xl ${isExpanded ? 'rotate-180' : ''}`}
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanded Controls - Optimized Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full border-t border-white/20 dark:border-white/5 bg-slate-900/2 dark:bg-white/2"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                  
                  {/* Category & Gender - Left Column (lg:col-span-6) */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Categoria</p>
                            <div className="flex bg-slate-200/50 dark:bg-black/40 p-1 rounded-2xl border border-white/10">
                            {(['pediatric', 'adult', 'elderly'] as const).map(cat => (
                                <button
                                key={cat}
                                onClick={() => updatePatient('category', cat)}
                                className={`flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all uppercase ${
                                    patient.category === cat 
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md' 
                                    : 'text-slate-500 dark:text-slate-400'
                                }`}
                                >
                                {cat === 'pediatric' ? 'Ped' : cat === 'adult' ? 'Adul' : 'Idos'}
                                </button>
                            ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Sexo</p>
                            <div className="flex bg-slate-200/50 dark:bg-black/40 p-1 rounded-2xl border border-white/10">
                            {(['M', 'F'] as const).map(g => (
                                <button
                                    key={g}
                                    onClick={() => updatePatient('gender', g)}
                                    className={`flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all ${
                                        patient.gender === g 
                                        ? (g === 'M' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md' : 'bg-white dark:bg-slate-700 text-pink-500 shadow-md')
                                        : 'text-slate-400'
                                    }`}
                                >{g === 'F' ? 'FEM' : 'MASC'}</button>
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Idade</p>
                            <div className="flex items-center bg-white/60 dark:bg-black/40 rounded-2xl border border-white/20 p-1 h-11">
                                <button onClick={(e) => handleAgeChange(e, -1)} className="w-9 h-full flex items-center justify-center rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 text-slate-400 active:scale-90 transition-all"><Minus className="w-3.5 h-3.5" /></button>
                                <input type="number" value={patient.age} onChange={(e) => updatePatient('age', e.target.value)} className="w-full bg-transparent text-center font-black text-slate-800 dark:text-white text-sm focus:outline-none" placeholder="0" />
                                <button onClick={(e) => handleAgeChange(e, 1)} className="w-9 h-full flex items-center justify-center rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 text-slate-400 active:scale-90 transition-all"><Plus className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Telefone</p>
                            <div className="flex items-center bg-white/60 dark:bg-black/40 rounded-2xl border border-white/20 px-3 h-11 gap-2">
                                <Phone className="w-3.5 h-3.5 text-slate-300" />
                                <input type="tel" value={patient.phoneNumber} onChange={(e) => updatePatient('phoneNumber', e.target.value)} placeholder="(00) 00000-0000" className="w-full bg-transparent font-bold text-slate-700 dark:text-slate-200 text-xs focus:outline-none" />
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* Conditions & Allergies - Right Column (lg:col-span-6) */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Alergias e Condições</p>
                        <div className="flex flex-wrap items-center gap-2 min-h-[94px] p-3 bg-white/40 dark:bg-black/40 rounded-2xl border border-white/20">
                            {patient.gender === 'F' && (
                                <button
                                    onClick={() => updatePatient('isPregnant', !patient.isPregnant)}
                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all border flex items-center gap-2 ${
                                        patient.isPregnant 
                                            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 border-pink-200' 
                                            : 'bg-white/10 text-slate-400 border-white/20'
                                    }`}
                                >
                                    <Baby className="w-3 h-3" /> GESTANTE
                                </button>
                            )}
                            
                            {patient.allergies.map((allergy, idx) => (
                                <span key={idx} className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-red-500/10 border border-red-200/50 text-[10px] font-black text-red-600 transition-all animate-in zoom-in-95">
                                    {allergy}
                                    <button onClick={(e) => removeAllergy(e, allergy)} className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            
                            {isAddingAllergy ? (
                                <input 
                                    autoFocus
                                    onBlur={addAllergy}
                                    onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                                    onChange={(e) => setNewAllergy(e.target.value)}
                                    className="bg-white dark:bg-slate-800 border-2 border-blue-500/20 rounded-xl px-3 py-1 text-[10px] font-bold focus:outline-none"
                                    placeholder="Add..."
                                />
                            ) : (
                                <button onClick={(e) => { e.stopPropagation(); setIsAddingAllergy(true); }} className="w-8 h-8 rounded-xl bg-white/40 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-blue-500 border border-dashed border-white/20 transition-all">
                                    <Plus className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-1">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all uppercase"
                        >
                            Concluir Atualização
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};
