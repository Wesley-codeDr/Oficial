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
import { getComplaintById, complaintToFormConfig } from '@/lib/anamnese/complaint-to-form';
import { CalculatorTriggerButton } from './CalculatorTriggerButton';
import { InlineCalculatorPanel } from './InlineCalculatorPanel';

// --- VISUAL CONSTANTS ---
const SECTION_ICONS: Record<string, any> = {
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
    className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all group"
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
      case 'critical': return 'from-rose-500/80 to-rose-700/80 shadow-rose-500/30 border-rose-400/30';
      case 'warning': return 'from-amber-500/80 to-orange-600/80 shadow-amber-500/30 border-amber-400/30';
      default: return 'from-blue-500/80 to-indigo-600/80 shadow-blue-500/30 border-blue-400/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(20px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(20px)' }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="fixed bottom-28 right-10 z-[100] w-[340px]"
    >
      <div className={`
        relative overflow-hidden rounded-[42px] backdrop-blur-3xl border shadow-3xl p-6 group
        ${getSeverityStyles()}
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
                <h4 className="text-[15px] font-[900] text-white leading-tight tracking-tight">Análise Inteligente</h4>
                <p className="text-[10px] font-[900] text-white/70 uppercase tracking-[0.2em] mt-1 opacity-80">Recomendação Clínica</p>
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
                className="w-full flex items-center justify-between p-4 rounded-[24px] bg-white/10 border border-white/20 transition-all duration-700 text-left group/btn rim-highlight"
              >
                <div className="min-w-0 pr-4">
                  <p className="text-[14px] font-apple-black text-white truncate">{calc.name}</p>
                  <p className="text-[11px] font-[600] text-white/60 mt-1 truncate">{calc.description}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover/btn:scale-110 group-hover/btn:translate-x-1">
                   <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2.5">
             <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
             <p className="text-[10.5px] text-white/50 font-[700] leading-relaxed italic tracking-tight">
               Escore sugerido via detecção semântica.
             </p>
          </div>
        </div>

        {/* Outer Specular Highlight */}
        <div className="absolute inset-0 pointer-events-none border border-white/30 rounded-[42px] mix-blend-overlay" />
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

interface AnamnesisViewProps {
  patient?: Patient;
  sections: AnamnesisSection[];
  data: Record<string, any>;
  onDataChange: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onAddSymptom: (sectionId: string) => void;
  complaintId?: string; // ID da queixa para carregar dados do Obsidian
  onCalculatorClick?: (calculatorName: string) => void;
}

export const AnamnesisView: React.FC<AnamnesisViewProps> = ({
    patient,
    sections,
    data,
    onDataChange,
    onAddSymptom,
    complaintId,
    onCalculatorClick
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [showConduct, setShowConduct] = useState(false);
  const [isCalculatorDismissed, setIsCalculatorDismissed] = useState(false);
  const [openCalculatorId, setOpenCalculatorId] = useState<string | null>(null);
  const [isCalculatorPanelOpen, setIsCalculatorPanelOpen] = useState(false);

  // Carrega dados do Obsidian se complaintId fornecido
  const complaintData = useMemo(() => {
    if (!complaintId) return null;
    return getComplaintById(complaintId);
  }, [complaintId]);

  const formConfig = useMemo(() => {
    if (!complaintId) return null;
    return complaintToFormConfig(complaintId);
  }, [complaintId]);

  // Detecta red flags baseado nas seleções atuais
  const redFlagResult = useMemo((): DetectionResult => {
    if (!complaintId) {
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

    return detectRedFlags(complaintId, selectedSymptoms);
  }, [complaintId, data, sections]);

  useEffect(() => {
    const firstSection = sections[0]
    if (firstSection && !activeSectionId) {
       setActiveSectionId(firstSection.id);
    }
  }, [sections]);

  useEffect(() => {
    const doc = (globalThis as any).document;
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

  const handleInputChange = React.useCallback((id: string, value: any) => {
    onDataChange(prev => ({ ...prev, [id]: value }));
  }, [onDataChange]);

  const scrollToSection = (id: string, smoothScroll: boolean = true) => {
    setActiveSectionId(id);
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
            severity={redFlagResult.requiresImmediateAction ? 'critical' : (redFlagResult.highestSeverity === 'high' ? 'warning' : 'info')}
          />
        )}
      </AnimatePresence>

      {/* 0. ALERT AREA - Fixed at top */}
      {redFlagResult.hasRedFlags && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
          <AutoRedFlagAlert
            result={redFlagResult}
            onDismiss={() => {}}
            onActionClick={(alert) => {
              console.log('Action clicked:', alert);
            }}
          />
        </div>
      )}

      {/* 1. STICKY SIDEBAR (Ultra-FID Apple 2025) */}
      <div className="w-80 shrink-0 flex flex-col h-full py-6 pl-4">
         <div className="mb-8 px-4">
            <h3 className="text-[10px] font-apple-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-5 pl-1.5 opacity-60">Roteiro Clínico</h3>
            <div className="relative group">
                <Search className="absolute left-4.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-all duration-500 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-full bg-black/5 dark:bg-white/[0.03] border border-white/10 rounded-[22px] py-3.5 pl-12 pr-5 text-[13px] font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-white/[0.05] transition-all backdrop-blur-3xl dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner rim-highlight"
                />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2.5 pr-4 pb-10 px-1 scroll-smooth">
            {sections.map(section => {
               const sectionPrefix = section.id.split('_')[0] ?? section.id
               const Icon = SECTION_ICONS[section.id] || SECTION_ICONS[sectionPrefix] || Activity;
               const isActive = activeSectionId === section.id;
               const hasRedFlag = section.items.some(i => i.isRedFlag && data[i.id] === true);

               return (
                  <motion.button
                    key={section.id}
                    whileHover={{ x: 4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(section.id, true)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-[16px] group relative overflow-hidden
                      ${isActive
                        ? 'text-white dark:text-slate-900 font-semibold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
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
                           className="absolute inset-0 z-0 bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-white dark:via-blue-50 dark:to-slate-100 shadow-xl shadow-blue-600/15 dark:shadow-white/5 rounded-[16px]"
                           transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 1 }}
                         >
                           {/* Specular Rim Glow */}
                           <div className="absolute inset-0 border-t border-white/30 dark:border-black/5 pointer-events-none" />
                         </motion.div>
                       )}
                     </AnimatePresence>

                     <div className="flex items-center gap-4 min-w-0 relative z-10">
                        <div className={`
                          w-8.5 h-8.5 rounded-[13px] flex items-center justify-center transition-colors duration-300
                          ${isActive ? 'bg-white/20 dark:bg-black/10' : 'bg-black/5 dark:bg-white/5 group-hover:bg-blue-500/10'}
                        `}>
                          <Icon className={`w-[17px] h-[17px] shrink-0 transition-transform duration-300 ${isActive ? 'stroke-[2.5px] scale-105' : 'stroke-[1.8px] opacity-60 group-hover:opacity-100'}`} />
                        </div>
                        <span className={`text-[13px] truncate tracking-tight uppercase font-apple-black transition-transform duration-300 ${isActive ? 'translate-x-0.5' : ''}`}>
                          {section.title}
                        </span>
                     </div>

                     <div className="relative z-10 flex items-center gap-2">
                       {hasRedFlag && (
                          <motion.div
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className={`w-2 h-2 rounded-full ${isActive ? 'bg-white shadow-[0_0_8px_white]' : 'bg-rose-500'} shadow-md`}
                          />
                       )}
                       {isActive && (
                         <motion.div
                           initial={{ opacity: 0, x: -3 }}
                           animate={{ opacity: 0.5, x: 0 }}
                         >
                            <ChevronRight className="w-3.5 h-3.5 stroke-[3px]" />
                         </motion.div>
                       )}
                     </div>
                  </motion.button>
               );
            })}
         </div>

         <div className="mt-auto pt-6 px-4">
             <motion.button
               whileHover={{ scale: 1.02, translateY: -2 }}
               whileTap={{ scale: 0.97 }}
               className="w-full h-14 rounded-apple-cta bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 text-white font-apple-black text-[14px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(37,99,235,0.2)] border border-white/20 relative overflow-hidden group rim-highlight"
             >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Check className="w-4.5 h-4.5 stroke-[4px]" />
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
                             <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm backdrop-blur-md">
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

                      <div className="liquid-glass-material !bg-white/70 dark:!bg-[#1c1c1e]/40 backdrop-blur-3xl rounded-[40px] border border-white/60 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.06)] overflow-hidden relative group/card">
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
