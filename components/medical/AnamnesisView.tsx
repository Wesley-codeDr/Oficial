'use client'

import * as React from 'react';
import { useEffect, useState } from 'react';
import { 
  Search, Save, Check, AlertTriangle, 
  Activity, Thermometer, Stethoscope, FileText,
  Plus, ChevronRight, Info
} from 'lucide-react';
import { AnamnesisSection, Symptom, Patient } from '@/lib/types/medical';

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

// --- MAIN COMPONENT ---

interface AnamnesisViewProps {
  patient?: Patient;
  sections: AnamnesisSection[];
  data: Record<string, any>;
  onDataChange: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onAddSymptom: (sectionId: string) => void;
}

export const AnamnesisView: React.FC<AnamnesisViewProps> = ({ 
    sections, 
    data, 
    onDataChange,
    onAddSymptom
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    if (sections.length > 0 && !activeSectionId) {
       setActiveSectionId(sections[0].id);
    }
  }, [sections]);

  useEffect(() => {
    const doc = (globalThis as { document?: Document }).document;
    const container = doc?.getElementById('form-container');
    if (!container) return;

    const handleScroll = () => {
       const containerRect = container.getBoundingClientRect();
       const triggerZone = 150; 

       const isBottom = Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 20;
       if (isBottom && sections.length > 0) {
          setActiveSectionId(sections[sections.length - 1].id);
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
    const doc = (globalThis as { document?: Document }).document;
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
        case 'boolean': return <CheckboxItem key={item.id} item={item} value={safeValue as boolean} onChange={(v) => handleInputChange(item.id, v)} />;
        case 'segment': return <SegmentedItem key={item.id} item={item} value={safeValue as string} onChange={(v) => handleInputChange(item.id, v)} />;
        case 'multiSelect': return <MultiSelectItem key={item.id} item={item} value={safeValue as string[]} onChange={(v) => handleInputChange(item.id, v)} />;
        case 'range': return <RangeItem key={item.id} item={item} value={safeValue as string} onChange={(v) => handleInputChange(item.id, v)} />;
        case 'text': return <TextItem key={item.id} item={item} value={safeValue as string} onChange={(v) => handleInputChange(item.id, v)} />;
        default: return null;
    }
  };

  return (
    <div className="flex h-full gap-5 animate-in fade-in zoom-in-95 duration-500">
      
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
               const Icon = SECTION_ICONS[section.id] || SECTION_ICONS[section.id.split('_')[0]] || Activity;
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
               const Icon = SECTION_ICONS[section.id] || SECTION_ICONS[section.id.split('_')[0]] || Activity;

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
         </div>
      </div>

   </div>
  );
};
