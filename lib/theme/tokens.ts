/**
 * WellWave Design Tokens
 *
 * Variáveis de tema globais para o sistema WellWave
 * Baseado nas cores extraídas do logo WellWave
 *
 * @see types/glass-variants.ts - Para tipos de variantes consolidados
 */

// Import unified variant types
import type {
  GlassVariant,
  GlassMaterialVariant,
  HealthcareVariant,
  ButtonVariant,
  ButtonSize,
  BadgeVariant,
  BadgeSize,
  SizeVariant,
  GlowVariant,
  RadiusVariant,
} from '@/types/glass-variants';

// Re-export types for backward compatibility
export type {
  GlassVariant,
  GlassMaterialVariant,
  HealthcareVariant,
  ButtonVariant,
  ButtonSize,
  BadgeVariant,
  BadgeSize,
  SizeVariant,
  GlowVariant,
  RadiusVariant,
};

// ============ Variáveis de Blur e Saturação - Apple Liquid Glass 2026 ============
// iOS 26 Universal Standard: 40px blur, 180% saturate for ALL variants
export const BLUR_VALUES = {
  DEFAULT: '40px' as const,
  SUBTLE: '40px' as const,
  CLEAR: '40px' as const,
  ELEVATED: '40px' as const,
} as const;

export const SATURATE_VALUES = {
  DEFAULT: '180%' as const,
  SUBTLE: '180%' as const,
  CLEAR: '180%' as const,
  ELEVATED: '180%' as const,
} as const;

// ============ Variáveis de Opacidade ============
// Aligned with liquid-glass-2026.css values - Refinado para mais profundidade
export const OPACITY_VALUES = {
  DEFAULT: '0.26' as const,  // Reduzido de 0.25 para 0.26
  SUBTLE: '0.16' as const,  // Reduzido de 0.18 para 0.16
  CLEAR: '0.36' as const,   // Reduzido de 0.15 para 0.36
  ELEVATED: '0.46' as const, // Reduzido de 0.35 para 0.46
  MEDICAL: '0.20' as const,  // Reduzido de 0.30 para 0.20
} as const;

export const OPACITY_DARK_VALUES = {
  // Opacidade de fundo refinada para modo escuro - Refinado
  DEFAULT: '0.70' as const,  // Reduzido de 0.78 para 0.70
  SUBTLE: '0.60' as const,  // Reduzido de 0.66 para 0.60
  CLEAR: '0.80' as const,   // Reduzido de 0.48 para 0.80
  ELEVATED: '0.90' as const, // Reduzido de 0.84 para 0.90
  MEDICAL: '0.64' as const,  // Reduzido de 0.76 para 0.64
} as const;

// ============ Variáveis de Radius - Apple Liquid Glass 2026 ============
// iOS 26 Standard (8px base scale)
export const RADIUS_VALUES = {
  XS: '8px' as const,
  SM: '12px' as const,
  MD: '16px' as const,
  LG: '24px' as const,
  XL: '32px' as const,
  '2XL': '40px' as const,
  '3XL': '48px' as const,
} as const;

// Aliases for lowercase radius values used in components
export const RADIUS_ALIASES = {
  'small': 'SM',
  'medium': 'MD',
  'large': 'LG',
  'default': 'LG',
} as const;

export type RadiusAlias = keyof typeof RADIUS_ALIASES;

// ============ Variáveis de Specular Highlight ============
export const SPECULAR_VALUES = {
  // Reflexão especular no topo dos componentes
  DEFAULT: 'rgba(255, 255, 255, 0.6)' as const,
  SUBTLE: 'rgba(255, 255, 255, 0.4)' as const,
  CLEAR: 'rgba(255, 255, 255, 0.2)' as const,
  ELEVATED: 'rgba(255, 255, 255, 0.8)' as const,
} as const;

// ============ Variáveis de Inner Glow ============
export const INNER_GLOW_VALUES = {
  // Brilho interno suave
  DEFAULT: 'rgba(0, 34, 125, 0.1)' as const,
  SUBTLE: 'rgba(0, 34, 125, 0.05)' as const,
  CLEAR: 'rgba(0, 34, 125, 0.05)' as const,
  ELEVATED: 'rgba(0, 34, 125, 0.15)' as const,
} as const;

