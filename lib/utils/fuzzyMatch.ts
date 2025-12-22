/**
 * Fuzzy Matching Utilities
 * Advanced matching algorithms for complaint search
 */

import { levenshteinDistance, normalizeText } from './textNormalization'

/**
 * Performs fuzzy matching between a search term and a target string
 * @param searchTerm - The term being searched
 * @param target - The target string to match against
 * @param threshold - Similarity threshold (0-100), default 60
 * @returns Similarity score (0-100) if match found, 0 if no match
 */
export function fuzzyMatch(searchTerm: string, target: string, threshold: number = 60): number {
  const normalizedTerm = normalizeText(searchTerm)
  const normalizedTarget = normalizeText(target)

  if (!normalizedTerm || !normalizedTarget) {
    return 0
  }

  // If search term is contained in target, return high score
  if (normalizedTarget.includes(normalizedTerm)) {
    return 100
  }

  // If search term starts with target prefix
  if (normalizedTarget.startsWith(normalizedTerm)) {
    return 90
  }

  // Calculate Levenshtein distance
  const maxLen = Math.max(normalizedTerm.length, normalizedTarget.length)
  const distance = levenshteinDistance(normalizedTerm, normalizedTarget)
  const similarity = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100))

  return similarity >= threshold ? similarity : 0
}

/**
 * Performs prefix matching (autocomplete style)
 * @param searchTerm - The term being searched
 * @param target - The target string to match against
 * @returns Score (100 for exact match, 50-99 for prefix match, 0 for no match)
 */
export function prefixMatch(searchTerm: string, target: string): number {
  const normalizedTerm = normalizeText(searchTerm)
  const normalizedTarget = normalizeText(target)

  if (!normalizedTerm) return 0

  if (normalizedTarget === normalizedTerm) return 100
  if (normalizedTarget.startsWith(normalizedTerm)) {
    return Math.max(50, Math.round((normalizedTerm.length / normalizedTarget.length) * 100))
  }

  return 0
}

/**
 * Calculates a composite fuzzy score considering multiple matching strategies
 * @param searchTerm - The search term
 * @param target - The target string
 * @param options - Matching options
 * @returns Composite score (0-100)
 */
export function compositeMatch(
  searchTerm: string,
  target: string,
  options?: { fuzzyThreshold?: number; preferPrefix?: boolean }
): number {
  const { fuzzyThreshold = 60, preferPrefix = true } = options || {}

  const normalizedTerm = normalizeText(searchTerm)
  const normalizedTarget = normalizeText(target)

  if (!normalizedTerm) return 0

  // Exact match
  if (normalizedTarget === normalizedTerm) return 100

  // Starts with
  if (normalizedTarget.startsWith(normalizedTerm)) {
    if (preferPrefix) return 95
  }

  // Contains
  if (normalizedTarget.includes(normalizedTerm)) {
    return 80
  }

  // Fuzzy match
  const fuzzyScore = fuzzyMatch(normalizedTerm, normalizedTarget, fuzzyThreshold)
  return fuzzyScore
}

/**
 * Calculates token overlap between search term and target
 * @param searchTerm - The search term
 * @param target - The target string
 * @returns Score (0-100) based on token overlap
 */
export function tokenOverlapMatch(searchTerm: string, target: string): number {
  const termTokens = normalizeText(searchTerm)
    .split(/\s+/)
    .filter((t) => t.length > 0)
  const targetTokens = normalizeText(target)
    .split(/\s+/)
    .filter((t) => t.length > 0)

  if (termTokens.length === 0 || targetTokens.length === 0) {
    return 0
  }

  let matches = 0
  for (const termToken of termTokens) {
    for (const targetToken of targetTokens) {
      if (targetToken.startsWith(termToken) || targetToken === termToken) {
        matches++
        break
      }
    }
  }

  return Math.round((matches / termTokens.length) * 100)
}

/**
 * Validates if a fuzzy match meets quality threshold
 * @param score - The fuzzy match score
 * @param threshold - The minimum acceptable score (default: 60)
 * @returns True if score meets threshold
 */
export function isQualityMatch(score: number, threshold: number = 60): boolean {
  return score >= threshold
}

/**
 * Finds best matching substring in target
 * @param searchTerm - The search term
 * @param target - The target string
 * @returns Index of best match or -1 if no match
 */
export function findBestMatchIndex(searchTerm: string, target: string): number {
  const normalizedTerm = normalizeText(searchTerm)
  const normalizedTarget = normalizeText(target)

  if (!normalizedTerm) return -1

  // Look for exact substring first
  const exactIndex = normalizedTarget.indexOf(normalizedTerm)
  if (exactIndex !== -1) return exactIndex

  // Look for token boundary matches
  const tokens = normalizedTarget.split(/\s+/)
  let currentIndex = 0

  for (const token of tokens) {
    if (token.startsWith(normalizedTerm)) {
      return currentIndex
    }
    currentIndex += token.length + 1
  }

  return -1
}
