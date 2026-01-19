'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, Code, User, Calendar, Stethoscope, Sparkles, ChevronRight, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SAMPLE_PROJECTS } from '@/lib/kanban/sample-projects'
import { useKanbanStore } from '@/stores/kanban-store'
import { cn } from '@/lib/utils'
import { EmptyStateIllustration } from '@/components/ui/empty-state-illustration'
import { TaskImportModal } from './TaskImportModal'
import type { SampleProject } from '@/types/kanban'

const ICONS: Record<string, React.ElementType> = {
  code: Code,
  user: User,
  calendar: Calendar,
  stethoscope: Stethoscope,
}

const USE_CASE_COLORS: Record<SampleProject['useCase'], string> = {
  software: 'from-blue-500/20 to-cyan-500/20 border-blue-300/30 hover:border-blue-400/50',
  personal: 'from-purple-500/20 to-pink-500/20 border-purple-300/30 hover:border-purple-400/50',
  content: 'from-amber-500/20 to-orange-500/20 border-amber-300/30 hover:border-amber-400/50',
  medical: 'from-emerald-500/20 to-teal-500/20 border-emerald-300/30 hover:border-emerald-400/50',
}

const USE_CASE_LABELS: Record<SampleProject['useCase'], string> = {
  software: 'Desenvolvimento',
  personal: 'Pessoal',
  content: 'Conteúdo',
  medical: 'Médico',
}

export function KanbanEmptyState() {
  const [showProjects, setShowProjects] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const loadSampleProject = useKanbanStore((state) => state.loadSampleProject)

  const handleLoadProject = (projectId: string) => {
    setSelectedProject(projectId)
    // Small delay for animation
    setTimeout(() => {
      loadSampleProject(projectId)
    }, 300)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4" data-testid="kanban-empty-state">
      <AnimatePresence mode="wait">
        {!showProjects ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            {/* Animated Illustration */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full scale-150" />
              <EmptyStateIllustration variant="kanban-board" size="lg" />
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
              Seu quadro está vazio
            </h2>

            {/* Description */}
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Comece organizando suas tarefas visualmente. Você pode criar tarefas do zero ou
              carregar um projeto de exemplo para ver como funciona.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setShowImportModal(true)}
                  size="lg"
                  className="gap-2 px-6 py-6 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-shadow"
                  data-testid="import-tasks-button"
                >
                  <Upload className="h-5 w-5" />
                  Importar Tarefas
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setShowProjects(true)}
                  size="lg"
                  variant="outline"
                  className="gap-2 px-6 py-6 text-base font-semibold rounded-2xl"
                  data-testid="load-sample-project-button"
                >
                  <Sparkles className="h-5 w-5" />
                  Exemplos
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
              Importe do Trello, Google Tasks, Todoist, ou cole suas tarefas
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Escolha um projeto de exemplo
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Selecione o tipo de projeto que melhor se adapta às suas necessidades
              </p>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="sample-projects-list">
              {SAMPLE_PROJECTS.map((project, index) => {
                const Icon = ICONS[project.icon] || Layout
                const isSelected = selectedProject === project.id

                return (
                  <motion.button
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLoadProject(project.id)}
                    disabled={selectedProject !== null}
                    className={cn(
                      'relative p-6 rounded-2xl text-left',
                      'bg-gradient-to-br border',
                      'transition-all duration-300',
                      USE_CASE_COLORS[project.useCase],
                      isSelected && 'ring-2 ring-blue-500 scale-95 opacity-50'
                    )}
                    data-testid={`sample-project-${project.id}`}
                  >
                    {/* Loading indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </motion.div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="liquid-glass-material rim-light-ios26 p-3 rounded-xl border border-white/30">
                        <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/50 dark:bg-white/10 text-slate-600 dark:text-slate-300 mb-2">
                          {USE_CASE_LABELS[project.useCase]}
                        </span>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
                          {project.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {project.description}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                          {project.tasks.length} tarefas de exemplo
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-6"
            >
              <Button
                variant="ghost"
                onClick={() => setShowProjects(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Voltar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <TaskImportModal open={showImportModal} onOpenChange={setShowImportModal} />
    </div>
  )
}