// ============ Variáveis de Rim Light ============
export const RIM_LIGHT_VALUES = {
  // Gradiente cônico ao redor dos componentes
  DEFAULT: 'conic-gradient(at 0% 0%, var(--ww-primary) 0%, transparent 100%, transparent)' as const,
  SUBTLE: 'conic-gradient(at 0% 0%, var(--ww-secondary) 0%, transparent 100%, transparent)' as const,
  CLEAR: 'conic-gradient(at 0% 0%, var(--ww-accent) 0%, transparent 100%, transparent)' as const,
  ELEVATED: 'conic-gradient(at 0% 0%, var(--ww-primary) 0%, transparent 100%, transparent)' as const,
} as const;

// ============ Variáveis de Noise Texture ============
export const NOISE_VALUES = {
  // Textura de ruído para autenticidade orgânica
  DEFAULT: '2.5%' as const,
  SUBTLE: '2%' as const,
  CLEAR: '1.5%' as const,
  ELEVATED: '3%' as const,
} as const;

export const NOISE_DARK_VALUES = {
  // Textura de ruído para modo escuro
  DEFAULT: '2%' as const,
  SUBTLE: '1.5%' as const,
  CLEAR: '1%' as const,
  ELEVATED: '2.5%' as const,
} as const;

// ============ Variáveis de Sombras - Apple Liquid Glass 2026 ============
// iOS 26 Multi-Layer Shadow System - Refinado para mais profundidade
export const SHADOW_VALUES = {
  // Apple Liquid Glass 2026 - iOS 26 Light Mode Shadows - Refinado
  DEFAULT: '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.05)' as const,
  SUBTLE: '0 2px 8px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)' as const,
  CLEAR: '0 6px 16px rgba(0, 0, 0, 0.10), 0 12px 32px rgba(0, 0, 0, 0.06)' as const,
  ELEVATED: '0 8px 20px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08), 0 24px 60px rgba(0, 0, 0, 0.04)' as const,
  MEDICAL: '0 4px 10px rgba(0, 0, 0, 0.07), 0 8px 20px rgba(0, 0, 0, 0.04)' as const,
} as const;

export const SHADOW_DARK_VALUES = {
  // Apple Liquid Glass 2026 - iOS 26 Dark Mode Shadows - Refinado
  DEFAULT: '0 4px 12px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.12)' as const,
  SUBTLE: '0 2px 8px rgba(0, 0, 0, 0.14), 0 4px 16px rgba(0, 0, 0, 0.09)' as const,
  CLEAR: '0 6px 16px rgba(0, 0, 0, 0.22), 0 12px 32px rgba(0, 0, 0, 0.15)' as const,
  ELEVATED: '0 8px 20px rgba(0, 0, 0, 0.26), 0 16px 40px rgba(0, 0, 0, 0.18), 0 24px 60px rgba(0, 0, 0, 0.10)' as const,
  MEDICAL: '0 4px 10px rgba(0, 0, 0, 0.16), 0 8px 20px rgba(0, 0, 0, 0.10)' as const,
} as const;

// ============ Variáveis de Animação ============
export const ANIMATION_DURATION = {
  // Duração padrão para animações
  FAST: '150ms' as const,
  NORMAL: '200ms' as const,
  SLOW: '300ms' as const,
} as const;

export const ANIMATION_EASING = {
  // Easing padrão cúbico
  DEFAULT: 'cubic-bezier(0.25, 1, 0.5, 1)' as const,
  SPRING: 'cubic-bezier(0.34, 1.56, 0.64, 1)' as const,
} as const;

export const HOVER_SCALE = {
  // Escala de hover
  DEFAULT: '1.02' as const,
  SUBTLE: '1.01' as const,
  CLEAR: '1.03' as const,
  ELEVATED: '1.04' as const,
} as const;

