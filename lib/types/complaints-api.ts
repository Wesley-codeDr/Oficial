import type { Complaint, ComplaintExtendedContentEBM } from '@/lib/types/medical'
import type { ComplaintAdditionalData } from '@/lib/validation/complaints'

export interface ComplaintDbMeta {
  id: string
  code: string
  groupId: string
  groupCode: string
  groupName: string
  groupNameEn?: string | null
  isActive: boolean
  isHighAcuity: boolean
  isTimeSensitive: boolean
  requiresIsolation: boolean
  orderIndex: number
  createdAt: string
  updatedAt: string
}

export interface ComplaintApiPayload extends Complaint {
  db: ComplaintDbMeta
  additionalData?: ComplaintAdditionalData | null
  extendedContentEBM?: Partial<ComplaintExtendedContentEBM>
  sync?: ComplaintAdditionalData['sync']
}

export interface ComplaintListParams {
  limit?: number
  offset?: number
  group?: string
  riskLevel?: 'high' | 'medium' | 'low'
  isActive?: boolean
  search?: string
  updatedSince?: string
}
