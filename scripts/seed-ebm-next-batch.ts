#!/usr/bin/env tsx
/**
 * Seed EBM Content para Próximas 17 High-Acuity Complaints
 *
 * Expande cobertura EBM de 6% para 42% dos complaints high-acuity
 * Baseado na lista gerada por identify-next-ebm-targets.ts
 *
 * Queixas:
 * - Cardiovascular (3): Síncope, Crise Hipertensiva, Edema Agudo de Pulmão
 * - Respiratório (3): Dispneia Crônica Exacerbada, Hemoptise, Insuficiência Respiratória
 * - Neurológico (4): AVC, Alteração de Consciência, Convulsão, Fraqueza Focal
 * - Gastrointestinal (3): Dor Abdominal Aguda, HDA, Hemorragia Digestiva Baixa
 * - Infecciosas (4): Febre Pediátrica, Sepse, Febre com Rash, Dengue
 *
 * Uso: DATABASE_URL="..." pnpm tsx scripts/seed-ebm-next-batch.ts
 */

import 'dotenv/config'
import chalk from 'chalk'
import { prisma } from '../lib/db/prisma'
import type { ComplaintExtendedContentEBM, RedFlag, DifferentialDiagnosis, EBMCitation, MedicationRecommendation } from '../lib/types/medical'
import { ComplaintExtendedContentEBMSchema } from '../lib/validation/ebm'
import type { Prisma } from '@prisma/client'

// ============================================================================
// Dados EBM para Próximas 17 Queixas High-Acuity
// ============================================================================

interface ComplaintEBMData {
  code: string
  redFlags: RedFlag[]
  differentialDiagnoses: DifferentialDiagnosis[]
  initialManagement: string
  calculadoras: string[]
  ebmReferences: EBMCitation[]
  medications?: MedicationRecommendation[]
  lastEBMReview: string // ISO date
}

