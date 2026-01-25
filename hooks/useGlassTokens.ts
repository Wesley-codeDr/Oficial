'use client';

import { useContext, createContext } from 'react';
import type { GlassTokenContextValue } from '@/components/ui/glass/GlassTokenProvider';

// Re-export types for convenience
export type {
  GlassTheme,
  ResolvedTheme,
  AccessibilityPreferences,
  GlassTokenContextValue,
} from '@/components/ui/glass/GlassTokenProvider';

/**
 * Internal context reference - this should match the context from GlassTokenProvider
 * We import it from the provider to ensure consistency
 */
import { useGlassTokenContext } from '@/components/ui/glass/GlassTokenProvider';

/**
 * useGlassTokens - Hook for consuming GlassTokenProvider context
 *
 * Provides access to:
 * - Current theme (light/dark/system)
 * - Resolved theme (light/dark after system preference applied)
 * - Accessibility preferences (reduced motion, transparency, high contrast)
 * - Glass design tokens
 * - Theme setter function
 * - Emergency mode state and toggle
 *
 * @throws Error if used outside of GlassTokenProvider
 *
 * @example
 * ```tsx
 * function ThemeSwitcher() {
 *   const { theme, resolvedTheme, setTheme } = useGlassTokens();
 *
 *   return (
 *     <select
 *       value={theme}
 *       onChange={(e) => setTheme(e.target.value as GlassTheme)}
 *     >
 *       <option value="light">Light</option>
 *       <option value="dark">Dark</option>
 *       <option value="system">System</option>
 *     </select>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function AnimatedCard() {
 *   const { preferences, tokens } = useGlassTokens();
 *
 *   // Disable animations if user prefers reduced motion
 *   const animationDuration = preferences.prefersReducedMotion
 *     ? 0
 *     : 300;
 *
 *   return (
 *     <div
 *       style={{
 *         transition: `all ${animationDuration}ms`,
 *         borderRadius: tokens.radiusPx.lg
 *       }}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function GlassComponent() {
 *   const { preferences, emergencyMode } = useGlassTokens();
 *
 *   // Use solid backgrounds in emergency mode or when reduced transparency is preferred
 *   const useSolidBackground = emergencyMode || preferences.prefersReducedTransparency;
 *
 *   return (
 *     <div className={useSolidBackground ? 'bg-white' : 'bg-white/25 backdrop-blur-xl'}>
 *       Critical Information
 *     </div>
 *   );
 * }
 * ```
 */
export function useGlassTokens(): GlassTokenContextValue {
  return useGlassTokenContext();
}

export default useGlassTokens;
