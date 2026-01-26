/**
 * Animation Choreography - WellWave Liquid Glass 2026
 *
 * Orquestrações de animação para diferentes contextos e páginas.
 * Define timing, delays e sequências para criar experiências memoráveis.
 *
 * @module animation-choreography
 */

import { Transition, Variants } from 'framer-motion'
import { applePhysics } from './animation-tokens'

/**
 * Configuração de timing para uma animação individual
 */
export interface AnimationTiming {
  /** Delay antes da animação começar (ms) */
  delay: number
  /** Duração da animação (ms) */
  duration: number
  /** Delay entre items em stagger (ms) - opcional */
  stagger?: number
}

/**
 * Orquestração de animação de página
 */
export interface PageChoreography {
  [key: string]: AnimationTiming
}

// ============================================================================
// PAGE LOAD CHOREOGRAPHIES
// ============================================================================

/**
 * Dashboard - Sequência de entrada orquestrada
 *
 * Ordem:
 * 1. Blobs de fundo (0ms)
 * 2. Header (200ms)
 * 3. Feature pills (400ms, stagger 100ms)
 * 4. Hero card (600ms)
 * 5. Grid cards (800ms, stagger 80ms)
 */
export const dashboardChoreography: PageChoreography = {
  blobs: { delay: 0, duration: 400 },
  header: { delay: 200, duration: 300 },
  featurePills: { delay: 400, duration: 200, stagger: 100 },
  heroCard: { delay: 600, duration: 400 },
  gridCards: { delay: 800, duration: 300, stagger: 80 },
}

/**
 * Anamnese Form - Entrada progressiva por zonas
 *
 * Ordem:
 * 1. Navbar (0ms)
 * 2. Category navigation (200ms, stagger 50ms)
 * 3. Checkbox zone (400ms, stagger 40ms)
 * 4. Floating panels (600ms)
 */
export const anamneseChoreography: PageChoreography = {
  navbar: { delay: 0, duration: 300 },
  categoryNav: { delay: 200, duration: 300, stagger: 50 },
  checkboxZone: { delay: 400, duration: 400, stagger: 40 },
  floatingPanels: { delay: 600, duration: 300 },
}

/**
 * History Timeline - Revelação progressiva
 *
 * Ordem:
 * 1. Header (0ms)
 * 2. Timeline groups (200ms, stagger 100ms)
 * 3. Cards dentro de grupos (scroll-triggered)
 */
export const historyChoreography: PageChoreography = {
  header: { delay: 0, duration: 300 },
  timelineGroups: { delay: 200, duration: 300, stagger: 100 },
  // Cards usam scroll-triggered animation
}

/**
 * Kanban Board - Entrada por colunas
 *
 * Ordem:
 * 1. Board header (0ms)
 * 2. Columns (200ms, stagger 100ms)
 * 3. Cards em cada coluna (stagger 60ms)
 */
export const kanbanChoreography: PageChoreography = {
  boardHeader: { delay: 0, duration: 300 },
  columns: { delay: 200, duration: 300, stagger: 100 },
  cardsPerColumn: { delay: 0, duration: 250, stagger: 60 },
}

// ============================================================================
// INTERACTION CHOREOGRAPHIES
// ============================================================================

/**
 * Dashboard Card Hover - Orquestração de elementos internos
 */
export const cardHoverChoreography = {
  container: {
    duration: 0.3,
    ease: [0.25, 1, 0.5, 1],
  },
  icon: {
    delay: 0,
    duration: 0.2,
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },
  badge: {
    delay: 0.1,
    duration: 0.2,
  },
  glow: {
    delay: 0,
    duration: 0.3,
  },
}

/**
 * Form Tab Transition - Exit e Enter
 */
export const formTabTransition = {
  exit: {
    duration: 0.15,
    ease: 'easeIn' as const,
  },
  enter: {
    duration: 0.20,
    ease: 'easeOut' as const,
  },
  checkboxStagger: 0.04,
}

/**
 * Emergency Alert - Sequência dramática
 *
 * 1. Background tint (150ms)
 * 2. Badge spring in (200ms, delay 150ms)
 * 3. Icon pulse (500ms loop)
 * 4. Text reveal (300ms)
 */
