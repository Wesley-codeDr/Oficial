/**
 * Configurações para o hook useAutoSave
 * 
 * Este arquivo centraliza todas as constantes de configuração
 * relacionadas ao auto-save, permitindo fácil ajuste e manutenção.
 */

/**
 * Tempo de debounce padrão para auto-save em milissegundos
 * 
 * @description Tempo de espera após a última alteração antes de salvar
 * @default 2000ms (2 segundos)
 * 
 * @example
 * ```typescript
 * import { AUTO_SAVE_CONFIG } from '@/lib/config/auto-save'
 * const debounceMs = AUTO_SAVE_CONFIG.DEFAULT_DEBOUNCE_MS
 * ```
 */
export const DEFAULT_DEBOUNCE_MS = 2000

/**
 * Tempo de espera entre tentativas de recuperação em milissegundos
 * 
 * @description Tempo de espera após uma falha antes de tentar novamente
 * @default 5000ms (5 segundos)
 * 
 * @example
 * ```typescript
 * import { AUTO_SAVE_CONFIG } from '@/lib/config/auto-save'
 * const retryDelay = AUTO_SAVE_CONFIG.RECOVERY_RETRY_DELAY
 * ```
 */
export const RECOVERY_RETRY_DELAY = 5000

/**
 * Número máximo de tentativas de recuperação
 * 
 * @description Máximo de tentativas de recuperar saves falhados antes de desistir
 * @default 3
 * 
 * @example
 * ```typescript
 * import { AUTO_SAVE_CONFIG } from '@/lib/config/auto-save'
 * const maxAttempts = AUTO_SAVE_CONFIG.MAX_RECOVERY_ATTEMPTS
 * ```
 */
export const MAX_RECOVERY_ATTEMPTS = 3

/**
 * Tempo de exibição do status "saved" antes de voltar para "idle" em milissegundos
 * 
 * @description Tempo que o status "saved" fica visível antes de voltar para "idle"
 * @default 2000ms (2 segundos)
 * 
 * @example
 * ```typescript
 * import { AUTO_SAVE_CONFIG } from '@/lib/config/auto-save'
 * const savedStatusDuration = AUTO_SAVE_CONFIG.SAVED_STATUS_DURATION
 * ```
 */
export const SAVED_STATUS_DURATION = 2000

/**
 * Configuração completa para auto-save
 * 
 * @description Objeto contendo todas as configurações de auto-save
 * 
 * @example
 * ```typescript
 * import { AUTO_SAVE_CONFIG } from '@/lib/config/auto-save'
 * const { DEFAULT_DEBOUNCE_MS, RECOVERY_RETRY_DELAY, MAX_RECOVERY_ATTEMPTS } = AUTO_SAVE_CONFIG
 * ```
 */
export const AUTO_SAVE_CONFIG = {
  DEFAULT_DEBOUNCE_MS,
  RECOVERY_RETRY_DELAY,
  MAX_RECOVERY_ATTEMPTS,
  SAVED_STATUS_DURATION,
} as const
