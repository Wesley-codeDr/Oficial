
import { describe, it, expect } from 'vitest'
import { levenshteinDistance } from '../../lib/utils/textNormalization'

describe('levenshteinDistance', () => {
  it('should return 0 for identical strings', () => {
    expect(levenshteinDistance('hello', 'hello')).toBe(0)
  })

  it('should return correct distance for deletions', () => {
    expect(levenshteinDistance('hello', 'hell')).toBe(1)
    expect(levenshteinDistance('hello', 'he')).toBe(3)
  })

  it('should return correct distance for insertions', () => {
    expect(levenshteinDistance('hell', 'hello')).toBe(1)
    expect(levenshteinDistance('he', 'hello')).toBe(3)
  })

  it('should return correct distance for substitutions', () => {
    expect(levenshteinDistance('hello', 'hallo')).toBe(1)
    expect(levenshteinDistance('hello', 'jelly')).toBe(2)
  })

  it('should handle empty strings', () => {
    expect(levenshteinDistance('', '')).toBe(0)
    expect(levenshteinDistance('hello', '')).toBe(5)
    expect(levenshteinDistance('', 'hello')).toBe(5)
  })

  it('should handle complex cases', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3)
    expect(levenshteinDistance('Saturday', 'Sunday')).toBe(3)
  })
})
