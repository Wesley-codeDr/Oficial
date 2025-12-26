/**
 * Gerador de Checkboxes para o Banco de Dados
 *
 * Este script transforma os dados de complaintsData.ts (sincronizados do Obsidian)
 * em registros de Syndrome e Checkbox no banco de dados PostgreSQL.
 *
 * Usa templates de narrativa médica técnica para gerar texto corrido
 * com terminologia profissional e proteção jurídica implícita.
 *
 * Uso: npx tsx scripts/sync/generate-checkboxes.ts
 */

import { PrismaClient, CheckboxCategory } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { complaintsData } from '../../lib/data/complaintsData'
import {
  toMedicalNarrative,
  RED_FLAG_NARRATIVES,
  buildNarrativeText,
  COMPLETE_NARRATIVES,
} from '../../lib/anamnese/narrative-templates'

// Configuração do Prisma com adapter
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// Mapeamento de grupos para nomes de Syndrome
const GROUP_TO_SYNDROME: Record<string, { name: string; code: string; description: string; icon: string }> = {
  'CV': {
    name: 'Cardiovascular',
    code: 'CV',
    description: 'Síndromes cardiovasculares - dor torácica, palpitações, síncope',
    icon: 'heart'
  },
  'RESP': {
    name: 'Respiratório',
    code: 'RESP',
    description: 'Síndromes respiratórias - dispneia, tosse, dor torácica pleurítica',
    icon: 'wind'
  },
  'NEURO': {
    name: 'Neurológico',
    code: 'NEURO',
    description: 'Síndromes neurológicas - cefaleia, déficit focal, alteração de consciência',
    icon: 'brain'
  },
  'GI': {
    name: 'Gastrointestinal',
    code: 'GI',
    description: 'Síndromes gastrointestinais - dor abdominal, náusea, vômito',
    icon: 'utensils'
  },
  'URO': {
    name: 'Urológico',
    code: 'URO',
    description: 'Síndromes urológicas - disúria, hematúria, cólica renal',
    icon: 'droplet'
  },
  'GYN': {
    name: 'Ginecológico',
    code: 'GYN',
    description: 'Síndromes ginecológicas - dor pélvica, sangramento vaginal',
    icon: 'female'
  },
  'MSK': {
    name: 'Musculoesquelético',
    code: 'MSK',
    description: 'Síndromes musculoesqueléticas - dor, trauma, artralgia',
    icon: 'bone'
  },
  'DERM': {
    name: 'Dermatológico',
    code: 'DERM',
    description: 'Síndromes dermatológicas - rash, lesões cutâneas',
    icon: 'circle'
  },
  'PSYCH': {
    name: 'Psiquiátrico',
    code: 'PSYCH',
    description: 'Síndromes psiquiátricas - ansiedade, agitação, ideação suicida',
    icon: 'brain-circuit'
  },
  'INF': {
    name: 'Infectológico',
    code: 'INF',
    description: 'Síndromes infecciosas - febre, sepse, infecções localizadas',
    icon: 'bug'
  },
  'TRAUMA': {
    name: 'Trauma',
    code: 'TRAUMA',
    description: 'Síndromes traumáticas - TCE, politrauma, ferimentos',
    icon: 'alert-triangle'
  },
  'PED': {
    name: 'Pediátrico',
    code: 'PED',
    description: 'Síndromes pediátricas específicas',
    icon: 'baby'
  },
  'GERAL': {
    name: 'Geral',
    code: 'GERAL',
    description: 'Queixas gerais - mal-estar, fadiga, febre',
    icon: 'activity'
  }
}

interface CheckboxData {
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRequired: boolean
  isRedFlag: boolean
  isNegative: boolean
  orderIndex: number
}

/**
 * Obtém narrativa técnica completa para um sintoma/achado
 * Usa COMPLETE_NARRATIVES quando disponível, senão gera via toMedicalNarrative
 */
