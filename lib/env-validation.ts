/**
 * Environment Variable Validation
 * 
 * This module validates that all required environment variables are present
 * and properly formatted before the application starts.
 * 
 * This helps catch configuration errors early rather than at runtime.
 */

import { z } from 'zod'

// Define the schema for environment variables
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL URL'),
  DIRECT_URL: z.string().url('DIRECT_URL must be a valid PostgreSQL URL').optional(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),

  // OpenAI
  OPENAI_API_KEY: z
    .string()
    .min(1, 'OPENAI_API_KEY is required')
    .startsWith('sk-', 'OPENAI_API_KEY must start with sk-')
    .optional(),

  // Sentry (optional in development)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // App Configuration
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('NEXT_PUBLIC_APP_URL must be a valid URL')
    .default('http://localhost:3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

// Export type for validated environment
export type Env = z.infer<typeof envSchema>

/**
 * Validates environment variables against the schema
 * @throws {Error} If validation fails
 */
export function validateEnv(): Env {
  try {
    const parsed = envSchema.parse(process.env)
    
    // Additional validation for production
    if (parsed.NODE_ENV === 'production') {
      // Ensure critical services are configured in production
      if (!parsed.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is required in production')
      }
      
      if (!parsed.NEXT_PUBLIC_SENTRY_DSN) {
        console.warn('⚠️  NEXT_PUBLIC_SENTRY_DSN not configured - error tracking disabled')
      }
      
      // Ensure DATABASE_URL uses connection pooling in production
      if (!parsed.DATABASE_URL.includes('pgbouncer=true')) {
        console.warn(
          '⚠️  DATABASE_URL should include pgbouncer=true in production for optimal performance'
        )
      }
    }

    return parsed
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => `  - ${err.path.join('.')}: ${err.message}`)
      
      console.error('❌ Environment validation failed:\n')
      console.error(missingVars.join('\n'))
      console.error('\n💡 Check .env.example for required variables')
      
      throw new Error('Invalid environment variables')
    }
    throw error
  }
}

/**
 * Gets a safe version of environment variables for client-side use
 * Only includes NEXT_PUBLIC_* variables
 */
export function getPublicEnv() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NODE_ENV: process.env.NODE_ENV,
  }
}

/**
 * Checks if the application is running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Checks if the application is running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Checks if the application is running in test mode
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === 'test'
}
