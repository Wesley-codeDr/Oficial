/**
 * Apple Liquid Glass 2026 - Unified Design Tokens
 *
 * Single source of truth for all Liquid Glass design tokens in WellWave.
 * Consolidates material specifications, colors, animations, and healthcare semantics.
 *
 * Based on Apple Human Interface Guidelines WWDC 2025
 * https://developer.apple.com/design/human-interface-guidelines/materials
 *
 * @version 2.0.0
 * @date 2026-01-24
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Theme-dependent value pairs for light and dark modes
 */
export interface ThemeValues {
  light: number;
  dark: number;
}

/**
 * Material specification for glass variants
 */
export interface MaterialSpec {
  /** Backdrop blur in pixels (40-120px range) */
  blur: number;
  /** Saturation enhancement percentage (180-280%) */
  saturate: number;
  /** Background opacity by theme (0.12-0.38 range) */
  backgroundOpacity: ThemeValues;
  /** Border opacity by theme (0.25-0.50 range) */
  borderOpacity: ThemeValues;
  /** Specular highlight intensity (0.4-0.8 range) */
  specularIntensity: ThemeValues;
  /** Optional dimming layer opacity for clear variant */
  dimmingOpacity?: number;
}

/**
 * Border radius scale (pixels)
 */
export interface RadiusScale {
  /** 8px - Small pills, badges */
  xs: string;
  /** 12px - Buttons, inputs, small cards */
  sm: string;
  /** 16px - Medium cards, dialogs */
  md: string;
  /** 24px - Large cards, panels */
  lg: string;
  /** 32px - Modals, full sheets */
  xl: string;
  /** 40px - Hero elements */
  '2xl': string;
  /** 9999px - Circular elements */
  full: string;
}

/**
 * Raw radius values in pixels for inline styles
 */
