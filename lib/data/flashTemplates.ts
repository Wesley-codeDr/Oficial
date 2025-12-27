import { Patient } from '@/lib/types/medical'

export interface FlashTemplate {
  id: string
  nome: string
  categoria: string
  template: {
    queixa_principal: string
    exame_fisico: string
    hipotese_diagnostica: string[]
    conduta: string
    cid: string
    cid_descricao: string
  }
  referencias_mbe: string[]
}

export const flashTemplates: Record<string, FlashTemplate> = {
  ivas: {
    id: 'ivas',
    nome: 'IVAS / Resfriado Comum',
    categoria: 'respiratorio',
    template: {
      queixa_principal:
        'Coriza, odinofagia e tosse seca há {tempo_sintomas}. Nega febre aferida. Nega dispneia. Nega dor torácica.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Orofaringe com hiperemia leve, sem exsudato ou placas. Murmúrio vesicular presente bilateral, sem ruídos adventícios.',
      hipotese_diagnostica: [
        'Infecção de vias aéreas superiores de provável etiologia viral',
        'Rinofaringite aguda',
        'Síndrome gripal',
      ],
      conduta:
        'Prescrito sintomáticos (analgésico e antitérmico). {gender_orientado} quanto à hidratação oral abundante e repouso relativo. {gender_orientado} quanto aos sinais de alarme: febre persistente por mais de 72 horas, dispneia, dor torácica, piora do estado geral. {gender_orientado} a retornar ao pronto atendimento se persistência ou piora dos sintomas. {gender_orientado} a buscar acompanhamento com {gender_medico} assistente para seguimento ambulatorial.',
      cid: 'J069',
      cid_descricao: 'Infecção aguda das vias aéreas superiores não especificada',
    },
    referencias_mbe: [
      'NICE Guidelines CG69',
      'BMJ Best Practice - Common Cold',
      'UpToDate - The common cold in adults',
    ],
  },
  faringoamigdalite: {
    id: 'faringoamigdalite',
    nome: 'Faringoamigdalite Bacteriana',
    categoria: 'respiratorio',
    template: {
      queixa_principal:
        'Odinofagia intensa há {tempo_sintomas}, febre aferida de {temperatura}°C, dificuldade para deglutição. Nega tosse. Nega dispneia. Nega trismo. Nega abaulamento em palato.',
      exame_fisico:
        'Regular estado geral, {gender_corado}, {gender_hidratado}, febril ao toque. Orofaringe com hiperemia intensa e exsudato purulento em tonsilas palatinas bilateralmente. Adenomegalia cervical anterior palpável, dolorosa. Ausência de abaulamento peritonsilar. Murmúrio vesicular presente bilateral, sem ruídos adventícios.',
      hipotese_diagnostica: [
        'Faringoamigdalite aguda bacteriana',
        'Faringoamigdalite estreptocócica',
        'Mononucleose infecciosa em diagnóstico diferencial',
      ],
      conduta:
        'Escore de Centor-McIsaac: {centor_score} pontos. Prescrito antibioticoterapia (Amoxicilina 500mg via oral a cada 8 horas por 10 dias) e sintomáticos. {gender_orientado} quanto a repouso, hidratação oral e alimentação pastosa. {gender_orientado} quanto aos sinais de alarme: dispneia, trismo, abaulamento peritonsilar, salivação excessiva, dificuldade respiratória. {gender_orientado} a retornar ao pronto atendimento se persistência da febre após 48 a 72 horas de antibioticoterapia ou piora clínica. {gender_orientado} a buscar acompanhamento com {gender_medico} assistente ou otorrinolaringologista para seguimento.',
      cid: 'J030',
      cid_descricao: 'Amigdalite estreptocócica',
    },
    referencias_mbe: ['IDSA Guidelines', 'UpToDate - Group A streptococcal tonsillopharyngitis'],
  },

  // === RESPIRATÓRIO ===
  sinusite: {
    id: 'sinusite',
    nome: 'Sinusite Aguda',
    categoria: 'respiratorio',
    template: {
      queixa_principal:
        'Dor facial, congestão nasal e secreção nasal purulenta há {tempo_sintomas}. Cefaleia frontal associada. Nega febre aferida. Nega epistaxe.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Rinoscopia anterior com hiperemia de cornetos e secreção mucopurulenta em meato médio. Dor à palpação de seios maxilares. Orofaringe sem exsudato.',
      hipotese_diagnostica: [
        'Rinossinusite aguda bacteriana',
        'Rinossinusite viral',
      ],
      conduta:
        'Prescrito sintomáticos (analgésico, descongestionante nasal tópico por até 5 dias). Lavagem nasal com soro fisiológico. Antibioticoterapia (Amoxicilina 500mg 8/8h por 7-10 dias) se sintomas > 10 dias ou piora após melhora inicial. {gender_orientado} quanto aos sinais de alarme: febre alta, edema periorbitário, alteração visual, cefaleia intensa. {gender_orientado} a retornar se piora ou não melhora em 7 dias.',
      cid: 'J010',
      cid_descricao: 'Sinusite maxilar aguda',
    },
    referencias_mbe: ['AAO-HNS Guidelines', 'UpToDate - Acute bacterial rhinosinusitis'],
  },

  bronquite: {
    id: 'bronquite',
    nome: 'Bronquite Aguda',
    categoria: 'respiratorio',
    template: {
      queixa_principal:
        'Tosse produtiva há {tempo_sintomas}, com expectoração amarelada. Desconforto retroesternal associado à tosse. Nega febre aferida. Nega dispneia em repouso. Nega dor torácica.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Ausculta pulmonar com murmúrio vesicular presente bilateral, roncos esparsos difusos, sem sibilos. Frequência respiratória normal. SpO2 {spo2}% em ar ambiente.',
      hipotese_diagnostica: [
        'Bronquite aguda',
        'Traqueobronquite viral',
      ],
      conduta:
        'Prescrito sintomáticos (analgésico, antitussígeno se tosse muito incômoda). Mel pode ser utilizado para alívio da tosse. Hidratação oral abundante. Antibiótico NÃO indicado de rotina (etiologia predominantemente viral). {gender_orientado} quanto aos sinais de alarme: febre > 38.5°C, dispneia, hemoptise, piora progressiva. {gender_orientado} a retornar se não melhora em 2-3 semanas.',
      cid: 'J209',
      cid_descricao: 'Bronquite aguda não especificada',
    },
    referencias_mbe: ['NICE Guidelines CG69', 'Cochrane - Antibiotics for acute bronchitis'],
  },

  // === ORL ===
  otite_media: {
    id: 'otite_media',
    nome: 'Otite Média Aguda',
    categoria: 'orl',
    template: {
      queixa_principal:
        'Otalgia intensa à {lado} há {tempo_sintomas}, febre aferida de {temperatura}°C. Sensação de ouvido tampado. Nega otorreia. Nega hipoacusia prévia.',
      exame_fisico:
        'Regular estado geral, {gender_corado}, {gender_hidratado}, febril ao toque. Otoscopia {lado}: membrana timpânica hiperemiada, abaulada, com perda do cone luminoso. Conduto auditivo externo sem secreção. Otoscopia contralateral normal.',
      hipotese_diagnostica: [
        'Otite média aguda',
        'Otite média aguda supurativa',
      ],
      conduta:
        'Prescrito antibioticoterapia (Amoxicilina 500mg 8/8h por 7 dias) e analgesia (Dipirona ou Paracetamol). Em casos leves, observação por 48-72h pode ser alternativa. {gender_orientado} quanto aos sinais de alarme: otorreia, persistência da febre após 48-72h, piora da dor, sintomas neurológicos. {gender_orientado} a retornar se não melhora.',
      cid: 'H660',
      cid_descricao: 'Otite média aguda supurativa',
    },
    referencias_mbe: ['AAP/AAFP Guidelines OMA', 'UpToDate - Acute otitis media'],
  },

  otite_externa: {
    id: 'otite_externa',
    nome: 'Otite Externa',
    categoria: 'orl',
    template: {
      queixa_principal:
        'Otalgia à {lado} há {tempo_sintomas}, piora à manipulação do pavilhão auricular. Prurido auricular associado. Nega febre. Nega hipoacusia significativa.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Pavilhão auricular sem alterações. Dor intensa à tração do tragus e da hélix. Otoscopia: conduto auditivo externo edemaciado, hiperemiado, com secreção serosa. Membrana timpânica visível e íntegra.',
      hipotese_diagnostica: [
        'Otite externa aguda difusa',
        'Orelha de nadador',
      ],
      conduta:
        'Prescrito gotas otológicas com antibiótico e corticoide (Ciprofloxacino + Dexametasona 3 gotas 8/8h por 7 dias). Manter ouvido seco (evitar entrada de água). Analgesia oral. Evitar manipulação do conduto. {gender_orientado} a retornar se piora, febre ou não melhora em 5-7 dias.',
      cid: 'H601',
      cid_descricao: 'Otite externa aguda',
    },
    referencias_mbe: ['AAO-HNS Guidelines', 'UpToDate - External otitis'],
  },

  // === GASTROINTESTINAL ===
  gastroenterite: {
    id: 'gastroenterite',
    nome: 'Gastroenterite Aguda',
    categoria: 'gastrointestinal',
    template: {
      queixa_principal:
        'Diarreia líquida há {tempo_sintomas}, cerca de {num_evacuacoes} evacuações por dia. Náuseas e vômitos associados. Dor abdominal em cólica difusa. Nega febre aferida. Nega sangue ou muco nas fezes.',
      exame_fisico:
        'Regular estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Abdome flácido, ruídos hidroaéreos aumentados, dor difusa leve à palpação superficial e profunda, sem sinais de peritonite. Turgor cutâneo preservado.',
      hipotese_diagnostica: [
        'Gastroenterite aguda viral',
        'Síndrome diarreica aguda',
        'Toxinfecção alimentar',
      ],
      conduta:
        'Prescrito hidratação oral com soro de reidratação oral (SRO). Dieta leve, evitar laticínios e alimentos gordurosos temporariamente. Sintomáticos (antiemético se náuseas intensas, analgésico). Probióticos podem ser considerados. Antibióticos NÃO indicados de rotina. {gender_orientado} quanto aos sinais de alarme: desidratação (boca seca, oligúria), sangue nas fezes, febre alta persistente, prostração. {gender_orientado} a retornar se piora.',
      cid: 'A09',
      cid_descricao: 'Diarreia e gastroenterite de origem infecciosa presumível',
    },
    referencias_mbe: ['WHO Diarrhoea Guidelines', 'ESPGHAN/ESPID Guidelines'],
  },

  dispepsia: {
    id: 'dispepsia',
    nome: 'Dispepsia / Dor Epigástrica',
    categoria: 'gastrointestinal',
    template: {
      queixa_principal:
        'Dor epigástrica em queimação há {tempo_sintomas}, piora pós-prandial. Plenitude pós-prandial e empachamento. Pirose ocasional. Nega vômitos. Nega melena ou hematêmese. Nega perda ponderal.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Abdome flácido, ruídos hidroaéreos presentes e normoativos, dor à palpação profunda em epigástrio, sem sinais de peritonite. Murphy negativo. Blumberg negativo.',
      hipotese_diagnostica: [
        'Dispepsia funcional',
        'Síndrome dispéptica',
        'Gastrite',
      ],
      conduta:
        'Prescrito inibidor de bomba de prótons (Omeprazol 20mg em jejum por 4-8 semanas). Orientações dietéticas: evitar café, álcool, alimentos gordurosos e condimentados, fracionar refeições. {gender_orientado} quanto aos sinais de alarme: idade > 55 anos com sintomas novos, perda de peso inexplicada, disfagia, sangramento digestivo, vômitos persistentes. Se sinais de alarme, encaminhar para endoscopia digestiva alta. {gender_orientado} a buscar seguimento ambulatorial.',
      cid: 'K30',
      cid_descricao: 'Dispepsia funcional',
    },
    referencias_mbe: ['ACG Guidelines Dyspepsia', 'NICE Dyspepsia Guidelines'],
  },

  // === UROLÓGICO ===
  cistite: {
    id: 'cistite',
    nome: 'ITU Baixa (Cistite)',
    categoria: 'urologico',
    template: {
      queixa_principal:
        'Disúria, polaciúria e urgência miccional há {tempo_sintomas}. Dor suprapúbica associada. Urina turva. Nega febre aferida. Nega dor lombar. Nega corrimento vaginal.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Abdome flácido, dor leve à palpação em hipogástrio. Punho-percussão lombar indolor bilateralmente (Giordano negativo).',
      hipotese_diagnostica: [
        'Cistite aguda não complicada',
        'Infecção urinária baixa',
      ],
      conduta:
        'Solicitado urina tipo I. Urocultura se disponível ou se fatores de risco. Prescrito antibioticoterapia empírica: Fosfomicina 3g dose única OU Nitrofurantoína 100mg 6/6h por 5 dias. Hidratação abundante. {gender_orientado} quanto aos sinais de alarme: febre, dor lombar, náuseas/vômitos (sugerem pielonefrite). {gender_orientado} a retornar se não melhora em 48-72h ou piora.',
      cid: 'N300',
      cid_descricao: 'Cistite aguda',
    },
    referencias_mbe: ['IDSA Guidelines UTI', 'UpToDate - Acute uncomplicated cystitis'],
  },

  colica_renal: {
    id: 'colica_renal',
    nome: 'Cólica Renal / Nefrolitíase',
    categoria: 'urologico',
    template: {
      queixa_principal:
        'Dor lombar à {lado} de início súbito há {tempo_sintomas}, muito intensa, em cólica, com irradiação para flanco e região inguinal ipsilateral. Náuseas e vômitos associados. Hematúria. Agitação psicomotora pela dor.',
      exame_fisico:
        'Regular estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque, {gender_agitado} pela dor. Punho-percussão lombar {lado} intensamente positiva (Giordano +). Abdome flácido, sem sinais de peritonite. Sem massas palpáveis.',
      hipotese_diagnostica: [
        'Cólica nefrética',
        'Nefrolitíase',
        'Urolitíase',
      ],
      conduta:
        'Prescrito analgesia potente: AINE endovenoso (Cetoprofeno 100mg ou Tenoxicam 20mg) + Dipirona + Escopolamina. Hidratação endovenosa. Solicitado urina tipo I. TC de vias urinárias sem contraste (padrão-ouro) ou USG de vias urinárias. {gender_orientado} quanto aos sinais de alarme: febre (sugere obstrução infectada - urgência urológica), anúria, piora da dor. Se febre ou sinais de obstrução complicada, considerar internação e avaliação urológica de urgência.',
      cid: 'N200',
      cid_descricao: 'Cálculo do rim',
    },
    referencias_mbe: ['EAU Guidelines Urolithiasis', 'AUA Guidelines Surgical Management of Stones'],
  },

  // === NEUROLÓGICO ===
  cefaleia_tensional: {
    id: 'cefaleia_tensional',
    nome: 'Cefaleia Tensional',
    categoria: 'neurologico',
    template: {
      queixa_principal:
        'Cefaleia holocraniana em pressão/aperto há {tempo_sintomas}, intensidade leve a moderada. Sem náuseas ou vômitos. Sem fotofobia ou fonofobia significativas. Não piora com atividade física. Nega febre.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Exame neurológico sumário sem alterações: pupilas isocóricas e fotorreagentes, força e sensibilidade preservadas nos 4 membros, marcha normal, coordenação preservada. Rigidez de nuca ausente.',
      hipotese_diagnostica: [
        'Cefaleia do tipo tensional',
        'Cefaleia primária',
      ],
      conduta:
        'Prescrito analgésico simples (Paracetamol 750mg ou Dipirona 1g). Orientações: redução do estresse, higiene do sono adequada, alongamentos cervicais, pausas durante trabalho. Se crises frequentes (>15 dias/mês), encaminhar para profilaxia ambulatorial com neurologista. {gender_orientado} quanto aos sinais de alarme: cefaleia em trovoada (pior dor da vida), déficit neurológico, febre, rigidez de nuca, alteração do nível de consciência. {gender_orientado} a retornar se mudança do padrão habitual.',
      cid: 'G442',
      cid_descricao: 'Cefaleia do tipo tensional episódica',
    },
    referencias_mbe: ['IHS Classification ICHD-3', 'BMJ Best Practice - Tension-type headache'],
  },

  vppb: {
    id: 'vppb',
    nome: 'Vertigem Posicional (VPPB)',
    categoria: 'neurologico',
    template: {
      queixa_principal:
        'Tontura rotatória de início súbito há {tempo_sintomas}, desencadeada por mudança de posição da cabeça (ao deitar, levantar ou virar na cama). Episódios de curta duração (segundos a 1 minuto). Náuseas associadas. Nega hipoacusia. Nega zumbido. Nega cefaleia.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Manobra de Dix-Hallpike positiva para {lado}: nistagmo rotatório/vertical com latência de alguns segundos, fatigável (diminui com repetição). Exame neurológico sem alterações focais. Marcha cautelosa, sem ataxia verdadeira. Romberg negativo.',
      hipotese_diagnostica: [
        'Vertigem posicional paroxística benigna (VPPB)',
        'Canalitíase do canal semicircular posterior',
      ],
      conduta:
        'Realizada manobra de reposicionamento de Epley (se VPPB de canal posterior confirmada). Prescrito sintomáticos apenas se náuseas intensas (Dimenidrinato ou Meclizina por curto período - evitar uso prolongado). {gender_orientado} a evitar movimentos bruscos da cabeça, dormir com cabeceira elevada. {gender_orientado} sobre exercícios de Brandt-Daroff domiciliares se recorrência. Encaminhar para otorrinolaringologista/neurologista se não resposta ou atipias.',
      cid: 'H811',
      cid_descricao: 'Vertigem paroxística benigna',
    },
    referencias_mbe: ['AAO-HNS BPPV Guidelines', 'UpToDate - Benign paroxysmal positional vertigo'],
  },

  enxaqueca: {
    id: 'enxaqueca',
    nome: 'Enxaqueca sem Aura',
    categoria: 'neurologico',
    template: {
      queixa_principal:
        'Cefaleia unilateral {lado} em pulsação/latejante há {tempo_sintomas}, intensidade moderada a forte. Náuseas e fotofobia associadas. Piora com atividade física. Refere crises semelhantes no passado. Nega aura visual ou sensitiva. Nega febre.',
      exame_fisico:
        'Regular estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque, buscando ambiente escuro e silencioso. Exame neurológico sumário sem alterações focais: pupilas isocóricas e fotorreagentes, força preservada, sensibilidade normal. Sem rigidez de nuca.',
      hipotese_diagnostica: [
        'Enxaqueca sem aura',
        'Migrânea episódica',
      ],
      conduta:
        'Prescrito analgésico/AINE (Naproxeno 550mg ou Ibuprofeno 600mg) associado a antiemético (Metoclopramida 10mg). Repouso em ambiente escuro e silencioso. Se crises frequentes (>4/mês ou incapacitantes), encaminhar para profilaxia ambulatorial com neurologista. {gender_orientado} sobre identificação e evitação de gatilhos (estresse, privação de sono, alimentos). Sinais de alarme já descartados clinicamente.',
      cid: 'G430',
      cid_descricao: 'Enxaqueca sem aura',
    },
    referencias_mbe: ['IHS ICHD-3 Criteria', 'AHS Guidelines Acute Treatment of Migraine'],
  },

  // === MUSCULOESQUELÉTICO ===
  lombalgia: {
    id: 'lombalgia',
    nome: 'Lombalgia Aguda Mecânica',
    categoria: 'musculoesqueletico',
    template: {
      queixa_principal:
        'Dor lombar de início há {tempo_sintomas}, após esforço físico ou movimento brusco. Dor piora com movimento, melhora com repouso. Sem irradiação para membros inferiores. Nega parestesias. Nega perda de força. Nega alteração esfincteriana.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Marcha antálgica. Contratura de musculatura paravertebral lombar. Lasègue negativo bilateralmente. Força preservada em membros inferiores (flexão/extensão de quadril, joelho, tornozelo). Reflexos patelares e aquileus simétricos e presentes. Sensibilidade preservada. Sem sinais de síndrome da cauda equina.',
      hipotese_diagnostica: [
        'Lombalgia mecânica aguda',
        'Dor lombar inespecífica',
        'Contratura muscular lombar',
      ],
      conduta:
        'Prescrito AINE (Ibuprofeno 600mg 8/8h ou Naproxeno 500mg 12/12h) por período curto (5-7 dias). Relaxante muscular se contratura importante (Ciclobenzaprina 5mg à noite). Manter atividades habituais dentro do tolerável (repouso absoluto NÃO é recomendado). Calor local. {gender_orientado} quanto aos sinais de alarme (red flags): febre, perda de peso, trauma significativo, déficit neurológico progressivo, alteração esfincteriana. Fisioterapia se persistência > 2-4 semanas.',
      cid: 'M545',
      cid_descricao: 'Dor lombar baixa',
    },
    referencias_mbe: ['ACP Low Back Pain Guidelines', 'NICE Low Back Pain Guidelines'],
  },

  cervicalgia: {
    id: 'cervicalgia',
    nome: 'Cervicalgia Aguda',
    categoria: 'musculoesqueletico',
    template: {
      queixa_principal:
        'Dor cervical de início há {tempo_sintomas}, com rigidez cervical. Dor piora com movimentação do pescoço. Sem irradiação para membros superiores. Nega parestesias. Nega trauma recente. Nega febre.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Contratura de musculatura paravertebral cervical e trapézio. Amplitude de movimento cervical limitada por dor, principalmente rotação e lateralização. Força preservada em membros superiores. Teste de Spurling negativo. Sem déficits neurológicos focais.',
      hipotese_diagnostica: [
        'Cervicalgia mecânica',
        'Contratura muscular cervical',
        'Dor cervical inespecífica',
      ],
      conduta:
        'Prescrito AINE (Naproxeno 500mg 12/12h) e analgésico. Relaxante muscular se contratura importante. Calor local. {gender_orientado} quanto a orientações posturais e ergonomia no trabalho. Evitar travesseiro muito alto ou muito baixo. {gender_orientado} a retornar se surgir irradiação para membros superiores, parestesias, fraqueza ou persistência > 2-3 semanas.',
      cid: 'M542',
      cid_descricao: 'Cervicalgia',
    },
    referencias_mbe: ['Bone and Joint Decade Task Force on Neck Pain', 'UpToDate - Evaluation of the adult with neck pain'],
  },

  entorse_tornozelo: {
    id: 'entorse_tornozelo',
    nome: 'Entorse de Tornozelo',
    categoria: 'musculoesqueletico',
    template: {
      queixa_principal:
        'Torção de tornozelo {lado} há {tempo_sintomas}, com dor e edema local. Mecanismo de inversão (virada do pé para dentro). Dificuldade para apoiar o pé no chão. Nega estalido audível no momento do trauma. Nega parestesia do pé.',
      exame_fisico:
        '{gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Tornozelo {lado} com edema e equimose em região maleolar lateral. Dor à palpação de ligamento talofibular anterior e calcaneofibular. Teste de gaveta anterior {positivo_negativo}. Palpação óssea de maléolo lateral, maléolo medial, base do 5º metatarso e osso navicular SEM dor localizada (Regras de Ottawa negativas).',
      hipotese_diagnostica: [
        'Entorse de tornozelo grau {grau}',
        'Lesão ligamentar lateral do tornozelo',
      ],
      conduta:
        'Protocolo PRICE nas primeiras 48-72h: Proteção, Repouso relativo, Ice (gelo por 20 min a cada 2-3h), Compressão (bandagem elástica), Elevação do membro. Prescrito AINE e analgésico. Imobilização com tala ou órtese se instabilidade moderada. Critérios de Ottawa negativos dispensam radiografia de rotina. {gender_orientado} sobre retorno progressivo às atividades conforme tolerância. Encaminhar para fisioterapia se entorse grau II-III ou instabilidade persistente.',
      cid: 'S934',
      cid_descricao: 'Entorse e distensão do tornozelo',
    },
    referencias_mbe: ['Ottawa Ankle Rules', 'NICE Sprains and Strains Guidelines'],
  },

  // === DERMATOLÓGICO / ALÉRGICO ===
  urticaria: {
    id: 'urticaria',
    nome: 'Urticária Aguda',
    categoria: 'dermatologico',
    template: {
      queixa_principal:
        'Lesões avermelhadas pruriginosas pelo corpo de início há {tempo_sintomas}. Prurido intenso. Nega dispneia. Nega edema de lábios ou língua. Nega dificuldade para engolir. Possível exposição recente a {trigger}.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Pele com placas urticariformes eritematosas, elevadas, pruriginosas, com halo central pálido, distribuídas em {localizacao}. Dermografismo presente. Sem angioedema de face, lábios, língua ou vias aéreas. Ausculta pulmonar limpa, sem sibilos ou estridor. Sinais vitais estáveis.',
      hipotese_diagnostica: [
        'Urticária aguda',
        'Reação alérgica cutânea',
        'Urticária idiopática',
      ],
      conduta:
        'Prescrito anti-histamínico de segunda geração (Loratadina 10mg/dia ou Cetirizina 10mg/dia). Corticoide oral (Prednisona 40mg por 3-5 dias) se quadro extenso ou refratário. {gender_orientado} a evitar trigger identificado (se houver). {gender_orientado} quanto aos sinais de alarme que indicam anafilaxia: dispneia, edema de glote, rouquidão, hipotensão, síncope - nestes casos, procurar emergência imediatamente. {gender_orientado} a buscar seguimento com alergista se episódios recorrentes.',
      cid: 'L500',
      cid_descricao: 'Urticária alérgica',
    },
    referencias_mbe: ['EAACI Urticaria Guidelines', 'WAO Urticaria Guidelines'],
  },

  celulite: {
    id: 'celulite',
    nome: 'Celulite / Erisipela',
    categoria: 'dermatologico',
    template: {
      queixa_principal:
        'Vermelhidão, calor e dor em {localizacao} há {tempo_sintomas}, com progressão da área acometida. Febre aferida de {temperatura}°C. Porta de entrada identificada (ferimento, micose interdigital, picada de inseto). Nega secreção purulenta franca.',
      exame_fisico:
        'Regular estado geral, {gender_corado}, {gender_hidratado}, febril ao toque. Área de celulite/erisipela em {localizacao}: eritema quente, edemaciado, doloroso à palpação, com bordas mal definidas (celulite) ou bem definidas e elevadas (erisipela). Sem crepitação à palpação (descarta fasciíte necrotizante). Sem flutuação sugestiva de abscesso. Linfangite {presente_ausente}. Adenomegalia regional {presente_ausente}.',
      hipotese_diagnostica: [
        'Celulite',
        'Erisipela',
        'Infecção de pele e partes moles',
      ],
      conduta:
        'Realizada demarcação da área eritematosa com caneta para monitorar progressão. Prescrito antibioticoterapia oral: Cefalexina 500mg 6/6h por 7-10 dias (celulite simples). Se suspeita de MRSA-CA ou falha terapêutica, considerar Sulfametoxazol-Trimetoprima ou Clindamicina. Elevação do membro afetado. Analgésico e AINE. {gender_orientado} quanto aos sinais de alarme: progressão rápida apesar do antibiótico, bolhas hemorrágicas, crepitação, necrose, toxemia. Internação se sinais de gravidade (sepse, progressão rápida, falha de tratamento oral, comorbidades descompensadas).',
      cid: 'L030',
      cid_descricao: 'Celulite',
    },
    referencias_mbe: ['IDSA Skin and Soft Tissue Infections Guidelines', 'UpToDate - Cellulitis and Erysipelas'],
  },

  // === OFTALMOLÓGICO ===
  conjuntivite: {
    id: 'conjuntivite',
    nome: 'Conjuntivite',
    categoria: 'oftalmologico',
    template: {
      queixa_principal:
        'Olho vermelho {lado} há {tempo_sintomas}, com secreção {aquosa_purulenta}. Prurido ocular {presente_ausente}. Sensação de corpo estranho e areia nos olhos. Lacrimejamento. Nega dor ocular intensa. Nega alteração da acuidade visual. Nega fotofobia intensa.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque. Olho {lado}: hiperemia conjuntival difusa (mais intensa em fórnices), secreção {aquosa_purulenta} em fundo de saco, edema palpebral leve. Pupilas isocóricas e fotorreagentes. Acuidade visual preservada (teste de Snellen). Córnea transparente, sem opacidades ou ulcerações visíveis. Câmara anterior sem alterações aparentes.',
      hipotese_diagnostica: [
        'Conjuntivite viral',
        'Conjuntivite alérgica',
        'Conjuntivite bacteriana',
      ],
      conduta:
        'Se conjuntivite viral/alérgica (secreção aquosa, prurido): compressas frias, lágrimas artificiais, anti-histamínico tópico se prurido importante. Se conjuntivite bacteriana (secreção purulenta): colírio de antibiótico (Ciprofloxacino 0.3% ou Moxifloxacino 0.5%, 1 gota 4x/dia por 5-7 dias). {gender_orientado} sobre higiene rigorosa das mãos, não compartilhar toalhas/fronhas, evitar coçar os olhos. Encaminhar para oftalmologista se: não melhora em 7 dias, dor ocular intensa, alteração visual, fotofobia, opacidade corneana.',
      cid: 'H100',
      cid_descricao: 'Conjuntivite mucopurulenta',
    },
    referencias_mbe: ['AAO Conjunctivitis PPP', 'UpToDate - Conjunctivitis'],
  },

  // === PSIQUIÁTRICO ===
  ansiedade: {
    id: 'ansiedade',
    nome: 'Crise de Ansiedade / Pânico',
    categoria: 'psiquiatrico',
    template: {
      queixa_principal:
        'Episódio de mal-estar súbito há {tempo_sintomas}, com palpitações, tremores, sudorese, sensação de falta de ar, medo intenso de morrer ou perder o controle. Parestesias de extremidades. Náuseas. Refere episódios semelhantes no passado. Nega dor torácica típica (opressiva, irradiada). Nega síncope.',
      exame_fisico:
        'Bom estado geral, {gender_corado}, {gender_hidratado}, {gender_afebril} ao toque, {gender_ansioso}. FC {fc} bpm, PA {pa_sistolica}/{pa_diastolica} mmHg, SpO2 {spo2}% em ar ambiente. Ausculta cardíaca: ritmo cardíaco regular em 2 tempos, bulhas normofonéticas, sem sopros. Ausculta pulmonar: murmúrio vesicular presente bilateral, sem ruídos adventícios. ECG (se realizado): ritmo sinusal, sem alterações isquêmicas. Exame neurológico sumário sem alterações focais.',
      hipotese_diagnostica: [
        'Crise de ansiedade',
        'Ataque de pânico',
        'Transtorno de pânico',
      ],
      conduta:
        'Oferecido suporte e reassurance em ambiente calmo. Orientada técnica de respiração diafragmática lenta. Prescrito benzodiazepínico apenas se sintomas muito intensos e refratários (Clonazepam 0.25-0.5mg sublingual ou Alprazolam 0.25-0.5mg via oral). {gender_orientado} sobre a natureza benigna dos sintomas somáticos (não representam risco cardíaco real). Causas orgânicas de palpitação e dispneia razoavelmente descartadas clinicamente. Encaminhar para psiquiatria e/ou psicologia para seguimento ambulatorial e considerar tratamento preventivo (ISRS) se episódios recorrentes.',
      cid: 'F410',
      cid_descricao: 'Transtorno de pânico',
    },
    referencias_mbe: ['APA Practice Guideline Panic Disorder', 'UpToDate - Panic disorder in adults'],
  },
}

