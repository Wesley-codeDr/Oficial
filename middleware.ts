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
     * NOTE: API routes (/api/*) are excluded from middleware auth so each handler
     * can enforce auth in a single, consistent way. Do NOT implement ad-hoc auth
     * checks inside routes; always use the shared helpers from `@/lib/api/auth`:
     * - Wrap handlers with `withApiAuth(...)`
     * - Or call `requireApiUser()` at the top of the handler
     *
     * All new and existing routes must follow this pattern to keep medical data
     * and chat endpoints consistently protected and avoid future regressions.
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
