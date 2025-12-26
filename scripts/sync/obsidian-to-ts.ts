#!/usr/bin/env tsx
/**
 * Sincroniza dados do Obsidian → complaintsData.ts
 *
 * Uso: npm run sync:pull
 */

import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { PATHS, SYNC_CONFIG, VALID_GROUPS } from './utils/config';
import { parseMarkdownFile, ParsedComplaint } from './utils/markdown-parser';

interface ComplaintForTS {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  ageTargets: string[];
  riskLevel: 'low' | 'medium' | 'high';
  isTopForAdult: boolean;
  isTopForChild: boolean;
  isFastTrack: boolean;
  chips: string[];
  searchTerms: string[];
  synonyms: string[];
  relatedSymptoms: string[];
  bodySystem: string[];
  severity: number;
  commonMisconceptions: string[];
  icd10Codes: string[];
  searchWeight: number;
  lastSync?: string;
  syncSource?: 'obsidian' | 'typescript';
  extendedContent?: {
    redFlags?: string[];
    diagnosticoDiferencial?: string[];
    condutaInicial?: string;
    calculadoras?: string[];
    referencias?: string[];
    rawMarkdown?: string;
  };
}

/**
 * Encontra todos os arquivos .md de queixas no vault
 */
async function findComplaintFiles(): Promise<string[]> {
  const pattern = path.join(PATHS.queixas, '**/*.md');
  const files = await glob(pattern, { ignore: SYNC_CONFIG.ignorePatterns.map(p => `**/${p}`) });

  // Filtra arquivos de índice
  return files.filter(f => {
    const basename = path.basename(f);
    return !basename.startsWith('_') && !basename.startsWith('00 -');
  });
}

/**
 * Carrega complaintsData.ts atual
 */
