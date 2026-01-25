/**
 * Templates de Narrativa Médica
 *
 * Regras para transformar checkboxes em texto corrido técnico-médico
 * com terminologia profissional e proteção jurídica implícita.
 *
 * Padrão de escrita:
 * - Refere: sintomas relatados pelo paciente
 * - Apresenta: achados clínicos ativos
 * - Evidencia: sinais objetivos do exame físico
 * - História de: antecedentes e história pregressa
 * - Nega: negativas pertinentes
 */

import { CheckboxCategory } from '@prisma/client'

// ============================================================================
// VERBOS PADRÃO POR CATEGORIA CLÍNICA
// ============================================================================

export const CATEGORY_VERBS = {
  // Sintomas relatados pelo paciente (HDA)
  SINTOMAS_RELATADOS: 'Refere',

  // Achados clínicos ativos / exame físico positivo
  ACHADOS_CLINICOS: 'Apresenta',

  // Sinais objetivos do exame físico
  SINAIS_OBJETIVOS: 'Evidencia',

  // Antecedentes e história pregressa
  ANTECEDENTES: 'História de',

  // Negativas pertinentes
  NEGATIVAS: 'Nega',
} as const

// ============================================================================
// DICIONÁRIO DE TERMOS MÉDICOS (formato misto: extenso + sigla)
// ============================================================================

export const MEDICAL_TERMS: Record<string, string> = {
  // Condições cardiovasculares
  'HAS': 'hipertensão arterial sistêmica (HAS)',
  'has': 'hipertensão arterial sistêmica (HAS)',
  'DM': 'diabetes mellitus (DM)',
  'DM2': 'diabetes mellitus tipo 2 (DM2)',
  'DM1': 'diabetes mellitus tipo 1 (DM1)',
  'IAM': 'infarto agudo do miocárdio (IAM)',
  'ICC': 'insuficiência cardíaca congestiva (ICC)',
  'FA': 'fibrilação atrial (FA)',
  'DAC': 'doença arterial coronariana (DAC)',
  'AVC': 'acidente vascular cerebral (AVC)',
  'AVCi': 'acidente vascular cerebral isquêmico (AVCi)',
  'AVCh': 'acidente vascular cerebral hemorrágico (AVCh)',
  'TEP': 'tromboembolismo pulmonar (TEP)',
  'TVP': 'trombose venosa profunda (TVP)',

  // Sintomas
  'MSE': 'membro superior esquerdo (MSE)',
  'MSD': 'membro superior direito (MSD)',
  'MIE': 'membro inferior esquerdo (MIE)',
  'MID': 'membro inferior direito (MID)',
  'MMSS': 'membros superiores (MMSS)',
  'MMII': 'membros inferiores (MMII)',

  // Exame físico
  'REG': 'regular estado geral (REG)',
  'BEG': 'bom estado geral (BEG)',
  'MEG': 'mau estado geral (MEG)',
  'LOC': 'lúcido e orientado no tempo e espaço',
  'MV': 'murmúrio vesicular',
  'MV+': 'murmúrio vesicular presente',
  'RA': 'ruídos adventícios',
  'RCR': 'ritmo cardíaco regular',
  'RCI': 'ritmo cardíaco irregular',
  'BNF': 'bulhas normofonéticas',
  '2T': 'em dois tempos',
  '3T': 'em três tempos',
  'SS': 'sem sopros',

  // Medicamentos/Tratamentos
  'AAS': 'ácido acetilsalicílico (AAS)',
  'IECA': 'inibidor da enzima conversora de angiotensina (IECA)',
  'BRA': 'bloqueador do receptor de angiotensina (BRA)',
  'BB': 'betabloqueador',
  'BCC': 'bloqueador de canal de cálcio',

  // Outros
  'SCA': 'síndrome coronariana aguda (SCA)',
  'DPOC': 'doença pulmonar obstrutiva crônica (DPOC)',
  'IRC': 'insuficiência renal crônica (IRC)',
  'IRA': 'insuficiência renal aguda (IRA)',
  'ITU': 'infecção do trato urinário (ITU)',
  'PAC': 'pneumonia adquirida na comunidade (PAC)',
  'DRGE': 'doença do refluxo gastroesofágico (DRGE)',
}

// Pre-compile regexes for performance optimization in expandMedicalTerm
const MEDICAL_TERMS_REGEX = Object.entries(MEDICAL_TERMS).map(([abbrev, expanded]) => ({
  regex: new RegExp(`\\b${abbrev}\\b`, 'g'),
  expanded,
}))

// ============================================================================
// TEMPLATES POR CATEGORIA
// ============================================================================

export interface CategoryTemplate {
  prefix: string
  suffix: string
  connector: string
  itemPrefix?: string
  redFlagPrefix?: string
}

