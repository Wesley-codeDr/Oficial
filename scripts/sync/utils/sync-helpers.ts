import crypto from 'crypto'
import fs from 'fs'
import matter from 'gray-matter'
import type { ComplaintExtendedContentEBM } from '../../../lib/types/medical'
import { SYNC_CONFIG } from './config'

const SYNC_FIELDS = new Set([
  'lastSync',
  'contentHash',
  'syncSource',
  'lastSyncedAt',
  'last_sync',
  'content_hash',
  'sync_source',
])

const EBM_BOOLEAN_FIELDS = new Set([
  'uptodate_reviewed',
  'dynamed_reviewed',
  'sus_protocol_compatible',
  'rename_medications_only',
])

const EBM_ARRAY_FIELDS = new Set([
  'brazilian_guidelines',
  'brazilian_adaptations',
])

const EBM_DATE_FIELDS = new Set(['last_ebm_review'])

const EBM_VERSION_FIELDS = new Set(['ebm_version'])

function isDate(value: unknown): value is Date {
  return value instanceof Date
}

function normalizeBoolean(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
    const lower = value.trim().toLowerCase()
    if (lower === 'true') return true
    if (lower === 'false') return false
  }
  return undefined
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value.map((item) => String(item))
  }
  if (typeof value === 'string') {
    return [value]
  }
  return undefined
}

function normalizeDateString(value: unknown): string | undefined {
  if (isDate(value)) {
    return value.toISOString()
  }
  if (typeof value === 'string') {
    return value
  }
  return undefined
}

function normalizeValueForEBM(key: string, value: unknown): unknown {
  if (value === undefined || value === null) {
    return undefined
  }

  if (EBM_BOOLEAN_FIELDS.has(key)) {
    return normalizeBoolean(value)
  }

  if (EBM_ARRAY_FIELDS.has(key)) {
    return normalizeStringArray(value)
  }

  if (EBM_DATE_FIELDS.has(key)) {
    return normalizeDateString(value)
  }

  if (EBM_VERSION_FIELDS.has(key)) {
    if (typeof value === 'number') return value.toString()
    if (typeof value === 'string') return value
  }

  if (isDate(value)) {
    return value.toISOString()
  }

  return value
}

function stableStringify(value: unknown): string {
  if (value === null || value === undefined) {
    return 'null'
  }

  if (typeof value !== 'object') {
    return JSON.stringify(value)
  }

  if (isDate(value)) {
    return JSON.stringify(value.toISOString())
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`
  }

  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, entryValue]) => entryValue !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))

  return `{${entries
    .map(([key, entryValue]) => `${JSON.stringify(key)}:${stableStringify(entryValue)}`)
    .join(',')}}`
}

function stripSyncFields(frontmatter: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {}

  Object.entries(frontmatter).forEach(([key, value]) => {
    if (!SYNC_FIELDS.has(key)) {
      cleaned[key] = value
    }
  })

  return cleaned
}

export function computeContentHash(
  frontmatter: Record<string, unknown>,
  content: string
): string {
  const normalizedFrontmatter = stripSyncFields(frontmatter)
  const payload = {
    frontmatter: normalizedFrontmatter,
    content,
  }

  const hash = crypto
    .createHash('sha256')
    .update(stableStringify(payload))
    .digest('hex')

  return `sha256:${hash}`
}

export function readObsidianFile(filePath: string): {
  frontmatter: Record<string, unknown>
  content: string
  raw: string
  contentHash: string
} {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as Record<string, unknown>

  return {
    frontmatter,
    content,
    raw,
    contentHash: computeContentHash(frontmatter, content),
  }
}

export function mapFrontmatterToEBM(
  frontmatter: Record<string, unknown>
): Partial<ComplaintExtendedContentEBM> {
  const ebm: Partial<ComplaintExtendedContentEBM> = {}

  Object.entries(SYNC_CONFIG.ebmFieldMapping).forEach(([frontKey, tsKey]) => {
    if (frontmatter[frontKey] === undefined) {
      return
    }

    const normalized = normalizeValueForEBM(frontKey, frontmatter[frontKey])
    if (normalized !== undefined) {
      ;(ebm as Record<string, unknown>)[tsKey] = normalized
    }
  })

  return ebm
}

export function mapEBMToFrontmatter(
  ebm: Partial<ComplaintExtendedContentEBM>
): Record<string, unknown> {
  const reverseMapping: Record<string, string> = {}

  Object.entries(SYNC_CONFIG.ebmFieldMapping).forEach(([frontKey, tsKey]) => {
    reverseMapping[tsKey] = frontKey
  })

  const frontmatter: Record<string, unknown> = {}

  Object.entries(reverseMapping).forEach(([tsKey, frontKey]) => {
    const value = (ebm as Record<string, unknown>)[tsKey]
    if (value === undefined || value === null) {
      return
    }

    frontmatter[frontKey] = normalizeValueForEBM(frontKey, value)
  })

  return frontmatter
}