function loadCurrentComplaintsData(): { groups: unknown[]; complaints: ComplaintForTS[] } {
  try {
    // Importa dinamicamente o arquivo TS
    const filePath = PATHS.complaintsData;
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extrai o objeto complaintsData
    const match = content.match(/export const complaintsData = (\{[\s\S]*\});?\s*$/);
    if (!match) {
      console.log(chalk.yellow('⚠️  Não foi possível parsear complaintsData.ts, criando novo'));
      return { groups: [], complaints: [] };
    }

    // Avalia o objeto (cuidado: eval é perigoso, mas aqui controlamos o input)
    // Em produção, usar um parser AST apropriado
    const dataStr = match[1].replace(/'/g, '"');
    try {
      const data = JSON.parse(dataStr);
      return data;
    } catch {
      console.log(chalk.yellow('⚠️  Erro ao parsear JSON, retornando vazio'));
      return { groups: [], complaints: [] };
    }
  } catch (error) {
    console.log(chalk.yellow('⚠️  complaintsData.ts não encontrado, será criado'));
    return { groups: [], complaints: [] };
  }
}

/**
 * Converte ParsedComplaint para formato do TypeScript
 */
function toTSFormat(parsed: ParsedComplaint): ComplaintForTS {
  return {
    id: parsed.id,
    group: parsed.group,
    title: parsed.title,
    subtitle: parsed.subtitle,
    ageTargets: parsed.ageTargets,
    riskLevel: parsed.riskLevel,
    isTopForAdult: parsed.isTopForAdult,
    isTopForChild: parsed.isTopForChild,
    isFastTrack: parsed.isFastTrack,
    chips: parsed.chips,
    searchTerms: parsed.searchTerms,
    synonyms: parsed.synonyms,
    relatedSymptoms: parsed.relatedSymptoms,
    bodySystem: parsed.bodySystem,
    severity: parsed.severity,
    commonMisconceptions: parsed.commonMisconceptions,
    icd10Codes: parsed.icd10Codes,
    searchWeight: parsed.searchWeight,
    lastSync: new Date().toISOString(),
    syncSource: 'obsidian',
    extendedContent: {
      redFlags: parsed.extendedContent.redFlags,
      diagnosticoDiferencial: parsed.extendedContent.diagnosticoDiferencial,
      condutaInicial: parsed.extendedContent.condutaInicial,
      calculadoras: parsed.extendedContent.calculadoras,
      referencias: parsed.extendedContent.referencias,
      rawMarkdown: parsed.extendedContent.rawMarkdown,
    },
  };
}

/**
 * Gera o conteúdo do arquivo TypeScript
 */
function generateTSFile(groups: unknown[], complaints: ComplaintForTS[]): string {
  const content = `export const complaintsData = {
  version: 'frontend-1.0',
  locale: 'pt-BR',
  groups: ${JSON.stringify(groups, null, 4).replace(/"([^"]+)":/g, '$1:')},
  complaints: ${JSON.stringify(complaints, null, 4).replace(/"([^"]+)":/g, '$1:')},
}
`;
  return content;
}

/**
 * Função principal de sincronização Obsidian → TypeScript
 */
async function syncObsidianToTS(): Promise<void> {
  console.log(chalk.blue('\n🔄 Iniciando sincronização Obsidian → TypeScript\n'));

  // 1. Encontra arquivos de queixas
  const files = await findComplaintFiles();
  console.log(chalk.gray(`   Encontrados ${files.length} arquivos de queixas`));

  // 2. Carrega dados atuais
  const currentData = loadCurrentComplaintsData();
  console.log(chalk.gray(`   Carregados ${currentData.complaints.length} complaints existentes`));

  // 3. Parseia cada arquivo
  const parsedComplaints: ParsedComplaint[] = [];
  let errors = 0;

  for (const file of files) {
    const parsed = parseMarkdownFile(file);
    if (parsed) {
      parsedComplaints.push(parsed);
      console.log(chalk.green(`   ✓ ${parsed.id}`));
    } else {
      console.log(chalk.yellow(`   ⚠ Ignorado: ${path.basename(file)}`));
      errors++;
    }
  }

  // 4. Mescla com dados existentes (por timestamp)
  const mergedComplaints: ComplaintForTS[] = [];
  const existingMap = new Map(currentData.complaints.map(c => [c.id, c]));
  const processedIds = new Set<string>();

  for (const parsed of parsedComplaints) {
    const existing = existingMap.get(parsed.id);
    const parsedTS = toTSFormat(parsed);

    if (existing) {
      // Compara timestamps
      const existingTime = new Date(existing.lastSync || 0).getTime();
      const parsedTime = parsed.fileModified.getTime();

      if (parsedTime >= existingTime) {
        mergedComplaints.push(parsedTS);
        console.log(chalk.cyan(`   ↻ Atualizado: ${parsed.id}`));
      } else {
        mergedComplaints.push(existing);
        console.log(chalk.gray(`   = Mantido: ${parsed.id} (TS mais recente)`));
      }
    } else {
      mergedComplaints.push(parsedTS);
      console.log(chalk.green(`   + Novo: ${parsed.id}`));
    }

    processedIds.add(parsed.id);
  }

  // Mantém complaints que não estão no Obsidian
  for (const [id, complaint] of existingMap) {
    if (!processedIds.has(id)) {
      mergedComplaints.push(complaint);
      console.log(chalk.gray(`   ○ Preservado (não no Obsidian): ${id}`));
    }
  }

  // 5. Gera novo arquivo TypeScript
  const tsContent = generateTSFile(currentData.groups, mergedComplaints);
  fs.writeFileSync(PATHS.complaintsData, tsContent, 'utf-8');

  // 6. Resumo
  console.log(chalk.blue('\n📊 Resumo:'));
  console.log(chalk.green(`   ✓ ${mergedComplaints.length} complaints sincronizados`));
  if (errors > 0) {
    console.log(chalk.yellow(`   ⚠ ${errors} arquivos ignorados`));
  }
  console.log(chalk.blue(`\n✅ Sincronização concluída!\n`));
}

// Executa se chamado diretamente
syncObsidianToTS().catch(console.error);

export { syncObsidianToTS };
