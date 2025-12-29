'use client'

import React, { useState } from 'react';
import { Bell, Activity, Phone, User, Baby, Plus, X, AlertTriangle, Minus } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Patient } from '@/lib/types/medical';

interface HeaderProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

export const Header: React.FC<HeaderProps> = ({ patient, setPatient }) => {
  const { theme } = useTheme();
  const [newAllergy, setNewAllergy] = useState('');
  const [isAddingAllergy, setIsAddingAllergy] = useState(false);

  const updatePatient = (field: keyof Patient, value: any) => {
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
      case 'in_progress': return { label: 'Em Atendimento', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30', border: 'border-emerald-100 dark:border-emerald-900/40' };
      case 'waiting': return { label: 'Aguardando', color: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-100 dark:border-amber-900/40' };
      default: return { label: 'Finalizado', color: 'bg-slate-500', text: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800', border: 'border-slate-200 dark:border-slate-700' };
    }
  };

  const statusStyle = getStatusConfig(patient.status);

  return (
    <header className="flex flex-col xl:flex-row xl:items-stretch justify-between gap-6 mb-2 px-2">
      
      {/* Patient Identity Floating Island */}
      <div className="flex-1 bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl p-5 rounded-[32px] border border-white/40 dark:border-white/10 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:shadow-none flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all duration-300 hover:shadow-[0_22px_50px_rgba(15,23,42,0.09)] dark:hover:bg-slate-900/70">
        
        {/* Avatar Container */}
        <div className="relative shrink-0 group">
            <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center text-3xl shadow-lg shadow-slate-200/50 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-500 group-hover:scale-105 ${
              patient.category === 'pediatric' ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-500' :
              patient.category === 'elderly' ? 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-500' :
              patient.isPregnant ? 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/40 dark:to-pink-800/20 text-pink-500' :
              'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600'
            }`}>
              {patient.category === 'pediatric' ? <Baby className="w-9 h-9" /> : <User className="w-9 h-9" />}
            </div>
            {/* Status Dot */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${statusStyle.color} border-[3px] border-white dark:border-slate-900 rounded-full shadow-sm`}></div>
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
                      className={`px-4 py-1.5 text-[11px] font-semibold rounded-full transition-all capitalize ${
                        isActive 
                          ? 'bg-white dark:bg-slate-600/80 text-slate-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                    >
                      {cat === 'pediatric' ? 'Pediatria' : cat === 'adult' ? 'Adulto' : 'Idoso'}
                    </button>
                   );
                })}
             </div>

             {/* Separator */}
             <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700/50"></div>

             {/* Gender & Pregnant */}
             <div className="flex bg-slate-100/80 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-white/5">
               {(['M', 'F'] as const).map(g => (
                 <button
                    key={g}
                    onClick={() => updatePatient('gender', g)}
                    className={`w-8 h-7 flex items-center justify-center text-[11px] font-bold rounded-full transition-all ${
                      patient.gender === g 
                      ? (g === 'M' ? 'bg-white dark:bg-slate-600/80 text-blue-600 dark:text-blue-400 shadow-sm' : 'bg-white dark:bg-slate-600/80 text-pink-500 dark:text-pink-400 shadow-sm')
                      : 'text-slate-400'
                    }`}
                 >{g}</button>
               ))}
               
               {patient.gender === 'F' && patient.category !== 'pediatric' && patient.category !== 'elderly' && (
                  <button
                    onClick={() => updatePatient('isPregnant', !patient.isPregnant)}
                    className={`ml-1 px-3 py-1 rounded-full text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                      patient.isPregnant 
                        ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 shadow-none' 
                        : 'bg-transparent text-slate-400 hover:text-pink-400'
                    }`}
                  >
                    Gestante
                  </button>
               )}
             </div>

             {/* Age Stepper & Phone */}
             <div className="flex items-center gap-4 ml-1">
                 
                 {/* iOS Style Age Stepper */}
                 <div className="flex flex-col justify-center">
                     <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-0.5 shadow-sm group-focus-within:border-blue-500/50 transition-colors h-[34px]">
                        <button 
                           onClick={() => handleAgeChange(-1)}
                           className="w-7 h-full flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all active:scale-90 shadow-none hover:shadow-sm"
                        >
                           <Minus className="w-3 h-3 stroke-[2.5px]" />
                        </button>
                        
                        <div className="flex items-baseline gap-0.5 px-1">
                           <input 
                              type="number" 
                              value={patient.age}
                              onChange={(e) => updatePatient('age', e.target.value)}
                              className="w-7 bg-transparent text-right font-bold text-slate-800 dark:text-white text-sm focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
                              placeholder="0"
                           />
                           <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                              anos
                           </span>
                        </div>

                        <button 
                           onClick={() => handleAgeChange(1)}
                           className="w-7 h-full flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90 shadow-none hover:shadow-sm"
                        >
                           <Plus className="w-3 h-3 stroke-[2.5px]" />
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
                 <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">Alergias</span>
              </div>
              
              {patient.allergies.length === 0 && !isAddingAllergy && (
                 <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-1">Nenhuma registrada</span>
              )}
              
              {patient.allergies.map((allergy, idx) => (
                <span key={idx} className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-900/50 transition-all cursor-default">
                  {allergy}
                  <button onClick={() => removeAllergy(allergy)} className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-red-100 dark:group-hover:bg-red-900 group-hover:text-red-500 transition-colors">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}

              {isAddingAllergy ? (
                <input 
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
                <button 
                  onClick={() => setIsAddingAllergy(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors border border-slate-200 dark:border-slate-700 dashed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
           </div>

        </div>
      </div>
      
      {/* Right Side: Status & System Actions */}
      <div className="flex xl:flex-col items-center xl:items-end justify-center gap-4 shrink-0">
         
         {/* Status Pill */}
         <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.border} border backdrop-blur-md`}>
            <Activity className={`w-4 h-4 ${statusStyle.text}`} />
            <span className={`text-xs font-bold uppercase tracking-wide ${statusStyle.text}`}>{statusStyle.label}</span>
         </div>

         {/* Action Buttons */}
         <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all border border-white/50 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-105 active:scale-95">
              <Bell className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
            </button>
         </div>
      </div>
    </header>
  );
};
