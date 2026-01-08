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
          backdrop-blur-[60px] saturate-[180%]
          bg-white/80 dark:bg-slate-900/80
          border-white/40 dark:border-white/10
          text-slate-900 dark:text-slate-100
          shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)]
          dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]
        `,
        destructive: `
          backdrop-blur-[60px] saturate-[180%]
          bg-rose-500/90 dark:bg-rose-500/85
          border-rose-500/40 dark:border-rose-500/30
          text-white
          shadow-[0_35px_60px_-15px_rgba(244,63,94,0.3)]
        `,
        success: `
          backdrop-blur-[60px] saturate-[180%]
          bg-green-500/90 dark:bg-green-500/85
          border-green-500/40 dark:border-green-500/30
          text-white
          shadow-[0_35px_60px_-15px_rgba(34,197,94,0.3)]
        `,
        warning: `
          backdrop-blur-[60px] saturate-[180%]
          bg-orange-500/90 dark:bg-orange-500/85
          border-orange-500/40 dark:border-orange-500/30
          text-white
          shadow-[0_35px_60px_-15px_rgba(249,115,22,0.3)]
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
    default: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    destructive: <AlertCircle className="h-5 w-5 text-rose-100" />,
    success: <CheckCircle className="h-5 w-5 text-green-100" />,
    warning: <AlertCircle className="h-5 w-5 text-orange-100" />,
  }

  return (
    <div className="shrink-0 mt-0.5">
      {icons[variant] || icons.default}
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
