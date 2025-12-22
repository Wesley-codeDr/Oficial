export interface Symptom {
  id: string
  label: string
  type: 'boolean' | 'multiSelect' | 'scale' | 'range' | 'text' | 'segment'
  options?: string[]
  checked?: boolean
  negative?: boolean
  value?: string | number | boolean
  isRedFlag?: boolean
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

export interface Complaint {
  id: string
  group: string
  title: string
  subtitle: string
  ageTargets: string[]
  riskLevel: 'high' | 'medium' | 'low'
  isTopForAdult: boolean
  isTopForChild: boolean
  isFastTrack: boolean
  chips: string[]
  searchTerms: string[]
  synonyms?: string[]
  relatedSymptoms?: string[]
  bodySystem?: string[]
  severity?: number
  commonMisconceptions?: string[]
  icd10Codes?: string[]
  searchWeight?: number
}

export interface ComplaintFilters {
  patientCategory?: string[]
  riskLevel?: ('high' | 'medium' | 'low')[]
  bodySystem?: string[]
  groupCodes?: string[]
  minSeverity?: number
  onlyFastTrack?: boolean
}

export interface AnamnesisSection {
  id: string
  title: string
  items: Symptom[]
}

export interface Patient {
  id: string
  // name removed in favor of anonymous categories
  age: string
  gender: 'M' | 'F'
  category: 'adult' | 'elderly' | 'pediatric'
  isPregnant: boolean
  phoneNumber: string
  allergies: string[]
  medications: string[] // List of current medications
  entryTime: string // ISO string
  status: 'waiting' | 'in_progress' | 'discharged'
}

export interface NoteBlock {
  id: string
  title: string
  content: string
  iconName: 'heart' | 'list' | 'x' | 'stethoscope' | 'alert' | 'brain' | 'siren' // Added 'siren'
  alerts?: string[]
}

// Kanban Types
export type KanbanStatus = 'exam' | 'wait' | 'reval' | 'done'

export interface KanbanTask {
  id: string
  patientName: string
  age: string
  gender: 'M' | 'F'
  complaint: string
  acuity: 'red' | 'orange' | 'yellow' | 'green'
  waitTime: string
  status: KanbanStatus
}

// Dashboard Preferences
export interface DashboardPreferences {
  visibleKpiCards: string[] // ids: 'thoracic', 'patients', 'revals', 'ecg'
  kpiOrder: string[]
  visibleKanbanColumns: string[] // ids: 'exam', 'wait', 'reval', 'done'
  showGreeting: boolean
  showAlertRow: boolean
  density: 'default' | 'compact'
}
