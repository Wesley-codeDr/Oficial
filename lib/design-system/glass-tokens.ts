/**
 * Apple Liquid Glass iOS 26 - Design Tokens
 * 
 * Centralized design tokens for consistent Liquid Glass implementation
 * across the WellWave application.
 */

// ==================== MATERIAL VARIANTS ====================

export const glassMaterial = {
  /**
   * Standard liquid glass material
   * Use for most UI components
   */
  base: `
    liquid-glass-material
    rim-light-ios26
    liquid-glass-specular
    noise-grain
  `,

  /**
   * Elevated glass material
   * More prominent, higher z-index elements
   */
  elevated: `
    liquid-glass-material
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
    backdrop-blur-xl
    bg-white/30 dark:bg-slate-800/30
    border border-white/30 dark:border-white/10
  `,

  /**
   * Solid glass material
   * Less transparent, more opaque
   */
  solid: `
    backdrop-blur-xl
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

export const glassRadius = {
  xs: 'rounded-lg',      // 8px
  sm: 'rounded-xl',     // 12px
  md: 'rounded-2xl',    // 16px - Apple squircle
  lg: 'rounded-3xl',    // 24px
  xl: 'rounded-[32px]', // 32px
  '2xl': 'rounded-[40px]', // 40px
  full: 'rounded-full', // 9999px
} as const;

// ==================== BLUR TOKENS ====================

export const glassBlur = {
  none: 'backdrop-blur-none',
  sm: 'backdrop-blur-sm',   // 12px
  md: 'backdrop-blur-md',   // 16px
  lg: 'backdrop-blur-xl',   // 40px - Apple standard
  xl: 'backdrop-blur-2xl',  // 80px
  '2xl': 'backdrop-blur-[100px]', // 100px
} as const;

// ==================== SHADOW TOKENS ====================

export const glassShadow = {
  /**
   * Base shadow for standard glass elements
   */
  base: `
    shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
    dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]
    dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
  `,

  /**
   * Elevated shadow for higher z-index
   */
  elevated: `
    shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]
    shadow-[inset_0_2px_0_rgba(255,255,255,0.9)]
    dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]
    dark:shadow-[inset_0_2px_0_rgba(255,255,255,0.15)]
  `,

  /**
   * Inset shadow for depth
   */
  inset: `
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
  `,

  /**
   * Glow shadow for focus states
   */
  glow: `
    shadow-[0_0_20px_rgba(0,122,255,0.25)]
    dark:shadow-[0_0_30px_rgba(0,122,255,0.4)]
  `,

  /**
   * Error state glow
   */
  glowError: `
    shadow-[0_0_20px_rgba(255,59,48,0.25)]
    dark:shadow-[0_0_30px_rgba(255,59,48,0.4)]
  `,

  /**
   * Success state glow
   */
  glowSuccess: `
    shadow-[0_0_20px_rgba(52,199,89,0.25)]
    dark:shadow-[0_0_30px_rgba(52,199,89,0.4)]
  `,
} as const;

// ==================== COLOR TOKENS ====================

export const glassColors = {
  /**
   * Background colors
   */
  background: {
    light: 'bg-white/55',
    lightSubtle: 'bg-white/40',
    lightSolid: 'bg-white/70',
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

/**
 * Default export containing all tokens
 */
export const glassTokens = {
  material: glassMaterial,
  radius: glassRadius,
  blur: glassBlur,
  shadow: glassShadow,
  colors: glassColors,
  transition: glassTransition,
  styles: glassStyles,
  focusRing: glassFocusRing,
  presets: glassPresets,
} as const;

export default glassTokens;
