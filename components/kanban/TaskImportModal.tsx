'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClipboardPaste,
  FileText,
  Table,
  CheckSquare,
  Sparkles,
  AlertCircle,
  Check,
  ArrowRight,
  Upload,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  GlassModal,
  GlassModalContent,
  GlassModalHeader,
  GlassModalTitle,
  GlassModalDescription,
  GlassModalBody,
  GlassModalFooter,
} from '@/components/ui/glass-modal'
import { useKanbanStore } from '@/stores/kanban-store'
import {
  detectFormat,
  parseContent,
  convertToKanbanTasks,
  getImportStats,
  SOURCE_LABELS,
  type FormatDetectionResult,
  type ParsedTask,
  type ImportSourceFormat,
} from '@/lib/kanban/task-import-parser'
import { cn } from '@/lib/utils'

interface TaskImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ImportStep = 'input' | 'preview' | 'importing' | 'success'

const FORMAT_ICONS: Partial<Record<ImportSourceFormat, React.ElementType>> = {
  'markdown': FileText,
  'plain-text': FileText,
  'numbered-list': FileText,
  'trello-json': Table,
  'google-tasks': CheckSquare,
  'todoist': Check,
  'csv': Table,
}

export function TaskImportModal({ open, onOpenChange }: TaskImportModalProps) {
  const [step, setStep] = useState<ImportStep>('input')
  const [inputText, setInputText] = useState('')
  const [detection, setDetection] = useState<FormatDetectionResult | null>(null)
  const [parsedTasks, setParsedTasks] = useState<ParsedTask[]>([])
  const [isDetecting, setIsDetecting] = useState(false)
  const [clipboardAvailable, setClipboardAvailable] = useState<boolean | null>(null)

  const addTask = useKanbanStore((state) => state.addTask)
  const setBoardInfo = useKanbanStore((state) => state.setBoardInfo)

  // Check clipboard on mount
  useEffect(() => {
    if (open) {
      checkClipboard()
    }
  }, [open])

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setStep('input')
      setInputText('')
      setDetection(null)
      setParsedTasks([])
    }
  }, [open])

  const checkClipboard = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
        const text = await navigator.clipboard.readText()
        if (text && text.trim()) {
          setClipboardAvailable(true)
          // Auto-detect format from clipboard
          const result = detectFormat(text)
          if (result.taskCount > 0) {
            setInputText(text)
            setDetection(result)
          }
        } else {
          setClipboardAvailable(false)
        }
      } else {
        setClipboardAvailable(false)
      }
    } catch {
      // Clipboard permission denied or not available
      setClipboardAvailable(false)
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setInputText(text)
        handleTextChange(text)
      }
    } catch {
      // Permission denied
    }
  }

  const handleTextChange = useCallback((text: string) => {
    setInputText(text)
    setIsDetecting(true)

    // Debounce detection
    const timeoutId = setTimeout(() => {
      const result = detectFormat(text)
      setDetection(result)
      setIsDetecting(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  const handlePreview = () => {
    if (!inputText.trim()) return

    const tasks = parseContent(inputText)
    setParsedTasks(tasks)
    setStep('preview')
  }

  const handleImport = async () => {
    setStep('importing')

    // Convert and add tasks with small delay for animation
    const kanbanTasks = convertToKanbanTasks(parsedTasks)

    // Add tasks one by one with small delay for visual effect
    for (const task of kanbanTasks) {
      addTask(task)
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    // Update board name if importing many tasks
    if (parsedTasks.length >= 5) {
      setBoardInfo('Tarefas Importadas', `${parsedTasks.length} tarefas importadas com sucesso`)
    }

    setStep('success')

    // Close after success animation
    setTimeout(() => {
      onOpenChange(false)
    }, 1500)
  }

  const stats = parsedTasks.length > 0 ? getImportStats(parsedTasks) : null
  const FormatIcon = detection?.format ? FORMAT_ICONS[detection.format] || FileText : FileText

  return (
    <GlassModal open={open} onOpenChange={onOpenChange}>
      <GlassModalContent size="lg" data-testid="task-import-modal">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <GlassModalHeader>
                <GlassModalTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-500" />
                  Importar Tarefas
                </GlassModalTitle>
                <GlassModalDescription>
                  Cole suas tarefas de outras ferramentas. Detectamos automaticamente o formato.
                </GlassModalDescription>
              </GlassModalHeader>

              <GlassModalBody className="space-y-4">
                {/* Clipboard detection banner */}
                {clipboardAvailable && detection && detection.taskCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-green-500/20">
                      <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-700 dark:text-green-300">
                        Detectamos {detection.taskCount} tarefas na área de transferência
                      </p>
                      <p className="text-sm text-green-600/80 dark:text-green-400/80">
                        Formato: {SOURCE_LABELS[detection.format]}
                      </p>
                    </div>
                    <Button
                      variant="medical-green"
                      size="sm"
                      onClick={handlePreview}
                      data-testid="import-preview-clipboard-btn"
                    >
                      Importar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Text input area */}
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder={`Cole suas tarefas aqui...

Formatos suportados:
- Lista com marcadores (- tarefa, * tarefa)
- Lista numerada (1. tarefa)
- Checkbox markdown (- [ ] tarefa, - [x] feita)
- JSON do Trello
- JSON do Google Tasks
- CSV com cabeçalhos
- Texto simples (uma tarefa por linha)`}
                    className={cn(
                      'w-full h-64 p-4 rounded-xl resize-none',
                      'bg-white/50 dark:bg-slate-900/50',
                      'border border-slate-200/50 dark:border-slate-700/50',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
                      'placeholder:text-slate-400 dark:placeholder:text-slate-500',
                      'text-slate-700 dark:text-slate-200',
                      'font-mono text-sm'
                    )}
                    data-testid="task-import-textarea"
                  />

                  {/* Paste button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePasteFromClipboard}
                    className="absolute top-2 right-2"
                    data-testid="paste-from-clipboard-btn"
                  >
                    <ClipboardPaste className="h-4 w-4" />
                    Colar
                  </Button>
                </div>

                {/* Format detection indicator */}
                {inputText && (
                  <div className="flex items-center justify-between">
                    {isDetecting ? (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Detectando formato...
                      </div>
                    ) : detection && detection.taskCount > 0 ? (
                      <div className="flex items-center gap-2 text-sm">
                        <FormatIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {SOURCE_LABELS[detection.format]}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500">•</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {detection.taskCount} tarefas encontradas
                        </span>
                        <span className="text-slate-400 dark:text-slate-500">•</span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {detection.confidence}% confiança
                        </span>
                      </div>
                    ) : inputText.trim() ? (
                      <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                        Nenhuma tarefa detectada
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Supported formats chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">Suportado:</span>
                  {['Markdown', 'Trello', 'Google Tasks', 'Todoist', 'CSV', 'Texto'].map((format) => (
                    <span
                      key={format}
                      className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </GlassModalBody>

              <GlassModalFooter>
                <Button
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handlePreview}
                  disabled={!detection || detection.taskCount === 0}
                  data-testid="import-preview-btn"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </GlassModalFooter>
            </motion.div>
          )}

          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassModalHeader>
                <GlassModalTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-blue-500" />
                  Confirmar Importação
                </GlassModalTitle>
                <GlassModalDescription>
                  Revise as tarefas antes de importar
                </GlassModalDescription>
              </GlassModalHeader>

              <GlassModalBody>
                {/* Stats summary */}
                {stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.totalTasks}
                      </div>
                      <div className="text-xs text-blue-600/70 dark:text-blue-400/70">
                        Total de tarefas
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {stats.byStatus.todo + stats.byStatus.backlog}
                      </div>
                      <div className="text-xs text-amber-600/70 dark:text-amber-400/70">
                        Pendentes
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stats.byStatus.done}
                      </div>
                      <div className="text-xs text-green-600/70 dark:text-green-400/70">
                        Concluídas
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {stats.byPriority.high + stats.byPriority.critical}
                      </div>
                      <div className="text-xs text-purple-600/70 dark:text-purple-400/70">
                        Alta prioridade
                      </div>
                    </div>
                  </div>
                )}

                {/* Task preview list */}
                <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                  {parsedTasks.slice(0, 10).map((task, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center gap-3 p-3',
                        index !== 0 && 'border-t border-slate-200/30 dark:border-slate-700/30'
                      )}
                    >
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full flex-shrink-0',
                          task.status === 'done' ? 'bg-green-500' :
                          task.status === 'in_progress' ? 'bg-amber-500' :
                          'bg-slate-400'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                          {task.title}
                        </p>
                        {task.labels.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {task.labels.slice(0, 3).map((label, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 dark:bg-slate-800 text-slate-500"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span
                        className={cn(
                          'px-2 py-0.5 text-[10px] font-medium rounded-full',
                          task.priority === 'critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                          task.priority === 'high' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                          task.priority === 'medium' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        )}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
                  {parsedTasks.length > 10 && (
                    <div className="p-3 text-center text-sm text-slate-500 border-t border-slate-200/30 dark:border-slate-700/30">
                      +{parsedTasks.length - 10} mais tarefas
                    </div>
                  )}
                </div>
              </GlassModalBody>

              <GlassModalFooter>
                <Button
                  variant="ghost"
                  onClick={() => setStep('input')}
                >
                  Voltar
                </Button>
                <Button
                  variant="medical-green"
                  onClick={handleImport}
                  data-testid="import-confirm-btn"
                >
                  Importar {parsedTasks.length} tarefas
                  <Check className="h-4 w-4" />
                </Button>
              </GlassModalFooter>
            </motion.div>
          )}

          {step === 'importing' && (
            <motion.div
              key="importing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mb-4"
              >
                <Loader2 className="h-12 w-12 text-blue-500" />
              </motion.div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                Importando tarefas...
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {parsedTasks.length} tarefas sendo adicionadas
              </p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mb-4 p-4 rounded-full bg-green-500/20"
              >
                <Check className="h-12 w-12 text-green-500" />
              </motion.div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                Importação concluída!
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {parsedTasks.length} tarefas adicionadas ao seu quadro
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassModalContent>
    </GlassModal>
  )
}
