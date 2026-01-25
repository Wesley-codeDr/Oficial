/**
 * Flash Anamnesis - Gerador de Texto Médico Profissional
 *
 * Gera texto de prontuário com linguagem médica natural,
 * semelhante a um médico experiente de pronto-socorro.
 *
 * Características:
 * - Texto fluido e corrido
 * - Sucinto e objetivo
 * - Termos técnicos adequados
 * - Flexão de gênero automática
 * - Informações essenciais sem redundância
 */

import { FlashCheckbox, getCheckboxesForTemplate } from './flashCheckboxes'

export interface TextGeneratorInput {
  templateId: string
  checkedIds: Set<string>
  gender: 'M' | 'F'
  variables: Record<string, string>
}

/**
 * Helpers de flexão de gênero
 */
const genderHelpers = (gender: 'M' | 'F') => ({
  // Artigos e pronomes
  o_a: gender === 'M' ? 'O' : 'A',
  paciente: gender === 'M' ? 'Paciente' : 'Paciente',
  ele_ela: gender === 'M' ? 'ele' : 'ela',
  do_da: gender === 'M' ? 'do' : 'da',

  // Adjetivos comuns
  corado: gender === 'M' ? 'corado' : 'corada',
  hidratado: gender === 'M' ? 'hidratado' : 'hidratada',
  afebril: 'afebril', // invariável
  orientado: gender === 'M' ? 'orientado' : 'orientada',
  consciente: 'consciente', // invariável
  eupneico: gender === 'M' ? 'eupneico' : 'eupneica',
  acianótico: gender === 'M' ? 'acianótico' : 'acianótica',
  anictérico: gender === 'M' ? 'anictérico' : 'anictérica',
  calmo: gender === 'M' ? 'calmo' : 'calma',
  colaborativo: gender === 'M' ? 'colaborativo' : 'colaborativa',
  ansioso: gender === 'M' ? 'ansioso' : 'ansiosa',
  agitado: gender === 'M' ? 'agitado' : 'agitada',
})

/**
 * Estrutura de seções do prontuário
 */
interface GeneratedSections {
  queixa_principal: string
  exame_fisico: string
  hipotese_diagnostica: string[]
  conduta: string
}

/**
 * Gerador principal de texto médico profissional
 */
export function generateProfessionalMedicalText(
  input: TextGeneratorInput
): GeneratedSections {
  const { templateId, checkedIds, gender, variables } = input
  const g = genderHelpers(gender)
  const checkboxes = getCheckboxesForTemplate(templateId)

  // Separa checkboxes por seção e estado
  const checkedBySection = groupCheckboxesBySection(checkboxes, checkedIds)

  // Gera cada seção com texto profissional
  const qp = generateQueixaPrincipal(templateId, checkedBySection, g, variables)
  const ef = generateExameFisico(templateId, checkedBySection, g, variables)
  const hd = generateHipoteseDiagnostica(templateId, checkedBySection)
  const conduta = generateConduta(templateId, checkedBySection, g, variables)

  return {
    queixa_principal: qp,
    exame_fisico: ef,
    hipotese_diagnostica: hd,
    conduta: conduta,
  }
}

/**
 * Agrupa checkboxes por seção e estado (marcado/desmarcado)
 */
function groupCheckboxesBySection(
  checkboxes: FlashCheckbox[],
  checkedIds: Set<string>
) {
  const result: Record<
    string,
    { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] }
  > = {
    queixa_principal: { checked: [], unchecked: [] },
    exame_fisico: { checked: [], unchecked: [] },
    conduta: { checked: [], unchecked: [] },
  }

  for (const cb of checkboxes) {
    const section = cb.section
    if (!result[section]) {
      result[section] = { checked: [], unchecked: [] }
    }

    if (checkedIds.has(cb.id)) {
      result[section].checked.push(cb)
    } else if (cb.uncheckedText) {
      result[section].unchecked.push(cb)
    }
  }

  return result
}

/**
 * Gera QUEIXA PRINCIPAL com texto médico profissional
 */
