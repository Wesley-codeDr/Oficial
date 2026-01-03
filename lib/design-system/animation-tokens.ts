/**
 * Apple Liquid Glass 2025 - Animation Physics Tokens
 * 
 * Baseado na física de animação nativa do iOS/visionOS.
 * Use estes tokens com Framer Motion (propriedade 'transition').
 */

export const applePhysics = {
  // Padrão para interações de UI refinadas (botões, switches, popovers)
  default: {
    type: "spring",
    stiffness: 350,
    damping: 32,
    mass: 1
  },
  
  // Para elementos maiores entrando na tela ou modais (sensação mais macia)
  soft: {
    type: "spring",
    stiffness: 200,
    damping: 28,
    mass: 1
  },
  
  // Para gestos de arrasto e "rubber band" (mais rígido e responsivo)
  gesture: {
    type: "spring",
    stiffness: 450,
    damping: 42,
    mass: 1
  },
  
  // Para itens que descem ou sobem em pilhas (Z-axis motion)
  spatial: {
    type: "spring",
    stiffness: 280,
    damping: 30,
    mass: 1.2
  },

  // Para micro-interações rápidas (haptic-like)
  haptic: {
    type: "spring",
    stiffness: 600,
    damping: 40,
    mass: 0.7
  },

  // Transições de Opacidade e Blur
  blur: {
    initial: { filter: 'blur(20px)', opacity: 0 },
    animate: { filter: 'blur(0px)', opacity: 1 },
    exit: { filter: 'blur(12px)', opacity: 0 },
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
  }
} as const;

/**
 * Apple 2025 Timing Tokens (em segundos para Framer Motion)
 */
export const appleTiming = {
  micro: 0.15,
  default: 0.3,
  layout: 0.45,
  modal: 0.6,
  page: 0.8
} as const;

/**
 * Apple 2025 Easing Curves (Cubic Bezier)
 */
export const appleEasing = {
  // Padrão Apple (desaceleração viscosa)
  standard: [0.16, 1, 0.3, 1],
  // Entrada suave, saída rápida
  in: [0.4, 0, 1, 1],
  // Entrada rápida, saída suave
  out: [0, 0, 0.2, 1],
  // Aceleração e desaceleração simétrica
  inOut: [0.4, 0, 0.2, 1]
} as const;

/**
 * Padrões de profundidade espacial para elementos ao fundo (Stacks)
 */
export const spatialDepth = {
  inactive: {
    scale: 0.96,
    opacity: 0.7,
    filter: "blur(4px)", // Apple 2025 usa blurs mais densos para profundidade
    y: -12,
    rotateX: 2,
  },
  hidden: {
    scale: 0.9,
    opacity: 0,
    filter: "blur(12px)",
    y: -30,
    rotateX: 5,
  }
};
