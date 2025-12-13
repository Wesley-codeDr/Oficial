/**
 * Calculadoras de Tromboembolismo Venoso
 *
 * Inclui:
 * - Wells Score para TVP
 * - PERC Rule para EP
 * - Caprini Score para TEV cirúrgico
 *
 * Referências:
 * - Wells PS, et al. Lancet. 1997 (Wells TVP)
 * - Kline JA, et al. J Thromb Haemost. 2004 (PERC)
 * - Caprini JA. Dis Mon. 2005
 */

import { Reference, RiskLevel } from './types'

const REFERENCES: Reference[] = [
  {
    source: 'Lancet',
    title: 'Value of assessment of pretest probability of deep-vein thrombosis in clinical management',
    year: 1997,
    evidenceLevel: '1A',
  },
  {
    source: 'J Thromb Haemost',
    title: 'Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism',
    year: 2004,
    evidenceLevel: '1A',
  },
  {
    source: 'Dis Mon',
    title: 'Thrombosis risk assessment as a guide to quality patient care',
    year: 2005,
    evidenceLevel: '1B',
  },
]

// ============================================
// WELLS SCORE PARA TVP
// ============================================

export interface WellsDvtInput {
  activeCancer: boolean // 1 ponto
  paralysisOrImmobilization: boolean // 1 ponto
  bedridden3Days: boolean // 1 ponto
  localizedTenderness: boolean // 1 ponto
  entireLegSwollen: boolean // 1 ponto
  calfSwelling3cm: boolean // 1 ponto
  pittingEdema: boolean // 1 ponto
  collateralSuperficialVeins: boolean // 1 ponto
  previousDvt: boolean // 1 ponto
  alternativeDiagnosisLikely: boolean // -2 pontos
}

export interface WellsDvtResult {
  score: number
  probability: 'low' | 'moderate' | 'high'
  dvtPrevalence: string
  riskLevel: RiskLevel
  interpretation: string
  recommendation: string
  nextStep: string
  references: Reference[]
}

/**
 * Calcula o Wells Score para Trombose Venosa Profunda
 */
export function calculateWellsDvt(input: WellsDvtInput): WellsDvtResult {
  let score = 0

  if (input.activeCancer) score += 1
  if (input.paralysisOrImmobilization) score += 1
  if (input.bedridden3Days) score += 1
  if (input.localizedTenderness) score += 1
  if (input.entireLegSwollen) score += 1
  if (input.calfSwelling3cm) score += 1
  if (input.pittingEdema) score += 1
  if (input.collateralSuperficialVeins) score += 1
  if (input.previousDvt) score += 1
  if (input.alternativeDiagnosisLikely) score -= 2

  let probability: 'low' | 'moderate' | 'high'
  let dvtPrevalence: string
  let riskLevel: RiskLevel
  let interpretation: string
  let recommendation: string
  let nextStep: string

  if (score <= 0) {
    probability = 'low'
    dvtPrevalence = '5%'
    riskLevel = 'low'
    interpretation = 'Wells ≤ 0 - TVP IMPROVÁVEL'
    recommendation =
      'Baixa probabilidade de TVP:\\n' +
      '• Solicitar D-dímero de alta sensibilidade\\n' +
      '• Se D-dímero negativo: TVP excluída\\n' +
      '• Se D-dímero positivo: realizar US Doppler'
    nextStep = 'D-dímero'
  } else if (score <= 2) {
    probability = 'moderate'
    dvtPrevalence = '17%'
    riskLevel = 'moderate'
    interpretation = 'Wells 1-2 - Probabilidade intermediária'
    recommendation =
      'Probabilidade moderada de TVP:\\n' +
      '• D-dímero de alta sensibilidade OU US Doppler direto\\n' +
      '• Se D-dímero negativo: TVP improvável\\n' +
      '• Se D-dímero positivo: US Doppler indicado\\n' +
      '• Considerar US seriado se alta suspeita clínica'
    nextStep = 'D-dímero ou US Doppler'
  } else {
    probability = 'high'
    dvtPrevalence = '53%'
    riskLevel = 'high'
    interpretation = 'Wells ≥ 3 - TVP PROVÁVEL'
    recommendation =
      'Alta probabilidade de TVP:\\n' +
      '• US Doppler indicado diretamente\\n' +
      '• NÃO usar D-dímero para excluir\\n' +
      '• Considerar anticoagulação empírica enquanto aguarda US\\n' +
      '• Se US negativo + alta suspeita: repetir em 1 semana'
    nextStep = 'US Doppler venoso'
  }

  return {
    score,
    probability,
    dvtPrevalence,
    riskLevel,
    interpretation,
    recommendation,
    nextStep,
    references: REFERENCES,
  }
}

