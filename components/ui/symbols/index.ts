/**
 * Apple HIG SF Symbols System
 *
 * A comprehensive icon system inspired by Apple's SF Symbols with
 * rendering modes, variable color, weights, scales, and animations.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/sf-symbols
 *
 * @example
 * ```tsx
 * import { Symbol, SquircleSymbol } from '@/components/ui/symbols';
 * import { Heart, Bell, Wifi } from 'lucide-react';
 *
 * // Basic usage
 * <Symbol icon={Heart} color="red" />
 *
 * // With animation
 * <Symbol icon={Bell} animation="wiggle" />
 *
 * // With rendering mode
 * <Symbol icon={Wifi} renderingMode="hierarchical" />
 *
 * // In squircle container
 * <SquircleSymbol icon={Heart} color="red" symbolAnimation="pulse" />
 * ```
 */

// Main component
export { Symbol, default as SymbolComponent } from './Symbol';
export {
  AnimatedSymbol,
  LoadingSymbol,
  PulsingSymbol,
  BouncingSymbol,
  CircleSymbol,
  SquareSymbol,
  BadgeSymbol,
} from './Symbol';

// Squircle integration
export { SquircleSymbol, default as SquircleSymbolComponent } from './SquircleSymbol';

// Types
export type {
  // Rendering modes
  SymbolRenderingMode,
  RenderingModeConfig,
  // Variable color
  VariableColorMode,
  VariableColorConfig,
  // Weights and scales
  SymbolWeight,
  SymbolScale,
  // Design variants
  SymbolVariant,
  SymbolEnclosure,
  DesignVariantConfig,
  // Animations
  SymbolAnimation,
  AnimationDirection,
  SymbolAnimationConfig,
  ReplaceAnimationConfig,
  // Size
  SymbolSizePreset,
  SymbolSizeConfig,
  // Props
  SymbolProps,
  ShortcutSymbolProps,
  // Context
  SymbolContextValue,
  // Utility types
  AnimationVariantsResult,
  VariableColorLayerState,
} from './types';

// Constants
export {
  // Weights
  SYMBOL_WEIGHTS,
  WEIGHT_CSS_VARS,
  WEIGHT_CLASSES,
  // Scales
  SYMBOL_SCALES,
  SCALE_CSS_VARS,
  SCALE_CLASSES,
  // Sizes
  SYMBOL_SIZES,
  SIZE_CONFIGS,
  SIZE_CLASSES,
  // Rendering modes
  HIERARCHICAL_OPACITIES,
  LAYER_OPACITIES,
  RENDERING_MODE_CLASSES,
  // Enclosures
  ENCLOSURE_PADDING,
  ENCLOSURE_CLASSES,
  ENCLOSURE_RADIUS,
  // Animation timing
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  // Multicolor palette
  MULTICOLOR_PALETTE,
  // Defaults
  DEFAULTS,
  // Utility functions
  resolveSize,
  resolveWeight,
  resolveScale,
  calculateIconSize,
  calculateEnclosureSize,
} from './constants';

// Animation presets
export {
  // Transitions
  springTransition,
  bouncyTransition,
  smoothTransition,
  fastTransition,
  // Appear/Disappear
  appearVariants,
  disappearVariants,
  // Bounce
  bounceVariants,
  bounceDownVariants,
  // Scale
  scaleVariants,
  scaleUpVariants,
  scaleDownVariants,
  // Pulse
  pulseVariants,
  pulseOnceVariants,
  // Wiggle
  wiggleVariants,
  wiggleGentleVariants,
  // Breathe
  breatheVariants,
  breatheOnceVariants,
  // Rotate
  rotateVariants,
  rotateOnceVariants,
  rotateCCWVariants,
  // Replace
  getReplaceOutVariants,
  getReplaceInVariants,
  replaceDownUpOutVariants,
  replaceDownUpInVariants,
  replaceUpUpOutVariants,
  replaceUpUpInVariants,
  replaceOffUpOutVariants,
  replaceOffUpInVariants,
  // Variable color
  variableColorLayerVariants,
  // Variant map
  animationVariantMap,
  // Utilities
  getAnimationVariants,
  createCustomAnimation,
} from './presets/animations';

// Hooks
export {
  useVariableColor,
  useReducedMotion,
  type UseVariableColorOptions,
  type UseVariableColorReturn,
} from './hooks/useVariableColor';

export {
  useSymbolAnimation,
  useReplaceAnimation,
  type UseSymbolAnimationOptions,
  type UseSymbolAnimationReturn,
  type UseReplaceAnimationOptions,
  type UseReplaceAnimationReturn,
} from './hooks/useSymbolAnimation';
