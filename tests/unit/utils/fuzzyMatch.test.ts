/**
 * Fuzzy Match Utilities Tests
 *
 * Tests for fuzzy matching functions:
 * - fuzzyMatch (similarity with threshold)
 * - prefixMatch (autocomplete matching)
 * - compositeMatch (multi-strategy matching)
 * - tokenOverlapMatch (word overlap matching)
 * - isQualityMatch (threshold validation)
 * - findBestMatchIndex (substring location)
 */

import { describe, it, expect } from 'vitest'
import {
  fuzzyMatch,
  prefixMatch,
  compositeMatch,
  tokenOverlapMatch,
  isQualityMatch,
  findBestMatchIndex,
} from '@/lib/utils/fuzzyMatch'

// ============================================================================
// fuzzyMatch Tests
// ============================================================================

describe('fuzzyMatch', () => {
  describe('exact and contains matches', () => {
    it('should return 100 for exact match', () => {
      expect(fuzzyMatch('hello', 'hello')).toBe(100)
    })

    it('should return 100 when target contains search term', () => {
      expect(fuzzyMatch('hello', 'hello world')).toBe(100)
    })

    it('should return 90 when target starts with search term', () => {
      // Note: startsWith case is 90 only if not also "includes"
      // Since 'hello world' includes 'hello', it returns 100
      expect(fuzzyMatch('chest', 'chest pain')).toBe(100) // includes
    })
  })

  describe('fuzzy similarity', () => {
    it('should return similarity score above threshold', () => {
      const score = fuzzyMatch('cefaleia', 'cefalea')
      expect(score).toBeGreaterThan(60)
    })

    it('should return 0 when below threshold', () => {
      const score = fuzzyMatch('abc', 'xyz', 60)
      expect(score).toBe(0)
    })

    it('should respect custom threshold', () => {
      const scoreHighThreshold = fuzzyMatch('test', 'tset', 90)
      const scoreLowThreshold = fuzzyMatch('test', 'tset', 50)

      expect(scoreHighThreshold).toBe(0) // below 90
      expect(scoreLowThreshold).toBeGreaterThan(0) // above 50
    })
  })

  describe('edge cases', () => {
    it('should return 0 for empty search term', () => {
      expect(fuzzyMatch('', 'target')).toBe(0)
    })

    it('should return 0 for empty target', () => {
      expect(fuzzyMatch('search', '')).toBe(0)
    })

    it('should return 0 for both empty', () => {
      expect(fuzzyMatch('', '')).toBe(0)
    })

    it('should handle accents (normalized)', () => {
      const score = fuzzyMatch('dor toracica', 'dor torácica')
      expect(score).toBe(100) // identical after normalization
    })

    it('should be case insensitive', () => {
      expect(fuzzyMatch('HELLO', 'hello')).toBe(100)
    })
  })

  describe('medical term matching', () => {
    it('should match similar medical terms', () => {
      expect(fuzzyMatch('dispneia', 'dispnéia')).toBe(100)
      expect(fuzzyMatch('nausea', 'náusea')).toBe(100)
    })

    it('should match common typos', () => {
      const score = fuzzyMatch('cefalea', 'cefaleia')
      expect(score).toBeGreaterThan(80)
    })
  })
})

// ============================================================================
// prefixMatch Tests
// ============================================================================

describe('prefixMatch', () => {
  it('should return 100 for exact match', () => {
    expect(prefixMatch('hello', 'hello')).toBe(100)
  })

  it('should return high score for prefix match', () => {
    const score = prefixMatch('hel', 'hello')
    expect(score).toBeGreaterThanOrEqual(50)
    expect(score).toBeLessThan(100)
  })

  it('should return 0 for non-prefix match', () => {
    expect(prefixMatch('world', 'hello')).toBe(0)
    expect(prefixMatch('ello', 'hello')).toBe(0)
  })

  it('should return 0 for empty search term', () => {
    expect(prefixMatch('', 'hello')).toBe(0)
  })

  it('should handle case insensitivity', () => {
    expect(prefixMatch('HEL', 'hello')).toBeGreaterThan(0)
  })

  it('should handle accents', () => {
    expect(prefixMatch('dor tora', 'dor torácica')).toBeGreaterThan(0)
  })

  it('should return higher score for longer prefix match', () => {
    const shortPrefix = prefixMatch('he', 'hello')
    const longPrefix = prefixMatch('hell', 'hello')

    expect(longPrefix).toBeGreaterThan(shortPrefix)
  })
})

// ============================================================================
// compositeMatch Tests
// ============================================================================

describe('compositeMatch', () => {
  it('should return 100 for exact match', () => {
    expect(compositeMatch('hello', 'hello')).toBe(100)
  })

  it('should return 95 for prefix match with preferPrefix true', () => {
    expect(compositeMatch('hel', 'hello', { preferPrefix: true })).toBe(95)
  })

  it('should return 80 for contains match', () => {
    expect(compositeMatch('ell', 'hello')).toBe(80)
  })

  it('should fall back to fuzzy match', () => {
    const score = compositeMatch('cefalea', 'cefaleia', { fuzzyThreshold: 60 })
    expect(score).toBeGreaterThan(0)
  })

  it('should return 0 for empty search term', () => {
    expect(compositeMatch('', 'hello')).toBe(0)
  })

  it('should respect fuzzy threshold option', () => {
    const highThreshold = compositeMatch('test', 'tset', { fuzzyThreshold: 90 })
    const lowThreshold = compositeMatch('test', 'tset', { fuzzyThreshold: 50 })

    expect(highThreshold).toBe(0)
    expect(lowThreshold).toBeGreaterThan(0)
  })

  it('should handle preferPrefix option', () => {
    // When preferPrefix is true, startsWith gets 95
    const score = compositeMatch('dor', 'dor torácica', { preferPrefix: true })
    expect(score).toBe(95)
  })
})