// ============================================
// PERC RULE PARA EP
// ============================================

export interface PercInput {
  age50: boolean // ≥ 50 anos
  heartRate100: boolean // ≥ 100 bpm
  oxygenSaturation95: boolean // < 95% em ar ambiente
  hemoptysis: boolean
  estrogenUse: boolean // pílula, TRH, gravidez
  previousDvtOrPe: boolean
  unilateralLegSwelling: boolean
  recentSurgeryOrTrauma: boolean // últimas 4 semanas
}

export interface PercResult {
  allCriteriaNegative: boolean
  criteriaPresent: string[]
  interpretation: string
  riskLevel: RiskLevel
  recommendation: string
  references: Reference[]
}

/**
 * Aplica a Regra PERC para Embolia Pulmonar
 * Se TODOS os critérios são negativos E probabilidade pré-teste ≤15%,
 * EP pode ser descartada sem D-dímero
 */
export function applyPercRule(input: PercInput): PercResult {
  const criteriaPresent: string[] = []

  if (input.age50) criteriaPresent.push('Idade ≥ 50 anos')
  if (input.heartRate100) criteriaPresent.push('FC ≥ 100 bpm')
  if (input.oxygenSaturation95) criteriaPresent.push('SatO2 < 95%')
  if (input.hemoptysis) criteriaPresent.push('Hemoptise')
  if (input.estrogenUse) criteriaPresent.push('Uso de estrogênio')
  if (input.previousDvtOrPe) criteriaPresent.push('TVP/EP prévia')
  if (input.unilateralLegSwelling) criteriaPresent.push('Edema unilateral de perna')
  if (input.recentSurgeryOrTrauma) criteriaPresent.push('Cirurgia/Trauma recente')

  const allCriteriaNegative = criteriaPresent.length === 0

  let interpretation: string
  let riskLevel: RiskLevel
  let recommendation: string

  if (allCriteriaNegative) {
    interpretation = 'PERC negativo - Todos os critérios ausentes'
    riskLevel = 'low'
    recommendation =
      'SE probabilidade pré-teste ≤ 15%:\\n' +
      '• EP pode ser descartada SEM D-dímero\\n' +
      '• Risco de EP < 2%\\n' +
      '• Investigar diagnósticos alternativos\\n\\n' +
      'SE probabilidade pré-teste > 15%:\\n' +
      '• PERC não se aplica\\n' +
      '• Prosseguir com D-dímero ou imagem'
  } else {
    interpretation = `PERC positivo - ${criteriaPresent.length} critério(s) presente(s)`
    riskLevel = 'moderate'
    recommendation =
      'PERC positivo - EP não pode ser descartada:\\n' +
      '• Prosseguir com D-dímero de alta sensibilidade\\n' +
      '• Se D-dímero negativo: EP improvável\\n' +
      '• Se D-dímero positivo: AngioTC indicada\\n\\n' +
      'Critérios presentes: ' + criteriaPresent.join(', ')
  }

  return {
    allCriteriaNegative,
    criteriaPresent,
    interpretation,
    riskLevel,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// CAPRINI SCORE PARA TEV CIRÚRGICO
// ============================================

export interface CapriniInput {
  // 1 ponto cada
  age41_60: boolean
  minorSurgery: boolean
  bmi25: boolean
  swollenLegs: boolean
  varicoseVeins: boolean
  pregnancy: boolean
  historyOfMiscarriage: boolean
  oralContraceptives: boolean
  sepsis: boolean
  seriousLungDisease: boolean
  abnormalPulmonaryFunction: boolean
  acuteMi: boolean
  chf: boolean
  ibd: boolean
  medicalPatientBedRest: boolean

  // 2 pontos cada
  age61_74: boolean
  arthroscopicSurgery: boolean
  majorSurgery45Min: boolean
  laparoscopicSurgery45Min: boolean
  malignancy: boolean
  confinedBedrest72h: boolean
  immobilizingCast: boolean
  centralVenousAccess: boolean

  // 3 pontos cada
  age75: boolean
  historyOfDvtPe: boolean
  familyHistoryThrombophilia: boolean
  factorVLeiden: boolean
  prothrombinMutation: boolean
  lupusAnticoagulant: boolean
  anticardiolipinAntibodies: boolean
  elevatedHomocysteine: boolean
  heparin_inducedThrombocytopenia: boolean
  otherThrombophilia: boolean

  // 5 pontos cada
  stroke: boolean
  elective_lowerExtremityArthroplasty: boolean
  hipPelvisFracture: boolean
  acuteSpinalCordInjury: boolean
}

export interface CapriniResult {
  score: number
  riskLevel: RiskLevel
  tevRisk: string
  interpretation: string
  recommendation: string
  references: Reference[]
}

/**
 * Calcula o Caprini Score para TEV em pacientes cirúrgicos
 */
export function calculateCaprini(input: CapriniInput): CapriniResult {
  let score = 0

  // 1 ponto
  if (input.age41_60) score += 1
  if (input.minorSurgery) score += 1
  if (input.bmi25) score += 1
  if (input.swollenLegs) score += 1
  if (input.varicoseVeins) score += 1
  if (input.pregnancy) score += 1
  if (input.historyOfMiscarriage) score += 1
  if (input.oralContraceptives) score += 1
  if (input.sepsis) score += 1
  if (input.seriousLungDisease) score += 1
  if (input.abnormalPulmonaryFunction) score += 1
  if (input.acuteMi) score += 1
  if (input.chf) score += 1
  if (input.ibd) score += 1
  if (input.medicalPatientBedRest) score += 1

  // 2 pontos
  if (input.age61_74) score += 2
  if (input.arthroscopicSurgery) score += 2
  if (input.majorSurgery45Min) score += 2
  if (input.laparoscopicSurgery45Min) score += 2
  if (input.malignancy) score += 2
  if (input.confinedBedrest72h) score += 2
  if (input.immobilizingCast) score += 2
  if (input.centralVenousAccess) score += 2

  // 3 pontos
  if (input.age75) score += 3
  if (input.historyOfDvtPe) score += 3
  if (input.familyHistoryThrombophilia) score += 3
  if (input.factorVLeiden) score += 3
  if (input.prothrombinMutation) score += 3
  if (input.lupusAnticoagulant) score += 3
  if (input.anticardiolipinAntibodies) score += 3
  if (input.elevatedHomocysteine) score += 3
  if (input.heparin_inducedThrombocytopenia) score += 3
  if (input.otherThrombophilia) score += 3

  // 5 pontos
  if (input.stroke) score += 5
  if (input.elective_lowerExtremityArthroplasty) score += 5
  if (input.hipPelvisFracture) score += 5
  if (input.acuteSpinalCordInjury) score += 5

  let riskLevel: RiskLevel
  let tevRisk: string
  let interpretation: string
  let recommendation: string

  if (score <= 1) {
    riskLevel = 'low'
    tevRisk = '< 0.5%'
    interpretation = 'Caprini 0-1 - Risco muito baixo de TEV'
    recommendation =
      'RISCO MUITO BAIXO:\\n' +
      '• Deambulação precoce\\n' +
      '• Meias de compressão opcional\\n' +
      '• Profilaxia farmacológica geralmente não indicada'
  } else if (score === 2) {
    riskLevel = 'low'
    tevRisk = '1.5%'
    interpretation = 'Caprini 2 - Risco baixo de TEV'
    recommendation =
      'RISCO BAIXO:\\n' +
      '• Compressão pneumática intermitente (CPI)\\n' +
      '• Deambulação precoce\\n' +
      '• Considerar profilaxia farmacológica'
  } else if (score <= 4) {
    riskLevel = 'moderate'
    tevRisk = '3%'
    interpretation = 'Caprini 3-4 - Risco moderado de TEV'
    recommendation =
      'RISCO MODERADO:\\n' +
      '• CPI OU profilaxia farmacológica\\n' +
      '• Considerar HBPM (enoxaparina 40mg/dia)\\n' +
      '• Deambulação precoce'
  } else {
    riskLevel = 'high'
    tevRisk = '6-8%'
    interpretation = `Caprini ≥ 5 (${score}) - Risco alto de TEV`
    recommendation =
      'RISCO ALTO:\\n' +
      '• Profilaxia farmacológica + CPI\\n' +
      '• HBPM: enoxaparina 40mg 1x/dia\\n' +
      '• Ou HNF 5000 UI 8/8h\\n' +
      '• Duração estendida (até 4 semanas) em cirurgia oncológica\\n' +
      '• Considerar filtro de VCI se contraindicação a anticoagulação'
  }

  return {
    score,
    riskLevel,
    tevRisk,
    interpretation,
    recommendation,
    references: REFERENCES,
  }
}

// ============================================
// CRITÉRIOS DESCRITIVOS
// ============================================

export const WELLS_DVT_CRITERIA = {
  activeCancer: {
    label: 'Câncer ativo',
    description: 'Tratamento em curso, nos últimos 6 meses, ou paliativo',
    points: 1,
  },
  paralysisOrImmobilization: {
    label: 'Paralisia/paresia ou imobilização recente',
    description: 'Imobilização de membro inferior',
    points: 1,
  },
  bedridden3Days: {
    label: 'Acamado > 3 dias ou cirurgia maior nas últimas 12 semanas',
    points: 1,
  },
  localizedTenderness: {
    label: 'Dor à palpação no trajeto venoso profundo',
    points: 1,
  },
  entireLegSwollen: {
    label: 'Edema de toda a perna',
    points: 1,
  },
  calfSwelling3cm: {
    label: 'Edema de panturrilha > 3 cm (comparado ao lado assintomático)',
    points: 1,
  },
  pittingEdema: {
    label: 'Edema depressível (cacifo)',
    description: 'Maior no lado sintomático',
    points: 1,
  },
  collateralSuperficialVeins: {
    label: 'Veias colaterais superficiais não varicosas',
    points: 1,
  },
  previousDvt: {
    label: 'TVP prévia documentada',
    points: 1,
  },
  alternativeDiagnosisLikely: {
    label: 'Diagnóstico alternativo mais provável que TVP',
    points: -2,
  },
}

export const PERC_CRITERIA = {
  age50: { label: 'Idade ≥ 50 anos' },
  heartRate100: { label: 'Frequência cardíaca ≥ 100 bpm' },
  oxygenSaturation95: { label: 'SatO2 < 95% em ar ambiente' },
  hemoptysis: { label: 'Hemoptise' },
  estrogenUse: { label: 'Uso de estrogênio (pílula, TRH, gravidez)' },
  previousDvtOrPe: { label: 'TVP ou EP prévia' },
  unilateralLegSwelling: { label: 'Edema unilateral de perna' },
  recentSurgeryOrTrauma: { label: 'Cirurgia ou trauma nas últimas 4 semanas' },
}

// ============================================
// METADADOS
// ============================================

export const wellsDvtMetadata = {
  id: 'wells-dvt',
  name: 'Wells Score para TVP',
  description:
    'Estratificação de probabilidade pré-teste para Trombose Venosa Profunda.',
  category: 'cardiovascular' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}

export const percMetadata = {
  id: 'perc',
  name: 'Regra PERC para EP',
  description:
    'Descarta EP em pacientes de baixo risco sem necessidade de D-dímero.',
  category: 'respiratory' as const,
  syndromeIds: ['dispneia'],
  references: REFERENCES,
  version: '1.0.0',
}

export const capriniMetadata = {
  id: 'caprini',
  name: 'Caprini Score para TEV',
  description:
    'Estratifica risco de TEV em pacientes cirúrgicos para orientar profilaxia.',
  category: 'general' as const,
  syndromeIds: [],
  references: REFERENCES,
  version: '1.0.0',
}
