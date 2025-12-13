'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
import { MetricCard, chartDataOrange, chartDataBlue, chartDataGreen, chartDataPurple, KpiGrid } from '@/components/dashboard/cards';
import { KanbanBoard } from '@/components/dashboard/kanban';
import { DashboardSettingsModal } from '@/components/dashboard/dashboard-settings-modal';
import { useDashboardPreferences } from '@/lib/contexts/dashboard-preferences';
import { useSessions, Session } from '@/hooks/use-sessions';
import type { KanbanTask, KanbanStatus } from '@/types/frontend';

// Helper function to calculate wait time
const calculateWaitTime = (startTime: string): string => {
  const now = new Date();
  const start = new Date(startTime);
  const startTimestamp = start.getTime();

  // Validate parsed date - return fallback if invalid
  if (Number.isNaN(startTimestamp)) {
    return '–';
  }

  const diff = now.getTime() - startTimestamp;

  // Clamp negative differences to zero (future timestamps)
  const clampedDiff = Math.max(0, diff);

  const minutes = Math.floor(clampedDiff / 60000);
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}min`;
};

// Placeholder function to determine acuity (deterministic based on session ID)
const getAcuity = (session: Session): 'red' | 'orange' | 'yellow' | 'green' => {
  if (session.redFlagsDetected && session.redFlagsDetected.length > 0) {
    return 'red';
  }
  // Use session ID hash to get deterministic value
  const hash = session.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const acuities: ('red' | 'orange' | 'yellow' | 'green')[] = ['orange', 'yellow', 'green'];
  return acuities[hash % acuities.length] ?? 'yellow';
};

const getStatus = (session: Session): KanbanStatus => {
  if (session.completedAt) {
    return 'done';
  }
  // Use session ID hash to get deterministic value
  const hash = session.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const statuses: KanbanStatus[] = ['exam', 'wait', 'reval'];
  return statuses[hash % statuses.length] ?? 'wait';
};


const kanbanColumnsConfig: Record<KanbanStatus, { title: string; icon: typeof Stethoscope }> = {
  exam: { title: 'Aguardando Exame', icon: Stethoscope },
  wait: { title: 'Aguardando Resultados', icon: Microscope },
  reval: { title: 'Reavaliação Médica', icon: PlayCircle },
  done: { title: 'Alta / Internação', icon: FileCheck2 },
};

// Kanban column configuration with icons
const kanbanColumnsArray: Array<{ id: KanbanStatus; title: string; icon: typeof Stethoscope }> = [
  { id: 'exam', title: 'Aguardando Exame', icon: Stethoscope },
  { id: 'wait', title: 'Aguardando Resultados', icon: Microscope },
  { id: 'reval', title: 'Reavaliação Médica', icon: PlayCircle },
  { id: 'done', title: 'Alta / Internação', icon: FileCheck2 },
];

export default function DashboardPage() {
  const { preferences, reorderKpiCards } = useDashboardPreferences();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { sessions, isLoading } = useSessions({ autoFetch: true });

  // Memoize session data key to detect changes (stable string comparison)
  const sessionsKey = useMemo(() => {
    if (!sessions || sessions.length === 0) return '';
    return sessions
      .map((s) => `${s.id}:${s.userId}:${s.syndrome.name}:${s.startedAt}:${s.completedAt || ''}:${s.redFlagsDetected?.length || 0}`)
      .join('|');
  }, [sessions]);

  // Local state for tasks that can be modified by user (drag & drop)
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const prevSessionsKeyRef = useRef('');

  // Sync local tasks with sessions when session data changes
  useEffect(() => {
    // Only update if sessionsKey actually changed
    if (prevSessionsKeyRef.current === sessionsKey) {
      return;
    }
    prevSessionsKeyRef.current = sessionsKey;

    if (!sessions || sessions.length === 0) {
      setTasks([]);
      return;
    }

    setTasks((prevTasks) => {
      // Create a map of existing tasks to preserve user-modified statuses
      const taskMap = new Map(prevTasks.map((t) => [t.id, t]));
      
      // Build new tasks from sessions, preserving user-modified statuses
      const newTasks = sessions.map((session) => {
        const existingTask = taskMap.get(session.id);
        const baseTask: KanbanTask = {
          id: session.id,
          // TODO: Replace with real patient data when available in the API
          patientName: `Paciente ${session.userId.substring(0, 4)}`,
          age: '30 anos',
          gender: 'M',
          complaint: session.syndrome.name,
          waitTime: calculateWaitTime(session.startedAt),
          acuity: getAcuity(session),
          status: getStatus(session),
        };
        
        // Preserve user-modified status if task still exists
        if (existingTask) {
          return { ...baseTask, status: existingTask.status };
        }
        return baseTask;
      });
      
      return newTasks;
    });
  }, [sessions, sessionsKey]);

  // KPI Cards Map - Memoized to prevent hook order issues
  const kpiCardsMap = useMemo<Record<string, React.ReactElement>>(() => ({
    thoracic: (
      <MetricCard
        key="thoracic"
        title="Dor Toracica (3h)"
        value="08"
        sub="Alta Demanda"
        icon={AlertTriangle}
        colorTheme="critical"
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
        colorTheme="healthcare"
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
        colorTheme="warning"
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
        colorTheme="stable"
        trend="down"
        trendValue="15%"
        data={chartDataPurple}
        density={preferences.density}
      />
    ),
  }), [preferences.density]);

  // Renderable KPI Cards based on order and visibility
  const renderableKpiCards = useMemo<Array<{ id: string; card: React.ReactElement }>>(() => {
    return preferences.kpiOrder
      .filter((id) => preferences.visibleKpiCards.includes(id))
      .map((id) => {
        const card = kpiCardsMap[id];
        if (!card) return null;
        return { id, card };
      })
      .filter((item): item is { id: string; card: React.ReactElement } => item !== null);
  }, [preferences.kpiOrder, preferences.visibleKpiCards, kpiCardsMap]);

  // Kanban handlers (now using @dnd-kit via KanbanBoard)
  const handleTaskMove = useCallback((taskId: string, newStatus: KanbanStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  }, []);

  /**
   * Receives a full task list with ordering changed only inside a single status column.
   * KanbanBoard guarantees status fidelity and only calls this for intra-column reorders.
   */
  const handleTaskReorder = useCallback((newTasks: KanbanTask[]) => {
    setTasks(newTasks);
  }, []);

  // KPI reorder handler (now using @dnd-kit via KpiGrid)
  const handleKpiReorder = useCallback((newOrder: string[]) => {
    reorderKpiCards(newOrder);
  }, [reorderKpiCards]);

  const handleNewAttendance = () => {
    // Navigate to anamnese selection or create new attendance
    window.location.href = '/queixa';
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';

  // Early return AFTER all hooks
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-transparent overflow-hidden relative animate-in fade-in duration-700 px-4 sm:px-6 lg:px-8 lg:pr-8">
      <DashboardSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* 1. Header & KPIs */}
      <div className={`shrink-0 ${preferences.density === 'compact' ? 'pt-4 pb-3' : 'pt-6 pb-4'}`}>
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-[34px] lg:text-[36px] font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1] mb-2">
              Visão Geral
            </h1>

            {preferences.showGreeting && (
              <div className="flex items-center gap-2.5 mt-2 animate-in fade-in slide-in-from-left-4">
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

          <div className="flex gap-3 lg:gap-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="h-11 px-5 rounded-[20px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 font-bold text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:bg-white/60 dark:hover:bg-white/10 transition-all shadow-sm hover:shadow-md"
            >
              <Settings2 className="w-4 h-4" />
              Configurar
            </button>
            <button
              onClick={handleNewAttendance}
              className="h-11 px-6 rounded-[20px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20 hover:shadow-xl"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              Novo Atendimento
            </button>
          </div>
        </div>

        {/* KPI Grid - Now using @dnd-kit for Apple HIG compliance */}
        <KpiGrid
          items={renderableKpiCards}
          onReorder={handleKpiReorder}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        />
      </div>

      {/* 2. Priority Insight Row */}
      {preferences.showAlertRow && (
        <div
          className={`shrink-0 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200 ${preferences.density === 'compact' ? 'mt-5 mb-3' : 'mt-8 mb-6'}`}
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
            <button
              className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/5 transition-colors text-slate-400"
              aria-label="Filtrar alertas"
              title="Filtrar alertas"
            >
              <Filter className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-3">
              Fluxo em Tempo Real
            </div>
          </div>
        </div>
      )}

      {/* 3. Kanban Board - Now using @dnd-kit for Apple HIG compliance */}
      <div
        className={`flex-1 overflow-x-auto overflow-y-hidden min-h-0 ${preferences.density === 'compact' ? 'pb-4 mt-3' : 'pb-6 mt-6'}`}
      >
        <KanbanBoard
          tasks={tasks}
          columns={kanbanColumnsArray.filter((col) =>
            preferences.visibleKanbanColumns.includes(col.id)
          )}
          onTaskMove={handleTaskMove}
          onTaskReorder={handleTaskReorder}
          onNewTask={handleNewAttendance}
          density={preferences.density}
        />
      </div>
    </div>
  );
}
