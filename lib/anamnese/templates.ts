export type Specialty =
  | 'cardiology'
  | 'pulmonology'
  | 'neurology'
  | 'emergency'
  | 'general'

export interface TemplateSection {
  id: string
  title: string
  fieldIds: string[]
}

export interface SpecialtyTemplate {
  specialty: Specialty
  sections: TemplateSection[]
  validation: {
    requiredIds?: string[]
    mutuallyExclusive?: Array<[string, string]>
    redFlagIds?: string[]
  }
}

export const templates: Record<Specialty, SpecialtyTemplate> = {
  general: {
    specialty: 'general',
    sections: [
      { id: 'history', title: 'Histórico', fieldIds: ['prev-cond', 'med-use'] },
      { id: 'symptoms', title: 'Sintomas', fieldIds: ['chest-pain', 'dyspnea', 'fever'] },
    ],
    validation: {
      requiredIds: [],
      mutuallyExclusive: [],
      redFlagIds: ['chest-pain', 'dyspnea'],
    },
  },
  emergency: {
    specialty: 'emergency',
    sections: [
      { id: 'critical', title: 'Críticos', fieldIds: ['hypotension', 'oxygen-low', 'tachycardia'] },
      { id: 'labs', title: 'Exames', fieldIds: ['troponin', 'cbc'] },
    ],
    validation: {
      requiredIds: ['oxygen-low'],
      mutuallyExclusive: [['tachycardia', 'hypotension']],
      redFlagIds: ['hypotension', 'oxygen-low', 'tachycardia', 'troponin'],
    },
  },
  cardiology: {
    specialty: 'cardiology',
    sections: [
      { id: 'symptoms-cardio', title: 'Sintomas Cardio', fieldIds: ['chest-pain', 'dyspnea'] },
      { id: 'labs-cardio', title: 'Exames Cardio', fieldIds: ['troponin'] },
    ],
    validation: {
      redFlagIds: ['chest-pain', 'troponin'],
    },
  },
  pulmonology: {
    specialty: 'pulmonology',
    sections: [
      { id: 'resp', title: 'Respiratórios', fieldIds: ['dyspnea', 'oxygen-low'] },
      { id: 'fever', title: 'Febre', fieldIds: ['fever'] },
    ],
    validation: {
      redFlagIds: ['oxygen-low'],
    },
  },
  neurology: {
    specialty: 'neurology',
    sections: [
      { id: 'neu', title: 'Neurológicos', fieldIds: [] },
    ],
    validation: {
      redFlagIds: [],
    },
  },
}
