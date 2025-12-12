import { createOpenAI } from '@ai-sdk/openai'

// Configure AI provider for Vercel AI SDK
// Supports both OpenAI and GLM-4.6 (Z.AI) via OpenAI-compatible API
const isZAI = !!process.env.ZAI_API_KEY

export const openai = createOpenAI({
  apiKey: isZAI ? process.env.ZAI_API_KEY : process.env.OPENAI_API_KEY,
  baseURL: isZAI ? process.env.ZAI_BASE_URL : undefined,
  compatibility: 'compatible', // Use 'compatible' for Z.AI
})

// Default model for medical chat
// GLM-4.6 when using Z.AI, otherwise GPT-4 Turbo
export const DEFAULT_MODEL = isZAI
  ? (process.env.ZAI_MODEL || 'glm-4.6')
  : 'gpt-4-turbo'

// Model configuration
export const MODEL_CONFIG = {
  temperature: 0.3, // Lower temperature for more consistent medical responses
  maxTokens: 2048,
  topP: 0.9,
}
