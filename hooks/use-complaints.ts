'use client'

import { useQuery } from '@tanstack/react-query'
import type { ComplaintApiPayload, ComplaintListParams } from '@/lib/types/complaints-api'
import type { PaginatedResponse } from '@/types/api'
import { fetchComplaint, fetchComplaints } from '@/lib/services/complaints-api'

const complaintsQueryKey = (params?: ComplaintListParams) => [
  'complaints',
  params?.group ?? null,
  params?.riskLevel ?? null,
  params?.isActive ?? null,
  params?.search ?? null,
  params?.limit ?? null,
  params?.offset ?? null,
  params?.updatedSince ?? null,
] as const

export function useComplaints(params?: ComplaintListParams) {
  return useQuery<PaginatedResponse<ComplaintApiPayload>>({
    queryKey: complaintsQueryKey(params),
    queryFn: () => fetchComplaints(params),
  })
}

export function useComplaint(id?: string) {
  return useQuery<ComplaintApiPayload>({
    queryKey: ['complaint', id],
    queryFn: () => fetchComplaint(id ?? ''),
    enabled: Boolean(id),
  })
}
