/**
 * Apple Liquid Glass 2026 - Unified Glass Material Variants
 * Single source of truth for all glass material variants
 *
 * This file consolidates all variant types to ensure consistency across the codebase.
 * Use these types in all components instead of inline string literals.
 */

/* ========================================
   BASE MATERIAL VARIANTS
   ======================================== */

/**
 * Base Glass Material Variants
 *
 * These variants define the material properties of glass components
 * following Apple Liquid Glass 2026 design system.
 *
 * All variants use:
 * - 40px blur (iOS 26 Universal Standard)
 * - 180% saturate (iOS 26 Universal Standard)
 *
 * @example
 * ```tsx
 * <GlassCard variant="default" />
 * <GlassPanel variant="elevated" />
 * ```
 */
export type GlassMaterialVariant =
  | 'default'    // Standard glass for most UI elements (controls, navigation, alerts)
  | 'clear'      // Highly translucent for rich backgrounds (photos, videos)
  | 'elevated'   // Prominent glass for high z-index elements (modals, floating panels)
  | 'subtle'     // Minimal glass effect (light touch, backgrounds)
  | 'medical';   // Medical-themed with blue tint (healthcare context)

/**
 * Healthcare Semantic Variants
 *
 * Semantic color variants specifically for healthcare applications.
 * These override the material variant with semantic colors.
 *
 * @example
 * ```tsx
 * <Badge healthcareVariant="success">Completed</Badge>
 * <Alert healthcareVariant="critical">Emergency</Alert>
 * ```
 */
export type HealthcareVariant =
  | 'healthcare-primary'   // Primary blue (#007AFF) - Info, default actions
  | 'healthcare-success'   // Green (#34C759) - Success states, completed tasks
  | 'healthcare-warning'   // Orange (#FF9500) - Warnings, caution states
  | 'healthcare-critical'  // Red (#FF3B30) - Critical, urgent, emergency states
  | 'healthcare-info';     // Teal (#5AC8FA) - Info messages, tips

/**
 * Combined Glass Variant Type
 *
 * Union of material and healthcare variants.
 * Use this when a component accepts both types of variants.
 *
 * @example
 * ```tsx
 * interface Props {
 *   variant?: GlassVariant;
 * }
 * ```
 */
export type GlassVariant = GlassMaterialVariant | HealthcareVariant;

/* ========================================
   SIZE VARIANTS
   ======================================== */

/**
 * Standard Size Scale
 *
 * Consistent sizing for components across the design system.
 */
export type SizeVariant =
  | 'xs'    // Extra Small
  | 'sm'    // Small
  | 'md'    // Medium (default)
  | 'lg'    // Large
  | 'xl'    // Extra Large
  | 'icon'; // Icon-sized (square aspect ratio)

/**
 * Simplified Size Scale
 *
 * Used for components that don't need the full size range.
 */
export type SimpleSizeVariant = 'sm' | 'md' | 'lg';

/* ========================================
   GLOW VARIANTS
   ======================================== */

/**
 * Glow Color Variants
 *
 * Defines glow effects for interactive components.
 *
 * @example
 * ```tsx
 * <GlassButton glow="blue">Primary</GlassButton>
 * <GlassCard glow="success">Success Card</GlassCard>
 * ```
 */
export type GlowVariant =
  | 'none'       // No glow effect
  | 'blue'       // Blue glow (#007AFF)
  | 'green'      // Green glow (#34C759)
  | 'teal'       // Teal glow (#5AC8FA)
  | 'purple'     // Purple glow (#AF52DE)
  | 'orange'     // Orange glow (#FF9500)
  | 'primary'    // Primary glow (healthcare blue)
  | 'success'    // Success glow (healthcare green)
  | 'warning'    // Warning glow (healthcare orange)
  | 'critical'   // Critical glow (healthcare red)
  | 'info';      // Info glow (healthcare teal)

/* ========================================
   BUTTON VARIANTS
   ======================================== */

/**
 * Button Style Variants
 *
 * Semantic variants for button components.
 */
export type ButtonVariant =
  | 'default'            // Default glass button
  | 'primary'            // Primary action button
  | 'secondary'          // Secondary action button
  | 'danger'             // Destructive action button
  | 'medical-primary'    // Medical primary (blue)
  | 'medical-secondary'; // Medical secondary (teal)

/**
 * Button Size Variants
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/* ========================================
   BADGE VARIANTS
   ======================================== */

