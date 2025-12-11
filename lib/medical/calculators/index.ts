/**
 * Calculadoras Médicas - WellWave
 *
 * Conjunto completo de 30+ calculadoras clínicas baseadas em evidências
 * para suporte à decisão médica no pronto-socorro.
 *
 * Baseado nas calculadoras mais populares do MDCalc.
 *
 * Diretrizes seguidas:
 * - SBC (Sociedade Brasileira de Cardiologia)
 * - AHA/ACC (American Heart Association)
 * - ESC (European Society of Cardiology)
 * - ABRAMEDE (Associação Brasileira de Medicina de Emergência)
 * - Surviving Sepsis Campaign
 * - British Thoracic Society
 * - Royal College of Physicians
 * - KDIGO (Kidney Disease)
 */

// ============================================
// TYPES
// ============================================
export * from './types'

// ============================================
// CARDIOVASCULAR
// ============================================

// HEART Score - Dor torácica
export {
  calculateHeartScore,
  heartScoreMetadata,
} from './heart-score'

// CHA2DS2-VASc - Risco de AVC em FA
export {
  calculateCha2ds2Vasc,
  cha2ds2VascMetadata,
  CHA2DS2_VASC_CRITERIA,
  DOAC_OPTIONS,
} from './cha2ds2-vasc'

// HAS-BLED - Risco de sangramento
export {
  calculateHasBled,
  hasBledMetadata,
  HAS_BLED_CRITERIA,
  MODIFIABLE_FACTORS,
  evaluateAnticoagulationDecision,
} from './has-bled'

// Cardiovasculares adicionais (PAM, QTc, RCRI, ASCVD)
export {
  calculateMap,
  calculateQtc,
  calculateRcri,
  calculateAscvdRisk,
  mapMetadata,
  qtcMetadata,
  rcriMetadata,
  ascvdMetadata,
  type MapInput,
  type MapResult,
  type QtcInput,
  type QtcResult,
  type RcriInput,
  type RcriResult,
  type AscvdInput,
  type AscvdResult,
} from './cardiovascular'

// ============================================
// NEUROLÓGICO
// ============================================

// Glasgow Coma Scale - Nível de consciência
export {
  calculateGlasgow,
  glasgowMetadata,
  GLASGOW_DESCRIPTIONS,
  getComponentDescription,
  formatGlasgowScore,
} from './glasgow'

// NIHSS - Déficit neurológico em AVC
export {
  calculateNihss,
  nihssMetadata,
  NIHSS_COMPONENTS,
} from './nihss'

// ============================================
// RESPIRATÓRIO / PULMONAR
// ============================================

// Wells PE - Tromboembolismo Pulmonar
export {
  calculateWellsPe,
  calculateWellsPeSimplified,
  wellsPeMetadata,
  WELLS_PE_CRITERIA,
} from './wells-pe'

// CURB-65 - Pneumonia Adquirida na Comunidade
export {
  calculateCurb65,
  calculateCrb65,
  getCurb65Recommendation,
  curb65Metadata,
  CURB65_CRITERIA,
} from './curb65'

// ============================================
// SEPSE / INFECÇÃO
// ============================================

// qSOFA - Triagem rápida para sepse
export {
  calculateQsofa,
  qsofaMetadata,
  QSOFA_CRITERIA,
} from './qsofa'

// NEWS2 - Alerta precoce de deterioração
export {
  calculateNews2,
  news2Metadata,
  NEWS2_PARAMETERS,
} from './news2'

// ============================================
// ABDOMINAL / HEPÁTICO
// ============================================

// Alvarado Score - Apendicite
export {
  calculateAlvarado,
  alvaradoMetadata,
  ALVARADO_CRITERIA,
  DIFFERENTIAL_DIAGNOSES,
} from './alvarado'

// Hepáticas (FIB-4, Child-Pugh, MELD)
export {
  calculateFib4,
  calculateChildPugh,
  calculateMeld,
  fib4Metadata,
  childPughMetadata,
  meldMetadata,
  CHILD_PUGH_CRITERIA,
  type Fib4Input,
  type Fib4Result,
  type ChildPughInput,
  type ChildPughResult,
  type MeldInput,
  type MeldResult,
} from './hepatic'

// ============================================
// RENAL
// ============================================

