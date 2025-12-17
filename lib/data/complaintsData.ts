
export const complaintsData = {
  "version": "frontend-1.0",
  "locale": "pt-BR",
  "groups": [
    {
      "code": "PROTO_SEPSE",
      "label": "Sepse / Choque",
      "description": "Reconhecimento precoce, qSOFA e Bundles de 1h.",
      "icon": "Biohazard",
      "color": "rose",
      "sortOrder": 0,
      "recommendedFor": ["adult", "elderly"]
    },
    {
      "code": "PROTO_AVC",
      "label": "AVC Agudo",
      "description": "Protocolo AVC, escala NIHSS e janela trombolítica.",
      "icon": "Brain",
      "color": "purple",
      "sortOrder": 0,
      "recommendedFor": ["adult", "elderly"]
    },
    {
      "code": "PROTO_IC",
      "label": "IC Descompensada",
      "description": "Perfil hemodinâmico (Stevenson) e manejo de congestão.",
      "icon": "HeartPulse",
      "color": "blue",
      "sortOrder": 0,
      "recommendedFor": ["adult", "elderly"]
    },
    {
      "code": "PROTO_TEP",
      "label": "Tromboembolismo",
      "description": "Estratificação de risco (Wells/Geneva) e conduta no TEP.",
      "icon": "Wind",
      "color": "cyan",
      "sortOrder": 0,
      "recommendedFor": ["adult"]
    },
    {
      "code": "CV",
      "label": "Peito / Coração",
      "description": "Dor no peito, palpitações, desmaio, pressão alta.",
      "icon": "HeartPulse",
      "color": "red",
      "sortOrder": 1,
      "recommendedFor": ["adult", "elderly"]
    },
    {
      "code": "RC",
      "label": "Respiração",
      "description": "Falta de ar, tosse, chiado, engasgo.",
      "icon": "Wind",
      "color": "blue",
      "sortOrder": 2,
      "recommendedFor": ["adult", "child", "elderly"]
    },
    {
      "code": "NC",
      "label": "Neuro / Cabeça",
      "description": "Desmaio, convulsão, dor de cabeça, confusão.",
      "icon": "Brain",
      "color": "purple",
      "sortOrder": 3,
      "recommendedFor": ["adult", "child", "elderly"]
    },
    {
      "code": "GI",
      "label": "Digestivo",
      "description": "Dor na barriga, vômito, diarreia, sangramento.",
      "icon": "Utensils",
      "color": "orange",
      "sortOrder": 4,
      "recommendedFor": ["adult", "child"]
    },
    {
      "code": "GU",
      "label": "Urinário / Renal",
      "description": "Dor ao urinar, dor nos rins, secreção.",
      "icon": "Droplets",
      "color": "teal",
      "sortOrder": 5,
      "recommendedFor": ["adult", "elderly"]
    },
    {
      "code": "MSK",
      "label": "Osteomuscular",
      "description": "Dor lombar, dores musculares, fraturas.",
      "icon": "Bone",
      "color": "amber",
      "sortOrder": 6,
      "recommendedFor": ["adult", "child", "elderly"]
    },
    {
      "code": "INF",
      "label": "Febre / Infecção",
      "description": "Febre isolada ou com sintomas gerais.",
      "icon": "Thermometer",
      "color": "rose",
      "sortOrder": 7,
      "recommendedFor": ["adult", "child"]
    },
    {
      "code": "OBG",
      "label": "Ginecologia",
      "description": "Gestação, dor pélvica, sangramento vaginal.",
      "icon": "Baby",
      "color": "pink",
      "sortOrder": 8,
      "recommendedFor": ["adultPregnant"]
    },
    {
      "code": "PED",
      "label": "Pediatria",
      "description": "Queixas específicas de bebês e crianças.",
      "icon": "Baby",
      "color": "sky",
      "sortOrder": 9,
      "recommendedFor": ["child", "infant"]
    },
    {
      "code": "PSI",
      "label": "Saúde Mental",
      "description": "Ansiedade, agitação, ideias suicidas.",
      "icon": "BrainCircuit",
      "color": "indigo",
      "sortOrder": 10,
      "recommendedFor": ["adult", "teen"]
    },
    {
      "code": "TR",
      "label": "Trauma",
      "description": "Quedas, acidentes, cortes, pancadas.",
      "icon": "Siren",
      "color": "slate",
      "sortOrder": 11,
      "recommendedFor": ["adult", "child", "elderly"]
    },
    {
      "code": "TOX",
      "label": "Intoxicação",
      "description": "Overdose, ingestão de produtos, venenos.",
      "icon": "Biohazard",
      "color": "lime",
      "sortOrder": 12,
      "recommendedFor": ["adult", "child"]
    },
    {
      "code": "DERM",
      "label": "Pele",
      "description": "Manchas, alergias, queimaduras, picadas.",
      "icon": "Hand",
      "color": "yellow",
      "sortOrder": 13,
      "recommendedFor": ["adult", "child"]
    },
    {
      "code": "ORL",
      "label": "Ouvido / Garganta",
      "description": "Dor de ouvido, garganta, nariz, dente.",
      "icon": "Ear",
      "color": "emerald",
      "sortOrder": 14,
      "recommendedFor": ["adult", "child"]
    },
    {
      "code": "OFT",
      "label": "Olhos",
      "description": "Olho vermelho, dor, perda de visão.",
      "icon": "Eye",
      "color": "cyan",
      "sortOrder": 15,
      "recommendedFor": ["adult", "child"]
    },
    {
      "code": "ENV",
      "label": "Exposição",
      "description": "Químicos, calor, frio, fumaça.",
      "icon": "Sun",
      "color": "neutral",
      "sortOrder": 16,
      "recommendedFor": ["adult", "child"]
    },
    {
      "code": "GEN",
      "label": "Geral / Adm",
      "description": "Mal-estar inespecífico, receitas, atestados.",
      "icon": "MoreHorizontal",
      "color": "gray",
      "sortOrder": 17,
      "recommendedFor": ["adult", "elderly"]
    }
  ],
  "complaints": [
    {
      "id": "CV_CHEST_PAIN_TYPICAL",
      "group": "CV",
      "title": "Dor no peito em aperto",
      "subtitle": "Pode ser problema no coração",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["dor no peito", "aperto no peito", "peso no peito"],
      "searchTerms": [
        "dor no peito em aperto",
        "aperto no peito",
        "peso no peito",
        "dor no peito ao esforço",
        "dor no peito que irradia",
        "dor precordial"
      ]
    },
    {
      "id": "CV_CHEST_PAIN_ATYPICAL",
      "group": "CV",
      "title": "Dor no peito em pontada",
      "subtitle": "Dor localizada ou que piora ao mexer ou respirar",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": true,
      "chips": ["pontada no peito", "fisgada no peito"],
      "searchTerms": [
        "dor no peito em pontada",
        "fisgada no peito",
        "dor no peito ao respirar",
        "dor no peito ao mexer",
        "dor costocondral"
      ]
    },
    {
      "id": "CV_SYNCOPE",
      "group": "CV",
      "title": "Desmaio ou quase desmaio",
      "subtitle": "Apagão, queda súbita, perda de consciência",
      "ageTargets": ["adult", "elderly", "teen"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["desmaio", "apagão"],
      "searchTerms": [
        "desmaio",
        "apagão",
        "escureceu a visão",
        "quase desmaiou",
        "caiu duro"
      ]
    },
    {
      "id": "CV_PALPITATIONS",
      "group": "CV",
      "title": "Coração disparado",
      "subtitle": "Palpitações ou batimentos fortes",
      "ageTargets": ["adult", "elderly", "teen"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": true,
      "chips": ["palpitações", "coração acelerado"],
      "searchTerms": [
        "coração disparado",
        "coração acelerado",
        "batimentos fortes",
        "batedeira no peito"
      ]
    },
    {
      "id": "RC_DYSPNEA_ACUTE",
      "group": "RC",
      "title": "Falta de ar importante",
      "subtitle": "Dificuldade para respirar de início recente",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["falta de ar", "dificuldade para respirar"],
      "searchTerms": [
        "falta de ar",
        "não consigo respirar",
        "fôlego curto",
        "respiração cansada",
        "sufocação"
      ]
    },
    {
      "id": "RC_COUGH_ACUTE",
      "group": "RC",
      "title": "Tosse recente",
      "subtitle": "Tosse com ou sem febre",
      "ageTargets": ["adult", "child"],
      "riskLevel": "low",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": true,
      "chips": ["tosse", "gripe"],
      "searchTerms": [
        "tosse forte",
        "tosse seca",
        "tosse com catarro",
        "gripe com tosse"
      ]
    },
    {
      "id": "RC_STRIDOR_UPPER_AIRWAY",
      "group": "RC",
      "title": "Garganta fechando / barulho para respirar",
      "subtitle": "Estridor, barulho alto ao puxar o ar",
      "ageTargets": ["child", "adult"],
      "riskLevel": "high",
      "isTopForAdult": false,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["barulho ao respirar", "garganta fechando"],
      "searchTerms": [
        "barulho ao inspirar",
        "chiado no pescoço",
        "garganta fechando",
        "crupe"
      ]
    },
    {
      "id": "NC_STROKE_SYNDROME",
      "group": "NC",
      "title": "Boca torta / fraqueza de um lado",
      "subtitle": "Pode ser AVC (derrame)",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["suspeita de AVC", "derrame"],
      "searchTerms": [
        "boca torta",
        "acordou torto",
        "perdeu força de um lado",
        "não fala direito"
      ]
    },
    {
      "id": "NC_HEADACHE_THUNDERCLAP",
      "group": "NC",
      "title": "Pior dor de cabeça da vida",
      "subtitle": "Cefaleia súbita muito forte",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["dor de cabeça súbita"],
      "searchTerms": [
        "pior dor de cabeça da vida",
        "dor de cabeça súbita muito forte",
        "explosão na cabeça"
      ]
    },
    {
      "id": "NC_SEIZURE",
      "group": "NC",
      "title": "Convulsão / ataque",
      "subtitle": "Crise com tremores ou perda de consciência",
      "ageTargets": ["adult", "child"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["convulsão", "ataque epiléptico"],
      "searchTerms": [
        "teve convulsão",
        "ataque epiléptico",
        "se tremendo todo",
        "desmaiou se debatendo"
      ]
    },
    {
      "id": "GI_ABDOMINAL_PAIN_ACUTE",
      "group": "GI",
      "title": "Dor de barriga forte",
      "subtitle": "Dor na barriga que começou há pouco tempo",
      "ageTargets": ["adult", "child"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["dor na barriga", "dor abdominal"],
      "searchTerms": [
        "dor na barriga",
        "dor de barriga forte",
        "dor no estômago",
        "cólica na barriga"
      ]
    },
    {
      "id": "GI_DIARRHEA_ACUTE",
      "group": "GI",
      "title": "Diarreia",
      "subtitle": "Fezes líquidas recentes, com ou sem febre",
      "ageTargets": ["adult", "child"],
      "riskLevel": "low",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": true,
      "chips": ["diarreia", "virose"],
      "searchTerms": [
        "diarreia",
        "fezes líquidas",
        "desarranjo intestinal",
        "gastroenterite"
      ]
    },
    {
      "id": "GI_VOMITING_ACUTE",
      "group": "GI",
      "title": "Vômitos",
      "subtitle": "Vômitos recentes, com ou sem dor",
      "ageTargets": ["adult", "child"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["vômito", "enjoo"],
      "searchTerms": [
        "vomitando muito",
        "enjoo com vômitos",
        "pôs tudo para fora"
      ]
    },
    {
      "id": "INF_FEVER_NO_FOCUS_ADULT",
      "group": "INF",
      "title": "Febre em adulto",
      "subtitle": "Febre sem outro sintoma marcante",
      "ageTargets": ["adult"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["febre", "calafrios"],
      "searchTerms": [
        "febre sem outros sintomas",
        "febre alta sem saber a causa",
        "calafrios e febre"
      ]
    },
    {
      "id": "INF_FEVER_NO_FOCUS_CHILD",
      "group": "INF",
      "title": "Febre em criança",
      "subtitle": "Febre em criança sem foco claro",
      "ageTargets": ["child"],
      "riskLevel": "medium",
      "isTopForAdult": false,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["febre na criança"],
      "searchTerms": [
        "criança com febre",
        "bebê com febre",
        "febre isolada em criança"
      ]
    },
    {
      "id": "INF_FEVER_LRTI",
      "group": "INF",
      "title": "Febre + tosse ou falta de ar",
      "subtitle": "Pode ser pneumonia ou infecção respiratória baixa",
      "ageTargets": ["adult", "child"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["febre e tosse", "febre e falta de ar"],
      "searchTerms": [
        "febre e falta de ar",
        "febre e tosse forte",
        "suspeita de pneumonia"
      ]
    },
    {
      "id": "OBG_PREG_EARLY_PAIN_BLEED",
      "group": "OBG",
      "title": "Sangue ou dor no início da gravidez",
      "subtitle": "Atraso menstrual, possível gestação",
      "ageTargets": ["adultPregnant"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["sangramento na gravidez", "dor no início da gestação"],
      "searchTerms": [
        "atraso menstrual com sangramento",
        "suspeita de gravidez com dor",
        "ameaça de aborto"
      ]
    },
    {
      "id": "OBG_LABOR",
      "group": "OBG",
      "title": "Contrações / trabalho de parto",
      "subtitle": "Contrações regulares, bolsa rota ou dor forte na barriga",
      "ageTargets": ["adultPregnant"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["trabalho de parto", "contrações"],
      "searchTerms": [
        "em trabalho de parto",
        "contrações regulares",
        "barriga endurecendo ritmado"
      ]
    },
    {
      "id": "PED_FEVER_INFANT_LT3M",
      "group": "PED",
      "title": "Febre em bebê < 3 meses",
      "subtitle": "Qualquer febre em bebê muito pequeno",
      "ageTargets": ["infant"],
      "riskLevel": "high",
      "isTopForAdult": false,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["febre em bebê"],
      "searchTerms": [
        "bebê menor de 3 meses com febre",
        "febre em recém-nascido",
        "lactente pequeno febril"
      ]
    },
    {
      "id": "PED_INFANT_RESP_DISTRESS",
      "group": "PED",
      "title": "Bebê respirando puxando barriga",
      "subtitle": "Dificuldade respiratória em lactente",
      "ageTargets": ["infant"],
      "riskLevel": "high",
      "isTopForAdult": false,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["bebê cansado", "respiração rápida"],
      "searchTerms": [
        "bebê respirando puxando barriga",
        "gemendo ao respirar",
        "tiragem intercostal"
      ]
    },
    {
      "id": "PSI_SUICIDAL_IDEATION",
      "group": "PSI",
      "title": "Pensando em se matar",
      "subtitle": "Ideias de suicídio, sem ou com plano",
      "ageTargets": ["adult", "teen"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["ideação suicida"],
      "searchTerms": [
        "pensando em se matar",
        "vontade de morrer",
        "ideias de suicídio"
      ]
    },
    {
      "id": "PSI_SUICIDE_ATTEMPT",
      "group": "PSI",
      "title": "Tentativa de suicídio",
      "subtitle": "Qualquer tentativa, por qualquer meio",
      "ageTargets": ["adult", "teen"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["tentativa de suicídio"],
      "searchTerms": [
        "tentou se matar",
        "tomou remédio para se matar",
        "se cortou para morrer",
        "tentou enforcamento"
      ]
    },
    {
      "id": "PSI_PANIC_ATTACK",
      "group": "PSI",
      "title": "Crise de ansiedade / pânico",
      "subtitle": "Coração acelerado, falta de ar, sensação de morte",
      "ageTargets": ["adult", "teen"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": true,
      "chips": ["crise de ansiedade", "ataque de pânico"],
      "searchTerms": [
        "crise de ansiedade",
        "ataque de pânico",
        "sensação de morte iminente"
      ]
    },
    {
      "id": "TR_POLYTRAUMA_HIGH_ENERGY",
      "group": "TR",
      "title": "Acidente grave (carro, moto, queda)",
      "subtitle": "Politrauma de alta energia",
      "ageTargets": ["adult", "teen", "child"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["acidente grave"],
      "searchTerms": [
        "acidente de carro grave",
        "acidente de moto grave",
        "queda de grande altura",
        "atropelamento"
      ]
    },
    {
      "id": "TR_HEAD_INJURY_TBI",
      "group": "TR",
      "title": "Caiu e bateu a cabeça",
      "subtitle": "Trauma de cabeça com ou sem corte",
      "ageTargets": ["adult", "child", "elderly"],
      "riskLevel": "high",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["trauma de cabeça"],
      "searchTerms": [
        "bateu a cabeça",
        "caiu e bateu a cabeça",
        "traumatismo craniano"
      ]
    },
    {
      "id": "MSK_LOW_BACK_PAIN_ACUTE",
      "group": "MSK",
      "title": "Dor nas costas (lombar) recente",
      "subtitle": "Travou a coluna ou dor lombar aguda",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": true,
      "chips": ["dor lombar", "lombalgia"],
      "searchTerms": [
        "dor nas costas baixa",
        "travou a lombar",
        "lombalgia aguda"
      ]
    },
    {
      "id": "DERM_RASH_ACUTE",
      "group": "DERM",
      "title": "Manchas ou bolinhas na pele",
      "subtitle": "Exantema ou alergia recente",
      "ageTargets": ["adult", "child"],
      "riskLevel": "low",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": true,
      "chips": ["manchas na pele", "bolinhas"],
      "searchTerms": [
        "rash",
        "exantema",
        "manchas vermelhas na pele",
        "pele empipocada"
      ]
    },
    {
      "id": "ORL_SORE_THROAT",
      "group": "ORL",
      "title": "Dor de garganta",
      "subtitle": "Dor ao engolir, garganta inflamada",
      "ageTargets": ["adult", "child"],
      "riskLevel": "low",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": true,
      "chips": ["dor de garganta"],
      "searchTerms": [
        "dor para engolir",
        "garganta inflamada",
        "amigdalite"
      ]
    },
    {
      "id": "ORL_EPISTAXIS",
      "group": "ORL",
      "title": "Nariz sangrando",
      "subtitle": "Sangramento nasal",
      "ageTargets": ["adult", "child"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": true,
      "isFastTrack": false,
      "chips": ["epistaxe"],
      "searchTerms": [
        "nariz sangrando",
        "sangramento nasal",
        "sangue pelo nariz"
      ]
    },
    {
      "id": "GEN_UNWELL_UNSPEC",
      "group": "GEN",
      "title": "Passando mal (sem foco definido)",
      "subtitle": "Mal-estar geral sem sintoma principal claro",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "medium",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": false,
      "chips": ["mal-estar geral"],
      "searchTerms": [
        "passando mal",
        "mal-estar",
        "me sinto ruim"
      ]
    },
    {
      "id": "GEN_PRESCRIPTION_RENEWAL",
      "group": "GEN",
      "title": "Só renovar receita / pegar medicação",
      "subtitle": "Sem queixa aguda",
      "ageTargets": ["adult", "elderly"],
      "riskLevel": "low",
      "isTopForAdult": true,
      "isTopForChild": false,
      "isFastTrack": true,
      "chips": ["renovar receita"],
      "searchTerms": [
        "renovar receita",
        "pegar medicação",
        "receita azul"
      ]
    }
  ]
};
