'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';
import { TapScale, SlideUp } from '@/components/animation/MicroInteractions';
import type { KanbanTask } from '@/types/kanban';
import { PRIORITY_COLORS } from '@/types/kanban';

interface KanbanCardProps {
  task: KanbanTask;
  onDelete: (id: string) => void;
  onMove: (taskId: string, newStatus: KanbanTask['status']) => void;
}

export function KanbanCard({ task, onDelete, onMove }: KanbanCardProps) {
  const glassClasses = useGlassClasses('default');

  return (
    <SlideUp>
      <TapScale>
        <motion.div
          className={`${glassClasses.blur} ${glassClasses.opacity} ${glassClasses.shadow} ${glassClasses.visualEffects} ${glassClasses.animation} ${glassClasses.radius} ${glassClasses.gpu} ${glassClasses.containment}`}
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
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => onDelete(task.id)} className="text-xs text-red-400">Excluir</button>
              </div>
            </div>
            <p className={`text-xs ${PRIORITY_COLORS[task.priority]}`}>
              Prioridade: {task.priority}
            </p>
            {task.description && <p className="text-sm mt-2">{task.description}</p>}
          </div>
        </motion.div>
      </TapScale>
    </SlideUp>
  );
}