export interface RadiusScalePx {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

/**
 * Shadow token definitions
 */
export interface ShadowTokens {
  /** Base shadow for standard elements */
  base: string;
  /** Elevated shadow for high z-index elements */
  elevated: string;
  /** Inset shadow for depth effects */
  inset: string;
  /** Glow shadows by color */
  glow: {
    blue: string;
    green: string;
    red: string;
    orange: string;
    teal: string;
    purple: string;
  };
}

/**
 * Spring physics configuration for Framer Motion
 */
export interface SpringConfig {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass: number;
}

/**
 * Animation token definitions
 */
export interface AnimationTokens {
  /** Duration values in milliseconds */
  duration: {
    /** 100ms - Micro feedback, instant response */
    instant: number;
    /** 200ms - Standard transitions, hovers */
    fast: number;
    /** 300ms - Default animations */
    normal: number;
    /** 500ms - Major transitions */
    slow: number;
    /** 700ms - Page transitions */
    slower: number;
  };
  /** Easing curves as cubic-bezier values [x1, y1, x2, y2] */
  easing: {
    /** Apple ease out - default transitions */
    standard: [number, number, number, number];
    /** Bounce effect - entry animations */
    spring: [number, number, number, number];
    /** Ease in - exit animations */
    in: [number, number, number, number];
    /** Ease out - entry animations */
    out: [number, number, number, number];
    /** Ease in-out - symmetric transitions */
    inOut: [number, number, number, number];
  };
  /** Spring physics for Framer Motion */
  spring: {
    /** Default spring - balanced feel */
    default: SpringConfig;
    /** Glass spring - smooth glass movements */
    glass: SpringConfig;
    /** Soft spring - gentle animations */
    soft: SpringConfig;
    /** Haptic spring - button feedback */
    haptic: SpringConfig;
  };
}

/**
 * System color palette
 */
export interface SystemColors {
  blue: { light: string; dark: string };
  green: { light: string; dark: string };
  red: { light: string; dark: string };
  orange: { light: string; dark: string };
  yellow: { light: string; dark: string };
  teal: { light: string; dark: string };
  purple: { light: string; dark: string };
}

/**
 * Color tokens for backgrounds, text, and glass surfaces
 */
export interface ColorTokens {
  /** Apple 2026 System Colors */
  system: SystemColors;
  /** Background colors */
  background: {
    /** Page background - light mode */
    primaryLight: string;
    /** Page background - dark mode */
    primaryDark: string;
    /** Secondary surfaces */
    secondaryLight: string;
    secondaryDark: string;
    /** Tertiary surfaces */
    tertiaryLight: string;
    tertiaryDark: string;
  };
  /** Text colors */
  text: {
    primaryLight: string;
    primaryDark: string;
    secondaryLight: string;
    secondaryDark: string;
    tertiaryLight: string;
    tertiaryDark: string;
    inverseLight: string;
    inverseDark: string;
  };
  /** Glass-specific colors */
  glass: {
    surfaceLight: string;
    surfaceDark: string;
    borderLight: string;
    borderDark: string;
    shadowLight: string;
    shadowDark: string;
    highlightLight: string;
    highlightDark: string;
  };
}

/**
 * Healthcare semantic color palette
 */
export interface HealthcareColors {
  /** Trust, clinical blue */
  primary: { light: string; dark: string };
  /** Positive outcomes, success */
  success: { light: string; dark: string };
  /** Attention needed, warnings */
  warning: { light: string; dark: string };
  /** Emergency, urgent, critical */
  critical: { light: string; dark: string };
  /** Informational, neutral */
  info: { light: string; dark: string };
}

/**
 * Emergency mode configuration
 */
export interface EmergencyConfig {
  /** Reduce glass effects for clarity */
  reduceEffects: boolean;
  /** Force high contrast mode */
  highContrast: boolean;
  /** Critical alert z-index (above all other elements) */
  alertZIndex: number;
  /** Background opacity increase in emergency mode */
  backgroundOpacityMultiplier: number;
}

/**
 * Red flag visualization settings
 */
export interface RedFlagConfig {
  /** Minimum contrast ratio for WCAG AAA (7:1) */
  minContrastRatio: number;
  /** Enable pulse animation for visibility */
  pulseAnimation: boolean;
  /** Ensure visibility above all glass overlays */
  persistentVisibility: boolean;
  /** Z-index for red flag alerts */
  zIndex: number;
}

/**
 * Healthcare-specific token definitions
 */
export interface HealthcareTokens {
  /** Semantic colors for medical context */
  colors: HealthcareColors;
  /** Emergency mode settings */
  emergency: EmergencyConfig;
  /** Red flag visualization settings */
  redFlag: RedFlagConfig;
  /** Z-index scale for critical alerts */
  zIndex: {
    base: number;
    dropdown: number;
    sticky: number;
    modal: number;
    popover: number;
    tooltip: number;
    criticalAlert: number;
    emergency: number;
  };
}

/**
 * Material variant types
 */
export type GlassMaterialVariant = 'regular' | 'clear' | 'elevated' | 'subtle';

/**
 * Healthcare semantic variant types
 */
export type HealthcareVariant =
  | 'healthcare-primary'
  | 'healthcare-success'
  | 'healthcare-warning'
  | 'healthcare-critical'
  | 'healthcare-info';

/**
 * Combined variant type
 */
export type GlassVariant = GlassMaterialVariant | HealthcareVariant;

/**
 * Icon color configuration for sidebar items
 */
export interface IconColorConfig {
  /** Gradient for active state background */
  gradient: string;
  /** Gradient for dark mode active state */
  gradientDark: string;
  /** Icon color when active (light mode) */
  iconActive: string;
  /** Icon color when active (dark mode) */
  iconActiveDark: string;
  /** Glow shadow for active state */
  glowShadow: string;
  /** Border color when active */
  borderActive: string;
  /** Border color for dark mode */
  borderActiveDark: string;
}

/**
 * Complete glass tokens structure
 */
export interface GlassTokens {
  /** Material specifications by variant */
  materials: Record<GlassMaterialVariant, MaterialSpec>;
  /** Border radius scale */
  radius: RadiusScale;
  /** Raw radius values in pixels */
  radiusPx: RadiusScalePx;
  /** Shadow definitions */
  shadows: ShadowTokens;
  /** Animation configurations */
  animations: AnimationTokens;
  /** Color palette */
  colors: ColorTokens;
  /** Healthcare semantic tokens */
  healthcare: HealthcareTokens;
}

// ============================================
// MATERIAL SPECIFICATIONS
// ============================================

/**
 * Apple Liquid Glass Material Specifications (iOS 26 Standard)
 * Universal blur: 40px, Saturate: 180%
 */
export const materials: Record<GlassMaterialVariant, MaterialSpec> = {
  /**
   * Regular variant - Standard glass for most UI elements
   * Use for: controls, navigation, tab bars, sidebars, alerts, popovers
   */
  regular: {
    blur: 40,
    saturate: 180,
    backgroundOpacity: { light: 0.22, dark: 0.28 },
    borderOpacity: { light: 0.30, dark: 0.18 },
    specularIntensity: { light: 0.6, dark: 0.4 },
  },
  /**
   * Clear variant - Highly translucent glass
   * Use for: components over photos/videos/rich backgrounds
   */
  clear: {
    blur: 40,
    saturate: 180,
    backgroundOpacity: { light: 0.15, dark: 0.20 },
    borderOpacity: { light: 0.25, dark: 0.12 },
    specularIntensity: { light: 0.4, dark: 0.25 },
    dimmingOpacity: 0.35,
  },
  /**
   * Elevated variant - Prominent glass for high z-index elements
   * Use for: modals, floating panels, sheets, dialogs
   */
  elevated: {
    blur: 40,
    saturate: 180,
    backgroundOpacity: { light: 0.35, dark: 0.42 },
    borderOpacity: { light: 0.45, dark: 0.25 },
    specularIntensity: { light: 0.7, dark: 0.5 },
  },
  /**
   * Subtle variant - Minimal glass effect
   * Use for: low-emphasis backgrounds, secondary surfaces
   */
  subtle: {
    blur: 40,
    saturate: 180,
    backgroundOpacity: { light: 0.18, dark: 0.22 },
    borderOpacity: { light: 0.22, dark: 0.15 },
    specularIntensity: { light: 0.3, dark: 0.2 },
  },
};

// ============================================
// ANIMATION TOKENS (Task 1.2)
// ============================================

/**
 * Animation duration scale in milliseconds
 */
export const animationDuration = {
  /** 100ms - Micro feedback, instant response */
  instant: 100,
  /** 200ms - Standard transitions, hovers */
  fast: 200,
  /** 300ms - Default animations */
  normal: 300,
  /** 500ms - Major transitions */
  slow: 500,
  /** 700ms - Page transitions */
  slower: 700,
} as const;

/**
 * CSS custom property references for animation durations
 */
export const animationDurationCSS = {
  instant: 'var(--glass-duration-instant, 100ms)',
  fast: 'var(--glass-duration-fast, 200ms)',
  normal: 'var(--glass-duration-normal, 300ms)',
  slow: 'var(--glass-duration-slow, 500ms)',
  slower: 'var(--glass-duration-slower, 700ms)',
} as const;

/**
 * Easing curves as cubic-bezier values
 */
export const easingCurves = {
  /** Apple ease out - default transitions (cubic-bezier(0.25, 1, 0.5, 1)) */
  standard: [0.25, 1, 0.5, 1] as [number, number, number, number],
  /** Spring/bounce effect - entry animations (cubic-bezier(0.34, 1.56, 0.64, 1)) */
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Ease in - exit animations (cubic-bezier(0.42, 0, 1, 1)) */
  in: [0.42, 0, 1, 1] as [number, number, number, number],
  /** Ease out - entry animations (cubic-bezier(0, 0, 0.58, 1)) */
  out: [0, 0, 0.58, 1] as [number, number, number, number],
  /** Ease in-out - symmetric transitions (cubic-bezier(0.42, 0, 0.58, 1)) */
  inOut: [0.42, 0, 0.58, 1] as [number, number, number, number],
} as const;

/**
 * CSS cubic-bezier string representations
 */
export const easingCSS = {
  standard: 'cubic-bezier(0.25, 1, 0.5, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  in: 'cubic-bezier(0.42, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.58, 1)',
  inOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
} as const;

/**
 * CSS custom property references for easing
 */
export const easingCSSVars = {
  standard: 'var(--glass-ease-standard, cubic-bezier(0.25, 1, 0.5, 1))',
  spring: 'var(--glass-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1))',
  in: 'var(--glass-ease-in, cubic-bezier(0.42, 0, 1, 1))',
  out: 'var(--glass-ease-out, cubic-bezier(0, 0, 0.58, 1))',
  inOut: 'var(--glass-ease-in-out, cubic-bezier(0.42, 0, 0.58, 1))',
} as const;

/**
 * Spring physics configurations for Framer Motion
 */
export const springConfigs = {
  /** Default spring - balanced feel */
  default: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },
  /** Glass spring - smooth glass movements */
  glass: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
    mass: 0.8,
  },
  /** Soft spring - gentle animations */
  soft: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
    mass: 1.2,
  },
  /** Haptic spring - button feedback */
  haptic: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },
} as const;

