/**
 * Supabase Server Client Configuration
 *
 * This file provides server-side Supabase client instances.
 * Use this for server-side operations, API routes, and server components.
 */

import { createServerClient as createSupabaseServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * Create a Supabase client for Server Components, Server Actions, and Route Handlers
 * This client respects RLS policies based on the user session
 */
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  })
}

/**
 * Create an admin Supabase client that bypasses RLS
 * Use this only for admin operations that need full access
 *
 * WARNING: Never expose this in client-side code!
 */
export function createAdminClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. ' +
        'Get this from your Supabase dashboard: Settings > API > service_role key'
    )
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Get the current user from the session
 * Returns null if not authenticated
 */
export async function getUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Get the current session
 * Returns null if not authenticated
 */
export async function getSession() {
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Require authentication - redirects to login if not authenticated
 * 
 * @param redirectTo - Optional path to redirect back to after login
 * @returns The authenticated user (never returns if not authenticated, redirects instead)
 */
export async function requireAuth(redirectTo?: string) {
  const user = await getUser()
  if (!user) {
    const { redirect } = await import('next/navigation')
    const loginUrl = redirectTo 
      ? `/login?redirect=${encodeURIComponent(redirectTo)}`
      : '/login'
    redirect(loginUrl)
  }
  return user
}


