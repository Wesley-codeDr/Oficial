/**
 * New Complaints - 50+ novas queixas para o WellWave
 * Organizadas por grupo médico
 */

import type { Complaint } from '@/lib/types/medical'
import { newComplaintsPart2 } from './newComplaintsPart2'

const timestamp = new Date().toISOString()

// ============================================
// CV - CARDIOVASCULAR (+5)
// ============================================
const cvComplaints: Complaint[] = [
  {
    id: 'CV_HYPERTENSIVE_CRISIS',
    group: 'CV',
    title: 'Crise hipertensiva',
    subtitle: 'Pressão muito alta com ou sem sintomas',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['pressão alta', 'emergência hipertensiva'],
    searchTerms: ['crise hipertensiva', 'pressão muito alta', 'emergência hipertensiva', 'urgência hipertensiva'],
    synonyms: ['emergência hipertensiva', 'urgência hipertensiva', 'pico de pressão'],
    relatedSymptoms: ['Cefaleia', 'Náuseas', 'Alteração visual', 'Dor torácica'],
    bodySystem: ['cardiovascular'],
    severity: 5,
    icd10Codes: ['I16.0', 'I16.1'],
    extendedContent: {
      redFlags: ['PA > 180x120 mmHg com LOA', 'Cefaleia intensa', 'Alteração visual', 'Dor torácica', 'Dispneia', 'Déficit neurológico', 'Epistaxe volumosa'],
      diagnosticoDiferencial: ['Emergência hipertensiva', 'Urgência hipertensiva', 'Hipertensão secundária', 'Feocromocitoma'],
      condutaInicial: '1. Monitorização contínua\n2. Classificar: emergência vs urgência\n3. Emergência: reduzir 20-25% em 1h (nitroprussiato/nitroglicerina IV)\n4. Urgência: reduzir gradual em 24-48h (captopril VO)',
      calculadoras: ['Classificação de emergência vs urgência'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'CV_ACUTE_LIMB_ISCHEMIA',
    group: 'CV',
    title: 'Isquemia aguda de membro',
    subtitle: 'Membro frio, pálido, sem pulso',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['perna fria', 'sem pulso'],
    searchTerms: ['isquemia de membro', 'perna fria', 'sem pulso', 'membro isquêmico'],
    synonyms: ['oclusão arterial aguda', 'trombose arterial', 'embolia arterial'],
    relatedSymptoms: ['Dor intensa', 'Palidez', 'Frialdade', 'Paralisia', 'Parestesia'],
    bodySystem: ['cardiovascular'],
    severity: 5,
    icd10Codes: ['I74.3', 'I74.4'],
    extendedContent: {
      redFlags: ['6 Ps: Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia', 'Membro frio e pálido', 'Ausência de pulsos distais', 'Déficit motor/sensitivo'],
      diagnosticoDiferencial: ['Embolia arterial', 'Trombose arterial', 'Dissecção aórtica', 'Síndrome compartimental'],
      condutaInicial: '1. Heparinização imediata\n2. Analgesia\n3. Membro em posição neutra\n4. Cirurgia vascular URGENTE\n5. Janela: 6 horas para revascularização',
      calculadoras: ['Classificação de Rutherford'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'CV_AORTIC_DISSECTION',
    group: 'CV',
    title: 'Dissecção de aorta',
    subtitle: 'Dor torácica rasgante irradiando para dorso',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['dor rasgante', 'irradiação dorso'],
    searchTerms: ['dissecção aórtica', 'dor rasgante', 'aneurisma dissecante'],
    synonyms: ['aneurisma dissecante', 'dissecção aórtica aguda'],
    relatedSymptoms: ['Dor torácica intensa', 'Irradiação para dorso', 'Assimetria de pulsos', 'Síncope'],
    bodySystem: ['cardiovascular'],
    severity: 5,
    icd10Codes: ['I71.0'],
    extendedContent: {
      redFlags: ['Dor torácica de início súbito, máxima intensidade desde o início', 'Irradiação para dorso', 'Assimetria de PA entre membros', 'Déficit de pulso', 'Síncope'],
      diagnosticoDiferencial: ['IAM', 'TEP', 'Pneumotórax', 'Pericardite', 'Ruptura esofágica'],
      condutaInicial: '1. FC < 60 e PAS 100-120\n2. Betabloqueador IV (esmolol/labetalol)\n3. Analgesia com opioide\n4. AngioTC de aorta URGENTE\n5. Cirurgia cardíaca se tipo A',
      calculadoras: ['ADD-RS Score', 'Classificação de Stanford'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'CV_HEART_FAILURE_ACUTE',
    group: 'CV',
    title: 'Insuficiência cardíaca descompensada',
    subtitle: 'Falta de ar, inchaço nas pernas, cansaço',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['falta de ar', 'edema', 'ortopneia'],
    searchTerms: ['insuficiência cardíaca', 'ic descompensada', 'edema agudo de pulmão'],
    synonyms: ['IC descompensada', 'EAP', 'congestão pulmonar'],
    relatedSymptoms: ['Dispneia', 'Ortopneia', 'DPN', 'Edema de MMII', 'Fadiga'],
    bodySystem: ['cardiovascular'],
    severity: 5,
    icd10Codes: ['I50.1', 'I50.9'],
    extendedContent: {
      redFlags: ['SpO2 < 90%', 'Uso de musculatura acessória', 'Hipotensão', 'Alteração de consciência', 'Choque cardiogênico'],
      diagnosticoDiferencial: ['IC sistólica', 'IC diastólica', 'Síndrome coronariana', 'TEP', 'Pneumonia'],
      condutaInicial: '1. Sentar paciente (diminui retorno venoso)\n2. O2 se SpO2 < 92%\n3. VNI se desconforto respiratório\n4. Furosemida IV\n5. Nitrato SL/IV se PA > 100\n6. Morfina se ansiedade intensa',
      calculadoras: ['Perfil hemodinâmico (Stevenson)', 'BNP/NT-proBNP'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'CV_BRADYCARDIA',
    group: 'CV',
    title: 'Bradicardia sintomática',
    subtitle: 'Coração lento com tontura ou desmaio',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['coração lento', 'tontura'],
    searchTerms: ['bradicardia', 'coração lento', 'fc baixa'],
    synonyms: ['frequência cardíaca baixa', 'bloqueio cardíaco'],
    relatedSymptoms: ['Tontura', 'Síncope', 'Fadiga', 'Dispneia'],
    bodySystem: ['cardiovascular'],
    severity: 3,
    icd10Codes: ['R00.1', 'I44.2'],
    extendedContent: {
      redFlags: ['FC < 40 bpm', 'Hipotensão', 'Síncope', 'Sinais de baixo débito', 'BAV de alto grau'],
      diagnosticoDiferencial: ['BAV', 'Doença do nó sinusal', 'Hipotireoidismo', 'Intoxicação por betabloqueador/digital'],
      condutaInicial: '1. ECG 12 derivações\n2. Atropina 0,5mg IV (até 3mg)\n3. Marcapasso transcutâneo se refratário\n4. Adrenalina/Dopamina se hipotensão\n5. Avaliar causa reversível',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// RC - RESPIRATÓRIO (+5)
// ============================================
const rcComplaints: Complaint[] = [
  {
    id: 'RC_ASTHMA_ATTACK',
    group: 'RC',
    title: 'Crise de asma',
    subtitle: 'Chiado no peito, falta de ar, tosse',
    ageTargets: ['adult', 'child'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['chiado', 'broncoespasmo'],
    searchTerms: ['crise de asma', 'broncoespasmo', 'chiado no peito'],
    synonyms: ['exacerbação de asma', 'broncoespasmo agudo'],
    relatedSymptoms: ['Dispneia', 'Sibilância', 'Tosse', 'Aperto no peito'],
    bodySystem: ['respiratorio'],
    severity: 3,
    icd10Codes: ['J45.9', 'J46'],
    extendedContent: {
      redFlags: ['Fala entrecortada', 'SpO2 < 92%', 'Silêncio auscultatório', 'Alteração de consciência', 'Cianose', 'Peak flow < 50%'],
      diagnosticoDiferencial: ['Asma', 'DPOC exacerbado', 'Bronquite', 'Pneumonia', 'IC', 'Anafilaxia'],
      condutaInicial: '1. O2 para SpO2 > 94%\n2. Beta-2 inalatório (salbutamol 4-8 puffs ou NBZ)\n3. Corticoide sistêmico (prednisona 40-60mg ou hidrocortisona IV)\n4. Brometo de ipratrópio se grave\n5. Sulfato de magnésio IV se refratário',
      calculadoras: ['Peak Flow', 'Classificação de gravidade da crise'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'RC_COPD_EXACERBATION',
    group: 'RC',
    title: 'DPOC exacerbado',
    subtitle: 'Piora da falta de ar e catarro em paciente com DPOC',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['dpoc', 'bronquite crônica'],
    searchTerms: ['dpoc exacerbado', 'enfisema', 'bronquite crônica'],
    synonyms: ['exacerbação de DPOC', 'descompensação de DPOC'],
    relatedSymptoms: ['Dispneia', 'Aumento do escarro', 'Escarro purulento', 'Sibilos'],
    bodySystem: ['respiratorio'],
    severity: 4,
    icd10Codes: ['J44.1'],
    extendedContent: {
      redFlags: ['SpO2 < 88%', 'Acidose respiratória', 'Alteração de consciência', 'Exaustão', 'Tórax silencioso'],
      diagnosticoDiferencial: ['Infecção respiratória', 'Pneumonia', 'TEP', 'Pneumotórax', 'IC'],
      condutaInicial: '1. O2 controlado (alvo SpO2 88-92%)\n2. Beta-2 + anticolinérgico inalatório\n3. Corticoide sistêmico\n4. Antibiótico se escarro purulento\n5. VNI se acidose/hipercapnia',
      calculadoras: ['GOLD', 'Critérios de Anthonisen'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'RC_PNEUMONIA',
    group: 'RC',
    title: 'Pneumonia',
    subtitle: 'Febre, tosse com catarro, falta de ar',
    ageTargets: ['adult', 'child', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['infecção pulmonar', 'febre'],
    searchTerms: ['pneumonia', 'infecção pulmonar', 'pulmonia'],
    synonyms: ['infecção pulmonar', 'pulmonia'],
    relatedSymptoms: ['Febre', 'Tosse produtiva', 'Dispneia', 'Dor pleurítica'],
    bodySystem: ['respiratorio'],
    severity: 3,
    icd10Codes: ['J18.9', 'J15.9'],
    extendedContent: {
      redFlags: ['SpO2 < 92%', 'PA < 90x60', 'Confusão mental', 'FR > 30', 'Ureia > 50'],
      diagnosticoDiferencial: ['PAC', 'PAH', 'Bronquite', 'TB', 'Neoplasia'],
      condutaInicial: '1. Estratificar gravidade (CURB-65 ou PSI)\n2. O2 se SpO2 < 92%\n3. Hidratação\n4. Antibioticoterapia empírica\n5. Analgesia/antitérmico',
      calculadoras: ['CURB-65', 'PSI/PORT'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'RC_PNEUMOTHORAX',
    group: 'RC',
    title: 'Pneumotórax',
    subtitle: 'Dor súbita no peito com falta de ar',
    ageTargets: ['adult'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['colapso pulmonar'],
    searchTerms: ['pneumotórax', 'ar no pulmão', 'colapso pulmonar'],
    synonyms: ['colapso pulmonar', 'ar no tórax'],
    relatedSymptoms: ['Dor torácica súbita', 'Dispneia', 'Diminuição MV unilateral'],
    bodySystem: ['respiratorio'],
    severity: 5,
    icd10Codes: ['J93.0', 'J93.1'],
    extendedContent: {
      redFlags: ['Pneumotórax hipertensivo', 'Hipotensão', 'Desvio de traqueia', 'Turgência jugular', 'Ausência de MV'],
      diagnosticoDiferencial: ['Pneumotórax espontâneo', 'Pneumotórax traumático', 'TEP', 'Pericardite'],
      condutaInicial: '1. O2 100%\n2. Se hipertensivo: descompressão imediata (2º EIC linha hemiclavicular)\n3. RX de tórax\n4. Drenagem torácica se > 2cm ou sintomático\n5. Observação se pequeno e estável',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'RC_HEMOPTYSIS',
    group: 'RC',
    title: 'Hemoptise',
    subtitle: 'Tosse com sangue vivo',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['sangue na tosse', 'tosse com sangue'],
    searchTerms: ['hemoptise', 'tosse com sangue', 'sangue na tosse'],
    synonyms: ['sangue no escarro', 'expectoração sanguinolenta'],
    relatedSymptoms: ['Tosse', 'Dispneia', 'Dor torácica'],
    bodySystem: ['respiratorio'],
    severity: 4,
    icd10Codes: ['R04.2'],
    extendedContent: {
      redFlags: ['Hemoptise maciça (> 100-200ml/24h)', 'Instabilidade hemodinâmica', 'Insuficiência respiratória', 'Hemoptise recorrente'],
      diagnosticoDiferencial: ['Bronquite', 'Pneumonia', 'TB', 'Neoplasia pulmonar', 'TEP', 'Bronquiectasias'],
      condutaInicial: '1. Garantir via aérea\n2. O2 suplementar\n3. Acesso venoso\n4. RX de tórax\n5. TC de tórax se indicado\n6. Broncoscopia se maciça',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// NC - NEUROLÓGICO (+5)
// ============================================
const ncComplaints: Complaint[] = [
  {
    id: 'NC_HEADACHE_THUNDERCLAP',
    group: 'NC',
    title: 'Cefaleia em trovoada',
    subtitle: 'Pior dor de cabeça da vida de início súbito',
    ageTargets: ['adult'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['pior cefaleia da vida', 'cefaleia súbita'],
    searchTerms: ['cefaleia em trovoada', 'pior dor de cabeça da vida', 'cefaleia súbita'],
    synonyms: ['thunderclap headache', 'cefaleia explosiva'],
    relatedSymptoms: ['Náuseas', 'Vômitos', 'Rigidez de nuca', 'Fotofobia'],
    bodySystem: ['neurologico'],
    severity: 5,
    icd10Codes: ['G44.8', 'I60.9'],
    extendedContent: {
      redFlags: ['Início explosivo (máximo em segundos)', 'Rigidez de nuca', 'Déficit neurológico', 'Alteração de consciência', 'Febre'],
      diagnosticoDiferencial: ['HSA', 'Dissecção arterial', 'Trombose venosa cerebral', 'Apoplexia hipofisária', 'Enxaqueca'],
      condutaInicial: '1. TC de crânio sem contraste URGENTE\n2. Se TC normal: punção lombar\n3. AngioTC/AngioRM se suspeita de aneurisma\n4. Analgesia\n5. Neurocirurgia se HSA confirmada',
      calculadoras: ['Ottawa SAH Rule'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'NC_MIGRAINE',
    group: 'NC',
    title: 'Enxaqueca',
    subtitle: 'Dor de cabeça pulsátil com náuseas e fotofobia',
    ageTargets: ['adult', 'teen'],
    riskLevel: 'low',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: true,
    chips: ['enxaqueca', 'migrânea'],
    searchTerms: ['enxaqueca', 'migrânea', 'dor de cabeça forte'],
    synonyms: ['migrânea', 'hemicrania'],
    relatedSymptoms: ['Dor pulsátil', 'Náuseas', 'Fotofobia', 'Fonofobia', 'Aura'],
    bodySystem: ['neurologico'],
    severity: 2,
    icd10Codes: ['G43.9', 'G43.0'],
    extendedContent: {
      redFlags: ['Primeiro episódio > 50 anos', 'Mudança de padrão', 'Déficit neurológico', 'Febre', 'Rigidez de nuca', 'HIV/Imunossupressão'],
      diagnosticoDiferencial: ['Enxaqueca com aura', 'Enxaqueca sem aura', 'Cefaleia tensional', 'Cefaleia em salvas', 'HSA'],
      condutaInicial: '1. Ambiente escuro e silencioso\n2. AINE (cetoprofeno, naproxeno)\n3. Triptano se não responder\n4. Metoclopramida para náuseas\n5. Hidratação venosa se vômitos',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'NC_MENINGITIS',
    group: 'NC',
    title: 'Suspeita de meningite',
    subtitle: 'Febre, rigidez de nuca, alteração de consciência',
    ageTargets: ['adult', 'child'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['meningite', 'infecção cerebral'],
    searchTerms: ['meningite', 'rigidez de nuca', 'infecção do SNC'],
    synonyms: ['meningoencefalite', 'infecção meníngea'],
    relatedSymptoms: ['Febre', 'Cefaleia', 'Rigidez de nuca', 'Fotofobia', 'Confusão'],
    bodySystem: ['neurologico', 'infeccioso'],
    severity: 5,
    icd10Codes: ['G03.9', 'G00.9'],
    extendedContent: {
      redFlags: ['Tríade: febre + rigidez de nuca + alteração de consciência', 'Petéquias/púrpura', 'Convulsão', 'Déficit focal', 'Papiledema'],
      diagnosticoDiferencial: ['Meningite bacteriana', 'Meningite viral', 'Encefalite', 'HSA', 'Abscesso cerebral'],
      condutaInicial: '1. Não atrasar ATB se suspeita alta\n2. Hemoculturas\n3. TC de crânio antes da PL se: déficit focal, papiledema, convulsão, imunossupressão\n4. Punção lombar\n5. Ceftriaxone + Dexametasona empiricamente',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'NC_VERTIGO',
    group: 'NC',
    title: 'Tontura rotatória',
    subtitle: 'Sensação de que tudo está girando',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: true,
    chips: ['vertigem', 'labirintite'],
    searchTerms: ['vertigem', 'tontura rotatória', 'labirintite'],
    synonyms: ['vertigem', 'labirintite', 'síndrome vestibular'],
    relatedSymptoms: ['Náuseas', 'Vômitos', 'Nistagmo', 'Desequilíbrio'],
    bodySystem: ['neurologico'],
    severity: 2,
    icd10Codes: ['R42', 'H81.1'],
    extendedContent: {
      redFlags: ['HINTS central (nistagmo vertical/direção variável, skew deviation, HIT normal)', 'Déficit neurológico', 'Cefaleia intensa', 'Fatores de risco para AVC'],
      diagnosticoDiferencial: ['VPPB', 'Neurite vestibular', 'Doença de Ménière', 'AVC cerebelar', 'Enxaqueca vestibular'],
      condutaInicial: '1. Teste HINTS se disponível\n2. Diferenciar central vs periférica\n3. Antivertiginosos (dimenidrinato, meclizina)\n4. Hidratação se vômitos\n5. TC/RNM se suspeita central\n6. Manobra de Epley se VPPB',
      calculadoras: ['HINTS exam', 'Dix-Hallpike'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'NC_ALTERED_MENTAL_STATUS',
    group: 'NC',
    title: 'Alteração do nível de consciência',
    subtitle: 'Confusão, sonolência ou agitação',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['confusão mental', 'rebaixamento'],
    searchTerms: ['alteração de consciência', 'confusão mental', 'rebaixamento'],
    synonyms: ['encefalopatia', 'delirium', 'RNC'],
    relatedSymptoms: ['Confusão', 'Sonolência', 'Agitação', 'Desorientação'],
    bodySystem: ['neurologico'],
    severity: 5,
    icd10Codes: ['R41.0', 'F05.9'],
    extendedContent: {
      redFlags: ['Glasgow < 9', 'Déficit focal', 'Febre', 'Trauma', 'Convulsão', 'Sinais meníngeos'],
      diagnosticoDiferencial: ['Hipoglicemia', 'AVC', 'Infecção/Sepse', 'Intoxicação', 'Encefalopatia metabólica', 'Status epiléptico não convulsivo'],
      condutaInicial: '1. Glicemia capilar IMEDIATA\n2. ABC + O2\n3. Tiamina se suspeita de etilismo\n4. Naloxone se suspeita de opioide\n5. Flumazenil se suspeita de BZD\n6. TC de crânio\n7. Exames laboratoriais amplos',
      calculadoras: ['Glasgow Coma Scale'],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// GI - GASTROINTESTINAL (+6)
// ============================================
const giComplaints: Complaint[] = [
  {
    id: 'GI_APPENDICITIS',
    group: 'GI',
    title: 'Suspeita de apendicite',
    subtitle: 'Dor que começa no umbigo e vai para FID',
    ageTargets: ['adult', 'child'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['apendicite', 'dor FID'],
    searchTerms: ['apendicite', 'dor fossa ilíaca direita', 'dor FID'],
    synonyms: ['apendicite aguda'],
    relatedSymptoms: ['Dor periumbilical', 'Migração para FID', 'Náuseas', 'Febre', 'Anorexia'],
    bodySystem: ['gastrointestinal'],
    severity: 4,
    icd10Codes: ['K35.9', 'K35.8'],
    extendedContent: {
      redFlags: ['Peritonite difusa', 'Febre alta', 'Taquicardia', 'Hipotensão', 'Massa palpável'],
      diagnosticoDiferencial: ['Apendicite', 'Gastroenterite', 'ITU', 'Gravidez ectópica', 'Torção ovariana', 'Diverticulite de Meckel'],
      condutaInicial: '1. Jejum\n2. Hidratação venosa\n3. Analgesia\n4. Hemograma, PCR\n5. USG/TC de abdome\n6. Cirurgia URGENTE se confirmado\n7. Antibioticoprofilaxia',
      calculadoras: ['Alvarado Score', 'AIR Score'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GI_CHOLECYSTITIS',
    group: 'GI',
    title: 'Colecistite aguda',
    subtitle: 'Dor no lado direito da barriga após alimentação gordurosa',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['vesícula', 'pedra na vesícula'],
    searchTerms: ['colecistite', 'vesícula inflamada', 'pedra na vesícula'],
    synonyms: ['vesícula inflamada', 'cólica biliar'],
    relatedSymptoms: ['Dor em HCD', 'Murphy positivo', 'Náuseas', 'Vômitos', 'Febre'],
    bodySystem: ['gastrointestinal'],
    severity: 3,
    icd10Codes: ['K81.0', 'K80.0'],
    extendedContent: {
      redFlags: ['Febre alta', 'Icterícia', 'Peritonite', 'Sepse', 'Colangite (tríade de Charcot)'],
      diagnosticoDiferencial: ['Colecistite', 'Coledocolitíase', 'Colangite', 'Hepatite', 'Pancreatite', 'Úlcera perfurada'],
      condutaInicial: '1. Jejum\n2. Hidratação venosa\n3. Analgesia (AINE ou opioide)\n4. Antiespasmódico\n5. USG de abdome\n6. Antibiótico se complicada\n7. Colecistectomia precoce (< 72h)',
      calculadoras: ['Tokyo Guidelines (TG18)'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GI_PANCREATITIS',
    group: 'GI',
    title: 'Pancreatite aguda',
    subtitle: 'Dor abdominal em faixa irradiando para dorso',
    ageTargets: ['adult'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['pâncreas', 'dor em faixa'],
    searchTerms: ['pancreatite', 'dor em faixa', 'pâncreas inflamado'],
    synonyms: ['inflamação do pâncreas'],
    relatedSymptoms: ['Dor epigástrica', 'Irradiação dorsal', 'Náuseas', 'Vômitos', 'Distensão'],
    bodySystem: ['gastrointestinal'],
    severity: 4,
    icd10Codes: ['K85.9'],
    extendedContent: {
      redFlags: ['Taquicardia', 'Hipotensão', 'Oligúria', 'Confusão', 'SpO2 baixa', 'SIRS'],
      diagnosticoDiferencial: ['Pancreatite biliar', 'Pancreatite alcoólica', 'Úlcera perfurada', 'IAM inferior', 'Dissecção aórtica'],
      condutaInicial: '1. Jejum\n2. Hidratação agressiva (250-500ml/h)\n3. Analgesia (opioide)\n4. Amilase/lipase\n5. USG para etiologia biliar\n6. TC se dúvida ou má evolução\n7. Suporte em UTI se grave',
      calculadoras: ['BISAP', 'Ranson', 'APACHE II', 'Marshall Score'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GI_GI_BLEEDING',
    group: 'GI',
    title: 'Sangramento digestivo',
    subtitle: 'Vômito com sangue ou fezes escuras/com sangue',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['hematêmese', 'melena'],
    searchTerms: ['sangramento digestivo', 'hematêmese', 'melena', 'enterorragia'],
    synonyms: ['hemorragia digestiva', 'HDA', 'HDB'],
    relatedSymptoms: ['Hematêmese', 'Melena', 'Enterorragia', 'Fraqueza', 'Síncope'],
    bodySystem: ['gastrointestinal'],
    severity: 5,
    icd10Codes: ['K92.0', 'K92.1', 'K92.2'],
    extendedContent: {
      redFlags: ['Instabilidade hemodinâmica', 'Hb < 7', 'Sangramento ativo', 'Ressangramento', 'Coagulopatia', 'Uso de anticoagulantes'],
      diagnosticoDiferencial: ['Úlcera péptica', 'Varizes esofágicas', 'Mallory-Weiss', 'Neoplasia', 'Divertículo', 'Angiodisplasia'],
      condutaInicial: '1. ABC + 2 acessos calibrosos\n2. Ressuscitação volêmica\n3. Reservar sangue\n4. IBP IV em bolus + infusão contínua\n5. EDA nas primeiras 24h\n6. Terlipressina se suspeita de varizes',
      calculadoras: ['Glasgow-Blatchford Score', 'Rockall Score'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GI_BOWEL_OBSTRUCTION',
    group: 'GI',
    title: 'Obstrução intestinal',
    subtitle: 'Barriga inchada, não consegue evacuar nem eliminar gases',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['obstrução', 'barriga inchada'],
    searchTerms: ['obstrução intestinal', 'íleo', 'barriga inchada', 'parada de eliminação'],
    synonyms: ['íleo mecânico', 'suboclusão'],
    relatedSymptoms: ['Distensão abdominal', 'Vômitos', 'Parada de eliminação', 'Cólicas'],
    bodySystem: ['gastrointestinal'],
    severity: 4,
    icd10Codes: ['K56.6', 'K56.5'],
    extendedContent: {
      redFlags: ['Febre', 'Peritonite', 'Taquicardia', 'Estrangulamento', 'Necrose intestinal'],
      diagnosticoDiferencial: ['Aderências', 'Hérnia encarcerada', 'Neoplasia', 'Volvo', 'Íleo paralítico'],
      condutaInicial: '1. Jejum + SNG aberta\n2. Hidratação vigorosa\n3. Sondagem vesical\n4. RX de abdome (nível hidroaéreo)\n5. TC se dúvida\n6. Cirurgia se estrangulamento ou refratário',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GI_CONSTIPATION',
    group: 'GI',
    title: 'Constipação intestinal',
    subtitle: 'Dificuldade para evacuar há dias',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'low',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: true,
    chips: ['prisão de ventre', 'intestino preso'],
    searchTerms: ['constipação', 'prisão de ventre', 'intestino preso'],
    synonyms: ['prisão de ventre', 'obstipação'],
    relatedSymptoms: ['Dificuldade para evacuar', 'Fezes endurecidas', 'Distensão', 'Desconforto'],
    bodySystem: ['gastrointestinal'],
    severity: 1,
    icd10Codes: ['K59.0'],
    extendedContent: {
      redFlags: ['Parada total de eliminação', 'Distensão importante', 'Vômitos', 'Sangramento', 'Perda de peso', 'Início recente > 50 anos'],
      diagnosticoDiferencial: ['Constipação funcional', 'Impactação fecal', 'Obstrução intestinal', 'Neoplasia colorretal', 'Hipotireoidismo'],
      condutaInicial: '1. Excluir obstrução intestinal\n2. Toque retal\n3. Laxativo osmótico (lactulose, PEG)\n4. Enema se impactação\n5. Orientar dieta rica em fibras\n6. Investigar se red flags',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// COMBINAR TODOS E EXPORTAR
// ============================================
export const newComplaints: Complaint[] = [
  ...cvComplaints,
  ...rcComplaints,
  ...ncComplaints,
  ...giComplaints,
]

// TOTAL: 50+ novas queixas combinadas
export const allNewComplaints: Complaint[] = [
  ...newComplaints,
  ...newComplaintsPart2,
]

// Export total count for reference
export const NEW_COMPLAINTS_COUNT = allNewComplaints.length
