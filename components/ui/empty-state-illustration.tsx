'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { applePhysics } from '@/lib/design-system/animation-tokens'

export type EmptyStateVariant =
  | 'team-collaboration'
  | 'personal-productivity'
  | 'project-planning'
  | 'medical-records'
  | 'chat-conversation'
  | 'kanban-board'

interface EmptyStateIllustrationProps {
  variant: EmptyStateVariant
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { container: 'w-24 h-24', elements: 0.6 },
  md: { container: 'w-32 h-32', elements: 0.8 },
  lg: { container: 'w-40 h-40', elements: 1 },
}

// Floating animation for subtle continuous movement
const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

// Pulse animation for glow effects
const pulseAnimation = {
  opacity: [0.4, 0.8, 0.4],
  scale: [1, 1.1, 1],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

// Stagger animation for multiple elements
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: applePhysics.glass,
  },
}

// Team Collaboration Illustration - People working together
function TeamCollaborationIllustration({ scale }: { scale: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Background glow */}
      <motion.circle
        cx="60"
        cy="60"
        r="45"
        className="fill-blue-500/10"
        animate={pulseAnimation}
      />

      {/* Central board/table */}
      <motion.rect
        x="35"
        y="50"
        width="50"
        height="30"
        rx="6"
        className="fill-slate-200 dark:fill-slate-700"
        variants={staggerItem}
      />

      {/* Sticky notes on board */}
      <motion.g variants={staggerItem}>
        <motion.rect
          x="40"
          y="55"
          width="12"
          height="10"
          rx="2"
          className="fill-amber-400"
          animate={{ y: [55, 53, 55] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.rect
          x="54"
          y="55"
          width="12"
          height="10"
          rx="2"
          className="fill-blue-400"
          animate={{ y: [55, 53, 55] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.rect
          x="68"
          y="55"
          width="12"
          height="10"
          rx="2"
          className="fill-emerald-400"
          animate={{ y: [55, 53, 55] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
      </motion.g>

      {/* Person 1 (left) */}
      <motion.g variants={staggerItem} animate={floatingAnimation}>
        <circle cx="30" cy="40" r="10" className="fill-purple-400" />
        <circle cx="30" cy="35" r="6" className="fill-purple-200" />
      </motion.g>

      {/* Person 2 (right) */}
      <motion.g
        variants={staggerItem}
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}
      >
        <circle cx="90" cy="40" r="10" className="fill-teal-400" />
        <circle cx="90" cy="35" r="6" className="fill-teal-200" />
      </motion.g>

      {/* Person 3 (bottom) */}
      <motion.g
        variants={staggerItem}
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
      >
        <circle cx="60" cy="95" r="10" className="fill-rose-400" />
        <circle cx="60" cy="90" r="6" className="fill-rose-200" />
      </motion.g>

      {/* Connection lines */}
      <motion.path
        d="M 40 45 Q 60 30 80 45"
        className="stroke-blue-400/40"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -8] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </motion.svg>
  )
}

// Personal Productivity Illustration - Checklist and tasks
function PersonalProductivityIllustration({ scale }: { scale: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Background glow */}
      <motion.circle
        cx="60"
        cy="60"
        r="45"
        className="fill-emerald-500/10"
        animate={pulseAnimation}
      />

      {/* Checklist paper */}
      <motion.rect
        x="30"
        y="20"
        width="60"
        height="80"
        rx="8"
        className="fill-white dark:fill-slate-800"
        variants={staggerItem}
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
      />

      {/* Checklist items */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={i} variants={staggerItem}>
          {/* Checkbox */}
          <motion.rect
            x="38"
            y={32 + i * 18}
            width="12"
            height="12"
            rx="3"
            className={cn(
              i < 2 ? 'fill-emerald-500' : 'fill-slate-200 dark:fill-slate-600'
            )}
          />
          {/* Checkmark for completed */}
          {i < 2 && (
            <motion.path
              d={`M 41 ${38 + i * 18} L 44 ${41 + i * 18} L 48 ${35 + i * 18}`}
              className="stroke-white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
            />
          )}
          {/* Line */}
          <motion.rect
            x="55"
            y={35 + i * 18}
            width={i === 2 ? 25 : 30}
            height="6"
            rx="3"
            className={cn(
              i < 2 ? 'fill-slate-300 dark:fill-slate-500' : 'fill-slate-200 dark:fill-slate-600'
            )}
          />
        </motion.g>
      ))}

      {/* Floating sparkle */}
      <motion.g
        animate={{
          y: [-5, 5, -5],
          x: [-2, 2, -2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.path
          d="M 80 30 L 82 25 L 84 30 L 89 32 L 84 34 L 82 39 L 80 34 L 75 32 Z"
          className="fill-amber-400"
        />
      </motion.g>
    </motion.svg>
  )
}

// Project Planning Illustration - Timeline and milestones
function ProjectPlanningIllustration({ scale }: { scale: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Background glow */}
      <motion.circle
        cx="60"
        cy="60"
        r="45"
        className="fill-purple-500/10"
        animate={pulseAnimation}
      />

      {/* Timeline line */}
      <motion.line
        x1="20"
        y1="60"
        x2="100"
        y2="60"
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="3"
        strokeLinecap="round"
        variants={staggerItem}
      />

      {/* Progress indicator */}
      <motion.line
        x1="20"
        y1="60"
        x2="60"
        y2="60"
        className="stroke-purple-500"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Milestone nodes */}
      {[20, 45, 70, 95].map((x, i) => (
        <motion.g key={i} variants={staggerItem}>
          <motion.circle
            cx={x}
            cy="60"
            r={i === 1 ? 10 : 8}
            className={cn(
              i <= 1 ? 'fill-purple-500' : 'fill-slate-200 dark:fill-slate-600',
              i === 1 && 'stroke-purple-300 stroke-[3px]'
            )}
            animate={i === 1 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Cards floating above/below */}
          <motion.rect
            x={x - 12}
            y={i % 2 === 0 ? 25 : 75}
            width="24"
            height="16"
            rx="4"
            className={cn(
              'fill-white dark:fill-slate-700',
              i <= 1 ? 'stroke-purple-300' : 'stroke-slate-200 dark:stroke-slate-600'
            )}
            strokeWidth="1.5"
            animate={{
              y: i % 2 === 0 ? [25, 22, 25] : [75, 78, 75],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        </motion.g>
      ))}

      {/* Flag on current milestone */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ transformOrigin: '45px 50px' }}
      >
        <motion.rect x="44" y="35" width="2" height="20" className="fill-slate-400" rx="1" />
        <motion.polygon points="46,35 60,40 46,45" className="fill-purple-400" />
      </motion.g>
    </motion.svg>
  )
}

// Medical Records Illustration - Documents and healthcare
function MedicalRecordsIllustration({ scale }: { scale: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Background glow */}
      <motion.circle
        cx="60"
        cy="60"
        r="45"
        className="fill-teal-500/10"
        animate={pulseAnimation}
      />

      {/* Clipboard */}
      <motion.rect
        x="30"
        y="25"
        width="50"
        height="70"
        rx="6"
        className="fill-slate-100 dark:fill-slate-700"
        variants={staggerItem}
      />

      {/* Clipboard top */}
      <motion.rect
        x="42"
        y="20"
        width="26"
        height="10"
        rx="3"
        className="fill-teal-500"
        variants={staggerItem}
      />

      {/* Document lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x="38"
          y={40 + i * 14}
          width={i === 0 ? 34 : i === 3 ? 20 : 28}
          height="6"
          rx="3"
          className="fill-slate-300 dark:fill-slate-500"
          variants={staggerItem}
        />
      ))}

      {/* Stethoscope */}
      <motion.g
        variants={staggerItem}
        animate={{
          rotate: [-5, 5, -5],
          y: [0, -3, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '85px 50px' }}
      >
        <motion.path
          d="M 85 40 C 85 50 75 55 75 65 M 95 40 C 95 50 105 55 105 65"
          className="stroke-teal-400"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <motion.circle cx="75" cy="70" r="8" className="fill-teal-400" />
        <motion.circle cx="105" cy="70" r="6" className="fill-teal-300" />
        <motion.rect x="82" y="35" width="16" height="8" rx="4" className="fill-teal-500" />
      </motion.g>

      {/* Health cross */}
      <motion.g
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.rect x="53" y="32" width="4" height="12" rx="1" className="fill-rose-400" />
        <motion.rect x="49" y="36" width="12" height="4" rx="1" className="fill-rose-400" />
      </motion.g>
    </motion.svg>
  )
}

// Chat Conversation Illustration - Message bubbles
function ChatConversationIllustration({ scale }: { scale: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Background glow */}
      <motion.circle
        cx="60"
        cy="60"
        r="45"
        className="fill-blue-500/10"
        animate={pulseAnimation}
      />

      {/* Message bubble 1 (left) */}
      <motion.g variants={staggerItem}>
        <motion.path
          d="M 20 35 L 20 55 Q 20 60 25 60 L 55 60 L 65 70 L 62 60 Q 65 55 65 55 L 65 35 Q 65 30 60 30 L 25 30 Q 20 30 20 35 Z"
          className="fill-blue-500"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Dots inside bubble */}
        <motion.circle cx="32" cy="45" r="3" className="fill-white/80" />
        <motion.circle cx="42" cy="45" r="3" className="fill-white/80" />
        <motion.circle cx="52" cy="45" r="3" className="fill-white/80" />
      </motion.g>

      {/* Message bubble 2 (right) */}
      <motion.g variants={staggerItem}>
        <motion.path
          d="M 100 55 L 100 75 Q 100 80 95 80 L 65 80 L 55 90 L 58 80 Q 55 75 55 75 L 55 55 Q 55 50 60 50 L 95 50 Q 100 50 100 55 Z"
          className="fill-emerald-500"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        {/* Line inside bubble */}
        <motion.rect x="62" y="60" width="30" height="4" rx="2" className="fill-white/80" />
        <motion.rect x="62" y="68" width="20" height="4" rx="2" className="fill-white/60" />
      </motion.g>

      {/* Typing indicator */}
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.circle cx="72" cy="100" r="2" className="fill-slate-400" />
        <motion.circle cx="80" cy="100" r="2" className="fill-slate-400" />
        <motion.circle cx="88" cy="100" r="2" className="fill-slate-400" />
      </motion.g>
    </motion.svg>
  )
}

