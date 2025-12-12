'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Stethoscope,
  Microscope,
  PlayCircle,
  FileCheck2,
  Settings2,
  Sun,
  Sparkles,
  Filter,
  Zap,
  HeartPulse,
} from 'lucide-react';
import { MetricCard, chartDataOrange, chartDataBlue, chartDataGreen, chartDataPurple } from '@/components/dashboard/cards';
import { KanbanColumn } from '@/components/dashboard/kanban';
import { DashboardSettingsModal } from '@/components/dashboard/dashboard-settings-modal';
import { useDashboardPreferences } from '@/lib/contexts/dashboard-preferences';
import type { KanbanTask, KanbanStatus } from '@/types/frontend';

// Mock initial tasks
const INITIAL_TASKS: KanbanTask[] = [
  {
    id: '1',
    patientName: 'Maria Silva',
    age: '45 anos',
    gender: 'F',
    complaint: 'Dor torácica há 2h com irradiação para MSE',
    waitTime: '15min',
    acuity: 'red',
    status: 'exam',
  },
  {
    id: '2',
    patientName: 'João Santos',
    age: '62 anos',
    gender: 'M',
    complaint: 'Dispneia aos esforços progressiva',
    waitTime: '32min',
    acuity: 'orange',
    status: 'exam',
  },
  {
    id: '3',
    patientName: 'Ana Costa',
    age: '28 anos',
    gender: 'F',
    complaint: 'Cefaleia intensa há 6h',
    waitTime: '45min',
    acuity: 'yellow',
    status: 'wait',
  },
  {
    id: '4',
    patientName: 'Carlos Oliveira',
    age: '55 anos',
    gender: 'M',
    complaint: 'Dor abdominal em cólica',
    waitTime: '1h 10min',
    acuity: 'yellow',
    status: 'wait',
  },
  {
    id: '5',
    patientName: 'Lucia Ferreira',
    age: '38 anos',
    gender: 'F',
    complaint: 'Febre e tosse produtiva há 3 dias',
    waitTime: '25min',
    acuity: 'green',
    status: 'reval',
  },
  {
    id: '6',
    patientName: 'Pedro Almeida',
    age: '71 anos',
    gender: 'M',
    complaint: 'Queda de nivel, resultado ECG pendente',
    waitTime: '2h',
    acuity: 'orange',
    status: 'reval',
  },
  {
    id: '7',
    patientName: 'Fernanda Lima',
    age: '33 anos',
    gender: 'F',
    complaint: 'Lombalgia aguda após esforço',
    waitTime: '1h 45min',
    acuity: 'green',
    status: 'done',
  },
];

const kanbanColumnsConfig: Record<KanbanStatus, { title: string; icon: typeof Stethoscope }> = {
  exam: { title: 'Aguardando Exame', icon: Stethoscope },
  wait: { title: 'Aguardando Resultados', icon: Microscope },
  reval: { title: 'Reavaliação Médica', icon: PlayCircle },
  done: { title: 'Alta / Internação', icon: FileCheck2 },
};

export default function DashboardPage() {
  const { preferences } = useDashboardPreferences();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // KPI Cards Map
  const kpiCardsMap: Record<string, React.ReactElement> = {
    thoracic: (
      <MetricCard
        key="thoracic"
        title="Dor Toracica (3h)"
        value="08"
        sub="Alta Demanda"
        icon={AlertTriangle}
        colorTheme="orange"
        trend="up"
        trendValue="12%"
        data={chartDataOrange}
        density={preferences.density}
      />
    ),
    patients: (
      <MetricCard
        key="patients"
        title="Pcts / Hora"
        value="4.2"
        sub="Fluxo Intenso"
        icon={Zap}
        colorTheme="blue"
        trend="down"
        trendValue="5%"
        data={chartDataBlue}
        density={preferences.density}
      />
    ),
    revals: (
      <MetricCard
        key="revals"
        title="Reavaliações"
        value="03"
        sub="Pendentes"
        icon={CheckCircle2}
        colorTheme="green"
        trend="up"
        trendValue="2%"
        data={chartDataGreen}
        density={preferences.density}
      />
    ),
    ecg: (
      <MetricCard
        key="ecg"
        title="Tempo Porta-ECG"
        value="08'"
        sub="Meta: < 10min"
        icon={HeartPulse}
        colorTheme="purple"
        trend="down"
        trendValue="15%"
        data={chartDataPurple}
        density={preferences.density}
      />
    ),
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setTimeout(() => {
      setDraggedTaskId(taskId);
    }, 0);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: KanbanStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (draggedTaskId) {
      setTasks((prev) => prev.map((t) => (t.id === draggedTaskId ? { ...t, status: newStatus } : t)));
      setDraggedTaskId(null);
    }
  };

  const handleStatusChange = (taskId: string, newStatus: KanbanStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const handleNewAttendance = () => {
    // Navigate to anamnese selection or create new attendance
    window.location.href = '/queixa';
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';

  // Renderable KPI Cards based on order and visibility
  const renderableKpiCards = useMemo(() => {
    return preferences.kpiOrder
      .filter((id) => preferences.visibleKpiCards.includes(id))
      .map((id) => kpiCardsMap[id]);
  }, [preferences.kpiOrder, preferences.visibleKpiCards, preferences.density]);

  return (
    <div className="h-full flex flex-col bg-transparent overflow-hidden relative animate-in fade-in duration-700">
      <DashboardSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* 1. Header & KPIs */}
      <div className={`shrink-0 ${preferences.density === 'compact' ? 'pt-4 pb-1' : 'pt-2 pb-2'}`}>
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[32px] font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
              Visão Geral
            </h1>

            {preferences.showGreeting && (
              <div className="flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-left-4">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Plantão Ativo • Dr. André
                </p>
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
              onClick={handleNewAttendance}
              className="h-11 px-6 rounded-[20px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              Novo Atendimento
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{renderableKpiCards}</div>
      </div>

      {/* 2. Priority Insight Row */}
      {preferences.showAlertRow && (
        <div
          className={`shrink-0 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200 ${preferences.density === 'compact' ? 'mt-3 mb-2' : 'mt-6 mb-4'}`}
        >
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
                <strong className="text-slate-900 dark:text-white">Atenção:</strong> 1 paciente aguarda
                reavaliação prioritária.
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
      <div
        className={`flex-1 overflow-x-auto overflow-y-hidden ${preferences.density === 'compact' ? 'pb-3 mt-2' : 'pb-6 mt-0'}`}
      >
        <div className="flex h-full gap-6 min-w-[1200px]">
          {preferences.visibleKanbanColumns.map((colId) => {
            const config = kanbanColumnsConfig[colId as KanbanStatus];
            if (!config) return null;

            return (
              <KanbanColumn
                key={colId}
                id={colId as KanbanStatus}
                title={config.title}
                icon={config.icon}
                tasks={tasks.filter((t) => t.status === colId)}
                isDropTarget={dragOverColumn === colId}
                draggedTaskId={draggedTaskId}
                density={preferences.density}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={(e: React.DragEvent) => {
                  handleDragOver(e);
                  if (dragOverColumn !== colId) setDragOverColumn(colId);
                }}
                onDragLeave={() => setDragOverColumn(null)}
                onDrop={handleDrop}
                onStatusChange={handleStatusChange}
                onNewTask={handleNewAttendance}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
