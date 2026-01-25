/**
 * Apple Liquid Glass 2026 Theme
 *
 * Ponto de entrada central para o sistema de tema Apple Liquid Glass 2026
 * Exporta todas as funções e hooks necessários
 */

import * as hooks from './hooks';
import * as tokens from './tokens';

// ============ Hooks ============
export * from './hooks';

// ============ Tokens ============
export * from './tokens';

// ============ Configuração Completa ============
export const AppleLiquidGlass2026Theme = {
  // Hooks
  ...hooks,

  // Tokens
  ...tokens,

  // Tipografia (built from FONT_* tokens)
  typography: {
    fontFamily: tokens.FONT_FAMILY,
    fontSize: tokens.FONT_SIZE,
    fontWeight: tokens.FONT_WEIGHT,
    lineHeight: tokens.LINE_HEIGHT,
  },

  // Espaçamento
  spacing: tokens.SPACING,

  // Cores
  colors: {
    primary: tokens.COLOR_PRIMARY,
    secondary: tokens.COLOR_SECONDARY,
    accent: tokens.COLOR_ACCENT,
    success: tokens.COLOR_SUCCESS,
    warning: tokens.COLOR_WARNING,
    danger: tokens.COLOR_DANGER,
    text: {
      primary: tokens.COLOR_TEXT_PRIMARY,
      secondary: tokens.COLOR_TEXT_SECONDARY,
      muted: tokens.COLOR_TEXT_MUTED,
    },
    border: tokens.COLOR_BORDER,
    borderDark: tokens.COLOR_BORDER_DARK,
    rim: {
      light: tokens.COLOR_RIM_LIGHT,
      subtle: tokens.COLOR_RIM_LIGHT_SUBTLE,
      elevated: tokens.COLOR_RIM_LIGHT_ELEVATED,
    },
    innerGlow: tokens.INNER_GLOW_VALUES.DEFAULT,
  },

  // Efeitos Visuais
  visualEffects: {
    specularHighlight: tokens.SPECULAR_VALUES.DEFAULT,
    innerGlow: tokens.INNER_GLOW_VALUES.DEFAULT,
    rimLight: tokens.RIM_LIGHT_VALUES.DEFAULT,
    noiseTexture: tokens.NOISE_VALUES.DEFAULT,
    shadow: tokens.SHADOW_VALUES.DEFAULT,
    shadowDark: tokens.SHADOW_DARK_VALUES.DEFAULT,
  },

  // Animações
  animation: {
    duration: tokens.ANIMATION_DURATION.NORMAL,
    easing: tokens.ANIMATION_EASING.DEFAULT,
    hoverScale: tokens.HOVER_SCALE.DEFAULT,
    tapScale: tokens.TAP_SCALE.DEFAULT,
  },

  // Transições
  transition: {
    default: tokens.TRANSITION.DEFAULT,
    fast: tokens.TRANSITION.FAST,
    slow: tokens.TRANSITION.SLOW,
  },

  // GPU Acceleration
  gpu: {
    acceleration: tokens.getGPUClasses(),
    containment: tokens.getContainmentClasses(),
  },

  // Z-Index
  zIndex: tokens.Z_INDEX,

  // Hover & Tap Scales
  scales: {
    hover: tokens.HOVER_SCALE.DEFAULT,
    tap: tokens.TAP_SCALE.DEFAULT,
  },
} as const;
