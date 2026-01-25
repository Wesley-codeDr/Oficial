'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border p-4 pr-8 shadow-lg transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: `
          liquid-glass-elevated
          bg-white/80 dark:bg-slate-900/80
          border-white/40 dark:border-white/10
          text-slate-900 dark:text-slate-100
          shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)]
          dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]
        `,
        destructive: `
          liquid-glass-elevated
          bg-[#FF3B30]/90 dark:bg-[#FF453A]/85
          border-[#FF3B30]/40 dark:border-[#FF453A]/30
          text-white
          shadow-[0_35px_60px_-15px_rgba(255,59,48,0.3)]
        `,
        success: `
          liquid-glass-elevated
          bg-[#34C759]/90 dark:bg-[#30D158]/85
          border-[#34C759]/40 dark:border-[#30D158]/30
          text-white
          shadow-[0_35px_60px_-15px_rgba(52,199,89,0.3)]
        `,
        warning: `
          liquid-glass-elevated
          bg-[#FF9500]/90 dark:bg-[#FF9F0A]/85
          border-[#FF9500]/40 dark:border-[#FF9F0A]/30
          text-white
          shadow-[0_35px_60px_-15px_rgba(255,149,0,0.3)]
        `,
        info: `
          liquid-glass-elevated
          bg-[#5AC8FA]/90 dark:bg-[#5AC8FA]/85
          border-[#5AC8FA]/40 dark:border-[#5AC8FA]/30
          text-white
          shadow-[0_35px_60px_-15px_rgba(90,200,250,0.3)]
        `,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-xl border bg-white/50 dark:bg-white/10 px-3 text-sm font-medium transition-colors hover:bg-white/70 dark:hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-xl p-1.5 text-slate-400 dark:text-slate-400/70 opacity-0 transition-opacity hover:text-slate-600 dark:hover:text-slate-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-hover:opacity-100',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90 leading-relaxed', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

const ToastIcon = ({ variant }: { variant: VariantProps<typeof toastVariants>['variant'] }) => {
  const icons = {
    default: <Info className="h-5 w-5 text-[#007AFF] dark:text-[#0A84FF]" />,
    destructive: <AlertCircle className="h-5 w-5 text-white/90" />,
    success: <CheckCircle className="h-5 w-5 text-white/90" />,
    warning: <AlertCircle className="h-5 w-5 text-white/90" />,
    info: <Info className="h-5 w-5 text-white/90" />,
  }

  return (
    <div className="shrink-0 mt-0.5">
      {icons[variant as keyof typeof icons] || icons.default}
    </div>
  )
}

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
}
