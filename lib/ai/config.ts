import { createOpenAI } from '@ai-sdk/openai'
import { MockLanguageModelV1, convertArrayToReadableStream } from 'ai/test'

/**
 * AI Provider configuration for Vercel AI SDK
 *
 * - Validates OPENAI_API_KEY at runtime so ChatWell fails fast when misconfigured.
 * - Supports a mock provider (MOCK_AI=true or AI_PROVIDER=mock) used in tests/CI
 *   to avoid calling external APIs.
 * - Supports Z.AI via OpenAI-compatible API when ZAI_* env vars are present.
 */

const isZAI = Boolean(process.env.ZAI_API_KEY?.trim())
const isMockAiEnabled = process.env.MOCK_AI === 'true' || process.env.AI_PROVIDER === 'mock'

function getValidatedOpenAIKey() {
  const key = process.env.OPENAI_API_KEY?.trim()
  if (!key) {
    throw new Error(
      'OPENAI_API_KEY is not configured. ChatWell will be unavailable until this environment variable is set.'
    )
  }
  return key
}

const providerApiKey = isMockAiEnabled
  ? 'mock-api-key'
  : isZAI
    ? process.env.ZAI_API_KEY?.trim()
    : getValidatedOpenAIKey()

export const openai = createOpenAI({
  apiKey: providerApiKey,
  baseURL: isZAI ? process.env.ZAI_BASE_URL : undefined,
  compatibility: 'compatible', // Use 'compatible' for Z.AI
})

// Default model for medical chat
export const DEFAULT_MODEL = isZAI ? process.env.ZAI_MODEL || 'glm-4.6' : 'gpt-4-turbo'

// Model configuration
export const MODEL_CONFIG = {
  temperature: 0.3, // Lower temperature for more consistent medical responses
  maxTokens: 2048,
  topP: 0.9,
}

const MOCK_AI_RESPONSE =
  process.env.MOCK_AI_RESPONSE ||
  'ChatWell (modo de teste): resposta simulada para validação do fluxo.'

const mockModel = new MockLanguageModelV1({
  provider: 'mock',
  modelId: 'chatwell-mock',
  doStream: async () => {
    const stream = convertArrayToReadableStream([
      MOCK_AI_RESPONSE,
      {
        type: 'finish',
        finishReason: 'stop',
        usage: {
          promptTokens: 0,
          completionTokens: MOCK_AI_RESPONSE.length,
          totalTokens: MOCK_AI_RESPONSE.length,
        },
      },
    ])

    return {
      stream: stream as ReadableStream<any>,
      rawCall: { rawPrompt: MOCK_AI_RESPONSE, rawSettings: {} },
      warnings: [],
      rawResponse: new Response(),
    } as any
  },
  doGenerate: async () => ({
    text: MOCK_AI_RESPONSE,
    usage: {
      promptTokens: 0,
      completionTokens: MOCK_AI_RESPONSE.length,
      totalTokens: MOCK_AI_RESPONSE.length,
    },
    finishReason: 'stop',
    rawResponse: new Response(),
    rawCall: { rawPrompt: MOCK_AI_RESPONSE, rawSettings: {} },
  }) as any,
})

/**
 * Returns the configured chat model (OpenAI/Z.AI in production, mock in tests/CI)
 */
export function getChatModel() {
  return isMockAiEnabled ? mockModel : openai(DEFAULT_MODEL)
}

export const isMockAi = isMockAiEnabled
