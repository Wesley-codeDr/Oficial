import { createOpenAI } from '@ai-sdk/openai'

// Configure OpenAI provider for Vercel AI SDK
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

// Default model for medical chat
export const DEFAULT_MODEL = 'gpt-4-turbo'

// Model configuration
export const MODEL_CONFIG = {
  temperature: 0.3, // Lower temperature for more consistent medical responses
  maxTokens: 2048,
  topP: 0.9,
}