function getNarrativeText(displayText: string, category: CheckboxCategory, isRedFlag: boolean = false): string {
  // Primeiro tenta usar narrativa pré-definida
  const complete = COMPLETE_NARRATIVES[displayText]
  if (complete) {
    return complete.narrative
  }

  // Fallback para geração automática
  return buildNarrativeText(displayText, category, isRedFlag)
}

/**
 * Gera checkboxes a partir de uma queixa usando templates de narrativa médica
 * Padrão de escrita:
 * - Refere: sintomas relatados (HDA)
 * - Apresenta: achados clínicos ativos (EXAME_FISICO)
 * - Evidencia: sinais objetivos do exame
 * - História de: antecedentes
 * - Nega: negativas pertinentes
 */
function generateCheckboxesFromComplaint(complaint: typeof complaintsData.complaints[0]): CheckboxData[] {
  const checkboxes: CheckboxData[] = []
  let orderIndex = 0

  // 1. Queixa Principal (QP) - Texto técnico com contexto de atendimento
  const qpNarrative = toMedicalNarrative(complaint.title, 'QP', false)
  checkboxes.push({
    category: 'QP' as CheckboxCategory,
    displayText: complaint.title,
    narrativeText: qpNarrative,
    isRequired: true,
    isRedFlag: false,
    isNegative: false,
    orderIndex: orderIndex++
  })

  // 2. Sintomas Relacionados (HDA) - Usando terminologia médica técnica
  const relatedSymptoms = complaint.relatedSymptoms || []
  for (const symptom of relatedSymptoms) {
    const narrativeText = getNarrativeText(symptom, 'HDA', false)
    checkboxes.push({
      category: 'HDA' as CheckboxCategory,
      displayText: symptom,
      narrativeText: narrativeText,
      isRequired: false,
      isRedFlag: false,
      isNegative: false,
      orderIndex: orderIndex++
    })
  }

  // 3. Red Flags (HDA com isRedFlag = true) - Com contexto clínico completo
  const redFlags = complaint.extendedContent?.redFlags || []
  for (const redFlag of redFlags) {
    const cleanRedFlag = redFlag.replace(/^⚠️\s*/, '').trim()

    // Usa narrativa específica do dicionário ou gera uma técnica
    const narrativeText = RED_FLAG_NARRATIVES[cleanRedFlag] ||
      getNarrativeText(cleanRedFlag, 'HDA', true)

    checkboxes.push({
      category: 'HDA' as CheckboxCategory,
      displayText: `⚠️ ${cleanRedFlag}`,
      narrativeText: `ALERTA: ${narrativeText}`,
      isRequired: false,
      isRedFlag: true,
      isNegative: false,
      orderIndex: orderIndex++
    })
  }

  // 4. Exame Físico - Achados e Sinais (Apresenta / Evidencia)
  const exameFisico = [
    // Achados clínicos ativos (Apresenta)
    { display: 'Defesa abdominal', narrative: 'defesa abdominal à palpação' },
    { display: 'Rigidez abdominal', narrative: 'rigidez abdominal' },
    { display: 'Dor à palpação', narrative: 'dor à palpação' },
    { display: 'Abdome distendido', narrative: 'abdome distendido' },
    { display: 'Ruídos hidroaéreos aumentados', narrative: 'ruídos hidroaéreos aumentados' },
    { display: 'Ruídos hidroaéreos diminuídos', narrative: 'ruídos hidroaéreos diminuídos' },
    { display: 'Taquicardia ao exame', narrative: 'taquicardia' },
    { display: 'Hipotensão', narrative: 'hipotensão arterial' },
    { display: 'Taquipneia', narrative: 'taquipneia' },
    { display: 'Cianose', narrative: 'cianose' },
    { display: 'Palidez cutânea', narrative: 'palidez cutânea' },
    { display: 'Icterícia', narrative: 'icterícia' },
    { display: 'Edema de membros inferiores', narrative: 'edema de membros inferiores' },
    { display: 'Estertores pulmonares', narrative: 'estertores pulmonares' },
    { display: 'Sibilos', narrative: 'sibilos à ausculta pulmonar' },

    // Sinais objetivos (Evidencia)
    { display: 'Sinal de Murphy positivo', narrative: 'Sinal de Murphy positivo' },
    { display: 'Sinal de Blumberg positivo', narrative: 'Sinal de Blumberg positivo' },
    { display: 'Sinal de Rovsing positivo', narrative: 'Sinal de Rovsing positivo' },
    { display: 'Sinal de Giordano positivo', narrative: 'Sinal de Giordano positivo' },
    { display: 'Rigidez de nuca', narrative: 'rigidez de nuca' },
    { display: 'Déficit neurológico focal', narrative: 'déficit neurológico focal' },
    { display: 'Abdome em tábua', narrative: 'abdome em tábua' },

    // Estado geral (padrão)
    { display: 'BEG, LOC', narrative: 'bom estado geral, lúcido, orientado, cooperativo' },
    { display: 'REG', narrative: 'regular estado geral' },
    { display: 'Corado, hidratado', narrative: 'corado, hidratado, anictérico, acianótico' },
    { display: 'MV+ s/ RA', narrative: 'murmúrio vesicular presente bilateralmente, sem ruídos adventícios' },
    { display: 'RCR 2T BNF SS', narrative: 'ritmo cardíaco regular em dois tempos, bulhas normofonéticas, sem sopros' },
    { display: 'Abdome flácido', narrative: 'abdome flácido, indolor à palpação superficial e profunda' },
    { display: 'MMII sem edema', narrative: 'membros inferiores sem edema, pulsos pediosos presentes e simétricos' },
    { display: 'Glasgow 15', narrative: 'Escala de Coma de Glasgow 15 pontos' },
  ]

  for (const exame of exameFisico) {
    checkboxes.push({
      category: 'EXAME_FISICO' as CheckboxCategory,
      displayText: exame.display,
      narrativeText: exame.narrative,
      isRequired: false,
      isRedFlag: false,
      isNegative: false,
      orderIndex: orderIndex++
    })
  }

  // 5. Antecedentes (História de)
  const antecedentes = [
    { display: 'HAS', narrative: 'hipertensão arterial sistêmica em tratamento' },
    { display: 'DM2', narrative: 'diabetes mellitus tipo 2' },
    { display: 'Dislipidemia', narrative: 'dislipidemia em tratamento' },
    { display: 'Tabagismo', narrative: 'tabagismo ativo' },
    { display: 'Ex-tabagista', narrative: 'ex-tabagismo' },
    { display: 'Etilismo', narrative: 'etilismo' },
    { display: 'Obesidade', narrative: 'obesidade' },
    { display: 'IAM prévio', narrative: 'infarto agudo do miocárdio prévio' },
    { display: 'AVC prévio', narrative: 'acidente vascular cerebral prévio' },
    { display: 'Revascularização prévia', narrative: 'revascularização miocárdica prévia' },
    { display: 'Cirurgia abdominal prévia', narrative: 'cirurgia abdominal prévia' },
    { display: 'Trauma recente', narrative: 'associação com evento traumático' },
    { display: 'DPOC', narrative: 'doença pulmonar obstrutiva crônica' },
    { display: 'Asma', narrative: 'asma brônquica' },
    { display: 'IRC', narrative: 'insuficiência renal crônica' },
    { display: 'ICC', narrative: 'insuficiência cardíaca congestiva' },
    { display: 'Fibrilação atrial', narrative: 'fibrilação atrial' },
    { display: 'Uso de anticoagulantes', narrative: 'uso de anticoagulantes' },
  ]

  for (const antecedente of antecedentes) {
    checkboxes.push({
      category: 'ANTECEDENTES' as CheckboxCategory,
      displayText: antecedente.display,
      narrativeText: antecedente.narrative,
      isRequired: false,
      isRedFlag: false,
      isNegative: false,
      orderIndex: orderIndex++
    })
  }

  // 6. Negativas pertinentes (Nega)
  const negativas = [
    { display: 'Nega febre', narrative: 'febre' },
    { display: 'Nega náuseas', narrative: 'náuseas ou vômitos' },
    { display: 'Nega vômitos', narrative: 'vômitos' },
    { display: 'Nega diarreia', narrative: 'diarreia' },
    { display: 'Nega dispneia', narrative: 'dispneia' },
    { display: 'Nega síncope', narrative: 'episódios sincopais' },
    { display: 'Nega alteração de consciência', narrative: 'alteração do nível de consciência' },
    { display: 'Nega dor torácica', narrative: 'dor torácica' },
    { display: 'Nega palpitações', narrative: 'palpitações' },
    { display: 'Nega tosse', narrative: 'tosse' },
    { display: 'Nega cefaleia', narrative: 'cefaleia' },
    { display: 'Nega trauma', narrative: 'trauma recente' },
    { display: 'Nega alergias', narrative: 'alergias medicamentosas conhecidas' },
    { display: 'Nega uso de medicações', narrative: 'uso de medicações de uso contínuo' },
    { display: 'Nega internações prévias', narrative: 'internações hospitalares prévias' },
    { display: 'Nega cirurgias prévias', narrative: 'cirurgias prévias' },
  ]

  for (const negativa of negativas) {
    checkboxes.push({
      category: 'NEGATIVAS' as CheckboxCategory,
      displayText: negativa.display,
      narrativeText: negativa.narrative,
      isRequired: false,
      isRedFlag: false,
      isNegative: true,
      orderIndex: orderIndex++
    })
  }

  return checkboxes
}

