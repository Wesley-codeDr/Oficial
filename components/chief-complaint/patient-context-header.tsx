'use client'

/**
 * Patient Context Header
 *
 * Apple 2025 Liquid Glass style header for patient context selection.
 * Displays avatar, category selector, gender, age, phone, allergies and status.
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Baby,
  User,
  UserCog,
  Phone,
  Plus,
  X,
  Minus,
  AlertTriangle,
  Activity,
  Bell,
} from 'lucide-react'
import type { AgeTag, PatientContext } from '@/types/chief-complaint'
import { appleSpring } from '@/lib/animations/presets'

interface PatientContextHeaderProps {
  context: PatientContext | null
  onContextChange: (context: PatientContext) => void
  className?: string
}

type Gender = 'M' | 'F'

interface ExtendedPatientContext extends PatientContext {
  gender?: Gender
  age?: string
  phoneNumber?: string
  allergies?: string[]
  status?: 'in_progress' | 'waiting' | 'finished'
}

const CATEGORY_OPTIONS: { value: AgeTag; label: string; icon: React.ReactNode }[] = [
  { value: 'pediatric', label: 'Pediatria', icon: <Baby className="size-4" /> },
  { value: 'adult', label: 'Adulto', icon: <User className="size-4" /> },
  { value: 'elderly', label: 'Idoso', icon: <UserCog className="size-4" /> },
]

const STORAGE_KEY = 'chiefComplaintContext'

export function PatientContextHeader({
  context,
  onContextChange,
  className,
}: PatientContextHeaderProps) {
  const [localContext, setLocalContext] = useState<ExtendedPatientContext>({
    ageGroup: context?.ageGroup ?? 'adult',
    specialConditions: context?.specialConditions ?? [],
    gender: undefined,
    age: '',
    phoneNumber: '',
    allergies: [],
    status: 'in_progress',
  })
  const [newAllergy, setNewAllergy] = useState('')
  const [isAddingAllergy, setIsAddingAllergy] = useState(false)
  const hasInitializedRef = useRef(false)

  // Load from sessionStorage on mount
  useEffect(() => {
    if (!context && !hasInitializedRef.current) {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as ExtendedPatientContext
          setLocalContext(prev => ({ ...prev, ...parsed }))
          hasInitializedRef.current = true
          // Use queueMicrotask to defer state update until after render
          queueMicrotask(() => {
            onContextChange({
              ageGroup: parsed.ageGroup,
              specialConditions: parsed.specialConditions,
            })
          })
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [context, onContextChange])

  // Sync local state with prop
  useEffect(() => {
    if (context) {
      setLocalContext(prev => ({
        ...prev,
        ageGroup: context.ageGroup,
        specialConditions: context.specialConditions,
      }))
    }
  }, [context])

  const updateContext = <K extends keyof ExtendedPatientContext>(
    field: K,
    value: ExtendedPatientContext[K]
  ) => {
    setLocalContext(prev => {
      const updated = { ...prev, [field]: value }
      // Save to session and notify parent
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      onContextChange({
        ageGroup: updated.ageGroup,
        specialConditions: updated.specialConditions,
      })
      return updated
    })
  }

  const handleAgeChange = (delta: number) => {
    const currentAge = parseInt(localContext.age || '0') || 0
    const newAge = Math.max(0, currentAge + delta)
    updateContext('age', newAge.toString())
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      updateContext('allergies', [...(localContext.allergies || []), newAllergy.trim()])
      setNewAllergy('')
    }
    setIsAddingAllergy(false)
  }

  const removeAllergy = (indexToRemove: number) => {
    updateContext(
      'allergies',
      (localContext.allergies || []).filter((_, index) => index !== indexToRemove)
    )
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'in_progress':
        return {
          label: 'Em Atendimento',
          color: 'bg-emerald-500',
          text: 'text-emerald-700 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-900/30',
          border: 'border-emerald-100 dark:border-emerald-900/40',
        }
      case 'waiting':
        return {
          label: 'Aguardando',
          color: 'bg-amber-500',
          text: 'text-amber-700 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-900/30',
          border: 'border-amber-100 dark:border-amber-900/40',
        }
      default:
        return {
          label: 'Finalizado',
          color: 'bg-slate-500',
          text: 'text-slate-700 dark:text-slate-400',
          bg: 'bg-slate-50 dark:bg-slate-800',
          border: 'border-slate-200 dark:border-slate-700',
        }
    }
  }

  const statusStyle = getStatusConfig(localContext.status || 'in_progress')

  return (
    <motion.div
      className={cn(
        'flex flex-col xl:flex-row xl:items-stretch justify-between gap-6',
        'bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl',
        'p-5 rounded-[32px]',
        'border border-white/40 dark:border-white/10',
        'shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:shadow-none',
        'transition-all duration-300',
        'hover:shadow-[0_22px_50px_rgba(15,23,42,0.09)] dark:hover:bg-slate-900/70',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={appleSpring}
    >
      {/* Left: Avatar + Controls */}
      <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar Container */}
        <div className="relative shrink-0 group">
          <motion.div
            className={cn(
              'w-20 h-20 rounded-[24px] flex items-center justify-center text-3xl',
              'shadow-lg shadow-slate-200/50 dark:shadow-black/40',
              'ring-1 ring-black/5 dark:ring-white/10',
              'transition-transform duration-500 group-hover:scale-105',
              // Pediatric & Neonate - blue tones
              (localContext.ageGroup === 'pediatric' || localContext.ageGroup === 'neonate') &&
                'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-500',
              // Elderly - slate tones
              localContext.ageGroup === 'elderly' &&
                'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-500',
              // Adult - emerald tones (default)
              localContext.ageGroup === 'adult' &&
                'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600',
              // Obstetric - rose tones
              localContext.ageGroup === 'obstetric' &&
                'bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/40 dark:to-rose-800/20 text-rose-500'
            )}
          >
            {localContext.ageGroup === 'pediatric' ? (
              <Baby className="w-9 h-9" />
            ) : localContext.ageGroup === 'elderly' ? (
              <UserCog className="w-9 h-9" />
            ) : (
              <User className="w-9 h-9" />
            )}
          </motion.div>
          {/* Status Dot */}
          <div
            className={cn(
              'absolute -bottom-1 -right-1 w-5 h-5',
              'border-[3px] border-white dark:border-slate-900 rounded-full shadow-sm',
              statusStyle.color
            )}
          />
        </div>

        {/* Info & Controls */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Row 1: Category, Gender, Age, Phone */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {/* Category Pill */}
            <div className="flex bg-slate-100/80 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-white/5">
              {CATEGORY_OPTIONS.map(cat => {
                const isActive = localContext.ageGroup === cat.value
                return (
                  <button
                    key={cat.value}
                    onClick={() => updateContext('ageGroup', cat.value)}
                    className={cn(
                      'px-4 py-1.5 text-[11px] font-semibold rounded-full transition-all',
                      isActive
                        ? 'bg-white dark:bg-slate-600/80 text-slate-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-none'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    )}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700/50" />

            {/* Gender */}
            <div className="flex bg-slate-100/80 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-white/5">
              {(['M', 'F'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => updateContext('gender', g)}
                  className={cn(
                    'w-8 h-7 flex items-center justify-center text-[11px] font-bold rounded-full transition-all',
                    localContext.gender === g
                      ? g === 'M'
                        ? 'bg-white dark:bg-slate-600/80 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'bg-white dark:bg-slate-600/80 text-pink-500 dark:text-pink-400 shadow-sm'
                      : 'text-slate-400'
                  )}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Age Stepper & Phone */}
            <div className="flex items-center gap-4 ml-1">
              {/* iOS Style Age Stepper */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">
                  Idade
                </span>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-0.5 shadow-sm">
                  <button
                    onClick={() => handleAgeChange(-1)}
                    aria-label="Diminuir idade"
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all active:scale-90"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </button>

                  <input
                    type="number"
                    value={localContext.age || ''}
                    onChange={e => updateContext('age', e.target.value)}
                    className="w-10 bg-transparent text-center font-bold text-slate-800 dark:text-white text-sm focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
                    placeholder="0"
                  />

                  <button
                    onClick={() => handleAgeChange(1)}
                    aria-label="Aumentar idade"
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </button>
                </div>
              </div>

              {/* Phone Input */}
              <div className="flex items-center gap-2 group h-[34px] border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all px-1 mt-3">
                <Phone className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="tel"
                  value={localContext.phoneNumber || ''}
                  onChange={e => updateContext('phoneNumber', e.target.value)}
                  placeholder="Telefone..."
                  className="w-28 bg-transparent text-sm font-medium text-slate-600 dark:text-slate-300 focus:outline-none transition-all p-0 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Allergies */}
          <div className="flex flex-wrap items-center gap-2 min-h-[32px]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                Alergias
              </span>
            </div>

            {(localContext.allergies?.length || 0) === 0 && !isAddingAllergy && (
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-1">
                Nenhuma registrada
              </span>
            )}

            <AnimatePresence mode="popLayout">
              {(localContext.allergies || []).map((allergy, index) => (
                <motion.span
                  key={`allergy-${index}-${allergy}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md hover:border-red-200 dark:hover:border-red-900/50 transition-all cursor-default"
                >
                  {allergy}
                  <button
                    onClick={() => removeAllergy(index)}
                    aria-label={`Remover alergia ${allergy}`}
                    className="w-4 h-4 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-red-100 dark:group-hover:bg-red-900 group-hover:text-red-500 transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isAddingAllergy ? (
                <motion.input
                  key="input"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  autoFocus
                  type="text"
                  value={newAllergy}
                  onChange={e => setNewAllergy(e.target.value)}
                  onBlur={addAllergy}
                  onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
                  className="w-32 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 text-xs font-medium focus:outline-none shadow-sm text-slate-800 dark:text-white"
                  placeholder="Nome..."
                />
              ) : (
                <motion.button
                  key="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsAddingAllergy(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-500 transition-colors border border-slate-200 dark:border-slate-700 border-dashed"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Side: Status & Notification */}
      <div className="flex xl:flex-col items-center xl:items-end justify-center gap-4 shrink-0">
        {/* Status Pill */}
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border',
            statusStyle.bg,
            statusStyle.border
          )}
        >
          <Activity className={cn('w-4 h-4', statusStyle.text)} />
          <span className={cn('text-xs font-bold uppercase tracking-wide', statusStyle.text)}>
            {statusStyle.label}
          </span>
        </div>

        {/* Notification Button */}
        <button
          aria-label="Notificações"
          className="relative w-10 h-10 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all border border-white/50 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-105 active:scale-95"
        >
          <Bell className="w-5 h-5 stroke-[1.5]" />
          <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
        </button>
      </div>
    </motion.div>
  )
}
