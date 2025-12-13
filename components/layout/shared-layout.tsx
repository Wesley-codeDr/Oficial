'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarProvider } from '@/lib/contexts/sidebar-context';
import { cn } from '@/lib/utils';
import { pageTransition, staggerContainer, staggerChild } from '@/lib/animations/presets';

interface SharedLayoutGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared CSS Grid layout primitive for sidebar-based pages.
 * 
 * This is the single source of truth for:
 * - CSS Grid structure with sidebar column
 * - --sidebar-w CSS variable integration
 * - Base styling and transitions
 * 
 * Used by DashboardLayout and AppShell to prevent drift.
 */
export function SharedLayoutGrid({ children, className }: SharedLayoutGridProps) {
  return (
    <div 
      className={cn(
        'grid h-screen w-full overflow-hidden',
        'text-slate-800 dark:text-slate-100 font-sans',
        'transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]',
        className
      )}
      style={{
        gridTemplateColumns: 'var(--sidebar-w, 256px) 1fr',
      }}
    >
      {children}
    </div>
  );
}

interface SharedLayoutBackgroundProps {
  variant?: 'default' | 'apple2025';
}

/**
 * Shared background component for sidebar-based pages.
 * 
 * @param variant - 'default' for simple gradient, 'apple2025' for animated orbs
 */
