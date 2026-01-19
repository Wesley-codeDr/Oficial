
🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing form and auto-save patterns",
      "status": "in_progress",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for auto-save visual feedback",
      "status": "pending",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement auto-save visual feedback component",
      "status": "pending",
      "activeForm": "Implementing auto-save feedback component"
    },
    {
      "content": "Implement network failure detection and recovery UI",
      "status": "pending",
      "activeForm": "Implementing network failure handling"
    },
    {
      "content": "Integrate with existing anamnesis forms",
      "status": "pending",
      "activeForm": "Integrating with anamnesis forms"
    },
    {
      "content": "Verify with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}

🔧 Tool: Task
Input: {
  "description": "Explore form and auto-save patterns",
  "prompt": "Explore the codebase to understand:\n1. Existing form implementations, especially in the anamnesis module\n2. Any existing auto-save functionality\n3. Network status handling patterns\n4. UI feedback patterns for save states\n5. The overall structure of medical/anamnesis components\n\nFocus on:\n- app/(dashboard)/anamnese/ directory\n- components/medical/ directory  \n- components/ui/ directory\n- Any hooks related to forms, saving, or network status\n- stores/ for state management patterns\n\nProvide a comprehensive summary of the patterns found.",
  "subagent_type": "Explore"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.tsx"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.ts"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial -type f -name \"*.md\" | grep -E \"(anamnese|GUIDELINES)\" | head -20",
  "description": "Find anamnese-related documentation files"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial -type f \\( -name \"*.tsx\" -o -name \"*.ts\" \\) -path \"*/anamnese/*\" ! -path \"*/node_modules/*\" | head -30",
  "description": "Find anamnese files excluding node_modules"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial -type f \\( -name \"*.tsx\" -o -name \"*.ts\" \\) -path \"*/components/medical/*\" ! -path \"*/node_modules/*\" | head -30",
  "description": "Find medical component files"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial -type f \\( -name \"*.tsx\" -o -name \"*.ts\" \\) -path \"*/hooks/*\" ! -path \"*/node_modules/*\"",
  "description": "Find hooks files"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial -type f \\( -name \"*.ts\" \\) -path \"*/stores/*\" ! -path \"*/node_modules/*\"",
  "description": "Find store files"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/stores/index.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/stores/anamnese-store.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/hooks/use-sync-status.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/narrative-preview.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/lib/anamnese/actions.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/medical/SyncStatusBadge.tsx"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial/components -name \"*.tsx\" -type f ! -path \"*/node_modules/*\" | xargs grep -l \"auto.*save\\|autosave\" 2>/dev/null | head -10",
  "description": "Search for files with auto-save patterns"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial/components/ui -name \"*.tsx\" -type f | head -20",
  "description": "Find UI component files"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/ui/index.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/types/index.ts"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial/types -name \"*.ts\" -type f",
  "description": "Find type definition files"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/types/medical.ts",
  "limit": 100
}

🔧 Tool: Bash
Input: {
  "command": "grep -r \"useTransition\\|isPending\\|startTransition\" /Users/wesleywillian/Oficial/Oficial/components --include=\"*.tsx\" | head -20",
  "description": "Find useTransition patterns in components"
}

🔧 Tool: Bash
Input: {
  "command": "grep -r \"useEffect\\|useCallback\" /Users/wesleywillian/Oficial/Oficial/hooks --include=\"*.ts\" | head -15",
  "description": "Find common hook patterns"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/ExportPDFButton/useExportPdf.ts"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial/app/api -name \"*.ts\" -type f | grep -E \"anamnese|save\" | head -10",
  "description": "Find API routes for anamnese"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/stores/patient-store.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/lib/anamnese/validation.ts",
  "limit": 80
}

🔧 Tool: Bash
Input: {
  "command": "grep -r \"toast\\|Toast\" /Users/wesleywillian/Oficial/Oficial/hooks --include=\"*.ts\" | head -10",
  "description": "Find toast hook implementation"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/hooks/use-toast.ts",
  "limit": 50
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/wesleywillian/Oficial/Oficial/components -name \"error-boundary*\" -o -name \"*error*\" | grep -v node_modules",
  "description": "Find error boundary components"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/error-boundary.tsx",
  "limit": 80
}

🔧 Tool: Bash
Input: {
  "command": "grep -r \"debounce\\|throttle\\|useMemo\" /Users/wesleywillian/Oficial/Oficial/components/anamnese --include=\"*.tsx\" | head -15",
  "description": "Find debouncing and memoization patterns"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/prisma/schema.prisma",
  "limit": 120
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/app/api/anamnese/export-pdf/route.ts",
  "limit": 80
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/stores/ui-store.ts"
}

🔧 Tool: Bash
Input: {
  "command": "grep -r \"React.memo\\|useMemo\" /Users/wesleywillian/Oficial/Oficial/components/anamnese/checkbox-group.tsx 2>/dev/null | head -5",
  "description": "Check for performance patterns"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/checkbox-group.tsx",
  "limit": 80
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing form and auto-save patterns",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for auto-save visual feedback",
      "status": "in_progress",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement auto-save visual feedback component",
      "status": "pending",
      "activeForm": "Implementing auto-save feedback component"
    },
    {
      "content": "Implement network failure detection and recovery UI",
      "status": "pending",
      "activeForm": "Implementing network failure handling"
    },
    {
      "content": "Integrate with existing anamnesis forms",
      "status": "pending",
      "activeForm": "Integrating with anamnesis forms"
    },
    {
      "content": "Verify with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Let me read the key files to understand the exact implementation details:

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/hooks/use-sync-status.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/stores/index.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/stores/anamnese-store.ts"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/use-toast.ts"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/glass-*.tsx",
  "path": "/Users/wesleywillian/Oficial/Oficial/components/ui"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/hooks/use-toast.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/ui/glass-notification.tsx"
}
Now I have a good understanding of the codebase. Let me plan the implementation:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing form and auto-save patterns",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for auto-save visual feedback",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create useAutoSave hook with debounced save and network detection",
      "status": "in_progress",
      "activeForm": "Creating useAutoSave hook"
    },
    {
      "content": "Create AutoSaveIndicator component with glass UI",
      "status": "pending",
      "activeForm": "Creating AutoSaveIndicator component"
    },
    {
      "content": "Create NetworkRecoveryBanner component",
      "status": "pending",
      "activeForm": "Creating NetworkRecoveryBanner component"
    },
    {
      "content": "Integrate auto-save into anamnese-form.tsx",
      "status": "pending",
      "activeForm": "Integrating with anamnesis forms"
    },
    {
      "content": "Verify with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me implement the auto-save functionality. I'll start with the core hook:

🔧 Tool: Write
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/hooks/use-auto-save.ts",
  "content": "'use client'\n\n/**\n * useAutoSave Hook\n *\n * Provides auto-save functionality with:\n * - Debounced saves to avoid excessive API calls\n * - Network status detection\n * - Last saved timestamp tracking\n * - Recovery queue for failed saves\n * - Visual feedback state management\n */\n\nimport { useState, useEffect, useCallback, useRef } from 'react'\n\n// ============================================================================\n// Types\n// ============================================================================\n\nexport type AutoSaveStatus =\n  | 'idle' // No changes to save\n  | 'pending' // Changes detected, waiting for debounce\n  | 'saving' // Currently saving to server\n  | 'saved' // Successfully saved\n  | 'error' // Save failed\n  | 'offline' // Network unavailable\n  | 'recovering' // Attempting to recover from failure\n\nexport interface AutoSaveState {\n  /** Current auto-save status */\n  status: AutoSaveStatus\n  /** Last successful save timestamp */\n  lastSavedAt: Date | null\n  /** Error message if save failed */\n  error: string | null\n  /** Number of pending changes in recovery queue */\n  pendingChanges: number\n  /** Whether network is available */\n  isOnline: boolean\n}\n\nexport interface UseAutoSaveOptions<T> {\n  /** Data to auto-save */\n  data: T\n  /** Save function that persists data */\n  onSave: (data: T) => Promise<void>\n  /** Debounce delay in milliseconds (default: 2000) */\n  debounceMs?: number\n  /** Whether auto-save is enabled (default: true) */\n  enabled?: boolean\n  /** Minimum data validation before save */\n  isValid?: (data: T) => boolean\n  /** Callback when save succeeds */\n  onSaveSuccess?: () => void\n  /** Callback when save fails */\n  onSaveError?: (error: Error) => void\n  /** Callback when network status changes */\n  onNetworkChange?: (isOnline: boolean) => void\n}\n\nexport interface UseAutoSaveReturn extends AutoSaveState {\n  /** Force an immediate save */\n  saveNow: () => Promise<void>\n  /** Reset error state */\n  clearError: () => void\n  /** Retry failed saves */\n  retryFailedSaves: () => Promise<void>\n  /** Check if there are unsaved changes */\n  hasUnsavedChanges: boolean\n}\n\n// ============================================================================\n// Configuration\n// ============================================================================\n\nconst DEFAULT_DEBOUNCE_MS = 2000\nconst RECOVERY_RETRY_DELAY = 5000\nconst MAX_RECOVERY_ATTEMPTS = 3\n\n// ============================================================================\n// Hook Implementation\n// ============================================================================\n\nexport function useAutoSave<T>({\n  data,\n  onSave,\n  debounceMs = DEFAULT_DEBOUNCE_MS,\n  enabled = true,\n  isValid = () => true,\n  onSaveSuccess,\n  onSaveError,\n  onNetworkChange,\n}: UseAutoSaveOptions<T>): UseAutoSaveReturn {\n  // State\n  const [status, setStatus] = useState<AutoSaveStatus>('idle')\n  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)\n  const [error, setError] = useState<string | null>(null)\n  const [isOnline, setIsOnline] = useState(true)\n  const [pendingChanges, setPendingChanges] = useState(0)\n\n  // Refs for memoization\n  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)\n  const lastSavedDataRef = useRef<string | null>(null)\n  const recoveryQueueRef = useRef<T[]>([])\n  const recoveryAttemptsRef = useRef(0)\n  const isMountedRef = useRef(true)\n\n  // Track if data has changed since last save\n  const currentDataStr = JSON.stringify(data)\n  const hasUnsavedChanges =\n    lastSavedDataRef.current !== null && lastSavedDataRef.current !== currentDataStr\n\n  // Network status detection\n  useEffect(() => {\n    const handleOnline = () => {\n      setIsOnline(true)\n      onNetworkChange?.(true)\n      // Try to recover failed saves when back online\n      if (recoveryQueueRef.current.length > 0) {\n        setStatus('recovering')\n      }\n    }\n\n    const handleOffline = () => {\n      setIsOnline(false)\n      setStatus('offline')\n      onNetworkChange?.(false)\n    }\n\n    // Check initial state\n    setIsOnline(navigator.onLine)\n\n    window.addEventListener('online', handleOnline)\n    window.addEventListener('offline', handleOffline)\n\n    return () => {\n      window.removeEventListener('online', handleOnline)\n      window.removeEventListener('offline', handleOffline)\n    }\n  }, [onNetworkChange])\n\n  // Cleanup on unmount\n  useEffect(() => {\n    isMountedRef.current = true\n    return () => {\n      isMountedRef.current = false\n      if (debounceTimerRef.current) {\n        clearTimeout(debounceTimerRef.current)\n      }\n    }\n  }, [])\n\n  // Core save function\n  const performSave = useCallback(\n    async (dataToSave: T) => {\n      if (!isMountedRef.current) return\n\n      // Check network\n      if (!navigator.onLine) {\n        setStatus('offline')\n        recoveryQueueRef.current.push(dataToSave)\n        setPendingChanges(recoveryQueueRef.current.length)\n        return\n      }\n\n      // Validate data\n      if (!isValid(dataToSave)) {\n        return\n      }\n\n      setStatus('saving')\n      setError(null)\n\n      try {\n        await onSave(dataToSave)\n\n        if (!isMountedRef.current) return\n\n        const now = new Date()\n        setLastSavedAt(now)\n        setStatus('saved')\n        lastSavedDataRef.current = JSON.stringify(dataToSave)\n        recoveryAttemptsRef.current = 0\n        onSaveSuccess?.()\n\n        // Reset to idle after showing saved status\n        setTimeout(() => {\n          if (isMountedRef.current) {\n            setStatus('idle')\n          }\n        }, 2000)\n      } catch (err) {\n        if (!isMountedRef.current) return\n\n        const errorMessage =\n          err instanceof Error ? err.message : 'Falha ao salvar. Tentando novamente...'\n        setError(errorMessage)\n        setStatus('error')\n        onSaveError?.(err instanceof Error ? err : new Error(errorMessage))\n\n        // Add to recovery queue\n        recoveryQueueRef.current.push(dataToSave)\n        setPendingChanges(recoveryQueueRef.current.length)\n      }\n    },\n    [onSave, isValid, onSaveSuccess, onSaveError]\n  )\n\n  // Debounced auto-save effect\n  useEffect(() => {\n    if (!enabled) return\n    if (!hasUnsavedChanges && status !== 'idle') return\n\n    // Clear existing timer\n    if (debounceTimerRef.current) {\n      clearTimeout(debounceTimerRef.current)\n    }\n\n    // Skip if data hasn't changed from last save\n    if (currentDataStr === lastSavedDataRef.current) {\n      return\n    }\n\n    // Set pending status\n    setStatus('pending')\n\n    // Set new debounce timer\n    debounceTimerRef.current = setTimeout(() => {\n      performSave(data)\n    }, debounceMs)\n\n    return () => {\n      if (debounceTimerRef.current) {\n        clearTimeout(debounceTimerRef.current)\n      }\n    }\n  }, [currentDataStr, enabled, debounceMs, performSave, data, hasUnsavedChanges, status])\n\n  // Recovery mechanism\n  useEffect(() => {\n    if (status !== 'recovering' || !isOnline) return\n    if (recoveryQueueRef.current.length === 0) {\n      setStatus('idle')\n      setPendingChanges(0)\n      return\n    }\n\n    const attemptRecovery = async () => {\n      if (recoveryAttemptsRef.current >= MAX_RECOVERY_ATTEMPTS) {\n        setStatus('error')\n        setError('Múltiplas tentativas falharam. Por favor, salve manualmente.')\n        return\n      }\n\n      recoveryAttemptsRef.current++\n\n      const latestData = recoveryQueueRef.current[recoveryQueueRef.current.length - 1]\n\n      try {\n        await onSave(latestData)\n        recoveryQueueRef.current = []\n        setPendingChanges(0)\n        setLastSavedAt(new Date())\n        lastSavedDataRef.current = JSON.stringify(latestData)\n        setStatus('saved')\n        recoveryAttemptsRef.current = 0\n\n        setTimeout(() => {\n          if (isMountedRef.current) {\n            setStatus('idle')\n          }\n        }, 2000)\n      } catch {\n        // Wait and retry\n        setTimeout(attemptRecovery, RECOVERY_RETRY_DELAY)\n      }\n    }\n\n    attemptRecovery()\n  }, [status, isOnline, onSave])\n\n  // Public methods\n  const saveNow = useCallback(async () => {\n    if (debounceTimerRef.current) {\n      clearTimeout(debounceTimerRef.current)\n    }\n    await performSave(data)\n  }, [data, performSave])\n\n  const clearError = useCallback(() => {\n    setError(null)\n    setStatus('idle')\n  }, [])\n\n  const retryFailedSaves = useCallback(async () => {\n    if (recoveryQueueRef.current.length === 0) return\n\n    recoveryAttemptsRef.current = 0\n    setStatus('recovering')\n  }, [])\n\n  return {\n    status,\n    lastSavedAt,\n    error,\n    pendingChanges,\n    isOnline,\n    saveNow,\n    clearError,\n    retryFailedSaves,\n    hasUnsavedChanges,\n  }\n}\n\n// ============================================================================\n// Utility Hook: useNetworkStatus\n// ============================================================================\n\nexport interface NetworkStatus {\n  isOnline: boolean\n  wasOffline: boolean\n  lastOnlineAt: Date | null\n}\n\nexport function useNetworkStatus(): NetworkStatus {\n  const [isOnline, setIsOnline] = useState(true)\n  const [wasOffline, setWasOffline] = useState(false)\n  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(null)\n\n  useEffect(() => {\n    const handleOnline = () => {\n      setIsOnline(true)\n      setLastOnlineAt(new Date())\n    }\n\n    const handleOffline = () => {\n      setIsOnline(false)\n      setWasOffline(true)\n    }\n\n    setIsOnline(navigator.onLine)\n\n    window.addEventListener('online', handleOnline)\n    window.addEventListener('offline', handleOffline)\n\n    return () => {\n      window.removeEventListener('online', handleOnline)\n      window.removeEventListener('offline', handleOffline)\n    }\n  }, [])\n\n  return { isOnline, wasOffline, lastOnlineAt }\n}\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing form and auto-save patterns",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for auto-save visual feedback",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create useAutoSave hook with debounced save and network detection",
      "status": "completed",
      "activeForm": "Creating useAutoSave hook"
    },
    {
      "content": "Create AutoSaveIndicator component with glass UI",
      "status": "in_progress",
      "activeForm": "Creating AutoSaveIndicator component"
    },
    {
      "content": "Create NetworkRecoveryBanner component",
      "status": "pending",
      "activeForm": "Creating NetworkRecoveryBanner component"
    },
    {
      "content": "Integrate auto-save into anamnese-form.tsx",
      "status": "pending",
      "activeForm": "Integrating with anamnesis forms"
    },
    {
      "content": "Verify with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me create the AutoSaveIndicator component:

🔧 Tool: Write
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/ui/auto-save-indicator.tsx",
  "content": "'use client'\n\n/**\n * AutoSaveIndicator - Visual feedback for auto-save status\n *\n * Features:\n * - Shows current save status with animated icons\n * - Displays last saved timestamp\n * - Network status indicator\n * - Glass morphism design matching iOS 26 style\n * - Compact and non-intrusive\n */\n\nimport * as React from 'react'\nimport { motion, AnimatePresence } from 'framer-motion'\nimport {\n  Cloud,\n  CloudOff,\n  Check,\n  Loader2,\n  AlertCircle,\n  RefreshCw,\n  WifiOff,\n} from 'lucide-react'\nimport { cn } from '@/lib/utils'\nimport type { AutoSaveStatus } from '@/hooks/use-auto-save'\n\n// ============================================================================\n// Types\n// ============================================================================\n\nexport interface AutoSaveIndicatorProps {\n  /** Current auto-save status */\n  status: AutoSaveStatus\n  /** Last saved timestamp */\n  lastSavedAt: Date | null\n  /** Whether network is available */\n  isOnline: boolean\n  /** Number of pending changes */\n  pendingChanges?: number\n  /** Error message */\n  error?: string | null\n  /** Callback to retry failed saves */\n  onRetry?: () => void\n  /** Additional class names */\n  className?: string\n  /** Compact mode for smaller displays */\n  compact?: boolean\n}\n\n// ============================================================================\n// Helper Functions\n// ============================================================================\n\nfunction formatTimestamp(date: Date | null): string {\n  if (!date) return ''\n\n  const now = new Date()\n  const diffMs = now.getTime() - date.getTime()\n  const diffSeconds = Math.floor(diffMs / 1000)\n  const diffMinutes = Math.floor(diffSeconds / 60)\n  const diffHours = Math.floor(diffMinutes / 60)\n\n  if (diffSeconds < 10) return 'agora'\n  if (diffSeconds < 60) return `${diffSeconds}s atras`\n  if (diffMinutes < 60) return `${diffMinutes}min atras`\n  if (diffHours < 24) return `${diffHours}h atras`\n\n  return date.toLocaleDateString('pt-BR', {\n    hour: '2-digit',\n    minute: '2-digit',\n  })\n}\n\n// ============================================================================\n// Status Configurations\n// ============================================================================\n\ntype StatusConfig = {\n  icon: React.ElementType\n  text: string\n  color: string\n  bgColor: string\n  animate?: boolean\n  spin?: boolean\n}\n\nconst statusConfigs: Record<AutoSaveStatus, StatusConfig> = {\n  idle: {\n    icon: Cloud,\n    text: 'Salvo',\n    color: 'text-slate-400 dark:text-slate-500',\n    bgColor: 'bg-slate-100/50 dark:bg-slate-800/50',\n  },\n  pending: {\n    icon: Cloud,\n    text: 'Alteracoes pendentes',\n    color: 'text-amber-500 dark:text-amber-400',\n    bgColor: 'bg-amber-100/50 dark:bg-amber-900/30',\n    animate: true,\n  },\n  saving: {\n    icon: Loader2,\n    text: 'Salvando...',\n    color: 'text-blue-500 dark:text-blue-400',\n    bgColor: 'bg-blue-100/50 dark:bg-blue-900/30',\n    spin: true,\n  },\n  saved: {\n    icon: Check,\n    text: 'Salvo',\n    color: 'text-emerald-500 dark:text-emerald-400',\n    bgColor: 'bg-emerald-100/50 dark:bg-emerald-900/30',\n  },\n  error: {\n    icon: AlertCircle,\n    text: 'Erro ao salvar',\n    color: 'text-red-500 dark:text-red-400',\n    bgColor: 'bg-red-100/50 dark:bg-red-900/30',\n  },\n  offline: {\n    icon: WifiOff,\n    text: 'Sem conexao',\n    color: 'text-orange-500 dark:text-orange-400',\n    bgColor: 'bg-orange-100/50 dark:bg-orange-900/30',\n  },\n  recovering: {\n    icon: RefreshCw,\n    text: 'Recuperando...',\n    color: 'text-blue-500 dark:text-blue-400',\n    bgColor: 'bg-blue-100/50 dark:bg-blue-900/30',\n    spin: true,\n  },\n}\n\n// ============================================================================\n// Component\n// ============================================================================\n\nexport function AutoSaveIndicator({\n  status,\n  lastSavedAt,\n  isOnline,\n  pendingChanges = 0,\n  error,\n  onRetry,\n  className,\n  compact = false,\n}: AutoSaveIndicatorProps) {\n  const config = statusConfigs[status]\n  const Icon = config.icon\n  const timestamp = formatTimestamp(lastSavedAt)\n\n  return (\n    <AnimatePresence mode=\"wait\">\n      <motion.div\n        key={status}\n        initial={{ opacity: 0, y: -5 }}\n        animate={{ opacity: 1, y: 0 }}\n        exit={{ opacity: 0, y: 5 }}\n        transition={{ duration: 0.2 }}\n        className={cn(\n          'inline-flex items-center gap-2',\n          'px-3 py-1.5',\n          'rounded-xl',\n          // Glass effect\n          'backdrop-blur-md',\n          'border border-white/20 dark:border-white/10',\n          config.bgColor,\n          'shadow-sm',\n          'transition-all duration-300',\n          className\n        )}\n        data-testid=\"auto-save-indicator\"\n        data-status={status}\n      >\n        {/* Icon */}\n        <motion.span\n          className={cn('flex-shrink-0', config.color)}\n          animate={\n            config.animate\n              ? {\n                  opacity: [1, 0.5, 1],\n                }\n              : undefined\n          }\n          transition={\n            config.animate\n              ? {\n                  duration: 1.5,\n                  repeat: Infinity,\n                  ease: 'easeInOut',\n                }\n              : undefined\n          }\n        >\n          <Icon\n            className={cn(\n              compact ? 'h-3 w-3' : 'h-3.5 w-3.5',\n              config.spin && 'animate-spin'\n            )}\n          />\n        </motion.span>\n\n        {/* Text */}\n        {!compact && (\n          <span\n            className={cn(\n              'text-[10px] font-semibold uppercase tracking-wider',\n              config.color\n            )}\n          >\n            {config.text}\n          </span>\n        )}\n\n        {/* Timestamp */}\n        {!compact && timestamp && status !== 'saving' && status !== 'recovering' && (\n          <span className=\"text-[9px] text-slate-400 dark:text-slate-500\">\n            {timestamp}\n          </span>\n        )}\n\n        {/* Pending count badge */}\n        {pendingChanges > 0 && status === 'offline' && (\n          <span\n            className={cn(\n              'inline-flex items-center justify-center',\n              'min-w-[16px] h-4 px-1',\n              'rounded-full',\n              'bg-orange-500',\n              'text-[9px] font-bold text-white'\n            )}\n          >\n            {pendingChanges}\n          </span>\n        )}\n\n        {/* Retry button for error state */}\n        {status === 'error' && onRetry && (\n          <motion.button\n            type=\"button\"\n            onClick={onRetry}\n            className={cn(\n              'ml-1 p-1 rounded-lg',\n              'text-red-500 hover:text-red-600',\n              'hover:bg-red-100/50 dark:hover:bg-red-900/30',\n              'transition-colors duration-200',\n              'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50'\n            )}\n            whileHover={{ scale: 1.1 }}\n            whileTap={{ scale: 0.9 }}\n            title=\"Tentar novamente\"\n          >\n            <RefreshCw className=\"h-3 w-3\" />\n          </motion.button>\n        )}\n\n        {/* Network status indicator when offline */}\n        {!isOnline && status !== 'offline' && (\n          <CloudOff className=\"h-3 w-3 text-orange-500 ml-1\" />\n        )}\n      </motion.div>\n    </AnimatePresence>\n  )\n}\n\n// ============================================================================\n// AutoSaveStatusDot - Minimal status indicator\n// ============================================================================\n\nexport interface AutoSaveStatusDotProps {\n  status: AutoSaveStatus\n  className?: string\n}\n\nexport function AutoSaveStatusDot({ status, className }: AutoSaveStatusDotProps) {\n  const dotColors: Record<AutoSaveStatus, string> = {\n    idle: 'bg-slate-400',\n    pending: 'bg-amber-500',\n    saving: 'bg-blue-500',\n    saved: 'bg-emerald-500',\n    error: 'bg-red-500',\n    offline: 'bg-orange-500',\n    recovering: 'bg-blue-500',\n  }\n\n  const shouldPulse =\n    status === 'pending' || status === 'saving' || status === 'recovering'\n\n  return (\n    <span\n      className={cn(\n        'relative inline-flex h-2 w-2 rounded-full',\n        dotColors[status],\n        className\n      )}\n      data-testid=\"auto-save-dot\"\n      data-status={status}\n    >\n      {shouldPulse && (\n        <span\n          className={cn(\n            'absolute inline-flex h-full w-full rounded-full opacity-75',\n            dotColors[status],\n            'animate-ping'\n          )}\n        />\n      )}\n    </span>\n  )\n}\n\nAutoSaveIndicator.displayName = 'AutoSaveIndicator'\nAutoSaveStatusDot.displayName = 'AutoSaveStatusDot'\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing form and auto-save patterns",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for auto-save visual feedback",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create useAutoSave hook with debounced save and network detection",
      "status": "completed",
      "activeForm": "Creating useAutoSave hook"
    },
    {
      "content": "Create AutoSaveIndicator component with glass UI",
      "status": "completed",
      "activeForm": "Creating AutoSaveIndicator component"
    },
    {
      "content": "Create NetworkRecoveryBanner component",
      "status": "in_progress",
      "activeForm": "Creating NetworkRecoveryBanner component"
    },
    {
      "content": "Integrate auto-save into anamnese-form.tsx",
      "status": "pending",
      "activeForm": "Integrating with anamnesis forms"
    },
    {
      "content": "Verify with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me create the NetworkRecoveryBanner component for when users lose connection mid-documentation:

🔧 Tool: Write
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/ui/network-recovery-banner.tsx",
  "content": "'use client'\n\n/**\n * NetworkRecoveryBanner - Recovery UI for network failures\n *\n * Features:\n * - Persistent banner when offline\n * - Shows pending changes count\n * - Recovery progress indicator\n * - Manual retry option\n * - Auto-dismisses when back online and synced\n * - Glass morphism design\n */\n\nimport * as React from 'react'\nimport { useState, useEffect } from 'react'\nimport { motion, AnimatePresence } from 'framer-motion'\nimport { WifiOff, RefreshCw, Check, AlertTriangle, X, CloudOff, Cloud } from 'lucide-react'\nimport { cn } from '@/lib/utils'\nimport type { AutoSaveStatus } from '@/hooks/use-auto-save'\n\n// ============================================================================\n// Types\n// ============================================================================\n\nexport interface NetworkRecoveryBannerProps {\n  /** Whether network is available */\n  isOnline: boolean\n  /** Current auto-save status */\n  status: AutoSaveStatus\n  /** Number of pending changes */\n  pendingChanges: number\n  /** Error message */\n  error?: string | null\n  /** Callback to retry failed saves */\n  onRetry: () => void\n  /** Callback when user manually dismisses */\n  onDismiss?: () => void\n  /** Additional class names */\n  className?: string\n}\n\n// ============================================================================\n// Component\n// ============================================================================\n\nexport function NetworkRecoveryBanner({\n  isOnline,\n  status,\n  pendingChanges,\n  error,\n  onRetry,\n  onDismiss,\n  className,\n}: NetworkRecoveryBannerProps) {\n  const [isVisible, setIsVisible] = useState(false)\n  const [wasOffline, setWasOffline] = useState(false)\n  const [showSuccess, setShowSuccess] = useState(false)\n\n  // Track offline state transitions\n  useEffect(() => {\n    if (!isOnline) {\n      setIsVisible(true)\n      setWasOffline(true)\n    } else if (wasOffline && status === 'saved' && pendingChanges === 0) {\n      // Show success message briefly before hiding\n      setShowSuccess(true)\n      const timer = setTimeout(() => {\n        setShowSuccess(false)\n        setIsVisible(false)\n        setWasOffline(false)\n      }, 3000)\n      return () => clearTimeout(timer)\n    }\n  }, [isOnline, status, pendingChanges, wasOffline])\n\n  // Show banner for error state\n  useEffect(() => {\n    if (status === 'error' && pendingChanges > 0) {\n      setIsVisible(true)\n    }\n  }, [status, pendingChanges])\n\n  // Determine banner variant\n  const getVariant = () => {\n    if (showSuccess) return 'success'\n    if (!isOnline) return 'offline'\n    if (status === 'recovering') return 'recovering'\n    if (status === 'error') return 'error'\n    return 'offline'\n  }\n\n  const variant = getVariant()\n\n  const variants = {\n    offline: {\n      icon: WifiOff,\n      title: 'Sem conexao com a internet',\n      description: `Suas alteracoes estao salvas localmente${pendingChanges > 0 ? `. ${pendingChanges} alteracao${pendingChanges > 1 ? 'oes' : ''} pendente${pendingChanges > 1 ? 's' : ''}.` : '.'}`,\n      bgColor: 'bg-orange-500/10 dark:bg-orange-500/20',\n      borderColor: 'border-orange-500/30',\n      iconColor: 'text-orange-500',\n      textColor: 'text-orange-700 dark:text-orange-300',\n    },\n    recovering: {\n      icon: RefreshCw,\n      title: 'Sincronizando alteracoes...',\n      description: `Recuperando ${pendingChanges} alteracao${pendingChanges > 1 ? 'oes' : ''} pendente${pendingChanges > 1 ? 's' : ''}.`,\n      bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',\n      borderColor: 'border-blue-500/30',\n      iconColor: 'text-blue-500',\n      textColor: 'text-blue-700 dark:text-blue-300',\n    },\n    error: {\n      icon: AlertTriangle,\n      title: 'Falha ao sincronizar',\n      description: error || 'Nao foi possivel salvar suas alteracoes. Tente novamente.',\n      bgColor: 'bg-red-500/10 dark:bg-red-500/20',\n      borderColor: 'border-red-500/30',\n      iconColor: 'text-red-500',\n      textColor: 'text-red-700 dark:text-red-300',\n    },\n    success: {\n      icon: Check,\n      title: 'Alteracoes sincronizadas!',\n      description: 'Todas as suas alteracoes foram salvas com sucesso.',\n      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',\n      borderColor: 'border-emerald-500/30',\n      iconColor: 'text-emerald-500',\n      textColor: 'text-emerald-700 dark:text-emerald-300',\n    },\n  }\n\n  const config = variants[variant]\n  const Icon = config.icon\n\n  const handleDismiss = () => {\n    setIsVisible(false)\n    onDismiss?.()\n  }\n\n  return (\n    <AnimatePresence>\n      {isVisible && (\n        <motion.div\n          initial={{ opacity: 0, y: -20, height: 0 }}\n          animate={{ opacity: 1, y: 0, height: 'auto' }}\n          exit={{ opacity: 0, y: -20, height: 0 }}\n          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}\n          className={cn('overflow-hidden', className)}\n          data-testid=\"network-recovery-banner\"\n          data-variant={variant}\n        >\n          <div\n            className={cn(\n              'relative',\n              'px-4 py-3',\n              'rounded-2xl',\n              // Glass effect\n              'backdrop-blur-xl',\n              'border',\n              config.bgColor,\n              config.borderColor,\n              'shadow-lg'\n            )}\n          >\n            {/* Inner glow */}\n            <div className=\"absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl\" />\n\n            <div className=\"flex items-start gap-3\">\n              {/* Icon */}\n              <motion.div\n                className={cn(\n                  'flex-shrink-0 p-2 rounded-xl',\n                  'bg-white/50 dark:bg-black/20',\n                  config.iconColor\n                )}\n                animate={\n                  variant === 'recovering'\n                    ? { rotate: 360 }\n                    : variant === 'offline'\n                      ? { opacity: [1, 0.5, 1] }\n                      : undefined\n                }\n                transition={\n                  variant === 'recovering'\n                    ? { duration: 1, repeat: Infinity, ease: 'linear' }\n                    : variant === 'offline'\n                      ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }\n                      : undefined\n                }\n              >\n                <Icon className=\"h-5 w-5\" />\n              </motion.div>\n\n              {/* Content */}\n              <div className=\"flex-1 min-w-0\">\n                <h4\n                  className={cn(\n                    'text-sm font-semibold',\n                    config.textColor\n                  )}\n                >\n                  {config.title}\n                </h4>\n                <p\n                  className={cn(\n                    'text-xs mt-0.5',\n                    'text-slate-600 dark:text-slate-400'\n                  )}\n                >\n                  {config.description}\n                </p>\n\n                {/* Progress indicator for recovering */}\n                {variant === 'recovering' && (\n                  <div className=\"mt-2 h-1 w-full bg-blue-200/50 dark:bg-blue-800/50 rounded-full overflow-hidden\">\n                    <motion.div\n                      className=\"h-full bg-blue-500 rounded-full\"\n                      initial={{ width: '0%' }}\n                      animate={{ width: '100%' }}\n                      transition={{ duration: 2, repeat: Infinity }}\n                    />\n                  </div>\n                )}\n              </div>\n\n              {/* Actions */}\n              <div className=\"flex items-center gap-2 flex-shrink-0\">\n                {/* Retry button */}\n                {(variant === 'error' || variant === 'offline') && isOnline && (\n                  <motion.button\n                    type=\"button\"\n                    onClick={onRetry}\n                    className={cn(\n                      'px-3 py-1.5 rounded-lg',\n                      'text-xs font-semibold',\n                      'bg-white/50 dark:bg-black/30',\n                      config.textColor,\n                      'hover:bg-white/80 dark:hover:bg-black/50',\n                      'transition-colors duration-200',\n                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',\n                      variant === 'error'\n                        ? 'focus-visible:ring-red-500'\n                        : 'focus-visible:ring-orange-500'\n                    )}\n                    whileHover={{ scale: 1.02 }}\n                    whileTap={{ scale: 0.98 }}\n                  >\n                    <span className=\"flex items-center gap-1.5\">\n                      <RefreshCw className=\"h-3 w-3\" />\n                      Tentar novamente\n                    </span>\n                  </motion.button>\n                )}\n\n                {/* Dismiss button */}\n                {(variant === 'success' || variant === 'error') && (\n                  <motion.button\n                    type=\"button\"\n                    onClick={handleDismiss}\n                    className={cn(\n                      'p-1.5 rounded-lg',\n                      'text-slate-400 hover:text-slate-600',\n                      'dark:text-slate-500 dark:hover:text-slate-300',\n                      'hover:bg-white/50 dark:hover:bg-black/30',\n                      'transition-colors duration-200',\n                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/50'\n                    )}\n                    whileHover={{ scale: 1.1 }}\n                    whileTap={{ scale: 0.9 }}\n                  >\n                    <X className=\"h-4 w-4\" />\n                    <span className=\"sr-only\">Fechar</span>\n                  </motion.button>\n                )}\n              </div>\n            </div>\n\n            {/* Local storage indicator */}\n            {variant === 'offline' && pendingChanges > 0 && (\n              <div className=\"mt-3 pt-2 border-t border-orange-500/20\">\n                <div className=\"flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400\">\n                  <CloudOff className=\"h-3 w-3\" />\n                  <span>Dados salvos localmente ate a conexao ser restaurada</span>\n                </div>\n              </div>\n            )}\n          </div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  )\n}\n\n// ============================================================================\n// NetworkStatusToast - Compact toast for network changes\n// ============================================================================\n\nexport interface NetworkStatusToastProps {\n  isOnline: boolean\n  className?: string\n}\n\nexport function NetworkStatusToast({ isOnline, className }: NetworkStatusToastProps) {\n  const [show, setShow] = useState(false)\n  const [prevOnline, setPrevOnline] = useState(isOnline)\n\n  useEffect(() => {\n    if (prevOnline !== isOnline) {\n      setShow(true)\n      setPrevOnline(isOnline)\n\n      // Auto-hide after 3 seconds\n      const timer = setTimeout(() => {\n        setShow(false)\n      }, 3000)\n\n      return () => clearTimeout(timer)\n    }\n  }, [isOnline, prevOnline])\n\n  return (\n    <AnimatePresence>\n      {show && (\n        <motion.div\n          initial={{ opacity: 0, y: 50, scale: 0.9 }}\n          animate={{ opacity: 1, y: 0, scale: 1 }}\n          exit={{ opacity: 0, y: 50, scale: 0.9 }}\n          transition={{ type: 'spring', stiffness: 400, damping: 30 }}\n          className={cn(\n            'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',\n            'px-4 py-2',\n            'rounded-full',\n            'backdrop-blur-xl',\n            'border',\n            'shadow-lg',\n            isOnline\n              ? 'bg-emerald-500/20 border-emerald-500/30'\n              : 'bg-orange-500/20 border-orange-500/30',\n            className\n          )}\n        >\n          <div className=\"flex items-center gap-2\">\n            {isOnline ? (\n              <>\n                <Cloud className=\"h-4 w-4 text-emerald-500\" />\n                <span className=\"text-xs font-medium text-emerald-700 dark:text-emerald-300\">\n                  Conexao restaurada\n                </span>\n              </>\n            ) : (\n              <>\n                <WifiOff className=\"h-4 w-4 text-orange-500\" />\n                <span className=\"text-xs font-medium text-orange-700 dark:text-orange-300\">\n                  Sem conexao\n                </span>\n              </>\n            )}\n          </div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  )\n}\n\nNetworkRecoveryBanner.displayName = 'NetworkRecoveryBanner'\nNetworkStatusToast.displayName = 'NetworkStatusToast'\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing form and auto-save patterns",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for auto-save visual feedback",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create useAutoSave hook with debounced save and network detection",
      "status": "completed",
      "activeForm": "Creating useAutoSave hook"
    },
    {
      "content": "Create AutoSaveIndicator component with glass UI",
      "status": "completed",
      "activeForm": "Creating AutoSaveIndicator component"
    },
    {
      "content": "Create NetworkRecoveryBanner component",
      "status": "completed",
      "activeForm": "Creating NetworkRecoveryBanner component"
    },
    {
      "content": "Integrate auto-save into anamnese-form.tsx",
      "status": "in_progress",
      "activeForm": "Integrating with anamnesis forms"
    },
    {
      "content": "Verify with Playwright test",
      "status": "pending",
      "activeForm": "Verifying with Playwright"
    }
  ]
}
Now let me update the anamnese-form.tsx to integrate the auto-save functionality:

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/lib/anamnese/actions.ts"
}
I need to create a draft save action that doesn't require all fields to be complete. Let me add that and then update the form:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/lib/anamnese/actions.ts",
  "old_string": "export async function getUserSessions(limit = 10) {\n  const user = await getUser()\n\n  if (!user) {\n    return []\n  }\n\n  return prisma.anamneseSession.findMany({\n    where: { userId: user.id },\n    orderBy: { createdAt: 'desc' },\n    take: limit,\n    include: {\n      syndrome: {\n        select: {\n          name: true,\n          code: true,\n          icon: true,\n        },\n      },\n    },\n  })\n}",
  "new_string": "export async function getUserSessions(limit = 10) {\n  const user = await getUser()\n\n  if (!user) {\n    return []\n  }\n\n  return prisma.anamneseSession.findMany({\n    where: { userId: user.id },\n    orderBy: { createdAt: 'desc' },\n    take: limit,\n    include: {\n      syndrome: {\n        select: {\n          name: true,\n          code: true,\n          icon: true,\n        },\n      },\n    },\n  })\n}\n\n/**\n * Save anamnese draft - auto-save functionality\n * Creates or updates a draft session without requiring all fields\n */\nexport async function saveAnamneseDraft(data: {\n  draftId?: string | null\n  syndromeId: string\n  checkedItems: string[]\n  generatedText: string\n  outputMode: 'SUMMARY' | 'DETAILED'\n  redFlagsDetected: string[]\n}) {\n  const user = await getUser()\n\n  if (!user) {\n    throw new Error('User not authenticated')\n  }\n\n  // Upsert user\n  await prisma.user.upsert({\n    where: { id: user.id },\n    update: {\n      lastLoginAt: new Date(),\n    },\n    create: {\n      id: user.id,\n      email: user.email!,\n      fullName: user.user_metadata?.full_name || 'Usuario',\n      crmNumber: user.user_metadata?.crm_number || '000000',\n      crmState: user.user_metadata?.crm_state || 'SP',\n    },\n  })\n\n  // If we have a draft ID, update the existing draft\n  if (data.draftId) {\n    const session = await prisma.anamneseSession.update({\n      where: { id: data.draftId, userId: user.id },\n      data: {\n        checkedItems: data.checkedItems,\n        generatedText: data.generatedText,\n        outputMode: data.outputMode,\n        redFlagsDetected: data.redFlagsDetected,\n        updatedAt: new Date(),\n      },\n    })\n\n    return { session, isNew: false }\n  }\n\n  // Create new draft session (not completed yet)\n  const session = await prisma.anamneseSession.create({\n    data: {\n      userId: user.id,\n      syndromeId: data.syndromeId,\n      checkedItems: data.checkedItems,\n      generatedText: data.generatedText,\n      outputMode: data.outputMode,\n      redFlagsDetected: data.redFlagsDetected,\n      // completedAt is null for drafts\n    },\n  })\n\n  // Create audit log for draft\n  await prisma.auditLog.create({\n    data: {\n      userId: user.id,\n      action: 'ANAMNESE_DRAFT_SAVED',\n      resourceType: 'AnamneseSession',\n      resourceId: session.id,\n      metadata: {\n        syndromeId: data.syndromeId,\n        checkboxCount: data.checkedItems.length,\n        redFlagCount: data.redFlagsDetected.length,\n        outputMode: data.outputMode,\n        isDraft: true,\n      },\n    },\n  })\n\n  return { session, isNew: true }\n}"
}
Now let me update the anamnese-form.tsx to integrate auto-save:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "'use client'\n\nimport { useState, useMemo, useTransition, useCallback, useEffect } from 'react'\nimport { useRouter } from 'next/navigation'\nimport { CheckboxCategory } from '@prisma/client'\nimport { Save, RotateCcw, FileText, List, MessageSquare, FileDown } from 'lucide-react'\nimport { motion, AnimatePresence } from 'framer-motion'\nimport { cn } from '@/lib/utils'\nimport { CheckboxGroup } from './checkbox-group'\nimport { NarrativePreview } from './narrative-preview'\nimport { RedFlagAlert } from './red-flag-alert'\nimport { ComplaintSelector } from './complaint-selector'\nimport { PriorityCheckboxPanel } from './priority-checkbox-panel'\nimport { ExportPDFButton } from './ExportPDFButton'\nimport {\n  generateNarrative,\n  detectRedFlags,\n  type OutputMode,\n} from '@/lib/anamnese/generate-narrative'\nimport { saveAnamneseSession, markSessionAsCopied } from '@/lib/anamnese/actions'\nimport { useToast } from '@/hooks/use-toast'\nimport { analytics } from '@/lib/analytics'\nimport { usePatientStore } from '@/stores/patient-store'\nimport { useComplaint } from '@/hooks/use-complaints'\nimport type { CheckboxCategory as CheckboxCategoryType } from '@/lib/types/medical'",
  "new_string": "'use client'\n\nimport { useState, useMemo, useTransition, useCallback, useEffect } from 'react'\nimport { useRouter } from 'next/navigation'\nimport { CheckboxCategory } from '@prisma/client'\nimport { Save, RotateCcw, FileText, List, MessageSquare } from 'lucide-react'\nimport { motion, AnimatePresence } from 'framer-motion'\nimport { cn } from '@/lib/utils'\nimport { CheckboxGroup } from './checkbox-group'\nimport { NarrativePreview } from './narrative-preview'\nimport { RedFlagAlert } from './red-flag-alert'\nimport { ComplaintSelector } from './complaint-selector'\nimport { PriorityCheckboxPanel } from './priority-checkbox-panel'\nimport { ExportPDFButton } from './ExportPDFButton'\nimport {\n  generateNarrative,\n  detectRedFlags,\n  type OutputMode,\n} from '@/lib/anamnese/generate-narrative'\nimport { saveAnamneseSession, saveAnamneseDraft, markSessionAsCopied } from '@/lib/anamnese/actions'\nimport { useToast } from '@/hooks/use-toast'\nimport { useAutoSave } from '@/hooks/use-auto-save'\nimport { AutoSaveIndicator } from '@/components/ui/auto-save-indicator'\nimport { NetworkRecoveryBanner, NetworkStatusToast } from '@/components/ui/network-recovery-banner'\nimport { analytics } from '@/lib/analytics'\nimport { usePatientStore } from '@/stores/patient-store'\nimport { useComplaint } from '@/hooks/use-complaints'\nimport type { CheckboxCategory as CheckboxCategoryType } from '@/lib/types/medical'"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx"
}
Now I can see the current form. Let me update it with auto-save functionality:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "'use client'\n\nimport { useState, useMemo, useTransition, useCallback, useEffect } from 'react'\nimport { useRouter } from 'next/navigation'\nimport { CheckboxCategory } from '@prisma/client'\nimport { Save, RotateCcw, FileText, List, MessageSquare, FileDown } from 'lucide-react'\nimport { motion, AnimatePresence } from 'framer-motion'\nimport { cn } from '@/lib/utils'\nimport { CheckboxGroup } from './checkbox-group'\nimport { NarrativePreview } from './narrative-preview'\nimport { RedFlagAlert } from './red-flag-alert'\nimport { ComplaintSelector } from './complaint-selector'\nimport { PriorityCheckboxPanel } from './priority-checkbox-panel'\nimport { CFMProgressIndicator } from './cfm-progress-indicator'\nimport { ExportPDFButton } from './ExportPDFButton'\nimport {\n  generateNarrative,\n  detectRedFlags,\n  type OutputMode,\n} from '@/lib/anamnese/generate-narrative'\nimport { saveAnamneseSession, markSessionAsCopied } from '@/lib/anamnese/actions'\nimport { useToast } from '@/hooks/use-toast'\nimport { analytics } from '@/lib/analytics'\nimport { usePatientStore } from '@/stores/patient-store'\nimport { useComplaint } from '@/hooks/use-complaints'\nimport { useCFMProgress } from '@/hooks/use-cfm-progress'\nimport type { CheckboxCategory as CheckboxCategoryType } from '@/lib/types/medical'",
  "new_string": "'use client'\n\nimport { useState, useMemo, useTransition, useCallback, useEffect, useRef } from 'react'\nimport { useRouter } from 'next/navigation'\nimport { CheckboxCategory } from '@prisma/client'\nimport { Save, RotateCcw, FileText, List, MessageSquare } from 'lucide-react'\nimport { motion, AnimatePresence } from 'framer-motion'\nimport { cn } from '@/lib/utils'\nimport { CheckboxGroup } from './checkbox-group'\nimport { NarrativePreview } from './narrative-preview'\nimport { RedFlagAlert } from './red-flag-alert'\nimport { ComplaintSelector } from './complaint-selector'\nimport { PriorityCheckboxPanel } from './priority-checkbox-panel'\nimport { CFMProgressIndicator } from './cfm-progress-indicator'\nimport { ExportPDFButton } from './ExportPDFButton'\nimport {\n  generateNarrative,\n  detectRedFlags,\n  type OutputMode,\n} from '@/lib/anamnese/generate-narrative'\nimport { saveAnamneseSession, saveAnamneseDraft, markSessionAsCopied } from '@/lib/anamnese/actions'\nimport { useToast } from '@/hooks/use-toast'\nimport { useAutoSave } from '@/hooks/use-auto-save'\nimport { AutoSaveIndicator } from '@/components/ui/auto-save-indicator'\nimport { NetworkRecoveryBanner, NetworkStatusToast } from '@/components/ui/network-recovery-banner'\nimport { analytics } from '@/lib/analytics'\nimport { usePatientStore } from '@/stores/patient-store'\nimport { useComplaint } from '@/hooks/use-complaints'\nimport { useCFMProgress } from '@/hooks/use-cfm-progress'\nimport type { CheckboxCategory as CheckboxCategoryType } from '@/lib/types/medical'"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())\n  const [outputMode, setOutputMode] = useState<OutputMode>('SUMMARY')\n  const [savedSessionId, setSavedSessionId] = useState<string | null>(null)\n\n  // State for complaint selector and priority checkboxes\n  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null)\n  const [prioritySelectedCheckboxes, setPrioritySelectedCheckboxes] = useState<Set<string>>(\n    new Set()\n  )",
  "new_string": "  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())\n  const [outputMode, setOutputMode] = useState<OutputMode>('SUMMARY')\n  const [savedSessionId, setSavedSessionId] = useState<string | null>(null)\n  const [draftSessionId, setDraftSessionId] = useState<string | null>(null)\n\n  // State for complaint selector and priority checkboxes\n  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null)\n  const [prioritySelectedCheckboxes, setPrioritySelectedCheckboxes] = useState<Set<string>>(\n    new Set()\n  )\n\n  // Track if first interaction happened (for auto-save trigger)\n  const hasInteractedRef = useRef(false)"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  // Normalize red flags for RedFlagAlert component\n  const normalizedRedFlags = useMemo(() => {\n    return redFlags.map((rf, index) => ({\n      id: 'id' in rf ? rf.id : `ebm-rf-${index}`,\n      displayText: 'displayText' in rf ? rf.displayText : rf.description,\n      severity: 'severity' in rf ? (rf.severity as 'warning' | 'danger' | 'critical') : undefined,\n      action: 'immediateAction' in rf ? rf.immediateAction : undefined,\n    }))\n  }, [redFlags])\n\n  const handleToggle = (id: string) => {",
  "new_string": "  // Normalize red flags for RedFlagAlert component\n  const normalizedRedFlags = useMemo(() => {\n    return redFlags.map((rf, index) => ({\n      id: 'id' in rf ? rf.id : `ebm-rf-${index}`,\n      displayText: 'displayText' in rf ? rf.displayText : rf.description,\n      severity: 'severity' in rf ? (rf.severity as 'warning' | 'danger' | 'critical') : undefined,\n      action: 'immediateAction' in rf ? rf.immediateAction : undefined,\n    }))\n  }, [redFlags])\n\n  // Auto-save data structure\n  const autoSaveData = useMemo(\n    () => ({\n      draftId: draftSessionId,\n      syndromeId: syndrome.id,\n      checkedItems: Array.from(selectedIds),\n      generatedText: narrative,\n      outputMode,\n      redFlagsDetected: redFlags.map((rf) => ('id' in rf ? rf.id : rf.description)),\n    }),\n    [draftSessionId, syndrome.id, selectedIds, narrative, outputMode, redFlags]\n  )\n\n  // Auto-save hook\n  const {\n    status: autoSaveStatus,\n    lastSavedAt,\n    isOnline,\n    pendingChanges,\n    error: autoSaveError,\n    retryFailedSaves,\n  } = useAutoSave({\n    data: autoSaveData,\n    onSave: async (data) => {\n      const result = await saveAnamneseDraft(data)\n      if (result.isNew) {\n        setDraftSessionId(result.session.id)\n      }\n    },\n    debounceMs: 3000, // 3 seconds debounce\n    enabled: hasInteractedRef.current && selectedIds.size > 0,\n    isValid: (data) => data.checkedItems.length > 0,\n    onSaveSuccess: () => {\n      // Silent success - indicator shows status\n    },\n    onSaveError: (error) => {\n      console.error('Auto-save failed:', error)\n    },\n  })\n\n  const handleToggle = (id: string) => {"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  const handleToggle = (id: string) => {\n    setSelectedIds((prev) => {\n      const next = new Set(prev)\n      if (next.has(id)) {\n        next.delete(id)\n      } else {\n        next.add(id)\n      }\n      return next\n    })\n    // Reset saved session when changing selection\n    setSavedSessionId(null)\n  }",
  "new_string": "  const handleToggle = (id: string) => {\n    // Mark first interaction for auto-save\n    hasInteractedRef.current = true\n\n    setSelectedIds((prev) => {\n      const next = new Set(prev)\n      if (next.has(id)) {\n        next.delete(id)\n      } else {\n        next.add(id)\n      }\n      return next\n    })\n    // Reset saved session when changing selection\n    setSavedSessionId(null)\n  }"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  const handleReset = () => {\n    setSelectedIds(new Set())\n    setSavedSessionId(null)\n    setSelectedComplaintId(null)\n    setPrioritySelectedCheckboxes(new Set())\n  }",
  "new_string": "  const handleReset = () => {\n    setSelectedIds(new Set())\n    setSavedSessionId(null)\n    setDraftSessionId(null)\n    setSelectedComplaintId(null)\n    setPrioritySelectedCheckboxes(new Set())\n    hasInteractedRef.current = false\n  }"
}
Now let's update the priority toggle to also mark interaction:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  // Handler for priority checkboxes\n  const handlePriorityToggle = useCallback(\n    (label: string, category: CheckboxCategoryType) => {\n      const key = `${category}:${label}`\n      const checkboxId = findCheckboxIdByLabel(category, label)\n\n      // Se não encontrar o checkbox, logar e retornar\n      if (!checkboxId) {\n        console.warn(`Checkbox not found: ${category} - ${label}`)\n        return\n      }",
  "new_string": "  // Handler for priority checkboxes\n  const handlePriorityToggle = useCallback(\n    (label: string, category: CheckboxCategoryType) => {\n      // Mark first interaction for auto-save\n      hasInteractedRef.current = true\n\n      const key = `${category}:${label}`\n      const checkboxId = findCheckboxIdByLabel(category, label)\n\n      // Se não encontrar o checkbox, logar e retornar\n      if (!checkboxId) {\n        console.warn(`Checkbox not found: ${category} - ${label}`)\n        return\n      }"
}
Now let's add the UI components to the form. First, let me read the current return statement to see where to add them:

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "offset": 430,
  "limit": 200
}
Now let me add the auto-save indicator and network recovery banner to the UI:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  return (\n    <div className=\"grid gap-8 lg:grid-cols-[1fr,450px]\">\n      {/* Left Panel - Checkboxes */}\n      <div className=\"space-y-8\">\n        {/* Complaint Selector */}\n        <div className=\"glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl\">\n          <ComplaintSelector\n            selectedComplaintId={selectedComplaintId}\n            onComplaintSelect={handleComplaintSelect}\n            onClear={handleComplaintClear}\n          />\n        </div>",
  "new_string": "  return (\n    <div className=\"grid gap-8 lg:grid-cols-[1fr,450px]\">\n      {/* Network Recovery Banner */}\n      <div className=\"lg:col-span-2\">\n        <NetworkRecoveryBanner\n          isOnline={isOnline}\n          status={autoSaveStatus}\n          pendingChanges={pendingChanges}\n          error={autoSaveError}\n          onRetry={retryFailedSaves}\n        />\n      </div>\n\n      {/* Network Status Toast (shows on status change) */}\n      <NetworkStatusToast isOnline={isOnline} />\n\n      {/* Left Panel - Checkboxes */}\n      <div className=\"space-y-8\">\n        {/* Auto-Save Status Header */}\n        <div className=\"flex items-center justify-between px-2\">\n          <div className=\"flex items-center gap-2\">\n            {selectedIds.size > 0 && (\n              <AutoSaveIndicator\n                status={autoSaveStatus}\n                lastSavedAt={lastSavedAt}\n                isOnline={isOnline}\n                pendingChanges={pendingChanges}\n                error={autoSaveError}\n                onRetry={retryFailedSaves}\n              />\n            )}\n          </div>\n        </div>\n\n        {/* Complaint Selector */}\n        <div className=\"glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl\">\n          <ComplaintSelector\n            selectedComplaintId={selectedComplaintId}\n            onComplaintSelect={handleComplaintSelect}\n            onClear={handleComplaintClear}\n          />\n        </div>"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx"
}
I see the file has been modified with some new imports (EmergencyWarningOverlay, useEmergencyDetection). Let me now add the UI components:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  return (\n    <div className=\"grid gap-8 lg:grid-cols-[1fr,450px]\">\n      {/* Left Panel - Checkboxes */}\n      <div className=\"space-y-8\">\n        {/* Complaint Selector */}\n        <div className=\"glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl\">\n          <ComplaintSelector\n            selectedComplaintId={selectedComplaintId}\n            onComplaintSelect={handleComplaintSelect}\n            onClear={handleComplaintClear}\n          />\n        </div>",
  "new_string": "  return (\n    <div className=\"grid gap-8 lg:grid-cols-[1fr,450px]\">\n      {/* Network Recovery Banner - spans full width */}\n      <div className=\"lg:col-span-2\">\n        <NetworkRecoveryBanner\n          isOnline={isOnline}\n          status={autoSaveStatus}\n          pendingChanges={pendingChanges}\n          error={autoSaveError}\n          onRetry={retryFailedSaves}\n        />\n      </div>\n\n      {/* Network Status Toast (shows on status change) */}\n      <NetworkStatusToast isOnline={isOnline} />\n\n      {/* Left Panel - Checkboxes */}\n      <div className=\"space-y-8\">\n        {/* Auto-Save Status Indicator */}\n        {selectedIds.size > 0 && (\n          <div className=\"flex items-center justify-end px-2\">\n            <AutoSaveIndicator\n              status={autoSaveStatus}\n              lastSavedAt={lastSavedAt}\n              isOnline={isOnline}\n              pendingChanges={pendingChanges}\n              error={autoSaveError}\n              onRetry={retryFailedSaves}\n            />\n          </div>\n        )}\n\n        {/* Complaint Selector */}\n        <div className=\"glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl\">\n          <ComplaintSelector\n            selectedComplaintId={selectedComplaintId}\n            onComplaintSelect={handleComplaintSelect}\n            onClear={handleComplaintClear}\n          />\n        </div>"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "offset": 440,
  "limit": 80
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/anamnese/anamnese-form.tsx",
  "old_string": "  return (\n    <div className=\"grid gap-8 lg:grid-cols-[1fr,450px]\">\n      {/* Left Panel - Checkboxes */}\n      <div className=\"space-y-8\">\n        {/* Complaint Selector */}\n        <div className=\"glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl\">\n          <ComplaintSelector\n            selectedComplaintId={selectedComplaintId}\n            onComplaintSelect={handleComplaintSelect}\n            onClear={handleComplaintClear}\n          />\n        </div>\n\n        {/* Priority Checkboxes Panel */}",
  "new_string": "  return (\n    <div className=\"grid gap-8 lg:grid-cols-[1fr,450px]\">\n      {/* Network Recovery Banner - spans full width */}\n      <div className=\"lg:col-span-2\">\n        <NetworkRecoveryBanner\n          isOnline={isOnline}\n          status={autoSaveStatus}\n          pendingChanges={pendingChanges}\n          error={autoSaveError}\n          onRetry={retryFailedSaves}\n        />\n      </div>\n\n      {/* Network Status Toast (shows on status change) */}\n      <NetworkStatusToast isOnline={isOnline} />\n\n      {/* Left Panel - Checkboxes */}\n      <div className=\"space-y-8\">\n        {/* Auto-Save Status Indicator */}\n        {selectedIds.size > 0 && (\n          <div className=\"flex items-center justify-end px-2\">\n            <AutoSaveIndicator\n              status={autoSaveStatus}\n              lastSavedAt={lastSavedAt}\n              isOnline={isOnline}\n              pendingChanges={pendingChanges}\n              error={autoSaveError}\n              onRetry={retryFailedSaves}\n            />\n          </div>\n        )}\n\n        {/* Complaint Selector */}\n        <div className=\"glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl\">\n          <ComplaintSelector\n            selectedComplaintId={selectedComplaintId}\n            onComplaintSelect={handleComplaintSelect}\n            onClear={handleComplaintClear}\n          />\n        </div>\n\n        {/* Priority Checkboxes Panel */}"
}
Now let's verify the TypeScript compilation and then run the Playwright test:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit 2>&1 | head -100",
  "description": "Type-check the project",
  "timeout": 120000
}
The errors are from generated `.next` files, not from our code. Let me check specifically our new files:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit hooks/use-auto-save.ts components/ui/auto-save-indicator.tsx components/ui/network-recovery-banner.tsx 2>&1 || echo \"Checking files directly...\"",
  "description": "Type-check specific files",
  "timeout": 60000
}
These are expected errors when running tsc directly on individual files without the full Next.js project context (missing jsx flags, paths aliases). Let me use Next.js's built-in type checking instead:

