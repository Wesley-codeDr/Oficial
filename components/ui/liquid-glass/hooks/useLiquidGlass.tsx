'use client';

import * as React from 'react';
import type {
  LiquidGlassAccessibility,
  LiquidGlassContextValue,
  GlassIntensity,
  ControlShape,
} from '../types';
import { DEFAULTS, prefersReducedMotion, prefersReducedTransparency } from '../constants';

// ============================================
// CONTEXT
// ============================================

const LiquidGlassContext = React.createContext<LiquidGlassContextValue | null>(null);

// ============================================
// PROVIDER
// ============================================

export interface LiquidGlassProviderProps {
  children: React.ReactNode;
  /** Override default intensity */
  defaultIntensity?: GlassIntensity;
  /** Override default shape */
  defaultShape?: ControlShape;
  /** Force disable all effects */
  forceDisabled?: boolean;
}

/**
 * LiquidGlassProvider - Context provider for Liquid Glass settings
 *
 * @example
 * ```tsx
 * <LiquidGlassProvider defaultIntensity="strong">
 *   <App />
 * </LiquidGlassProvider>
 * ```
 */
export function LiquidGlassProvider({
  children,
  defaultIntensity = DEFAULTS.glassIntensity,
  defaultShape = DEFAULTS.controlShape,
  forceDisabled = false,
}: LiquidGlassProviderProps) {
  const [accessibility, setAccessibility] = React.useState<LiquidGlassAccessibility>({
    reduceTransparency: false,
    reduceMotion: false,
    increaseContrast: false,
    useFallback: forceDisabled,
  });

  // Detect system preferences
  React.useEffect(() => {
    const updatePreferences = () => {
      setAccessibility((prev) => ({
        ...prev,
        reduceMotion: prefersReducedMotion(),
        reduceTransparency: prefersReducedTransparency(),
        useFallback: forceDisabled || prefersReducedTransparency(),
      }));
    };

    updatePreferences();

    // Listen for changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const transparencyQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setAccessibility((prev) => ({ ...prev, reduceMotion: e.matches }));
    };

    const handleTransparencyChange = (e: MediaQueryListEvent) => {
      setAccessibility((prev) => ({
        ...prev,
        reduceTransparency: e.matches,
        useFallback: forceDisabled || e.matches,
      }));
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setAccessibility((prev) => ({ ...prev, increaseContrast: e.matches }));
    };

    motionQuery.addEventListener('change', handleMotionChange);
    transparencyQuery.addEventListener('change', handleTransparencyChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      transparencyQuery.removeEventListener('change', handleTransparencyChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, [forceDisabled]);

  const updateAccessibility = React.useCallback(
    (settings: Partial<LiquidGlassAccessibility>) => {
      setAccessibility((prev) => ({ ...prev, ...settings }));
    },
    []
  );

  // Check if Liquid Glass is supported (modern browsers with backdrop-filter)
  const isSupported = React.useMemo(() => {
    if (typeof window === 'undefined') return true;
    return CSS.supports('backdrop-filter', 'blur(1px)');
  }, []);

  const value: LiquidGlassContextValue = React.useMemo(
    () => ({
      accessibility,
      isSupported: isSupported && !forceDisabled,
      defaultIntensity,
      defaultShape,
      updateAccessibility,
    }),
    [accessibility, isSupported, forceDisabled, defaultIntensity, defaultShape, updateAccessibility]
  );

  return (
    <LiquidGlassContext.Provider value={value}>
      {children}
    </LiquidGlassContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

/**
 * useLiquidGlass - Access Liquid Glass context
 *
 * @example
 * ```tsx
 * const { accessibility, isSupported } = useLiquidGlass();
 * ```
 */
export function useLiquidGlass(): LiquidGlassContextValue {
  const context = React.useContext(LiquidGlassContext);

  if (!context) {
    // Return default values if used outside provider
    return {
      accessibility: {
        reduceTransparency: false,
        reduceMotion: false,
        increaseContrast: false,
        useFallback: false,
      },
      isSupported: true,
      defaultIntensity: DEFAULTS.glassIntensity,
      defaultShape: DEFAULTS.controlShape,
      updateAccessibility: () => {},
    };
  }

  return context;
}

// ============================================
// REDUCED MOTION HOOK
// ============================================

/**
 * useReducedMotion - Check if reduced motion is preferred
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 * ```
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

// ============================================
// REDUCED TRANSPARENCY HOOK
// ============================================

/**
 * useReducedTransparency - Check if reduced transparency is preferred
 *
 * @example
 * ```tsx
 * const prefersReducedTransparency = useReducedTransparency();
 * ```
 */
export function useReducedTransparency(): boolean {
  const [reducedTransparency, setReducedTransparency] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');
    setReducedTransparency(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedTransparency(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedTransparency;
}

// ============================================
// GLASS EFFECT STYLES HOOK
// ============================================

/**
 * useGlassEffectStyles - Get CSS properties for glass effects
 *
 * @example
 * ```tsx
 * const styles = useGlassEffectStyles({ variant: 'regular', intensity: 'medium' });
 * ```
 */
export function useGlassEffectStyles(config?: {
  variant?: 'regular' | 'clear' | 'prominent' | 'tinted';
  intensity?: GlassIntensity;
  tintColor?: string;
}): React.CSSProperties {
  const { accessibility } = useLiquidGlass();

  return React.useMemo(() => {
    const { variant = 'regular', intensity = 'medium', tintColor } = config || {};

    // Use fallback if accessibility requires
    if (accessibility.useFallback) {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      };
    }

    const blurValues: Record<GlassIntensity, number> = {
      subtle: 12,
      medium: 20,
      strong: 40,
    };

    const opacityValues: Record<string, number> = {
      regular: 0.72,
      clear: 0.25,
      prominent: 0.88,
      tinted: 0.65,
    };

    const styles: React.CSSProperties = {
      backdropFilter: `blur(${blurValues[intensity]}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blurValues[intensity]}px) saturate(180%)`,
    };

    if (tintColor && variant === 'tinted') {
      (styles as Record<string, unknown>)['--glass-tint'] = tintColor;
    }

    return styles;
  }, [config, accessibility.useFallback]);
}

export default useLiquidGlass;
