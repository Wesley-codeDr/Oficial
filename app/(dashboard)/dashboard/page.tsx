'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Brain, Wind, Activity as ActivityIcon, Plus, Zap, Stethoscope, Thermometer } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import {
  HeartRateCard,
  BloodPressureCard,
  PatientsWaitingCard,
  AverageWaitTimeCard,
  AlertsCard,
  AttendedTodayCard,
} from '@/components/dashboard/cards';
import { syndromes as syndromesData, syndromeColorMap } from '@/lib/medical/syndromes';

const iconMap: Record<string, typeof Heart> = {
  Heart: Heart,
  Brain: Brain,
  Wind: Wind,
  Zap: Zap,
  Stethoscope: Stethoscope,
  Thermometer: Thermometer,
  activity: ActivityIcon,
};

interface DBSyndrome {
  id: string;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  _count: { checkboxes: number };
}

export default function DashboardPage() {
  const [dbSyndromes, setDbSyndromes] = useState<DBSyndrome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSyndromes() {
      try {
        const res = await fetch('/api/syndromes');
        if (res.ok) {
          const data = await res.json();
          setDbSyndromes(data);
        }
      } catch (error) {
        console.error('Failed to fetch syndromes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSyndromes();
  }, []);

  // Merge DB syndromes with local UI data for colors/icons
  const displaySyndromes = dbSyndromes.length > 0
    ? dbSyndromes
    : syndromesData.slice(0, 6).map(s => ({
        id: s.id,
        code: s.id,
        name: s.label,
        description: `Protocolo para ${s.label.toLowerCase()}`,
        icon: s.icon,
        _count: { checkboxes: 0 }
      }));

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Visão Geral
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Acompanhe métricas e inicie uma nova anamnese.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PatientsWaitingCard count={12} />
        <AverageWaitTimeCard minutes={32} />
        <AlertsCard count={3} />
        <AttendedTodayCard count={28} />
      </div>

      {/* Health Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HeartRateCard />
        <BloodPressureCard systolic={120} diastolic={80} avgSystolic={118} avgDiastolic={78} />
      </div>

      {/* Syndromes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Nova Anamnese
          </h2>
          <Link
            href="/queixa"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ver todas as queixas →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GlassCard key={i} className="h-40 animate-pulse">
                <div className="p-6 flex flex-col items-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="w-32 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displaySyndromes.map((syndrome) => {
              const localSyndrome = syndromesData.find(s =>
                s.id === syndrome.code || s.id === syndrome.id || s.label === syndrome.name
              );
              const iconName = localSyndrome?.icon || syndrome.icon || 'activity';
              const IconComponent = iconMap[iconName] || ActivityIcon;
              const colorKey = localSyndrome?.color || 'blue';
              const colors = syndromeColorMap[colorKey] ?? {
                bg: 'bg-blue-50 dark:bg-blue-900/20',
                text: 'text-blue-600 dark:text-blue-400',
                border: 'border-blue-200 dark:border-blue-800',
              };

              return (
                <Link key={syndrome.id} href={`/anamnese/${syndrome.code.toLowerCase()}`}>
                  <GlassCard className="group h-full cursor-pointer p-6 transition-all hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${colors.bg}`}>
                        <IconComponent className={`h-7 w-7 ${colors.text}`} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{syndrome.name}</h3>
                        {syndrome.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                            {syndrome.description}
                          </p>
                        )}
                      </div>
                      {syndrome._count.checkboxes > 0 && (
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          {syndrome._count.checkboxes} itens de avaliação
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && displaySyndromes.length === 0 && (
          <GlassCard className="p-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Plus className="h-8 w-8 text-slate-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Nenhuma síndrome disponível
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Execute o seed do banco de dados para adicionar as síndromes iniciais.
                </p>
              </div>
              <code className="inline-block rounded bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm">
                pnpm db:seed
              </code>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