/**
 * Badge Style Variants
 *
 * Semantic variants for badge/chip components.
 */
export type BadgeVariant =
  | 'default'   // Default neutral badge
  | 'primary'   // Primary blue badge
  | 'secondary' // Secondary teal badge
  | 'medical'   // Medical blue badge
  | 'success'   // Success green badge
  | 'warning'   // Warning orange badge
  | 'danger';   // Danger red badge

/**
 * Badge Size Variants
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/* ========================================
   RADIUS VARIANTS
   ======================================== */

/**
 * Border Radius Scale
 *
 * iOS 26 Standard (8px base scale)
 */
export type RadiusVariant =
  | 'xs'    // 8px - Extra Small
  | 'sm'    // 12px - Small (buttons, toggles)
  | 'md'    // 16px - Medium (cards, inputs)
  | 'lg'    // 24px - Large (large cards, panels)
  | 'xl'    // 32px - Extra Large (containers)
  | '2xl'   // 40px - 2XL (modals)
  | '3xl'   // 48px - 3XL (hero sections)
  | 'full'; // 9999px - Fully rounded (pills, circles)

/**
 * Hierarchy-Specific Radius
 *
 * Semantic radius values for specific UI hierarchy levels
 */
export type HierarchyRadiusVariant =
  | 'container' // Level 1: Main Container (24px)
  | 'card'      // Level 2-4: Section Cards, Metrics, Kanban Columns (24px)
  | 'item'      // Level 5: Patient Cards (16px)
  | 'pill'      // Level 6: Pills & Badges (14px)
  | 'icon';     // Level 7: Icon Buttons (14px)

/* ========================================
   TYPE GUARDS
   ======================================== */

/**
 * Type guard to check if a variant is a GlassMaterialVariant
 */
export function isGlassMaterialVariant(variant: string): variant is GlassMaterialVariant {
  return ['default', 'clear', 'elevated', 'subtle', 'medical'].includes(variant);
}

/**
 * Type guard to check if a variant is a HealthcareVariant
 */
export function isHealthcareVariant(variant: string): variant is HealthcareVariant {
  return [
    'healthcare-primary',
    'healthcare-success',
    'healthcare-warning',
    'healthcare-critical',
    'healthcare-info'
  ].includes(variant);
}

/**
 * Type guard to check if a glow variant is valid
 */
export function isGlowVariant(glow: string): glow is GlowVariant {
  return [
    'none',
    'blue',
    'green',
    'teal',
    'purple',
    'orange',
    'primary',
    'success',
    'warning',
    'critical',
    'info'
  ].includes(glow);
}

/* ========================================
   VARIANT MAPS
   ======================================== */

/**
 * Maps healthcare variants to their corresponding colors
 */
export const HEALTHCARE_VARIANT_COLORS: Record<HealthcareVariant, string> = {
  'healthcare-primary': '#007AFF',   // Blue
  'healthcare-success': '#34C759',   // Green
  'healthcare-warning': '#FF9500',   // Orange
  'healthcare-critical': '#FF3B30',  // Red
  'healthcare-info': '#5AC8FA',      // Teal
};

/**
 * Maps glow variants to their corresponding colors
 */
export const GLOW_VARIANT_COLORS: Record<Exclude<GlowVariant, 'none'>, string> = {
  blue: '#007AFF',
  green: '#34C759',
  teal: '#5AC8FA',
  purple: '#AF52DE',
  orange: '#FF9500',
  primary: '#007AFF',
  success: '#34C759',
  warning: '#FF9500',
  critical: '#FF3B30',
  info: '#5AC8FA',
};

/**
 * Maps radius variants to their pixel values
 */
export const RADIUS_VARIANT_VALUES: Record<RadiusVariant, string> = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  full: '9999px',
};

/**
 * Maps hierarchy radius variants to their pixel values
 */
export const HIERARCHY_RADIUS_VALUES: Record<HierarchyRadiusVariant, string> = {
  container: '24px',
  card: '24px',
  item: '16px',
  pill: '14px',
  icon: '14px',
};

/* ========================================
   DEFAULT VALUES
   ======================================== */

/**
 * Default variant values for components
 */
export const DEFAULT_VARIANTS = {
  material: 'default' as GlassMaterialVariant,
  size: 'md' as SizeVariant,
  glow: 'none' as GlowVariant,
  radius: 'md' as RadiusVariant,
  button: 'default' as ButtonVariant,
  badge: 'default' as BadgeVariant,
} as const;
