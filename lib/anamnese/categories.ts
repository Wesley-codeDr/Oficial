export type FieldCategory = 'history' | 'symptoms' | 'exam' | 'labs' | 'red-flags'

export interface AnamneseField {
  id: string
  label: string
  narrative: string
  required?: boolean
  redFlag?: boolean
  category: FieldCategory
  order?: number
}

export interface Category {
  id: string
  name: string
  priority: number
  fields: AnamneseField[]
}

export const defaultCategories: Category[] = [
  {
    id: 'history',
    name: 'Histórico',
    priority: 2,
    fields: [
      { id: 'prev-cond', label: 'Condições prévias', narrative: 'Paciente com histórico de...', category: 'history', order: 1 },
      { id: 'med-use', label: 'Uso de medicações', narrative: 'Em uso de...', category: 'history', order: 2 },
    ],
  },
  {
    id: 'symptoms',
    name: 'Sintomas',
    priority: 1,
    fields: [
      { id: 'chest-pain', label: 'Dor torácica', narrative: 'Refere dor torácica...', category: 'symptoms', redFlag: true, order: 1 },
      { id: 'dyspnea', label: 'Dispneia', narrative: 'Dispneia ao esforço...', category: 'symptoms', redFlag: true, order: 2 },
      { id: 'fever', label: 'Febre', narrative: 'Febre referida...', category: 'symptoms', order: 3 },
    ],
  },
  {
    id: 'exam',
    name: 'Exame Físico',
    priority: 2,
    fields: [
      { id: 'tachycardia', label: 'Taquicardia', narrative: 'FC elevada em...', category: 'exam', redFlag: true },
      { id: 'hypotension', label: 'Hipotensão', narrative: 'PA baixa...', category: 'exam', redFlag: true },
      { id: 'oxygen-low', label: 'Sat. O2 baixa', narrative: 'Sat. < 92%', category: 'exam', redFlag: true },
    ],
  },
  {
    id: 'labs',
    name: 'Exames',
    priority: 3,
    fields: [
      { id: 'troponin', label: 'Troponina elevada', narrative: 'Elevação de troponina...', category: 'labs', redFlag: true },
      { id: 'cbc', label: 'Hemograma', narrative: 'Leucócitos...', category: 'labs' },
    ],
  },
]
