/**
 * Script de teste para validação EBM
 *
 * Testa os tipos e validação implementados na Fase 1
 */

import {
  validateEBMContent,
  validateCitations,
  validateMedications,
  validateRedFlags,
  formatValidationResult,
} from './utils/ebm-validator'
import type {
  ComplaintExtendedContentEBM,
  EBMCitation,
  MedicationRecommendation,
  RedFlag,
  DifferentialDiagnosis,
} from '../../lib/types/medical'

// ============================================================================
// Dados Mock para Teste
// ============================================================================

const mockCitationValid: EBMCitation = {
  source: 'uptodate',
  title: 'Acute Coronary Syndromes: Overview of Care',
  url: 'https://www.uptodate.com/contents/acute-coronary-syndromes',
  pmid: '12345678',
  doi: '10.1001/jama.2020.12345',
  yearPublished: 2024,
  evidenceLevel: 'A',
  lastAccessed: '2026-01-01T00:00:00Z',
}

const mockCitationInvalid: Partial<EBMCitation> = {
  source: 'uptodate',
  title: 'ACS', // Muito curto (< 5 caracteres)
  pmid: '123', // PMID inválido (não tem 8 dígitos)
}

const mockMedicationValid: MedicationRecommendation = {
  genericName: 'Ácido Acetilsalicílico (AAS)',
  brandNames: ['Aspirina', 'AAS'],
  dose: '200-300mg',
  route: 'VO',
  frequency: 'Dose única (mastigar)',
  duration: 'Dose de ataque, seguir com 100mg/dia',
  susAvailable: true,
  renameCompatible: true,
  renameList: 'A',
  evidenceLevel: 'A',
  references: [mockCitationValid],
  specialNotes: 'Antiagregante plaquetário',
}

const mockMedicationInvalid: Partial<MedicationRecommendation> = {
  genericName: 'Ticagrelor',
  dose: '180mg VO',
  route: 'VO',
  frequency: 'Dose única',
  susAvailable: true, // Inconsistência: disponível no SUS mas não RENAME
  renameCompatible: false,
  // Falta renameList (deveria ter se renameCompatible = true)
}

const mockRedFlagValid: RedFlag = {
  description: 'Dor torácica em aperto com irradiação para mandíbula',
  severity: 'critical',
  clinicalSignificance:
    'Altamente sugestivo de Síndrome Coronariana Aguda (SCA). Risco imediato de infarto.',
  immediateAction: 'ECG em <10min, AAS 200mg VO (mastigar), O2 se SpO2<94%',
  timeToAction: 10,
  references: [mockCitationValid],
  objectiveCriteria: [
    'Dor retroesternal em aperto/queimação',
    'Irradiação para mandíbula, braço esquerdo ou epigástrio',
    'Fatores de risco CV (HAS, DM, tabagismo, história familiar)',
  ],
}

const mockRedFlagInvalid: Partial<RedFlag> = {
  description: 'Dor', // Muito curto
  severity: 'critical',
  clinicalSignificance: 'Grave', // Muito curto (< 10 caracteres)
  immediateAction: 'ECG',
  // Falta timeToAction (recomendado para critical)
}

const mockDifferentialDiagnosisValid: DifferentialDiagnosis = {
  condition: 'Infarto Agudo do Miocárdio (IAM)',
  icd10: 'I21.9',
  probability: 'high',
  keyFeatures: [
    'Dor torácica típica >20min',
    'Troponina elevada',
    'ECG com supradesnível de ST',
    'Fatores de risco cardiovascular',
  ],
  diagnosticTests: [
    'ECG 12 derivações',
    'Troponina seriada (0h, 3h, 6h)',
    'Ecocardiograma',
    'Cineangiocoronariografia',
  ],
  references: [mockCitationValid],
  specificRedFlags: [
    'Choque cardiogênico',
    'Edema agudo de pulmão',
    'Arritmia maligna',
  ],
}

const mockDifferentialDiagnosisInvalid: Partial<DifferentialDiagnosis> = {
  condition: 'IAM',
  icd10: 'I21', // Válido mas falta uma casa decimal
  probability: 'high',
  keyFeatures: [], // Vazio (deveria ter pelo menos 1)
}

