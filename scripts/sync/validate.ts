#!/usr/bin/env tsx
/**
 * Valida dados de queixas do Obsidian e TypeScript
 *
 * Uso: npm run sync:validate
 */

import { glob } from 'glob';
import path from 'path';
import chalk from 'chalk';
import { PATHS } from './utils/config';
import { parseMarkdownFile, ParsedComplaint } from './utils/markdown-parser';
import { validateComplaintFrontmatter } from '../../lib/validation/complaints';

interface ValidationError {
  file: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  stats: {
    totalFiles: number;
    validFiles: number;
    invalidFiles: number;
    totalComplaints: number;
  };
}

/**
 * Valida uma complaint parseada
 */
function validateComplaint(complaint: ParsedComplaint): ValidationError[] {
  const errors: ValidationError[] = [];
  const file = complaint.filePath;

  const frontmatterResult = validateComplaintFrontmatter({
    id: complaint.id,
    group: complaint.group as any,
    title: complaint.title,
    subtitle: complaint.subtitle,
    riskLevel: complaint.riskLevel as any,
    severity: complaint.severity,
    icd10Codes: complaint.icd10Codes,
    synonyms: complaint.synonyms,
    searchTerms: complaint.searchTerms,
    chips: complaint.chips,
    ageTargets: complaint.ageTargets as any,
    isTopForAdult: complaint.isTopForAdult,
    isTopForChild: complaint.isTopForChild,
    isFastTrack: complaint.isFastTrack,
    searchWeight: complaint.searchWeight,
    bodySystem: complaint.bodySystem,
    relatedSymptoms: complaint.relatedSymptoms,
    commonMisconceptions: complaint.commonMisconceptions,
  });

  frontmatterResult.errors.forEach((issue) => {
    errors.push({
      file,
      field: issue.field,
      message: issue.message,
      severity: issue.severity,
    });
  });

  frontmatterResult.warnings.forEach((issue) => {
    errors.push({
      file,
      field: issue.field,
      message: issue.message,
      severity: issue.severity,
    });
  });

  // Recomendações de conteúdo
  if (!complaint.extendedContent?.redFlags?.length) {
    errors.push({
      file,
      field: 'redFlags',
      message: 'Recomendado incluir Red Flags',
      severity: 'warning',
    });
  }

  return errors;
}

/**
 * Encontra todos os arquivos .md de queixas no vault
 */
async function findComplaintFiles(): Promise<string[]> {
  const pattern = path.join(PATHS.queixas, '**/*.md');
  const files = await glob(pattern);

  // Filtra arquivos de índice
  return files.filter(f => {
    const basename = path.basename(f);
    return !basename.startsWith('_') && !basename.startsWith('00 -');
  });
}

/**
 * Verifica duplicatas de ID
 */
function checkDuplicates(complaints: ParsedComplaint[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const idMap = new Map<string, string[]>();

  for (const complaint of complaints) {
    const existing = idMap.get(complaint.id) || [];
    existing.push(complaint.filePath);
    idMap.set(complaint.id, existing);
  }

  for (const [id, files] of idMap) {
    if (files.length > 1) {
      errors.push({
        file: files.join(', '),
        field: 'id',
        message: `ID duplicado: ${id} encontrado em ${files.length} arquivos`,
        severity: 'error',
      });
    }
  }

  return errors;
}

/**
 * Função principal de validação
 */
async function validate(): Promise<ValidationResult> {
  console.log(chalk.blue('\n🔍 Validando dados de queixas...\n'));

  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    stats: {
      totalFiles: 0,
      validFiles: 0,
      invalidFiles: 0,
      totalComplaints: 0,
    },
  };

  // 1. Encontra arquivos
  const files = await findComplaintFiles();
  result.stats.totalFiles = files.length;
  console.log(chalk.gray(`   Encontrados ${files.length} arquivos para validar\n`));

  // 2. Parseia e valida cada arquivo
  const complaints: ParsedComplaint[] = [];

  for (const file of files) {
    const parsed = parseMarkdownFile(file);

    if (!parsed) {
      console.log(chalk.yellow(`   ⚠ Não é queixa válida: ${path.basename(file)}`));
      continue;
    }

    complaints.push(parsed);
    result.stats.totalComplaints++;

    const validationErrors = validateComplaint(parsed);

    const fileErrors = validationErrors.filter(e => e.severity === 'error');
    const fileWarnings = validationErrors.filter(e => e.severity === 'warning');

    if (fileErrors.length > 0) {
      result.stats.invalidFiles++;
      result.errors.push(...fileErrors);
      result.valid = false;
      console.log(chalk.red(`   ✗ ${parsed.id} - ${fileErrors.length} erro(s)`));
    } else if (fileWarnings.length > 0) {
      result.stats.validFiles++;
      result.warnings.push(...fileWarnings);
      console.log(chalk.yellow(`   ⚠ ${parsed.id} - ${fileWarnings.length} aviso(s)`));
    } else {
      result.stats.validFiles++;
      console.log(chalk.green(`   ✓ ${parsed.id}`));
    }
  }

  // 3. Verifica duplicatas
  const duplicateErrors = checkDuplicates(complaints);
  if (duplicateErrors.length > 0) {
    result.errors.push(...duplicateErrors);
    result.valid = false;
  }

  // 4. Exibe resumo
  console.log(chalk.blue('\n📊 Resumo da Validação:\n'));
  console.log(chalk.gray(`   Total de arquivos: ${result.stats.totalFiles}`));
  console.log(chalk.gray(`   Queixas válidas: ${result.stats.totalComplaints}`));
  console.log(chalk.green(`   ✓ Sem erros: ${result.stats.validFiles}`));

  if (result.stats.invalidFiles > 0) {
    console.log(chalk.red(`   ✗ Com erros: ${result.stats.invalidFiles}`));
  }

  if (result.errors.length > 0) {
    console.log(chalk.red(`\n❌ Erros (${result.errors.length}):\n`));
    for (const error of result.errors) {
      console.log(chalk.red(`   • [${error.field}] ${error.message}`));
      console.log(chalk.gray(`     Arquivo: ${path.basename(error.file)}`));
    }
  }

  if (result.warnings.length > 0) {
    console.log(chalk.yellow(`\n⚠️  Avisos (${result.warnings.length}):\n`));
    // Agrupa warnings por tipo
    const warningsByField = new Map<string, number>();
    for (const warning of result.warnings) {
      const count = warningsByField.get(warning.field) || 0;
      warningsByField.set(warning.field, count + 1);
    }
    for (const [field, count] of warningsByField) {
      console.log(chalk.yellow(`   • ${field}: ${count} arquivo(s)`));
    }
  }

  if (result.valid) {
    console.log(chalk.green('\n✅ Validação concluída sem erros!\n'));
  } else {
    console.log(chalk.red('\n❌ Validação concluída com erros. Corrija antes de sincronizar.\n'));
  }

  return result;
}

// Executa se chamado diretamente
validate().catch(console.error);

export { validate };
