/**
 * Apple Liquid Glass iOS 26 - Design Tokens
 *
 * Centralized design tokens for consistent Liquid Glass implementation
 * across the WellWave application.
 *
 * Based on Apple Human Interface Guidelines WWDC 2025
 * https://developer.apple.com/design/human-interface-guidelines/materials
 */

// ==================== APPLE LIQUID GLASS iOS 26 SPECS ====================

/**
 * Apple Liquid Glass Material Values (iOS 26 Standard)
 * Universal blur: 40px
 * Saturate: 180%
 * Background opacity: 0.15-0.25 range
 */
export const appleLiquidGlassSpecs = {
  regular: {
    blur: 40,
    backgroundOpacity: { light: 0.2, dark: 0.25 },
    borderOpacity: { light: 0.3, dark: 0.15 },
    specularIntensity: { light: 0.6, dark: 0.4 },
    saturate: 180,
  },
  clear: {
    blur: 40,
    backgroundOpacity: { light: 0.15, dark: 0.18 },
    borderOpacity: { light: 0.25, dark: 0.1 },
    specularIntensity: { light: 0.4, dark: 0.25 },
    saturate: 180,
    dimmingOpacity: 0.35,
  },
  elevated: {
    blur: 40,
    backgroundOpacity: { light: 0.25, dark: 0.32 },
    borderOpacity: { light: 0.4, dark: 0.2 },
    specularIntensity: { light: 0.7, dark: 0.5 },
    saturate: 180,
  },
} as const;

/**
 * Apple System Colors (iOS 26)
 */
export const appleSystemColors = {
  blue: '#007AFF',
  green: '#34C759',
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  teal: '#5AC8FA',
  purple: '#AF52DE',
} as const;

// ==================== MATERIAL VARIANTS ====================

export const glassMaterial = {
  /**
   * Regular variant - Apple Liquid Glass 2026
   * Use for controls/navigation: tab bars, sidebars, alerts, popovers
   * Blurs and adjusts luminosity, scroll edge effects
   */
  regular: `
    liquid-glass-regular
    rim-light-ios26
    liquid-glass-specular
    noise-grain
  `,

  /**
   * Clear variant - Apple Liquid Glass 2026
   * Use for components over photos/videos/rich backgrounds
   * Highly translucent with 35% dimming layer option
   */
  clear: `
    liquid-glass-clear
    rim-light-ios26
    liquid-glass-specular-clear
    noise-grain
  `,

  /**
   * Standard liquid glass material (alias for regular)
   * Use for most UI components
   */
  base: `
    liquid-glass-regular
    rim-light-ios26
    liquid-glass-specular
    noise-grain
  `,

  /**
   * Elevated glass material
   * More prominent, higher z-index elements (modals, floating panels)
   */
  elevated: `
    liquid-glass-elevated
    rim-light-ios26
    liquid-glass-specular
    noise-grain
    shadow-glass-elevated
  `,

  /**
   * Subtle glass material
   * More transparent, lighter feel
   */
  subtle: `
    backdrop-blur-[60px] saturate-[180%]
    bg-white/15 dark:bg-slate-900/20
    border border-white/20 dark:border-white/08
  `,

  /**
   * Solid glass material
   * Less transparent, more opaque
   */
  solid: `
    backdrop-blur-[80px] saturate-[200%]
    bg-white/70 dark:bg-slate-800/70
    border border-white/40 dark:border-white/20
  `,

  /**
   * Interactive glass material
   * For buttons, clickable items
   */
  interactive: `
    liquid-glass-interactive
    cursor-pointer
  `,
} as const;

// ==================== RADIUS TOKENS ====================

/**
 * iOS 26 Border Radius Standard
 * Large cards: 24-32px
 * Medium cards: 18-22px
 * Buttons/small: 12-16px
 */
export const glassRadius = {
  xs: 'rounded-[12px]',   // 12px - Small buttons, icons
  sm: 'rounded-[14px]',   // 14px - Standard buttons, toggles
  md: 'rounded-[18px]',   // 18px - Medium cards, inputs
  lg: 'rounded-[24px]',   // 24px - Large cards, panels
  xl: 'rounded-[28px]',   // 28px - Extra large containers
  '2xl': 'rounded-[32px]', // 32px - Full modals
  full: 'rounded-full',   // 9999px - Circular (icons at 50%)
} as const;

/**
 * Raw pixel values for use in inline styles
 */
export const glassRadiusPx = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 24,
  xl: 28,
  '2xl': 32,
} as const;

// ==================== BLUR TOKENS ====================

