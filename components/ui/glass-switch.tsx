'use client'

import { forwardRef, useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export interface GlassSwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

const sizeConfig = {
  sm: {
    track: { width: 42, height: 26 },
    knob: { diameter: 22, padding: 2 },
    translate: 16,
  },
  default: {
    track: { width: 51, height: 31 },
    knob: { diameter: 27, padding: 2 },
    translate: 20,
  },
  lg: {
    track: { width: 60, height: 36 },
    knob: { diameter: 32, padding: 2 },
    translate: 24,
  },
} as const

const APPLE_GREEN = '#34C759'
const TRACK_UNCHECKED = 'rgba(120, 120, 128, 0.32)'

const knobSpring = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

const GlassSwitch = forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, GlassSwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      size = 'default',
      className,
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const knobControls = useAnimationControls()
    const isFirstRender = useRef(true)

    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : internalChecked

    const config = sizeConfig[size]

    const handleCheckedChange = (newChecked: boolean) => {
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      onCheckedChange?.(newChecked)
    }

    useEffect(() => {
      const targetX = isChecked ? config.translate + config.knob.padding : config.knob.padding

      if (isFirstRender.current) {
        isFirstRender.current = false
        knobControls.set({ x: targetX })
        return
      }

      knobControls.start({
        x: targetX,
        scale: [1, 0.97, 1.02, 1],
        transition: {
          x: knobSpring,
          scale: {
            duration: 0.2,
            times: [0, 0.3, 0.7, 1],
            ease: [0.25, 1, 0.5, 1],
          },
        },
      })
    }, [isChecked, knobControls, config.translate, config.knob.padding])

    return (
      <SwitchPrimitive.Root
        ref={ref}
        checked={isChecked}
        defaultChecked={defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer items-center',
          'rounded-full',
          'transition-colors duration-200 ease-out',
          'focus:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-blue-500/50',
          'focus-visible:ring-offset-2',
          'focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        style={{
          width: config.track.width,
          height: config.track.height,
        }}
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            backgroundColor: isChecked ? APPLE_GREEN : TRACK_UNCHECKED,
          }}
          transition={{ duration: 0.2 }}
        />

        <SwitchPrimitive.Thumb asChild>
          <motion.span
            className={cn(
              'pointer-events-none block rounded-full',
              'bg-white',
              'shadow-[0_3px_8px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)]'
            )}
            style={{
              width: config.knob.diameter,
              height: config.knob.diameter,
            }}
            animate={knobControls}
          />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    )
  }
)

GlassSwitch.displayName = 'GlassSwitch'

export { GlassSwitch }
