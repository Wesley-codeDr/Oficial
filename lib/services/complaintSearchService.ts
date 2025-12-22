/**
 * Complaint Search Service
 * Advanced searching with fuzzy matching, synonyms, relevance scoring, and filtering
 */

import { normalizeText, tokenize, generateNGrams } from '@/lib/utils/textNormalization'
import { fuzzyMatch } from '@/lib/utils/fuzzyMatch'
import {
  getSearchIndex,
  getComplaintById,
  findComplaintsMatchingTerm,
  findComplaintsMatchingNGrams,
  findComplaintsMatchingSynonym,
  getRelatedComplaints,
} from '@/lib/data/searchIndex'

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

/**
 * Searches for complaints based on a search term and optional filters
 * @param searchTerm - The term to search for
 * @param filters - Optional filters to narrow down results
 * @param limit - Maximum number of results (default: 50)
 * @returns Array of search results sorted by relevance
 */
export function searchComplaints(
  searchTerm: string,
  filters?: ComplaintFilters,
  limit: number = 50
): SearchResult[] {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return []
  }

  const index = getSearchIndex()
  const normalizedTerm = normalizeText(searchTerm)
  const tokens = tokenize(normalizedTerm)
  const scoreMap = new Map<string, number>()
  const matchTypeMap = new Map<string, 'exact' | 'prefix' | 'synonym' | 'fuzzy' | 'ngram'>()

  // Strategy 1: Exact matches in title
  for (const complaintId of Object.keys(index.complaints)) {
    const complaint = index.complaints[complaintId]
    if (!complaint) continue
    const titleLower = normalizeText(complaint.title)

    if (titleLower === normalizedTerm) {
      scoreMap.set(complaintId, 100)
      matchTypeMap.set(complaintId, 'exact')
    }
  }

  // Strategy 2: Prefix matches in title
  for (const complaintId of Object.keys(index.complaints)) {
    const complaint = index.complaints[complaintId]
    if (!complaint) continue
    const titleLower = normalizeText(complaint.title)

    if (titleLower.startsWith(normalizedTerm) && !scoreMap.has(complaintId)) {
      scoreMap.set(complaintId, 85)
      matchTypeMap.set(complaintId, 'prefix')
    }
  }

  // Strategy 3: Synonym matches
  for (const token of tokens) {
    const synonymMatches = findComplaintsMatchingSynonym(token)
    for (const complaintId of synonymMatches) {
      const currentScore = scoreMap.get(complaintId) || 0
      const newScore = Math.max(currentScore, 75)
      scoreMap.set(complaintId, newScore)
      if (!matchTypeMap.has(complaintId)) {
        matchTypeMap.set(complaintId, 'synonym')
      }
    }
  }

  // Strategy 4: Term matches in inverted index
  for (const token of tokens) {
    const termMatches = findComplaintsMatchingTerm(token)
    for (const complaintId of termMatches) {
      const currentScore = scoreMap.get(complaintId) || 0
      const newScore = Math.max(currentScore, 60)
      scoreMap.set(complaintId, newScore)
      if (!matchTypeMap.has(complaintId)) {
        matchTypeMap.set(complaintId, 'exact')
      }
    }
  }

  // Strategy 5: N-gram matches (partial)
  const ngrams = generateNGrams(normalizedTerm, 3)
  const ngramMatches = findComplaintsMatchingNGrams(ngrams)
  for (const complaintId of ngramMatches) {
    const currentScore = scoreMap.get(complaintId) || 0
    const newScore = Math.max(currentScore, 40)
    scoreMap.set(complaintId, newScore)
    if (!matchTypeMap.has(complaintId)) {
      matchTypeMap.set(complaintId, 'ngram')
    }
  }

  // Strategy 6: Fuzzy matching (expensive, only for low-scoring items)
  const fuzzyThreshold = 70
  for (const complaintId of Object.keys(index.complaints)) {
    const complaint = index.complaints[complaintId]
    if (!complaint) continue
    const currentScore = scoreMap.get(complaintId) || 0

    if (currentScore < fuzzyThreshold) {
      const fuzzyScore = fuzzyMatch(normalizedTerm, normalizeText(complaint.title), 65)
      if (fuzzyScore > 0) {
        scoreMap.set(complaintId, Math.max(currentScore, fuzzyScore))
        if (!matchTypeMap.has(complaintId)) {
          matchTypeMap.set(complaintId, 'fuzzy')
        }
      }

      // Also try fuzzy match with subtitle and search terms
      const subtitleFuzzy = fuzzyMatch(normalizedTerm, normalizeText(complaint.subtitle), 65)
      if (subtitleFuzzy > 0) {
        scoreMap.set(complaintId, Math.max(scoreMap.get(complaintId) || 0, subtitleFuzzy - 5))
      }
    }
  }

  // Filter results below threshold
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
        relevanceScore: score * complaint.searchWeight, // Apply search weight multiplier
        matchType: matchTypeMap.get(complaintId) || 'fuzzy',
        riskLevel: complaint.riskLevel,
        severity: complaint.severity,
        isFastTrack: complaint.isFastTrack,
        bodySystem: complaint.bodySystem,
        searchWeight: complaint.searchWeight,
      })
    }
  }

  // Apply filters
  if (filters) {
    candidateResults = applyFilters(candidateResults, filters)
  }

  // Sort by relevance score (descending) and then by severity (for equal scores)
  candidateResults.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore
    }
    return b.severity - a.severity
  })

  return candidateResults.slice(0, limit)
}

