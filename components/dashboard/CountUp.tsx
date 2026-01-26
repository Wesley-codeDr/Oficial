/**
 * CountUp Component
 *
 * Animated counter component for dashboard metrics
 */

'use client'

import { useState, useEffect } from 'react'

interface CountUpProps {
  value: string | number
  duration?: number
}

export const CountUp = ({ value, duration = 2 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isDecimal = typeof value === 'string' && value.includes('.');
  
  useEffect(() => {
    const start = 0;
    const end = target;
    if (start === end) return;
    
    const totalFrames = duration * 60;
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out expo
      const current = end * (1 - Math.pow(2, -10 * progress));
      setCount(current);
      
      if (frame === totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration]);

  if (isNaN(target)) return <>{value}</>;
  
  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);
  const suffix = typeof value === 'string' ? value.replace(/[0-9.]/g, '') : '';
  
  return <>{displayValue}{suffix}</>;
};
