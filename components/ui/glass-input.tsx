'use client';

import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';
import { Eye, EyeOff, Search, X } from 'lucide-react';

// ============================================
// TYPES
// ============================================

type InputSize = 'sm' | 'md' | 'lg';

interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

interface GlassSearchInputProps extends Omit<GlassInputProps, 'type'> {
  onSearch?: (value: string) => void;
}

// ============================================
// STYLES
// ============================================

const sizeStyles: Record<InputSize, { input: string; label: string; icon: string }> = {
  sm: {
    input: 'h-10 px-4 text-sm rounded-[14px]',
    label: 'text-xs',
    icon: 'w-4 h-4',
  },
  md: {
    input: 'h-12 px-5 text-sm rounded-[18px]',
    label: 'text-sm',
    icon: 'w-5 h-5',
  },
  lg: {
    input: 'h-14 px-6 text-base rounded-[22px]',
    label: 'text-sm',
    icon: 'w-5 h-5',
  },
};

// ============================================
// GLASS INPUT COMPONENT
// ============================================

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      className,
      type = 'text',
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const sizeConfig = sizeStyles[size];
    const isPassword = type === 'password';
    const hasValue = value !== undefined && value !== '';

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label className={cn(
            'font-semibold text-slate-700 dark:text-slate-300 ml-1',
            sizeConfig.label
          )}>
            {label}
          </label>
        )}

        {/* Input Container */}
        <motion.div
          className={cn(
            'relative flex items-center',
            'bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-xl',
            'border transition-all duration-300',
            isFocused
              ? 'border-ios-blue/50 ring-2 ring-ios-blue/20 shadow-[0_0_20px_rgba(10,132,255,0.15)]'
              : 'border-white/60 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)]',
            error && 'border-ios-red/50 ring-2 ring-ios-red/20',
            disabled && 'opacity-50 cursor-not-allowed',
            sizeConfig.input,
            className
          )}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={appleSpring}
        >
          {/* Left Icon */}
          {leftIcon && (
            <span className={cn(
              'shrink-0 mr-3 text-slate-400',
              isFocused && 'text-ios-blue'
            )}>
              {leftIcon}
            </span>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            value={value}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              'flex-1 bg-transparent outline-none',
              'text-slate-800 dark:text-white',
              'placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'font-medium'
            )}
            {...props}
          />

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-2">
            {/* Clear Button */}
            <AnimatePresence>
              {clearable && hasValue && !disabled && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={onClear}
                  className="p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Password Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-slate-400" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </button>
            )}

            {/* Right Icon */}
            {rightIcon && (
              <span className={cn('shrink-0 text-slate-400', sizeConfig.icon)}>
                {rightIcon}
              </span>
            )}
          </div>
        </motion.div>

        {/* Error / Hint */}
        <AnimatePresence>
          {(error || hint) && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={cn(
                'text-xs ml-1',
                error ? 'text-ios-red' : 'text-slate-500'
              )}
            >
              {error || hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

// ============================================
// GLASS SEARCH INPUT
// ============================================

export const GlassSearchInput = forwardRef<HTMLInputElement, GlassSearchInputProps>(
  ({ onSearch, onClear, ...props }, ref) => {
    return (
      <GlassInput
        ref={ref}
        type="search"
        placeholder="Pesquisar..."
        leftIcon={<Search className="w-5 h-5" />}
        clearable
        onClear={onClear}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch?.(e.currentTarget.value);
          }
        }}
        {...props}
      />
    );
  }
);

GlassSearchInput.displayName = 'GlassSearchInput';

// ============================================
// GLASS TEXTAREA
// ============================================

interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ label, error, hint, className, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
            {label}
          </label>
        )}

        {/* Textarea Container */}
        <textarea
          ref={ref}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            'min-h-[120px] p-4 rounded-[18px]',
            'bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-xl',
            'border transition-all duration-300',
            'text-slate-800 dark:text-white font-medium',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'outline-none resize-none',
            isFocused
              ? 'border-ios-blue/50 ring-2 ring-ios-blue/20 shadow-[0_0_20px_rgba(10,132,255,0.15)]'
              : 'border-white/60 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)]',
            error && 'border-ios-red/50 ring-2 ring-ios-red/20',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        />

        {/* Error / Hint */}
        <AnimatePresence>
          {(error || hint) && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={cn(
                'text-xs ml-1',
                error ? 'text-ios-red' : 'text-slate-500'
              )}
            >
              {error || hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassTextarea.displayName = 'GlassTextarea';

export default GlassInput;