export const emergencyAlertChoreography = {
  backgroundTint: {
    delay: 0,
    duration: 150,
  },
  badge: {
    delay: 150,
    duration: 200,
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },
  iconPulse: {
    delay: 0,
    duration: 500,
    repeat: Infinity,
  },
  textReveal: {
    delay: 350,
    duration: 300,
  },
}

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

/**
 * Container variants para stagger children
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  }),
}

/**
 * Item variants - entrada de baixo para cima
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
}

/**
 * Item variants - entrada da esquerda
 */
export const itemFromLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
}

/**
 * Item variants - entrada da direita
 */
export const itemFromRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
}

/**
 * Scale + Fade variants
 */
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: applePhysics.default,
  },
}

/**
 * Tab transition variants
 */
export const tabVariants = {
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.20, ease: 'easeOut' },
  },
}

/**
 * Checkbox stagger variants
 */
export const checkboxVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + i * 0.04,
      duration: 0.25,
      ease: 'easeOut',
    },
  }),
}

/**
 * Card lift on hover
 */
export const cardLiftVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -12,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

/**
 * Glow on hover
 */
export const glowVariants: Variants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 0.15,
    transition: { duration: 0.3 },
  },
}

/**
 * Icon rotate + scale on hover
 */
export const iconHoverVariants: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 12,
    scale: 1.15,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
}

/**
 * Badge slide in on hover
 */
export const badgeSlideVariants: Variants = {
  rest: { opacity: 0, y: 4 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.2 },
  },
}

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

/**
 * Configuração para IntersectionObserver
 */
export const scrollTriggerConfig = {
  threshold: 0.1,
  triggerOnce: true,
}

/**
 * Scroll reveal - entrada de baixo
 */
export const scrollRevealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

/**
 * Scroll reveal com stagger
 */
export const scrollRevealStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Cria delay progressivo para stagger manual
 */
export function getStaggerDelay(index: number, baseDelay: number = 0, stagger: number = 0.08): number {
  return baseDelay + index * stagger
}

/**
 * Cria transition com delay
 */
export function createTransitionWithDelay(delay: number, duration: number = 0.3): Transition {
  return {
    delay,
    duration,
    ease: [0.25, 1, 0.5, 1],
  }
}

/**
 * Spring transition com delay
 */
export function createSpringWithDelay(delay: number, preset: keyof typeof applePhysics = 'default'): Transition {
  return {
    ...applePhysics[preset],
    delay,
  }
}

// ============================================================================
// MEDICAL-SPECIFIC CHOREOGRAPHIES
// ============================================================================

/**
 * Red Flag Alert - Urgência máxima
 */
export const redFlagChoreography = {
  background: {
    delay: 0,
    duration: 150,
  },
  icon: {
    delay: 0,
    duration: 200,
    type: 'spring' as const,
    stiffness: 600,
    damping: 20,
  },
  pulse: {
    duration: 1500,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
  text: {
    delay: 200,
    duration: 300,
  },
}

/**
 * CFM Progress Indicator - Update suave
 */
export const cfmProgressChoreography = {
  ring: {
    duration: 800,
    ease: [0.4, 0, 0.2, 1],
  },
  number: {
    duration: 400,
  },
  checkmark: {
    delay: 400,
    duration: 300,
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },
}

/**
 * Patient Card Expand - Revelação de informações
 */
export const patientCardExpandChoreography = {
  container: {
    duration: 0.3,
    ease: [0.25, 1, 0.5, 1],
  },
  content: {
    delay: 0.1,
    duration: 0.25,
    stagger: 0.05,
  },
}

// ============================================================================
// EXPORTS
// ============================================================================

export const choreographies = {
  dashboard: dashboardChoreography,
  anamnese: anamneseChoreography,
  history: historyChoreography,
  kanban: kanbanChoreography,
}

export const interactions = {
  cardHover: cardHoverChoreography,
  formTab: formTabTransition,
  emergencyAlert: emergencyAlertChoreography,
  redFlag: redFlagChoreography,
  cfmProgress: cfmProgressChoreography,
  patientCardExpand: patientCardExpandChoreography,
}
