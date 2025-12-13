'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Apple HIG Typography System
 *
 * Text styles with exact Apple HIG values for size, leading, and tracking.
 * Use these components for consistent typography across the app.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/typography
 */

// ============================================
// Types
// ============================================

export type TextVariant =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subhead'
  | 'footnote'
  | 'caption1'
  | 'caption2';

export type HeadingLevel = 'largeTitle' | 'title1' | 'title2' | 'title3' | 'headline';

export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'inherit';

// ============================================
// Style Mappings
// ============================================

const variantClassMap: Record<TextVariant, string> = {
  largeTitle: 'text-large-title',
  title1: 'text-title1',
  title2: 'text-title2',
  title3: 'text-title3',
  headline: 'text-headline',
  body: 'text-body',
  callout: 'text-callout',
  subhead: 'text-subhead',
  footnote: 'text-footnote',
  caption1: 'text-caption1',
  caption2: 'text-caption2',
};

const emphasizedClassMap: Record<TextVariant, string> = {
  largeTitle: 'text-large-title-emphasized',
  title1: 'text-title1-emphasized',
  title2: 'text-title2-emphasized',
  title3: 'text-title3-emphasized',
  headline: 'text-headline-emphasized',
  body: 'text-body-emphasized',
  callout: 'text-callout-emphasized',
  subhead: 'text-subhead-emphasized',
  footnote: 'text-footnote-emphasized',
  caption1: 'text-caption1-emphasized',
  caption2: 'text-caption2-emphasized',
};

const colorClassMap: Record<TextColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  quaternary: 'text-quaternary',
  inherit: '',
};

const headingTagMap: Record<HeadingLevel, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'> = {
  largeTitle: 'h1',
  title1: 'h1',
  title2: 'h2',
  title3: 'h3',
  headline: 'h4',
};

// ============================================
// Text Component
// ============================================

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Apple HIG text style variant */
  variant?: TextVariant;
  /** Use emphasized (bolder) weight */
  emphasized?: boolean;
  /** Apple HIG color hierarchy */
  color?: TextColor;
  /** Render as a different HTML element */
  as?: 'p' | 'span' | 'div' | 'label';
  children: React.ReactNode;
}

/**
 * Text component for Apple HIG typography.
 *
 * @example
 * ```tsx
 * <Text variant="body">Regular body text at 17pt.</Text>
 * <Text variant="subhead" color="secondary">Secondary information</Text>
 * <Text variant="footnote" emphasized>Emphasized footnote</Text>
 * ```
 */
export function Text({
  variant = 'body',
  emphasized = false,
  color = 'inherit',
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  const variantClass = emphasized
    ? emphasizedClassMap[variant]
    : variantClassMap[variant];

  return (
    <Component
      className={cn(variantClass, colorClassMap[color], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// ============================================
// Heading Component
// ============================================

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Apple HIG heading level */
  level: HeadingLevel;
  /** Override the default HTML heading tag */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Use emphasized (bolder) weight */
  emphasized?: boolean;
  /** Apple HIG color hierarchy */
  color?: TextColor;
  children: React.ReactNode;
}

/**
 * Heading component for Apple HIG typography.
 *
 * Maps semantic heading levels to appropriate HTML tags:
 * - largeTitle, title1 → h1
 * - title2 → h2
 * - title3 → h3
 * - headline → h4
 *
 * @example
 * ```tsx
 * <Heading level="largeTitle">Welcome</Heading>
 * <Heading level="title2" emphasized>Patient Details</Heading>
 * <Heading level="headline" as="h2">Section Header</Heading>
 * ```
 */
export function Heading({
  level,
  as,
  emphasized = false,
  color = 'inherit',
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as || headingTagMap[level];
  const variantClass = emphasized
    ? emphasizedClassMap[level]
    : variantClassMap[level];

  return (
    <Component
      className={cn(variantClass, colorClassMap[color], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// ============================================
// Convenience Components (Shortcuts)
// ============================================

export interface ShortcutProps extends Omit<HeadingProps, 'level'> {}
export interface TextShortcutProps extends Omit<TextProps, 'variant'> {}

/**
 * LargeTitle - 34pt heading for prominent titles
 *
 * @example
 * ```tsx
 * <LargeTitle>Welcome to WellWave</LargeTitle>
 * <LargeTitle emphasized>Bold Large Title</LargeTitle>
 * ```
 */
export function LargeTitle(props: ShortcutProps) {
  return <Heading level="largeTitle" {...props} />;
}

/**
 * Title1 - 28pt heading for primary section titles
 */
export function Title1(props: ShortcutProps) {
  return <Heading level="title1" {...props} />;
}

/**
 * Title2 - 22pt heading for secondary sections
 */
export function Title2(props: ShortcutProps) {
  return <Heading level="title2" {...props} />;
}

/**
 * Title3 - 20pt heading for subsections
 */
export function Title3(props: ShortcutProps) {
  return <Heading level="title3" {...props} />;
}

/**
 * Headline - 17pt semibold for list headers, labels
 */
export function HeadlineText(props: ShortcutProps) {
  return <Heading level="headline" {...props} />;
}

/**
 * Body - 17pt for main content text
 */
export function Body(props: TextShortcutProps) {
  return <Text variant="body" {...props} />;
}

/**
 * Callout - 16pt for supporting information
 */
export function Callout(props: TextShortcutProps) {
  return <Text variant="callout" {...props} />;
}

/**
 * Subhead - 15pt for secondary text
 */
export function Subhead(props: TextShortcutProps) {
  return <Text variant="subhead" {...props} />;
}

/**
 * Footnote - 13pt for supplementary information
 */
export function Footnote(props: TextShortcutProps) {
  return <Text variant="footnote" {...props} />;
}

/**
 * Caption - 12pt for timestamps, metadata
 */
export function Caption(props: TextShortcutProps) {
  return <Text variant="caption1" {...props} />;
}

/**
 * Caption2 - 11pt for smallest text elements
 */
export function Caption2(props: TextShortcutProps) {
  return <Text variant="caption2" {...props} />;
}

// ============================================
// Export all
// ============================================

export default {
  Text,
  Heading,
  LargeTitle,
  Title1,
  Title2,
  Title3,
  HeadlineText,
  Body,
  Callout,
  Subhead,
  Footnote,
  Caption,
  Caption2,
};
