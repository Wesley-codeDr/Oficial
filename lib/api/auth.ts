/**
 * Shared API Authentication Helpers
 * 
 * Provides standardized authentication and authorization utilities for API routes.
 * Since middleware excludes /api/* paths, each route must enforce auth individually.
 * This helper ensures consistent auth handling across all API endpoints.
 */

import { NextResponse } from 'next/server'
import { getUser } from '@/lib/supabase/server'
import { createApiError } from './errors'

/**
 * Require authentication for an API route handler
 * 
 * Returns the authenticated user or a 401 JSON error response.
 * Use this at the start of API route handlers to ensure authentication.
 * 
 * @returns Object with either:
 *   - { user: User, error: null } if authenticated
 *   - { user: null, error: NextResponse } if not authenticated (401 response)
 * 
 * @example
 * ```ts
 * export async function GET() {
 *   const auth = await requireApiUser()
 *   if (auth.error) return auth.error
 *   const { user } = auth
 *   // ... rest of handler
 * }
 * ```
 */
export async function requireApiUser(): Promise<
  | { user: NonNullable<Awaited<ReturnType<typeof getUser>>>, error: null }
  | { user: null, error: NextResponse }
> {
  const user = await getUser()

  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        createApiError('UNAUTHORIZED', 'Unauthorized'),
        { status: 401 }
      ),
    }
  }

  return { user, error: null }
}

export type AuthenticatedUser = NonNullable<Awaited<ReturnType<typeof getUser>>>

/**
 * Wrap an API handler with mandatory authentication.
 * Ensures medical endpoints consistently enforce auth before executing logic.
 */
export function withApiAuth<TContext = unknown>(
  handler: (
    req: Request,
    context: TContext,
    user: AuthenticatedUser
  ) => Promise<Response | NextResponse> | Response | NextResponse
) {
  return async (req: Request, context: TContext) => {
    const auth = await requireApiUser()
    if (auth.error) return auth.error

    return handler(req, context, auth.user)
  }
}




