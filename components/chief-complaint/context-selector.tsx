'use client'

/**
 * Patient Context Selector
 *
 * Allows selection of patient age group and special conditions
 * before navigating to chief complaint selection.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Baby,
  User,
  UserCog,
  HeartPulse,
  Stethoscope,
  Syringe,
  Pill,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import type { AgeTag, ContextTag, PatientContext } from '@/types/chief-complaint'

interface ContextSelectorProps {
  onSelect: (context: PatientContext) => void
  initialContext?: PatientContext
}

const AGE_OPTIONS: { value: AgeTag; label: string; icon: React.ReactNode; description: string }[] =
  [
    {
      value: 'neonate',
      label: 'Neonato',
      icon: <Baby className="size-5" />,
      description: '0-28 dias',
    },
    {
      value: 'pediatric',
      label: 'Pediatrico',
      icon: <Baby className="size-5" />,
      description: '29 dias - 17 anos',
    },
    { value: 'adult', label: 'Adulto', icon: <User className="size-5" />, description: '18-64 anos' },
    {
      value: 'elderly',
      label: 'Idoso',
      icon: <UserCog className="size-5" />,
      description: '65+ anos',
    },
    {
      value: 'obstetric',
      label: 'Obstetrico',
      icon: <HeartPulse className="size-5" />,
      description: 'Gestante',
    },
  ]

const CONTEXT_OPTIONS: {
  value: ContextTag
  label: string
  icon: React.ReactNode
  color: string
}[] = [
  {
    value: 'post_surgical',
    label: 'Pos-Cirurgico',
    icon: <Stethoscope className="size-4" />,
    color: 'bg-blue-500/10 text-blue-600 border-blue-200',
  },
  {
    value: 'oncological',
    label: 'Oncologico',
    icon: <AlertTriangle className="size-4" />,
    color: 'bg-purple-500/10 text-purple-600 border-purple-200',
  },
  {
    value: 'immunocompromised',
    label: 'Imunocomprometido',
    icon: <Syringe className="size-4" />,
    color: 'bg-red-500/10 text-red-600 border-red-200',
  },
  {
    value: 'pregnancy',
    label: 'Gestante',
    icon: <HeartPulse className="size-4" />,
    color: 'bg-pink-500/10 text-pink-600 border-pink-200',
  },
  {
    value: 'dialysis',
    label: 'Dialitico',
    icon: <Pill className="size-4" />,
    color: 'bg-orange-500/10 text-orange-600 border-orange-200',
  },
  {
    value: 'transplant',
    label: 'Transplantado',
    icon: <HeartPulse className="size-4" />,
    color: 'bg-green-500/10 text-green-600 border-green-200',
  },
]

export function ContextSelector({ onSelect, initialContext }: ContextSelectorProps) {
  const [ageGroup, setAgeGroup] = useState<AgeTag | null>(initialContext?.ageGroup ?? null)
  const [specialConditions, setSpecialConditions] = useState<ContextTag[]>(
    initialContext?.specialConditions ?? []
  )

  const toggleCondition = (condition: ContextTag) => {
    setSpecialConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
    )
  }

  const handleContinue = () => {
    if (ageGroup) {
      onSelect({ ageGroup, specialConditions })
    }
  }

  return (
    <div className="space-y-6">
      {/* Age Group Selection */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Faixa Etaria <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {AGE_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => setAgeGroup(option.value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                ageGroup === option.value
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-accent/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-full',
                  ageGroup === option.value ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}
              >
                {option.icon}
              </div>
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Special Conditions */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Condicoes Especiais <span className="text-xs">(opcional)</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {CONTEXT_OPTIONS.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => toggleCondition(option.value)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all',
                specialConditions.includes(option.value)
                  ? `${option.color} border-current`
                  : 'border-border hover:border-primary/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.icon}
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button onClick={handleContinue} disabled={!ageGroup} size="lg" className="gap-2">
          Continuar
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
