/**
 * Supabase Client Configuration (Browser)
 *
 * This file provides client-side Supabase client instances.
 * Use this for browser/client-side operations.
 */

import { createBrowserClient } from '@supabase/ssr'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

/**
 * Create a Supabase client for browser usage
 * Safe to use in client components
 */
export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!)
}

// Singleton for convenience
let browserClient: ReturnType<typeof createClient> | null = null

export function getClient() {
  if (!browserClient) {
    browserClient = createClient()
  }
  return browserClient
}