/**
 * Complete animation tokens object
 */
export const animations: AnimationTokens = {
  duration: animationDuration,
  easing: easingCurves,
  spring: springConfigs,
};

// ============================================
// COLOR PALETTE
// ============================================

/**
 * Apple System Colors (iOS 26)
 */
export const systemColors: SystemColors = {
  blue: { light: '#007AFF', dark: '#0A84FF' },
  green: { light: '#34C759', dark: '#30D158' },
  red: { light: '#FF3B30', dark: '#FF453A' },
  orange: { light: '#FF9500', dark: '#FF9F0A' },
  yellow: { light: '#FFCC00', dark: '#FFD60A' },
  teal: { light: '#5AC8FA', dark: '#64D2FF' },
  purple: { light: '#AF52DE', dark: '#BF5AF2' },
};

/**
 * Legacy system colors (flat values for backward compatibility)
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

/**
 * Complete color tokens
 */
export const colors: ColorTokens = {
  system: systemColors,
  background: {
    primaryLight: '#F5F9FF',
    primaryDark: '#0F172A',
    secondaryLight: '#FFFFFF',
    secondaryDark: '#1E293B',
    tertiaryLight: '#F8FAFC',
    tertiaryDark: '#334155',
  },
  text: {
    primaryLight: '#0F172A',
    primaryDark: '#F8FAFC',
    secondaryLight: '#475569',
    secondaryDark: '#94A3B8',
    tertiaryLight: '#94A3B8',
    tertiaryDark: '#64748B',
    inverseLight: '#FFFFFF',
    inverseDark: '#0F172A',
  },
  glass: {
    surfaceLight: 'rgba(255, 255, 255, 0.25)',
    surfaceDark: 'rgba(30, 41, 59, 0.65)',
    borderLight: 'rgba(255, 255, 255, 0.50)',
    borderDark: 'rgba(255, 255, 255, 0.12)',
    shadowLight: 'rgba(0, 0, 0, 0.10)',
    shadowDark: 'rgba(0, 0, 0, 0.35)',
    highlightLight: 'rgba(255, 255, 255, 0.80)',
    highlightDark: 'rgba(255, 255, 255, 0.40)',
  },
};

