
import { AnamnesisSection, Symptom } from '@/lib/types/medical';

interface ReferenceItem {
  source: string;
  title: string;
  url: string;
  evidenceLevel: string;
  year: string;
}

// --- Logic Generators ---

/**
 * Retorna a seção de metadados da queixa.
 * Agora suporta customização baseada na síndrome.
 */
export const getMetaSection = (syndromeId?: string): AnamnesisSection => {
  const items: Symptom[] = [
    { 
      id: 'meta_intensity', 
      label: 'Intensidade da Dor/Queixa (0-10)', 
      type: 'range', 
      min: 0, 
      max: 10, 
      value: '0',
      step: 1
    },
    {
      id: 'meta_chronicity',
      label: 'Cronologia',
      type: 'segment',
      options: ['Agudo', 'Subagudo', 'Crônico'],
      value: 'Agudo'
    }
  ];

  if (syndromeId === 'CHEST_PAIN') {
    items.push({
      id: 'meta_onset',
      label: 'Tipo de Início',
      type: 'segment',
      options: ['Súbito', 'Progressivo', 'Insidioso'],
      value: 'Súbito'
    });
  }

  items.push({
    id: 'meta_duration',
    label: 'Tempo de Evolução',
    type: 'text',
    placeholder: 'Ex: 2 horas, 3 dias...',
    value: ''
  });

  return {
    id: 'meta_characterization',
    title: 'Caracterização da Queixa',
    items
  };
};

export const getPhysicalExamSection = (syndromeId: string): AnamnesisSection => {
  const commonItems: Symptom[] = [
    { id: 'ef_geral', label: 'Estado Geral', type: 'segment', options: ['BEG', 'REG', 'MEG'], value: 'BEG' },
    { id: 'ef_mucosas', label: 'Mucosas', type: 'segment', options: ['Coradas', 'Hipocoradas', 'Descoradas'], value: 'Coradas' },
  ];

  const specificItems: Symptom[] = [];

  if (syndromeId === 'CHEST_PAIN' || syndromeId === 'DYSPNEA') {
    specificItems.push(
      { id: 'ef_acv_ritmo', label: 'Ritmo Cardíaco', type: 'segment', options: ['Regular', 'Irregular'], value: 'Regular' },
      { id: 'ef_ar_mv', label: 'Murmúrio Vesicular', type: 'segment', options: ['Presente', 'Diminuído'], value: 'Presente' }
    );
  }
 else if (syndromeId === 'dor_abdominal') {
    specificItems.push(
      { id: 'ef_abd_forma', label: 'Abdome', type: 'segment', options: ['Plano', 'Globoso', 'Distendido'], value: 'Plano' },
      { id: 'ef_abd_rha', label: 'RHA', type: 'segment', options: ['Presentes', 'Aumentados', 'Diminuídos/Ausentes'], value: 'Presentes' },
      { id: 'ef_abd_dor', label: 'Dor à Palpação', type: 'boolean', checked: true },
      { id: 'ef_abd_db', label: 'Descompressão Brusca (DB)', type: 'boolean', isRedFlag: true },
      { id: 'ef_abd_murphy', label: 'Sinal de Murphy', type: 'boolean' }
    );
  } else if (syndromeId === 'neuro_deficit' || syndromeId === 'cefaleia' || syndromeId === 'trauma') {
    specificItems.push(
      { id: 'ef_neuro_glasgow', label: 'Glasgow (3-15)', type: 'range', min: 3, max: 15, value: '15', step: 1 },
      { id: 'ef_neuro_pupilas', label: 'Pupilas', type: 'segment', options: ['Isocóricas', 'Anisocóricas'], value: 'Isocóricas' },
      { id: 'ef_neuro_deficit', label: 'Déficit Motor Focal', type: 'boolean', isRedFlag: true },
      { id: 'ef_neuro_rigidez', label: 'Rigidez de Nuca', type: 'boolean', isRedFlag: true }
    );
  } else {
    specificItems.push(
      { id: 'ef_ar_mv', label: 'Murmúrio Vesicular', type: 'segment', options: ['Presente', 'Diminuído'], value: 'Presente' },
      { id: 'ef_acv_ritmo', label: 'Ritmo Cardíaco', type: 'segment', options: ['Regular', 'Irregular'], value: 'Regular' },
      { id: 'ef_abd_livre', label: 'Abdome Livre', type: 'boolean', checked: true }
    );
  }

  return {
    id: 'exame_fisico',
    title: 'Exame Físico Direcionado',
    items: [...commonItems, ...specificItems]
  };
};

