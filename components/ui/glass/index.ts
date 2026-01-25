/**
 * Glass Components - Apple Liquid Glass 2026 Design System
 *
 * This barrel export provides all glass components, hooks, and utilities
 * for the WellWave Liquid Glass design system implementation.
 *
 * @module components/ui/glass
 *
 * @example
 * ```tsx
 * import {
 *   GlassTokenProvider,
 *   useGlassTokens,
 *   GlassCard,
 *   GlassButton
 * } from '@/components/ui/glass';
 *
 * function App() {
 *   return (
 *     <GlassTokenProvider defaultTheme="system">
 *       <GlassCard variant="regular" specular>
 *         <GlassButton haptic="medium">Click me</GlassButton>
 *       </GlassCard>
 *     </GlassTokenProvider>
 *   );
 * }
 * ```
 */

// ============================================
// CONTEXT & PROVIDER
// ============================================

export {
  GlassTokenProvider,
  useGlassTokenContext,
  type GlassTheme,
  type ResolvedTheme,
  type AccessibilityPreferences,
  type GlassTokenContextValue,
  type GlassTokenProviderProps,
} from './GlassTokenProvider';

// ============================================
// HOOKS (Re-exported from hooks directory)
// ============================================

// These hooks are imported from the hooks directory for convenience
// They can also be imported directly from '@/hooks'

export {
  useGlassTokens,
  type GlassTokenContextValue as UseGlassTokensReturn,
} from '@/hooks/useGlassTokens';

export {
  useReducedMotion,
  getAnimationDuration,
  getMotionTransition,
} from '@/hooks/useReducedMotion';

export {
  useScrollPosition,
  checkScrollThresholds,
  calculateScrollProgress,
  type ScrollDirection,
  type ScrollPositionState,
  type UseScrollPositionOptions,
} from '@/hooks/useScrollPosition';

// ============================================
// DESIGN TOKENS (Re-exported from lib)
// ============================================

export {
  glassTokens,
  glassMaterial,
  glassRadius,
  glassRadiusPx,
  glassBlur,
  glassShadow,
  glassColors,
  glassTransition,
  glassStyles,
  glassFocusRing,
  glassPresets,
  appleLiquidGlassSpecs,
  appleSystemColors,
  scrollBehavior,
  refractionEffect,
  scrollEdgeEffect,
} from '@/lib/design-system/glass-tokens';

// ============================================
// CORE COMPONENT EXPORTS
// ============================================

// GlassCard Component
export { GlassCard } from './GlassCard';
export type {
  GlassCardProps,
  GlassMaterialVariant,
  HealthcareVariant,
  GlowColor,
  GlassCardSize,
} from './GlassCard';

// GlassButton Component
export { GlassButton } from './GlassButton';
export type { GlassButtonProps } from './GlassButton';

// GlassInput Component
export { GlassInput } from './GlassInput';
export type {
  GlassInputProps,
  GlassInputVariant,
  GlassInputState,
  GlassInputSize,
  GlassInputLabelPosition,
} from './GlassInput';

// ============================================
// FUTURE COMPONENT EXPORTS (Phase 3)
// ============================================

// Note: These will be added as Phase 3 tasks are completed
// Each component will be exported here after being created/updated

// export { GlassCheckbox } from './GlassCheckbox';
// export { GlassSelect } from './GlassSelect';
// export { GlassSheet } from './GlassSheet';
// export { GlassModal } from './GlassModal';
// export { GlassDialog } from './GlassDialog';
// export { GlassSlider } from './GlassSlider';
// export { GlassNotification } from './GlassNotification';
// export { GlassBadge } from './GlassBadge';

// ============================================
// FUTURE COMPONENT EXPORTS (Phase 4)
// ============================================

// export { GlassNavigation } from './GlassNavigation';
// export { GlassTooltip } from './GlassTooltip';
// export { GlassAccordion } from './GlassAccordion';
// export { GlassProgress } from './GlassProgress';
// export { GlassBackground } from './GlassBackground';
// export { GlassStagger } from './GlassStagger';

// ============================================
// TYPE EXPORTS
// ============================================

/**
 * Semantic glow colors for interactive elements
 */
export type SemanticGlow = 'primary' | 'success' | 'warning' | 'critical' | 'info';

/**
 * Haptic feedback intensity levels
 */
export type HapticIntensity = 'light' | 'medium' | 'heavy' | false;

/**
 * Glass component size variants
 */
export type GlassSize = 'sm' | 'md' | 'lg';

/**
 * Input state variants
 */
export type InputState = 'default' | 'error' | 'success' | 'warning';

/**
 * Combined glass variant type (for components that support both material and healthcare variants)
 */
export type GlassVariant = GlassMaterialVariant | HealthcareVariant;