// ============================================
// HEALTHCARE TOKENS (Task 1.3)
// ============================================

/**
 * Healthcare semantic color palette
 * Based on medical color psychology and WCAG guidelines
 */
export const healthcareColors: HealthcareColors = {
  /** Primary blue - Trust, clinical, professional */
  primary: { light: '#007AFF', dark: '#0A84FF' },
  /** Success green - Positive outcomes, vitals normal */
  success: { light: '#34C759', dark: '#30D158' },
  /** Warning orange - Attention needed, abnormal but not critical */
  warning: { light: '#FF9500', dark: '#FF9F0A' },
  /** Critical red - Emergency, urgent, life-threatening */
  critical: { light: '#FF3B30', dark: '#FF453A' },
  /** Info teal - Informational, neutral data */
  info: { light: '#5AC8FA', dark: '#64D2FF' },
};

/**
 * Emergency mode configuration
 */
export const emergencyConfig: EmergencyConfig = {
  reduceEffects: true,
  highContrast: true,
  alertZIndex: 9999,
  backgroundOpacityMultiplier: 1.5,
};

/**
 * Red flag visualization configuration
 * Ensures critical medical alerts are always visible
 */
export const redFlagConfig: RedFlagConfig = {
  minContrastRatio: 7.0, // WCAG AAA
  pulseAnimation: true,
  persistentVisibility: true,
  zIndex: 9990,
};

/**
 * Z-index scale for critical alerts and overlays
 */
export const zIndexScale = {
  /** Base level for standard content */
  base: 0,
  /** Dropdown menus and selects */
  dropdown: 100,
  /** Sticky headers and navigation */
  sticky: 200,
  /** Modal dialogs */
  modal: 500,
  /** Popovers and tooltips */
  popover: 600,
  /** Tooltips (above popovers) */
  tooltip: 700,
  /** Critical medical alerts (above modals) */
  criticalAlert: 9000,
  /** Emergency mode overlay (highest) */
  emergency: 9999,
} as const;

/**
 * Complete healthcare tokens object
 */
export const healthcare: HealthcareTokens = {
  colors: healthcareColors,
  emergency: emergencyConfig,
  redFlag: redFlagConfig,
  zIndex: zIndexScale,
};

// ============================================
// RADIUS TOKENS
// ============================================

/**
 * Border radius scale (Tailwind classes)
 */
export const glassRadius: RadiusScale = {
  xs: 'rounded-[8px]',
  sm: 'rounded-[12px]',
  md: 'rounded-[16px]',
  lg: 'rounded-[24px]',
  xl: 'rounded-[32px]',
  '2xl': 'rounded-[40px]',
  full: 'rounded-full',
};

/**
 * Raw radius values in pixels for inline styles
 */
export const glassRadiusPx: RadiusScalePx = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

/**
 * CSS custom property references for radius
 */
