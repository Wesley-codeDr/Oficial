/**
 * Apple Liquid Glass Design System Constants
 *
 * Configuration values for Liquid Glass material, controls,
 * navigation, and layout components.
 */

import type {
  GlassMaterialVariant,
  GlassIntensity,
  ControlShape,
  GlassButtonSize,
  GlassButtonStyle,
} from './types';

// ============================================
// MATERIAL CONFIGURATIONS
// ============================================

/**
 * Glass material blur values (px)
 */
export const GLASS_BLUR: Record<GlassIntensity, number> = {
  subtle: 12,
  medium: 20,
  strong: 40,
};

/**
 * Glass material opacity values
 */
export const GLASS_OPACITY: Record<GlassMaterialVariant, { light: number; dark: number }> = {
  regular: { light: 0.72, dark: 0.72 },
  clear: { light: 0.25, dark: 0.35 },
  prominent: { light: 0.88, dark: 0.88 },
  tinted: { light: 0.65, dark: 0.65 },
};

/**
 * Glass saturation values
 */
export const GLASS_SATURATION: Record<GlassIntensity, number> = {
  subtle: 120,
  medium: 180,
  strong: 200,
};

/**
 * Glass border opacity
 */
export const GLASS_BORDER_OPACITY: Record<GlassMaterialVariant, { light: number; dark: number }> = {
  regular: { light: 0.4, dark: 0.1 },
  clear: { light: 0.2, dark: 0.08 },
  prominent: { light: 0.5, dark: 0.12 },
  tinted: { light: 0.3, dark: 0.1 },
};

// ============================================
// CONTROL DIMENSIONS
// ============================================

/**
 * Control corner radius values
 * Hardware curvature influences corner radius
 */
export const CONTROL_RADIUS: Record<ControlShape, string> = {
  pill: '9999px',
  rounded: 'var(--radius-lg)',
  concentric: 'var(--radius-concentric)',
  circle: '50%',
};

/**
 * Button size dimensions
 * Extra-large size allows more space for labels and accents
 */
export const BUTTON_SIZE: Record<GlassButtonSize, {
  height: number;
  paddingX: number;
  fontSize: number;
  iconSize: number;
}> = {
  small: { height: 32, paddingX: 12, fontSize: 14, iconSize: 16 },
  medium: { height: 40, paddingX: 16, fontSize: 15, iconSize: 18 },
  large: { height: 48, paddingX: 20, fontSize: 16, iconSize: 20 },
  extraLarge: { height: 56, paddingX: 24, fontSize: 17, iconSize: 22 },
};

/**
 * Button style CSS classes
 */
export const BUTTON_STYLE_CLASSES: Record<GlassButtonStyle, string> = {
  glass: 'btn-glass',
  glassProminent: 'btn-glass-prominent',
  glassTinted: 'btn-glass-tinted',
};

// ============================================
// LAYOUT METRICS
// ============================================

/**
 * List row heights (Liquid Glass updates)
 * Larger row height gives content room to breathe
 */
export const LIST_ROW_HEIGHT = {
  compact: 44,
  regular: 52,
  large: 60,
};

/**
 * List section padding
 */
export const LIST_SECTION_PADDING = {
  compact: 12,
  regular: 16,
  large: 20,
};

/**
 * Section corner radius
 * Increased to match control curvature
 */
export const SECTION_RADIUS = {
  medium: 16,
  large: 20,
  extraLarge: 24,
};

/**
 * Form element spacing
 */
export const FORM_SPACING = {
  compact: 8,
  regular: 12,
  relaxed: 16,
};

// ============================================
// NAVIGATION
// ============================================

/**
 * Tab bar dimensions
 */
export const TAB_BAR = {
  height: 49,
  heightMinimized: 32,
  cornerRadius: 24,
  itemSpacing: 4,
  searchTabSeparation: 12,
};

/**
 * Sidebar dimensions
 */
export const SIDEBAR = {
  width: 280,
  widthCompact: 72,
  cornerRadius: 24,
  backgroundExtensionBlur: 20,
};

/**
 * Toolbar dimensions
 */
