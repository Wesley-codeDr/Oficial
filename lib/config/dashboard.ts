/**
 * Dashboard Configuration
 *
 * Centralized configuration for dashboard components
 */

export const DASHBOARD_CONFIG = {
  // Animation durations (in milliseconds)
  animation: {
    countUp: 2000,
    chart: 1500,
    cardHover: 300,
    cardExit: 200,
    glow: 400,
    tooltip: 700,
  },

  // Easing functions
  easing: {
    smooth: [0.25, 1, 0.5, 1],
    bounce: [0.25, 1, 0.5, 1],
  },

  // Card dimensions (in pixels)
  card: {
    compact: {
      height: 180,
      padding: 16,
      titleSize: 12,
      valueSize: 38,
      subtitleSize: 13,
    },
    comfortable: {
      height: 240,
      padding: 24,
      titleSize: 14,
      valueSize: 52,
      subtitleSize: 13,
    },
  },

  // Chart configurations
  chart: {
    strokeWidth: 1.5,
    dotRadius: 6,
    areaOpacity: 0.25,
    glowBlur: 90,
  },

  // Density modes
  density: {
    compact: 'compact' as const,
    comfortable: 'comfortable' as const,
  },
} as const

export type DashboardDensity = typeof DASHBOARD_CONFIG.density[keyof typeof DASHBOARD_CONFIG.density]