export const radiusCSS = {
  xs: 'var(--glass-radius-xs, 8px)',
  sm: 'var(--glass-radius-sm, 12px)',
  md: 'var(--glass-radius-md, 16px)',
  lg: 'var(--glass-radius-lg, 24px)',
  xl: 'var(--glass-radius-xl, 32px)',
  '2xl': 'var(--glass-radius-2xl, 40px)',
  full: 'var(--glass-radius-full, 9999px)',
} as const;

// ============================================
// SHADOW TOKENS
// ============================================

/**
 * Shadow definitions (Tailwind classes)
 */
export const glassShadow = {
  base: `
    shadow-[0_8px_32px_rgba(0,0,0,0.1)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
  `.trim(),
  elevated: `
    shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.08)]
    dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35),0_8px_24px_-8px_rgba(0,0,0,0.15)]
  `.trim(),
  inset: 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]',
  glow: {
    blue: 'shadow-[0_0_32px_rgba(0,122,255,0.15)] dark:shadow-[0_0_32px_rgba(10,132,255,0.25)]',
    green: 'shadow-[0_0_32px_rgba(52,199,89,0.15)] dark:shadow-[0_0_32px_rgba(48,209,88,0.25)]',
    red: 'shadow-[0_0_32px_rgba(255,59,48,0.15)] dark:shadow-[0_0_32px_rgba(255,69,58,0.25)]',
    orange: 'shadow-[0_0_32px_rgba(255,149,0,0.15)] dark:shadow-[0_0_32px_rgba(255,159,10,0.25)]',
    teal: 'shadow-[0_0_32px_rgba(90,200,250,0.15)] dark:shadow-[0_0_32px_rgba(100,210,255,0.25)]',
    purple: 'shadow-[0_0_32px_rgba(175,82,222,0.15)] dark:shadow-[0_0_32px_rgba(191,90,242,0.25)]',
  },
} as const;

/**
 * CSS shadow values for inline styles
 */
export const shadowCSS = {
  base: {
    light: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
    dark: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
  },
  elevated: {
    light: '0 20px 60px -15px rgba(0, 0, 0, 0.15), 0 8px 24px -8px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.8)',
    dark: '0 20px 60px -15px rgba(0, 0, 0, 0.35), 0 8px 24px -8px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
  },
} as const;

// ============================================
// MATERIAL VARIANT CLASSES (Tailwind)
// ============================================

/**
 * Glass material Tailwind class combinations
 */
export const glassMaterial = {
  /**
   * Regular variant - Apple Liquid Glass 2026
   * Use for controls/navigation: tab bars, sidebars, alerts, popovers
   */
  regular: `
    liquid-glass-regular
    rim-light-ios26
    liquid-glass-specular
    noise-grain
  `.trim().replace(/\s+/g, ' '),

  /**
   * Clear variant - Apple Liquid Glass 2026
   * Use for components over photos/videos/rich backgrounds
   */
  clear: `
    liquid-glass-clear
    rim-light-ios26
    liquid-glass-specular-clear
    noise-grain
  `.trim().replace(/\s+/g, ' '),

  /**
   * Elevated glass material
   * Use for modals, floating panels, high z-index elements
   */
  elevated: `
    liquid-glass-elevated
    rim-light-ios26
    liquid-glass-specular
    noise-grain
    shadow-glass-elevated
  `.trim().replace(/\s+/g, ' '),

  /**
   * Subtle glass material
   * Use for low-emphasis backgrounds
   */
  subtle: `
    liquid-glass-subtle
    bg-white/15 dark:bg-slate-900/20
    border border-white/20 dark:border-white/08
  `.trim().replace(/\s+/g, ' '),

  /**
   * Base alias for regular
   */
  base: `
    liquid-glass-regular
    rim-light-ios26
    liquid-glass-specular
    noise-grain
  `.trim().replace(/\s+/g, ' '),

  /**
   * Interactive glass for buttons/clickable items
   */
  interactive: `
    liquid-glass-interactive
    cursor-pointer
  `.trim().replace(/\s+/g, ' '),
} as const;

// ============================================
// TRANSITION TOKENS
// ============================================

/**
 * Transition class combinations (Tailwind)
 */
export const glassTransition = {
  fast: 'transition-all duration-[150ms]',
  default: 'transition-all duration-[300ms]',
  slow: 'transition-all duration-[500ms]',
  easeApple: 'ease-[cubic-bezier(0.25,1,0.5,1)]',
  easeAppleIn: 'ease-[cubic-bezier(0.42,0,1,1)]',
  easeAppleOut: 'ease-[cubic-bezier(0,0,0.58,1)]',
} as const;

// ============================================
// SCROLL BEHAVIOR
// ============================================

/**
 * Scroll-reactive animations for headers and tab bars
 */
export const scrollBehavior = {
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
    threshold: 50,
    transitionDuration: 200,
  },
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

