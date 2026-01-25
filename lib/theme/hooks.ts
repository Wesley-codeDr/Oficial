/**
 * Apple Liquid Glass 2026 Theme Hooks
 * 
 * Hooks personalizados para facilitar o uso das variáveis de tema Apple Liquid Glass 2026
 */

import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import * as Tokens from './tokens';

/**
 * Hook para obter classes de blur e saturação baseadas na variante
 * Usa classes CSS compatíveis com Tailwind CSS 4
 */
export const useGlassBlur = (variant: Tokens.GlassVariant = 'default'): string => {
  return useMemo(() => {
    // Apple Liquid Glass 2026 - iOS 26 Universal Standard
    // ALL variants use 40px blur and 180% saturate per HIG
    const blur = Tokens.BLUR_VALUES.DEFAULT; // Always 40px
    const saturate = Tokens.SATURATE_VALUES.DEFAULT; // Always 180%
    
    // Mapear valores para classes CSS compatíveis
    const blurClass = 'backdrop-blur-40px'; // iOS 26 Universal
    const saturateClass = 'saturate-180'; // iOS 26 Universal
    
    return `${blurClass} ${saturateClass}`;
  }, [variant]);
};

/**
 * Hook para obter classes de opacidade baseadas na variante e modo
 */
export const useGlassOpacity = (variant: Tokens.GlassVariant = 'default', isDark: boolean = false): string => {
  return useMemo(() => {
    const opacity = isDark
      ? (variant === 'elevated' ? Tokens.OPACITY_DARK_VALUES.ELEVATED : Tokens.OPACITY_DARK_VALUES.DEFAULT)
      : (variant === 'elevated' ? Tokens.OPACITY_VALUES.ELEVATED : Tokens.OPACITY_VALUES.DEFAULT);
    
    // Mapear valores para classes CSS compatíveis
    const opacityClass = isDark
      ? (variant === 'elevated' ? 'bg-opacity-dark-elevated' : 'bg-opacity-dark-default')
      : (variant === 'elevated' ? 'bg-opacity-elevated' : 'bg-opacity-default');
    
    return opacityClass;
  }, [variant, isDark]);
};

/**
 * Hook para obter classes de sombra baseadas na variante e modo
 */
export const useGlassShadow = (variant: Tokens.GlassVariant = 'default', isDark: boolean = false): string => {
  return useMemo(() => {
    const shadow = isDark ? Tokens.SHADOW_DARK_VALUES.DEFAULT : Tokens.SHADOW_VALUES.DEFAULT;
    return shadow;
  }, [variant, isDark]);
};

/**
 * Hook para obter classes de efeitos visuais
 */
export const useGlassVisualEffects = (variant: Tokens.GlassVariant = 'default'): string => {
  return useMemo(() => {
    return Tokens.getVisualEffectsClasses(variant);
  }, [variant]);
};

/**
 * Hook para obter classes de animação
 */
export const useGlassAnimation = (): string => {
  return useMemo(() => {
    return Tokens.getAnimationClasses();
  }, []);
};

/**
 * Hook para obter classes de tipografia iOS 2026
 */
export const useGlassTypography = (size: keyof typeof Tokens.FONT_SIZE = 'MD'): string => {
  return useMemo(() => {
    return Tokens.getTypographyClasses(size);
  }, [size]);
};

/**
 * Hook para obter classes de espaçamento iOS 2026
 */
export const useGlassSpacing = (spacing: keyof typeof Tokens.SPACING = 2): string => {
  return useMemo(() => {
    return Tokens.getSpacingClasses(spacing);
  }, [spacing]);
};

/**
 * Hook para obter classes de radius iOS 2026
 * Supports both direct keys ('SM', 'MD', 'LG') and aliases ('small', 'medium', 'large', 'default')
 */
export const useGlassRadius = (size: keyof typeof Tokens.RADIUS_VALUES | Tokens.RadiusAlias = 'LG'): string => {
  return useMemo(() => {
    // Resolve alias to actual key if needed
    const resolvedSize = size in Tokens.RADIUS_ALIASES
      ? Tokens.RADIUS_ALIASES[size as Tokens.RadiusAlias]
      : size as keyof typeof Tokens.RADIUS_VALUES;
    return Tokens.getRadiusClasses(resolvedSize);
  }, [size]);
};

/**
 * Hook para obter classes de GPU acceleration
 */
export const useGlassGPU = (): string => {
  return useMemo(() => {
    return Tokens.getGPUClasses();
  }, []);
};

/**
 * Hook para obter classes de CSS containment
 */
