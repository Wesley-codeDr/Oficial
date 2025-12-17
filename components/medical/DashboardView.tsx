'use client'

import * as React from 'react';
import { useState, useMemo } from 'react';
import { 
  Users, Clock, AlertTriangle, TrendingUp, MoreHorizontal, 
  Plus, CheckCircle2, PlayCircle, Stethoscope, Microscope, 
  FileCheck2, Timer, Activity, GripVertical, Settings2, X, Eye, EyeOff,
  Sun, Moon, Sparkles, ArrowUpRight, BarChart3, ArrowRightLeft, Check,
  HeartPulse, ChevronDown, Filter, Zap
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { KanbanTask, KanbanStatus } from '@/lib/types/medical';
import { useDashboardPreferences } from '@/contexts/DashboardPreferencesContext';
import { DashboardSettingsModal } from './DashboardSettingsModal';

// --- Mock Data for Charts (Organic Curves) ---
const chartDataOrange = [
  { value: 12 }, { value: 18 }, { value: 15 }, { value: 25 }, { value: 32 }, { value: 45 }, { value: 38 }, { value: 50 }, { value: 42 }
];
const chartDataBlue = [
  { value: 30 }, { value: 25 }, { value: 35 }, { value: 30 }, { value: 45 }, { value: 35 }, { value: 55 }, { value: 50 }, { value: 60 }
];
const chartDataGreen = [
  { value: 20 }, { value: 25 }, { value: 30 }, { value: 28 }, { value: 35 }, { value: 45 }, { value: 40 }, { value: 48 }, { value: 55 }
];
const chartDataPurple = [
  { value: 65 }, { value: 58 }, { value: 62 }, { value: 55 }, { value: 50 }, { value: 45 }, { value: 48 }, { value: 42 }, { value: 40 }
];

// --- Sub-components ---

const CustomChartTooltip = ({ active, payload }: any) => {
   if (active && payload && payload.length) {
      return (
         <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/50 dark:border-white/10 shadow-xl transform -translate-y-2">
            <p className="text-lg font-bold text-slate-800 dark:text-white leading-none">
               {payload[0].value}
            </p>
         </div>
      );
   }
   return null;
};

const MetricCard = ({ title, value, sub, icon: Icon, colorTheme, trend, trendValue, data, density }: any) => {
  const themeMap: Record<string, any> = {
     orange: {
        stroke: '#F97316',
        fillStart: '#F97316',
        glow: 'from-orange-500/30 to-amber-500/30',
        iconColor: 'text-orange-500',
        iconBg: 'bg-orange-50 dark:bg-orange-500/20',
        trendColor: 'text-orange-600 dark:text-orange-400',
        trendBg: 'bg-orange-100/50 dark:bg-orange-500/10'
     },
     blue: {
        stroke: '#3B82F6',
        fillStart: '#3B82F6',
        glow: 'from-blue-500/30 to-cyan-500/30',
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-50 dark:bg-blue-500/20',
        trendColor: 'text-blue-600 dark:text-blue-400',
        trendBg: 'bg-blue-100/50 dark:bg-blue-500/10'
     },
     green: {
        stroke: '#10B981',
        fillStart: '#10B981',
        glow: 'from-emerald-500/30 to-teal-500/30',
        iconColor: 'text-emerald-500',
        iconBg: 'bg-emerald-50 dark:bg-emerald-500/20',
        trendColor: 'text-emerald-600 dark:text-emerald-400',
        trendBg: 'bg-emerald-100/50 dark:bg-emerald-500/10'
     },
     purple: {
        stroke: '#8B5CF6',
        fillStart: '#8B5CF6',
        glow: 'from-violet-500/30 to-fuchsia-500/30',
        iconColor: 'text-violet-500',
        iconBg: 'bg-violet-50 dark:bg-violet-500/20',
        trendColor: 'text-violet-600 dark:text-violet-400',
        trendBg: 'bg-violet-100/50 dark:bg-violet-500/10'
     }
  };

  const theme = themeMap[colorTheme] || themeMap.blue;
  const gradId = `grad-${title.replace(/\s/g, '')}`;
  const isCompact = density === 'compact';

  return (
    <div className={`relative overflow-hidden rounded-[32px] p-0 flex flex-col justify-between group transition-all duration-500 hover:scale-[1.02] bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] ring-1 ring-white/40 dark:ring-white/5 ${isCompact ? 'h-[180px]' : 'h-[240px]'}`}>
      
      {/* Volumetric Glow */}
      <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${theme.glow} opacity-20 blur-[70px] rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-700`} />

      {/* Content Container */}
      <div className={`relative z-20 flex flex-col h-full pointer-events-none ${isCompact ? 'p-4' : 'p-6'}`}>
         <div className="flex justify-between items-start mb-2 pointer-events-auto">
            <div className={`rounded-[20px] ${theme.iconBg} backdrop-blur-md flex items-center justify-center shadow-sm border border-white/40 dark:border-white/5 ${theme.iconColor} ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}`}>
               <Icon className={`${isCompact ? 'w-5 h-5' : 'w-6 h-6'} stroke-[2.5px]`} />
            </div>
            
            <div className={`px-3 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md border border-white/20 flex items-center gap-1 ${theme.trendBg} ${theme.trendColor}`}>
               {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-90" />}
               {trendValue}
            </div>
         </div>

         <div className={`pointer-events-auto ${isCompact ? 'mt-auto' : 'mt-4'}`}>
             <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
                {title}
             </p>
             <div className="flex items-baseline gap-2">
                <h3 className={`${isCompact ? 'text-[32px]' : 'text-[42px]'} font-bold text-slate-800 dark:text-white tracking-tight leading-none filter drop-shadow-sm`}>{value}</h3>
             </div>
             {!isCompact && <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
         </div>
      </div>

      {/* Chart Area - Seamless Bottom */}
      <div className={`absolute bottom-0 left-0 right-0 w-full z-10 opacity-90 ${isCompact ? 'h-24' : 'h-36'}`}>
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
               <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor={theme.fillStart} stopOpacity={0.25} />
                     <stop offset="90%" stopColor={theme.fillStart} stopOpacity={0.0} />
                  </linearGradient>
               </defs>
               <Tooltip content={<CustomChartTooltip />} cursor={false} />
               <Area 
                 type="monotone" 
                 dataKey="value" 
                 stroke={theme.stroke} 
                 strokeWidth={3}
                 fill={`url(#${gradId})`} 
                 animationDuration={1500}
                 isAnimationActive={true}
                 activeDot={{ r: 6, strokeWidth: 0, fill: theme.stroke, stroke: '#fff' }}
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- Kanban Components ---

const KanbanCard = ({ task, onDragStart, onDragEnd, onStatusChange, isDragging, density }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCompact = density === 'compact';

  const statusOptions: { id: KanbanStatus, label: string, color: string }[] = [
      { id: 'exam', label: 'Aguardando Exame', color: 'text-blue-500' },
      { id: 'wait', label: 'Aguardando Resultados', color: 'text-yellow-500' },
      { id: 'reval', label: 'Reavaliação', color: 'text-orange-500' },
      { id: 'done', label: 'Alta / Internação', color: 'text-emerald-500' }
  ];

  return (
    <motion.div 
       layout
       draggable="true"
       onDragStart={(e) => onDragStart(e, task.id)}
       onDragEnd={onDragEnd}
       initial={{ opacity: 0, scale: 0.95, y: 10 }}
       animate={isDragging 
         ? { opacity: 0.4, scale: 0.95, filter: "grayscale(100%) blur(1px)" } 
         : { opacity: 1, scale: 1, y: 0, filter: "grayscale(0%) blur(0px)" }
       }
       exit={{ opacity: 0, scale: 0.95 }}
       whileHover={!isDragging ? { 
         scale: 1.03, 
         y: -5,
         boxShadow: "0 20px 40px -5px rgba(0,0,0,0.1), 0 10px 20px -5px rgba(0,0,0,0.04)"
       } : {}}
       whileTap={{ scale: 0.98 }}
       transition={{ type: "spring", stiffness: 400, damping: 25 }}
       className={`group relative w-full rounded-[24px] 
         border shadow-[0_4px_20px_rgba(0,0,0,0.02)]
         transition-colors duration-300
         cursor-grab active:cursor-grabbing
         ${isCompact ? 'p-3' : 'p-5'}
         ${isDragging 
            ? 'border-dashed border-blue-400 dark:border-blue-500/50 bg-blue-50/30 dark:bg-blue-900/10' 
            : 'bg-white/60 dark:bg-white/5 backdrop-blur-xl border-white/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10'
         }
       `}
    >
       {/* Identity Header */}
       <div className={`flex items-center justify-between ${isCompact ? 'mb-2' : 'mb-4'}`}>
          <div className="flex items-center gap-3">
             <div className={`
                rounded-full flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-white dark:ring-white/5
                ${isCompact ? 'w-8 h-8 text-xs' : 'w-10 h-10'}
                ${task.gender === 'F' 
                   ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 dark:from-pink-900/40 dark:to-rose-900/40 dark:text-pink-300' 
                   : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-blue-300'
                }
             `}>
                {task.patientName.substring(0, 2).toUpperCase()}
             </div>
             <div>
                <h5 className={`font-bold ${isCompact ? 'text-xs' : 'text-[15px]'} text-slate-800 dark:text-slate-100 leading-tight`}>
                   {task.patientName}
                </h5>
                <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
                   {task.age} • {task.gender === 'F' ? 'Fem' : 'Mas'}
                </p>
             </div>
          </div>
          
          {/* Acuity Indicator */}
          <div className="relative">
             <div className={`w-3 h-3 rounded-full shadow-sm ring-2 ring-white dark:ring-slate-700
                ${task.acuity === 'red' ? 'bg-red-500' : 
                  task.acuity === 'orange' ? 'bg-orange-500' : 
                  task.acuity === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'
                }
             `}>
                 <span className={`absolute inset-0 rounded-full opacity-50 animate-ping ${
                    task.acuity === 'red' ? 'bg-red-500' : 
                    task.acuity === 'orange' ? 'bg-orange-500' : 'hidden'
                 }`} />
             </div>
          </div>
       </div>

       {/* Complaint & Info */}
       <div className={`${isCompact ? 'mb-2' : 'mb-3'}`}>
          <p className={`${isCompact ? 'text-xs' : 'text-sm'} font-bold text-slate-700 dark:text-slate-200 leading-relaxed`}>
             {task.complaint}
          </p>
       </div>
       
       {/* Footer */}
       <div className={`flex items-center justify-between border-t border-slate-100 dark:border-white/5 ${isCompact ? 'pt-2' : 'pt-3'}`}>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100/50 dark:bg-white/5 px-2 py-1 rounded-lg">
             <Clock className="w-3.5 h-3.5" />
             {task.waitTime}
          </div>
          
          <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-300 hover:text-blue-500 transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              {isMenuOpen && (
                 <div className="absolute top-8 right-0 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-white/10 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {statusOptions.filter(opt => opt.id !== task.status).map(option => (
                        <button
                           key={option.id}
                           onClick={() => { onStatusChange(task.id, option.id); setIsMenuOpen(false); }}
                           className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between group"
                        >
                           {option.label}
                        </button>
                    ))}
                 </div>
              )}
          </div>
       </div>
    </motion.div>
  );
};