// ============================================
// ICON COLOR CONFIGURATIONS
// (Merged from liquidGlassColors.ts)
// ============================================

export type IconColorKey =
  | 'dashboard'
  | 'anamnese'
  | 'flash'
  | 'chat'
  | 'prescricao'
  | 'historico'
  | 'biblioteca'
  | 'acessibilidade'
  | 'ajustes';

/**
 * Liquid Glass color configuration for each sidebar icon
 * Based on Apple HIG iOS 26 with medical-appropriate color psychology
 */
export const iconColors: Record<IconColorKey, IconColorConfig> = {
  dashboard: {
    gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(99, 102, 241, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(14, 165, 233, 0.35) 0%, rgba(59, 130, 246, 0.25) 50%, rgba(99, 102, 241, 0.15) 100%)',
    iconActive: '#0284C7',
    iconActiveDark: '#38BDF8',
    glowShadow: '0 4px 20px rgba(14, 165, 233, 0.3)',
    borderActive: 'rgba(14, 165, 233, 0.35)',
    borderActiveDark: 'rgba(56, 189, 248, 0.3)',
  },
  anamnese: {
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(34, 197, 94, 0.15) 50%, rgba(20, 184, 166, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(34, 197, 94, 0.25) 50%, rgba(20, 184, 166, 0.15) 100%)',
    iconActive: '#059669',
    iconActiveDark: '#34D399',
    glowShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
    borderActive: 'rgba(16, 185, 129, 0.35)',
    borderActiveDark: 'rgba(52, 211, 153, 0.3)',
  },
  flash: {
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(251, 191, 36, 0.15) 50%, rgba(249, 115, 22, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(245, 158, 11, 0.35) 0%, rgba(251, 191, 36, 0.25) 50%, rgba(249, 115, 22, 0.15) 100%)',
    iconActive: '#D97706',
    iconActiveDark: '#FBBF24',
    glowShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
    borderActive: 'rgba(245, 158, 11, 0.35)',
    borderActiveDark: 'rgba(251, 191, 36, 0.3)',
  },
  chat: {
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(192, 132, 252, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(168, 85, 247, 0.25) 50%, rgba(192, 132, 252, 0.15) 100%)',
    iconActive: '#7C3AED',
    iconActiveDark: '#A78BFA',
    glowShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
    borderActive: 'rgba(139, 92, 246, 0.35)',
    borderActiveDark: 'rgba(167, 139, 250, 0.3)',
  },
  prescricao: {
    gradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(14, 165, 233, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(20, 184, 166, 0.35) 0%, rgba(6, 182, 212, 0.25) 50%, rgba(14, 165, 233, 0.15) 100%)',
    iconActive: '#0D9488',
    iconActiveDark: '#2DD4BF',
    glowShadow: '0 4px 20px rgba(20, 184, 166, 0.3)',
    borderActive: 'rgba(20, 184, 166, 0.35)',
    borderActiveDark: 'rgba(45, 212, 191, 0.3)',
  },
  historico: {
    gradient: 'linear-gradient(135deg, rgba(100, 116, 139, 0.25) 0%, rgba(71, 85, 105, 0.15) 50%, rgba(99, 102, 241, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(100, 116, 139, 0.35) 0%, rgba(71, 85, 105, 0.25) 50%, rgba(99, 102, 241, 0.15) 100%)',
    iconActive: '#475569',
    iconActiveDark: '#94A3B8',
    glowShadow: '0 4px 20px rgba(100, 116, 139, 0.25)',
    borderActive: 'rgba(100, 116, 139, 0.35)',
    borderActiveDark: 'rgba(148, 163, 184, 0.3)',
  },
  biblioteca: {
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(245, 158, 11, 0.15) 50%, rgba(234, 88, 12, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(249, 115, 22, 0.35) 0%, rgba(245, 158, 11, 0.25) 50%, rgba(234, 88, 12, 0.15) 100%)',
    iconActive: '#EA580C',
    iconActiveDark: '#FB923C',
    glowShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
    borderActive: 'rgba(249, 115, 22, 0.35)',
    borderActiveDark: 'rgba(251, 146, 60, 0.3)',
  },
  acessibilidade: {
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(168, 85, 247, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.25) 50%, rgba(168, 85, 247, 0.15) 100%)',
    iconActive: '#4F46E5',
    iconActiveDark: '#818CF8',
    glowShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
    borderActive: 'rgba(99, 102, 241, 0.35)',
    borderActiveDark: 'rgba(129, 140, 248, 0.3)',
  },
  ajustes: {
    gradient: 'linear-gradient(135deg, rgba(107, 114, 128, 0.25) 0%, rgba(75, 85, 99, 0.15) 50%, rgba(55, 65, 81, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(107, 114, 128, 0.35) 0%, rgba(75, 85, 99, 0.25) 50%, rgba(55, 65, 81, 0.15) 100%)',
    iconActive: '#4B5563',
    iconActiveDark: '#9CA3AF',
    glowShadow: '0 4px 20px rgba(107, 114, 128, 0.2)',
    borderActive: 'rgba(107, 114, 128, 0.35)',
    borderActiveDark: 'rgba(156, 163, 175, 0.3)',
  },
};

