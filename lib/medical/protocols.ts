/**
 * Medical Protocols Configuration
 * Protocol data and anamnesis sections for each syndrome
 * Migrated from Google AI Studio frontend
 */

import type { AnamnesisSection, Symptom } from '@/types/frontend';

/**
 * Get meta characterization section (common to all protocols)
 */
export function getMetaSection(customTitle: string = 'Caracterização da Queixa'): AnamnesisSection {
  return {
    id: 'meta_characterization',
    title: customTitle,
    items: [
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
      },
      {
        id: 'meta_onset',
        label: 'Tipo de Início',
        type: 'segment',
        options: ['Súbito', 'Progressivo', 'Insidioso'],
        value: 'Súbito'
      },
      {
        id: 'meta_duration',
        label: 'Tempo de Evolução',
        type: 'text',
        placeholder: 'Ex: 2 horas, 3 dias...',
        value: ''
      }
    ]
  };
}

/**
 * Get physical exam section based on syndrome
 */
export function getPhysicalExamSection(syndromeId: string): AnamnesisSection {
  const commonItems: Symptom[] = [
    { id: 'ef_geral', label: 'Estado Geral', type: 'segment', options: ['BEG', 'REG', 'MEG'], value: 'BEG' },
    { id: 'ef_mucosas', label: 'Mucosas', type: 'segment', options: ['Coradas', 'Hipocoradas', 'Descoradas'], value: 'Coradas' },
    { id: 'ef_hidratacao', label: 'Hidratação', type: 'segment', options: ['Hidratado', 'Desidratado'], value: 'Hidratado' },
  ];

  const specificItems: Symptom[] = [];

  // Cardiovascular / Respiratory syndromes
  if (syndromeId === 'dor_toracica' || syndromeId === 'dispneia' || syndromeId === 'sincope') {
    specificItems.push(
      { id: 'ef_acv_ritmo', label: 'Ritmo Cardíaco', type: 'segment', options: ['Regular', 'Irregular'], value: 'Regular' },
      { id: 'ef_acv_sopro', label: 'Sopros', type: 'boolean' },
      { id: 'ef_ar_mv', label: 'Murmúrio Vesicular', type: 'segment', options: ['Presente', 'Diminuído'], value: 'Presente' },
      { id: 'ef_ar_ra', label: 'Ruídos Adventícios', type: 'multiSelect', options: ['Creptos', 'Sibilos', 'Roncos'], value: [] },
      { id: 'ef_perfusao', label: 'Perfusão Periférica', type: 'segment', options: ['<3s', '>3s'], value: '<3s' },
      { id: 'ef_turgencia', label: 'Turgência Jugular', type: 'boolean', isRedFlag: true }
    );
  }
  // Abdominal syndromes
  else if (syndromeId === 'dor_abdominal') {
    specificItems.push(
      { id: 'ef_abd_forma', label: 'Abdome', type: 'segment', options: ['Plano', 'Globoso', 'Distendido'], value: 'Plano' },
      { id: 'ef_abd_rha', label: 'RHA', type: 'segment', options: ['Presentes', 'Aumentados', 'Diminuídos/Ausentes'], value: 'Presentes' },
      { id: 'ef_abd_dor', label: 'Dor à Palpação', type: 'boolean', checked: true },
      { id: 'ef_abd_db', label: 'Descompressão Brusca (DB)', type: 'boolean', isRedFlag: true },
      { id: 'ef_abd_murphy', label: 'Sinal de Murphy', type: 'boolean' }
    );
  }
  // Neurological syndromes
  else if (syndromeId === 'neuro_deficit' || syndromeId === 'cefaleia' || syndromeId === 'trauma') {
    specificItems.push(
      { id: 'ef_neuro_glasgow', label: 'Glasgow (3-15)', type: 'range', min: 3, max: 15, value: '15', step: 1 },
      { id: 'ef_neuro_pupilas', label: 'Pupilas', type: 'segment', options: ['Isocóricas', 'Anisocóricas'], value: 'Isocóricas' },
      { id: 'ef_neuro_deficit', label: 'Déficit Motor Focal', type: 'boolean', isRedFlag: true },
      { id: 'ef_neuro_rigidez', label: 'Rigidez de Nuca', type: 'boolean', isRedFlag: true }
    );
  }
  // Default examination
  else {
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
}

/**
 * Get protocol data (anamnesis sections) for a syndrome
 */
export function getProtocolData(syndromeId: string): AnamnesisSection[] {
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
              value: []
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

    case 'cefaleia':
      coreSections = [
        {
          id: 'queixa',
          title: 'Característica da Cefaleia',
          items: [
            { id: 'tipo_pulsatil', label: 'Tipo Pulsátil', type: 'boolean' },
            { id: 'tipo_pressao', label: 'Tipo Pressão', type: 'boolean' },
            { id: 'tipo_pontada', label: 'Tipo Pontada', type: 'boolean' },
            { id: 'localizacao', label: 'Localização', type: 'multiSelect', options: ['Frontal', 'Temporal', 'Occipital', 'Holocraniana', 'Unilateral'], value: [] },
          ]
        },
        {
          id: 'hda',
          title: 'Sinais de Alarme',
          items: [
            { id: 'pior_cefaleia', label: 'Pior cefaleia da vida', type: 'boolean', isRedFlag: true },
            { id: 'inicio_subito', label: 'Início súbito (em segundos)', type: 'boolean', isRedFlag: true },
            { id: 'febre_cefaleia', label: 'Febre associada', type: 'boolean', isRedFlag: true },
            { id: 'alteracao_consciencia', label: 'Alteração de consciência', type: 'boolean', isRedFlag: true },
            { id: 'deficit_focal', label: 'Déficit neurológico focal', type: 'boolean', isRedFlag: true },
            { id: 'rigidez_nuca', label: 'Rigidez de nuca', type: 'boolean', isRedFlag: true },
          ]
        }
      ];
      break;

    case 'dispneia':
      coreSections = [
        {
          id: 'queixa',
          title: 'Característica da Dispneia',
          items: [
            { id: 'dispneia_repouso', label: 'Dispneia em repouso', type: 'boolean', isRedFlag: true },
            { id: 'dispneia_esforco', label: 'Dispneia aos esforços', type: 'boolean' },
            { id: 'ortopneia', label: 'Ortopneia', type: 'boolean' },
            { id: 'dnd', label: 'Dispneia Noturna (DND)', type: 'boolean' },
          ]
        },
        {
          id: 'hda',
          title: 'Sintomas Associados',
          items: [
            { id: 'dor_toracica_disp', label: 'Dor torácica', type: 'boolean', isRedFlag: true },
            { id: 'tosse_disp', label: 'Tosse', type: 'boolean' },
            { id: 'expectoracao', label: 'Expectoração', type: 'multiSelect', options: ['Clara', 'Amarelada', 'Esverdeada', 'Sanguinolenta'], value: [] },
            { id: 'sibilos', label: 'Sibilos audíveis', type: 'boolean' },
            { id: 'edema_mmii', label: 'Edema de MMII', type: 'boolean' },
          ]
        }
      ];
      break;

    case 'neuro_deficit':
      coreSections = [
        {
          id: 'queixa',
          title: 'Déficit Neurológico',
          items: [
            { id: 'paresia_face', label: 'Paresia facial', type: 'boolean', isRedFlag: true },
            { id: 'paresia_msd', label: 'Paresia MSD', type: 'boolean', isRedFlag: true },
            { id: 'paresia_mse', label: 'Paresia MSE', type: 'boolean', isRedFlag: true },
            { id: 'paresia_mid', label: 'Paresia MID', type: 'boolean', isRedFlag: true },
            { id: 'paresia_mie', label: 'Paresia MIE', type: 'boolean', isRedFlag: true },
            { id: 'disartria', label: 'Disartria', type: 'boolean', isRedFlag: true },
            { id: 'afasia', label: 'Afasia', type: 'boolean', isRedFlag: true },
          ]
        },
        {
          id: 'hda',
          title: 'Tempo e Sintomas',
          items: [
            { id: 'hora_inicio', label: 'Hora de início conhecida', type: 'boolean' },
            { id: 'janela_trombolise', label: 'Dentro da janela (< 4.5h)', type: 'boolean' },
            { id: 'cefaleia_subita', label: 'Cefaleia súbita intensa', type: 'boolean', isRedFlag: true },
            { id: 'vomitos_avc', label: 'Vômitos', type: 'boolean' },
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
}

/**
 * Get diagnostic hypotheses for a syndrome
 */
export function getHypotheses(protocolId: string | null): string[] {
  switch (protocolId) {
    case 'dor_toracica':
      return [
        '1. Síndrome Coronariana Aguda (I20.0)',
        '2. Embolia Pulmonar',
        '3. Dissecção Aórtica (Descartar)',
        '4. Dor Torácica Osteomuscular'
      ];
    case 'dor_abdominal':
      return [
        '1. Abdome Agudo Inflamatório (R10.0)',
        '2. Gastroenterocolite Aguda',
        '3. Litíase Renal / Ureterolitíase'
      ];
    case 'cefaleia':
      return [
        '1. Enxaqueca sem aura (G43.0)',
        '2. Cefaleia Tensional',
        '3. Hemorragia Subaracnoidea (Descartar Red Flag)'
      ];
    case 'dispneia':
      return [
        '1. Insuficiência Respiratória Aguda (J96.0)',
        '2. Descompensação de DPOC/Asma',
        '3. Insuficiência Cardíaca Congestiva'
      ];
    case 'neuro_deficit':
      return [
        '1. Acidente Vascular Cerebral Isquêmico (I63.9)',
        '2. Ataque Isquêmico Transitório (AIT)',
        '3. AVC Hemorrágico (Descartar)'
      ];
    case 'sincope':
      return [
        '1. Síncope Vasovagal (R55)',
        '2. Síncope Cardíaca (Arritmia)',
        '3. Hipotensão Ortostática'
      ];
    case 'febre':
      return [
        '1. Sepse (A41.9)',
        '2. Infecção do Trato Urinário',
        '3. Pneumonia Comunitária'
      ];
    case 'trauma':
      return [
        '1. Traumatismo Cranioencefálico',
        '2. Fratura',
        '3. Contusão de Partes Moles'
      ];
    default:
      return [
        '1. Síndrome a Esclarecer (R69)',
        '2. Infecção Viral Inespecífica',
        '3. Desordem Metabólica'
      ];
  }
}

/**
 * Map complaint ID to protocol ID
 */
export function mapComplaintToProtocol(complaintId: string): string {
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
}

/**
 * Get calculators for a complaint group
 */
export function getCalculatorsForGroup(groupCode: string): string | undefined {
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
}
