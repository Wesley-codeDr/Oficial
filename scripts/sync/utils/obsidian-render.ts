import matter from 'gray-matter'
import type { ParsedComplaint } from './markdown-parser'
import { generateMarkdownContent } from './markdown-parser'
import type { ComplaintApiPayload } from '../../../lib/db/complaints'
import { computeContentHash, mapEBMToFrontmatter } from './sync-helpers'

export interface ObsidianRenderOptions {
  contentHash?: string
  lastSync?: string
  syncSource?: 'obsidian' | 'app' | 'system'
}

function compactObject<T extends Record<string, unknown>>(value: T): T {
  const cleaned = { ...value }
  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === undefined || cleaned[key] === null) {
      delete cleaned[key]
    }
  })
  return cleaned
}

function buildParsedComplaint(complaint: ComplaintApiPayload): ParsedComplaint {
  return {
    id: complaint.id,
    group: complaint.group,
    title: complaint.title,
    subtitle: complaint.subtitle || '',
    riskLevel: complaint.riskLevel,
    severity: complaint.severity || 1,
    icd10Codes: complaint.icd10Codes || [],
    synonyms: complaint.synonyms || [],
    searchTerms: complaint.searchTerms || [],
    chips: complaint.chips || [],
    ageTargets: complaint.ageTargets || ['adult'],
    isTopForAdult: complaint.isTopForAdult ?? true,
    isTopForChild: complaint.isTopForChild ?? false,
    isFastTrack: complaint.isFastTrack ?? false,
    searchWeight: complaint.searchWeight ?? 1,
    bodySystem: complaint.bodySystem || [],
    relatedSymptoms: complaint.relatedSymptoms || [],
    commonMisconceptions: complaint.commonMisconceptions || [],
    lastSync: new Date().toISOString(),
    syncSource: 'obsidian',
    extendedContent: {
      redFlags: complaint.extendedContent?.redFlags || [],
      diagnosticoDiferencial: complaint.extendedContent?.diagnosticoDiferencial || [],
      condutaInicial: complaint.extendedContent?.condutaInicial || '',
      calculadoras: complaint.extendedContent?.calculadoras || [],
      sintomasRelacionados: complaint.relatedSymptoms || [],
      referencias: [],
      rawMarkdown: complaint.extendedContent?.rawMarkdown || '',
    },
    filePath: '',
    fileModified: new Date(),
  }
}

export function buildFrontmatter(
  complaint: ComplaintApiPayload,
  options: ObsidianRenderOptions = {}
): Record<string, unknown> {
  const base: Record<string, unknown> = {
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
    lastSync: options.lastSync || new Date().toISOString(),
    contentHash: options.contentHash,
    syncSource: options.syncSource,
  }

  const ebmFrontmatter = complaint.extendedContentEBM
    ? mapEBMToFrontmatter(complaint.extendedContentEBM)
    : {}

  return compactObject({
    ...base,
    ...ebmFrontmatter,
  })
}

export function renderComplaintMarkdown(
  complaint: ComplaintApiPayload,
  options: ObsidianRenderOptions = {}
): {
  frontmatter: Record<string, unknown>
  content: string
  fullContent: string
  contentHash: string
} {
  const parsed = buildParsedComplaint(complaint)
  const content = complaint.extendedContent?.rawMarkdown?.trim()
    ? complaint.extendedContent.rawMarkdown.trim()
    : generateMarkdownContent(parsed)

  const frontmatter = buildFrontmatter(complaint, options)
  const contentHash = computeContentHash(frontmatter, content)
  const frontmatterWithHash = {
    ...frontmatter,
    contentHash,
  }

  const frontmatterYaml = matter.stringify('', frontmatterWithHash).trim()
  return {
    frontmatter: frontmatterWithHash,
    content,
    fullContent: `${frontmatterYaml}\n\n${content}`,
    contentHash,
  }
}
