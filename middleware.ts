import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes - handled separately)
     * - public files
     * 
     * NOTE: API routes (/api/*) are excluded from middleware auth to allow
     * flexible authentication strategies per endpoint. Each API route handler
     * must enforce authentication individually using the shared helper:
     * - Use `requireApiUser()` from `@/lib/api/auth` for consistent auth handling
     * - Or use `getUser()` from `@/lib/supabase/server` and return 401 if null
     * 
     * This pattern ensures that:
     * - Medical data endpoints (sessions, syndromes, chief-complaints, dashboard)
     *   are consistently protected
     * - Chat endpoints enforce auth before processing sensitive medical conversations
     * - Future endpoints don't accidentally expose unauthenticated data
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
