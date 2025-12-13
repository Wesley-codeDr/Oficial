import type {
  SymbolWeight,
  SymbolScale,
  SymbolSizePreset,
  SymbolSizeConfig,
  SymbolRenderingMode,
  SymbolEnclosure,
} from './types';

/**
 * SF Symbols System Constants
 *
 * Configuration values for weights, scales, sizes, and rendering modes.
 * These values align with Apple's SF Pro font and SF Symbols guidelines.
 */

// ============================================
// WEIGHT CONFIGURATIONS
// ============================================

/**
 * Stroke width values for each weight
 * Matches SF Pro font weight visual appearance
 */
export const SYMBOL_WEIGHTS: Record<SymbolWeight, number> = {
  ultralight: 0.75,
  thin: 1,
  light: 1.25,
  regular: 1.5,
  medium: 1.75,
  semibold: 2,
  bold: 2.25,
  heavy: 2.5,
  black: 3,
};

/**
 * Weight to CSS variable mapping
 */
export const WEIGHT_CSS_VARS: Record<SymbolWeight, string> = {
  ultralight: 'var(--symbol-weight-ultralight)',
  thin: 'var(--symbol-weight-thin)',
  light: 'var(--symbol-weight-light)',
  regular: 'var(--symbol-weight-regular)',
  medium: 'var(--symbol-weight-medium)',
  semibold: 'var(--symbol-weight-semibold)',
  bold: 'var(--symbol-weight-bold)',
  heavy: 'var(--symbol-weight-heavy)',
  black: 'var(--symbol-weight-black)',
};

/**
 * Weight to Tailwind class mapping
 */
export const WEIGHT_CLASSES: Record<SymbolWeight, string> = {
  ultralight: 'symbol-weight-ultralight',
  thin: 'symbol-weight-thin',
  light: 'symbol-weight-light',
  regular: 'symbol-weight-regular',
  medium: 'symbol-weight-medium',
  semibold: 'symbol-weight-semibold',
  bold: 'symbol-weight-bold',
  heavy: 'symbol-weight-heavy',
  black: 'symbol-weight-black',
};

// ============================================
// SCALE CONFIGURATIONS
// ============================================

/**
 * Scale multipliers relative to base size
 */
export const SYMBOL_SCALES: Record<SymbolScale, number> = {
  small: 0.85,
  medium: 1,
  large: 1.2,
};

/**
 * Scale to CSS variable mapping
 */
export const SCALE_CSS_VARS: Record<SymbolScale, string> = {
  small: 'var(--symbol-scale-small)',
  medium: 'var(--symbol-scale-medium)',
  large: 'var(--symbol-scale-large)',
};

/**
 * Scale to Tailwind class mapping
 */
export const SCALE_CLASSES: Record<SymbolScale, string> = {
  small: 'symbol-scale-small',
  medium: 'symbol-scale-medium',
  large: 'symbol-scale-large',
};

// ============================================
// SIZE CONFIGURATIONS
// ============================================

/**
 * Size presets in pixels
 */
export const SYMBOL_SIZES: Record<SymbolSizePreset, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

/**
 * Size preset to full config mapping
 */
export const SIZE_CONFIGS: Record<SymbolSizePreset, SymbolSizeConfig> = {
  xs: { container: 16, icon: 16 },
  sm: { container: 20, icon: 20 },
  md: { container: 24, icon: 24 },
  lg: { container: 32, icon: 32 },
  xl: { container: 40, icon: 40 },
};

/**
 * Size to Tailwind class mapping
 */
export const SIZE_CLASSES: Record<SymbolSizePreset, { container: string; icon: string }> = {
  xs: { container: 'w-4 h-4', icon: 'w-4 h-4' },
  sm: { container: 'w-5 h-5', icon: 'w-5 h-5' },
  md: { container: 'w-6 h-6', icon: 'w-6 h-6' },
  lg: { container: 'w-8 h-8', icon: 'w-8 h-8' },
  xl: { container: 'w-10 h-10', icon: 'w-10 h-10' },
};

// ============================================
// RENDERING MODE CONFIGURATIONS
// ============================================

/**
 * Opacity levels for hierarchical rendering
 * [primary, secondary, tertiary]
 */
export const HIERARCHICAL_OPACITIES: [number, number, number] = [1, 0.68, 0.33];

/**
 * Default opacity values for each layer level
 */
