/**
 * Apple Liquid Glass Design System Types
 *
 * Type definitions for the Liquid Glass material system that combines
 * optical properties of glass with fluidity for controls and navigation.
 *
 * @see https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass
 */

import type { ReactNode, CSSProperties } from 'react';

// ============================================
// MATERIAL VARIANTS
// ============================================

/**
 * Liquid Glass material variants
 * - regular: Standard glass effect for most controls
 * - clear: Highly translucent for media backgrounds
 * - prominent: Higher contrast for emphasized buttons
 * - tinted: Color-tinted glass effect
 */
export type GlassMaterialVariant = 'regular' | 'clear' | 'prominent' | 'tinted';

/**
 * Glass effect intensity
 */
export type GlassIntensity = 'subtle' | 'medium' | 'strong';

/**
 * Glass effect configuration
 */
export interface GlassEffectConfig {
  variant?: GlassMaterialVariant;
  intensity?: GlassIntensity;
  /** Tint color for tinted variant */
  tintColor?: string;
  /** Whether to apply blur effect */
  blur?: boolean;
  /** Blur amount in pixels */
  blurAmount?: number;
  /** Enable/disable the material */
  disabled?: boolean;
}

// ============================================
// CONTROL SHAPES
// ============================================

/**
 * Control shape variants - rounder forms for Liquid Glass
 * - pill: Fully rounded ends (capsule shape)
 * - rounded: Standard rounded corners
 * - concentric: Corners match container curvature
 * - circle: Circular shape
 */
export type ControlShape = 'pill' | 'rounded' | 'concentric' | 'circle';

/**
 * Corner configuration for concentric shapes
 * Hardware curvature influences corner radius
 */
export interface ConcentricCorners {
  topLeading?: number;
  topTrailing?: number;
  bottomLeading?: number;
  bottomTrailing?: number;
  /** Use uniform corners */
  uniform?: boolean;
}

/**
 * Contour rectangle configuration
 * For shapes that follow container contours
 */
export interface ContourRectConfig {
  /** Which corners to round */
  corners?: 'all' | 'top' | 'bottom' | 'leading' | 'trailing';
  /** Use uniform rounding */
  isUniform?: boolean;
  /** Override radius value */
  radius?: number;
}

// ============================================
// BUTTON STYLES
// ============================================

/**
 * Glass button style variants
 * - glass: Standard glass button
 * - glassProminent: Higher contrast glass button
 * - glassTinted: Tinted glass button
 */
export type GlassButtonStyle = 'glass' | 'glassProminent' | 'glassTinted';

/**
 * Button size for Liquid Glass buttons
 * - extraLarge: New size with more space for labels
 */
export type GlassButtonSize = 'small' | 'medium' | 'large' | 'extraLarge';

export interface GlassButtonProps {
  style?: GlassButtonStyle;
  size?: GlassButtonSize;
  /** Shape of the button */
  shape?: ControlShape;
  /** Whether button is in loading state */
  loading?: boolean;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Icon to display */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: 'leading' | 'trailing';
  /** Full width button */
  fullWidth?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Children content */
  children?: ReactNode;
  /** Additional class names */
  className?: string;
}

// ============================================
// SCROLL EDGE EFFECT
// ============================================

/**
 * Scroll edge effect position
 */
export type ScrollEdgePosition = 'top' | 'bottom' | 'leading' | 'trailing';

/**
 * Scroll edge effect configuration
 * Maintains legibility when content scrolls under controls
 */
export interface ScrollEdgeEffectConfig {
  /** Which edges to apply effect */
  edges?: ScrollEdgePosition[];
  /** Intensity of the blur/fade effect */
  intensity?: GlassIntensity;
  /** Whether effect is currently active */
  isActive?: boolean;
  /** Scroll threshold before effect activates */
  threshold?: number;
}

// ============================================
// BACKGROUND EXTENSION
// ============================================

/**
 * Background extension effect configuration
 * Creates impression of content extending under sidebars/inspectors
 */
