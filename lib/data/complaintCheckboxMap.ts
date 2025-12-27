/**
 * Mapeamento de Queixas para Checkboxes Prioritários
 *
 * Este arquivo define quais checkboxes devem aparecer como prioritários
 * quando uma determinada queixa é selecionada.
 */

import type { PriorityCheckboxMapping } from '@/lib/types/medical'

// Mapeamento completo de queixas para checkboxes prioritários
export const COMPLAINT_CHECKBOX_MAP: Record<string, PriorityCheckboxMapping> = {
  // ============================================
  // CARDIOVASCULAR (CV)
  // ============================================
  'CV_CHEST_PAIN_TYPICAL': {
    QP: ['Dor precordial', 'Dor retroesternal', 'Dor em aperto'],
    HDA: [
      'Inicio subito',
      'Dor em aperto/opressao',
      'Irradia para braco esquerdo',
      'Irradia para mandibula',
      'Associada a sudorese',
      'Associada a nauseas',
      'Piora com esforco',
      'Duracao > 20 minutos',
    ],
    ANTECEDENTES: ['HAS', 'DM', 'Dislipidemia', 'Tabagismo', 'IAM previo', 'Angina previa'],
    MEDICACOES: ['AAS', 'Estatina', 'Betabloqueador', 'IECA/BRA'],
    EXAME_FISICO: ['PA elevada', 'FC irregular', 'B3 presente', 'Sopro cardiaco', 'Estase jugular'],
    NEGATIVAS: ['Nega trauma toracico', 'Nega relacao com alimentacao', 'Nega dispneia'],
  },

  'CV_HYPERTENSIVE_CRISIS': {
    QP: ['Cefaleia intensa', 'Tontura', 'Dor precordial', 'Dispneia'],
    HDA: [
      'PA > 180x120 mmHg',
      'Inicio subito',
      'Cefaleia occipital',
      'Visao turva',
      'Nauseas/vomitos',
      'Alteracao de consciencia',
    ],
    ANTECEDENTES: ['HAS conhecida', 'DM', 'DRC', 'AVC previo', 'Cardiopatia'],
    MEDICACOES: ['Anti-hipertensivos em uso', 'Suspensao de medicacao'],
    EXAME_FISICO: ['PA muito elevada', 'Fundo de olho alterado', 'B4 presente', 'Estertores pulmonares'],
    NEGATIVAS: ['Nega uso de drogas ilicitas', 'Nega trauma'],
  },

  'CV_ACUTE_LIMB_ISCHEMIA': {
    QP: ['Dor em membro', 'Palidez', 'Frialdade', 'Parestesia'],
    HDA: [
      'Dor subita e intensa',
      'Membro palido',
      'Membro frio',
      'Ausencia de pulso',
      'Parestesia/paresia',
      'Piora progressiva',
    ],
    ANTECEDENTES: ['FA', 'Valvopatia', 'IAM previo', 'Aterosclerose', 'Trombofilia'],
    EXAME_FISICO: ['Ausencia de pulsos', 'Palidez do membro', 'Hipotermia local', 'Tempo de enchimento > 3s'],
    NEGATIVAS: ['Nega trauma', 'Nega cirurgia recente'],
  },

  'CV_AORTIC_DISSECTION': {
    QP: ['Dor toracica lancinante', 'Dor em rasgadura', 'Irradiacao para dorso'],
    HDA: [
      'Dor subita e intensa',
      'Dor lancinante/rasgando',
      'Irradia para dorso',
      'Diferenca de PA entre bracos',
      'Sintomas neurologicos',
    ],
    ANTECEDENTES: ['HAS', 'Sindrome de Marfan', 'Cirurgia cardiaca previa', 'Aneurisma conhecido'],
    EXAME_FISICO: ['Diferenca de pulsos', 'Sopro de insuficiencia aortica', 'Deficit neurologico focal'],
    NEGATIVAS: ['Nega trauma toracico'],
  },

  'CV_HEART_FAILURE': {
    QP: ['Dispneia', 'Edema de MMII', 'Ortopneia', 'DPN'],
    HDA: [
      'Piora progressiva da dispneia',
      'Dispneia aos esforcos',
      'Ortopneia',
      'DPN',
      'Edema de membros inferiores',
      'Ganho de peso',
    ],
    ANTECEDENTES: ['IC conhecida', 'Cardiopatia', 'HAS', 'DM', 'Doenca valvar'],
    MEDICACOES: ['Diuretico', 'IECA/BRA', 'Betabloqueador', 'Digoxina'],
    EXAME_FISICO: ['Estase jugular', 'Estertores pulmonares', 'B3 presente', 'Edema de MMII', 'Hepatomegalia'],
    NEGATIVAS: ['Nega febre', 'Nega tosse produtiva'],
  },

  'CV_BRADYCARDIA': {
    QP: ['Tontura', 'Sincope', 'Pre-sincope', 'Fadiga'],
    HDA: [
      'FC < 50 bpm',
      'Episodios de sincope',
      'Tontura ao levantar',
      'Fadiga aos esforcos',
      'Confusao mental',
    ],
    ANTECEDENTES: ['Cardiopatia', 'Uso de betabloqueador', 'Hipotireoidismo', 'Marca-passo'],
    MEDICACOES: ['Betabloqueador', 'Digoxina', 'BCC', 'Antiarritmico'],
    EXAME_FISICO: ['Bradicardia', 'Hipotensao', 'Ritmo irregular'],
    NEGATIVAS: ['Nega uso de drogas ilicitas'],
  },

  'CV_PALPITATIONS': {
    QP: ['Palpitacao', 'Sensacao de coracao acelerado', 'Batimentos irregulares'],
    HDA: [
      'Inicio subito',
      'Duracao dos episodios',
      'Relacao com esforco',
      'Relacao com cafeina',
      'Pre-sincope associada',
    ],
    ANTECEDENTES: ['Arritmia conhecida', 'Hipertireoidismo', 'Ansiedade', 'Cardiopatia'],
    EXAME_FISICO: ['Taquicardia', 'Ritmo irregular', 'Sopro'],
    NEGATIVAS: ['Nega sincope', 'Nega dor toracica'],
  },

  'CV_SYNCOPE': {
    QP: ['Sincope', 'Desmaio', 'Perda de consciencia'],
    HDA: [
      'Perda de consciencia subita',
      'Sintomas prodromicos',
      'Duracao da perda',
      'Posicao quando ocorreu',
      'Movimentos durante',
      'Confusao pos-ictal',
    ],
    ANTECEDENTES: ['Sincopes previas', 'Cardiopatia', 'Epilepsia', 'DM'],
    EXAME_FISICO: ['Sinais vitais', 'Sopro', 'Exame neurologico'],
    NEGATIVAS: ['Nega trauma', 'Nega mordedura de lingua', 'Nega liberacao esfincteriana'],
  },

  // ============================================
  // RESPIRATORIO (RC)
  // ============================================
  'RC_DYSPNEA_ACUTE': {
    QP: ['Falta de ar', 'Dispneia', 'Dificuldade para respirar'],
    HDA: [
      'Inicio subito',
      'Piora progressiva',
      'Dispneia ao repouso',
      'Dispneia aos esforcos',
      'Ortopneia',
      'Sibilancia',
    ],
    ANTECEDENTES: ['Asma', 'DPOC', 'IC', 'TEP previo', 'Tabagismo'],
    MEDICACOES: ['Broncodilatador', 'Corticoide inalatorio', 'Oxigenoterapia domiciliar'],
    EXAME_FISICO: ['Taquipneia', 'Uso de musculatura acessoria', 'Sibilos', 'Estertores', 'Cianose'],
    NEGATIVAS: ['Nega febre', 'Nega tosse produtiva', 'Nega hemoptise'],
  },

  'RC_ASTHMA_ATTACK': {
    QP: ['Falta de ar', 'Chiado no peito', 'Tosse seca'],
    HDA: [
      'Dispneia progressiva',
      'Sibilancia',
      'Tosse seca',
      'Aperto no peito',
      'Fator desencadeante',
      'Uso de broncodilatador de resgate',
    ],
    ANTECEDENTES: ['Asma conhecida', 'Rinite alergica', 'Internacao por asma', 'UTI por asma'],
    MEDICACOES: ['Bombinha em uso', 'Corticoide inalatorio', 'Antileucotrienicos'],
    EXAME_FISICO: ['Sibilos difusos', 'Fase expiratoria prolongada', 'Taquipneia', 'Uso de acessorios'],
    NEGATIVAS: ['Nega febre', 'Nega expectoracao purulenta'],
  },

  'RC_COPD_EXACERBATION': {
    QP: ['Piora da falta de ar', 'Aumento da tosse', 'Mudanca do escarro'],
    HDA: [
      'Piora da dispneia basal',
      'Aumento do volume de escarro',
      'Mudanca da cor do escarro',
      'Febre',
      'Reducao da tolerancia ao exercicio',
    ],
    ANTECEDENTES: ['DPOC conhecido', 'Tabagismo', 'Exacerbacoes previas', 'O2 domiciliar', 'Corticoide cronico'],
    MEDICACOES: ['Broncodilatadores', 'Corticoide inalatorio', 'O2 domiciliar', 'VNI domiciliar'],
    EXAME_FISICO: ['Sibilos', 'Roncos', 'Diminuicao do MV', 'Tiragem', 'Cianose'],
    NEGATIVAS: ['Nega hemoptise', 'Nega dor toracica pleuritica'],
  },

  'RC_PNEUMONIA': {
    QP: ['Tosse', 'Febre', 'Dor toracica', 'Expectoracao'],
    HDA: [
      'Tosse produtiva',
      'Febre alta',
      'Dor toracica pleuritica',
      'Expectoracao purulenta',
      'Calafrios',
      'Dispneia',
    ],
    ANTECEDENTES: ['Tabagismo', 'DPOC', 'Imunossupressao', 'Pneumonias previas'],
    EXAME_FISICO: ['Estertores', 'Sopro tubario', 'Macicez a percussao', 'Febre', 'Taquipneia'],
    NEGATIVAS: ['Nega viagem recente', 'Nega contato com doentes'],
  },

  'RC_PNEUMOTHORAX': {
    QP: ['Dor toracica subita', 'Falta de ar subita', 'Dor pleuritica'],
    HDA: [
      'Inicio subito',
      'Dor em pontada',
      'Dispneia intensa',
      'Relacao com esforco fisico',
      'Piora com respiracao',
    ],
    ANTECEDENTES: ['Pneumotorax previo', 'Tabagismo', 'Doenca pulmonar', 'Procedimento toracico recente'],
    EXAME_FISICO: ['Diminuicao do MV', 'Timpanismo a percussao', 'Desvio de traqueia', 'Enfisema subcutaneo'],
    NEGATIVAS: ['Nega trauma toracico'],
  },

  'RC_HEMOPTYSIS': {
    QP: ['Tosse com sangue', 'Sangue na expectoracao', 'Hemoptise'],
    HDA: [
      'Volume de sangue',
      'Cor do sangue (vermelho vivo)',
      'Tosse associada',
      'Dispneia associada',
      'Perda de peso',
      'Sudorese noturna',
    ],
    ANTECEDENTES: ['Tabagismo', 'Tuberculose', 'Neoplasia', 'Bronquiectasia', 'Anticoagulacao'],
    EXAME_FISICO: ['Estertores', 'Sibilos localizados', 'Baqueteamento digital'],
    NEGATIVAS: ['Nega epistaxe', 'Nega sangramento gengival'],
  },

  // ============================================
  // NEUROLOGICO (NC)
  // ============================================
  'NC_HEADACHE_THUNDERCLAP': {
    QP: ['Cefaleia subita e intensa', 'Pior dor de cabeca da vida'],
    HDA: [
      'Inicio subito (segundos)',
      'Intensidade maxima rapida',
      'Rigidez de nuca',
      'Nauseas/vomitos',
      'Fotofobia',
      'Alteracao de consciencia',
    ],
    ANTECEDENTES: ['Aneurisma conhecido', 'HAS', 'Uso de anticoagulante', 'Tabagismo'],
    EXAME_FISICO: ['Rigidez de nuca', 'Sinais de Kernig/Brudzinski', 'Deficit neurologico focal', 'Nivel de consciencia'],
    NEGATIVAS: ['Nega trauma', 'Nega febre'],
  },

  'NC_MIGRAINE': {
    QP: ['Dor de cabeca hemicraniana', 'Dor pulsatil', 'Enxaqueca'],
    HDA: [
      'Dor hemicraniana',
      'Carater pulsatil',
      'Aura visual',
      'Fotofobia',
      'Fonofobia',
      'Nauseas/vomitos',
      'Fator desencadeante',
    ],
    ANTECEDENTES: ['Enxaqueca cronica', 'Historico familiar', 'Uso de ACO'],
    MEDICACOES: ['Triptano', 'Analgesico', 'Profilatico para enxaqueca'],
    EXAME_FISICO: ['Exame neurologico normal', 'Fundoscopia normal'],
    NEGATIVAS: ['Nega febre', 'Nega rigidez de nuca', 'Nega deficit focal'],
  },

  'NC_MENINGITIS': {
    QP: ['Cefaleia', 'Febre', 'Rigidez de nuca', 'Confusao'],
    HDA: [
      'Cefaleia intensa',
      'Febre alta',
      'Rigidez de nuca',
      'Fotofobia',
      'Alteracao de consciencia',
      'Nauseas/vomitos',
      'Rash petequial',
    ],
    ANTECEDENTES: ['Contato com meningite', 'Imunossupressao', 'Esplenectomia', 'Neurocirurgia recente'],
    EXAME_FISICO: ['Rigidez de nuca', 'Kernig positivo', 'Brudzinski positivo', 'Petequias', 'Alteracao de consciencia'],
    NEGATIVAS: ['Nega trauma'],
  },

  'NC_VERTIGO': {
    QP: ['Tontura rotatoria', 'Vertigem', 'Sensacao de giro'],
    HDA: [
      'Tontura rotatoria',
      'Relacao com posicao da cabeca',
      'Duracao dos episodios',
      'Nauseas/vomitos',
      'Zumbido',
      'Hipoacusia',
    ],
    ANTECEDENTES: ['VPPB', 'Doenca de Meniere', 'Neurite vestibular', 'AVC previo'],
    EXAME_FISICO: ['Nistagmo', 'Teste de Dix-Hallpike', 'Romberg', 'Marcha', 'Exame de pares cranianos'],
    NEGATIVAS: ['Nega deficit motor', 'Nega disartria', 'Nega diplopia'],
  },

  'NC_ALTERED_MENTAL_STATUS': {
    QP: ['Confusao mental', 'Desorientacao', 'Alteracao de comportamento'],
    HDA: [
      'Inicio agudo vs cronico',
      'Flutuacao ao longo do dia',
      'Alucinacoes',
      'Inversao do ciclo sono-vigilia',
      'Agitacao vs letargia',
    ],
    ANTECEDENTES: ['Demencia', 'Insuficiencia hepatica', 'Insuficiencia renal', 'Alcoolismo', 'Uso de drogas'],
    MEDICACOES: ['Benzodiazepinicos', 'Opiaceos', 'Anticolinergicos'],
    EXAME_FISICO: ['Nivel de consciencia', 'Orientacao', 'Atencao', 'Sinais focais', 'Asterixis'],
    NEGATIVAS: ['Nega febre', 'Nega trauma'],
  },

  'NC_SEIZURE': {
    QP: ['Convulsao', 'Crise convulsiva', 'Perda de consciencia com movimentos'],
    HDA: [
      'Tipo de movimento',
      'Duracao da crise',
      'Perda de consciencia',
      'Mordedura de lingua',
      'Liberacao esfincteriana',
      'Confusao pos-ictal',
      'Aura',
    ],
    ANTECEDENTES: ['Epilepsia conhecida', 'AVE', 'Tumor cerebral', 'TCE', 'Abstinencia alcoolica'],
    MEDICACOES: ['Anticonvulsivantes em uso', 'Suspensao recente'],
    EXAME_FISICO: ['Mordedura de lingua', 'Incontinencia', 'Deficit focal pos-ictal', 'Nivel de consciencia'],
    NEGATIVAS: ['Nega uso de drogas', 'Nega trauma'],
  },

  'NC_STROKE': {
    QP: ['Fraqueza em um lado', 'Dificuldade para falar', 'Desvio de boca'],
    HDA: [
      'Deficit motor focal',
      'Alteracao de fala',
      'Desvio de rima',
      'Hora do inicio dos sintomas',
      'Piora progressiva vs estavel',
    ],
    ANTECEDENTES: ['HAS', 'DM', 'FA', 'AVC previo', 'Cardiopatia'],
    MEDICACOES: ['Anticoagulante', 'Antiagregante'],
    EXAME_FISICO: ['NIHSS', 'Deficit motor', 'Afasia', 'Disartria', 'Hemianopsia', 'Desvio de olhar'],
    NEGATIVAS: ['Nega trauma', 'Nega convulsao'],
  },

  // ============================================
  // GASTROINTESTINAL (GI)
  // ============================================
  'GI_ABDOMINAL_PAIN': {
    QP: ['Dor abdominal', 'Dor de barriga', 'Colica'],
    HDA: [
      'Localizacao da dor',
      'Inicio e duracao',
      'Carater (colica, constante)',
      'Irradiacao',
      'Nauseas/vomitos',
      'Alteracao do habito intestinal',
      'Febre',
    ],
    ANTECEDENTES: ['Cirurgias abdominais', 'Ulcera', 'Colelitíase', 'DII'],
    EXAME_FISICO: ['Palpacao abdominal', 'Descompressao brusca', 'Ruidos hidroaereos', 'Sinais de peritonite'],
    NEGATIVAS: ['Nega melena', 'Nega hematoquesia', 'Nega ictericia'],
  },

  'GI_APPENDICITIS': {
    QP: ['Dor em fossa iliaca direita', 'Dor periumbilical que migrou'],
    HDA: [
      'Dor periumbilical inicial',
      'Migracao para FID',
      'Anorexia',
      'Nauseas/vomitos',
      'Febre baixa',
      'Alteracao do habito intestinal',
    ],
    ANTECEDENTES: ['Cirurgias abdominais'],
    EXAME_FISICO: ['Blumberg positivo', 'Rovsing positivo', 'Sinal do psoas', 'Sinal do obturador', 'Febre'],
    NEGATIVAS: ['Nega diarreia intensa', 'Nega sangramento'],
  },

  'GI_CHOLECYSTITIS': {
    QP: ['Dor em hipocondrio direito', 'Colica biliar', 'Dor apos alimentacao gordurosa'],
    HDA: [
      'Dor em HCD',
      'Irradiacao para escapula',
      'Relacao com alimentacao gordurosa',
      'Nauseas/vomitos',
      'Febre',
      'Ictericia',
    ],
    ANTECEDENTES: ['Colelitíase conhecida', 'Colicas biliares previas', 'Obesidade'],
    EXAME_FISICO: ['Sinal de Murphy', 'Dor a palpacao de HCD', 'Ictericia', 'Febre'],
    NEGATIVAS: ['Nega coluria', 'Nega acolia fecal'],
  },

  'GI_PANCREATITIS': {
    QP: ['Dor epigastrica intensa', 'Dor em faixa', 'Irradiacao para dorso'],
    HDA: [
      'Dor epigastrica intensa',
      'Irradiacao para dorso (em faixa)',
      'Nauseas/vomitos incoerciveis',
      'Melhora com inclinacao para frente',
      'Ingesta alcoolica recente',
    ],
    ANTECEDENTES: ['Etilismo', 'Colelitíase', 'Pancreatite previa', 'Hipertrigliceridemia'],
    EXAME_FISICO: ['Dor a palpacao epigastrica', 'Distensao abdominal', 'Sinal de Cullen', 'Sinal de Grey-Turner'],
    NEGATIVAS: ['Nega febre alta', 'Nega ictericia'],
  },

  'GI_GI_BLEEDING': {
    QP: ['Vomito com sangue', 'Fezes escuras', 'Sangue nas fezes'],
    HDA: [
      'Hematemese vs melena vs hematoquezia',
      'Volume estimado',
      'Numero de episodios',
      'Sintomas de hipovolemia',
      'Dor abdominal',
    ],
    ANTECEDENTES: ['Ulcera peptica', 'Varizes esofagicas', 'Cirrose', 'Uso de AINEs', 'Anticoagulantes'],
    MEDICACOES: ['AINEs', 'Anticoagulantes', 'Antiagregantes', 'IBP'],
    EXAME_FISICO: ['Taquicardia', 'Hipotensao', 'Palidez', 'Sinais de hepatopatia', 'Toque retal'],
    NEGATIVAS: ['Nega trauma abdominal'],
  },

  'GI_BOWEL_OBSTRUCTION': {
    QP: ['Parada de eliminacao de fezes e flatus', 'Distensao abdominal', 'Vomitos fecaloides'],
    HDA: [
      'Parada de eliminacao de fezes',
      'Parada de eliminacao de gases',
      'Distensao abdominal progressiva',
      'Vomitos (biliosos/fecaloides)',
      'Dor tipo colica',
    ],
    ANTECEDENTES: ['Cirurgias abdominais previas', 'Hernias', 'Neoplasia abdominal'],
    EXAME_FISICO: ['Distensao abdominal', 'RHA metalicos/ausentes', 'Hernias', 'Massa abdominal palpavel'],
    NEGATIVAS: ['Nega eliminacao de flatus', 'Nega evacuacao'],
  },

  'GI_CONSTIPATION': {
    QP: ['Constipacao', 'Dificuldade para evacuar', 'Fezes ressecadas'],
    HDA: [
      'Frequencia evacuatoria',
      'Consistencia das fezes',
      'Esforco evacuatorio',
      'Sensacao de evacuacao incompleta',
      'Sangramento ao evacuar',
    ],
    ANTECEDENTES: ['Constipacao cronica', 'Hipotireoidismo', 'Uso de opiaceos'],
    MEDICACOES: ['Laxantes', 'Opiaceos', 'Anticolinergicos'],
    EXAME_FISICO: ['Palpacao abdominal', 'Toque retal'],
    NEGATIVAS: ['Nega perda de peso', 'Nega sangramento'],
  },

  // ============================================
  // URINARIO (GU)
  // ============================================
  'GU_UTI': {
    QP: ['Dor ao urinar', 'Ardencia ao urinar', 'Urgencia urinaria'],
    HDA: [
      'Disuria',
      'Polaciuria',
      'Urgencia miccional',
      'Dor suprapubica',
      'Hematuria',
      'Urina turva/fetida',
    ],
    ANTECEDENTES: ['ITU de repeticao', 'Litiase renal', 'DM', 'Cateterismo vesical'],
    EXAME_FISICO: ['Dor a palpacao suprapubica', 'Giordano'],
    NEGATIVAS: ['Nega febre', 'Nega dor lombar', 'Nega corrimento'],
  },

  'GU_PYELONEPHRITIS': {
    QP: ['Dor lombar', 'Febre', 'Dor ao urinar'],
    HDA: [
      'Febre alta com calafrios',
      'Dor lombar unilateral',
      'Sintomas urinarios baixos',
      'Nauseas/vomitos',
      'Mal-estar',
    ],
    ANTECEDENTES: ['ITU de repeticao', 'Litiase renal', 'Malformacao urinaria', 'DM'],
    EXAME_FISICO: ['Giordano positivo', 'Febre alta', 'Dor a palpacao lombar'],
    NEGATIVAS: ['Nega retencao urinaria'],
  },

  'GU_RENAL_COLIC': {
    QP: ['Colica renal', 'Dor lombar intensa', 'Dor que irradia para virilha'],
    HDA: [
      'Dor lombar em colica',
      'Irradiacao para flanco/virilha',
      'Intensidade variavel',
      'Hematuria',
      'Nauseas/vomitos',
      'Agitacao psicomotora',
    ],
    ANTECEDENTES: ['Litiase renal', 'Calculos previos', 'Historico familiar'],
    EXAME_FISICO: ['Giordano positivo', 'Agitacao', 'Sem sinais de peritonite'],
    NEGATIVAS: ['Nega febre', 'Nega retencao urinaria'],
  },

  'GU_URINARY_RETENTION': {
    QP: ['Nao consegue urinar', 'Retencao urinaria', 'Bexigoma'],
    HDA: [
      'Incapacidade de urinar',
      'Dor suprapubica',
      'Globo vesical palpavel',
      'Sensacao de bexiga cheia',
      'Jato fraco previo',
    ],
    ANTECEDENTES: ['HPB', 'Estenose uretral', 'Uso de anticolinergicos', 'Prostatite'],
    MEDICACOES: ['Anticolinergicos', 'Alfa-bloqueadores', 'Opiaceos'],
    EXAME_FISICO: ['Globo vesical palpavel', 'Toque retal (prostata)'],
    NEGATIVAS: ['Nega febre', 'Nega trauma'],
  },

  'GU_TESTICULAR_TORSION': {
    QP: ['Dor testicular aguda', 'Dor no testiculo', 'Testiculo elevado'],
    HDA: [
      'Dor testicular subita e intensa',
      'Nauseas/vomitos',
      'Dor abdominal baixa',
      'Testiculo elevado/horizontalizado',
      'Ausencia de reflexo cremasterico',
    ],
    ANTECEDENTES: ['Torcao previa', 'Malformacao testicular'],
    EXAME_FISICO: ['Testiculo elevado', 'Ausencia de reflexo cremasterico', 'Sinal de Prehn negativo'],
    NEGATIVAS: ['Nega trauma', 'Nega corrimento uretral', 'Nega disuria'],
  },

  'GU_HEMATURIA': {
    QP: ['Sangue na urina', 'Urina vermelha', 'Hematuria'],
    HDA: [
      'Hematuria macroscopica',
      'Presenca de coagulos',
      'Dor associada',
      'Sintomas urinarios baixos',
      'Perda de peso',
    ],
    ANTECEDENTES: ['Litiase renal', 'Tabagismo', 'Neoplasia previa', 'Uso de anticoagulantes'],
    MEDICACOES: ['Anticoagulantes', 'Antiagregantes'],
    EXAME_FISICO: ['Giordano', 'Palpacao abdominal', 'Toque retal'],
    NEGATIVAS: ['Nega febre', 'Nega trauma'],
  },

  // ============================================
  // OSTEOMUSCULAR (MSK)
  // ============================================
  'MSK_BACK_PAIN': {
    QP: ['Dor lombar', 'Dor nas costas', 'Lombalgia'],
    HDA: [
      'Localizacao exata',
      'Irradiacao para membros',
      'Piora com movimento',
      'Melhora com repouso',
      'Parestesias',
      'Fraqueza',
    ],
    ANTECEDENTES: ['Hernia de disco', 'Osteoporose', 'Neoplasia', 'Cirurgia de coluna'],
    EXAME_FISICO: ['Palpacao de coluna', 'Lasegue', 'Forca muscular MMII', 'Reflexos', 'Sensibilidade'],
    NEGATIVAS: ['Nega perda de controle esfincteriano', 'Nega febre', 'Nega perda de peso'],
  },

  'MSK_NECK_PAIN': {
    QP: ['Dor no pescoco', 'Cervicalgia', 'Torcicolo'],
    HDA: [
      'Localizacao',
      'Irradiacao para membros',
      'Limitacao de movimento',
      'Parestesias',
      'Trauma associado',
    ],
    ANTECEDENTES: ['Hernia cervical', 'Artrose cervical', 'Trauma'],
    EXAME_FISICO: ['Mobilidade cervical', 'Forca MMSS', 'Reflexos', 'Sensibilidade'],
    NEGATIVAS: ['Nega trauma', 'Nega fraqueza'],
  },

  'MSK_SHOULDER_PAIN': {
    QP: ['Dor no ombro', 'Dificuldade para levantar o braco'],
    HDA: [
      'Localizacao exata',
      'Piora com movimento',
      'Limitacao de amplitude',
      'Trauma',
      'Atividade repetitiva',
    ],
    ANTECEDENTES: ['Tendinite', 'Bursite', 'Artrose', 'Luxacao'],
    EXAME_FISICO: ['Amplitude de movimento', 'Testes especiais (Neer, Hawkins)', 'Forca muscular'],
    NEGATIVAS: ['Nega trauma', 'Nega febre'],
  },

  'MSK_KNEE_PAIN': {
    QP: ['Dor no joelho', 'Joelho inchado', 'Travamento do joelho'],
    HDA: [
      'Mecanismo de lesao',
      'Edema',
      'Travamento',
      'Falseio',
      'Dificuldade para apoiar',
    ],
    ANTECEDENTES: ['Lesoes previas', 'Artrose', 'Artrite'],
    EXAME_FISICO: ['Edema', 'Derrame articular', 'Testes ligamentares', 'Menisco', 'Amplitude'],
    NEGATIVAS: ['Nega febre', 'Nega eritema'],
  },

  'MSK_COMPARTMENT_SYNDROME': {
    QP: ['Dor intensa desproporcional', 'Dor em perna apos trauma', 'Parestesia'],
    HDA: [
      'Dor intensa e desproporcional',
      'Dor a extensao passiva',
      'Parestesia',
      'Paralisia',
      'Pele tensa',
    ],
    ANTECEDENTES: ['Fratura recente', 'Trauma', 'Esforco intenso'],
    EXAME_FISICO: ['Dor a extensao passiva', 'Pele tensa', 'Pulsos presentes inicialmente', 'Palidez tardia'],
    NEGATIVAS: [],
  },

  'MSK_FRACTURE': {
    QP: ['Dor apos trauma', 'Deformidade', 'Incapacidade de movimentar'],
    HDA: [
      'Mecanismo de trauma',
      'Deformidade visivel',
      'Edema',
      'Incapacidade funcional',
      'Crepitacao',
    ],
    ANTECEDENTES: ['Osteoporose', 'Fraturas previas', 'Uso de corticoide'],
    EXAME_FISICO: ['Deformidade', 'Edema', 'Crepitacao', 'Mobilidade anormal', 'Pulsos distais', 'Sensibilidade'],
    NEGATIVAS: ['Nega perda de sensibilidade', 'Nega perda de pulsos'],
  },

  // ============================================
  // INFECCAO (INF)
  // ============================================
  'INF_FEVER': {
    QP: ['Febre', 'Calafrios', 'Mal-estar'],
    HDA: [
      'Temperatura maxima',
      'Duracao da febre',
      'Padrao da febre',
      'Sintomas associados',
      'Exposicao a doentes',
      'Viagem recente',
    ],
    ANTECEDENTES: ['Imunossupressao', 'DM', 'Infeccoes de repeticao', 'Internacao recente'],
    MEDICACOES: ['Imunossupressores', 'Antibioticos recentes'],
    EXAME_FISICO: ['Temperatura', 'Sinais vitais', 'Exame segmentar completo'],
    NEGATIVAS: ['Nega viagem recente', 'Nega contato com doentes'],
  },

  'INF_CELLULITIS': {
    QP: ['Pele vermelha e quente', 'Inchaço na pele', 'Celulite'],
    HDA: [
      'Eritema progressivo',
      'Edema',
      'Calor local',
      'Dor local',
      'Febre',
      'Porta de entrada',
    ],
    ANTECEDENTES: ['DM', 'Insuficiencia venosa', 'Celulites previas', 'Imunossupressao'],
    EXAME_FISICO: ['Eritema com bordas mal definidas', 'Edema', 'Calor', 'Linfangite', 'Linfonodomegalia'],
    NEGATIVAS: ['Nega crepitacao', 'Nega bolhas'],
  },

  'INF_ABSCESS': {
    QP: ['Nodulo doloroso', 'Abscesso', 'Caroço com pus'],
    HDA: [
      'Nodulo doloroso',
      'Flutuacao',
      'Drenagem espontanea',
      'Febre',
      'Evolucao temporal',
    ],
    ANTECEDENTES: ['DM', 'Uso de drogas injetaveis', 'Abscessos previos'],
    EXAME_FISICO: ['Flutuacao', 'Eritema', 'Calor', 'Ponto de drenagem'],
    NEGATIVAS: ['Nega febre alta', 'Nega celulite extensa'],
  },

  'INF_UPPER_RESPIRATORY': {
    QP: ['Coriza', 'Dor de garganta', 'Tosse', 'Espirros'],
    HDA: [
      'Coriza',
      'Obstrucao nasal',
      'Odinofagia',
      'Tosse',
      'Espirros',
      'Febre baixa',
    ],
    ANTECEDENTES: ['Rinite alergica', 'Sinusite cronica'],
    EXAME_FISICO: ['Orofaringe', 'Rinoscopia anterior', 'Otoscopia', 'Adenomegalia cervical'],
    NEGATIVAS: ['Nega dispneia', 'Nega febre alta'],
  },

  'INF_COVID': {
    QP: ['Sintomas gripais', 'Anosmia', 'Ageusia', 'Febre', 'Tosse'],
    HDA: [
      'Febre',
      'Tosse seca',
      'Fadiga',
      'Anosmia/ageusia',
      'Mialgia',
      'Diarreia',
      'Dispneia',
      'Contato com COVID+',
    ],
    ANTECEDENTES: ['Comorbidades de risco', 'Imunossupressao', 'Idade avancada', 'Vacinacao COVID'],
    EXAME_FISICO: ['Saturacao', 'Frequencia respiratoria', 'Ausculta pulmonar'],
    NEGATIVAS: ['Nega dispneia em repouso'],
  },

  // ============================================
  // GINECOLOGIA/OBSTETRICIA (OBG)
  // ============================================
  'OBG_VAGINAL_BLEEDING': {
    QP: ['Sangramento vaginal', 'Sangramento anormal', 'Menstruacao excessiva'],
    HDA: [
      'Volume do sangramento',
      'Duracao',
      'Uso de absorventes',
      'Coagulos',
      'Dor associada',
      'DUM',
      'Gravidez possivel',
    ],
    ANTECEDENTES: ['Ciclo menstrual', 'Mioma', 'Endometriose', 'Coagulopatia', 'DIU'],
    EXAME_FISICO: ['Sinais de hipovolemia', 'Exame especular', 'Toque vaginal'],
    NEGATIVAS: ['Nega trauma', 'Nega relacao sexual recente'],
  },

  'OBG_ECTOPIC_PREGNANCY': {
    QP: ['Dor abdominal baixa', 'Atraso menstrual', 'Sangramento vaginal'],
    HDA: [
      'Dor pelvica/abdominal',
      'Atraso menstrual',
      'Sangramento vaginal irregular',
      'Dor no ombro (referida)',
      'Sintomas de hipovolemia',
    ],
    ANTECEDENTES: ['Ectopica previa', 'DIP', 'Cirurgia tubaria', 'DIU', 'Infertilidade'],
    EXAME_FISICO: ['Dor a palpacao anexial', 'Dor a mobilizacao do colo', 'Sinais de choque'],
    NEGATIVAS: [],
  },

  'OBG_LABOR_PAINS': {
    QP: ['Contracoes', 'Dor em baixo ventre', 'Perda de liquido'],
    HDA: [
      'Frequencia das contracoes',
      'Duracao das contracoes',
      'Perda de tampao mucoso',
      'Perda de liquido amniotico',
      'Sangramento',
      'Movimento fetal',
    ],
    ANTECEDENTES: ['Paridade', 'Partos previos', 'Cesarea previa', 'Complicacoes gestacionais'],
    EXAME_FISICO: ['BCF', 'Dinamica uterina', 'Toque vaginal', 'Altura uterina'],
    NEGATIVAS: ['Nega sangramento vivo', 'Nega perda de liquido'],
  },

  'OBG_PELVIC_PAIN': {
    QP: ['Dor pelvica', 'Dor em baixo ventre', 'Colica'],
    HDA: [
      'Localizacao',
      'Relacao com ciclo menstrual',
      'Relacao com atividade sexual',
      'Corrimento associado',
      'Sintomas urinarios',
    ],
    ANTECEDENTES: ['Endometriose', 'DIP', 'Cisto ovariano', 'Mioma'],
    EXAME_FISICO: ['Palpacao abdominal', 'Exame especular', 'Toque vaginal'],
    NEGATIVAS: ['Nega febre', 'Nega sangramento'],
  },

  'OBG_HYPEREMESIS': {
    QP: ['Nauseas intensas', 'Vomitos incoerciveis', 'Nao consegue se alimentar'],
    HDA: [
      'Frequencia dos vomitos',
      'Intolerancia a alimentos',
      'Perda de peso',
      'Desidratacao',
      'Inicio dos sintomas',
    ],
    ANTECEDENTES: ['Gravidez gemelar', 'Mola hidatiforme', 'Hiperemese previa'],
    EXAME_FISICO: ['Sinais de desidratacao', 'Peso', 'Sinais vitais'],
    NEGATIVAS: ['Nega sangramento vaginal', 'Nega dor abdominal intensa'],
  },

  // ============================================
  // PEDIATRIA (PED)
  // ============================================
  'PED_BRONCHIOLITIS': {
    QP: ['Chiado no peito', 'Dificuldade para respirar', 'Tosse em bebe'],
    HDA: [
      'Coriza inicial',
      'Tosse progressiva',
      'Sibilancia',
      'Dificuldade alimentar',
      'Tiragem',
      'Febre',
    ],
    ANTECEDENTES: ['Prematuridade', 'Cardiopatia congenita', 'Displasia broncopulmonar'],
    EXAME_FISICO: ['Saturacao', 'FR', 'Tiragem', 'Sibilos', 'Estertores', 'BAN', 'Gemencia'],
    NEGATIVAS: ['Nega cianose', 'Nega apneia'],
  },

  'PED_FEBRILE_SEIZURE': {
    QP: ['Convulsao com febre', 'Crise febril', 'Tremores com febre'],
    HDA: [
      'Temperatura no momento',
      'Tipo de movimento',
      'Duracao da crise',
      'Lateralidade',
      'Pos-ictal',
      'Crises previas',
    ],
    ANTECEDENTES: ['Convulsao febril previa', 'Epilepsia na familia', 'DNPM'],
    EXAME_FISICO: ['Nivel de consciencia', 'Fontanela', 'Sinais meningeos', 'Exame neurologico'],
    NEGATIVAS: ['Nega rigidez de nuca', 'Nega rash petequial'],
  },

  'PED_GASTROENTERITIS': {
    QP: ['Diarreia', 'Vomito', 'Dor de barriga'],
    HDA: [
      'Numero de episodios de diarreia',
      'Numero de vomitos',
      'Aspecto das fezes',
      'Sangue/muco nas fezes',
      'Aceitacao de liquidos',
      'Diurese',
    ],
    ANTECEDENTES: ['Contato com doentes', 'Creche/escola', 'Alimentacao suspeita'],
    EXAME_FISICO: ['Sinais de desidratacao', 'Turgor da pele', 'Fontanela', 'Tempo de enchimento capilar'],
    NEGATIVAS: ['Nega sangue nas fezes', 'Nega febre alta persistente'],
  },

  'PED_CROUP': {
    QP: ['Tosse de cachorro', 'Estridor', 'Rouquidao'],
    HDA: [
      'Tosse ladrante',
      'Estridor inspiratorio',
      'Rouquidao',
      'Piora noturna',
      'Sintomas de IVAS previos',
    ],
    ANTECEDENTES: ['Crupe previo', 'Prematuridade'],
    EXAME_FISICO: ['Estridor', 'Tiragem', 'Nivel de consciencia', 'Saturacao', 'FR'],
    NEGATIVAS: ['Nega sialorreia', 'Nega posicao de tripé'],
  },

  'PED_DEHYDRATION': {
    QP: ['Crianca desidratada', 'Nao aceita liquidos', 'Boca seca'],
    HDA: [
      'Causa da perda (diarreia/vomito)',
      'Ultima diurese',
      'Aceitacao de liquidos',
      'Nivel de atividade',
      'Choro com lagrimas',
    ],
    ANTECEDENTES: [],
    EXAME_FISICO: ['Turgor da pele', 'Olhos fundos', 'Fontanela', 'Mucosas', 'Pulsos', 'Perfusao'],
    NEGATIVAS: [],
  },

  // ============================================
  // DERMATOLOGIA (DERM)
  // ============================================
  'DERM_URTICARIA': {
    QP: ['Manchas pelo corpo', 'Coceira intensa', 'Vergoes'],
    HDA: [
      'Lesoes pruriginosas',
      'Inicio e evolucao',
      'Fatores desencadeantes',
      'Medicamentos novos',
      'Alimentos suspeitos',
      'Angioedema',
    ],
    ANTECEDENTES: ['Alergias conhecidas', 'Urticaria previa', 'Atopia'],
    MEDICACOES: ['AINEs', 'Antibioticos', 'Novos medicamentos'],
    EXAME_FISICO: ['Lesoes urticariformes', 'Angioedema', 'Via aerea', 'Sinais vitais'],
    NEGATIVAS: ['Nega dispneia', 'Nega edema de laringe'],
  },

  'DERM_ANGIOEDEMA': {
    QP: ['Inchaco nos labios', 'Inchaco na face', 'Edema subito'],
    HDA: [
      'Edema de labios/lingua/face',
      'Inicio subito',
      'Medicamentos (IECA)',
      'Dispneia',
      'Dificuldade para engolir',
    ],
    ANTECEDENTES: ['Uso de IECA', 'Angioedema hereditario', 'Alergias'],
    MEDICACOES: ['IECA', 'BRA', 'AINEs'],
    EXAME_FISICO: ['Edema de labios/lingua', 'Estridor', 'Via aerea patente', 'Urticaria associada'],
    NEGATIVAS: ['Nega disfagia', 'Nega estridor'],
  },

  'DERM_RASH': {
    QP: ['Manchas na pele', 'Exantema', 'Rash cutaneo'],
    HDA: [
      'Distribuicao das lesoes',
      'Evolucao temporal',
      'Prurido',
      'Febre associada',
      'Medicamentos recentes',
      'Contato com doentes',
    ],
    ANTECEDENTES: ['Doencas exantematicas previas', 'Vacinacao', 'Alergias'],
    EXAME_FISICO: ['Tipo de lesao', 'Distribuicao', 'Mucosas', 'Adenomegalia'],
    NEGATIVAS: ['Nega lesoes em mucosas', 'Nega febre alta'],
  },

  'DERM_HERPES_ZOSTER': {
    QP: ['Vesiculas dolorosas', 'Dor em faixa', 'Herpes zoster'],
    HDA: [
      'Dor precedendo as lesoes',
      'Vesiculas em dermatomo',
      'Queimacao/ardencia',
      'Localizacao',
    ],
    ANTECEDENTES: ['Varicela previa', 'Imunossupressao', 'Idade avancada'],
    EXAME_FISICO: ['Vesiculas em dermatomo', 'Nao cruza linha media', 'Adenomegalia regional'],
    NEGATIVAS: ['Nega lesoes bilaterais', 'Nega lesoes disseminadas'],
  },

  // ============================================
  // INTOXICACAO (TOX)
  // ============================================
  'TOX_OVERDOSE': {
    QP: ['Intoxicacao', 'Overdose', 'Ingesta de medicamentos'],
    HDA: [
      'Substancia ingerida',
      'Quantidade estimada',
      'Hora da ingestao',
      'Intencionalidade',
      'Sintomas apresentados',
    ],
    ANTECEDENTES: ['Tentativas previas', 'Transtornos psiquiatricos', 'Uso de drogas'],
    MEDICACOES: ['Medicamentos em casa'],
    EXAME_FISICO: ['Nivel de consciencia', 'Pupilas', 'Sinais vitais', 'Toxidromes'],
    NEGATIVAS: [],
  },

  'TOX_ALCOHOL_INTOXICATION': {
    QP: ['Intoxicacao alcoolica', 'Embriaguez', 'Rebaixamento por alcool'],
    HDA: [
      'Quantidade ingerida',
      'Tipo de bebida',
      'Hora do inicio',
      'Associacao com outras drogas',
      'Episodios previos',
    ],
    ANTECEDENTES: ['Etilismo cronico', 'Epilepsia', 'Hepatopatia'],
    EXAME_FISICO: ['Nivel de consciencia', 'Halito etilico', 'Glicemia capilar', 'Sinais de trauma'],
    NEGATIVAS: ['Nega uso de outras drogas', 'Nega trauma'],
  },

  'TOX_SNAKE_BITE': {
    QP: ['Picada de cobra', 'Acidente ofidico', 'Mordida de serpente'],
    HDA: [
      'Hora da picada',
      'Local da picada',
      'Identificacao da cobra',
      'Sintomas locais',
      'Sintomas sistemicos',
    ],
    ANTECEDENTES: ['Acidentes previos', 'Alergias'],
    EXAME_FISICO: ['Marcas de presa', 'Edema local', 'Sangramento', 'Tempo de coagulacao', 'Sinais neurologicos'],
    NEGATIVAS: [],
  },

  // ============================================
  // TRAUMA (TR)
  // ============================================
  'TR_LACERATION': {
    QP: ['Corte', 'Ferimento', 'Laceração'],
    HDA: [
      'Mecanismo do trauma',
      'Hora do ocorrido',
      'Objeto causador',
      'Sangramento',
      'Contaminacao',
    ],
    ANTECEDENTES: ['Vacinacao antitetanica', 'Uso de anticoagulantes', 'Coagulopatia'],
    EXAME_FISICO: ['Extensao do ferimento', 'Profundidade', 'Estruturas acometidas', 'Sangramento ativo'],
    NEGATIVAS: ['Nega perda de sensibilidade', 'Nega perda de forca'],
  },

  'TR_BURN': {
    QP: ['Queimadura', 'Pele queimada', 'Lesao termica'],
    HDA: [
      'Agente causador',
      'Hora do ocorrido',
      'Circunstancia',
      'Area acometida',
      'Inalacao de fumaca',
    ],
    ANTECEDENTES: ['Comorbidades'],
    EXAME_FISICO: ['Grau da queimadura', 'Extensao (% SCQ)', 'Vias aereas', 'Lesoes circumferenciais'],
    NEGATIVAS: ['Nega inalacao', 'Nega queimadura de vias aereas'],
  },

  'TR_FALL': {
    QP: ['Queda', 'Caiu no chao', 'Trauma por queda'],
    HDA: [
      'Altura da queda',
      'Mecanismo',
      'Perda de consciencia',
      'Posicao de queda',
      'Sintomas apos',
    ],
    ANTECEDENTES: ['Uso de anticoagulantes', 'Osteoporose', 'Sincopes'],
    EXAME_FISICO: ['ATLS primario', 'Coluna cervical', 'Deformidades', 'Sinais neurologicos'],
    NEGATIVAS: ['Nega perda de consciencia', 'Nega dor cervical'],
  },

  'TR_MVA': {
    QP: ['Acidente de transito', 'Colisao', 'Atropelamento'],
    HDA: [
      'Tipo de acidente',
      'Velocidade estimada',
      'Uso de cinto/capacete',
      'Posicao no veiculo',
      'Ejecao',
      'Perda de consciencia',
    ],
    ANTECEDENTES: ['Uso de anticoagulantes'],
    EXAME_FISICO: ['ATLS primario', 'Exame secundario completo', 'Imobilizacao cervical'],
    NEGATIVAS: ['Nega perda de consciencia', 'Nega dor cervical'],
  },

  'TR_HEAD_TRAUMA': {
    QP: ['Trauma de cabeca', 'Bateu a cabeca', 'TCE'],
    HDA: [
      'Mecanismo',
      'Perda de consciencia',
      'Amnesia',
      'Vomitos',
      'Cefaleia',
      'Convulsao',
    ],
    ANTECEDENTES: ['Uso de anticoagulantes', 'Cirurgia cerebral previa', 'Epilepsia'],
    EXAME_FISICO: ['Glasgow', 'Pupilas', 'Sinais de fratura de base', 'Deficit focal'],
    NEGATIVAS: ['Nega vomitos', 'Nega confusao'],
  },

  // ============================================
  // PROTOCOLOS
  // ============================================
  'PROTO_SEPSE': {
    QP: ['Infeccao grave', 'Sepse', 'Choque septico'],
    HDA: [
      'Foco infeccioso',
      'Febre/hipotermia',
      'Alteracao do nivel de consciencia',
      'Hipotensao',
      'Oliguria',
    ],
    ANTECEDENTES: ['Imunossupressao', 'DM', 'Neoplasia', 'Internacao recente'],
    EXAME_FISICO: ['qSOFA', 'SOFA', 'Lactato', 'Pressao arterial', 'Perfusao'],
    NEGATIVAS: [],
  },

  'PROTO_AVC': {
    QP: ['Deficit neurologico agudo', 'Suspeita de AVC'],
    HDA: [
      'Hora de inicio dos sintomas',
      'Deficit motor',
      'Alteracao de fala',
      'Alteracao visual',
      'Cefaleia',
    ],
    ANTECEDENTES: ['HAS', 'FA', 'AVC previo', 'Anticoagulacao'],
    EXAME_FISICO: ['NIHSS', 'Glicemia', 'PA', 'Deficit focal', 'Glasgow'],
    NEGATIVAS: [],
  },

  'PROTO_IC': {
    QP: ['IC descompensada', 'Dispneia', 'Edema'],
    HDA: [
      'Dispneia progressiva',
      'Ortopneia',
      'DPN',
      'Edema de MMII',
      'Ganho de peso',
    ],
    ANTECEDENTES: ['IC conhecida', 'Classe funcional', 'FE', 'Cardiopatia'],
    EXAME_FISICO: ['Perfil hemodinamico (Stevenson)', 'Estase jugular', 'Estertores', 'Edema', 'B3'],
    NEGATIVAS: [],
  },

  'PROTO_TEP': {
    QP: ['Suspeita de TEP', 'Dispneia subita', 'Dor toracica pleuritica'],
    HDA: [
      'Dispneia subita',
      'Dor toracica pleuritica',
      'Hemoptise',
      'Imobilizacao prolongada',
      'Cirurgia recente',
    ],
    ANTECEDENTES: ['TVP/TEP previo', 'Neoplasia', 'Trombofilia', 'ACO', 'Cirurgia recente', 'Imobilizacao'],
    EXAME_FISICO: ['Saturacao', 'Taquicardia', 'Sinais de TVP', 'Wells/Geneva'],
    NEGATIVAS: [],
  },
}

// Função para obter checkboxes prioritários por queixa
export function getPriorityCheckboxes(complaintId: string): PriorityCheckboxMapping | null {
  return COMPLAINT_CHECKBOX_MAP[complaintId] || null
}

// Função para obter todas as categorias com checkboxes para uma queixa
export function getCheckboxCategories(complaintId: string): string[] {
  const mapping = COMPLAINT_CHECKBOX_MAP[complaintId]
  if (!mapping) return []
  return Object.keys(mapping).filter(key => {
    const items = mapping[key as keyof PriorityCheckboxMapping]
    return items && items.length > 0
  })
}

// Função para contar total de checkboxes prioritários
export function countPriorityCheckboxes(complaintId: string): number {
  const mapping = COMPLAINT_CHECKBOX_MAP[complaintId]
  if (!mapping) return 0
  return Object.values(mapping).reduce((acc, arr) => acc + (arr?.length || 0), 0)
}

// Exportar lista de todas as queixas mapeadas
export const MAPPED_COMPLAINT_IDS = Object.keys(COMPLAINT_CHECKBOX_MAP)