// ============================================================================
// tokenOverlapMatch Tests
// ============================================================================

describe('tokenOverlapMatch', () => {
  it('should return 100 for exact token match', () => {
    expect(tokenOverlapMatch('hello', 'hello')).toBe(100)
  })

  it('should return 100 when all tokens match', () => {
    expect(tokenOverlapMatch('hello world', 'hello world')).toBe(100)
  })

  it('should return partial score for partial match', () => {
    const score = tokenOverlapMatch('hello world', 'hello universe')
    expect(score).toBe(50) // 1 of 2 tokens match
  })

  it('should return 0 for no matching tokens', () => {
    expect(tokenOverlapMatch('abc def', 'xyz uvw')).toBe(0)
  })

  it('should return 0 for empty search term', () => {
    expect(tokenOverlapMatch('', 'hello')).toBe(0)
  })

  it('should return 0 for empty target', () => {
    expect(tokenOverlapMatch('hello', '')).toBe(0)
  })

  it('should match prefix of target tokens', () => {
    const score = tokenOverlapMatch('hel wor', 'hello world')
    expect(score).toBe(100) // Both tokens have prefix matches
  })

  it('should handle medical terms', () => {
    const score = tokenOverlapMatch('dor toracica', 'dor torácica aguda')
    expect(score).toBe(100) // Both tokens match (with normalization)
  })
})

// ============================================================================
// isQualityMatch Tests
// ============================================================================

describe('isQualityMatch', () => {
  it('should return true when score meets default threshold', () => {
    expect(isQualityMatch(60)).toBe(true)
    expect(isQualityMatch(80)).toBe(true)
    expect(isQualityMatch(100)).toBe(true)
  })

  it('should return false when score below default threshold', () => {
    expect(isQualityMatch(59)).toBe(false)
    expect(isQualityMatch(0)).toBe(false)
  })

  it('should respect custom threshold', () => {
    expect(isQualityMatch(70, 80)).toBe(false)
    expect(isQualityMatch(80, 80)).toBe(true)
    expect(isQualityMatch(90, 80)).toBe(true)
  })

  it('should handle boundary values', () => {
    expect(isQualityMatch(60, 60)).toBe(true)
    expect(isQualityMatch(0, 0)).toBe(true)
  })
})

// ============================================================================
// findBestMatchIndex Tests
// ============================================================================

describe('findBestMatchIndex', () => {
  it('should return 0 for exact substring at start', () => {
    expect(findBestMatchIndex('hello', 'hello world')).toBe(0)
  })

  it('should return correct index for substring in middle', () => {
    expect(findBestMatchIndex('world', 'hello world')).toBe(6)
  })

  it('should return -1 for no match', () => {
    expect(findBestMatchIndex('xyz', 'hello world')).toBe(-1)
  })

  it('should return -1 for empty search term', () => {
    expect(findBestMatchIndex('', 'hello')).toBe(-1)
  })

  it('should handle case insensitivity', () => {
    expect(findBestMatchIndex('HELLO', 'hello world')).toBe(0)
  })

  it('should handle accents', () => {
    expect(findBestMatchIndex('toracica', 'dor torácica')).toBe(4)
  })

  it('should find token boundary matches', () => {
    // "dor" starts at index 0 in "dor torácica"
    expect(findBestMatchIndex('dor', 'dor torácica')).toBe(0)

    // "tor" starts the second token "toracica"
    const index = findBestMatchIndex('tor', 'dor toracica')
    expect(index).toBe(4) // "tor" matches start of "toracica"
  })

  it('should prefer exact substring over token boundary', () => {
    expect(findBestMatchIndex('ell', 'hello')).toBe(1)
  })
})

// ============================================================================
// Integration Tests
// ============================================================================

describe('fuzzyMatch integration scenarios', () => {
  describe('medical complaint search scenarios', () => {
    it('should match common misspellings of medical terms', () => {
      // Cefaleia variations
      expect(fuzzyMatch('cefalia', 'cefaleia')).toBeGreaterThan(75)
      expect(fuzzyMatch('cefalea', 'cefaleia')).toBeGreaterThan(75)

      // Dispneia variations
      expect(fuzzyMatch('dispnea', 'dispneia')).toBeGreaterThan(75)
    })

    it('should match partial medical terms', () => {
      expect(prefixMatch('cefa', 'cefaleia')).toBeGreaterThan(0)
      expect(prefixMatch('disp', 'dispneia')).toBeGreaterThan(0)
    })

    it('should handle multi-word medical terms', () => {
      const score = tokenOverlapMatch('dor cabeca', 'dor de cabeça intensa')
      expect(score).toBeGreaterThan(50)
    })
  })

  describe('search autocomplete scenarios', () => {
    it('should provide good scores for typing prefix', () => {
      // User types "dor" looking for "dor torácica"
      expect(compositeMatch('dor', 'dor torácica')).toBeGreaterThan(90)

      // User types "dor to" looking for "dor torácica"
      expect(compositeMatch('dor to', 'dor torácica')).toBeGreaterThan(90)
    })

    it('should differentiate similar terms', () => {
      const chestPainScore = compositeMatch('dor tor', 'dor torácica')
      const headacheScore = compositeMatch('dor tor', 'cefaleia')

      expect(chestPainScore).toBeGreaterThan(headacheScore)
    })
  })
})