export interface BackgroundExtensionConfig {
  /** Edge where extension appears */
  edge: 'leading' | 'trailing' | 'top' | 'bottom';
  /** Width/height of extension area */
  size?: number;
  /** Blur amount for the extended area */
  blur?: number;
  /** Whether extension is enabled */
  enabled?: boolean;
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Tab bar minimize behavior
 * - onScrollDown: Minimize when scrolling down
 * - onScrollUp: Minimize when scrolling up
 * - never: Never minimize
 */
export type TabBarMinimizeBehavior = 'onScrollDown' | 'onScrollUp' | 'never';

/**
 * Tab bar configuration for Liquid Glass
 */
export interface LiquidGlassTabBarConfig {
  /** Minimize behavior on scroll */
  minimizeBehavior?: TabBarMinimizeBehavior;
  /** Whether tab bar is currently minimized */
  isMinimized?: boolean;
  /** Whether tab bar adapts to sidebar in larger contexts */
  sidebarAdaptable?: boolean;
  /** Position of search tab (if present) */
  searchTabPosition?: 'trailing' | 'integrated';
}

/**
 * Sidebar configuration
 */
export interface LiquidGlassSidebarConfig {
  /** Whether sidebar uses background extension */
  backgroundExtension?: boolean;
  /** Sidebar position */
  position?: 'leading' | 'trailing';
  /** Whether sidebar floats above content */
  floating?: boolean;
  /** Collapse behavior */
  collapseBehavior?: 'manual' | 'automatic';
}

// ============================================
// MODAL & SHEET CONFIGURATIONS
// ============================================

/**
 * Sheet presentation style
 * - fullHeight: Full screen sheet
 * - halfHeight: Half-height sheet (inset from edges)
 * - automatic: System determines based on content
 */
export type SheetPresentationStyle = 'fullHeight' | 'halfHeight' | 'automatic';

/**
 * Liquid Glass sheet configuration
 */
export interface LiquidGlassSheetConfig {
  /** Presentation style */
  presentation?: SheetPresentationStyle;
  /** Whether sheet has increased corner radius */
  largeCorners?: boolean;
  /** Whether content can peek through beneath sheet */
  contentPeekThrough?: boolean;
  /** Whether sheet transitions to opaque at full height */
  opaqueAtFullHeight?: boolean;
}

/**
 * Action sheet configuration
 * Action sheets originate from source element
 */
export interface ActionSheetConfig {
  /** Source element reference for positioning */
  sourceRef?: React.RefObject<HTMLElement>;
  /** Anchor position relative to source */
  anchorPosition?: 'above' | 'below' | 'leading' | 'trailing';
  /** Whether to allow interaction with other parts during display */
  allowBackgroundInteraction?: boolean;
}

// ============================================
// LAYOUT & ORGANIZATION
// ============================================

/**
 * List style configuration for Liquid Glass
 */
export interface LiquidGlassListConfig {
  /** Row height preset */
  rowHeight?: 'compact' | 'regular' | 'large';
  /** Section corner radius */
  sectionRadius?: 'medium' | 'large' | 'extraLarge';
  /** Inset style */
  insetStyle?: 'plain' | 'grouped' | 'insetGrouped';
  /** Section header capitalization */
  headerCapitalization?: 'title' | 'uppercase' | 'none';
}

/**
 * Form style configuration
 */
export interface LiquidGlassFormConfig extends LiquidGlassListConfig {
  /** Form layout style */
  layoutStyle?: 'grouped' | 'plain';
  /** Spacing between form elements */
  spacing?: 'compact' | 'regular' | 'relaxed';
}

// ============================================
// TOOLBAR CONFIGURATION
// ============================================

/**
 * Toolbar item grouping
 */
export interface ToolbarGroupConfig {
  /** Group identifier */
  id: string;
  /** Items in this group */
  items: string[];
  /** Whether group has shared background */
  sharedBackground?: boolean;
  /** Group position */
  position?: 'leading' | 'center' | 'trailing';
}

/**
 * Toolbar configuration
 */
export interface LiquidGlassToolbarConfig {
  /** Toolbar groups */
  groups?: ToolbarGroupConfig[];
  /** Whether to use icons only (no text) */
  iconsOnly?: boolean;
  /** Scroll edge effect for toolbar */
  scrollEdgeEffect?: boolean;
}

// ============================================
// ACCESSIBILITY
// ============================================

/**
 * Accessibility adaptations for Liquid Glass
 */
export interface LiquidGlassAccessibility {
  /** Reduce transparency preference */
  reduceTransparency?: boolean;
  /** Reduce motion preference */
  reduceMotion?: boolean;
  /** Increase contrast preference */
  increaseContrast?: boolean;
  /** Whether to show fallback appearance */
  useFallback?: boolean;
}

// ============================================
// GLASS EFFECT CONTAINER
// ============================================

/**
 * Glass effect container for combining effects
 * Helps optimize performance while morphing shapes
 */
export interface GlassEffectContainerProps {
  /** Glass effects to combine */
  effects?: GlassEffectConfig[];
  /** Whether effects should morph fluidly */
  fluidMorphing?: boolean;
  /** Container style */
  style?: CSSProperties;
  /** Children content */
  children?: ReactNode;
  /** Additional class names */
  className?: string;
}

// ============================================
// CONTEXT
// ============================================

/**
 * Liquid Glass context value
 */
export interface LiquidGlassContextValue {
  /** Global accessibility settings */
  accessibility: LiquidGlassAccessibility;
  /** Whether Liquid Glass is supported */
  isSupported: boolean;
  /** Default glass intensity */
  defaultIntensity: GlassIntensity;
  /** Default control shape */
  defaultShape: ControlShape;
  /** Update accessibility settings */
  updateAccessibility: (settings: Partial<LiquidGlassAccessibility>) => void;
}