export const CATEGORY_TEMPLATES: Record<CheckboxCategory, CategoryTemplate> = {
  QP: {
    prefix: 'Paciente comparece ao serviço de emergência com queixa de ',
    suffix: '.',
    connector: ', associada a ',
    itemPrefix: '',
  },
  HDA: {
    prefix: 'Refere ',
    suffix: '.',
    connector: ', ',
    itemPrefix: '',
    redFlagPrefix: 'ALERTA: ',
  },
  ANTECEDENTES: {
    prefix: 'Antecedentes pessoais: ',
    suffix: '.',
    connector: ', ',
    itemPrefix: '',
  },
  MEDICACOES: {
    prefix: 'Medicações em uso: ',
    suffix: '.',
    connector: ', ',
    itemPrefix: '',
  },
  ALERGIAS: {
    prefix: 'Alergias: ',
    suffix: '.',
    connector: ', ',
    itemPrefix: '',
  },
  HABITOS: {
    prefix: 'Hábitos: ',
    suffix: '.',
    connector: ', ',
    itemPrefix: '',
  },
  EXAME_FISICO: {
    prefix: 'Ao exame físico: ',
    suffix: '.',
    connector: '. ',
    itemPrefix: '',
  },
  NEGATIVAS: {
    prefix: 'Nega ',
    suffix: '.',
    connector: ', ',
    itemPrefix: '',
  },
}

// ============================================================================
// TRANSFORMAÇÕES DE SINTOMAS PARA NARRATIVA
// ============================================================================

export interface SymptomNarrative {
  displayText: string
  narrativeText: string
  category: CheckboxCategory
  isRedFlag?: boolean
}

/**
 * Mapeamento de sintomas comuns para texto narrativo técnico
 */
export const SYMPTOM_NARRATIVES: Record<string, string> = {
  // Sintomas cardiovasculares
  'Sudorese': 'sudorese profusa',
  'Náusea': 'náuseas',
  'Náuseas': 'náuseas',
  'Vômito': 'vômitos',
  'Vômitos': 'vômitos',
  'Dispneia': 'dispneia aos esforços',
  'Palpitações': 'palpitações',
  'Taquicardia': 'taquicardia',
  'Síncope': 'episódio sincopal',
  'Pré-síncope': 'episódio pré-sincopal',
  'Tontura': 'tontura',
  'Dor precordial': 'precordialgia',
  'Dor torácica': 'dor torácica',
  'Dor no peito': 'precordialgia',

  // Irradiações
  'Irradiação para MSE': 'irradiação para membro superior esquerdo',
  'Irradiação para mandíbula': 'irradiação para região mandibular',
  'Irradiação para dorso': 'irradiação para região dorsal',
  'Irradiação para braço': 'irradiação para membro superior',

  // Sintomas respiratórios
  'Tosse': 'tosse',
  'Tosse produtiva': 'tosse produtiva',
  'Tosse seca': 'tosse seca',
  'Expectoração': 'expectoração',
  'Hemoptise': 'hemoptise',
  'Cianose': 'cianose',

  // Sintomas neurológicos
  'Cefaleia': 'cefaleia',
  'Dor de cabeça': 'cefaleia',
  'Confusão': 'confusão mental',
  'Alteração de consciência': 'alteração do nível de consciência',
  'Convulsão': 'crise convulsiva',
  'Fraqueza': 'fraqueza muscular',
  'Parestesia': 'parestesias',
  'Formigamento': 'parestesias',

  // Sintomas gastrointestinais
  'Dor abdominal': 'dor abdominal',
  'Diarreia': 'diarreia',
  'Constipação': 'constipação intestinal',
  'Hematêmese': 'hematêmese',
  'Melena': 'melena',
  'Hematoquezia': 'hematoquezia',

  // Sintomas gerais
  'Febre': 'febre',
  'Calafrios': 'calafrios',
  'Astenia': 'astenia',
  'Mal-estar': 'mal-estar geral',
  'Perda de peso': 'perda ponderal',
  'Anorexia': 'hiporexia',
}

/**
 * Mapeamento de red flags para narrativa técnica com contexto clínico
 */