const mockComplaintContentValid: ComplaintExtendedContentEBM = {
  redFlags: [mockRedFlagValid],
  diagnosticoDiferencial: [mockDifferentialDiagnosisValid],
  condutaInicial:
    'AAS 200mg VO (mastigar) + ECG <10min + O2 se SpO2<94% + Acesso venoso + Monitorização cardíaca',
  calculadoras: ['HEART Score', 'TIMI Risk Score', 'GRACE Score'],
  rawMarkdown: '# Dor Torácica Típica\n\nConteúdo do Obsidian...',

  // Campos EBM
  ebmVersion: '1.0',
  lastEBMReview: '2026-01-01T00:00:00Z',
  evidenceQuality: 'high',
  uptodateReviewed: true,
  dynamedReviewed: true,
  brazilianGuidelines: ['Diretriz SBC 2021 - Doença Coronária Aguda'],
  susProtocolCompatible: true,
  renameMedicationsOnly: true,
  ebmReferences: [mockCitationValid],
  medications: [mockMedicationValid],
  riskStratification: {
    criteria: 'HEART Score',
    lowRisk: '0-3 pontos: Baixo risco (< 2% de eventos em 6 semanas)',
    moderateRisk: '4-6 pontos: Risco moderado (12-20% de eventos)',
    highRisk: '7-10 pontos: Alto risco (>50% de eventos)',
    reference: mockCitationValid,
    calculatorUrl: 'https://www.mdcalc.com/calc/1752/heart-score',
  },
  susGuidelines: 'Protocolo de SCA do Ministério da Saúde',
  brazilianEpidemiology:
    'IAM é a principal causa de morte no Brasil (>100.000 óbitos/ano)',
  brazilianAdaptations: [
    'Troponina ultrassensível não disponível em maioria dos hospitais SUS: usar troponina convencional 0h, 6h, 12h',
    'Cateterismo primário ideal <90min, mas fila média é 48-72h em hospitais públicos',
    'Fibrinólise com Estreptoquinase é alternativa quando cateterismo indisponível',
  ],
  susDiagnosticAvailability:
    'ECG e troponina disponíveis. Ecocardiograma com fila. Cateterismo limitado.',
  susReferralPathway:
    'PA → UPA (ECG + troponina) → Hospital de referência (cateterismo)',
}

// ============================================================================
// Testes
// ============================================================================

function runTests() {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TESTES DE VALIDAÇÃO EBM - FASE 1')
  console.log('='.repeat(80) + '\n')

  // Teste 1: Citação válida
  console.log('📝 Teste 1: Validar citação EBM válida')
  const citationValidResult = validateCitations([mockCitationValid])
  console.log(formatValidationResult(citationValidResult))

  // Teste 2: Citação inválida
  console.log('\n📝 Teste 2: Validar citação EBM inválida (espera-se erros)')
  const citationInvalidResult = validateCitations([
    mockCitationInvalid as EBMCitation,
  ])
  console.log(formatValidationResult(citationInvalidResult))

  // Teste 3: Medicação válida
  console.log('\n💊 Teste 3: Validar medicação válida')
  const medicationValidResult = validateMedications([mockMedicationValid])
  console.log(formatValidationResult(medicationValidResult))

  // Teste 4: Medicação inválida
  console.log('\n💊 Teste 4: Validar medicação inválida (espera-se erros)')
  const medicationInvalidResult = validateMedications([
    mockMedicationInvalid as MedicationRecommendation,
  ])
  console.log(formatValidationResult(medicationInvalidResult))

  // Teste 5: Red Flag válido
  console.log('\n🚩 Teste 5: Validar red flag válido')
  const redFlagValidResult = validateRedFlags([mockRedFlagValid])
  console.log(formatValidationResult(redFlagValidResult))

  // Teste 6: Red Flag inválido
  console.log('\n🚩 Teste 6: Validar red flag inválido (espera-se erros)')
  const redFlagInvalidResult = validateRedFlags([mockRedFlagInvalid as RedFlag])
  console.log(formatValidationResult(redFlagInvalidResult))

  // Teste 7: Conteúdo completo válido
  console.log('\n📋 Teste 7: Validar conteúdo EBM completo válido')
  const contentValidResult = validateEBMContent(mockComplaintContentValid)
  console.log(formatValidationResult(contentValidResult))

  // Teste 8: Conteúdo com inconsistência RENAME
  console.log(
    '\n📋 Teste 8: Validar conteúdo com inconsistência RENAME (espera-se erro)'
  )
  const contentWithNonRenameMed: ComplaintExtendedContentEBM = {
    ...mockComplaintContentValid,
    renameMedicationsOnly: true,
    medications: [
      mockMedicationValid,
      {
        ...mockMedicationValid,
        genericName: 'Ticagrelor',
        renameCompatible: false, // Inconsistência: marcado RENAME-only mas tem não-RENAME
      },
    ],
  }
  const contentInconsistentResult = validateEBMContent(contentWithNonRenameMed)
  console.log(formatValidationResult(contentInconsistentResult))

  // Resumo
  console.log('\n' + '='.repeat(80))
  console.log('📊 RESUMO DOS TESTES')
  console.log('='.repeat(80))

  const allResults = [
    { name: 'Citação válida', result: citationValidResult },
    { name: 'Citação inválida', result: citationInvalidResult },
    { name: 'Medicação válida', result: medicationValidResult },
    { name: 'Medicação inválida', result: medicationInvalidResult },
    { name: 'Red Flag válido', result: redFlagValidResult },
    { name: 'Red Flag inválido', result: redFlagInvalidResult },
    { name: 'Conteúdo completo válido', result: contentValidResult },
    { name: 'Conteúdo inconsistente', result: contentInconsistentResult },
  ]

  allResults.forEach(({ name, result }) => {
    const status = result.valid ? '✅ PASSOU' : '❌ FALHOU'
    const errors = result.errors.length
    const warnings = result.warnings.length
    console.log(
      `${status} - ${name} (${errors} erros, ${warnings} avisos)`
    )
  })

  console.log('\n' + '='.repeat(80))
  console.log('✅ FASE 1 CONCLUÍDA: Tipos e validação funcionando!')
  console.log('='.repeat(80) + '\n')
}

// Executar testes
runTests()
