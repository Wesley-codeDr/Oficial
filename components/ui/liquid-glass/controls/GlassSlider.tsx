'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useLiquidGlass } from '../hooks/useLiquidGlass';
import { ANIMATION_DURATION } from '../constants';

// ============================================
// TYPES
// ============================================

/**
 * Slider style variants
 */
export type SliderStyle = 'linear' | 'circular';

/**
 * Tick mark configuration
 */
export interface TickMarkConfig {
  /** Number of tick marks (including min and max) */
  count: number;
  /** Whether to show labels on tick marks */
  showLabels?: boolean;
  /** Custom labels for tick marks (if not provided, values are used) */
  labels?: string[];
  /** Indices of tick marks to label (if showLabels is true but not all should be labeled) */
  labelIndices?: number[];
}

export interface GlassSliderProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Slider style */
  style?: SliderStyle;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Icon for minimum side */
  minIcon?: React.ReactNode;
  /** Icon for maximum side */
  maxIcon?: React.ReactNode;
  /** Label for the slider */
  label?: string;
  /** Show current value tooltip */
  showTooltip?: boolean;
  /** Tick mark configuration */
  tickMarks?: TickMarkConfig;
  /** Track color (CSS color value) */
  trackColor?: string;
  /** Filled track color (CSS color value) */
  filledTrackColor?: string;
  /** Thumb color (CSS color value) */
  thumbColor?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Callback for live feedback during drag */
  onLiveChange?: (value: number) => void;
  /** Additional class names */
  className?: string;
}

export interface GlassSliderWithInputProps extends GlassSliderProps {
  /** Show text input for value */
  showInput?: boolean;
  /** Show stepper buttons */
  showStepper?: boolean;
  /** Input width */
  inputWidth?: number;
  /** Format function for display value */
  formatValue?: (value: number) => string;
  /** Parse function for input value */
  parseValue?: (value: string) => number;
  /** Unit suffix (e.g., "%", "px") */
  unit?: string;
}

