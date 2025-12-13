/**
 * Chief Complaint Constants
 *
 * Definitions for 18 macro groups and tag ontology.
 * Based on emergency medicine triage systems (CTAS/CEDIS, Manchester).
 */

import type {
  GroupMetadata,
  AgeTag,
  SystemTag,
  SyndromeTag,
  RiskTag,
  ContextTag,
} from '@/types/chief-complaint'

// ============================================
// CHIEF COMPLAINT GROUPS (18)
// ============================================

export const CHIEF_COMPLAINT_GROUPS: GroupMetadata[] = [
  {
    code: 'CV',
    namePt: 'Cardiovascular',
    nameEn: 'Cardiovascular',
    icon: 'heart',
    color: '#ef4444',
    description: 'Dor toracica, palpitacoes, sincope, edema',
  },
  {
    code: 'RC',
    namePt: 'Respiratorio',
    nameEn: 'Respiratory',
    icon: 'wind',
    color: '#3b82f6',
    description: 'Dispneia, tosse, hemoptise, dor pleuritica',
  },
  {
    code: 'NC',
    namePt: 'Neurologico',
    nameEn: 'Neurological',
    icon: 'brain',
    color: '#8b5cf6',
    description: 'Cefaleia, deficit focal, alteracao consciencia, convulsao',
  },
  {
    code: 'GI',
    namePt: 'Gastrointestinal',
    nameEn: 'Gastrointestinal',
    icon: 'activity',
    color: '#f59e0b',
    description: 'Dor abdominal, nauseas, vomitos, sangramento digestivo',
  },
  {
    code: 'GU',
    namePt: 'Geniturinario',
    nameEn: 'Genitourinary',
    icon: 'droplets',
    color: '#06b6d4',
    description: 'Disuria, hematuria, dor lombar, retencao urinaria',
  },
  {
    code: 'MSK',
    namePt: 'Musculoesqueletico',
    nameEn: 'Musculoskeletal',
    icon: 'bone',
    color: '#64748b',
    description: 'Dor articular, lombalgia, trauma de extremidades',
  },
  {
    code: 'INF',
    namePt: 'Infeccioso',
    nameEn: 'Infectious',
    icon: 'thermometer',
    color: '#dc2626',
    description: 'Febre, sepse, infeccoes localizadas',
  },
  {
    code: 'MET',
    namePt: 'Metabolico',
    nameEn: 'Metabolic',
    icon: 'flask-conical',
    color: '#16a34a',
    description: 'Diabetes descompensado, disturbios eletroliticos, tireoide',
  },
  {
    code: 'DERM',
    namePt: 'Dermatologico',
    nameEn: 'Dermatological',
    icon: 'scan',
    color: '#ec4899',
    description: 'Rash, lesoes cutaneas, celulite, urticaria',
  },
  {
    code: 'OFT',
    namePt: 'Oftalmologico',
    nameEn: 'Ophthalmological',
    icon: 'eye',
    color: '#0ea5e9',
    description: 'Dor ocular, perda visual, olho vermelho, trauma ocular',
  },
  {
    code: 'ORL',
    namePt: 'ORL / Odontologico',
    nameEn: 'ENT / Dental',
    icon: 'ear',
    color: '#f97316',
    description: 'Odinofagia, epistaxe, otalgia, dor dental',
  },
  {
    code: 'OBG',
    namePt: 'Obstetrico / Ginecologico',
    nameEn: 'OB/GYN',
    icon: 'baby',
    color: '#e879f9',
    description: 'Gestacao, sangramento vaginal, dor pelvica',
  },
  {
    code: 'PED',
    namePt: 'Pediatrico',
    nameEn: 'Pediatric',
    icon: 'baby',
    color: '#4ade80',
    description: 'Emergencias pediatricas especificas',
  },
  {
    code: 'PSI',
    namePt: 'Psiquiatrico',
    nameEn: 'Psychiatric',
    icon: 'brain',
    color: '#a855f7',
    description: 'Agitacao, ideacao suicida, psicose, ansiedade',
  },
  {
    code: 'TOX',
    namePt: 'Toxicologico',
    nameEn: 'Toxicological',
    icon: 'skull',
    color: '#eab308',
    description: 'Intoxicacoes, overdose, envenenamento',
  },
  {
    code: 'TR',
    namePt: 'Trauma',
    nameEn: 'Trauma',
    icon: 'alert-triangle',
    color: '#f43f5e',
    description: 'Politrauma, TCE, lesoes penetrantes, quedas',
  },
  {
    code: 'ENV',
    namePt: 'Ambiental',
    nameEn: 'Environmental',
    icon: 'sun',
    color: '#84cc16',
    description: 'Picadas, queimaduras, hipotermia, afogamento',
  },
  {
    code: 'GEN',
    namePt: 'Geral',
    nameEn: 'General',
    icon: 'clipboard-list',
    color: '#6b7280',
    description: 'Sintomas inespecificos, mal-estar, fraqueza',
  },
]

