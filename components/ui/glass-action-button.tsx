"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Variante de botão
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "medical-primary"
  | "medical-secondary";

/**
 * Tamanho do botão
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Props do GlassActionButton
 */
export interface GlassActionButtonProps
  extends Omit<HTMLMotionProps<"button">, "disabled"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  "aria-label"?: string;
}

/**
 * GlassActionButton - Botão de ação premium com efeito glass
 *
 * @example
 * ```tsx
 * <GlassActionButton
 *   variant="medical-primary"
 *   icon={<Activity className="w-4 h-4" />}
 *   onClick={handleClick}
 * >
 *   Salvar
 * </GlassActionButton>
 * ```
 *
 * @accessibility
 * - Focus visible ring WCAG 2.1 compliant
 * - ARIA attributes (aria-disabled, aria-busy)
 * - Disabled state com feedback visual
 */
export const GlassActionButton = React.forwardRef<
  HTMLButtonElement,
  GlassActionButtonProps
>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      disabled = false,
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
      secondary:
        "bg-slate-200/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 border-white/20 dark:border-white/10 hover:bg-slate-200/60 dark:hover:bg-slate-800/60",
      danger:
        "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/20",
      ghost: "bg-transparent border-transparent hover:bg-white/10",
      // Variantes WellWave
      "medical-primary":
        "bg-medical-primary/20 text-medical-primary border-medical-primary/30 hover:bg-medical-primary/30 hover:border-medical-secondary/40",
      "medical-secondary":
        "bg-medical-secondary/20 text-medical-secondary dark:text-medical-secondary border-medical-secondary/30 hover:bg-medical-secondary/30",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "px-3 py-1.5 text-xs rounded-xl min-h-[32px]",
      md: "px-4 sm:px-5 py-2 sm:py-2.5 text-sm rounded-2xl min-h-[40px]",
      lg: "px-6 sm:px-8 py-3 sm:py-3.5 text-base rounded-3xl min-h-[48px]",
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-disabled={isDisabled ? "true" : "false"}
        aria-busy={loading ? "true" : "false"}
        whileHover={isDisabled ? {} : { scale: 1.02 }}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        className={cn(
          "relative flex items-center justify-center gap-2",
          "font-semibold backdrop-blur-xl border transition-all duration-300",
          variants[variant],
          sizes[size],
          "shadow-lg shadow-black/5",
          // Focus visible (WCAG 2.1)
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
          // Disabled state
          isDisabled && "opacity-50 cursor-not-allowed",
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === "left" && icon}
        {children}
        {!loading && icon && iconPosition === "right" && icon}
      </motion.button>
    );
  }
);

GlassActionButton.displayName = "GlassActionButton";

/**
 * Props do GlassActionButtonGroup
 */
export interface GlassActionButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
  fullWidth?: boolean;
}

/**
 * GlassActionButtonGroup - Agrupador de botões com separadores elegantes
 *
 * @example
 * ```tsx
 * <GlassActionButtonGroup orientation="horizontal">
 *   <GlassActionButton>Opção 1</GlassActionButton>
 *   <GlassActionButton>Opção 2</GlassActionButton>
 * </GlassActionButtonGroup>
 * ```
 */
export const GlassActionButtonGroup = ({
  children,
  className,
  orientation = "horizontal",
  fullWidth = false,
}: GlassActionButtonGroupProps) => {
  return (
    <div
      role="group"
      className={cn(
        "flex items-center gap-1 p-1.5 rounded-[22px]",
        "bg-slate-200/40 dark:bg-slate-900/40 backdrop-blur-xl",
        "border border-white/20 dark:border-white/10",
        "shadow-lg shadow-black/5",
        orientation === "vertical" && "flex-col",
        fullWidth && "w-full",
        className
      )}
    >
      {React.Children.map(children, (child, index) => (
        <React.Fragment>
          {child}
          {index < React.Children.count(children) - 1 && (
            <div
              className={cn(
                "bg-slate-300/50 dark:bg-slate-700/50",
                orientation === "horizontal" ? "w-px h-6 mx-1" : "h-px w-full my-1"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
