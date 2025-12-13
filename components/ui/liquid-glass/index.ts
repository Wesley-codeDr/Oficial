/**
 * Liquid Glass Design System
 * Apple 2025 Visual Refresh Implementation
 *
 * This module provides a complete implementation of Apple's Liquid Glass
 * design language, optimized for React/Next.js applications.
 *
 * @example
 * ```tsx
 * import {
 *   LiquidGlassProvider,
 *   GlassButton,
 *   GlassTabBar,
 *   useLiquidGlass,
 * } from '@/components/ui/liquid-glass';
 * ```
 */

// ============================================
// TYPES
// ============================================

export type {
  // Material & Appearance
  GlassMaterialVariant,
  GlassIntensity,

  // Controls
  ControlShape,
  GlassButtonStyle,
  GlassButtonSize,

  // Effects
  ScrollEdgePosition,
  ScrollEdgeEffectConfig,
  BackgroundExtensionConfig,
  GlassEffectConfig,

  // Navigation
  TabBarMinimizeBehavior,

  // Shapes
  ContourRectConfig,

  // Accessibility
  LiquidGlassAccessibility,
  LiquidGlassContextValue,

  // Container Props
  GlassEffectContainerProps,
} from './types';

// ============================================
// CONSTANTS
// ============================================

export {
  // Glass Material Values
  GLASS_BLUR,
  GLASS_OPACITY,
  GLASS_SATURATION,
  GLASS_BORDER_OPACITY,

  // Control Dimensions
  BUTTON_SIZE,
  CONTROL_RADIUS,

  // Layout Metrics
  LIST_ROW_HEIGHT,
  LIST_SECTION_PADDING,
  SECTION_RADIUS,
  FORM_SPACING,

  // Navigation
  TAB_BAR,
  SIDEBAR,
  TOOLBAR,

  // Animation
  ANIMATION_DURATION,
  ANIMATION_EASING,

  // Scroll Edge
  SCROLL_EDGE,

  // Defaults
  DEFAULTS,

  // Utilities
  calculateConcentricRadius,
  getGlassMaterialStyles,
  getButtonDimensions,
  prefersReducedMotion,
  prefersReducedTransparency,
} from './constants';

// ============================================
// CONTEXT & HOOKS
// ============================================

export {
  // Provider
  LiquidGlassProvider,

  // Hooks
  useLiquidGlass,
  useReducedMotion,
  useReducedTransparency,
  useGlassEffectStyles,
} from './hooks/useLiquidGlass';

// ============================================
// CONTROLS
// ============================================

export {
  // Buttons
  GlassButton,
  GlassIconButton,
  GlassButtonGroup,
} from './controls/GlassButton';

export type {
  GlassButtonProps,
  GlassIconButtonProps,
  GlassButtonGroupProps,
} from './controls/GlassButton';

// Sliders
export {
  GlassSlider,
  GlassSliderWithInput,
  CircularSlider,
  DiscreteSlider,
} from './controls/GlassSlider';

export type {
  SliderStyle,
  TickMarkConfig,
  GlassSliderProps,
  GlassSliderWithInputProps,
  CircularSliderProps,
  DiscreteSliderProps,
} from './controls/GlassSlider';

// Tab Bar & Toolbar
export {
  GlassTabBar,
  GlassToolbar,
} from './controls/GlassTabBar';

export type {
  GlassTabItem,
  GlassTabBarProps,
  GlassToolbarItem,
  GlassToolbarProps,
} from './controls/GlassTabBar';

// ============================================
// EFFECTS
// ============================================

// Glass Effect Container
export {
  GlassEffectContainer,
  GlassEffect,
  ContourRectangle,
  MorphingGlass,
} from './effects/GlassEffectContainer';

export type {
  GlassEffectProps,
  ContourRectangleProps,
  MorphingGlassProps,
} from './effects/GlassEffectContainer';

// Scroll Edge Effect
export {
  ScrollEdgeEffect,
  SafeAreaBar,
} from './effects/ScrollEdgeEffect';

export type {
  ScrollEdgeEffectProps,
  SafeAreaBarProps,
} from './effects/ScrollEdgeEffect';

// Background Extension
export {
  BackgroundExtension,
  SplitView,
  InspectorPanel,
} from './effects/BackgroundExtension';

export type {
  BackgroundExtensionProps,
  SplitViewProps,
  InspectorPanelProps,
} from './effects/BackgroundExtension';

// ============================================
// NAVIGATION
// ============================================

// Sidebar
export {
  GlassSidebar,
  SidebarToggle,
  SidebarLayout,
} from './navigation/GlassSidebar';

export type {
  SidebarSize,
  SidebarItem,
  SidebarSection,
  GlassSidebarProps,
  SidebarToggleProps,
  SidebarLayoutProps,
} from './navigation/GlassSidebar';
