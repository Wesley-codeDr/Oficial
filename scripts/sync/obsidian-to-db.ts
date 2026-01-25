#!/usr/bin/env tsx
/**
 * Sincroniza dados do Obsidian → banco de dados
 *
 * Uso: npm run sync:pull
 */

import 'dotenv/config'
import { glob } from 'glob'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import type { Prisma } from '@prisma/client'
import { prisma } from '../../lib/db/prisma'
import {
  mapDbComplaintToApiPayload,
  mergeAdditionalData,
  parseAdditionalData,
} from '../../lib/db/complaints'
import { validateComplaintFrontmatter } from '../../lib/validation/complaints'
import { ComplaintExtendedContentEBMSchema } from '../../lib/validation/ebm'
import { PATHS, SYNC_CONFIG } from './utils/config'
import {
  parseMarkdownFile,
  parseRedFlagsStructured,
  parseMedicationsTable,
  parseEBMCitations,
  parseDifferentialDiagnosisTable,
} from './utils/markdown-parser'
import { mapFrontmatterToEBM, readObsidianFile } from './utils/sync-helpers'
import { renderComplaintMarkdown } from './utils/obsidian-render'

interface SyncOptions {
  filePaths?: string[]
}

interface SyncStats {
  updated: number
  skipped: number
  conflicts: number
  errors: number
}

async function findComplaintFiles(): Promise<string[]> {
  const pattern = path.join(PATHS.queixas, '**/*.md')
  const files = await glob(pattern, { ignore: SYNC_CONFIG.ignorePatterns.map((p) => `**/${p}`) })

  return files.filter((filePath) => {
    const basename = path.basename(filePath)
    return (
      !basename.startsWith('_') &&
      !basename.startsWith('00 -') &&
      !basename.includes('-CONFLICT')
    )
  })
}

function isEBMv2(frontmatter: Record<string, unknown>): boolean {
  const version = frontmatter.ebm_version
  return version === '2.0' || version === 2 || version === 2.0
}

function writeConflictFile(
  filePath: string,
  reason: string,
  dbContent: string,
  localContent: string
): void {
  const dir = path.dirname(filePath)
  const baseName = path.basename(filePath, '.md')
  const conflictPath = path.join(dir, `${baseName}-CONFLICT.md`)

  const content = `# CONFLITO DE SINCRONIZACAO: ${baseName}

## Motivo
${reason}

## Versao do banco (DB)

${dbContent}

---

## Versao local (Obsidian)

${localContent}
`

  fs.writeFileSync(conflictPath, content, 'utf-8')
}

