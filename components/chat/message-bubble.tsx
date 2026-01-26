'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';
import { FadeIn } from '@/components/animation/MicroInteractions';

interface MessageBubbleProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

export function MessageBubble({ message, sender, timestamp }: MessageBubbleProps) {
  const glassClasses = useGlassClasses(sender === 'user' ? 'elevated' : 'default');

  return (
    <FadeIn>
      <motion.div
        className={`${glassClasses} p-4`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
      >
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className="max-w-[70%]">
            <p className="text-sm">{message}</p>
            <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}
