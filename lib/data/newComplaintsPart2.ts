/**
 * New Complaints Part 2 - Mais queixas para o WellWave
 * GU, MSK, INF, OBG, PED, DERM, TOX, TR, ORL, OFT
 */

import type { Complaint } from '@/lib/types/medical'

// ============================================
// GU - URINÁRIO (+4)
// ============================================
export const guComplaints: Complaint[] = [
  {
    id: 'GU_PYELONEPHRITIS',
    group: 'GU',
    title: 'Pielonefrite',
    subtitle: 'Dor lombar com febre e sintomas urinários',
    ageTargets: ['adult'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['infecção renal', 'dor lombar'],
    searchTerms: ['pielonefrite', 'infecção renal', 'dor nos rins com febre'],
    synonyms: ['infecção urinária alta', 'infecção renal'],
    relatedSymptoms: ['Febre', 'Dor lombar', 'Calafrios', 'Disúria', 'Náuseas'],
    bodySystem: ['urinario'],
    severity: 3,
    icd10Codes: ['N10', 'N12'],
    extendedContent: {
      redFlags: ['Sepse', 'Obstrução urinária', 'Imunossupressão', 'Gestante', 'Rim único'],
      diagnosticoDiferencial: ['Pielonefrite', 'Cólica renal', 'Apendicite', 'Colecistite'],
      condutaInicial: '1. Hidratação venosa\n2. Urina tipo 1 + Urocultura\n3. Hemograma, PCR, Cr\n4. ATB: Ceftriaxone ou Ciprofloxacino\n5. USG se suspeita de obstrução\n6. Internação se grave ou gestante',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GU_URINARY_RETENTION',
    group: 'GU',
    title: 'Retenção urinária aguda',
    subtitle: 'Não consegue urinar, bexiga distendida',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['não consegue urinar', 'bexiga cheia'],
    searchTerms: ['retenção urinária', 'não consegue urinar', 'bexiga distendida'],
    synonyms: ['globo vesical', 'bexigoma'],
    relatedSymptoms: ['Incapacidade de urinar', 'Dor suprapúbica', 'Desconforto', 'Bexiga palpável'],
    bodySystem: ['urinario'],
    severity: 3,
    icd10Codes: ['R33'],
    extendedContent: {
      redFlags: ['Insuficiência renal aguda', 'Infecção', 'Hematúria macroscópica'],
      diagnosticoDiferencial: ['HPB', 'Prostatite', 'Estenose uretral', 'Cálculo ureteral', 'Medicamentos', 'Neurogênica'],
      condutaInicial: '1. Sondagem vesical de alívio\n2. Medir volume residual\n3. Função renal\n4. USG de vias urinárias\n5. Alfa-bloqueador (tansulosina)\n6. Urologia se necessário',
      calculadoras: ['IPSS'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GU_TESTICULAR_TORSION',
    group: 'GU',
    title: 'Torção testicular',
    subtitle: 'Dor escrotal súbita e intensa em jovem',
    ageTargets: ['child', 'teen', 'adult'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['dor testicular', 'escroto agudo'],
    searchTerms: ['torção testicular', 'dor no testículo', 'escroto agudo'],
    synonyms: ['escroto agudo', 'torção de testículo'],
    relatedSymptoms: ['Dor escrotal súbita', 'Náuseas', 'Vômitos', 'Testículo elevado'],
    bodySystem: ['urinario'],
    severity: 5,
    icd10Codes: ['N44'],
    extendedContent: {
      redFlags: ['Dor < 6h (janela cirúrgica)', 'Reflexo cremastérico ausente', 'Testículo horizontalizado e elevado'],
      diagnosticoDiferencial: ['Torção testicular', 'Epididimite', 'Orquite', 'Hérnia inguinal encarcerada', 'Torção de apêndice testicular'],
      condutaInicial: '1. NÃO ATRASAR CIRURGIA\n2. Analgesia\n3. Doppler se disponível rapidamente\n4. Exploração cirúrgica URGENTE\n5. Janela: 6 horas para salvar testículo',
      calculadoras: ['TWIST Score'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'GU_HEMATURIA',
    group: 'GU',
    title: 'Hematúria',
    subtitle: 'Sangue na urina',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['sangue na urina', 'urina vermelha'],
    searchTerms: ['hematúria', 'sangue na urina', 'urina com sangue'],
    synonyms: ['sangue na urina'],
    relatedSymptoms: ['Urina avermelhada', 'Disúria', 'Coágulos'],
    bodySystem: ['urinario'],
    severity: 3,
    icd10Codes: ['R31'],
    extendedContent: {
      redFlags: ['Hematúria macroscópica', 'Retenção por coágulos', 'Anemia', 'Suspeita de neoplasia'],
      diagnosticoDiferencial: ['ITU', 'Cálculo renal', 'Neoplasia vesical/renal', 'Trauma', 'Glomerulopatia', 'Hiperplasia prostática'],
      condutaInicial: '1. Urina tipo 1\n2. Hemograma, Cr\n3. USG de vias urinárias\n4. Cistoscopia se > 40 anos ou fatores de risco\n5. Irrigação vesical se coágulos',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// MSK - OSTEOMUSCULAR (+4)
// ============================================
export const mskComplaints: Complaint[] = [
  {
    id: 'MSK_NECK_PAIN',
    group: 'MSK',
    title: 'Cervicalgia',
    subtitle: 'Dor no pescoço',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'low',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: true,
    chips: ['dor no pescoço', 'torcicolo'],
    searchTerms: ['cervicalgia', 'dor no pescoço', 'torcicolo'],
    synonyms: ['torcicolo', 'dor cervical'],
    relatedSymptoms: ['Rigidez cervical', 'Limitação de movimentos', 'Cefaleia'],
    bodySystem: ['musculoesqueletico'],
    severity: 1,
    icd10Codes: ['M54.2'],
    extendedContent: {
      redFlags: ['Trauma recente', 'Febre', 'Déficit neurológico', 'Irradiação para membros', 'Perda de força'],
      diagnosticoDiferencial: ['Cervicalgia mecânica', 'Hérnia cervical', 'Espondilose', 'Meningite', 'Dissecção carotídea'],
      condutaInicial: '1. Excluir red flags\n2. Analgesia + relaxante muscular\n3. Orientar postura\n4. Fisioterapia\n5. Imagem se red flags ou refratário',
      calculadoras: ['Canadian C-Spine Rule'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'MSK_SHOULDER_PAIN',
    group: 'MSK',
    title: 'Dor no ombro',
    subtitle: 'Dor ou limitação de movimento do ombro',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'low',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: true,
    chips: ['dor no ombro', 'ombro travado'],
    searchTerms: ['dor no ombro', 'ombro doendo', 'bursite ombro'],
    synonyms: ['omalgia', 'síndrome do manguito rotador'],
    relatedSymptoms: ['Dor ao movimento', 'Limitação de abdução', 'Dor noturna'],
    bodySystem: ['musculoesqueletico'],
    severity: 1,
    icd10Codes: ['M75.1', 'M75.5'],
    extendedContent: {
      redFlags: ['Trauma com deformidade', 'Incapacidade de abdução', 'Febre', 'Perda de força súbita'],
      diagnosticoDiferencial: ['Tendinopatia do manguito', 'Bursite subacromial', 'Capsulite adesiva', 'Artrite', 'Luxação', 'Fratura'],
      condutaInicial: '1. Analgesia + AINE\n2. Gelo local\n3. Repouso relativo\n4. Fisioterapia\n5. RX se trauma ou refratário\n6. USG/RNM se suspeita de lesão',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'MSK_KNEE_PAIN',
    group: 'MSK',
    title: 'Dor no joelho',
    subtitle: 'Dor, inchaço ou travamento do joelho',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'low',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: true,
    chips: ['dor no joelho', 'joelho inchado'],
    searchTerms: ['dor no joelho', 'joelho inchado', 'joelho travando'],
    synonyms: ['gonalgia', 'dor articular joelho'],
    relatedSymptoms: ['Dor', 'Edema', 'Crepitação', 'Instabilidade', 'Travamento'],
    bodySystem: ['musculoesqueletico'],
    severity: 1,
    icd10Codes: ['M25.5', 'M17.9'],
    extendedContent: {
      redFlags: ['Derrame articular + febre', 'Trauma com deformidade', 'Bloqueio articular', 'Instabilidade grave'],
      diagnosticoDiferencial: ['Osteoartrite', 'Lesão meniscal', 'Lesão ligamentar', 'Artrite séptica', 'Gota', 'Bursite'],
      condutaInicial: '1. RX se trauma (Ottawa Knee Rules)\n2. Analgesia + AINE\n3. Gelo + elevação\n4. Punção se derrame + febre (artrite séptica?)\n5. RNM se suspeita de lesão interna',
      calculadoras: ['Ottawa Knee Rules'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'MSK_COMPARTMENT_SYNDROME',
    group: 'MSK',
    title: 'Síndrome compartimental',
    subtitle: 'Dor desproporcional após fratura ou trauma',
    ageTargets: ['adult'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['dor intensa', 'membro tenso'],
    searchTerms: ['síndrome compartimental', 'dor desproporcional', 'pressão no membro'],
    synonyms: ['síndrome de compartimento'],
    relatedSymptoms: ['Dor desproporcional', 'Dor à extensão passiva', 'Parestesia', 'Compartimento tenso'],
    bodySystem: ['musculoesqueletico'],
    severity: 5,
    icd10Codes: ['T79.6'],
    extendedContent: {
      redFlags: ['6 Ps: Pain, Pressure, Paralysis, Paresthesia, Pulselessness, Pallor', 'Dor desproporcional ao estiramento passivo', 'Pressão compartimental > 30 mmHg'],
      diagnosticoDiferencial: ['Síndrome compartimental', 'Lesão vascular', 'Fratura com lesão nervosa', 'Trombose venosa'],
      condutaInicial: '1. EMERGÊNCIA CIRÚRGICA\n2. Remover imobilização apertada\n3. Manter membro ao nível do coração\n4. Medir pressão compartimental se dúvida\n5. Fasciotomia de urgência\n6. Não atrasar cirurgia por exames',
      calculadoras: ['Pressão compartimental'],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// INF - INFECÇÃO (+4)
// ============================================
export const infComplaints: Complaint[] = [
  {
    id: 'INF_CELLULITIS',
    group: 'INF',
    title: 'Celulite / Erisipela',
    subtitle: 'Pele vermelha, quente e inchada',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['pele vermelha', 'infecção de pele'],
    searchTerms: ['celulite', 'erisipela', 'infecção de pele'],
    synonyms: ['infecção de partes moles', 'dermohipodermite'],
    relatedSymptoms: ['Eritema', 'Calor local', 'Edema', 'Dor', 'Febre'],
    bodySystem: ['infeccioso', 'dermatologico'],
    severity: 3,
    icd10Codes: ['L03.9', 'A46'],
    extendedContent: {
      redFlags: ['Crepitação (fasceíte)', 'Necrose', 'Sepse', 'Bolhas hemorrágicas', 'Progressão rápida'],
      diagnosticoDiferencial: ['Celulite', 'Erisipela', 'Fasceíte necrotizante', 'TVP', 'Dermatite'],
      condutaInicial: '1. Demarcar área de eritema\n2. Hemograma, PCR\n3. Elevar membro\n4. ATB: Cefalexina ou Ceftriaxone\n5. Cirurgia se suspeita de fasceíte\n6. Internação se grave ou refratário',
      calculadoras: ['LRINEC Score (fasceíte)'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'INF_ABSCESS',
    group: 'INF',
    title: 'Abscesso cutâneo',
    subtitle: 'Coleção de pus na pele',
    ageTargets: ['adult', 'child'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['abscesso', 'furúnculo'],
    searchTerms: ['abscesso', 'furúnculo', 'pus na pele'],
    synonyms: ['furúnculo', 'coleção purulenta'],
    relatedSymptoms: ['Nódulo flutuante', 'Dor', 'Calor', 'Eritema', 'Flutuação'],
    bodySystem: ['infeccioso', 'dermatologico'],
    severity: 2,
    icd10Codes: ['L02.9'],
    extendedContent: {
      redFlags: ['Localização perigosa (face, perianal)', 'Febre', 'Celulite extensa associada', 'Imunossupressão'],
      diagnosticoDiferencial: ['Abscesso', 'Furúnculo', 'Cisto infectado', 'Hidradenite supurativa'],
      condutaInicial: '1. Incisão e drenagem (tratamento principal)\n2. Cultura do pus\n3. ATB apenas se: celulite extensa, imunossupressão, SIRS\n4. Curativo\n5. Orientar retorno',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'INF_UPPER_RESPIRATORY',
    group: 'INF',
    title: 'IVAS (Resfriado comum)',
    subtitle: 'Coriza, dor de garganta, tosse leve',
    ageTargets: ['adult', 'child'],
    riskLevel: 'low',
    isTopForAdult: true,
    isTopForChild: true,
    isFastTrack: true,
    chips: ['resfriado', 'gripe'],
    searchTerms: ['ivas', 'resfriado', 'gripe', 'coriza'],
    synonyms: ['resfriado', 'infecção de vias aéreas superiores'],
    relatedSymptoms: ['Coriza', 'Espirros', 'Dor de garganta', 'Tosse', 'Mal-estar'],
    bodySystem: ['respiratorio', 'infeccioso'],
    severity: 1,
    icd10Codes: ['J06.9', 'J00'],
    extendedContent: {
      redFlags: ['Dispneia', 'Febre alta > 5 dias', 'Piora após melhora inicial', 'Imunossupressão'],
      diagnosticoDiferencial: ['IVAS viral', 'Faringite', 'Sinusite', 'Gripe', 'COVID-19'],
      condutaInicial: '1. Tratamento sintomático\n2. Analgésicos/antitérmicos\n3. Hidratação\n4. Repouso\n5. Orientar sinais de alarme\n6. NÃO prescrever ATB',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'INF_COVID_LIKE',
    group: 'INF',
    title: 'Síndrome gripal / COVID',
    subtitle: 'Febre, tosse, dores no corpo, perda de olfato',
    ageTargets: ['adult', 'elderly'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['covid', 'gripe'],
    searchTerms: ['covid', 'síndrome gripal', 'gripe forte'],
    synonyms: ['síndrome respiratória aguda', 'influenza-like illness'],
    relatedSymptoms: ['Febre', 'Tosse', 'Mialgia', 'Anosmia', 'Ageusia', 'Fadiga'],
    bodySystem: ['respiratorio', 'infeccioso'],
    severity: 3,
    icd10Codes: ['U07.1', 'J11'],
    extendedContent: {
      redFlags: ['SpO2 < 94%', 'Dispneia', 'Hipotensão', 'Confusão', 'Comorbidades de risco'],
      diagnosticoDiferencial: ['COVID-19', 'Influenza', 'VSR', 'IVAS', 'Pneumonia'],
      condutaInicial: '1. Teste rápido / RT-PCR\n2. Oximetria\n3. RX de tórax se dispneia\n4. Tratamento sintomático\n5. Isolamento domiciliar\n6. Internação se hipoxemia ou gravidade',
      calculadoras: ['NEWS2'],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// OBG - GINECOLOGIA (+5)
// ============================================
export const obgComplaints: Complaint[] = [
  {
    id: 'OBG_VAGINAL_BLEEDING',
    group: 'OBG',
    title: 'Sangramento vaginal',
    subtitle: 'Sangramento fora do período menstrual ou na gestação',
    ageTargets: ['adult', 'adultPregnant'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['sangramento', 'hemorragia'],
    searchTerms: ['sangramento vaginal', 'metrorragia', 'hemorragia uterina'],
    synonyms: ['metrorragia', 'sangramento uterino anormal'],
    relatedSymptoms: ['Sangramento', 'Dor pélvica', 'Cólicas', 'Fraqueza'],
    bodySystem: ['ginecologico'],
    severity: 4,
    icd10Codes: ['N93.9', 'O20.9'],
    extendedContent: {
      redFlags: ['Instabilidade hemodinâmica', 'Gestante', 'Sangramento volumoso', 'Beta-hCG positivo'],
      diagnosticoDiferencial: ['Ameaça de aborto', 'Aborto', 'Gravidez ectópica', 'DPP', 'Mioma', 'Pólipo', 'Neoplasia'],
      condutaInicial: '1. Beta-hCG (SEMPRE)\n2. Tipagem sanguínea\n3. Hemograma\n4. USG transvaginal\n5. Acesso venoso calibroso se instável\n6. Ocitocina/Misoprostol se indicado',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'OBG_ECTOPIC_PREGNANCY',
    group: 'OBG',
    title: 'Suspeita de gravidez ectópica',
    subtitle: 'Dor pélvica + atraso menstrual + sangramento',
    ageTargets: ['adult'],
    riskLevel: 'high',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['ectópica', 'gravidez tubária'],
    searchTerms: ['gravidez ectópica', 'gravidez tubária', 'dor pélvica com atraso'],
    synonyms: ['gravidez tubária', 'gestação ectópica'],
    relatedSymptoms: ['Dor pélvica unilateral', 'Sangramento vaginal', 'Atraso menstrual', 'Síncope'],
    bodySystem: ['ginecologico'],
    severity: 5,
    icd10Codes: ['O00.9'],
    extendedContent: {
      redFlags: ['Instabilidade hemodinâmica', 'Hemoperitônio', 'Dor abdominal difusa', 'Síncope'],
      diagnosticoDiferencial: ['Gravidez ectópica', 'Aborto', 'Cisto ovariano roto', 'Torção ovariana', 'Apendicite'],
      condutaInicial: '1. Beta-hCG quantitativo\n2. 2 acessos venosos calibrosos\n3. Tipagem sanguínea\n4. USG transvaginal URGENTE\n5. Cirurgia se rota ou instável\n6. Metotrexato se estável e critérios',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'OBG_LABOR_PAINS',
    group: 'OBG',
    title: 'Trabalho de parto',
    subtitle: 'Contrações regulares, pode ter rompido a bolsa',
    ageTargets: ['adultPregnant'],
    riskLevel: 'high',
    isTopForAdult: false,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['contrações', 'parto'],
    searchTerms: ['trabalho de parto', 'contrações', 'bolsa rota'],
    synonyms: ['contrações de parto', 'início do parto'],
    relatedSymptoms: ['Contrações regulares', 'Dor lombar', 'Perda de líquido', 'Tampão mucoso'],
    bodySystem: ['ginecologico'],
    severity: 4,
    icd10Codes: ['O62.9', 'O75.9'],
    extendedContent: {
      redFlags: ['Sangramento abundante', 'Líquido meconial', 'Bradicardia fetal', 'Prolapso de cordão', 'Apresentação anômala'],
      diagnosticoDiferencial: ['Trabalho de parto verdadeiro', 'Falso trabalho de parto', 'Ruptura prematura de membranas'],
      condutaInicial: '1. Toque vaginal (dilatação, apresentação)\n2. CTG (BCF e contrações)\n3. Verificar idade gestacional\n4. Avaliar fase do trabalho de parto\n5. Encaminhar para centro obstétrico',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'OBG_PELVIC_PAIN',
    group: 'OBG',
    title: 'Dor pélvica aguda',
    subtitle: 'Dor no baixo ventre em mulher',
    ageTargets: ['adult'],
    riskLevel: 'medium',
    isTopForAdult: true,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['dor pélvica', 'dor baixo ventre'],
    searchTerms: ['dor pélvica', 'dor no baixo ventre', 'dor ginecológica'],
    synonyms: ['dor no baixo ventre', 'dor ginecológica'],
    relatedSymptoms: ['Dor pélvica', 'Dispareunia', 'Sangramento', 'Corrimento'],
    bodySystem: ['ginecologico'],
    severity: 3,
    icd10Codes: ['R10.2'],
    extendedContent: {
      redFlags: ['Hipotensão', 'Beta-hCG positivo', 'Massa anexial dolorosa', 'Peritonite', 'Febre'],
      diagnosticoDiferencial: ['Gravidez ectópica', 'Torção ovariana', 'Cisto roto', 'DIP', 'Endometriose', 'Apendicite', 'ITU'],
      condutaInicial: '1. Beta-hCG (obrigatório)\n2. USG transvaginal\n3. Hemograma, PCR\n4. Urina tipo 1\n5. Analgesia\n6. Tratar causa específica',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'OBG_HYPEREMESIS',
    group: 'OBG',
    title: 'Hiperêmese gravídica',
    subtitle: 'Vômitos intensos na gestação',
    ageTargets: ['adultPregnant'],
    riskLevel: 'medium',
    isTopForAdult: false,
    isTopForChild: false,
    isFastTrack: false,
    chips: ['vômitos na gravidez', 'enjoo'],
    searchTerms: ['hiperêmese', 'vômitos na gravidez', 'náuseas gestação'],
    synonyms: ['vômitos incoercíveis da gravidez'],
    relatedSymptoms: ['Náuseas', 'Vômitos', 'Perda de peso', 'Desidratação', 'Cetonúria'],
    bodySystem: ['ginecologico', 'gastrointestinal'],
    severity: 3,
    icd10Codes: ['O21.0', 'O21.1'],
    extendedContent: {
      redFlags: ['Perda de peso > 5%', 'Cetonúria', 'Distúrbio eletrolítico', 'Insuficiência renal'],
      diagnosticoDiferencial: ['Hiperêmese gravídica', 'Gastroenterite', 'Mola hidatiforme', 'Hipertireoidismo'],
      condutaInicial: '1. Hidratação venosa\n2. Correção de eletrólitos\n3. Tiamina (prevenir Wernicke)\n4. Antieméticos (ondansetrona, metoclopramida)\n5. USG para excluir mola\n6. Internação se grave',
      calculadoras: ['PUQE Score'],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// PED - PEDIATRIA (+5)
// ============================================
export const pedComplaints: Complaint[] = [
  {
    id: 'PED_BRONCHIOLITIS',
    group: 'PED',
    title: 'Bronquiolite',
    subtitle: 'Chiado e falta de ar em bebê',
    ageTargets: ['infant', 'child'],
    riskLevel: 'medium',
    isTopForAdult: false,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['bebê chiando', 'bronquiolite'],
    searchTerms: ['bronquiolite', 'bebê chiando', 'vsr'],
    synonyms: ['bronquiolite viral', 'infecção por VSR'],
    relatedSymptoms: ['Sibilos', 'Taquipneia', 'Tiragem', 'Coriza', 'Dificuldade alimentar'],
    bodySystem: ['respiratorio'],
    severity: 3,
    icd10Codes: ['J21.9'],
    extendedContent: {
      redFlags: ['SpO2 < 92%', 'Apneia', 'Recusa alimentar', 'Sinais de desidratação', 'Prematuridade', '< 3 meses'],
      diagnosticoDiferencial: ['Bronquiolite', 'Asma', 'Pneumonia', 'Coqueluche', 'Corpo estranho'],
      condutaInicial: '1. Oxigenoterapia se SpO2 < 92%\n2. Higiene nasal + aspiração\n3. Hidratação (sonda se necessário)\n4. NÃO usar broncodilatadores de rotina\n5. NÃO usar corticoides\n6. Internação se grave',
      calculadoras: ['Escala de Wood-Downes'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'PED_FEBRILE_SEIZURE',
    group: 'PED',
    title: 'Convulsão febril',
    subtitle: 'Convulsão em criança com febre',
    ageTargets: ['infant', 'child'],
    riskLevel: 'high',
    isTopForAdult: false,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['convulsão', 'febre'],
    searchTerms: ['convulsão febril', 'crise febril', 'convulsão com febre'],
    synonyms: ['crise febril', 'convulsão associada à febre'],
    relatedSymptoms: ['Febre', 'Movimentos tônico-clônicos', 'Perda de consciência'],
    bodySystem: ['neurologico'],
    severity: 4,
    icd10Codes: ['R56.0'],
    extendedContent: {
      redFlags: ['Duração > 15 min', 'Crise focal', 'Múltiplas crises', '< 6 meses ou > 5 anos', 'Déficit neurológico pós-ictal'],
      diagnosticoDiferencial: ['Convulsão febril simples', 'Convulsão febril complexa', 'Meningite', 'Epilepsia', 'Encefalite'],
      condutaInicial: '1. Garantir via aérea\n2. Cronometrar crise\n3. Benzodiazepínico se > 5 min\n4. Antitérmico\n5. Buscar foco infeccioso\n6. PL se < 12 meses ou sinais meníngeos',
      calculadoras: [],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'PED_GASTROENTERITIS',
    group: 'PED',
    title: 'Gastroenterite pediátrica',
    subtitle: 'Diarreia e vômitos em criança',
    ageTargets: ['infant', 'child'],
    riskLevel: 'medium',
    isTopForAdult: false,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['diarreia', 'vômitos'],
    searchTerms: ['gastroenterite', 'diarreia criança', 'vômitos criança'],
    synonyms: ['diarreia aguda', 'gastroenterite viral'],
    relatedSymptoms: ['Diarreia', 'Vômitos', 'Febre', 'Dor abdominal', 'Recusa alimentar'],
    bodySystem: ['gastrointestinal'],
    severity: 2,
    icd10Codes: ['A09', 'K52.9'],
    extendedContent: {
      redFlags: ['Desidratação grave', 'Letargia', 'Olhos fundos', 'Sinal da prega', 'Sangue nas fezes', '< 3 meses'],
      diagnosticoDiferencial: ['Gastroenterite viral', 'Gastroenterite bacteriana', 'Intoxicação alimentar', 'Invaginação intestinal', 'Apendicite'],
      condutaInicial: '1. Avaliar grau de desidratação\n2. TRO se desidratação leve/moderada\n3. Hidratação venosa se grave\n4. Manter alimentação\n5. Zinco por 10-14 dias\n6. Orientar sinais de alarme',
      calculadoras: ['Escala de desidratação OMS'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'PED_CROUP',
    group: 'PED',
    title: 'Crupe / Laringite',
    subtitle: 'Tosse de cachorro e estridor',
    ageTargets: ['infant', 'child'],
    riskLevel: 'medium',
    isTopForAdult: false,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['tosse de cachorro', 'estridor'],
    searchTerms: ['crupe', 'laringite', 'tosse de cachorro', 'estridor'],
    synonyms: ['laringotraqueobronquite', 'laringite estridulosa'],
    relatedSymptoms: ['Tosse ladrante', 'Estridor', 'Rouquidão', 'Coriza', 'Febre baixa'],
    bodySystem: ['respiratorio'],
    severity: 3,
    icd10Codes: ['J05.0'],
    extendedContent: {
      redFlags: ['Estridor em repouso', 'Tiragem grave', 'Cianose', 'Agitação/letargia', 'SpO2 < 92%'],
      diagnosticoDiferencial: ['Crupe viral', 'Epiglotite', 'Traqueíte bacteriana', 'Corpo estranho', 'Abscesso retrofaríngeo'],
      condutaInicial: '1. Manter criança calma\n2. Dexametasona 0,6 mg/kg VO/IM (dose única)\n3. Nebulização com adrenalina se moderado/grave\n4. O2 se SpO2 < 92%\n5. Observar 3-4h após adrenalina',
      calculadoras: ['Westley Croup Score'],
      referencias: [],
      rawMarkdown: ''
    }
  },
  {
    id: 'PED_DEHYDRATION',
    group: 'PED',
    title: 'Desidratação',
    subtitle: 'Criança com sinais de falta de líquido',
    ageTargets: ['infant', 'child'],
    riskLevel: 'medium',
    isTopForAdult: false,
    isTopForChild: true,
    isFastTrack: false,
    chips: ['desidratação', 'boca seca'],
    searchTerms: ['desidratação', 'criança desidratada', 'falta de líquido'],
    synonyms: ['desidratação aguda'],
    relatedSymptoms: ['Sede', 'Boca seca', 'Olhos fundos', 'Letargia', 'Diurese diminuída'],
    bodySystem: ['sistemico'],
    severity: 3,
    icd10Codes: ['E86'],
    extendedContent: {
      redFlags: ['Letargia', 'Olhos muito fundos', 'Sinal da prega > 2s', 'Ausência de lágrimas', 'Pulso fino'],
      diagnosticoDiferencial: ['Desidratação leve', 'Desidratação moderada', 'Desidratação grave', 'Choque hipovolêmico'],
      condutaInicial: '1. Classificar grau (OMS)\n2. Leve: TRO domiciliar\n3. Moderada: TRO supervisionada\n4. Grave: SF 0,9% 20ml/kg em bolus + hidratação\n5. Reavaliar frequentemente',
      calculadoras: ['Escala de desidratação OMS'],
      referencias: [],
      rawMarkdown: ''
    }
  }
]

// ============================================
// Demais grupos: DERM, TOX, TR, ORL, OFT (10 queixas)
// ============================================
export const dermComplaints: Complaint[] = [
  { id: 'DERM_URTICARIA', group: 'DERM', title: 'Urticária', subtitle: 'Placas vermelhas que coçam', ageTargets: ['adult', 'child'], riskLevel: 'medium', isTopForAdult: true, isTopForChild: true, isFastTrack: true, chips: ['alergia', 'coceira'], searchTerms: ['urticária', 'alergia de pele'], synonyms: ['placas alérgicas'], relatedSymptoms: ['Prurido', 'Placas eritematosas'], bodySystem: ['dermatologico'], severity: 2, icd10Codes: ['L50.9'], extendedContent: { redFlags: ['Angioedema', 'Dispneia', 'Hipotensão'], diagnosticoDiferencial: ['Urticária aguda', 'Anafilaxia'], condutaInicial: '1. Anti-histamínico\n2. Corticoide se grave\n3. Adrenalina se anafilaxia', calculadoras: [], referencias: [], rawMarkdown: '' } },
  { id: 'DERM_ANGIOEDEMA', group: 'DERM', title: 'Angioedema', subtitle: 'Inchaço de lábios, olhos ou garganta', ageTargets: ['adult'], riskLevel: 'high', isTopForAdult: true, isTopForChild: false, isFastTrack: false, chips: ['inchaço', 'alergia grave'], searchTerms: ['angioedema', 'inchaço lábios'], synonyms: ['edema angioneurótico'], relatedSymptoms: ['Edema facial', 'Dispneia'], bodySystem: ['dermatologico'], severity: 4, icd10Codes: ['T78.3'], extendedContent: { redFlags: ['Estridor', 'Dispneia', 'Uso de IECA'], diagnosticoDiferencial: ['Angioedema alérgico', 'Angioedema hereditário', 'Angioedema por IECA'], condutaInicial: '1. Via aérea\n2. Adrenalina IM se alérgico\n3. Anti-H1 + Corticoide\n4. Icatibanto se hereditário', calculadoras: [], referencias: [], rawMarkdown: '' } }
]

export const toxComplaints: Complaint[] = [
  { id: 'TOX_OVERDOSE', group: 'TOX', title: 'Intoxicação medicamentosa', subtitle: 'Tomou remédios demais', ageTargets: ['adult', 'teen'], riskLevel: 'high', isTopForAdult: true, isTopForChild: false, isFastTrack: false, chips: ['overdose', 'intoxicação'], searchTerms: ['intoxicação', 'overdose'], synonyms: ['superdosagem'], relatedSymptoms: ['Alteração consciência', 'Vômitos'], bodySystem: ['toxicologico'], severity: 5, icd10Codes: ['T50.9'], extendedContent: { redFlags: ['RNC', 'Convulsão', 'Arritmia', 'Hipotensão'], diagnosticoDiferencial: ['Intoxicação por BZD', 'Opioides', 'Paracetamol', 'Tricíclicos'], condutaInicial: '1. ABC\n2. Glicemia\n3. ECG\n4. Antídotos específicos\n5. Carvão ativado se < 1h', calculadoras: ['Nomograma de Rumack-Matthew'], referencias: [], rawMarkdown: '' } },
  { id: 'TOX_ALCOHOL', group: 'TOX', title: 'Intoxicação alcoólica', subtitle: 'Bebeu demais', ageTargets: ['adult', 'teen'], riskLevel: 'medium', isTopForAdult: true, isTopForChild: false, isFastTrack: false, chips: ['embriaguez', 'álcool'], searchTerms: ['intoxicação alcoólica', 'bebeu demais'], synonyms: ['embriaguez'], relatedSymptoms: ['Alteração consciência', 'Ataxia', 'Vômitos'], bodySystem: ['toxicologico'], severity: 3, icd10Codes: ['F10.0'], extendedContent: { redFlags: ['RNC grave', 'Hipoglicemia', 'Hipotermia', 'Aspiração'], diagnosticoDiferencial: ['Intoxicação alcoólica', 'TCE', 'Hipoglicemia', 'Outras intoxicações'], condutaInicial: '1. Via aérea (posição de segurança)\n2. Glicemia + Tiamina\n3. Aquecimento\n4. Observação', calculadoras: [], referencias: [], rawMarkdown: '' } },
  { id: 'TOX_SNAKE_BITE', group: 'TOX', title: 'Acidente ofídico', subtitle: 'Picada de cobra', ageTargets: ['adult', 'child'], riskLevel: 'high', isTopForAdult: true, isTopForChild: true, isFastTrack: false, chips: ['cobra', 'picada'], searchTerms: ['picada de cobra', 'acidente ofídico'], synonyms: ['picada de serpente'], relatedSymptoms: ['Dor local', 'Edema', 'Sangramentos'], bodySystem: ['toxicologico'], severity: 5, icd10Codes: ['T63.0'], extendedContent: { redFlags: ['Edema progressivo', 'Sangramento', 'Urina escura', 'Ptose palpebral'], diagnosticoDiferencial: ['Botrópico', 'Crotálico', 'Laquético', 'Elapídico'], condutaInicial: '1. Identificar serpente se possível\n2. Soro antiofídico específico\n3. Hidratação\n4. Monitorizar coagulograma', calculadoras: [], referencias: [], rawMarkdown: '' } }
]

export const trComplaints: Complaint[] = [
  { id: 'TR_LACERATION', group: 'TR', title: 'Ferimento corto-contuso', subtitle: 'Corte que precisa de pontos', ageTargets: ['adult', 'child'], riskLevel: 'low', isTopForAdult: true, isTopForChild: true, isFastTrack: true, chips: ['corte', 'ferimento'], searchTerms: ['corte', 'ferimento', 'laceração'], synonyms: ['laceração', 'corte'], relatedSymptoms: ['Sangramento', 'Dor local'], bodySystem: ['trauma'], severity: 1, icd10Codes: ['T14.1'], extendedContent: { redFlags: ['Sangramento arterial', 'Lesão de nervo/tendão', 'Corpo estranho'], diagnosticoDiferencial: ['Laceração simples', 'Laceração complexa'], condutaInicial: '1. Hemostasia\n2. Limpeza\n3. Anestesia local\n4. Sutura ou cola\n5. Profilaxia tétano', calculadoras: [], referencias: [], rawMarkdown: '' } },
  { id: 'TR_BURN', group: 'TR', title: 'Queimadura', subtitle: 'Lesão por calor, fogo ou químico', ageTargets: ['adult', 'child'], riskLevel: 'medium', isTopForAdult: true, isTopForChild: true, isFastTrack: false, chips: ['queimadura', 'fogo'], searchTerms: ['queimadura', 'queimou'], synonyms: ['lesão térmica'], relatedSymptoms: ['Dor', 'Bolhas', 'Eritema'], bodySystem: ['trauma'], severity: 3, icd10Codes: ['T30.0'], extendedContent: { redFlags: ['> 20% SCQ', 'Queimadura de via aérea', 'Circunferencial', 'Face/mãos/pés/genitália'], diagnosticoDiferencial: ['1º grau', '2º grau', '3º grau'], condutaInicial: '1. Resfriar com água corrente\n2. Calcular SCQ (Lund-Browder ou Regra dos 9)\n3. Hidratação (Parkland se > 20%)\n4. Analgesia\n5. Centro de queimados se grave', calculadoras: ['Regra dos 9', 'Fórmula de Parkland'], referencias: [], rawMarkdown: '' } }
]

// Exportar todas as novas queixas da parte 2
export const newComplaintsPart2: Complaint[] = [
  ...guComplaints,
  ...mskComplaints,
  ...infComplaints,
  ...obgComplaints,
  ...pedComplaints,
  ...dermComplaints,
  ...toxComplaints,
  ...trComplaints,
]
