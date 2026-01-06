#!/usr/bin/env tsx
import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'
import { validateEBMContent } from '../lib/validation/ebm'

const prisma = new PrismaClient()

// ============================================================================
// EBM Content - Batch 3 (17 High-Acuity Complaints)
// ============================================================================

const ebmBatch3 = [
  // =========================================================================
  // INFECTIOUS: Pneumonia
  // =========================================================================
  {
    code: 'INF_PNEUMONIA',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'SpO2 <90% em ar ambiente + taquipneia (FR >30/min)',
          severity: 'critical' as const,
          clinicalSignificance: 'Insuficiência respiratória aguda, risco de intubação',
          immediateAction: 'O2 suplementar, gasometria arterial, considerar VNI/IOT',
          timeToAction: 10,
          references: [
            {
              source: 'sbpt' as const,
              title: 'Diretrizes Brasileiras de Pneumonia Adquirida na Comunidade',
              url: 'https://www.sbpt.org.br/portal/espaco-saude-respiratoria-diretrizes/',
              lastAccessed: '2025-01-06T00:00:00Z',
              evidenceLevel: 'A' as const,
            },
          ],
        },
        {
          description: 'Confusão mental nova + hipotensão (PAS <90) + taquicardia',
          severity: 'critical' as const,
          clinicalSignificance: 'Sepse/choque séptico de foco pulmonar',
          immediateAction: 'Protocolo sepse: acesso venoso, cristaloides 30mL/kg, ATB <1h',
          timeToAction: 60,
          references: [
            {
              source: 'ilas' as const,
              title: 'Protocolo ILAS de Sepse',
              url: 'https://ilas.org.br/assets/arquivos/ferramentas/protocolo-de-tratamento.pdf',
              lastAccessed: '2025-01-06T00:00:00Z',
              evidenceLevel: 'A' as const,
            },
          ],
        },
        {
          description: 'Derrame pleural + febre >39°C + leucocitose >20.000',
          severity: 'warning' as const,
          clinicalSignificance: 'Pneumonia complicada com empiema',
          immediateAction: 'Rx tórax, considerar TC, toracocentese diagnóstica',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Pneumonia Bacteriana (S. pneumoniae, H. influenzae)',
          icd10: 'J15.9',
          probability: 'high' as const,
          keyFeatures: [
            'Tosse produtiva com escarro purulento',
            'Febre alta, calafrios',
            'Dor pleurítica',
            'Consolidação ao Rx',
          ],
          diagnosticTests: ['Rx tórax PA/Perfil', 'Hemograma', 'PCR', 'Hemocultura 2x'],
          references: [
            {
              source: 'sbpt' as const,
              title: 'PAC - Pneumonia Adquirida na Comunidade',
              lastAccessed: '2025-01-06T00:00:00Z',
            },
          ],
        },
        {
          condition: 'Pneumonia Atípica (Mycoplasma, Chlamydia)',
          icd10: 'J15.7',
          probability: 'medium' as const,
          keyFeatures: [
            'Tosse seca persistente',
            'Sintomas constitucionais (mialgia, cefaleia)',
            'Rx com infiltrado intersticial',
            'Jovens, previamente hígidos',
          ],
          diagnosticTests: ['Rx tórax', 'Sorologias (quando disponível)'],
        },
        {
          condition: 'Exacerbação de DPOC',
          icd10: 'J44.1',
          probability: 'medium' as const,
          keyFeatures: [
            'História de tabagismo/DPOC',
            'Dispneia progressiva',
            'Escarro purulento aumentado',
            'Sibilos difusos',
          ],
          diagnosticTests: ['Rx tórax', 'Gasometria arterial', 'Espirometria (após estabilização)'],
        },
        {
          condition: 'Insuficiência Cardíaca Descompensada',
          icd10: 'I50.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Dispneia aos esforços progressiva',
            'Ortopneia, DPN',
            'Edema de MMII, turgência jugular',
            'Rx com cardiomegalia + congestão',
          ],
          diagnosticTests: ['Rx tórax', 'BNP/proBNP', 'Ecocardiograma'],
        },
        {
          condition: 'Tuberculose Pulmonar',
          icd10: 'A15.0',
          probability: 'low' as const,
          keyFeatures: [
            'Febre vespertina, sudorese noturna',
            'Emagrecimento progressivo',
            'Tosse >3 semanas',
            'Contato com TB, imunossupressão',
          ],
          diagnosticTests: ['Rx tórax', 'Baciloscopia escarro 2x', 'Teste rápido molecular (GeneXpert)'],
        },
      ],
      condutaInicial: `**Avaliação de Gravidade (CURB-65 ou PSI):**
- CURB-65: Confusão, Ureia >50, FR ≥30, BP <90/60, idade ≥65
- 0-1 pontos: ambulatorial
- 2 pontos: considerar internação
- ≥3 pontos: internação (UTI se ≥4)

**Suporte:**
- O2 suplementar se SpO2 <90% (alvo 92-96%)
- Hidratação venosa se necessário
- Analgesia/antitérmico (paracetamol, dipirona)

**Antibioticoterapia Empírica (SBPT):**
- Ambulatorial: Amoxicilina 1g VO 8/8h ou Azitromicina 500mg VO 1x/dia
- Internação enfermaria: Ampicilina/Sulbactam 1,5g IV 6/6h + Azitromicina 500mg IV 1x/dia
- Internação UTI: Ceftriaxona 2g IV 1x/dia + Azitromicina 500mg IV 1x/dia

**Exames:**
- Rx tórax PA + Perfil
- Hemograma, PCR, função renal
- Hemocultura 2x (antes ATB) se internação
- Gasometria arterial se SpO2 <92%

**Critérios de Internação:**
- CURB-65 ≥2
- Instabilidade hemodinâmica
- Hipoxemia refratária
- Comorbidades descompensadas
- Impossibilidade de VO`,
      calculadoras: ['CURB-65', 'PSI (Pneumonia Severity Index)', 'qSOFA'],
      ebmReferences: [
        {
          source: 'sbpt' as const,
          title: 'Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade em Adultos Imunocompetentes',
          url: 'https://www.sbpt.org.br/portal/espaco-saude-respiratoria-diretrizes/',
          yearPublished: 2018,
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'ilas' as const,
          title: 'Protocolo Gerenciado de Sepse - ILAS',
          url: 'https://ilas.org.br/assets/arquivos/ferramentas/protocolo-de-tratamento.pdf',
          yearPublished: 2022,
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Amoxicilina',
          dose: '1g',
          route: 'VO' as const,
          frequency: '8/8h',
          duration: '7-10 dias',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Ampicilina/Sulbactam',
          dose: '1,5-3g',
          route: 'IV' as const,
          frequency: '6/6h',
          duration: '7-10 dias',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Azitromicina',
          dose: '500mg',
          route: 'VO' as const,
          frequency: '1x/dia',
          duration: '3-5 dias',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Ceftriaxona',
          dose: '2g',
          route: 'IV' as const,
          frequency: '1x/dia',
          duration: '7-10 dias',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBPT - Diretrizes PAC 2018', 'ILAS - Sepse 2022'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // GENITOURINARY: Testicular Pain
  // =========================================================================
  {
    code: 'GU_TESTICULAR_PAIN',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Dor testicular súbita + testículo elevado/horizontalizado + <6h',
          severity: 'critical' as const,
          clinicalSignificance: 'Torção testicular - isquemia irreversível após 6h',
          immediateAction: 'Doppler urgente, urologo em <4h, destorção manual se disponível',
          timeToAction: 30,
          references: [
            {
              source: 'brazilian-guideline' as const,
              title: 'SBU - Emergências Urológicas',
              lastAccessed: '2025-01-06T00:00:00Z',
              evidenceLevel: 'A' as const,
            },
          ],
        },
        {
          description: 'Febre + dor testicular intensa + sinais de toxemia',
          severity: 'warning' as const,
          clinicalSignificance: 'Orquiepididimite complicada com abscesso',
          immediateAction: 'ATB IV imediato, analgesia, considerar drenagem cirúrgica',
          timeToAction: 60,
        },
        {
          description: 'Trauma escrotal + hematocele + equimose extensa',
          severity: 'warning' as const,
          clinicalSignificance: 'Ruptura testicular',
          immediateAction: 'Doppler + ultrassom, avaliação cirúrgica urgente',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Torção Testicular',
          icd10: 'N44.0',
          probability: 'high' as const,
          keyFeatures: [
            'Dor súbita, intensa, unilateral',
            'Testículo elevado, horizontalizado',
            'Reflexo cremastérico ausente',
            'Adolescentes/adultos jovens',
          ],
          diagnosticTests: ['Doppler testicular URGENTE', 'Cirurgia exploratória se dúvida'],
          specificRedFlags: ['Sintoma <6h = janela terapêutica'],
        },
        {
          condition: 'Epididimite Aguda',
          icd10: 'N45.9',
          probability: 'high' as const,
          keyFeatures: [
            'Dor progressiva (horas a dias)',
            'Febre, disúria',
            'Epidídimo doloroso, aumentado',
            'Reflexo cremastérico presente',
          ],
          diagnosticTests: ['Doppler (aumento fluxo)', 'EAS + urocultura', 'Swab uretral se DST'],
        },
        {
          condition: 'Orquite (viral - Caxumba)',
          icd10: 'B26.0',
          probability: 'low' as const,
          keyFeatures: [
            'História de parotidite recente',
            'Dor bilateral em 30%',
            'Testículos aumentados, difusos',
          ],
          diagnosticTests: ['Sorologia para caxumba', 'Ultrassom'],
        },
        {
          condition: 'Hérnia Inguinoescrotal Encarcerada',
          icd10: 'K40.3',
          probability: 'medium' as const,
          keyFeatures: [
            'Massa irredutível na bolsa escrotal',
            'Dor + distensão abdominal',
            'Sinais de obstrução intestinal',
          ],
          diagnosticTests: ['TC abdome', 'Cirurgia urgente se estrangulamento'],
        },
        {
          condition: 'Hidrocele/Varicocele Complicada',
          icd10: 'N43.3',
          probability: 'low' as const,
          keyFeatures: ['Massa escrotal indolor crônica', 'Desconforto progressivo', 'Translúcida'],
          diagnosticTests: ['Ultrassom escrotal'],
        },
      ],
      condutaInicial: `**Abordagem Imediata:**
1. **Anamnese Direcionada:**
   - Tempo de início (CRÍTICO: <6h para torção)
   - Trauma, febre, sintomas urinários
   - DST prévia, atividade sexual

2. **Exame Físico:**
   - Inspeção: edema, eritema, posição testicular
   - Reflexo cremastérico (ausente = torção)
   - Palpação: epidídimo, cordão, linfonodos

3. **Doppler Testicular URGENTE se:**
   - Suspeita de torção (<6h)
   - Reflexo cremastérico ausente
   - Qualquer dúvida diagnóstica

**Manejo por Etiologia:**

**Torção Testicular:**
- Destorção manual (se <6h): rotação lateral externa 1-2 voltas
- Cirurgia exploratória URGENTE (mesmo se sucesso da destorção)
- Orquiopexia bilateral

**Epididimite:**
- ATB empírico:
  - <35 anos ou DST: Ceftriaxona 500mg IM dose única + Doxiciclina 100mg VO 12/12h x 10d
  - >35 anos: Ciprofloxacino 500mg VO 12/12h x 10-14d
- Analgesia, anti-inflamatório, elevação escrotal
- Internação se toxemia/abscesso

**Orquite viral:**
- Suporte: analgesia, repouso, elevação
- Anti-inflamatórios (ibuprofeno)`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'SBU - Sociedade Brasileira de Urologia: Emergências',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'B' as const,
        },
        {
          source: 'uptodate' as const,
          title: 'Acute Scrotal Pain - Approach',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Ceftriaxona',
          dose: '500mg',
          route: 'IM' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Doxiciclina',
          dose: '100mg',
          route: 'VO' as const,
          frequency: '12/12h',
          duration: '10 dias',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Ciprofloxacino',
          dose: '500mg',
          route: 'VO' as const,
          frequency: '12/12h',
          duration: '10-14 dias',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBU - Emergências Urológicas'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // PSYCHIATRIC: Suicidal Ideation
  // =========================================================================
  {
    code: 'PSI_SUICIDAL_IDEATION',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Plano suicida detalhado + meio letal disponível + tentativa prévia',
          severity: 'critical' as const,
          clinicalSignificance: 'Alto risco iminente de suicídio',
          immediateAction: 'Nunca deixar sozinho, remover meios letais, psiquiatria URGENTE',
          timeToAction: 15,
          references: [
            {
              source: 'ms-brasil' as const,
              title: 'MS - Prevenção do Suicídio: Manual para Profissionais',
              url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/suicidio',
              lastAccessed: '2025-01-06T00:00:00Z',
            },
          ],
        },
        {
          description: 'Ideação + intoxicação aguda (álcool/drogas) + impulsividade',
          severity: 'critical' as const,
          clinicalSignificance: 'Desinibição aumenta risco de ato suicida',
          immediateAction: 'Contenção física se necessário, vigilância 1:1, psiquiatria',
          timeToAction: 30,
        },
        {
          description: 'Desesperança + isolamento social + doença grave recente',
          severity: 'warning' as const,
          clinicalSignificance: 'Fatores de risco acumulados',
          immediateAction: 'Avaliação psiquiátrica em <24h, suporte familiar',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Transtorno Depressivo Maior com Ideação Suicida',
          icd10: 'F32.3',
          probability: 'high' as const,
          keyFeatures: [
            'Humor deprimido >2 semanas',
            'Anedonia, desesperança',
            'Alteração sono, apetite, energia',
            'Pensamentos de morte recorrentes',
          ],
          diagnosticTests: ['Escala de Beck para Depressão', 'Escala de Risco Suicida (Columbia)'],
        },
        {
          condition: 'Transtorno Bipolar - Episódio Depressivo',
          icd10: 'F31.3',
          probability: 'medium' as const,
          keyFeatures: [
            'História de mania/hipomania prévia',
            'Episódio depressivo atual',
            'Risco de virada maníaca com antidepressivo',
          ],
          diagnosticTests: ['Avaliação de humor life-chart', 'MDQ (Mood Disorder Questionnaire)'],
        },
        {
          condition: 'Transtorno de Personalidade Borderline',
          icd10: 'F60.3',
          probability: 'medium' as const,
          keyFeatures: [
            'Ideação crônica recorrente',
            'Automutilação não-suicida',
            'Impulsividade, relações instáveis',
            'Medo de abandono',
          ],
          diagnosticTests: ['História longitudinal', 'Critérios DSM-5'],
        },
        {
          condition: 'Psicose com Comando Alucinatório',
          icd10: 'F20.0',
          probability: 'low' as const,
          keyFeatures: [
            'Alucinações auditivas imperativas',
            'Delírios persecutórios',
            'Desorganização do pensamento',
          ],
          diagnosticTests: ['Avaliação psiquiátrica urgente', 'Antipsicótico'],
        },
        {
          condition: 'Reação Aguda ao Estresse',
          icd10: 'F43.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Evento estressor identificável (luto, ruptura, perda)',
            'Sintomas <1 mês',
            'Desesperança transitória',
          ],
          diagnosticTests: ['Suporte psicossocial', 'Monitoramento de risco'],
        },
      ],
      condutaInicial: `**Avaliação de Risco Suicida (SAD PERSONS Scale):**
- **S**ex (masculino +1)
- **A**ge (<19 ou >45 +1)
- **D**epression (+2)
- **P**revious attempt (+1)
- **E**thanol/drug abuse (+1)
- **R**ational thinking loss (+2)
- **S**ocial support lacking (+1)
- **O**rganized plan (+2)
- **N**o spouse (+1)
- **S**ickness/chronic pain (+1)

**Score:**
- 0-2: Baixo risco - alta ambulatorial com seguimento
- 3-4: Risco moderado - considerar internação
- 5-6: Alto risco - internação psiquiátrica
- 7+: Risco muito alto - internação involuntária se recusa

**Manejo Imediato:**
1. **Segurança do Ambiente:**
   - Remover objetos cortantes, medicações, cordas
   - Nunca deixar sozinho
   - Vigilância 1:1 até avaliação psiquiátrica

2. **Abordagem Empática:**
   - Escuta ativa, sem julgamento
   - Validar sofrimento
   - Perguntar DIRETAMENTE sobre suicídio (não aumenta risco)

3. **Contrato de Segurança:**
   - "Você concorda em não se machucar até falar comigo/psiquiatra?"
   - Dar números de emergência (CVV 188, SAMU 192)

4. **Envolver Rede de Apoio:**
   - Família, amigos próximos
   - Equipe de saúde mental
   - CAPS, ambulatório psiquiatria

**Critérios de Internação:**
- Plano letal com intenção atual
- Tentativa de suicídio recente
- Psicose com comando alucinatório
- Ausência de suporte familiar
- Intoxicação aguda + ideação`,
      calculadoras: ['SAD PERSONS Scale', 'Columbia Suicide Severity Rating Scale (C-SSRS)'],
      ebmReferences: [
        {
          source: 'ms-brasil' as const,
          title: 'Ministério da Saúde - Prevenção do Suicídio: Manual para Profissionais da Saúde',
          url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/suicidio',
          yearPublished: 2021,
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'brazilian-guideline' as const,
          title: 'ABP - Associação Brasileira de Psiquiatria: Suicídio',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
      ],
      medications: [],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'moderate' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['MS - Prevenção Suicídio 2021', 'ABP - Manejo Crise Suicida'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // PSYCHIATRIC: Psychomotor Agitation
  // =========================================================================
  {
    code: 'PSI_PSYCHOMOTOR_AGITATION',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Agressividade + risco iminente a si/outros + não responsivo verbal',
          severity: 'critical' as const,
          clinicalSignificance: 'Risco de violência, necessidade de contenção',
          immediateAction: 'Contenção química (haloperidol IM) ou física, segurança da equipe',
          timeToAction: 10,
          references: [
            {
              source: 'brazilian-guideline' as const,
              title: 'ABP - Manejo da Agitação Psicomotora',
              lastAccessed: '2025-01-06T00:00:00Z',
            },
          ],
        },
        {
          description: 'Hipertermia + rigidez + confusão mental + uso recente antipsicótico',
          severity: 'critical' as const,
          clinicalSignificance: 'Síndrome Neuroléptica Maligna',
          immediateAction: 'Suspender antipsicótico, hidratação IV, cooling, UTI',
          timeToAction: 30,
        },
        {
          description: 'Agitação + midríase + taquicardia + sudorese + hipertensão',
          severity: 'warning' as const,
          clinicalSignificance: 'Intoxicação por estimulantes (cocaína, anfetaminas)',
          immediateAction: 'Benzodiazepínico, monitorização cardíaca, toxicologia',
          timeToAction: 30,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Intoxicação por Estimulantes (Cocaína, Anfetaminas)',
          icd10: 'F15.0',
          probability: 'high' as const,
          keyFeatures: [
            'Euforia, grandiosidade',
            'Taquicardia, hipertensão, midríase',
            'Paranóia, alucinações',
            'História de uso recente',
          ],
          diagnosticTests: ['Triagem toxicológica', 'ECG', 'Eletrólitos'],
        },
        {
          condition: 'Mania/Hipomania (Transtorno Bipolar)',
          icd10: 'F31.1',
          probability: 'high' as const,
          keyFeatures: [
            'Humor elevado, irritável',
            'Insônia sem cansaço',
            'Fala pressionada, fuga de ideias',
            'Gastos excessivos, hipersexualidade',
          ],
          diagnosticTests: ['História psiquiátrica', 'Escala de Young (YMRS)'],
        },
        {
          condition: 'Psicose Aguda (Esquizofrenia, Surto Psicótico)',
          icd10: 'F23.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Alucinações, delírios',
            'Desorganização do pensamento',
            'Agitação secundária a sintomas positivos',
          ],
          diagnosticTests: ['Avaliação psiquiátrica', 'Descartar causa orgânica'],
        },
        {
          condition: 'Delirium (Causa Orgânica)',
          icd10: 'F05.9',
          probability: 'high' as const,
          keyFeatures: [
            'Flutuação do nível de consciência',
            'Desorientação',
            'Alteração aguda em idoso/paciente internado',
            'Causa: infecção, metabólica, medicação',
          ],
          diagnosticTests: ['Hemograma, eletrólitos, função renal/hepática', 'TC crânio', 'EAS'],
        },
        {
          condition: 'Síndrome de Abstinência Alcoólica',
          icd10: 'F10.3',
          probability: 'medium' as const,
          keyFeatures: [
            'Tremores, sudorese',
            'Agitação, ansiedade',
            'Alucinações táteis/visuais',
            'História de etilismo',
          ],
          diagnosticTests: ['CIWA-Ar score', 'Tiamina', 'Benzodiazepínico'],
        },
      ],
      condutaInicial: `**Princípios de Manejo:**
1. **Desescalação Verbal (SEMPRE primeiro):**
   - Ambiente calmo, baixo estímulo
   - Comunicação não-ameaçadora
   - Oferecer medicação oral
   - Respeitar espaço pessoal

2. **Contenção Química (se desescalação falha):**
   - **1ª linha:** Haloperidol 5mg IM + Prometazina 50mg IM
   - **Alternativa:** Olanzapina 10mg IM (não misturar com benzodiazepínico IM)
   - **Se intoxicação/abstinência:** Diazepam 10mg IM/IV

3. **Contenção Física (ÚLTIMA opção):**
   - Apenas se risco iminente de violência
   - Protocolo institucional, 5 pontos
   - Reavaliação a cada 15min
   - Registro legal rigoroso

**Investigação Etiológica:**
- Glicemia capilar (hipoglicemia)
- Sinais vitais (febre, PA, FC)
- Anamnese rápida: uso de drogas, psiquiátrico prévio
- Exames: hemograma, eletrólitos, função renal, TC crânio (se trauma/focal)

**Monitorização:**
- Sinais vitais a cada 15min pós-medicação
- Observar: sedação excessiva, hipotensão, rigidez (SNM)
- ECG se antipsicótico (prolongamento QTc)

**Critérios de Internação Psiquiátrica:**
- Psicose aguda refratária
- Mania grave
- Risco de heteroagressão persistente
- Ausência de suporte familiar`,
      calculadoras: ['CIWA-Ar (Clinical Institute Withdrawal Assessment)', 'YMRS (Young Mania Rating Scale)'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'ABP - Associação Brasileira de Psiquiatria: Agitação',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'uptodate' as const,
          title: 'Agitation in the Emergency Department',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'B' as const,
        },
      ],
      medications: [
        {
          genericName: 'Haloperidol',
          dose: '5mg',
          route: 'IM' as const,
          frequency: 'SOS (pode repetir 30-60min)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          contraindications: ['Parkinson', 'Demência por corpos de Lewy'],
        },
        {
          genericName: 'Prometazina',
          dose: '50mg',
          route: 'IM' as const,
          frequency: 'Dose única (associar a haloperidol)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Reduz efeitos extrapiramidais do haloperidol',
        },
        {
          genericName: 'Diazepam',
          dose: '10mg',
          route: 'IM' as const,
          frequency: 'SOS',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'Preferir se abstinência alcoólica ou intoxicação estimulantes',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'moderate' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['ABP - Agitação Psicomotora'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // PSYCHIATRIC: Acute Psychosis
  // =========================================================================
  {
    code: 'PSI_PSYCHOSIS',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Comando alucinatório suicida/homicida + agitação + sem insight',
          severity: 'critical' as const,
          clinicalSignificance: 'Alto risco de ato violento guiado por sintoma psicótico',
          immediateAction: 'Antipsicótico IM urgente, contenção se necessário, psiquiatria',
          timeToAction: 20,
        },
        {
          description: 'Confusão + desorientação + flutuação consciência + febre',
          severity: 'critical' as const,
          clinicalSignificance: 'Delirium (causa orgânica) mimetizando psicose',
          immediateAction: 'Investigar causa: infecção, metabólica, TC crânio',
          timeToAction: 60,
        },
        {
          description: 'Catatonia + rigidez + mutismo + febre + uso recente antipsicótico',
          severity: 'critical' as const,
          clinicalSignificance: 'Síndrome Neuroléptica Maligna ou catatonia maligna',
          immediateAction: 'UTI, suspender antipsicótico, bromocriptina/dantrolene',
          timeToAction: 30,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Esquizofrenia - Primeiro Episódio Psicótico',
          icd10: 'F20.9',
          probability: 'high' as const,
          keyFeatures: [
            'Alucinações auditivas (vozes comentando)',
            'Delírios bizarros, persecutórios',
            'Desorganização do pensamento',
            'Início típico: adolescência/adulto jovem',
          ],
          diagnosticTests: ['Avaliação psiquiátrica', 'Descartar organicidade (TC, labs)'],
        },
        {
          condition: 'Transtorno Psicótico Induzido por Substâncias',
          icd10: 'F19.5',
          probability: 'high' as const,
          keyFeatures: [
            'Uso recente: cannabis, estimulantes, alucinógenos',
            'Sintomas durante/logo após uso',
            'Resolução em dias a semanas',
          ],
          diagnosticTests: ['Triagem toxicológica', 'História de uso'],
        },
        {
          condition: 'Transtorno Bipolar - Mania com Sintomas Psicóticos',
          icd10: 'F31.2',
          probability: 'medium' as const,
          keyFeatures: [
            'Humor elevado/irritável',
            'Delírios de grandiosidade',
            'Insônia, hiperatividade',
            'História de episódios prévios',
          ],
          diagnosticTests: ['História longitudinal', 'YMRS'],
        },
        {
          condition: 'Delirium (Psicose Orgânica)',
          icd10: 'F05.9',
          probability: 'high' as const,
          keyFeatures: [
            'Flutuação do nível de consciência',
            'Desorientação temporal/espacial',
            'Alteração aguda em idoso',
            'Causa identificável: infecção, metabólica',
          ],
          diagnosticTests: [
            'Hemograma, eletrólitos, ureia/creatinina',
            'TC crânio',
            'EAS, RX tórax',
            'Punção lombar se febre',
          ],
          specificRedFlags: ['SEMPRE descartar antes de diagnosticar psicose funcional'],
        },
        {
          condition: 'Transtorno Psicótico Breve',
          icd10: 'F23.9',
          probability: 'low' as const,
          keyFeatures: [
            'Sintomas psicóticos <1 mês',
            'Início súbito, frequentemente pós-estressor',
            'Resolução completa',
          ],
          diagnosticTests: ['Monitoramento clínico'],
        },
      ],
      condutaInicial: `**Passos Iniciais:**
1. **Descartar Causa Orgânica (SEMPRE):**
   - Glicemia capilar
   - Sinais vitais
   - Exame neurológico focal
   - Labs: hemograma, eletrólitos, função renal/hepática, TSH
   - TC crânio (se 1º episódio, idade >40, sinais focais, trauma)

2. **Avaliação de Risco:**
   - Ideação/comando suicida/homicida
   - Agitação, agressividade
   - Capacidade de autocuidado
   - Suporte familiar

3. **Antipsicótico de 1ª Geração (Típico):**
   - **Haloperidol 5mg IM** (se agitação)
   - Repetir 30-60min se necessário (máx 15mg/dia)
   - Associar prometazina 50mg IM (reduz efeitos extrapiramidais)

4. **Antipsicótico de 2ª Geração (Atípico - preferir se disponível):**
   - **Risperidona 2-3mg VO** (1º episódio)
   - **Olanzapina 10mg VO ou IM**
   - Menor risco de efeitos extrapiramidais

**Critérios de Internação Psiquiátrica:**
- 1º episódio psicótico (avaliação diagnóstica)
- Risco de autoagressão/heteroagressão
- Incapacidade de autocuidado
- Ausência de suporte familiar
- Refratariedade ao tratamento ambulatorial

**Seguimento:**
- Psiquiatria em <7 dias
- CAPS (Centro de Atenção Psicossocial)
- Antipsicótico via oral após estabilização
- Psicoeducação familiar`,
      calculadoras: ['PANSS (Positive and Negative Syndrome Scale)', 'BPRS (Brief Psychiatric Rating Scale)'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'ABP - Primeiro Episódio Psicótico',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'uptodate' as const,
          title: 'Acute Psychosis in Adults: Emergency Assessment',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Haloperidol',
          dose: '5mg',
          route: 'IM' as const,
          frequency: 'Pode repetir 30-60min (máx 15mg/dia)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Risperidona',
          dose: '2-3mg',
          route: 'VO' as const,
          frequency: '1x/dia',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
          specialNotes: 'Preferir em 1º episódio (menor efeito extrapiramidal)',
        },
        {
          genericName: 'Prometazina',
          dose: '50mg',
          route: 'IM' as const,
          frequency: 'Associar a haloperidol',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['ABP - Psicose Aguda'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // TRAUMA: Polytrauma
  // =========================================================================
  {
    code: 'TR_POLYTRAUMA',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Instabilidade hemodinâmica + distensão abdominal + mecanismo alta energia',
          severity: 'critical' as const,
          clinicalSignificance: 'Hemorragia intra-abdominal maciça',
          immediateAction: 'Acesso venoso calibroso 2x, cristaloide, FAST, cirurgia urgente',
          timeToAction: 10,
          references: [
            {
              source: 'brazilian-guideline' as const,
              title: 'ATLS - Advanced Trauma Life Support',
              lastAccessed: '2025-01-06T00:00:00Z',
              evidenceLevel: 'A' as const,
            },
          ],
        },
        {
          description: 'Instabilidade pélvica + choque + equimose perineal/escrotal',
          severity: 'critical' as const,
          clinicalSignificance: 'Fratura pélvica com hemorragia retroperitoneal',
          immediateAction: 'Cinta pélvica/lençol, cristaloide, considerar fixação externa urgente',
          timeToAction: 15,
        },
        {
          description: 'Rebaixamento progressivo Glasgow + pupilas anisocóricas',
          severity: 'critical' as const,
          clinicalSignificance: 'Herniação cerebral por hematoma intracraniano',
          immediateAction: 'IOT, hiperventilação, manitol, TC crânio, neurocirurgia',
          timeToAction: 20,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Trauma Abdominal Fechado com Lesão Visceral',
          icd10: 'S36.9',
          probability: 'high' as const,
          keyFeatures: [
            'Mecanismo: colisão, atropelamento, queda altura',
            'Dor abdominal, defesa',
            'Sinal de Cullen (equimose periumbilical)',
            'FAST positivo',
          ],
          diagnosticTests: ['FAST (Focused Assessment Sonography Trauma)', 'TC abdome com contraste'],
        },
        {
          condition: 'Traumatismo Cranioencefálico Grave',
          icd10: 'S06.9',
          probability: 'high' as const,
          keyFeatures: [
            'Glasgow ≤8',
            'Perda de consciência prolongada',
            'Pupilas anisocóricas, postura anormal',
          ],
          diagnosticTests: ['TC crânio URGENTE', 'Monitorização PIC'],
        },
        {
          condition: 'Fratura Pélvica Instável (Livro Aberto, Compressão Lateral)',
          icd10: 'S32.8',
          probability: 'medium' as const,
          keyFeatures: [
            'Instabilidade à compressão pélvica',
            'Equimose perineal, sangramento uretral',
            'Choque hipovolêmico desproporcional',
          ],
          diagnosticTests: ['Rx pelve AP', 'Cinta pélvica', 'Angiografia + embolização'],
        },
        {
          condition: 'Pneumotórax/Hemotórax Traumático',
          icd10: 'S27.0',
          probability: 'high' as const,
          keyFeatures: [
            'Dispneia, dor torácica',
            'Diminuição MV unilateral',
            'Enfisema subcutâneo, crepitação',
          ],
          diagnosticTests: ['Rx tórax', 'Drenagem torácica se instável'],
        },
        {
          condition: 'Fratura de Fêmur Bilateral/Múltiplas Fraturas Ossos Longos',
          icd10: 'S72.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Deformidade, crepitação',
            'Perda sanguínea maciça (fêmur: 1-2L)',
            'Síndrome compartimental',
          ],
          diagnosticTests: ['Rx membros', 'Fasciotomia se SD compartimental'],
        },
      ],
      condutaInicial: `**Protocolo ATLS (Advanced Trauma Life Support):**

**Primary Survey (ABCDE):**
1. **A - Airway + C-spine:**
   - Avaliação permeabilidade via aérea
   - Colar cervical rígido
   - IOT se Glasgow ≤8 ou proteção VA

2. **B - Breathing:**
   - Inspeção: movimentos simétricos, enfisema subcutâneo
   - Ausculta: MV bilateral
   - Rx tórax
   - Drenagem torácica se pneumo/hemotórax

3. **C - Circulation:**
   - 2 acessos venosos calibrosos (14-16G)
   - Cristaloide 1-2L rápido (Ringer Lactato)
   - Controle hemorragia externa (compressão direta)
   - FAST (eco abdominal)
   - Cinta pélvica se instabilidade

4. **D - Disability (Neuro):**
   - Glasgow Coma Scale
   - Pupilas (tamanho, simetria, fotorreação)
   - Sinais de herniação: manitol 0,25-1g/kg

5. **E - Exposure:**
   - Despir completamente
   - Log-roll (proteção coluna)
   - Prevenir hipotermia (cobertores térmicos)

**Secondary Survey:**
- Anamnese AMPLE (Alergias, Medicações, Passado, Última refeição, Evento)
- Exame físico cabeça-aos-pés
- Exames: Rx tórax/pelve, FAST, TC (se estável)

**Protocolo de Transfusão Maciça (se choque refratário):**
- Hemácias : Plasma : Plaquetas = 1:1:1
- Ácido tranexâmico 1g IV (se <3h trauma)`,
      calculadoras: ['Glasgow Coma Scale', 'Revised Trauma Score (RTS)', 'ISS (Injury Severity Score)'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'ATLS - Advanced Trauma Life Support (American College Surgeons)',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'ms-brasil' as const,
          title: 'MS - Linha de Cuidado ao Trauma',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
      ],
      medications: [
        {
          genericName: 'Ringer Lactato',
          dose: '1-2 litros',
          route: 'IV' as const,
          frequency: 'Bolus rápido',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
        {
          genericName: 'Ácido Tranexâmico',
          dose: '1g',
          route: 'IV' as const,
          frequency: 'Dose inicial + 1g em 8h',
          duration: 'Se <3h do trauma',
          susAvailable: true,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
          specialNotes: 'Reduz mortalidade em hemorragia traumática (estudo CRASH-2)',
        },
        {
          genericName: 'Manitol',
          dose: '0,25-1g/kg',
          route: 'IV' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Apenas se sinais de herniação cerebral',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['ATLS 10th Edition', 'MS - Trauma'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // TRAUMA: Head Trauma (TBI)
  // =========================================================================
  {
    code: 'TR_HEAD_TRAUMA',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Glasgow <9 + pupilas midriáticas fixas + postura descerebração',
          severity: 'critical' as const,
          clinicalSignificance: 'TCE grave com herniação cerebral iminente',
          immediateAction: 'IOT imediata, hiperventilação, manitol, TC crânio, neurocirurgia',
          timeToAction: 10,
        },
        {
          description: 'Intervalo lúcido + rebaixamento progressivo Glasgow',
          severity: 'critical' as const,
          clinicalSignificance: 'Hematoma epidural clássico',
          immediateAction: 'TC crânio urgente, neurocirurgia para craniotomia',
          timeToAction: 30,
        },
        {
          description: 'Otorreia/rinorreia líquida clara + sinal de Battle/olhos de guaxinim',
          severity: 'warning' as const,
          clinicalSignificance: 'Fratura de base de crânio com fístula liquórica',
          immediateAction: 'TC crânio, neurocirurgia, ATB profilático controverso',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'TCE Leve (Concussão)',
          icd10: 'S06.0',
          probability: 'high' as const,
          keyFeatures: [
            'Glasgow 14-15',
            'Perda de consciência <30min ou amnésia',
            'Cefaleia, náusea, tontura',
            'Sem déficit focal',
          ],
          diagnosticTests: ['TC crânio (critérios Canadian CT Head Rule)', 'Observação 4-6h'],
        },
        {
          condition: 'Hematoma Subdural Agudo',
          icd10: 'S06.5',
          probability: 'medium' as const,
          keyFeatures: [
            'Trauma + rebaixamento progressivo',
            'Déficit focal (hemiparesia)',
            'TC: coleção crescente em lua',
          ],
          diagnosticTests: ['TC crânio', 'Cirurgia se volume >10mm ou desvio linha média'],
        },
        {
          condition: 'Hematoma Epidural',
          icd10: 'S06.4',
          probability: 'low' as const,
          keyFeatures: [
            'Intervalo lúcido clássico (nem sempre)',
            'Trauma temporal + fratura',
            'TC: coleção biconvexa (lente)',
          ],
          diagnosticTests: ['TC crânio urgente', 'Craniotomia emergência'],
        },
        {
          condition: 'Contusão Cerebral',
          icd10: 'S06.3',
          probability: 'medium' as const,
          keyFeatures: [
            'Trauma moderado-grave',
            'Déficits focais variáveis',
            'TC: hiperdensidades múltiplas (sangue)',
          ],
          diagnosticTests: ['TC crânio seriado (piora em 24-48h)', 'Monitorização PIC se grave'],
        },
        {
          condition: 'Fratura de Crânio (Abóbada ou Base)',
          icd10: 'S02.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Afundamento palpável (abóbada)',
            'Sinal de Battle, olhos de guaxinim, otorreia/rinorreia (base)',
          ],
          diagnosticTests: ['TC crânio', 'Cirurgia se afundamento >espessura óssea'],
        },
      ],
      condutaInicial: `**Classificação por Glasgow:**
- **Leve:** 14-15
- **Moderado:** 9-13
- **Grave:** ≤8

**Manejo Inicial:**
1. **ABCDE (priorizar via aérea):**
   - IOT se Glasgow ≤8, apneia, hipoxemia refratária
   - C-spine: colar cervical até descartar lesão

2. **TC Crânio (Indicações - Canadian CT Head Rule):**
   - Glasgow <15 após 2h
   - Suspeita fratura crânio aberta/afundada
   - Sinais de fratura base (Battle, olhos guaxinim, otorreia)
   - ≥2 episódios de vômito
   - Idade ≥65 anos
   - Amnésia retrógrada >30min
   - Mecanismo perigoso (queda >1m, ejeção veículo)

3. **Prevenção de Hipertensão Intracraniana:**
   - Cabeceira 30°
   - Normotermia
   - Evitar hipotensão (PAS >90)
   - Evitar hipóxia (SpO2 >90%)
   - **Manitol 0,25-1g/kg IV** (se sinais de herniação)
   - **Solução salina hipertônica 3%** (alternativa)

4. **Neurocirurgia (Critérios):**
   - Hematoma epidural >30mL
   - Hematoma subdural >10mm ou desvio linha média
   - Contusão com efeito de massa
   - Fratura afundada >espessura óssea

**Observação Hospitalar (TCE Leve com TC normal):**
- 4-6h
- Reavaliação neurológica horária
- Alta com orientações (retornar se: vômitos, sonolência, convulsão)`,
      calculadoras: ['Glasgow Coma Scale', 'Canadian CT Head Rule', 'New Orleans Criteria'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'Diretrizes SBN - Traumatismo Cranioencefálico',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'neurocritical-care' as const,
          title: 'Guidelines for Management of Severe TBI',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Manitol',
          dose: '0,25-1g/kg',
          route: 'IV' as const,
          frequency: 'Bolus (repetir se herniação)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Reduz PIC, usar apenas se sinais herniação ou PIC >20mmHg',
        },
        {
          genericName: 'Solução Salina Hipertônica 3%',
          dose: '250mL',
          route: 'IV' as const,
          frequency: 'Bolus',
          susAvailable: false,
          renameCompatible: false,
          specialNotes: 'Alternativa ao manitol, pode ser superior',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBN - TCE'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // TRAUMA: Penetrating Trauma
  // =========================================================================
  {
    code: 'TR_PENETRATING_TRAUMA',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'FAF/FAB tórax + instabilidade hemodinâmica + turgência jugular',
          severity: 'critical' as const,
          clinicalSignificance: 'Tamponamento cardíaco ou pneumotórax hipertensivo',
          immediateAction: 'Pericardiocentese/drenagem torácica, toracotomia se refratário',
          timeToAction: 5,
        },
        {
          description: 'FAF/FAB abdome + evisceração ou sangramento ativo',
          severity: 'critical' as const,
          clinicalSignificance: 'Lesão visceral com hemorragia',
          immediateAction: 'Cristaloide, laparotomia exploradora urgente',
          timeToAction: 15,
        },
        {
          description: 'Ferimento penetrante zona II pescoço + hematoma expansivo',
          severity: 'critical' as const,
          clinicalSignificance: 'Lesão vascular (carótida, jugular) ou via aérea',
          immediateAction: 'Via aérea cirúrgica se necessário, exploração cirúrgica',
          timeToAction: 20,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Lesão Cardíaca Penetrante',
          icd10: 'S26.9',
          probability: 'high' as const,
          keyFeatures: [
            'FAF/FAB tórax anterior (zona perigosa)',
            'Tríade de Beck: hipotensão, turgência jugular, bulhas abafadas',
            'FAST positivo (líquido pericárdico)',
          ],
          diagnosticTests: ['FAST', 'Janela pericárdica ou toracotomia urgente'],
        },
        {
          condition: 'Hemotórax/Pneumotórax Traumático',
          icd10: 'S27.1',
          probability: 'high' as const,
          keyFeatures: [
            'FAF/FAB tórax',
            'Dispneia, dor, diminuição MV',
            'Rx tórax: nível líquido ou colapso pulmonar',
          ],
          diagnosticTests: ['Rx tórax', 'Drenagem torácica', 'Toracotomia se >1500mL ou 200mL/h'],
        },
        {
          condition: 'Lesão Vascular Cervical',
          icd10: 'S15.9',
          probability: 'medium' as const,
          keyFeatures: [
            'Ferimento zona II pescoço (entre cricóide e ângulo mandíbula)',
            'Hematoma expansivo, sopro, déficit neuro',
          ],
          diagnosticTests: ['Angio-TC', 'Exploração cirúrgica se hard signs'],
        },
        {
          condition: 'Lesão Intra-abdominal (Víscera Oca ou Sólida)',
          icd10: 'S36.9',
          probability: 'high' as const,
          keyFeatures: [
            'FAF/FAB abdome',
            'Dor, defesa, irritação peritoneal',
            'FAST positivo',
          ],
          diagnosticTests: ['FAST', 'TC abdome (se estável)', 'Laparotomia se instável/FAST+'],
        },
        {
          condition: 'Lesão Medular Penetrante',
          icd10: 'S14.1',
          probability: 'low' as const,
          keyFeatures: ['FAF/FAB região paravertebral ou cervical', 'Déficit motor/sensitivo', 'Choque medular'],
          diagnosticTests: ['TC coluna', 'RM (se disponível)', 'Neurocirurgia'],
        },
      ],
      condutaInicial: `**Princípios Específicos - Trauma Penetrante:**

**1. NÃO Remover Objetos Empalados:**
- Objetos in situ tamponam hemorragia
- Remoção apenas em centro cirúrgico

**2. Avaliação por Região:**

**Tórax:**
- FAST (líquido pericárdico = tamponamento)
- Rx tórax
- Drenagem torácica se pneumo/hemotórax
- Toracotomia se:
  - Débito inicial >1500mL
  - Débito >200mL/h por 3h
  - Instabilidade refratária

**Abdome:**
- FAST
- Se FAST+ ou instável: laparotomia exploradora
- Se estável + FAST negativo: considerar TC ou observação

**Pescoço (zonas):**
- Zona I (clavícula → cricóide): Angio-TC, toracotomia/exploração
- Zona II (cricóide → ângulo mandíbula): Exploração cirúrgica se hard signs
- Zona III (ângulo mandíbula → base crânio): Angio-TC

**Hard Signs (Exploração Cirúrgica Obrigatória):**
- Hemorragia ativa pulsátil
- Hematoma expansivo
- Choque refratário
- Evisceração
- Sinais de peritonite

**Antibiótico Profilático:**
- Cefazolina 2g IV (trauma tórax/abdome)
- Ampliar espectro se contaminação GI`,
      calculadoras: ['Revised Trauma Score (RTS)', 'Penetrating Abdominal Trauma Index (PATI)'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'ATLS - Penetrating Trauma',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Cefazolina',
          dose: '2g',
          route: 'IV' as const,
          frequency: '8/8h',
          duration: '24-48h profilático',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'B' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['ATLS 10th Edition'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // TRAUMA: Fall in Elderly
  // =========================================================================
  {
    code: 'TR_FALL_ELDERLY',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Queda + dor cervical + déficit motor/sensitivo',
          severity: 'critical' as const,
          clinicalSignificance: 'Fratura cervical com lesão medular',
          immediateAction: 'Imobilização cervical, TC coluna, neurocirurgia',
          timeToAction: 20,
        },
        {
          description: 'Queda + TCE + uso anticoagulante (varfarina, NOAC)',
          severity: 'critical' as const,
          clinicalSignificance: 'Alto risco hematoma intracraniano tardio',
          immediateAction: 'TC crânio obrigatório, reverter anticoagulante se sangramento',
          timeToAction: 60,
        },
        {
          description: 'Queda + dor/deformidade quadril + impossibilidade de deambular',
          severity: 'warning' as const,
          clinicalSignificance: 'Fratura de fêmur proximal',
          immediateAction: 'Analgesia, Rx pelve/quadril, ortopedia (cirurgia <48h)',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Fratura de Fêmur Proximal (Colo/Transtrocantérica)',
          icd10: 'S72.0',
          probability: 'high' as const,
          keyFeatures: [
            'Dor inguinal intensa',
            'Membro encurtado, rodado externamente',
            'Impossibilidade de marcha',
            'Idoso osteoporótico + queda da própria altura',
          ],
          diagnosticTests: ['Rx pelve AP + quadril (AP/Perfil)', 'Cirurgia <48h (reduz mortalidade)'],
        },
        {
          condition: 'Hematoma Subdural Crônico',
          icd10: 'I62.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Queda leve há semanas',
            'Rebaixamento progressivo consciência',
            'Confusão mental, hemiparesia flutuante',
            'TC: coleção hipodensa crescente',
          ],
          diagnosticTests: ['TC crânio', 'Drenagem cirúrgica se sintomático'],
        },
        {
          condition: 'Fratura de Coluna Vertebral (Compressão)',
          icd10: 'S32.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Dor torácica/lombar pós-queda',
            'Pode ser assintomática inicialmente',
            'Osteoporose, uso crônico corticoide',
          ],
          diagnosticTests: ['Rx coluna (AP/Perfil)', 'TC ou RM se déficit neuro'],
        },
        {
          condition: 'Síncope (Causa da Queda)',
          icd10: 'R55',
          probability: 'high' as const,
          keyFeatures: [
            'Perda de consciência súbita antes da queda',
            'Recuperação espontânea',
            'Investigar: arritmia, hipotensão ortostática, AVC',
          ],
          diagnosticTests: ['ECG', 'Sinais vitais ortostáticos', 'Glicemia', 'Holter'],
        },
        {
          condition: 'Fratura de Punho (Colles)',
          icd10: 'S52.5',
          probability: 'medium' as const,
          keyFeatures: [
            'Queda com apoio na mão',
            'Deformidade "dorso de garfo"',
            'Dor, edema punho',
          ],
          diagnosticTests: ['Rx punho AP/Perfil', 'Redução + imobilização'],
        },
      ],
      condutaInicial: `**Avaliação Sistêmica (Não focar apenas na lesão óbvia):**

**1. Investigar CAUSA da Queda:**
- Síncope? (ECG, glicemia, PA ortostática)
- AVC/AIT? (exame neurológico, TC crânio)
- Arritmia? (ECG, Holter)
- Hipoglicemia? (glicemia capilar)
- Infecção oculta? (urina, pulmão)

**2. Avaliar Lesões Traumáticas:**
- **TC Crânio:** se TCE + anticoagulante, rebaixamento Glasgow, ou amnésia
- **Rx/TC Coluna:** se dor cervical, torácica, lombar
- **Rx Pelve + Quadril:** se dor/impossibilidade de marcha
- **Exame físico completo:** hematomas, fraturas ocultas

**3. Revisão de Medicações (Polifarmácia):**
- Benzodiazepínicos (sedação, ataxia)
- Anti-hipertensivos (hipotensão ortostática)
- Anticoagulantes (risco sangramento)

**4. Manejo Ortopédico:**
- **Fratura Fêmur Proximal:**
  - Analgesia adequada (bloqueio fascia iliaca, opioides)
  - Cirurgia <48h (↓ mortalidade, TEV, complicações)
  - Profilaxia TEV (enoxaparina 40mg SC/dia)

- **Fratura Vertebral:**
  - Analgesia
  - Vertebroplastia/cifoplastia se refratário

**5. Prevenção Secundária:**
- Vitamina D + Cálcio
- Bisfosfonato (se osteoporose)
- Fisioterapia, avaliação domiciliar`,
      calculadoras: ['Morse Fall Scale', 'FRAX (Fracture Risk Assessment)'],
      ebmReferences: [
        {
          source: 'ms-brasil' as const,
          title: 'MS - Prevenção de Quedas em Idosos',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'brazilian-guideline' as const,
          title: 'SBGG - Quedas em Idosos',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
      ],
      medications: [
        {
          genericName: 'Enoxaparina',
          dose: '40mg',
          route: 'SC' as const,
          frequency: '1x/dia',
          duration: 'Até deambulação',
          susAvailable: true,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
          specialNotes: 'Profilaxia TEV em fratura quadril',
          renalAdjustment: 'Ajustar se ClCr <30',
        },
        {
          genericName: 'Morfina',
          dose: '2-5mg',
          route: 'IV' as const,
          frequency: 'SOS (titular)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Analgesia fratura fêmur, cautela em idosos',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['MS - Quedas Idosos', 'SBGG'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // TRAUMA: Burns
  // =========================================================================
  {
    code: 'TR_BURNS',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Queimadura em ambiente fechado + fuligem nasal + rouquidão',
          severity: 'critical' as const,
          clinicalSignificance: 'Lesão inalatória com risco de obstrução VA',
          immediateAction: 'IOT precoce (edema progressivo), broncoscopia',
          timeToAction: 30,
        },
        {
          description: 'SCQ >20% adulto ou >10% criança + hipotensão',
          severity: 'critical' as const,
          clinicalSignificance: 'Choque hipovolêmico por perda capilar maciça',
          immediateAction: 'Fórmula Parkland: 4mL x peso x %SCQ (metade em 8h)',
          timeToAction: 60,
        },
        {
          description: 'Queimadura elétrica + arritmia ou necrose profunda',
          severity: 'critical' as const,
          clinicalSignificance: 'Lesão miocárdica ou síndrome compartimental',
          immediateAction: 'Monitorização cardíaca, fasciotomia se SD compartimental',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Queimadura Térmica Superficial (1º-2º Grau Superficial)',
          icd10: 'T20.0',
          probability: 'high' as const,
          keyFeatures: [
            'Eritema, dor intensa',
            'Bolhas (2º grau)',
            'Base úmida, rosada',
            'Reepiteliza sem cirurgia',
          ],
          diagnosticTests: ['Avaliação clínica', 'Limpeza + curativo oclusivo'],
        },
        {
          condition: 'Queimadura Profunda (2º Grau Profundo/3º Grau)',
          icd10: 'T20.3',
          probability: 'medium' as const,
          keyFeatures: [
            'Base pálida, sem dor (nervos destruídos)',
            'Textura coriácea',
            'Não branqueia à pressão',
            'Necessita enxertia',
          ],
          diagnosticTests: ['Avaliação cirúrgica', 'Escarotomia/enxertia'],
        },
        {
          condition: 'Lesão Inalatória',
          icd10: 'T27.3',
          probability: 'medium' as const,
          keyFeatures: [
            'Queimadura em ambiente fechado',
            'Fuligem em narinas/orofaringe',
            'Rouquidão, estridor',
            'Hipoxemia progressiva',
          ],
          diagnosticTests: ['Broncoscopia', 'Gasometria arterial + carboxiemoglobina', 'IOT se estridor'],
        },
        {
          condition: 'Queimadura Elétrica',
          icd10: 'T29.4',
          probability: 'low' as const,
          keyFeatures: [
            'Lesão entrada/saída',
            'Necrose muscular profunda (rabdomiólise)',
            'Arritmias',
            'Síndrome compartimental',
          ],
          diagnosticTests: ['ECG contínuo', 'CPK', 'Mioglobinúria', 'Fasciotomia'],
        },
        {
          condition: 'Queimadura Química',
          icd10: 'T26.9',
          probability: 'low' as const,
          keyFeatures: [
            'Ácidos: necrose coagulação (escara dura)',
            'Bases: necrose liquefação (profunda)',
            'Lesão progressiva',
          ],
          diagnosticTests: ['Irrigação contínua (20-30min)', 'Não neutralizar'],
        },
      ],
      condutaInicial: `**Cálculo de Superfície Corporal Queimada (SCQ):**
- **Regra dos 9 (adultos):**
  - Cabeça: 9%
  - Braço: 9% cada
  - Tronco anterior/posterior: 18% cada
  - Perna: 18% cada
  - Períneo: 1%

- **Regra da Palma:** palma do paciente = 1% SCQ

**Hidratação (Fórmula de Parkland):**
- **Volume:** 4 mL x peso (kg) x %SCQ
- **Metade em primeiras 8h** (do momento da queimadura)
- **Metade restante em 16h**
- Usar Ringer Lactato
- Ajustar por débito urinário (0,5-1mL/kg/h)

**Analgesia:**
- Morfina 0,1mg/kg IV (titular, dor intensa)
- Paracetamol/dipirona adjuvante

**Cuidados Locais:**
- **Limpeza:** água corrente fria 10-20min, soro fisiológico
- **Desbridamento:** apenas tecido desvitalizado solto
- **Curativo:**
  - Sulfadiazina de prata 1% (antimicrobiano)
  - Gazes estéreis, trocar 12-24h

**Critérios de Transferência para Centro Queimados:**
- SCQ >10% em criança ou idoso
- SCQ >20% em adulto
- Queimadura 3º grau >5%
- Queimadura face, mãos, pés, genitais, articulações
- Queimadura elétrica ou química
- Lesão inalatória
- Trauma associado`,
      calculadoras: ['Regra dos 9 (Wallace)', 'Fórmula de Parkland'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'SBQ - Sociedade Brasileira de Queimaduras',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'uptodate' as const,
          title: 'Burn Resuscitation',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Ringer Lactato',
          dose: 'Fórmula Parkland',
          route: 'IV' as const,
          frequency: 'Contínuo',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
        {
          genericName: 'Sulfadiazina de Prata 1%',
          dose: 'Aplicação tópica',
          route: 'Tópico' as const,
          frequency: '12-24h',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          contraindications: ['Alergia sulfa', 'Gestantes no termo', 'RN'],
        },
        {
          genericName: 'Morfina',
          dose: '0,1mg/kg',
          route: 'IV' as const,
          frequency: 'SOS (titular)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['SBQ - Queimaduras'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // TOXICOLOGIC: Overdose / Intoxication
  // =========================================================================
  {
    code: 'TOX_OVERDOSE',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Rebaixamento Glasgow <8 + depressão respiratória + miose',
          severity: 'critical' as const,
          clinicalSignificance: 'Intoxicação por opioides com risco de PCR',
          immediateAction: 'IOT, naloxona 0,4-2mg IV/IM, suporte ventilatório',
          timeToAction: 10,
        },
        {
          description: 'Arritmia ventricular + QRS alargado + agitação/confusão',
          severity: 'critical' as const,
          clinicalSignificance: 'Intoxicação por antidepressivo tricíclico',
          immediateAction: 'Bicarbonato de sódio 1-2 mEq/kg IV, monitorização cardíaca',
          timeToAction: 20,
        },
        {
          description: 'Convulsão + hipoglicemia + acidose metabólica gap aumentado',
          severity: 'critical' as const,
          clinicalSignificance: 'Intoxicação por metanol/etilenoglicol',
          immediateAction: 'Fomepizol ou etanol IV, hemodiálise urgente, tiamina',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Intoxicação por Opioides',
          icd10: 'T40.2',
          probability: 'high' as const,
          keyFeatures: [
            'Tríade: depressão SNC, miose, depressão respiratória',
            'Bradicardia, hipotensão',
            'Resposta dramática a naloxona',
          ],
          diagnosticTests: ['Gasometria', 'Triagem toxicológica', 'Naloxona teste-diagnóstico'],
        },
        {
          condition: 'Intoxicação por Benzodiazepínicos',
          icd10: 'T42.4',
          probability: 'high' as const,
          keyFeatures: [
            'Sedação profunda',
            'Reflexos preservados (diferente de barbitúricos)',
            'Resposta parcial a flumazenil (CUIDADO: risco convulsão)',
          ],
          diagnosticTests: ['Triagem toxicológica', 'NÃO usar flumazenil rotina (risco)'],
        },
        {
          condition: 'Intoxicação por Antidepressivo Tricíclico',
          icd10: 'T43.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Síndrome anticolinérgica (midríase, pele seca, retenção urinária)',
            'QRS >100ms, QTc prolongado',
            'Arritmias ventriculares',
          ],
          diagnosticTests: ['ECG (QRS, QTc)', 'Bicarbonato se QRS >100ms'],
        },
        {
          condition: 'Intoxicação por Paracetamol',
          icd10: 'T39.1',
          probability: 'high' as const,
          keyFeatures: [
            'Assintomático primeiras 24h',
            'Hepatotoxicidade em 24-72h',
            'Dose tóxica >7,5g ou 150mg/kg',
          ],
          diagnosticTests: [
            'Nível sérico paracetamol 4h pós-ingestão',
            'Nomograma Rumack-Matthew',
            'N-acetilcisteína se indicado',
          ],
        },
        {
          condition: 'Intoxicação por Metanol/Etilenoglicol',
          icd10: 'T51.1',
          probability: 'low' as const,
          keyFeatures: [
            'Acidose metabólica com GAP aumentado',
            'Metanol: alteração visual ("neve")',
            'Etilenoglicol: cristais oxalato urina, IRA',
          ],
          diagnosticTests: ['Gasometria (GAP aniônico)', 'Osmolalidade sérica (GAP osmolar)', 'Hemodiálise + fomepizol'],
        },
      ],
      condutaInicial: `**Abordagem Geral (ABCDE + Descontaminação):**

**1. Suporte Vital:**
- Via aérea: IOT se Glasgow <8
- Glicemia capilar (dextrose 50% se hipoglicemia)
- Acesso venoso, cristaloide

**2. Descontaminação:**
- **Lavagem Gástrica:** CONTRAINDICADA (risco aspiração, não melhora desfecho)
- **Carvão Ativado:** 1g/kg VO (se <1h ingestão, paciente alerta)
  - Útil em: TCA, paracetamol, ASA
  - NÃO usar em: cáusticos, álcoois, metais pesados

**3. Antídotos Específicos:**

| Toxina | Antídoto | Dose |
|--------|----------|------|
| Opioides | Naloxona | 0,4-2mg IV/IM, repetir 2-3min |
| Paracetamol | N-acetilcisteína | 150mg/kg em 1h → 50mg/kg em 4h → 100mg/kg em 16h |
| Benzodiazepínicos | Flumazenil | 0,2mg IV (CUIDADO: risco convulsão) |
| Metanol/Etilenoglicol | Fomepizol | 15mg/kg IV + hemodiálise |
| Anticolinérgicos | Fisostigmina | 0,5-2mg IV lento |
| Beta-bloqueadores | Glucagon | 5-10mg IV bolus + infusão |

**4. Descontaminação Gastrointestinal (casos selecionados):**
- Polietilenoglicol (PEG): ingestão de ferro, lítio, liberação prolongada

**5. Monitorização:**
- ECG contínuo (QRS, QTc)
- Sinais vitais q15min
- Nível de consciência

**Critérios de Internação UTI:**
- Depressão respiratória
- Arritmias
- Convulsões
- Glasgow <12
- Necessidade de antídoto contínuo`,
      calculadoras: ['Nomograma Rumack-Matthew (Paracetamol)', 'Anion Gap', 'Osmolar Gap'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'ABTOX - Associação Brasileira de Toxicologia',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'uptodate' as const,
          title: 'General Approach to Drug Poisoning in Adults',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Naloxona',
          dose: '0,4-2mg',
          route: 'IV' as const,
          frequency: 'Repetir 2-3min (titular)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'N-acetilcisteína',
          dose: '150mg/kg em 1h (dose ataque)',
          route: 'IV' as const,
          frequency: 'Protocolo 21h',
          susAvailable: true,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
          specialNotes: 'Antídoto paracetamol, usar se nível sérico acima linha Rumack-Matthew',
        },
        {
          genericName: 'Carvão Ativado',
          dose: '1g/kg (máx 50g)',
          route: 'VO' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          contraindications: ['Via aérea não protegida', 'Cáusticos', 'Hidrocarbonetos'],
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['ABTOX - Toxicologia Clínica'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // TOXICOLOGIC: Drug Abuse
  // =========================================================================
  {
    code: 'TOX_DRUG_ABUSE',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Dor torácica + uso recente cocaína + alterações ECG',
          severity: 'critical' as const,
          clinicalSignificance: 'IAM por vasoespasmo coronariano',
          immediateAction: 'ECG, troponina, benzodiazepínico (NÃO beta-bloqueador!), AAS, nitrato',
          timeToAction: 20,
        },
        {
          description: 'Hipertermia >40°C + rigidez + agitação + uso MDMA/ecstasy',
          severity: 'critical' as const,
          clinicalSignificance: 'Síndrome serotoninérgica ou hipertermia maligna',
          immediateAction: 'Cooling agressivo, benzodiazepínico, dantrolene se refratário',
          timeToAction: 30,
        },
        {
          description: 'Convulsão + hiponatremia grave + uso MDMA',
          severity: 'critical' as const,
          clinicalSignificance: 'SIADH por ecstasy (consumo excessivo água)',
          immediateAction: 'Solução salina hipertônica 3%, não corrigir rápido (risco mielinólise)',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Intoxicação por Cocaína/Crack',
          icd10: 'F14.0',
          probability: 'high' as const,
          keyFeatures: [
            'Euforia, agitação, paranoia',
            'Taquicardia, hipertensão, midríase',
            'Dor torácica (vasoespasmo coronariano)',
            'Rabdomiólise',
          ],
          diagnosticTests: ['ECG', 'Troponina', 'CPK', 'Triagem toxicológica'],
        },
        {
          condition: 'Intoxicação por Anfetaminas/MDMA (Ecstasy)',
          icd10: 'F15.0',
          probability: 'high' as const,
          keyFeatures: [
            'Euforia, empatia aumentada (MDMA)',
            'Hipertermia, sudorese',
            'Bruxismo, midríase',
            'Hiponatremia (SIADH)',
          ],
          diagnosticTests: ['Eletrólitos (sódio)', 'Temperatura', 'CPK', 'Triagem toxicológica'],
        },
        {
          condition: 'Intoxicação por Cannabis/Maconha',
          icd10: 'F12.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Euforia, relaxamento',
            'Hiperemia conjuntival, xerostomia',
            'Taquicardia leve',
            'Raramente grave (síndrome hiperemese cannabinoide)',
          ],
          diagnosticTests: ['Suporte, triagem toxicológica'],
        },
        {
          condition: 'Síndrome de Abstinência Alcoólica',
          icd10: 'F10.3',
          probability: 'high' as const,
          keyFeatures: [
            'Tremores, sudorese, ansiedade',
            'Alucinações táteis/visuais',
            'Convulsões (12-48h após cessação)',
            'Delirium tremens (72h+)',
          ],
          diagnosticTests: ['CIWA-Ar score', 'Tiamina 100mg IM', 'Benzodiazepínico'],
        },
        {
          condition: 'Síndrome de Abstinência de Opioides',
          icd10: 'F11.3',
          probability: 'medium' as const,
          keyFeatures: [
            'Lacrimejamento, rinorreia',
            'Diarreia, náusea, vômitos',
            'Dores musculares, piloereção',
            'Desconfortável mas NÃO fatal',
          ],
          diagnosticTests: ['Suporte sintomático', 'Clonidina', 'Considerar buprenorfina'],
        },
      ],
      condutaInicial: `**Manejo por Substância:**

**Cocaína/Crack:**
- **Agitação:** Benzodiazepínico (diazepam 10mg IV)
- **Dor torácica:**
  - ECG, troponina
  - AAS 300mg
  - Nitrato SL/IV
  - **NÃO** beta-bloqueador (piora vasoespasmo)
  - Benzodiazepínico (reduz demanda O2)
- **Hipertensão:** Nitrato, nitroglicerina
- **Rabdomiólise:** Hidratação vigorosa

**MDMA/Ecstasy:**
- **Hipertermia:**
  - Cooling: gelo, ventilador, SF gelado IV
  - Benzodiazepínico (diazepam)
  - Dantrolene se refratário
- **Hiponatremia:**
  - Solução salina 3% (cauteloso, risco mielinólise)
  - Restrição hídrica
- **Síndrome serotoninérgica:**
  - Benzodiazepínico
  - Ciproheptadina (antídoto)

**Abstinência Alcoólica:**
- **CIWA-Ar Score:**
  - <8: monitoramento
  - 8-15: diazepam 10-20mg VO q1-2h
  - >15: diazepam 10mg IV q15min até sedação
- **Tiamina 100mg IM** (antes glicose, prevenir Wernicke)
- **Suporte nutricional**

**Abstinência Opioides:**
- **Suporte sintomático:** hidratação, antieméticos
- **Clonidina 0,1-0,2mg VO** (sintomas adrenérgicos)
- **Considerar:** buprenorfina/metadona (programa estruturado)`,
      calculadoras: ['CIWA-Ar (Abstinência Alcoólica)', 'COWS (Abstinência Opioides)'],
      ebmReferences: [
        {
          source: 'brazilian-guideline' as const,
          title: 'MS - Abordagem Uso de Drogas',
          url: 'https://www.gov.br/saude/pt-br',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
        {
          source: 'uptodate' as const,
          title: 'Cocaine Intoxication and Withdrawal',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'B' as const,
        },
      ],
      medications: [
        {
          genericName: 'Diazepam',
          dose: '10-20mg',
          route: 'IV' as const,
          frequency: 'Titular conforme agitação/CIWA',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Tiamina',
          dose: '100mg',
          route: 'IM' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'SEMPRE antes de glicose em etilista (prevenir Wernicke)',
        },
        {
          genericName: 'Clonidina',
          dose: '0,1-0,2mg',
          route: 'VO' as const,
          frequency: '12/12h',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Sintomas adrenérgicos abstinência opioides',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'moderate' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['MS - Drogas'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // ENVIRONMENTAL: Snake Bite
  // =========================================================================
  {
    code: 'ENV_SNAKE_BITE',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Ptose palpebral + diplopia + dificuldade deglutição pós-picada',
          severity: 'critical' as const,
          clinicalSignificance: 'Envenenamento neurotóxico (coral) com paralisia respiratória iminente',
          immediateAction: 'Soro anticoral 10 ampolas IV, IOT se insuficiência respiratória',
          timeToAction: 60,
        },
        {
          description: 'Edema local progressivo + equimoses extensas + sangramento mucosas',
          severity: 'critical' as const,
          clinicalSignificance: 'Envenenamento botrópico grave (jararaca)',
          immediateAction: 'Soro antibotrópico 4-12 ampolas IV, hidratação, monitorar coagulopatia',
          timeToAction: 120,
        },
        {
          description: 'IRA oligúrica + urina escura + picada de cobra',
          severity: 'warning' as const,
          clinicalSignificance: 'Rabdomiólise ou necrose tubular por veneno',
          immediateAction: 'Hidratação vigorosa, alcalinização urina, considerar hemodiálise',
          timeToAction: 180,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Acidente Botrópico (Jararaca)',
          icd10: 'T63.0',
          probability: 'high' as const,
          keyFeatures: [
            'Dor e edema local imediatos',
            'Equimoses, bolhas hemorrágicas',
            'Sangramento (gengivas, epistaxe)',
            'Coagulopatia (TC incoagulável)',
          ],
          diagnosticTests: ['TC (tempo coagulação)', 'Hemograma', 'Função renal', 'CPK'],
        },
        {
          condition: 'Acidente Crotálico (Cascavel)',
          icd10: 'T63.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Pouca manifestação local',
            'Facies miastênica (ptose, oftalmoplegia)',
            'Mialgia generalizada',
            'Urina escura (mioglobinúria)',
          ],
          diagnosticTests: ['CPK', 'Função renal', 'Mioglobinúria', 'Soro anticrotálico'],
        },
        {
          condition: 'Acidente Laquético (Surucucu)',
          icd10: 'T63.0',
          probability: 'low' as const,
          keyFeatures: [
            'Manifestações botrópicas + vagais',
            'Bradicardia, hipotensão',
            'Diarreia, vômitos',
          ],
          diagnosticTests: ['Soro antilaquético ou antibotrópico'],
        },
        {
          condition: 'Acidente Elapídico (Coral)',
          icd10: 'T63.0',
          probability: 'low' as const,
          keyFeatures: [
            'Mínima manifestação local',
            'Parestesias local',
            'Paralisia flácida descendente (2-12h)',
            'Insuficiência respiratória',
          ],
          diagnosticTests: ['Gasometria', 'Soro anticoral (precoce)'],
        },
        {
          condition: 'Picada por Serpente Não-Peçonhenta',
          icd10: 'W59.1',
          probability: 'medium' as const,
          keyFeatures: [
            'Apenas marca dentária (sem presas)',
            'Sem edema progressivo',
            'Sem sintomas sistêmicos',
          ],
          diagnosticTests: ['Observação 12-24h', 'Limpeza local'],
        },
      ],
      condutaInicial: `**Protocolo Inicial:**

**1. Avaliação e Identificação:**
- Classificação: botrópico (jararaca), crotálico (cascavel), laquético (surucucu), elapídico (coral)
- Tempo desde picada
- Local da picada (proximal pior que distal)

**2. Classificação de Gravidade (Botrópico):**
- **Leve:** edema local <2 segmentos, sem sangramento, TC normal
  - Soro: 2-4 ampolas
- **Moderado:** edema 2-3 segmentos, sangramento leve, TC anormal
  - Soro: 4-8 ampolas
- **Grave:** edema >3 segmentos, sangramento importante, choque
  - Soro: 8-12 ampolas

**3. Soroterapia (Antiofídica):**
- **Diluir em SF 250mL**, correr em 2-4h
- **Pré-medicação:** prometazina 25mg IV (reduz reações)
- **Monitorar reações:** rash, broncoespasmo, hipotensão (parar soro, adrenalina se anafilaxia)

**4. Cuidados Locais:**
- Lavar com água e sabão
- Membro elevado, repouso
- **NÃO:** torniquete, gelo, incisão, sucção

**5. Exames:**
- TC (tempo coagulação) - Lee-White (↑ em botrópico)
- Hemograma (plaquetas)
- Função renal (ureia, creatinina)
- CPK (rabdomiólise em crotálico)
- Mioglobinúria

**6. Profilaxia Tétano:**
- Vacina + soro antitetânico (se não vacinado)

**7. Antibiótico:**
- NÃO profilático rotineiro
- Apenas se sinais de infecção secundária`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'ms-brasil' as const,
          title: 'MS - Manual de Acidentes Ofídicos',
          url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos',
          yearPublished: 2021,
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Soro Antibotrópico',
          dose: '2-12 ampolas',
          route: 'IV' as const,
          frequency: 'Dose única (conforme gravidade)',
          susAvailable: true,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
          specialNotes: 'Diluir em SF 250mL, pré-medicação com anti-histamínico',
        },
        {
          genericName: 'Soro Anticrotálico',
          dose: '5-10 ampolas',
          route: 'IV' as const,
          frequency: 'Dose única',
          susAvailable: true,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Prometazina',
          dose: '25mg',
          route: 'IV' as const,
          frequency: 'Pré-medicação',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'B' as const,
          specialNotes: 'Reduz reações anafiláticas do soro',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['MS - Acidentes Ofídicos 2021'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // ENVIRONMENTAL: Scorpion Sting
  // =========================================================================
  {
    code: 'ENV_SCORPION_STING',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Vômitos incoercíveis + sudorese profusa + taquicardia + criança <7 anos',
          severity: 'critical' as const,
          clinicalSignificance: 'Envenenamento grave (Tityus serrulatus) - crise colinérgica',
          immediateAction: 'Soro antiescorpiônico 2-6 ampolas IV, atropina se bradicardia',
          timeToAction: 60,
        },
        {
          description: 'Edema agudo pulmão + crise hipertensiva pós-picada escorpião',
          severity: 'critical' as const,
          clinicalSignificance: 'Choque cardiogênico por liberação catecolaminas',
          immediateAction: 'UTI, inotrópicos, ventilação mecânica, soro antiescorpiônico',
          timeToAction: 30,
        },
        {
          description: 'Pancreatite aguda + picada escorpião',
          severity: 'warning' as const,
          clinicalSignificance: 'Complicação rara mas grave',
          immediateAction: 'Amilase/lipase, hidratação, analgesia, soro',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Escorpionismo Leve',
          icd10: 'T63.2',
          probability: 'high' as const,
          keyFeatures: [
            'Dor local intensa',
            'Parestesia local',
            'Sem manifestações sistêmicas',
            'Criança >7 anos ou adulto',
          ],
          diagnosticTests: ['Observação 6-12h', 'Analgesia', 'NÃO necessita soro'],
        },
        {
          condition: 'Escorpionismo Moderado',
          icd10: 'T63.2',
          probability: 'medium' as const,
          keyFeatures: [
            'Sintomas locais + náusea, vômitos',
            'Sudorese, sialorreia',
            'Taquicardia leve',
          ],
          diagnosticTests: ['Soro antiescorpiônico 2-3 ampolas', 'Observação hospitalar'],
        },
        {
          condition: 'Escorpionismo Grave',
          icd10: 'T63.2',
          probability: 'low' as const,
          keyFeatures: [
            'Vômitos incoercíveis',
            'Sudorese profusa, priapismo',
            'Arritmias, insuficiência cardíaca',
            'Edema agudo pulmão',
            'Choque',
          ],
          diagnosticTests: ['Soro antiescorpiônico 4-6 ampolas', 'UTI', 'Ventilação mecânica'],
        },
      ],
      condutaInicial: `**Classificação de Gravidade:**

**Leve (maioria dos casos):**
- Apenas dor local
- Parestesia
- Analgesia (dipirona, paracetamol)
- Observação 6-12h
- Alta se assintomático

**Moderado:**
- Sintomas locais + vômitos, sudorese
- Soro antiescorpiônico: 2-3 ampolas IV
- Internação 12-24h

**Grave (principalmente crianças <7 anos):**
- Vômitos incoercíveis, sudorese profusa
- Arritmias, ICC, EAP
- Soro antiescorpiônico: 4-6 ampolas IV
- UTI
- Suporte: inotrópicos, ventilação mecânica

**Soroterapia:**
- Diluir em SF 100mL, correr em 20-30min
- Pré-medicação: prometazina 0,5mg/kg (reduz reações)
- Indicação: casos moderados e graves

**Analgesia:**
- **Bloqueio local:** lidocaína 1% sem vasoconstrictor no local da picada
- **Sistêmica:** dipirona 10-15mg/kg IV

**Manifestações Específicas:**
- **Bradicardia:** atropina 0,01mg/kg IV
- **Hipertensão:** nitroprussiato
- **EAP:** furosemida, ventilação

**Observação Obrigatória:**
- Criança <14 anos: internar
- Adulto: observar 6h, alta se assintomático`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'ms-brasil' as const,
          title: 'MS - Manual de Escorpionismo',
          url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos',
          yearPublished: 2021,
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
      ],
      medications: [
        {
          genericName: 'Soro Antiescorpiônico',
          dose: '2-6 ampolas',
          route: 'IV' as const,
          frequency: 'Dose única (conforme gravidade)',
          susAvailable: true,
          renameCompatible: false,
          evidenceLevel: 'A' as const,
        },
        {
          genericName: 'Dipirona',
          dose: '10-15mg/kg',
          route: 'IV' as const,
          frequency: '6/6h',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
        {
          genericName: 'Atropina',
          dose: '0,01mg/kg',
          route: 'IV' as const,
          frequency: 'SOS (se bradicardia)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['MS - Escorpionismo 2021'],
      susProtocolCompatible: true,
      renameMedicationsOnly: false,
    },
  },

  // =========================================================================
  // ENVIRONMENTAL: Drowning
  // =========================================================================
  {
    code: 'ENV_DROWNING',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'PCR + imersão >10min + água fria',
          severity: 'critical' as const,
          clinicalSignificance: 'Hipotermia protetora cerebral - não desistir',
          immediateAction: 'RCP prolongada, aquecimento ativo, suporte avançado',
          timeToAction: 1,
        },
        {
          description: 'Hipoxemia refratária + infiltrado pulmonar bilateral pós-afogamento',
          severity: 'critical' as const,
          clinicalSignificance: 'SDRA/lesão pulmonar aguda',
          immediateAction: 'IOT, ventilação protetora, PEEP, considerar prona',
          timeToAction: 30,
        },
        {
          description: 'Rebaixamento progressivo pós-resgate + "lucid interval"',
          severity: 'warning' as const,
          clinicalSignificance: 'Afogamento secundário (edema pulmonar tardio)',
          immediateAction: 'Observação hospitalar 12-24h, monitorar saturação',
          timeToAction: 120,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Afogamento com Parada Cardiorrespiratória',
          icd10: 'T75.1',
          probability: 'medium' as const,
          keyFeatures: [
            'Imersão prolongada',
            'Ausência pulsos/respiração',
            'Hipotermia pode ser protetora',
          ],
          diagnosticTests: ['RCP imediata', 'Não cessar até reaquecimento (>32°C)'],
        },
        {
          condition: 'Afogamento com Hipoxemia Grave',
          icd10: 'T75.1',
          probability: 'high' as const,
          keyFeatures: [
            'Dispneia, cianose',
            'Estertores crepitantes',
            'SpO2 <90%',
            'Rx: infiltrado pulmonar',
          ],
          diagnosticTests: ['Gasometria', 'Rx tórax', 'IOT se SpO2 <90% com O2 100%'],
        },
        {
          condition: 'Lesão Cervical Associada (Mergulho)',
          icd10: 'S14.1',
          probability: 'low' as const,
          keyFeatures: [
            'Mergulho em águas rasas',
            'Déficit motor/sensitivo',
            'Dor cervical',
          ],
          diagnosticTests: ['Imobilização cervical', 'TC coluna'],
        },
        {
          condition: 'Hipotermia',
          icd10: 'T68',
          probability: 'high' as const,
          keyFeatures: [
            'Temperatura <35°C',
            'Bradicardia, hipotensão',
            'Arritmias (fibrilação atrial, Osborn waves)',
          ],
          diagnosticTests: ['Reaquecimento ativo', 'Monitorização cardíaca'],
        },
      ],
      condutaInicial: `**Sequência de Resgate e Manejo:**

**1. Resgate Seguro:**
- Segurança do socorrista PRIMEIRO
- Remover da água rapidamente
- Imobilização cervical (se mergulho/trauma)

**2. ABCDE:**
- **Airway:** desobstruir (NÃO perder tempo com Heimlich)
- **Breathing:** VPP/IOT se apneia
- **Circulation:** RCP se PCR
  - **REGRA:** "Ninguém está morto até estar quente e morto"
  - Manter RCP até temperatura >32°C
- **Disability:** Glasgow, pupilas
- **Exposure:** despir, prevenir/tratar hipotermia

**3. Oxigenação:**
- O2 100% por máscara
- IOT se:
  - SpO2 <90% com O2 100%
  - Glasgow <8
  - Fadiga respiratória

**4. Ventilação Mecânica (se IOT):**
- Estratégia protetora: Volume corrente 6mL/kg
- PEEP alto (10-15 cmH2O)
- Considerar prona se SDRA grave

**5. Manejo Temperatura:**
- **Hipotermia leve (32-35°C):**
  - Reaquecimento passivo (cobertores)
  - Líquidos aquecidos IV
- **Hipotermia moderada-grave (<32°C):**
  - Reaquecimento ativo externo (Bair Hugger)
  - Cristaloides aquecidos IV
  - ECMO (se disponível e PCR refratária)

**6. Exames:**
- Gasometria arterial
- Rx tórax
- Hemograma, eletrólitos
- ECG (arritmias, Osborn waves)
- TC crânio/coluna (se trauma)

**NÃO fazer:**
- Manobra de Heimlich (não é obstrução)
- Compressão abdominal
- Cessar RCP precocemente em hipotermia`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'aha-guideline' as const,
          title: 'AHA - Special Circumstances: Drowning',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'ms-brasil' as const,
          title: 'MS - Afogamento',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
      ],
      medications: [],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: false,
      dynamedReviewed: false,
      brazilianGuidelines: ['AHA - Drowning'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // ENVIRONMENTAL: Heat Stroke
  // =========================================================================
  {
    code: 'ENV_HEAT_STROKE',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Temperatura >40°C + alteração mental + pele seca',
          severity: 'critical' as const,
          clinicalSignificance: 'Insolação clássica - risco de morte e sequelas neurológicas',
          immediateAction: 'Cooling agressivo (meta <39°C em 30min), hidratação IV',
          timeToAction: 15,
        },
        {
          description: 'Rabdomiólise + IRA + hipertermia pós-exercício',
          severity: 'critical' as const,
          clinicalSignificance: 'Insolação por esforço com falência multiorgânica',
          immediateAction: 'Cooling, hidratação vigorosa, alcalinização urina, hemodiálise se IRA',
          timeToAction: 30,
        },
        {
          description: 'Coagulopatia + plaquetopenia + hipertermia',
          severity: 'critical' as const,
          clinicalSignificance: 'CIVD por dano endotelial térmico',
          immediateAction: 'Cooling, suporte hemoterápico, UTI',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Insolação Clássica (Não-Exertional)',
          icd10: 'T67.0',
          probability: 'high' as const,
          keyFeatures: [
            'Idoso, criança, ambiente quente',
            'Temperatura >40°C',
            'Pele seca, quente',
            'Alteração mental (confusão, convulsão, coma)',
            'Cessação da sudorese',
          ],
          diagnosticTests: ['Temperatura', 'Eletrólitos', 'Função renal', 'CPK', 'Coagulograma'],
        },
        {
          condition: 'Insolação por Esforço (Exertional)',
          icd10: 'T67.0',
          probability: 'medium' as const,
          keyFeatures: [
            'Exercício intenso em calor',
            'Atleta, militar',
            'Pele úmida (sudorese preservada)',
            'Rabdomiólise proeminente',
          ],
          diagnosticTests: ['CPK elevada', 'Mioglobinúria', 'Função renal', 'Coagulograma'],
        },
        {
          condition: 'Exaustão por Calor',
          icd10: 'T67.5',
          probability: 'high' as const,
          keyFeatures: [
            'Temperatura <40°C',
            'Sudorese preservada',
            'Fraqueza, náusea, cefaleia',
            'SEM alteração mental grave',
          ],
          diagnosticTests: ['Hidratação oral/IV', 'Repouso em ambiente fresco', 'Recuperação rápida'],
        },
        {
          condition: 'Síndrome Neuroléptica Maligna',
          icd10: 'G21.0',
          probability: 'low' as const,
          keyFeatures: [
            'Uso recente antipsicótico',
            'Rigidez muscular ("lead pipe")',
            'Hipertermia, rabdomiólise',
            'Instabilidade autonômica',
          ],
          diagnosticTests: ['Suspender antipsicótico', 'Dantrolene', 'Bromocriptina'],
        },
      ],
      condutaInicial: `**Manejo Emergencial:**

**1. Cooling Agressivo (META: <39°C em 30min):**
- **Métodos:**
  - Remoção de roupas
  - Spray de água + ventilador (evaporação)
  - Compressas frias (axilas, virilhas, pescoço)
  - Imersão em água fria (se disponível, mais eficaz)
  - Lavagem gástrica com SF gelado (casos graves)

- **Monitorar temperatura retal** a cada 10min
- **PARAR cooling** ao atingir 38,5°C (evitar hipotermia)

**2. Hidratação:**
- Cristaloide (SF ou Ringer) 1-2L rápido
- Ajustar por PA, débito urinário
- Evitar Ringer Lactato se rabdomiólise grave (hipercalemia)

**3. Suporte:**
- O2 suplementar
- IOT se Glasgow <8 ou convulsões refratárias
- Benzodiazepínico se agitação/convulsões

**4. Monitorização:**
- Temperatura (retal ou esofágica)
- Sinais vitais contínuos
- ECG (arritmias)
- Débito urinário (meta >0,5mL/kg/h)

**5. Exames Laboratoriais:**
- Hemograma, eletrólitos, função renal
- CPK (rabdomiólise)
- Coagulograma (CIVD)
- Gasometria (acidose)
- Mioglobinúria

**6. Complicações:**
- **Rabdomiólise:** hidratação vigorosa, bicarbonato (alcalinizar urina pH >6,5)
- **IRA:** considerar hemodiálise
- **CIVD:** plasma fresco, plaquetas
- **Convulsões:** benzodiazepínico

**NÃO usar:**
- Antipiréticos (paracetamol, dipirona) - ineficazes
- Dantrolene (não comprovado, exceto SNM)`,
      calculadoras: [],
      ebmReferences: [
        {
          source: 'uptodate' as const,
          title: 'Severe Nonexertional Hyperthermia (Heat Stroke)',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'ms-brasil' as const,
          title: 'MS - Ondas de Calor',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
      ],
      medications: [
        {
          genericName: 'Diazepam',
          dose: '5-10mg',
          route: 'IV' as const,
          frequency: 'SOS (convulsões/agitação)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
        {
          genericName: 'Bicarbonato de Sódio 8,4%',
          dose: '50-100mEq',
          route: 'IV' as const,
          frequency: 'Alcalinização urina (rabdomiólise)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Meta: pH urina >6,5 se mioglobinúria',
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['MS - Calor'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },

  // =========================================================================
  // ENVIRONMENTAL: Hypothermia
  // =========================================================================
  {
    code: 'ENV_HYPOTHERMIA',
    extendedContentEBM: {
      redFlags: [
        {
          description: 'Temperatura <28°C + bradicardia extrema + fibrilação atrial',
          severity: 'critical' as const,
          clinicalSignificance: 'Hipotermia grave com alto risco de FV/assistolia',
          immediateAction: 'Reaquecimento ativo interno, ECMO se PCR, manipulação mínima',
          timeToAction: 30,
        },
        {
          description: 'PCR + hipotermia + não responde a 3 choques',
          severity: 'critical' as const,
          clinicalSignificance: 'FV refratária a desfibrilação em hipotermia',
          immediateAction: 'RCP contínua, reaquecer até >30°C antes de repetir choque',
          timeToAction: 1,
        },
        {
          description: 'Hipotermia + hipotensão refratária + hipoglicemia',
          severity: 'warning' as const,
          clinicalSignificance: 'Insuficiência adrenal ou hipotireoidismo',
          immediateAction: 'Glicose IV, hidrocortisona, investigar causa',
          timeToAction: 60,
        },
      ],
      diagnosticoDiferencial: [
        {
          condition: 'Hipotermia Leve (32-35°C)',
          icd10: 'T68',
          probability: 'high' as const,
          keyFeatures: [
            'Tremores intensos',
            'Confusão mental leve',
            'Taquicardia, taquipneia',
            'Vasoconstrição',
          ],
          diagnosticTests: ['Reaquecimento passivo (cobertores)', 'Líquidos aquecidos VO/IV'],
        },
        {
          condition: 'Hipotermia Moderada (28-32°C)',
          icd10: 'T68',
          probability: 'medium' as const,
          keyFeatures: [
            'Cessação tremores',
            'Bradicardia, hipotensão',
            'Confusão mental progressiva',
            'Arritmias (FA, ondas J de Osborn)',
          ],
          diagnosticTests: ['Reaquecimento ativo externo', 'Cristaloides aquecidos IV'],
        },
        {
          condition: 'Hipotermia Grave (<28°C)',
          icd10: 'T68',
          probability: 'low' as const,
          keyFeatures: [
            'Rigidez muscular',
            'Pupilas midriáticas, arreflexia',
            'Pulso/respiração imperceptíveis',
            'FV/assistolia',
          ],
          diagnosticTests: ['Reaquecimento ativo interno', 'ECMO', 'RCP até >32°C'],
        },
        {
          condition: 'Hipotermia Secundária (Sepse, Hipotireoidismo, Hipoadrenalismo)',
          icd10: 'T68',
          probability: 'medium' as const,
          keyFeatures: [
            'Causa subjacente identificável',
            'Idoso, desnutrido',
            'Resposta lenta ao reaquecimento',
          ],
          diagnosticTests: ['Investigar: TSH, cortisol, culturas', 'Tratar causa base'],
        },
      ],
      condutaInicial: `**Classificação e Manejo:**

**Hipotermia LEVE (32-35°C):**
- **Reaquecimento Passivo:**
  - Remover roupas molhadas
  - Cobertores secos
  - Ambiente aquecido
- **Líquidos aquecidos VO** (se alerta)
- **Cristaloide IV aquecido** (40-42°C)

**Hipotermia MODERADA (28-32°C):**
- **Reaquecimento Ativo Externo:**
  - Bair Hugger (manta térmica)
  - Compressas aquecidas
  - Evitar reaquecimento periférico rápido (afterdrop)
- **Cristaloide IV aquecido**
- **Monitorização cardíaca** (arritmias)

**Hipotermia GRAVE (<28°C):**
- **Reaquecimento Ativo Interno:**
  - Cristaloides IV aquecidos (40-42°C)
  - Lavagem peritoneal/pleural com SF aquecido
  - **ECMO** (extracorporeal rewarming) - gold standard
- **Manipulação MÍNIMA** (risco FV)
- **RCP se PCR:**
  - Manter até temperatura >32°C
  - Desfibrilação: 1 choque, se não responde, reaquecer >30°C
  - Medicações: espaçar intervalo (metabolismo lento)

**Monitorização:**
- Temperatura (retal, esofágica, vesical)
- ECG contínuo (ondas J de Osborn, arritmias)
- Sinais vitais
- Glicemia capilar (hipoglicemia frequente)
- Eletrólitos (hipercalemia se lise celular)

**Complicações:**
- **Afterdrop:** queda temperatura central ao reaquecer periférico
- **Choque de reaquecimento:** vasodilatação periférica súbita
- **Arritmias:** FV, FA (manipular mínimo)

**Critérios de Óbito:**
- **NÃO declarar morto** até temperatura >32°C
- "Ninguém está morto até estar quente e morto"

**Prevenção:**
- Identificar grupos de risco (idosos, sem-teto, etilistas)
- Medidas de proteção em ondas de frio`,
      calculadoras: ['Swiss Staging System (Hipotermia)'],
      ebmReferences: [
        {
          source: 'uptodate' as const,
          title: 'Accidental Hypothermia in Adults',
          lastAccessed: '2025-01-06T00:00:00Z',
          evidenceLevel: 'A' as const,
        },
        {
          source: 'ms-brasil' as const,
          title: 'MS - Hipotermia',
          lastAccessed: '2025-01-06T00:00:00Z',
        },
      ],
      medications: [
        {
          genericName: 'Glicose 50%',
          dose: '25-50mL',
          route: 'IV' as const,
          frequency: 'Bolus (se hipoglicemia)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
          specialNotes: 'Hipoglicemia comum em hipotermia',
        },
        {
          genericName: 'Tiamina',
          dose: '100mg',
          route: 'IV' as const,
          frequency: 'Dose única (antes glicose se etilista)',
          susAvailable: true,
          renameCompatible: true,
          renameList: 'A' as const,
        },
      ],
      lastEBMReview: '2025-01-06T00:00:00Z',
      evidenceQuality: 'high' as const,
      uptodateReviewed: true,
      dynamedReviewed: false,
      brazilianGuidelines: ['MS - Frio'],
      susProtocolCompatible: true,
      renameMedicationsOnly: true,
    },
  },
]

// ============================================================================
// Main Seeding Function
// ============================================================================

async function main() {
  console.log(chalk.blue('🌊 Iniciando Seed de EBM Content - Batch 3 (17 Queixas High-Acuity)'))
  console.log(chalk.gray('=' .repeat(80)))

  let successCount = 0
  let failCount = 0

  for (const ebmData of ebmBatch3) {
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
          },
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
  console.log(chalk.green(`   ✅ Sucesso: ${successCount}/${ebmBatch3.length}`))
  if (failCount > 0) {
    console.log(chalk.red(`   ❌ Falhas: ${failCount}/${ebmBatch3.length}`))
  }

  await prisma.$disconnect()
}

main()
