/**
 * Citation parsing and validation for EBM Chat
 */

export type Citation = {
  id: string
  authors: string
  title?: string
  journal?: string
  year?: number
  pmid?: string
  doi?: string
  url?: string
  type: 'study' | 'guideline' | 'review' | 'other'
}

// Regex patterns for citation detection
const PATTERNS = {
  // [Author et al., 2023, Journal]
  authorJournal: /\[([A-Za-z]+(?:\s+et\s+al\.)?),?\s*(\d{4}),?\s*([^\]]+)\]/g,
  // [Diretriz: Name, Year]
  guideline: /\[(?:Diretriz|Guideline):\s*([^,]+),?\s*(\d{4})?\]/gi,
  // PMID: 12345678
  pmid: /PMID:?\s*(\d{7,8})/gi,
  // DOI: 10.xxxx/xxxxx
  doi: /DOI:?\s*(10\.\d{4,}\/[^\s\]]+)/gi,
} as const

/**
 * Extract citations from AI response text
 */
export function extractCitations(text: string): Citation[] {
  const citations: Citation[] = []
  let id = 0

  // Create new regex instances for each extraction to reset lastIndex
  const authorJournalRegex = new RegExp(PATTERNS.authorJournal.source, 'g')
  const guidelineRegex = new RegExp(PATTERNS.guideline.source, 'gi')
  const pmidRegex = new RegExp(PATTERNS.pmid.source, 'gi')
  const doiRegex = new RegExp(PATTERNS.doi.source, 'gi')

  // Extract author/journal citations
  let match: RegExpExecArray | null
  while ((match = authorJournalRegex.exec(text)) !== null) {
    const [, authors, year, journal] = match
    if (authors && year && journal) {
      citations.push({
        id: `citation-${++id}`,
        authors,
        year: parseInt(year, 10),
        journal: journal.trim(),
        type: 'study',
      })
    }
  }

  // Extract guidelines
  while ((match = guidelineRegex.exec(text)) !== null) {
    const [, guidelineName, year] = match
    if (guidelineName) {
      citations.push({
        id: `citation-${++id}`,
        authors: guidelineName.trim(),
        year: year ? parseInt(year, 10) : undefined,
        type: 'guideline',
      })
    }
  }

  // Look for PMIDs and DOIs in text
  while ((match = pmidRegex.exec(text)) !== null) {
    const pmid = match[1]
    if (pmid) {
      const existing = citations.find((c) => !c.pmid)
      if (existing) {
        existing.pmid = pmid
        existing.url = `https://pubmed.ncbi.nlm.nih.gov/${pmid}`
      }
    }
  }

  while ((match = doiRegex.exec(text)) !== null) {
    const doi = match[1]
    if (doi) {
      const existing = citations.find((c) => !c.doi)
      if (existing) {
        existing.doi = doi
        existing.url = `https://doi.org/${doi}`
      }
    }
  }

  return citations
}

/**
 * Format citation for display
 */
export function formatCitation(citation: Citation): string {
  const parts: string[] = []

  parts.push(citation.authors)

  if (citation.year) {
    parts.push(`(${citation.year})`)
  }

  if (citation.journal) {
    parts.push(citation.journal)
  }

  return parts.join('. ')
}

/**
 * Validate PMID format
 */
export function isValidPmid(pmid: string): boolean {
  return /^\d{7,8}$/.test(pmid)
}

/**
 * Validate DOI format
 */
export function isValidDoi(doi: string): boolean {
  return /^10\.\d{4,}\/[^\s]+$/.test(doi)
}

/**
 * Generate PubMed search URL for a topic
 */
export function getPubMedSearchUrl(query: string): string {
  const encoded = encodeURIComponent(query)
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encoded}`
}
