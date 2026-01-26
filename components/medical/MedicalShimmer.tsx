'use client';

import { motion } from 'framer-motion';

interface MedicalShimmerProps {
  children: React.ReactNode;
}

export function MedicalShimmer({ children }: MedicalShimmerProps) {
  return (
    <motion.div
      initial={{ backgroundPosition: '200% 0' }}
      animate={{ backgroundPosition: '-200% 0' }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
        backgroundSize: '200% 100%',
      }}
    >
      {children}
    </motion.div>
  );
}