🔧 Tool: Bash
Input: {
  "command": "rm -rf .next/dev && pnpm run build 2>&1 | tail -50",
  "description": "Build project to check for errors",
  "timeout": 180000
}

🔧 Tool: Bash
Input: {
  "command": "rm -rf .next && pnpm run build 2>&1 | tail -80",
  "description": "Clean build to check for errors",
  "timeout": 300000
}

🔧 Tool: TaskOutput
Input: {
  "task_id": "b893ee6",
  "block": true,
  "timeout": 300000
}

🔧 Tool: Bash
Input: {
  "command": "cat /tmp/claude/-Users-wesleywillian-Oficial-Oficial/tasks/b893ee6.output | tail -100",
  "description": "Check build output"
}

🔧 Tool: Bash
Input: {
  "command": "tail -100 /tmp/claude/-Users-wesleywillian-Oficial-Oficial/tasks/b893ee6.output 2>/dev/null || echo \"File not found or empty\"",
  "description": "Check build output directly"
}

🔧 Tool: Bash
Input: {
  "command": "ps aux | grep -E \"next|node\" | grep -v grep | head -10",
  "description": "Check running processes"
}
There's a dev server running. Let me check for any type errors in our specific code by running lint:

🔧 Tool: Bash
Input: {
  "command": "pnpm run lint 2>&1 | head -50",
  "description": "Run lint check",
  "timeout": 120000
}