export {
  calculateCockcroftGault,
  calculateCkdEpi2021,
  calculateMdrd,
  cockcroftGaultMetadata,
  ckdEpi2021Metadata,
  mdrdMetadata,
  type RenalInput,
  type RenalResult,
} from './renal'

// ============================================
// METABÓLICO / ANTROPOMÉTRICO
// ============================================

export {
  calculateBmi,
  calculateIdealWeight,
  correctCalciumForAlbumin,
  correctSodiumForGlucose,
  calculateLdl,
  calculateMaintenanceFluids,
  convertSteroidDose,
  bmiMetadata,
  idealWeightMetadata,
  calciumCorrectionMetadata,
  sodiumCorrectionMetadata,
  ldlMetadata,
  maintenanceFluidsMetadata,
  steroidConversionMetadata,
  type BmiInput,
  type BmiResult,
  type IdealWeightInput,
  type IdealWeightResult,
  type CalciumCorrectionInput,
  type CalciumCorrectionResult,
  type SodiumCorrectionInput,
  type SodiumCorrectionResult,
  type LdlInput,
  type LdlResult,
  type MaintenanceFluidsInput,
  type MaintenanceFluidsResult,
  type SteroidConversionInput,
  type SteroidConversionResult,
} from './metabolic'

// ============================================
// TROMBOSE / TEV
// ============================================

export {
  calculateWellsDvt,
  applyPercRule,
  calculateCaprini,
  wellsDvtMetadata,
  percMetadata,
  capriniMetadata,
  WELLS_DVT_CRITERIA,
  PERC_CRITERIA,
  type WellsDvtInput,
  type WellsDvtResult,
  type PercInput,
  type PercResult,
  type CapriniInput,
  type CapriniResult,
} from './thrombosis'

// ============================================
// DIVERSOS (STOP-BANG, PHQ-9, Centor, etc.)
// ============================================

export {
  calculateStopBang,
  calculatePhq9,
  calculateCentor,
  calculatePregnancyDates,
  stopBangMetadata,
  phq9Metadata,
  centorMetadata,
  pregnancyDatesMetadata,
  STOP_BANG_CRITERIA,
  PHQ9_QUESTIONS,
  PHQ9_OPTIONS,
  CENTOR_CRITERIA,
  type StopBangInput,
  type StopBangResult,
  type Phq9Input,
  type Phq9Result,
  type CentorInput,
  type CentorResult,
  type PregnancyDateInput,
  type PregnancyDateResult,
} from './misc'

// ============================================
// REGISTRY - Todas as calculadoras
// ============================================

import { heartScoreMetadata } from './heart-score'
import { glasgowMetadata } from './glasgow'
import { qsofaMetadata } from './qsofa'
import { wellsPeMetadata } from './wells-pe'
import { nihssMetadata } from './nihss'
import { news2Metadata } from './news2'
import { alvaradoMetadata } from './alvarado'
import { curb65Metadata } from './curb65'
import { cha2ds2VascMetadata } from './cha2ds2-vasc'
import { hasBledMetadata } from './has-bled'
import { mapMetadata, qtcMetadata, rcriMetadata, ascvdMetadata } from './cardiovascular'
import { fib4Metadata, childPughMetadata, meldMetadata } from './hepatic'
import { cockcroftGaultMetadata, ckdEpi2021Metadata, mdrdMetadata } from './renal'
import {
  bmiMetadata,
  idealWeightMetadata,
  calciumCorrectionMetadata,
  sodiumCorrectionMetadata,
  ldlMetadata,
  maintenanceFluidsMetadata,
  steroidConversionMetadata,
} from './metabolic'
import { wellsDvtMetadata, percMetadata, capriniMetadata } from './thrombosis'
import { stopBangMetadata, phq9Metadata, centorMetadata, pregnancyDatesMetadata } from './misc'
import type { CalculatorMetadata, CalculatorCategory } from './types'

/**
 * Registro de todas as calculadoras disponíveis (30+)
 */
