/**
 * Complaint Search Service
 * Advanced searching with fuzzy matching, synonyms, relevance scoring, and filtering
 */

import type { Complaint } from '@/lib/types/medical'
import { normalizeText, tokenize, generateNGrams } from '@/lib/utils/textNormalization'
import { fuzzyMatch } from '@/lib/utils/fuzzyMatch'

export interface ComplaintFilters {
  patientCategory?: string[]
  riskLevel?: ('high' | 'medium' | 'low')[]
  bodySystem?: string[]
  groupCodes?: string[]
  minSeverity?: number
  onlyFastTrack?: boolean
}

export interface SearchResult {
  complaintId: string
  title: string
  subtitle: string
  group: string
  relevanceScore: number
  matchType: 'exact' | 'prefix' | 'synonym' | 'fuzzy' | 'ngram'
  riskLevel: string
  severity: number
  isFastTrack: boolean
  bodySystem: string[]
  searchWeight: number
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
      normalizedTitle: string
    }
  }
  invertedIndex: {
    [normalizedTerm: string]: string[]
  }
  ngramIndex: {
    [ngram: string]: string[]
  }
  synonymIndex: {
    [normalizedSynonym: string]: string[]
  }
  exactTitleIndex: {
    [normalizedTitle: string]: string[]
  }
}

