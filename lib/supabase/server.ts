/**
 * Supabase Server Client Configuration
 * 
 * This file provides server-side Supabase client instances.
 * Use this for server-side operations, API routes, and server components.
 */

import { createClient } from "@supabase/supabase-js";

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

/**
 * Server-side Supabase client with service role key
 * Use this for admin operations that bypass Row Level Security (RLS)
 * 
 * ⚠️ WARNING: Never expose the service role key in client-side code!
 * This client should only be used in server-side code (API routes, server components, etc.)
 */
export function createServerClient() {
  if (!supabaseServiceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable. " +
      "Get this from your Supabase dashboard: Settings > API > service_role key"
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Server-side Supabase client with user session
 * Use this when you have a user session and want to respect RLS policies
 */
export function createServerClientWithSession(accessToken: string) {
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

