/**
 * Medical References Configuration
 * Evidence-based references for each syndrome
 * Migrated from Google AI Studio frontend
 */

import type { ReferenceItem, ReferenceType, EvidenceLevelGrade } from '@/types/frontend';

// Helper to convert evidence level to grade
function getGradeFromLevel(evidenceLevel: string): EvidenceLevelGrade {
  if (evidenceLevel.includes('1A') || evidenceLevel.includes('1B')) return 'A';
  if (evidenceLevel.includes('2A')) return 'B';
  return 'C';
}

// Helper to get type from source
function getTypeFromSource(source: string): ReferenceType {
  if (source.includes('Guideline') || source.includes('Diretriz')) return 'guideline';
  if (source.includes('Trial') || source.includes('Study')) return 'trial';
  if (source.includes('Review')) return 'review';
  return 'guideline';
}

// Common reference used across protocols
const commonReference: ReferenceItem = {
  source: 'ABRAMEDE',
  title: 'Diretrizes da Associação Brasileira de Medicina de Emergência',
  url: 'https://abramede.com.br/diretrizes',
  evidenceLevel: 'Consenso',
  year: '2023',
  type: 'guideline',
  level: 'B',
  summary: 'Diretrizes brasileiras para atendimento em emergência',
  keyPoints: ['Protocolos padronizados para PS', 'Indicações de internação', 'Critérios de alta']
};

