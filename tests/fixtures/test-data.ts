/**
 * Reusable Test Data Fixtures
 *
 * This module provides consistent test data for use across all test types.
 * Uses @faker-js/faker for generating realistic test data.
 *
 * Usage:
 * ```typescript
 * import { testUsers, testComplaints, createTestUser } from '@/tests/fixtures/test-data'
 * ```
 */

import { faker } from '@faker-js/faker/locale/pt_BR'

// Set seed for reproducible tests
faker.seed(12345)

// ============================================================================
// User Test Data
// ============================================================================

export const testUsers = {
  doctor: {
    id: 'user-doctor-1',
    email: 'doctor@wavewell.com',
    fullName: 'Dr. João Silva',
    crmNumber: '123456',
    crmState: 'SP',
    specialty: 'Clínica Médica',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  admin: {
    id: 'user-admin-1',
    email: 'admin@wavewell.com',
    fullName: 'Admin User',
    crmNumber: null,
    crmState: null,
    specialty: null,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  inactive: {
    id: 'user-inactive-1',
    email: 'inactive@wavewell.com',
    fullName: 'Inactive User',
    crmNumber: '654321',
    crmState: 'RJ',
    specialty: 'Cardiologia',
    isActive: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  },
}

export function createTestUser(overrides: Partial<typeof testUsers.doctor> = {}) {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    fullName: faker.person.fullName(),
    crmNumber: faker.string.numeric(6),
    crmState: faker.helpers.arrayElement(['SP', 'RJ', 'MG', 'RS', 'BA']),
    specialty: faker.helpers.arrayElement([
      'Clínica Médica',
      'Cardiologia',
      'Neurologia',
      'Pneumologia',
      'Gastroenterologia',
    ]),
    isActive: true,
    createdAt: faker.date.past(),
    updatedAt: new Date(),
    ...overrides,
  }
}

// ============================================================================
// Complaint Test Data
// ============================================================================

export const testComplaints = {
  dorToracica: {
    id: 'complaint-dor-toracica',
    code: 'DOR_TORACICA',
    name_pt: 'Dor Torácica',
    name_en: 'Chest Pain',
    category: 'cardiovascular',
    icd10_codes: ['R07.9', 'R07.4'],
    ebmContent: {
      redFlags: [
        'Dor intensa de início súbito',
        'Irradiação para braço esquerdo ou mandíbula',
        'Sudorese fria',
        'Dispneia associada',
        'Síncope',
      ],
      differentialDiagnosis: [
        'Síndrome Coronariana Aguda',
        'Embolia Pulmonar',
        'Dissecção de Aorta',
        'Pneumotórax',
        'Pericardite',
      ],
      calculators: ['HEART Score', 'TIMI Risk Score', 'Wells PE'],
      references: [
        {
          title: 'AHA/ACC Chest Pain Guidelines',
          pmid: '25260718',
          year: '2021',
        },
      ],
    },
  },
  cefaleia: {
    id: 'complaint-cefaleia',
    code: 'CEFALEIA',
    name_pt: 'Cefaleia',
    name_en: 'Headache',
    category: 'neurological',
    icd10_codes: ['R51', 'G43.9'],
    ebmContent: {
      redFlags: [
        'Cefaleia de início súbito (thunderclap)',
        'Pior dor de cabeça da vida',
        'Déficit neurológico focal',
        'Febre e rigidez de nuca',
        'Papiledema',
      ],
      differentialDiagnosis: [
        'Hemorragia Subaracnóidea',
        'Meningite',
        'Hipertensão Intracraniana',
        'Enxaqueca',
        'Cefaleia Tensional',
      ],
      calculators: ['Ottawa SAH Rule'],
      references: [
        {
          title: 'IHS Headache Classification',
          pmid: '29368949',
          year: '2018',
        },
      ],
    },
  },
  dispneia: {
    id: 'complaint-dispneia',
    code: 'DISPNEIA',
    name_pt: 'Dispneia',
    name_en: 'Dyspnea',
    category: 'respiratory',
    icd10_codes: ['R06.0'],
    ebmContent: {
      redFlags: [
        'Dispneia súbita',
        'Cianose',
        'Uso de musculatura acessória',
        'Alteração do nível de consciência',
        'Saturação < 90%',
      ],
      differentialDiagnosis: [
        'Embolia Pulmonar',
        'Pneumonia',
        'Asma/DPOC exacerbada',
        'Insuficiência Cardíaca',
        'Pneumotórax',
      ],
      calculators: ['Wells PE', 'CURB-65'],
      references: [
        {
          title: 'BTS Dyspnea Guidelines',
          pmid: '28432209',
          year: '2017',
        },
      ],
    },
  },
}

export function createTestComplaint(overrides: Partial<typeof testComplaints.dorToracica> = {}) {
  const categories = ['cardiovascular', 'neurological', 'respiratory', 'gastrointestinal', 'musculoskeletal']
  return {
    id: faker.string.uuid(),
    code: faker.string.alpha({ length: 10, casing: 'upper' }),
    name_pt: faker.lorem.words(2),
    name_en: faker.lorem.words(2),
    category: faker.helpers.arrayElement(categories),
    icd10_codes: [faker.string.alphanumeric(4)],
    ebmContent: {
      redFlags: [faker.lorem.sentence(), faker.lorem.sentence()],
      differentialDiagnosis: [faker.lorem.words(3), faker.lorem.words(3)],
      calculators: [],
      references: [],
    },
    ...overrides,
  }
}

// ============================================================================
// Syndrome Test Data
// ============================================================================

export const testSyndromes = {
  dorToracica: {
    id: 'syndrome-dor-toracica',
    name: 'Dor Torácica',
    code: 'DOR_TORACICA',
    description: 'Síndrome de dor torácica para investigação de causas cardíacas e não-cardíacas',
    icon: 'heart',
    orderIndex: 1,
    isActive: true,
  },
  cefaleia: {
    id: 'syndrome-cefaleia',
    name: 'Cefaleia',
    code: 'CEFALEIA',
    description: 'Síndrome de cefaleia para avaliação de causas primárias e secundárias',
    icon: 'brain',
    orderIndex: 2,
    isActive: true,
  },
}

// ============================================================================
// Checkbox Test Data
// ============================================================================

export const testCheckboxes = {
  dorPrecordial: {
    id: 'checkbox-dor-precordial',
    syndromeId: 'syndrome-dor-toracica',
    category: 'QP',
    displayText: 'Dor precordial',
    narrativeText: 'Paciente refere dor precordial',
    isRequired: false,
    isRedFlag: false,
    isNegative: false,
    orderIndex: 1,
  },
  dorIntensa: {
    id: 'checkbox-dor-intensa',
    syndromeId: 'syndrome-dor-toracica',
    category: 'QP',
    displayText: 'Dor intensa',
    narrativeText: 'Paciente refere dor de forte intensidade',
    isRequired: false,
    isRedFlag: true, // This is a red flag!
    isNegative: false,
    orderIndex: 2,
  },
  irradiacaoBraco: {
    id: 'checkbox-irradiacao-braco',
    syndromeId: 'syndrome-dor-toracica',
    category: 'HDA',
    displayText: 'Irradiação para braço esquerdo',
    narrativeText: 'Dor com irradiação para membro superior esquerdo',
    isRequired: false,
    isRedFlag: true, // Red flag!
    isNegative: false,
    orderIndex: 3,
  },
  semDispneia: {
    id: 'checkbox-sem-dispneia',
    syndromeId: 'syndrome-dor-toracica',
    category: 'NEGATIVAS',
    displayText: 'Nega dispneia',
    narrativeText: 'Nega dispneia',
    isRequired: false,
    isRedFlag: false,
    isNegative: true,
    orderIndex: 10,
  },
}

export function createTestCheckbox(overrides: Partial<typeof testCheckboxes.dorPrecordial> = {}) {
  const categories = ['QP', 'HDA', 'ANTECEDENTES', 'MEDICACOES', 'ALERGIAS', 'HABITOS', 'EXAME_FISICO', 'NEGATIVAS']
  return {
    id: faker.string.uuid(),
    syndromeId: 'syndrome-dor-toracica',
    category: faker.helpers.arrayElement(categories),
    displayText: faker.lorem.words(3),
    narrativeText: `Paciente refere ${faker.lorem.words(3)}`,
    isRequired: false,
    isRedFlag: faker.datatype.boolean({ probability: 0.2 }),
    isNegative: false,
    orderIndex: faker.number.int({ min: 1, max: 100 }),
    ...overrides,
  }
}

// ============================================================================
// Chat/Conversation Test Data
// ============================================================================

export const testConversations = {
  active: {
    id: 'conversation-1',
    userId: testUsers.doctor.id,
    sessionId: null,
    title: 'Consulta sobre dor torácica',
    contextSnapshot: null,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-01'),
  },
  withContext: {
    id: 'conversation-2',
    userId: testUsers.doctor.id,
    sessionId: 'session-1',
    title: 'Conversa com contexto de anamnese',
    contextSnapshot: {
      syndrome: 'Dor Torácica',
      checkedItems: ['Dor precordial', 'Início súbito'],
    },
    createdAt: new Date('2024-06-02'),
    updatedAt: new Date('2024-06-02'),
  },
}

export const testMessages = {
  userQuestion: {
    id: 'message-1',
    conversationId: 'conversation-1',
    role: 'USER' as const,
    content: 'Quais são os red flags para dor torácica?',
    citations: null,
    createdAt: new Date('2024-06-01T10:00:00'),
  },
  assistantResponse: {
    id: 'message-2',
    conversationId: 'conversation-1',
    role: 'ASSISTANT' as const,
    content: 'Os principais sinais de alerta para dor torácica incluem...',
    citations: [
      {
        title: 'AHA Guidelines',
        pmid: '12345678',
      },
    ],
    createdAt: new Date('2024-06-01T10:00:05'),
  },
}

export function createTestConversation(overrides: Partial<typeof testConversations.active> = {}) {
  return {
    id: faker.string.uuid(),
    userId: testUsers.doctor.id,
    sessionId: null,
    title: faker.lorem.sentence(),
    contextSnapshot: null,
    createdAt: faker.date.recent(),
    updatedAt: new Date(),
    ...overrides,
  }
}

export function createTestMessage(overrides: Partial<typeof testMessages.userQuestion> = {}) {
  return {
    id: faker.string.uuid(),
    conversationId: 'conversation-1',
    role: faker.helpers.arrayElement(['USER', 'ASSISTANT'] as const),
    content: faker.lorem.paragraph(),
    citations: null,
    createdAt: faker.date.recent(),
    ...overrides,
  }
}

// ============================================================================
// Anamnese Session Test Data
// ============================================================================

export const testAnamneseSessions = {
  complete: {
    id: 'session-complete-1',
    userId: testUsers.doctor.id,
    syndromeId: testSyndromes.dorToracica.id,
    checkedItems: [
      testCheckboxes.dorPrecordial.id,
      testCheckboxes.dorIntensa.id,
    ],
    generatedText: 'Paciente refere dor precordial de forte intensidade.',
    outputMode: 'DETAILED',
    redFlagsDetected: [
      {
        id: testCheckboxes.dorIntensa.id,
        text: 'Dor intensa',
        severity: 'high',
      },
    ],
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-01'),
  },
  withRedFlags: {
    id: 'session-redflags-1',
    userId: testUsers.doctor.id,
    syndromeId: testSyndromes.dorToracica.id,
    checkedItems: [
      testCheckboxes.dorIntensa.id,
      testCheckboxes.irradiacaoBraco.id,
    ],
    generatedText: 'Paciente refere dor de forte intensidade com irradiação para membro superior esquerdo.',
    outputMode: 'DETAILED',
    redFlagsDetected: [
      {
        id: testCheckboxes.dorIntensa.id,
        text: 'Dor intensa',
        severity: 'high',
        category: 'cardiac',
      },
      {
        id: testCheckboxes.irradiacaoBraco.id,
        text: 'Irradiação para braço esquerdo',
        severity: 'high',
        category: 'cardiac',
      },
    ],
    createdAt: new Date('2024-06-02'),
    updatedAt: new Date('2024-06-02'),
  },
}

// ============================================================================
// Red Flag Test Data
// ============================================================================

export const testRedFlags = {
  cardiac: [
    {
      id: 'rf-cardiac-1',
      text: 'Dor torácica intensa',
      severity: 'high',
      category: 'cardiac',
      pattern: 'dor.*torác.*intens',
    },
    {
      id: 'rf-cardiac-2',
      text: 'Irradiação para braço esquerdo',
      severity: 'high',
      category: 'cardiac',
      pattern: 'irradia.*braço.*esquerdo',
    },
    {
      id: 'rf-cardiac-3',
      text: 'Sudorese fria',
      severity: 'high',
      category: 'cardiac',
      pattern: 'sudorese.*fria',
    },
  ],
  neurological: [
    {
      id: 'rf-neuro-1',
      text: 'Cefaleia de início súbito',
      severity: 'critical',
      category: 'neurological',
      pattern: 'cefaleia.*súbit|thunderclap',
    },
    {
      id: 'rf-neuro-2',
      text: 'Pior dor de cabeça da vida',
      severity: 'critical',
      category: 'neurological',
      pattern: 'pior.*dor.*cabeça.*vida',
    },
    {
      id: 'rf-neuro-3',
      text: 'Déficit neurológico focal',
      severity: 'high',
      category: 'neurological',
      pattern: 'déficit.*focal|hemiparesia|hemianopsia',
    },
  ],
  respiratory: [
    {
      id: 'rf-resp-1',
      text: 'Dispneia súbita',
      severity: 'high',
      category: 'respiratory',
      pattern: 'dispneia.*súbit',
    },
    {
      id: 'rf-resp-2',
      text: 'Hemoptise',
      severity: 'high',
      category: 'respiratory',
      pattern: 'hemoptise|tosse.*sangue',
    },
  ],
}

// ============================================================================
// Validation Test Cases
// ============================================================================

export const validationTestCases = {
  validEmails: [
    'test@example.com',
    'user.name@domain.com',
    'user+tag@example.org',
  ],
  invalidEmails: [
    'invalid',
    'no@domain',
    '@nodomain.com',
    'spaces in@email.com',
  ],
  validPasswords: [
    'StrongPass123!',
    'MyP@ssw0rd!',
    'Secure#Password1',
  ],
  weakPasswords: [
    '123456',
    'password',
    'abc',
    '12345678',
  ],
}

// ============================================================================
// API Response Templates
// ============================================================================

export const apiResponses = {
  success: <T>(data: T) => ({
    success: true,
    data,
    error: null,
  }),
  error: (message: string, code: string = 'ERROR') => ({
    success: false,
    data: null,
    error: { message, code },
  }),
  paginated: <T>(data: T[], total: number, page: number = 1, limit: number = 10) => ({
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }),
}

export default {
  testUsers,
  testComplaints,
  testSyndromes,
  testCheckboxes,
  testConversations,
  testMessages,
  testAnamneseSessions,
  testRedFlags,
  validationTestCases,
  apiResponses,
  createTestUser,
  createTestComplaint,
  createTestCheckbox,
  createTestConversation,
  createTestMessage,
}
