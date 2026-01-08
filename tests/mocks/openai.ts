/**
 * OpenAI / AI SDK Mock for Unit and Integration Testing
 *
 * This module provides mocks for the Vercel AI SDK and OpenAI integration.
 * Allows testing AI-powered features without making actual API calls.
 *
 * Usage:
 * ```typescript
 * import { mockAIResponse, mockStreamingResponse } from '@/tests/mocks/openai'
 *
 * // Mock a simple response:
 * mockAIResponse('This is the AI response text')
 *
 * // Mock with citations:
 * mockAIResponseWithCitations('Response text', [{ title: 'Study', pmid: '12345' }])
 * ```
 */

import { vi } from 'vitest'

// ============================================================================
// Mock Response Data
// ============================================================================

/**
 * Default mock AI response for medical queries
 */
export const defaultMockResponse = {
  content: `Os principais sinais de alerta (red flags) para dor torácica incluem:

1. **Dor intensa e súbita** - Início abrupto de dor severa
2. **Irradiação para braço esquerdo, mandíbula ou dorso** - Padrão típico de isquemia cardíaca
3. **Sudorese fria e palidez** - Sinais de instabilidade hemodinâmica
4. **Dispneia associada** - Pode indicar insuficiência cardíaca ou embolia pulmonar
5. **Síncope ou pré-síncope** - Sugere arritmia ou baixo débito cardíaco

**Referências:**
[1] Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients With Non-ST-Elevation Acute Coronary Syndromes. JACC. 2014.`,
  citations: [
    {
      id: 'cite-1',
      title: '2014 AHA/ACC Guideline for the Management of Patients With Non-ST-Elevation Acute Coronary Syndromes',
      authors: 'Amsterdam EA, Wenger NK, Brindis RG, et al.',
      journal: 'Journal of the American College of Cardiology',
      year: '2014',
      pmid: '25260718',
      doi: '10.1016/j.jacc.2014.09.017',
    },
  ],
}

/**
 * Mock citation data
 */
export interface MockCitation {
  id?: string
  title: string
  authors?: string
  journal?: string
  year?: string
  pmid?: string
  doi?: string
}

// ============================================================================
// AI SDK Mocks
// ============================================================================

/**
 * Mock generateText function from AI SDK
 */
export const generateTextMock = vi.fn().mockResolvedValue({
  text: defaultMockResponse.content,
  usage: {
    promptTokens: 150,
    completionTokens: 200,
    totalTokens: 350,
  },
  finishReason: 'stop',
})

/**
 * Mock streamText function from AI SDK
 */
export const streamTextMock = vi.fn().mockReturnValue({
  textStream: createMockTextStream(defaultMockResponse.content),
  text: Promise.resolve(defaultMockResponse.content),
  usage: Promise.resolve({
    promptTokens: 150,
    completionTokens: 200,
    totalTokens: 350,
  }),
  finishReason: Promise.resolve('stop'),
})

/**
 * Create a mock async iterable text stream
 */
function createMockTextStream(text: string): AsyncIterable<string> {
  const words = text.split(' ')
  return {
    async *[Symbol.asyncIterator]() {
      for (const word of words) {
        yield word + ' '
        // Simulate streaming delay
        await new Promise((resolve) => setTimeout(resolve, 10))
      }
    },
  }
}

/**
 * Mock OpenAI provider
 */
export const openaiMock = vi.fn().mockReturnValue({
  chat: vi.fn(),
  completion: vi.fn(),
})

// ============================================================================
// Module Mocks
// ============================================================================

// Mock the AI SDK core
vi.mock('ai', () => ({
  generateText: generateTextMock,
  streamText: streamTextMock,
  generateObject: vi.fn().mockResolvedValue({ object: {} }),
  streamObject: vi.fn().mockReturnValue({
    partialObjectStream: { [Symbol.asyncIterator]: () => ({ next: () => Promise.resolve({ done: true }) }) },
    object: Promise.resolve({}),
  }),
}))

// Mock the OpenAI provider
vi.mock('@ai-sdk/openai', () => ({
  openai: openaiMock,
  createOpenAI: vi.fn().mockReturnValue(openaiMock),
}))

// Mock the AI config module if it exists
vi.mock('@/lib/ai/config', () => ({
  openai: openaiMock,
  generateResponse: vi.fn().mockResolvedValue({
    content: defaultMockResponse.content,
    citations: defaultMockResponse.citations,
  }),
  streamResponse: vi.fn().mockReturnValue({
    textStream: createMockTextStream(defaultMockResponse.content),
  }),
}))

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Set a custom mock AI response
 */