/**
 * Applies filters to search results
 * @param results - Array of search results
 * @param filters - Filters to apply
 * @returns Filtered results
 */
function applyFilters(results: SearchResult[], filters: ComplaintFilters): SearchResult[] {
  return results.filter((result) => {
    // Filter by risk level
    if (
      filters.riskLevel &&
      filters.riskLevel.length > 0 &&
      !filters.riskLevel.includes(result.riskLevel as 'high' | 'medium' | 'low')
    ) {
      return false
    }

    // Filter by minimum severity
    if (filters.minSeverity !== undefined && result.severity < filters.minSeverity) {
      return false
    }

    // Filter by body system
    if (filters.bodySystem && filters.bodySystem.length > 0) {
      const hasMatchingSystem = result.bodySystem.some((sys) => filters.bodySystem!.includes(sys))
      if (!hasMatchingSystem) {
        return false
      }
    }

    // Filter by group codes
    if (filters.groupCodes && filters.groupCodes.length > 0) {
      if (!filters.groupCodes.includes(result.group)) {
        return false
      }
    }

    // Filter by fast track
    if (filters.onlyFastTrack && !result.isFastTrack) {
      return false
    }

    return true
  })
}

/**
 * Gets autocomplete suggestions for a search term
 * @param searchTerm - Partial term to complete
 * @param limit - Maximum number of suggestions (default: 10)
 * @returns Array of suggestion strings
 */
export function getSearchSuggestions(searchTerm: string, limit: number = 10): string[] {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return []
  }

  const index = getSearchIndex()
  const normalizedTerm = normalizeText(searchTerm)
  const suggestions = new Set<string>()

  // Get matching titles that start with the search term
  for (const complaint of Object.values(index.complaints)) {
    if (normalizeText(complaint.title).startsWith(normalizedTerm)) {
      suggestions.add(complaint.title)
    }

    // Also add matching search terms
    for (const searchTerm of complaint.searchTerms) {
      if (normalizeText(searchTerm).startsWith(normalizedTerm)) {
        suggestions.add(searchTerm)
      }
    }

    // Add matching synonyms
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
 * @param complaintId - The ID of the complaint
 * @param limit - Maximum number of related complaints (default: 5)
 * @returns Array of related complaints
 */
export function getRelated(complaintId: string, limit: number = 5): SearchResult[] {
  const relatedIds = getRelatedComplaints(complaintId, limit)
  const results: SearchResult[] = []

  for (const id of relatedIds) {
    const complaint = getComplaintById(id)
    if (complaint) {
      results.push({
        complaintId: id,
        title: complaint.title,
        subtitle: complaint.subtitle,
        group: complaint.group,
        relevanceScore: 50, // Related items have lower relevance score
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
