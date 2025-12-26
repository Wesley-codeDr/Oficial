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
 */
function extractSectionText(content: string, sectionTitle: string): string {
  const regex = new RegExp(`## ${sectionTitle}[\\s\\S]*?(?=##|$)`, 'i');
  const match = content.match(regex);

  if (!match) return '';

  return match[0]
    .replace(new RegExp(`## ${sectionTitle}`, 'i'), '')
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
    const redFlags = extractSection(content, 'Red Flags');
    const diagnosticoDiferencial = extractSection(content, 'Diagnóstico Diferencial');
    const condutaInicial = extractSectionText(content, 'Conduta Inicial');
    const calculadoras = extractSection(content, 'Calculadoras Recomendadas');
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
        redFlags,
        diagnosticoDiferencial,
        condutaInicial,
        calculadoras,
        sintomasRelacionados,
        referencias,
        rawMarkdown: content,
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