export const TAP_SCALE = {
  // Escala de tap (feedback háptico visual)
  DEFAULT: '0.95' as const,
  SUBTLE: '0.93' as const,
  CLEAR: '0.97' as const,
  ELEVATED: '0.92' as const,
} as const;

// ============ Variáveis de Tipografia ============
export const FONT_FAMILY = {
  // Fontes SF Pro do WellWave
  DISPLAY: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' as const,
  BODY: 'SF Pro Text, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' as const,
  CAPTION: 'SF Pro Caption, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' as const,
  MONO: 'SF Mono, Menlo, Consolas, monospace' as const,
} as const;

export const FONT_SIZE = {
  // Tamanhos de fonte baseados em escala de 8px
  XS: '11px' as const,
  SM: '12px' as const,
  BASE: '14px' as const,
  MD: '16px' as const,
  LG: '18px' as const,
  XL: '20px' as const,
  '2XL': '24px' as const,
  '3XL': '28px' as const,
  '4XL': '32px' as const,
} as const;

export const FONT_WEIGHT = {
  // Pesos de fonte
  REGULAR: '400' as const,
  MEDIUM: '500' as const,
  SEMIBOLD: '600' as const,
  BOLD: '700' as const,
} as const;

export const LINE_HEIGHT = {
  // Altura de linha baseada em escala de 4px
  TIGHT: '1.25' as const,
  NORMAL: '1.5' as const,
  RELAXED: '1.75' as const,
  LOOSE: '2' as const,
} as const;

// ============ Variáveis de Espaçamento ============
export const SPACING = {
  // Espaçamento baseado em escala de 8px
  0: '0' as const,
  1: '4px' as const,
  2: '8px' as const,
  3: '12px' as const,
  4: '16px' as const,
  5: '20px' as const,
  6: '24px' as const,
  8: '32px' as const,
  10: '40px' as const,
  12: '48px' as const,
  16: '64px' as const,
  20: '80px' as const,
  24: '96px' as const,
} as const;

// ============ Variáveis de Cores - Apple Liquid Glass 2026 ============
// iOS 26 System Colors
export const COLOR_PRIMARY = '#007AFF' as const;        // Apple Blue
export const COLOR_SECONDARY = '#34C759' as const;      // Apple Green
export const COLOR_ACCENT = '#5AC8FA' as const;          // Apple Teal
export const COLOR_SUCCESS = '#34C759' as const;        // Apple Green
export const COLOR_WARNING = '#FF9500' as const;        // Apple Orange
export const COLOR_DANGER = '#FF3B30' as const;          // Apple Red

// Apple Text Colors - iOS 26
export const COLOR_TEXT_PRIMARY = '#1D1D1F' as const;    // Apple Primary Text
export const COLOR_TEXT_SECONDARY = '#86868B' as const;  // Apple Secondary Text
export const COLOR_TEXT_MUTED = 'rgba(29, 29, 31, 0.4)' as const; // Apple Tertiary Text

// Apple Border Colors - iOS 26
export const COLOR_BORDER = 'rgba(255, 255, 255, 0.30)' as const;      // Light Mode
export const COLOR_BORDER_DARK = 'rgba(255, 255, 255, 0.15)' as const; // Dark Mode

// Apple Rim Light Colors - iOS 26
export const COLOR_RIM_LIGHT = 'rgba(255, 255, 255, 0.9)' as const;
export const COLOR_RIM_LIGHT_SUBTLE = 'rgba(255, 255, 255, 0.7)' as const;
export const COLOR_RIM_LIGHT_CLEAR = 'rgba(255, 255, 255, 0.8)' as const;
export const COLOR_RIM_LIGHT_ELEVATED = 'rgba(255, 255, 255, 0.95)' as const;

// ============ Variáveis de Transição ============
export const TRANSITION = {
  // Transição padrão para componentes
  DEFAULT: 'all 200ms cubic-bezier(0.25, 1, 0.5, 1)' as const,
  FAST: 'all 150ms cubic-bezier(0.25, 1, 0.5, 1)' as const,
  SLOW: 'all 300ms cubic-bezier(0.25, 1, 0.5, 1)' as const,
} as const;