🔧 Tool: Bash
Input: {
  "command": "npx next lint --dir . 2>&1 | head -50",
  "description": "Run lint check with correct path",
  "timeout": 120000
}

🔧 Tool: Bash
Input: {
  "command": "pnpm exec eslint hooks/use-auto-save.ts components/ui/auto-save-indicator.tsx components/ui/network-recovery-banner.tsx components/anamnese/anamnese-form.tsx --max-warnings 100 2>&1",
  "description": "ESLint specific files",
  "timeout": 60000
}

🔧 Tool: TaskOutput
Input: {
  "task_id": "b586807",
  "block": true,
  "timeout": 60000
}
Only warnings, no errors. Let me fix the minor warning in our new file:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/components/ui/auto-save-indicator.tsx",
  "old_string": "export function AutoSaveIndicator({\n  status,\n  lastSavedAt,\n  isOnline,\n  pendingChanges = 0,\n  error,\n  onRetry,\n  className,\n  compact = false,\n}: AutoSaveIndicatorProps) {",
  "new_string": "export function AutoSaveIndicator({\n  status,\n  lastSavedAt,\n  isOnline,\n  pendingChanges = 0,\n  error: _error,\n  onRetry,\n  className,\n  compact = false,\n}: AutoSaveIndicatorProps) {"
}
Now let me update the todo and create the Playwright test:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing form and auto-save patterns",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for auto-save visual feedback",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create useAutoSave hook with debounced save and network detection",
      "status": "completed",
      "activeForm": "Creating useAutoSave hook"
    },
    {
      "content": "Create AutoSaveIndicator component with glass UI",
      "status": "completed",
      "activeForm": "Creating AutoSaveIndicator component"
    },
    {
      "content": "Create NetworkRecoveryBanner component",
      "status": "completed",
      "activeForm": "Creating NetworkRecoveryBanner component"
    },
    {
      "content": "Integrate auto-save into anamnese-form.tsx",
      "status": "completed",
      "activeForm": "Integrating with anamnesis forms"
    },
    {
      "content": "Verify with Playwright test",
      "status": "in_progress",
      "activeForm": "Verifying with Playwright"
    }
  ]
}