export const useGlassContainment = (): string => {
  return useMemo(() => {
    return Tokens.getContainmentClasses();
  }, []);
};

/**
 * Hook para obter classes de z-index
 */
export const useGlassZIndex = (zIndex: keyof typeof Tokens.Z_INDEX = 'MODAL'): string => {
  return useMemo(() => {
    return `z-[${Tokens.Z_INDEX[zIndex]}]`;
  }, [zIndex]);
};

/**
 * Hook para obter classes de hover scale
 */
export const useGlassHoverScale = (): string => {
  return useMemo(() => {
    return Tokens.HOVER_SCALE.DEFAULT;
  }, []);
};

/**
 * Hook para obter classes de tap scale
 */
export const useGlassTapScale = (): string => {
  return useMemo(() => {
    return Tokens.TAP_SCALE.DEFAULT;
  }, []);
};

/**
 * Hook para obter classes de border
 * Supports both (isDark: boolean) and (variant: GlassVariant, isDark: boolean) signatures
 */
export const useGlassBorder = (
  variantOrIsDark: Tokens.GlassVariant | boolean = 'default',
  isDarkParam?: boolean
): string => {
  return useMemo(() => {
    // Handle backward compatibility: if first param is boolean, it's isDark
    const isDark = typeof variantOrIsDark === 'boolean' ? variantOrIsDark : (isDarkParam ?? false);
    const variant = typeof variantOrIsDark === 'string' ? variantOrIsDark : 'default';

    // Get border color based on dark mode
    const baseBorder = isDark ? Tokens.COLOR_BORDER_DARK : Tokens.COLOR_BORDER;

    // Return variant-specific border if needed (for future extensibility)
    // Currently all variants use the same border logic
    return baseBorder;
  }, [variantOrIsDark, isDarkParam]);
};

/**
 * Hook para obter classes de noise texture
 */
export const useGlassNoise = (variant: Tokens.GlassVariant = 'default', isDark: boolean = false): string => {
  return useMemo(() => {
    const noiseValues = isDark ? Tokens.NOISE_DARK_VALUES : Tokens.NOISE_VALUES;
    switch (variant) {
      case 'subtle': return noiseValues.SUBTLE;
      case 'clear': return noiseValues.CLEAR;
      case 'elevated': return noiseValues.ELEVATED;
      default: return noiseValues.DEFAULT;
    }
  }, [variant, isDark]);
};

/**
 * Hook para obter classes de specular highlight
 */
export const useGlassSpecular = (variant: Tokens.GlassVariant = 'default'): string => {
  return useMemo(() => {
    switch (variant) {
      case 'subtle': return Tokens.SPECULAR_VALUES.SUBTLE;
      case 'clear': return Tokens.SPECULAR_VALUES.CLEAR;
      case 'elevated': return Tokens.SPECULAR_VALUES.ELEVATED;
      default: return Tokens.SPECULAR_VALUES.DEFAULT;
    }
  }, [variant]);
};

/**
 * Hook para obter classes de rim light
 */
export const useGlassRimLight = (variant: Tokens.GlassVariant = 'default'): string => {
  return useMemo(() => {
    switch (variant) {
      case 'subtle': return Tokens.RIM_LIGHT_VALUES.SUBTLE;
      case 'clear': return Tokens.RIM_LIGHT_VALUES.CLEAR;
      case 'elevated': return Tokens.RIM_LIGHT_VALUES.ELEVATED;
      default: return Tokens.RIM_LIGHT_VALUES.DEFAULT;
    }
  }, [variant]);
};

/**
 * Hook para obter classes de inner glow
 */
export const useGlassInnerGlow = (variant: Tokens.GlassVariant = 'default'): string => {
  return useMemo(() => {
    switch (variant) {
      case 'subtle': return Tokens.INNER_GLOW_VALUES.SUBTLE;
      case 'clear': return Tokens.INNER_GLOW_VALUES.CLEAR;
      case 'elevated': return Tokens.INNER_GLOW_VALUES.ELEVATED;
      default: return Tokens.INNER_GLOW_VALUES.DEFAULT;
    }
  }, [variant]);
};

/**
 * Hook combinado para obter todas as classes de um componente glass
 */
