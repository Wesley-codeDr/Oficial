'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';
import { TapScale, SlideUp } from '@/components/animation/MicroInteractions';

interface KanbanCardProps {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  onEdit: () => void;
  onDelete: () => void;
}

export function KanbanCard({ title, description, priority, onEdit, onDelete }: KanbanCardProps) {
  const glassClasses = useGlassClasses('default');

  const priorityColors = {
    low: 'text-blue-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  return (
    <SlideUp>
      <TapScale>
        <motion.div
          className={glassClasses}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
          }}
        >
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex gap-2">
                <button onClick={onEdit} className="text-xs">Editar</button>
                <button onClick={onDelete} className="text-xs text-red-400">Excluir</button>
              </div>
            </div>
            <p className={`text-xs ${priorityColors[priority]}`}>
              Prioridade: {priority}
            </p>
            <p className="text-sm mt-2">{description}</p>
          </div>
        </motion.div>
      </TapScale>
    </SlideUp>
  );
}
