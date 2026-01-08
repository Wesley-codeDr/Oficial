'use client'

import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import {
  Search, Check, AlertTriangle,
  Activity, Thermometer, Stethoscope, FileText,
  Plus, ChevronRight, Calculator, BookOpen, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnamnesisSection, Symptom, Patient } from '@/lib/types/medical';
import { 
  GlassSegmented, 
  GlassMultiSelect, 
  GlassRange, 
  GlassInput,
  GlassCheckbox
} from './glass-inputs';
import { AutoRedFlagAlert } from './AutoRedFlagAlert';
import { detectRedFlags, DetectionResult } from '@/lib/anamnese/red-flag-detector';
import { complaintToFormConfig } from '@/lib/anamnese/complaint-to-form';
import type { ComplaintApiPayload } from '@/lib/types/complaints-api';
import { CalculatorTriggerButton } from './CalculatorTriggerButton';
import { InlineCalculatorPanel } from './InlineCalculatorPanel';

// --- VISUAL CONSTANTS ---
const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'queixa': FileText,
  'hda': Activity,
  'antecedentes': AlertTriangle,
  'exame_fisico': Stethoscope,
  'meta_characterization': Thermometer,
  'general': Activity
};

const RISK_FACTOR_TOOLTIPS: Record<string, string> = {
  'has': 'Aumenta a pós-carga e o consumo miocárdico de oxigênio.',
  'dm': 'Equivalente de risco coronariano; neuropatia pode mascarar dor.',
  'tabagismo': 'Dano endotelial, vasoespasmo e estado pró-trombótico.',
  'dislipidemia': 'Principal fator para aterosclerose e instabilidade de placa.',
  'hist_fam': 'Parente 1º grau: Homem <55a ou Mulher <65a (Genética).',
  'obesidade': 'Sobrecarga cardíaca e associação com síndrome metabólica.'
};

// --- SUB-COMPONENTS REMOVED (Replaced by Glass Inputs) ---

// --- CALCULATOR CARD COMPONENT ---
interface CalculatorCardProps {
  name: string;
  description: string;
  onClick?: () => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ name, description, onClick }) => (
  <button
    onClick={onClick}
    className="glass-pill flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/20 dark:hover:bg-white/10 transition-all group rim-light-ios26"
  >
    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
      <Calculator className="w-5 h-5" />
    </div>
    <div className="text-left">
      <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm">{name}</p>
      {description && <p className="text-xs text-blue-600 dark:text-blue-300">{description}</p>}
    </div>
    <ChevronRight className="w-4 h-4 text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

// --- CONDUCT PANEL COMPONENT ---
interface ConductPanelProps {
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ConductPanel: React.FC<ConductPanelProps> = ({ content, isExpanded, onToggle }) => {
  if (!content) return null;

  // Parse markdown to simple HTML-like structure
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, idx) => {
        // Bold text
        const formattedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Numbered items
        if (/^\d+\./.test(line)) {
          return (
            <div key={idx} className="flex gap-2 py-1">
              <span className="text-blue-500 font-bold min-w-[24px]">{line.match(/^\d+/)?.[0]}.</span>
              <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s*/, '') }} />
            </div>
          );
        }
        // Sub-items with dash
        if (/^\s*-/.test(line)) {
          return (
            <div key={idx} className="flex gap-2 py-0.5 pl-6">
              <span className="text-slate-400">•</span>
              <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\s*-\s*/, '') }} />
            </div>
          );
        }
        return line.trim() ? <p key={idx} className="py-1" dangerouslySetInnerHTML={{ __html: formattedLine }} /> : null;
      })
      .filter(Boolean);
  };

  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100 text-sm">Conduta Inicial</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-300">Protocolo de atendimento</p>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-emerald-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
          {formatContent(content)}
        </div>
      )}
    </div>
  );
};

// 6. Floating Calculator Card (Ultra-FID Liquid Bubble)
interface FloatingCalculatorCardProps {
  calculators: { id: string; name: string; description: string }[];
  onClick: (name: string) => void;
  onDismiss: () => void;
  severity?: 'critical' | 'warning' | 'info';
}