export const useGlassClasses = (
  variant: Tokens.GlassVariant = 'default',
  size: keyof typeof Tokens.RADIUS_VALUES = 'LG',
  isDark: boolean = false,
): {
  blur: string,
  opacity: string,
  shadow: string,
  visualEffects: string,
  animation: string,
  typography: string,
  spacing: string,
  radius: string,
  gpu: string,
  containment: string,
  zIndex: string,
  hoverScale: string,
  tapScale: string,
} => {
  const blur = useGlassBlur(variant);
  const opacity = useGlassOpacity(variant, isDark);
  const shadow = useGlassShadow(variant, isDark);
  const visualEffects = useGlassVisualEffects(variant);
  const animation = useGlassAnimation();
  const typography = useGlassTypography(size);
  const spacing = useGlassSpacing(2);
  const radius = useGlassRadius(size);
  const gpu = useGlassGPU();
  const containment = useGlassContainment();
  const zIndex = useGlassZIndex('MODAL');
  const hoverScale = useGlassHoverScale();
  const tapScale = useGlassTapScale();
  
  return {
    blur,
    opacity,
    shadow,
    visualEffects,
    animation,
    typography,
    spacing,
    radius,
    gpu,
    containment,
    zIndex,
    hoverScale,
    tapScale,
  };
};

/**
 * Hook para obter classes de cores Apple 2026
 */
export const useAppleColors = () => {
  return useMemo(() => ({
    primary: Tokens.COLOR_PRIMARY,
    secondary: Tokens.COLOR_SECONDARY,
    accent: Tokens.COLOR_ACCENT,
    success: Tokens.COLOR_SUCCESS,
    warning: Tokens.COLOR_WARNING,
    danger: Tokens.COLOR_DANGER,
    textPrimary: Tokens.COLOR_TEXT_PRIMARY,
    textSecondary: Tokens.COLOR_TEXT_SECONDARY,
    textMuted: Tokens.COLOR_TEXT_MUTED,
    border: Tokens.COLOR_BORDER,
    borderDark: Tokens.COLOR_BORDER_DARK,
    rimLight: Tokens.COLOR_RIM_LIGHT,
    rimLightSubtle: Tokens.COLOR_RIM_LIGHT_SUBTLE,
    rimLightElevated: Tokens.COLOR_RIM_LIGHT_ELEVATED,
    innerGlow: Tokens.INNER_GLOW_VALUES.DEFAULT,
  }), []);
};

/**
 * Hook para obter classes de tipografia iOS 2026
 */
export const useAppleTypography = (
  size: keyof typeof Tokens.FONT_SIZE = 'MD',
  weight: keyof typeof Tokens.FONT_WEIGHT = 'REGULAR',
) => {
  return useMemo(() => ({
    fontFamily: Tokens.FONT_FAMILY.DISPLAY,
    fontSize: Tokens.FONT_SIZE[size],
    fontWeight: Tokens.FONT_WEIGHT[weight],
  }), [size, weight]);
};

/**
 * Hook para obter classes de espaçamento iOS 2026
 */
export const useAppleSpacing = (spacing: keyof typeof Tokens.SPACING = 2): string => {
  return Tokens.SPACING[spacing];
};

/**
 * Hook para obter classes de transição
 */
export const useAppleTransition = (duration: keyof typeof Tokens.ANIMATION_DURATION = 'NORMAL'): string => {
  return Tokens.TRANSITION.DEFAULT;
};

/**
 * Hook para obter classes de animação
 */
export const useAppleAnimation = (duration: keyof typeof Tokens.ANIMATION_DURATION = 'NORMAL'): string => {
  return Tokens.ANIMATION_EASING.DEFAULT;
};

/**
 * Hook para obter classes de efeitos visuais
 */
export const useAppleVisualEffects = () => {
  return useMemo(() => ({
    specularHighlight: Tokens.SPECULAR_VALUES.DEFAULT,
    innerGlow: Tokens.INNER_GLOW_VALUES.DEFAULT,
    rimLight: Tokens.RIM_LIGHT_VALUES.DEFAULT,
    noiseTexture: Tokens.NOISE_VALUES.DEFAULT,
    shadow: Tokens.SHADOW_VALUES.DEFAULT,
  }), []);
};

/**
 * Hook para obter todas as configurações de tema Apple Liquid Glass 2026
 */
export const useAppleLiquidGlassTheme = () => {
  const colors = useAppleColors();
  const typography = useAppleTypography('MD', 'REGULAR');
  const spacing = useAppleSpacing(2);
  const animation = useAppleAnimation('NORMAL');
  const visualEffects = useAppleVisualEffects();
  const transition = useAppleTransition('NORMAL');

  return useMemo(() => ({
    colors,
    typography,
    spacing,
    animation,
    visualEffects,
    transition,
  }), [colors, typography, spacing, animation, visualEffects, transition]);
};