export const getProtocolData = (syndromeId: string): AnamnesisSection[] => {
  const meta = getMetaSection();
  const physicalExam = getPhysicalExamSection(syndromeId);

  let coreSections: AnamnesisSection[] = [];

  switch (syndromeId) {
    case 'dor_toracica':
      coreSections = [
        {
          id: 'queixa',
          title: 'Característica da Dor',
          items: [
            { id: 'tipo_opressiva', label: 'Tipo Opressivo', type: 'boolean', checked: true },
            { id: 'tipo_pontada', label: 'Tipo Pontada/Agulhada', type: 'boolean' },
            { id: 'tipo_queimacao', label: 'Tipo Queimação', type: 'boolean' },
            { id: 'irrad_mse', label: 'Irradiação para MSE', type: 'boolean', isRedFlag: true },
            { id: 'irrad_mandibula', label: 'Irradiação para Mandíbula', type: 'boolean' },
            { id: 'piora_esforco', label: 'Piora ao Esforço', type: 'boolean', isRedFlag: true },
          ]
        },
        {
          id: 'hda',
          title: 'Sintomas Associados',
          items: [
            { id: 'dispneia', label: 'Dispneia', type: 'boolean', isRedFlag: true },
            { id: 'nauseas', label: 'Náuseas/Vômitos', type: 'boolean', checked: true },
            { id: 'sudorese', label: 'Sudorese Fria', type: 'boolean', checked: true },
            { id: 'sincope', label: 'Síncope/Pré-síncope', type: 'boolean', isRedFlag: true },
          ]
        },
        {
          id: 'antecedentes',
          title: 'Fatores de Risco CV',
          items: [
            { id: 'has', label: 'Hipertensão (HAS)', type: 'boolean', checked: true },
            { id: 'dm', label: 'Diabetes (DM)', type: 'boolean' },
            { id: 'tabagismo', label: 'Tabagismo', type: 'boolean' },
            { id: 'dislipidemia', label: 'Dislipidemia', type: 'boolean', checked: true },
            { id: 'hist_fam', label: 'Histórico Familiar Precoce', type: 'boolean' },
            { id: 'obesidade', label: 'Obesidade', type: 'boolean' },
          ]
        },
      ];
      break;

    case 'dor_abdominal':
      coreSections = [
        {
          id: 'queixa',
          title: 'Localização e Tipo',
          items: [
            { 
              id: 'dor_localizada', 
              label: 'Local da Dor', 
              type: 'multiSelect', 
              options: ['Epigástrio', 'Hipo. Direito', 'Hipo. Esquerdo', 'Mesogástrio', 'FID', 'FIE', 'Hipogástrio', 'Dorso', 'Flancos'],
              value: [] as string[] 
            },
            { id: 'tipo_colica', label: 'Tipo Cólica', type: 'boolean', checked: true },
            { id: 'tipo_continua', label: 'Tipo Contínua', type: 'boolean' },
            { id: 'irrad_dorso', label: 'Irradiação para Dorso', type: 'boolean' },
          ]
        },
        {
          id: 'hda',
          title: 'Sinais de Alarme',
          items: [
            { id: 'db_positivo', label: 'Descompressão Brusca +', type: 'boolean', isRedFlag: true },
            { id: 'defesa', label: 'Defesa Abdominal / Rigidez', type: 'boolean', isRedFlag: true },
            { id: 'associacao_trauma', label: 'Associação com Trauma', type: 'boolean', isRedFlag: true },
            { id: 'irrad_ombro', label: 'Dor irradia para ombro/escápula', type: 'boolean', isRedFlag: true },
            { id: 'parada_gases', label: 'Parada de Eliminação de Gases', type: 'boolean', isRedFlag: true },
            { id: 'hematemese', label: 'Hematêmese / Melena', type: 'boolean', isRedFlag: true },
          ]
        }
      ];
      break;

    default:
      coreSections = [
        {
          id: 'queixa',
          title: 'Caracterização Específica',
          items: [
            { id: 'sintoma_principal', label: 'Sintoma Predominante', type: 'boolean', checked: true },
            { id: 'sintoma_persistente', label: 'Persistente', type: 'boolean' },
          ]
        },
        {
          id: 'red_flags',
          title: 'Sinais de Alarme Gerais',
          items: [
            { id: 'sinais_vitais', label: 'Instabilidade de Sinais Vitais', type: 'boolean', isRedFlag: true },
            { id: 'rebaixamento', label: 'Rebaixamento Sensório', type: 'boolean', isRedFlag: true },
            { id: 'dor_intensa', label: 'Dor Intratável', type: 'boolean', isRedFlag: true },
          ]
        }
      ];
      break;
  }

  return [meta, ...coreSections, physicalExam];
};

