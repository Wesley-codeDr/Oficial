'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';

interface GlassPanelProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'clear' | 'elevated' | 'medical';
  className?: string;
}

export function GlassPanel({ children, variant = 'default', className = '' }: GlassPanelProps) {
  const glassClasses = useGlassClasses(variant);

  return (
    <motion.div
      className={`${glassClasses} ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
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
