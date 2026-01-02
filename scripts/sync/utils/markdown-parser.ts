/**
 * Parser de Markdown para extrair frontmatter e conteúdo estruturado
 */

import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { SYNC_CONFIG } from './config';

// Interface para complaint parseada do Obsidian
export interface ParsedComplaint {
  // Campos do frontmatter
  id: string;
  group: string;
  title: string;
  subtitle: string;
  riskLevel: 'low' | 'medium' | 'high';
  severity: number;
  icd10Codes: string[];
  synonyms: string[];
  searchTerms: string[];
  chips: string[];
  ageTargets: string[];
  isTopForAdult: boolean;
  isTopForChild: boolean;
  isFastTrack: boolean;
  searchWeight: number;
  bodySystem: string[];
  relatedSymptoms: string[];
  commonMisconceptions: string[];
  lastSync: string;
  syncSource: 'obsidian' | 'typescript';

  // Conteúdo estendido extraído do Markdown
  extendedContent: {
    redFlags: string[];
    diagnosticoDiferencial: string[];
    condutaInicial: string;
    calculadoras: string[];
    sintomasRelacionados: string[];
    referencias: string[];
    rawMarkdown: string;
  };

  // Metadados
  filePath: string;
  fileModified: Date;
}

/**
 * Extrai título e subtítulo do conteúdo Markdown
 */
function extractTitleAndSubtitle(content: string): { title: string; subtitle: string } {
  const lines = content.split('\n');
  let title = '';
  let subtitle = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ') && !title) {
      title = trimmed.replace('# ', '');
    } else if (trimmed.startsWith('> ') && !subtitle) {
      subtitle = trimmed.replace('> ', '');
      break;
    }
  }

  return { title, subtitle };
}

/**
 * Extrai uma seção do Markdown pelo título
 */
function extractSection(content: string, sectionTitle: string): string[] {
  const regex = new RegExp(`## ${sectionTitle}[\\s\\S]*?(?=##|$)`, 'i');
  const match = content.match(regex);

  if (!match) return [];

  const sectionContent = match[0]
    .replace(new RegExp(`## ${sectionTitle}`, 'i'), '')
    .trim();

  // Extrai itens de lista
  const items = sectionContent
    .split('\n')
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
    .map(line => line.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);

  return items;
}

/**
 * Extrai conteúdo de uma seção como texto (não lista)
 * Suporta seções com ou sem emojis (ex: "## 🚩 Red Flags" ou "## Red Flags")
 */
