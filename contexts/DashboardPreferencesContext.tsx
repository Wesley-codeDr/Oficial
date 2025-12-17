'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardPreferences } from '@/lib/types/medical';

const DEFAULT_PREFERENCES: DashboardPreferences = {
  visibleKpiCards: ['thoracic', 'patients', 'revals', 'ecg'],
  kpiOrder: ['thoracic', 'patients', 'revals', 'ecg'],
  visibleKanbanColumns: ['exam', 'wait', 'reval', 'done'],
  showGreeting: true,
  showAlertRow: true,
  density: 'default',
};

interface DashboardPreferencesContextType {
  preferences: DashboardPreferences;
  updatePreferences: (newPrefs: Partial<DashboardPreferences>) => void;
  resetPreferences: () => void;
}

const DashboardPreferencesContext = createContext<DashboardPreferencesContextType | undefined>(undefined);

export const DashboardPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<DashboardPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = localStorage.getItem('wellwave.dashboardPrefs');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch (e) {
        console.error("Failed to load dashboard preferences", e);
      }
    }
  }, []);

  const updatePreferences = (newPrefs: Partial<DashboardPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('wellwave.dashboardPrefs', JSON.stringify(updated));
      return updated;
    });
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.setItem('wellwave.dashboardPrefs', JSON.stringify(DEFAULT_PREFERENCES));
  };

  return (
    <DashboardPreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </DashboardPreferencesContext.Provider>
  );
};

export const useDashboardPreferences = () => {
  const context = useContext(DashboardPreferencesContext);
  if (!context) {
    throw new Error('useDashboardPreferences must be used within a DashboardPreferencesProvider');
  }
  return context;
};