const NEXT_17_EBM_DATA: ComplaintEBMData[] = [
  // ========================================================================
  // CARDIOVASCULAR (3 queixas)
  // ========================================================================
  {
    code: 'CV_SYNCOPE',
    redFlags: [
      {
        description: 'Síncope durante esforço físico',
        severity: 'critical',
        clinicalSignificance: 'Sugestivo de cardiomiopatia hipertrófica ou estenose aórtica',
        immediateAction: 'ECG, ecocardiograma urgente, monitorização cardíaca',
        timeToAction: 15,
      },
      {
        description: 'Síncope com palpitações prévias',
        severity: 'critical',
        clinicalSignificance: 'Suspeita de arritmia maligna (TV, FA rápida)',
        immediateAction: 'ECG, monitorização Holter, troponina',
        timeToAction: 10,
      },
      {
        description: 'História familiar de morte súbita <40 anos',
        severity: 'warning',
        clinicalSignificance: 'Risco de canalopatias (Brugada, QT longo)',
        immediateAction: 'ECG com V1-V2 elevado, QTc, avaliação cardiológica',
        timeToAction: 30,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Síncope Vasovagal (Neurocardiogênica)',
        icd10: 'R55',
        probability: 'high',
        keyFeatures: ['Pródromo (náusea, sudorese)', 'Posição ortostática', 'Contexto emocional', 'Recuperação rápida'],
      },
      {
        condition: 'Síncope Cardiogênica (Arritmia)',
        icd10: 'I49.9',
        probability: 'medium',
        keyFeatures: ['Sem pródromo', 'Durante esforço', 'Palpitações', 'ECG alterado'],
      },
      {
        condition: 'Hipotensão Ortostática',
        icd10: 'I95.1',
        probability: 'medium',
        keyFeatures: ['Síncope ao levantar', 'Uso de anti-hipertensivos', 'Desidratação'],
      },
      {
        condition: 'Estenose Aórtica Grave',
        icd10: 'I35.0',
        probability: 'low',
        keyFeatures: ['Sopro sistólico', 'Síncope aos esforços', 'Dispneia progressiva'],
      },
    ],
    initialManagement: `
**PROTOCOLO SÍNCOPE - PS**

1. **Estratificação de Risco (San Francisco Syncope Rule)**
   - ECG anormal: Sim/Não
   - Dispneia: Sim/Não
   - Hematócrito <30%: Sim/Não
   - Pressão sistólica <90mmHg: Sim/Não
   - Insuficiência cardíaca conhecida: Sim/Não
   → Se QUALQUER critério positivo: INTERNAR

2. **Avaliação Inicial**
   - ECG 12 derivações (OBRIGATÓRIO)
   - Sinais vitais ortostáticos (deitado → sentado → em pé)
   - Glicemia capilar
   - Hemograma, eletrólitos, troponina se suspeita cardíaca

3. **Conduta por Etiologia**
   - **Vasovagal (baixo risco)**: Hidratação, orientações, alta
   - **Arritmia suspeita**: Holter 24h, ecocardiograma, internação
   - **Ortostática**: Ajustar medicações, reidratação
   - **Estenose aórtica**: Ecocardiograma urgente, avaliar cirurgia

4. **Critérios de Internação**
   - San Francisco Rule positiva
   - ECG com alterações (BRE novo, QTc >500ms, ondas Q)
   - Síncope durante esforço
   - História familiar de morte súbita
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Diretriz de Síncope - SBC 2020',
        url: 'http://abccardiol.org/article/diretriz-de-sincope/',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'esc-guideline',
        title: 'ESC Guidelines for Syncope 2018',
        pmid: '29562304',
        url: 'https://academic.oup.com/eurheartj/article/39/21/1883/4939241',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: ['San Francisco Syncope Rule', 'OESIL Score', 'ROSE Rule'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'CV_HYPERTENSIVE_CRISIS',
    redFlags: [
      {
        description: 'PA ≥180/120mmHg + dor torácica ou dispneia',
        severity: 'critical',
        clinicalSignificance: 'Emergência hipertensiva (lesão de órgão-alvo)',
        immediateAction: 'Nitroprussiato IV ou nitroglicerina IV, reduzir PA 25% em 1h',
        timeToAction: 15,
      },
      {
        description: 'PA ≥180/120mmHg + déficit neurológico',
        severity: 'critical',
        clinicalSignificance: 'AVC hipertensivo ou encefalopatia hipertensiva',
        immediateAction: 'TC de crânio urgente, controle pressórico cauteloso (não >15-25%)',
        timeToAction: 20,
      },
      {
        description: 'PA ≥180/120mmHg + edema de papila',
        severity: 'critical',
        clinicalSignificance: 'Encefalopatia hipertensiva com HPIC',
        immediateAction: 'Redução gradual de PA (não agressiva), neurologia',
        timeToAction: 30,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Urgência Hipertensiva (sem LOA)',
        icd10: 'I10',
        probability: 'high',
        keyFeatures: ['PA ≥180/120mmHg', 'Assintomático ou sintomas leves', 'Sem lesão de órgão-alvo'],
      },
      {
        condition: 'Emergência Hipertensiva (com LOA)',
        icd10: 'I16.0',
        probability: 'medium',
        keyFeatures: ['PA ≥180/120mmHg', 'Dor torácica, dispneia, déficit neurológico', 'Lesão aguda'],
      },
      {
        condition: 'Dissecção Aórtica',
        icd10: 'I71.0',
        probability: 'low',
        keyFeatures: ['Dor em rasgamento dorsal', 'Assimetria de pulsos', 'HAS grave'],
      },
      {
        condition: 'Feocromocitoma (crise)',
        icd10: 'D35.0',
        probability: 'low',
        keyFeatures: ['Cefaleia pulsátil', 'Sudorese', 'Palpitações', 'HAS paroxística'],
      },
    ],
    initialManagement: `
**PROTOCOLO CRISE HIPERTENSIVA - PS**

1. **Classificação**
   - **Urgência**: PA ≥180/120mmHg SEM lesão de órgão-alvo
   - **Emergência**: PA ≥180/120mmHg COM lesão de órgão-alvo

2. **Avaliação de Lesão de Órgão-Alvo**
   - Cardiovascular: Dor torácica, ECG (isquemia), BNP (ICC)
   - Neurológico: Déficit focal, confusão (TC de crânio)
   - Renal: Creatinina, ureia (IRA)
   - Oftalmológico: Fundoscopia (hemorragia retiniana)

3. **Conduta por Tipo**
   - **Urgência Hipertensiva**:
     * Reiniciar/otimizar medicações VO
     * Captopril 25mg SL ou VO
     * Alta com retorno em 24-48h
     * NÃO usar nifedipina SL (risco de hipotensão)

   - **Emergência Hipertensiva**:
     * Internação em UTI
     * Nitroprussiato IV 0.3-10 mcg/kg/min OU
     * Nitroglicerina IV 5-100 mcg/min OU
     * Esmolol IV (se dissecção aórtica)
     * Meta: Reduzir PA 25% em 1h, depois 160/100mmHg em 6h

4. **NÃO Fazer**
   - Nifedipina SL (queda abrupta de PA)
   - Redução agressiva em AVC agudo (piora isquemia penumbra)
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Diretriz Brasileira de Hipertensão - SBC 2020',
        url: 'http://publicacoes.cardiol.br/portal/abc/portugues/2021/v11605/pdf/11605021.pdf',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'acc-aha',
        title: 'ACC/AHA Hypertensive Crisis Guideline',
        pmid: '29133354',
        url: 'https://www.ahajournals.org/doi/10.1161/HYP.0000000000000065',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Captopril',
        dose: '25mg',
        route: 'VO',
        frequency: 'dose única (urgência)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'B',
      },
      {
        genericName: 'Nitroprussiato de Sódio',
        dose: '0.3-10 mcg/kg/min',
        route: 'IV',
        frequency: 'infusão contínua (emergência)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
    ],
    calculadoras: [],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'CV_ACUTE_PULMONARY_EDEMA',
    redFlags: [
      {
        description: 'SpO2 <90% + estertores bilaterais + dispneia grave',
        severity: 'critical',
        clinicalSignificance: 'Edema agudo de pulmão com insuficiência respiratória',
        immediateAction: 'O2 100%, VNI (CPAP), furosemida 40-80mg IV, nitrato SL',
        timeToAction: 5,
      },
      {
        description: 'Alteração de consciência + EAP',
        severity: 'critical',
        clinicalSignificance: 'Hipóxia cerebral grave, fadiga respiratória',
        immediateAction: 'Considerar IOT imediata, ventilação protetora',
        timeToAction: 5,
      },
      {
        description: 'PA <90mmHg + EAP',
        severity: 'critical',
        clinicalSignificance: 'Choque cardiogênico',
        immediateAction: 'Dobutamina, considerar balão intra-aórtico, UTI',
        timeToAction: 10,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Insuficiência Cardíaca Descompensada',
        icd10: 'I50.1',
        probability: 'high',
        keyFeatures: ['Dispneia progressiva', 'Ortopneia', 'Edema de MMII', 'BNP >500 pg/mL'],
      },
      {
        condition: 'IAM com Disfunção de VE',
        icd10: 'I21.9',
        probability: 'medium',
        keyFeatures: ['Dor torácica', 'ECG com SST', 'Troponina elevada'],
      },
      {
        condition: 'Crise Hipertensiva com EAP',
        icd10: 'I11.0',
        probability: 'medium',
        keyFeatures: ['PA ≥180/120mmHg', 'Sem história de IC', 'Resposta rápida a vasodilatadores'],
      },
      {
        condition: 'Valvopatia Aguda (IM ou IA)',
        icd10: 'I34.0',
        probability: 'low',
        keyFeatures: ['Sopro cardíaco novo', 'História de endocardite', 'Ecocardiograma alterado'],
      },
    ],
    initialManagement: `
**PROTOCOLO EDEMA AGUDO DE PULMÃO - PS**

1. **Suporte Ventilatório Imediato**
   - O2 100% (máscara com reservatório)
   - VNI (CPAP 10cmH2O ou BiPAP) se SpO2 <90%
   - Meta: SpO2 >94%
   - IOT se: Glasgow <8, fadiga respiratória, acidose grave

2. **Tratamento Medicamentoso**
   - **Diuréticos**: Furosemida 40-80mg IV em bolus
   - **Vasodilatadores**: Nitrato SL 5mg (repetir 5/5min) OU nitroglicerina IV
   - **Morfina**: 2-4mg IV (reduz pré-carga, ansiolítico)
   - **IECA**: Captopril 25mg VO (se PA adequada)

3. **Monitorização**
   - RX de tórax (infiltrado alveolar bilateral)
   - BNP/NT-proBNP (>500 pg/mL sugere IC)
   - Gasometria arterial
   - Troponina (afastar IAM)
   - Ecocardiograma (FEVE, valvopatias)

4. **Critérios de UTI**
   - Necessidade de VNI/IOT
   - Instabilidade hemodinâmica (PA <90mmHg)
   - Sem resposta ao tratamento inicial em 1h
   - Choque cardiogênico
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Diretriz Brasileira de Insuficiência Cardíaca Aguda - SBC 2024',
        url: 'http://publicacoes.cardiol.br/portal/abc/portugues/2024/v11802/pdf/11802001.pdf',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'esc-guideline',
        title: 'ESC Guidelines for Acute Heart Failure',
        pmid: '27206819',
        url: 'https://academic.oup.com/eurheartj/article/37/27/2129/1748921',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Furosemida',
        dose: '40-80mg',
        route: 'IV',
        frequency: 'bolus (repetir se necessário)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
      {
        genericName: 'Nitroglicerina',
        dose: '5mg',
        route: 'SL',
        frequency: 'a cada 5min (até 3 doses)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
      {
        genericName: 'Morfina',
        dose: '2-4mg',
        route: 'IV',
        frequency: 'dose única ou repetir',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'B',
      },
    ],
    calculadoras: ['Framingham Criteria', 'BNP/NT-proBNP'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  // ========================================================================
  // RESPIRATÓRIO (3 queixas)
  // ========================================================================
  {
    code: 'RC_DYSPNEA_CHRONIC_EXAC',
    redFlags: [
      {
        description: 'SpO2 <88% + uso de musculatura acessória',
        severity: 'critical',
        clinicalSignificance: 'Exacerbação grave de DPOC com falência respiratória',
        immediateAction: 'VNI (BiPAP), broncodilatadores, corticoide IV, antibiótico',
        timeToAction: 10,
      },
      {
        description: 'Cianose central + confusão mental',
        severity: 'critical',
        clinicalSignificance: 'Hipercapnia grave (retenção de CO2)',
        immediateAction: 'Gasometria arterial urgente, considerar IOT',
        timeToAction: 5,
      },
      {
        description: 'Taquicardia >120bpm + hipotensão',
        severity: 'critical',
        clinicalSignificance: 'Cor pulmonale agudo ou sepse respiratória',
        immediateAction: 'Expansão volêmica, ecocardiograma, avaliar TEP',
        timeToAction: 15,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Exacerbação de DPOC',
        icd10: 'J44.1',
        probability: 'high',
        keyFeatures: ['História de DPOC', 'Tosse produtiva', 'Sibilos', 'Tabagismo'],
      },
      {
        condition: 'Pneumonia Comunitária',
        icd10: 'J18.9',
        probability: 'high',
        keyFeatures: ['Febre', 'Tosse com expectoração purulenta', 'Consolidação ao RX'],
      },
      {
        condition: 'Insuficiência Cardíaca Descompensada',
        icd10: 'I50.9',
        probability: 'medium',
        keyFeatures: ['Edema de MMII', 'Estertores bilaterais', 'BNP elevado'],
      },
      {
        condition: 'Tromboembolismo Pulmonar',
        icd10: 'I26.9',
        probability: 'medium',
        keyFeatures: ['Início súbito', 'Dor torácica pleurítica', 'D-dímero positivo'],
      },
    ],
    initialManagement: `
**PROTOCOLO EXACERBAÇÃO DPOC - PS**

1. **Avaliação de Gravidade**
   - SpO2, FR, FC, Tax
   - Gasometria arterial: pH, PaCO2, PaO2
   - RX de tórax (infiltrados, pneumotórax)
   - Hemograma, PCR (infecção)

2. **Broncodilatação**
   - Salbutamol 2.5-5mg + Ipratrópio 0.5mg (nebulização)
   - Repetir a cada 20min (até 3 doses)
   - Considerar salbutamol IV se resposta inadequada

3. **Corticoterapia**
   - Prednisolona 40mg VO OU
   - Metilprednisolona 125mg IV (se via oral indisponível)
   - Duração: 5-7 dias

4. **Antibioticoterapia (se indicação)**
   - Critérios de Anthonisen: ≥2 de (↑dispneia, ↑volume escarro, ↑purulência)
   - Azitromicina 500mg VO OU
   - Amoxicilina-clavulanato 875/125mg VO

5. **Suporte Ventilatório**
   - O2 suplementar (meta SpO2 88-92% em DPOC)
   - VNI (BiPAP) se: pH <7.35, PaCO2 >45mmHg, FR >25
   - IOT se: acidose grave (pH <7.25), rebaixamento de consciência
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Diretrizes SBPT para DPOC 2023',
        url: 'https://sbpt.org.br/portal/diretrizes-sbpt-dpoc/',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'gold-guideline',
        title: 'GOLD Guidelines for COPD 2024',
        url: 'https://goldcopd.org/2024-gold-report/',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Salbutamol',
        dose: '2.5-5mg',
        route: 'Inalatório',
        frequency: 'a cada 20min (até 3x)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
      {
        genericName: 'Prednisolona',
        dose: '40mg',
        route: 'VO',
        frequency: '1x/dia por 5-7 dias',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
    ],
    calculadoras: ['DECAF Score', 'BODE Index'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'RC_HEMOPTYSIS',
    redFlags: [
      {
        description: 'Hemoptise maciça (>200-300mL em 24h)',
        severity: 'critical',
        clinicalSignificance: 'Risco de asfixia e choque hipovolêmico',
        immediateAction: 'IOT seletiva (proteger via aérea), broncoscopia urgente, hemostasia',
        timeToAction: 10,
      },
      {
        description: 'Instabilidade hemodinâmica + hemoptise',
        severity: 'critical',
        clinicalSignificance: 'Choque hipovolêmico',
        immediateAction: 'Reposição volêmica agressiva, tipagem sanguínea, transfusão',
        timeToAction: 5,
      },
      {
        description: 'Hemoptise + história de tuberculose ou câncer pulmonar',
        severity: 'warning',
        clinicalSignificance: 'Cavitação ou erosão vascular tumoral',
        immediateAction: 'TC de tórax, broncoscopia, avaliar embolização arterial',
        timeToAction: 30,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Tuberculose Pulmonar',
        icd10: 'A15.0',
        probability: 'high',
        keyFeatures: ['Tosse >3 semanas', 'Febre vespertina', 'Sudorese noturna', 'Cavitação ao RX'],
      },
      {
        condition: 'Bronquite Aguda',
        icd10: 'J20.9',
        probability: 'high',
        keyFeatures: ['Tosse recente', 'Hemoptise leve (estrias)', 'Sem febre', 'RX normal'],
      },
      {
        condition: 'Neoplasia de Pulmão',
        icd10: 'C34.9',
        probability: 'medium',
        keyFeatures: ['Tabagismo', 'Perda de peso', 'Massa ao RX/TC'],
      },
      {
        condition: 'Bronquiectasia',
        icd10: 'J47.9',
        probability: 'medium',
        keyFeatures: ['Tosse crônica produtiva', 'Hemoptise recorrente', 'TC: dilatação brônquica'],
      },
      {
        condition: 'Tromboembolismo Pulmonar com Infarto',
        icd10: 'I26.9',
        probability: 'low',
        keyFeatures: ['Hemoptise + dor torácica pleurítica', 'Dispneia súbita', 'D-dímero positivo'],
      },
    ],
    initialManagement: `
**PROTOCOLO HEMOPTISE - PS**

1. **Classificação de Gravidade**
   - **Leve**: <50mL/24h (estrias de sangue)
   - **Moderada**: 50-200mL/24h
   - **Maciça**: >200mL/24h ou >100mL/h (RISCO DE VIDA)

2. **Estabilização Inicial**
   - Acesso venoso calibroso (2x), tipagem sanguínea
   - Oxigenioterapia (meta SpO2 >94%)
   - Posição: Decúbito lateral (lado sangrante para baixo)
   - Hemoptise maciça: Considerar IOT seletiva + broncoscopia

3. **Investigação**
   - RX de tórax (localizar sangramento, massa, cavitação)
   - TC de tórax com contraste (se hemoptise moderada/maciça)
   - Hemograma, coagulograma, função renal
   - BK escarro (se suspeita de TB)

4. **Conduta por Gravidade**
   - **Leve**: Investigação ambulatorial, antitussígeno
   - **Moderada**: Internação, ácido tranexâmico, TC tórax
   - **Maciça**: UTI, broncoscopia rígida, embolização arterial brônquica

5. **Tratamento Específico**
   - TB: Isolamento respiratório, RIPE
   - Neoplasia: Oncologia, radioterapia paliativa
   - Bronquiectasia: Antibiótico, fisioterapia respiratória
`,
    ebmReferences: [
      {
        source: 'sbpt',
        title: 'Diretrizes SBPT para Hemoptise',
        url: 'https://sbpt.org.br/portal/hemoptise-diretrizes/',
        evidenceLevel: 'B',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'uptodate',
        title: 'Etiology and evaluation of hemoptysis in adults',
        pmid: '31603729',
        url: 'https://www.uptodate.com/contents/hemoptysis',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Ácido Tranexâmico',
        dose: '1g',
        route: 'IV',
        frequency: '8/8h',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'B',
        evidenceLevel: 'B',
      },
    ],
    calculadoras: [],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'RC_RESPIRATORY_FAILURE',
    redFlags: [
      {
        description: 'SpO2 <85% mesmo com O2 100%',
        severity: 'critical',
        clinicalSignificance: 'Insuficiência respiratória refratária, SDRA provável',
        immediateAction: 'IOT imediata, ventilação protetora (VT 6mL/kg), PEEP elevada',
        timeToAction: 5,
      },
      {
        description: 'Gasometria: PaO2 <60mmHg ou PaCO2 >50mmHg',
        severity: 'critical',
        clinicalSignificance: 'Insuficiência respiratória tipo I (hipoxêmica) ou tipo II (hipercápnica)',
        immediateAction: 'VNI ou IOT conforme tipo e gravidade',
        timeToAction: 10,
      },
      {
        description: 'Rebaixamento de consciência (Glasgow <8)',
        severity: 'critical',
        clinicalSignificance: 'Hipóxia cerebral grave ou narcose por CO2',
        immediateAction: 'IOT protetora imediata',
        timeToAction: 5,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Síndrome do Desconforto Respiratório Agudo (SDRA)',
        icd10: 'J80',
        probability: 'high',
        keyFeatures: ['Hipoxemia refratária', 'Infiltrados bilaterais', 'PaO2/FiO2 <300', 'Sem IC'],
      },
      {
        condition: 'Pneumonia Grave',
        icd10: 'J18.9',
        probability: 'high',
        keyFeatures: ['Febre', 'Consolidação', 'CURB-65 ≥3', 'Hipoxemia'],
      },
      {
        condition: 'Exacerbação Grave de DPOC',
        icd10: 'J44.1',
        probability: 'medium',
        keyFeatures: ['História de DPOC', 'Hipercapnia (PaCO2 >50mmHg)', 'Acidose respiratória'],
      },
      {
        condition: 'Embolia Pulmonar Maciça',
        icd10: 'I26.0',
        probability: 'medium',
        keyFeatures: ['Início súbito', 'Instabilidade hemodinâmica', 'D-dímero ++'],
      },
    ],
    initialManagement: `
**PROTOCOLO INSUFICIÊNCIA RESPIRATÓRIA - PS**

1. **Classificação**
   - **Tipo I (Hipoxêmica)**: PaO2 <60mmHg, PaCO2 normal/baixa
     * Causas: SDRA, pneumonia, TEP, edema pulmonar
   - **Tipo II (Hipercápnica)**: PaCO2 >50mmHg
     * Causas: DPOC, fraqueza muscular, depressão do SNC

2. **Suporte Ventilatório**
   - **O2 Suplementar**: Máscara com reservatório (FiO2 até 100%)
   - **VNI (CPAP/BiPAP)**: Se consciente, cooperativo, sem choque
     * Indicação: pH 7.25-7.35, PaCO2 45-60mmHg
   - **IOT + VM**: Se falha de VNI, Glasgow <8, choque, parada

3. **Parâmetros Ventilatórios (Ventilação Protetora)**
   - Volume corrente (VT): 6mL/kg peso predito
   - PEEP: 5-15 cmH2O (titular pela FiO2)
   - Pressão de platô: <30 cmH2O
   - Driving pressure: <15 cmH2O

4. **Tratamento da Causa Base**
   - SDRA: VM protetora, prona se PaO2/FiO2 <150
   - Pneumonia: Antibiótico empírico (ceftriaxona + azitromicina)
   - DPOC: Broncodilatadores, corticoide
   - TEP: Anticoagulação ou trombólise

5. **Critérios de UTI**
   - Necessidade de IOT/VM
   - Necessidade de VNI
   - Instabilidade hemodinâmica
`,
    ebmReferences: [
      {
        source: 'amib',
        title: 'Diretrizes Brasileiras de Ventilação Mecânica - AMIB 2023',
        url: 'https://www.amib.org.br/diretrizes-vm-2023',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'ardsnet',
        title: 'ARDSNet Ventilation Strategy',
        pmid: '10793162',
        url: 'https://www.nejm.org/doi/full/10.1056/NEJM200005043421801',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: ['PaO2/FiO2 Ratio', 'Berlin ARDS Criteria', 'ROX Index'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  // ========================================================================
  // NEUROLÓGICO (4 queixas)
  // ========================================================================
  {
    code: 'NC_STROKE_SUSPECTED',
    redFlags: [
      {
        description: 'Déficit neurológico focal <4.5h de evolução',
        severity: 'critical',
        clinicalSignificance: 'Janela terapêutica para trombólise IV',
        immediateAction: 'Ativar Código AVC, TC de crânio <25min, rtPA se critérios',
        timeToAction: 25,
      },
      {
        description: 'NIHSS ≥6 + oclusão de grande vaso',
        severity: 'critical',
        clinicalSignificance: 'Candidato a trombectomia mecânica (até 24h)',
        immediateAction: 'AngioTC cerebral, neurorradiologia intervencionista',
        timeToAction: 30,
      },
      {
        description: 'Rebaixamento de consciência + sinais de HPIC',
        severity: 'critical',
        clinicalSignificance: 'AVC hemorrágico com efeito de massa',
        immediateAction: 'TC crânio urgente, neurocirurgia, considerar craniectomia',
        timeToAction: 20,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'AVC Isquêmico',
        icd10: 'I63.9',
        probability: 'high',
        keyFeatures: ['Déficit focal súbito', 'Fatores de risco CV', 'TC: área hipodensa (tardia)'],
      },
      {
        condition: 'AVC Hemorrágico',
        icd10: 'I61.9',
        probability: 'medium',
        keyFeatures: ['Cefaleia súbita', 'Vômitos', 'TC: hiperdensidade'],
      },
      {
        condition: 'AIT (Ataque Isquêmico Transitório)',
        icd10: 'G45.9',
        probability: 'medium',
        keyFeatures: ['Sintomas <24h (geralmente <1h)', 'Resolução completa', 'TC normal'],
      },
      {
        condition: 'Enxaqueca com Aura',
        icd10: 'G43.1',
        probability: 'low',
        keyFeatures: ['História de enxaqueca', 'Aura visual precedendo cefaleia', 'Jovem'],
      },
    ],
    initialManagement: `
**PROTOCOLO CÓDIGO AVC - PS**

1. **Ativação Código AVC (Tempo CRÍTICO)**
   - Reconhecimento: Escala FAST/SAMU (Face, Arm, Speech, Time)
   - Porta-TC: <25 minutos
   - Porta-agulha (rtPA): <60 minutos

2. **Avaliação Inicial**
   - NIHSS (escala de gravidade 0-42)
   - Glicemia capilar (afastar hipoglicemia)
   - TC de crânio sem contraste (afastar hemorragia)
   - Laboratório: Hemograma, coagulograma, função renal

3. **Trombólise IV (rtPA)**
   - **Critérios de Inclusão**:
     * Déficit neurológico <4.5h
     * TC sem hemorragia
     * PA <185/110mmHg
     * Sem contraindicações
   - **Dose**: Alteplase 0.9mg/kg (máx 90mg)
     * 10% em bolus, 90% em 1h
   - **Contraindicações**: Cirurgia recente, hemorragia ativa, AVC/TCE <3m

4. **Trombectomia Mecânica**
   - Indicação: Oclusão de grande vaso (ACI, M1, M2, basilar)
   - Janela: Até 24h (selecionados)
   - NIHSS ≥6

5. **Manejo Geral**
   - Controle pressórico (não reduzir PA se candidato a rtPA)
   - Cabeceira 30°
   - Jejum (risco de disfagia)
   - AAS 300mg VO após 24h (se trombólise) ou imediato (se não)
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Diretriz Brasileira de AVC Agudo - SBC/ABN 2021',
        url: 'http://abneuro.org.br/diretrizes-avc-2021',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'aha-guideline',
        title: 'AHA/ASA Stroke Guidelines 2019',
        pmid: '30661493',
        url: 'https://www.ahajournals.org/doi/10.1161/STR.0000000000000211',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Alteplase (rtPA)',
        dose: '0.9mg/kg (máx 90mg)',
        route: 'IV',
        frequency: '10% bolus + 90% em 1h',
        susAvailable: false,
        renameCompatible: false,
        evidenceLevel: 'A',
      },
      {
        genericName: 'Ácido Acetilsalicílico',
        dose: '300mg',
        route: 'VO',
        frequency: 'dose única (após 24h de rtPA)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
    ],
    calculadoras: ['NIHSS', 'ABCD2 Score', 'mRS (modified Rankin Scale)'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'NC_ALTERED_CONSCIOUSNESS',
    redFlags: [
      {
        description: 'Glasgow ≤8 + ausência de reflexos protetores',
        severity: 'critical',
        clinicalSignificance: 'Risco de aspiração e parada respiratória',
        immediateAction: 'IOT protetora imediata, posição lateral de segurança',
        timeToAction: 5,
      },
      {
        description: 'Rebaixamento súbito + febre + rigidez de nuca',
        severity: 'critical',
        clinicalSignificance: 'Suspeita de meningoencefalite',
        immediateAction: 'Antibiótico empírico <60min, aciclovir, TC antes de PL',
        timeToAction: 60,
      },
      {
        description: 'Pupilas anisocóricas + bradicardia + HAS (Tríade de Cushing)',
        severity: 'critical',
        clinicalSignificance: 'Hipertensão intracraniana grave',
        immediateAction: 'TC de crânio urgente, manitol/salina hipertônica, neurocirurgia',
        timeToAction: 15,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Hipoglicemia',
        icd10: 'E16.2',
        probability: 'high',
        keyFeatures: ['Glicemia <60mg/dL', 'Diabético em uso de insulina', 'Sudorese, tremores'],
      },
      {
        condition: 'AVC (Isquêmico ou Hemorrágico)',
        icd10: 'I64',
        probability: 'high',
        keyFeatures: ['Déficit focal', 'Início súbito', 'TC alterada'],
      },
      {
        condition: 'Intoxicação/Overdose',
        icd10: 'T50.9',
        probability: 'medium',
        keyFeatures: ['História de uso de drogas', 'Pupilas mióticas (opioides) ou midriáticas'],
      },
      {
        condition: 'Meningoencefalite',
        icd10: 'G04.9',
        probability: 'medium',
        keyFeatures: ['Febre', 'Rigidez de nuca', 'Convulsões'],
      },
      {
        condition: 'Crise Convulsiva (Pós-ictal)',
        icd10: 'G40.9',
        probability: 'medium',
        keyFeatures: ['História de convulsão testemunhada', 'Confusão mental transitória'],
      },
    ],
    initialManagement: `
**PROTOCOLO REBAIXAMENTO DE CONSCIÊNCIA - PS**

1. **Avaliação ABCDE**
   - **A**: Via aérea pérvia? IOT se Glasgow ≤8
   - **B**: SpO2, FR (hipóxia? hipercapnia?)
   - **C**: PA, FC, glicemia capilar (SEMPRE)
   - **D**: Glasgow, pupilas, déficit focal
   - **E**: Tax, sinais de trauma, rash

2. **Causas Rapidamente Reversíveis (AEIOU TIPS)**
   - **A**: Álcool/drogas
   - **E**: Epilepsia (pós-ictal), Encefalopatia
   - **I**: Infecção (meningite, sepse)
   - **O**: Overdose
   - **U**: Uremia (insuficiência renal)
   - **T**: Trauma, Temperatura (hipo/hipertermia)
   - **I**: Insulina (hipo/hiperglicemia)
   - **P**: Psiquiátrico (conversão, catatonia)
   - **S**: Stroke (AVC)

3. **Tratamento Empírico Imediato**
   - Glicose 50% 50mL IV (se hipoglicemia)
   - Tiamina 100mg IV (antes da glicose em etilistas)
   - Naloxona 0.4mg IV (se suspeita de opioides)
   - Flumazenil 0.2mg IV (se benzodiazepínicos - CUIDADO com convulsões)

4. **Investigação**
   - TC de crânio (HPIC, AVC, massa)
   - Hemograma, ionograma, função renal/hepática
   - Gasometria (acidose, CO2)
   - Toxicológico de urina
   - Punção lombar (se meningite e sem HPIC)

5. **Critérios de UTI**
   - Glasgow ≤8 (necessidade de IOT)
   - Instabilidade hemodinâmica
   - Necessidade de monitorização neurológica
`,
    ebmReferences: [
      {
        source: 'uptodate',
        title: 'Approach to the adult with acute altered mental status',
        pmid: '34133876',
        url: 'https://www.uptodate.com/contents/altered-mental-status',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: ['Glasgow Coma Scale', 'FOUR Score'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'NC_SEIZURE',
    redFlags: [
      {
        description: 'Convulsão >5min ou múltiplas crises sem recuperação da consciência',
        severity: 'critical',
        clinicalSignificance: 'Estado de Mal Epiléptico (EME)',
        immediateAction: 'Diazepam 10mg IV ou midazolam 10mg IM, repetir se necessário',
        timeToAction: 5,
      },
      {
        description: 'Primeira crise convulsiva + déficit neurológico focal pós-ictal',
        severity: 'critical',
        clinicalSignificance: 'Lesão estrutural cerebral (AVC, tumor, abscesso)',
        immediateAction: 'TC de crânio urgente',
        timeToAction: 30,
      },
      {
        description: 'Convulsão + febre + rigidez de nuca',
        severity: 'critical',
        clinicalSignificance: 'Meningoencefalite',
        immediateAction: 'Antibiótico + aciclovir <60min, TC antes de PL',
        timeToAction: 60,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Epilepsia (crise tônico-clônica)',
        icd10: 'G40.9',
        probability: 'high',
        keyFeatures: ['História de epilepsia', 'Irregularidade medicamentosa', 'EEG intercrítico alterado'],
      },
      {
        condition: 'Primeira Crise Convulsiva',
        icd10: 'R56.9',
        probability: 'high',
        keyFeatures: ['Sem história prévia', 'TC/RM necessária', 'Investigação etiológica'],
      },
      {
        condition: 'AVC (isquêmico ou hemorrágico)',
        icd10: 'I64',
        probability: 'medium',
        keyFeatures: ['Déficit focal pós-ictal persistente', 'TC alterada'],
      },
      {
        condition: 'Meningoencefalite',
        icd10: 'G04.9',
        probability: 'medium',
        keyFeatures: ['Febre', 'Rigidez de nuca', 'Confusão mental'],
      },
      {
        condition: 'Distúrbio Metabólico (hipoglicemia, hiponatremia)',
        icd10: 'E87.1',
        probability: 'medium',
        keyFeatures: ['Glicemia <40mg/dL', 'Sódio <120mEq/L'],
      },
    ],
    initialManagement: `
**PROTOCOLO CRISE CONVULSIVA - PS**

1. **Durante a Crise (Proteção e Segurança)**
   - Proteger cabeça (almofada)
   - Posição lateral de segurança (prevenir aspiração)
   - Não introduzir objetos na boca
   - O2 suplementar

2. **Estado de Mal Epiléptico (convulsão >5min)**
   - **0-5min**: Diazepam 10mg IV (2mg/min) OU Midazolam 10mg IM
   - **5-10min**: Repetir benzodiazepínico
   - **10-20min**: Fenitoína 20mg/kg IV (50mg/min) OU Valproato 40mg/kg IV
   - **>20min**: Fenobarbital 20mg/kg IV OU anestesia geral (propofol)

3. **Após a Crise (Pós-ictal)**
   - Glicemia capilar (hipoglicemia?)
   - Avaliar trauma (mordedura de língua, fraturas)
   - Avaliar déficit neurológico focal

4. **Investigação**
   - **Primeira crise**: TC de crânio SEM contraste
   - Hemograma, ionograma (Na, Ca, Mg), glicemia
   - Toxicológico de urina
   - Nível sérico de anticonvulsivante (se epilepsia conhecida)

5. **Critérios de Internação**
   - Primeira crise convulsiva
   - Estado de Mal Epiléptico
   - Déficit neurológico focal persistente
   - Causa metabólica grave (hipoglicemia, hiponatremia)
   - TC alterada (AVC, tumor, sangramento)

6. **Alta (epilepsia conhecida)**
   - Crise única, recuperação completa
   - Irregularidade medicamentosa identificada
   - Orientação sobre adesão ao tratamento
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Protocolo Clínico de Estado de Mal Epiléptico - SBN',
        url: 'http://abneuro.org.br/protocolo-estado-mal-epileptico',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'neurocritical-care',
        title: 'Guidelines for Status Epilepticus',
        pmid: '22528274',
        url: 'https://link.springer.com/article/10.1007/s12028-012-9695-z',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Diazepam',
        dose: '10mg',
        route: 'IV',
        frequency: 'dose única (repetir se EME)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
      {
        genericName: 'Fenitoína',
        dose: '20mg/kg',
        route: 'IV',
        frequency: 'dose de ataque (50mg/min)',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
    ],
    calculadoras: [],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'NC_WEAKNESS_FOCAL',
    redFlags: [
      {
        description: 'Fraqueza focal súbita <4.5h + alteração de linguagem',
        severity: 'critical',
        clinicalSignificance: 'AVC isquêmico em janela terapêutica',
        immediateAction: 'Código AVC, TC crânio <25min, avaliar trombólise',
        timeToAction: 25,
      },
      {
        description: 'Fraqueza ascendente (MMII → MMSS) + arreflexia',
        severity: 'critical',
        clinicalSignificance: 'Síndrome de Guillain-Barré com risco de insuficiência respiratória',
        immediateAction: 'CVF (capacidade vital forçada), monitorização respiratória, neurologia',
        timeToAction: 30,
      },
      {
        description: 'Fraqueza proximal + ptose palpebral + diplopia',
        severity: 'warning',
        clinicalSignificance: 'Miastenia Gravis em crise',
        immediateAction: 'Teste de edrofônio, gasometria, avaliar CVF',
        timeToAction: 60,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'AVC Isquêmico',
        icd10: 'I63.9',
        probability: 'high',
        keyFeatures: ['Início súbito', 'Déficit focal (face, braço, perna)', 'Fatores de risco CV'],
      },
      {
        condition: 'Síndrome de Guillain-Barré',
        icd10: 'G61.0',
        probability: 'medium',
        keyFeatures: ['Fraqueza ascendente simétrica', 'Arreflexia', 'História de infecção prévia'],
      },
      {
        condition: 'Compressão Medular',
        icd10: 'G95.2',
        probability: 'medium',
        keyFeatures: ['Dor em faixa', 'Nível sensitivo', 'Retenção urinária', 'RM urgente'],
      },
      {
        condition: 'Miastenia Gravis',
        icd10: 'G70.0',
        probability: 'low',
        keyFeatures: ['Fadiga muscular (piora ao final do dia)', 'Ptose, diplopia', 'Teste de edrofônio +'],
      },
      {
        condition: 'Hipocalemia Grave',
        icd10: 'E87.6',
        probability: 'low',
        keyFeatures: ['K+ <2.5mEq/L', 'Fraqueza generalizada', 'História de vômitos/diarreia'],
      },
    ],
    initialManagement: `
**PROTOCOLO FRAQUEZA FOCAL - PS**

1. **Diferenciação Inicial (Tempo CRÍTICO)**
   - **Início súbito (<24h)**: Pensar AVC (ativar Código AVC)
   - **Progressão rápida (horas-dias)**: Pensar Guillain-Barré, mielite
   - **Progressão lenta (semanas)**: Pensar compressão, tumor, desmielinização

2. **Exame Neurológico Focado**
   - Força muscular (escala 0-5)
   - Reflexos tendinosos profundos
   - Nível sensitivo (compressão medular?)
   - Sinais cerebelares
   - Nervos cranianos (ptose, diplopia)

3. **Investigação por Suspeita**
   - **AVC**: TC de crânio sem contraste, NIHSS, glicemia
   - **Guillain-Barré**: CVF, gasometria, punção lombar (dissociação proteíno-citológica)
   - **Compressão medular**: RM de coluna URGENTE
   - **Miastenia**: Teste de edrofônio (Tensilon®), anti-AChR
   - **Metabólico**: Ionograma (K, Ca, Mg, P)

4. **Conduta por Diagnóstico**
   - **AVC**: Protocolo AVC (rtPA, trombectomia)
   - **Guillain-Barré**: UTI (monitorizar CVF), imunoglobulina IV ou plasmaférese
   - **Compressão medular**: Dexametasona 10mg IV, neurocirurgia URGENTE
   - **Miastenia**: Piridostigmina, plasmaférese se crise
   - **Hipocalemia**: Reposição de K+ (cuidado com ritmo cardíaco)

5. **Critérios de Internação/UTI**
   - AVC candidato a trombólise
   - CVF <20mL/kg (risco de IOT)
   - Compressão medular (cirurgia urgente)
   - Instabilidade respiratória ou hemodinâmica
`,
    ebmReferences: [
      {
        source: 'uptodate',
        title: 'Approach to the patient with acute limb weakness',
        pmid: '33411459',
        url: 'https://www.uptodate.com/contents/limb-weakness',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: ['NIHSS', 'MRC Scale (força muscular)'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  // ========================================================================
  // GASTROINTESTINAL (3 queixas)
  // ========================================================================
  {
    code: 'GI_ABDOMINAL_PAIN_ACUTE',
    redFlags: [
      {
        description: 'Dor abdominal + hipotensão + taquicardia (choque)',
        severity: 'critical',
        clinicalSignificance: 'Abdome agudo hemorrágico (ruptura de AAA, gravidez ectópica rota)',
        immediateAction: 'Reposição volêmica agressiva, US FAST, cirurgia de emergência',
        timeToAction: 10,
      },
      {
        description: 'Dor abdominal + sinais de peritonite (defesa, descompressão dolorosa)',
        severity: 'critical',
        clinicalSignificance: 'Abdome agudo perfurativo (úlcera, apendicite)',
        immediateAction: 'Cirurgia geral urgente, TC abdome, antibiótico',
        timeToAction: 30,
      },
      {
        description: 'Dor abdominal + distensão + ausência de eliminação de gases/fezes',
        severity: 'warning',
        clinicalSignificance: 'Obstrução intestinal',
        immediateAction: 'RX abdome (níveis hidroaéreos), sonda nasogástrica, cirurgia',
        timeToAction: 60,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Apendicite Aguda',
        icd10: 'K35.8',
        probability: 'high',
        keyFeatures: ['Dor em FID', 'Sinal de Blumberg +', 'Leucocitose', 'US: apêndice >6mm'],
      },
      {
        condition: 'Colecistite Aguda',
        icd10: 'K81.0',
        probability: 'high',
        keyFeatures: ['Dor em HCD', 'Sinal de Murphy +', 'US: vesícula espessada + cálculo'],
      },
      {
        condition: 'Obstrução Intestinal',
        icd10: 'K56.6',
        probability: 'medium',
        keyFeatures: ['Distensão', 'Vômitos', 'Parada de eliminação', 'RX: níveis'],
      },
      {
        condition: 'Pancreatite Aguda',
        icd10: 'K85.9',
        probability: 'medium',
        keyFeatures: ['Dor epigástrica em faixa', 'Amilase/lipase >3x', 'Etilismo ou cálculos'],
      },
      {
        condition: 'Ruptura de AAA',
        icd10: 'I71.3',
        probability: 'low',
        keyFeatures: ['Dor abdominal + lombar', '>65 anos', 'Massa pulsátil', 'Choque'],
      },
    ],
    initialManagement: `
**PROTOCOLO DOR ABDOMINAL AGUDA - PS**

1. **Classificação por Gravidade (Red Flags)**
   - Sinais de choque (hipotensão, taquicardia)
   - Sinais de peritonite (defesa, Blumberg +)
   - Idade >65 anos + dor intensa
   - História de AAA ou cirurgia abdominal prévia

2. **Avaliação Inicial**
   - Sinais vitais, exame abdominal completo
   - Hemograma, amilase/lipase, função renal/hepática
   - Tipagem sanguínea (se instabilidade)
   - β-hCG (mulheres em idade fértil)

3. **Imagem**
   - **US abdome**: Suspeita de colecistite, AAA, gravidez ectópica
   - **TC abdome com contraste**: Apendicite, pancreatite, obstrução, perfuração
   - **RX abdome**: Obstrução, perfuração (pneumoperitônio)

4. **Conduta por Diagnóstico**
   - **Apendicite**: Cirurgia (apendicectomia), antibiótico pré-op
   - **Colecistite**: Colecistectomia (idealmente <72h), antibiótico
   - **Obstrução**: Sonda NG, reposição hidroeletrolítica, cirurgia se estrangulamento
   - **Pancreatite**: Jejum, hidratação IV vigorosa, analgesia
   - **Ruptura AAA**: Cirurgia vascular de EMERGÊNCIA

5. **Critérios de Internação**
   - Sinais de abdome agudo cirúrgico
   - Instabilidade hemodinâmica
   - Pancreatite moderada/grave (BISAP ≥3)
   - Idade >65 anos + dor intensa
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Protocolo de Abdome Agudo - AMB',
        url: 'https://amb.org.br/protocolo-abdome-agudo',
        evidenceLevel: 'B',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'acep',
        title: 'Clinical Policy: Acute Abdominal Pain',
        pmid: '28689695',
        url: 'https://www.acep.org/patient-care/clinical-policies/acute-abdominal-pain/',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: ['Alvarado Score', 'BISAP Score (pancreatite)', 'RIPASA Score'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'GI_GI_BLEEDING_UPPER',
    redFlags: [
      {
        description: 'Hematêmese maciça + instabilidade hemodinâmica',
        severity: 'critical',
        clinicalSignificance: 'Hemorragia digestiva alta com choque hipovolêmico',
        immediateAction: '2 acessos calibrosos, reposição volêmica, tipagem + transfusão, EDA urgente',
        timeToAction: 10,
      },
      {
        description: 'Sangramento + cirrose hepática conhecida',
        severity: 'critical',
        clinicalSignificance: 'Ruptura de varizes esofágicas',
        immediateAction: 'Terlipressina, antibiótico profilático, EDA <12h, balão de Sengstaken se refratário',
        timeToAction: 30,
      },
      {
        description: 'Melena + síncope + taquicardia',
        severity: 'warning',
        clinicalSignificance: 'Perda volêmica significativa',
        immediateAction: 'Reposição, tipagem, hemoglobina seriada, EDA em 24h',
        timeToAction: 60,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Úlcera Péptica Hemorrágica',
        icd10: 'K25.4',
        probability: 'high',
        keyFeatures: ['História de AINE/AAS', 'Dor epigástrica', 'Hematêmese ou melena'],
      },
      {
        condition: 'Ruptura de Varizes Esofágicas',
        icd10: 'I85.0',
        probability: 'high',
        keyFeatures: ['Cirrose hepática', 'Hematêmese volumosa', 'Instabilidade hemodinâmica'],
      },
      {
        condition: 'Gastrite Erosiva',
        icd10: 'K29.0',
        probability: 'medium',
        keyFeatures: ['Uso crônico de AINE', 'Sangramento leve-moderado', 'Hemoglobina estável'],
      },
      {
        condition: 'Síndrome de Mallory-Weiss',
        icd10: 'K22.6',
        probability: 'medium',
        keyFeatures: ['Vômitos não-sanguinolentos precedendo hematêmese', 'Etilismo agudo'],
      },
    ],
    initialManagement: `
**PROTOCOLO HEMORRAGIA DIGESTIVA ALTA - PS**

1. **Estratificação de Risco (Glasgow-Blatchford Score)**
   - Pontuação 0: Baixo risco (considerar alta)
   - Pontuação ≥1: Internação
   - Pontuação ≥12: Alto risco (UTI + EDA urgente)

2. **Ressuscitação Inicial**
   - 2 acessos venosos calibrosos (16-18G)
   - Reposição volêmica (cristaloides 500-1000mL)
   - Tipagem sanguínea + reserva de concentrado de hemácias
   - Meta: Hb >7g/dL (ou >9g/dL se coronariopata)

3. **Tratamento Farmacológico**
   - **Inibidor de Bomba de Prótons (IBP)**:
     * Omeprazol 80mg IV em bolus → 8mg/h infusão contínua
   - **Varizes esofágicas (se cirrose)**:
     * Terlipressina 2mg IV 4/4h
     * Antibiótico profilático: Ceftriaxona 1g IV
     * Octreotide 50mcg bolus → 50mcg/h (alternativa)

4. **Endoscopia Digestiva Alta (EDA)**
   - **EDA urgente (<12h)**: Instabilidade, cirrose, suspeita de varizes
   - **EDA precoce (24h)**: Pacientes estáveis, sem choque
   - Terapia endoscópica: Esclerose, ligadura, clipping

5. **Critérios de UTI**
   - Instabilidade hemodinâmica refratária
   - Necessidade de >4 unidades de CH
   - Ressangramento após EDA
   - Cirrose Child C
`,
    ebmReferences: [
      {
        source: 'brazilian-guideline',
        title: 'Consenso Brasileiro de Hemorragia Digestiva Alta - FBG 2020',
        url: 'https://fbg.org.br/consenso-hda-2020',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'acg-guideline',
        title: 'ACG Guidelines for Upper GI Bleeding',
        pmid: '33625988',
        url: 'https://journals.lww.com/ajg/Fulltext/2021/02000/ACG_Clinical_Guideline__Upper_Gastrointestinal.17.aspx',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Omeprazol',
        dose: '80mg bolus + 8mg/h',
        route: 'IV',
        frequency: 'infusão contínua',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
      {
        genericName: 'Terlipressina',
        dose: '2mg',
        route: 'IV',
        frequency: '4/4h',
        susAvailable: false,
        renameCompatible: false,
        evidenceLevel: 'A',
      },
    ],
    calculadoras: ['Glasgow-Blatchford Score', 'Rockall Score'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'GI_GI_BLEEDING_LOWER',
    redFlags: [
      {
        description: 'Enterorragia maciça + instabilidade hemodinâmica',
        severity: 'critical',
        clinicalSignificance: 'Hemorragia digestiva baixa com choque hipovolêmico',
        immediateAction: 'Reposição volêmica agressiva, tipagem + transfusão, colonoscopia/angiografia urgente',
        timeToAction: 15,
      },
      {
        description: 'Sangramento retal + dor abdominal intensa + idade >60 anos',
        severity: 'critical',
        clinicalSignificance: 'Isquemia mesentérica',
        immediateAction: 'AngioTC abdome, lactato, cirurgia vascular',
        timeToAction: 30,
      },
      {
        description: 'Enterorragia + febre + leucocitose',
        severity: 'warning',
        clinicalSignificance: 'Colite infecciosa ou isquêmica',
        immediateAction: 'TC abdome, culturas, antibiótico empírico',
        timeToAction: 60,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Doença Diverticular dos Cólons',
        icd10: 'K57.3',
        probability: 'high',
        keyFeatures: ['Sangramento vermelho-vivo indolor', '>60 anos', 'Colonoscopia: divertículos'],
      },
      {
        condition: 'Angiodisplasia',
        icd10: 'K55.2',
        probability: 'medium',
        keyFeatures: ['Sangramento recorrente', 'Idosos', 'Colonoscopia: lesões vasculares'],
      },
      {
        condition: 'Colite Isquêmica',
        icd10: 'K55.0',
        probability: 'medium',
        keyFeatures: ['Dor abdominal + enterorragia', '>65 anos', 'Lactato elevado', 'TC: espessamento colônico'],
      },
      {
        condition: 'Doença Inflamatória Intestinal (DII)',
        icd10: 'K51.9',
        probability: 'medium',
        keyFeatures: ['Jovem', 'Diarreia sanguinolenta crônica', 'Colonoscopia: ulcerações'],
      },
      {
        condition: 'Hemorroidas',
        icd10: 'K64.9',
        probability: 'high',
        keyFeatures: ['Sangue vermelho-vivo às fezes', 'Indolor', 'Exame proctológico: hemorroidas'],
      },
    ],
    initialManagement: `
**PROTOCOLO HEMORRAGIA DIGESTIVA BAIXA - PS**

1. **Diferenciação Inicial**
   - **HDB maciça (hematoquezia volumosa)**: Risco de vida, protocolo agressivo
   - **HDB leve-moderada**: Sangue às fezes, hemodinamicamente estável

2. **Ressuscitação**
   - 2 acessos venosos calibrosos
   - Reposição volêmica
   - Tipagem + reserva de CH
   - Meta Hb >7g/dL

3. **Investigação**
   - **Hemograma, coagulograma, tipagem**
   - **Toque retal**: Diferenciar HDA (melena) vs HDB (vermelho-vivo)
   - **EDA**: Se suspeita de HDA (hematoquezia pode ser HDA volumosa)
   - **Colonoscopia**: Preparo de cólon, realizar em 12-24h
   - **AngioTC**: Se sangramento ativo >0.5mL/min
   - **Cintilografia**: Se sangramento intermitente (sensível mas não localiza)

4. **Conduta por Etiologia**
   - **Diverticular**: Colonoscopia (clipping, injeção de adrenalina)
   - **Angiodisplasia**: Colonoscopia (cauterização)
   - **Isquemia**: Suporte, avaliar cirurgia se necrose
   - **DII**: Corticoide, aminossalicilatos, biológicos
   - **Hemorroidas**: Analgesia, laxantes, cirurgia se refratário

5. **Critérios de Internação/Cirurgia**
   - Instabilidade hemodinâmica
   - Hb <7g/dL
   - Sangramento persistente após colonoscopia
   - Sinais de isquemia ou perfuração
`,
    ebmReferences: [
      {
        source: 'acg-guideline',
        title: 'ACG Guidelines for Lower GI Bleeding',
        pmid: '30404549',
        url: 'https://journals.lww.com/ajg/Fulltext/2019/04000/ACG_Clinical_Guideline__Management_of_Patients.13.aspx',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: ['Oakland Score'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  // ========================================================================
  // INFECCIOSAS (4 queixas)
  // ========================================================================
  {
    code: 'INF_FEVER_PEDIATRIC',
    redFlags: [
      {
        description: 'Febre + petéquias/púrpuras + irritabilidade em lactente',
        severity: 'critical',
        clinicalSignificance: 'Suspeita de meningococcemia',
        immediateAction: 'Ceftriaxona 100mg/kg IV imediata, isolamento, hemoculturas',
        timeToAction: 30,
      },
      {
        description: 'Febre <3 meses de idade',
        severity: 'critical',
        clinicalSignificance: 'Alto risco de infecção bacteriana grave (IBG)',
        immediateAction: 'Hemograma, PCR, hemoculturas, urinocultura, PL, antibiótico empírico',
        timeToAction: 60,
      },
      {
        description: 'Febre + sinais de desidratação grave + recusa alimentar',
        severity: 'warning',
        clinicalSignificance: 'Desidratação com risco de choque',
        immediateAction: 'Reidratação IV, investigar foco infeccioso',
        timeToAction: 30,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Virose Inespecífica',
        icd10: 'B34.9',
        probability: 'high',
        keyFeatures: ['Febre <3 dias', 'Bom estado geral', 'Sem foco aparente', 'Leucograma normal'],
      },
      {
        condition: 'Infecção Urinária',
        icd10: 'N39.0',
        probability: 'high',
        keyFeatures: ['Lactente com febre sem foco', 'EAS: leucocitúria/nitrito', 'Urinocultura +'],
      },
      {
        condition: 'Otite Média Aguda',
        icd10: 'H66.9',
        probability: 'medium',
        keyFeatures: ['Otalgia', 'Otoscopia: hiperemia/abaulamento de MT', 'Irritabilidade'],
      },
      {
        condition: 'Meningite Bacteriana',
        icd10: 'G00.9',
        probability: 'low',
        keyFeatures: ['Febre + rigidez de nuca', 'Fontanela abaulada', 'Petéquias', 'PL: pleocitose'],
      },
      {
        condition: 'Pneumonia',
        icd10: 'J18.9',
        probability: 'medium',
        keyFeatures: ['Tosse', 'Taquipneia', 'Tiragem', 'RX: infiltrado'],
      },
    ],
    initialManagement: `
**PROTOCOLO FEBRE PEDIÁTRICA - PS**

1. **Estratificação de Risco por Idade**
   - **<28 dias (neonato)**: SEMPRE investigar IBG + internar + antibiótico
   - **29 dias - 3 meses**: Critérios de Rochester (baixo risco vs alto risco)
   - **>3 meses**: Avaliar gravidade (triângulo pediátrico de avaliação)

2. **Critérios de Rochester (Baixo Risco de IBG)**
   - Previamente hígido, termo
   - Bom estado geral
   - Leucócitos 5.000-15.000/mm³
   - <10.000 bastões/mm³
   - EAS: <10 leucócitos/campo
   - Fezes: <5 leucócitos/campo (se diarreia)
   → Se TODOS critérios: Observação domiciliar possível

3. **Investigação por Faixa Etária**
   - **<3 meses**: Hemograma, PCR, hemoculturas, urinocultura, PL
   - **3-36 meses com febre sem foco**: Urinocultura (menina), RX tórax se taquipneia
   - **>36 meses**: Investigação direcionada ao foco

4. **Antibioticoterapia Empírica**
   - **Neonato (<28d)**: Ampicilina + Gentamicina (ou Cefotaxima)
   - **1-3 meses**: Ceftriaxona 50mg/kg IV
   - **>3 meses com IBG**: Ceftriaxona 50-100mg/kg IV

5. **Critérios de Internação**
   - Idade <3 meses com febre
   - Sinais de toxemia (letargia, má perfusão)
   - Desidratação grave
   - Suspeita de meningite, sepse
   - Impossibilidade de seguimento ambulatorial
`,
    ebmReferences: [
      {
        source: 'sbp',
        title: 'Diretrizes SBP para Febre sem Sinais Localizatórios',
        url: 'https://www.sbp.com.br/fileadmin/user_upload/Febre_sem_sinais_localizatorios.pdf',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'aap',
        title: 'AAP Clinical Practice Guideline: Febrile Infants',
        pmid: '34312178',
        url: 'https://publications.aap.org/pediatrics/article/148/2/e2021052228/179938',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Ceftriaxona',
        dose: '50-100mg/kg',
        route: 'IV',
        frequency: '1x/dia',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
    ],
    calculadoras: ['Rochester Criteria', 'Yale Observation Scale'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'INF_SEPSIS_SUSPECTED',
    redFlags: [
      {
        description: 'qSOFA ≥2 (FR ≥22, alteração mental, PAS ≤100mmHg)',
        severity: 'critical',
        clinicalSignificance: 'Sepse com alto risco de óbito',
        immediateAction: 'Pacote de 1h: culturas, antibiótico, reposição volêmica 30mL/kg',
        timeToAction: 60,
      },
      {
        description: 'Lactato ≥4 mmol/L',
        severity: 'critical',
        clinicalSignificance: 'Choque séptico',
        immediateAction: 'Reposição agressiva, noradrenalina se refratário, UTI',
        timeToAction: 30,
      },
      {
        description: 'Hipotensão refratária a 30mL/kg de cristaloide',
        severity: 'critical',
        clinicalSignificance: 'Choque séptico refratário',
        immediateAction: 'Vasopressor (noradrenalina), UTI, avaliar foco cirúrgico',
        timeToAction: 15,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Sepse (foco pulmonar)',
        icd10: 'A41.9',
        probability: 'high',
        keyFeatures: ['Pneumonia', 'RX: infiltrado', 'Hemoculturas positivas'],
      },
      {
        condition: 'Sepse (foco urinário)',
        icd10: 'A41.9',
        probability: 'high',
        keyFeatures: ['Pielonefrite', 'EAS: leucocitúria', 'Urinocultura positiva'],
      },
      {
        condition: 'Sepse (foco abdominal)',
        icd10: 'A41.9',
        probability: 'medium',
        keyFeatures: ['Peritonite', 'Abdome agudo', 'TC: perfuração/abscesso'],
      },
      {
        condition: 'Choque Hipovolêmico (não séptico)',
        icd10: 'R57.1',
        probability: 'low',
        keyFeatures: ['Hemorragia', 'Desidratação grave', 'Sem febre'],
      },
    ],
    initialManagement: `
**PROTOCOLO SEPSE E CHOQUE SÉPTICO - PS**

1. **Reconhecimento (qSOFA ≥2)**
   - FR ≥22 irpm
   - Alteração do nível de consciência (Glasgow <15)
   - PAS ≤100 mmHg

2. **Pacote de 1 Hora (ILAS/Surviving Sepsis Campaign)**
   - **0-15min**:
     * Lactato arterial
     * Hemoculturas (2 amostras de sítios diferentes) ANTES de antibiótico
     * Antibiótico empírico de amplo espectro
     * Reposição volêmica: 30mL/kg de cristaloide em 3h

   - **15-60min**:
     * Vasopressor se hipotensão refratária (PAM <65mmHg)
     * Repetir lactato se inicial ≥2 mmol/L

3. **Antibioticoterapia Empírica**
   - **Foco pulmonar**: Ceftriaxona 2g IV + Azitromicina 500mg IV
   - **Foco urinário**: Ceftriaxona 2g IV (ou Piperacilina-tazobactam)
   - **Foco abdominal**: Piperacilina-tazobactam 4.5g IV + Metronidazol
   - **Foco desconhecido**: Piperacilina-tazobactam 4.5g IV
   - **MRSA suspeito**: Adicionar Vancomicina 15mg/kg IV

4. **Metas de Ressuscitação (primeiras 6h)**
   - PAM ≥65 mmHg
   - Diurese ≥0.5 mL/kg/h
   - Lactato em queda
   - ScvO2 ≥70% (se disponível)

5. **Vasopressores**
   - **1ª escolha**: Noradrenalina 0.05-2 mcg/kg/min
   - **2ª escolha**: Vasopressina 0.03 U/min (se refratário)
   - **Dobutamina**: Se disfunção miocárdica (adicionar à noradrenalina)

6. **Critérios de UTI**
   - qSOFA ≥2
   - Necessidade de vasopressor
   - Disfunção orgânica (SOFA ≥2)
`,
    ebmReferences: [
      {
        source: 'ilas',
        title: 'Protocolo Gerenciado de Sepse - ILAS 2024',
        url: 'https://ilas.org.br/protocolo-gerenciado-de-sepse/',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'surviving-sepsis',
        title: 'Surviving Sepsis Campaign Guidelines 2021',
        pmid: '34605781',
        url: 'https://www.sccm.org/SurvivingSepsisCampaign/Home',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    medications: [
      {
        genericName: 'Ceftriaxona',
        dose: '2g',
        route: 'IV',
        frequency: '1x/dia',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
      {
        genericName: 'Noradrenalina',
        dose: '0.05-2 mcg/kg/min',
        route: 'IV',
        frequency: 'infusão contínua',
        susAvailable: true,
        renameCompatible: true,
        renameList: 'A',
        evidenceLevel: 'A',
      },
    ],
    calculadoras: ['qSOFA', 'SOFA Score', 'APACHE II'],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'INF_FEVER_WITH_RASH',
    redFlags: [
      {
        description: 'Febre + petéquias/púrpuras (não branqueáveis) + instabilidade hemodinâmica',
        severity: 'critical',
        clinicalSignificance: 'Meningococcemia ou sepse com CID',
        immediateAction: 'Ceftriaxona 2g IV imediata, isolamento respiratório, reposição volêmica',
        timeToAction: 30,
      },
      {
        description: 'Febre + rash + mucosas hiperemiadas + descamação palmo-plantar',
        severity: 'critical',
        clinicalSignificance: 'Síndrome do Choque Tóxico ou Doença de Kawasaki',
        immediateAction: 'Hemoculturas, antibiótico anti-estafilocócico (clindamicina + vancomicina)',
        timeToAction: 60,
      },
      {
        description: 'Febre + exantema + gestante',
        severity: 'warning',
        clinicalSignificance: 'Risco de infecções congênitas (rubéola, Zika, CMV)',
        immediateAction: 'Isolamento, sorologias, ultrassom obstétrico',
        timeToAction: 120,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Dengue',
        icd10: 'A90',
        probability: 'high',
        keyFeatures: ['Febre + rash maculopapular', 'Mialgia', 'Prova do laço +', 'Leucopenia'],
      },
      {
        condition: 'Meningococcemia',
        icd10: 'A39.4',
        probability: 'medium',
        keyFeatures: ['Petéquias/púrpuras', 'Instabilidade hemodinâmica', 'Evolução rápida'],
      },
      {
        condition: 'Exantema Viral (rubéola, sarampo, Zika)',
        icd10: 'B06.9',
        probability: 'high',
        keyFeatures: ['Rash maculopapular', 'Linfonodomegalia', 'Bom estado geral'],
      },
      {
        condition: 'Farmacodermia',
        icd10: 'L27.0',
        probability: 'medium',
        keyFeatures: ['História de medicamento recente', 'Eosinofilia', 'Prurido'],
      },
      {
        condition: 'Kawasaki',
        icd10: 'M30.3',
        probability: 'low',
        keyFeatures: ['Criança <5 anos', 'Febre >5 dias', 'Conjuntivite', 'Lábios fissurados'],
      },
    ],
    initialManagement: `
**PROTOCOLO FEBRE + RASH - PS**

1. **Classificação de Urgência por Tipo de Rash**
   - **URGENTE (antibiótico imediato)**:
     * Petéquias/púrpuras não-branqueáveis
     * Rash + instabilidade hemodinâmica
     * Suspeita de meningococcemia

   - **NÃO URGENTE (investigar)**:
     * Rash maculopapular sem toxemia
     * Provável virose

2. **Exame Físico Focado**
   - Tipo de rash: macular, papular, vesicular, petequial, purpúrico
   - Distribuição: centrípeto vs centrífugo
   - Mucosas: enantema, conjuntivite
   - Sinais meníngeos
   - Linfonodos

3. **Investigação**
   - Hemograma (leucopenia em dengue, leucocitose em bacteriana)
   - PCR, procalcitonina (se suspeita bacteriana)
   - Sorologias: Dengue, Zika, Chikungunya, HIV, sífilis
   - Hemoculturas (se petéquias ou toxemia)

4. **Conduta por Diagnóstico**
   - **Meningococcemia**: Ceftriaxona 2g IV, isolamento, notificação
   - **Dengue**: Hidratação, monitorar plaquetas/hematócrito
   - **Kawasaki**: Imunoglobulina IV + AAS, ecocardiograma
   - **Farmacodermia**: Suspender droga, anti-histamínico
   - **Virose**: Sintomáticos, orientação de retorno

5. **Critérios de Internação**
   - Petéquias/púrpuras extensas
   - Instabilidade hemodinâmica
   - Suspeita de Kawasaki
   - Gestante com exantema
`,
    ebmReferences: [
      {
        source: 'ms-brasil',
        title: 'Protocolo de Dengue - Ministério da Saúde 2024',
        url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: [],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },

  {
    code: 'INF_DENGUE_SUSPECTED',
    redFlags: [
      {
        description: 'Sinais de alarme: dor abdominal intensa, vômitos persistentes, sangramento',
        severity: 'critical',
        clinicalSignificance: 'Risco de evolução para dengue grave (choque)',
        immediateAction: 'Internação, hidratação IV vigorosa, monitorar hematócrito/plaquetas 6/6h',
        timeToAction: 30,
      },
      {
        description: 'Hipotensão + pulso filiforme + extremidades frias',
        severity: 'critical',
        clinicalSignificance: 'Síndrome do Choque da Dengue',
        immediateAction: 'Reposição volêmica agressiva (20mL/kg em 20min), UTI',
        timeToAction: 10,
      },
      {
        description: 'Plaquetas <20.000/mm³ + sangramento espontâneo',
        severity: 'critical',
        clinicalSignificance: 'Dengue grave com CID',
        immediateAction: 'Transfusão de plaquetas, avaliar sangramento ativo',
        timeToAction: 30,
      },
    ],
    differentialDiagnoses: [
      {
        condition: 'Dengue Clássica',
        icd10: 'A90',
        probability: 'high',
        keyFeatures: ['Febre', 'Mialgia', 'Cefaleia', 'Exantema', 'Prova do laço +'],
      },
      {
        condition: 'Dengue com Sinais de Alarme',
        icd10: 'A91',
        probability: 'medium',
        keyFeatures: ['Dor abdominal', 'Vômitos', 'Letargia', 'Hepatomegalia', 'Ht em ascensão'],
      },
      {
        condition: 'Dengue Grave (Choque)',
        icd10: 'A91',
        probability: 'low',
        keyFeatures: ['Choque', 'Sangramento grave', 'Disfunção orgânica'],
      },
      {
        condition: 'Chikungunya',
        icd10: 'A92.0',
        probability: 'medium',
        keyFeatures: ['Artralgia intensa', 'Edema articular', 'Menos sangramento'],
      },
      {
        condition: 'Zika',
        icd10: 'A92.8',
        probability: 'medium',
        keyFeatures: ['Rash pruriginoso', 'Conjuntivite', 'Quadro mais leve'],
      },
    ],
    initialManagement: `
**PROTOCOLO DENGUE - PS**

1. **Classificação de Risco (Ministério da Saúde)**
   - **Grupo A (sem sangramento, sem comorbidades)**: Ambulatorial
   - **Grupo B (sangramento espontâneo OU comorbidades)**: Observação/leito-dia
   - **Grupo C (sinais de alarme)**: Internação hospitalar
   - **Grupo D (dengue grave/choque)**: UTI

2. **Sinais de Alarme (Grupo C)**
   - Dor abdominal intensa e contínua
   - Vômitos persistentes
   - Acúmulo de líquidos (ascite, derrame pleural)
   - Sangramento de mucosas
   - Letargia/irritabilidade
   - Hepatomegalia >2cm
   - Hematócrito em ascensão + queda de plaquetas

3. **Hidratação**
   - **Grupo A**: VO 60-80 mL/kg/dia (1/3 SRO, 2/3 água/sucos)
   - **Grupo B**: VO ou IV se intolerância
   - **Grupo C**: Soro fisiológico 10 mL/kg/h por 2h → reavaliar
   - **Grupo D (choque)**: SF 20 mL/kg em 20 min → repetir até 3x

4. **Monitorização (Grupos B/C/D)**
   - Hemograma + hematócrito a cada 6-12h
   - Sinais vitais a cada 4h
   - Diurese (meta >1mL/kg/h)
   - Ausculta pulmonar (edema pulmonar por excesso de hidratação)

5. **Critérios de Alta (Grupo A)**
   - Ausência de sinais de alarme
   - Hemodinamicamente estável
   - Hematócrito estável
   - Plaquetas em ascensão (idealmente >50.000)
   - 48h sem febre
   - Retorno garantido se piora
`,
    ebmReferences: [
      {
        source: 'ms-brasil',
        title: 'Dengue: Diagnóstico e Manejo Clínico - MS 2024',
        url: 'https://bvsms.saude.gov.br/bvs/publicacoes/dengue_diagnostico_manejo_clinico_adulto_crianca.pdf',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
      {
        source: 'paho',
        title: 'WHO/PAHO Dengue Guidelines 2023',
        url: 'https://iris.paho.org/handle/10665.2/55514',
        evidenceLevel: 'A',
        lastAccessed: '2026-01-06T00:00:00Z',
      },
    ],
    calculadoras: [],
    lastEBMReview: '2026-01-06T00:00:00Z',
  },
]

// ============================================================================
// Funções de Seeding
// ============================================================================

async function updateComplaintWithEBM(
  complaintCode: string,
  ebmData: ComplaintEBMData
): Promise<void> {
  const complaint = await prisma.chief_complaints.findFirst({
    where: { code: complaintCode },
  })

  if (!complaint) {
    throw new Error(`Complaint ${complaintCode} não encontrado`)
  }

  const currentData = (complaint.additional_data as Prisma.JsonObject) || {}

  const ebmContent: ComplaintExtendedContentEBM = {
    redFlags: ebmData.redFlags,
    diagnosticoDiferencial: ebmData.differentialDiagnoses,
    condutaInicial: ebmData.initialManagement,
    calculadoras: ebmData.calculadoras || [],
    ebmReferences: ebmData.ebmReferences,
    medications: ebmData.medications || [],
    lastEBMReview: ebmData.lastEBMReview,
    evidenceQuality: 'high',
  }

  const validation = ComplaintExtendedContentEBMSchema.safeParse(ebmContent)

  if (!validation.success) {
    console.error(chalk.red(`Validação falhou para ${ebmData.code}:`))
    if (validation.error && validation.error.issues) {
      validation.error.issues.forEach((err: any) => {
        console.error(chalk.yellow(`  - ${err.path?.join('.') || 'unknown'}: ${err.message}`))
      })
    } else {
      console.error(chalk.yellow(`  Estrutura de erro inesperada:`))
      console.error(JSON.stringify(validation, null, 2))
    }
    throw new Error(`EBM content inválido para ${ebmData.code}`)
  }

  const updatedAdditionalData = {
    ...currentData,
    extendedContentEBM: ebmContent,
    sync: {
      contentHash: `ebm-seed-${Date.now()}`,
      lastSyncedAt: new Date().toISOString(),
      syncSource: 'system' as const,
    },
  }

  await prisma.chief_complaints.update({
    where: { id: complaint.id },
    data: {
      additional_data: updatedAdditionalData as unknown as Prisma.InputJsonValue,
      updated_at: new Date(),
    },
  })

  console.log(chalk.green(`   ✓ Atualizado: ${ebmData.code}`))
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  console.log(chalk.blue.bold('\n╔════════════════════════════════════════════════════╗'))
  console.log(chalk.blue.bold('║   Seed EBM Content - Próximas 17 High-Acuity      ║'))
  console.log(chalk.blue.bold('╚════════════════════════════════════════════════════╝\n'))

  console.log(chalk.blue('📝 Populando com EBM content...\n'))

  let seeded = 0
  let errors = 0

  for (const ebmData of NEXT_17_EBM_DATA) {
    try {
      await updateComplaintWithEBM(ebmData.code, ebmData)
      seeded += 1
    } catch (error) {
      console.error(chalk.red(`   ✖ Erro ao seedar ${ebmData.code}:`), error)
      errors += 1
    }
  }

  console.log(chalk.blue('\n📊 Resumo:'))
  console.log(chalk.green(`   ✓ ${seeded} queixas com EBM completo`))
  if (errors > 0) {
    console.log(chalk.red(`   ✖ ${errors} erros`))
  }
  console.log(chalk.gray(`   Total processado: ${NEXT_17_EBM_DATA.length}\n`))

  console.log(chalk.green('✅ Seeding concluído!\n'))
  console.log(chalk.blue('📈 Progresso EBM:'))
  console.log(chalk.gray('   Antes: 3/48 (6%)'))
  console.log(chalk.green(`   Agora: ${3 + seeded}/48 (${Math.round(((3 + seeded) / 48) * 100)}%)\n`))
}

main()
  .catch((error) => {
    console.error(chalk.red('Erro fatal:'), error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
