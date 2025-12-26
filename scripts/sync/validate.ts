#!/usr/bin/env tsx
/**
 * Valida dados de queixas do Obsidian e TypeScript
 *
 * Uso: npm run sync:validate
 */

import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { PATHS, VALID_GROUPS, VALID_RISK_LEVELS, VALID_AGE_TARGETS } from './utils/config';
import { parseMarkdownFile, ParsedComplaint } from './utils/markdown-parser';

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
 * Valida código ICD-10 (formato básico)
 */
function isValidICD10(code: string): boolean {
  // Formato: letra seguida de 2 dígitos, opcionalmente ponto e mais dígitos
  // Ex: I20.0, R55.9, G40.9
  const icd10Regex = /^[A-Z]\d{2}(\.\d{1,2})?$/;
  return icd10Regex.test(code);
}

/**
 * Valida uma complaint parseada
 */
function validateComplaint(complaint: ParsedComplaint): ValidationError[] {
  const errors: ValidationError[] = [];
  const file = complaint.filePath;

  // ID obrigatório
  if (!complaint.id) {
    errors.push({
      file,
      field: 'id',
      message: 'ID é obrigatório',
      severity: 'error',
    });
  }

  // Grupo válido
  if (!complaint.group) {
    errors.push({
      file,
      field: 'group',
      message: 'Grupo é obrigatório',
      severity: 'error',
    });
  } else if (!VALID_GROUPS.includes(complaint.group)) {
    errors.push({
      file,
      field: 'group',
      message: `Grupo inválido: ${complaint.group}. Válidos: ${VALID_GROUPS.join(', ')}`,
      severity: 'error',
    });
  }

  // Título obrigatório
  if (!complaint.title) {
    errors.push({
      file,
      field: 'title',
      message: 'Título é obrigatório',
      severity: 'error',
    });
  }

  // Risk level válido
  if (!VALID_RISK_LEVELS.includes(complaint.riskLevel)) {
    errors.push({
      file,
      field: 'riskLevel',
      message: `Nível de risco inválido: ${complaint.riskLevel}. Válidos: ${VALID_RISK_LEVELS.join(', ')}`,
      severity: 'error',
    });
  }

  // Severidade válida (1-5)
  if (complaint.severity < 1 || complaint.severity > 5) {
    errors.push({
      file,
      field: 'severity',
      message: `Severidade deve ser entre 1 e 5. Atual: ${complaint.severity}`,
      severity: 'error',
    });
  }

  // ICD-10 codes
  if (complaint.icd10Codes && complaint.icd10Codes.length > 0) {
    for (const code of complaint.icd10Codes) {
      if (!isValidICD10(code)) {
        errors.push({
          file,
          field: 'icd10Codes',
          message: `Código ICD-10 inválido: ${code}`,
          severity: 'warning',
        });
      }
    }
  } else {
    errors.push({
      file,
      field: 'icd10Codes',
      message: 'Recomendado incluir códigos ICD-10',
      severity: 'warning',
    });
  }

  // Age targets válidos
  for (const age of complaint.ageTargets) {
    if (!VALID_AGE_TARGETS.includes(age as typeof VALID_AGE_TARGETS[number])) {
      errors.push({
        file,
        field: 'ageTargets',
        message: `Age target inválido: ${age}. Válidos: ${VALID_AGE_TARGETS.join(', ')}`,
        severity: 'warning',
      });
    }
  }

  // Search weight válido
  if (complaint.searchWeight < 0 || complaint.searchWeight > 2) {
    errors.push({
      file,
      field: 'searchWeight',
      message: `Search weight deve ser entre 0 e 2. Atual: ${complaint.searchWeight}`,
      severity: 'warning',
    });
  }

  // Recomendações de conteúdo
  if (!complaint.extendedContent?.redFlags?.length) {
    errors.push({
      file,
      field: 'redFlags',
      message: 'Recomendado incluir Red Flags',
      severity: 'warning',
    });
  }

  if (!complaint.synonyms?.length) {
    errors.push({
      file,
      field: 'synonyms',
      message: 'Recomendado incluir sinônimos para busca',
      severity: 'warning',
    });
  }

  if (!complaint.searchTerms?.length) {
    errors.push({
      file,
      field: 'searchTerms',
      message: 'Recomendado incluir termos de busca',
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
