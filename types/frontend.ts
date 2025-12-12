/**
 * Frontend UI Types
 * Types migrated from Google AI Studio frontend
 */

// Symptom checkbox types
export interface Symptom {
  id: string;
  label: string;
  type: 'boolean' | 'multiSelect' | 'scale' | 'range' | 'text' | 'segment';
  options?: string[];
  checked?: boolean;
  negative?: boolean;
  value?: string | number | string[];
  isRedFlag?: boolean;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export interface AnamnesisSection {
  id: string;
  title: string;
  items: Symptom[];
}

// Patient types for UI
export interface UIPatient {
  id: string;
  age: string;
  gender: 'M' | 'F';
  category: 'adult' | 'elderly' | 'pediatric';
  isPregnant: boolean;
  phoneNumber: string;
  allergies: string[];
  medications: string[];
  entryTime: string; // ISO string
  status: 'waiting' | 'in_progress' | 'discharged';
}

export interface NoteBlock {
  id: string;
  title: string;
  content: string;
  iconName: 'heart' | 'list' | 'x' | 'stethoscope' | 'alert' | 'brain' | 'siren';
  alerts?: string[];
}

// Kanban types
export type KanbanStatus = 'exam' | 'wait' | 'reval' | 'done';

export interface KanbanTask {
  id: string;
  patientName: string;
  age: string;
  gender: 'M' | 'F';
  complaint: string;
  acuity: 'red' | 'orange' | 'yellow' | 'green';
  waitTime: string;
  status: KanbanStatus;
}

// Dashboard preferences
export interface DashboardPreferences {
  visibleKpiCards: string[];
  kpiOrder: string[];
  visibleKanbanColumns: string[];
  showGreeting: boolean;
  showAlertRow: boolean;
  density: 'default' | 'compact';
}

// Syndrome card for UI selection
export type SyndromeCategory = 'critical' | 'clinical' | 'trauma';

export interface SyndromeCard {
  id: string;
  label: string;
  icon: string; // Icon name as string for dynamic import
  color: string;
  category: SyndromeCategory;
  calculator?: string;
}

// Reference item for evidence-based references
export type EvidenceLevel = 'Nível 1A' | 'Nível 1B' | 'Nível 2A' | 'Opinião de Expert' | 'Consenso';

export interface ReferenceItem {
  source: string;
  title: string;
  url: string;
  evidenceLevel: EvidenceLevel;
  year: string;
}

// Complaint data types
export interface ComplaintGroup {
  code: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
  recommendedFor: string[];
}

export interface Complaint {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  ageTargets: string[];
  riskLevel: 'high' | 'medium' | 'low';
  isTopForAdult: boolean;
  isTopForChild: boolean;
  isFastTrack: boolean;
  chips: string[];
  searchTerms: string[];
}

export interface ComplaintsData {
  version: string;
  locale: string;
  groups: ComplaintGroup[];
  complaints: Complaint[];
}
