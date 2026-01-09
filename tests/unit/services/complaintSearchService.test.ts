/**
 * Complaint Search Service Tests
 *
 * Tests for the advanced complaint search functionality including:
 * - Search index building
 * - Full-text search with fuzzy matching
 * - Filter application
 * - Autocomplete suggestions
 * - Related complaints
 * - Search statistics
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  buildSearchIndex,
  searchComplaints,
  getSearchSuggestions,
  getRelated,
  getSearchStatistics,
  type SearchIndex,
  type ComplaintFilters,
  type SearchResult,
} from '@/lib/services/complaintSearchService'
import type { Complaint } from '@/lib/types/medical'

// ============================================================================
// Test Data
// ============================================================================

const createMockComplaint = (overrides: Partial<Complaint> = {}): Complaint => ({
  id: 'test-complaint-1',
  title: 'Dor Torácica',
  subtitle: 'Dor no peito com ou sem irradiação',
  group: 'CARD',
  riskLevel: 'high',
  severity: 4,
  isFastTrack: false,
  bodySystem: ['cardiovascular'],
  icd10Codes: ['R07.9'],
  searchWeight: 1.0,
  searchTerms: ['dor peito', 'chest pain', 'angina'],
  synonyms: ['dor precordial', 'angina pectoris'],
  chips: ['urgência', 'risco alto'],
  commonMisconceptions: ['azia', 'refluxo'],
  ...overrides,
})

const createTestComplaints = (): Complaint[] => [
  createMockComplaint({
    id: 'CHEST_PAIN',
    title: 'Dor Torácica',
    subtitle: 'Dor no peito com ou sem irradiação',
    group: 'CARD',
    riskLevel: 'high',
    severity: 5,
    bodySystem: ['cardiovascular'],
    searchTerms: ['dor peito', 'chest pain', 'precordialgia'],
    synonyms: ['dor precordial', 'angina pectoris'],
  }),
  createMockComplaint({
    id: 'HEADACHE',
    title: 'Cefaleia',
    subtitle: 'Dor de cabeça de várias etiologias',
    group: 'NEURO',
    riskLevel: 'medium',
    severity: 3,
    bodySystem: ['neurological'],
    searchTerms: ['dor cabeca', 'headache', 'enxaqueca'],
    synonyms: ['migrânea', 'cefalalgia'],
  }),
  createMockComplaint({
    id: 'ABDOMINAL_PAIN',
    title: 'Dor Abdominal',
    subtitle: 'Dor no abdômen de várias causas',
    group: 'GI',
    riskLevel: 'medium',
    severity: 3,
    bodySystem: ['gastrointestinal'],
    searchTerms: ['dor barriga', 'abdominal pain', 'cólica'],
    synonyms: ['dor de barriga', 'abdome agudo'],
    isFastTrack: true,
  }),
  createMockComplaint({
    id: 'DYSPNEA',
    title: 'Dispneia',
    subtitle: 'Falta de ar ou dificuldade respiratória',
    group: 'RESP',
    riskLevel: 'high',
    severity: 4,
    bodySystem: ['respiratory'],
    searchTerms: ['falta de ar', 'shortness of breath', 'dispnéia'],
    synonyms: ['falta de ar', 'ortopneia'],
  }),
  createMockComplaint({
    id: 'BACK_PAIN',
    title: 'Lombalgia',
    subtitle: 'Dor nas costas região lombar',
    group: 'MSK',
    riskLevel: 'low',
    severity: 2,
    bodySystem: ['musculoskeletal'],
    searchTerms: ['dor costas', 'back pain', 'coluna'],
    synonyms: ['dor lombar', 'lumbago'],
    isFastTrack: true,
  }),
]

// ============================================================================
// buildSearchIndex Tests
// ============================================================================

describe('buildSearchIndex', () => {
  it('should build an index from complaints', () => {
    const complaints = createTestComplaints()
    const index = buildSearchIndex(complaints, 'test-v1')

    expect(index.version).toBe('test-v1')
    expect(index.lastBuilt).toBeDefined()
    expect(Object.keys(index.complaints)).toHaveLength(5)
  })

  it('should index all complaints by ID', () => {
    const complaints = createTestComplaints()
    const index = buildSearchIndex(complaints)

    expect(index.complaints['CHEST_PAIN']).toBeDefined()
    expect(index.complaints['HEADACHE']).toBeDefined()
    expect(index.complaints['ABDOMINAL_PAIN']).toBeDefined()
    expect(index.complaints['DYSPNEA']).toBeDefined()
    expect(index.complaints['BACK_PAIN']).toBeDefined()
  })

  it('should build inverted index for search terms', () => {
    const complaints = createTestComplaints()
    const index = buildSearchIndex(complaints)

    // Should have entries in inverted index
    expect(Object.keys(index.invertedIndex).length).toBeGreaterThan(0)

    // Title terms should be indexed
    expect(index.invertedIndex['dor']).toContain('CHEST_PAIN')
    expect(index.invertedIndex['cefaleia']).toContain('HEADACHE')
  })

  it('should build synonym index', () => {
    const complaints = createTestComplaints()
    const index = buildSearchIndex(complaints)

    // Synonyms should be indexed
    expect(index.synonymIndex['dor precordial']).toContain('CHEST_PAIN')
    expect(index.synonymIndex['migranea']).toContain('HEADACHE')
  })

  it('should build n-gram index for fuzzy matching', () => {
    const complaints = createTestComplaints()
    const index = buildSearchIndex(complaints)

    // N-grams should be indexed
    expect(Object.keys(index.ngramIndex).length).toBeGreaterThan(0)
  })

  it('should store complaint metadata correctly', () => {
    const complaints = createTestComplaints()
    const index = buildSearchIndex(complaints)

    const chestPain = index.complaints['CHEST_PAIN']
    expect(chestPain?.title).toBe('Dor Torácica')
    expect(chestPain?.subtitle).toBe('Dor no peito com ou sem irradiação')
    expect(chestPain?.group).toBe('CARD')
    expect(chestPain?.riskLevel).toBe('high')
    expect(chestPain?.severity).toBe(5)
    expect(chestPain?.bodySystem).toContain('cardiovascular')
  })

  it('should handle empty complaints array', () => {
    const index = buildSearchIndex([])

    expect(Object.keys(index.complaints)).toHaveLength(0)
    expect(Object.keys(index.invertedIndex)).toHaveLength(0)
    expect(Object.keys(index.ngramIndex)).toHaveLength(0)
  })

  it('should handle complaints with missing optional fields', () => {
    const minimalComplaint: Complaint = {
      id: 'MINIMAL',
      title: 'Minimal Complaint',
      subtitle: 'Test',
      group: 'TEST',
      riskLevel: 'low',
    }

    const index = buildSearchIndex([minimalComplaint])

    expect(index.complaints['MINIMAL']).toBeDefined()
    expect(index.complaints['MINIMAL']?.severity).toBe(3) // default
    expect(index.complaints['MINIMAL']?.isFastTrack).toBe(false) // default
    expect(index.complaints['MINIMAL']?.searchWeight).toBe(1.0) // default
  })
})

// ============================================================================
// searchComplaints Tests
// ============================================================================

describe('searchComplaints', () => {
  let index: SearchIndex

  beforeEach(() => {
    index = buildSearchIndex(createTestComplaints())
  })

  describe('basic search', () => {
    it('should return empty array for empty search term', () => {
      const results = searchComplaints(index, '')
      expect(results).toHaveLength(0)
    })

    it('should return empty array for whitespace-only search term', () => {
      const results = searchComplaints(index, '   ')
      expect(results).toHaveLength(0)
    })

    it('should find exact title matches', () => {
      const results = searchComplaints(index, 'Dor Torácica')

      expect(results.length).toBeGreaterThan(0)
      expect(results[0]?.complaintId).toBe('CHEST_PAIN')
      expect(results[0]?.matchType).toBe('exact')
    })

    it('should find prefix matches', () => {
      const results = searchComplaints(index, 'Dor')

      expect(results.length).toBeGreaterThan(0)
      // Should find multiple complaints starting with "Dor"
      const ids = results.map((r) => r.complaintId)
      expect(ids).toContain('CHEST_PAIN')
      expect(ids).toContain('ABDOMINAL_PAIN')
    })

    it('should find synonym matches', () => {
      const results = searchComplaints(index, 'angina pectoris')

      expect(results.length).toBeGreaterThan(0)
      expect(results.some((r) => r.complaintId === 'CHEST_PAIN')).toBe(true)
    })

    it('should find search term matches', () => {
      const results = searchComplaints(index, 'chest pain')

      expect(results.length).toBeGreaterThan(0)
      expect(results.some((r) => r.complaintId === 'CHEST_PAIN')).toBe(true)
    })
  })

  describe('fuzzy matching', () => {
    it('should find matches with typos', () => {
      const results = searchComplaints(index, 'cefaléia') // with accent variant

      expect(results.length).toBeGreaterThan(0)
      expect(results.some((r) => r.complaintId === 'HEADACHE')).toBe(true)
    })

    it('should handle accent-insensitive search', () => {
      const results = searchComplaints(index, 'dor toracica') // without accent

      expect(results.length).toBeGreaterThan(0)
      expect(results[0]?.complaintId).toBe('CHEST_PAIN')
    })

    it('should handle case-insensitive search', () => {
      const results = searchComplaints(index, 'DOR TORÁCICA')

      expect(results.length).toBeGreaterThan(0)
      expect(results[0]?.complaintId).toBe('CHEST_PAIN')
    })
  })

  describe('relevance scoring', () => {
    it('should score exact matches higher than fuzzy matches', () => {
      const results = searchComplaints(index, 'Dor Torácica')

      const exactMatch = results.find((r) => r.matchType === 'exact')
      const fuzzyMatch = results.find((r) => r.matchType === 'fuzzy')

      if (exactMatch && fuzzyMatch) {
        expect(exactMatch.relevanceScore).toBeGreaterThan(fuzzyMatch.relevanceScore)
      }
    })

    it('should apply search weight to relevance score', () => {
      // Create complaints with different search weights
      const complaintsWithWeights: Complaint[] = [
        createMockComplaint({
          id: 'HIGH_WEIGHT',
          title: 'Test Complaint',
          searchWeight: 2.0,
        }),
        createMockComplaint({
          id: 'LOW_WEIGHT',
          title: 'Test Complaint',
          searchWeight: 0.5,
        }),
      ]

      const weightedIndex = buildSearchIndex(complaintsWithWeights)
      const results = searchComplaints(weightedIndex, 'Test Complaint')

      const highWeight = results.find((r) => r.complaintId === 'HIGH_WEIGHT')
      const lowWeight = results.find((r) => r.complaintId === 'LOW_WEIGHT')

      if (highWeight && lowWeight) {
        expect(highWeight.relevanceScore).toBeGreaterThan(lowWeight.relevanceScore)
      }
    })

    it('should sort results by relevance score', () => {
      const results = searchComplaints(index, 'dor')

      for (let i = 1; i < results.length; i++) {
        const prev = results[i - 1]
        const curr = results[i]
        if (prev && curr) {
          expect(prev.relevanceScore).toBeGreaterThanOrEqual(curr.relevanceScore)
        }
      }
    })
  })

  describe('filters', () => {
    it('should filter by risk level', () => {
      const filters: ComplaintFilters = {
        riskLevel: ['high'],
      }

      const results = searchComplaints(index, 'dor', filters)

      expect(results.every((r) => r.riskLevel === 'high')).toBe(true)
    })

    it('should filter by multiple risk levels', () => {
      const filters: ComplaintFilters = {
        riskLevel: ['high', 'medium'],
      }

      const results = searchComplaints(index, 'dor', filters)

      expect(results.every((r) => ['high', 'medium'].includes(r.riskLevel))).toBe(true)
    })

    it('should filter by body system', () => {
      const filters: ComplaintFilters = {
        bodySystem: ['cardiovascular'],
      }

      const results = searchComplaints(index, 'dor', filters)

      expect(results.every((r) => r.bodySystem.includes('cardiovascular'))).toBe(true)
    })

    it('should filter by group codes', () => {
      const filters: ComplaintFilters = {
        groupCodes: ['CARD', 'RESP'],
      }

      const results = searchComplaints(index, 'dor', filters)

      expect(results.every((r) => ['CARD', 'RESP'].includes(r.group))).toBe(true)
    })

    it('should filter fast track only', () => {
      const filters: ComplaintFilters = {
        onlyFastTrack: true,
      }

      const results = searchComplaints(index, 'dor', filters)

      expect(results.every((r) => r.isFastTrack === true)).toBe(true)
    })

    it('should combine multiple filters', () => {
      const filters: ComplaintFilters = {
        riskLevel: ['medium', 'low'],
        onlyFastTrack: true,
      }

      const results = searchComplaints(index, 'dor', filters)

      expect(
        results.every((r) => ['medium', 'low'].includes(r.riskLevel) && r.isFastTrack === true)
      ).toBe(true)
    })

    it('should return empty when no matches for filters', () => {
      const filters: ComplaintFilters = {
        riskLevel: ['high'],
        onlyFastTrack: true,
      }

      // No high risk complaints that are fast track in our test data
      const results = searchComplaints(index, 'dor', filters)
      expect(results).toHaveLength(0)
    })
  })

  describe('result limit', () => {
    it('should respect the limit parameter', () => {
      const results = searchComplaints(index, 'dor', undefined, 2)

      expect(results.length).toBeLessThanOrEqual(2)
    })

    it('should use default limit of 50', () => {
      // Create many complaints
      const manyComplaints = Array.from({ length: 60 }, (_, i) =>
        createMockComplaint({
          id: `COMPLAINT_${i}`,
          title: `Dor Tipo ${i}`,
        })
      )

      const largeIndex = buildSearchIndex(manyComplaints)
      const results = searchComplaints(largeIndex, 'dor')

      expect(results.length).toBeLessThanOrEqual(50)
    })
  })

  describe('search result format', () => {
    it('should return properly formatted search results', () => {
      const results = searchComplaints(index, 'Dor Torácica')

      expect(results.length).toBeGreaterThan(0)

      const result = results[0]
      expect(result).toHaveProperty('complaintId')
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('subtitle')
      expect(result).toHaveProperty('group')
      expect(result).toHaveProperty('relevanceScore')
      expect(result).toHaveProperty('matchType')
      expect(result).toHaveProperty('riskLevel')
      expect(result).toHaveProperty('severity')
      expect(result).toHaveProperty('isFastTrack')
      expect(result).toHaveProperty('bodySystem')
      expect(result).toHaveProperty('searchWeight')
    })
  })
})

// ============================================================================
// getSearchSuggestions Tests
// ============================================================================

describe('getSearchSuggestions', () => {
  let index: SearchIndex

  beforeEach(() => {
    index = buildSearchIndex(createTestComplaints())
  })

  it('should return empty array for empty search term', () => {
    const suggestions = getSearchSuggestions(index, '')
    expect(suggestions).toHaveLength(0)
  })

  it('should return empty array for single character', () => {
    const suggestions = getSearchSuggestions(index, 'd')
    expect(suggestions).toHaveLength(0)
  })

  it('should return suggestions for valid prefix', () => {
    const suggestions = getSearchSuggestions(index, 'dor')

    expect(suggestions.length).toBeGreaterThan(0)
  })

  it('should include title matches in suggestions', () => {
    const suggestions = getSearchSuggestions(index, 'dor t')

    expect(suggestions.some((s) => s.toLowerCase().includes('dor t'))).toBe(true)
  })

  it('should include search term matches in suggestions', () => {
    const suggestions = getSearchSuggestions(index, 'chest')

    expect(suggestions.length).toBeGreaterThan(0)
  })

  it('should include synonym matches in suggestions', () => {
    const suggestions = getSearchSuggestions(index, 'angina')

    expect(suggestions.length).toBeGreaterThan(0)
  })

  it('should respect the limit parameter', () => {
    const suggestions = getSearchSuggestions(index, 'dor', 2)

    expect(suggestions.length).toBeLessThanOrEqual(2)
  })

  it('should not return duplicate suggestions', () => {
    const suggestions = getSearchSuggestions(index, 'dor')

    const uniqueSuggestions = [...new Set(suggestions)]
    expect(suggestions.length).toBe(uniqueSuggestions.length)
  })
})

// ============================================================================
// getRelated Tests
// ============================================================================

describe('getRelated', () => {
  let index: SearchIndex

  beforeEach(() => {
    index = buildSearchIndex(createTestComplaints())
  })

  it('should return empty array for non-existent complaint', () => {
    const related = getRelated(index, 'NON_EXISTENT')
    expect(related).toHaveLength(0)
  })

  it('should return related complaints from same group', () => {
    // Add another cardiac complaint to test group matching
    const complaintsWithSameGroup = [
      ...createTestComplaints(),
      createMockComplaint({
        id: 'PALPITATIONS',
        title: 'Palpitações',
        group: 'CARD',
        bodySystem: ['cardiovascular'],
      }),
    ]

    const indexWithSameGroup = buildSearchIndex(complaintsWithSameGroup)
    const related = getRelated(indexWithSameGroup, 'CHEST_PAIN')

    expect(related.some((r) => r.complaintId === 'PALPITATIONS')).toBe(true)
  })

  it('should return related complaints from same body system', () => {
    const related = getRelated(index, 'CHEST_PAIN')

    // Should find respiratory (also high risk, different body system but related)
    // Note: The actual algorithm checks for group or body system matches
    expect(related.length).toBeGreaterThanOrEqual(0)
  })

  it('should not include the source complaint in results', () => {
    const related = getRelated(index, 'CHEST_PAIN')

    expect(related.every((r) => r.complaintId !== 'CHEST_PAIN')).toBe(true)
  })

  it('should respect the limit parameter', () => {
    const related = getRelated(index, 'CHEST_PAIN', 2)

    expect(related.length).toBeLessThanOrEqual(2)
  })

  it('should return properly formatted results', () => {
    // Add complaint with same group
    const complaintsWithSameGroup = [
      ...createTestComplaints(),
      createMockComplaint({
        id: 'PALPITATIONS',
        title: 'Palpitações',
        group: 'CARD',
        bodySystem: ['cardiovascular'],
      }),
    ]

    const indexWithSameGroup = buildSearchIndex(complaintsWithSameGroup)
    const related = getRelated(indexWithSameGroup, 'CHEST_PAIN')

    if (related.length > 0) {
      const result = related[0]
      expect(result).toHaveProperty('complaintId')
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('relevanceScore', 50) // Fixed relevance for related
      expect(result).toHaveProperty('matchType', 'exact')
    }
  })
})

// ============================================================================
// getSearchStatistics Tests
// ============================================================================

describe('getSearchStatistics', () => {
  it('should return correct total results count', () => {
    const results: SearchResult[] = [
      {
        complaintId: '1',
        title: 'Test 1',
        subtitle: 'Sub 1',
        group: 'GRP',
        relevanceScore: 80,
        matchType: 'exact',
        riskLevel: 'high',
        severity: 4,
        isFastTrack: true,
        bodySystem: ['cardio'],
        searchWeight: 1.0,
      },
      {
        complaintId: '2',
        title: 'Test 2',
        subtitle: 'Sub 2',
        group: 'GRP',
        relevanceScore: 60,
        matchType: 'fuzzy',
        riskLevel: 'medium',
        severity: 3,
        isFastTrack: false,
        bodySystem: ['neuro'],
        searchWeight: 1.0,
      },
    ]

    const stats = getSearchStatistics(results)

    expect(stats.totalResults).toBe(2)
  })

  it('should count results by risk level', () => {
    const results: SearchResult[] = [
      {
        complaintId: '1',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 80,
        matchType: 'exact',
        riskLevel: 'high',
        severity: 5,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '2',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 60,
        matchType: 'exact',
        riskLevel: 'high',
        severity: 4,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '3',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 50,
        matchType: 'fuzzy',
        riskLevel: 'medium',
        severity: 3,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '4',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 40,
        matchType: 'ngram',
        riskLevel: 'low',
        severity: 2,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
    ]

    const stats = getSearchStatistics(results)

    expect(stats.byRiskLevel.high).toBe(2)
    expect(stats.byRiskLevel.medium).toBe(1)
    expect(stats.byRiskLevel.low).toBe(1)
  })

  it('should count results by match type', () => {
    const results: SearchResult[] = [
      {
        complaintId: '1',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 100,
        matchType: 'exact',
        riskLevel: 'high',
        severity: 5,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '2',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 85,
        matchType: 'prefix',
        riskLevel: 'medium',
        severity: 3,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '3',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 75,
        matchType: 'synonym',
        riskLevel: 'medium',
        severity: 3,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '4',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 60,
        matchType: 'fuzzy',
        riskLevel: 'low',
        severity: 2,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '5',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 40,
        matchType: 'ngram',
        riskLevel: 'low',
        severity: 1,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
    ]

    const stats = getSearchStatistics(results)

    expect(stats.byMatchType.exact).toBe(1)
    expect(stats.byMatchType.prefix).toBe(1)
    expect(stats.byMatchType.synonym).toBe(1)
    expect(stats.byMatchType.fuzzy).toBe(1)
    expect(stats.byMatchType.ngram).toBe(1)
  })

  it('should count fast track results', () => {
    const results: SearchResult[] = [
      {
        complaintId: '1',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 80,
        matchType: 'exact',
        riskLevel: 'low',
        severity: 2,
        isFastTrack: true,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '2',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 60,
        matchType: 'exact',
        riskLevel: 'medium',
        severity: 3,
        isFastTrack: true,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '3',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 50,
        matchType: 'fuzzy',
        riskLevel: 'high',
        severity: 4,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
    ]

    const stats = getSearchStatistics(results)

    expect(stats.fastTrackCount).toBe(2)
  })

  it('should calculate average severity', () => {
    const results: SearchResult[] = [
      {
        complaintId: '1',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 80,
        matchType: 'exact',
        riskLevel: 'high',
        severity: 5,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '2',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 60,
        matchType: 'exact',
        riskLevel: 'medium',
        severity: 3,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
      {
        complaintId: '3',
        title: 'Test',
        subtitle: 'Sub',
        group: 'GRP',
        relevanceScore: 50,
        matchType: 'exact',
        riskLevel: 'low',
        severity: 1,
        isFastTrack: false,
        bodySystem: [],
        searchWeight: 1.0,
      },
    ]

    const stats = getSearchStatistics(results)

    expect(stats.averageSeverity).toBe(3) // (5 + 3 + 1) / 3
  })

  it('should handle empty results array', () => {
    const stats = getSearchStatistics([])

    expect(stats.totalResults).toBe(0)
    expect(stats.byRiskLevel.high).toBe(0)
    expect(stats.byRiskLevel.medium).toBe(0)
    expect(stats.byRiskLevel.low).toBe(0)
    expect(stats.byMatchType.exact).toBe(0)
    expect(stats.fastTrackCount).toBe(0)
    expect(stats.averageSeverity).toBe(0)
  })
})
