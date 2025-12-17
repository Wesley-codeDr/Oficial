
export interface Symptom {
  id: string;
  label: string;
  type: 'boolean' | 'multiSelect' | 'scale' | 'range' | 'text' | 'segment';
  options?: string[];
  checked?: boolean;
  negative?: boolean;
  value?: any;
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

export interface Patient {
  id: string;
  // name removed in favor of anonymous categories
  age: string;
  gender: 'M' | 'F';
  category: 'adult' | 'elderly' | 'pediatric';
  isPregnant: boolean;
  phoneNumber: string;
  allergies: string[];
  medications: string[]; // List of current medications
  entryTime: string; // ISO string
  status: 'waiting' | 'in_progress' | 'discharged';
}

export interface NoteBlock {
  id: string;
  title: string;
  content: string;
  iconName: 'heart' | 'list' | 'x' | 'stethoscope' | 'alert' | 'brain' | 'siren'; // Added 'siren'
  alerts?: string[];
}

// Kanban Types
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

// Dashboard Preferences
export interface DashboardPreferences {
  visibleKpiCards: string[]; // ids: 'thoracic', 'patients', 'revals', 'ecg'
  kpiOrder: string[];
  visibleKanbanColumns: string[]; // ids: 'exam', 'wait', 'reval', 'done'
  showGreeting: boolean;
  showAlertRow: boolean;
  density: 'default' | 'compact';
}