const FloatingCalculatorCard: React.FC<FloatingCalculatorCardProps> = ({ calculators, onClick, onDismiss, severity = 'info' }) => {
  if (calculators.length === 0) return null;

  const getSeverityStyles = () => {
    switch(severity) {
      case 'critical': return 'from-rose-500/90 to-rose-700/90 border-rose-400/50 shadow-rose-500/20';
      case 'warning': return 'from-amber-500/90 to-orange-600/90 border-amber-400/50 shadow-amber-500/20';
      default: return 'from-blue-600/90 to-indigo-700/90 border-blue-400/40 shadow-blue-500/25';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(20px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(20px)' }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="fixed bottom-28 right-10 z-100 w-[340px]"
    >
      <div className={`
        relative overflow-hidden rounded-[42px] backdrop-blur-3xl border shadow-[0_30px_80px_rgba(0,0,0,0.3)] p-6 group
        bg-gradient-to-br ${getSeverityStyles()}
      `}>
        {/* Animated Mesh Gradient Background (Inside) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-20 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.2)_180deg,transparent_360deg)] pointer-events-none"
        />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[20px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg rim-highlight">
                <Calculator className="w-6 h-6 stroke-[2.5px]" />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-white leading-tight tracking-tight">Análise Inteligente</h4>
                <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mt-1 opacity-80">Recomendação Clínica</p>
              </div>
            </div>
            <button 
              onClick={onDismiss}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-500"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>

          <div className="space-y-3">
            {calculators.map((calc) => (
              <motion.button
                key={calc.id}
                whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onClick(calc.name)}
                className="w-full flex items-center justify-between p-4 rounded-[24px] bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-500 text-left group/btn rim-highlight shadow-lg shadow-black/5"
              >
                <div className="min-w-0 pr-4">
                  <p className="text-[14px] font-apple-black text-white truncate">{calc.name}</p>
                  <p className="text-[11px] font-semibold text-white/60 mt-1 truncate">{calc.description}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover/btn:scale-110 group-hover/btn:translate-x-1">
                   <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2.5">
             <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
             <p className="text-[10.5px] text-white/50 font-bold leading-relaxed italic tracking-tight">
               Escore sugerido via detecção semântica.
             </p>
          </div>
        </div>

        {/* Outer Specular Highlight & Noise */}
        <div className="absolute inset-0 pointer-events-none noise-grain opacity-50" />
        <div className="absolute inset-0 pointer-events-none border border-white/40 rounded-[42px] mix-blend-overlay shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnamnesisData = Record<string, any>;

interface AnamnesisViewProps {
  patient?: Patient;
  sections: AnamnesisSection[];
  data: AnamnesisData;
  onDataChange: React.Dispatch<React.SetStateAction<AnamnesisData>>;
  onAddSymptom: (sectionId: string) => void;
  complaint?: ComplaintApiPayload | null;
  onCalculatorClick?: (calculatorName: string) => void;
}

export const AnamnesisView: React.FC<AnamnesisViewProps> = ({
    patient,
    sections,
    data,
    onDataChange,
    onAddSymptom,
    complaint,
    onCalculatorClick
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [showConduct, setShowConduct] = useState(false);
  const [isCalculatorDismissed, setIsCalculatorDismissed] = useState(false);
  const [openCalculatorId, setOpenCalculatorId] = useState<string | null>(null);
  const [isCalculatorPanelOpen, setIsCalculatorPanelOpen] = useState(false);

  const complaintData = useMemo(() => {
    return complaint ?? null;
  }, [complaint]);

  const formConfig = useMemo(() => {
    if (!complaintData) return null;
    return complaintToFormConfig(complaintData);
  }, [complaintData]);

  // Detecta red flags baseado nas seleções atuais
  const redFlagResult = useMemo((): DetectionResult => {
    if (!complaintData) {
      return { hasRedFlags: false, alerts: [], highestSeverity: 'none', requiresImmediateAction: false };
    }

    // Coleta sintomas selecionados do formulário
    const selectedSymptoms: string[] = [];

    sections.forEach(section => {
      section.items.forEach(item => {
        if (data[item.id] === true) {
          selectedSymptoms.push(item.label);
        }
        // Multi-select values
        if (Array.isArray(data[item.id])) {
          selectedSymptoms.push(...data[item.id]);
        }
      });
    });

    return detectRedFlags(complaintData, selectedSymptoms);
  }, [complaintData, data, sections]);

  useEffect(() => {
    const firstSection = sections[0]
    if (firstSection && !activeSectionId) {
       setActiveSectionId(firstSection.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = (globalThis as any)?.document;
    const container = doc?.getElementById('form-container');
    if (!container) return;

    const handleScroll = () => {
       const containerRect = container.getBoundingClientRect();
       const triggerZone = 150;

       const isBottom = Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 20;
       const lastSection = sections[sections.length - 1]
       if (isBottom && lastSection) {
          setActiveSectionId(lastSection.id);
          return;
       }

       let newActiveId: string | null = null;

       sections.forEach(section => {
          const el = doc?.getElementById(`sec-${section.id}`);
          if (el) {
             const rect = el.getBoundingClientRect();
             const relativeTop = rect.top - containerRect.top;
             if (relativeTop <= triggerZone) {
                newActiveId = section.id;
             }
          }
       });

       if (newActiveId) {
          setActiveSectionId(newActiveId);
       }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = React.useCallback((id: string, value: any) => {
    onDataChange(prev => ({ ...prev, [id]: value }));
  }, [onDataChange]);

  const scrollToSection = (id: string, smoothScroll: boolean = true) => {
    setActiveSectionId(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = (globalThis as any).document;
    const container = doc?.getElementById('form-container');
    const el = doc?.getElementById(`sec-${id}`);

    if (container && el) {
       const elementRect = el.getBoundingClientRect();
       const containerRect = container.getBoundingClientRect();
       const offsetTop = elementRect.top - containerRect.top;
       const currentScroll = container.scrollTop;
       const headerOffset = 24;

       const targetPos = currentScroll + offsetTop - headerOffset;

       container.scrollTo({
         top: Math.max(0, targetPos),
         behavior: smoothScroll ? 'smooth' : 'auto'
       });
    }
  };

  const renderItem = (item: Symptom) => {
    const rawVal = data[item.id];
    const safeValue = rawVal !== undefined ? rawVal : (
        item.type === 'boolean' ? false :
        item.type === 'range' ? (item.min?.toString() || '0') :
        item.type === 'segment' ? (item.options?.[0] || '') :
        item.type === 'multiSelect' ? [] :
        ''
    );

    switch(item.type) {
        case 'boolean':
            return (
                <div key={item.id} className="flex items-center">
                    <GlassCheckbox
                      item={item}
                      value={safeValue as boolean}
                      onChange={(v) => handleInputChange(item.id, v)}
                      tooltipText={RISK_FACTOR_TOOLTIPS[item.id]}
                    />
                    {item.triggersCalculator && safeValue === true && (
                        <CalculatorTriggerButton
                            label={item.triggersCalculator === 'heart' ? 'HEART' : item.triggersCalculator.toUpperCase()}
                            onClick={() => {
                                setOpenCalculatorId(item.triggersCalculator!);
                                setIsCalculatorPanelOpen(true);
                            }}
                        />
                    )}
                </div>
            );
        case 'segment':
          return (
            <GlassSegmented
              key={item.id}
              item={item}
              value={safeValue as string}
              onChange={(v) => handleInputChange(item.id, v)}
            />
          );
        case 'multiSelect':
          return (
            <GlassMultiSelect
              key={item.id}
              item={item}
              value={safeValue as string[]}
              onChange={(v) => handleInputChange(item.id, v)}
            />
          );
        case 'range':
          return (
            <GlassRange
              key={item.id}
              item={item}
              value={safeValue as string}
              onChange={(v) => handleInputChange(item.id, v)}
            />
          );
        case 'text':
          return (
            <GlassInput
              key={item.id}
              item={item}
              value={safeValue as string}
              onChange={(v) => handleInputChange(item.id, v)}
            />
          );
        default: return null;
    }
  };

  const extendedContent = complaintData?.extendedContent;
  const calculators = formConfig?.calculators || [];
  const initialConduct = extendedContent?.condutaInicial || '';

  // Antecedentes for calculators
  const antecedentesItems = useMemo(() => {
    return sections.find(s => s.id === 'antecedentes' || s.id.startsWith('antecedentes'))?.items.map(item => ({
        ...item,
        checked: data[item.id] === true
    })) || [];
  }, [sections, data]);

  // Show floating card if red flag is detected and there are relevant calculators
  const showFloatingCalculators = redFlagResult.hasRedFlags && calculators.length > 0 && !isCalculatorDismissed;

  return (
    <div className="flex h-full gap-5 animate-in fade-in zoom-in-95 duration-500">

      <InlineCalculatorPanel
        isOpen={isCalculatorPanelOpen}
        onClose={() => setIsCalculatorPanelOpen(false)}
        calculatorId={openCalculatorId || ''}
        patient={patient || { id: 'anonymous', age: '0', gender: 'M', category: 'adult', isPregnant: false, phoneNumber: '', allergies: [], medications: [], entryTime: '2025-01-01T00:00:00.000Z', status: 'waiting' }}
        antecedentesItems={antecedentesItems}
      />

      <AnimatePresence>
        {showFloatingCalculators && (
          <FloatingCalculatorCard
            calculators={calculators}
            onClick={(name) => onCalculatorClick?.(name)}
            onDismiss={() => setIsCalculatorDismissed(true)}
            severity={redFlagResult.requiresImmediateAction ? 'critical' : (redFlagResult.highestSeverity === 'critical' || redFlagResult.highestSeverity === 'danger' ? 'warning' : 'info')}
          />
        )}
      </AnimatePresence>

      {/* 0. ALERT AREA - Fixed at top */}
      {redFlagResult.hasRedFlags && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
          <AutoRedFlagAlert
            result={redFlagResult}
            onDismiss={() => {}}
            onActionClick={(_alert) => {
              // Action handler
            }}
          />
        </div>
      )}

      {/* 1. STICKY SIDEBAR - Subtle & Compact */}
      <div className="w-56 shrink-0 flex flex-col h-full py-4 pl-3">
         <div className="mb-5 px-2">
            <h3 className="text-[9px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-3 pl-1 opacity-50">Roteiro Clínico</h3>
            <div className="relative group">
                <Search className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-all duration-500 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-full bg-black/4 dark:bg-white/3 border border-white/8 rounded-[16px] py-2.5 pl-9 pr-4 text-[12px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-white/5 transition-all backdrop-blur-xl dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-2 pb-8 px-1 scroll-smooth">
            {sections.map(section => {
               const sectionPrefix = section.id.split('_')[0] ?? section.id
               const Icon = SECTION_ICONS[section.id] || SECTION_ICONS[sectionPrefix] || Activity;
               const isActive = activeSectionId === section.id;
               const hasRedFlag = section.items.some(i => i.isRedFlag && data[i.id] === true);

               return (
                  <motion.button
                    key={section.id}
                    whileHover={{ x: 2, scale: 1.005 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(section.id, true)}
                    className={`
                      w-full flex items-center justify-between px-2.5 py-2 rounded-[12px] group relative overflow-hidden
                      ${isActive
                        ? 'text-white dark:text-slate-900 font-medium'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-normal'
                      }
                    `}
                  >
                     {/* Liquid Morphing Background */}
                     <AnimatePresence>
                       {isActive && (
                         <motion.div
                           layoutId="active-section"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-slate-100 dark:to-white shadow-md shadow-blue-500/10 dark:shadow-slate-200/10 rounded-[12px]"
                           transition={{ type: 'spring', damping: 28, stiffness: 220, mass: 1 }}
                         >
                           <div className="absolute inset-0 border-t border-white/20 dark:border-black/5 pointer-events-none rounded-[12px]" />
                         </motion.div>
                       )}
                     </AnimatePresence>

                     <div className="flex items-center gap-2.5 min-w-0 relative z-10">
                        <div className={`
                          w-6 h-6 rounded-[9px] flex items-center justify-center transition-colors duration-300
                          ${isActive ? 'bg-white/20 dark:bg-black/10' : 'bg-transparent group-hover:bg-black/5 dark:group-hover:bg-white/5'}
                        `}>
                          <Icon className={`w-3.5 h-3.5 shrink-0 transition-all duration-300 ${isActive ? 'stroke-[2px] scale-105' : 'stroke-[1.5px] opacity-40 group-hover:opacity-70'}`} />
                        </div>
                        <span className={`text-[11px] truncate tracking-tight transition-all duration-300 ${isActive ? 'font-semibold' : 'font-normal opacity-70 group-hover:opacity-100'}`}>
                          {section.title}
                        </span>
                     </div>

                     <div className="relative z-10 flex items-center gap-1.5">
                       {hasRedFlag && (
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.6, 1, 0.6]
                            }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                            className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white shadow-[0_0_6px_white]' : 'bg-rose-500'}`}
                          />
                       )}
                       {isActive && (
                         <motion.div
                           initial={{ opacity: 0, x: -2 }}
                           animate={{ opacity: 0.6, x: 0 }}
                         >
                            <ChevronRight className="w-3 h-3 stroke-[2.5px]" />
                         </motion.div>
                       )}
                     </div>
                  </motion.button>
               );
            })}
         </div>

         <div className="mt-auto pt-4 px-2">
             <motion.button
               whileHover={{ scale: 1.02, translateY: -1 }}
               whileTap={{ scale: 0.97 }}
               className="w-full h-11 rounded-[14px] bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-[12px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.2)] border border-white/15 relative overflow-hidden group"
             >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Check className="w-4 h-4 stroke-[3px]" />
                Finalizar
             </motion.button>
         </div>
      </div>

      {/* 2. MAIN FORM AREA (Sheet Style) */}
      <div
         id="form-container"
         className="flex-1 h-full overflow-y-auto custom-scrollbar scroll-smooth pr-2 pb-20 mask-image-b-gradient"
      >
         <div className="space-y-6 pt-2 pb-24 max-w-5xl mx-auto">
            {sections.map((section, idx) => {
               const sectionPrefix = section.id.split('_')[0] ?? section.id
               const Icon = SECTION_ICONS[section.id] || SECTION_ICONS[sectionPrefix] || Activity;

               return (
                   <div key={section.id} id={`sec-${section.id}`} className="scroll-mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                      <div className="flex items-center justify-between mb-5 px-2">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm backdrop-blur-md">
                                 <Icon className="w-5 h-5 opacity-70" />
                             </div>
                             <div className="flex flex-col">
                                <h2 className="text-[22px] font-black text-slate-900 dark:text-white tracking-tight leading-tight">{section.title}</h2>
                                <p className="text-[10px] font-apple-black text-blue-500 uppercase tracking-[0.2em] mt-1 opacity-80">Sessão {idx + 1}</p>
                             </div>
                         </div>

                         <motion.button
                             whileHover={{ scale: 1.1, rotate: 90 }}
                             whileTap={{ scale: 0.9 }}
                             onClick={() => onAddSymptom(section.id)}
                             className="w-10 h-10 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all shadow-sm backdrop-blur-sm group"
                         >
                             <Plus className="w-5 h-5 transition-transform" />
                         </motion.button>
                      </div>

                      <div className="liquid-glass-material bg-white/70! dark:bg-[#1c1c1e]/40! backdrop-blur-3xl rounded-[40px] border border-white/60 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.06)] overflow-hidden relative group/card">
                         {/* Rim Light / Glow Effect */}
                         <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                         {section.items.map((item) => (
                            <div key={item.id}>
                               {renderItem(item)}
                            </div>
                         ))}
                         {section.items.length === 0 && (
                             <div className="p-12 text-center text-slate-400 italic font-bold text-sm opacity-50">
                                 Nenhum item disponível nesta seção.
                             </div>
                         )}
                      </div>
                   </div>
               );
            })}

            {/* 3. CALCULATORS & CONDUCT FROM OBSIDIAN */}
            {(calculators.length > 0 || initialConduct) && (
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-[11px] font-apple-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
                  Ferramentas & Protocolos
                </h3>

                {/* Conduct Panel */}
                {initialConduct && (
                  <ConductPanel
                    content={initialConduct}
                    isExpanded={showConduct}
                    onToggle={() => setShowConduct(!showConduct)}
                  />
                )}

                {/* Calculators Grid */}
                {calculators.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {calculators.map((calc) => (
                      <CalculatorCard
                        key={calc.id}
                        name={calc.name}
                        description={calc.description}
                        onClick={() => onCalculatorClick?.(calc.name)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
         </div>
      </div>

   </div>
  );
};
