'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import type { UIPatient } from '@/types/frontend';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/lib/contexts/sidebar-context';
import {
  SharedLayoutGrid,
  SharedLayoutBackground,
  SharedSidebarColumn,
} from './shared-layout';

interface AppShellProps {
  children: React.ReactNode;
  showHeader?: boolean;
  className?: string;
}

// Default patient state
const defaultPatient: UIPatient = {
  id: '',
  age: '',
  gender: 'M',
  category: 'adult',
  isPregnant: false,
  phoneNumber: '',
  allergies: [],
  medications: [],
  specialConditions: [],
  entryTime: new Date().toISOString(),
  status: 'in_progress'
};

export function AppShell({ children, showHeader = true, className }: AppShellProps) {
  const [patient, setPatient] = useState<UIPatient>(defaultPatient);

  return (
    <SidebarProvider>
      {/* Default gradient background using shared primitive */}
      <SharedLayoutBackground variant="default" />

      {/* CSS Grid Layout using shared primitive */}
      <SharedLayoutGrid>
        {/* Sidebar Column using shared primitive */}
        <SharedSidebarColumn>
          <Sidebar />
        </SharedSidebarColumn>

        {/* Main Content Area - Apple HIG safe areas */}
        <div className={cn(
          'flex flex-col h-full min-w-0 w-full relative overflow-hidden z-0',
          'safe-area-right' // iPad multitasking support
        )}>
          {showHeader && (
            <div className={cn(
              'px-6 pt-6 shrink-0 z-20',
              'safe-area-top' // Respect notch/Dynamic Island
            )}>
              <Header patient={patient} setPatient={setPatient} />
            </div>
          )}

          {/* Content - respects home indicator */}
          <main className={cn(
            'flex-1 overflow-hidden px-6 pb-6 relative',
            'safe-area-bottom', // Respect home indicator
            className
          )}>
            {children}
          </main>
        </div>
      </SharedLayoutGrid>
    </SidebarProvider>
  );
}

// Export context for patient state if needed in child components
export const PatientContext = React.createContext<{
  patient: UIPatient;
  setPatient: React.Dispatch<React.SetStateAction<UIPatient>>;
} | null>(null);

export function usePatient() {
  const context = React.useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within AppShell');
  }
  return context;
}

// Alternative version with patient context
export function AppShellWithPatient({ children, showHeader = true, className }: AppShellProps) {
  const [patient, setPatient] = useState<UIPatient>(defaultPatient);

  return (
    <SidebarProvider>
      <PatientContext.Provider value={{ patient, setPatient }}>
        {/* Default gradient background using shared primitive */}
        <SharedLayoutBackground variant="default" />

        {/* CSS Grid Layout using shared primitive */}
        <SharedLayoutGrid>
          {/* Sidebar Column using shared primitive */}
          <SharedSidebarColumn>
            <Sidebar />
          </SharedSidebarColumn>

          {/* Main Content Area - Apple HIG safe areas */}
          <div className={cn(
            'flex flex-col h-full min-w-0 w-full relative overflow-hidden z-0',
            'safe-area-right' // iPad multitasking support
          )}>
            {showHeader && (
              <div className={cn(
                'px-6 pt-6 shrink-0 z-20',
                'safe-area-top' // Respect notch/Dynamic Island
              )}>
                <Header patient={patient} setPatient={setPatient} />
              </div>
            )}

            {/* Content - respects home indicator */}
            <main className={cn(
              'flex-1 overflow-hidden px-6 pb-6 relative',
              'safe-area-bottom', // Respect home indicator
              className
            )}>
              {children}
            </main>
          </div>
        </SharedLayoutGrid>
      </PatientContext.Provider>
    </SidebarProvider>
  );
}
