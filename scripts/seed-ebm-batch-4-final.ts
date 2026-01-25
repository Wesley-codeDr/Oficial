#!/usr/bin/env tsx
import { PrismaClient, Prisma } from '@prisma/client'
import chalk from 'chalk'
import { validateEBMContent } from '../lib/validation/ebm'

const prisma = new PrismaClient()

// ============================================================================
// EBM Content - Batch 4 FINAL (11 High-Acuity Complaints) - 100% Coverage!
// ============================================================================

const ebmBatch4Final = [
  // =========================================================================
  // OBSTETRIC: Vaginal Bleeding in Pregnancy
  // =========================================================================
  {
    code: 'OBG_VAGINAL_BLEEDING_PREGNANT',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Sangramento volumoso + choque + >20 semanas gestação',
          severity: 'critical' as const,
          clinicalSignificance: 'Descolamento prematuro placenta ou placenta prévia sangrante',
          immediateAction: 'Acesso venoso 2x, cristaloide, tipagem sanguínea, obstetrícia urgente',
          timeToAction: 15,
          references: [
            {
              source: 'brazilian-guideline' as const,
              title: 'FEBRASGO - Hemorragia na Gestação',
              lastAccessed: '2025-01-06T00:00:00Z',
              evidenceLevel: 'A' as const,
            },
          ],
        },
        {
          description: 'Sangramento + dor abdominal intensa + BCF ausente',
          severity: 'critical' as const,
          clinicalSignificance: 'Descolamento prematuro de placenta',
          immediateAction: 'Ressuscitação volêmica, cesárea urgente se viabilidade fetal',
          timeToAction: 30,
        },
        {
          description: 'Sangramento 1º trimestre + dor + massa anexial + βHCG+',
          severity: 'critical' as const,
          clinicalSignificance: 'Gravidez ectópica rota',
          immediateAction: 'Acesso venoso, cristaloide, ultrassom transvaginal, cirurgia urgente',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Aborto (Ameaça, Inevitável, Incompleto)',
          icd10: 'O20.0',
          probability: 'high' as const,
          keyFeatures: [
            'Sangramento 1º trimestre (<12 semanas)',
            'Cólica hipogástrica',
            'Colo fechado (ameaça) ou aberto (inevitável)',
            'βHCG+ mas em queda',
          ],
          diagnosticTests: ['βHCG quantitativo', 'Ultrassom transvaginal', 'Hemograma'],
        },
        {
          condition: 'Gravidez Ectópica',
          icd10: 'O00.9',
          probability: 'high' as const,
          keyFeatures: [
            'Sangramento escuro + dor unilateral',
            'Massa anexial ao toque',
            'βHCG+ mas não dobra em 48h',
            'Fatores de risco: DIP, DIU, cirurgia tubária',
          ],
          diagnosticTests: ['βHCG seriado', 'Ultrassom transvaginal', 'Culdocentese se instável'],
        },
        {
          condition: 'Placenta Prévia',
          icd10: 'O44.1',
          probability: 'medium' as const,
          keyFeatures: [
            'Sangramento indolor, vermelho vivo',
            '>20 semanas',
            'Cessação espontânea recorrente',
            'Apresentação fetal anômala',
          ],
          diagnosticTests: ['Ultrassom (NÃO toque vaginal!)', 'Tipagem sanguínea', 'Reserva hemácias'],
          specificRedFlags: ['NUNCA fazer toque vaginal (pode desencadear hemorragia)'],
        },
        {
          condition: 'Descolamento Prematuro de Placenta (DPP)',
          icd10: 'O45.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Sangramento escuro + dor abdominal intensa',
            'Útero hipertônico, "lenhoso"',
            'Sofrimento fetal (bradicardia)',
            'Choque desproporcional ao sangramento visível',
          ],
          diagnosticTests: ['Ultrassom', 'Coagulograma (CIVD)', 'Cardiotocografia'],
        },
        {
          condition: 'Rotura Uterina',
          icd10: 'O71.1',
          probability: 'low' as const,
          keyFeatures: [
            'Cesárea prévia + trabalho parto',
            'Dor súbita intensa + cessação contrações',
            'Choque + perda tônus uterino',
          ],
          diagnosticTests: ['Ultrassom', 'Laparotomia urgente'],
        },
      ],
      condutaInicial: `**Abordagem por Trimestre:**

**1º Trimestre (<12 semanas):**
- **Ameaça de Aborto (sangramento leve, colo fechado):**
  - Repouso relativo
  - Progesterona (controverso, considerar)
  - βHCG + ultrassom para confirmar viabilidade
  - Seguimento ambulatorial

- **Gravidez Ectópica:**
  - Critérios clínicos: dor + sangramento + βHCG+ sem saco gestacional intrauterino
  - **Estável:** Metotrexato IM (se critérios)
  - **Instável:** Laparoscopia/laparotomia urgente

**2º/3º Trimestre (>20 semanas):**
- **Placenta Prévia:**
  - Repouso hospitalar
  - **NÃO** toque vaginal
  - Corticoide (betametasona) se <34 semanas
  - Cesárea eletiva 36-37 semanas
  - Cesárea urgente se sangramento volumoso

- **Descolamento Prematuro Placenta:**
  - Ressuscitação: 2 acessos calibrosos, cristaloide
  - Tipagem sanguínea, reserva hemácias
  - Cesárea urgente se feto viável + sofrimento fetal
  - Parto vaginal se óbito fetal

**Exames Universais:**
- βHCG quantitativo
- Hemograma, tipagem sanguínea, Rh
- Ultrassom (transvaginal 1º tri, abdominal 2º/3º tri)
- Cardiotocografia (se >24 semanas)

**Critérios de Internação:**
- Sangramento moderado/volumoso
- Instabilidade hemodinâmica
- Suspeita placenta prévia ou DPP
- Gravidez ectópica instável`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'FEBRASGO - Sangramento na Gestação',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'uptodate' as const,
          title: 'Vaginal Bleeding in Pregnancy',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Betametasona',
          dose: '12mg',
          route: 'IM' as const,
          frequency: '2 doses 24h intervalo',
          duration: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'Corticoide antenatal se <34 semanas + risco parto prematuro',
        },
        {
          genericName: 'Metotrexato',
          dose: '50mg/m²',
          route: 'IM' as const,
          frequency: 'Dose única',
          susAvailable: false,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
          specialNotes: 'Gravidez ectópica não rota: βHCG <5000, massa <3,5cm, sem BCF',
          contraindications: ['Instabilidade hemodinâmica', 'Rotura', 'Amamentação'],
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['FEBRASGO - Hemorragia Gestacional'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // OBSTETRIC: Labor
  // =========================================================================
  {
    code: 'OBG_LABOR',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Sangramento volumoso vermelho vivo + trabalho parto',
          severity: 'critical' as const,
          clinicalSignificance: 'Placenta prévia ou DPP sangrante',
          immediateAction: 'Acesso venoso 2x, tipagem, cesárea urgente',
          timeToAction: 20,
        },
        {
          description: 'BCF <110 ou >160 persistente + desacelerações tardias',
          severity: 'critical' as const,
          clinicalSignificance: 'Sofrimento fetal agudo',
          immediateAction: 'Decúbito lateral esquerdo, O2, cesárea urgente se refratário',
          timeToAction: 30,
        },
        {
          description: 'Prolapso cordão umbilical',
          severity: 'critical' as const,
          clinicalSignificance: 'Compressão vascular, hipóxia fetal',
          immediateAction: 'Elevar apresentação fetal, decúbito genupeitoral, cesárea STAT',
          timeToAction: 10,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Trabalho de Parto Prematuro (<37 semanas)',
          icd10: 'O60.1',
          probability: 'high' as const,
          keyFeatures: [
            'Contrações regulares <37 semanas',
            'Colo dilatando/apagando',
            'Risco prematuridade',
          ],
          diagnosticTests: ['Cardiotocografia', 'Toque vaginal', 'Ultrassom (colo)'],
        },
        {
          condition: 'Trabalho de Parto a Termo (≥37 semanas)',
          icd10: 'O80',
          probability: 'high' as const,
          keyFeatures: [
            'Contrações regulares (3-4 em 10min)',
            'Dilatação ≥4cm + apagamento',
            'Rotura membranas (espontânea ou artificial)',
          ],
          diagnosticTests: ['Partograma', 'Cardiotocografia contínua'],
        },
        {
          condition: 'Distocia (Progressão Inadequada)',
          icd10: 'O62.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Fase ativa: dilatação <1cm/h (nulípara) ou <2cm/h (multípara)',
            'Período expulsivo prolongado (>2h nulípara, >1h multípara)',
            'Desproporção céfalo-pélvica',
          ],
          diagnosticTests: ['Partograma', 'Pelvimetria clínica', 'Considerar cesárea'],
        },
        {
          condition: 'Rotura Prematura Membranas (RPM)',
          icd10: 'O42.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Perda líquido súbita antes trabalho parto',
            'Teste cristalização (arborização)',
            'pH >6 (papel nitrazina)',
          ],
          diagnosticTests: ['Especular (não tocar!)', 'Ultrassom (líquido amniótico)', 'Cardiotocografia'],
        },
        {
          condition: 'Pré-eclâmpsia Grave em Trabalho Parto',
          icd10: 'O14.1',
          probability: 'low' as const,
          keyFeatures: [
            'PA ≥160x110 + proteinúria',
            'Cefaleia, escotomas, epigastralgia',
            'Plaquetas <100k',
          ],
          diagnosticTests: ['PA contínua', 'Sulfato magnésio', 'Parto (tratamento definitivo)'],
        },
      ],
      condutaInicial: `**Avaliação Inicial:**

**1. Confirmar Trabalho de Parto:**
- Contrações regulares (≥3 em 10min)
- Dilatação ≥4cm + apagamento >50%
- Rotura membranas (espontânea ou artificial)

**2. Avaliação Fetal:**
- Cardiotocografia (BCF basal 110-160, variabilidade 6-25)
- Líquido amniótico (claro vs meconiado)
- Apresentação (cefálica vs pélvica)

**3. Avaliação Materna:**
- Sinais vitais (PA, FC, temperatura)
- Toque vaginal (dilatação, apagamento, altura apresentação, variedade posição)
- Anamnese obstétrica (paridade, cesáreas prévias, comorbidades)

**Manejo Trabalho Parto Normal:**

**Fase Latente (0-4cm):**
- Deambulação
- Hidratação oral
- Analgesia se necessário

**Fase Ativa (4-10cm):**
- Partograma (monitorar dilatação)
- Cardiotocografia contínua
- Analgesia peridural (se desejado)
- Amniotomia (se membranas íntegras + dilatação >6cm)

**Período Expulsivo (10cm até nascimento):**
- Puxos coordenados
- Manobra Kristeller CONTRAINDICADA
- Episiotomia seletiva (não rotineira)

**Indução Trabalho Parto (se indicado):**
- Misoprostol 25mcg vaginal q4-6h (nulíparas)
- Ocitocina IV (se membranas rotas ou após misoprostol)

**Critérios para Cesárea Urgente:**
- Sofrimento fetal agudo (bradicardia <110)
- Prolapso cordão
- Descolamento prematuro placenta
- Distocia (desproporção)
- Apresentação pélvica + nulípara`,
      calculadoras: ['Partograma (WHO)', 'Bishop Score'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'FEBRASGO - Assistência ao Parto',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'uptodate' as const,
          title: 'Management of Normal Labor',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Ocitocina',
          dose: '2,5-5 UI em 500mL SF',
          route: 'IV' as const,
          frequency: 'Titular (iniciar 2mL/h, dobrar q30min)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'Indução/condução trabalho parto',
        },
        {
          genericName: 'Misoprostol',
          dose: '25mcg',
          route: 'Vaginal' as const,
          frequency: 'q4-6h (máx 6 doses)',
          susAvailable: true,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
          specialNotes: 'Amadurecimento colo + indução',
          contraindications: ['Cesárea prévia', 'Cicatriz uterina'],
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['FEBRASGO - Parto Normal'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // PEDIATRIC: Respiratory Distress
  // =========================================================================
  {
    code: 'PED_RESPIRATORY_DISTRESS',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'SpO2 <90% + cianose central + batimento asa nasal',
          severity: 'critical' as const,
          clinicalSignificance: 'Insuficiência respiratória grave',
          immediateAction: 'O2 100%, considerar VNI/IOT, broncodilatador se broncoespasmo',
          timeToAction: 10,
        },
        {
          description: 'Estridor inspiratório + tiragem + sialorreia + febre',
          severity: 'critical' as const,
          clinicalSignificance: 'Epiglotite (obstrução via aérea iminente)',
          immediateAction: 'NÃO examinar orofaringe, O2, IOT em sala cirúrgica',
          timeToAction: 20,
        },
        {
          description: 'Apneia + bradicardia + lactente <2 meses',
          severity: 'critical' as const,
          clinicalSignificance: 'Bronquiolite grave ou coqueluche',
          immediateAction: 'Monitorização, O2, suporte ventilatório, UTI',
          timeToAction: 15,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Bronquiolite Viral (VRS)',
          icd10: 'J21.0',
          probability: 'high' as const,
          keyFeatures: [
            'Lactente <2 anos',
            'Coriza + tosse + sibilância',
            'Tiragem subcostal/intercostal',
            'Sazonalidade (inverno)',
          ],
          diagnosticTests: ['SpO2', 'Rx tórax (hiperinsuflação)', 'Painel viral (opcional)'],
        },
        {
          condition: 'Asma/Broncoespasmo',
          icd10: 'J45.9',
          probability: 'high' as const,
          keyFeatures: [
            'Sibilância expiratória',
            'História atópica/asma',
            'Resposta a broncodilatador',
            'Sem febre',
          ],
          diagnosticTests: ['SpO2', 'Peak flow', 'Rx tórax (se 1º episódio)'],
        },
        {
          condition: 'Pneumonia',
          icd10: 'J18.9',
          probability: 'high' as const,
          keyFeatures: [
            'Febre + tosse + taquipneia',
            'Tiragem + estertores localizados',
            'Sem sibilância (diferente bronquiolite)',
          ],
          diagnosticTests: ['Rx tórax (consolidação)', 'Hemograma', 'PCR'],
        },
        {
          condition: 'Crupe (Laringotraqueobronquite)',
          icd10: 'J05.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Tosse "de cachorro"',
            'Estridor inspiratório',
            'Rouquidão',
            '6 meses - 3 anos',
          ],
          diagnosticTests: ['Clínico', 'Rx pescoço (sinal da torre - opcional)'],
        },
        {
          condition: 'Epiglotite',
          icd10: 'J05.1',
          probability: 'low' as const,
          keyFeatures: [
            'Febre alta + toxemia',
            'Sialorreia, disfagia',
            'Posição tripé',
            'Estridor + abafamento voz',
          ],
          diagnosticTests: ['NÃO examinar garganta!', 'Rx lateral pescoço (polegar - opcional)', 'IOT em sala'],
        },
      ],
      condutaInicial: `**Triagem Respiratória Pediátrica:**

**Classificação Gravidade (Escore Tal - Crupe/Bronquiolite):**
- Leve (0-4): SpO2 >94%, tiragem leve
- Moderado (5-7): SpO2 90-94%, tiragem ++
- Grave (8-12): SpO2 <90%, tiragem +++, cianose

**Manejo por Diagnóstico:**

**Bronquiolite:**
- **Suporte:** O2 se SpO2 <90%, hidratação
- **Aspiração nasal** (soro fisiológico)
- **NÃO usar:** broncodilatador rotineiro, corticoide
- **Internação:** <3 meses, SpO2 <92%, desidratação

**Asma/Broncoespasmo:**
- **Salbutamol** (aerosol): 2,5-5mg 20/20min x3 doses
- **Prednisolona** VO: 1-2mg/kg dose única
- **O2** se SpO2 <92%
- **Internação:** resposta parcial, SpO2 <92%

**Crupe:**
- **Dexametasona** 0,6mg/kg VO/IM dose única
- **Adrenalina** nebulizada (grave): 5mL 1:1000 (racêmica)
- **Observação** 2-4h (rebote adrenalina)

**Pneumonia:**
- **Amoxicilina** 50mg/kg/dia VO (ambulatorial)
- **Penicilina Cristalina** 50.000 UI/kg/dose IV 6/6h (internação)
- **O2** se SpO2 <92%

**Epiglotite:**
- **NÃO** examinar orofaringe (risco obstrução total)
- **IOT** em sala cirúrgica (anestesista + otorrino)
- **Ceftriaxona** 100mg/kg/dia

**Critérios Internação:**
- SpO2 <92% em ar ambiente
- FR muito elevada (lactente >60, pré-escolar >50)
- Tiragem importante, gemência
- Desidratação, incapacidade alimentação
- Comorbidades (cardiopatia, prematuridade)`,
      calculadoras: ['Escore Tal (Crupe)', 'Silverman-Andersen (RN)', 'Wood-Downes (Asma)'],
      ebmReferences: [
        {
          source: 'sbp' as const,
          title: 'SBP - Diretrizes Bronquiolite',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'aap' as const,
          title: 'AAP - Bronchiolitis Guidelines',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Salbutamol (aerosol)',
          dose: '2,5-5mg',
          route: 'Inalatório' as const,
          frequency: '20/20min x3, depois 4/4h',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Dexametasona',
          dose: '0,6mg/kg',
          route: 'VO' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'Crupe - efeito máximo 6h, duração 48h',
        },
        {
          genericName: 'Adrenalina racêmica 1:1000',
          dose: '0,5mL/kg (máx 5mL)',
          route: 'Inalatório' as const,
          frequency: 'SOS (crupe grave)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Efeito rápido mas transitório (2-3h), observar rebote',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBP - Bronquiolite', 'SBP - Asma'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // PEDIATRIC: Dehydration
  // =========================================================================
  {
    code: 'PED_DEHYDRATION',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Choque + oligúria + letargia + fontanela deprimida',
          severity: 'critical' as const,
          clinicalSignificance: 'Desidratação grave (>10% peso) com choque hipovolêmico',
          immediateAction: 'Acesso venoso, SF 20mL/kg bolus rápido, repetir se necessário',
          timeToAction: 15,
        },
        {
          description: 'Desidratação + convulsão + hipernatremia (Na >160)',
          severity: 'critical' as const,
          clinicalSignificance: 'Desidratação hipernatrêmica com risco hemorragia cerebral',
          immediateAction: 'Reidratação LENTA (correção em 48h), evitar queda rápida Na',
          timeToAction: 60,
        },
        {
          description: 'Diarreia sanguinolenta + oligúria + palidez + petéquias',
          severity: 'warning' as const,
          clinicalSignificance: 'Síndrome Hemolítico-Urêmica (SHU)',
          immediateAction: 'Hemograma, função renal, diálise se IRA, NÃO ATB se E.coli O157',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Gastroenterite Aguda com Desidratação',
          icd10: 'A09',
          probability: 'high' as const,
          keyFeatures: [
            'Diarreia + vômitos',
            'Mucosas secas, olhos encovados',
            'Turgor pastoso, fontanela deprimida',
            'Perda peso aguda',
          ],
          diagnosticTests: ['Avaliação clínica grau desidratação', 'Eletrólitos se grave', 'Coprocultura se fezes sanguinolentas'],
        },
        {
          condition: 'Desidratação Isotônica (Na 130-150)',
          icd10: 'E86',
          probability: 'high' as const,
          keyFeatures: [
            'Perda proporcional água + eletrólitos',
            'Maioria gastroenterites',
            'Sem alterações neurológicas',
          ],
          diagnosticTests: ['Sódio sérico 130-150', 'Reidratação padrão OMS'],
        },
        {
          condition: 'Desidratação Hiponatrêmica (Na <130)',
          icd10: 'E87.1',
          probability: 'medium' as const,
          keyFeatures: [
            'Perda sódio > água',
            'Edema, convulsões',
            'Uso água pura sem eletrólitos',
          ],
          diagnosticTests: ['Sódio <130', 'Correção sódio cautelosa (0,5 mEq/L/h)'],
        },
        {
          condition: 'Desidratação Hipernatrêmica (Na >150)',
          icd10: 'E87.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Perda água > sódio',
            'Pele pastosa, sede intensa',
            'Irritabilidade, convulsões',
            'Risco hemorragia cerebral',
          ],
          diagnosticTests: ['Sódio >150', 'Correção LENTA (queda máx 0,5 mEq/L/h)'],
        },
        {
          condition: 'Síndrome Hemolítico-Urêmica (SHU)',
          icd10: 'D59.3',
          probability: 'low' as const,
          keyFeatures: [
            'Diarreia sanguinolenta prévia (E.coli O157)',
            'Tríade: anemia hemolítica, plaquetopenia, IRA',
            'Palidez, petéquias, oligúria',
          ],
          diagnosticTests: ['Hemograma (esquizócitos)', 'Função renal', 'LDH elevado', 'Haptoglobina baixa'],
        },
      ],
      condutaInicial: `**Avaliação Grau Desidratação (OMS):**

**Leve (<5% peso):**
- Sinais: sede, mucosas úmidas
- Conduta: SRO via oral (50mL/kg em 4h + repor perdas)

**Moderada (5-10% peso):**
- Sinais: olhos encovados, turgor diminuído, fontanela deprimida
- Conduta: SRO oral/SNG (100mL/kg em 4h) ou SF IV se vômitos

**Grave (>10% peso):**
- Sinais: choque, letargia, extremidades frias, pulso fraco
- Conduta: SF IV 20mL/kg bolus (repetir até 60mL/kg se necessário)

**Plano de Reidratação:**

**Fase de Expansão (se choque):**
- SF 0,9% ou Ringer Lactato
- 20mL/kg IV em 15-30min
- Repetir até restaurar perfusão

**Fase de Manutenção + Reposição:**
- Fórmula Holliday-Segar (manutenção):
  - 0-10kg: 100mL/kg/dia
  - 10-20kg: 1000mL + 50mL/kg acima 10kg
  - >20kg: 1500mL + 20mL/kg acima 20kg
- Déficit: repor em 24-48h (desidratação moderada/grave)
- Perdas contínuas: repor mL por mL

**Solução de Reidratação Oral (SRO):**
- OMS: glicose 13,5g/L + NaCl 2,6g/L + KCl 1,5g/L + citrato 2,9g/L
- Dose: 50-100mL/kg em 4-6h
- Ofertar pequenos volumes frequentes

**Reidratação IV (se vômitos incoercíveis, choque, íleo):**
- SF 0,9% ou Ringer Lactato
- Monitorar diurese (meta >1mL/kg/h)

**Critérios de Internação:**
- Desidratação grave (>10%)
- Vômitos incoercíveis
- Alterações neurológicas
- Lactente <3 meses
- Falha TRO ambulatorial`,
      calculadoras: ['Escala de Desidratação OMS', 'Holliday-Segar (Manutenção)'],
      ebmReferences: [
        {
          source: 'sbp' as const,
          title: 'SBP - Terapia de Reidratação Oral',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'paho' as const,
          title: 'PAHO/OMS - Tratamento da Diarreia',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Soro de Reidratação Oral (SRO)',
          dose: '50-100mL/kg',
          route: 'VO' as const,
          frequency: 'Pequenos volumes frequentes (5-10mL q5min)',
          duration: '4-6h',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Soro Fisiológico 0,9%',
          dose: '20mL/kg',
          route: 'IV' as const,
          frequency: 'Bolus 15-30min (repetir se choque)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
        {
          genericName: 'Ondansetrona',
          dose: '0,15mg/kg',
          route: 'VO' as const,
          frequency: 'Dose única',
          susAvailable: false,
          renameCompatible: false,
          specialNotes: 'Reduz vômitos, facilita TRO (uso seletivo)',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBP - Diarreia e Desidratação', 'MS - TRO'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // PEDIATRIC: Febrile Seizure
  // =========================================================================
  {
    code: 'PED_FEBRILE_SEIZURE',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Convulsão + rigidez nuca + fontanela abaulada + petéquias',
          severity: 'critical' as const,
          clinicalSignificance: 'Meningite bacteriana',
          immediateAction: 'Ceftriaxona empírica, punção lombar após estabilização, isolamento',
          timeToAction: 30,
        },
        {
          description: 'Convulsão >15min ou múltiplas em 24h + febre',
          severity: 'warning' as const,
          clinicalSignificance: 'Convulsão febril complexa (risco epilepsia)',
          immediateAction: 'Benzodiazepínico IV, investigar causa, neurologia',
          timeToAction: 15,
        },
        {
          description: 'Convulsão focal + febre + <6 meses ou >5 anos',
          severity: 'warning' as const,
          clinicalSignificance: 'Fora da faixa típica convulsão febril simples',
          immediateAction: 'Investigação neurológica (TC/RM, EEG)',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Convulsão Febril Simples',
          icd10: 'R56.0',
          probability: 'high' as const,
          keyFeatures: [
            'Idade 6 meses - 5 anos',
            'Tônico-clônica generalizada',
            'Duração <15min',
            'Única em 24h',
            'Sem déficit pós-ictal',
          ],
          diagnosticTests: ['Avaliação clínica', 'Investigar foco infeccioso', 'NÃO necessita neuroimagem/EEG'],
        },
        {
          condition: 'Convulsão Febril Complexa',
          icd10: 'R56.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Focal',
            'Duração >15min',
            'Múltiplas em 24h',
            'Déficit pós-ictal (Todd)',
          ],
          diagnosticTests: ['EEG', 'Considerar neuroimagem', 'Avaliação neurológica'],
        },
        {
          condition: 'Meningite Bacteriana',
          icd10: 'G03.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Febre + rigidez nuca',
            'Fontanela abaulada (lactentes)',
            'Petéquias, toxemia',
            'Kernig/Brudzinski positivos',
          ],
          diagnosticTests: ['Punção lombar (após TC se sinais focais)', 'Hemograma, PCR', 'Hemocultura'],
        },
        {
          condition: 'Encefalite Viral',
          icd10: 'G04.9',
          probability: 'low' as const,
          keyFeatures: [
            'Febre + alteração comportamento',
            'Convulsão + déficit focal',
            'Confusão mental',
          ],
          diagnosticTests: ['RM crânio', 'Punção lombar (PCR herpes)', 'Aciclovir empírico'],
        },
        {
          condition: 'Epilepsia com Febre Desencadeante',
          icd10: 'G40.9',
          probability: 'low' as const,
          keyFeatures: [
            'História convulsões afebreis',
            'EEG anormal',
            'Atraso desenvolvimento',
          ],
          diagnosticTests: ['EEG', 'Neuroimagem', 'Avaliação neuropediatra'],
        },
      ],
      condutaInicial: `**Manejo Agudo:**

**Durante a Convulsão:**
- Decúbito lateral (aspiração)
- Não conter movimentos
- Proteger de traumas
- O2 se cianose

**Convulsão >5min:**
- **Diazepam retal** 0,5mg/kg (máx 10mg) ou
- **Midazolam bucal** 0,3mg/kg (máx 10mg) ou
- **Diazepam IV** 0,2-0,3mg/kg (lento, 2-5min)
- Repetir após 5min se não cessar
- Se refratária (>10min): fenobarbital/fenitoína

**Pós-Convulsão:**
- Investigar foco infeccioso (otite, pneumonia, ITU)
- Antitérmico (paracetamol ou ibuprofeno)
- Observação 1-2h

**Indicações Punção Lombar (PL):**
- <12 meses: sempre considerar (sinais meníngeos ausentes)
- Sinais meníngeos presentes
- Convulsão febril complexa
- Antibiótico prévio <48h
- Imunossupressão

**Critérios de Alta (Convulsão Febril Simples):**
- Exame neurológico normal pós-ictal
- Foco infeccioso identificado e tratado
- Orientação familiar sobre recorrência
- Orientar: NÃO profilaxia anticonvulsivante

**Orientação aos Pais:**
- Risco recorrência: 30-40%
- Risco epilepsia futura: <5% (simples), 10-15% (complexa)
- Prognóstico neurológico excelente
- Antitérmicos NÃO previnem convulsão febril
- Ensinar uso diazepam retal se recorrência`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'sbp' as const,
          title: 'SBP - Convulsão Febril',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'aap' as const,
          title: 'AAP - Febrile Seizures Guidelines',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Diazepam retal',
          dose: '0,5mg/kg',
          route: 'Retal' as const,
          frequency: 'SOS (repetir 1x após 5min)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'Primeira linha em convulsão prolongada',
        },
        {
          genericName: 'Midazolam bucal',
          dose: '0,3mg/kg',
          route: 'SL' as const,
          frequency: 'SOS',
          susAvailable: false,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
          specialNotes: 'Alternativa diazepam, eficácia similar',
        },
        {
          genericName: 'Paracetamol',
          dose: '10-15mg/kg',
          route: 'VO' as const,
          frequency: '4-6/6h',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBP - Convulsão Febril 2022'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // METABOLIC: Diabetic Emergency (CAD/HHS)
  // =========================================================================
  {
    code: 'MET_DIABETIC_EMERGENCY',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Glicemia >250 + cetose + pH <7,3 + Kussmaul',
          severity: 'critical' as const,
          clinicalSignificance: 'Cetoacidose diabética (CAD) grave',
          immediateAction: 'Acesso venoso 2x, SF 1L/h, insulina regular IV após K >3,3',
          timeToAction: 30,
        },
        {
          description: 'Glicemia >600 + osmolaridade >320 + rebaixamento',
          severity: 'critical' as const,
          clinicalSignificance: 'Estado hiperosmolar hiperglicêmico (EHH)',
          immediateAction: 'Hidratação vigorosa SF, insulina após 2-4h hidratação',
          timeToAction: 60,
        },
        {
          description: 'CAD + hipocalemia (K <3,3) + arritmia',
          severity: 'critical' as const,
          clinicalSignificance: 'Risco arritmia fatal por hipocalemia',
          immediateAction: 'NÃO iniciar insulina, repor potássio primeiro',
          timeToAction: 30,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Cetoacidose Diabética (CAD)',
          icd10: 'E10.1',
          probability: 'high' as const,
          keyFeatures: [
            'Glicemia >250mg/dL',
            'pH <7,3 ou bicarbonato <18',
            'Cetonemia/cetonúria',
            'Gap aniônico >12',
            'Respiração Kussmaul, hálito cetônico',
          ],
          diagnosticTests: ['Gasometria', 'Glicemia', 'Eletrólitos', 'Cetonemia/cetonúria', 'ECG'],
        },
        {
          condition: 'Estado Hiperosmolar Hiperglicêmico (EHH)',
          icd10: 'E11.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Glicemia >600mg/dL',
            'Osmolaridade >320 mOsm/kg',
            'pH >7,3 (sem cetose significativa)',
            'Desidratação grave, alteração mental',
            'DM2, idosos',
          ],
          diagnosticTests: ['Glicemia', 'Eletrólitos', 'Osmolaridade sérica', 'Função renal'],
        },
        {
          condition: 'Acidose Láctica',
          icd10: 'E87.2',
          probability: 'low' as const,
          keyFeatures: [
            'Acidose metabólica + gap aniônico',
            'Lactato elevado (>4 mmol/L)',
            'Choque, sepse, metformina',
          ],
          diagnosticTests: ['Lactato', 'Gasometria', 'Descartar sepse'],
        },
      ],
      condutaInicial: `**Manejo Cetoacidose Diabética (CAD):**

**Hidratação:**
- **1ª hora:** SF 0,9% 1L/h (15-20mL/kg/h)
- **Após:** SF 0,45% 250-500mL/h (ajustar por Na)
- Quando glicemia <250: SG 5% + SF (dupla via)
- Meta: reposição 50% déficit em 12-24h

**Insulinoterapia:**
- **Bolus:** 0,1 UI/kg IV (opcional, pode omitir)
- **Infusão:** 0,1 UI/kg/h IV contínua
- Meta: queda glicemia 50-75mg/dL/h
- Ajustar: se glicemia não cai, dobrar dose

**Reposição Potássio:**
- **CRÍTICO:** NÃO iniciar insulina se K <3,3 (risco arritmia)
- K 3,3-5,0: repor KCl 20-40 mEq/L na hidratação
- K <3,3: KCl 40 mEq/h até K >3,3
- K >5,0: não repor, monitorar

**Bicarbonato (controverso):**
- Apenas se pH <6,9
- NaHCO3 100 mEq em 400mL SF 0,45% em 2h

**Monitorização:**
- Glicemia horária (capilar)
- Eletrólitos, gasometria q2-4h
- ECG contínuo
- Balanço hídrico

**Critérios Resolução CAD:**
- Glicemia <200mg/dL
- pH >7,3
- Bicarbonato >18
- Gap aniônico <12

**Transição Insulina SC:**
- Sobrepor SC + IV por 1-2h
- Basal-bolus (NPH 0,5-0,7 UI/kg/dia)

**Manejo Estado Hiperosmolar (EHH):**
- Hidratação mais agressiva (déficit 8-10L)
- Insulina dose menor (0,05 UI/kg/h)
- Correção lenta (48-72h)`,
      calculadoras: ['Gap Aniônico', 'Osmolaridade Sérica', 'Déficit Hídrico'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'SBD - Cetoacidose Diabética',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'uptodate' as const,
          title: 'Diabetic Ketoacidosis in Adults',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Insulina Regular',
          dose: '0,1 UI/kg/h',
          route: 'IV' as const,
          frequency: 'Infusão contínua',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'NÃO iniciar se K <3,3',
        },
        {
          genericName: 'Cloreto de Potássio (KCl)',
          dose: '20-40 mEq/L',
          route: 'IV' as const,
          frequency: 'Contínuo na hidratação',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Essencial para prevenir hipocalemia induzida por insulina',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBD - Diabetes Mellitus'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // METABOLIC: Hypoglycemia
  // =========================================================================
  {
    code: 'MET_HYPOGLYCEMIA',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Glicemia <40 + convulsão + rebaixamento Glasgow',
          severity: 'critical' as const,
          clinicalSignificance: 'Neuroglicopenia grave com risco sequelas',
          immediateAction: 'Glicose 50% 50mL IV bolus rápido, repetir se necessário',
          timeToAction: 5,
        },
        {
          description: 'Hipoglicemia recorrente + hepatomegalia + lactente',
          severity: 'warning' as const,
          clinicalSignificance: 'Erro inato metabolismo ou hiperinsulinismo',
          immediateAction: 'Glicose IV contínua, investigar endócrino/metabolismo',
          timeToAction: 60,
        },
        {
          description: 'Hipoglicemia + etilismo + hipotermia + desnutrição',
          severity: 'warning' as const,
          clinicalSignificance: 'Depleção glicogênio + déficit tiamina',
          immediateAction: 'Tiamina 100mg IV ANTES glicose (prevenir Wernicke)',
          timeToAction: 15,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Hipoglicemia Iatrogênica (Insulina/Antidiabético)',
          icd10: 'E16.0',
          probability: 'high' as const,
          keyFeatures: [
            'Diabético em uso insulina/sulfonilureia',
            'Dose excessiva ou jejum prolongado',
            'Glicemia <70mg/dL',
          ],
          diagnosticTests: ['Glicemia capilar', 'Ajustar dose medicação'],
        },
        {
          condition: 'Hipoglicemia por Jejum/Desnutrição',
          icd10: 'E16.2',
          probability: 'medium' as const,
          keyFeatures: [
            'Jejum prolongado',
            'Etilismo, desnutrição',
            'Depleção reservas glicogênio',
          ],
          diagnosticTests: ['Glicemia', 'Função hepática'],
        },
        {
          condition: 'Hiperinsulinismo (Insulinoma)',
          icd10: 'E16.1',
          probability: 'low' as const,
          keyFeatures: [
            'Tríade Whipple: sintomas jejum + glicemia <55 + melhora com glicose',
            'Ganho peso',
            'Episódios recorrentes',
          ],
          diagnosticTests: ['Glicemia + insulina simultâneos', 'Peptídeo C', 'TC/RM pâncreas'],
        },
        {
          condition: 'Insuficiência Adrenal',
          icd10: 'E27.1',
          probability: 'low' as const,
          keyFeatures: [
            'Hipoglicemia + hipotensão + hiponatremia',
            'Hiperpigmentação (Addison)',
            'Uso crônico corticoide',
          ],
          diagnosticTests: ['Cortisol basal', 'ACTH', 'Teste estímulo'],
        },
      ],
      condutaInicial: `**Abordagem Imediata:**

**Paciente Consciente (capaz VO):**
- 15-20g carboidrato simples:
  - 150mL suco ou refrigerante
  - 3-4 balas ou 1 colher sopa açúcar/mel
- Reavaliar glicemia em 15min
- Repetir se glicemia <70

**Paciente Inconsciente/Convulsão:**
- **Glicose 50%:** 50mL (25g) IV bolus
- Repetir após 10min se glicemia <60
- Manter infusão SG 5-10% se necessário

**Hipoglicemia por Sulfonilureia:**
- Risco hipoglicemia prolongada/recorrente (meia-vida longa)
- Observação hospitalar 12-24h
- Infusão contínua glicose
- Alimentação frequente

**Prevenção Wernicke (etilistas):**
- Tiamina 100mg IM/IV ANTES glicose

**Glucagon IM (alternativa se sem acesso venoso):**
- 1mg IM/SC (adultos), 0,5mg (<25kg)
- Efeito em 10-15min
- Não funciona se depleção glicogênio (etilista crônico)

**Investigação Hipoglicemia Recorrente:**
- Glicemia + insulina + peptídeo C simultâneos (durante hipoglicemia)
- Cortisol, TSH
- Função hepática, renal
- Teste jejum supervisionado (72h)

**Critérios de Alta:**
- Glicemia estável >100mg/dL
- Causa identificada e corrigida
- Diabéticos: ajuste dose insulina/antidiabético
- Orientação sintomas hipoglicemia`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'SBD - Hipoglicemia',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'B' as const,
        },
        {
          source: 'uptodate' as const,
          title: 'Hypoglycemia in Adults',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Glicose 50%',
          dose: '50mL (25g)',
          route: 'IV' as const,
          frequency: 'Bolus rápido (repetir se necessário)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Glucagon',
          dose: '1mg',
          route: 'IM' as const,
          frequency: 'Dose única',
          susAvailable: false,
          renameCompatible: false,
          specialNotes: 'Alternativa se sem acesso IV, não funciona se etilista crônico',
        },
        {
          genericName: 'Tiamina',
          dose: '100mg',
          route: 'IV' as const,
          frequency: 'ANTES glicose (etilistas)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Prevenir encefalopatia Wernicke',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBD - Hipoglicemia'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // METABOLIC: Electrolyte Disorder
  // =========================================================================
  {
    code: 'MET_ELECTROLYTE_DISORDER',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Hipercalemia K >6,5 + alterações ECG (onda T apiculada)',
          severity: 'critical' as const,
          clinicalSignificance: 'Risco arritmia ventricular fatal',
          immediateAction: 'Gluconato cálcio 10% 10mL IV, insulina+glicose, salbutamol',
          timeToAction: 10,
        },
        {
          description: 'Hiponatremia <120 + convulsão + rebaixamento consciência',
          severity: 'critical' as const,
          clinicalSignificance: 'Edema cerebral por hiponatremia aguda',
          immediateAction: 'NaCl 3% 100mL bolus, repetir se convulsão',
          timeToAction: 15,
        },
        {
          description: 'Hipocalcemia + tetania + prolongamento QTc + arritmia',
          severity: 'warning' as const,
          clinicalSignificance: 'Risco torsades de pointes',
          immediateAction: 'Gluconato cálcio 10% 10-20mL IV lento',
          timeToAction: 30,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Hipercalemia',
          icd10: 'E87.5',
          probability: 'high' as const,
          keyFeatures: [
            'K >5,5 mEq/L',
            'IRA, medicações (IECA, espironolactona)',
            'Fraqueza muscular, parestesias',
            'ECG: onda T apiculada, alargamento QRS',
          ],
          diagnosticTests: ['Eletrólitos', 'Função renal', 'ECG'],
        },
        {
          condition: 'Hipocalemia',
          icd10: 'E87.6',
          probability: 'high' as const,
          keyFeatures: [
            'K <3,5 mEq/L',
            'Diuréticos, vômitos, diarreia',
            'Fraqueza, cãibras',
            'ECG: onda U, achatamento T',
          ],
          diagnosticTests: ['Eletrólitos', 'Gasometria (acidose/alcalose)', 'ECG'],
        },
        {
          condition: 'Hiponatremia',
          icd10: 'E87.1',
          probability: 'high' as const,
          keyFeatures: [
            'Na <135 mEq/L',
            'Confusão, náusea, cefaleia',
            'Se aguda + <120: convulsão, coma',
          ],
          diagnosticTests: ['Eletrólitos', 'Osmolalidade sérica/urina', 'Volemia clínica'],
        },
        {
          condition: 'Hipernatremia',
          icd10: 'E87.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Na >145 mEq/L',
            'Desidratação, diabetes insipidus',
            'Sede, irritabilidade, convulsões',
          ],
          diagnosticTests: ['Eletrólitos', 'Osmolalidade', 'Densidade urina'],
        },
        {
          condition: 'Hipocalcemia',
          icd10: 'E83.5',
          probability: 'medium' as const,
          keyFeatures: [
            'Ca <8,5 mg/dL',
            'Parestesias, tetania (Chvostek/Trousseau)',
            'QTc prolongado',
          ],
          diagnosticTests: ['Ca iônico', 'Mg', 'Albumina', 'PTH', 'ECG'],
        },
      ],
      condutaInicial: `**Hipercalemia (K >5,5):**

**GRAVE (K >6,5 ou alteração ECG):**
1. **Estabilizar membrana (efeito imediato):**
   - Gluconato cálcio 10%: 10mL IV lento (3-5min)
   - Repetir após 5min se alterações ECG persistem

2. **Shift intracelular (efeito 30min):**
   - Insulina regular 10 UI + glicose 50% 50mL IV
   - Salbutamol 10-20mg nebulizado

3. **Remover potássio (efeito horas):**
   - Furosemida 40-80mg IV
   - Resina (sorcal) 30g VO/retal
   - Hemodiálise se refratário/IRA

**Hiponatremia (<135):**
- **Aguda + sintomática (<120):**
  - NaCl 3%: 100mL bolus em 10min (repetir até cessar convulsão)
  - Meta: elevar 4-6 mEq/L em 6h
  - Máximo: 8 mEq/L/24h (risco mielinólise)

- **Crônica/assintomática:**
  - Restrição hídrica
  - Tratar causa (SIADH, hipovolemia)
  - Correção lenta (0,5 mEq/L/h)

**Hipocalemia (<3,5):**
- K 3-3,5: KCl VO 40-80 mEq/dia
- K <3 ou sintomático: KCl IV 10-20 mEq/h
- **Máximo:** 40 mEq/h em veia central (arritmia, flebite)

**Hipocalcemia (<8,5):**
- Sintomática (tetania): Gluconato cálcio 10% 10-20mL IV lento
- Repor magnésio se hipomagnesemia (impede correção Ca)`,
      calculadoras: ['Cálcio Corrigido (Albumina)', 'Gap Aniônico', 'Osmolalidade Sérica'],
      ebmReferences: [
        {
          source: 'uptodate' as const,
          title: 'Treatment of Hyperkalemia',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'brazilian-guideline' as const,
          title: 'Distúrbios Eletrolíticos',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
      ],
      medications: [
        {
          genericName: 'Gluconato de Cálcio 10%',
          dose: '10mL',
          route: 'IV' as const,
          frequency: 'Bolus lento 3-5min',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Hipercalemia: estabiliza membrana cardíaca',
        },
        {
          genericName: 'Insulina Regular + Glicose 50%',
          dose: '10 UI + 50mL',
          route: 'IV' as const,
          frequency: 'Bolus',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Hipercalemia: shift K intracelular',
        },
        {
          genericName: 'Cloreto de Sódio 3%',
          dose: '100mL',
          route: 'IV' as const,
          frequency: 'Bolus 10min',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Hiponatremia aguda sintomática',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: [],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // DERMATOLOGIC: Anaphylaxis
  // =========================================================================
  {
    code: 'DERM_ANAPHYLAXIS',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Urticária + angioedema + estridor + hipotensão',
          severity: 'critical' as const,
          clinicalSignificance: 'Anafilaxia grave com choque e obstrução VA',
          immediateAction: 'Adrenalina 0,5mg IM imediato, repetir q5min, O2, cristaloide',
          timeToAction: 2,
        },
        {
          description: 'Anafilaxia + uso beta-bloqueador + refratária adrenalina',
          severity: 'critical' as const,
          clinicalSignificance: 'Beta-bloqueador antagoniza efeito adrenalina',
          immediateAction: 'Glucagon 1-2mg IV (contorna bloqueio beta)',
          timeToAction: 10,
        },
        {
          description: 'Angioedema língua/glote + sem urticária + uso IECA',
          severity: 'critical' as const,
          clinicalSignificance: 'Angioedema bradicinina-mediado (não alérgico)',
          immediateAction: 'Adrenalina, IOT precoce (não responde anti-histamínico)',
          timeToAction: 15,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Anafilaxia',
          icd10: 'T78.2',
          probability: 'high' as const,
          keyFeatures: [
            'Início súbito (<2h exposição)',
            'Urticária + angioedema',
            'Broncoespasmo, estridor',
            'Hipotensão, síncope',
            'GI: dor abdominal, vômitos',
          ],
          diagnosticTests: ['Triptase sérica (3-6h após)', 'Adrenalina IM IMEDIATO'],
        },
        {
          condition: 'Urticária Aguda (sem anafilaxia)',
          icd10: 'L50.0',
          probability: 'high' as const,
          keyFeatures: [
            'Placas eritematosas pruriginosas',
            'Sem sintomas respiratórios/CV',
            'Benigno, autolimitado',
          ],
          diagnosticTests: ['Anti-histamínico', 'Observar 2-4h'],
        },
        {
          condition: 'Angioedema por IECA (bradicinina)',
          icd10: 'T88.7',
          probability: 'medium' as const,
          keyFeatures: [
            'Uso IECA (pode ocorrer meses após início)',
            'Edema face/língua/glote',
            'SEM urticária/prurido',
            'NÃO responde anti-histamínico',
          ],
          diagnosticTests: ['Suspender IECA', 'Adrenalina se comprometimento VA', 'IOT se necessário'],
        },
        {
          condition: 'Reação Vasovagal',
          icd10: 'R55',
          probability: 'medium' as const,
          keyFeatures: [
            'Hipotensão + bradicardia (diferente anafilaxia: taquicardia)',
            'Palidez, sudorese',
            'Sem urticária/broncoespasmo',
            'Recuperação espontânea em decúbito',
          ],
          diagnosticTests: ['Observação', 'NÃO necessita adrenalina'],
        },
      ],
      condutaInicial: `**Manejo Anafilaxia (Protocolo):**

**1. Adrenalina IM IMEDIATA:**
- **Primeira linha:** Adrenalina 1:1000 (1mg/mL)
  - Adultos: 0,5mg (0,5mL) IM vasto lateral coxa
  - Crianças: 0,01mg/kg (máx 0,3mg)
- Repetir q5-15min se não melhora
- IM superior a SC (absorção mais rápida)

**2. Posicionamento:**
- Decúbito dorsal + MMII elevados (se hipotensão)
- Semi-sentado se dispneia
- **Evitar** sentar/levantar (morte súbita bifásica)

**3. Oxigênio:**
- O2 100% por máscara (alvo SpO2 >94%)

**4. Acesso Venoso + Fluidos:**
- Cristaloide (SF ou Ringer) 1-2L rápido
- Crianças: 20mL/kg bolus

**5. Medicações Adjuvantes:**
- **Anti-histamínico:** difenidramina 50mg IV/IM
- **Corticoide:** metilprednisolona 125mg IV (previne fase tardia)
- **Broncodilatador:** salbutamol nebulizado (se broncoespasmo)

**6. Se Refratário:**
- **Adrenalina IV** (apenas em PCR/choque refratário):
  - 1mg/10mL (1:10.000) 1mL IV lento
  - Ou infusão 0,1mcg/kg/min
- **Glucagon** (se uso beta-bloqueador): 1-2mg IV

**Observação:**
- 4-6h (bifásica em 20% casos)
- 12-24h se grave ou história anafilaxia bifásica

**Alta com:**
- Auto-injetor adrenalina (EpiPen) se disponível
- Orientar evitar desencadeante
- Pulseira identificação
- Encaminhar alergologia`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'ASBAI - Anafilaxia',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'uptodate' as const,
          title: 'Anaphylaxis: Emergency Treatment',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Adrenalina 1:1000',
          dose: '0,5mg (0,5mL)',
          route: 'IM' as const,
          frequency: 'Repetir q5-15min se necessário',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'PRIMEIRA LINHA - IM vasto lateral coxa',
        },
        {
          genericName: 'Difenidramina',
          dose: '50mg',
          route: 'IV' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Adjuvante, NÃO substitui adrenalina',
        },
        {
          genericName: 'Metilprednisolona',
          dose: '125mg',
          route: 'IV' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Previne reação bifásica',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['ASBAI - Anafilaxia 2020'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // OPHTHALMOLOGIC: Eye Pain
  // =========================================================================
  {
    code: 'OFT_EYE_PAIN',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Dor ocular + visão turva + halos + náusea + olho vermelho duro',
          severity: 'critical' as const,
          clinicalSignificance: 'Glaucoma agudo de ângulo fechado - cegueira em 24h',
          immediateAction: 'Timolol 0,5% colírio, acetazolamida 500mg IV, oftalmologia urgente',
          timeToAction: 60,
        },
        {
          description: 'Dor + hiperemia + hipópio + uso lente contato',
          severity: 'critical' as const,
          clinicalSignificance: 'Úlcera de córnea infectada - risco perfuração',
          immediateAction: 'Colírio fortific​ado (vanco + ceftazidima), oftalmologia',
          timeToAction: 120,
        },
        {
          description: 'Dor + trauma penetrante + pupila irregular',
          severity: 'critical' as const,
          clinicalSignificance: 'Perfuração ocular',
          immediateAction: 'Protetor rígido, NÃO tocar/lavar, oftalmologia urgente',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Glaucoma Agudo de Ângulo Fechado',
          icd10: 'H40.2',
          probability: 'medium' as const,
          keyFeatures: [
            'Dor ocular intensa + cefaleia',
            'Náusea, vômitos',
            'Visão turva, halos coloridos',
            'Olho vermelho, pupila média fixa, córnea opaca',
          ],
          diagnosticTests: ['Tonometria (PIO >40mmHg)', 'Oftalmologia URGENTE'],
        },
        {
          condition: 'Úlcera de Córnea / Ceratite',
          icd10: 'H16.0',
          probability: 'high' as const,
          keyFeatures: [
            'Dor, fotofobia, lacrimejamento',
            'Hiperemia, secreção',
            'Fluoresceína: defeito epitelial',
            'Fator risco: lente contato',
          ],
          diagnosticTests: ['Fluoresceína', 'Lâmpada fenda', 'Cultura se úlcera infectada'],
        },
        {
          condition: 'Abrasão de Córnea',
          icd10: 'S05.0',
          probability: 'high' as const,
          keyFeatures: [
            'Trauma superficial (galho, unha, areia)',
            'Dor, sensação corpo estranho',
            'Fluoresceína positiva',
          ],
          diagnosticTests: ['Fluoresceína', 'Everter pálpebra (corpo estranho subtarsal)'],
        },
        {
          condition: 'Corpo Estranho Corneano',
          icd10: 'T15.0',
          probability: 'high' as const,
          keyFeatures: [
            'Sensação corpo estranho',
            'Lacrimejamento, fotofobia',
            'Partícula visível ao exame',
          ],
          diagnosticTests: ['Lâmpada fenda', 'Rx orbita (se metálico)'],
        },
        {
          condition: 'Uveíte Anterior',
          icd10: 'H20.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Dor, fotofobia, lacrimejamento',
            'Hiperemia ciliar (periquerática)',
            'Hipópio, células na câmara anterior',
            'Associação: espondilite, sarcoidose',
          ],
          diagnosticTests: ['Lâmpada fenda', 'Corticoide tópico', 'Investigar doença base'],
        },
      ],
      condutaInicial: `**Avaliação Oftalmológica Básica:**

**Exame:**
- Acuidade visual (Snellen ou contar dedos)
- Inspeção: hiperemia, secreção, assimetria pupilar
- Palpação: olho duro (glaucoma)
- Teste fluoresceína (abrasão/úlcera)
- Reflexos pupilares

**Glaucoma Agudo:**
- **Timolol 0,5%** 1 gota
- **Acetazolamida** 500mg IV ou 500mg VO
- **Analgesia + antiemético**
- Oftalmologia URGENTE (iridotomia laser)

**Úlcera de Córnea:**
- **Não usar corticoide** (piora infecção)
- Colírio antibiótico fortificado:
  - Ciprofloxacino 0,3% q1h ou
  - Levofloxacino 0,5% q1h
- Oftalmologia em <24h

**Abrasão Corneal:**
- Ciprofloxacino 0,3% colírio 6/6h x5 dias
- Analgesia (paracetamol, NÃO patch anestésico)
- NÃO ocluir (risco infecção)
- Reavaliação 24-48h

**Corpo Estranho:**
- Remoção com cotonete/agulha (se superficial)
- Everter pálpebra superior (CE subtarsal)
- ATB colírio pós-remoção

**Referência Oftalmologia URGENTE:**
- Glaucoma agudo
- Úlcera de córnea
- Trauma penetrante
- Perda visual aguda
- Uveíte`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'CBO - Conselho Brasileiro Oftalmologia',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'uptodate' as const,
          title: 'Acute Angle-Closure Glaucoma',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Timolol 0,5% colírio',
          dose: '1 gota',
          route: 'Ocular' as const,
          frequency: '12/12h',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Glaucoma agudo - reduz produção humor aquoso',
        },
        {
          genericName: 'Acetazolamida',
          dose: '500mg',
          route: 'IV' as const,
          frequency: 'Dose única (ou 500mg VO)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Glaucoma agudo - reduz PIO',
        },
        {
          genericName: 'Ciprofloxacino 0,3% colírio',
          dose: '1-2 gotas',
          route: 'Ocular' as const,
          frequency: '6/6h (úlcera: q1h)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'moderate' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['CBO - Emergências Oftalmológicas'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // OPHTHALMOLOGIC: Vision Loss
  // =========================================================================
  {
    code: 'OFT_VISION_LOSS',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Perda visual súbita indolor + DPAR positivo',
          severity: 'critical' as const,
          clinicalSignificance: 'Oclusão artéria central retina - isquemia retiniana',
          immediateAction: 'Massagem ocular, acetazolamida, timolol, O2 100%, oftalmologia <90min',
          timeToAction: 30,
        },
        {
          description: 'Perda visual + defeito campo visual + cefaleia temporal + >50 anos',
          severity: 'critical' as const,
          clinicalSignificance: 'Arterite temporal - risco cegueira bilateral',
          immediateAction: 'Metilprednisolona 1g IV, VHS/PCR, oftalmologia',
          timeToAction: 60,
        },
        {
          description: 'Fotopsias + "cortina" caindo + perda visual periférica',
          severity: 'critical' as const,
          clinicalSignificance: 'Descolamento de retina',
          immediateAction: 'Oftalmologia urgente, posicionar cabeça (retina superior)',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Oclusão Artéria Central da Retina (OACR)',
          icd10: 'H34.1',
          probability: 'medium' as const,
          keyFeatures: [
            'Perda visual súbita, indolor, monocular',
            'DPAR positivo (defeito pupilar aferente)',
            'Fundo olho: palidez retina + mancha cereja',
            'Fator risco: FA, aterosclerose',
          ],
          diagnosticTests: ['Fundoscopia', 'Doppler carótidas', 'ECG'],
        },
        {
          condition: 'Arterite Temporal (Arterite Células Gigantes)',
          icd10: 'M31.6',
          probability: 'low' as const,
          keyFeatures: [
            'Idade >50 anos',
            'Cefaleia temporal, claudicação mandibular',
            'Artéria temporal endurecida',
            'VHS >50, PCR elevado',
          ],
          diagnosticTests: ['VHS', 'PCR', 'Biópsia artéria temporal', 'Corticoide urgente'],
        },
        {
          condition: 'Descolamento de Retina',
          icd10: 'H33.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Fotopsias (flashes luz)',
            'Floaters (moscas volantes)',
            'Perda visual periférica ("cortina")',
            'Fator risco: miopia, trauma, pós-cirurgia',
          ],
          diagnosticTests: ['Fundoscopia', 'Ultrassom ocular', 'Cirurgia urgente'],
        },
        {
          condition: 'Neurite Óptica',
          icd10: 'H46',
          probability: 'high' as const,
          keyFeatures: [
            'Perda visual subaguda (dias)',
            'Dor com movimento ocular',
            'Dessaturação cores',
            'Associação: esclerose múltipla',
          ],
          diagnosticTests: ['Campimetria', 'RM orbita', 'Considerar punção lombar'],
        },
        {
          condition: 'Hemorragia Vítrea',
          icd10: 'H43.1',
          probability: 'medium' as const,
          keyFeatures: [
            'Perda visual súbita com floaters',
            'Diabético, hipertensão',
            'Fundo olho não visualizado',
          ],
          diagnosticTests: ['Ultrassom ocular', 'Glicemia', 'Oftalmologia'],
        },
      ],
      condutaInicial: `**OACR (Oclusão Artéria Central Retina) - URGÊNCIA!**

**Janela terapêutica: <90-120min**

**Manobras imediatas:**
1. **Massagem ocular:** pressão firme 5s, soltar 5s x10 (tentar desobstruir)
2. **Reduzir PIO:**
   - Timolol 0,5% 1 gota
   - Acetazolamida 500mg IV
3. **O2 hiperbárico** (se disponível <24h)
4. **Vasodilatação:**
   - Sublingual isossorbida
   - Considerar paracentese câmara anterior (oftalmologia)

**Arterite Temporal:**
- **Metilprednisolona 1g IV** por 3 dias
- VHS, PCR
- Biópsia artéria temporal (não atrasar corticoide)
- Prevenir cegueira contralateral

**Descolamento Retina:**
- Posicionar cabeça conforme localização (retina superior: cabeça baixa)
- NÃO dilatar pupila
- Oftalmologia urgente (cirurgia <24-48h)

**Neurite Óptica:**
- Metilprednisolona 1g IV por 3-5 dias
- Investigar EM (RM encéfalo + medula)
- Prognóstico visual geralmente bom

**Workup Perda Visual:**
- Acuidade visual
- Reflexos pupilares (DPAR)
- Fundoscopia
- Tonometria (PIO)
- Campimetria
- Doppler carótidas (se vascular)
- RM orbita (se neurite)`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'CBO - Perda Visual Aguda',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'uptodate' as const,
          title: 'Central Retinal Artery Occlusion',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'B' as const,
        },
      ],
      medications: [
        {
          genericName: 'Metilprednisolona',
          dose: '1g',
          route: 'IV' as const,
          frequency: '1x/dia por 3-5 dias',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'Arterite temporal ou neurite óptica',
        },
        {
          genericName: 'Acetazolamida',
          dose: '500mg',
          route: 'IV' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'OACR - reduzir PIO',
        },
        {
          genericName: 'Timolol 0,5% colírio',
          dose: '1 gota',
          route: 'Ocular' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'OACR - reduzir PIO',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'moderate' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['CBO - Oftalmologia'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },
]

// ============================================================================
// Main Seeding Function
// ============================================================================

async function main() {
  console.log(chalk.blue('🎯 Iniciando Seed de EBM Content - Batch 4 FINAL (11 Queixas) - 100% Coverage!'))
  console.log(chalk.gray('='.repeat(80)))

  let successCount = 0
  let failCount = 0

  for (const ebmData of ebmBatch4Final) {
    try {
      console.log(chalk.cyan(`\n📝 Processando: ${ebmData.code}...`))

      // Validação
      const validation = validateEBMContent(ebmData.extendedContentEBM)

      if (!validation.valid) {
        console.error(chalk.red(`❌ Validação falhou para ${ebmData.code}:`))
        if (validation.errors && validation.errors.length > 0) {
          validation.errors.forEach((err: string) => {
            console.error(chalk.yellow(`  - ${err}`))
          })
        }
        throw new Error(`EBM content inválido para ${ebmData.code}`)
      }

      // Update no banco
      await prisma.chief_complaints.updateMany({
        where: { code: ebmData.code },
        data: {
          additional_data: {
            extendedContentEBM: ebmData.extendedContentEBM,
          } as unknown as Prisma.InputJsonValue,
        },
      })

      successCount++
      console.log(chalk.green(`✅ ${ebmData.code} atualizado com sucesso`))
    } catch (error) {
      failCount++
      console.error(chalk.red(`❌ Erro ao processar ${ebmData.code}:`))
      console.error(error)
    }
  }

  console.log(chalk.gray('\n' + '='.repeat(80)))
  console.log(chalk.bold(`\n📊 Resultado Final:`))
  console.log(chalk.green(`   ✅ Sucesso: ${successCount}/${ebmBatch4Final.length}`))
  if (failCount > 0) {
    console.log(chalk.red(`   ❌ Falhas: ${failCount}/${ebmBatch4Final.length}`))
  }

  // Check final coverage
  const totalWithEBM = await prisma.chief_complaints.count({
    where: {
      is_high_acuity: true,
      additional_data: {
        path: ['extendedContentEBM'],
        not: Prisma.JsonNull,
      },
    },
  })

  const totalHighAcuity = await prisma.chief_complaints.count({
    where: { is_high_acuity: true },
  })

  console.log(chalk.bold.cyan(`\n🎉 COBERTURA EBM FINAL: ${totalWithEBM}/${totalHighAcuity} (${Math.round((totalWithEBM / totalHighAcuity) * 100)}%)`))

  await prisma.$disconnect()
}

main()