function generateQueixaPrincipal(
  templateId: string,
  sections: ReturnType<typeof groupCheckboxesBySection>,
  g: ReturnType<typeof genderHelpers>,
  vars: Record<string, string>
): string {
  const qp = sections.queixa_principal
  const tempo = vars.tempo_sintomas || '--'

  // Templates específicos por queixa
  const templates: Record<string, () => string> = {
    lombalgia: () => generateLombalgiaQP(qp, g, tempo, vars),
    cefaleia_tensional: () => generateCefaleiaQP(qp, g, tempo, vars),
    enxaqueca: () => generateCefaleiaQP(qp, g, tempo, vars),
    ivas: () => generateIvasQP(qp, g, tempo, vars),
    faringoamigdalite: () => generateFaringoQP(qp, g, tempo, vars),
    gastroenterite: () => generateGastroQP(qp, g, tempo, vars),
    colica_renal: () => generateColicaRenalQP(qp, g, tempo, vars),
    cistite: () => generateCistiteQP(qp, g, tempo, vars),
    urticaria: () => generateUrticariaQP(qp, g, tempo, vars),
  }

  if (templates[templateId]) {
    return templates[templateId]()
  }

  // Fallback genérico
  return generateGenericQP(qp, g, tempo)
}

// ============================================
// TEMPLATES DE QUEIXA PRINCIPAL
// ============================================

function generateLombalgiaQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  // Início
  parts.push(`${g.o_a} paciente refere dor lombar há ${tempo}`)

  // Características da dor
  const dorMovimento = qp.checked.find((c) => c.id === 'lomb_dor_movimento')
  const dorRepouso = qp.checked.find((c) => c.id === 'lomb_dor_repouso')
  const esforco = qp.checked.find((c) => c.id === 'lomb_esforco')

  if (esforco) {
    parts[0] += ', de início após esforço físico'
  }

  if (dorMovimento && dorRepouso) {
    parts.push('com piora aos movimentos e melhora ao repouso')
  } else if (dorMovimento) {
    parts.push('com piora aos movimentos')
  } else if (dorRepouso) {
    parts.push('com melhora ao repouso')
  }

  // Irradiação
  const irradiacao = qp.checked.find((c) => c.id === 'lomb_irradiacao_mmii')
  const parestesia = qp.checked.find((c) => c.id === 'lomb_parestesia')

  if (irradiacao) {
    let irradText = 'Refere irradiação para membro inferior'
    if (vars.lado) {
      irradText += ` ${vars.lado}`
    }
    parts.push(irradText)
  }

  if (parestesia) {
    parts.push('associada a parestesias')
  }

  // Red flags (em destaque)
  const redFlags = qp.checked.filter((c) => c.isRedFlag)
  if (redFlags.length > 0) {
    const rfTexts = redFlags.map((rf) => {
      switch (rf.id) {
        case 'lomb_febre':
          return 'febre'
        case 'lomb_perda_peso':
          return 'perda ponderal não intencional'
        case 'lomb_trauma':
          return 'história de trauma'
        case 'lomb_alteracao_esfincter':
          return 'alteração do controle esfincteriano'
        case 'lomb_anestesia_sela':
          return 'hipoestesia em região perineal'
        default:
          return ''
      }
    }).filter(Boolean)

    if (rfTexts.length > 0) {
      parts.push(`ATENÇÃO: ${rfTexts.join(', ')}`)
    }
  }

  // Negativas importantes
  const negativas: string[] = []
  if (!qp.checked.find((c) => c.id === 'lomb_febre')) {
    negativas.push('febre')
  }
  if (!qp.checked.find((c) => c.id === 'lomb_alteracao_esfincter')) {
    negativas.push('alteração esfincteriana')
  }
  if (!irradiacao) {
    negativas.push('irradiação para membros inferiores')
  }

  if (negativas.length > 0) {
    parts.push(`Nega ${negativas.join(', ')}`)
  }

  return parts.join('. ') + '.'
}

function generateCefaleiaQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  // Início com características
  const holocraniana = qp.checked.find((c) => c.id === 'cef_holocraniana')
  const pressao = qp.checked.find((c) => c.id === 'cef_pressao')
  const pulsatil = qp.checked.find((c) => c.id === 'cef_pulsatil')
  const intensa = qp.checked.find((c) => c.id === 'cef_intensa')

  let inicio = `${g.o_a} paciente refere cefaleia`

  if (holocraniana) {
    inicio += ' holocraniana'
  } else if (vars.lado) {
    inicio += ` ${vars.lado}`
  }

  if (pulsatil) {
    inicio += ' de caráter pulsátil'
  } else if (pressao) {
    inicio += ' em aperto/pressão'
  }

  inicio += ` há ${tempo}`

  if (intensa) {
    inicio += ', de forte intensidade'
  }

  parts.push(inicio)

  // Sintomas associados
  const sintomas: string[] = []
  if (qp.checked.find((c) => c.id === 'cef_nausea')) sintomas.push('náuseas')
  if (qp.checked.find((c) => c.id === 'cef_vomitos')) sintomas.push('vômitos')
  if (qp.checked.find((c) => c.id === 'cef_fotofobia'))
    sintomas.push('fotofobia')
  if (qp.checked.find((c) => c.id === 'cef_fonofobia'))
    sintomas.push('fonofobia')

  if (sintomas.length > 0) {
    parts.push(`Associada a ${sintomas.join(', ')}`)
  }

  if (qp.checked.find((c) => c.id === 'cef_piora_atividade')) {
    parts.push('Piora com atividade física rotineira')
  }

  // Red flags
  const redFlags = qp.checked.filter((c) => c.isRedFlag)
  if (redFlags.length > 0) {
    const rfTexts = redFlags.map((rf) => {
      switch (rf.id) {
        case 'cef_trovao':
          return 'INÍCIO SÚBITO EM TROVOADA - PIOR CEFALEIA DA VIDA'
        case 'cef_febre':
          return 'febre'
        case 'cef_alteracao_consciencia':
          return 'alteração do nível de consciência'
        default:
          return ''
      }
    }).filter(Boolean)

    if (rfTexts.length > 0) {
      parts.push(`⚠️ ${rfTexts.join('. ')}`)
    }
  }

  // Negativas relevantes
  const negativas: string[] = []
  if (!qp.checked.find((c) => c.id === 'cef_febre')) negativas.push('febre')
  if (!qp.checked.find((c) => c.id === 'cef_aura'))
    negativas.push('aura visual ou sensitiva')

  if (negativas.length > 0) {
    parts.push(`Nega ${negativas.join(', ')}`)
  }

  return parts.join('. ') + '.'
}

function generateIvasQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  // Sintomas principais
  const sintomas: string[] = []
  if (qp.checked.find((c) => c.id === 'ivas_coriza')) sintomas.push('coriza')
  if (qp.checked.find((c) => c.id === 'ivas_odinofagia'))
    sintomas.push('odinofagia')
  if (qp.checked.find((c) => c.id === 'ivas_tosse_seca'))
    sintomas.push('tosse seca')
  if (qp.checked.find((c) => c.id === 'ivas_tosse_produtiva'))
    sintomas.push('tosse produtiva')
  if (qp.checked.find((c) => c.id === 'ivas_espirros'))
    sintomas.push('espirros frequentes')
  if (qp.checked.find((c) => c.id === 'ivas_mialgia')) sintomas.push('mialgia')
  if (qp.checked.find((c) => c.id === 'ivas_cefaleia'))
    sintomas.push('cefaleia')

  if (sintomas.length > 0) {
    parts.push(
      `${g.o_a} paciente refere ${sintomas.join(', ')} há ${tempo}`
    )
  } else {
    parts.push(`${g.o_a} paciente refere sintomas gripais há ${tempo}`)
  }

  // Febre
  const febre = qp.checked.find((c) => c.id === 'ivas_febre')
  if (febre && vars.temperatura) {
    parts.push(`Febre aferida de ${vars.temperatura}°C`)
  } else if (!febre) {
    parts.push('Nega febre aferida')
  }

  // Red flags
  const dispneia = qp.checked.find((c) => c.id === 'ivas_dispneia')
  const dorToracica = qp.checked.find((c) => c.id === 'ivas_dor_toracica')

  if (dispneia || dorToracica) {
    const alertas: string[] = []
    if (dispneia) alertas.push('dispneia')
    if (dorToracica) alertas.push('dor torácica')
    parts.push(`⚠️ ALERTA: ${alertas.join(', ')}`)
  } else {
    parts.push('Nega dispneia e dor torácica')
  }

  return parts.join('. ') + '.'
}

function generateFaringoQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  parts.push(`${g.o_a} paciente refere odinofagia intensa há ${tempo}`)

  // Febre (critério de Centor)
  const febre = qp.checked.find((c) => c.id === 'faring_febre')
  if (febre && vars.temperatura) {
    parts.push(`com febre aferida de ${vars.temperatura}°C`)
  }

  // Disfagia
  if (qp.checked.find((c) => c.id === 'faring_disfagia')) {
    parts.push('Dificuldade para deglutição')
  }

  // Ausência de tosse (Centor)
  if (qp.checked.find((c) => c.id === 'faring_ausencia_tosse')) {
    parts.push('Ausência de tosse')
  }

  // Red flags
  const redFlags = qp.checked.filter((c) => c.isRedFlag)
  if (redFlags.length > 0) {
    const alertas = redFlags.map((rf) => {
      switch (rf.id) {
        case 'faring_trismo':
          return 'trismo'
        case 'faring_dispneia':
          return 'dispneia'
        case 'faring_sialorreia':
          return 'sialorreia'
        default:
          return ''
      }
    }).filter(Boolean)

    if (alertas.length > 0) {
      parts.push(`⚠️ SINAIS DE ALARME: ${alertas.join(', ')}`)
    }
  } else {
    parts.push('Nega trismo, dispneia e dificuldade respiratória')
  }

  return parts.join('. ') + '.'
}

function generateGastroQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  // Sintomas principais
  const sintomas: string[] = []
  if (qp.checked.find((c) => c.id === 'gastro_diarreia'))
    sintomas.push('diarreia')
  if (qp.checked.find((c) => c.id === 'gastro_nausea')) sintomas.push('náuseas')
  if (qp.checked.find((c) => c.id === 'gastro_vomitos'))
    sintomas.push('vômitos')
  if (qp.checked.find((c) => c.id === 'gastro_dor_abdominal'))
    sintomas.push('dor abdominal em cólica')

  if (sintomas.length > 0) {
    parts.push(`${g.o_a} paciente refere ${sintomas.join(', ')} há ${tempo}`)
  }

  // Número de evacuações
  if (vars.num_evacuacoes) {
    parts.push(
      `Refere aproximadamente ${vars.num_evacuacoes} evacuações ao dia`
    )
  }

  // Red flags
  const sangue = qp.checked.find((c) => c.id === 'gastro_sangue_fezes')
  const febreAlta = qp.checked.find((c) => c.id === 'gastro_febre_alta')

  if (sangue || febreAlta) {
    const alertas: string[] = []
    if (sangue) alertas.push('sangue nas fezes')
    if (febreAlta) alertas.push('febre alta persistente')
    parts.push(`⚠️ ${alertas.join(', ').toUpperCase()}`)
  } else {
    parts.push('Nega sangue ou muco nas fezes')
  }

  return parts.join('. ') + '.'
}

function generateColicaRenalQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  // Dor característica
  let dorText = `${g.o_a} paciente refere dor lombar`
  if (vars.lado) {
    dorText += ` à ${vars.lado}`
  }
  dorText += ` de início súbito há ${tempo}, de forte intensidade, em cólica`
  parts.push(dorText)

  // Irradiação
  if (qp.checked.find((c) => c.id === 'colica_irradiacao')) {
    parts.push('com irradiação para flanco e fossa ilíaca ipsilateral')
  }

  // Sintomas associados
  const sintomas: string[] = []
  if (qp.checked.find((c) => c.id === 'colica_nausea'))
    sintomas.push('náuseas e vômitos')
  if (qp.checked.find((c) => c.id === 'colica_hematuria'))
    sintomas.push('hematúria')
  if (qp.checked.find((c) => c.id === 'colica_agitacao'))
    sintomas.push('agitação psicomotora pela dor')

  if (sintomas.length > 0) {
    parts.push(`Associado a ${sintomas.join(', ')}`)
  }

  // Red flags
  const febre = qp.checked.find((c) => c.id === 'colica_febre')
  const anuria = qp.checked.find((c) => c.id === 'colica_anuria')

  if (febre) {
    parts.push('⚠️ FEBRE ASSOCIADA - INVESTIGAR OBSTRUÇÃO INFECTADA')
  } else {
    parts.push('Nega febre')
  }

  if (anuria) {
    parts.push('⚠️ ANÚRIA - AVALIAR OBSTRUÇÃO BILATERAL')
  }

  return parts.join('. ') + '.'
}

function generateCistiteQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  // Sintomas urinários
  const sintomas: string[] = []
  if (qp.checked.find((c) => c.id === 'cistite_disuria'))
    sintomas.push('disúria')
  if (qp.checked.find((c) => c.id === 'cistite_polaciuria'))
    sintomas.push('polaciúria')
  if (qp.checked.find((c) => c.id === 'cistite_urgencia'))
    sintomas.push('urgência miccional')

  if (sintomas.length > 0) {
    parts.push(`${g.o_a} paciente refere ${sintomas.join(', ')} há ${tempo}`)
  }

  // Outros sintomas
  if (qp.checked.find((c) => c.id === 'cistite_dor_suprapubica')) {
    parts.push('Dor suprapúbica associada')
  }
  if (qp.checked.find((c) => c.id === 'cistite_urina_turva')) {
    parts.push('Refere urina turva')
  }

  // Red flags (pielonefrite)
  const febre = qp.checked.find((c) => c.id === 'cistite_febre')
  const dorLombar = qp.checked.find((c) => c.id === 'cistite_dor_lombar')
  const nausea = qp.checked.find((c) => c.id === 'cistite_nausea_vomito')

  if (febre || dorLombar || nausea) {
    const alertas: string[] = []
    if (febre) alertas.push('febre')
    if (dorLombar) alertas.push('dor lombar')
    if (nausea) alertas.push('náuseas/vômitos')
    parts.push(`⚠️ SINAIS DE PIELONEFRITE: ${alertas.join(', ')}`)
  } else {
    parts.push('Nega febre e dor lombar')
  }

  return parts.join('. ') + '.'
}

function generateUrticariaQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string,
  vars: Record<string, string>
): string {
  const parts: string[] = []

  parts.push(
    `${g.o_a} paciente refere aparecimento de lesões cutâneas pruriginosas há ${tempo}`
  )

  if (qp.checked.find((c) => c.id === 'urtic_prurido_intenso')) {
    parts.push('Prurido de forte intensidade')
  }

  if (vars.trigger) {
    parts.push(`Possível relação com exposição a ${vars.trigger}`)
  }

  // Red flags (anafilaxia)
  const redFlags = qp.checked.filter((c) => c.isRedFlag)
  if (redFlags.length > 0) {
    const alertas = redFlags.map((rf) => {
      switch (rf.id) {
        case 'urtic_dispneia':
          return 'dispneia'
        case 'urtic_edema_face':
          return 'edema de face/lábios/língua'
        case 'urtic_disfagia':
          return 'disfagia'
        case 'urtic_hipotensao':
          return 'hipotensão/síncope'
        default:
          return ''
      }
    }).filter(Boolean)

    if (alertas.length > 0) {
      parts.push(`⚠️ SINAIS DE ANAFILAXIA: ${alertas.join(', ')}`)
    }
  } else {
    parts.push('Nega dispneia, edema de vias aéreas ou dificuldade para engolir')
  }

  return parts.join('. ') + '.'
}

