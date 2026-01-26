'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';
import { HoverScale } from '@/components/animation/MicroInteractions';

interface WelcomePanelProps {
  title: string;
  children: React.ReactNode;
}

export function WelcomePanel({ title, children }: WelcomePanelProps) {
  const glassClasses = useGlassClasses('default');

  return (
    <HoverScale>
      <motion.div
        className={glassClasses}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </motion.div>
    </HoverScale>
  );
}
