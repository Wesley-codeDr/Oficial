'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';
import { TapScale } from '@/components/animation/MicroInteractions';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function SummaryCard({ title, value, icon, trend = 'neutral' }: SummaryCardProps) {
  const glassClasses = useGlassClasses('default');

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <TapScale>
      <motion.div
        className={glassClasses}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {icon}
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            {trend !== 'neutral' && (
              <span className={`text-xs font-bold ${trendColors[trend]}`}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </motion.div>
    </TapScale>
  );
}
