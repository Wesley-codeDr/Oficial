import type { ComplaintGroup } from '@/lib/types/medical'
import type { ComplaintApiPayload } from '@/lib/types/complaints-api'

export const complaintGroups: ComplaintGroup[] = [
  { code: 'PROTO_SEPSE', label: 'Sepse / Choque', description: 'Reconhecimento precoce, qSOFA e Bundles de 1h.', icon: 'Biohazard', color: 'rose', sortOrder: 0, recommendedFor: ['adult', 'elderly'] },
  { code: 'PROTO_AVC', label: 'AVC Agudo', description: 'Protocolo AVC, escala NIHSS e janela trombolitica.', icon: 'Brain', color: 'purple', sortOrder: 0, recommendedFor: ['adult', 'elderly'] },
  { code: 'PROTO_IC', label: 'IC Descompensada', description: 'Perfil hemodinamico (Stevenson) e manejo de congestao.', icon: 'HeartPulse', color: 'blue', sortOrder: 0, recommendedFor: ['adult', 'elderly'] },
  { code: 'PROTO_TEP', label: 'Tromboembolismo', description: 'Estratificacao de risco (Wells/Geneva) e conduta no TEP.', icon: 'Wind', color: 'cyan', sortOrder: 0, recommendedFor: ['adult'] },
  { code: 'CV', label: 'Peito / Coracao', description: 'Dor no peito, palpitacoes, desmaio, pressao alta.', icon: 'HeartPulse', color: 'red', sortOrder: 1, recommendedFor: ['adult', 'elderly'] },
  { code: 'RC', label: 'Respiracao', description: 'Falta de ar, tosse, chiado, engasgo.', icon: 'Wind', color: 'blue', sortOrder: 2, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'NC', label: 'Neuro / Cabeca', description: 'Desmaio, convulsao, dor de cabeca, confusao.', icon: 'Brain', color: 'purple', sortOrder: 3, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'GI', label: 'Digestivo', description: 'Dor na barriga, vomito, diarreia, sangramento.', icon: 'Utensils', color: 'orange', sortOrder: 4, recommendedFor: ['adult', 'child'] },
  { code: 'GU', label: 'Urinario / Renal', description: 'Dor ao urinar, dor nos rins, secrecao.', icon: 'Droplets', color: 'teal', sortOrder: 5, recommendedFor: ['adult', 'elderly'] },
  { code: 'MSK', label: 'Osteomuscular', description: 'Dor lombar, dores musculares, fraturas.', icon: 'Bone', color: 'amber', sortOrder: 6, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'INF', label: 'Febre / Infeccao', description: 'Febre isolada ou com sintomas gerais.', icon: 'Thermometer', color: 'rose', sortOrder: 7, recommendedFor: ['adult', 'child'] },
  { code: 'OBG', label: 'Ginecologia', description: 'Gestacao, dor pelvica, sangramento vaginal.', icon: 'Baby', color: 'pink', sortOrder: 8, recommendedFor: ['adultPregnant', 'adult'] },
  { code: 'PED', label: 'Pediatria', description: 'Queixas especificas de bebes e criancas.', icon: 'Baby', color: 'sky', sortOrder: 9, recommendedFor: ['child', 'infant'] },
  { code: 'PSI', label: 'Saude Mental', description: 'Ansiedade, agitacao, ideias suicidas.', icon: 'BrainCircuit', color: 'indigo', sortOrder: 10, recommendedFor: ['adult', 'teen'] },
  { code: 'TR', label: 'Trauma', description: 'Quedas, acidentes, cortes, pancadas.', icon: 'Siren', color: 'slate', sortOrder: 11, recommendedFor: ['adult', 'child', 'elderly'] },
  { code: 'TOX', label: 'Intoxicacao', description: 'Overdose, ingestao de produtos, venenos.', icon: 'Biohazard', color: 'lime', sortOrder: 12, recommendedFor: ['adult', 'child'] },
  { code: 'DERM', label: 'Pele', description: 'Manchas, alergias, queimaduras, picadas.', icon: 'Hand', color: 'yellow', sortOrder: 13, recommendedFor: ['adult', 'child'] },
  { code: 'ORL', label: 'Ouvido / Garganta', description: 'Dor de ouvido, garganta, nariz, dente.', icon: 'Ear', color: 'emerald', sortOrder: 14, recommendedFor: ['adult', 'child'] },
  { code: 'OFT', label: 'Olhos', description: 'Olho vermelho, dor, perda de visao.', icon: 'Eye', color: 'cyan', sortOrder: 15, recommendedFor: ['adult', 'child'] },
  { code: 'ENV', label: 'Exposicao', description: 'Quimicos, calor, frio, fumaca.', icon: 'Sun', color: 'neutral', sortOrder: 16, recommendedFor: ['adult', 'child'] },
  { code: 'GEN', label: 'Geral / Adm', description: 'Mal-estar inespecifico, receitas, atestados.', icon: 'MoreHorizontal', color: 'gray', sortOrder: 17, recommendedFor: ['adult', 'elderly'] },
]

const complaintGroupMap = complaintGroups.reduce<Record<string, ComplaintGroup>>((acc, group) => {
  acc[group.code] = group
  return acc
}, {})

export function buildComplaintGroups(
  complaints: ComplaintApiPayload[],
  options?: { includeAll?: boolean }
) {
  const groupCodes = new Set<string>()
  const groupNameByCode = new Map<string, string>()

  complaints.forEach((complaint) => {
    groupCodes.add(complaint.group)
    if (complaint.db?.groupName && !groupNameByCode.has(complaint.group)) {
      groupNameByCode.set(complaint.group, complaint.db.groupName)
    }
  })

  const baseGroups = options?.includeAll ? complaintGroups : []

  baseGroups.forEach((group) => {
    groupCodes.add(group.code)
  })

  const groups = Array.from(groupCodes).map((code) => {
    const base = complaintGroupMap[code]
    const labelFromDb = groupNameByCode.get(code)

    if (base) {
      return {
        ...base,
        label: labelFromDb || base.label,
      }
    }

    return {
      code,
      label: labelFromDb || code,
      description: '',
      icon: 'Activity',
      color: 'gray',
      sortOrder: 99,
      recommendedFor: [],
    }
  })

  return groups.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}