// References by syndrome ID
const referencesBySyndrome: Record<string, ReferenceItem[]> = {
  dor_toracica: [
    {
      source: 'SBC',
      title: 'Diretriz da Sociedade Brasileira de Cardiologia sobre Angina Instável e IAM',
      url: 'https://www.portal.cardiol.br/diretrizes',
      evidenceLevel: 'Nível 1A',
      year: '2021',
      type: 'guideline',
      level: 'A',
      summary: 'Abordagem sistemática de síndromes coronarianas agudas',
      keyPoints: [
        'HEART Score para estratificação de risco',
        'Tempo porta-ECG < 10 minutos',
        'Troponina seriada em 0-3h',
        'Indicações de cateterismo de emergência'
      ]
    },
    {
      source: 'AHA / ACC',
      title: 'Guideline for the Evaluation and Diagnosis of Chest Pain',
      url: 'https://www.ahajournals.org',
      evidenceLevel: 'Nível 1A',
      year: '2021',
      type: 'guideline',
      level: 'A',
      summary: 'Avaliação baseada em evidências da dor torácica',
      keyPoints: [
        'Algoritmo de avaliação de dor torácica',
        'Classificação por probabilidade pré-teste',
        'Indicações de teste ergométrico vs cintilografia'
      ]
    },
    commonReference
  ],

  dor_abdominal: [
    {
      source: 'WSES',
      title: 'World Society of Emergency Surgery Guidelines for Acute Abdomen',
      url: 'https://wses.org.uk/guidelines',
      evidenceLevel: 'Nível 1B',
      year: '2020',
      type: 'guideline',
      level: 'A',
      summary: 'Manejo do abdome agudo baseado em evidências',
      keyPoints: [
        'Alvarado Score para apendicite',
        'Indicações de TC abdome',
        'Critérios de laparotomia de emergência'
      ]
    },
    {
      source: 'UpToDate',
      title: 'Evaluation of the adult with abdominal pain',
      url: 'https://www.uptodate.com',
      evidenceLevel: 'Nível 2A',
      year: '2024',
      type: 'review',
      level: 'B',
      summary: 'Revisão sistemática da avaliação de dor abdominal',
      keyPoints: [
        'Diagnósticos diferenciais por localização',
        'Red flags que indicam emergência cirúrgica',
        'Exames laboratoriais essenciais'
      ]
    },
    commonReference
  ],

  cefaleia: [
    {
      source: 'IHS',
      title: 'International Classification of Headache Disorders (ICHD-3)',
      url: 'https://ichd-3.org',
      evidenceLevel: 'Nível 1A',
      year: '2018',
      type: 'guideline',
      level: 'A',
      summary: 'Classificação internacional para diagnóstico de cefaleias',
      keyPoints: [
        'Critérios diagnósticos para enxaqueca',
        'Distinção entre cefaleia primária e secundária',
        'Red flags: SNOOP10'
      ]
    },
    {
      source: 'ACEP',
      title: 'Clinical Policy: Critical Issues in the Evaluation of Adult Patients Presenting to the Emergency Department With Acute Headache',
      url: 'https://www.acep.org',
      evidenceLevel: 'Nível 1B',
      year: '2019',
      type: 'guideline',
      level: 'A',
      summary: 'Política clínica para cefaleia no PS',
      keyPoints: [
        'Indicações de neuroimagem',
        'Ottawa SAH Rule',
        'Quando fazer punção lombar'
      ]
    },
    commonReference
  ],

  dispneia: [
    {
      source: 'GOLD',
      title: 'Global Initiative for Chronic Obstructive Lung Disease - COPD Guidelines',
      url: 'https://goldcopd.org',
      evidenceLevel: 'Nível 1A',
      year: '2024',
      type: 'guideline',
      level: 'A',
      summary: 'Diretrizes para manejo da DPOC',
      keyPoints: [
        'Classificação ABCD da DPOC',
        'Critérios de exacerbação',
        'Indicações de VNI e internação'
      ]
    },
    {
      source: 'GINA',
      title: 'Global Initiative for Asthma - Guidelines',
      url: 'https://ginasthma.org',
      evidenceLevel: 'Nível 1A',
      year: '2024',
      type: 'guideline',
      level: 'A',
      summary: 'Diretrizes globais para asma',
      keyPoints: [
        'Classificação de gravidade da crise',
        'Tratamento escalonado',
        'Critérios de alta do PS'
      ]
    },
    commonReference
  ],

  neuro_deficit: [
    {
      source: 'AHA / ASA',
      title: 'Guidelines for the Early Management of Patients With Acute Ischemic Stroke',
      url: 'https://www.ahajournals.org',
      evidenceLevel: 'Nível 1A',
      year: '2019',
      type: 'guideline',
      level: 'A',
      summary: 'Manejo agudo do AVC isquêmico',
      keyPoints: [
        'Janela terapêutica para trombólise (4.5h)',
        'NIHSS para estratificação',
        'Indicações de trombectomia mecânica',
        'Controle de PA no AVC'
      ]
    },
    {
      source: 'Ministério da Saúde',
      title: 'Linha de Cuidado do AVC no Adulto',
      url: 'https://www.gov.br/saude',
      evidenceLevel: 'Consenso',
      year: '2021',
      type: 'guideline',
      level: 'B',
      summary: 'Linha de cuidado brasileira para AVC',
      keyPoints: [
        'Fluxo de atendimento na rede SUS',
        'Tempo porta-agulha < 60min',
        'Centros de referência em neurologia'
      ]
    },
    commonReference
  ],

  sincope: [
    {
      source: 'ESC',
      title: 'Guidelines for the Diagnosis and Management of Syncope',
      url: 'https://www.escardio.org',
      evidenceLevel: 'Nível 1A',
      year: '2018',
      type: 'guideline',
      level: 'A',
      summary: 'Avaliação e manejo da síncope',
      keyPoints: [
        'San Francisco Syncope Rule',
        'OESIL Score para risco',
        'ECG obrigatório em todos os casos',
        'Indicações de internação vs alta'
      ]
    },
    commonReference
  ],

  febre: [
    {
      source: 'SSC',
      title: 'Surviving Sepsis Campaign Guidelines',
      url: 'https://www.sccm.org/SurvivingSepsisCampaign',
      evidenceLevel: 'Nível 1A',
      year: '2021',
      type: 'guideline',
      level: 'A',
      summary: 'Diretrizes para sepse e choque séptico',
      keyPoints: [
        'qSOFA para triagem',
        'Bundle da primeira hora',
        'Lactato seriado',
        'Antibiótico em até 1h'
      ]
    },
    {
      source: 'ILAS',
      title: 'Instituto Latino Americano de Sepse - Protocolos',
      url: 'https://ilas.org.br',
      evidenceLevel: 'Consenso',
      year: '2023',
      type: 'guideline',
      level: 'B',
      summary: 'Protocolos brasileiros para sepse',
      keyPoints: [
        'Adaptações para realidade brasileira',
        'Critérios de ativação do protocolo',
        'Fluxograma de atendimento'
      ]
    },
    commonReference
  ],

  trauma: [
    {
      source: 'ATLS',
      title: 'Advanced Trauma Life Support Guidelines',
      url: 'https://www.facs.org/atls',
      evidenceLevel: 'Nível 1A',
      year: '2018',
      type: 'guideline',
      level: 'A',
      summary: 'Suporte avançado de vida no trauma',
      keyPoints: [
        'ABCDE do trauma',
        'Avaliação primária e secundária',
        'Glasgow Coma Scale',
        'Indicações de transferência'
      ]
    },
    {
      source: 'SBAIT',
      title: 'Sociedade Brasileira de Atendimento Integrado ao Traumatizado',
      url: 'https://sbait.org.br',
      evidenceLevel: 'Consenso',
      year: '2022',
      type: 'guideline',
      level: 'B',
      summary: 'Diretrizes brasileiras para trauma',
      keyPoints: [
        'Protocolos de trauma no Brasil',
        'Centros de referência em trauma'
      ]
    },
    commonReference
  ],

  lombalgia: [
    {
      source: 'ACP',
      title: 'American College of Physicians Clinical Guideline for Low Back Pain',
      url: 'https://www.acponline.org',
      evidenceLevel: 'Nível 1B',
      year: '2017',
      type: 'guideline',
      level: 'A',
      summary: 'Manejo baseado em evidências da lombalgia',
      keyPoints: [
        'Red flags para dor lombar',
        'Indicações de imagem',
        'Tratamento conservador vs intervenção'
      ]
    },
    commonReference
  ],

  psiquiatria: [
    {
      source: 'ABP',
      title: 'Associação Brasileira de Psiquiatria - Diretrizes para Emergências',
      url: 'https://www.abp.org.br',
      evidenceLevel: 'Consenso',
      year: '2022',
      type: 'guideline',
      level: 'B',
      summary: 'Manejo de emergências psiquiátricas',
      keyPoints: [
        'Avaliação de risco de suicídio',
        'Contenção química e física',
        'Critérios de internação involuntária'
      ]
    },
    commonReference
  ],
};

/**
 * Get structured references for a syndrome
 */
export function getStructuredReferences(syndromeId: string | null): ReferenceItem[] {
  if (!syndromeId) {
    return [commonReference];
  }
  return referencesBySyndrome[syndromeId] || [commonReference];
}

/**
 * Get all available references
 */
export function getAllReferences(): Record<string, ReferenceItem[]> {
  return referencesBySyndrome;
}

/**
 * Get common reference
 */
export function getCommonReference(): ReferenceItem {
  return commonReference;
}