export interface FlashInput {
  paciente: {
    sexo: 'M' | 'F'
    idade?: string
    unidade_idade?: 'anos' | 'meses' | 'dias'
    gestante?: boolean
  }
  queixa_selecionada: string
  dados_variaveis: {
    tempo_sintomas: string
    temperatura?: string
    pa_sistolica?: string
    pa_diastolica?: string
    fc?: string
    fr?: string
    spo2?: string
    glasgow?: string
    centor_score?: string // Specific to faringo
    // Novas variáveis para templates expandidos
    lado?: 'esquerdo' | 'direito' | 'bilateral' | string
    num_evacuacoes?: string
    localizacao?: string
    trigger?: string
    grau?: '1' | '2' | '3' | string
    positivo_negativo?: 'positivo' | 'negativo' | string
    presente_ausente?: 'presente' | 'ausente' | string
    aquosa_purulenta?: 'aquosa' | 'mucopurulenta' | 'purulenta' | string
    outros?: Record<string, string>
  }
}

export const generateFlashRecord = (input: FlashInput) => {
  const templateId = input.queixa_selecionada // Assuming mapped directly for now
  const templateData = flashTemplates[templateId] || flashTemplates['ivas'] // Fallback

  if (!templateData) {
    return {
      queixa_principal: 'Erro: Template não encontrado',
      exame_fisico: '',
      hipotese_diagnostica: [],
      conduta: '',
      cid: '',
      cid_descricao: '',
    }
  }

  const tmpl = templateData.template
  const vars = input.dados_variaveis
  // Enforce female gender if pregnant
  const gender = input.paciente.gestante ? 'F' : input.paciente.sexo

  // Gender Helper
  const g = (m: string, f: string) => (gender === 'M' ? m : f)

  // Replacer Function
  const replace = (text: string) => {
    let res = text
    // Variables
    Object.entries(vars).forEach(([key, val]) => {
      res = res.replace(new RegExp(`{${key}}`, 'g'), (val as string) || '--')
    })

    // Gender Flexions
    res = res.replace(/{gender_corado}/g, g('corado', 'corada'))
    res = res.replace(/{gender_hidratado}/g, g('hidratado', 'hidratada'))
    res = res.replace(/{gender_afebril}/g, g('afebril', 'afebril')) // Neutral
    res = res.replace(/{gender_orientado}/g, g('Orientado', 'Orientada'))
    res = res.replace(/{gender_medico}/g, g('médico', 'médica'))
    // Novas flexões de gênero para templates expandidos
    res = res.replace(/{gender_agitado}/g, g('agitado', 'agitada'))
    res = res.replace(/{gender_ansioso}/g, g('ansioso', 'ansiosa'))

    // Manual handling for complex gender tokens like {g:o/a} from prompt
    // The prompt used {g:o/a}. I'll normalize my template to use my keys or support that syntax.
    // Let's support the prompt's syntax: {g:o/a}
    res = res.replace(/{g:([^}]+)}/g, (match, content) => {
      const [m, f] = content.split('/')
      return g(m, f || m) // if f is missing, use m? usually it's o/a
    })

    return res
  }

  return {
    queixa_principal: replace(tmpl.queixa_principal),
    exame_fisico: replace(tmpl.exame_fisico),
    hipotese_diagnostica: tmpl.hipotese_diagnostica,
    conduta: replace(tmpl.conduta),
    cid: tmpl.cid,
    cid_descricao: tmpl.cid_descricao,
  }
}