export const getHypotheses = (protocolId: string | null): string[] => {
  switch (protocolId) {
    case 'dor_toracica':
      return [
        "1. Síndrome Coronariana Aguda (I20.0)",
        "2. Embolia Pulmonar",
        "3. Dissecção Aórtica (Descartar)",
        "4. Dor Torácica Osteomuscular"
      ];
    case 'dor_abdominal':
      return [
        "1. Abdome Agudo Inflamatório (R10.0)",
        "2. Gastroenterocolite Aguda",
        "3. Litíase Renal / Ureterolitíase"
      ];
    case 'cefaleia':
      return [
        "1. Enxaqueca sem aura (G43.0)",
        "2. Cefaleia Tensional",
        "3. Hemorragia Subaracnoidea (Descartar Red Flag)"
      ];
    case 'dispneia':
      return [
        "1. Insuficiência Respiratória Aguda (J96.0)",
        "2. Descompensação de DPOC/Asma",
        "3. Insuficiência Cardíaca Congestiva"
      ];
    case 'neuro_deficit':
      return [
        "1. Acidente Vascular Cerebral Isquêmico (I63.9)",
        "2. Ataque Isquêmico Transitório (AIT)",
        "3. AVC Hemorrágico (Descartar)"
      ];
    default:
      return [
        "1. Síndrome a Esclarecer (R69)",
        "2. Infecção Viral Inespecífica",
        "3. Desordem Metabólica"
      ];
  }
};

export const getStructuredReferences = (protocolId: string | null): ReferenceItem[] => {
  const commonRef: ReferenceItem = {
    source: 'ABRAMEDE',
    title: 'Diretrizes da Associação Brasileira de Medicina de Emergência',
    url: '#',
    evidenceLevel: 'Consenso',
    year: '2023'
  };

  switch(protocolId) {
    case 'dor_toracica':
      return [
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
        commonRef
      ];
    case 'dor_abdominal':
      return [
        {
          source: 'WSES',
          title: 'World Society of Emergency Surgery Guidelines for Acute Abdomen',
          url: '#',
          evidenceLevel: 'Nível 1B',
          year: '2020'
        },
        {
          source: 'UpToDate',
          title: 'Evaluation of the adult with abdominal pain',
          url: '#',
          evidenceLevel: 'Nível 2A',
          year: '2024'
        },
        commonRef
      ];
    default:
      return [commonRef];
  }
};

export const mapComplaintToProtocol = (complaintId: string): string => {
   if (complaintId.startsWith('CV_')) return 'dor_toracica';
   if (complaintId.startsWith('GI_')) return 'dor_abdominal';
   if (complaintId.includes('STROKE') || complaintId.includes('SEIZURE')) return 'neuro_deficit';
   if (complaintId.includes('HEADACHE')) return 'cefaleia';
   if (complaintId.includes('DYSPNEA') || complaintId.includes('STRIDOR') || complaintId.includes('COUGH')) return 'dispneia';
   if (complaintId.includes('SYNCOPE')) return 'sincope';
   if (complaintId.includes('TRAUMA') || complaintId.includes('HEAD_INJURY')) return 'trauma';
   if (complaintId.includes('FEVER')) return 'febre';
   if (complaintId.includes('LOMBALGIA') || complaintId.includes('BACK_PAIN')) return 'lombalgia';
   
   return 'general'; 
};

export const getCalculatorsForGroup = (groupCode: string) => {
    const map: Record<string, string> = {
        'PROTO_SEPSE': 'Bundle 1h / qSOFA',
        'PROTO_AVC': 'NIHSS / ASPECTS',
        'PROTO_IC': 'Perfil Stevenson',
        'PROTO_TEP': 'Wells / Geneva',
        'CV': 'HEART Score / TIMI',
        'NC': 'NIHSS / Glasgow',
        'RC': 'Wells / PERC',
        'GI': 'Alvarado',
        'INF': 'qSOFA / NEWS2',
        'TR': 'Glasgow / ABCDE'
    };
    return map[groupCode];
};
