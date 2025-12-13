import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Supabase Auth Callback Handler
 * 
 * Handles OAuth callbacks and password reset callbacks from Supabase.
 * For password reset, extracts the token and redirects to reset-password page.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'
  const type = requestUrl.searchParams.get('type')

  if (code) {
    const supabase = await createServerClient()

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
    }

    // For password reset, redirect to reset-password page
    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/reset-password', request.url))
    }

    // For other auth flows, redirect to next or dashboard
    return NextResponse.redirect(new URL(next, request.url))
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL('/login', request.url))
}