export const CALCULATOR_REGISTRY: CalculatorMetadata[] = [
  // Cardiovascular (8)
  heartScoreMetadata,
  cha2ds2VascMetadata,
  hasBledMetadata,
  mapMetadata,
  qtcMetadata,
  rcriMetadata,
  ascvdMetadata,
  ldlMetadata,

  // Neurológico (2)
  glasgowMetadata,
  nihssMetadata,

  // Respiratório (4)
  wellsPeMetadata,
  curb65Metadata,
  percMetadata,
  stopBangMetadata,

  // Sepse (2)
  qsofaMetadata,
  news2Metadata,

  // Abdominal/Hepático (4)
  alvaradoMetadata,
  fib4Metadata,
  childPughMetadata,
  meldMetadata,

  // Renal (3)
  cockcroftGaultMetadata,
  ckdEpi2021Metadata,
  mdrdMetadata,

  // Trombose (3)
  wellsDvtMetadata,
  capriniMetadata,

  // Metabólico (5)
  bmiMetadata,
  idealWeightMetadata,
  calciumCorrectionMetadata,
  sodiumCorrectionMetadata,
  maintenanceFluidsMetadata,

  // Diversos (4)
  steroidConversionMetadata,
  phq9Metadata,
  centorMetadata,
  pregnancyDatesMetadata,
]

/**
 * Busca calculadoras por categoria
 */
export function getCalculatorsByCategory(
  category: CalculatorCategory
): CalculatorMetadata[] {
  return CALCULATOR_REGISTRY.filter(calc => calc.category === category)
}

/**
 * Busca calculadoras associadas a uma síndrome
 */
export function getCalculatorsBySyndrome(
  syndromeId: string
): CalculatorMetadata[] {
  return CALCULATOR_REGISTRY.filter(calc =>
    calc.syndromeIds.includes(syndromeId)
  )
}

/**
 * Busca calculadora por ID
 */
export function getCalculatorById(
  id: string
): CalculatorMetadata | undefined {
  return CALCULATOR_REGISTRY.find(calc => calc.id === id)
}

/**
 * Conta total de calculadoras
 */
export function getCalculatorCount(): number {
  return CALCULATOR_REGISTRY.length
}

/**
 * Categorias disponíveis com descrições
 */
export const CALCULATOR_CATEGORIES: Record<CalculatorCategory, {
  label: string
  description: string
  icon: string
}> = {
  cardiovascular: {
    label: 'Cardiovascular',
    description: 'Dor torácica, SCA, FA, risco cardíaco, QTc',
    icon: 'heart',
  },
  neurological: {
    label: 'Neurológico',
    description: 'AVC, TCE, alteração de consciência',
    icon: 'brain',
  },
  respiratory: {
    label: 'Respiratório',
    description: 'Dispneia, TEP, pneumonia, apneia do sono',
    icon: 'wind',
  },
  abdominal: {
    label: 'Abdominal / Hepático',
    description: 'Dor abdominal, apendicite, cirrose, fibrose',
    icon: 'stethoscope',
  },
  trauma: {
    label: 'Trauma',
    description: 'Traumatismos, quedas',
    icon: 'bone',
  },
  sepsis: {
    label: 'Sepse',
    description: 'Infecção, sepse, choque séptico',
    icon: 'thermometer',
  },
  general: {
    label: 'Geral / Metabólico',
    description: 'TFG, IMC, fluidos, esteroides, depressão',
    icon: 'activity',
  },
}

/**
 * Mapeamento síndrome → calculadoras recomendadas
 */
export const SYNDROME_CALCULATOR_MAP: Record<string, string[]> = {
  dor_toracica: ['heart-score', 'cha2ds2-vasc', 'has-bled', 'qtc', 'ascvd-risk', 'ldl-calculated'],
  neuro_deficit: ['nihss', 'glasgow'],
  dispneia: ['wells-pe', 'perc', 'curb-65', 'qsofa', 'news2', 'stop-bang'],
  sincope: ['cha2ds2-vasc', 'glasgow', 'qtc'],
  dor_abdominal: ['alvarado', 'fib-4', 'child-pugh', 'meld'],
  febre: ['qsofa', 'news2', 'curb-65', 'centor-mcisaac'],
  trauma: ['glasgow', 'caprini'],
  cefaleia: ['nihss', 'glasgow'],
  psiquiatria: ['phq-9'],
}

/**
 * Lista de todas as calculadoras com informações resumidas
 */
export function listAllCalculators(): { id: string; name: string; category: string }[] {
  return CALCULATOR_REGISTRY.map(calc => ({
    id: calc.id,
    name: calc.name,
    category: calc.category,
  }))
}