// ============ Variáveis de Z-Index ============
export const Z_INDEX = {
  // Z-index para camadas de componentes
  DROPDOWN: '50' as const,
  MODAL: '100' as const,
  TOOLTIP: '200' as const,
  NOTIFICATION: '150' as const,
} as const;

// ============ Helper Functions ============
/**
 * All component variant types are now imported from types/glass-variants.ts
 * This ensures a single source of truth for all variant definitions.
 */
/**
 * Obter classes de blur e saturação baseadas na variante
 * Usa classes CSS compatíveis com Tailwind CSS 4
 */
export const getBlurClasses = (variant: GlassVariant = 'default'): string => {
  // Mapear variantes para classes CSS dedicadas
  switch (variant) {
    case 'elevated':
      return 'liquid-glass-elevated';
    case 'subtle':
      return 'liquid-glass-subtle';
    case 'clear':
      return 'liquid-glass-clear';
    case 'default':
    default:
      return 'liquid-glass-default';
  }
};

/**
 * Obter classes de opacidade baseadas na variante e modo
 */
export const getOpacityClasses = (variant: GlassVariant = 'default', isDark: boolean = false): string => {
  const opacity = isDark
    ? (variant === 'elevated' ? OPACITY_DARK_VALUES.ELEVATED : OPACITY_DARK_VALUES.DEFAULT)
    : (variant === 'elevated' ? OPACITY_VALUES.ELEVATED : OPACITY_VALUES.DEFAULT);

  return `bg-opacity-[${opacity}]`;
};

/**
 * Obter classes de sombra baseadas na variante e modo
 */
export const getShadowClasses = (variant: GlassVariant = 'default', isDark: boolean = false): string => {
  const shadow = isDark ? SHADOW_DARK_VALUES.DEFAULT : SHADOW_VALUES.DEFAULT;
  return shadow;
};

/**
 * Obter classes de efeitos visuais
 */
export const getVisualEffectsClasses = (variant: GlassVariant = 'default'): string => {
  return [
    'inner-glow-ios26',
    'rim-light-ios26',
    'noise-grain',
  ].join(' ');
};

/**
 * Obter classes de tipografia iOS 2026
 * Usa classes CSS dedicadas compatíveis com Tailwind CSS 4
 */
export const getTypographyClasses = (size: keyof typeof FONT_SIZE = 'MD'): string => {
  // Mapear tamanhos de fonte para classes CSS dedicadas
  const sizeClass = {
    'XS': 'text-ios-xs',
    'SM': 'text-ios-sm',
    'BASE': 'text-ios-base',
    'MD': 'text-ios-md',
    'LG': 'text-ios-lg',
    'XL': 'text-ios-xl',
    '2XL': 'text-ios-2xl',
    '3XL': 'text-ios-3xl',
    '4XL': 'text-ios-4xl',
  }[size];

  return [
    'font-sf-pro-text',
    sizeClass,
    'leading-ios-normal',
  ].join(' ');
};

/**
 * Obter classes de espaçamento iOS 2026
 * Usa classes CSS dedicadas compatíveis com Tailwind CSS 4
 */
export const getSpacingClasses = (spacing: keyof typeof SPACING = 2): string => {
  // Mapear valores de espaçamento para classes CSS dedicadas
  const spacingClass = {
    '0': 'p-ios-0',
    '1': 'p-ios-1',
    '2': 'p-ios-2',
    '3': 'p-ios-3',
    '4': 'p-ios-4',
    '5': 'p-ios-5',
    '6': 'p-ios-6',
    '8': 'p-ios-8',
    '10': 'p-ios-10',
    '12': 'p-ios-12',
    '16': 'p-ios-16',
    '20': 'p-ios-20',
    '24': 'p-ios-24',
  }[spacing];

  return spacingClass;
};

/**
 * Obter classes de radius iOS 2026
 */
export const getRadiusClasses = (size: keyof typeof RADIUS_VALUES = 'LG'): string => {
  return `rounded-[${RADIUS_VALUES[size]}]`;
};