// ============================================
// TAG ARRAYS
// ============================================

export const AGE_TAGS: AgeTag[] = [
  'pediatric',
  'adult',
  'elderly',
  'neonate',
  'obstetric',
]

export const SYSTEM_TAGS: SystemTag[] = [
  'cardiovascular',
  'respiratory',
  'neurological',
  'gastrointestinal',
  'genitourinary',
  'musculoskeletal',
  'infectious',
  'metabolic',
  'dermatological',
  'ophthalmological',
  'otorhinolaryngological',
  'psychiatric',
  'toxicological',
  'traumatic',
  'environmental',
]

export const SYNDROME_TAGS: SyndromeTag[] = [
  'acute_coronary_syndrome',
  'stroke',
  'sepsis',
  'shock',
  'respiratory_failure',
  'acute_abdomen',
  'diabetic_emergency',
  'psychiatric_emergency',
  'trauma',
]

export const RISK_TAGS: RiskTag[] = [
  'high_acuity',
  'time_sensitive',
  'potentially_life_threatening',
  'requires_isolation',
]

export const CONTEXT_TAGS: ContextTag[] = [
  'post_surgical',
  'oncological',
  'immunocompromised',
  'pregnancy',
  'dialysis',
  'transplant',
]

// ============================================
// TAG LABELS (PORTUGUESE)
// ============================================

export const TAG_LABELS: Record<string, string> = {
  // Age
  pediatric: 'Pediatrico',
  adult: 'Adulto',
  elderly: 'Idoso',
  neonate: 'Neonatal',
  obstetric: 'Obstetrico',

  // System
  cardiovascular: 'Cardiovascular',
  respiratory: 'Respiratorio',
  neurological: 'Neurologico',
  gastrointestinal: 'Gastrointestinal',
  genitourinary: 'Geniturinario',
  musculoskeletal: 'Musculoesqueletico',
  infectious: 'Infeccioso',
  metabolic: 'Metabolico',
  dermatological: 'Dermatologico',
  ophthalmological: 'Oftalmologico',
  otorhinolaryngological: 'ORL',
  psychiatric: 'Psiquiatrico',
  toxicological: 'Toxicologico',
  traumatic: 'Traumatico',
  environmental: 'Ambiental',

  // Syndrome
  acute_coronary_syndrome: 'Sindrome Coronariana Aguda',
  stroke: 'AVC',
  sepsis: 'Sepse',
  shock: 'Choque',
  respiratory_failure: 'Insuficiencia Respiratoria',
  acute_abdomen: 'Abdome Agudo',
  diabetic_emergency: 'Emergencia Diabetica',
  psychiatric_emergency: 'Emergencia Psiquiatrica',
  trauma: 'Trauma',

  // Risk
  high_acuity: 'Alta Acuidade',
  time_sensitive: 'Tempo-Dependente',
  potentially_life_threatening: 'Potencialmente Fatal',
  requires_isolation: 'Requer Isolamento',

  // Context
  post_surgical: 'Pos-Cirurgico',
  oncological: 'Oncologico',
  immunocompromised: 'Imunocomprometido',
  pregnancy: 'Gestante',
  dialysis: 'Dialitico',
  transplant: 'Transplantado',
}

// ============================================
// TAG CATEGORY LABELS
// ============================================

export const TAG_CATEGORY_LABELS: Record<string, string> = {
  AGE: 'Faixa Etaria',
  SYSTEM: 'Sistema',
  SYNDROME: 'Sindrome',
  RISK: 'Risco',
  CONTEXT: 'Contexto',
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getGroupByCode(code: string): GroupMetadata | undefined {
  return CHIEF_COMPLAINT_GROUPS.find(
    (g) => g.code.toUpperCase() === code.toUpperCase()
  )
}

export function getTagLabel(value: string): string {
  return TAG_LABELS[value] || value
}

export function getCategoryLabel(category: string): string {
  return TAG_CATEGORY_LABELS[category] || category
}
