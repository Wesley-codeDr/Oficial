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
      complexityLevel: 3,
      suggestedDifferential: ['SCA', 'TEP', 'Dissecção de Aorta', 'Pericardite'],
    },
  })

  // Checkboxes for Chest Pain - QP (Queixa Principal)
  const chestPainQP = [
    { displayText: 'Dor precordial', narrativeText: 'dor precordial', isRedFlag: true },
    { displayText: 'Dor retroesternal', narrativeText: 'dor retroesternal', isRedFlag: true },
    {
      displayText: 'Carater constritivo/em aperto',
      narrativeText: 'carater constritivo (em aperto)',
      isRedFlag: true,
    },
    {
      displayText: 'Carater em peso',
      narrativeText: 'carater opressivo (em peso)',
      isRedFlag: true,
    },
    { displayText: 'Carater em queimacao', narrativeText: 'carater em queimacao' },
    { displayText: 'Carater pontada/facada', narrativeText: 'carater lancinante (em pontada)' },
    {
      displayText: 'Irradiacao para MSE',
      narrativeText: 'irradiacao para membro superior esquerdo',
      isRedFlag: true,
    },
    {
      displayText: 'Irradiacao para pescoco',
      narrativeText: 'irradiacao para regiao cervical',
      isRedFlag: true,
    },
    {
      displayText: 'Irradiacao para mandibula',
      narrativeText: 'irradiacao para mandibula',
      isRedFlag: true,
    },
    { displayText: 'Irradiacao para dorso', narrativeText: 'irradiacao para regiao dorsal' },
    { displayText: 'Inicio subito', narrativeText: 'inicio subito', isRedFlag: true },
    { displayText: 'Inicio gradual', narrativeText: 'inicio gradual' },
    { displayText: 'Duracao < 20 minutos', narrativeText: 'duracao inferior a 20 minutos' },
    {
      displayText: 'Duracao > 20 minutos',
      narrativeText: 'duracao superior a 20 minutos',
      isRedFlag: true,
    },
    { displayText: 'Intensidade leve (1-3)', narrativeText: 'intensidade leve (EVA 1-3/10)' },
    {
      displayText: 'Intensidade moderada (4-6)',
      narrativeText: 'intensidade moderada (EVA 4-6/10)',
    },
    {
      displayText: 'Intensidade intensa (7-10)',
      narrativeText: 'intensidade intensa (EVA 7-10/10)',
      isRedFlag: true,
    },
  ]

  const chestPainCheckboxes = [
    ...chestPainQP.map((item, i) => ({
      syndromeId: chestPain.id,
      category: CheckboxCategory.QP,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      isRequired: i < 3,
      orderIndex: i + 1,
      section: 'BOTH' as any,
    })),
    // ... rest will be similar
  ]

  // Exemplo de Hierarquia: Dor precordial -> Sub-items
  const dorPrecordial = await prisma.checkbox.create({
    data: {
      syndromeId: chestPain.id,
      category: CheckboxCategory.QP,
      displayText: 'Dor precordial',
      narrativeText: 'dor precordial',
      isRedFlag: true,
      isRequired: true,
      orderIndex: 1,
      section: 'BOTH' as any,
    }
  })

  await prisma.checkbox.createMany({
    data: [
      {
        syndromeId: chestPain.id,
        category: CheckboxCategory.QP,
        displayText: 'Irradiacao para MSE',
        narrativeText: 'irradiacao para membro superior esquerdo',
        isRedFlag: true,
        orderIndex: 2,
        parentId: dorPrecordial.id,
        section: 'BOTH' as any,
      },
      {
        syndromeId: chestPain.id,
        category: CheckboxCategory.QP,
        displayText: 'Irradiacao para mandibula',
        narrativeText: 'irradiacao para mandibula',
        isRedFlag: true,
        orderIndex: 3,
        parentId: dorPrecordial.id,
        section: 'BOTH' as any,
      }
    ]
  })

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
            {
              type: 'OR',
              conditions: [
                { type: 'checkbox_text', contains: 'constritivo' },
                { type: 'checkbox_text', contains: 'peso' },
              ],
            },
          ],
        },
        message:
          'ALERTA: Dor toracica com caracteristicas tipicas de SCA. Considerar protocolo de dor toracica.',
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
    { displayText: 'Falta de ar', narrativeText: 'falta de ar', isRequired: true },
    { displayText: 'Dispneia aos esforcos', narrativeText: 'dispneia aos esforcos' },
    { displayText: 'Dispneia em repouso', narrativeText: 'dispneia em repouso', isRedFlag: true },
    { displayText: 'Ortopneia', narrativeText: 'ortopneia (piora ao deitar)', isRedFlag: true },
    {
      displayText: 'Dispneia paroxistica noturna',
      narrativeText: 'dispneia paroxistica noturna',
      isRedFlag: true,
    },
    { displayText: 'Inicio subito', narrativeText: 'inicio subito', isRedFlag: true },
    { displayText: 'Inicio gradual', narrativeText: 'inicio gradual' },
    { displayText: 'Piora progressiva', narrativeText: 'piora progressiva' },
  ]

  const dyspneaCheckboxes = [
    ...dyspneaQP.map((item, i) => ({
      syndromeId: dyspnea.id,
      category: CheckboxCategory.QP,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      isRequired: item.isRequired || false,
      orderIndex: i + 1,
    })),
    ...dyspneaHDA.map((item, i) => ({
      syndromeId: dyspnea.id,
      category: CheckboxCategory.HDA,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      orderIndex: i + 1,
    })),
    ...dyspneaAntecedentes.map((item, i) => ({
      syndromeId: dyspnea.id,
      category: CheckboxCategory.ANTECEDENTES,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      orderIndex: i + 1,
    })),
    ...dyspneaNegativas.map((item, i) => ({
      syndromeId: dyspnea.id,
      category: CheckboxCategory.NEGATIVAS,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isNegative: true,
      orderIndex: i + 1,
    })),
    ...dyspneaExameFisico.map((item, i) => ({
      syndromeId: dyspnea.id,
      category: CheckboxCategory.EXAME_FISICO,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      orderIndex: i + 1,
    })),
  ]
  await prisma.checkbox.createMany({
    data: dyspneaCheckboxes.map(
      ({ isRequired, isNegative, ...rest }) => ({
        ...rest,
        isRequired: isRequired || false,
        isNegative: isNegative || false,
      }),
    ),
  })

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
        message:
          'CRITICO: Sinais de insuficiencia respiratoria grave. Suporte ventilatorio imediato.',
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
            {
              type: 'OR',
              conditions: [
                { type: 'checkbox_text', contains: 'cirurgia' },
                { type: 'checkbox_text', contains: 'imobilizacao' },
                { type: 'checkbox_text', contains: 'TEP' },
              ],
            },
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
    { displayText: 'Dor abdominal', narrativeText: 'dor abdominal', isRequired: true },
    {
      displayText: 'Localizacao em FID',
      narrativeText: 'localizacao em fossa iliaca direita',
      isRedFlag: true,
    },
    { displayText: 'Localizacao em FIE', narrativeText: 'localizacao em fossa iliaca esquerda' },
    { displayText: 'Localizacao epigastrica', narrativeText: 'localizacao epigastrica' },
    { displayText: 'Localizacao periumbilical', narrativeText: 'localizacao periumbilical' },
    { displayText: 'Localizacao difusa', narrativeText: 'localizacao difusa', isRedFlag: true },
    { displayText: 'Dor em colica', narrativeText: 'carater em colica' },
    { displayText: 'Dor continua', narrativeText: 'carater continuo', isRedFlag: true },
    { displayText: 'Inicio subito', narrativeText: 'inicio subito', isRedFlag: true },
    { displayText: 'Inicio gradual', narrativeText: 'inicio gradual' },
  ]

  const acuteAbdomenCheckboxes = [
    ...abdomenQP.map((item, i) => ({
      syndromeId: acuteAbdomen.id,
      category: CheckboxCategory.QP,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      isRequired: item.isRequired || false,
      orderIndex: i + 1,
    })),
    ...abdomenHDA.map((item, i) => ({
      syndromeId: acuteAbdomen.id,
      category: CheckboxCategory.HDA,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      orderIndex: i + 1,
    })),
    ...abdomenAntecedentes.map((item, i) => ({
      syndromeId: acuteAbdomen.id,
      category: CheckboxCategory.ANTECEDENTES,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      orderIndex: i + 1,
    })),
    ...abdomenNegativas.map((item, i) => ({
      syndromeId: acuteAbdomen.id,
      category: CheckboxCategory.NEGATIVAS,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isNegative: true,
      orderIndex: i + 1,
    })),
    ...abdomenExameFisico.map((item, i) => ({
      syndromeId: acuteAbdomen.id,
      category: CheckboxCategory.EXAME_FISICO,
      displayText: item.displayText,
      narrativeText: item.narrativeText,
      isRedFlag: item.isRedFlag || false,
      orderIndex: i + 1,
    })),
  ]
  await prisma.checkbox.createMany({
    data: acuteAbdomenCheckboxes.map(
      ({ isRequired, isNegative, ...rest }) => ({
        ...rest,
        isRequired: isRequired || false,
        isNegative: isNegative || false,
      }),
    ),
  })

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
            {
              type: 'OR',
              conditions: [
                { type: 'checkbox_text', contains: 'RHA ausentes' },
                { type: 'checkbox_text', contains: 'parada de eliminacao' },
                { type: 'checkbox_text', contains: 'fecaloides' },
              ],
            },
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
            {
              type: 'OR',
              conditions: [
                { type: 'checkbox_text', contains: 'febre' },
                { type: 'checkbox_text', contains: 'anorexia' },
              ],
            },
          ],
        },
        message: 'ATENCAO: Quadro sugestivo de apendicite aguda. Considerar escore de Alvarado.',
      },
    ],
  })

  console.log('Seeding completed!')
  const syndromeCount = await prisma.syndrome.count()
  const checkboxCount = await prisma.checkbox.count()
  console.log(`Created syndromes: ${syndromeCount}`)
  console.log(`Created checkboxes: ${checkboxCount}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