export const TOOLBAR = {
  height: 44,
  itemHeight: 36,
  groupSpacing: 8,
  itemSpacing: 4,
  cornerRadius: 12,
};

// ============================================
// MODAL & SHEET
// ============================================

/**
 * Sheet dimensions
 */
export const SHEET = {
  cornerRadius: 24,
  cornerRadiusLarge: 32,
  halfHeightInset: 12,
  backdropBlur: 20,
};

/**
 * Action sheet dimensions
 */
export const ACTION_SHEET = {
  cornerRadius: 16,
  itemHeight: 48,
  spacing: 8,
};

// ============================================
// SCROLL EDGE EFFECT
// ============================================

/**
 * Scroll edge effect configuration
 */
export const SCROLL_EDGE = {
  threshold: 0,
  fadeHeight: 16,
  blurAmount: 8,
};

// ============================================
// ANIMATION TIMING
// ============================================

/**
 * Liquid Glass animation durations (ms)
 */
export const ANIMATION_DURATION = {
  morph: 300,
  expand: 250,
  collapse: 200,
  minimize: 200,
  focus: 150,
};

/**
 * Animation easing curves
 */
export const ANIMATION_EASING = {
  morph: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  spring: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  fluid: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

// ============================================
// ACCESSIBILITY
// ============================================

/**
 * Fallback values when effects are disabled
 */
export const ACCESSIBILITY_FALLBACK = {
  /** Solid background when transparency is reduced */
  solidBackgroundLight: 'rgba(255, 255, 255, 0.95)',
  solidBackgroundDark: 'rgba(28, 28, 30, 0.95)',
  /** No animation duration when motion is reduced */
  reducedMotionDuration: 0,
  /** Higher contrast border */
  highContrastBorderOpacity: 0.3,
};

// ============================================
// CSS VARIABLE NAMES
// ============================================

export const CSS_VARS = {
  // Glass material
  glassBlur: '--glass-blur',
  glassOpacity: '--glass-opacity',
  glassSaturation: '--glass-saturation',
  glassBorderOpacity: '--glass-border-opacity',
  glassTint: '--glass-tint',

  // Layout
  listRowHeight: '--list-row-height',
  sectionRadius: '--section-radius',
  formSpacing: '--form-spacing',

  // Navigation
  tabBarHeight: '--tab-bar-height',
  sidebarWidth: '--sidebar-width',
  toolbarHeight: '--toolbar-height',

  // Concentric shapes
  concentricRadius: '--radius-concentric',
  containerRadius: '--container-radius',

  // Animation
  morphDuration: '--morph-duration',
  morphEasing: '--morph-easing',
};

// ============================================
// DEFAULTS
// ============================================

export const DEFAULTS = {
  glassIntensity: 'medium' as GlassIntensity,
  controlShape: 'rounded' as ControlShape,
  buttonSize: 'medium' as GlassButtonSize,
  buttonStyle: 'glass' as GlassButtonStyle,
  listRowHeight: 'regular' as const,
  sectionRadius: 'large' as const,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate concentric corner radius based on container
 */
export function calculateConcentricRadius(
  containerRadius: number,
  inset: number
): number {
  return Math.max(0, containerRadius - inset);
}

/**
 * Get glass material CSS properties
 */
export function getGlassMaterialStyles(
  variant: GlassMaterialVariant,
  intensity: GlassIntensity,
  isDark: boolean = false
): Record<string, string> {
  const opacity = isDark ? GLASS_OPACITY[variant].dark : GLASS_OPACITY[variant].light;
  const borderOpacity = isDark
    ? GLASS_BORDER_OPACITY[variant].dark
    : GLASS_BORDER_OPACITY[variant].light;

  return {
    '--glass-blur': `${GLASS_BLUR[intensity]}px`,
    '--glass-opacity': String(opacity),
    '--glass-saturation': `${GLASS_SATURATION[intensity]}%`,
    '--glass-border-opacity': String(borderOpacity),
  };
}

/**
 * Get button dimensions
 */
export function getButtonDimensions(size: GlassButtonSize) {
  return BUTTON_SIZE[size];
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if reduced transparency is preferred
 */
export function prefersReducedTransparency(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
}
