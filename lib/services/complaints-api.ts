import type { PaginatedResponse } from '@/types/api'
import type { ComplaintApiPayload, ComplaintListParams } from '@/lib/types/complaints-api'

const DEFAULT_LIMIT = 500

/**
 * Cache em memória para requisições de API
 * Armazena respostas recentes para reduzir requisições duplicadas
 */
const cache = new Map<string, { data: any; timestamp: number }>()

/**
 * Tempo de expiração do cache em milissegundos (5 minutos)
 */
const CACHE_TTL = 5 * 60 * 1000

/**
 * Gera uma chave de cache única baseada nos parâmetros da requisição
 * 
 * @param endpoint - Endpoint da API (ex: 'complaints', 'complaints/123')
 * @param params - Parâmetros da requisição
 * @returns Chave de cache única
 */
function getCacheKey(endpoint: string, params?: any): string {
  const paramsStr = params ? JSON.stringify(params) : ''
  return `${endpoint}:${paramsStr}`
}

/**
 * Verifica se uma entrada de cache ainda é válida
 * 
 * @param entry - Entrada de cache
 * @returns true se a entrada ainda é válida, false caso contrário
 */
function isCacheValid(entry: { data: any; timestamp: number }): boolean {
  return Date.now() - entry.timestamp < CACHE_TTL
}

/**
 * Constrói parâmetros de consulta URL a partir dos parâmetros fornecidos
 * 
 * @param params - Parâmetros opcionais para filtrar a lista de queixas
 * @returns URLSearchParams com os parâmetros configurados
 * 
 * @example
 * ```typescript
 * const params = buildQueryParams({ limit: 10, group: 'cardiovascular' })
 * // Retorna URLSearchParams com limit=10 e group=cardiovascular
 * ```
 */
function buildQueryParams(params?: ComplaintListParams) {
  const searchParams = new URLSearchParams()
  const merged = { limit: DEFAULT_LIMIT, offset: 0, ...params }

  if (merged.limit !== undefined) searchParams.set('limit', String(merged.limit))
  if (merged.offset !== undefined) searchParams.set('offset', String(merged.offset))
  if (merged.group) searchParams.set('group', merged.group)
  if (merged.riskLevel) searchParams.set('riskLevel', merged.riskLevel)
  if (typeof merged.isActive === 'boolean') {
    searchParams.set('isActive', String(merged.isActive))
  }
  if (merged.search) searchParams.set('search', merged.search)
  if (merged.updatedSince) searchParams.set('updatedSince', merged.updatedSince)

  return searchParams
}

/**
 * Busca uma lista de queixas médicas com filtros opcionais
 * Implementa cache em memória para reduzir requisições duplicadas
 * 
 * @param params - Parâmetros opcionais para filtrar a lista de queixas
 * @param params.limit - Número máximo de resultados a retornar (padrão: 500)
 * @param params.offset - Número de resultados a pular para paginação
 * @param params.group - Filtro por código do grupo de queixas
 * @param params.riskLevel - Filtro por nível de risco ('high', 'medium', 'low')
 * @param params.isActive - Filtro por status ativo
 * @param params.search - Termo de busca para filtrar por texto
 * @param params.updatedSince - Data ISO para filtrar queixas atualizadas após
 * @param params.useCache - Se true, usa cache (padrão: true)
 * @returns Promise com a resposta paginada contendo as queixas
 * 
 * @throws {Error} Se a requisição falhar
 * 
 * @example
 * ```typescript
 * const result = await fetchComplaints({ limit: 10, group: 'cardiovascular' })
 * console.log(result.data) // Array de queixas
 * ```
 */
export async function fetchComplaints(
  params?: ComplaintListParams & { useCache?: boolean }
): Promise<PaginatedResponse<ComplaintApiPayload>> {
  const useCache = params?.useCache !== false // Padrão é true
  const cacheKey = getCacheKey('complaints', params)
  
  // Verifica se há um cache válido
  if (useCache && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!
    if (isCacheValid(cached)) {
      return cached.data
    } else {
      // Remove cache expirado
      cache.delete(cacheKey)
    }
  }
  
  const query = buildQueryParams(params)
  const response = await fetch(`/api/complaints?${query.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch complaints')
  }

  const data = await response.json()
  
  // Armazena no cache
  if (useCache) {
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })
  }
  
  return data
}

/**
 * Busca uma queixa médica específica pelo ID
 * Implementa cache em memória para reduzir requisições duplicadas
 * 
 * @param id - ID único da queixa a ser buscada
 * @param useCache - Se true, usa cache (padrão: true)
 * @returns Promise com os dados da queixa solicitada
 * 
 * @throws {Error} Se a requisição falhar ou a queixa não for encontrada
 * 
 * @example
 * ```typescript
 * const complaint = await fetchComplaint('complaint-123')
 * console.log(complaint.title) // Título da queixa
 * ```
 */
export async function fetchComplaint(
  id: string,
  useCache: boolean = true
): Promise<ComplaintApiPayload> {
  const cacheKey = getCacheKey(`complaints/${id}`)
  
  // Verifica se há um cache válido
  if (useCache && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!
    if (isCacheValid(cached)) {
      return cached.data
    } else {
      // Remove cache expirado
      cache.delete(cacheKey)
    }
  }
  
  const response = await fetch(`/api/complaints/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch complaint')
  }

  const data = await response.json()
  
  // Armazena no cache
  if (useCache) {
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })
  }
  
  return data
}

/**
 * Limpa todo o cache de requisições de API
 * Útil para forçar recarregamento de dados ou quando os dados mudaram
 * 
 * @example
 * ```typescript
 * clearComplaintsCache()
 * // Próxima requisição buscará dados atualizados
 * ```
 */
export function clearComplaintsCache(): void {
  cache.clear()
}
