/**
 * Text Normalization Utilities Tests
 *
 * Tests for text normalization functions used in search:
 * - normalizeText (accent removal, lowercase)
 * - tokenize (word splitting)
 * - generateNGrams (n-gram generation)
 * - levenshteinDistance (edit distance calculation)
 * - calculateSimilarity (percentage similarity)
 * - startsWithIgnoreCase
 * - includesIgnoreCase
 * - getHighlights
 */

import { describe, it, expect } from 'vitest'
import {
  normalizeText,
  tokenize,
  generateNGrams,
  levenshteinDistance,
  calculateSimilarity,
  startsWithIgnoreCase,
  includesIgnoreCase,
  getHighlights,
} from '@/lib/utils/textNormalization'

// ============================================================================
// normalizeText Tests
// ============================================================================

describe('normalizeText', () => {
  it('should convert to lowercase', () => {
    expect(normalizeText('HELLO')).toBe('hello')
    expect(normalizeText('Hello World')).toBe('hello world')
  })

  it('should remove accents from Portuguese characters', () => {
    expect(normalizeText('dor torácica')).toBe('dor toracica')
    expect(normalizeText('cefaléia')).toBe('cefaleia')
    expect(normalizeText('dispnéia')).toBe('dispneia')
    expect(normalizeText('náusea')).toBe('nausea')
  })

  it('should remove various diacritics', () => {
    expect(normalizeText('àáâãäå')).toBe('aaaaaa')
    expect(normalizeText('èéêë')).toBe('eeee')
    expect(normalizeText('ìíîï')).toBe('iiii')
    expect(normalizeText('òóôõö')).toBe('ooooo')
    expect(normalizeText('ùúûü')).toBe('uuuu')
    expect(normalizeText('ñ')).toBe('n')
    expect(normalizeText('ç')).toBe('c')
  })

  it('should trim whitespace', () => {
    expect(normalizeText('  hello  ')).toBe('hello')
    expect(normalizeText('\thello\n')).toBe('hello')
  })

  it('should handle empty string', () => {
    expect(normalizeText('')).toBe('')
  })

  it('should handle strings with numbers', () => {
    expect(normalizeText('Test123')).toBe('test123')
  })

  it('should preserve spaces between words', () => {
    expect(normalizeText('Dor de Cabeça')).toBe('dor de cabeca')
  })
})

// ============================================================================
// tokenize Tests
// ============================================================================

describe('tokenize', () => {
  it('should split text into tokens', () => {
    expect(tokenize('hello world')).toEqual(['hello', 'world'])
  })

  it('should normalize tokens', () => {
    expect(tokenize('Hello World')).toEqual(['hello', 'world'])
    expect(tokenize('Dor Torácica')).toEqual(['dor', 'toracica'])
  })

  it('should handle multiple spaces', () => {
    expect(tokenize('hello    world')).toEqual(['hello', 'world'])
  })

  it('should filter empty tokens', () => {
    expect(tokenize('  hello  ')).toEqual(['hello'])
  })

  it('should handle single word', () => {
    expect(tokenize('hello')).toEqual(['hello'])
  })

  it('should return empty array for empty string', () => {
    expect(tokenize('')).toEqual([])
  })

  it('should return empty array for whitespace only', () => {
    expect(tokenize('   ')).toEqual([])
  })
})

// ============================================================================
// generateNGrams Tests
// ============================================================================

describe('generateNGrams', () => {
  it('should generate trigrams by default', () => {
    expect(generateNGrams('hello')).toEqual(['hel', 'ell', 'llo'])
  })

  it('should generate n-grams of specified length', () => {
    expect(generateNGrams('hello', 2)).toEqual(['he', 'el', 'll', 'lo'])
    expect(generateNGrams('hello', 4)).toEqual(['hell', 'ello'])
  })

  it('should normalize text before generating n-grams', () => {
    expect(generateNGrams('HELLO')).toEqual(['hel', 'ell', 'llo'])
    expect(generateNGrams('hélló')).toEqual(['hel', 'ell', 'llo'])
  })

  it('should return empty array for short strings', () => {
    expect(generateNGrams('hi', 3)).toEqual([])
    expect(generateNGrams('a', 2)).toEqual([])
  })

  it('should handle string equal to n-gram size', () => {
    expect(generateNGrams('abc', 3)).toEqual(['abc'])
  })

  it('should handle empty string', () => {
    expect(generateNGrams('')).toEqual([])
  })
})

// ============================================================================
// levenshteinDistance Tests
// ============================================================================

describe('levenshteinDistance', () => {
  it('should return 0 for identical strings', () => {
    expect(levenshteinDistance('hello', 'hello')).toBe(0)
    expect(levenshteinDistance('test', 'test')).toBe(0)
  })

  it('should return length of non-empty string when other is empty', () => {
    expect(levenshteinDistance('hello', '')).toBe(5)
    expect(levenshteinDistance('', 'hello')).toBe(5)
  })

  it('should return 0 for two empty strings', () => {
    expect(levenshteinDistance('', '')).toBe(0)
  })

  it('should calculate single character changes', () => {
    expect(levenshteinDistance('cat', 'bat')).toBe(1) // substitution
    expect(levenshteinDistance('cat', 'cart')).toBe(1) // insertion
    expect(levenshteinDistance('cart', 'cat')).toBe(1) // deletion
  })

  it('should calculate multiple changes', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3)
    expect(levenshteinDistance('saturday', 'sunday')).toBe(3)
  })

  it('should handle completely different strings', () => {
    expect(levenshteinDistance('abc', 'xyz')).toBe(3)
  })

  it('should handle Portuguese medical terms', () => {
    expect(levenshteinDistance('cefaleia', 'cefalea')).toBe(1)
    expect(levenshteinDistance('toracica', 'toracico')).toBe(1)
  })
})

