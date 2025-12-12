/**
 * Medical References Configuration
 * Evidence-based references for each syndrome
 * Migrated from Google AI Studio frontend
 */

import type { ReferenceItem } from '@/types/frontend';

// Common reference used across protocols
const commonReference: ReferenceItem = {
  source: 'ABRAMEDE',
  title: 'Diretrizes da Associação Brasileira de Medicina de Emergência',
  url: 'https://abramede.com.br/diretrizes',
  evidenceLevel: 'Consenso',
  year: '2023'
};

// References by syndrome ID
const referencesBySyndrome: Record<string, ReferenceItem[]> = {
  dor_toracica: [
    {
      source: 'SBC',
      title: 'Diretriz da Sociedade Brasileira de Cardiologia sobre Angina Instável e IAM',
      url: 'https://www.portal.cardiol.br/diretrizes',
      evidenceLevel: 'Nível 1A',
      year: '2021'
    },
    {
      source: 'AHA / ACC',
      title: 'Guideline for the Evaluation and Diagnosis of Chest Pain',
      url: 'https://www.ahajournals.org',
      evidenceLevel: 'Nível 1A',
      year: '2021'
    },
    commonReference
  ],

  dor_abdominal: [
    {
      source: 'WSES',
      title: 'World Society of Emergency Surgery Guidelines for Acute Abdomen',
      url: 'https://wses.org.uk/guidelines',
      evidenceLevel: 'Nível 1B',
      year: '2020'
    },
    {
      source: 'UpToDate',
      title: 'Evaluation of the adult with abdominal pain',
      url: 'https://www.uptodate.com',
      evidenceLevel: 'Nível 2A',
      year: '2024'
    },
    commonReference
  ],

  cefaleia: [
    {
      source: 'IHS',
      title: 'International Classification of Headache Disorders (ICHD-3)',
      url: 'https://ichd-3.org',
      evidenceLevel: 'Nível 1A',
      year: '2018'
    },
    {
      source: 'ACEP',
      title: 'Clinical Policy: Critical Issues in the Evaluation of Adult Patients Presenting to the Emergency Department With Acute Headache',
      url: 'https://www.acep.org',
      evidenceLevel: 'Nível 1B',
      year: '2019'
    },
    commonReference
  ],

  dispneia: [
    {
      source: 'GOLD',
      title: 'Global Initiative for Chronic Obstructive Lung Disease - COPD Guidelines',
      url: 'https://goldcopd.org',
      evidenceLevel: 'Nível 1A',
      year: '2024'
    },
    {
      source: 'GINA',
      title: 'Global Initiative for Asthma - Guidelines',
      url: 'https://ginasthma.org',
      evidenceLevel: 'Nível 1A',
      year: '2024'
    },
    commonReference
  ],

  neuro_deficit: [
    {
      source: 'AHA / ASA',
      title: 'Guidelines for the Early Management of Patients With Acute Ischemic Stroke',
      url: 'https://www.ahajournals.org',
      evidenceLevel: 'Nível 1A',
      year: '2019'
    },
    {
      source: 'Ministério da Saúde',
      title: 'Linha de Cuidado do AVC no Adulto',
      url: 'https://www.gov.br/saude',
      evidenceLevel: 'Consenso',
      year: '2021'
    },
    commonReference
  ],

  sincope: [
    {
      source: 'ESC',
      title: 'Guidelines for the Diagnosis and Management of Syncope',
      url: 'https://www.escardio.org',
      evidenceLevel: 'Nível 1A',
      year: '2018'
    },
    commonReference
  ],

  febre: [
    {
      source: 'SSC',
      title: 'Surviving Sepsis Campaign Guidelines',
      url: 'https://www.sccm.org/SurvivingSepsisCampaign',
      evidenceLevel: 'Nível 1A',
      year: '2021'
    },
    {
      source: 'ILAS',
      title: 'Instituto Latino Americano de Sepse - Protocolos',
      url: 'https://ilas.org.br',
      evidenceLevel: 'Consenso',
      year: '2023'
    },
    commonReference
  ],

  trauma: [
    {
      source: 'ATLS',
      title: 'Advanced Trauma Life Support Guidelines',
      url: 'https://www.facs.org/atls',
      evidenceLevel: 'Nível 1A',
      year: '2018'
    },
    {
      source: 'SBAIT',
      title: 'Sociedade Brasileira de Atendimento Integrado ao Traumatizado',
      url: 'https://sbait.org.br',
      evidenceLevel: 'Consenso',
      year: '2022'
    },
    commonReference
  ],

  lombalgia: [
    {
      source: 'ACP',
      title: 'American College of Physicians Clinical Guideline for Low Back Pain',
      url: 'https://www.acponline.org',
      evidenceLevel: 'Nível 1B',
      year: '2017'
    },
    commonReference
  ],

  psiquiatria: [
    {
      source: 'ABP',
      title: 'Associação Brasileira de Psiquiatria - Diretrizes para Emergências',
      url: 'https://www.abp.org.br',
      evidenceLevel: 'Consenso',
      year: '2022'
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