function extractSectionText(content: string, sectionTitle: string): string {
  // Remove emojis do sectionTitle para busca flexível
  const cleanTitle = sectionTitle.replace(/[\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '').trim();

  // Busca com ou sem emoji (usando escape de caracteres especiais do regex)
  const escapedTitle = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`##\\s*[^\\n]*${escapedTitle}[\\s\\S]*?(?=\\n##\\s|$)`, 'i');
  const match = content.match(regex);

  if (!match) return '';

  return match[0]
    .replace(/##\s*[^\n]+/, '') // Remove header line
    .trim();
}

/**
 * Faz parse de um arquivo Markdown do Obsidian
 */
export function parseMarkdownFile(filePath: string): ParsedComplaint | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);
    const { data: frontmatter, content } = matter(fileContent);

    // Extrai título e subtítulo do conteúdo
    const { title, subtitle } = extractTitleAndSubtitle(content);

    // Extrai ID do nome do arquivo se não estiver no frontmatter
    const fileName = path.basename(filePath, '.md');
    const id = frontmatter.id || fileName;

    // Se não tem grupo, não é uma queixa válida
    if (!frontmatter.grupo && !frontmatter.group) {
      return null;
    }

    // Extrai seções do Markdown
    // Detecta se é arquivo EBM v2.0 (verifica frontmatter ebm_version)
    // ebm_version pode ser string "2.0" ou number 2.0
    const isEBMv2 = frontmatter.ebm_version === '2.0' || frontmatter.ebm_version === 2.0;

    let redFlags: string[] = [];
    let diagnosticoDiferencial: string[] = [];
    let condutaInicial = '';
    let calculadoras: string[] = [];
    let redFlagsEBM: RedFlag[] | undefined;
    let medicationsEBM: MedicationRecommendation[] | undefined;
    let citationsEBM: EBMCitation[] | undefined;
    let ddEBM: DifferentialDiagnosis[] | undefined;
    let acaoImediata = '';

    if (isEBMv2) {
      // Usar funções EBM avançadas
      redFlagsEBM = parseRedFlagsStructured(content);
      medicationsEBM = parseMedicationsTable(content);
      citationsEBM = parseEBMCitations(content);
      ddEBM = parseDifferentialDiagnosisTable(content);

      // Extrair seção ⚡ AÇÃO IMEDIATA
      acaoImediata = extractSectionText(content, 'AÇÃO IMEDIATA');

      // Fallback para arrays simples (para compatibilidade)
      redFlags = redFlagsEBM.map(rf => rf.description);
      diagnosticoDiferencial = ddEBM?.map(dd => dd.condition) || [];
    } else {
      // Arquivos antigos (sem EBM v2.0)
      redFlags = extractSection(content, 'Red Flags');
      diagnosticoDiferencial = extractSection(content, 'Diagnóstico Diferencial');
      condutaInicial = extractSectionText(content, 'Conduta Inicial');
      calculadoras = extractSection(content, 'Calculadoras Recomendadas');
    }

    const sintomasRelacionados = extractSection(content, 'Sintomas Relacionados');
    const referencias = extractSection(content, 'Referências');

    const parsed: ParsedComplaint = {
      id,
      group: frontmatter.grupo || frontmatter.group || '',
      title: frontmatter.title || title || '',
      subtitle: frontmatter.subtitle || subtitle || '',
      riskLevel: frontmatter.risco || frontmatter.riskLevel || 'medium',
      severity: frontmatter.severidade || frontmatter.severity || 1,
      icd10Codes: frontmatter.icd10 || frontmatter.icd10Codes || [],
      synonyms: frontmatter.aliases || frontmatter.synonyms || [],
      searchTerms: frontmatter.searchTerms || [],
      chips: frontmatter.chips || [],
      ageTargets: frontmatter.ageTargets || ['adult'],
      isTopForAdult: frontmatter.isTopForAdult ?? true,
      isTopForChild: frontmatter.isTopForChild ?? false,
      isFastTrack: frontmatter.isFastTrack ?? false,
      searchWeight: frontmatter.searchWeight || 1.0,
      bodySystem: frontmatter.bodySystem || [],
      relatedSymptoms: frontmatter.relatedSymptoms || sintomasRelacionados,
      commonMisconceptions: frontmatter.commonMisconceptions || [],
      lastSync: frontmatter.lastSync || new Date().toISOString(),
      syncSource: 'obsidian',

      extendedContent: {
        // Campos básicos (compatibilidade)
        redFlags,
        diagnosticoDiferencial,
        condutaInicial,
        calculadoras,
        sintomasRelacionados,
        referencias,
        rawMarkdown: content,

        // Campos EBM v2.0 (se disponível)
        ...(isEBMv2 && {
          redFlagsStructured: redFlagsEBM,
          medications: medicationsEBM,
          ebmCitations: citationsEBM,
          differentialDiagnosisTable: ddEBM,
          acaoImediata,
        }),
      },

      filePath,
      fileModified: stats.mtime,
    };

    return parsed;
  } catch (error) {
    console.error(`Erro ao parsear ${filePath}:`, error);
    return null;
  }
}

/**
 * Gera frontmatter YAML a partir de uma complaint
 */
export function generateFrontmatter(complaint: Partial<ParsedComplaint>): string {
  const frontmatter: Record<string, unknown> = {
    id: complaint.id,
    tags: ['wellwave', 'queixa', complaint.group, complaint.riskLevel].filter(Boolean),
    grupo: complaint.group,
    risco: complaint.riskLevel,
    severidade: complaint.severity,
    icd10: complaint.icd10Codes,
    aliases: complaint.synonyms,
    searchTerms: complaint.searchTerms,
    chips: complaint.chips,
    ageTargets: complaint.ageTargets,
    isTopForAdult: complaint.isTopForAdult,
    isTopForChild: complaint.isTopForChild,
    isFastTrack: complaint.isFastTrack,
    searchWeight: complaint.searchWeight,
    bodySystem: complaint.bodySystem,
    relatedSymptoms: complaint.relatedSymptoms,
    commonMisconceptions: complaint.commonMisconceptions,
    lastSync: new Date().toISOString(),
  };

  // Remove valores undefined/null
  Object.keys(frontmatter).forEach(key => {
    if (frontmatter[key] === undefined || frontmatter[key] === null) {
      delete frontmatter[key];
    }
  });

  return matter.stringify('', frontmatter).trim();
}

