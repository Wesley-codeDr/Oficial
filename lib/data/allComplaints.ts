/**
 * All Complaints - Combinação de queixas existentes + novas
 * Este arquivo exporta todos os dados de queixas do sistema
 */

import { complaintsData as existingData } from './complaintsData'
import { allNewComplaints } from './newComplaints'
import { complaintGroups } from './complaint-groups'

// Combinar queixas existentes + novas
const allComplaints = [
  ...existingData.complaints,
  ...allNewComplaints,
]

// Exportar dados combinados
export const combinedComplaintsData = {
  version: 'frontend-2.0',
  locale: 'pt-BR',
  groups: complaintGroups,
  complaints: allComplaints,
}

// Re-export para compatibilidade
export { allComplaints, complaintGroups }

// Utilitários
export const getComplaintById = (id: string) =>
  allComplaints.find(c => c.id === id)

export const getComplaintsByGroup = (groupCode: string) =>
  allComplaints.filter(c => c.group === groupCode)

export const getHighRiskComplaints = () =>
  allComplaints.filter(c => c.riskLevel === 'high')

export const searchComplaints = (query: string) => {
  const q = query.toLowerCase()
  return allComplaints.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.subtitle.toLowerCase().includes(q) ||
    c.synonyms?.some(s => s.toLowerCase().includes(q)) ||
    c.searchTerms?.some(t => t.toLowerCase().includes(q))
  )
}

// Stats
export const COMPLAINT_STATS = {
  total: allComplaints.length,
  existing: existingData.complaints.length,
  new: allNewComplaints.length,
  byGroup: complaintGroups.map(g => ({
    code: g.code,
    label: g.label,
    count: allComplaints.filter(c => c.group === g.code).length
  })).filter(g => g.count > 0)
}
