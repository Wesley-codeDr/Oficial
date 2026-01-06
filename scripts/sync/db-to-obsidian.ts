#!/usr/bin/env tsx
/**
 * Sincroniza dados do banco de dados → Obsidian
 *
 * Uso: npm run sync:push
 */

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import type { Prisma } from '@prisma/client'
import { prisma } from '../../lib/db/prisma'
import { mapDbComplaintToApiPayload } from '../../lib/db/complaints'
import { PATHS } from './utils/config'
import { readObsidianFile } from './utils/sync-helpers'
import { renderComplaintMarkdown } from './utils/obsidian-render'

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
}

interface SyncOptions {
  since?: Date
  limit?: number
}

interface SyncResult {
  updated: number
  skipped: number
  conflicts: number
  lastSyncAt: string | null
}

function getObsidianPath(id: string, groupCode: string): string {
  const folderName = GROUP_FOLDER_MAP[groupCode] || groupCode
  const folder = path.join(PATHS.queixas, folderName)

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }

  return path.join(folder, `${id}.md`)
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

export async function syncDBToObsidian(
  options: SyncOptions = {}
): Promise<SyncResult> {
  console.log(chalk.blue('\n🔄 Iniciando sincronizacao DB → Obsidian\n'))

  const where: Prisma.chief_complaintsWhereInput = {}
  if (options.since) {
    where.updated_at = {
      gt: options.since,
    }
  }

  const records = await prisma.chief_complaints.findMany({
    where,
    include: {
      chief_complaint_groups: true,
    },
    orderBy: {
      updated_at: 'asc',
    },
    take: options.limit ?? 200,
  })

  if (records.length === 0) {
    console.log(chalk.gray('   Nenhuma alteracao encontrada.'))
    return {
      updated: 0,
      skipped: 0,
      conflicts: 0,
      lastSyncAt: options.since?.toISOString() ?? null,
    }
  }

  let updated = 0
  let skipped = 0
  let conflicts = 0

  for (const record of records) {
    const payload = mapDbComplaintToApiPayload(record)
    const targetPath = getObsidianPath(payload.id, payload.group)
    const rendered = renderComplaintMarkdown(payload, { syncSource: 'system' })

    if (fs.existsSync(targetPath)) {
      const { contentHash, raw } = readObsidianFile(targetPath)
      const dbHash = rendered.contentHash

      if (contentHash === dbHash) {
        skipped += 1
        continue
      }

      const fileStats = fs.statSync(targetPath)
      const fileModified = fileStats.mtime

      if (fileModified > record.updated_at) {
        writeConflictFile(
          targetPath,
          'Arquivo local mais recente que o DB.',
          rendered.fullContent,
          raw
        )
        console.log(chalk.red(`   ⚠ Conflito detectado: ${payload.id}`))
        conflicts += 1
        continue
      }
    }

    fs.writeFileSync(targetPath, rendered.fullContent, 'utf-8')
    console.log(chalk.green(`   ✓ Atualizado: ${payload.id}`))
    updated += 1
  }

  const lastSyncAt = records[records.length - 1].updated_at.toISOString()

  console.log(chalk.blue('\n📊 Resumo:'))
  console.log(chalk.green(`   ✓ ${updated} atualizados`))
  console.log(chalk.gray(`   = ${skipped} sem alteracao`))
  console.log(chalk.yellow(`   ⚠ ${conflicts} conflitos`))
  console.log(chalk.blue(`\n✅ Sincronizacao concluida!\n`))

  return { updated, skipped, conflicts, lastSyncAt }
}

async function main(): Promise<void> {
  try {
    await syncDBToObsidian()
  } finally {
    await prisma.$disconnect()
  }
}

const isMain = process.argv[1]?.endsWith('db-to-obsidian.ts')
if (isMain) {
  main().catch(console.error)
}
