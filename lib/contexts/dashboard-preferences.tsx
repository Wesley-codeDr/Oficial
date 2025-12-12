'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

export interface DashboardPreferences {
  visibleKpiCards: string[];
  kpiOrder: string[];
  visibleKanbanColumns: string[];
  showGreeting: boolean;
  showAlertRow: boolean;
  density: 'default' | 'compact';
}

interface DashboardPreferencesContextType {
  preferences: DashboardPreferences;
  updatePreferences: (newPrefs: Partial<DashboardPreferences>) => void;
  resetPreferences: () => void;
  toggleKpiCard: (cardId: string) => void;
  toggleKanbanColumn: (columnId: string) => void;
  reorderKpiCards: (newOrder: string[]) => void;
}

// ============================================
// DEFAULTS
// ============================================

const DEFAULT_PREFERENCES: DashboardPreferences = {
  visibleKpiCards: ['thoracic', 'patients', 'revals', 'ecg'],
  kpiOrder: ['thoracic', 'patients', 'revals', 'ecg'],
  visibleKanbanColumns: ['exam', 'wait', 'reval', 'done'],
  showGreeting: true,
  showAlertRow: true,
  density: 'default',
};

const STORAGE_KEY = 'wellwave.dashboardPrefs';

// ============================================
// CONTEXT
// ============================================

const DashboardPreferencesContext = createContext<DashboardPreferencesContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export const DashboardPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<DashboardPreferences>(DEFAULT_PREFERENCES);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch (e) {
        console.error('Failed to load dashboard preferences', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save preferences to localStorage whenever they change
  const savePreferences = useCallback((newPrefs: DashboardPreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    } catch (e) {
      console.error('Failed to save dashboard preferences', e);
    }
  }, []);

  // Update preferences
  const updatePreferences = useCallback((newPrefs: Partial<DashboardPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      savePreferences(updated);
      return updated;
    });
  }, [savePreferences]);

  // Reset to defaults
  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    savePreferences(DEFAULT_PREFERENCES);
  }, [savePreferences]);

  // Toggle a KPI card visibility
  const toggleKpiCard = useCallback((cardId: string) => {
    setPreferences((prev) => {
      const isVisible = prev.visibleKpiCards.includes(cardId);
      const visibleKpiCards = isVisible
        ? prev.visibleKpiCards.filter((id) => id !== cardId)
        : [...prev.visibleKpiCards, cardId];

      const updated = { ...prev, visibleKpiCards };
      savePreferences(updated);
      return updated;
    });
  }, [savePreferences]);

  // Toggle a Kanban column visibility
  const toggleKanbanColumn = useCallback((columnId: string) => {
    setPreferences((prev) => {
      const isVisible = prev.visibleKanbanColumns.includes(columnId);
      const visibleKanbanColumns = isVisible
        ? prev.visibleKanbanColumns.filter((id) => id !== columnId)
        : [...prev.visibleKanbanColumns, columnId];

      const updated = { ...prev, visibleKanbanColumns };
      savePreferences(updated);
      return updated;
    });
  }, [savePreferences]);

  // Reorder KPI cards
  const reorderKpiCards = useCallback((newOrder: string[]) => {
    setPreferences((prev) => {
      const updated = { ...prev, kpiOrder: newOrder };
      savePreferences(updated);
      return updated;
    });
  }, [savePreferences]);

  // Don't render children until hydrated to avoid mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <DashboardPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
        toggleKpiCard,
        toggleKanbanColumn,
        reorderKpiCards,
      }}
    >
      {children}
    </DashboardPreferencesContext.Provider>
  );
};

// ============================================
// HOOK
// ============================================

export const useDashboardPreferences = () => {
  const context = useContext(DashboardPreferencesContext);
  if (!context) {
    throw new Error('useDashboardPreferences must be used within a DashboardPreferencesProvider');
  }
  return context;
};

// ============================================
// EXPORTS
// ============================================

export { DEFAULT_PREFERENCES };