async function main() {
  console.log('🚀 Iniciando geração de checkboxes do Obsidian...\n')

  // Limpa checkboxes existentes para evitar duplicatas
  console.log('🧹 Limpando checkboxes existentes...')
  await prisma.checkbox.deleteMany({})
  console.log('   ✓ Checkboxes removidos\n')

  // Agrupar queixas por grupo
  const complaintsByGroup = new Map<string, typeof complaintsData.complaints>()

  for (const complaint of complaintsData.complaints) {
    const group = complaint.group
    if (!complaintsByGroup.has(group)) {
      complaintsByGroup.set(group, [])
    }
    complaintsByGroup.get(group)!.push(complaint)
  }

  let syndromeCount = 0
  let checkboxCount = 0
  let orderIndex = 0

  for (const [group, complaints] of complaintsByGroup) {
    const syndromeConfig = GROUP_TO_SYNDROME[group] || {
      name: group,
      code: group,
      description: `Síndrome ${group}`,
      icon: 'activity'
    }

    console.log(`📁 Processando grupo: ${syndromeConfig.name} (${complaints.length} queixas)`)

    // Upsert Syndrome
    const syndrome = await prisma.syndrome.upsert({
      where: { code: syndromeConfig.code },
      update: {
        name: syndromeConfig.name,
        description: syndromeConfig.description,
        icon: syndromeConfig.icon,
        updatedAt: new Date()
      },
      create: {
        name: syndromeConfig.name,
        code: syndromeConfig.code,
        description: syndromeConfig.description,
        icon: syndromeConfig.icon,
        orderIndex: orderIndex++
      }
    })

    syndromeCount++

    // Gerar checkboxes para cada queixa
    for (const complaint of complaints) {
      console.log(`   📝 Gerando checkboxes para: ${complaint.title}`)

      const checkboxes = generateCheckboxesFromComplaint(complaint)

      for (const checkbox of checkboxes) {
        await prisma.checkbox.create({
          data: {
            syndromeId: syndrome.id,
            ...checkbox
          }
        })
        checkboxCount++
      }
    }
  }

  console.log('\n✅ Geração concluída!')
  console.log(`   Syndromes criadas/atualizadas: ${syndromeCount}`)
  console.log(`   Checkboxes criados: ${checkboxCount}`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a geração:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