const KanbanColumn = ({ 
  id, title, icon: Icon, tasks, isDropTarget, draggedTaskId, density,
  onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop, onStatusChange
}: any) => {
  const isCompact = density === 'compact';
  
  return (
    <div 
        className={`flex flex-col h-full min-w-[320px] w-full rounded-[40px] p-2 transition-all duration-500
        ${isDropTarget 
            ? 'bg-blue-50/60 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 shadow-lg shadow-blue-500/5 scale-[1.01]' 
            : 'bg-white/20 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/5 shadow-sm'}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, id)}
    >
       {/* Minimalist Header */}
       <div className={`flex items-center justify-between ${isCompact ? 'px-4 py-3' : 'px-5 py-5'}`}>
          <div className="flex items-center gap-3">
             <div className={`rounded-2xl bg-white/50 dark:bg-white/10 shadow-sm border border-white/20 text-slate-500 dark:text-slate-400 ${isCompact ? 'p-2' : 'p-2.5'}`}>
               <Icon className="w-5 h-5" />
             </div>
             <h4 className="text-[16px] font-bold text-slate-800 dark:text-slate-100 tracking-tight">
               {title}
               <span className="ml-2 text-xs font-semibold text-slate-400 bg-white/50 dark:bg-white/5 px-2 py-0.5 rounded-full">
                 {tasks.length}
               </span>
             </h4>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
             <MoreHorizontal className="w-5 h-5" />
          </button>
       </div>

       {/* Task List */}
       <div className={`flex-1 overflow-y-auto px-2 pb-2 custom-scrollbar ${isCompact ? 'space-y-2' : 'space-y-3'}`}>
          {tasks.map((task: any) => (
             <KanbanCard 
               key={task.id}
               task={task}
               isDragging={draggedTaskId === task.id}
               onDragStart={onDragStart}
               onDragEnd={onDragEnd}
               onStatusChange={onStatusChange}
               density={density}
             />
          ))}
          
          <button className="w-full py-4 rounded-[24px] border border-dashed border-slate-300/60 dark:border-white/10 text-slate-400 dark:text-slate-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/40 dark:hover:bg-white/5 transition-all group">
             <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Plus className="w-3.5 h-3.5" />
             </div>
             Novo Atendimento
          </button>
       </div>
    </div>
  );
};

// --- Main View ---

interface DashboardViewProps {
  tasks: KanbanTask[];
  setTasks: React.Dispatch<React.SetStateAction<KanbanTask[]>>;
  onNewAttendance?: () => void;
  onSettings?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  tasks, 
  setTasks,
  onNewAttendance
}) => {
  const { preferences } = useDashboardPreferences();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Map of all available cards for easier rendering
  const kpiCardsMap: Record<string, React.ReactElement> = {
    thoracic: <MetricCard key="thoracic" title="Dor Torácica (3h)" value="08" sub="Alta Demanda" icon={AlertTriangle} colorTheme="orange" trend="up" trendValue="12%" data={chartDataOrange} density={preferences.density} />,
    patients: <MetricCard key="patients" title="Pcts / Hora" value="4.2" sub="Fluxo Intenso" icon={Zap} colorTheme="blue" trend="down" trendValue="5%" data={chartDataBlue} density={preferences.density} />,
    revals: <MetricCard key="revals" title="Reavaliações" value="03" sub="Pendentes" icon={CheckCircle2} colorTheme="green" trend="up" trendValue="2%" data={chartDataGreen} density={preferences.density} />,
    ecg: <MetricCard key="ecg" title="Tempo Porta-ECG" value="08'" sub="Meta: < 10min" icon={HeartPulse} colorTheme="purple" trend="down" trendValue="15%" data={chartDataPurple} density={preferences.density} />
  };

  const kanbanColumnsConfig: Record<string, any> = {
    exam: { title: "Aguardando Exame", icon: Stethoscope },
    wait: { title: "Aguardando Resultados", icon: Microscope },
    reval: { title: "Reavaliação Médica", icon: PlayCircle },
    done: { title: "Alta / Internação", icon: FileCheck2 }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    // Delay setting state to avoid affecting the drag snapshot
    setTimeout(() => {
        setDraggedTaskId(taskId);
    }, 0);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault(); 
    if (dragOverColumn !== columnId) setDragOverColumn(columnId);
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (draggedTaskId) {
        setTasks(prev => prev.map(t => t.id === draggedTaskId ? { ...t, status: newStatus as any } : t));
        setDraggedTaskId(null);
    }
  };

  const handleStatusChange = (taskId: string, newStatus: KanbanStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';
  
  // Renderable KPI Cards based on order and visibility
  const renderableKpiCards = useMemo(() => {
    return preferences.kpiOrder
      .filter(id => preferences.visibleKpiCards.includes(id))
      .map(id => kpiCardsMap[id]);
  }, [preferences.kpiOrder, preferences.visibleKpiCards, kpiCardsMap]);

  return (
    <div className="h-full flex flex-col bg-transparent overflow-hidden px-2 relative animate-in fade-in duration-700">
       
       <DashboardSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

       {/* 1. Header & KPIs */}
       <div className={`shrink-0 px-4 ${preferences.density === 'compact' ? 'pt-4 pb-1' : 'pt-6 pb-2'}`}>
          
          {/* Top Control Bar */}
          <div className="flex items-center justify-between mb-8">
             <div>
                <h1 className="text-[32px] font-black text-slate-900 dark:text-white tracking-tighter leading-tight">Visão Geral</h1>
                
                {preferences.showGreeting && (
                    <div className="flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-left-4">
                       <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                       </span>
                       <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Plantão Ativo • Dr. André</p>
                    </div>
                )}
             </div>

             <div className="flex gap-4">
                 <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="h-11 px-5 rounded-[20px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 font-bold text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:bg-white/60 dark:hover:bg-white/10 transition-all shadow-sm"
                 >
                    <Settings2 className="w-4 h-4" />
                    Configurar
                 </button>
                 <button 
                    onClick={onNewAttendance}
                    className="h-11 px-6 rounded-[20px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20"
                 >
                    <Plus className="w-4 h-4 stroke-[3px]" />
                    Novo Atendimento
                 </button>
             </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {renderableKpiCards}
          </div>
       </div>

       {/* 2. Priority Insight Row (Refined) */}
       {preferences.showAlertRow && (
           <div className={`px-4 shrink-0 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200 ${preferences.density === 'compact' ? 'mt-3 mb-2' : 'mt-6 mb-4'}`}>
               <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-white/40 dark:border-white/5 backdrop-blur-md shadow-sm">
                     <Sun className="w-5 h-5 text-amber-500" />
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{greeting}</span>
                  </div>
                  <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
                  <div className="flex items-center gap-2.5">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Sparkles className="w-4 h-4 text-white" />
                     </div>
                     <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        <strong className="text-slate-900 dark:text-white">Atenção:</strong> 1 paciente aguarda reavaliação prioritária.
                     </p>
                  </div>
               </div>
               
               <div className="flex items-center gap-3">
                  <button className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/5 transition-colors text-slate-400">
                     <Filter className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-3">
                     Fluxo em Tempo Real
                  </div>
               </div>
           </div>
       )}

       {/* 3. Kanban Board */}
       <div className={`flex-1 overflow-x-auto overflow-y-hidden px-4 ${preferences.density === 'compact' ? 'pb-3 mt-2' : 'pb-6 mt-0'}`}>
          <div className="flex h-full gap-6 min-w-[1200px]">
             {preferences.visibleKanbanColumns.map(colId => {
                const config = kanbanColumnsConfig[colId];
                if (!config) return null;
                
                return (
                   <KanbanColumn 
                      key={colId}
                      id={colId} 
                      title={config.title} 
                      icon={config.icon}
                      tasks={tasks.filter(t => t.status === colId)} 
                      isDropTarget={dragOverColumn === colId}
                      draggedTaskId={draggedTaskId}
                      density={preferences.density}
                      onDragStart={handleDragStart} 
                      onDragEnd={handleDragEnd} 
                      onDragOver={(e: any) => handleDragOver(e, colId)}
                      onDragLeave={() => setDragOverColumn(null)} 
                      onDrop={handleDrop} 
                      onStatusChange={handleStatusChange}
                   />
                );
             })}
          </div>
       </div>
    </div>
  );
};
