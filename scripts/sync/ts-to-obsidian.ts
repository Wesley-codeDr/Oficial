#!/usr/bin/env tsx
/**
 * Sincroniza dados do complaintsData.ts → Obsidian
 *
 * Uso: npm run sync:push
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import matter from 'gray-matter';
import { PATHS, SYNC_CONFIG } from './utils/config';
import { generateFrontmatter, generateMarkdownContent, ParsedComplaint, parseMarkdownFile } from './utils/markdown-parser';

// Mapeamento de grupo para nome da pasta
const GROUP_FOLDER_MAP: Record<string, string> = {
  CV: 'CV - Cardiovascular',
  RC: 'RC - Respiratório',
  NC: 'NC - Neurológico',
  GI: 'GI - Digestivo',
  GU: 'GU - Urinário',
  MSK: 'MSK - Osteomuscular',
  INF: 'INF - Infecção',
  OBG: 'OBG - Ginecologia',
  PED: 'PED - Pediatria',
  PSI: 'PSI - Saúde Mental',
  TR: 'TR - Trauma',
  TOX: 'TOX - Intoxicação',
  DERM: 'DERM - Pele',
  ORL: 'ORL - Otorrino',
  OFT: 'OFT - Oftalmologia',
  ENV: 'ENV - Exposição',
  GEN: 'GEN - Geral',
};

interface ComplaintFromTS {
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
 * Carrega complaintsData.ts
 */
function loadComplaintsData(): { groups: unknown[]; complaints: ComplaintFromTS[] } {
  try {
    const content = fs.readFileSync(PATHS.complaintsData, 'utf-8');

    // Extrai o objeto complaintsData usando regex
    // Isso é simplificado - em produção usar AST parser
    const groupsMatch = content.match(/groups:\s*\[([\s\S]*?)\],\s*complaints:/);
    const complaintsMatch = content.match(/complaints:\s*\[([\s\S]*?)\],?\s*\}/);

    if (!complaintsMatch) {
      throw new Error('Não foi possível parsear complaints');
    }

    // Parse simplificado - converte para JSON válido
    const complaintsStr = complaintsMatch[1]
      .replace(/(\w+):/g, '"$1":')  // Adiciona aspas nas chaves
      .replace(/'/g, '"')            // Converte aspas simples
      .replace(/,\s*}/g, '}')        // Remove vírgulas trailing
      .replace(/,\s*]/g, ']');       // Remove vírgulas trailing em arrays

    // Tenta parsear
    try {
      const complaints = JSON.parse(`[${complaintsStr}]`);
      return { groups: [], complaints };
    } catch {
      // Fallback: importa diretamente (requer que o arquivo seja válido)
      console.log(chalk.yellow('⚠️  Usando fallback para carregar dados'));
      return { groups: [], complaints: [] };
    }
  } catch (error) {
    console.error(chalk.red('Erro ao carregar complaintsData.ts:'), error);
    return { groups: [], complaints: [] };
  }
}

/**
 * Converte complaint do TS para ParsedComplaint
 */
function toParsedComplaint(complaint: ComplaintFromTS): ParsedComplaint {
  return {
    id: complaint.id,
    group: complaint.group,
    title: complaint.title,
    subtitle: complaint.subtitle,
    riskLevel: complaint.riskLevel,
    severity: complaint.severity,
    icd10Codes: complaint.icd10Codes || [],
    synonyms: complaint.synonyms || [],
    searchTerms: complaint.searchTerms || [],
    chips: complaint.chips || [],
    ageTargets: complaint.ageTargets || ['adult'],
    isTopForAdult: complaint.isTopForAdult ?? true,
    isTopForChild: complaint.isTopForChild ?? false,
    isFastTrack: complaint.isFastTrack ?? false,
    searchWeight: complaint.searchWeight || 1.0,
    bodySystem: complaint.bodySystem || [],
    relatedSymptoms: complaint.relatedSymptoms || [],
    commonMisconceptions: complaint.commonMisconceptions || [],
    lastSync: new Date().toISOString(),
    syncSource: 'typescript',
    extendedContent: {
      redFlags: complaint.extendedContent?.redFlags || [],
      diagnosticoDiferencial: complaint.extendedContent?.diagnosticoDiferencial || [],
      condutaInicial: complaint.extendedContent?.condutaInicial || '',
      calculadoras: complaint.extendedContent?.calculadoras || [],
      sintomasRelacionados: complaint.relatedSymptoms || [],
      referencias: complaint.extendedContent?.referencias || [],
      rawMarkdown: complaint.extendedContent?.rawMarkdown || '',
    },
    filePath: '',
    fileModified: new Date(),
  };
}

/**
 * Determina o caminho do arquivo no Obsidian
 */