export const RED_FLAG_NARRATIVES: Record<string, string> = {
  // Cardiovascular
  'Dor precordial em aperto > 20 min': 'Dor precordial em aperto persistente há mais de 20 minutos, característica sugestiva de síndrome coronariana aguda (SCA)',
  'Irradiação para MSE, mandíbula ou dorso': 'Dor com irradiação para membro superior esquerdo, mandíbula e/ou dorso, padrão típico de isquemia miocárdica',
  'Sudorese fria profusa': 'Sudorese fria profusa, sugestiva de descarga adrenérgica por baixo débito',
  'Hipotensão': 'Hipotensão arterial (PA < 90x60 mmHg), indicativa de instabilidade hemodinâmica',
  'Síncope ou pré-síncope': 'Episódio sincopal ou pré-sincopal associado, sugerindo arritmia ou baixo débito cardíaco',
  'Alteração de consciência': 'Alteração do nível de consciência, indicando hipoperfusão cerebral',
  'Dispneia associada': 'Dispneia associada, sugestiva de congestão pulmonar ou equivalente isquêmico',

  // Neurológico
  'Déficit neurológico focal': 'Déficit neurológico focal agudo, sugestivo de evento cerebrovascular',
  'Cefaleia súbita intensa': 'Cefaleia de início súbito e intensidade máxima ("thunderclap headache"), sugestiva de hemorragia subaracnóidea',
  'Rigidez de nuca': 'Rigidez de nuca, sinal meníngeo presente',
  'Glasgow < 15': 'Rebaixamento do nível de consciência com Escala de Coma de Glasgow inferior a 15 pontos',
  'Convulsão pós-trauma': 'Crise convulsiva pós-traumática, indicando lesão cerebral estrutural',

  // Respiratório
  'SpO2 < 90%': 'Saturação periférica de oxigênio inferior a 90% em ar ambiente, caracterizando hipoxemia',
  'Uso de musculatura acessória': 'Uso de musculatura respiratória acessória, indicando esforço ventilatório aumentado',
  'Cianose central': 'Cianose central, indicando dessaturação grave',

  // Gastrointestinal
  'Defesa abdominal': 'Defesa abdominal involuntária, sugestiva de peritonite',
  'Abdome em tábua': 'Abdome em tábua, indicando irritação peritoneal difusa',
  'Hematêmese volumosa': 'Hematêmese volumosa, caracterizando hemorragia digestiva alta',

  // Infeccioso
  'Febre > 38°C': 'Febre aferida superior a 38°C',
  'Hipotensão refratária': 'Hipotensão refratária à reposição volêmica, sugestiva de choque séptico',
}

// ============================================================================
// DICIONÁRIO DE TERMOS LEIGOS → TÉCNICOS
// ============================================================================

export const LEIGO_TO_TECNICO: Record<string, string> = {
  // Sintomas gastrointestinais
  'enjoo': 'náuseas',
  'enjoada': 'nauseada',
  'enjoado': 'nauseado',
  'vômito': 'vômitos',
  'dor de barriga': 'dor abdominal',
  'dor na barriga': 'dor abdominal',
  'azia': 'pirose',
  'queimação': 'pirose',
  'arroto': 'eructação',
  'gases': 'flatulência',
  'prisão de ventre': 'constipação intestinal',
  'intestino preso': 'constipação intestinal',

  // Sintomas respiratórios
  'falta de ar': 'dispneia',
  'cansaço ao respirar': 'dispneia aos esforços',
  'chiado no peito': 'sibilância',
  'catarro': 'expectoração',
  'pigarro': 'tosse irritativa',

  // Sintomas cardiovasculares
  'coração acelerado': 'taquicardia',
  'coração disparado': 'palpitações',
  'batimentos acelerados': 'taquicardia',
  'desmaio': 'síncope',
  'quase desmaio': 'pré-síncope',
  'tontura': 'vertigem',
  'zonzeira': 'vertigem',

  // Sintomas neurológicos
  'dor de cabeça': 'cefaleia',
  'formigamento': 'parestesias',
  'dormência': 'hipoestesia',
  'fraqueza': 'astenia',
  'tremedeira': 'tremores',

  // Sintomas gerais
  'febre': 'febre',
  'calafrio': 'calafrios',
  'cansaço': 'fadiga',
  'moleza': 'astenia',
  'indisposição': 'mal-estar geral',
  'passando mal': 'mal-estar geral',

  // Sintomas urinários
  'dor para urinar': 'disúria',
  'ardência ao urinar': 'disúria',
  'urina escura': 'colúria',
  'sangue na urina': 'hematúria',
  'vontade de urinar toda hora': 'polaciúria',

  // Sintomas musculoesqueléticos
  'dor nas costas': 'lombalgia',
  'dor na coluna': 'dorsalgia',
  'dor no pescoço': 'cervicalgia',
  'dor nas juntas': 'artralgia',
  'inchaço': 'edema',
}

// ============================================================================
// CONCORDÂNCIA DE GÊNERO
// ============================================================================

/**
 * Mapeamento de adjetivos masculinos para femininos
 */
const GENDER_MAP: Record<string, string> = {
  // Estado geral
  'orientado': 'orientada',
  'desorientado': 'desorientada',
  'corado': 'corada',
  'descorado': 'descorada',
  'hidratado': 'hidratada',
  'desidratado': 'desidratada',
  'anictérico': 'anictérica',
  'ictérico': 'ictérica',
  'acianótico': 'acianótica',
  'cianótico': 'cianótica',
  'eupneico': 'eupneica',
  'dispneico': 'dispneica',
  'taquipneico': 'taquipneica',
  'afebril': 'afebril', // neutro
  'febril': 'febril', // neutro

  // Sintomas
  'enjoado': 'enjoada',
  'nauseado': 'nauseada',
  'tonto': 'tonta',
  'cansado': 'cansada',
  'ansioso': 'ansiosa',
  'agitado': 'agitada',
  'calmo': 'calma',
  'sonolento': 'sonolenta',
  'consciente': 'consciente', // neutro
  'inconsciente': 'inconsciente', // neutro

  // Estado clínico
  'estável': 'estável', // neutro
  'instável': 'instável', // neutro
  'grave': 'grave', // neutro
  'crítico': 'crítica',
  'lúcido': 'lúcida',
  'cooperativo': 'cooperativa',
  'sudoreico': 'sudoreica',
  'pálido': 'pálida',
}