export interface CircularSliderProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Show tick marks */
  showTickMarks?: boolean;
  /** Number of tick marks */
  tickCount?: number;
  /** Track color */
  trackColor?: string;
  /** Filled track color */
  filledTrackColor?: string;
  /** Label to show in center */
  centerLabel?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const SIZE_CONFIG = {
  small: {
    trackHeight: 4,
    thumbSize: 16,
    tickHeight: 8,
    fontSize: 11,
    iconSize: 14,
  },
  medium: {
    trackHeight: 6,
    thumbSize: 20,
    tickHeight: 10,
    fontSize: 12,
    iconSize: 16,
  },
  large: {
    trackHeight: 8,
    thumbSize: 24,
    tickHeight: 12,
    fontSize: 13,
    iconSize: 18,
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, step: number): number {
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}

function valueToPercent(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

function percentToValue(percent: number, min: number, max: number): number {
  return min + (percent / 100) * (max - min);
}

// ============================================
// GLASS SLIDER COMPONENT
// ============================================

/**
 * GlassSlider - Liquid Glass styled slider control
 *
 * A slider is a horizontal track with a thumb that people can adjust
 * between a minimum and maximum value.
 *
 * @example
 * ```tsx
 * <GlassSlider
 *   value={brightness}
 *   onChange={setBrightness}
 *   min={0}
 *   max={100}
 *   minIcon={<Sun size={16} />}
 *   maxIcon={<Sun size={20} />}
 * />
 * ```
 */
export function GlassSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  style = 'linear',
  disabled = false,
  minIcon,
  maxIcon,
  label,
  showTooltip = false,
  tickMarks,
  trackColor,
  filledTrackColor,
  thumbColor,
  size = 'medium',
  onLiveChange,
  className,
}: GlassSliderProps) {
  const { accessibility } = useLiquidGlass();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value);

  const config = SIZE_CONFIG[size];
  const percent = valueToPercent(localValue, min, max);

  // Sync local value with prop
  React.useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
    }
  }, [value, isDragging]);

  // Handle track click
  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newPercent = (clickX / rect.width) * 100;
    const newValue = snapToStep(
      clamp(percentToValue(newPercent, min, max), min, max),
      min,
      step
    );

    setLocalValue(newValue);
    onChange(newValue);
  };

  // Handle thumb drag
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disabled || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const dragX = info.point.x - rect.left;
    const newPercent = (dragX / rect.width) * 100;
    const newValue = snapToStep(
      clamp(percentToValue(newPercent, min, max), min, max),
      min,
      step
    );

    setLocalValue(newValue);
    onLiveChange?.(newValue);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onChange(localValue);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = localValue;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = clamp(localValue + step, min, max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = clamp(localValue - step, min, max);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageUp':
        newValue = clamp(localValue + step * 10, min, max);
        break;
      case 'PageDown':
        newValue = clamp(localValue - step * 10, min, max);
        break;
      default:
        return;
    }

    event.preventDefault();
    setLocalValue(newValue);
    onChange(newValue);
  };

  // Generate tick marks
  const renderTickMarks = () => {
    if (!tickMarks) return null;

    const ticks = [];
    for (let i = 0; i < tickMarks.count; i++) {
      const tickPercent = (i / (tickMarks.count - 1)) * 100;
      const tickValue = percentToValue(tickPercent, min, max);
      const shouldLabel =
        tickMarks.showLabels &&
        (!tickMarks.labelIndices || tickMarks.labelIndices.includes(i));
      const labelText = tickMarks.labels?.[i] ?? Math.round(tickValue).toString();

      ticks.push(
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{
            left: `${tickPercent}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className={cn(
              'bg-muted-foreground/40',
              tickPercent <= percent && 'bg-primary/60'
            )}
            style={{
              width: 2,
              height: config.tickHeight,
              marginTop: 4,
            }}
          />
          {shouldLabel && (
            <span
              className="mt-1 text-muted-foreground"
              style={{ fontSize: config.fontSize }}
            >
              {labelText}
            </span>
          )}
        </div>
      );
    }

    return <div className="relative w-full">{ticks}</div>;
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}:
        </label>
      )}

      <div className="flex items-center gap-3">
        {/* Min icon */}
        {minIcon && (
          <div className="flex-shrink-0 text-muted-foreground">
            {minIcon}
          </div>
        )}

        {/* Track container */}
        <div
          ref={trackRef}
          className="relative flex-1 cursor-pointer"
          style={{ height: config.thumbSize }}
          onClick={handleTrackClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Track background */}
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 w-full rounded-full',
              !accessibility.useFallback && [
                'bg-black/10 dark:bg-white/10',
              ],
              accessibility.useFallback && 'bg-muted'
            )}
            style={{
              height: config.trackHeight,
              backgroundColor: trackColor,
            }}
          />

          {/* Filled track */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 rounded-full"
            style={{
              height: config.trackHeight,
              width: `${percent}%`,
              backgroundColor: filledTrackColor || 'hsl(var(--primary))',
            }}
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: accessibility.reduceMotion ? 0 : 0.1,
            }}
          />

          {/* Thumb */}
          <motion.div
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              'rounded-full cursor-grab active:cursor-grabbing',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              !accessibility.useFallback && [
                'bg-white dark:bg-gray-200',
                'shadow-lg shadow-black/20',
                'border border-black/10',
              ],
              accessibility.useFallback && [
                'bg-white',
                'border-2 border-primary',
              ]
            )}
            style={{
              width: config.thumbSize,
              height: config.thumbSize,
              left: `calc(${percent}% - ${config.thumbSize / 2}px)`,
              backgroundColor: thumbColor,
            }}
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileHover={accessibility.reduceMotion ? {} : { scale: 1.1 }}
            whileTap={accessibility.reduceMotion ? {} : { scale: 0.95 }}
            tabIndex={0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={localValue}
            aria-label={label}
            onKeyDown={handleKeyDown}
          />

          {/* Tooltip */}
          {showTooltip && (isDragging || isHovering) && (
            <motion.div
              className={cn(
                'absolute px-2 py-1 rounded-md text-xs font-medium',
                'pointer-events-none',
                !accessibility.useFallback && [
                  'bg-black/80 text-white',
                  'backdrop-blur-sm',
                ],
                accessibility.useFallback && [
                  'bg-foreground text-background',
                ]
              )}
              style={{
                left: `${percent}%`,
                transform: 'translateX(-50%)',
                bottom: config.thumbSize + 8,
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              {Math.round(localValue)}
            </motion.div>
          )}
        </div>

        {/* Max icon */}
        {maxIcon && (
          <div className="flex-shrink-0 text-muted-foreground">
            {maxIcon}
          </div>
        )}
      </div>

      {/* Tick marks */}
      {tickMarks && (
        <div className="px-3">
          {renderTickMarks()}
        </div>
      )}
    </div>
  );
}

// ============================================
// GLASS SLIDER WITH INPUT
// ============================================

/**
 * GlassSliderWithInput - Slider with text input and optional stepper
 *
 * Especially when a slider represents a wide range of values, people may
 * appreciate seeing the exact slider value and having the ability to enter
 * a specific value in a text field.
 *
 * @example
 * ```tsx
 * <GlassSliderWithInput
 *   value={opacity}
 *   onChange={setOpacity}
 *   min={0}
 *   max={100}
 *   showInput
 *   showStepper
 *   unit="%"
 * />
 * ```
 */
export function GlassSliderWithInput({
  showInput = true,
  showStepper = false,
  inputWidth = 60,
  formatValue = (v) => Math.round(v).toString(),
  parseValue = (v) => parseFloat(v) || 0,
  unit = '',
  ...sliderProps
}: GlassSliderWithInputProps) {
  const { accessibility } = useLiquidGlass();
  const { value, onChange, min = 0, max = 100, step = 1, disabled } = sliderProps;

  const [inputValue, setInputValue] = React.useState(formatValue(value));

  // Sync input with slider value
  React.useEffect(() => {
    setInputValue(formatValue(value));
  }, [value, formatValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseValue(inputValue);
    const clamped = clamp(parsed, min, max);
    const snapped = snapToStep(clamped, min, step);
    onChange(snapped);
    setInputValue(formatValue(snapped));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const handleIncrement = () => {
    const newValue = clamp(value + step, min, max);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = clamp(value - step, min, max);
    onChange(newValue);
  };

  return (
    <div className={cn('flex items-end gap-3', sliderProps.className)}>
      {/* Slider */}
      <div className="flex-1">
        <GlassSlider {...sliderProps} className="" />
      </div>

      {/* Input and stepper */}
      {(showInput || showStepper) && (
        <div className="flex items-center gap-1">
          {/* Text input */}
          {showInput && (
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                disabled={disabled}
                className={cn(
                  'h-9 rounded-lg text-center text-sm font-medium',
                  'border focus:outline-none focus:ring-2 focus:ring-ring',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  !accessibility.useFallback && [
                    'bg-white/40 dark:bg-white/10',
                    'border-black/10 dark:border-white/10',
                    'backdrop-blur-sm',
                  ],
                  accessibility.useFallback && [
                    'bg-muted',
                    'border-input',
                  ]
                )}
                style={{ width: inputWidth }}
              />
              {unit && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                  {unit}
                </span>
              )}
            </div>
          )}

          {/* Stepper */}
          {showStepper && (
            <div className="flex flex-col gap-px">
              <button
                onClick={handleIncrement}
                disabled={disabled || value >= max}
                className={cn(
                  'flex items-center justify-center',
                  'w-7 h-4 rounded-t-md',
                  'text-muted-foreground hover:text-foreground',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-colors',
                  !accessibility.useFallback && [
                    'bg-white/40 dark:bg-white/10',
                    'hover:bg-white/60 dark:hover:bg-white/20',
                  ],
                  accessibility.useFallback && [
                    'bg-muted',
                    'hover:bg-muted/80',
                  ]
                )}
                aria-label="Increase value"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={handleDecrement}
                disabled={disabled || value <= min}
                className={cn(
                  'flex items-center justify-center',
                  'w-7 h-4 rounded-b-md',
                  'text-muted-foreground hover:text-foreground',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-colors',
                  !accessibility.useFallback && [
                    'bg-white/40 dark:bg-white/10',
                    'hover:bg-white/60 dark:hover:bg-white/20',
                  ],
                  accessibility.useFallback && [
                    'bg-muted',
                    'hover:bg-muted/80',
                  ]
                )}
                aria-label="Decrease value"
              >
                <Minus size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// CIRCULAR SLIDER
// ============================================

/**
 * CircularSlider - Circular/rotary slider for repeating values
 *
 * Use circular sliders when values repeat or continue indefinitely.
 * For example, a graphics app might use a circular slider to adjust
 * the rotation of an object between 0 and 360 degrees.
 *
 * @example
 * ```tsx
 * <CircularSlider
 *   value={rotation}
 *   onChange={setRotation}
 *   min={0}
 *   max={360}
 *   size={120}
 *   centerLabel={<span>{rotation}°</span>}
 * />
 * ```
 */
export function CircularSlider({
  value,
  onChange,
  min = 0,
  max = 360,
  step = 1,
  disabled = false,
  size = 100,
  strokeWidth = 8,
  showTickMarks = false,
  tickCount = 12,
  trackColor,
  filledTrackColor,
  centerLabel,
  className,
}: CircularSliderProps) {
  const { accessibility } = useLiquidGlass();
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate angle from value
  const valueToAngle = (val: number): number => {
    return ((val - min) / (max - min)) * 360 - 90; // -90 to start from top
  };

  // Calculate value from angle
  const angleToValue = (angle: number): number => {
    let normalizedAngle = angle + 90; // Adjust for starting from top
    if (normalizedAngle < 0) normalizedAngle += 360;
    if (normalizedAngle >= 360) normalizedAngle -= 360;
    return min + (normalizedAngle / 360) * (max - min);
  };

  // Calculate point on circle
  const getPointOnCircle = (angle: number): { x: number; y: number } => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };

  const currentAngle = valueToAngle(value);
  const thumbPosition = getPointOnCircle(currentAngle);
  const progress = (value - min) / (max - min);
  const strokeDashoffset = circumference * (1 - progress);

  // Handle mouse/touch interaction
  const handleInteraction = (clientX: number, clientY: number) => {
    if (disabled || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - rect.left - center;
    const y = clientY - rect.top - center;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;

    const newValue = snapToStep(clamp(angleToValue(angle), min, max), min, step);
    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleInteraction(e.clientX, e.clientY);
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleInteraction(e.clientX, e.clientY);
    },
    [isDragging]
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
    return undefined;
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Render tick marks
  const renderTickMarks = () => {
    if (!showTickMarks) return null;

    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * 360 - 90;
      const innerPoint = getPointOnCircle(angle);
      const tickLength = 6;
      const outerRadius = radius + tickLength;
      const outerX = center + outerRadius * Math.cos((angle * Math.PI) / 180);
      const outerY = center + outerRadius * Math.sin((angle * Math.PI) / 180);

      ticks.push(
        <circle
          key={i}
          cx={outerX}
          cy={outerY}
          r={2}
          className="fill-muted-foreground/40"
        />
      );
    }
    return ticks;
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor || 'currentColor'}
          strokeWidth={strokeWidth}
          className={cn(
            !trackColor && 'stroke-black/10 dark:stroke-white/10'
          )}
        />

        {/* Filled track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={filledTrackColor || 'hsl(var(--primary))'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${center} ${center})`}
          className="transition-all duration-100"
        />

        {/* Tick marks */}
        {renderTickMarks()}

        {/* Thumb */}
        <motion.circle
          cx={thumbPosition.x}
          cy={thumbPosition.y}
          r={strokeWidth * 0.8}
          className={cn(
            !accessibility.useFallback && [
              'fill-white',
              'stroke-black/20',
            ],
            accessibility.useFallback && [
              'fill-white',
              'stroke-primary',
            ]
          )}
          strokeWidth={2}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          whileHover={accessibility.reduceMotion ? {} : { scale: 1.2 }}
        />
      </svg>

      {/* Center label */}
      {centerLabel && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-sm font-medium text-foreground">
            {centerLabel}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// DISCRETE SLIDER (watchOS style)
// ============================================

export interface DiscreteSliderProps {
  /** Current value (0-based step index) */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Total number of steps */
  steps: number;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Left button icon */
  leftIcon?: React.ReactNode;
  /** Right button icon */
  rightIcon?: React.ReactNode;
  /** Track color */
  trackColor?: string;
  /** Filled track color */
  filledTrackColor?: string;
  /** Whether to show as continuous bar instead of discrete steps */
  continuous?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * DiscreteSlider - watchOS-style discrete step slider
 *
 * A horizontal track appearing as a set of discrete steps or as a continuous bar.
 * People can tap buttons on the sides to increase or decrease the value.
 *
 * @example
 * ```tsx
 * <DiscreteSlider
 *   value={volume}
 *   onChange={setVolume}
 *   steps={10}
 *   leftIcon={<VolumeX size={16} />}
 *   rightIcon={<Volume2 size={16} />}
 * />
 * ```
 */
export function DiscreteSlider({
  value,
  onChange,
  steps,
  disabled = false,
  leftIcon = <Minus size={16} />,
  rightIcon = <Plus size={16} />,
  trackColor,
  filledTrackColor,
  continuous = false,
  className,
}: DiscreteSliderProps) {
  const { accessibility } = useLiquidGlass();

  const handleDecrement = () => {
    if (!disabled && value > 0) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (!disabled && value < steps - 1) {
      onChange(value + 1);
    }
  };

  const fillPercent = ((value + 1) / steps) * 100;

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {/* Decrement button */}
      <button
        onClick={handleDecrement}
        disabled={disabled || value <= 0}
        className={cn(
          'flex items-center justify-center',
          'w-8 h-8 rounded-full',
          'text-muted-foreground',
          'disabled:opacity-30',
          'transition-colors',
          !accessibility.useFallback && [
            'bg-white/20 dark:bg-white/10',
            'hover:bg-white/40 dark:hover:bg-white/20',
          ],
          accessibility.useFallback && [
            'bg-muted',
            'hover:bg-muted/80',
          ]
        )}
        aria-label="Decrease"
      >
        {leftIcon}
      </button>

      {/* Track */}
      <div className="flex-1 h-3 flex items-center gap-0.5">
        {continuous ? (
          // Continuous bar
          <div
            className={cn(
              'w-full h-full rounded-full overflow-hidden',
              !accessibility.useFallback && 'bg-black/10 dark:bg-white/10',
              accessibility.useFallback && 'bg-muted'
            )}
            style={{ backgroundColor: trackColor }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: filledTrackColor || 'hsl(var(--primary))',
              }}
              initial={false}
              animate={{ width: `${fillPercent}%` }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          </div>
        ) : (
          // Discrete steps
          Array.from({ length: steps }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                'flex-1 h-full rounded-sm',
                i <= value
                  ? 'bg-primary'
                  : !accessibility.useFallback
                  ? 'bg-black/10 dark:bg-white/10'
                  : 'bg-muted'
              )}
              style={{
                backgroundColor: i <= value ? filledTrackColor : trackColor,
              }}
              initial={false}
              animate={{
                scale: i <= value ? 1 : 0.9,
                opacity: i <= value ? 1 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          ))
        )}
      </div>

      {/* Increment button */}
      <button
        onClick={handleIncrement}
        disabled={disabled || value >= steps - 1}
        className={cn(
          'flex items-center justify-center',
          'w-8 h-8 rounded-full',
          'text-muted-foreground',
          'disabled:opacity-30',
          'transition-colors',
          !accessibility.useFallback && [
            'bg-white/20 dark:bg-white/10',
            'hover:bg-white/40 dark:hover:bg-white/20',
          ],
          accessibility.useFallback && [
            'bg-muted',
            'hover:bg-muted/80',
          ]
        )}
        aria-label="Increase"
      >
        {rightIcon}
      </button>
    </div>
  );
}

export default GlassSlider;