function getObsidianPath(complaint: ComplaintFromTS): string {
  const folderName = GROUP_FOLDER_MAP[complaint.group] || complaint.group;
  const folder = path.join(PATHS.queixas, folderName);

  // Cria pasta se não existir
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  return path.join(folder, `${complaint.id}.md`);
}

/**
 * Atualiza ou cria arquivo Markdown no Obsidian
 */
function updateObsidianFile(complaint: ComplaintFromTS): { action: 'created' | 'updated' | 'skipped'; reason?: string } {
  const filePath = getObsidianPath(complaint);
  const parsed = toParsedComplaint(complaint);

  // Verifica se arquivo existe
  if (fs.existsSync(filePath)) {
    // Carrega arquivo existente
    const existing = parseMarkdownFile(filePath);

    if (existing) {
      // Compara timestamps
      const existingTime = new Date(existing.lastSync || 0).getTime();
      const tsTime = new Date(complaint.lastSync || 0).getTime();

      if (existingTime > tsTime) {
        return { action: 'skipped', reason: 'Obsidian mais recente' };
      }

      // Preserva conteúdo estendido do Obsidian se TS não tiver
      if (!complaint.extendedContent?.rawMarkdown && existing.extendedContent?.rawMarkdown) {
        parsed.extendedContent = existing.extendedContent;
      }
    }
  }

  // Gera frontmatter
  const frontmatterYAML = `---
id: ${parsed.id}
tags: [wellwave, queixa, ${parsed.group}, ${parsed.riskLevel}]
grupo: ${parsed.group}
risco: ${parsed.riskLevel}
severidade: ${parsed.severity}
icd10: [${parsed.icd10Codes.map(c => `"${c}"`).join(', ')}]
aliases: [${parsed.synonyms.map(s => `"${s}"`).join(', ')}]
searchTerms: [${parsed.searchTerms.map(s => `"${s}"`).join(', ')}]
chips: [${parsed.chips.map(c => `"${c}"`).join(', ')}]
ageTargets: [${parsed.ageTargets.join(', ')}]
isTopForAdult: ${parsed.isTopForAdult}
isTopForChild: ${parsed.isTopForChild}
isFastTrack: ${parsed.isFastTrack}
searchWeight: ${parsed.searchWeight}
bodySystem: [${parsed.bodySystem.map(b => `"${b}"`).join(', ')}]
relatedSymptoms: [${parsed.relatedSymptoms.map(s => `"${s}"`).join(', ')}]
commonMisconceptions: [${parsed.commonMisconceptions.map(m => `"${m}"`).join(', ')}]
lastSync: "${new Date().toISOString()}"
---`;

  // Gera conteúdo
  const content = generateMarkdownContent(parsed);

  // Escreve arquivo
  const fullContent = frontmatterYAML + '\n\n' + content;
  fs.writeFileSync(filePath, fullContent, 'utf-8');

  return { action: fs.existsSync(filePath) ? 'updated' : 'created' };
}

/**
 * Função principal de sincronização TypeScript → Obsidian
 */
async function syncTSToObsidian(): Promise<void> {
  console.log(chalk.blue('\n🔄 Iniciando sincronização TypeScript → Obsidian\n'));

  // 1. Carrega dados do TypeScript
  const { complaints } = loadComplaintsData();
  console.log(chalk.gray(`   Carregados ${complaints.length} complaints do TypeScript`));

  if (complaints.length === 0) {
    console.log(chalk.yellow('⚠️  Nenhuma complaint encontrada. Usando dados do arquivo original...'));

    // Fallback: importa o módulo diretamente
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { complaintsData } = await import('../../lib/data/complaintsData');
      complaints.push(...(complaintsData.complaints as ComplaintFromTS[]));
      console.log(chalk.green(`   ✓ Carregados ${complaints.length} complaints via import`));
    } catch (error) {
      console.error(chalk.red('Erro ao importar complaintsData:'), error);
      return;
    }
  }

  // 2. Processa cada complaint
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const complaint of complaints) {
    const result = updateObsidianFile(complaint);

    switch (result.action) {
      case 'created':
        console.log(chalk.green(`   + Criado: ${complaint.id}`));
        created++;
        break;
      case 'updated':
        console.log(chalk.cyan(`   ↻ Atualizado: ${complaint.id}`));
        updated++;
        break;
      case 'skipped':
        console.log(chalk.gray(`   = Ignorado: ${complaint.id} (${result.reason})`));
        skipped++;
        break;
    }
  }

  // 3. Resumo
  console.log(chalk.blue('\n📊 Resumo:'));
  console.log(chalk.green(`   + ${created} criados`));
  console.log(chalk.cyan(`   ↻ ${updated} atualizados`));
  console.log(chalk.gray(`   = ${skipped} ignorados`));
  console.log(chalk.blue(`\n✅ Sincronização concluída!\n`));
}

// Executa se chamado diretamente
syncTSToObsidian().catch(console.error);

export { syncTSToObsidian };