/**
 * Map sidebar item IDs to icon color keys
 */
export const sidebarItemColorMap: Record<string, IconColorKey> = {
  'dashboard': 'dashboard',
  'anamnese': 'anamnese',
  'flash': 'flash',
  'chat-well': 'chat',
  'prescricao': 'prescricao',
  'historico': 'historico',
  'protocolos': 'biblioteca',
  'acessibilidade': 'acessibilidade',
  'config': 'ajustes',
};

/**
 * Get color config for a sidebar item
 */
export function getIconColors(itemId: string): IconColorConfig {
  const colorKey = sidebarItemColorMap[itemId] || 'dashboard';
  return iconColors[colorKey];
}

/**
 * Tailwind-compatible gradient classes for icons
 */
export const tailwindGradientClasses = {
  dashboard: 'from-sky-500/25 via-blue-500/15 to-indigo-500/10',
  anamnese: 'from-emerald-500/25 via-green-500/15 to-teal-500/10',
  flash: 'from-amber-500/25 via-yellow-500/15 to-orange-500/10',
  chat: 'from-violet-500/25 via-purple-500/15 to-fuchsia-500/10',
  prescricao: 'from-teal-500/25 via-cyan-500/15 to-sky-500/10',
  historico: 'from-slate-500/25 via-gray-500/15 to-indigo-500/10',
  biblioteca: 'from-orange-500/25 via-amber-500/15 to-red-500/10',
  acessibilidade: 'from-indigo-500/25 via-violet-500/15 to-purple-500/10',
  ajustes: 'from-gray-500/25 via-slate-500/15 to-zinc-500/10',
} as const;

/**
 * Tailwind-compatible icon color classes
 */
export const tailwindIconClasses = {
  dashboard: { light: 'text-sky-600', dark: 'dark:text-sky-400' },
  anamnese: { light: 'text-emerald-600', dark: 'dark:text-emerald-400' },
  flash: { light: 'text-amber-600', dark: 'dark:text-amber-400' },
  chat: { light: 'text-violet-600', dark: 'dark:text-violet-400' },
  prescricao: { light: 'text-teal-600', dark: 'dark:text-teal-400' },
  historico: { light: 'text-slate-600', dark: 'dark:text-slate-400' },
  biblioteca: { light: 'text-orange-600', dark: 'dark:text-orange-400' },
  acessibilidade: { light: 'text-indigo-600', dark: 'dark:text-indigo-400' },
  ajustes: { light: 'text-gray-600', dark: 'dark:text-gray-400' },
} as const;

// ============================================
// LEGACY EXPORTS (Backward Compatibility)
// ============================================

/**
 * Legacy specs export (use `materials` instead)
 * @deprecated Use `materials` instead
 */
export const appleLiquidGlassSpecs = {
  regular: {
    blur: materials.regular.blur,
    backgroundOpacity: materials.regular.backgroundOpacity,
    borderOpacity: materials.regular.borderOpacity,
    specularIntensity: materials.regular.specularIntensity,
    saturate: materials.regular.saturate,
  },
  clear: {
    blur: materials.clear.blur,
    backgroundOpacity: materials.clear.backgroundOpacity,
    borderOpacity: materials.clear.borderOpacity,
    specularIntensity: materials.clear.specularIntensity,
    saturate: materials.clear.saturate,
    dimmingOpacity: materials.clear.dimmingOpacity,
  },
  elevated: {
    blur: materials.elevated.blur,
    backgroundOpacity: materials.elevated.backgroundOpacity,
    borderOpacity: materials.elevated.borderOpacity,
    specularIntensity: materials.elevated.specularIntensity,
    saturate: materials.elevated.saturate,
  },
} as const;

/**
 * Legacy blur export
 * @deprecated Use CSS classes directly
 */
export const glassBlur = {
  none: 'backdrop-blur-none',
  sm: 'liquid-glass-subtle',
  md: 'liquid-glass-default',
  lg: 'liquid-glass-default',
  xl: 'liquid-glass-default',
  '2xl': 'liquid-glass-default',
} as const;