// Kanban Board Illustration - Cards and columns
function KanbanBoardIllustration({ scale }: { scale: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Background glow */}
      <motion.circle
        cx="60"
        cy="60"
        r="45"
        className="fill-indigo-500/10"
        animate={pulseAnimation}
      />

      {/* Columns */}
      {[0, 1, 2].map((col) => (
        <motion.g key={col} variants={staggerItem}>
          {/* Column background */}
          <motion.rect
            x={15 + col * 35}
            y="20"
            width="30"
            height="80"
            rx="6"
            className="fill-slate-100 dark:fill-slate-800"
          />

          {/* Column header */}
          <motion.rect
            x={15 + col * 35}
            y="20"
            width="30"
            height="12"
            rx="6"
            className={cn(
              col === 0 && 'fill-blue-500',
              col === 1 && 'fill-amber-500',
              col === 2 && 'fill-emerald-500'
            )}
          />
        </motion.g>
      ))}

      {/* Cards */}
      {/* Column 1 cards */}
      <motion.rect
        x="19"
        y="38"
        width="22"
        height="16"
        rx="4"
        className="fill-white dark:fill-slate-700"
        variants={staggerItem}
        animate={{ y: [38, 36, 38] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.rect
        x="19"
        y="58"
        width="22"
        height="12"
        rx="4"
        className="fill-white dark:fill-slate-700"
        variants={staggerItem}
        animate={{ y: [58, 60, 58] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Column 2 cards */}
      <motion.rect
        x="54"
        y="38"
        width="22"
        height="20"
        rx="4"
        className="fill-white dark:fill-slate-700"
        variants={staggerItem}
        animate={{ y: [38, 35, 38] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Column 3 cards */}
      <motion.rect
        x="89"
        y="38"
        width="22"
        height="14"
        rx="4"
        className="fill-white dark:fill-slate-700"
        variants={staggerItem}
        animate={{ y: [38, 40, 38] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
      />
      <motion.rect
        x="89"
        y="56"
        width="22"
        height="18"
        rx="4"
        className="fill-white dark:fill-slate-700"
        variants={staggerItem}
        animate={{ y: [56, 54, 56] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Moving card animation */}
      <motion.rect
        x="54"
        y="65"
        width="22"
        height="14"
        rx="4"
        className="fill-indigo-200 dark:fill-indigo-900/50 stroke-indigo-400 stroke-[1.5px]"
        initial={{ x: 54, opacity: 0.5 }}
        animate={{
          x: [54, 54, 89, 89],
          y: [65, 65, 78, 78],
          opacity: [0.5, 1, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          times: [0, 0.3, 0.6, 1],
        }}
      />
    </motion.svg>
  )
}

const illustrationComponents: Record<EmptyStateVariant, React.FC<{ scale: number }>> = {
  'team-collaboration': TeamCollaborationIllustration,
  'personal-productivity': PersonalProductivityIllustration,
  'project-planning': ProjectPlanningIllustration,
  'medical-records': MedicalRecordsIllustration,
  'chat-conversation': ChatConversationIllustration,
  'kanban-board': KanbanBoardIllustration,
}

export function EmptyStateIllustration({
  variant,
  className,
  size = 'md',
}: EmptyStateIllustrationProps) {
  const IllustrationComponent = illustrationComponents[variant]
  const { container, elements } = sizeMap[size]

  return (
    <motion.div
      className={cn(container, 'relative', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={applePhysics.glass}
    >
      <IllustrationComponent scale={elements} />
    </motion.div>
  )
}

export default EmptyStateIllustration