/**
 * Transforma adjetivo para concordar com gênero do paciente
 */
export function genderAdjective(word: string, gender: 'M' | 'F'): string {
  if (gender === 'M') return word

  const lowerWord = word.toLowerCase()
  if (GENDER_MAP[lowerWord]) {
    // Preserva capitalização original
    const result = GENDER_MAP[lowerWord]
    if (!word[0]) return result
    return word[0] === word[0].toUpperCase()
      ? result.charAt(0).toUpperCase() + result.slice(1)
      : result
  }

  // Regra genérica para adjetivos terminados em 'o' → 'a'
  if (lowerWord.endsWith('o') && !lowerWord.endsWith('ico')) {
    const result = word.slice(0, -1) + 'a'
    return result
  }

  return word
}

/**
 * Aplica concordância de gênero em uma frase
 */
export function applyGenderConcordance(text: string, gender: 'M' | 'F'): string {
  if (gender === 'M') return text

  let result = text
  for (const [masc, fem] of Object.entries(GENDER_MAP)) {
    // Substitui apenas palavras completas
    const regex = new RegExp(`\\b${masc}\\b`, 'gi')
    result = result.replace(regex, fem)
  }

  return result
}

// ============================================================================
// CONTEXTO DO PACIENTE
// ============================================================================

export type Gender = 'M' | 'F'

export interface PatientContext {
  gender: Gender
  isPediatric: boolean
  age?: string
  phoneNumber?: string
  allergies?: string
  painIntensity?: number // 0-10
  evolutionType?: 'agudo' | 'subagudo' | 'crônico'
  onsetType?: 'súbito' | 'progressivo' | 'insidioso'
}

/**
 * Retorna prefixo de relato baseado em se é pediátrico
 */
export function getRefersPrefix(isPediatric: boolean): string {
  return isPediatric ? 'Acompanhante refere' : 'Refere'
}

/**
 * Transforma escala de dor (0-10) em texto descritivo
 */
export function intensityToText(value: number): string {
  if (value <= 0) return ''
  if (value <= 3) return 'de leve intensidade'
  if (value <= 6) return 'de moderada intensidade'
  return 'de forte intensidade'
}

/**
 * Gera texto de evolução temporal
 */
export function evolutionToText(
  evolutionType?: 'agudo' | 'subagudo' | 'crônico',
  onsetType?: 'súbito' | 'progressivo' | 'insidioso'
): string {
  const parts: string[] = []

  if (evolutionType) {
    parts.push(`de evolução ${evolutionType === 'agudo' ? 'aguda' : evolutionType === 'subagudo' ? 'subaguda' : 'crônica'}`)
  }

  if (onsetType) {
    parts.push(`de início ${onsetType}`)
  }

  return parts.join(' e ')
}

/**
 * Transforma termo leigo em termo técnico
 */
export function leigoToTecnico(term: string): string {
  const lowerTerm = term.toLowerCase()
  return LEIGO_TO_TECNICO[lowerTerm] || term
}

/**
 * Aplica transformações de termos leigos em uma frase
 */
export function applyLeigoTransform(text: string): string {
  let result = text.toLowerCase()

  // Ordena por tamanho decrescente para evitar substituições parciais
  const sortedTerms = Object.entries(LEIGO_TO_TECNICO)
    .sort((a, b) => b[0].length - a[0].length)

  for (const [leigo, tecnico] of sortedTerms) {
    const regex = new RegExp(`\\b${leigo}\\b`, 'gi')
    result = result.replace(regex, tecnico)
  }

  return result
}

// ============================================================================
// FUNÇÕES DE TRANSFORMAÇÃO
// ============================================================================

/**
 * Expande abreviações médicas para formato misto (extenso + sigla)
 */
export function expandMedicalTerm(term: string): string {
  // Verifica se o termo está no dicionário
  if (MEDICAL_TERMS[term]) {
    return MEDICAL_TERMS[term]
  }

  // Procura por termos dentro do texto
  let result = term
  for (const { regex, expanded } of MEDICAL_TERMS_REGEX) {
    result = result.replace(regex, expanded)
  }

  return result
}

/**
 * Transforma displayText em narrativeText técnico
 */
