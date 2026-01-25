/**
 * Liquid Glass Icon Colors - Apple iOS 26 Design System
 *
 * Color palette for sidebar icons following Apple's Liquid Glass 2026 paradigm.
 * Each icon has unique gradient, icon color, and glow effects for both light and dark modes.
 */

export type IconColorKey =
  | 'dashboard'
  | 'anamnese'
  | 'flash'
  | 'chat'
  | 'prescricao'
  | 'historico'
  | 'biblioteca'
  | 'acessibilidade'
  | 'ajustes';

export interface IconColorConfig {
  /** Gradient for active state background */
  gradient: string;
  /** Gradient for dark mode active state */
  gradientDark: string;
  /** Icon color when active (light mode) */
  iconActive: string;
  /** Icon color when active (dark mode) */
  iconActiveDark: string;
  /** Glow shadow for active state */
  glowShadow: string;
  /** Border color when active */
  borderActive: string;
  /** Border color for dark mode */
  borderActiveDark: string;
}

/**
 * Liquid Glass color configuration for each sidebar icon
 * Based on Apple HIG iOS 26 with medical-appropriate color psychology
 */
export const liquidGlassColors: Record<IconColorKey, IconColorConfig> = {
  // Dashboard - Sky/Blue (Trust, Overview)
  dashboard: {
    gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(99, 102, 241, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(14, 165, 233, 0.35) 0%, rgba(59, 130, 246, 0.25) 50%, rgba(99, 102, 241, 0.15) 100%)',
    iconActive: '#0284C7',
    iconActiveDark: '#38BDF8',
    glowShadow: '0 4px 20px rgba(14, 165, 233, 0.3)',
    borderActive: 'rgba(14, 165, 233, 0.35)',
    borderActiveDark: 'rgba(56, 189, 248, 0.3)',
  },

  // Anamnese - Emerald/Green (Health, Vitality)
  anamnese: {
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(34, 197, 94, 0.15) 50%, rgba(20, 184, 166, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(34, 197, 94, 0.25) 50%, rgba(20, 184, 166, 0.15) 100%)',
    iconActive: '#059669',
    iconActiveDark: '#34D399',
    glowShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
    borderActive: 'rgba(16, 185, 129, 0.35)',
    borderActiveDark: 'rgba(52, 211, 153, 0.3)',
  },

  // Flash - Amber/Yellow (Speed, Energy)
  flash: {
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(251, 191, 36, 0.15) 50%, rgba(249, 115, 22, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(245, 158, 11, 0.35) 0%, rgba(251, 191, 36, 0.25) 50%, rgba(249, 115, 22, 0.15) 100%)',
    iconActive: '#D97706',
    iconActiveDark: '#FBBF24',
    glowShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
    borderActive: 'rgba(245, 158, 11, 0.35)',
    borderActiveDark: 'rgba(251, 191, 36, 0.3)',
  },

  // Chat - Violet/Purple (AI, Intelligence)
  chat: {
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(192, 132, 252, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(168, 85, 247, 0.25) 50%, rgba(192, 132, 252, 0.15) 100%)',
    iconActive: '#7C3AED',
    iconActiveDark: '#A78BFA',
    glowShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
    borderActive: 'rgba(139, 92, 246, 0.35)',
    borderActiveDark: 'rgba(167, 139, 250, 0.3)',
  },

  // Prescrição - Teal/Cyan (Clinical, Precision)
  prescricao: {
    gradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(14, 165, 233, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(20, 184, 166, 0.35) 0%, rgba(6, 182, 212, 0.25) 50%, rgba(14, 165, 233, 0.15) 100%)',
    iconActive: '#0D9488',
    iconActiveDark: '#2DD4BF',
    glowShadow: '0 4px 20px rgba(20, 184, 166, 0.3)',
    borderActive: 'rgba(20, 184, 166, 0.35)',
    borderActiveDark: 'rgba(45, 212, 191, 0.3)',
  },

  // Histórico - Slate/Blue (Records, Time)
  historico: {
    gradient: 'linear-gradient(135deg, rgba(100, 116, 139, 0.25) 0%, rgba(71, 85, 105, 0.15) 50%, rgba(99, 102, 241, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(100, 116, 139, 0.35) 0%, rgba(71, 85, 105, 0.25) 50%, rgba(99, 102, 241, 0.15) 100%)',
    iconActive: '#475569',
    iconActiveDark: '#94A3B8',
    glowShadow: '0 4px 20px rgba(100, 116, 139, 0.25)',
    borderActive: 'rgba(100, 116, 139, 0.35)',
    borderActiveDark: 'rgba(148, 163, 184, 0.3)',
  },

  // Biblioteca - Orange/Amber (Knowledge, Resources)
  biblioteca: {
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(245, 158, 11, 0.15) 50%, rgba(234, 88, 12, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(249, 115, 22, 0.35) 0%, rgba(245, 158, 11, 0.25) 50%, rgba(234, 88, 12, 0.15) 100%)',
    iconActive: '#EA580C',
    iconActiveDark: '#FB923C',
    glowShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
    borderActive: 'rgba(249, 115, 22, 0.35)',
    borderActiveDark: 'rgba(251, 146, 60, 0.3)',
  },

  // Acessibilidade - Indigo/Purple (Inclusion, Care)
  acessibilidade: {
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(168, 85, 247, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.25) 50%, rgba(168, 85, 247, 0.15) 100%)',
    iconActive: '#4F46E5',
    iconActiveDark: '#818CF8',
    glowShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
    borderActive: 'rgba(99, 102, 241, 0.35)',
    borderActiveDark: 'rgba(129, 140, 248, 0.3)',
  },

  // Ajustes - Gray/Slate (Settings, Neutral)
  ajustes: {
    gradient: 'linear-gradient(135deg, rgba(107, 114, 128, 0.25) 0%, rgba(75, 85, 99, 0.15) 50%, rgba(55, 65, 81, 0.1) 100%)',
    gradientDark: 'linear-gradient(135deg, rgba(107, 114, 128, 0.35) 0%, rgba(75, 85, 99, 0.25) 50%, rgba(55, 65, 81, 0.15) 100%)',
    iconActive: '#4B5563',
    iconActiveDark: '#9CA3AF',
    glowShadow: '0 4px 20px rgba(107, 114, 128, 0.2)',
    borderActive: 'rgba(107, 114, 128, 0.35)',
    borderActiveDark: 'rgba(156, 163, 175, 0.3)',
  },
};