/**
 * Gera conteúdo Markdown completo a partir de uma complaint
 */
export function generateMarkdownContent(complaint: ParsedComplaint): string {
  const sections: string[] = [];

  // Título e subtítulo
  sections.push(`# ${complaint.title}`);
  if (complaint.subtitle) {
    sections.push(`\n> ${complaint.subtitle}`);
  }

  // Informações Gerais
  sections.push(`\n## Informações Gerais\n`);
  sections.push(`- **Código**: \`${complaint.id}\``);
  sections.push(`- **Grupo**: [[${complaint.group}]]`);
  const riskEmoji = complaint.riskLevel === 'high' ? '🔴' : complaint.riskLevel === 'medium' ? '🟡' : '🟢';
  sections.push(`- **Nível de Risco**: ${riskEmoji} ${complaint.riskLevel}`);
  sections.push(`- **Severidade**: ${complaint.severity}/5`);
  sections.push(`- **Fast Track**: ${complaint.isFastTrack ? 'Sim' : 'Não'}`);

  // Sintomas Relacionados
  if (complaint.relatedSymptoms?.length || complaint.extendedContent?.sintomasRelacionados?.length) {
    sections.push(`\n## Sintomas Relacionados\n`);
    const symptoms = complaint.relatedSymptoms?.length
      ? complaint.relatedSymptoms
      : complaint.extendedContent?.sintomasRelacionados || [];
    symptoms.forEach(s => sections.push(`- ${s}`));
  }

  // Red Flags
  if (complaint.extendedContent?.redFlags?.length) {
    sections.push(`\n## Red Flags 🚩\n`);
    complaint.extendedContent.redFlags.forEach(rf => sections.push(`- ${rf}`));
  }

  // Diagnóstico Diferencial
  if (complaint.extendedContent?.diagnosticoDiferencial?.length) {
    sections.push(`\n## Diagnóstico Diferencial\n`);
    complaint.extendedContent.diagnosticoDiferencial.forEach(dd => sections.push(`- ${dd}`));
  }

  // Calculadoras
  if (complaint.extendedContent?.calculadoras?.length) {
    sections.push(`\n## Calculadoras Recomendadas\n`);
    complaint.extendedContent.calculadoras.forEach(c => sections.push(`- ${c}`));
  }

  // Conduta Inicial
  if (complaint.extendedContent?.condutaInicial) {
    sections.push(`\n## Conduta Inicial\n`);
    sections.push(complaint.extendedContent.condutaInicial);
  }

  // CID-10
  if (complaint.icd10Codes?.length) {
    sections.push(`\n## CID-10\n`);
    sections.push(`| Código | Descrição |`);
    sections.push(`|--------|-----------|`);
    complaint.icd10Codes.forEach(code => {
      sections.push(`| ${code} | - |`);
    });
  }

  // Termos de Busca
  if (complaint.searchTerms?.length) {
    sections.push(`\n## Termos de Busca\n`);
    sections.push(`\`${complaint.searchTerms.join('` `')}\``);
  }

  // Footer
  sections.push(`\n---`);
  sections.push(`*Fonte: WellWave complaintsData.ts*`);
  sections.push(`*Última sincronização: ${new Date().toISOString()}*`);

  return sections.join('\n');
}

// ============================================================================
// Funções de Parsing EBM (Evidence-Based Medicine)
// ============================================================================

import type {
  RedFlag,
  MedicationRecommendation,
  EBMCitation,
  DifferentialDiagnosis,
  RedFlagSeverity,
  MedicationRoute,
  EvidenceLevel,
  EBMSource,
  DiagnosisProbability,
} from '../../../lib/types/medical';

/**
 * Parseia Red Flags estruturados com severidade
 *
 * Formato esperado:
 * ## Red Flags 🚩
 *
 * ### Críticos (Risco de Morte Imediato)
 * - [ ] [Descrição]
 *   - **Ação**: [Ação imediata]
 *   - **Fonte**: [[referência]]
 */