/**
 * Legacy colors export
 * @deprecated Use `colors.glass` instead
 */
export const glassColors = {
  background: {
    light: 'bg-white/25',
    lightSubtle: 'bg-white/15',
    lightSolid: 'bg-white/50',
    dark: 'bg-slate-900/65',
    darkSubtle: 'bg-slate-800/40',
    darkSolid: 'bg-slate-800/70',
  },
  border: {
    light: 'border-white/50',
    lightSubtle: 'border-white/30',
    dark: 'border-white/12',
    darkSubtle: 'border-white/8',
  },
  rim: {
    light: 'border-white/70',
    dark: 'border-white/20',
  },
} as const;

/**
 * Legacy focus ring styles
 */
export const glassFocusRing = {
  primary: `
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500/20
    focus:border-blue-500/50
    dark:focus:ring-blue-500/30
    dark:focus:border-blue-500/50
    ${glassTransition.fast}
  `.trim().replace(/\s+/g, ' '),
  error: `
    focus:outline-none
    focus:ring-2
    focus:ring-red-500/20
    focus:border-red-500/50
    dark:focus:ring-red-500/30
    dark:focus:border-red-500/50
    ${glassTransition.fast}
  `.trim().replace(/\s+/g, ' '),
  success: `
    focus:outline-none
    focus:ring-2
    focus:ring-green-500/20
    focus:border-green-500/50
    dark:focus:ring-green-500/30
    dark:focus:border-green-500/50
    ${glassTransition.fast}
  `.trim().replace(/\s+/g, ' '),
} as const;

/**
 * Legacy styles export
 */
export const glassStyles = {
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
  `.trim().replace(/\s+/g, ' '),
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
  `.trim().replace(/\s+/g, ' '),
  card: `
    ${glassMaterial.base}
    ${glassRadius.xl}
    ${glassColors.background.light}
    dark:${glassColors.background.dark}
    ${glassColors.border.light}
    dark:${glassColors.border.dark}
    ${glassShadow.base}
  `.trim().replace(/\s+/g, ' '),
  modal: `
    ${glassMaterial.elevated}
    ${glassRadius['2xl']}
    ${glassColors.background.light}
    dark:${glassColors.background.dark}
    ${glassShadow.elevated}
  `.trim().replace(/\s+/g, ' '),
  pill: `
    ${glassBlur.md}
    ${glassRadius.full}
    ${glassColors.background.lightSubtle}
    dark:${glassColors.background.darkSubtle}
    ${glassColors.border.light}
    dark:${glassColors.border.dark}
    px-3 py-1
  `.trim().replace(/\s+/g, ' '),
} as const;

/**
 * Legacy presets export
 */
export const glassPresets = {
  input: `h-12 px-4 ${glassStyles.input} ${glassFocusRing.primary}`.trim().replace(/\s+/g, ' '),
  button: `h-10 px-4 ${glassStyles.button} ${glassFocusRing.primary}`.trim().replace(/\s+/g, ' '),
  card: `p-6 ${glassStyles.card}`.trim().replace(/\s+/g, ' '),
  modal: `p-8 ${glassStyles.modal}`.trim().replace(/\s+/g, ' '),
} as const;

/**
 * Refraction effects for glass
 */
export const refractionEffect = {
  default: `
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      rgba(255, 255, 255, 0) 100%
    )
  `.trim(),
  elevated: `
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0) 100%
    )
  `.trim(),
} as const;

/**
 * Scroll edge effects
 */
export const scrollEdgeEffect = {
  top: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, transparent 100%)',
  bottom: 'linear-gradient(to top, rgba(255,255,255,0.3) 0%, transparent 100%)',
  indicator: {
    height: 40,
    opacity: 0.6,
  },
} as const;

// ============================================
// COMPLETE TOKEN OBJECT
// ============================================

/**
 * Complete glass tokens object for unified access
 */
export const glassTokens: GlassTokens = {
  materials,
  radius: glassRadius,
  radiusPx: glassRadiusPx,
  shadows: {
    base: glassShadow.base,
    elevated: glassShadow.elevated,
    inset: glassShadow.inset,
    glow: glassShadow.glow,
  },
  animations,
  colors,
  healthcare,
};

/**
 * Default export containing all tokens (backward compatible)
 */
export default {
  // New unified structure
  ...glassTokens,
  // Legacy exports for backward compatibility
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
  // Icon colors from liquidGlassColors.ts
  iconColors,
  getIconColors,
  sidebarItemColorMap,
  tailwindGradientClasses,
  tailwindIconClasses,
};
