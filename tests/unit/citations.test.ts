import { describe, it, expect } from 'vitest'
import {
  extractCitations,
  formatCitation,
  isValidPmid,
  isValidDoi,
  getPubMedSearchUrl,
  type Citation,
} from '@/lib/ai/citations'

describe('extractCitations', () => {
  it('should return empty array for text without citations', () => {
    const text = 'Este é um texto simples sem citações.'

    const result = extractCitations(text)

    expect(result).toHaveLength(0)
  })

  it('should extract standard citation format [Author, Year, Journal]', () => {
    const text = 'Segundo [Smith, 2023, NEJM], o tratamento é eficaz.'

    const result = extractCitations(text)

    expect(result).toHaveLength(1)
    expect(result[0]?.type).toBe('study')
    expect(result[0]?.authors).toBe('Smith')
    expect(result[0]?.year).toBe(2023)
    expect(result[0]?.journal).toBe('NEJM')
  })

  it('should extract citations with et al.', () => {
    const text = 'Conforme [Silva et al., 2024, Lancet], o resultado foi positivo.'

    const result = extractCitations(text)

    expect(result).toHaveLength(1)
    expect(result[0]?.authors).toBe('Silva et al.')
    expect(result[0]?.year).toBe(2024)
    expect(result[0]?.journal).toBe('Lancet')
  })

  it('should extract guideline citations', () => {
    const text = 'De acordo com [Diretriz: AHA, 2023], recomenda-se...'

    const result = extractCitations(text)

    expect(result).toHaveLength(1)
    expect(result[0]?.type).toBe('guideline')
    expect(result[0]?.authors).toBe('AHA')
    expect(result[0]?.year).toBe(2023)
  })

  it('should extract multiple author/journal citations', () => {
    const text = `
      Conforme [Smith, 2023, JAMA], o tratamento A é eficaz.
      Já [Jones et al., 2024, BMJ] sugere o tratamento B.
    `

    const result = extractCitations(text)

    expect(result).toHaveLength(2)
    expect(result[0]?.authors).toBe('Smith')
    expect(result[1]?.authors).toBe('Jones et al.')
  })

  it('should attach PMID to existing citation', () => {
    const text = '[Smith, 2023, NEJM] PMID: 12345678'

    const result = extractCitations(text)

    expect(result).toHaveLength(1)
    expect(result[0]?.pmid).toBe('12345678')
    expect(result[0]?.url).toBe('https://pubmed.ncbi.nlm.nih.gov/12345678')
  })

  it('should attach DOI to existing citation', () => {
    const text = '[Jones, 2024, Lancet] DOI: 10.1016/example.2024'

    const result = extractCitations(text)

    expect(result).toHaveLength(1)
    expect(result[0]?.doi).toBe('10.1016/example.2024')
    expect(result[0]?.url).toBe('https://doi.org/10.1016/example.2024')
  })

  it('should handle PMID/DOI without matching citations (not attached)', () => {
    // PMIDs and DOIs without base citations are not extracted as standalone
    const text = 'PMID: 99999999'

    const result = extractCitations(text)

    // No base citation to attach to, so empty
    expect(result).toHaveLength(0)
  })

  it('should handle malformed citations gracefully', () => {
    const text = '[incomplete, 2024] and [only author]'

    const result = extractCitations(text)

    // Should not crash, handles gracefully
    expect(Array.isArray(result)).toBe(true)
  })
})

describe('formatCitation', () => {
  it('should format citation with all fields', () => {
    const citation: Citation = {
      id: 'citation-1',
      authors: 'Smith et al.',
      year: 2023,
      journal: 'NEJM',
      type: 'study',
    }

    const result = formatCitation(citation)

    expect(result).toBe('Smith et al.. (2023). NEJM')
  })

  it('should format citation without year', () => {
    const citation: Citation = {
      id: 'citation-1',
      authors: 'AHA',
      type: 'guideline',
    }

    const result = formatCitation(citation)

    expect(result).toBe('AHA')
  })

  it('should format citation with author and year only', () => {
    const citation: Citation = {
      id: 'citation-1',
      authors: 'Jones',
      year: 2024,
      type: 'study',
    }

    const result = formatCitation(citation)

    expect(result).toBe('Jones. (2024)')
  })
})

describe('isValidPmid', () => {
  it('should return true for valid 8-digit PMID', () => {
    expect(isValidPmid('12345678')).toBe(true)
  })

  it('should return true for valid 7-digit PMID', () => {
    expect(isValidPmid('1234567')).toBe(true)
  })

  it('should return false for invalid PMID', () => {
    expect(isValidPmid('123456')).toBe(false)
    expect(isValidPmid('123456789')).toBe(false)
    expect(isValidPmid('abc12345')).toBe(false)
  })
})

describe('isValidDoi', () => {
  it('should return true for valid DOI', () => {
    expect(isValidDoi('10.1001/jama.2024.12345')).toBe(true)
    expect(isValidDoi('10.1016/j.example.2024.01.001')).toBe(true)
  })

  it('should return false for invalid DOI', () => {
    expect(isValidDoi('11.1001/test')).toBe(false)
    expect(isValidDoi('10.12/test')).toBe(false)
    expect(isValidDoi('random-string')).toBe(false)
  })
})

describe('getPubMedSearchUrl', () => {
  it('should generate correct PubMed search URL', () => {
    const result = getPubMedSearchUrl('chest pain')

    expect(result).toBe('https://pubmed.ncbi.nlm.nih.gov/?term=chest%20pain')
  })

  it('should encode special characters', () => {
    const result = getPubMedSearchUrl('heart attack & treatment')

    expect(result).toBe(
      'https://pubmed.ncbi.nlm.nih.gov/?term=heart%20attack%20%26%20treatment'
    )
  })
})
