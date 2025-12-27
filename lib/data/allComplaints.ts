/**
 * All Complaints - Combinação de queixas existentes + novas
 * Este arquivo exporta todos os dados de queixas do sistema
 */

import { complaintsData as existingData } from './complaintsData'
import { allNewComplaints } from './newComplaints'

// Grupos de queixas (17 + 4 protocolos)
const complaintGroups = [
  // Protocolos (prioridade máxima)
  { code: 'PROTO_SEPSE', label: 'Sepse / Choque', description: 'Reconhecimento precoce, qSOFA e Bundles de 1h.', icon: 'Biohazard', color: 'rose', sortOrder: 0, recommendedFor: ['adult', 'elderly'] },
  { code: 'PROTO_AVC', label: 'AVC Agudo', description: 'Protocolo AVC, escala NIHSS e janela trombolítica.', icon: 'Brain', color: 'purple', sortOrder: 0, recommendedFor: ['adult', 'elderly'] },
  { code: 'PROTO_IC', label: 'IC Descompensada', description: 'Perfil hemodinâmico (Stevenson) e manejo de congestão.', icon: 'HeartPulse', color: 'blue', sortOrder: 0, recommendedFor: ['adult', 'elderly'] },
  { code: 'PROTO_TEP', label: 'Tromboembolismo', description: 'Estratificação de risco (Wells/Geneva) e conduta no TEP.', icon: 'Wind', color: 'cyan', sortOrder: 0, recommendedFor: ['adult'] },

  // Grupos principais
  { code: 'CV', label: 'Peito / Coração', description: 'Dor no peito, palpitações, desmaio, pressão alta.', icon: 'HeartPulse', color: 'red', sortOrder: 1, recommendedFor: ['adult', 'elderly'] },
  { code: 'RC', label: 'Respiração', description: 'Falta de ar, tosse, chiado, engasgo.', icon: 'Wind', color: 'blue', sortOrder: 2, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'NC', label: 'Neuro / Cabeça', description: 'Desmaio, convulsão, dor de cabeça, confusão.', icon: 'Brain', color: 'purple', sortOrder: 3, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'GI', label: 'Digestivo', description: 'Dor na barriga, vômito, diarreia, sangramento.', icon: 'Utensils', color: 'orange', sortOrder: 4, recommendedFor: ['adult', 'child'] },
  { code: 'GU', label: 'Urinário / Renal', description: 'Dor ao urinar, dor nos rins, secreção.', icon: 'Droplets', color: 'teal', sortOrder: 5, recommendedFor: ['adult', 'elderly'] },
  { code: 'MSK', label: 'Osteomuscular', description: 'Dor lombar, dores musculares, fraturas.', icon: 'Bone', color: 'amber', sortOrder: 6, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'INF', label: 'Febre / Infecção', description: 'Febre isolada ou com sintomas gerais.', icon: 'Thermometer', color: 'rose', sortOrder: 7, recommendedFor: ['adult', 'child'] },
  { code: 'OBG', label: 'Ginecologia', description: 'Gestação, dor pélvica, sangramento vaginal.', icon: 'Baby', color: 'pink', sortOrder: 8, recommendedFor: ['adultPregnant', 'adult'] },
  { code: 'PED', label: 'Pediatria', description: 'Queixas específicas de bebês e crianças.', icon: 'Baby', color: 'sky', sortOrder: 9, recommendedFor: ['child', 'infant'] },
  { code: 'PSI', label: 'Saúde Mental', description: 'Ansiedade, agitação, ideias suicidas.', icon: 'BrainCircuit', color: 'indigo', sortOrder: 10, recommendedFor: ['adult', 'teen'] },
  { code: 'TR', label: 'Trauma', description: 'Quedas, acidentes, cortes, pancadas.', icon: 'Siren', color: 'slate', sortOrder: 11, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'TOX', label: 'Intoxicação', description: 'Overdose, ingestão de produtos, venenos.', icon: 'Biohazard', color: 'lime', sortOrder: 12, recommendedFor: ['adult', 'child'] },
  { code: 'DERM', label: 'Pele', description: 'Manchas, alergias, queimaduras, picadas.', icon: 'Hand', color: 'yellow', sortOrder: 13, recommendedFor: ['adult', 'child'] },
  { code: 'ORL', label: 'Ouvido / Garganta', description: 'Dor de ouvido, garganta, nariz, dente.', icon: 'Ear', color: 'emerald', sortOrder: 14, recommendedFor: ['adult', 'child'] },
  { code: 'OFT', label: 'Olhos', description: 'Olho vermelho, dor, perda de visão.', icon: 'Eye', color: 'cyan', sortOrder: 15, recommendedFor: ['adult', 'child'] },
  { code: 'ENV', label: 'Exposição', description: 'Químicos, calor, frio, fumaça.', icon: 'Sun', color: 'neutral', sortOrder: 16, recommendedFor: ['adult', 'child'] },
  { code: 'GEN', label: 'Geral / Adm', description: 'Mal-estar inespecífico, receitas, atestados.', icon: 'MoreHorizontal', color: 'gray', sortOrder: 17, recommendedFor: ['adult', 'elderly'] },
]

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
