'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import type { UIPatient } from '@/types/frontend';
import { cn } from '@/lib/utils';

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
  entryTime: new Date().toISOString(),
  status: 'in_progress'
};

export function AppShell({ children, showHeader = true, className }: AppShellProps) {
  const [patient, setPatient] = useState<UIPatient>(defaultPatient);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-500">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden z-0">
        {showHeader && (
          <div className="px-6 pt-6 shrink-0 z-20">
            <Header patient={patient} setPatient={setPatient} />
          </div>
        )}

        {/* Content */}
        <main className={cn(
          'flex-1 overflow-hidden px-6 pb-6 relative',
          className
        )}>
          {children}
        </main>
      </div>
    </div>
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
    <PatientContext.Provider value={{ patient, setPatient }}>
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-500">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden z-0">
          {showHeader && (
            <div className="px-6 pt-6 shrink-0 z-20">
              <Header patient={patient} setPatient={setPatient} />
            </div>
          )}

          {/* Content */}
          <main className={cn(
            'flex-1 overflow-hidden px-6 pb-6 relative',
            className
          )}>
            {children}
          </main>
        </div>
      </div>
    </PatientContext.Provider>
  );
}
