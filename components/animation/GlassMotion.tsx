'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';

interface GlassMotionProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'clear' | 'elevated' | 'medical';
  animate?: boolean;
  hover?: boolean;
  tap?: boolean;
}

export function GlassMotion({ children, variant = 'default', animate = true, hover = true, tap = true }: GlassMotionProps) {
  const glassClasses = useGlassClasses(variant);

  return (
    <motion.div
      className={glassClasses}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={tap ? { scale: 0.95 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}
