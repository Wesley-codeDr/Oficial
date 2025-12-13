import type { LucideIcon } from 'lucide-react';
import type { Variants, Transition } from 'framer-motion';

/**
 * Apple HIG SF Symbols Type Definitions
 *
 * Comprehensive type system for SF Symbols-inspired icon rendering
 * with rendering modes, variable color, weights, scales, and animations.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/sf-symbols
 */

// ============================================
// RENDERING MODES
// ============================================

/**
 * SF Symbols rendering modes
 * - monochrome: Single color to all layers
 * - hierarchical: One color with varying opacity per layer
 * - palette: Multiple colors per layer (2-3 colors)
 * - multicolor: Intrinsic semantic colors
 */
export type SymbolRenderingMode =
  | 'monochrome'
  | 'hierarchical'
  | 'palette'
  | 'multicolor';

export interface RenderingModeConfig {
  mode: SymbolRenderingMode;
  /** Primary color - used in all modes */
  primaryColor?: string;
  /** Secondary color - for palette mode */
  secondaryColor?: string;
  /** Tertiary color - for palette mode */
  tertiaryColor?: string;
  /** Opacity levels for hierarchical mode [primary, secondary, tertiary] */
  opacityLevels?: [number, number, number];
}

// ============================================
// VARIABLE COLOR
// ============================================

/**
 * Variable color progression mode
 * - cumulative: Fills layers sequentially (stays filled)
 * - iterative: Highlights only current layer
 */
export type VariableColorMode = 'cumulative' | 'iterative';

export interface VariableColorConfig {
  /** 0-100 representing fill percentage */
  value: number;
  /** How color progresses through layers */
  mode?: VariableColorMode;
  /** Active color when layer is filled */
  activeColor?: string;
  /** Inactive color for unfilled layers */
  inactiveColor?: string;
  /** Animation duration between states (ms) */
  animationDuration?: number;
}

// ============================================
// WEIGHTS & SCALES
// ============================================

/**
 * SF Pro font-matching weights
 * Maps to stroke-width values for consistent visual weight
 */
export type SymbolWeight =
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'heavy'
  | 'black';

/**
 * Scale relative to text cap height
 * - small: 85% of base size
 * - medium: 100% (default)
 * - large: 120% of base size
 */
export type SymbolScale = 'small' | 'medium' | 'large';

// ============================================
// DESIGN VARIANTS
// ============================================

/** Symbol visual variant */
export type SymbolVariant = 'outline' | 'fill';

/** Enclosure shape for symbol container */
export type SymbolEnclosure =
  | 'none'
  | 'circle'
  | 'square'
  | 'rectangle'
  | 'badge';

export interface DesignVariantConfig {
  variant?: SymbolVariant;
  /** Show slash overlay (unavailable state) */
  slash?: boolean;
  /** Enclosure shape */
  enclosure?: SymbolEnclosure;
  /** Fill color for enclosure */
  enclosureFill?: string;
}

// ============================================
// ANIMATIONS
// ============================================

/**
 * SF Symbols animation types
 */
export type SymbolAnimation =
  | 'none'
  | 'appear'
  | 'disappear'
  | 'bounce'
  | 'scale'
  | 'pulse'
  | 'variableColor'
  | 'replace'
  | 'wiggle'
  | 'breathe'
  | 'rotate';

/** Animation direction for directional animations */
export type AnimationDirection =
  | 'up'
  | 'down'
  | 'forward'  // LTR: right, RTL: left
  | 'backward'; // LTR: left, RTL: right

export interface SymbolAnimationConfig {
  type: SymbolAnimation;
  /** Trigger animation (controlled mode) */
  trigger?: boolean;
  /** Animation plays on mount */
  autoPlay?: boolean;
  /** Loop animation (number of times or 'infinity') */
  repeat?: number | 'infinity';
  /** Direction for directional animations */
  direction?: AnimationDirection;
  /** Animation speed multiplier */
  speed?: number;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Custom Framer Motion variants */
  customVariants?: Variants;
  /** Custom transition */
  customTransition?: Transition;
}

/** Replace animation configuration */
export interface ReplaceAnimationConfig {
  /** Incoming icon */
  to: LucideIcon;
  /** Replace animation style */
  style?: 'automatic' | 'downUp' | 'upUp' | 'offUp';
  /** Duration of replace animation (ms) */
  duration?: number;
}

// ============================================
// SIZE CONFIGURATION
// ============================================

/** Predefined size presets */
export type SymbolSizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SymbolSizeConfig {
  /** Container size */
  container: number | string;
  /** Icon size */
  icon: number | string;
}

// ============================================
// MAIN SYMBOL PROPS
// ============================================

export interface SymbolProps {
  /** Lucide icon to render */
  icon: LucideIcon;

  // Sizing
  /** Size preset or custom number (px) */
  size?: SymbolSizePreset | number;
  /** Symbol weight (stroke thickness) */
  weight?: SymbolWeight;
  /** Scale relative to base size */
  scale?: SymbolScale;

  // Rendering Mode
  /** How to apply colors to symbol layers */
  renderingMode?: SymbolRenderingMode;

  // Colors
  /** Primary/main color */
  color?: string;
  /** Secondary layer color (for hierarchical/palette) */
  secondaryColor?: string;
  /** Tertiary layer color (for palette) */
  tertiaryColor?: string;

  // Variable Color
  /** Variable color configuration for progress-like animations */
  variableColor?: VariableColorConfig;

  // Design Variants
  /** Fill or outline variant */
  variant?: SymbolVariant;
  /** Show slash overlay (unavailable state) */
  slash?: boolean;
  /** Enclosure shape around symbol */
  enclosure?: SymbolEnclosure;
  /** Fill color for enclosure background */
  enclosureFill?: string;

  // Animation
  /** Animation type or full configuration */
  animation?: SymbolAnimation | SymbolAnimationConfig;
  /** Icon to replace with (for replace animation) */
  replaceTo?: LucideIcon;

  // State
  /** Disabled state - grays out and reduces opacity */
  disabled?: boolean;
  /** Loading state - shows rotate animation */
  loading?: boolean;

  // Accessibility
  /** Screen reader label */
  'aria-label'?: string;
  /** Decorative (hidden from screen readers) */
  decorative?: boolean;

  // Events
  /** Click handler */
  onClick?: () => void;
  /** Animation complete callback */
  onAnimationComplete?: () => void;

  // Styling
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

// ============================================
// CONTEXT
// ============================================

export interface SymbolContextValue {
  /** Default rendering mode */
  defaultRenderingMode: SymbolRenderingMode;
  /** Default weight */
  defaultWeight: SymbolWeight;
  /** Default scale */
  defaultScale: SymbolScale;
  /** Default variant */
  defaultVariant: SymbolVariant;
  /** Global animation settings */
  animations: {
    enabled: boolean;
    reduceMotion: boolean;
    defaultDuration: number;
  };
  /** Color palette for multicolor mode */
  multicolorPalette: Record<string, string>;
}

// ============================================
// UTILITY TYPES
// ============================================

/** Props for shortcut components */
export type ShortcutSymbolProps = Omit<SymbolProps, 'icon'>;

/** Animation variants return type */
export interface AnimationVariantsResult {
  variants: Variants;
  initial: string;
  animate: string;
  exit?: string;
  transition?: Transition;
}

/** Variable color layer state */
export interface VariableColorLayerState {
  index: number;
  isActive: boolean;
  opacity: number;
  color: string;
}
