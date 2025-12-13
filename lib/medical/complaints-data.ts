/**
 * Complaints Data Configuration
 * Medical complaints and groups data for selection UI
 * Migrated from Google AI Studio frontend
 */

import type { ComplaintsData } from '@/types/frontend';

export const complaintsData: ComplaintsData = {
  version: 'frontend-1.0',
  locale: 'pt-BR',
  groups: [
    {
      code: 'PROTO_SEPSE',
      label: 'Sepse / Choque',
      description: 'Reconhecimento precoce, qSOFA e Bundles de 1h.',
      icon: 'Biohazard',
      color: 'rose',
      sortOrder: 0,
      recommendedFor: ['adult', 'elderly']
    },
    {
      code: 'PROTO_AVC',
      label: 'AVC Agudo',
      description: 'Protocolo AVC, escala NIHSS e janela trombolítica.',
      icon: 'Brain',
      color: 'purple',
      sortOrder: 0,
      recommendedFor: ['adult', 'elderly']
    },
    {
      code: 'PROTO_IC',
      label: 'IC Descompensada',
      description: 'Perfil hemodinâmico (Stevenson) e manejo de congestão.',
      icon: 'HeartPulse',
      color: 'blue',
      sortOrder: 0,
      recommendedFor: ['adult', 'elderly']
    },
    {
      code: 'PROTO_TEP',
      label: 'Tromboembolismo',
      description: 'Estratificação de risco (Wells/Geneva) e conduta no TEP.',
      icon: 'Wind',
      color: 'cyan',
      sortOrder: 0,
      recommendedFor: ['adult']
    },
    {
      code: 'CV',
      label: 'Peito / Coração',
      description: 'Dor no peito, palpitações, desmaio, pressão alta.',
      icon: 'HeartPulse',
      color: 'red',
      sortOrder: 1,
      recommendedFor: ['adult', 'elderly']
    },
    {
      code: 'RC',
      label: 'Respiração',
      description: 'Falta de ar, tosse, chiado, engasgo.',
      icon: 'Wind',
      color: 'blue',
      sortOrder: 2,
      recommendedFor: ['adult', 'child', 'elderly']
    },
    {
      code: 'NC',
      label: 'Neuro / Cabeça',
      description: 'Desmaio, convulsão, dor de cabeça, confusão.',
      icon: 'Brain',
      color: 'purple',
      sortOrder: 3,
      recommendedFor: ['adult', 'child', 'elderly']
    },
    {
      code: 'GI',
      label: 'Digestivo',
      description: 'Dor na barriga, vômito, diarreia, sangramento.',
      icon: 'Utensils',
      color: 'orange',
      sortOrder: 4,
      recommendedFor: ['adult', 'child']
    },
    {
      code: 'GU',
      label: 'Urinário / Renal',
      description: 'Dor ao urinar, dor nos rins, secreção.',
      icon: 'Droplets',
      color: 'teal',
      sortOrder: 5,
      recommendedFor: ['adult', 'elderly']
    },
    {
      code: 'MSK',
      label: 'Osteomuscular',
      description: 'Dor lombar, dores musculares, fraturas.',
      icon: 'Bone',
      color: 'amber',
      sortOrder: 6,
      recommendedFor: ['adult', 'child', 'elderly']
    },
    {
      code: 'INF',
      label: 'Febre / Infecção',
      description: 'Febre isolada ou com sintomas gerais.',
      icon: 'Thermometer',
      color: 'rose',
      sortOrder: 7,
      recommendedFor: ['adult', 'child']
    },
    {
      code: 'OBG',
      label: 'Ginecologia',
      description: 'Gestação, dor pélvica, sangramento vaginal.',
      icon: 'Baby',
      color: 'pink',
      sortOrder: 8,
      recommendedFor: ['adultPregnant']
    },
    {
      code: 'PED',
      label: 'Pediatria',
      description: 'Queixas específicas de bebês e crianças.',
      icon: 'Baby',
      color: 'sky',
      sortOrder: 9,
      recommendedFor: ['child', 'infant']
    },
    {
      code: 'PSI',
      label: 'Saúde Mental',
      description: 'Ansiedade, agitação, ideias suicidas.',
      icon: 'BrainCircuit',
      color: 'indigo',
      sortOrder: 10,
      recommendedFor: ['adult', 'teen']
    },
    {
      code: 'TR',
      label: 'Trauma',
      description: 'Quedas, acidentes, cortes, pancadas.',
      icon: 'Siren',
      color: 'slate',
      sortOrder: 11,
      recommendedFor: ['adult', 'child', 'elderly']
    },
    {
      code: 'TOX',
      label: 'Intoxicação',
      description: 'Overdose, ingestão de produtos, venenos.',
      icon: 'Biohazard',
      color: 'lime',
      sortOrder: 12,
      recommendedFor: ['adult', 'child']
    },
    {
      code: 'DERM',
      label: 'Pele',
      description: 'Manchas, alergias, queimaduras, picadas.',
      icon: 'Hand',
      color: 'yellow',
      sortOrder: 13,
      recommendedFor: ['adult', 'child']
    },
    {
      code: 'ORL',
      label: 'Ouvido / Garganta',
      description: 'Dor de ouvido, garganta, nariz, dente.',
      icon: 'Ear',
      color: 'emerald',
      sortOrder: 14,
      recommendedFor: ['adult', 'child']
    },
    {
      code: 'OFT',
      label: 'Olhos',
      description: 'Olho vermelho, dor, perda de visão.',
      icon: 'Eye',
      color: 'cyan',
      sortOrder: 15,
      recommendedFor: ['adult', 'child']
    },
    {
      code: 'ENV',
      label: 'Exposição',
      description: 'Químicos, calor, frio, fumaça.',
      icon: 'Sun',
      color: 'neutral',
      sortOrder: 16,
      recommendedFor: ['adult', 'child']
    },
    {
      code: 'GEN',
      label: 'Geral / Adm',
      description: 'Mal-estar inespecífico, receitas, atestados.',
      icon: 'MoreHorizontal',
      color: 'gray',
      sortOrder: 17,
      recommendedFor: ['adult', 'elderly']
    }
  ],
  complaints: [
    {
      id: 'CV_CHEST_PAIN_TYPICAL',
      group: 'CV',
      title: 'Dor no peito em aperto',
      subtitle: 'Pode ser problema no coração',
      ageTargets: ['adult', 'elderly'],
      riskLevel: 'high',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: false,
      chips: ['dor no peito', 'aperto no peito', 'peso no peito'],
      searchTerms: [
        'dor no peito em aperto',
        'aperto no peito',
        'peso no peito',
        'dor no peito ao esforço',
        'dor no peito que irradia',
        'dor precordial'
      ]
    },
    {
      id: 'CV_CHEST_PAIN_ATYPICAL',
      group: 'CV',
      title: 'Dor no peito em pontada',
      subtitle: 'Dor localizada ou que piora ao mexer ou respirar',
      ageTargets: ['adult', 'elderly'],
      riskLevel: 'medium',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: true,
      chips: ['pontada no peito', 'fisgada no peito'],
      searchTerms: [
        'dor no peito em pontada',
        'fisgada no peito',
        'dor no peito ao respirar',
        'dor no peito ao mexer',
        'dor costocondral'
      ]
    },
    {
      id: 'CV_SYNCOPE',
      group: 'CV',
      title: 'Desmaio ou quase desmaio',
      subtitle: 'Apagão, queda súbita, perda de consciência',
      ageTargets: ['adult', 'elderly', 'teen'],
      riskLevel: 'high',
      isTopForAdult: true,
      isTopForChild: true,
      isFastTrack: false,
      chips: ['desmaio', 'apagão'],
      searchTerms: [
        'desmaio',
        'apagão',
        'escureceu a visão',
        'quase desmaiou',
        'caiu duro'
      ]
    },
    {
      id: 'CV_PALPITATIONS',
      group: 'CV',
      title: 'Coração disparado',
      subtitle: 'Palpitações ou batimentos fortes',
      ageTargets: ['adult', 'elderly', 'teen'],
      riskLevel: 'medium',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: true,
      chips: ['palpitações', 'coração acelerado'],
      searchTerms: [
        'coração disparado',
        'coração acelerado',
        'batimentos fortes',
        'batedeira no peito'
      ]
    },
    {
      id: 'RC_DYSPNEA_ACUTE',
      group: 'RC',
      title: 'Falta de ar importante',
      subtitle: 'Dificuldade para respirar de início recente',
      ageTargets: ['adult', 'elderly'],
      riskLevel: 'high',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: false,
      chips: ['falta de ar', 'dificuldade para respirar'],
      searchTerms: [
        'falta de ar',
        'não consigo respirar',
        'fôlego curto',
        'respiração cansada',
        'sufocação'
      ]
    },
    {
      id: 'NC_STROKE_SYNDROME',
      group: 'NC',
      title: 'Boca torta / fraqueza de um lado',
      subtitle: 'Pode ser AVC (derrame)',
      ageTargets: ['adult', 'elderly'],
      riskLevel: 'high',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: false,
      chips: ['suspeita de AVC', 'derrame'],
      searchTerms: [
        'boca torta',
        'acordou torto',
        'perdeu força de um lado',
        'não fala direito'
      ]
    },
    {
      id: 'NC_HEADACHE_THUNDERCLAP',
      group: 'NC',
      title: 'Pior dor de cabeça da vida',
      subtitle: 'Cefaleia súbita muito forte',
      ageTargets: ['adult', 'elderly'],
      riskLevel: 'high',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: false,
      chips: ['dor de cabeça súbita'],
      searchTerms: [
        'pior dor de cabeça da vida',
        'dor de cabeça súbita muito forte',
        'explosão na cabeça'
      ]
    },
    {
      id: 'GI_ABDOMINAL_PAIN_ACUTE',
      group: 'GI',
      title: 'Dor de barriga forte',
      subtitle: 'Dor na barriga que começou há pouco tempo',
      ageTargets: ['adult', 'child'],
      riskLevel: 'medium',
      isTopForAdult: true,
      isTopForChild: true,
      isFastTrack: false,
      chips: ['dor na barriga', 'dor abdominal'],
      searchTerms: [
        'dor na barriga',
        'dor de barriga forte',
        'dor no estômago',
        'cólica na barriga'
      ]
    },
    {
      id: 'INF_FEVER_NO_FOCUS_ADULT',
      group: 'INF',
      title: 'Febre em adulto',
      subtitle: 'Febre sem outro sintoma marcante',
      ageTargets: ['adult'],
      riskLevel: 'medium',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: false,
      chips: ['febre', 'calafrios'],
      searchTerms: [
        'febre sem outros sintomas',
        'febre alta sem saber a causa',
        'calafrios e febre'
      ]
    },
    {
      id: 'TR_POLYTRAUMA_HIGH_ENERGY',
      group: 'TR',
      title: 'Acidente grave (carro, moto, queda)',
      subtitle: 'Politrauma de alta energia',
      ageTargets: ['adult', 'teen', 'child'],
      riskLevel: 'high',
      isTopForAdult: true,
      isTopForChild: true,
      isFastTrack: false,
      chips: ['acidente grave'],
      searchTerms: [
        'acidente de carro grave',
        'acidente de moto grave',
        'queda de grande altura',
        'atropelamento'
      ]
    },
    {
      id: 'MSK_LOW_BACK_PAIN_ACUTE',
      group: 'MSK',
      title: 'Dor nas costas (lombar) recente',
      subtitle: 'Travou a coluna ou dor lombar aguda',
      ageTargets: ['adult', 'elderly'],
      riskLevel: 'medium',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: true,
      chips: ['dor lombar', 'lombalgia'],
      searchTerms: [
        'dor nas costas baixa',
        'travou a lombar',
        'lombalgia aguda'
      ]
    },
    {
      id: 'PSI_PANIC_ATTACK',
      group: 'PSI',
      title: 'Crise de ansiedade / pânico',
      subtitle: 'Coração acelerado, falta de ar, sensação de morte',
      ageTargets: ['adult', 'teen'],
      riskLevel: 'medium',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: true,
      chips: ['crise de ansiedade', 'ataque de pânico'],
      searchTerms: [
        'crise de ansiedade',
        'ataque de pânico',
        'sensação de morte iminente'
      ]
    },
    {
      id: 'GEN_UNWELL_UNSPEC',
      group: 'GEN',
      title: 'Passando mal (sem foco definido)',
      subtitle: 'Mal-estar geral sem sintoma principal claro',
      ageTargets: ['adult', 'elderly'],
      riskLevel: 'medium',
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: false,
      chips: ['mal-estar geral'],
      searchTerms: [
        'passando mal',
        'mal-estar',
        'me sinto ruim'
      ]
    }
  ]
};

/**
 * Get complaints by group
 */
export function getComplaintsByGroup(groupCode: string) {
  return complaintsData.complaints.filter(c => c.group === groupCode);
}

/**
 * Get complaint by ID
 */
export function getComplaintById(id: string) {
  return complaintsData.complaints.find(c => c.id === id);
}

/**
 * Get group by code
 */
export function getGroupByCode(code: string) {
  return complaintsData.groups.find(g => g.code === code);
}

/**
 * Search complaints by term
 */
export function searchComplaints(term: string) {
  const lowerTerm = term.toLowerCase();
  return complaintsData.complaints.filter(c =>
    c.title.toLowerCase().includes(lowerTerm) ||
    c.subtitle.toLowerCase().includes(lowerTerm) ||
    c.chips.some(chip => chip.toLowerCase().includes(lowerTerm)) ||
    c.searchTerms.some(st => st.toLowerCase().includes(lowerTerm))
  );
}

/**
 * Get top complaints for a patient category
 */
export function getTopComplaints(isAdult: boolean) {
  return complaintsData.complaints.filter(c =>
    isAdult ? c.isTopForAdult : c.isTopForChild
  );
}
