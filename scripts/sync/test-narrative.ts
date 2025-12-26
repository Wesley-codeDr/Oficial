/**
 * Script de Teste para Geração de Narrativa Médica
 *
 * Testa as transformações de:
 * - Gênero do paciente (masculino/feminino)
 * - Paciente pediátrico ("Acompanhante refere...")
 * - Escala de intensidade (leve/moderada/intensa)
 * - Termos leigos → técnicos
 */

import { generateNarrative, type PatientContext } from '../../lib/anamnese/generate-narrative'
import { CheckboxCategory } from '@prisma/client'

type CheckboxData = {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
}

// Checkboxes de exemplo para teste
const mockCheckboxes: CheckboxData[] = [
  {
    id: '1',
    category: 'QP',
    displayText: 'Dor torácica',
    narrativeText: 'dor torácica',
    isRedFlag: false,
    isNegative: false,
  },
  {
    id: '2',
    category: 'HDA',
    displayText: 'Enjoo e náuseas',
    narrativeText: 'enjoo e vômitos há 2 dias',
    isRedFlag: false,
    isNegative: false,
  },
  {
    id: '3',
    category: 'HDA',
    displayText: 'Falta de ar',
    narrativeText: 'falta de ar aos esforços',
    isRedFlag: false,
    isNegative: false,
  },
  {
    id: '4',
    category: 'EXAME_FISICO',
    displayText: 'Corado e hidratado',
    narrativeText: 'corado, hidratado, afebril',
    isRedFlag: false,
    isNegative: false,
  },
  {
    id: '5',
    category: 'EXAME_FISICO',
    displayText: 'Orientado',
    narrativeText: 'orientado no tempo e espaço',
    isRedFlag: false,
    isNegative: false,
  },
  {
    id: '6',
    category: 'HDA',
    displayText: 'Red Flag - Dor torácica súbita',
    narrativeText: 'ALERTA: dor torácica de início súbito',
    isRedFlag: true,
    isNegative: false,
  },
  {
    id: '7',
    category: 'NEGATIVAS',
    displayText: 'Nega febre',
    narrativeText: 'febre',
    isRedFlag: false,
    isNegative: true,
  },
]

function runTests() {
  console.log('='.repeat(80))
  console.log('TESTE DE GERAÇÃO DE NARRATIVA MÉDICA')
  console.log('='.repeat(80))

  // Teste 1: Paciente masculino adulto
  console.log('\n📋 TESTE 1: Paciente MASCULINO ADULTO')
  console.log('-'.repeat(60))
  const contextMale: PatientContext = {
    gender: 'M',
    isPediatric: false,
    painIntensity: 7,
    evolutionType: 'agudo',
    onsetType: 'súbito',
  }
  const narrativeMale = generateNarrative(mockCheckboxes, 'SUMMARY', contextMale)
  console.log(narrativeMale)
  console.log()

  // Verificações
  const maleChecks = [
    { test: 'Contém "corado"', pass: narrativeMale.includes('corado') && !narrativeMale.includes('corada') },
    { test: 'Contém "hidratado"', pass: narrativeMale.includes('hidratado') && !narrativeMale.includes('hidratada') },
    { test: 'Contém "orientado"', pass: narrativeMale.includes('orientado') && !narrativeMale.includes('orientada') },
    { test: 'Contém "Refere" (não pediátrico)', pass: narrativeMale.includes('Refere') && !narrativeMale.includes('Acompanhante') },
    { test: 'Contém "náuseas" (termo técnico)', pass: narrativeMale.includes('náuseas') },
    { test: 'Contém "dispneia" (termo técnico)', pass: narrativeMale.includes('dispneia') },
    { test: 'Contém "forte intensidade"', pass: narrativeMale.includes('forte intensidade') },
  ]

  maleChecks.forEach(({ test, pass }) => {
    console.log(`  ${pass ? '✅' : '❌'} ${test}`)
  })

  // Teste 2: Paciente feminino adulto
  console.log('\n📋 TESTE 2: Paciente FEMININO ADULTO')
  console.log('-'.repeat(60))
  const contextFemale: PatientContext = {
    gender: 'F',
    isPediatric: false,
    painIntensity: 3,
    evolutionType: 'subagudo',
    onsetType: 'progressivo',
  }
  const narrativeFemale = generateNarrative(mockCheckboxes, 'SUMMARY', contextFemale)
  console.log(narrativeFemale)
  console.log()

  // Verificações
  const femaleChecks = [
    { test: 'Contém "corada"', pass: narrativeFemale.includes('corada') },
    { test: 'Contém "hidratada"', pass: narrativeFemale.includes('hidratada') },
    { test: 'Contém "orientada"', pass: narrativeFemale.includes('orientada') },
    { test: 'Contém "Refere" (não pediátrico)', pass: narrativeFemale.includes('Refere') && !narrativeFemale.includes('Acompanhante') },
    { test: 'Contém "leve intensidade"', pass: narrativeFemale.includes('leve intensidade') },
  ]

  femaleChecks.forEach(({ test, pass }) => {
    console.log(`  ${pass ? '✅' : '❌'} ${test}`)
  })

  // Teste 3: Paciente pediátrico
  console.log('\n📋 TESTE 3: Paciente PEDIÁTRICO (criança < 6 anos)')
  console.log('-'.repeat(60))
  const contextPediatric: PatientContext = {
    gender: 'M',
    isPediatric: true,
    painIntensity: 5,
  }
  const narrativePediatric = generateNarrative(mockCheckboxes, 'SUMMARY', contextPediatric)
  console.log(narrativePediatric)
  console.log()

  // Verificações
  const pediatricChecks = [
    { test: 'Contém "Acompanhante refere"', pass: narrativePediatric.includes('Acompanhante refere') },
    { test: 'Contém "moderada intensidade"', pass: narrativePediatric.includes('moderada intensidade') },
  ]

  pediatricChecks.forEach(({ test, pass }) => {
    console.log(`  ${pass ? '✅' : '❌'} ${test}`)
  })

  // Teste 4: Modo detalhado
  console.log('\n📋 TESTE 4: Modo DETALHADO (com títulos)')
  console.log('-'.repeat(60))
  const narrativeDetailed = generateNarrative(mockCheckboxes, 'DETAILED', contextMale)
  console.log(narrativeDetailed)
  console.log()

  const detailedChecks = [
    { test: 'Contém título "Queixa Principal"', pass: narrativeDetailed.includes('**Queixa Principal:**') },
    { test: 'Contém título "História da Doença Atual"', pass: narrativeDetailed.includes('**História da Doença Atual:**') },
    { test: 'Contém título "Exame Físico"', pass: narrativeDetailed.includes('**Exame Físico:**') },
    { test: 'Contém "SINAIS DE ALARME"', pass: narrativeDetailed.includes('SINAIS DE ALARME') },
  ]

  detailedChecks.forEach(({ test, pass }) => {
    console.log(`  ${pass ? '✅' : '❌'} ${test}`)
  })

  // Resumo final
  const allChecks = [...maleChecks, ...femaleChecks, ...pediatricChecks, ...detailedChecks]
  const passed = allChecks.filter(c => c.pass).length
  const total = allChecks.length

  console.log('\n' + '='.repeat(80))
  console.log(`RESUMO: ${passed}/${total} verificações passaram`)
  console.log('='.repeat(80))

  if (passed === total) {
    console.log('✅ TODOS OS TESTES PASSARAM!')
  } else {
    console.log('⚠️  Alguns testes falharam. Verifique as implementações.')
  }
}

runTests()
