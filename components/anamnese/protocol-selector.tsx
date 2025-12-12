'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Heart, Brain, Wind, Activity, Stethoscope, Thermometer, AlertOctagon, Bone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { syndromes, syndromeColorMap } from '@/lib/medical/syndromes';
import type { SyndromeCard } from '@/types/frontend';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Brain,
  Wind,
  Activity,
  Stethoscope,
  Thermometer,
  AlertOctagon,
  Bone,
  Sparkles: Activity,
};

// Default color fallback
const defaultColors = {
  bg: 'bg-blue-50 dark:bg-blue-900/20',
  text: 'text-blue-600 dark:text-blue-400',
  border: 'border-blue-200 dark:border-blue-800',
};

function getColors(colorKey: string) {
  return syndromeColorMap[colorKey] ?? defaultColors;
}

interface ProtocolSelectorProps {
  currentProtocolId?: string;
  onSelect?: (protocolId: string) => void;
  className?: string;
  variant?: 'grid' | 'list' | 'compact';
}

export function ProtocolSelector({
  currentProtocolId,
  onSelect,
  className,
  variant = 'grid'
}: ProtocolSelectorProps) {
  const handleSelect = (protocol: SyndromeCard) => {
    if (onSelect) {
      onSelect(protocol.id);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {syndromes.map((protocol) => {
          const Icon = iconMap[protocol.icon] || Activity;
          const colors = getColors(protocol.color);
          const isActive = protocol.id === currentProtocolId;

          return (
            <Link
              key={protocol.id}
              href={`/anamnese/${protocol.id}`}
              onClick={() => handleSelect(protocol)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all',
                'border border-transparent',
                isActive
                  ? `${colors.bg} ${colors.text} ${colors.border}`
                  : 'bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80'
              )}
            >
              <Icon className="w-4 h-4" />
              {protocol.label}
            </Link>
          );
        })}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-2', className)}>
        {syndromes.map((protocol) => {
          const Icon = iconMap[protocol.icon] || Activity;
          const colors = getColors(protocol.color);
          const isActive = protocol.id === currentProtocolId;

          return (
            <Link
              key={protocol.id}
              href={`/anamnese/${protocol.id}`}
              onClick={() => handleSelect(protocol)}
              className={cn(
                'flex items-center justify-between p-3 rounded-xl transition-all',
                'border',
                isActive
                  ? `${colors.bg} ${colors.border}`
                  : 'bg-white/40 dark:bg-slate-800/40 border-white/50 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  isActive ? colors.bg : 'bg-slate-100 dark:bg-slate-700'
                )}>
                  <Icon className={cn('w-5 h-5', isActive ? colors.text : 'text-slate-500')} />
                </div>
                <div>
                  <p className={cn(
                    'font-medium',
                    isActive ? colors.text : 'text-slate-800 dark:text-slate-200'
                  )}>
                    {protocol.label}
                  </p>
                  {protocol.calculator && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {protocol.calculator}
                    </p>
                  )}
                </div>
              </div>
              <ChevronRight className={cn(
                'w-5 h-5',
                isActive ? colors.text : 'text-slate-400'
              )} />
            </Link>
          );
        })}
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3', className)}>
      {syndromes.map((protocol) => {
        const Icon = iconMap[protocol.icon] || Activity;
        const colors = getColors(protocol.color);
        const isActive = protocol.id === currentProtocolId;

        return (
          <Link
            key={protocol.id}
            href={`/anamnese/${protocol.id}`}
            onClick={() => handleSelect(protocol)}
            className={cn(
              'flex flex-col items-center p-4 rounded-2xl transition-all text-center',
              'border',
              isActive
                ? `${colors.bg} ${colors.border} scale-105`
                : 'bg-white/40 dark:bg-slate-800/40 border-white/50 dark:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:scale-102'
            )}
          >
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center mb-2',
              isActive ? colors.bg : 'bg-slate-100 dark:bg-slate-700'
            )}>
              <Icon className={cn('w-6 h-6', isActive ? colors.text : 'text-slate-500')} />
            </div>
            <p className={cn(
              'text-sm font-medium',
              isActive ? colors.text : 'text-slate-700 dark:text-slate-200'
            )}>
              {protocol.label}
            </p>
            {protocol.category === 'critical' && (
              <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                Crítico
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

// Quick protocol switch for header
export function QuickProtocolSwitch({
  currentProtocolId,
  className
}: {
  currentProtocolId?: string;
  className?: string;
}) {
  const current = syndromes.find(s => s.id === currentProtocolId);
  const Icon = current ? (iconMap[current.icon] || Activity) : Activity;
  const colors = current ? getColors(current.color) : defaultColors;

  return (
    <div className={cn('relative group', className)}>
      <button className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
        'bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-slate-700',
        'hover:bg-white/80 dark:hover:bg-slate-800/80'
      )}>
        <Icon className={cn('w-4 h-4', colors.text)} />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {current?.label || 'Selecionar Protocolo'}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-400 transition-transform group-hover:rotate-90" />
      </button>

      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-slate-700 shadow-xl p-2 max-h-80 overflow-auto">
          {syndromes.map((protocol) => {
            const PIcon = iconMap[protocol.icon] || Activity;
            const pColors = getColors(protocol.color);
            const isActive = protocol.id === currentProtocolId;

            return (
              <Link
                key={protocol.id}
                href={`/anamnese/${protocol.id}`}
                className={cn(
                  'flex items-center gap-3 p-2 rounded-xl transition-all',
                  isActive
                    ? pColors.bg
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                )}
              >
                <PIcon className={cn('w-4 h-4', pColors.text)} />
                <span className={cn(
                  'text-sm',
                  isActive ? pColors.text : 'text-slate-700 dark:text-slate-200'
                )}>
                  {protocol.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
