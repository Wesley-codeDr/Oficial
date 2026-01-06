import type { chief_complaints, chief_complaint_groups } from '@prisma/client'
import type {
  Complaint,
  ComplaintExtendedContent,
  ComplaintExtendedContentEBM,
} from '../types/medical'
import {
  ComplaintAdditionalDataSchema,
  type ComplaintAdditionalData,
} from '../validation/complaints'

export type DbComplaintWithGroup = chief_complaints & {
  chief_complaint_groups?: chief_complaint_groups | null
}

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

export function parseAdditionalData(value: unknown): ComplaintAdditionalData | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const result = ComplaintAdditionalDataSchema.safeParse(value)
  if (!result.success) {
    return null
  }

  return result.data
}

export function mergeAdditionalData(
  current: ComplaintAdditionalData | null | undefined,
  update: ComplaintAdditionalData | undefined
): ComplaintAdditionalData | null {
  if (!current && !update) {
    return null
  }

  if (!update) {
    return current || null
  }

  return {
    metadata: update.metadata
      ? { ...(current?.metadata || {}), ...update.metadata }
      : current?.metadata,
    extendedContent: update.extendedContent
      ? { ...(current?.extendedContent || {}), ...update.extendedContent }
      : current?.extendedContent,
    extendedContentEBM: update.extendedContentEBM
      ? { ...(current?.extendedContentEBM || {}), ...update.extendedContentEBM }
      : current?.extendedContentEBM,
    sync: update.sync
      ? { ...(current?.sync || {}), ...update.sync }
      : current?.sync,
  }
}

function buildExtendedContentFromEBM(
  ebm?: Partial<ComplaintExtendedContentEBM>
): ComplaintExtendedContent | undefined {
  if (!ebm) {
    return undefined
  }

  return {
    redFlags: ebm.redFlags?.map((flag) => flag.description) || [],
    diagnosticoDiferencial:
      ebm.diagnosticoDiferencial?.map((diag) => diag.condition) || [],
    condutaInicial: ebm.condutaInicial || '',
    calculadoras: ebm.calculadoras || [],
    rawMarkdown: ebm.rawMarkdown,
  }
}

export function mapDbComplaintToApiPayload(
  record: DbComplaintWithGroup
): ComplaintApiPayload {
  const additionalData = parseAdditionalData(record.additional_data)
  const metadata = additionalData?.metadata || {}
  const group = record.chief_complaint_groups
  const groupCode = group?.code || ''
  const complaintId = record.code || record.id

  const extendedContent =
    additionalData?.extendedContent ||
    buildExtendedContentFromEBM(additionalData?.extendedContentEBM)

  return {
    id: complaintId,
    group: groupCode,
    title: record.name_pt,
    subtitle: metadata.subtitle || record.definition || '',
    ageTargets: metadata.ageTargets || ['adult'],
    riskLevel: metadata.riskLevel || (record.is_high_acuity ? 'high' : 'medium'),
    isTopForAdult: metadata.isTopForAdult ?? true,
    isTopForChild: metadata.isTopForChild ?? false,
    isFastTrack: metadata.isFastTrack ?? record.is_time_sensitive ?? false,
    chips: metadata.chips || [],
    searchTerms: metadata.searchTerms || [],
    synonyms: record.synonyms || [],
    relatedSymptoms: metadata.relatedSymptoms || [],
    bodySystem: metadata.bodySystem || [],
    severity: metadata.severity ?? 1,
    commonMisconceptions: metadata.commonMisconceptions || [],
    icd10Codes: record.icd10_codes || [],
    searchWeight: metadata.searchWeight ?? 1,
    extendedContent,
    additionalData,
    extendedContentEBM: additionalData?.extendedContentEBM,
    sync: additionalData?.sync,
    db: {
      id: record.id,
      code: record.code,
      groupId: record.group_id,
      groupCode,
      groupName: group?.name_pt || '',
      groupNameEn: group?.name_en ?? null,
      isActive: record.is_active,
      isHighAcuity: record.is_high_acuity,
      isTimeSensitive: record.is_time_sensitive,
      requiresIsolation: record.requires_isolation,
      orderIndex: record.order_index,
      createdAt: record.created_at.toISOString(),
      updatedAt: record.updated_at.toISOString(),
    },
  }
}
