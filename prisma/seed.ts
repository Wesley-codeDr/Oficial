import { PrismaClient, CheckboxCategory, RedFlagSeverity } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.chatMessage.deleteMany()
  await prisma.chatConversation.deleteMany()
  await prisma.anamneseSession.deleteMany()
  await prisma.redFlagRule.deleteMany()
  await prisma.checkbox.deleteMany()
  await prisma.syndrome.deleteMany()

  // ============================================
  // SYNDROME 1: DOR TORACICA / CARDIOVASCULAR
  // ============================================
  const chestPain = await prisma.syndrome.create({
    data: {
      name: 'Dor Toracica',
      code: 'CHEST_PAIN',
      description: 'Dor toracica / Cardiovascular - Avaliacao de sindrome coronariana aguda',
      icon: 'heart',
      orderIndex: 1,
    },
  })

  // Checkboxes for Chest Pain - QP (Queixa Principal)
  const chestPainQP = [
    { displayText: 'Dor precordial', narrativeText: 'Paciente refere dor precordial', isRedFlag: true },
    { displayText: 'Dor retroesternal', narrativeText: 'dor retroesternal', isRedFlag: true },
    { displayText: 'Carater constritivo/em aperto', narrativeText: 'de carater constritivo (em aperto)', isRedFlag: true },
    { displayText: 'Carater em peso', narrativeText: 'de carater opressivo (em peso)', isRedFlag: true },
    { displayText: 'Carater em queimacao', narrativeText: 'de carater em queimacao' },
    { displayText: 'Carater pontada/facada', narrativeText: 'de carater lancinante (em pontada)' },
    { displayText: 'Irradiacao para MSE', narrativeText: 'com irradiacao para membro superior esquerdo', isRedFlag: true },
    { displayText: 'Irradiacao para pescoco', narrativeText: 'com irradiacao para regiao cervical', isRedFlag: true },
    { displayText: 'Irradiacao para mandibula', narrativeText: 'com irradiacao para mandibula', isRedFlag: true },
    { displayText: 'Irradiacao para dorso', narrativeText: 'com irradiacao para regiao dorsal' },
    { displayText: 'Inicio subito', narrativeText: 'de inicio subito', isRedFlag: true },
    { displayText: 'Inicio gradual', narrativeText: 'de inicio gradual' },
    { displayText: 'Duracao < 20 minutos', narrativeText: 'com duracao inferior a 20 minutos' },
    { displayText: 'Duracao > 20 minutos', narrativeText: 'com duracao superior a 20 minutos', isRedFlag: true },
    { displayText: 'Intensidade leve (1-3)', narrativeText: 'de intensidade leve (EVA 1-3/10)' },
    { displayText: 'Intensidade moderada (4-6)', narrativeText: 'de intensidade moderada (EVA 4-6/10)' },
    { displayText: 'Intensidade intensa (7-10)', narrativeText: 'de intensidade intensa (EVA 7-10/10)', isRedFlag: true },
  ]

  for (let i = 0; i < chestPainQP.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: chestPain.id,
        category: CheckboxCategory.QP,
        displayText: chestPainQP[i]!.displayText,
        narrativeText: chestPainQP[i]!.narrativeText,
        isRedFlag: chestPainQP[i]!.isRedFlag || false,
        isRequired: i < 3,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Chest Pain - HDA
  const chestPainHDA = [
    { displayText: 'Sintomas iniciados ha minutos', narrativeText: 'Ha relato de inicio dos sintomas ha poucos minutos' },
    { displayText: 'Sintomas iniciados ha horas', narrativeText: 'Ha relato de inicio dos sintomas ha algumas horas' },
    { displayText: 'Sintomas iniciados ha dias', narrativeText: 'Ha relato de inicio dos sintomas ha dias' },
    { displayText: 'Piora aos esforcos', narrativeText: 'Refere piora dos sintomas aos esforcos', isRedFlag: true },
    { displayText: 'Piora ao decubito', narrativeText: 'Refere piora dos sintomas ao decubito' },
    { displayText: 'Piora a respiracao profunda', narrativeText: 'Refere piora a respiracao profunda' },
    { displayText: 'Piora a palpacao', narrativeText: 'Refere piora a palpacao local' },
    { displayText: 'Melhora ao repouso', narrativeText: 'Refere melhora ao repouso', isRedFlag: true },
    { displayText: 'Melhora com nitrato', narrativeText: 'Refere melhora com uso de nitrato', isRedFlag: true },
    { displayText: 'Episodios previos semelhantes', narrativeText: 'Relata episodios previos semelhantes' },
    { displayText: 'Primeiro episodio', narrativeText: 'Relata ser o primeiro episodio' },
  ]

  for (let i = 0; i < chestPainHDA.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: chestPain.id,
        category: CheckboxCategory.HDA,
        displayText: chestPainHDA[i]!.displayText,
        narrativeText: chestPainHDA[i]!.narrativeText,
        isRedFlag: chestPainHDA[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Chest Pain - ANTECEDENTES
  const chestPainAntecedentes = [
    { displayText: 'Hipertensao arterial (HAS)', narrativeText: 'Antecedentes de hipertensao arterial sistemica', isRedFlag: true },
    { displayText: 'Diabetes mellitus (DM)', narrativeText: 'diabetes mellitus', isRedFlag: true },
    { displayText: 'Dislipidemia', narrativeText: 'dislipidemia', isRedFlag: true },
    { displayText: 'Doenca coronariana previa', narrativeText: 'doenca coronariana previa', isRedFlag: true },
    { displayText: 'IAM previo', narrativeText: 'infarto agudo do miocardio previo', isRedFlag: true },
    { displayText: 'Angioplastia previa', narrativeText: 'angioplastia coronariana previa', isRedFlag: true },
    { displayText: 'Cirurgia cardiaca previa', narrativeText: 'cirurgia cardiaca previa' },
    { displayText: 'Insuficiencia cardiaca', narrativeText: 'insuficiencia cardiaca' },
    { displayText: 'Arritmia cardiaca', narrativeText: 'arritmia cardiaca' },
    { displayText: 'AVC/AIT previo', narrativeText: 'acidente vascular cerebral ou ataque isquemico transitorio previo' },
    { displayText: 'Doenca renal cronica', narrativeText: 'doenca renal cronica' },
    { displayText: 'Historia familiar de DAC precoce', narrativeText: 'historia familiar de doenca arterial coronariana precoce', isRedFlag: true },
  ]

  for (let i = 0; i < chestPainAntecedentes.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: chestPain.id,
        category: CheckboxCategory.ANTECEDENTES,
        displayText: chestPainAntecedentes[i]!.displayText,
        narrativeText: chestPainAntecedentes[i]!.narrativeText,
        isRedFlag: chestPainAntecedentes[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Chest Pain - HABITOS
  const chestPainHabitos = [
    { displayText: 'Tabagismo ativo', narrativeText: 'Tabagista ativo', isRedFlag: true },
    { displayText: 'Ex-tabagista', narrativeText: 'Ex-tabagista' },
    { displayText: 'Etilismo', narrativeText: 'Etilista' },
    { displayText: 'Sedentarismo', narrativeText: 'Sedentario' },
    { displayText: 'Uso de cocaina/crack', narrativeText: 'Relata uso de cocaina/crack', isRedFlag: true },
  ]

  for (let i = 0; i < chestPainHabitos.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: chestPain.id,
        category: CheckboxCategory.HABITOS,
        displayText: chestPainHabitos[i]!.displayText,
        narrativeText: chestPainHabitos[i]!.narrativeText,
        isRedFlag: chestPainHabitos[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Chest Pain - NEGATIVAS
  const chestPainNegativas = [
    { displayText: 'Nega dispneia', narrativeText: 'Nega dispneia', isNegative: true },
    { displayText: 'Nega palpitacoes', narrativeText: 'Nega palpitacoes', isNegative: true },
    { displayText: 'Nega sincope', narrativeText: 'Nega sincope', isNegative: true },
    { displayText: 'Nega sudorese', narrativeText: 'Nega sudorese', isNegative: true },
    { displayText: 'Nega nauseas/vomitos', narrativeText: 'Nega nauseas ou vomitos', isNegative: true },
    { displayText: 'Nega edema de MMII', narrativeText: 'Nega edema de membros inferiores', isNegative: true },
    { displayText: 'Nega febre', narrativeText: 'Nega febre', isNegative: true },
    { displayText: 'Nega tosse', narrativeText: 'Nega tosse', isNegative: true },
    { displayText: 'Nega trauma recente', narrativeText: 'Nega trauma recente', isNegative: true },
  ]

  for (let i = 0; i < chestPainNegativas.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: chestPain.id,
        category: CheckboxCategory.NEGATIVAS,
        displayText: chestPainNegativas[i]!.displayText,
        narrativeText: chestPainNegativas[i]!.narrativeText,
        isNegative: true,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Chest Pain - EXAME FISICO
  const chestPainExameFisico = [
    { displayText: 'PA elevada', narrativeText: 'Ao exame fisico: pressao arterial elevada' },
    { displayText: 'PA normal', narrativeText: 'Ao exame fisico: pressao arterial dentro da normalidade' },
    { displayText: 'Taquicardia', narrativeText: 'taquicardia', isRedFlag: true },
    { displayText: 'Bradicardia', narrativeText: 'bradicardia' },
    { displayText: 'FC normal', narrativeText: 'frequencia cardiaca normal' },
    { displayText: 'Sudorese', narrativeText: 'sudorese', isRedFlag: true },
    { displayText: 'Palidez cutanea', narrativeText: 'palidez cutanea', isRedFlag: true },
    { displayText: 'Bulhas ritmicas', narrativeText: 'bulhas cardiacas ritmicas' },
    { displayText: 'Bulhas arritmicas', narrativeText: 'bulhas cardiacas arritmicas' },
    { displayText: 'Sopro cardiaco', narrativeText: 'sopro cardiaco' },
    { displayText: 'B3 presente', narrativeText: 'terceira bulha presente' },
    { displayText: 'Estertores pulmonares', narrativeText: 'estertores pulmonares', isRedFlag: true },
    { displayText: 'MV simetrico', narrativeText: 'murmuro vesicular simetrico bilateralmente' },
    { displayText: 'Sem alteracoes ao exame', narrativeText: 'sem alteracoes ao exame fisico cardiovascular' },
  ]

  for (let i = 0; i < chestPainExameFisico.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: chestPain.id,
        category: CheckboxCategory.EXAME_FISICO,
        displayText: chestPainExameFisico[i]!.displayText,
        narrativeText: chestPainExameFisico[i]!.narrativeText,
        isRedFlag: chestPainExameFisico[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Red Flag Rules for Chest Pain
  await prisma.redFlagRule.createMany({
    data: [
      {
        syndromeId: chestPain.id,
        name: 'Dor Tipica de SCA',
        description: 'Dor toracica com caracteristicas tipicas de sindrome coronariana aguda',
        severity: RedFlagSeverity.CRITICAL,
        conditionJson: {
          type: 'AND',
          conditions: [
            { type: 'checkbox_category', category: 'QP', hasRedFlag: true },
            { type: 'OR', conditions: [
              { type: 'checkbox_text', contains: 'constritivo' },
              { type: 'checkbox_text', contains: 'peso' },
            ]},
          ],
        },
        message: 'ALERTA: Dor toracica com caracteristicas tipicas de SCA. Considerar protocolo de dor toracica.',
      },
      {
        syndromeId: chestPain.id,
        name: 'Multiplos Fatores de Risco',
        description: 'Paciente com multiplos fatores de risco cardiovascular',
        severity: RedFlagSeverity.WARNING,
        conditionJson: {
          type: 'count',
          category: 'ANTECEDENTES',
          hasRedFlag: true,
          minimum: 3,
        },
        message: 'ATENCAO: Paciente com multiplos fatores de risco cardiovascular.',
      },
      {
        syndromeId: chestPain.id,
        name: 'Instabilidade Hemodinamica',
        description: 'Sinais de instabilidade hemodinamica ao exame',
        severity: RedFlagSeverity.CRITICAL,
        conditionJson: {
          type: 'OR',
          conditions: [
            { type: 'checkbox_text', contains: 'Sudorese' },
            { type: 'checkbox_text', contains: 'Palidez' },
            { type: 'checkbox_text', contains: 'Estertores' },
          ],
        },
        message: 'CRITICO: Sinais de instabilidade hemodinamica. Avaliacao imediata necessaria.',
      },
    ],
  })

  // ============================================
  // SYNDROME 2: DISPNEIA / RESPIRATORIA
  // ============================================
  const dyspnea = await prisma.syndrome.create({
    data: {
      name: 'Dispneia',
      code: 'DYSPNEA',
      description: 'Dispneia / Respiratoria - Avaliacao de insuficiencia respiratoria',
      icon: 'wind',
      orderIndex: 2,
    },
  })

  // Checkboxes for Dyspnea - QP
  const dyspneaQP = [
    { displayText: 'Falta de ar', narrativeText: 'Paciente refere falta de ar', isRequired: true },
    { displayText: 'Dispneia aos esforcos', narrativeText: 'dispneia aos esforcos' },
    { displayText: 'Dispneia em repouso', narrativeText: 'dispneia em repouso', isRedFlag: true },
    { displayText: 'Ortopneia', narrativeText: 'ortopneia (piora ao deitar)', isRedFlag: true },
    { displayText: 'Dispneia paroxistica noturna', narrativeText: 'dispneia paroxistica noturna', isRedFlag: true },
    { displayText: 'Inicio subito', narrativeText: 'de inicio subito', isRedFlag: true },
    { displayText: 'Inicio gradual', narrativeText: 'de inicio gradual' },
    { displayText: 'Piora progressiva', narrativeText: 'com piora progressiva' },
  ]

  for (let i = 0; i < dyspneaQP.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: dyspnea.id,
        category: CheckboxCategory.QP,
        displayText: dyspneaQP[i]!.displayText,
        narrativeText: dyspneaQP[i]!.narrativeText,
        isRedFlag: dyspneaQP[i]!.isRedFlag || false,
        isRequired: dyspneaQP[i]!.isRequired || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Dyspnea - HDA
  const dyspneaHDA = [
    { displayText: 'Tosse seca', narrativeText: 'Associado a tosse seca' },
    { displayText: 'Tosse produtiva', narrativeText: 'Associado a tosse produtiva' },
    { displayText: 'Expectoracao amarelada', narrativeText: 'com expectoracao amarelada' },
    { displayText: 'Expectoracao esverdeada', narrativeText: 'com expectoracao esverdeada' },
    { displayText: 'Hemoptise', narrativeText: 'Refere hemoptise', isRedFlag: true },
    { displayText: 'Sibilancia', narrativeText: 'Refere chiado no peito' },
    { displayText: 'Dor toracica associada', narrativeText: 'Associado a dor toracica', isRedFlag: true },
    { displayText: 'Febre', narrativeText: 'Refere febre' },
    { displayText: 'Calafrios', narrativeText: 'acompanhado de calafrios' },
  ]

  for (let i = 0; i < dyspneaHDA.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: dyspnea.id,
        category: CheckboxCategory.HDA,
        displayText: dyspneaHDA[i]!.displayText,
        narrativeText: dyspneaHDA[i]!.narrativeText,
        isRedFlag: dyspneaHDA[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Dyspnea - ANTECEDENTES
  const dyspneaAntecedentes = [
    { displayText: 'Asma', narrativeText: 'Antecedentes de asma' },
    { displayText: 'DPOC', narrativeText: 'doenca pulmonar obstrutiva cronica' },
    { displayText: 'Insuficiencia cardiaca', narrativeText: 'insuficiencia cardiaca', isRedFlag: true },
    { displayText: 'TEP previo', narrativeText: 'tromboembolismo pulmonar previo', isRedFlag: true },
    { displayText: 'TVP previa', narrativeText: 'trombose venosa profunda previa' },
    { displayText: 'Neoplasia', narrativeText: 'neoplasia' },
    { displayText: 'Cirurgia recente', narrativeText: 'cirurgia recente', isRedFlag: true },
    { displayText: 'Imobilizacao prolongada', narrativeText: 'imobilizacao prolongada', isRedFlag: true },
  ]

  for (let i = 0; i < dyspneaAntecedentes.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: dyspnea.id,
        category: CheckboxCategory.ANTECEDENTES,
        displayText: dyspneaAntecedentes[i]!.displayText,
        narrativeText: dyspneaAntecedentes[i]!.narrativeText,
        isRedFlag: dyspneaAntecedentes[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Dyspnea - NEGATIVAS
  const dyspneaNegativas = [
    { displayText: 'Nega dor toracica', narrativeText: 'Nega dor toracica', isNegative: true },
    { displayText: 'Nega hemoptise', narrativeText: 'Nega hemoptise', isNegative: true },
    { displayText: 'Nega edema de MMII', narrativeText: 'Nega edema de membros inferiores', isNegative: true },
    { displayText: 'Nega febre', narrativeText: 'Nega febre', isNegative: true },
    { displayText: 'Nega sincope', narrativeText: 'Nega sincope', isNegative: true },
  ]

  for (let i = 0; i < dyspneaNegativas.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: dyspnea.id,
        category: CheckboxCategory.NEGATIVAS,
        displayText: dyspneaNegativas[i]!.displayText,
        narrativeText: dyspneaNegativas[i]!.narrativeText,
        isNegative: true,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Dyspnea - EXAME FISICO
  const dyspneaExameFisico = [
    { displayText: 'Taquipneia', narrativeText: 'Ao exame fisico: taquipneia', isRedFlag: true },
    { displayText: 'Uso de musculatura acessoria', narrativeText: 'uso de musculatura acessoria', isRedFlag: true },
    { displayText: 'Tiragem intercostal', narrativeText: 'tiragem intercostal', isRedFlag: true },
    { displayText: 'Cianose', narrativeText: 'cianose', isRedFlag: true },
    { displayText: 'SpO2 < 90%', narrativeText: 'saturacao de oxigenio abaixo de 90%', isRedFlag: true },
    { displayText: 'SpO2 90-94%', narrativeText: 'saturacao de oxigenio entre 90-94%' },
    { displayText: 'SpO2 > 94%', narrativeText: 'saturacao de oxigenio acima de 94%' },
    { displayText: 'Sibilos difusos', narrativeText: 'sibilos difusos a ausculta' },
    { displayText: 'Estertores crepitantes', narrativeText: 'estertores crepitantes', isRedFlag: true },
    { displayText: 'MV diminuido', narrativeText: 'murmuro vesicular diminuido' },
    { displayText: 'MV abolido', narrativeText: 'murmuro vesicular abolido', isRedFlag: true },
    { displayText: 'Exame pulmonar sem alteracoes', narrativeText: 'exame pulmonar sem alteracoes' },
  ]

  for (let i = 0; i < dyspneaExameFisico.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: dyspnea.id,
        category: CheckboxCategory.EXAME_FISICO,
        displayText: dyspneaExameFisico[i]!.displayText,
        narrativeText: dyspneaExameFisico[i]!.narrativeText,
        isRedFlag: dyspneaExameFisico[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Red Flag Rules for Dyspnea
  await prisma.redFlagRule.createMany({
    data: [
      {
        syndromeId: dyspnea.id,
        name: 'Insuficiencia Respiratoria Grave',
        description: 'Sinais de insuficiencia respiratoria grave',
        severity: RedFlagSeverity.CRITICAL,
        conditionJson: {
          type: 'OR',
          conditions: [
            { type: 'checkbox_text', contains: 'Cianose' },
            { type: 'checkbox_text', contains: 'SpO2 < 90%' },
            { type: 'checkbox_text', contains: 'musculatura acessoria' },
          ],
        },
        message: 'CRITICO: Sinais de insuficiencia respiratoria grave. Suporte ventilatorio imediato.',
      },
      {
        syndromeId: dyspnea.id,
        name: 'Risco de TEP',
        description: 'Fatores de risco para tromboembolismo pulmonar',
        severity: RedFlagSeverity.WARNING,
        conditionJson: {
          type: 'AND',
          conditions: [
            { type: 'checkbox_text', contains: 'subito' },
            { type: 'OR', conditions: [
              { type: 'checkbox_text', contains: 'cirurgia' },
              { type: 'checkbox_text', contains: 'imobilizacao' },
              { type: 'checkbox_text', contains: 'TEP' },
            ]},
          ],
        },
        message: 'ATENCAO: Considerar tromboembolismo pulmonar. Avaliar escore de Wells.',
      },
    ],
  })

  // ============================================
  // SYNDROME 3: ABDOME AGUDO
  // ============================================
  const acuteAbdomen = await prisma.syndrome.create({
    data: {
      name: 'Abdome Agudo',
      code: 'ACUTE_ABDOMEN',
      description: 'Abdome Agudo - Avaliacao de emergencia abdominal',
      icon: 'activity',
      orderIndex: 3,
    },
  })

  // Checkboxes for Acute Abdomen - QP
  const abdomenQP = [
    { displayText: 'Dor abdominal', narrativeText: 'Paciente refere dor abdominal', isRequired: true },
    { displayText: 'Localizacao em FID', narrativeText: 'localizada em fossa iliaca direita', isRedFlag: true },
    { displayText: 'Localizacao em FIE', narrativeText: 'localizada em fossa iliaca esquerda' },
    { displayText: 'Localizacao epigastrica', narrativeText: 'localizada em regiao epigastrica' },
    { displayText: 'Localizacao periumbilical', narrativeText: 'localizada em regiao periumbilical' },
    { displayText: 'Localizacao difusa', narrativeText: 'de localizacao difusa', isRedFlag: true },
    { displayText: 'Dor em colica', narrativeText: 'de carater em colica' },
    { displayText: 'Dor continua', narrativeText: 'de carater continuo', isRedFlag: true },
    { displayText: 'Inicio subito', narrativeText: 'de inicio subito', isRedFlag: true },
    { displayText: 'Inicio gradual', narrativeText: 'de inicio gradual' },
  ]

  for (let i = 0; i < abdomenQP.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: acuteAbdomen.id,
        category: CheckboxCategory.QP,
        displayText: abdomenQP[i]!.displayText,
        narrativeText: abdomenQP[i]!.narrativeText,
        isRedFlag: abdomenQP[i]!.isRedFlag || false,
        isRequired: abdomenQP[i]!.isRequired || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Acute Abdomen - HDA
  const abdomenHDA = [
    { displayText: 'Nauseas', narrativeText: 'Associado a nauseas' },
    { displayText: 'Vomitos', narrativeText: 'e vomitos' },
    { displayText: 'Vomitos biliosos', narrativeText: 'vomitos de conteudo bilioso' },
    { displayText: 'Vomitos fecaloides', narrativeText: 'vomitos fecaloides', isRedFlag: true },
    { displayText: 'Anorexia', narrativeText: 'Refere anorexia' },
    { displayText: 'Febre', narrativeText: 'Refere febre', isRedFlag: true },
    { displayText: 'Diarreia', narrativeText: 'Refere diarreia' },
    { displayText: 'Constipacao', narrativeText: 'Refere constipacao' },
    { displayText: 'Parada de eliminacao de gases', narrativeText: 'Refere parada de eliminacao de gases e fezes', isRedFlag: true },
    { displayText: 'Hematoquezia', narrativeText: 'Refere sangramento retal', isRedFlag: true },
    { displayText: 'Melena', narrativeText: 'Refere fezes escurecidas (melena)', isRedFlag: true },
    { displayText: 'Disuria', narrativeText: 'Refere disuria' },
  ]

  for (let i = 0; i < abdomenHDA.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: acuteAbdomen.id,
        category: CheckboxCategory.HDA,
        displayText: abdomenHDA[i]!.displayText,
        narrativeText: abdomenHDA[i]!.narrativeText,
        isRedFlag: abdomenHDA[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Acute Abdomen - ANTECEDENTES
  const abdomenAntecedentes = [
    { displayText: 'Cirurgia abdominal previa', narrativeText: 'Antecedentes de cirurgia abdominal previa' },
    { displayText: 'Apendicectomia', narrativeText: 'apendicectomia previa' },
    { displayText: 'Colecistectomia', narrativeText: 'colecistectomia previa' },
    { displayText: 'Hernia', narrativeText: 'hernia' },
    { displayText: 'Ulcera peptica', narrativeText: 'ulcera peptica' },
    { displayText: 'Doenca hepatica', narrativeText: 'doenca hepatica' },
    { displayText: 'Pancreatite previa', narrativeText: 'pancreatite previa' },
    { displayText: 'Colelitiase', narrativeText: 'colelitiase' },
  ]

  for (let i = 0; i < abdomenAntecedentes.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: acuteAbdomen.id,
        category: CheckboxCategory.ANTECEDENTES,
        displayText: abdomenAntecedentes[i]!.displayText,
        narrativeText: abdomenAntecedentes[i]!.narrativeText,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Acute Abdomen - NEGATIVAS
  const abdomenNegativas = [
    { displayText: 'Nega vomitos', narrativeText: 'Nega vomitos', isNegative: true },
    { displayText: 'Nega diarreia', narrativeText: 'Nega diarreia', isNegative: true },
    { displayText: 'Nega febre', narrativeText: 'Nega febre', isNegative: true },
    { displayText: 'Nega hematoquezia', narrativeText: 'Nega sangramento retal', isNegative: true },
    { displayText: 'Nega melena', narrativeText: 'Nega melena', isNegative: true },
    { displayText: 'Nega disuria', narrativeText: 'Nega disuria', isNegative: true },
    { displayText: 'Evacuacoes presentes', narrativeText: 'Mantem evacuacoes presentes', isNegative: true },
  ]

  for (let i = 0; i < abdomenNegativas.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: acuteAbdomen.id,
        category: CheckboxCategory.NEGATIVAS,
        displayText: abdomenNegativas[i]!.displayText,
        narrativeText: abdomenNegativas[i]!.narrativeText,
        isNegative: true,
        orderIndex: i + 1,
      },
    })
  }

  // Checkboxes for Acute Abdomen - EXAME FISICO
  const abdomenExameFisico = [
    { displayText: 'Abdome plano', narrativeText: 'Ao exame fisico: abdome plano' },
    { displayText: 'Abdome distendido', narrativeText: 'abdome distendido', isRedFlag: true },
    { displayText: 'RHA presentes', narrativeText: 'ruidos hidroaereos presentes' },
    { displayText: 'RHA diminuidos', narrativeText: 'ruidos hidroaereos diminuidos' },
    { displayText: 'RHA ausentes', narrativeText: 'ruidos hidroaereos ausentes', isRedFlag: true },
    { displayText: 'RHA aumentados', narrativeText: 'ruidos hidroaereos aumentados' },
    { displayText: 'Dor a palpacao superficial', narrativeText: 'dor a palpacao superficial' },
    { displayText: 'Dor a palpacao profunda', narrativeText: 'dor a palpacao profunda' },
    { displayText: 'Defesa abdominal', narrativeText: 'defesa abdominal', isRedFlag: true },
    { displayText: 'Abdome em tabua', narrativeText: 'abdome em tabua (rigidez)', isRedFlag: true },
    { displayText: 'Descompressao brusca positiva', narrativeText: 'descompressao brusca dolorosa (Blumberg positivo)', isRedFlag: true },
    { displayText: 'Sinal de Murphy positivo', narrativeText: 'sinal de Murphy positivo' },
    { displayText: 'Sinal de Rovsing positivo', narrativeText: 'sinal de Rovsing positivo' },
    { displayText: 'Massa palpavel', narrativeText: 'massa palpavel', isRedFlag: true },
    { displayText: 'Hernia visivel', narrativeText: 'hernia visivel ao exame' },
    { displayText: 'Sem alteracoes ao exame', narrativeText: 'exame abdominal sem alteracoes significativas' },
  ]

  for (let i = 0; i < abdomenExameFisico.length; i++) {
    await prisma.checkbox.create({
      data: {
        syndromeId: acuteAbdomen.id,
        category: CheckboxCategory.EXAME_FISICO,
        displayText: abdomenExameFisico[i]!.displayText,
        narrativeText: abdomenExameFisico[i]!.narrativeText,
        isRedFlag: abdomenExameFisico[i]!.isRedFlag || false,
        orderIndex: i + 1,
      },
    })
  }

  // Red Flag Rules for Acute Abdomen
  await prisma.redFlagRule.createMany({
    data: [
      {
        syndromeId: acuteAbdomen.id,
        name: 'Abdome Agudo Cirurgico',
        description: 'Sinais sugestivos de abdome agudo cirurgico',
        severity: RedFlagSeverity.CRITICAL,
        conditionJson: {
          type: 'OR',
          conditions: [
            { type: 'checkbox_text', contains: 'tabua' },
            { type: 'checkbox_text', contains: 'Defesa abdominal' },
            { type: 'checkbox_text', contains: 'Blumberg' },
          ],
        },
        message: 'CRITICO: Sinais de irritacao peritoneal. Avaliacao cirurgica urgente.',
      },
      {
        syndromeId: acuteAbdomen.id,
        name: 'Obstrucao Intestinal',
        description: 'Sinais sugestivos de obstrucao intestinal',
        severity: RedFlagSeverity.CRITICAL,
        conditionJson: {
          type: 'AND',
          conditions: [
            { type: 'checkbox_text', contains: 'distendido' },
            { type: 'OR', conditions: [
              { type: 'checkbox_text', contains: 'RHA ausentes' },
              { type: 'checkbox_text', contains: 'parada de eliminacao' },
              { type: 'checkbox_text', contains: 'fecaloides' },
            ]},
          ],
        },
        message: 'CRITICO: Suspeita de obstrucao intestinal. Considerar sondagem e imagem.',
      },
      {
        syndromeId: acuteAbdomen.id,
        name: 'Apendicite Suspeita',
        description: 'Quadro sugestivo de apendicite aguda',
        severity: RedFlagSeverity.WARNING,
        conditionJson: {
          type: 'AND',
          conditions: [
            { type: 'checkbox_text', contains: 'FID' },
            { type: 'OR', conditions: [
              { type: 'checkbox_text', contains: 'febre' },
              { type: 'checkbox_text', contains: 'anorexia' },
            ]},
          ],
        },
        message: 'ATENCAO: Quadro sugestivo de apendicite aguda. Considerar escore de Alvarado.',
      },
    ],
  })

  console.log('Seeding completed!')
  console.log(`Created syndromes: ${await prisma.syndrome.count()}`)
  console.log(`Created checkboxes: ${await prisma.checkbox.count()}`)
  console.log(`Created red flag rules: ${await prisma.redFlagRule.count()}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
