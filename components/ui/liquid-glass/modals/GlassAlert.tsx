'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useLiquidGlass } from '../hooks/useLiquidGlass';
import { ANIMATION_DURATION, SHEET } from '../constants';

// ============================================
// TYPES
// ============================================

/**
 * Alert severity levels
 */
export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

/**
 * Alert action button configuration
 */
export interface AlertAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button style */
  style?: 'default' | 'cancel' | 'destructive';
  /** Whether this is the default action (receives keyboard focus) */
  isDefault?: boolean;
}

export interface GlassAlertProps {
  /** Whether alert is visible */
  isOpen: boolean;
  /** Callback when alert should close */
  onClose: () => void;
  /** Alert title */
  title: string;
  /** Alert message */
  message?: string;
  /** Alert severity */
  severity?: AlertSeverity;
  /** Show severity icon */
  showIcon?: boolean;
  /** Action buttons */
  actions?: AlertAction[];
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Additional class names */
  className?: string;
}

// ============================================
// CONSTANTS
// ============================================

const SEVERITY_ICONS: Record<AlertSeverity, React.ReactNode> = {
  info: <Info className="w-6 h-6" />,
  success: <CheckCircle className="w-6 h-6" />,
  warning: <AlertTriangle className="w-6 h-6" />,
  error: <XCircle className="w-6 h-6" />,
};

const SEVERITY_COLORS: Record<AlertSeverity, string> = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-amber-500',
  error: 'text-red-500',
};

// ============================================
// GLASS ALERT COMPONENT
// ============================================

/**
 * GlassAlert - Modal alert for critical information
 *
 * An alert delivers important information related to your app and
 * requires an explicit action to dismiss. Alerts appear on top of
 * all other content.
 *
 * @example
 * ```tsx
 * <GlassAlert
 *   isOpen={showAlert}
 *   onClose={() => setShowAlert(false)}
 *   title="Delete Item?"
 *   message="This action cannot be undone."
 *   severity="warning"
 *   actions={[
 *     { label: 'Cancel', onClick: () => setShowAlert(false), style: 'cancel' },
 *     { label: 'Delete', onClick: handleDelete, style: 'destructive' },
 *   ]}
 * />
 * ```
 */
export function GlassAlert({
  isOpen,
  onClose,
  title,
  message,
  severity = 'info',
  showIcon = true,
  actions = [],
  closeOnBackdropClick = false,
  closeOnEscape = true,
  className,
}: GlassAlertProps) {
  const { accessibility } = useLiquidGlass();
  const defaultButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus default button when alert opens
  React.useEffect(() => {
    if (isOpen && defaultButtonRef.current) {
      defaultButtonRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when alert is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [isOpen]);

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  // If no actions provided, add a default OK button
  const effectiveActions = actions.length > 0
    ? actions
    : [{ label: 'OK', onClick: onClose, style: 'default' as const, isDefault: true }];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="alert-title"
          aria-describedby={message ? 'alert-message' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: accessibility.reduceMotion ? 0 : 0.2 }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Alert container */}
          <motion.div
            className={cn(
              'relative z-10 w-full max-w-[280px]',
              'overflow-hidden',
              !accessibility.useFallback && [
                'bg-white/85 dark:bg-[rgb(44,44,46)]/90',
                'backdrop-blur-[40px] backdrop-saturate-[200%]',
                'border border-white/40 dark:border-white/10',
                'shadow-2xl',
              ],
              accessibility.useFallback && [
                'bg-white dark:bg-[rgb(44,44,46)]',
                'border border-black/10 dark:border-white/10',
                'shadow-xl',
              ],
              className
            )}
            style={{ borderRadius: SHEET.cornerRadius }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              duration: accessibility.reduceMotion ? 0 : ANIMATION_DURATION.expand / 1000,
            }}
          >
            {/* Content */}
            <div className="px-4 pt-5 pb-4 text-center">
              {/* Icon */}
              {showIcon && (
                <div className={cn('mb-3', SEVERITY_COLORS[severity])}>
                  {SEVERITY_ICONS[severity]}
                </div>
              )}

              {/* Title */}
              <h2
                id="alert-title"
                className="text-base font-semibold text-foreground"
              >
                {title}
              </h2>

              {/* Message */}
              {message && (
                <p
                  id="alert-message"
                  className="mt-2 text-sm text-muted-foreground"
                >
                  {message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div
              className={cn(
                'border-t border-black/10 dark:border-white/10',
                effectiveActions.length === 2 ? 'flex' : 'flex flex-col'
              )}
            >
              {effectiveActions.map((action, index) => {
                const isDestructive = action.style === 'destructive';
                const isCancel = action.style === 'cancel';
                const isDefault = action.isDefault || (index === effectiveActions.length - 1 && !isCancel);

                return (
                  <button
                    key={index}
                    ref={isDefault ? defaultButtonRef : undefined}
                    onClick={action.onClick}
                    className={cn(
                      'flex-1 py-3 text-[17px] font-medium',
                      'transition-colors',
                      'focus-visible:outline-none focus-visible:bg-black/5 dark:focus-visible:bg-white/10',
                      effectiveActions.length === 2 && index === 0 && 'border-r border-black/10 dark:border-white/10',
                      effectiveActions.length > 2 && index > 0 && 'border-t border-black/10 dark:border-white/10',
                      isDestructive && 'text-red-500',
                      isCancel && 'text-primary font-normal',
                      !isDestructive && !isCancel && 'text-primary',
                      'hover:bg-black/5 dark:hover:bg-white/10',
                      'active:bg-black/10 dark:active:bg-white/20'
                    )}
                  >
                    {action.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default GlassAlert;
