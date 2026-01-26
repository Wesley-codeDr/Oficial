/**
 * NOTE: Next.js 15+ deprecates middleware.ts in favor of proxy.ts for routing.
 * However, proxy.ts is ONLY for routing (rewrites, redirects, headers).
 * Authentication should be handled in Layouts or Route Handlers.
 *
 * This middleware handles Supabase session refresh and route protection.
 * Keeping middleware.ts until Supabase provides official migration guidance.
 * See: https://nextjs.org/docs/app/guides/upgrading
 */
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
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
