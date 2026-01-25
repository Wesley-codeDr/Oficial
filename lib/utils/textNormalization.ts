/**
 * Text Normalization Utilities
 * Handles normalization of text for searching, including accent removal, tokenization, etc.
 */

/**
 * Removes accents from text and converts to lowercase
 * @param text - Text to normalize
 * @returns Normalized text
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim()
}

/**
 * Tokenizes text into individual words/terms
 * @param text - Text to tokenize
 * @returns Array of tokens
 */
export function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter((token) => token.length > 0)
}

/**
 * Generates n-grams of specified length from text
 * @param text - Text to generate n-grams from
 * @param n - Size of n-grams (default: 3)
 * @returns Array of n-grams
 */
export function generateNGrams(text: string, n: number = 3): string[] {
  const normalized = normalizeText(text)
  const ngrams: string[] = []

  for (let i = 0; i <= normalized.length - n; i++) {
    ngrams.push(normalized.substring(i, i + n))
  }

  return ngrams
}

/**
 * Calculates the Levenshtein distance between two strings
 * Used for fuzzy matching
 * @param a - First string
 * @param b - Second string
 * @returns Levenshtein distance
 */
export function levenshteinDistance(a: string, b: string): number {
  // Optimization: Handle empty strings early
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  // Optimization: Ensure a is the shorter string for O(min(N,M)) space
  if (a.length > b.length) {
    ;[a, b] = [b, a]
  }

  const aLen = a.length
  const bLen = b.length

  // Optimization: Use two rows instead of full matrix to save memory
  // Space complexity: O(min(a.length, b.length))
  let prevRow = new Array(aLen + 1)
  let currRow = new Array(aLen + 1)

  for (let i = 0; i <= aLen; i++) {
    prevRow[i] = i
  }

  for (let j = 1; j <= bLen; j++) {
    currRow[0] = j
    const bChar = b[j - 1]

    for (let i = 1; i <= aLen; i++) {
      const indicator = a[i - 1] === bChar ? 0 : 1
      currRow[i] = Math.min(
        currRow[i - 1] + 1, // deletion
        prevRow[i] + 1, // insertion
        prevRow[i - 1] + indicator // substitution
      )
    }

    // Swap rows for next iteration
    ;[prevRow, currRow] = [currRow, prevRow]
  }

  return prevRow[aLen]
}

/**
 * Calculates similarity percentage between two strings
 * @param a - First string
 * @param b - Second string
 * @returns Similarity score (0-100)
 */
export function calculateSimilarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 100

  const distance = levenshteinDistance(normalizeText(a), normalizeText(b))
  return Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100))
}

/**
 * Checks if a string starts with a prefix
 * @param text - Text to check
 * @param prefix - Prefix to match
 * @returns True if text starts with prefix
 */
export function startsWithIgnoreCase(text: string, prefix: string): boolean {
  return normalizeText(text).startsWith(normalizeText(prefix))
}

/**
 * Checks if a string includes a substring
 * @param text - Text to search in
 * @param substring - Substring to find
 * @returns True if substring is included
 */
export function includesIgnoreCase(text: string, substring: string): boolean {
  return normalizeText(text).includes(normalizeText(substring))
}

/**
 * Extracts search highlights from text
 * @param text - Original text
 * @param searchTerm - Search term to highlight
 * @returns Text with highlighted portions marked
 */
export function getHighlights(
  text: string,
  searchTerm: string
): { before: string; highlight: string; after: string }[] {
  const normalized = normalizeText(text)
  const normalizedTerm = normalizeText(searchTerm)
  const highlights: { before: string; highlight: string; after: string }[] = []

  let lastIndex = 0
  let index = normalized.indexOf(normalizedTerm)

  while (index !== -1) {
    if (index > lastIndex) {
      highlights.push({
        before: text.substring(lastIndex, index),
        highlight: text.substring(index, index + searchTerm.length),
        after: '',
      })
    } else {
      highlights.push({
        before: '',
        highlight: text.substring(index, index + searchTerm.length),
        after: '',
      })
    }

    lastIndex = index + searchTerm.length
    index = normalized.indexOf(normalizedTerm, lastIndex)
  }

  if (lastIndex < text.length) {
    if (highlights.length > 0) {
      const lastHighlight = highlights[highlights.length - 1]
      if (lastHighlight) lastHighlight.after = text.substring(lastIndex)
    } else {
      highlights.push({
        before: text,
        highlight: '',
        after: '',
      })
    }
  }

  return highlights
}
