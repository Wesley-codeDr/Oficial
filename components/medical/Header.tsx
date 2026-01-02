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
      case 'in_progress': return { label: 'Em Atendimento', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30', border: 'border-emerald-100 dark:border-emerald-900/40' };
      case 'waiting': return { label: 'Aguardando', color: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-100 dark:border-amber-900/40' };
      default: return { label: 'Finalizado', color: 'bg-slate-500', text: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800', border: 'border-slate-200 dark:border-slate-700' };
    }
  };

  const statusStyle = getStatusConfig(patient.status);

  return (
    <header className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-4 px-2">
      
      {/* Smart Patient Capsule */}
      <motion.div 
        layout
        initial={false}
        className={`relative flex-1 liquid-glass-material glass-texture bg-white/40! dark:bg-black/30! p-1.5 rounded-[40px] shadow-lg shadow-blue-500/5 border border-white/50 dark:border-white/10 overflow-hidden cursor-pointer group`}
        onClick={() => !isExpanded && setIsExpanded(true)}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3">
          
          {/* Main Summary Bar - Always Visible */}
          <div className="flex flex-1 items-center gap-4 px-3 py-2 min-h-[70px]">
            {/* Avatar Capsule */}
            <motion.div layout className="relative shrink-0">
                <div className={`w-14 h-14 rounded-[24px] flex items-center justify-center text-2xl shadow-lg ring-1 ring-white/50 dark:ring-white/10 transition-all duration-500 ${
                  patient.category === 'pediatric' ? 'bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-500' :
                  patient.category === 'elderly' ? 'bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-500' :
                  patient.isPregnant ? 'bg-linear-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 text-pink-500' :
                  'bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600'
                }`}>
                  {patient.category === 'pediatric' ? <Baby className="w-7 h-7" /> : <User className="w-7 h-7" />}
                </div>
                {/* Status Dot */}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusStyle.color} border-[2px] border-white dark:border-slate-900 rounded-full`}></div>
            </motion.div>

            {/* Quick Identification Summary */}
            <motion.div layout className="flex-1 min-w-0">
               <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter truncate">
                    {patient.category === 'pediatric' ? 'Paciente Pediátrico' : patient.category === 'elderly' ? 'Paciente Idoso' : 'Paciente Adulto'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/50 dark:bg-white/10 rounded-full text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase border border-white/20">
                      {patient.age} ANOS
                    </span>
                    <span className={`px-2 py-1 rounded-full text-[11px] font-black border ${
                      patient.gender === 'F' ? 'bg-pink-100/50 dark:bg-pink-900/20 text-pink-500 border-pink-200/50' : 'bg-blue-100/50 dark:bg-blue-900/20 text-blue-500 border-blue-200/50'
                    }`}>
                      {patient.gender === 'F' ? 'FEM' : 'MASC'}
                    </span>
                  </div>
               </div>
               <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-tight">
                    {patient.allergies.length > 0 ? `Alergias: ${patient.allergies.join(', ')}` : 'Sem alergias registradas'}
                  </p>
               </div>
            </motion.div>

            {/* Expand/Collapse Trigger */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="w-10 h-10 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all border border-white/50 dark:border-white/10 shadow-sm"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {/* Expanded Controls - Contextual Grid */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="w-full border-t border-white/20 dark:border-white/5 bg-slate-500/5 px-6 py-6 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Column 1: Core Selection */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Categoria</p>
                      <div className="flex bg-slate-100/80 dark:bg-black/40 p-1 rounded-2xl border border-slate-200/50 dark:border-white/5">
                        {(['pediatric', 'adult', 'elderly'] as const).map(cat => {
                           const isActive = patient.category === cat;
                           return (
                            <button
                              key={cat}
                              onClick={() => updatePatient('category', cat)}
                              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-tighter ${
                                isActive 
                                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md' 
                                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                              }`}
                            >
                              {cat === 'pediatric' ? 'Pediátrica' : cat === 'adult' ? 'Adulta' : 'Idosa'}
                            </button>
                           );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Sexo</p>
                        <div className="flex bg-slate-100/80 dark:bg-black/40 p-1 rounded-2xl border border-slate-200/50 dark:border-white/5">
                          {(['M', 'F'] as const).map(g => (
                            <button
                               key={g}
                               onClick={() => updatePatient('gender', g)}
                               className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                                 patient.gender === g 
                                 ? (g === 'M' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md' : 'bg-white dark:bg-slate-700 text-pink-500 dark:text-pink-400 shadow-md')
                                 : 'text-slate-400'
                               }`}
                            >{g === 'F' ? 'FEMININO' : 'MASCULINO'}</button>
                          ))}
                        </div>
                      </div>

                      {patient.gender === 'F' && patient.category === 'adult' && (
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Condição</p>
                          <button
                            onClick={() => updatePatient('isPregnant', !patient.isPregnant)}
                            className={`w-full py-2.5 rounded-2xl text-[11px] font-black transition-all border flex items-center justify-center gap-2 ${
                              patient.isPregnant 
                                ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border-pink-200' 
                                : 'bg-white/40 dark:bg-white/5 text-slate-400 border-white/20'
                            }`}
                          >
                            <Baby className="w-3.5 h-3.5" />
                            GESTANTE
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Column 2: Specific Details */}
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Idade</p>
                        <div className="flex items-center bg-white/60 dark:bg-black/40 rounded-2xl border border-white/40 dark:border-white/5 p-1 h-[46px]">
                          <button 
                             onClick={(e) => handleAgeChange(e, -1)}
                             className="w-10 h-full flex items-center justify-center rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 text-slate-400 transition-all active:scale-90"
                          >
                             <Minus className="w-4 h-4 stroke-[3px]" />
                          </button>
                          <input 
                              type="number" 
                              value={patient.age}
                              onChange={(e) => updatePatient('age', e.target.value)}
                              className="w-full bg-transparent text-center font-black text-slate-800 dark:text-white text-base focus:outline-none"
                              placeholder="0"
                           />
                          <button 
                             onClick={(e) => handleAgeChange(e, 1)}
                             className="w-10 h-full flex items-center justify-center rounded-xl hover:bg-white/80 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                          >
                             <Plus className="w-4 h-4 stroke-[3px]" />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Telefone</p>
                        <div className="flex items-center bg-white/60 dark:bg-black/40 rounded-2xl border border-white/40 dark:border-white/5 p-1 h-[46px]">
                           <Phone className="w-4 h-4 text-slate-300 ml-3" />
                           <input 
                              type="tel" 
                              value={patient.phoneNumber}
                              onChange={(e) => updatePatient('phoneNumber', e.target.value)}
                              placeholder="(00) 00000-0000"
                              className="w-full bg-transparent text-center text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
                           />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Alergias Detectadas</p>
                      <div className="flex flex-wrap items-center gap-2 min-h-[46px] p-2 bg-red-500/5 dark:bg-red-500/10 rounded-2xl border border-red-500/10">
                        {patient.allergies.map((allergy, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-red-100 dark:border-red-900/30 text-[11px] font-black text-red-600 dark:text-red-400 shadow-sm transition-all animate-in zoom-in-95">
                            {allergy}
                            <button onClick={(e) => removeAllergy(e, allergy)} className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900 group-hover:text-red-500 transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        
                        {isAddingAllergy ? (
                          <input 
                            autoFocus
                            value={newAllergy}
                            onChange={(e) => setNewAllergy(e.target.value)}
                            onBlur={addAllergy}
                            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                            className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none shadow-sm text-slate-800 dark:text-white"
                            placeholder="Nova..."
                          />
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsAddingAllergy(true); }}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white text-slate-400 hover:text-blue-500 transition-colors border border-dashed border-slate-300 dark:border-white/10"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                        {patient.allergies.length === 0 && !isAddingAllergy && (
                          <span className="text-[11px] text-slate-400 font-bold italic ml-2">Nenhuma registrada</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-xs font-black tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    CONCLUÍDO
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* System Actions Area */}
      <div className="flex xl:flex-col items-center xl:items-end justify-center gap-3 shrink-0 py-2">
         <div className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full ${statusStyle.bg} ${statusStyle.border} border backdrop-blur-md shadow-sm`}>
            <div className={`w-2 h-2 rounded-full ${statusStyle.color} animate-pulse`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${statusStyle.text}`}>{statusStyle.label}</span>
         </div>

         <div className="flex items-center gap-2">
            <button className="relative w-11 h-11 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all border border-white/50 dark:border-white/10 shadow-sm group">
              <Bell className="w-5 h-5 stroke-[2] icon-volumetric" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
            </button>
         </div>
      </div>
    </header>
  );
};
