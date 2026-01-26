'use client';

import { motion } from 'framer-motion';

interface EmergencyPulseProps {
  children: React.ReactNode;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export function EmergencyPulse({ children, severity = 'medium' }: EmergencyPulseProps) {
  const pulseConfig = {
    low: { duration: 2, repeat: Infinity },
    medium: { duration: 1.5, repeat: Infinity },
    high: { duration: 1, repeat: Infinity },
    critical: { duration: 0.5, repeat: Infinity },
  }[severity];

  const shadowColor = severity === 'critical' ? 'rgba(255, 59, 48, 0.3)' : 
                    severity === 'high' ? 'rgba(255, 59, 48, 0.25)' :
                    severity === 'medium' ? 'rgba(255, 149, 0, 0.2)' :
                    'rgba(255, 149, 0, 0.15)';

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 0 ${shadowColor}`,
          `0 0 20px ${shadowColor}`,
          `0 0 0 ${shadowColor}`,
        ],
      }}
      transition={{
        duration: pulseConfig.duration,
        repeat: pulseConfig.repeat,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
