'use client';

import React, { useState } from 'react';
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, Info, AlertCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStructuredReferences } from '@/lib/medical/references';
import type { ReferenceItem } from '@/types/frontend';

interface ReferencePanelProps {
  syndromeId: string | null;
  className?: string;
  variant?: 'sidebar' | 'inline' | 'modal';
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

function ReferenceCard({ reference }: { reference: ReferenceItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = () => {
    switch (reference.type) {
      case 'guideline':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'trial':
        return <Info className="w-4 h-4 text-green-500" />;
      case 'review':
        return <BookOpen className="w-4 h-4 text-purple-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (reference.type) {
      case 'guideline':
        return 'Guideline';
      case 'trial':
        return 'Estudo Clínico';
      case 'review':
        return 'Revisão';
      default:
        return 'Referência';
    }
  };

  const getLevelColor = () => {
    switch (reference.level) {
      case 'A':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'B':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'C':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-white/50 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-start gap-3 text-left hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
      >
        <div className="mt-0.5">{getTypeIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {getTypeLabel()}
            </span>
            {reference.level && (
              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getLevelColor())}>
                Nível {reference.level}
              </span>
            )}
          </div>
          <h4 className="font-medium text-sm text-slate-800 dark:text-slate-200 mt-1 line-clamp-2">
            {reference.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {reference.source} {reference.year && `(${reference.year})`}
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 pt-0 border-t border-slate-100 dark:border-slate-700">
          {reference.summary && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              {reference.summary}
            </p>
          )}
          {reference.keyPoints && reference.keyPoints.length > 0 && (
            <ul className="mt-2 space-y-1">
              {reference.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="text-blue-500 mt-1">•</span>
                  {point}
                </li>
              ))}
            </ul>
          )}
          {reference.url && (
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Acessar fonte original
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function ReferencePanel({
  syndromeId,
  className,
  variant = 'sidebar',
  isCollapsed = false,
  onToggleCollapse
}: ReferencePanelProps) {
  const references = getStructuredReferences(syndromeId);

  if (variant === 'inline') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Referências EBM
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            {references.length}
          </span>
        </div>

        {references.length === 0 ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-500">
            <Info className="w-5 h-5" />
            <p className="text-sm">
              Selecione uma síndrome para ver referências relevantes.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {references.map((ref, idx) => (
              <ReferenceCard key={idx} reference={ref} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Sidebar variant (default)
  return (
    <div
      className={cn(
        'bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-slate-700 overflow-hidden transition-all',
        isCollapsed ? 'w-12' : 'w-80',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/30 dark:border-slate-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-slate-800 dark:text-white">
              Referências
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {references.length}
            </span>
          </div>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-auto">
          {references.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500">
              <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">
                Nenhuma referência disponível para esta síndrome.
              </p>
            </div>
          ) : (
            references.map((ref, idx) => (
              <ReferenceCard key={idx} reference={ref} />
            ))
          )}
        </div>
      )}

      {/* Footer - Quick Stats */}
      {!isCollapsed && references.length > 0 && (
        <div className="p-3 border-t border-white/30 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-around text-xs">
            <div className="text-center">
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                {references.filter(r => r.type === 'guideline').length}
              </p>
              <p className="text-slate-500">Guidelines</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                {references.filter(r => r.type === 'trial').length}
              </p>
              <p className="text-slate-500">Estudos</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                {references.filter(r => r.level === 'A').length}
              </p>
              <p className="text-slate-500">Nível A</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact inline reference badge
export function ReferenceBadge({
  syndromeId,
  className
}: {
  syndromeId: string | null;
  className?: string;
}) {
  const references = getStructuredReferences(syndromeId);
  const guidelines = references.filter(r => r.type === 'guideline');

  if (guidelines.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
      <span className="text-xs text-slate-600 dark:text-slate-400">
        {guidelines.length} guideline{guidelines.length > 1 ? 's' : ''} disponível{guidelines.length > 1 ? 'is' : ''}
      </span>
    </div>
  );
}
