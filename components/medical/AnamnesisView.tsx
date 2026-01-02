'use client'

import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import {
  Search, Check, AlertTriangle,
  Activity, Thermometer, Stethoscope, FileText,
  Plus, ChevronRight, Info, Calculator, BookOpen, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnamnesisSection, Symptom, Patient } from '@/lib/types/medical';
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

// --- SUB-COMPONENTS (Apple Style) ---

// 1. Checkbox Row (Card List Style)
interface CheckboxItemProps { item: Symptom; value: boolean; onChange: (val: boolean) => void; }
const CheckboxItem: React.FC<CheckboxItemProps> = ({ item, value, onChange }) => {
  const tooltipText = RISK_FACTOR_TOOLTIPS[item.id];

  return (
    <button 
      onClick={() => onChange(!value)}
      className={`
        group w-full flex items-center justify-between px-5 py-4 first:rounded-t-3xl last:rounded-b-3xl border-b border-slate-100 dark:border-white/5 last:border-0 transition-all duration-200
        ${value ? 'bg-slate-50/50 dark:bg-white/5' : 'bg-transparent hover:bg-slate-50/80 dark:hover:bg-white/5'}
      `}
    >
      <div className="flex items-center gap-4">
        {/* Custom Radio/Check Circle */}
        <div className={`
           w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-[1.5px]
           ${value 
             ? (item.isRedFlag ? 'bg-red-500 border-red-500 shadow-sm' : 'bg-blue-500 border-blue-500 shadow-sm')
             : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-blue-400 dark:group-hover:border-blue-400'
           }
        `}>
           <Check className={`w-3.5 h-3.5 text-white stroke-[3.5px] transition-transform duration-200 ${value ? 'scale-100' : 'scale-0'}`} />
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-[15px] text-left tracking-tight ${value ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-300 font-medium'}`}>
            {item.label}
          </span>
          
          {tooltipText && (
            <div 
              className="group/tooltip relative flex items-center justify-center p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
               <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400" />
               
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

      {item.isRedFlag && value && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide animate-in fade-in zoom-in">
           <AlertTriangle className="w-3 h-3" />
           Alerta
        </div>
      )}
    </button>
  );
};

// 2. Segmented Control (iOS Native Style)
interface SegmentedItemProps { item: Symptom; value: string; onChange: (val: string) => void; }
const SegmentedItem: React.FC<SegmentedItemProps> = ({ item, value, onChange }) => {
  return (
    <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
       <div className="mb-3">
         <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">{item.label}</span>
       </div>
       <div className="flex bg-slate-100 dark:bg-black/40 p-1 rounded-2xl relative z-0">
          {item.options?.map(opt => {
             const isActive = value === opt;
             return (
                <button
                  key={opt}
                  onClick={() => onChange(opt)}
                  className={`
                    flex-1 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 relative z-10
                    ${isActive 
                      ? 'text-slate-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none bg-white dark:bg-slate-700' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }
                  `}
                >
                  {opt}
                </button>
             );
          })}
       </div>
    </div>
  );
};

// 3. Multi Select Chips (Pills)
interface MultiSelectItemProps { item: Symptom; value: string[]; onChange: (val: string[]) => void; }
const MultiSelectItem: React.FC<MultiSelectItemProps> = ({ item, value, onChange }) => {
  const currentValues = Array.isArray(value) ? value : [];

  const toggleOption = (opt: string) => {
    if (currentValues.includes(opt)) {
      onChange(currentValues.filter(v => v !== opt));
    } else {
      onChange([...currentValues, opt]);
    }
  };

  return (
    <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
       <div className="mb-3">
         <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">{item.label}</span>
       </div>
       <div className="flex flex-wrap gap-2.5">
          {item.options?.map(opt => {
             const isSelected = currentValues.includes(opt);
             return (
                <button
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  className={`
                    px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 border
                    ${isSelected 
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {opt}
                </button>
             );
          })}
       </div>
    </div>
  );
};

// 4. Range Slider (Apple Health Style)
interface RangeItemProps { item: Symptom; value: string; onChange: (val: string) => void; }
const RangeItem: React.FC<RangeItemProps> = ({ item, value, onChange }) => {
  const numVal = parseInt(value) || 0;
  const percentage = ((numVal - (item.min || 0)) / ((item.max || 10) - (item.min || 0))) * 100;
  
  return (
    <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
       <div className="flex justify-between items-center mb-5">
         <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.label}</span>
         <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-white min-w-[3rem] text-center shadow-sm">
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
            type="range"
            min={item.min} max={item.max} step={item.step}
            value={numVal}
            onChange={(e) => onChange(e.target.value)}
            className="absolute w-full h-full opacity-0 cursor-pointer z-20"
          />
          {/* Large Thumb */}
          <div 
             className="absolute h-8 w-8 bg-white dark:bg-slate-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-slate-100/50 pointer-events-none transition-transform group-hover:scale-105 duration-200 z-10 flex items-center justify-center"
             style={{ left: `calc(${percentage}% - 16px)` }}
          >
             <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500"></div>
          </div>
       </div>
       <div className="flex justify-between mt-3 px-1">
          <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{item.min}</span>
          <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{item.max}</span>
       </div>
    </div>
  );
};

// 5. Input Text (Clean)
interface TextItemProps { item: Symptom; value: string; onChange: (val: string) => void; }
const TextItem: React.FC<TextItemProps> = ({ item, value, onChange }) => {
  return (
     <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 first:rounded-t-3xl last:rounded-b-3xl last:border-0">
        <label className="block text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2.5 ml-1">
           {item.label}
        </label>
        <input 
           type="text"
           value={value || ''}
           onChange={(e) => onChange(e.target.value)}
           placeholder={item.placeholder || 'Digite aqui...'}
           className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-[15px] font-medium text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        />
     </div>
  );
};

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

// 6. Floating Calculator Card (For Red Flags)
interface FloatingCalculatorCardProps {
  calculators: { id: string; name: string; description: string }[];
  onClick: (name: string) => void;
  onDismiss: () => void;
}

const FloatingCalculatorCard: React.FC<FloatingCalculatorCardProps> = ({ calculators, onClick, onDismiss }) => {
  if (calculators.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className="fixed bottom-24 right-8 z-[100] w-[320px]"
    >
      <div className="liquid-glass-material !bg-white/70 dark:!bg-black/60 backdrop-blur-2xl rounded-[32px] border border-white/40 dark:border-white/10 shadow-2xl p-5 overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-slate-800 dark:text-white leading-tight">Sugestão Técnica</h4>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mt-0.5">Estratificação de Risco</p>
            </div>
          </div>
          <button 
            onClick={onDismiss}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => onClick(calc.name)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 transition-all text-left group/btn"
            >
              <div className="min-w-0 pr-4">
                <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200 truncate">{calc.name}</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">{calc.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-500 transition-transform group-hover/btn:translate-x-1" />
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/5">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed italic">
            Baseado nos sinais de alerta detectados durante a anamnese.
          </p>
        </div>
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

  const handleInputChange = (id: string, value: any) => {
    onDataChange(prev => ({ ...prev, [id]: value }));
  };

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
                    <CheckboxItem item={item} value={safeValue as boolean} onChange={(v) => handleInputChange(item.id, v)} />
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
        case 'segment': return <SegmentedItem key={item.id} item={item} value={safeValue as string} onChange={(v) => handleInputChange(item.id, v)} />;
        case 'multiSelect': return <MultiSelectItem key={item.id} item={item} value={safeValue as string[]} onChange={(v) => handleInputChange(item.id, v)} />;
        case 'range': return <RangeItem key={item.id} item={item} value={safeValue as string} onChange={(v) => handleInputChange(item.id, v)} />;
        case 'text': return <TextItem key={item.id} item={item} value={safeValue as string} onChange={(v) => handleInputChange(item.id, v)} />;
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

      {/* 1. STICKY SIDEBAR (Refined Settings Style) */}
      <div className="w-64 shrink-0 flex flex-col h-full py-2">
         <div className="mb-4 px-2">
            <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">Roteiro</h3>
            <div className="relative group">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filtrar..." 
                  className="w-full bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-white/5 rounded-2xl py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all backdrop-blur-sm dark:text-white" 
                />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-2 pb-4 px-1">
            {sections.map(section => {
               const sectionPrefix = section.id.split('_')[0] ?? section.id
               const Icon = SECTION_ICONS[section.id] || SECTION_ICONS[sectionPrefix] || Activity;
               const isActive = activeSectionId === section.id;
               const hasRedFlag = section.items.some(i => i.isRedFlag && data[i.id] === true);

               return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id, true)}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-300 group relative
                      ${isActive 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-white/10 scale-[1.02]' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200'
                      }
                    `}
                  >
                     <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
                        <span className={`text-[13px] truncate tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>{section.title}</span>
                     </div>
                     
                     {hasRedFlag && (
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-400' : 'bg-red-500'} animate-pulse`} />
                     )}
                  </button>
               );
            })}
         </div>

         <div className="mt-auto pt-4 px-2">
             <button className="w-full py-3.5 btn-vision text-white font-semibold text-[15px] flex items-center justify-center gap-2 tracking-wide rounded-[20px] bg-gradient-to-r from-sky-500 to-indigo-600">
                <Check className="w-4 h-4 stroke-[3px]" />
                Finalizar Atendimento
             </button>
         </div>
      </div>

      {/* 2. MAIN FORM AREA (Sheet Style) */}
      <div 
         id="form-container"
         className="flex-1 h-full overflow-y-auto custom-scrollbar scroll-smooth pr-2 pb-20 mask-image-b-gradient"
      >
         <div className="space-y-6 pt-2 pb-24 max-w-5xl mx-auto">
            {sections.map((section) => {
               const sectionPrefix = section.id.split('_')[0] ?? section.id
               const Icon = SECTION_ICONS[section.id] || SECTION_ICONS[sectionPrefix] || Activity;

               return (
                  <div key={section.id} id={`sec-${section.id}`} className="scroll-mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                <Icon className="w-4 h-4" />
                            </div>
                            <h2 className="text-[19px] font-bold text-slate-900 dark:text-white tracking-tight leading-none">{section.title}</h2>
                        </div>

                        <button
                            onClick={() => onAddSymptom(section.id)}
                            className="w-7 h-7 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                     </div>

                     <div className="bg-white/80 dark:bg-[#1c1c1e]/60 backdrop-blur-xl rounded-[32px] border border-white/60 dark:border-white/5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] overflow-hidden">
                        {section.items.map((item) => (
                           <div key={item.id}>
                              {renderItem(item)}
                           </div>
                        ))}
                        {section.items.length === 0 && (
                            <div className="p-8 text-center text-slate-400 italic text-sm">
                                Nenhum item nesta seção.
                            </div>
                        )}
                     </div>
                  </div>
               );
            })}

            {/* 3. CALCULATORS & CONDUCT FROM OBSIDIAN */}
            {(calculators.length > 0 || initialConduct) && (
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
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
