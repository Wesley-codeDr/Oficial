'use client';

import React from 'react';
import { SidebarProvider } from '@/lib/contexts/sidebar-context';
import { cn } from '@/lib/utils';

interface SharedLayoutGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared CSS Grid layout primitive for sidebar-based pages.
 * 
 * This is the single source of truth for:
 * - CSS Grid structure with sidebar column
 * - --sidebar-w CSS variable integration
 * - Base styling and transitions
 * 
 * Used by DashboardLayout and AppShell to prevent drift.
 */
export function SharedLayoutGrid({ children, className }: SharedLayoutGridProps) {
  return (
    <div 
      className={cn(
        'grid h-screen w-full overflow-hidden',
        'text-slate-800 dark:text-slate-100 font-sans',
        'transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]',
        className
      )}
      style={{
        gridTemplateColumns: 'var(--sidebar-w, 256px) 1fr',
      }}
    >
      {children}
    </div>
  );
}

interface SharedLayoutBackgroundProps {
  variant?: 'default' | 'apple2025';
}

/**
 * Shared background component for sidebar-based pages.
 * 
 * @param variant - 'default' for simple gradient, 'apple2025' for animated orbs
 */
export function SharedLayoutBackground({ variant = 'default' }: SharedLayoutBackgroundProps) {
  if (variant === 'apple2025') {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-[#0a0a0a] dark:via-[#0d0d0f] dark:to-[#0a0a0a]" />
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-ios-blue/10 to-ios-purple/10 rounded-full blur-3xl opacity-50 dark:opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-ios-teal/10 to-ios-green/10 rounded-full blur-3xl opacity-50 dark:opacity-30" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
  );
}

interface SharedSidebarColumnProps {
  children: React.ReactNode;
}

/**
 * Sidebar column wrapper that reserves grid space while sidebar is fixed.
 */
export function SharedSidebarColumn({ children }: SharedSidebarColumnProps) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}

interface SharedMainContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main content column wrapper with proper overflow handling.
 */
export function SharedMainContent({ children, className }: SharedMainContentProps) {
  return (
    <main className={cn(
      'flex flex-col h-full min-w-0 w-full relative overflow-hidden z-0',
      className
    )}>
      {children}
    </main>
  );
}

/**
 * Full layout wrapper combining SidebarProvider with SharedLayoutGrid.
 * Use this for simpler cases where you don't need custom content structure.
 */
export function SharedLayout({ 
  children, 
  backgroundVariant = 'default',
  className 
}: { 
  children: React.ReactNode;
  backgroundVariant?: 'default' | 'apple2025';
  className?: string;
}) {
  return (
    <SidebarProvider>
      <SharedLayoutBackground variant={backgroundVariant} />
      <SharedLayoutGrid className={className}>
        {children}
      </SharedLayoutGrid>
    </SidebarProvider>
  );
}