export function toMedicalNarrative(
  displayText: string,
  category: CheckboxCategory,
  isRedFlag: boolean = false
): string {
  // Remove emojis e caracteres especiais do início
  const cleanText = displayText
    .replace(/^⚠️\s*/, '')
    .replace(/^🔴\s*/, '')
    .replace(/^🟡\s*/, '')
    .replace(/^🟠\s*/, '')
    .trim()

  // Se é red flag, usa o mapeamento específico
  if (isRedFlag && RED_FLAG_NARRATIVES[cleanText]) {
    return RED_FLAG_NARRATIVES[cleanText]
  }

  // Verifica mapeamento de sintomas
  if (SYMPTOM_NARRATIVES[cleanText]) {
    return SYMPTOM_NARRATIVES[cleanText]
  }

  // Expande termos médicos
  let narrative = expandMedicalTerm(cleanText)

  // Ajustes por categoria
  switch (category) {
    case 'QP':
      // Queixa principal: lowercase, sem ponto
      narrative = narrative.toLowerCase()
      break

    case 'HDA':
      // HDA: lowercase para sintomas
      narrative = narrative.toLowerCase()
      break

    case 'ANTECEDENTES':
      // Antecedentes: expande e formata
      narrative = narrative.toLowerCase()
      if (!narrative.includes('em tratamento') && !narrative.includes('controlad')) {
        // Adiciona contexto de tratamento se for condição crônica
        if (narrative.includes('hipertensão') || narrative.includes('diabetes') ||
            narrative.includes('dislipidemia') || narrative.includes('hipotireoidismo')) {
          narrative += ' em tratamento'
        }
      }
      break

    case 'NEGATIVAS':
      // Negativas: remove "Nega" do início se presente, lowercase
      narrative = narrative.replace(/^nega\s+/i, '').toLowerCase()
      break

    case 'EXAME_FISICO':
      // Exame físico: mantém capitalização adequada
      narrative = expandPhysicalExamTerm(narrative)
      break

    case 'MEDICACOES':
      // Medicações: mantém como está, apenas expande siglas
      break

    case 'ALERGIAS':
      // Alergias: lowercase
      narrative = narrative.toLowerCase()
      break

    case 'HABITOS':
      // Hábitos: lowercase
      narrative = narrative.toLowerCase()
      break
  }

  return narrative
}

/**
 * Expande termos de exame físico para descrição completa
 */
function expandPhysicalExamTerm(term: string): string {
  const examTerms: Record<string, string> = {
    'REG': 'Regular estado geral',
    'BEG': 'Bom estado geral',
    'MEG': 'Mau estado geral',
    'LOC': 'Lúcido, orientado, cooperativo',
    'LOTE': 'Lúcido, orientado no tempo e espaço',
    'MV+ s/ RA': 'Murmúrio vesicular presente bilateralmente, sem ruídos adventícios',
    'MV+ bilateralmente': 'Murmúrio vesicular presente bilateralmente, sem ruídos adventícios',
    'MV+ bilateral s/ RA': 'Murmúrio vesicular presente bilateralmente, sem ruídos adventícios',
    'RCR 2T BNF SS': 'Ritmo cardíaco regular em dois tempos, bulhas normofonéticas, sem sopros',
    'RCR 2T': 'Ritmo cardíaco regular em dois tempos',
    'RCR 2T SS': 'Ritmo cardíaco regular em dois tempos, sem sopros',
    'RCI': 'Ritmo cardíaco irregular',
    'Abdome flácido': 'Abdome flácido, indolor à palpação, sem visceromegalias',
    'Abdome indolor': 'Abdome flácido, indolor à palpação superficial e profunda',
    'MMII s/ edema': 'Membros inferiores sem edema, pulsos pediosos presentes e simétricos',
    'Pulsos +': 'Pulsos periféricos presentes e simétricos',
    'Glasgow 15': 'Escala de Coma de Glasgow 15 pontos (abertura ocular espontânea, resposta verbal orientada, resposta motora obedece comandos)',
  }

  return examTerms[term] || term
}

/**
 * Gera narrativa completa para uma lista de checkboxes selecionados
 */
export function generateCategoryNarrative(
  items: Array<{ displayText: string; narrativeText?: string; isRedFlag?: boolean }>,
  category: CheckboxCategory
): string {
  if (items.length === 0) return ''

  const template = CATEGORY_TEMPLATES[category]

  // Transforma cada item
  const narratives = items.map(item => {
    // Usa narrativeText se já existir, senão gera
    const text = item.narrativeText || toMedicalNarrative(item.displayText, category, item.isRedFlag)

    // Adiciona prefixo de red flag se necessário
    if (item.isRedFlag && template.redFlagPrefix && category === 'HDA') {
      return template.redFlagPrefix + text
    }

    return text
  })

  // Monta a narrativa final
  if (category === 'NEGATIVAS') {
    // Negativas: "Nega X, Y e Z."
    if (narratives.length === 1) {
      return `${template.prefix}${narratives[0]}${template.suffix}`
    }
    const lastItem = narratives.pop()
    return `${template.prefix}${narratives.join(template.connector)} e ${lastItem}${template.suffix}`
  }

  // Outras categorias: prefixo + items separados + sufixo
  return `${template.prefix}${narratives.join(template.connector)}${template.suffix}`
}

