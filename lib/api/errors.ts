import type { ApiError, FieldError } from '@/types/api'

/**
 * Create a standardized API error response
 */
export function createApiError(
  code: string,
  message: string,
  errors?: FieldError[]
): ApiError {
  return {
    code,
    message,
    ...(errors && errors.length > 0 && { errors }),
  }
}

/**
 * Create a validation error response
 */
export function createValidationError(
  message: string,
  errors: Array<{ field?: string; message: string }>
): ApiError {
  return createApiError(
    'VALIDATION_ERROR',
    message,
    errors.map((e) => ({
      field: e.field || 'general',
      message: e.message,
    }))
  )
}

/**
 * Create a minimum data validation error response
 */
export function createMinimumDataError(
  errors: string[],
  warnings?: string[]
): ApiError {
  return createApiError('MINIMUM_DATA_REQUIRED', errors[0] || 'Dados insuficientes', [
    {
      field: 'checkedItems',
      message: errors.join('; '),
    },
    ...(warnings || []).map((w) => ({
      field: 'warnings',
      message: w,
    })),
  ])
}



