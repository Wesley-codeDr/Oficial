'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GripVertical, Check, Eye, EyeOff, RotateCcw, Layout, Rows, Columns } from 'lucide-react';
import { useDashboardPreferences } from '@/lib/contexts/dashboard-preferences';
import { modalBackdrop, modalContent, appleSpring, staggerContainer, staggerChild } from '@/lib/animations/presets';

interface DashboardSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KPI_LABELS: Record<string, string> = {
  thoracic: 'Dor Toracica',
  patients: 'Pacientes/Hora',
  revals: 'Reavaliações',
  ecg: 'Tempo Porta-ECG',
};

const COLUMN_LABELS: Record<string, string> = {
  exam: 'Aguardando Exame',
  wait: 'Aguardando Resultados',
  reval: 'Reavaliação Médica',
  done: 'Alta / Internação',
};

export function DashboardSettingsModal({ isOpen, onClose }: DashboardSettingsModalProps) {
  const { preferences, updatePreferences, resetPreferences, toggleKanbanColumn } = useDashboardPreferences();

  // Local state for dragging (to avoid constant context updates during drag)
  const [localKpiOrder, setLocalKpiOrder] = useState(preferences.kpiOrder);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Sync local state with preferences when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalKpiOrder(preferences.kpiOrder);
    }
  }, [isOpen, preferences.kpiOrder]);

  // DnD Handlers with improved feedback
  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) {
      dragItem.current = null;
      dragOverItem.current = null;
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const dragIndex = dragItem.current;
    const overIndex = dragOverItem.current;

    if (dragIndex !== overIndex) {
      const draggedItem = localKpiOrder[dragIndex];
      if (draggedItem) {
        const _kpiOrder = [...localKpiOrder];
        _kpiOrder.splice(dragIndex, 1);
        _kpiOrder.splice(overIndex, 0, draggedItem);
        setLocalKpiOrder(_kpiOrder);
        updatePreferences({ kpiOrder: _kpiOrder });
      }
    }

    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const toggleKpiVisibility = (id: string) => {
    const current = preferences.visibleKpiCards;
    const isVisible = current.includes(id);
    const updated = isVisible ? current.filter((k) => k !== id) : [...current, id];
    updatePreferences({ visibleKpiCards: updated });
  };

  const toggleColumnVisibility = (id: string) => {
    // Delegate to context function which enforces the invariant
    toggleKanbanColumn(id);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={modalBackdrop}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 dark:bg-black/50 backdrop-blur-xl p-4"
          onClick={onClose}
        >
        <motion.div
          variants={modalContent}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl rounded-[28px] shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header - Apple 2025 Style */}
          <div className="px-6 py-5 border-b border-white/20 dark:border-white/5 flex items-center justify-between shrink-0 bg-white/40 dark:bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-[16px] bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/10 dark:to-white/5 text-slate-600 dark:text-slate-200 shadow-sm"
              >
                <Layout className="w-5 h-5" />
              </motion.div>
              <div>
                <h2 className="text-[22px] font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                  Personalizar Home
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                  Ajuste a visualização do seu painel
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetPreferences}
                className="px-4 py-2 rounded-[14px] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 bg-white/40 dark:bg-white/5 backdrop-blur-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Padrão
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/60 dark:hover:bg-white/10 transition-colors text-slate-400 dark:text-slate-500"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Body */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8"
          >
            {/* 1. KPI Cards (Reorder & Toggle) - Apple 2025 Style */}
            <motion.section variants={staggerChild}>
              <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <Layout className="w-3.5 h-3.5" /> Indicadores (Arraste para ordenar)
              </h3>
              <div className="space-y-2.5">
                {localKpiOrder.map((kpiId, index) => {
                  const isVisible = preferences.visibleKpiCards.includes(kpiId);
                  const isDragging = draggedIndex === index;
                  const isDragOver = dragOverIndex === index;

                  return (
                    <motion.div
                      key={kpiId}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      whileDrag={{
                        scale: 1.05,
                        rotate: 2,
                        zIndex: 100,
                      }}
                      variants={staggerChild}
                      className={`
                        group flex items-center gap-3 p-4 rounded-[20px] border transition-all duration-300 cursor-grab active:cursor-grabbing
                        ${
                          isDragging
                            ? 'bg-ios-blue/10 dark:bg-ios-blue/20 border-ios-blue/30 dark:border-ios-blue/40 shadow-lg shadow-ios-blue/20 scale-105'
                            : isDragOver
                              ? 'bg-ios-blue/5 dark:bg-ios-blue/10 border-ios-blue/20 dark:border-ios-blue/30 scale-[1.02]'
                              : isVisible
                                ? 'bg-white/60 dark:bg-white/5 border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-white/60 dark:hover:border-white/20'
                                : 'bg-slate-50/50 dark:bg-white/[0.02] border-transparent opacity-60'
                        }
                      `}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors"
                      >
                        <GripVertical className="w-5 h-5" />
                      </motion.div>
                      <span className="flex-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                        {KPI_LABELS[kpiId]}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleKpiVisibility(kpiId)}
                        className={`p-2.5 rounded-[14px] transition-all duration-300 ${
                          isVisible
                            ? 'text-ios-blue bg-ios-blue/10 dark:bg-ios-blue/20 shadow-sm'
                            : 'text-slate-400 dark:text-slate-500 hover:bg-white/40 dark:hover:bg-white/10'
                        }`}
                      >
                        {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* 2. Layout & Density - Apple 2025 Style */}
            <motion.section variants={staggerChild} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                  <Rows className="w-3.5 h-3.5" /> Seções
                </h3>
                <div className="space-y-3">
                  {/* Greeting Toggle - iOS Style */}
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      updatePreferences({ showGreeting: !preferences.showGreeting });
                    }}
                    className="flex items-center justify-between p-4 rounded-[20px] bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 cursor-pointer backdrop-blur-sm hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Saudação (Bom dia...)
                    </span>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className={`relative w-[52px] h-[32px] rounded-full p-1 transition-colors duration-300 ${
                        preferences.showGreeting ? 'bg-ios-green' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <motion.div
                        layout
                        className="w-[24px] h-[24px] bg-white rounded-full shadow-lg"
                        animate={{
                          x: preferences.showGreeting ? 20 : 0,
                        }}
                        transition={appleSpring}
                      />
                    </motion.div>
                  </motion.label>

                  {/* Alert Toggle - iOS Style */}
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      updatePreferences({ showAlertRow: !preferences.showAlertRow });
                    }}
                    className="flex items-center justify-between p-4 rounded-[20px] bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 cursor-pointer backdrop-blur-sm hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Linha de Prioridade de Alertas
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {preferences.showAlertRow 
                          ? 'Ocultar para liberar mais espaço vertical'
                          : 'Mostrar alertas prioritários no topo'
                        }
                      </span>
                    </div>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className={`relative w-[52px] h-[32px] rounded-full p-1 transition-colors duration-300 ${
                        preferences.showAlertRow ? 'bg-ios-green' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <motion.div
                        layout
                        className="w-[24px] h-[24px] bg-white rounded-full shadow-lg"
                        animate={{
                          x: preferences.showAlertRow ? 20 : 0,
                        }}
                        transition={appleSpring}
                      />
                    </motion.div>
                  </motion.label>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" /> Densidade
                </h3>
                <div className="flex gap-2 bg-slate-100/50 dark:bg-black/20 p-1.5 rounded-[20px] backdrop-blur-sm border border-white/20 dark:border-white/5">
                  {(['default', 'compact'] as const).map((mode) => (
                    <motion.button
                      key={mode}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updatePreferences({ density: mode })}
                      className={`
                        flex-1 py-3 text-xs font-black rounded-[16px] transition-all duration-300 capitalize
                        ${
                          preferences.density === mode
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                        }
                      `}
                    >
                      {mode === 'default' ? 'Padrão' : 'Compacto'}
                    </motion.button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 px-1 leading-relaxed font-medium">
                  O modo compacto reduz espaçamentos verticais para exibir mais informações em telas menores.
                </p>
              </div>
            </motion.section>

            {/* 3. Kanban Columns - Apple 2025 Style */}
            <motion.section variants={staggerChild}>
              <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <Columns className="w-3.5 h-3.5" /> Colunas do Quadro
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(COLUMN_LABELS).map(([id, label]) => {
                  const isVisible = preferences.visibleKanbanColumns.includes(id);
                  const isLastVisible = isVisible && preferences.visibleKanbanColumns.length === 1;
                  return (
                    <motion.button
                      key={id}
                      whileHover={isLastVisible ? {} : { scale: 1.02, y: -2 }}
                      whileTap={isLastVisible ? {} : { scale: 0.98 }}
                      onClick={() => toggleColumnVisibility(id)}
                      variants={staggerChild}
                      title={isLastVisible ? 'Pelo menos uma coluna deve estar visível' : undefined}
                      className={`
                        flex items-center justify-between p-4 rounded-[20px] border transition-all duration-300 text-left backdrop-blur-sm relative
                        ${
                          isVisible
                            ? 'bg-ios-blue/10 dark:bg-ios-blue/20 border-ios-blue/30 dark:border-ios-blue/40 shadow-sm'
                            : 'bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 opacity-70 hover:opacity-100'
                        }
                        ${isLastVisible ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}
                      `}
                    >
                      <span
                        className={`text-sm font-bold ${
                          isVisible ? 'text-ios-blue dark:text-ios-blue/80' : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {label}
                      </span>
                      <motion.div
                        animate={{
                          scale: isVisible ? 1 : 0.8,
                          opacity: isVisible ? 1 : 0.5,
                        }}
                        transition={appleSpring}
                        className={`
                          w-6 h-6 rounded-full flex items-center justify-center transition-all
                          ${isVisible ? 'bg-ios-blue text-white shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-transparent'}
                        `}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 px-1 leading-relaxed font-medium">
                Pelo menos uma coluna deve estar visível. Clique para mostrar ou ocultar cada coluna.
              </p>
            </motion.section>
          </motion.div>

          {/* Footer - Apple 2025 Style */}
          <div className="p-5 border-t border-white/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-xl flex justify-end gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 rounded-[16px] font-black text-sm text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 transition-colors bg-white/40 dark:bg-white/5 backdrop-blur-sm"
            >
              Cancelar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 rounded-[16px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm shadow-lg shadow-slate-900/20 dark:shadow-white/20 transition-all"
            >
              Concluir
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