export async function syncObsidianToDB(
  options: SyncOptions = {}
): Promise<SyncStats> {
  console.log(chalk.blue('\n🔄 Iniciando sincronizacao Obsidian → DB\n'))

  const files = options.filePaths?.length ? options.filePaths : await findComplaintFiles()
  console.log(chalk.gray(`   Encontrados ${files.length} arquivos para processar`))

  const stats: SyncStats = {
    updated: 0,
    skipped: 0,
    conflicts: 0,
    errors: 0,
  }

  for (const filePath of files) {
    const parsed = parseMarkdownFile(filePath)

    if (!parsed) {
      console.log(chalk.yellow(`   ⚠ Ignorado: ${path.basename(filePath)}`))
      stats.errors += 1
      continue
    }

    const { frontmatter, content, raw, contentHash } = readObsidianFile(filePath)

    const validation = validateComplaintFrontmatter({
      id: parsed.id,
      group: parsed.group as any,
      title: parsed.title,
      subtitle: parsed.subtitle,
      riskLevel: parsed.riskLevel as any,
      severity: parsed.severity,
      icd10Codes: parsed.icd10Codes,
      synonyms: parsed.synonyms,
      searchTerms: parsed.searchTerms,
      chips: parsed.chips,
      ageTargets: parsed.ageTargets as any,
      isTopForAdult: parsed.isTopForAdult,
      isTopForChild: parsed.isTopForChild,
      isFastTrack: parsed.isFastTrack,
      searchWeight: parsed.searchWeight,
      bodySystem: parsed.bodySystem,
      relatedSymptoms: parsed.relatedSymptoms,
      commonMisconceptions: parsed.commonMisconceptions,
    })

    if (!validation.valid) {
      console.log(chalk.red(`   ✖ ${parsed.id} - frontmatter invalido`))
      validation.errors.forEach((issue) => {
        console.log(chalk.red(`     - ${issue.field}: ${issue.message}`))
      })
      stats.errors += 1
      continue
    }

    const group = await prisma.chief_complaint_groups.findUnique({
      where: { code: parsed.group },
    })

    if (!group) {
      console.log(chalk.red(`   ✖ Grupo inexistente: ${parsed.group}`))
      stats.errors += 1
      continue
    }

    const existing = await prisma.chief_complaints.findFirst({
      where: {
        OR: [{ code: parsed.id }, { id: parsed.id }],
      },
      include: {
        chief_complaint_groups: true,
      },
    })

    if (!existing) {
      console.log(chalk.yellow(`   ⚠ Queixa nao encontrada no DB: ${parsed.id}`))
      stats.skipped += 1
      continue
    }

    const currentAdditional = parseAdditionalData(existing.additional_data) as any
    const existingHash = currentAdditional?.sync?.contentHash

    if (existingHash && existingHash === contentHash) {
      console.log(chalk.gray(`   = Sem alteracao: ${parsed.id}`))
      stats.skipped += 1
      continue
    }

    if (existing.updated_at > parsed.fileModified) {
      const payload = mapDbComplaintToApiPayload(existing)
      const rendered = renderComplaintMarkdown(payload, { syncSource: 'system' })
      writeConflictFile(
        filePath,
        'DB possui versao mais recente do que o arquivo local.',
        rendered.fullContent,
        raw
      )
      console.log(chalk.red(`   ⚠ Conflito detectado: ${parsed.id}`))
      stats.conflicts += 1
      continue
    }

    const metadata = {
      subtitle: parsed.subtitle || undefined,
      riskLevel: parsed.riskLevel as any,
      severity: parsed.severity,
      ageTargets: parsed.ageTargets as any,
      isTopForAdult: parsed.isTopForAdult,
      isTopForChild: parsed.isTopForChild,
      isFastTrack: parsed.isFastTrack,
      chips: parsed.chips,
      searchTerms: parsed.searchTerms,
      bodySystem: parsed.bodySystem,
      relatedSymptoms: parsed.relatedSymptoms,
      commonMisconceptions: parsed.commonMisconceptions,
      searchWeight: parsed.searchWeight,
    }

    const extendedContent = {
      redFlags: parsed.extendedContent.redFlags,
      diagnosticoDiferencial: parsed.extendedContent.diagnosticoDiferencial,
      condutaInicial: parsed.extendedContent.condutaInicial,
      calculadoras: parsed.extendedContent.calculadoras,
      rawMarkdown: parsed.extendedContent.rawMarkdown,
    }

    const ebmFromFrontmatter = mapFrontmatterToEBM(frontmatter)
    const ebmContent = isEBMv2(frontmatter)
      ? {
          ...ebmFromFrontmatter,
          redFlags: parseRedFlagsStructured(content),
          diagnosticoDiferencial: parseDifferentialDiagnosisTable(content),
          condutaInicial: parsed.extendedContent.condutaInicial || '',
          calculadoras: parsed.extendedContent.calculadoras || [],
          ebmReferences: parseEBMCitations(content),
          medications: parseMedicationsTable(content),
          rawMarkdown: parsed.extendedContent.rawMarkdown,
        }
      : Object.keys(ebmFromFrontmatter).length
        ? {
            ...ebmFromFrontmatter,
            rawMarkdown: parsed.extendedContent.rawMarkdown,
          }
        : undefined

    if (ebmContent) {
      const ebmValidation = ComplaintExtendedContentEBMSchema.partial().safeParse(ebmContent)
      if (!ebmValidation.success) {
        console.log(chalk.yellow(`   ⚠ EBM invalido em ${parsed.id}, salvando parcial`))
      }
    }

    const additionalUpdate: any = {
      metadata,
      extendedContent,
      extendedContentEBM: ebmContent as any,
      sync: {
        contentHash,
        lastSyncedAt: new Date().toISOString(),
        syncSource: 'obsidian' as const,
      },
    }

    const mergedAdditional = mergeAdditionalData(currentAdditional, additionalUpdate as any)

    const updateData: Prisma.chief_complaintsUpdateInput = {
      group_id: group.id,
      name_pt: parsed.title,
      synonyms: parsed.synonyms || [],
      icd10_codes: parsed.icd10Codes || [],
      updated_at: new Date(),
      additional_data: mergedAdditional,
    }

    if (parsed.subtitle) {
      updateData.definition = parsed.subtitle
    }

    await prisma.chief_complaints.update({
      where: { id: existing.id },
      data: updateData,
    })

    console.log(chalk.green(`   ✓ Atualizado: ${parsed.id}`))
    stats.updated += 1
  }

  console.log(chalk.blue('\n📊 Resumo:'))
  console.log(chalk.green(`   ✓ ${stats.updated} atualizados`))
  console.log(chalk.gray(`   = ${stats.skipped} sem alteracao`))
  console.log(chalk.yellow(`   ⚠ ${stats.conflicts} conflitos`))
  console.log(chalk.red(`   ✖ ${stats.errors} erros`))
  console.log(chalk.blue(`\n✅ Sincronizacao concluida!\n`))

  return stats
}

async function main(): Promise<void> {
  try {
    await syncObsidianToDB()
  } finally {
    await prisma.$disconnect()
  }
}

const isMain = process.argv[1]?.endsWith('obsidian-to-db.ts')
if (isMain) {
  main().catch(console.error)
}