export function parseRedFlagsStructured(content: string): RedFlag[] {
  const redFlags: RedFlag[] = [];

  // Extrai seção de Red Flags
  const redFlagSection = content.match(/## Red Flags[\s\S]*?(?=\n##\s|$)/);
  if (!redFlagSection) return redFlags;

  const section = redFlagSection[0];

  // Parseia seções por severidade
  const severityMap: Record<string, RedFlagSeverity> = {
    'Críticos': 'critical',
    'Alertas': 'warning',
    'Atenção': 'caution',
  };

  Object.entries(severityMap).forEach(([keyword, severity]) => {
    const severityRegex = new RegExp(`### ${keyword}[\\s\\S]*?(?=\\n###|\\n##|$)`);
    const severityMatch = section.match(severityRegex);

    if (severityMatch) {
      const severityContent = severityMatch[0];

      // Extrai checkboxes com detalhes
      const lines = severityContent.split('\n');
      let i = 0;

      while (i < lines.length) {
        const line = lines[i];

        if (line.trim().startsWith('- [ ]')) {
          const description = line.replace('- [ ]', '').trim();
          let immediateAction = 'Avaliar imediatamente';
          let timeToAction: number | undefined;

          // Procura por linhas de detalhes
          i++;
          while (i < lines.length && lines[i].trim().startsWith('-')) {
            const detailLine = lines[i].trim();

            // Extrai ação
            const actionMatch = detailLine.match(/\*\*Ação\*\*:\s*(.+)/);
            if (actionMatch) {
              immediateAction = actionMatch[1].trim();

              // Extrai tempo da ação (ex: <10min)
              const timeMatch = immediateAction.match(/<(\d+)min/);
              if (timeMatch) {
                timeToAction = parseInt(timeMatch[1]);
              }
            }

            i++;
          }

          redFlags.push({
            description,
            severity,
            clinicalSignificance: `Red flag de severidade ${severity}`,
            immediateAction,
            timeToAction,
          });

          continue;
        }

        i++;
      }
    }
  });

  return redFlags;
}

/**
 * Parseia Medicações estruturadas com doses e flags SUS/RENAME
 *
 * Formato esperado:
 * ## Medicações
 *
 * #### Nome Genérico
 * - **Dose**: 300mg VO
 * - **SUS**: ✅ Sim (RENAME Lista A)
 * - **Evidência**: Nível A
 * - **Referência**: [[link]]
 */
export function parseMedicationsTable(content: string): MedicationRecommendation[] {
  const medications: MedicationRecommendation[] = [];

  // Extrai seção de Medicações
  const medSection = content.match(/## Medicações[\s\S]*?(?=\n##\s|$)/);
  if (!medSection) return medications;

  const section = medSection[0];

  // Parseia cada medicação (#### Nome)
  const medRegex = /####\s+(.+?)\n([\s\S]*?)(?=\n####|\n##|$)/g;
  let match;

  while ((match = medRegex.exec(section)) !== null) {
    const genericName = match[1].trim();
    const details = match[2];

    // Extrai dose
    const doseMatch = details.match(/\*\*Dose\*\*:\s*(.+?)(?=\n|$)/m);
    const doseString = doseMatch ? doseMatch[1].trim() : '';

    // Parse dose e via
    const routeMatch = doseString.match(/(VO|IV|IM|SC|Inalatório|Tópico|SL|Retal|Nasal|Ocular)/);
    const route = (routeMatch ? routeMatch[1] : 'VO') as MedicationRoute;
    const dose = doseString.replace(route, '').trim();

    // Extrai frequência (se houver)
    const freqMatch = details.match(/\*\*Frequência\*\*:\s*(.+?)(?=\n|$)/m);
    const frequency = freqMatch ? freqMatch[1].trim() : '1x/dia';

    // Extrai SUS
    const susMatch = details.match(/\*\*SUS\*\*:\s*(✅|❌)\s*(Sim|Não)/);
    const susAvailable = susMatch ? susMatch[1] === '✅' : false;

    // Extrai RENAME
    const renameMatch = details.match(/RENAME Lista ([ABC])/);
    const renameList = renameMatch ? renameMatch[1] as 'A' | 'B' | 'C' : undefined;
    const renameCompatible = !!renameList;

    // Extrai evidência
    const evidenceMatch = details.match(/\*\*Evidência\*\*:\s*Nível ([ABCD])/);
    const evidenceLevel = evidenceMatch ? evidenceMatch[1] as EvidenceLevel : undefined;

    medications.push({
      genericName,
      dose,
      route,
      frequency,
      susAvailable,
      renameCompatible,
      renameList,
      evidenceLevel,
    });
  }

  return medications;
}

/**
 * Parseia Citações EBM
 *
 * Formato esperado:
 * ## Referências EBM
 *
 * ### UpToDate
 * 1. [[uptodate-titulo]]
 *    - PMID: 12345678
 *    - Evidence: A
 */
export function parseEBMCitations(content: string): EBMCitation[] {
  const citations: EBMCitation[] = [];

  // Extrai seção de Referências EBM
  const refSection = content.match(/## Referências EBM[\s\S]*?(?=\n##\s|$)/);
  if (!refSection) return citations;

  const section = refSection[0];

  // Detecta fonte (UpToDate, DynaMed, Diretrizes Brasileiras)
  const sourceMap: Record<string, EBMSource> = {
    'UpToDate': 'uptodate',
    'DynaMed': 'dynamed',
    'Diretrizes Brasileiras': 'brazilian-guideline',
    'SBC': 'sbc',
    'SBPT': 'sbpt',
  };

  Object.entries(sourceMap).forEach(([keyword, source]) => {
    const sourceRegex = new RegExp(`### ${keyword}[\\s\\S]*?(?=\\n###|\\n##|$)`);
    const sourceMatch = section.match(sourceRegex);

    if (sourceMatch) {
      const sourceContent = sourceMatch[0];

      // Extrai citações (numeradas com [[]])
      const citationRegex = /\d+\.\s*\[\[(.+?)\]\]([\s\S]*?)(?=\n\d+\.|\n###|\n##|$)/g;
      let match;

      while ((match = citationRegex.exec(sourceContent)) !== null) {
        const title = match[1].trim();
        const details = match[2] || '';

        // Extrai PMID
        const pmidMatch = details.match(/PMID:\s*(\d{8})/);
        const pmid = pmidMatch ? pmidMatch[1] : undefined;

        // Extrai DOI
        const doiMatch = details.match(/DOI:\s*(10\.\S+)/);
        const doi = doiMatch ? doiMatch[1] : undefined;

        // Extrai Evidence level
        const evidenceMatch = details.match(/Evidence:\s*([ABCD])/);
        const evidenceLevel = evidenceMatch ? evidenceMatch[1] as EvidenceLevel : undefined;

        // Extrai URL
        const urlMatch = details.match(/URL:\s*(.+?)(?=\n|$)/);
        const url = urlMatch ? urlMatch[1].trim() : undefined;

        citations.push({
          source,
          title,
          pmid,
          doi,
          url,
          evidenceLevel,
          lastAccessed: new Date().toISOString(),
        });
      }
    }
  });

  return citations;
}

/**
 * Parseia Tabela de Diagnóstico Diferencial
 *
 * Formato esperado:
 * ## Diagnóstico Diferencial
 *
 * | Condição | ICD-10 | Probabilidade | Características | Referência |
 * |----------|--------|---------------|-----------------|------------|
 * | IAM | I21.9 | Alta | Dor típica, troponina+ | [[ref]] |
 */
export function parseDifferentialDiagnosisTable(content: string): DifferentialDiagnosis[] {
  const diagnoses: DifferentialDiagnosis[] = [];

  // Extrai seção de Diagnóstico Diferencial
  const ddSection = content.match(/## Diagnóstico Diferencial.*?(?=##|$)/s);
  if (!ddSection) return diagnoses;

  const section = ddSection[0];

  // Extrai tabela markdown
  const tableRegex = /\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|/g;
  let match;
  let isHeader = true;

  while ((match = tableRegex.exec(section)) !== null) {
    // Pula header e separator
    if (isHeader) {
      isHeader = false;
      continue;
    }

    const condition = match[1].trim();
    const icd10 = match[2].trim();
    const probabilityText = match[3].trim().toLowerCase();
    const characteristics = match[4].trim();

    // Skip separator row
    if (condition.includes('---')) continue;

    // Map probabilidade
    let probability: DiagnosisProbability = 'medium';
    if (probabilityText.includes('alta') || probabilityText.includes('high')) {
      probability = 'high';
    } else if (probabilityText.includes('baixa') || probabilityText.includes('low')) {
      probability = 'low';
    }

    // Parse características
    const keyFeatures = characteristics.split(',').map(f => f.trim());

    diagnoses.push({
      condition,
      icd10: icd10 !== '-' ? icd10 : undefined,
      probability,
      keyFeatures,
    });
  }

  return diagnoses;
}
