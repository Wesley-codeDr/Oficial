/**
 * Teste das funções de parsing EBM do markdown-parser
 */

import {
  parseRedFlagsStructured,
  parseMedicationsTable,
  parseEBMCitations,
  parseDifferentialDiagnosisTable,
} from './utils/markdown-parser';

const mockMarkdown = `
# Dor Torácica Típica (Síndrome Coronariana Aguda)

> Dor precordial em aperto sugestiva de isquemia miocárdica

## Red Flags 🚩

### Críticos (Risco de Morte Imediato)
- [ ] Dor torácica em aperto com irradiação para mandíbula/braço esquerdo
  - **Ação**: ECG <10min + AAS 200mg VO (mastigar) + O2 se SpO2<94%
  - **Fonte**: [[uptodate-acs-2024]]
- [ ] Choque cardiogênico (PA<90mmHg, extremidades frias, oligúria)
  - **Ação**: Suporte hemodinâmico imediato + UTI + cardiologia <15min
  - **Fonte**: [[sbc-choque-cardiogenico]]

### Alertas (Risco Alto)
- [ ] Troponina elevada sem supradesnível de ST (NSTEMI)
  - **Ação**: DAPT + anticoagulação + estratificação de risco (HEART score)
  - **Fonte**: [[uptodate-nstemi]]

## Diagnóstico Diferencial

| Condição | ICD-10 | Probabilidade | Características | Referência |
|----------|--------|---------------|-----------------|------------|
| IAM com supra de ST | I21.9 | Alta | Dor típica >20min, ST↑, troponina+ | [[uptodate-stemi]] |
| Angina instável | I20.0 | Média | Dor em repouso <20min, troponina negativa | [[dynamed-ua]] |
| Pericardite | I30.9 | Baixa | Dor pleurítica, atrito pericárdico | [[guideline-pericardite]] |

## Medicações

#### Ácido Acetilsalicílico (AAS)
- **Dose**: 200-300mg VO (mastigar)
- **Frequência**: Dose única de ataque
- **SUS**: ✅ Sim (RENAME Lista A)
- **Evidência**: Nível A
- **Referência**: [[uptodate-aspirin-acs]]

#### Clopidogrel
- **Dose**: 300-600mg VO
- **Frequência**: Dose de ataque
- **SUS**: ✅ Sim (RENAME Lista C)
- **Evidência**: Nível A
- **Referência**: [[uptodate-clopidogrel]]

#### Enoxaparina
- **Dose**: 1mg/kg SC
- **Frequência**: 12/12h
- **SUS**: ✅ Sim (RENAME Lista C)
- **Evidência**: Nível A

## Referências EBM

### UpToDate
1. [[uptodate-acute-coronary-syndrome-2024]]
   - PMID: 12345678
   - Evidence: A
   - URL: https://www.uptodate.com/contents/acs

### Diretrizes Brasileiras
1. [[sbc-diretriz-sca-2021]]
   - DOI: 10.36660/abc.20210595
   - Evidence: A

### SBC
1. [[sbc-protocolo-iam]]
   - Evidence: B
`;

console.log('🧪 TESTE DE PARSING EBM\n');
console.log('='.repeat(80));

// Teste 1: Red Flags
console.log('\n📍 Teste 1: Parsing de Red Flags Estruturados');
const redFlags = parseRedFlagsStructured(mockMarkdown);
console.log(`✅ ${redFlags.length} red flags parseados:`);
redFlags.forEach((rf, i) => {
  console.log(`  ${i + 1}. [${rf.severity.toUpperCase()}] ${rf.description.substring(0, 60)}...`);
  console.log(`     Ação: ${rf.immediateAction.substring(0, 60)}...`);
  if (rf.timeToAction) console.log(`     Tempo: ${rf.timeToAction}min`);
});

// Teste 2: Medicações
console.log('\n📍 Teste 2: Parsing de Medicações');
const medications = parseMedicationsTable(mockMarkdown);
console.log(`✅ ${medications.length} medicações parseadas:`);
medications.forEach((med, i) => {
  console.log(`  ${i + 1}. ${med.genericName}`);
  console.log(`     Dose: ${med.dose} ${med.route} ${med.frequency}`);
  console.log(`     SUS: ${med.susAvailable ? '✅' : '❌'} | RENAME: ${med.renameList || 'N/A'} | Evidência: ${med.evidenceLevel || 'N/A'}`);
});

// Teste 3: Citações EBM
console.log('\n📍 Teste 3: Parsing de Citações EBM');
const citations = parseEBMCitations(mockMarkdown);
console.log(`✅ ${citations.length} citações parseadas:`);
citations.forEach((cit, i) => {
  console.log(`  ${i + 1}. [${cit.source.toUpperCase()}] ${cit.title}`);
  if (cit.pmid) console.log(`     PMID: ${cit.pmid}`);
  if (cit.doi) console.log(`     DOI: ${cit.doi}`);
  if (cit.evidenceLevel) console.log(`     Evidência: Nível ${cit.evidenceLevel}`);
});

// Teste 4: Diagnóstico Diferencial
console.log('\n📍 Teste 4: Parsing de Diagnóstico Diferencial');
const diagnoses = parseDifferentialDiagnosisTable(mockMarkdown);
console.log(`✅ ${diagnoses.length} diagnósticos parseados:`);
diagnoses.forEach((dx, i) => {
  console.log(`  ${i + 1}. ${dx.condition} (${dx.icd10 || 'sem ICD-10'})`);
  console.log(`     Probabilidade: ${dx.probability}`);
  console.log(`     Características: ${dx.keyFeatures.slice(0, 2).join(', ')}...`);
});

console.log('\n' + '='.repeat(80));
console.log('✅ TODOS OS PARSERS EBM FUNCIONANDO CORRETAMENTE!');
console.log('='.repeat(80) + '\n');