/**
 * Obter classes de GPU acceleration
 */
export const getGPUClasses = (): string => {
  return [
    'transform',
    'translateZ(0)',
    'backface-visibility',
    'hidden',
  ].join(' ');
};

/**
 * Obter classes de CSS containment
 */
export const getContainmentClasses = (): string => {
  return [
    'contain',
    'layout',
    'style',
    'paint',
  ].join(' ');
};

/**
 * Obter classes de animação iOS 2026
 * Usa classes CSS dedicadas compatíveis com Tailwind CSS 4
 */
export const getAnimationClasses = (animation: 'hover' | 'tap' | 'float' | 'pulse' | 'shimmer' | 'ripple' | 'slide' | 'scale' | 'fade' | 'bounce' | 'haptic' | 'interactive' | 'lift' = 'hover', variant: 'default' | 'subtle' | 'clear' | 'elevated' = 'default'): string => {
  // Hover scale animations
  if (animation === 'hover') {
    const hoverClass = {
      'default': 'hover-scale-ios-default',
      'subtle': 'hover-scale-ios-subtle',
      'clear': 'hover-scale-ios-clear',
      'elevated': 'hover-scale-ios-elevated',
    }[variant];

    return hoverClass;
  }

  // Tap scale animations
  if (animation === 'tap') {
    const tapClass = {
      'default': 'tap-scale-ios-default',
      'subtle': 'tap-scale-ios-subtle',
      'clear': 'tap-scale-ios-clear',
      'elevated': 'tap-scale-ios-elevated',
    }[variant];

    return tapClass;
  }

  // Float animations
  if (animation === 'float') {
    return 'animate-float-ios-default';
  }

  // Pulse animations
  if (animation === 'pulse') {
    const pulseClass = {
      'default': 'animate-pulse-ios-default',
      'success': 'animate-pulse-ios-success',
      'warning': 'animate-pulse-ios-warning',
      'error': 'animate-pulse-ios-error',
    };

    return pulseClass[variant as 'default' | 'success' | 'warning' | 'error'];
  }

  // Shimmer animations
  if (animation === 'shimmer') {
    return 'animate-shimmer-ios-default';
  }

  // Ripple animations
  if (animation === 'ripple') {
    return 'animate-ripple-ios-default';
  }

  // Slide animations
  if (animation === 'slide') {
    const slideClass = {
      'default': 'animate-slide-up-ios-default',
      'up': 'animate-slide-up-ios-default',
      'down': 'animate-slide-down-ios-default',
      'left': 'animate-slide-left-ios-default',
      'right': 'animate-slide-right-ios-default',
    };

    return slideClass[variant as 'default' | 'up' | 'down' | 'left' | 'right'];
  }

  // Scale animations
  if (animation === 'scale') {
    const scaleClass = {
      'default': 'animate-scale-in-ios-default',
      'in': 'animate-scale-in-ios-default',
      'out': 'animate-scale-out-ios-default',
    };

    return scaleClass[variant as 'default' | 'in' | 'out'];
  }

  // Fade animations
  if (animation === 'fade') {
    const fadeClass = {
      'default': 'animate-fade-in-ios-default',
      'in': 'animate-fade-in-ios-default',
      'out': 'animate-fade-out-ios-default',
    };

    return fadeClass[variant as 'default' | 'in' | 'out'];
  }

  // Bounce animations
  if (animation === 'bounce') {
    return 'animate-bounce-in-ios-default';
  }

  // Haptic animations
  if (animation === 'haptic') {
    const hapticClass = {
      'default': 'animate-haptic-light-ios',
      'medium': 'animate-haptic-medium-ios',
      'heavy': 'animate-haptic-heavy-ios',
    };

    return hapticClass[variant as 'default' | 'medium' | 'heavy'];
  }

  // Interactive animations
  if (animation === 'interactive') {
    return 'interactive-ios-default';
  }

  // Lift animations
  if (animation === 'lift') {
    return 'interactive-lift-ios';
  }

  // Default to hover scale
  return 'hover-scale-ios-default';
};