/**
 * Map sidebar item IDs to color keys
 */
export const sidebarItemColorMap: Record<string, IconColorKey> = {
  'dashboard': 'dashboard',
  'anamnese': 'anamnese',
  'flash': 'flash',
  'chat-well': 'chat',
  'prescricao': 'prescricao',
  'historico': 'historico',
  'protocolos': 'biblioteca',
  'acessibilidade': 'acessibilidade',
  'config': 'ajustes',
};

/**
 * Get color config for a sidebar item
 */
export function getIconColors(itemId: string): IconColorConfig {
  const colorKey = sidebarItemColorMap[itemId] || 'dashboard';
  return liquidGlassColors[colorKey];
}

/**
 * Tailwind-compatible gradient classes for each icon
 * Use these with Tailwind's arbitrary value syntax
 */
export const tailwindGradientClasses = {
  dashboard: 'from-sky-500/25 via-blue-500/15 to-indigo-500/10',
  anamnese: 'from-emerald-500/25 via-green-500/15 to-teal-500/10',
  flash: 'from-amber-500/25 via-yellow-500/15 to-orange-500/10',
  chat: 'from-violet-500/25 via-purple-500/15 to-fuchsia-500/10',
  prescricao: 'from-teal-500/25 via-cyan-500/15 to-sky-500/10',
  historico: 'from-slate-500/25 via-gray-500/15 to-indigo-500/10',
  biblioteca: 'from-orange-500/25 via-amber-500/15 to-red-500/10',
  acessibilidade: 'from-indigo-500/25 via-violet-500/15 to-purple-500/10',
  ajustes: 'from-gray-500/25 via-slate-500/15 to-zinc-500/10',
} as const;

/**
 * Tailwind-compatible icon color classes
 */
export const tailwindIconClasses = {
  dashboard: { light: 'text-sky-600', dark: 'dark:text-sky-400' },
  anamnese: { light: 'text-emerald-600', dark: 'dark:text-emerald-400' },
  flash: { light: 'text-amber-600', dark: 'dark:text-amber-400' },
  chat: { light: 'text-violet-600', dark: 'dark:text-violet-400' },
  prescricao: { light: 'text-teal-600', dark: 'dark:text-teal-400' },
  historico: { light: 'text-slate-600', dark: 'dark:text-slate-400' },
  biblioteca: { light: 'text-orange-600', dark: 'dark:text-orange-400' },
  acessibilidade: { light: 'text-indigo-600', dark: 'dark:text-indigo-400' },
  ajustes: { light: 'text-gray-600', dark: 'dark:text-gray-400' },
} as const;