export function buildSearchIndex(complaints: Complaint[], version: string = 'runtime'): SearchIndex {
  const index: SearchIndex = {
    lastBuilt: Date.now(),
    version,
    complaints: {},
    invertedIndex: {},
    ngramIndex: {},
    synonymIndex: {},
    exactTitleIndex: {},
  }

  for (const complaint of complaints) {
    const normalizedTitle = normalizeText(complaint.title)
    const complaintEntry = {
      id: complaint.id,
      group: complaint.group,
      title: complaint.title,
      normalizedTitle,
      subtitle: complaint.subtitle,
      allSearchableText: [
        complaint.title,
        complaint.subtitle,
        ...(complaint.searchTerms || []),
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
      isFastTrack: complaint.isFastTrack || false,
      icd10Codes: complaint.icd10Codes || [],
      searchWeight: complaint.searchWeight || 1.0,
    }

    index.complaints[complaint.id] = complaintEntry

    if (!index.exactTitleIndex[normalizedTitle]) {
      index.exactTitleIndex[normalizedTitle] = []
    }
    index.exactTitleIndex[normalizedTitle].push(complaint.id)

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

function findComplaintsMatchingTerm(index: SearchIndex, normalizedTerm: string): string[] {
  return index.invertedIndex[normalizedTerm] || []
}

function findComplaintsMatchingNGrams(index: SearchIndex, ngrams: string[]): string[] {
  const resultSet = new Set<string>()

  for (const ngram of ngrams) {
    const matches = index.ngramIndex[ngram] || []
    matches.forEach((id) => resultSet.add(id))
  }

  return Array.from(resultSet)
}

function findComplaintsMatchingSynonym(index: SearchIndex, normalizedSynonym: string): string[] {
  return index.synonymIndex[normalizedSynonym] || []
}

function getRelatedComplaints(index: SearchIndex, complaintId: string, limit: number = 5): string[] {
  const complaint = index.complaints[complaintId]
  if (!complaint) return []

  const related = new Set<string>()

  for (const [id, comp] of Object.entries(index.complaints)) {
    if (id === complaintId) continue

    if (comp.group === complaint.group) {
      related.add(id)
    } else if (complaint.bodySystem.some((sys) => comp.bodySystem.includes(sys))) {
      related.add(id)
    }
  }

  return Array.from(related).slice(0, limit)
}

function getComplaintById(index: SearchIndex, complaintId: string) {
  return index.complaints[complaintId]
}

/**
 * Searches for complaints based on a search term and optional filters
 * @param index - Search index built from complaints data
 * @param searchTerm - The term to search for
 * @param filters - Optional filters to narrow down results
 * @param limit - Maximum number of results (default: 50)
 * @returns Array of search results sorted by relevance
 */
export function searchComplaints(
  index: SearchIndex,
  searchTerm: string,
  filters?: ComplaintFilters,
  limit: number = 50
): SearchResult[] {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return []
  }

  const normalizedTerm = normalizeText(searchTerm)
  const tokens = tokenize(normalizedTerm)
  const scoreMap = new Map<string, number>()
  const matchTypeMap = new Map<string, 'exact' | 'prefix' | 'synonym' | 'fuzzy' | 'ngram'>()

  // Optimization: O(1) Exact match using hash map
  const exactMatchIds = index.exactTitleIndex[normalizedTerm]
  if (exactMatchIds) {
    for (const id of exactMatchIds) {
      scoreMap.set(id, 100)
      matchTypeMap.set(id, 'exact')
    }
  }

  // Optimization: Use pre-computed normalizedTitle for prefix match
  // Still O(N) but eliminates expensive normalizeText calls inside the loop
  for (const complaintId of Object.keys(index.complaints)) {
    // Skip if we already have an exact match for this ID
    if (scoreMap.has(complaintId)) continue

    const complaint = index.complaints[complaintId]
    if (!complaint) continue

    // Use pre-computed normalized title
    const titleLower = complaint.normalizedTitle

    if (titleLower.startsWith(normalizedTerm)) {
      scoreMap.set(complaintId, 85)
      matchTypeMap.set(complaintId, 'prefix')
    }
  }

  for (const token of tokens) {
    const synonymMatches = findComplaintsMatchingSynonym(index, token)
    for (const complaintId of synonymMatches) {
      const currentScore = scoreMap.get(complaintId) || 0
      const newScore = Math.max(currentScore, 75)
      scoreMap.set(complaintId, newScore)
      if (!matchTypeMap.has(complaintId)) {
        matchTypeMap.set(complaintId, 'synonym')
      }
    }
  }

  for (const token of tokens) {
    const termMatches = findComplaintsMatchingTerm(index, token)
    for (const complaintId of termMatches) {
      const currentScore = scoreMap.get(complaintId) || 0
      const newScore = Math.max(currentScore, 60)
      scoreMap.set(complaintId, newScore)
      if (!matchTypeMap.has(complaintId)) {
        matchTypeMap.set(complaintId, 'exact')
      }
    }
  }

  const ngrams = generateNGrams(normalizedTerm, 3)
  const ngramMatches = findComplaintsMatchingNGrams(index, ngrams)
  for (const complaintId of ngramMatches) {
    const currentScore = scoreMap.get(complaintId) || 0
    const newScore = Math.max(currentScore, 40)
    scoreMap.set(complaintId, newScore)
    if (!matchTypeMap.has(complaintId)) {
      matchTypeMap.set(complaintId, 'ngram')
    }
  }

  const fuzzyThreshold = 70
  for (const complaintId of Object.keys(index.complaints)) {
    const complaint = index.complaints[complaintId]
    if (!complaint) continue
    const currentScore = scoreMap.get(complaintId) || 0

    if (currentScore < fuzzyThreshold) {
      // Optimization: Use pre-computed normalizedTitle
      const fuzzyScore = fuzzyMatch(normalizedTerm, complaint.normalizedTitle, 65)
      if (fuzzyScore > 0) {
        scoreMap.set(complaintId, Math.max(currentScore, fuzzyScore))
        if (!matchTypeMap.has(complaintId)) {
          matchTypeMap.set(complaintId, 'fuzzy')
        }
      }

      const subtitleFuzzy = fuzzyMatch(normalizedTerm, normalizeText(complaint.subtitle), 65)
      if (subtitleFuzzy > 0) {
        scoreMap.set(complaintId, Math.max(scoreMap.get(complaintId) || 0, subtitleFuzzy - 5))
      }
    }
  }

  const threshold = 30
  let candidateResults: SearchResult[] = []

  for (const [complaintId, score] of scoreMap.entries()) {
    if (score >= threshold) {
      const complaint = index.complaints[complaintId]
      if (!complaint) continue
      candidateResults.push({
        complaintId,
        title: complaint.title,
        subtitle: complaint.subtitle,
        group: complaint.group,
        relevanceScore: score * complaint.searchWeight,
        matchType: matchTypeMap.get(complaintId) || 'fuzzy',
        riskLevel: complaint.riskLevel,
        severity: complaint.severity,
        isFastTrack: complaint.isFastTrack,
        bodySystem: complaint.bodySystem,
        searchWeight: complaint.searchWeight,
      })
    }
  }

  if (filters) {
    candidateResults = applyFilters(candidateResults, filters)
  }

  candidateResults.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore
    }
    return b.severity - a.severity
  })

  return candidateResults.slice(0, limit)
}