/**
 * iOS 26 Standard: 40px universal blur
 */
export const glassBlur = {
  none: 'backdrop-blur-none',
  sm: 'backdrop-blur-[20px]',   // 20px - Button blur
  md: 'backdrop-blur-[40px]',   // 40px - Standard (iOS 26)
  lg: 'backdrop-blur-[40px]',   // 40px - Same as standard
  xl: 'backdrop-blur-[40px]',   // 40px - Same as standard
  '2xl': 'backdrop-blur-[40px]', // 40px - Same as standard
} as const;

// ==================== SHADOW TOKENS ====================

/**
 * iOS 26 Simplified Shadow Format
 * box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
 * box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
 */
export const glassShadow = {
  /**
   * Base shadow for standard glass elements
   */
  base: `
    shadow-[0_8px_32px_rgba(0,0,0,0.1)]
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
    dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
  `,

  /**
   * Elevated shadow for higher z-index
   */
  elevated: `
    shadow-[0_8px_32px_rgba(0,0,0,0.12)]
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]
    dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
  `,

  /**
   * Inset shadow for depth
   */
  inset: `
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
  `,

  /**
   * Glow shadow for focus states
   */
  glow: `
    shadow-[0_0_32px_rgba(0,122,255,0.12)]
    dark:shadow-[0_0_32px_rgba(0,122,255,0.2)]
  `,

  /**
   * Error state glow
   */
  glowError: `
    shadow-[0_4px_24px_rgba(255,59,48,0.3)]
    dark:shadow-[0_4px_24px_rgba(255,59,48,0.35)]
  `,

  /**
   * Success state glow
   */
  glowSuccess: `
    shadow-[0_4px_24px_rgba(52,199,89,0.3)]
    dark:shadow-[0_4px_24px_rgba(52,199,89,0.35)]
  `,
} as const;

// ==================== COLOR TOKENS ====================

export const glassColors = {
  /**
   * Background colors
   */
  background: {
    light: 'bg-white/25',
    lightSubtle: 'bg-white/15',
    lightSolid: 'bg-white/50',
    dark: 'bg-slate-900/65',
    darkSubtle: 'bg-slate-800/40',
    darkSolid: 'bg-slate-800/70',
  },

  /**
   * Border colors
   */
  border: {
    light: 'border-white/50',
    lightSubtle: 'border-white/30',
    dark: 'border-white/12',
    darkSubtle: 'border-white/8',
  },

  /**
   * Rim light colors
   */
  rim: {
    light: 'border-white/70',
    dark: 'border-white/20',
  },
} as const;

// ==================== TRANSITION TOKENS ====================

export const glassTransition = {
  /**
   * Fast transition for micro-interactions
   */
  fast: 'transition-all duration-[150ms]', // 0.15s

  /**
   * Default transition
   */
  default: 'transition-all duration-[300ms]', // 0.3s

  /**
   * Slow transition for major changes
   */
  slow: 'transition-all duration-[500ms]', // 0.5s

  /**
   * Apple physics easing
   */
  easeApple: 'ease-[cubic-bezier(0.25,1,0.5,1)]',
  easeAppleIn: 'ease-[cubic-bezier(0.42,0,1,1)]',
  easeAppleOut: 'ease-[cubic-bezier(0,0,0.58,1)]',
} as const;

// ==================== COMPONENT STYLES ====================

export const glassStyles = {
  /**
   * Input styling
   */
  input: `
    ${glassBlur.lg}
    ${glassRadius.md}
    ${glassColors.background.light}
    dark:${glassColors.background.dark}
    ${glassColors.border.light}
    dark:${glassColors.border.dark}
    ${glassShadow.base}
    ${glassTransition.default}
    ${glassTransition.easeApple}
  `,

  /**
   * Button styling
   */
  button: `
    ${glassBlur.md}
    ${glassRadius.md}
    ${glassColors.background.lightSubtle}
    dark:${glassColors.background.darkSubtle}
    ${glassColors.border.light}
    dark:${glassColors.border.dark}
    hover:bg-white/70
    dark:hover:bg-white/15
    active:scale-[0.98]
    ${glassTransition.default}
  `,

  /**
   * Card styling
   */
  card: `
    ${glassMaterial.base}
    ${glassRadius.xl}
    ${glassColors.background.light}
    dark:${glassColors.background.dark}
    ${glassColors.border.light}
    dark:${glassColors.border.dark}
    ${glassShadow.base}
  `,

  /**
   * Modal styling
   */
  modal: `
    ${glassMaterial.elevated}
    ${glassRadius['2xl']}
    ${glassColors.background.light}
    dark:${glassColors.background.dark}
    ${glassShadow.elevated}
  `,

  /**
   * Pill styling (badges, tags)
   */
  pill: `
    ${glassBlur.md}
    ${glassRadius.full}
    ${glassColors.background.lightSubtle}
    dark:${glassColors.background.darkSubtle}
    ${glassColors.border.light}
    dark:${glassColors.border.dark}
    px-3 py-1
  `,
} as const;

