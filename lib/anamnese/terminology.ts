export type TerminologyCodeSystem = 'CID10' | 'SNOMEDCT' | 'LOINC'

export interface TerminologyCode {
  system: TerminologyCodeSystem
  code: string
  display?: string
}

export interface TerminologyEntry {
  id: string
  label: string
  codes: TerminologyCode[]
}

// Minimal examples only; no bulk datasets embedded to avoid license/copyright issues.
export const terminologyIndex: Record<string, TerminologyEntry> = {
  'chest-pain': {
    id: 'chest-pain',
    label: 'Dor torácica',
    codes: [
      { system: 'CID10', code: 'R07.4', display: 'Dor torácica não especificada' },
      { system: 'SNOMEDCT', code: '29857009', display: 'Chest pain (finding)' },
    ],
  },
  dyspnea: {
    id: 'dyspnea',
    label: 'Dispneia',
    codes: [
      { system: 'CID10', code: 'R06.0', display: 'Dispneia' },
      { system: 'SNOMEDCT', code: '267036007', display: 'Dyspnea (finding)' },
    ],
  },
  troponin: {
    id: 'troponin',
    label: 'Troponina elevada',
    codes: [
      { system: 'LOINC', code: '6598-7', display: 'Troponin I [Mass/volume] in Serum or Plasma' },
    ],
  },
}

export function mapToCodes(fieldId: string): TerminologyCode[] {
  return terminologyIndex[fieldId]?.codes ?? []
}
