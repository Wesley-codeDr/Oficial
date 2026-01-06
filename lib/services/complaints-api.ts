import type { PaginatedResponse } from '@/types/api'
import type { ComplaintApiPayload, ComplaintListParams } from '@/lib/types/complaints-api'

const DEFAULT_LIMIT = 500

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

export async function fetchComplaints(
  params?: ComplaintListParams
): Promise<PaginatedResponse<ComplaintApiPayload>> {
  const query = buildQueryParams(params)
  const response = await fetch(`/api/complaints?${query.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch complaints')
  }

  return response.json()
}

export async function fetchComplaint(id: string): Promise<ComplaintApiPayload> {
  const response = await fetch(`/api/complaints/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch complaint')
  }

  return response.json()
}