// ==================== FOCUS RING STYLES ====================

export const glassFocusRing = {
  /**
   * Primary focus ring (blue)
   */
  primary: `
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500/20
    focus:border-blue-500/50
    dark:focus:ring-blue-500/30
    dark:focus:border-blue-500/50
    ${glassTransition.fast}
  `,

  /**
   * Error focus ring (red)
   */
  error: `
    focus:outline-none
    focus:ring-2
    focus:ring-red-500/20
    focus:border-red-500/50
    dark:focus:ring-red-500/30
    dark:focus:border-red-500/50
    ${glassTransition.fast}
  `,

  /**
   * Success focus ring (green)
   */
  success: `
    focus:outline-none
    focus:ring-2
    focus:ring-green-500/20
    focus:border-green-500/50
    dark:focus:ring-green-500/30
    dark:focus:border-green-500/50
    ${glassTransition.fast}
  `,
} as const;

// ==================== PRESETS ====================

export const glassPresets = {
  /**
   * Standard input
   */
  input: `
    h-12 px-4
    ${glassStyles.input}
    ${glassFocusRing.primary}
  `,

  /**
   * Primary button
   */
  button: `
    h-10 px-4
    ${glassStyles.button}
    ${glassFocusRing.primary}
  `,

  /**
   * Card
   */
  card: `
    p-6
    ${glassStyles.card}
  `,

  /**
   * Modal
   */
  modal: `
    p-8
    ${glassStyles.modal}
  `,
} as const;

// ==================== EXPORTS ====================

// ==================== SCROLL-REACTIVE BEHAVIOR ====================

/**
 * Scroll-reactive animations for headers and tab bars
 * Tab bars shrink on scroll, fluidly expand on scroll back
 */
export const scrollBehavior = {
  /**
   * Header shrink animation values (iOS 26: 40px universal blur)
   */
  header: {
    expanded: {
      height: 64,
      padding: 16,
      blur: 40,
      opacity: 0.2,
    },
    collapsed: {
      height: 48,
      padding: 8,
      blur: 40,
      opacity: 0.25,
    },
    threshold: 50, // px scroll before starting shrink
    transitionDuration: 200, // ms (faster: 0.2s)
  },
  /**
   * Tab bar shrink animation
   */
  tabBar: {
    expanded: {
      height: 56,
      iconSize: 24,
      labelOpacity: 1,
    },
    collapsed: {
      height: 44,
      iconSize: 20,
      labelOpacity: 0,
    },
    threshold: 100,
  },
} as const;

// ==================== REFRACTION EFFECTS ====================

/**
 * Refraction gradient for content showing through glass
 */
export const refractionEffect = {
  /**
   * Default refraction gradient
   */
  default: `
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      rgba(255, 255, 255, 0) 100%
    )
  `,
  /**
   * Enhanced refraction for elevated glass
   */
  elevated: `
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0) 100%
    )
  `,
} as const;

// ==================== SCROLL EDGE EFFECTS ====================

/**
 * Scroll edge blur enhancement for navigation elements
 */
export const scrollEdgeEffect = {
  /**
   * Top edge blur gradient
   */
  top: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 100%)',
  /**
   * Bottom edge blur gradient
   */
  bottom: 'linear-gradient(to top, rgba(255,255,255,0.3) 0%, transparent 100%)',
  /**
   * Scroll indicator fade
   */
  indicator: {
    height: 40,
    opacity: 0.6,
  },
} as const;

/**
 * Default export containing all tokens
 */
export const glassTokens = {
  specs: appleLiquidGlassSpecs,
  systemColors: appleSystemColors,
  material: glassMaterial,
  radius: glassRadius,
  radiusPx: glassRadiusPx,
  blur: glassBlur,
  shadow: glassShadow,
  colors: glassColors,
  transition: glassTransition,
  styles: glassStyles,
  focusRing: glassFocusRing,
  presets: glassPresets,
  scrollBehavior,
  refractionEffect,
  scrollEdgeEffect,
} as const;

export default glassTokens;