export function mockAIResponse(content: string) {
  generateTextMock.mockResolvedValue({
    text: content,
    usage: { promptTokens: 100, completionTokens: 150, totalTokens: 250 },
    finishReason: 'stop',
  })
  streamTextMock.mockReturnValue({
    textStream: createMockTextStream(content),
    text: Promise.resolve(content),
    usage: Promise.resolve({ promptTokens: 100, completionTokens: 150, totalTokens: 250 }),
    finishReason: Promise.resolve('stop'),
  })
}

/**
 * Set a mock AI response with citations
 */
export function mockAIResponseWithCitations(content: string, citations: MockCitation[]) {
  const formattedCitations = citations.map((c, i) => ({
    id: c.id || `cite-${i + 1}`,
    ...c,
  }))

  generateTextMock.mockResolvedValue({
    text: content,
    usage: { promptTokens: 100, completionTokens: 150, totalTokens: 250 },
    finishReason: 'stop',
  })

  // Also mock the config module's generateResponse
  vi.mocked(vi.fn()).mockResolvedValue({
    content,
    citations: formattedCitations,
  })
}

/**
 * Mock AI error response
 */
export function mockAIError(message: string = 'AI service unavailable') {
  generateTextMock.mockRejectedValue(new Error(message))
  streamTextMock.mockImplementation(() => {
    throw new Error(message)
  })
}

/**
 * Mock rate limit error
 */
export function mockRateLimitError() {
  const error = new Error('Rate limit exceeded')
  ;(error as any).status = 429
  generateTextMock.mockRejectedValue(error)
  streamTextMock.mockImplementation(() => {
    throw error
  })
}

/**
 * Mock streaming response with custom chunks
 */
export function mockStreamingResponse(chunks: string[]) {
  streamTextMock.mockReturnValue({
    textStream: {
      async *[Symbol.asyncIterator]() {
        for (const chunk of chunks) {
          yield chunk
          await new Promise((resolve) => setTimeout(resolve, 10))
        }
      },
    },
    text: Promise.resolve(chunks.join('')),
    usage: Promise.resolve({ promptTokens: 100, completionTokens: 150, totalTokens: 250 }),
    finishReason: Promise.resolve('stop'),
  })
}

/**
 * Reset all AI mocks to default state
 */
export function resetAIMocks() {
  generateTextMock.mockResolvedValue({
    text: defaultMockResponse.content,
    usage: { promptTokens: 150, completionTokens: 200, totalTokens: 350 },
    finishReason: 'stop',
  })
  streamTextMock.mockReturnValue({
    textStream: createMockTextStream(defaultMockResponse.content),
    text: Promise.resolve(defaultMockResponse.content),
    usage: Promise.resolve({ promptTokens: 150, completionTokens: 200, totalTokens: 350 }),
    finishReason: Promise.resolve('stop'),
  })
}

// ============================================================================
// Medical-Specific Mock Responses
// ============================================================================

/**
 * Mock response for chest pain query
 */
export const chestPainResponse = {
  content: `Para dor torácica, os principais diagnósticos diferenciais incluem:

**Causas Cardíacas:**
- Síndrome Coronariana Aguda (IAM, angina instável)
- Pericardite
- Dissecção de aorta

**Causas Pulmonares:**
- Embolia pulmonar
- Pneumotórax
- Pneumonia

**Causas Gastrointestinais:**
- DRGE
- Espasmo esofágico

**Causas Musculoesqueléticas:**
- Costocondrite
- Dor muscular

Recomenda-se avaliação com ECG e troponina para exclusão de causa cardíaca.`,
  citations: [
    {
      id: 'cite-1',
      title: 'Chest Pain Guidelines',
      authors: 'ESC Guidelines',
      journal: 'European Heart Journal',
      year: '2020',
      pmid: '32860730',
    },
  ],
}

/**
 * Mock response for headache query
 */
export const headacheResponse = {
  content: `Os sinais de alerta para cefaleia que indicam necessidade de investigação urgente:

**Red Flags (SNOOP):**
- **S**ystemic symptoms (febre, perda de peso)
- **N**eurologic signs (déficit focal)
- **O**nset sudden ("pior dor da vida" - thunderclap)
- **O**lder age (>50 anos, nova cefaleia)
- **P**revious headache history change

Cefaleia súbita e intensa ("thunderclap") requer exclusão de hemorragia subaracnóidea com TC de crânio e, se negativa, punção lombar.`,
  citations: [
    {
      id: 'cite-1',
      title: 'Headache Classification Committee of the International Headache Society',
      journal: 'Cephalalgia',
      year: '2018',
      pmid: '29368949',
    },
  ],
}

export default {
  generateTextMock,
  streamTextMock,
  openaiMock,
  mockAIResponse,
  mockAIResponseWithCitations,
  mockAIError,
  mockRateLimitError,
  mockStreamingResponse,
  resetAIMocks,
  chestPainResponse,
  headacheResponse,
}
