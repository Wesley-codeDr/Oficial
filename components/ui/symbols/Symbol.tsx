'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SymbolProps, SymbolAnimationConfig } from './types';
import {
  SYMBOL_WEIGHTS,
  SYMBOL_SCALES,
  SYMBOL_SIZES,
  SIZE_CLASSES,
  WEIGHT_CLASSES,
  SCALE_CLASSES,
  RENDERING_MODE_CLASSES,
  ENCLOSURE_CLASSES,
  ENCLOSURE_RADIUS,
  ENCLOSURE_PADDING,
  HIERARCHICAL_OPACITIES,
  DEFAULTS,
  resolveSize,
  resolveWeight,
  resolveScale,
  calculateIconSize,
  calculateEnclosureSize,
} from './constants';
import {
  animationVariantMap,
  getAnimationVariants,
  getReplaceInVariants,
  getReplaceOutVariants,
} from './presets/animations';

/**
 * Symbol Component
 *
 * SF Symbols-inspired icon component with rendering modes,
 * weights, scales, animations, and variable color support.
 *
 * @example
 * // Basic usage
 * <Symbol icon={Heart} color="red" />
 *
 * // With animation
 * <Symbol icon={Bell} animation="wiggle" />
 *
 * // With rendering mode
 * <Symbol icon={Wifi} renderingMode="hierarchical" color="blue" />
 *
 * // With enclosure
 * <Symbol icon={Heart} enclosure="circle" enclosureFill="red" />
 */
