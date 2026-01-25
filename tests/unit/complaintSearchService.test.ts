
import { describe, it, expect } from 'vitest'
import { buildSearchIndex, searchComplaints } from '../../lib/services/complaintSearchService'
import type { Complaint } from '../../lib/types/medical'

describe('Complaint Search Service', () => {
  const mockComplaints: Complaint[] = [
    {
      id: 'c1',
      title: 'Headache',
      subtitle: 'Pain in head',
      group: 'General',
      synonyms: ['Cephalgia'],
      searchTerms: ['head pain'],
      chips: [],
      commonMisconceptions: [],
      bodySystem: [],
      severity: 3,
      riskLevel: 'medium',
      isFastTrack: false,
      icd10Codes: [],
      searchWeight: 1,
    } as any,
    {
      id: 'c2',
      title: 'Heart Attack',
      subtitle: 'Myocardial Infarction',
      group: 'Cardiology',
      synonyms: ['MI'],
      searchTerms: ['chest pain'],
      chips: [],
      commonMisconceptions: [],
      bodySystem: [],
      severity: 5,
      riskLevel: 'high',
      isFastTrack: true,
      icd10Codes: [],
      searchWeight: 1,
    } as any,
    {
      id: 'c3',
      title: 'Headache',
      subtitle: 'Another Headache',
      group: 'Neurology',
      synonyms: [],
      searchTerms: [],
      chips: [],
      commonMisconceptions: [],
      bodySystem: [],
      severity: 4,
      riskLevel: 'medium',
      isFastTrack: false,
      icd10Codes: [],
      searchWeight: 1,
    } as any,
  ]

  const index = buildSearchIndex(mockComplaints)

  it('should build index with normalizedTitle and exactTitleIndex', () => {
    expect(index.complaints['c1'].normalizedTitle).toBe('headache')
    expect(index.complaints['c2'].normalizedTitle).toBe('heart attack')
    expect(index.exactTitleIndex['headache']).toContain('c1')
    expect(index.exactTitleIndex['headache']).toContain('c3')
    expect(index.exactTitleIndex['heart attack']).toContain('c2')
  })

  it('should find exact match', () => {
    const results = searchComplaints(index, 'Headache')
    expect(results.length).toBeGreaterThanOrEqual(2)

    const match1 = results.find(r => r.complaintId === 'c1')
    const match3 = results.find(r => r.complaintId === 'c3')

    expect(match1).toBeDefined()
    expect(match1?.matchType).toBe('exact')
    expect(match1?.relevanceScore).toBe(100)

    expect(match3).toBeDefined()
    expect(match3?.matchType).toBe('exact')
    expect(match3?.relevanceScore).toBe(100)
  })

  it('should find prefix match', () => {
    const results = searchComplaints(index, 'Heart')
    expect(results.length).toBeGreaterThan(0)
    const match = results.find(r => r.complaintId === 'c2')
    expect(match).toBeDefined()
    // Prefix match gets score 85
    expect(match?.relevanceScore).toBeGreaterThanOrEqual(85)
    expect(match?.matchType).toBe('prefix')
  })

  it('should find fuzzy match', () => {
    // "Headache" -> "Hedache"
    const results = searchComplaints(index, 'Hedache')
    expect(results.length).toBeGreaterThan(0)
    const match1 = results.find(r => r.complaintId === 'c1')
    expect(match1).toBeDefined()
    // Fuzzy match usually lower score
    expect(match1?.relevanceScore).toBeLessThan(100)
  })

  it('should find synonym match', () => {
    const results = searchComplaints(index, 'Cephalgia')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].complaintId).toBe('c1')
  })
})
