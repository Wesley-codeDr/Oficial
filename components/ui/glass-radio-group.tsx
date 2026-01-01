"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Variante de cores para o glider do GlassRadioGroup
 */
export type ColorVariant = "silver" | "gold" | "platinum" | "default";

/**
 * Opção individual do radio group
 */
export interface RadioOption {
  id: string;
  label: string;
  value: string;
  color?: ColorVariant;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Props do GlassRadioGroup
 */
export interface GlassRadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  name?: string;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * GlassRadioGroup - Radio group premium com efeito glider animado
 *
 * @example
 * ```tsx
 * <GlassRadioGroup
 *   options={[
 *     { id: "1", label: "Silver", value: "silver", color: "silver" },
 *     { id: "2", label: "Gold", value: "gold", color: "gold" },
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   aria-label="Selecione um tema"
 * />
 * ```
 *
 * @accessibility
 * - Suporta navegação por teclado (Arrow keys, Home, End)
 * - ARIA attributes completos (role, aria-checked, aria-disabled)
 * - Focus visible WCAG 2.1 compliant
 */
export const GlassRadioGroup = ({
  options,
  value: propValue,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  className,
  name,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: GlassRadioGroupProps) => {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue || options.find((opt) => !opt.disabled)?.value || options[0]?.value
  );
  const selectedValue = propValue !== undefined ? propValue : internalValue;

  // Memoize enabled options
  const enabledOptions = React.useMemo(
    () => options.filter((opt) => !opt.disabled && !disabled),
    [options, disabled]
  );

  const handleSelect = React.useCallback(
    (value: string) => {
      const option = options.find((opt) => opt.value === value);
      if (option?.disabled || disabled) return;

      if (propValue === undefined) {
        setInternalValue(value);
      }
      onChange?.(value);
    },
    [options, disabled, propValue, onChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent, currentValue: string) => {
      if (disabled || enabledOptions.length === 0) return;

      const currentEnabledIndex = enabledOptions.findIndex((opt) => opt.value === currentValue);

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex = (currentEnabledIndex + 1) % enabledOptions.length;
          const nextOption = enabledOptions[nextIndex];
          if (nextOption) handleSelect(nextOption.value);
          break;
        }

        case "ArrowLeft":
        case "ArrowUp": {
          e.preventDefault();
          const prevIndex =
            (currentEnabledIndex - 1 + enabledOptions.length) % enabledOptions.length;
          const prevOption = enabledOptions[prevIndex];
          if (prevOption) handleSelect(prevOption.value);
          break;
        }

        case "Home": {
          e.preventDefault();
          const firstOption = enabledOptions[0];
          if (firstOption) handleSelect(firstOption.value);
          break;
        }

        case "End": {
          e.preventDefault();
          const lastOption = enabledOptions[enabledOptions.length - 1];
          if (lastOption) handleSelect(lastOption.value);
          break;
        }

        case " ":
        case "Enter": {
          e.preventDefault();
          handleSelect(currentValue);
          break;
        }
      }
    },
    [disabled, enabledOptions, handleSelect]
  );

  const selectedIndex = options.findIndex((opt) => opt.value === selectedValue);
  const selectedOption = options[selectedIndex];

  // Map defined colors to gradients and shadows
  const getGliderStyles = (color?: ColorVariant) => {
    switch (color) {
      case "silver":
        return {
          background:
            "linear-gradient(135deg, rgba(192, 192, 192, 0.35), rgba(224, 224, 224, 0.8))",
          boxShadow:
            "0 0 18px rgba(192, 192, 192, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.4)",
        };
      case "gold":
        return {
          background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.35), rgba(255, 204, 0, 0.8))",
          boxShadow:
            "0 0 18px rgba(255, 215, 0, 0.5), inset 0 0 10px rgba(255, 235, 150, 0.4)",
        };
      case "platinum":
        return {
          background:
            "linear-gradient(135deg, rgba(208, 231, 255, 0.35), rgba(160, 216, 255, 0.8))",
          boxShadow:
            "0 0 18px rgba(160, 216, 255, 0.5), inset 0 0 10px rgba(200, 240, 255, 0.4)",
        };
      default:
        return {
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.3))",
          boxShadow:
            "0 0 15px rgba(255, 255, 255, 0.2), inset 0 0 8px rgba(255, 255, 255, 0.3)",
        };
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - ARIA spec requires string "true"/"false", not boolean
      aria-disabled={disabled ? "true" : "false"}
      onBlur={onBlur}
      onFocus={onFocus}
      className={cn(
        "relative flex w-full sm:w-fit gap-0 p-0.5 rounded-2xl overflow-hidden",
        "bg-slate-200/40 dark:bg-slate-900/40 backdrop-blur-xl",
        "border border-white/20 dark:border-white/10",
        "shadow-lg shadow-black/5",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {/* Glider Background */}
      <motion.div
        className="absolute bottom-0.5 top-0.5 z-0 rounded-[14px]"
        initial={false}
        animate={{
          x: `calc(${selectedIndex} * 100%)`,
          width: `calc(100% / ${options.length})`,
          ...getGliderStyles(selectedOption?.color),
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
          background: { duration: 0.4 },
        }}
      />

      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        const isDisabled = option.disabled || disabled;
        const isEnabled = !isDisabled;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            name={name}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - ARIA spec requires string "true"/"false", not boolean
            aria-checked={isSelected ? "true" : "false"}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - ARIA spec requires string "true"/"false", not boolean
            aria-disabled={isDisabled ? "true" : "false"}
            aria-label={option.ariaLabel || option.label}
            tabIndex={isSelected && isEnabled ? 0 : -1}
            disabled={isDisabled}
            onClick={() => handleSelect(option.value)}
            onKeyDown={(e) => handleKeyDown(e, option.value)}
            className={cn(
              "relative z-10 flex flex-1 items-center justify-center",
              "min-w-[80px] sm:min-w-[100px]",
              "px-4 sm:px-6 py-2.5",
              "text-xs sm:text-sm font-semibold tracking-tight",
              "transition-colors duration-300",
              // Focus visible (WCAG 2.1)
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              "dark:focus-visible:ring-blue-400",
              // Selected state
              isSelected
                ? "text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-400",
              // Hover state (only if enabled)
              isEnabled && !isSelected && "hover:text-slate-900 dark:hover:text-slate-200",
              // Disabled state
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
