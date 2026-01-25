'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { glassTokens } from '@/lib/design-system/glass-tokens';

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Theme options for the glass design system
 */
export type GlassTheme = 'light' | 'dark' | 'system';

/**
 * Resolved theme after system preference is applied
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * User accessibility preferences detected from system settings
 */
export interface AccessibilityPreferences {
  /** User prefers reduced motion (prefers-reduced-motion: reduce) */
  prefersReducedMotion: boolean;
  /** User prefers reduced transparency (prefers-reduced-transparency: reduce) */
  prefersReducedTransparency: boolean;
  /** User prefers high contrast (prefers-contrast: more) */
  prefersHighContrast: boolean;
}

/**
 * Context value provided by GlassTokenProvider
 */
export interface GlassTokenContextValue {
  /** Current theme setting (light, dark, or system) */
  theme: GlassTheme;
  /** Resolved theme after applying system preference */
  resolvedTheme: ResolvedTheme;
  /** Accessibility preferences from system */
  preferences: AccessibilityPreferences;
  /** Glass design tokens */
  tokens: typeof glassTokens;
  /** Function to update theme */
  setTheme: (theme: GlassTheme) => void;
  /** Whether emergency mode is active (reduces glass effects for clarity) */
  emergencyMode: boolean;
  /** Function to toggle emergency mode */
  setEmergencyMode: (enabled: boolean) => void;
}

/**
 * Props for GlassTokenProvider component
 */
export interface GlassTokenProviderProps {
  /** Child components */
  children: ReactNode;
  /** Default theme setting */
  defaultTheme?: GlassTheme;
  /** Storage key for persisting theme preference */
  storageKey?: string;
  /** Initial emergency mode state */
  defaultEmergencyMode?: boolean;
}

// ============================================
// CONTEXT CREATION
// ============================================

const GlassTokenContext = createContext<GlassTokenContextValue | null>(null);

// ============================================
// MEDIA QUERY HOOKS
// ============================================

/**
 * Hook to detect and subscribe to a media query
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Subscribe to changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// ============================================
// PROVIDER COMPONENT
// ============================================

/**
 * GlassTokenProvider - Context provider for Apple Liquid Glass 2026 design system
 *
 * Provides:
 * - Theme state management (light/dark/system)
 * - System preference detection (prefers-color-scheme)
 * - Accessibility preference detection (reduced-motion, reduced-transparency, high-contrast)
 * - Glass design tokens access
 * - Emergency mode toggle for healthcare scenarios
 *
 * @example
 * ```tsx
 * <GlassTokenProvider defaultTheme="system">
 *   <App />
 * </GlassTokenProvider>
 * ```
 */
export function GlassTokenProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'wellwave-glass-theme',
  defaultEmergencyMode = false,
}: GlassTokenProviderProps): React.ReactElement {
  // ----------------------------------------
  // Theme State
  // ----------------------------------------
  const [theme, setThemeState] = useState<GlassTheme>(() => {
    // Check for stored preference on client side
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    }
    return defaultTheme;
  });

  // ----------------------------------------
  // Emergency Mode State
  // ----------------------------------------
  const [emergencyMode, setEmergencyMode] = useState<boolean>(defaultEmergencyMode);

  // ----------------------------------------
  // System Preferences Detection
  // ----------------------------------------

  // Detect system color scheme preference
  const prefersColorSchemeDark = useMediaQuery('(prefers-color-scheme: dark)');

  // Detect accessibility preferences
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const prefersReducedTransparency = useMediaQuery('(prefers-reduced-transparency: reduce)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: more)');

  // ----------------------------------------
  // Resolved Theme
  // ----------------------------------------
  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return prefersColorSchemeDark ? 'dark' : 'light';
    }
    return theme;
  }, [theme, prefersColorSchemeDark]);

  // ----------------------------------------
  // Theme Setter with Persistence
  // ----------------------------------------
  const setTheme = useCallback((newTheme: GlassTheme) => {
    setThemeState(newTheme);

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  }, [storageKey]);

  // ----------------------------------------
  // Apply Theme to Document
  // ----------------------------------------
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add resolved theme class
    root.classList.add(resolvedTheme);

    // Set data attribute for CSS selectors
    root.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // ----------------------------------------
  // Apply Emergency Mode to Document
  // ----------------------------------------
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;

    if (emergencyMode) {
      root.classList.add('emergency-mode');
      root.setAttribute('data-emergency-mode', 'true');
    } else {
      root.classList.remove('emergency-mode');
      root.setAttribute('data-emergency-mode', 'false');
    }
  }, [emergencyMode]);

  // ----------------------------------------
  // Memoized Context Value
  // ----------------------------------------
  const contextValue = useMemo<GlassTokenContextValue>(() => ({
    theme,
    resolvedTheme,
    preferences: {
      prefersReducedMotion,
      prefersReducedTransparency,
      prefersHighContrast,
    },
    tokens: glassTokens,
    setTheme,
    emergencyMode,
    setEmergencyMode,
  }), [
    theme,
    resolvedTheme,
    prefersReducedMotion,
    prefersReducedTransparency,
    prefersHighContrast,
    setTheme,
    emergencyMode,
  ]);

  return (
    <GlassTokenContext.Provider value={contextValue}>
      {children}
    </GlassTokenContext.Provider>
  );
}

// ============================================
// CONTEXT CONSUMER HOOK
// ============================================

/**
 * Hook to access GlassTokenProvider context
 *
 * @throws Error if used outside of GlassTokenProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, resolvedTheme, preferences, tokens, setTheme } = useGlassTokenContext();
 *
 *   return (
 *     <button onClick={() => setTheme('dark')}>
 *       Current theme: {resolvedTheme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useGlassTokenContext(): GlassTokenContextValue {
  const context = useContext(GlassTokenContext);

  if (context === null) {
    throw new Error(
      'useGlassTokenContext must be used within a GlassTokenProvider. ' +
      'Wrap your application or component tree with <GlassTokenProvider>.'
    );
  }

  return context;
}

export default GlassTokenProvider;