function applyFilters(results: SearchResult[], filters: ComplaintFilters): SearchResult[] {
  return results.filter((result) => {
    if (
      filters.riskLevel &&
      filters.riskLevel.length > 0 &&
      !filters.riskLevel.includes(result.riskLevel as 'high' | 'medium' | 'low')
    ) {
      return false
    }

    if (
      filters.bodySystem &&
      filters.bodySystem.length > 0 &&
      !filters.bodySystem.some((system) => result.bodySystem.includes(system))
    ) {
      return false
    }

    if (filters.groupCodes && filters.groupCodes.length > 0) {
      if (!filters.groupCodes.includes(result.group)) {
        return false
      }
    }

    if (filters.onlyFastTrack && !result.isFastTrack) {
      return false
    }

    return true
  })
}

/**
 * Gets autocomplete suggestions for a search term
 * @param index - Search index built from complaints data
 * @param searchTerm - Partial term to complete
 * @param limit - Maximum number of suggestions (default: 10)
 * @returns Array of suggestion strings
 */
export function getSearchSuggestions(
  index: SearchIndex,
  searchTerm: string,
  limit: number = 10
): string[] {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return []
  }

  const normalizedTerm = normalizeText(searchTerm)
  const suggestions = new Set<string>()

  for (const complaint of Object.values(index.complaints)) {
    if (normalizeText(complaint.title).startsWith(normalizedTerm)) {
      suggestions.add(complaint.title)
    }

    for (const term of complaint.searchTerms) {
      if (normalizeText(term).startsWith(normalizedTerm)) {
        suggestions.add(term)
      }
    }

    for (const synonym of complaint.synonyms) {
      if (normalizeText(synonym).startsWith(normalizedTerm)) {
        suggestions.add(synonym)
      }
    }
  }

  return Array.from(suggestions).slice(0, limit)
}

/**
 * Gets related complaints for a given complaint ID
 * @param index - Search index built from complaints data
 * @param complaintId - The ID of the complaint
 * @param limit - Maximum number of related complaints (default: 5)
 * @returns Array of related complaints
 */
export function getRelated(index: SearchIndex, complaintId: string, limit: number = 5): SearchResult[] {
  const relatedIds = getRelatedComplaints(index, complaintId, limit)
  const results: SearchResult[] = []

  for (const id of relatedIds) {
    const complaint = getComplaintById(index, id)
    if (complaint) {
      results.push({
        complaintId: id,
        title: complaint.title,
        subtitle: complaint.subtitle,
        group: complaint.group,
        relevanceScore: 50,
        matchType: 'exact',
        riskLevel: complaint.riskLevel,
        severity: complaint.severity,
        isFastTrack: complaint.isFastTrack,
        bodySystem: complaint.bodySystem,
        searchWeight: complaint.searchWeight,
      })
    }
  }

  return results
}

/**
 * Gets statistics about search results
 * @param results - Array of search results
 * @returns Statistics object
 */
export function getSearchStatistics(results: SearchResult[]) {
  return {
    totalResults: results.length,
    byRiskLevel: {
      high: results.filter((r) => r.riskLevel === 'high').length,
      medium: results.filter((r) => r.riskLevel === 'medium').length,
      low: results.filter((r) => r.riskLevel === 'low').length,
    },
    byMatchType: {
      exact: results.filter((r) => r.matchType === 'exact').length,
      prefix: results.filter((r) => r.matchType === 'prefix').length,
      synonym: results.filter((r) => r.matchType === 'synonym').length,
      fuzzy: results.filter((r) => r.matchType === 'fuzzy').length,
      ngram: results.filter((r) => r.matchType === 'ngram').length,
    },
    fastTrackCount: results.filter((r) => r.isFastTrack).length,
    averageSeverity:
      results.length > 0 ? results.reduce((sum, r) => sum + r.severity, 0) / results.length : 0,
  }
}