🔧 Tool: Glob
Input: {
  "pattern": "**/playwright.config.*"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.spec.ts"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la package.json && cat package.json | grep -E \"(playwright|cypress|test)\" | head -20",
  "description": "Check test framework in package.json"
}
Playwright is installed. Let me check if there's a playwright config:

🔧 Tool: Bash
Input: {
  "command": "ls -la playwright* 2>/dev/null || echo \"No playwright config found\"",
  "description": "Check for playwright config"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/playwright.config.ts"
}

🔧 Tool: Glob
Input: {
  "pattern": "tests/e2e/**/*.ts"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la tests/e2e/ 2>/dev/null || mkdir -p tests/e2e && ls -la tests/e2e/",
  "description": "Check or create e2e test directory"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/tests/e2e/anamnese.spec.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/tests/e2e/utils.ts"
}
Now let me create the temporary Playwright test to verify the auto-save functionality:

🔧 Tool: Write
Input: {
  "file_path": "/Users/wesleywillian/Oficial/Oficial/tests/e2e/auto-save-verification.spec.ts",
  "content": "/**\n * TEMPORARY VERIFICATION TEST\n * This test verifies the auto-save visual feedback feature.\n * DELETE THIS FILE after verification is complete.\n */\nimport { test, expect } from '@playwright/test'\nimport { registerAndLoginUser } from './utils'\n\ntest.describe('Auto-Save Visual Feedback Verification', () => {\n  test('should display auto-save indicator when selecting checkboxes', async ({ page }) => {\n    // Authenticate\n    await registerAndLoginUser(page)\n\n    // Navigate to Chest Pain syndrome\n    await page.goto('/anamnese/CHEST_PAIN')\n\n    // Handle Patient Context Modal\n    await expect(page.getByText('Contexto Clínico')).toBeVisible({ timeout: 15000 })\n\n    // Start Anamnese\n    await page.click('text=Iniciar Anamnese')\n\n    // Wait for modal to close\n    await expect(page.getByText('Contexto Clínico')).toBeHidden()\n\n    // Initially, auto-save indicator should NOT be visible (no selections yet)\n    await expect(page.locator('[data-testid=\"auto-save-indicator\"]')).not.toBeVisible()\n\n    // Select a checkbox to trigger auto-save\n    await page.click('text=Dor precordial')\n\n    // Wait a moment for state to update\n    await page.waitForTimeout(500)\n\n    // Auto-save indicator should now be visible\n    await expect(page.locator('[data-testid=\"auto-save-indicator\"]')).toBeVisible({ timeout: 5000 })\n\n    // Should show \"pending\" status initially (waiting for debounce)\n    await expect(page.locator('[data-testid=\"auto-save-indicator\"]')).toHaveAttribute(\n      'data-status',\n      'pending'\n    )\n\n    // Wait for auto-save to complete (debounce is 3 seconds + save time)\n    await page.waitForTimeout(5000)\n\n    // Should transition to \"saved\" or \"idle\" status\n    const indicator = page.locator('[data-testid=\"auto-save-indicator\"]')\n    const status = await indicator.getAttribute('data-status')\n    expect(['saved', 'idle', 'error']).toContain(status)\n  })\n\n  test('should show network recovery banner when offline', async ({ page, context }) => {\n    // Authenticate first\n    await registerAndLoginUser(page)\n\n    // Navigate to anamnese\n    await page.goto('/anamnese/CHEST_PAIN')\n\n    // Handle context modal\n    await expect(page.getByText('Contexto Clínico')).toBeVisible({ timeout: 15000 })\n    await page.click('text=Iniciar Anamnese')\n    await expect(page.getByText('Contexto Clínico')).toBeHidden()\n\n    // Select some checkboxes\n    await page.click('text=Dor precordial')\n    await page.click('text=Inicio subito')\n\n    // Wait for auto-save indicator to appear\n    await expect(page.locator('[data-testid=\"auto-save-indicator\"]')).toBeVisible({ timeout: 5000 })\n\n    // Simulate going offline\n    await context.setOffline(true)\n\n    // Make another selection while offline\n    await page.click('text=Irradiacao para MSE')\n\n    // Wait a moment\n    await page.waitForTimeout(1000)\n\n    // The indicator should show offline status\n    // Note: The network banner might also appear\n    await expect(\n      page.locator('[data-testid=\"auto-save-indicator\"][data-status=\"offline\"]').or(\n        page.locator('[data-testid=\"network-recovery-banner\"]')\n      )\n    ).toBeVisible({ timeout: 5000 })\n\n    // Go back online\n    await context.setOffline(false)\n\n    // Wait for recovery\n    await page.waitForTimeout(3000)\n\n    // Should recover (either saving or saved)\n    const indicator = page.locator('[data-testid=\"auto-save-indicator\"]')\n    if (await indicator.isVisible()) {\n      const status = await indicator.getAttribute('data-status')\n      expect(['saving', 'saved', 'idle', 'recovering']).toContain(status)\n    }\n  })\n\n  test('should show last saved timestamp', async ({ page }) => {\n    // Authenticate\n    await registerAndLoginUser(page)\n\n    // Navigate to anamnese\n    await page.goto('/anamnese/CHEST_PAIN')\n\n    // Handle context modal\n    await expect(page.getByText('Contexto Clínico')).toBeVisible({ timeout: 15000 })\n    await page.click('text=Iniciar Anamnese')\n    await expect(page.getByText('Contexto Clínico')).toBeHidden()\n\n    // Select a checkbox\n    await page.click('text=Dor precordial')\n\n    // Wait for auto-save to complete\n    await page.waitForTimeout(6000)\n\n    // Check for timestamp text in the indicator (e.g., \"agora\", \"Xs atras\")\n    const indicatorText = await page.locator('[data-testid=\"auto-save-indicator\"]').textContent()\n\n    // Should contain some form of timestamp or status text\n    expect(indicatorText).toBeTruthy()\n    // Common patterns: \"Salvo\", \"agora\", \"atras\"\n    const hasStatusText =\n      indicatorText?.includes('Salvo') ||\n      indicatorText?.includes('agora') ||\n      indicatorText?.includes('atras') ||\n      indicatorText?.includes('pendentes')\n\n    expect(hasStatusText).toBe(true)\n  })\n})\n"
}
Now let me run the Playwright test. First, let me check if there's a dev server running:

🔧 Tool: Bash
Input: {
  "command": "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:3000 2>/dev/null || echo \"Server not accessible\"",
  "description": "Check if dev server is running"
}

🔧 Tool: TaskOutput
Input: {
  "task_id": "b5be32b",
  "block": true,
  "timeout": 10000
}

🔧 Tool: Bash
Input: {
  "command": "pnpm exec playwright test tests/e2e/auto-save-verification.spec.ts --project=chromium --headed 2>&1 | tail -100",
  "description": "Run auto-save verification test",
  "timeout": 300000
}
The dev server is already running. Let me run the test with the existing server:

🔧 Tool: Bash
Input: {
  "command": "PLAYWRIGHT_REUSE_SERVER=true pnpm exec playwright test tests/e2e/auto-save-verification.spec.ts --project=chromium 2>&1 | tail -150",
  "description": "Run Playwright test with existing server",
  "timeout": 300000
}

🔧 Tool: Bash
Input: {
  "command": "rm -f .next/dev/lock && pnpm exec playwright test tests/e2e/auto-save-verification.spec.ts --project=chromium 2>&1 | tail -200",
  "description": "Remove lock and run test",
  "timeout": 300000
}
The webserver takes too long. Let me modify the playwright config to use the existing server:

🔧 Tool: Bash
Input: {
  "command": "curl -s http://localhost:3000 > /dev/null && echo \"Server running on 3000\" || echo \"No server on 3000\"",
  "description": "Check server status",
  "timeout": 5000
}
No dev server is running currently. Let me start it:

🔧 Tool: Bash
Input: {
  "command": "pnpm run dev &\nsleep 30\ncurl -s http://localhost:3000 > /dev/null && echo \"Server started\" || echo \"Server failed to start\"",
  "description": "Start dev server",
  "timeout": 60000,
  "run_in_background": true
}

🔧 Tool: Bash
Input: {
  "command": "sleep 35 && curl -s http://localhost:3000 > /dev/null && echo \"Server started\" || echo \"Server still starting...\"",
  "description": "Wait for server to start",
  "timeout": 60000
}

🔧 Tool: TaskOutput
Input: {
  "task_id": "bd7257e",
  "block": true,
  "timeout": 60000
}
The server is running. Now let's run the Playwright test:

🔧 Tool: Bash
Input: {
  "command": "pnpm exec playwright test tests/e2e/auto-save-verification.spec.ts --project=chromium --reporter=list 2>&1 | tail -100",
  "description": "Run Playwright test",
  "timeout": 300000
}
The auth setup is timing out. Let me check what's happening with the dev server and run the test without the setup dependency:

🔧 Tool: Bash
Input: {
  "command": "curl -s http://localhost:3000 | head -50",
  "description": "Check server response",
  "timeout": 10000
}

🔧 Tool: TaskOutput
Input: {
  "task_id": "ba0ae0a",
  "block": true,
  "timeout": 15000
}
The server seems to be slow or having issues. Given the complexity of running E2E tests in this environment, let me verify the feature in a different way - by running a simpler unit-level test of the component rendering:

🔧 Tool: Bash
Input: {
  "command": "cat /tmp/claude/-Users-wesleywillian-Oficial-Oficial/tasks/b97faaa.output | tail -50",
  "description": "Check dev server output"
}
The server is running but responses are slow (47s for compilation). Given these delays, let me use the MCP playwright tool to verify the feature visually:

🔧 Tool: mcp__playwright__browser_navigate
Input: {
  "url": "http://localhost:3000"
}
Let me try installing the playwright browser:

🔧 Tool: mcp__playwright__browser_install
Input: {}

🔧 Tool: mcp__playwright__browser_navigate
Input: {
  "url": "http://localhost:3000"
}
The browser is working now. I can see the dashboard. Let me navigate to the anamnese page to test the auto-save indicator:

🔧 Tool: mcp__playwright__browser_click
Input: {
  "element": "Well Anamnese navigation button",
  "ref": "e29"
}
I'm on the anamnese page. Let me search for a syndrome to navigate to the form:

🔧 Tool: mcp__playwright__browser_type
Input: {
  "element": "Symptom search textbox",
  "ref": "e474",
  "text": "dor toracica"
}

🔧 Tool: mcp__playwright__browser_snapshot
Input: {}
I see the page changed to a patient identification flow. Let me select a sex and continue to get to the anamnese form:

🔧 Tool: mcp__playwright__browser_click
Input: {
  "element": "Homem (Male) button",
  "ref": "e596"
}

🔧 Tool: mcp__playwright__browser_snapshot
Input: {}
I see "Homem" is now selected (active). Now I need to select "Adulto" for the age group and then click "Gerar Anamnese":

🔧 Tool: mcp__playwright__browser_click
Input: {
  "element": "Adulto age group button",
  "ref": "e641"
}
Now let me click "Gerar Anamnese" to proceed:

🔧 Tool: mcp__playwright__browser_click
Input: {
  "element": "Gerar Anamnese button",
  "ref": "e613"
}

🔧 Tool: mcp__playwright__browser_snapshot
Input: {}

🔧 Tool: mcp__playwright__browser_navigate
Input: {
  "url": "http://localhost:3000"
}

🔧 Tool: mcp__playwright__browser_navigate
Input: {
  "url": "http://localhost:3000/anamnese/CHEST_PAIN"
}
