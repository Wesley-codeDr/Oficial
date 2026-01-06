'use client'


import React, { useState, useRef } from 'react';
import { X, GripVertical, Check, Eye, EyeOff, RotateCcw, Layout, Rows, Columns } from 'lucide-react';
import { useDashboardPreferences } from '@/contexts/DashboardPreferencesContext';
import { DashboardPreferences } from '@/lib/types/medical';
import { cn } from '@/lib/utils';

interface DashboardSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KPI_LABELS: Record<string, string> = {
  thoracic: 'Dor Torácica',
  patients: 'Pacientes/Hora',
  revals: 'Reavaliações',
  ecg: 'Tempo Porta-ECG'
};

const COLUMN_LABELS: Record<string, string> = {
  exam: 'Aguardando Exame',
  wait: 'Aguardando Resultados',
  reval: 'Reavaliação Médica',
  done: 'Alta / Internação'
};

export const DashboardSettingsModal: React.FC<DashboardSettingsModalProps> = ({ isOpen, onClose }) => {
  const { preferences, updatePreferences, resetPreferences } = useDashboardPreferences();
  
  // Local state for dragging (to avoid constant context updates during drag)
  const [localKpiOrder, setLocalKpiOrder] = useState(preferences.kpiOrder);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  if (!isOpen) return null;

  // DnD Handlers
  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    const _kpiOrder = [...localKpiOrder];
    const draggedItemContent = _kpiOrder[dragItem.current];
    
    _kpiOrder.splice(dragItem.current, 1);
    _kpiOrder.splice(dragOverItem.current, 0, draggedItemContent);
    
    dragItem.current = null;
    dragOverItem.current = null;
    
    setLocalKpiOrder(_kpiOrder);
    updatePreferences({ kpiOrder: _kpiOrder });
  };

  const toggleKpiVisibility = (id: string) => {
    const current = preferences.visibleKpiCards;
    const isVisible = current.includes(id);
    const updated = isVisible ? current.filter(k => k !== id) : [...current, id];
    updatePreferences({ visibleKpiCards: updated });
  };

  const toggleColumnVisibility = (id: string) => {
    const current = preferences.visibleKanbanColumns;
    const isVisible = current.includes(id);
    const updated = isVisible ? current.filter(c => c !== id) : [...current, id];
    updatePreferences({ visibleKanbanColumns: updated });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
       <div className="w-full max-w-2xl liquid-glass-material rim-light-ios26 inner-glow-ios26 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glass-pill text-slate-600 dark:text-slate-200">
                   <Layout className="w-5 h-5" />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">Personalizar Home</h2>
                   <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ajuste a visualização do seu painel.</p>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <button
                  onClick={resetPreferences}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 glass-pill hover:bg-white/20 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Padrão
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full glass-pill hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-slate-400"
                >
                   <X className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
             
             {/* 1. KPI Cards (Reorder & Toggle) */}
             <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Layout className="w-3.5 h-3.5" /> Indicadores (Arraste para ordenar)
                </h3>
                <div className="space-y-2">
                   {localKpiOrder.map((kpiId, index) => {
                      const isVisible = preferences.visibleKpiCards.includes(kpiId);
                      return (
                         <div
                           key={kpiId}
                           draggable
                           onDragStart={() => { dragItem.current = index; }}
                           onDragEnter={() => { dragOverItem.current = index; }}
                           onDragEnd={handleSort}
                           onDragOver={(e) => e.preventDefault()}
                           className={cn(
                             'group flex items-center gap-3 p-3 rounded-2xl transition-all duration-200',
                             isVisible
                                ? 'glass-pill'
                                : 'glass-pill opacity-60'
                           )}
                         >
                            <div className="p-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-300">
                               <GripVertical className="w-5 h-5" />
                            </div>
                            <span className="flex-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                               {KPI_LABELS[kpiId]}
                            </span>
                            <button
                               onClick={() => toggleKpiVisibility(kpiId)}
                               className={cn(
                                 'p-2 rounded-xl transition-colors glass-pill',
                                 isVisible ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400'
                               )}
                            >
                               {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                         </div>
                      );
                   })}
                </div>
             </section>

             {/* 2. Layout & Density */}
             <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Rows className="w-3.5 h-3.5" /> Seções
                   </h3>
                   <div className="space-y-3">
                      {/* Greeting Toggle */}
                      <label className="flex items-center justify-between p-3 rounded-2xl glass-pill cursor-pointer">
                         <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Saudação (Bom dia...)</span>
                         <div
                            className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.showGreeting ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                            onClick={(e) => { e.preventDefault(); updatePreferences({ showGreeting: !preferences.showGreeting }); }}
                         >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${preferences.showGreeting ? 'translate-x-5' : 'translate-x-0'}`} />
                         </div>
                      </label>

                      {/* Alert Toggle */}
                      <label className="flex items-center justify-between p-3 rounded-2xl glass-pill cursor-pointer">
                         <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Linha de Alertas</span>
                         <div
                            className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.showAlertRow ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                            onClick={(e) => { e.preventDefault(); updatePreferences({ showAlertRow: !preferences.showAlertRow }); }}
                         >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${preferences.showAlertRow ? 'translate-x-5' : 'translate-x-0'}`} />
                         </div>
                      </label>
                   </div>
                </div>

                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Layout className="w-3.5 h-3.5" /> Densidade
                   </h3>
                   <div className="flex gap-3 glass-pill p-1.5 rounded-2xl">
                      {['default', 'compact'].map((mode) => (
                         <button
                           key={mode}
                           onClick={() => updatePreferences({ density: mode as any })}
                           className={cn(
                             'flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 capitalize',
                             preferences.density === mode
                               ? 'glass-pill bg-white/50 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                               : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                           )}
                         >
                           {mode === 'default' ? 'Padrão' : 'Compacto'}
                         </button>
                      ))}
                   </div>
                   <p className="text-[11px] text-slate-400 mt-2.5 px-1 leading-relaxed">
                      O modo compacto reduz espaçamentos verticais para exibir mais informações em telas menores.
                   </p>
                </div>
             </section>

             {/* 3. Kanban Columns */}
             <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Columns className="w-3.5 h-3.5" /> Colunas do Quadro
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {Object.entries(COLUMN_LABELS).map(([id, label]) => {
                      const isVisible = preferences.visibleKanbanColumns.includes(id);
                      return (
                         <button
                           key={id}
                           onClick={() => toggleColumnVisibility(id)}
                           className={cn(
                             'flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 text-left',
                             isVisible
                               ? 'glass-pill bg-blue-500/10 text-blue-700 dark:text-blue-300'
                               : 'glass-pill opacity-60'
                           )}
                         >
                            <span className={cn(
                              'text-sm font-semibold',
                              isVisible ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'
                            )}>
                               {label}
                            </span>
                            <div className={cn(
                               'w-5 h-5 rounded-full flex items-center justify-center transition-all',
                               isVisible ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-transparent'
                            )}>
                               <Check className="w-3 h-3 stroke-[3px]" />
                            </div>
                         </button>
                      );
                   })}
                </div>
             </section>

          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-200/50 dark:border-white/5 glass-pill flex justify-end gap-3">
             <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-500 glass-pill hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
             >
                Cancelar
             </button>
             <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl btn-primary-glass text-white font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
             >
                Concluir
             </button>
          </div>

       </div>
    </div>
  );
};
