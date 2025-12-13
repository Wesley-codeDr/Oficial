'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { BackgroundExtensionConfig } from '../types';
import { SIDEBAR, GLASS_BLUR } from '../constants';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

// ============================================
// TYPES
// ============================================

export interface BackgroundExtensionProps extends Partial<BackgroundExtensionConfig> {
  /** Children content (the main content area) */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Style overrides */
  style?: React.CSSProperties;
}

// ============================================
// BACKGROUND EXTENSION EFFECT
// ============================================

/**
 * BackgroundExtension - Creates impression of content extending under sidebars
 *
 * A background extension effect mirrors the adjacent content to give the
 * impression of stretching it under the sidebar, and applies a blur to
 * maintain legibility of the sidebar or inspector.
 *
 * This effect is perfect for creating a full, edge-to-edge content experience
 * in apps that use split views, such as for hero images on product pages.
 *
 * @example
 * ```tsx
 * <BackgroundExtension edge="leading" size={280}>
 *   <img src="hero.jpg" className="w-full h-full object-cover" />
 * </BackgroundExtension>
 * ```
 */
export function BackgroundExtension({
  edge = 'leading',
  size = SIDEBAR.width,
  blur = SIDEBAR.backgroundExtensionBlur,
  enabled = true,
  children,
  className,
  style,
}: BackgroundExtensionProps) {
  const { accessibility } = useLiquidGlass();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Don't apply effect if disabled or using fallback
  const shouldApplyEffect = enabled && !accessibility.useFallback;

  // Position styles based on edge
  const edgeStyles: Record<string, React.CSSProperties> = {
    leading: {
      left: 0,
      top: 0,
      bottom: 0,
      width: size,
    },
    trailing: {
      right: 0,
      top: 0,
      bottom: 0,
      width: size,
    },
    top: {
      top: 0,
      left: 0,
      right: 0,
      height: size,
    },
    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
      height: size,
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={style}
    >
      {/* Main content */}
      {children}

      {/* Extension overlay */}
      {shouldApplyEffect && (
        <div
          className="absolute pointer-events-none"
          style={{
            ...edgeStyles[edge],
            backdropFilter: `blur(${blur}px) saturate(120%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(120%)`,
            maskImage:
              edge === 'leading' || edge === 'trailing'
                ? `linear-gradient(${edge === 'leading' ? 'to right' : 'to left'}, black 0%, transparent 100%)`
                : `linear-gradient(${edge === 'top' ? 'to bottom' : 'to top'}, black 0%, transparent 100%)`,
            WebkitMaskImage:
              edge === 'leading' || edge === 'trailing'
                ? `linear-gradient(${edge === 'leading' ? 'to right' : 'to left'}, black 0%, transparent 100%)`
                : `linear-gradient(${edge === 'top' ? 'to bottom' : 'to top'}, black 0%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ============================================
// SPLIT VIEW WITH EXTENSION
// ============================================

export interface SplitViewProps {
  /** Sidebar content */
  sidebar: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
  /** Sidebar position */
  sidebarPosition?: 'leading' | 'trailing';
  /** Sidebar width */
  sidebarWidth?: number;
  /** Enable background extension effect */
  backgroundExtension?: boolean;
  /** Additional class names for container */
  className?: string;
  /** Additional class names for sidebar */
  sidebarClassName?: string;
  /** Additional class names for content */
  contentClassName?: string;
}

/**
 * SplitView - Split view layout with optional background extension
 *
 * @example
 * ```tsx
 * <SplitView
 *   sidebar={<Sidebar />}
 *   sidebarPosition="leading"
 *   backgroundExtension
 * >
 *   <MainContent />
 * </SplitView>
 * ```
 */
export function SplitView({
  sidebar,
  children,
  sidebarPosition = 'leading',
  sidebarWidth = SIDEBAR.width,
  backgroundExtension = false,
  className,
  sidebarClassName,
  contentClassName,
}: SplitViewProps) {
  const { accessibility } = useLiquidGlass();

  return (
    <div
      className={cn(
        'flex h-full',
        sidebarPosition === 'trailing' && 'flex-row-reverse',
        className
      )}
    >
      {/* Sidebar */}
      <aside
        className={cn(
          'flex-shrink-0 z-10',
          !accessibility.useFallback && [
            'bg-white/60 dark:bg-[rgb(28,28,30)]/70',
            'backdrop-blur-[40px] backdrop-saturate-[200%]',
            'border-r border-white/30 dark:border-white/10',
          ],
          accessibility.useFallback && [
            'bg-white/95 dark:bg-[rgb(28,28,30)]/95',
            'border-r border-black/10 dark:border-white/10',
          ],
          sidebarClassName
        )}
        style={{ width: sidebarWidth }}
      >
        {sidebar}
      </aside>

      {/* Main content with optional background extension */}
      <main className={cn('flex-1 overflow-hidden', contentClassName)}>
        {backgroundExtension ? (
          <BackgroundExtension
            edge={sidebarPosition}
            size={sidebarWidth}
            enabled={backgroundExtension}
          >
            {children}
          </BackgroundExtension>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

// ============================================
// INSPECTOR PANEL
// ============================================

export interface InspectorPanelProps {
  /** Whether inspector is visible */
  isPresented: boolean;
  /** Inspector content */
  children: React.ReactNode;
  /** Inspector width */
  width?: number;
  /** Position of inspector */
  position?: 'leading' | 'trailing';
  /** Enable background extension */
  backgroundExtension?: boolean;
  /** Additional class names */
  className?: string;
  /** On close callback */
  onClose?: () => void;
}

/**
 * InspectorPanel - Sliding inspector panel with glass effect
 *
 * @example
 * ```tsx
 * <InspectorPanel isPresented={showInspector} onClose={() => setShowInspector(false)}>
 *   <InspectorContent />
 * </InspectorPanel>
 * ```
 */
export function InspectorPanel({
  isPresented,
  children,
  width = SIDEBAR.width,
  position = 'trailing',
  backgroundExtension = true,
  className,
  onClose,
}: InspectorPanelProps) {
  const { accessibility } = useLiquidGlass();

  if (!isPresented) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 z-50',
          position === 'leading' ? 'left-0' : 'right-0',
          !accessibility.useFallback && [
            'bg-white/85 dark:bg-[rgb(44,44,46)]/90',
            'backdrop-blur-[40px] backdrop-saturate-[200%]',
            position === 'leading'
              ? 'border-r border-white/40 dark:border-white/10'
              : 'border-l border-white/40 dark:border-white/10',
          ],
          accessibility.useFallback && [
            'bg-white dark:bg-[rgb(44,44,46)]',
            position === 'leading'
              ? 'border-r border-black/10 dark:border-white/10'
              : 'border-l border-black/10 dark:border-white/10',
          ],
          'shadow-2xl',
          className
        )}
        style={{ width }}
        role="complementary"
        aria-label="Inspector"
      >
        {children}
      </aside>
    </>
  );
}

export default BackgroundExtension;
