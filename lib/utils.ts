import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS usando clsx e tailwind-merge
 * Útil para mesclar classes condicionais e de utilitários do Tailwind
 * 
 * @param inputs - Array de valores de classe (strings, objetos, arrays)
 * @returns String de classes CSS combinadas
 * 
 * @example
 * ```typescript
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'text-white')
 * // Retorna: 'px-4 py-2 bg-blue-500 text-white' quando isActive é true
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gera um UUID v4 usando a API nativa crypto.randomUUID()
 * Esta função gera IDs únicos e criptograficamente seguros
 * 
 * @returns UUID v4 no formato 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 * 
 * @example
 * ```typescript
 * const id = generateUUID() // '550e8400-e29b-41d4-a716-446655440000'
 * ```
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Gera um ID único com prefixo usando UUID
 * Útil para gerar IDs com prefixo específico (ex: 'task-', 'note-', etc.)
 * 
 * @param prefix - Prefixo a ser adicionado antes do UUID
 * @returns ID único no formato '{prefix}{uuid}'
 * 
 * @example
 * ```typescript
 * const taskId = generateIdWithPrefix('task-') // 'task-550e8400-e29b-41d4-a716-446655440000'
 * const noteId = generateIdWithPrefix('note-') // 'note-550e8400-e29b-41d4-a716-446655440000'
 * ```
 */
export function generateIdWithPrefix(prefix: string): string {
  return `${prefix}${generateUUID()}`;
}

/**
 * Formata a distância de tempo entre uma data e o momento atual
 * Retorna uma string em português brasileiro descrevendo o tempo decorrido
 * 
 * @param date - Data a ser comparada com o momento atual
 * @returns String formatada em português descrevendo o tempo decorrido
 * 
 * @example
 * ```typescript
 * const now = new Date()
 * const oneHourAgo = new Date(now.getTime() - 3600000)
 * formatDistanceToNow(oneHourAgo) // 'ha 1 hora'
 * 
 * const twoDaysAgo = new Date(now.getTime() - 172800000)
 * formatDistanceToNow(twoDaysAgo) // 'ha 2 dias'
 * 
 * const justNow = new Date()
 * formatDistanceToNow(justNow) // 'agora mesmo'
 * ```
 */
export function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'agora mesmo'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `ha ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `ha ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `ha ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `ha ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `ha ${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''}`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `ha ${diffInYears} ano${diffInYears > 1 ? 's' : ''}`
}






