/**
 * Search Index Generator
 * Creates and maintains an inverted index for efficient complaint searching
 * Generated at build time, not runtime
 */

import { complaintsData } from './complaintsData'
import { normalizeText, tokenize, generateNGrams } from '@/lib/utils/textNormalization'

export interface SearchIndexEntry {
  complaintId: string
  complaintTitle: string
  complaintGroup: string
  matchedField: 'title' | 'subtitle' | 'searchTerms' | 'synonyms' | 'chips' | 'commonMisconceptions'
  originalValue: string
  normalizedValue: string
  nGrams: string[]
}

export interface SearchIndex {
  lastBuilt: number
  version: string
  complaints: {
    [complaintId: string]: {
      id: string
      group: string
      title: string
      subtitle: string
      allSearchableText: string[]
      synonyms: string[]
      searchTerms: string[]
      chips: string[]
      commonMisconceptions: string[]
      bodySystem: string[]
      severity: number
      riskLevel: string
      isFastTrack: boolean
      icd10Codes: string[]
      searchWeight: number
    }
  }
  invertedIndex: {
    [normalizedTerm: string]: string[] // Map from normalized term to complaint IDs
  }
  ngramIndex: {
    [ngram: string]: string[] // Map from n-gram to complaint IDs
  }
  synonymIndex: {
    [normalizedSynonym: string]: string[] // Map from normalized synonym to complaint IDs
  }
}

/**
 * Builds the search index from complaints data
 * This should be called at build time or during initialization
 */
export function buildSearchIndex(): SearchIndex {
  const index: SearchIndex = {
    lastBuilt: Date.now(),
    version: complaintsData.version,
    complaints: {},
    invertedIndex: {},
    ngramIndex: {},
    synonymIndex: {},
  }

  // Process each complaint
  for (const complaint of complaintsData.complaints) {
    const complaintEntry = {
      id: complaint.id,
      group: complaint.group,
      title: complaint.title,
      subtitle: complaint.subtitle,
      allSearchableText: [
        complaint.title,
        complaint.subtitle,
        ...complaint.searchTerms,
        ...(complaint.chips || []),
        ...(complaint.synonyms || []),
        ...(complaint.commonMisconceptions || []),
      ],
      synonyms: complaint.synonyms || [],
      searchTerms: complaint.searchTerms || [],
      chips: complaint.chips || [],
      commonMisconceptions: complaint.commonMisconceptions || [],
      bodySystem: complaint.bodySystem || [],
      severity: complaint.severity || 3,
      riskLevel: complaint.riskLevel,
      isFastTrack: complaint.isFastTrack,
      icd10Codes: complaint.icd10Codes || [],
      searchWeight: complaint.searchWeight || 1.0,
    }

    index.complaints[complaint.id] = complaintEntry

    // Build inverted index from all searchable text
    const processedTerms = new Set<string>()

    for (const text of complaintEntry.allSearchableText) {
      const normalized = normalizeText(text)
      const tokens = tokenize(normalized)

      for (const token of tokens) {
        if (token.length > 0 && !processedTerms.has(token)) {
          processedTerms.add(token)

          if (!index.invertedIndex[token]) {
            index.invertedIndex[token] = []
          }
          if (!index.invertedIndex[token].includes(complaint.id)) {
            index.invertedIndex[token].push(complaint.id)
          }

          // Add n-grams
          const ngrams = generateNGrams(token, 3)
          for (const ngram of ngrams) {
            if (!index.ngramIndex[ngram]) {
              index.ngramIndex[ngram] = []
            }
            if (!index.ngramIndex[ngram].includes(complaint.id)) {
              index.ngramIndex[ngram].push(complaint.id)
            }
          }
        }
      }
    }

    // Build synonym index
    for (const synonym of complaintEntry.synonyms) {
      const normalizedSynonym = normalizeText(synonym)
      if (!index.synonymIndex[normalizedSynonym]) {
        index.synonymIndex[normalizedSynonym] = []
      }
      if (!index.synonymIndex[normalizedSynonym].includes(complaint.id)) {
        index.synonymIndex[normalizedSynonym].push(complaint.id)
      }
    }
  }

  return index
}

/**
 * Get or create the global search index (singleton pattern)
 */
let cachedIndex: SearchIndex | null = null

export function getSearchIndex(): SearchIndex {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex()
  }
  return cachedIndex
}

/**
 * Rebuild the search index (useful for updates)
 */
export function rebuildSearchIndex(): SearchIndex {
  cachedIndex = buildSearchIndex()
  return cachedIndex
}

/**
 * Get all complaints from the search index
 */
export function getAllComplaints() {
  const index = getSearchIndex()
  return Object.values(index.complaints)
}

/**
 * Get a specific complaint by ID
 */
export function getComplaintById(complaintId: string) {
  const index = getSearchIndex()
  return index.complaints[complaintId]
}

/**
 * Find complaint IDs that match a normalized term
 */
export function findComplaintsMatchingTerm(normalizedTerm: string): string[] {
  const index = getSearchIndex()
  return index.invertedIndex[normalizedTerm] || []
}

/**
 * Find complaint IDs that match n-grams (partial matches)
 */
export function findComplaintsMatchingNGrams(ngrams: string[]): string[] {
  const index = getSearchIndex()
  const resultSet = new Set<string>()

  for (const ngram of ngrams) {
    const matches = index.ngramIndex[ngram] || []
    matches.forEach((id) => resultSet.add(id))
  }

  return Array.from(resultSet)
}

/**
 * Find complaint IDs that match a synonym
 */
export function findComplaintsMatchingSynonym(normalizedSynonym: string): string[] {
  const index = getSearchIndex()
  return index.synonymIndex[normalizedSynonym] || []
}

/**
 * Get related complaints for a given complaint ID
 */
export function getRelatedComplaints(complaintId: string, limit: number = 5): string[] {
  const index = getSearchIndex()
  const complaint = index.complaints[complaintId]
  if (!complaint) return []

  // Find other complaints in the same group or with same bodySystem
  const related = new Set<string>()

  for (const [id, comp] of Object.entries(index.complaints)) {
    if (id === complaintId) continue

    // Same group gets higher priority
    if (comp.group === complaint.group) {
      related.add(id)
    }
    // Same body system
    else if (complaint.bodySystem.some((sys) => comp.bodySystem.includes(sys))) {
      related.add(id)
    }
  }

  return Array.from(related).slice(0, limit)
}
