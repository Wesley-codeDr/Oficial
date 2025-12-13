// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

export interface ApiError {
  code: string
  message: string
  errors?: FieldError[]
  retryAfter?: number
  meta?: Record<string, unknown>
}

export interface FieldError {
  field: string
  message: string
}

// API Request types
export interface PaginationParams {
  limit?: number
  offset?: number
}

// Anamnese API types
export interface GenerateAnamneseRequest {
  syndromeId: string
  checkedItems: string[]
  outputMode?: 'SUMMARY' | 'DETAILED'
}

export interface CreateSessionRequest {
  syndromeId: string
}

export interface UpdateSessionRequest {
  checkedItems?: string[]
  outputMode?: 'SUMMARY' | 'DETAILED'
}

// Chat API types
export interface CreateConversationRequest {
  sessionId?: string
}

export interface SendMessageRequest {
  content: string
}

// SSE Event types for streaming
export interface StreamEvent {
  type: 'token' | 'citation' | 'done' | 'error'
  content?: string
  citation?: {
    author: string
    title: string
    journal: string
    year: number
    pmid?: string
    doi?: string
  }
  message?: object
  error?: string
}