export function Symbol({
  icon: Icon,
  size = DEFAULTS.size,
  weight = DEFAULTS.weight,
  scale = DEFAULTS.scale,
  renderingMode = DEFAULTS.renderingMode,
  color,
  secondaryColor,
  tertiaryColor,
  variableColor,
  variant = DEFAULTS.variant,
  slash = false,
  enclosure = DEFAULTS.enclosure,
  enclosureFill,
  animation = 'none',
  replaceTo,
  disabled = false,
  loading = false,
  'aria-label': ariaLabel,
  decorative = false,
  onClick,
  onAnimationComplete,
  className,
  style,
}: SymbolProps) {
  // Resolve animation config
  const animationConfig: SymbolAnimationConfig = React.useMemo(() => {
    if (typeof animation === 'string') {
      return { type: animation };
    }
    return animation;
  }, [animation]);

  // Handle loading state (override animation)
  const effectiveAnimation = loading ? 'rotate' : animationConfig.type;

  // Get animation variants
  const variants = React.useMemo(() => {
    if (effectiveAnimation === 'none') return {};
    if (effectiveAnimation === 'replace' && replaceTo) {
      return getReplaceOutVariants(animationConfig.direction);
    }
    return getAnimationVariants(effectiveAnimation, {
      direction: animationConfig.direction,
      speed: animationConfig.speed,
      repeat: animationConfig.repeat,
    });
  }, [effectiveAnimation, animationConfig, replaceTo]);

  // Calculate sizes
  const iconSize = calculateIconSize(size, scale);
  const strokeWidth = resolveWeight(weight);

  // Enclosure size calculation
  const hasEnclosure = enclosure !== 'none';
  const enclosureSize = hasEnclosure
    ? calculateEnclosureSize(iconSize, enclosure)
    : iconSize;

  // Generate style object
  const symbolStyle: React.CSSProperties = {
    ...style,
    '--symbol-color': color || 'currentColor',
    '--symbol-secondary-color': secondaryColor || color || 'currentColor',
    '--symbol-tertiary-color': tertiaryColor || secondaryColor || color || 'currentColor',
    '--symbol-size': `${iconSize}px`,
    '--symbol-stroke-width': `${strokeWidth}px`,
  } as React.CSSProperties;

  // Hierarchical opacity handling
  if (renderingMode === 'hierarchical') {
    (symbolStyle as Record<string, unknown>)['--symbol-opacity-primary'] = HIERARCHICAL_OPACITIES[0];
    (symbolStyle as Record<string, unknown>)['--symbol-opacity-secondary'] = HIERARCHICAL_OPACITIES[1];
    (symbolStyle as Record<string, unknown>)['--symbol-opacity-tertiary'] = HIERARCHICAL_OPACITIES[2];
  }

  // Variable color handling
  if (variableColor) {
    (symbolStyle as Record<string, unknown>)['--symbol-vc-value'] = variableColor.value;
    if (variableColor.activeColor) {
      (symbolStyle as Record<string, unknown>)['--symbol-vc-active'] = variableColor.activeColor;
    }
    if (variableColor.inactiveColor) {
      (symbolStyle as Record<string, unknown>)['--symbol-vc-inactive'] = variableColor.inactiveColor;
    }
  }

  // Container classes
  const containerClasses = cn(
    'symbol',
    'inline-flex items-center justify-center',
    'transition-colors duration-200',
    RENDERING_MODE_CLASSES[renderingMode],
    WEIGHT_CLASSES[weight],
    SCALE_CLASSES[scale],
    hasEnclosure && ENCLOSURE_CLASSES[enclosure],
    disabled && 'opacity-50 pointer-events-none',
    onClick && 'cursor-pointer',
    className
  );

  // Icon classes
  const iconClasses = cn(
    'symbol-icon',
    'flex-shrink-0',
    variant === 'fill' && 'symbol-fill',
    slash && 'symbol-slash'
  );

  // Enclosure styles
  const enclosureStyles: React.CSSProperties = hasEnclosure
    ? {
        width: enclosureSize,
        height: enclosureSize,
        borderRadius: ENCLOSURE_RADIUS[enclosure],
        backgroundColor: enclosureFill || 'transparent',
      }
    : {};

  // Accessibility
  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : {
        role: 'img',
        'aria-label': ariaLabel,
      };

  // Render the icon
  const renderIcon = (IconComponent: typeof Icon) => (
    <IconComponent
      className={iconClasses}
      size={iconSize}
      strokeWidth={strokeWidth}
      style={{
        color: 'var(--symbol-color)',
      }}
    />
  );

  // Main content
  const content = (
    <motion.span
      className={containerClasses}
      style={{ ...symbolStyle, ...enclosureStyles }}
      variants={variants}
      initial={effectiveAnimation !== 'none' ? 'initial' : undefined}
      animate={effectiveAnimation !== 'none' ? 'animate' : undefined}
      exit={effectiveAnimation !== 'none' ? 'exit' : undefined}
      onAnimationComplete={onAnimationComplete}
      onClick={onClick}
      {...accessibilityProps}
    >
      {renderIcon(Icon)}

      {/* Slash overlay for unavailable state */}
      {slash && (
        <span
          className="symbol-slash-overlay absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full"
            style={{ color: 'var(--symbol-color)' }}
          >
            <line
              x1="4"
              y1="20"
              x2="20"
              y2="4"
              stroke="currentColor"
              strokeWidth={strokeWidth + 1}
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </motion.span>
  );

  // Handle replace animation
  if (effectiveAnimation === 'replace' && replaceTo) {
    return (
      <AnimatePresence mode="wait">
        <motion.span
          key="replace-container"
          className="symbol-replace-container inline-flex"
          style={symbolStyle}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={Icon.displayName || 'current'}
              variants={getReplaceOutVariants(animationConfig.direction)}
              initial="initial"
              animate="animate"
              exit="animate"
            >
              {content}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </AnimatePresence>
    );
  }

  return content;
}

/**
 * Symbol with controlled animation trigger
 */
export function AnimatedSymbol({
  trigger,
  ...props
}: SymbolProps & { trigger?: boolean }) {
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (trigger) {
      setAnimate(true);
    }
  }, [trigger]);

  const handleAnimationComplete = () => {
    setAnimate(false);
    props.onAnimationComplete?.();
  };

  const animationConfig: SymbolAnimationConfig = {
    type: typeof props.animation === 'string' ? props.animation : (props.animation?.type ?? 'none'),
    trigger: animate,
    ...(typeof props.animation === 'object' ? props.animation : {}),
  };

  return (
    <Symbol
      {...props}
      animation={animationConfig}
      onAnimationComplete={handleAnimationComplete}
    />
  );
}

/**
 * Shortcut components for common symbol configurations
 */

/** Loading spinner symbol */
export function LoadingSymbol(props: Omit<SymbolProps, 'loading'>) {
  return <Symbol {...props} loading />;
}

/** Pulsing symbol for notifications */
export function PulsingSymbol(props: Omit<SymbolProps, 'animation'>) {
  return <Symbol {...props} animation="pulse" />;
}

/** Bouncing symbol for interactive feedback */
export function BouncingSymbol(props: Omit<SymbolProps, 'animation'>) {
  return <Symbol {...props} animation="bounce" />;
}

/** Symbol with circle enclosure */
export function CircleSymbol(props: Omit<SymbolProps, 'enclosure'>) {
  return <Symbol {...props} enclosure="circle" />;
}

/** Symbol with square enclosure */
export function SquareSymbol(props: Omit<SymbolProps, 'enclosure'>) {
  return <Symbol {...props} enclosure="square" />;
}

/** Symbol with badge enclosure */
export function BadgeSymbol(props: Omit<SymbolProps, 'enclosure'>) {
  return <Symbol {...props} enclosure="badge" />;
}

export default Symbol;
