/**
 * Chief Complaint Types
 *
 * Type definitions for the Chief Complaints ontology system.
 * Includes types for groups, complaints, tags, sessions, and search.
 */

import type {
  ChiefComplaintGroup,
  ChiefComplaint,
  ChiefComplaintTag,
  ChiefComplaintSession,
  TagCategory,
  Syndrome,
} from '@prisma/client'

// Re-export Prisma types
export type {
  ChiefComplaintGroup,
  ChiefComplaint,
  ChiefComplaintTag,
  ChiefComplaintSession,
}

export { TagCategory }

// ============================================
// EXTENDED TYPES WITH RELATIONS
// ============================================

export type ChiefComplaintGroupWithCount = ChiefComplaintGroup & {
  _count: { complaints: number }
}

export type ChiefComplaintGroupWithComplaints = ChiefComplaintGroup & {
  complaints: ChiefComplaint[]
  _count: { complaints: number }
}

export type ChiefComplaintWithTags = ChiefComplaint & {
  tags: ChiefComplaintTag[]
}

export type ChiefComplaintWithRelations = ChiefComplaint & {
  group: ChiefComplaintGroup
  tags: ChiefComplaintTag[]
  syndrome?: Syndrome | null
}

export type ChiefComplaintSessionWithRelations = ChiefComplaintSession & {
  chiefComplaint: ChiefComplaintWithRelations
}

// ============================================
// TAG TYPE ALIASES
// ============================================

export type AgeTag = 'pediatric' | 'adult' | 'elderly' | 'neonate' | 'obstetric'

export type SystemTag =
  | 'cardiovascular'
  | 'respiratory'
  | 'neurological'
  | 'gastrointestinal'
  | 'genitourinary'
  | 'musculoskeletal'
  | 'infectious'
  | 'metabolic'
  | 'dermatological'
  | 'ophthalmological'
  | 'otorhinolaryngological'
  | 'psychiatric'
  | 'toxicological'
  | 'traumatic'
  | 'environmental'

export type SyndromeTag =
  | 'acute_coronary_syndrome'
  | 'stroke'
  | 'sepsis'
  | 'shock'
  | 'respiratory_failure'
  | 'acute_abdomen'
  | 'diabetic_emergency'
  | 'psychiatric_emergency'
  | 'trauma'

export type RiskTag =
  | 'high_acuity'
  | 'time_sensitive'
  | 'potentially_life_threatening'
  | 'requires_isolation'

export type ContextTag =
  | 'post_surgical'
  | 'oncological'
  | 'immunocompromised'
  | 'pregnancy'
  | 'dialysis'
  | 'transplant'

export type TagValue = AgeTag | SystemTag | SyndromeTag | RiskTag | ContextTag

// ============================================
// SEARCH AND FILTER TYPES
// ============================================

export interface TagFilter {
  category: TagCategory
  values: string[]
}

export interface ChiefComplaintSearchParams {
  groupCode?: string
  tags?: TagFilter[]
  search?: string
  isTimeSensitive?: boolean
  isHighAcuity?: boolean
  requiresIsolation?: boolean
  limit?: number
  offset?: number
}

export interface ChiefComplaintSearchResult {
  complaints: ChiefComplaintWithTags[]
  total: number
  hasMore: boolean
}

// ============================================
// PATIENT CONTEXT
// ============================================

export interface PatientContext {
  ageGroup: AgeTag
  specialConditions: ContextTag[]
}

// ============================================
// CLINICAL FLOW (STATE MACHINE)
// ============================================

export interface ClinicalFlowOption {
  label: string
  value: string
  nextState: string
}

export interface ClinicalFlowState {
  id: string
  name: string
  type: 'question' | 'action' | 'calculator' | 'recommendation' | 'end'
  content: {
    question?: string
    options?: ClinicalFlowOption[]
    calculatorId?: string
    action?: string
    recommendation?: string
    severity?: 'info' | 'warning' | 'critical'
  }
}

export interface ClinicalFlow {
  id: string
  name: string
  version: string
  initialState: string
  states: Record<string, ClinicalFlowState>
}

// ============================================
// GROUP METADATA
// ============================================

export interface GroupMetadata {
  code: string
  namePt: string
  nameEn: string
  icon: string
  color: string
  description: string
}

// ============================================
// SEED DATA TYPES
// ============================================

export interface ChiefComplaintTagSeed {
  category: TagCategory
  value: string
}

export interface ChiefComplaintSeed {
  code: string
  groupCode: string
  namePt: string
  nameEn?: string
  definition?: string
  synonyms: string[]
  icd10Codes: string[]
  isTimeSensitive: boolean
  isHighAcuity: boolean
  requiresIsolation?: boolean
  tags: ChiefComplaintTagSeed[]
  defaultCalculatorId?: string
  legacySyndromeCode?: string
  clinicalFlow?: ClinicalFlow
}
