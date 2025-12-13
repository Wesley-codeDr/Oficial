'use client';

import * as React from 'react';
import type { VariableColorConfig, VariableColorLayerState } from '../types';

/**
 * Number of layers for variable color animation
 * Typically 3-4 for most SF Symbols-style icons
 */
const DEFAULT_LAYER_COUNT = 4;

/**
 * Calculate which layers should be active based on value and mode
 */
function calculateLayerStates(
  value: number,
  layerCount: number,
  mode: 'cumulative' | 'iterative',
  activeColor: string,
  inactiveColor: string
): VariableColorLayerState[] {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const layers: VariableColorLayerState[] = [];

  for (let i = 0; i < layerCount; i++) {
    const threshold = ((i + 1) / layerCount) * 100;
    let isActive: boolean;

    if (mode === 'cumulative') {
      // Cumulative: all layers up to current value are active
      isActive = normalizedValue >= threshold - (100 / layerCount);
    } else {
      // Iterative: only the layer at current value is active
      const layerStart = (i / layerCount) * 100;
      const layerEnd = ((i + 1) / layerCount) * 100;
      isActive = normalizedValue > layerStart && normalizedValue <= layerEnd;
    }

    layers.push({
      index: i,
      isActive,
      opacity: isActive ? 1 : 0.4,
      color: isActive ? activeColor : inactiveColor,
    });
  }

  return layers;
}

export interface UseVariableColorOptions extends VariableColorConfig {
  /** Number of layers in the icon */
  layerCount?: number;
  /** Animation duration for transitions */
  transitionDuration?: number;
}

export interface UseVariableColorReturn {
  /** Current layer states */
  layers: VariableColorLayerState[];
  /** CSS class for the container */
  containerClass: string;
  /** CSS variables for styling */
  cssVariables: React.CSSProperties;
  /** Whether animation is in progress */
  isAnimating: boolean;
  /** Update the value programmatically */
  setValue: (newValue: number) => void;
}

/**
 * Hook for managing variable color animation state
 *
 * @example
 * ```tsx
 * const { layers, cssVariables, containerClass } = useVariableColor({
 *   value: 75,
 *   mode: 'cumulative',
 * });
 *
 * return (
 *   <div className={containerClass} style={cssVariables}>
 *     {layers.map((layer) => (
 *       <span
 *         key={layer.index}
 *         className={layer.isActive ? 'active' : 'inactive'}
 *         style={{ color: layer.color, opacity: layer.opacity }}
 *       />
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useVariableColor(
  options: UseVariableColorOptions
): UseVariableColorReturn {
  const {
    value,
    mode = 'cumulative',
    activeColor = 'var(--symbol-vc-active)',
    inactiveColor = 'var(--symbol-vc-inactive)',
    layerCount = DEFAULT_LAYER_COUNT,
    animationDuration = 300,
  } = options;

  const [currentValue, setCurrentValue] = React.useState(value);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const animationRef = React.useRef<number | null>(null);
  const previousValueRef = React.useRef(value);

  // Animate value changes
  React.useEffect(() => {
    if (value === previousValueRef.current) return;

    const startValue = previousValueRef.current;
    const endValue = value;
    const startTime = performance.now();

    setIsAnimating(true);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);

      const newValue = startValue + (endValue - startValue) * eased;
      setCurrentValue(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        previousValueRef.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, animationDuration]);

  // Calculate layer states
  const layers = React.useMemo(
    () =>
      calculateLayerStates(
        currentValue,
        layerCount,
        mode,
        activeColor,
        inactiveColor
      ),
    [currentValue, layerCount, mode, activeColor, inactiveColor]
  );

  // Generate container class
  const containerClass = React.useMemo(() => {
    const classes = ['symbol-variable-color'];
    if (mode === 'cumulative') {
      classes.push('symbol-vc-cumulative');
    } else {
      classes.push('symbol-vc-iterative');
    }
    if (isAnimating) {
      classes.push('symbol-vc-animating');
    }
    return classes.join(' ');
  }, [mode, isAnimating]);

  // Generate CSS variables
  const cssVariables: React.CSSProperties = React.useMemo(
    () => ({
      '--symbol-vc-value': currentValue,
      '--symbol-vc-active': activeColor,
      '--symbol-vc-inactive': inactiveColor,
      '--symbol-vc-duration': `${animationDuration}ms`,
    }) as React.CSSProperties,
    [currentValue, activeColor, inactiveColor, animationDuration]
  );

  // Manual value setter
  const setValue = React.useCallback((newValue: number) => {
    previousValueRef.current = newValue;
    setCurrentValue(newValue);
  }, []);

  return {
    layers,
    containerClass,
    cssVariables,
    isAnimating,
    setValue,
  };
}

/**
 * Hook for reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export default useVariableColor;