// ============================================================================
// NARRATIVAS COMPLETAS PRÉ-DEFINIDAS POR SINTOMA/ACHADO
// Texto corrido técnico-médico com proteção jurídica implícita
// ============================================================================

export const COMPLETE_NARRATIVES: Record<string, {
  narrative: string
  category: CheckboxCategory
  verb?: keyof typeof CATEGORY_VERBS
}> = {
  // ==================== SINTOMAS GASTROINTESTINAIS (HDA) ====================
  'Náuseas': {
    narrative: 'náuseas de evolução aguda',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Náuseas e vômitos': {
    narrative: 'náuseas e vômitos de evolução subaguda e caráter progressivo',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Vômitos': {
    narrative: 'vômitos de evolução aguda',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor abdominal': {
    narrative: 'dor abdominal difusa',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor abdominal tipo cólica': {
    narrative: 'dor abdominal tipo cólica',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor em epigástrio': {
    narrative: 'dor em região epigástrica',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor em hipocôndrio direito': {
    narrative: 'dor em hipocôndrio direito',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor em fossa ilíaca direita': {
    narrative: 'dor em fossa ilíaca direita',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Irradiação para ombro': {
    narrative: 'com irradiação para região escapular/ombro',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Irradiação para dorso': {
    narrative: 'com irradiação para região dorsal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Padrão contínuo': {
    narrative: 'de padrão contínuo',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Padrão intermitente': {
    narrative: 'de padrão intermitente',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Diarreia': {
    narrative: 'episódios diarreicos',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Constipação': {
    narrative: 'constipação intestinal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Melena': {
    narrative: 'evacuações melênicas',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Hematêmese': {
    narrative: 'episódio de hematêmese',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },

  // ==================== SINTOMAS CARDIOVASCULARES (HDA) ====================
  'Dor torácica': {
    narrative: 'dor torácica',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor precordial': {
    narrative: 'precordialgia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor precordial em aperto': {
    narrative: 'precordialgia em aperto',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Palpitações': {
    narrative: 'palpitações',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Taquicardia': {
    narrative: 'taquicardia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Irradiação para MSE': {
    narrative: 'com irradiação para membro superior esquerdo',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Irradiação para mandíbula': {
    narrative: 'com irradiação para região mandibular',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Sudorese': {
    narrative: 'sudorese profusa',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Sudorese fria': {
    narrative: 'sudorese fria',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Síncope': {
    narrative: 'episódio sincopal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Pré-síncope': {
    narrative: 'episódio pré-sincopal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dispneia': {
    narrative: 'dispneia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dispneia aos esforços': {
    narrative: 'dispneia aos esforços',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dispneia em repouso': {
    narrative: 'dispneia em repouso',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Ortopneia': {
    narrative: 'ortopneia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },

  // ==================== SINTOMAS RESPIRATÓRIOS (HDA) ====================
  'Tosse': {
    narrative: 'tosse',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Tosse seca': {
    narrative: 'tosse seca',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Tosse produtiva': {
    narrative: 'tosse produtiva',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Expectoração': {
    narrative: 'expectoração',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Hemoptise': {
    narrative: 'hemoptise',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Sibilância': {
    narrative: 'sibilância',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },

  // ==================== SINTOMAS NEUROLÓGICOS (HDA) ====================
  'Cefaleia': {
    narrative: 'cefaleia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Cefaleia intensa': {
    narrative: 'cefaleia de forte intensidade',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Cefaleia súbita': {
    narrative: 'cefaleia de início súbito',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Tontura': {
    narrative: 'tontura',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Vertigem': {
    narrative: 'vertigem',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Confusão mental': {
    narrative: 'confusão mental',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Alteração de consciência': {
    narrative: 'alteração do nível de consciência',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Convulsão': {
    narrative: 'crise convulsiva',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Parestesias': {
    narrative: 'parestesias',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Fraqueza muscular': {
    narrative: 'fraqueza muscular',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },

  // ==================== SINTOMAS GERAIS (HDA) ====================
  'Febre': {
    narrative: 'febre',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Calafrios': {
    narrative: 'calafrios',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Mal-estar': {
    narrative: 'mal-estar geral',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Astenia': {
    narrative: 'astenia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Fadiga': {
    narrative: 'fadiga',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Perda de peso': {
    narrative: 'perda ponderal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Hiporexia': {
    narrative: 'hiporexia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },

  // ==================== EXAME FÍSICO - APRESENTA ====================
  'Defesa abdominal': {
    narrative: 'defesa abdominal à palpação',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Rigidez abdominal': {
    narrative: 'rigidez abdominal',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Dor à palpação': {
    narrative: 'dor à palpação',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Abdome distendido': {
    narrative: 'abdome distendido',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Ruídos hidroaéreos aumentados': {
    narrative: 'ruídos hidroaéreos aumentados',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Ruídos hidroaéreos diminuídos': {
    narrative: 'ruídos hidroaéreos diminuídos',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Taquicardia ao exame': {
    narrative: 'taquicardia',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Bradicardia ao exame': {
    narrative: 'bradicardia',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Hipotensão': {
    narrative: 'hipotensão arterial',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Hipertensão': {
    narrative: 'hipertensão arterial',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Taquipneia': {
    narrative: 'taquipneia',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Uso de musculatura acessória': {
    narrative: 'uso de musculatura acessória',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Cianose': {
    narrative: 'cianose',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Palidez cutânea': {
    narrative: 'palidez cutânea',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Icterícia': {
    narrative: 'icterícia',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Edema de membros inferiores': {
    narrative: 'edema de membros inferiores',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Estertores pulmonares': {
    narrative: 'estertores pulmonares',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Sibilos': {
    narrative: 'sibilos à ausculta pulmonar',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },
  'Sopro cardíaco': {
    narrative: 'sopro cardíaco',
    category: 'EXAME_FISICO',
    verb: 'ACHADOS_CLINICOS',
  },

  // ==================== EXAME FÍSICO - EVIDENCIA (Sinais Objetivos) ====================
  'Sinal de Murphy positivo': {
    narrative: 'Sinal de Murphy positivo',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Sinal de Blumberg positivo': {
    narrative: 'Sinal de Blumberg positivo',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Sinal de Rovsing positivo': {
    narrative: 'Sinal de Rovsing positivo',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Sinal de Psoas positivo': {
    narrative: 'Sinal de Psoas positivo',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Sinal de Giordano positivo': {
    narrative: 'Sinal de Giordano positivo',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Rigidez de nuca': {
    narrative: 'rigidez de nuca',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Sinal de Kernig positivo': {
    narrative: 'Sinal de Kernig positivo',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Sinal de Brudzinski positivo': {
    narrative: 'Sinal de Brudzinski positivo',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Déficit neurológico focal': {
    narrative: 'déficit neurológico focal',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Hemiparesia': {
    narrative: 'hemiparesia',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },
  'Abdome em tábua': {
    narrative: 'abdome em tábua',
    category: 'EXAME_FISICO',
    verb: 'SINAIS_OBJETIVOS',
  },

  // ==================== ANTECEDENTES - HISTÓRIA DE ====================
  'Trauma recente': {
    narrative: 'associação com evento traumático',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Cirurgia abdominal prévia': {
    narrative: 'cirurgia abdominal prévia',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Cirurgia cardíaca prévia': {
    narrative: 'cirurgia cardíaca prévia',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'IAM prévio': {
    narrative: 'infarto agudo do miocárdio prévio',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'AVC prévio': {
    narrative: 'acidente vascular cerebral prévio',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'HAS': {
    narrative: 'hipertensão arterial sistêmica em tratamento',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'DM2': {
    narrative: 'diabetes mellitus tipo 2',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Dislipidemia': {
    narrative: 'dislipidemia em tratamento',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Tabagismo': {
    narrative: 'tabagismo ativo',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Ex-tabagista': {
    narrative: 'ex-tabagismo',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Etilismo': {
    narrative: 'etilismo',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Obesidade': {
    narrative: 'obesidade',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'DPOC': {
    narrative: 'doença pulmonar obstrutiva crônica',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Asma': {
    narrative: 'asma brônquica',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'IRC': {
    narrative: 'insuficiência renal crônica',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'ICC': {
    narrative: 'insuficiência cardíaca congestiva',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Fibrilação atrial': {
    narrative: 'fibrilação atrial',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Neoplasia': {
    narrative: 'neoplasia',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Coagulopatia': {
    narrative: 'coagulopatia',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },
  'Uso de anticoagulantes': {
    narrative: 'uso de anticoagulantes',
    category: 'ANTECEDENTES',
    verb: 'ANTECEDENTES',
  },

  // ==================== NEGATIVAS PERTINENTES ====================
  'Nega febre': {
    narrative: 'febre',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega náuseas': {
    narrative: 'náuseas ou vômitos',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega vômitos': {
    narrative: 'vômitos',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega diarreia': {
    narrative: 'diarreia',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega dispneia': {
    narrative: 'dispneia',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega síncope': {
    narrative: 'episódios sincopais',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega alteração de consciência': {
    narrative: 'alteração do nível de consciência',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega dor torácica': {
    narrative: 'dor torácica',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega palpitações': {
    narrative: 'palpitações',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega tosse': {
    narrative: 'tosse',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega cefaleia': {
    narrative: 'cefaleia',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega trauma': {
    narrative: 'trauma recente',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega alergias': {
    narrative: 'alergias medicamentosas conhecidas',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega uso de medicações': {
    narrative: 'uso de medicações de uso contínuo',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega internações prévias': {
    narrative: 'internações hospitalares prévias',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },
  'Nega cirurgias prévias': {
    narrative: 'cirurgias prévias',
    category: 'NEGATIVAS',
    verb: 'NEGATIVAS',
  },

  // ==================== SINTOMAS ADICIONAIS (HDA) ====================
  'Amnésia do evento': {
    narrative: 'amnésia para o evento',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Ansiedade': {
    narrative: 'quadro de ansiedade',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Calor local': {
    narrative: 'calor local à palpação',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Cefaleia pós-trauma': {
    narrative: 'cefaleia pós-traumática',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Claudicação': {
    narrative: 'claudicação intermitente',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Confusão pós-ictal': {
    narrative: 'confusão pós-ictal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Congestão nasal': {
    narrative: 'congestão nasal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Crepitação': {
    narrative: 'crepitação à palpação',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Cólicas abdominais': {
    narrative: 'cólicas abdominais',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Deformidade': {
    narrative: 'deformidade visível',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Desidratação': {
    narrative: 'sinais de desidratação',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dificuldade de fala': {
    narrative: 'dificuldade de fala (disfasia/disartria)',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Distensão abdominal': {
    narrative: 'distensão abdominal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Disúria': {
    narrative: 'disúria',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor ao movimento': {
    narrative: 'dor ao movimento',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor ao respirar profundo': {
    narrative: 'dor ventilatório-dependente',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor de garganta': {
    narrative: 'odinofagia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor intensa localizada': {
    narrative: 'dor intensa e localizada',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor lombar intensa em cólica': {
    narrative: 'dor lombar intensa de caráter cólico',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor no peito': {
    narrative: 'precordialgia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Dor suprapúbica': {
    narrative: 'dor suprapúbica',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Edema': {
    narrative: 'edema',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Edema articular': {
    narrative: 'edema articular',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Espuma na boca': {
    narrative: 'sialorreia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Febre (se pielonefrite)': {
    narrative: 'febre sugestiva de pielonefrite',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Febre ou hipotermia': {
    narrative: 'febre ou hipotermia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Fraqueza': {
    narrative: 'fraqueza',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Hematoma': {
    narrative: 'hematoma',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Hematúria': {
    narrative: 'hematúria',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Incapacidade funcional': {
    narrative: 'incapacidade funcional',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Inchaço na parede torácica': {
    narrative: 'edema em parede torácica',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Incontinência urinária/fecal': {
    narrative: 'incontinência esfincteriana',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Inquietação (não consegue ficar parado)': {
    narrative: 'inquietação psicomotora',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Irradiação para flanco e região inguinal': {
    narrative: 'com irradiação para flanco e região inguinal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Irradiação para membros inferiores': {
    narrative: 'com irradiação para membros inferiores',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Irritabilidade': {
    narrative: 'irritabilidade',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Limitação de movimento': {
    narrative: 'limitação de amplitude de movimento',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Limitação de movimentos': {
    narrative: 'limitação de amplitude de movimentos',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Mialgia': {
    narrative: 'mialgia',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Náusea': {
    narrative: 'náuseas',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Náusea e vômitos': {
    narrative: 'náuseas e vômitos',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Oligúria': {
    narrative: 'oligúria',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Palidez': {
    narrative: 'palidez cutânea',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Parada de evacuação': {
    narrative: 'parada de eliminação de fezes e gases',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Pele moteada': {
    narrative: 'pele moteada (livedo)',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Perda de consciência': {
    narrative: 'perda de consciência',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Perda de visão': {
    narrative: 'alteração visual aguda',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Polaciúria (urinar frequente)': {
    narrative: 'polaciúria',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Rigidez': {
    narrative: 'rigidez',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Rigidez matinal': {
    narrative: 'rigidez matinal',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Tenesmo': {
    narrative: 'tenesmo',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Tremor': {
    narrative: 'tremores',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Urgência miccional': {
    narrative: 'urgência miccional',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
  'Urina turva ou com odor forte': {
    narrative: 'urina turva ou com odor fétido',
    category: 'HDA',
    verb: 'SINTOMAS_RELATADOS',
  },
}

/**
 * Obtém a narrativa completa pré-definida para um sintoma/achado
 */
export function getCompleteNarrative(displayText: string): {
  narrative: string
  category: CheckboxCategory
  verb: string
} | null {
  const entry = COMPLETE_NARRATIVES[displayText]
  if (!entry) return null

  const verbKey = entry.verb || 'SINTOMAS_RELATADOS'
  return {
    narrative: entry.narrative,
    category: entry.category,
    verb: CATEGORY_VERBS[verbKey],
  }
}

/**
 * Constrói narrativa completa para um checkbox com base no displayText
 * Usa narrativas pré-definidas quando disponíveis
 */
export function buildNarrativeText(
  displayText: string,
  category: CheckboxCategory,
  isRedFlag: boolean = false
): string {
  // Primeiro tenta usar narrativa completa pré-definida
  const complete = COMPLETE_NARRATIVES[displayText]
  if (complete) {
    return complete.narrative
  }

  // Fallback para a lógica existente
  return toMedicalNarrative(displayText, category, isRedFlag)
}

// ============================================================================
// FIM DO ARQUIVO
// ============================================================================
