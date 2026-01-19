'use client'

import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  ArrowRightLeft,
  Settings2,
  Kanban,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  CheckCircle2,
} from 'lucide-react'

const ONBOARDING_STORAGE_KEY = 'wellwave-onboarding-completed'

interface TutorialStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlight?: 'new-button' | 'kanban-columns' | 'drag-drop' | 'settings'
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao WellWave',
    description: 'O WellWave ajuda você a gerenciar atendimentos no pronto-socorro com eficiência. Vamos fazer um tour rápido?',
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    id: 'create-task',
    title: 'Criar Novo Atendimento',
    description: 'Clique em "Novo Atendimento" para iniciar uma anamnese. Você pode adicionar pacientes rapidamente com formulários inteligentes.',
    icon: <Plus className="w-8 h-8" />,
    highlight: 'new-button',
  },
  {
    id: 'kanban-columns',
    title: 'Colunas do Kanban',
    description: 'Seus atendimentos são organizados em 4 colunas: Aguardando Exame, Aguardando Resultados, Reavaliação e Alta/Internação.',
    icon: <Kanban className="w-8 h-8" />,
    highlight: 'kanban-columns',
  },
  {
    id: 'drag-drop',
    title: 'Arrastar e Soltar',
    description: 'Arraste os cards entre colunas para atualizar o status do paciente, ou use o botão de transferência rápida em cada card.',
    icon: <ArrowRightLeft className="w-8 h-8" />,
    highlight: 'drag-drop',
  },
  {
    id: 'customize',
    title: 'Personalize seu Painel',
    description: 'Clique em "Configurar" para personalizar as métricas visíveis, colunas do kanban e densidade de visualização.',
    icon: <Settings2 className="w-8 h-8" />,
    highlight: 'settings',
  },
]

interface OnboardingTutorialProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function OnboardingTutorial({ isOpen, onClose, onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const step = tutorialSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === tutorialSteps.length - 1

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }, [isLastStep])

  const handlePrevious = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [isFirstStep])

  const handleSkip = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
      setIsExiting(false)
      setCurrentStep(0)
    }, 300)
  }, [onClose])

  const handleComplete = useCallback(() => {
    setIsExiting(true)
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
    setTimeout(() => {
      onComplete()
      setIsExiting(false)
      setCurrentStep(0)
    }, 300)
  }, [onComplete])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleSkip()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleNext, handlePrevious, handleSkip])

  if (!isOpen) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && !isExiting && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm"
            onClick={handleSkip}
            aria-hidden="true"
          />

          {/* Highlight Overlays */}
          <AnimatePresence mode="wait">
            {step.highlight && (
              <HighlightOverlay highlight={step.highlight} key={step.highlight} />
            )}
          </AnimatePresence>

          {/* Tutorial Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="onboarding-title"
              aria-describedby="onboarding-description"
            >
              {/* Glass Card */}
              <div className="relative overflow-hidden rounded-[32px] p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl saturate-[180%] border border-white/40 dark:border-white/15 shadow-[0_40px_100px_rgba(0,0,0,0.25)] ring-1 ring-white/50 dark:ring-white/10">
                {/* Light refraction effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={handleSkip}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
                  aria-label="Pular tutorial"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative z-10">
                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mb-6">
                    {tutorialSteps.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? 'w-6 bg-blue-500'
                            : index < currentStep
                              ? 'bg-blue-500/50'
                              : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                        aria-label={`Ir para passo ${index + 1}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>

                  {/* Step Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-center"
                    >
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                        className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 border border-white/30 dark:border-white/10 shadow-lg"
                      >
                        {step.icon}
                      </motion.div>

                      {/* Title */}
                      <h2
                        id="onboarding-title"
                        className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight"
                      >
                        {step.title}
                      </h2>

                      {/* Description */}
                      <p
                        id="onboarding-description"
                        className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto"
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8 gap-4">
                    {/* Skip/Back Button */}
                    <button
                      onClick={isFirstStep ? handleSkip : handlePrevious}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                    >
                      {isFirstStep ? (
                        'Pular'
                      ) : (
                        <>
                          <ChevronLeft className="w-4 h-4" />
                          Voltar
                        </>
                      )}
                    </button>

                    {/* Step Counter */}
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      {currentStep + 1} / {tutorialSteps.length}
                    </span>

                    {/* Next/Complete Button */}
                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                    >
                      {isLastStep ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Começar
                        </>
                      ) : (
                        <>
                          Próximo
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function HighlightOverlay({ highlight }: { highlight: TutorialStep['highlight'] }) {
  // Map highlights to position hints (these are approximate visual guides)
  const highlightPositions: Record<NonNullable<TutorialStep['highlight']>, { description: string }> = {
    'new-button': { description: 'Botão Novo Atendimento no canto superior direito' },
    'kanban-columns': { description: 'As 4 colunas do Kanban abaixo' },
    'drag-drop': { description: 'Arraste cards entre colunas' },
    'settings': { description: 'Botão Configurar no canto superior direito' },
  }

  const info = highlight ? highlightPositions[highlight] : null

  if (!info) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed z-[99] pointer-events-none"
      aria-hidden="true"
    >
      {/* Visual hint indicator - positioned based on highlight type */}
      {highlight === 'new-button' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="fixed top-24 right-32 animate-bounce"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/30 border-2 border-blue-500 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 rounded-full bg-blue-500/50"
            />
          </div>
        </motion.div>
      )}

      {highlight === 'settings' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="fixed top-24 right-56 animate-bounce"
        >
          <div className="w-16 h-16 rounded-full bg-purple-500/30 border-2 border-purple-500 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 rounded-full bg-purple-500/50"
            />
          </div>
        </motion.div>
      )}

      {highlight === 'kanban-columns' && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-40 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
        />
      )}

      {highlight === 'drag-drop' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2 text-blue-500"
          >
            <ArrowRightLeft className="w-12 h-12 opacity-60" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Hook to manage onboarding state
export function useOnboarding(hasNoTasks: boolean) {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false)

  useEffect(() => {
    // Check if onboarding was already completed
    const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (!completed && hasNoTasks) {
      setShowOnboarding(true)
    }
    setHasCheckedStorage(true)
  }, [hasNoTasks])

  const startTour = useCallback(() => {
    setShowOnboarding(true)
  }, [])

  const closeTour = useCallback(() => {
    setShowOnboarding(false)
  }, [])

  const completeTour = useCallback(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
    setShowOnboarding(false)
  }, [])

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    setShowOnboarding(true)
  }, [])

  return {
    showOnboarding,
    hasCheckedStorage,
    startTour,
    closeTour,
    completeTour,
    resetOnboarding,
  }
}

// Export storage key for testing
export { ONBOARDING_STORAGE_KEY }
