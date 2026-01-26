'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Hover scale com física de mola
export function HoverScale({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Tap scale com física de mola
export function TapScale({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Float animation suave
export function Float({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Shimmer effect
export function Shimmer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ backgroundPosition: '200% 0' }}
      animate={{ backgroundPosition: '-200% 0' }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        backgroundSize: '200% 100%',
      }}
    >
      {children}
    </motion.div>
  );
}

// Ripple effect
export function Ripple({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Slide animations
export function SlideUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function SlideDown({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// Scale animations
export function ScaleIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleOut({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Fade animations
export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function FadeOut({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// AnimatePresence para entrada/saída
export function AnimatedPresence({ children, show }: { children: React.ReactNode, show: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