function generateGenericQP(
  qp: { checked: FlashCheckbox[]; unchecked: FlashCheckbox[] },
  g: ReturnType<typeof genderHelpers>,
  tempo: string
): string {
  if (qp.checked.length === 0) {
    return `${g.o_a} paciente comparece ao pronto-socorro com queixas há ${tempo}.`
  }

  const sintomas = qp.checked
    .filter((c) => !c.isRedFlag)
    .map((c) => c.checkedText.toLowerCase())
    .join(', ')

  const redFlags = qp.checked.filter((c) => c.isRedFlag)

  let text = `${g.o_a} paciente refere ${sintomas} há ${tempo}.`

  if (redFlags.length > 0) {
    const rfTexts = redFlags.map((rf) => rf.label.replace('🚨 ', ''))
    text += ` ⚠️ ALERTA: ${rfTexts.join(', ')}.`
  }

  return text
}

// ============================================
// GERAÇÃO DE EXAME FÍSICO
// ============================================

function generateExameFisico(
  templateId: string,
  sections: ReturnType<typeof groupCheckboxesBySection>,
  g: ReturnType<typeof genderHelpers>,
  vars: Record<string, string>
): string {
  const ef = sections.exame_fisico
  const parts: string[] = []

  // Estado geral (sempre presente)
  let estadoGeral = `Bom estado geral, ${g.corado}, ${g.hidratado}`

  // Temperatura/febre
  if (vars.temperatura && parseFloat(vars.temperatura) >= 37.8) {
    estadoGeral += `, febril ao toque (${vars.temperatura}°C)`
  } else {
    estadoGeral += `, ${g.afebril} ao toque`
  }

  parts.push(estadoGeral)

  // Sinais vitais
  const sinaisVitais: string[] = []
  if (vars.pa_sistolica && vars.pa_diastolica) {
    sinaisVitais.push(`PA ${vars.pa_sistolica}x${vars.pa_diastolica} mmHg`)
  }
  if (vars.fc) {
    sinaisVitais.push(`FC ${vars.fc} bpm`)
  }
  if (vars.fr) {
    sinaisVitais.push(`FR ${vars.fr} irpm`)
  }
  if (vars.spo2) {
    sinaisVitais.push(`SpO2 ${vars.spo2}% em ar ambiente`)
  }

  if (sinaisVitais.length > 0) {
    parts.push(sinaisVitais.join(', '))
  }

  // Achados específicos do exame
  const achados = ef.checked.map((c) => {
    // Aplicar flexão de gênero no texto
    let text = c.checkedText
    text = text.replace(/{gender_corado}/g, g.corado)
    text = text.replace(/{gender_hidratado}/g, g.hidratado)
    text = text.replace(/{gender_afebril}/g, g.afebril)
    text = text.replace(/{gender_orientado}/g, g.orientado)
    text = text.replace(/{gender_agitado}/g, g.agitado)
    text = text.replace(/{gender_ansioso}/g, g.ansioso)

    // Substituir variáveis
    if (vars.lado) {
      text = text.replace(/{lado}/g, vars.lado)
    }

    return text
  })

  if (achados.length > 0) {
    parts.push(achados.join('. '))
  }

  // Negativas do exame (uncheckedText)
  const negativas = ef.unchecked
    .filter((c) => c.uncheckedText)
    .map((c) => c.uncheckedText!)

  if (negativas.length > 0) {
    parts.push(negativas.join('. '))
  }

  // Red flags no exame
  const redFlagsEF = ef.checked.filter((c) => c.isRedFlag)
  if (redFlagsEF.length > 0) {
    parts.push(
      `⚠️ ${redFlagsEF.map((rf) => rf.checkedText.toUpperCase()).join('. ')}`
    )
  }

  return parts.join('. ') + '.'
}

// ============================================
// GERAÇÃO DE HIPÓTESE DIAGNÓSTICA
// ============================================