// ============================================================================
// calculateSimilarity Tests
// ============================================================================

describe('calculateSimilarity', () => {
  it('should return 100 for identical strings', () => {
    expect(calculateSimilarity('hello', 'hello')).toBe(100)
  })

  it('should return 100 for two empty strings', () => {
    expect(calculateSimilarity('', '')).toBe(100)
  })

  it('should return low similarity for very different strings', () => {
    const similarity = calculateSimilarity('abc', 'xyz')
    expect(similarity).toBeLessThan(50)
  })

  it('should return high similarity for similar strings', () => {
    const similarity = calculateSimilarity('hello', 'hella')
    expect(similarity).toBeGreaterThan(75)
  })

  it('should normalize before comparing', () => {
    expect(calculateSimilarity('HELLO', 'hello')).toBe(100)
    expect(calculateSimilarity('héllo', 'hello')).toBe(100)
  })

  it('should handle one-off typos', () => {
    const similarity = calculateSimilarity('cefaleia', 'cefalea')
    expect(similarity).toBeGreaterThan(85)
  })

  it('should return 0 or higher (never negative)', () => {
    const similarity = calculateSimilarity('a', 'xyz')
    expect(similarity).toBeGreaterThanOrEqual(0)
  })
})

// ============================================================================
// startsWithIgnoreCase Tests
// ============================================================================

describe('startsWithIgnoreCase', () => {
  it('should return true for matching prefix', () => {
    expect(startsWithIgnoreCase('Hello World', 'hello')).toBe(true)
    expect(startsWithIgnoreCase('TESTING', 'test')).toBe(true)
  })

  it('should return true for exact match', () => {
    expect(startsWithIgnoreCase('hello', 'hello')).toBe(true)
  })

  it('should return false for non-matching prefix', () => {
    expect(startsWithIgnoreCase('Hello World', 'world')).toBe(false)
  })

  it('should handle accents', () => {
    expect(startsWithIgnoreCase('Dor Torácica', 'dor tora')).toBe(true)
    expect(startsWithIgnoreCase('Cefaléia', 'cefal')).toBe(true)
  })

  it('should return true for empty prefix', () => {
    expect(startsWithIgnoreCase('hello', '')).toBe(true)
  })

  it('should return false when prefix is longer than text', () => {
    expect(startsWithIgnoreCase('hi', 'hello')).toBe(false)
  })
})

// ============================================================================
// includesIgnoreCase Tests
// ============================================================================

describe('includesIgnoreCase', () => {
  it('should return true for contained substring', () => {
    expect(includesIgnoreCase('Hello World', 'world')).toBe(true)
    expect(includesIgnoreCase('Hello World', 'lo wo')).toBe(true)
  })

  it('should return true for exact match', () => {
    expect(includesIgnoreCase('hello', 'hello')).toBe(true)
  })

  it('should return false for non-contained substring', () => {
    expect(includesIgnoreCase('Hello World', 'xyz')).toBe(false)
  })

  it('should handle accents', () => {
    expect(includesIgnoreCase('Dor Torácica', 'toracica')).toBe(true)
    expect(includesIgnoreCase('Cefaléia aguda', 'cefaleia')).toBe(true)
  })

  it('should return true for empty substring', () => {
    expect(includesIgnoreCase('hello', '')).toBe(true)
  })

  it('should return false when substring is longer than text', () => {
    expect(includesIgnoreCase('hi', 'hello')).toBe(false)
  })
})

// ============================================================================
// getHighlights Tests
// ============================================================================

describe('getHighlights', () => {
  it('should return highlight for matching substring', () => {
    const highlights = getHighlights('Hello World', 'World')

    expect(highlights.length).toBeGreaterThan(0)
  })

  it('should return text without highlight when no match', () => {
    const highlights = getHighlights('Hello World', 'xyz')

    expect(highlights).toHaveLength(1)
    expect(highlights[0]?.before).toBe('Hello World')
    expect(highlights[0]?.highlight).toBe('')
  })

  it('should handle multiple matches', () => {
    const highlights = getHighlights('dor dor dor', 'dor')

    expect(highlights.length).toBeGreaterThan(1)
  })

  it('should handle case-insensitive matching', () => {
    const highlights = getHighlights('Hello World', 'hello')

    expect(highlights.length).toBeGreaterThan(0)
    expect(highlights.some((h) => h.highlight.length > 0)).toBe(true)
  })

  it('should handle accents', () => {
    const highlights = getHighlights('Dor Torácica', 'toracica')

    expect(highlights.some((h) => h.highlight.length > 0)).toBe(true)
  })

  it('should handle empty text', () => {
    const highlights = getHighlights('', 'test')

    expect(highlights).toHaveLength(1)
    expect(highlights[0]?.before).toBe('')
  })

  it('should handle empty search term', () => {
    const highlights = getHighlights('Hello World', '')

    expect(highlights).toHaveLength(1)
    expect(highlights[0]?.before).toBe('Hello World')
  })
})