export const LAYER_OPACITIES = {
  primary: 1,
  secondary: 0.68,
  tertiary: 0.33,
};

/**
 * Rendering mode to CSS class mapping
 */
export const RENDERING_MODE_CLASSES: Record<SymbolRenderingMode, string> = {
  monochrome: 'symbol-monochrome',
  hierarchical: 'symbol-hierarchical',
  palette: 'symbol-palette',
  multicolor: 'symbol-multicolor',
};

// ============================================
// ENCLOSURE CONFIGURATIONS
// ============================================

/**
 * Enclosure padding ratios (padding relative to icon size)
 */
export const ENCLOSURE_PADDING: Record<SymbolEnclosure, number> = {
  none: 0,
  circle: 0.35,
  square: 0.3,
  rectangle: 0.25,
  badge: 0.3,
};

/**
 * Enclosure to CSS class mapping
 */
export const ENCLOSURE_CLASSES: Record<SymbolEnclosure, string> = {
  none: '',
  circle: 'symbol-enclosure-circle',
  square: 'symbol-enclosure-square',
  rectangle: 'symbol-enclosure-rectangle',
  badge: 'symbol-enclosure-badge',
};

/**
 * Enclosure border radius values
 */
export const ENCLOSURE_RADIUS: Record<SymbolEnclosure, string> = {
  none: '0',
  circle: '9999px',
  square: 'var(--radius-squircle-sm)',
  rectangle: 'var(--radius-squircle-xs)',
  badge: 'var(--radius-squircle-sm)',
};

// ============================================
// ANIMATION TIMING
// ============================================

/**
 * Animation duration presets (ms)
 */
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

/**
 * Animation easing presets (cubic-bezier)
 * Typed as tuples for Framer Motion compatibility
 */
export const ANIMATION_EASINGS: Record<string, [number, number, number, number]> = {
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: [0.175, 0.885, 0.32, 1.275],
  smooth: [0.25, 0.1, 0.25, 1],
  linear: [0, 0, 1, 1],
};

// ============================================
// SEMANTIC COLORS (Multicolor Mode)
// ============================================

/**
 * Default semantic colors for multicolor rendering mode
 * Maps to healthcare color system
 */
export const MULTICOLOR_PALETTE = {
  // Status colors
  success: 'hsl(var(--clinical-stable))',
  warning: 'hsl(var(--clinical-warning))',
  error: 'hsl(var(--clinical-critical))',
  info: 'hsl(var(--healthcare-primary))',

  // Nature colors
  leaf: 'hsl(var(--clinical-stable))',
  water: 'hsl(var(--ios-cyan))',
  sun: 'hsl(var(--ios-yellow))',
  fire: 'hsl(var(--ios-orange))',

  // UI colors
  primary: 'hsl(var(--healthcare-primary))',
  accent: 'hsl(var(--healthcare-accent))',
  muted: 'hsl(var(--muted-foreground))',
};

// ============================================
// DEFAULT VALUES
// ============================================

export const DEFAULTS = {
  size: 'md' as SymbolSizePreset,
  weight: 'regular' as SymbolWeight,
  scale: 'medium' as SymbolScale,
  renderingMode: 'monochrome' as SymbolRenderingMode,
  variant: 'outline' as const,
  enclosure: 'none' as SymbolEnclosure,
  animationDuration: 300,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get size in pixels from preset or number
 */
export function resolveSize(size: SymbolSizePreset | number): number {
  return typeof size === 'number' ? size : SYMBOL_SIZES[size];
}

/**
 * Get stroke width for weight
 */
export function resolveWeight(weight: SymbolWeight): number {
  return SYMBOL_WEIGHTS[weight];
}

/**
 * Get scale multiplier
 */
export function resolveScale(scale: SymbolScale): number {
  return SYMBOL_SCALES[scale];
}

/**
 * Calculate final icon size with scale applied
 */
export function calculateIconSize(
  size: SymbolSizePreset | number,
  scale: SymbolScale = 'medium'
): number {
  const baseSize = resolveSize(size);
  const scaleMultiplier = resolveScale(scale);
  return Math.round(baseSize * scaleMultiplier);
}

/**
 * Get enclosure container size based on icon size
 */
export function calculateEnclosureSize(
  iconSize: number,
  enclosure: SymbolEnclosure
): number {
  const padding = ENCLOSURE_PADDING[enclosure];
  return Math.round(iconSize * (1 + padding * 2));
}