export function SharedLayoutBackground({ variant = 'default' }: SharedLayoutBackgroundProps) {
  if (variant === 'apple2025') {
    return (
      <div className="fixed inset-0 -z-10">
        {/* Healthcare gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-blue-50/30 to-teal-50/30 dark:from-[#0a0a0a] dark:via-[#0d0d0f] dark:to-[#0a0a0a]" />
        {/* Subtle animated gradient orbs - Healthcare colors */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-healthcare-primary/10 to-healthcare-accent/10 rounded-full blur-3xl opacity-50 dark:opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-healthcare-accent/10 to-clinical-stable/10 rounded-full blur-3xl opacity-50 dark:opacity-30" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
  );
}

interface SharedSidebarColumnProps {
  children: React.ReactNode;
}

/**
 * Sidebar column wrapper that reserves grid space while sidebar is fixed.
 * Apple HIG: Content should extend beneath the sidebar for floating appearance.
 */
export function SharedSidebarColumn({ children }: SharedSidebarColumnProps) {
  return (
    <div className="relative">
      {/* Background extension effect - Apple HIG recommendation */}
      {/* This creates the illusion of content extending beneath the sidebar */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'inherit',
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
}

interface SharedMainContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main content column wrapper with proper overflow handling.
 */
export function SharedMainContent({ children, className }: SharedMainContentProps) {
  return (
    <main className={cn(
      'flex flex-col h-full min-w-0 w-full relative overflow-hidden z-0',
      className
    )}>
      {children}
    </main>
  );
}

// ============================================
// APPLE HIG SAFE AREA COMPONENTS
// ============================================

type SafeAreaEdge = 'top' | 'bottom' | 'left' | 'right';

interface SafeAreaProviderProps {
  children: React.ReactNode;
  /** Which edges to apply safe area padding */
  edges?: SafeAreaEdge[];
  className?: string;
}

/**
 * SafeAreaProvider - Applies safe area insets to content.
 * Apple HIG: Content should respect safe areas while backgrounds extend full bleed.
 *
 * @example
 * ```tsx
 * // Apply all safe areas
 * <SafeAreaProvider>
 *   <YourContent />
 * </SafeAreaProvider>
 *
 * // Apply only top and bottom (for scrollable content)
 * <SafeAreaProvider edges={['top', 'bottom']}>
 *   <YourContent />
 * </SafeAreaProvider>
 * ```
 */
export function SafeAreaProvider({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  className,
}: SafeAreaProviderProps) {
  const paddingClasses = cn(
    edges.includes('top') && 'safe-area-top',
    edges.includes('bottom') && 'safe-area-bottom',
    edges.includes('left') && 'safe-area-left',
    edges.includes('right') && 'safe-area-right',
    className
  );

  return <div className={paddingClasses}>{children}</div>;
}

type ContentMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface ContentContainerProps {
  children: React.ReactNode;
  /**
   * Maximum content width - Apple HIG recommends 640px for readable content
   * - sm: 480px
   * - md: 640px (default - Apple standard)
   * - lg: 960px
   * - xl: 1280px
   * - 2xl: 1536px
   * - full: 100%
   */
  maxWidth?: ContentMaxWidth;
  className?: string;
}

const maxWidthMap: Record<ContentMaxWidth, string> = {
  sm: 'max-w-[480px]',
  md: 'max-w-[640px]',
  lg: 'max-w-[960px]',
  xl: 'max-w-[1280px]',
  '2xl': 'max-w-[1536px]',
  full: 'max-w-full',
};

/**
 * ContentContainer - Centered content with consistent margins.
 * Apple HIG: Content should be constrained for readability.
 *
 * @example
 * ```tsx
 * // Default width (640px - optimal for reading)
 * <ContentContainer>
 *   <YourContent />
 * </ContentContainer>
 *
 * // Wider layout for dashboard
 * <ContentContainer maxWidth="xl">
 *   <Dashboard />
 * </ContentContainer>
 * ```
 */
export function ContentContainer({
  children,
  maxWidth = 'md',
  className,
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        'px-5 sm:px-8', // Apple inset grouped spacing
        maxWidthMap[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// MAIN LAYOUT COMPONENTS
// ============================================

/**
 * Full layout wrapper combining SidebarProvider with SharedLayoutGrid.
 * Use this for simpler cases where you don't need custom content structure.
 */
export function SharedLayout({
  children,
  backgroundVariant = 'default',
  className
}: {
  children: React.ReactNode;
  backgroundVariant?: 'default' | 'apple2025';
  className?: string;
}) {
  return (
    <SidebarProvider>
      <SharedLayoutBackground variant={backgroundVariant} />
      <SharedLayoutGrid className={className}>
        {children}
      </SharedLayoutGrid>
    </SidebarProvider>
  );
}

// ============================================
// PAGE TRANSITION COMPONENTS (Apple HIG 2025)
// ============================================

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Unique key for AnimatePresence (typically the page path) */
  pageKey?: string;
}

/**
 * Page transition wrapper with Apple HIG-style animations.
 * Wraps page content with fade-in/out and subtle Y-axis movement.
 *
 * @example
 * ```tsx
 * // In a page component
 * export default function MyPage() {
 *   return (
 *     <PageTransitionWrapper pageKey="my-page">
 *       <YourContent />
 *     </PageTransitionWrapper>
 *   );
 * }
 * ```
 */
export function PageTransitionWrapper({
  children,
  className,
  pageKey,
}: PageTransitionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className={cn('w-full h-full', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Custom stagger delay in seconds */
  staggerDelay?: number;
  /** Initial delay before stagger starts */
  initialDelay?: number;
}

/**
 * Container that staggers child animations.
 * Children should use StaggerItem for proper animation.
 *
 * @example
 * ```tsx
 * <StaggerContainer>
 *   <StaggerItem>First item</StaggerItem>
 *   <StaggerItem>Second item</StaggerItem>
 *   <StaggerItem>Third item</StaggerItem>
 * </StaggerContainer>
 * ```
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Individual item within a StaggerContainer.
 * Animates with fade-in and subtle Y movement.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerChild}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fast stagger container for lists with many items.
 * Uses 50ms stagger delay for quicker reveal.
 */
export function FastStaggerContainer({
  children,
  className,
}: Omit<StaggerContainerProps, 'staggerDelay' | 'initialDelay'>) {
  return (
    <StaggerContainer
      staggerDelay={0.05}
      initialDelay={0.05}
      className={className}
    >
      {children}
    </StaggerContainer>
  );
}

