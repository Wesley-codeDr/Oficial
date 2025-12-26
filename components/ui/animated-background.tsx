'use client'

import { motion } from 'framer-motion'
import { blobAnimation, blobTransition } from '@/lib/animations'

interface BlobConfig {
  color: string
  position: string
  size: string
  blur: string
  duration: number
  animation: { x: number[]; y: number[] }
}

const defaultBlobs: BlobConfig[] = [
  {
    color: 'bg-teal-400/30 dark:bg-teal-500/20',
    position: 'left-[-12%] top-[-18%]',
    size: 'h-[40%] w-[40%]',
    blur: 'blur-[140px]',
    duration: 26,
    animation: { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
  },
  {
    color: 'bg-blue-400/25 dark:bg-blue-500/15',
    position: 'right-[-10%] top-[10%]',
    size: 'h-[38%] w-[38%]',
    blur: 'blur-[160px]',
    duration: 30,
    animation: { x: [0, -30, 20, 0], y: [0, 20, -10, 0] },
  },
  {
    color: 'bg-amber-300/25 dark:bg-amber-500/15',
    position: 'bottom-[-20%] left-[15%]',
    size: 'h-[45%] w-[45%]',
    blur: 'blur-[160px]',
    duration: 34,
    animation: { x: [0, -20, 20, 0], y: [0, 30, -20, 0] },
  },
]

interface AnimatedBackgroundProps {
  blobs?: BlobConfig[]
  showGrid?: boolean
  className?: string
}

export function AnimatedBackground({
  blobs = defaultBlobs,
  showGrid = true,
  className = '',
}: AnimatedBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`} suppressHydrationWarning>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f4f6fb_45%,_#eef2f8_100%)] dark:bg-[radial-gradient(circle_at_top,_#1a1a1a_0%,_#0a0a0a_100%)]" />

      {/* Animated blobs */}
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} ${blob.blur}`}
          animate={blob.animation}
          transition={blobTransition(blob.duration)}
        />
      ))}

      {/* Subtle grid pattern */}
      {showGrid && (
        <div className="absolute inset-0 opacity-40 dark:opacity-20 [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      )}
    </div>
  )
}

// Preset configurations for different pages
export const loginBlobs: BlobConfig[] = [
  {
    color: 'bg-teal-400/30 dark:bg-teal-500/20',
    position: 'left-[-12%] top-[-18%]',
    size: 'h-[40%] w-[40%]',
    blur: 'blur-[140px]',
    duration: 26,
    animation: { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
  },
  {
    color: 'bg-blue-400/25 dark:bg-blue-500/15',
    position: 'right-[-10%] top-[10%]',
    size: 'h-[38%] w-[38%]',
    blur: 'blur-[160px]',
    duration: 30,
    animation: { x: [0, -30, 20, 0], y: [0, 20, -10, 0] },
  },
  {
    color: 'bg-amber-300/25 dark:bg-amber-500/15',
    position: 'bottom-[-20%] left-[15%]',
    size: 'h-[45%] w-[45%]',
    blur: 'blur-[160px]',
    duration: 34,
    animation: { x: [0, -20, 20, 0], y: [0, 30, -20, 0] },
  },
]

export const homeBlobs: BlobConfig[] = [
  {
    color: 'bg-teal-400/25 dark:bg-teal-500/15',
    position: 'left-[-10%] top-[-15%]',
    size: 'h-[50%] w-[50%]',
    blur: 'blur-[180px]',
    duration: 28,
    animation: { x: [0, 50, -30, 0], y: [0, -40, 30, 0] },
  },
  {
    color: 'bg-blue-400/20 dark:bg-blue-500/12',
    position: 'right-[-15%] top-[20%]',
    size: 'h-[45%] w-[45%]',
    blur: 'blur-[200px]',
    duration: 32,
    animation: { x: [0, -40, 30, 0], y: [0, 30, -20, 0] },
  },
  {
    color: 'bg-violet-300/20 dark:bg-violet-500/12',
    position: 'bottom-[-25%] right-[20%]',
    size: 'h-[40%] w-[40%]',
    blur: 'blur-[160px]',
    duration: 36,
    animation: { x: [0, 30, -20, 0], y: [0, -30, 40, 0] },
  },
  {
    color: 'bg-amber-300/20 dark:bg-amber-500/12',
    position: 'bottom-[-10%] left-[10%]',
    size: 'h-[35%] w-[35%]',
    blur: 'blur-[140px]',
    duration: 30,
    animation: { x: [0, -25, 25, 0], y: [0, 35, -25, 0] },
  },
]