function generateHipoteseDiagnostica(
  templateId: string,
  sections: ReturnType<typeof groupCheckboxesBySection>
): string[] {
  // Retorna hipóteses padrão por template
  const hipoteses: Record<string, string[]> = {
    lombalgia: [
      'Lombalgia mecânica aguda',
      'Contratura muscular lombar',
      'Dor lombar inespecífica',
    ],
    cefaleia_tensional: [
      'Cefaleia do tipo tensional',
      'Cefaleia primária',
    ],
    enxaqueca: [
      'Enxaqueca sem aura',
      'Migrânea episódica',
    ],
    ivas: [
      'Infecção de vias aéreas superiores',
      'Rinofaringite aguda viral',
      'Síndrome gripal',
    ],
    faringoamigdalite: [
      'Faringoamigdalite aguda bacteriana',
      'Faringoamigdalite estreptocócica',
    ],
    gastroenterite: [
      'Gastroenterite aguda viral',
      'Síndrome diarreica aguda',
    ],
    colica_renal: [
      'Cólica nefrética',
      'Nefrolitíase',
      'Urolitíase',
    ],
    cistite: [
      'Cistite aguda não complicada',
      'Infecção urinária baixa',
    ],
    urticaria: [
      'Urticária aguda',
      'Reação alérgica cutânea',
    ],
  }

  return hipoteses[templateId] || ['Síndrome a esclarecer']
}

// ============================================
// GERAÇÃO DE CONDUTA
// ============================================

function generateConduta(
  templateId: string,
  sections: ReturnType<typeof groupCheckboxesBySection>,
  g: ReturnType<typeof genderHelpers>,
  vars: Record<string, string>
): string {
  // Templates de conduta por queixa (simplificado)
  // Em produção, isso seria mais elaborado
  const condutas: Record<string, string> = {
    lombalgia: `Prescrito analgesia e anti-inflamatório. ${g.orientado} quanto à manutenção de atividades habituais dentro do tolerável. Orientações sobre sinais de alarme: febre, perda de peso, déficit neurológico progressivo, alteração esfincteriana. Encaminhado para reavaliação ambulatorial se persistência dos sintomas.`,

    cefaleia_tensional: `Prescrito analgésico simples. ${g.orientado} quanto a higiene do sono, manejo do estresse e alongamentos cervicais. Orientações sobre sinais de alarme: cefaleia em trovoada, febre, rigidez de nuca, déficit neurológico. Retorno se mudança do padrão habitual.`,

    ivas: `Prescrito sintomáticos (analgésico/antitérmico). ${g.orientado} quanto à hidratação oral abundante e repouso. Orientações sobre sinais de alarme: febre persistente >72h, dispneia, dor torácica. Retorno se piora.`,

    faringoamigdalite: `Escore de Centor-McIsaac: ${vars.centor_score || '--'} pontos. Prescrito antibioticoterapia e sintomáticos conforme protocolo. ${g.orientado} quanto a repouso e hidratação. Sinais de alarme: dispneia, trismo, abaulamento peritonsilar. Retorno se persistência da febre após 48-72h.`,

    gastroenterite: `Prescrito hidratação oral com soro de reidratação. Dieta leve e fracionada. Sintomáticos se necessário. ${g.orientado} quanto aos sinais de desidratação e sangramento. Retorno se piora.`,

    colica_renal: `Prescrito analgesia endovenosa potente (AINE + opioide se necessário). Solicitado exames de imagem. ${g.orientado} quanto aos sinais de alarme: febre, anúria. Se febre associada, avaliar internação e urologia de urgência.`,

    cistite: `Solicitado EAS. Prescrito antibioticoterapia empírica conforme protocolo. ${g.orientado} quanto aos sinais de pielonefrite: febre, dor lombar. Retorno se não melhora em 48-72h.`,

    urticaria: `Prescrito anti-histamínico. ${g.orientado} a evitar possível trigger. Sinais de alarme para anafilaxia: dispneia, edema de vias aéreas, hipotensão. Procurar emergência imediatamente se sintomas sistêmicos.`,
  }

  return (
    condutas[templateId] ||
    `${g.orientado} quanto ao quadro clínico e sinais de alarme. Retorno se piora.`
  )
}

/**
 * Exporta função principal para uso no FlashAnamnesisFlow
 */
export { genderHelpers }
